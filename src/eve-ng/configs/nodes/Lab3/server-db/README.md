# Server-DB (helix-db) -- Configuration

## Access
- IP: `192.168.60.10` (reachable from EVE-NG host via vnet0_3 bridge)
- Direct SSH: `sshpass -p ubuntu ssh ubuntu@192.168.60.10`
- Student SSH: from Server-Web `ssh analyst@192.168.60.10`

## System Users

| Username | Password    | Groups | Role in scenario            |
|----------|-------------|--------|-----------------------------|
| ubuntu   | ubuntu      | sudo   | VM admin                    |
| analyst  | An@lyst2024 | adm    | Student lateral pivot       |
| devops   | D3v0ps#2023 | --     | Compromised user (attacker) |

## Injected Scenario Files

| File                             | Purpose                              |
|----------------------------------|--------------------------------------|
| `/var/log/auth.log`              | Lateral movement SSH login at 03:21  |
| `/opt/helix/data/clients.db`     | Confidential client data (target)    |
| `/opt/helix/data/.exfil_marker`  | Evidence of data access              |

## Disk Notes
- VG name: `lab3-db-vg` (renamed from `ubuntu-vg`)
- grub.cfg: `root=/dev/mapper/lab3--db--vg-ubuntu--lv`
- qcow2: flat copy, no backing file dependency

## SSH Configuration
`/etc/ssh/sshd_config.d/50-cloud-init.conf`:
```
PasswordAuthentication yes
```
