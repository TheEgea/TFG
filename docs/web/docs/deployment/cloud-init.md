# Cloud-Init Lab Provisioning

Automated deployment of per-student EVE-NG instances using Proxmox cloud-init.

---

## Overview

Each student in the course works in an isolated, identical EVE-NG environment.
Rather than manually cloning and reconfiguring VMs, the lab uses a
**cloud-init provisioning pipeline** on Proxmox that deploys a ready-to-use
EVE-NG instance from a sealed template in under 40 seconds.

---

## Architecture

```
Proxmox Host (192.168.0.200)
├── VM 113  (sealed EVE-NG template, always stopped)
│   ├── /etc/cloud/ds-identify.cfg       ← force cloud-init enabled
│   ├── /etc/cloud/cloud.cfg.d/
│   │   ├── 99_proxmox.cfg               ← NoCloud datasource, cidata label
│   │   └── 99_disable_network.cfg       ← don't touch pnet0 bridges
│   └── /etc/network/interfaces          ← pnet0 static IP (template)
│
├── /var/lib/vz/snippets/
│   ├── userdata_alumno1.yaml            ← student 1 config (IP .210)
│   ├── userdata_alumno2.yaml            ← student 2 config (IP .211)
│   └── alumnoN_key / alumnoN_key.pub    ← per-student SSH keys
│
└── VM 1XX  (linked clone, running)
    └── cloud-init ISO (cidata) mounted at /dev/sr0
        ├── user-data   ← from snippet YAML
        └── meta-data   ← instance-id, hostname
```

---

## Template Configuration

Three files must be present on the template before sealing:

### ds-identify.cfg
```
policy: enabled,found=all,maybe=all,notfound=enabled
```
Prevents cloud-init from self-disabling when no datasource is found on the first boot second.

### 99_proxmox.cfg
```yaml
datasource_list: [NoCloud, ConfigDrive, None]
datasource:
  NoCloud:
    fs_label: cidata
```

### 99_disable_network.cfg
```yaml
network:
  config: disabled
```
!!! warning "Critical"
    EVE-NG manages its own `pnet0–pnet9` bridge stack. If cloud-init
    reconfigures `eth0`, the bridges are destroyed on every boot.

---

## Student Snippet

```yaml
#cloud-config
hostname: eve-ng-alumno2
manage_etc_hosts: true

users:
  - name: alumno2
    shell: /bin/bash
    sudo: ALL=(ALL) NOPASSWD:ALL
    ssh_authorized_keys:
      - ssh-ed25519 AAAA...key... alumno2@eveng-lab

chpasswd:
  list: |
    alumno2:Lab2024!
  expire: false

runcmd:
  - /bin/bash -c 'ip addr flush dev pnet0;
    ip addr add 192.168.0.211/24 dev pnet0;
    ip route add default via 192.168.0.1 dev pnet0;
    sed -i "s/address 192.168.0.[0-9]*/address 192.168.0.211/"
    /etc/network/interfaces'

package_upgrade: false
```

---

## Provisioning Workflow

```bash
# 1. Linked clone (no full disk copy — CoW delta only)
qm clone 113 <VM_ID> --name eve-ng-alumnoN --full 0

# 2. Assign snippet and IP
qm set <VM_ID> --cicustom 'user=local:snippets/userdata_alumnoN.yaml'
qm set <VM_ID> --ipconfig0 'ip=192.168.0.2XX/24,gw=192.168.0.1'
qm cloudinit update <VM_ID>

# 3. Start
qm start <VM_ID>

# 4. Connect after ~40s
ssh alumnoN@192.168.0.2XX -i /path/to/alumnoN_key
```

---

## Verification Checklist

28/28 checks passed on the reference deployment (VM 114, 2026-05-17):

| Phase | Check | Result |
|-------|-------|--------|
| Template | ds-identify.cfg policy correct | ✅ |
| Template | NoCloud datasource configured | ✅ |
| Template | Network config disabled | ✅ |
| Template | instances/ directory empty | ✅ |
| Clone | VM created from template | ✅ |
| Clone | cicustom snippet assigned | ✅ |
| Clone | ISO contains correct YAML | ✅ |
| Runtime | VM responds to ping in < 40s | ✅ (35s) |
| Runtime | hostname = eve-ng-alumno2 | ✅ |
| Runtime | pnet0 IP = 192.168.0.211/24 | ✅ |
| Runtime | /etc/network/interfaces updated | ✅ |
| Runtime | User alumno2 created | ✅ |
| Runtime | authorized_keys correct | ✅ |
| Runtime | apache2 running | ✅ |
| Runtime | cloud-init status = done (0 errors) | ✅ |
| Runtime | EVE-NG web UI returns HTTP 200 | ✅ |
| Runtime | SSH with new key works | ✅ |
| Runtime | sudo NOPASSWD works | ✅ |

---

## Known Issues

### LVM Filter on ZFS Zvol
Proxmox's `lvm.conf` excludes `/dev/zd.*` by default. To inspect the template disk
without modifying the global filter:
```bash
vgchange --select 'uuid=<UUID>' -ay
```

### IP Not Persisting After Reboot
The `runcmd` block must include a `sed` command updating `/etc/network/interfaces`.
Without it, the VM reverts to the template IP on the second boot.
