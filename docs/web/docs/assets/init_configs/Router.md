# Mount disk

## Overview
This section documents the **complete process** to convert VyOS from **live-RAM** (volatile) to **persistent HDD** storage in EVE-NG. After completion:
- **Student view**: `commit; save; reboot` survives (no config loss).
- **Professor view**: 1x template → unlimited cloneable nodes.

### Phase 1: Persistence Check (Pre-Install) 

Execute this: 
```bash
lsblk -f  # Disks/partitions (look for /dev/vda ~16G without mount)
mount | grep config  # overlay/tmpfs = NOT persistent
df -h /config  # tmpfs/none = RAM
ls /config/  # config.boot present but volatile
cat /proc/cmdline | grep vyos-union  # Confirms live-boot
# Status: Live-boot (configs lost on reboot).
```
### Phase 2: Template Preparation (Professor SSH EVE)

```bash
# Script auto-creates (your Python tool)
ls /opt/unetlab/addons/qemu/ | grep vyos  # vyos-2026.02.13-0029-rolling-generic-amd64
ls /opt/unetlab/addons/qemu/vyos-2026.../  # cdrom.iso + virtioa.qcow2 (10GB)
```

### Phase 3: Install Image (Node Telnet Console)

```text
vyos/vyos → install image
Name: "image_name"
Password vyos: vyos  # Students use this
Console: S (Serial/Telnet)
Disk: /dev/vda (10GB)
Continue delete: y
Free space: y
**Boot config: 2** (/opt/vyatta/etc/config.boot.default) ← Clean base!
GRUB: /dev/vda
"The image installed successfully!"
poweroff

Result: lsblk shows vda1(EFI)/vda2(boot)/vda3(root) mounted persistent.
```

### Phase 4: Template Commit (Professor SSH EVE)

```bash
cd /opt/unetlab/addons/qemu/vyos-2026.02.13-0029-rolling-generic-amd64/
qemu-img info virtioa.qcow2  # Verify growth
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

#### Phase 5: Verify Persistence (Student/Post-Boot)

```bash
# EVE GUI: Start Node → vyos/vyos login
lsblk -f  # vda3 ext4 mounted
mount | grep config  # /dev/vda3 (NO overlay!)
df -h /config  # ext4 9.7G persistent
show log | match "boot"  # HDD boot confirmed

```

!!! note "Implications & Scalability"

    Student Perspective
    
    - Access: EVE GUI → Console (Telnet) → vyos/vyos
    - Changes persist: configure → commit → save → reboot
    - No SSH required: Pure GUI/console workflow.

    Professor Perspective
    
    1. 1x install/commit → vyos-* template persistent
    2. New Lab → Add 10x Router nodes → ALL boot HDD
    3. Each node: Independent clone (own /config)
    4. Students: Modify per-node (no template corruption)


!!! danger "Replicate Image"

    These steps are used after preparing the first image template. You can then replicate it, but make sure the new template uses its own disk file. If you reuse the same disk, multiple nodes may share it and overwrite each other's state.

## Create Templates

!!! tip "Check the names"

To create a new template from the original image, run the following commands and adjust the names to match your lab.

```bash
# Go to the EVE-NG QEMU images directory
cd /opt/unetlab/addons/qemu/

# Clone the original VyOS template directory into a new template name
cp -r vyos-2026.02.13-0029-rolling-generic-amd64 vyos-switch-lab1

# Enter the new template directory
cd vyos-switch-lab1/

# Copy the HDD image into this template (independent disk file)
cp ../vyos-2026.02.13-0029-rolling-generic-amd64/virtioa.qcow2 .

# Remove the ISO so the node boots only from HDD
rm cdrom.iso

# Fix ownership and permissions so EVE-NG can use the template
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions

```










## Router Basic Configuration

!!! info "Details"

    The instructions that will be used could not be the same used in each lab or not all instructions used appears in this manual.
    It is only *basic* configuration.

## Configuration

Enable configuration

```bash
configure
# Set each interface connected which sub addresses have to know.
set interface ethernet eth0 address 'x.x.x.x/x'

# Configuration for DHCP
set interface ethernet eth1 address dhcp

# DHCP LAN

set service dhcp-server shared-network-name LAN subnet 192.168.1.0/24 default-router '192.168.1.1'
set service dhcp-server shared-network-name LAN subnet 192.168.1.0/24 dns-server '8.8.8.8'
set service dhcp-server shared-network-name LAN subnet 192.168.1.0/24 range 0 start '192.168.1.10' stop '192.168.1.100'

commit
save
exit
# Check if persists
reboot
```

After reboot, check changes:

```bash
show ip route
ping 8.8.8.8 interface eth1
```

