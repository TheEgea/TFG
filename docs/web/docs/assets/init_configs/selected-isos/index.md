# Selected ISOs

This page documents the ISO images selected for the TFG lab environment and the
rationale behind each choice.

---

## ISO overview

| Image | Version | Source | Role in labs |
|-------|---------|--------|--------------|
| **VyOS** | rolling | [vyos.io](https://vyos.io) | Core router — routing, NAT, firewall |
| **pfSense CE** | 2.7.x | [pfsense.org](https://www.pfsense.org) | Perimeter firewall, DNS resolver |
| **Ubuntu Server** | 24.04 LTS | [ubuntu.com](https://ubuntu.com) | Target server — nginx, SSH |
| **Ubuntu Desktop** | 24.04 LTS | [ubuntu.com](https://ubuntu.com) | Victim workstation |
| **Parrot OS** | rolling | [parrotsec.org](https://parrotsec.org) | Attacker node |

---

## Selection criteria

All ISOs were chosen based on three criteria:

1. **Open source / freely redistributable** — no licensing cost for students or the institution.
2. **EVE-NG compatibility** — tested boot under QEMU with virtio drivers; added with the
   `linux-` prefix under `/opt/unetlab/addons/qemu/` as required by EVE-NG.
3. **Industry relevance** — tools and OS families students will encounter in real engagements
   (pfSense/VyOS in SMB network gear, Ubuntu Server as the dominant Linux server target,
   Parrot/Kali as standard pentesting platforms).

---

## Import into EVE-NG

```bash
# 1. Upload ISO to EVE-NG host
scp <image>.iso root@<eveng-host>:/tmp/

# 2. Create the image directory (use linux- prefix)
ssh root@<eveng-host>
mkdir -p /opt/unetlab/addons/qemu/linux-<name>/
mv /tmp/<image>.iso /opt/unetlab/addons/qemu/linux-<name>/cdrom.iso

# 3. Create a virtual disk
qemu-img create -f qcow2 \
  /opt/unetlab/addons/qemu/linux-<name>/virtioa.qcow2 <size>G

# 4. Fix permissions
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

!!! tip "Automate with Iso_uploader.py"
    The `src/scripts/automation/Iso_uploader.py` script in the repository automates
    all four steps above with a GUI file picker and automatic disk-size suggestions
    based on the OS type.

---

## Notes per image

**VyOS (rolling)**
: Must be installed to disk from the live ISO before use in labs.
  Run `install image` from the VyOS shell after first boot.

**pfSense CE**
: On first boot, assign interfaces manually via the console menu (option 1).
  `vtnet0` → LAN, `vtnet1` → WAN in EVE-NG.

**Ubuntu Server / Desktop**
: Use the `linux-ubuntu-*` prefix. virtio disk and network drivers are
  supported out of the box.

**Parrot OS**
: Use the Security edition. The Home edition does not include pentesting tools.
