# Firewall – pfSense CE 2.6 Setup

The firewall configuration in this project was implemented by following the step-by-step
procedure shown in the video below, adapted to the EVE-NG lab environment.

## Reference Video

- <https://youtu.be/sX22a_v2svQ?si=IzMju0KYcMQSE4sZ>

---

## Phase 1 – Image preparation (EVE-NG SSH as root)

pfSense CE 2.6 requires a disk image before the node can be started.
Unlike VyOS, pfSense installs itself to disk during the first-boot wizard — no
manual `install image` step needed.

```bash
cd /opt/unetlab/addons/qemu/pfsense-ce-2.6.0-release-amd64/

# List contents – you should see the ISO
ls
# cdrom.iso

# Create the target disk (8G is enough for CE 2.6)
qemu-img create -f qcow2 virtioa.qcow2 8G

# Fix permissions
cd /opt/unetlab/addons/qemu/
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

!!! tip "Same pattern as VyOS"
    The disk preparation is identical to the VyOS flow.
    See [Router (VyOS)](Router.md) for reference.

---

## Phase 2 – First boot and setup wizard (VNC console)

Start the node from the EVE-NG web UI and open the console (VNC).

pfSense will boot from the ISO and launch the installer automatically.

### 2.1 Install to disk

When prompted, accept the default options:

- **Install pfSense** → Continue
- **Auto (ZFS)** or **Auto (UFS)** — UFS is simpler for a lab
- Select disk: `vtbd0` (the `virtioa.qcow2` disk)
- Confirm and proceed — pfSense will copy files and reboot

After reboot the node boots from disk. The ISO is no longer needed but can stay.

### 2.2 Interface assignment

On first boot, pfSense asks which physical interfaces to assign as WAN and LAN.

!!! warning "Interface order in EVE-NG"
    pfSense sees interfaces in the order EVE-NG/QEMU presents them:

    | pfSense NIC | EVE-NG port | Connected to |
    |-------------|-------------|--------------|
    | `vtnet0` (em0) | e0 | LAN network (→ Router) |
    | `vtnet1` (em1) | e1 | WAN network (pnet / internet) |

    Always verify the assignment matches the lab cabling before continuing.

At the console menu:

```
Should VLANs be set up now? → n
Enter the WAN interface name: vtnet1
Enter the LAN interface name: vtnet0
Do you want to proceed?      → y
```

pfSense will assign:

- **WAN** (`vtnet1`): DHCP by default — gets IP from the upstream network
- **LAN** (`vtnet0`): `192.168.1.1/24` by default — **change this to match your lab**

### 2.3 Set LAN IP from console

From the pfSense console menu, select option `2) Set interface(s) IP address`:

```
Select interface to configure: 2 (LAN)
Enter the new LAN IPv4 address:  172.16.x.x
Enter the new LAN IPv4 subnet:   30
For a WAN, enter the upstream gateway: (blank)
Do you want to enable DHCP on LAN? n
```

---

## Phase 3 – Web GUI access

pfSense web GUI is only reachable from the **LAN interface**.

| Parameter | Value |
|-----------|-------|
| URL | `https://172.16.x.x` |
| Default user | `admin` |
| Default password | `pfsense` |

!!! warning "LAN-only access"
    The web GUI and SSH are blocked on the WAN interface by default.
    Connect from a host that has L2 reachability to the LAN segment
    (e.g. via the Router or a management host on the same bridge).

Complete the setup wizard on first login:

1. Set hostname and DNS
2. Set timezone
3. Confirm WAN settings
4. Confirm LAN IP
5. Change admin password
6. Reload — pfSense is ready

---

## Phase 4 – Enable SSH management

Go to **System → Advanced → Admin Access**:

- Enable **Secure Shell**
- Set **SSHd Key Only** to *Password or Public Key* for lab convenience
- Click **Save**

SSH is then available from the LAN segment:

```bash
ssh admin@172.16.x.x
```

---

## Phase 5 – Persistence check

pfSense writes its config to `/cf/conf/config.xml` on disk.
After any change via web GUI or console, it saves automatically.

To verify the disk is being used:

```bash
# From pfSense console → option 8 (Shell)
df -h
# /dev/vtbd0p3 should be mounted at /
```

!!! warning "Always shut down cleanly"
    Use **Halt System** from the pfSense menu or `shutdown -h now` from the shell.
    A hard stop from EVE-NG GUI may corrupt the ZFS/UFS filesystem.

---

## Key notes from lab experience

- pfSense console is **VNC only** in EVE-NG (no serial/telnet access from host).
- SSH and web GUI are **disabled on WAN** by default — always connect via LAN.
- The tap interface connecting pfSense WAN to the `pnet` bridge may need to be
  re-added manually after each EVE-NG host reboot (see [LAB1 Firewall](../../labs/lab1/firewall.md)).
