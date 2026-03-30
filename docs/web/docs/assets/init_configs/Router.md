# Mount disk

## Overview

This section documents the **complete process** to convert VyOS from **live-RAM** (volatile) to **persistent HDD** storage in EVE-NG and to create reusable templates for routers and switches.  
After completion:

- Student view: `commit; save; reboot` survives (no config loss).
- Professor view: 1x base template → unlimited cloneable nodes (router/switch) with independent disks.

---

## Phase 1 – Persistence check (pre-install, inside VyOS)

Run these commands on a fresh VyOS node (booting from ISO, before install):

```bash
lsblk -f                 # Disks/partitions (look for /dev/vda ~8–10G without mount)
mount | grep config      # overlay/tmpfs = NOT persistent
df -h /config            # tmpfs/none = RAM
ls /config/              # config.boot present but volatile
cat /proc/cmdline | grep vyos-union  # Confirms live-boot

# Status: Live-boot (configs lost on reboot).
```

## Phase 2 – Base template preparation (EVE-NG SSH as root)

Objective: Have a VyOS directory with cdrom.iso + virtioa.qcow2 ready for installation.

```bash
cd /opt/unetlab/addons/qemu/

ls | grep vyos
# Example: vyos-2026.02.13-0029-rolling-generic-amd64

cd vyos-2026.02.13-0029-rolling-generic-amd64

ls
# cdrom.iso

qemu-img create -f qcow2 virtioa.qcow2 8G
# or: /opt/qemu/bin/qemu-img create -f qcow2 virtioa.qcow2 8G

cd /opt/unetlab/addons/qemu/
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

## Phase 3 – Install VyOS to disk (node console)

EVE GUI → New Lab → Add Node → Linux → vyos-2026.02.13-0029-rolling-generic-amd64.

Start the node → Console (Telnet) → login vyos / vyos.

```bash
vyos@vyos:~$ install image
# Follow prompts:
# - Image name: vyos-lab-base (or Enter for default)
# - Password: vyos
# - Console: S (Serial)
# - Disk: /dev/vda (Enter)
# - Use all free space: Y
# - Boot config: 2 (clean default)
# - Install GRUB: y

vyos@vyos:~$ poweroff
# Result: virtioa.qcow2 now contains a full VyOS installation.
```

## Phase 4 – Commit base template (EVE-NG SSH)

```bash
cd /opt/unetlab/addons/qemu/vyos-2026.02.13-0029-rolling-generic-amd64/

qemu-img info virtioa.qcow2

/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

## Phase 5 – Verify persistence (student view)

```bash
lsblk -f                 # vda3 ext4 mounted
mount | grep config      # /dev/vda3 (NO overlay!)
df -h /config            # ext4 persistent

configure
set interfaces ethernet eth0 address '10.0.0.1/24'
commit
save
exit
reboot

# After reboot:
show configuration commands | match '10.0.0.1'
# If present → config is persistent.
```

## Phase 6 – Create router/switch templates (independent disks)

### 6.1 Create switch template: vyos-switch-lab1

```bash
cd /opt/unetlab/addons/qemu/
cp -r vyos-2026.02.13-0029-rolling-generic-amd64 vyos-switch-lab1
cd vyos-switch-lab1/
cp ../vyos-2026.02.13-0029-rolling-generic-amd64/virtioa.qcow2 .
rm cdrom.iso
cd /opt/unetlab/addons/qemu/
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

### 6.2 Create router template: vyos-router-lab1

```bash
cd /opt/unetlab/addons/qemu/
cp -r vyos-2026.02.13-0029-rolling-generic-amd64 vyos-router-lab1
cd vyos-router-lab1/
cp ../vyos-2026.02.13-0029-rolling-generic-amd64/virtioa.qcow2 .
rm cdrom.iso
cd /opt/unetlab/addons/qemu/
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

!!! tip "Important – Do not reuse the same disk file"
    Always copy `virtioa.qcow2` into each template directory.
    If multiple templates share the same base disk file, they may overwrite each other's
    state, causing random config corruption between labs.

---

## Router basic configuration

!!! info "Details"
    The instructions below are reference examples; each lab may use different addressing and services.

### Interface addressing

```bash
configure

# WAN interface (toward upstream firewall)
set interfaces ethernet eth0 address '<WAN_IP>/30'
set interfaces ethernet eth0 description 'OUTSIDE'

# LAN interface – User segment
set interfaces ethernet eth6 address '<USER_GW>/24'
set interfaces ethernet eth6 description 'Users-LAN'

# LAN interface – Server segment
set interfaces ethernet eth7 address '<SRV_GW>/24'
set interfaces ethernet eth7 description 'Server-LAN'

# Default route toward firewall/gateway
set protocols static route 0.0.0.0/0 next-hop '<WAN_GATEWAY>'

set system host-name 'Router'
commit
save
exit
```

### NAT masquerade (outbound)

!!! warning "VyOS rolling – syntax change"
    Recent rolling builds require `outbound-interface name 'ethX'` instead of
    `outbound-interface 'ethX'`.

```bash
configure

set nat source rule 100 outbound-interface name 'eth0'
set nat source rule 100 source address '<USER_NET>/24'
set nat source rule 100 translation address 'masquerade'

set nat source rule 300 outbound-interface name 'eth0'
set nat source rule 300 source address '<SRV_NET>/24'
set nat source rule 300 translation address 'masquerade'

commit
save
exit
```

### Port forwarding – DNAT (expose a service inbound)

```bash
configure

set nat destination rule 10 description 'HTTP to Server'
set nat destination rule 10 inbound-interface name 'eth0'
set nat destination rule 10 protocol 'tcp'
set nat destination rule 10 destination port '80'
set nat destination rule 10 translation address '<SERVER_IP>'
set nat destination rule 10 translation port '80'

set nat destination rule 11 description 'HTTPS to Server'
set nat destination rule 11 inbound-interface name 'eth0'
set nat destination rule 11 protocol 'tcp'
set nat destination rule 11 destination port '443'
set nat destination rule 11 translation address '<SERVER_IP>'
set nat destination rule 11 translation port '443'

# Allow forwarded traffic through the firewall policy
set firewall ipv4 forward filter rule 10 action 'accept'
set firewall ipv4 forward filter rule 10 destination address '<SERVER_IP>'
set firewall ipv4 forward filter rule 10 destination port '80'
set firewall ipv4 forward filter rule 10 protocol 'tcp'

set firewall ipv4 forward filter rule 11 action 'accept'
set firewall ipv4 forward filter rule 11 destination address '<SERVER_IP>'
set firewall ipv4 forward filter rule 11 destination port '443'
set firewall ipv4 forward filter rule 11 protocol 'tcp'

commit
save
exit
```

### Enable SSH management

```bash
configure
set service ssh
commit
save
exit
```

### Verification commands

```bash
show interfaces
show ip route
show arp
show nat source rules
show nat destination rules
show firewall
ping <IP> count 3
```

---

## Switch mode basic configuration

!!! info "Details"
    This example shows VyOS acting as a managed L2 switch: multiple access ports bridged
    together, no routing. Useful when routing is handled by another node.

```bash
configure

set interfaces bridge br0
set interfaces ethernet eth1 bridge-group bridge br0
set interfaces ethernet eth2 bridge-group bridge br0
set interfaces ethernet eth3 bridge-group bridge br0

# Optional: management IP on the bridge
set interfaces bridge br0 address '192.168.100.2/24'

commit
save
exit
```
