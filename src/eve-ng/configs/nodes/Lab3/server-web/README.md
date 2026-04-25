# Server-Web (helix-web) -- Configuration

## Access
- IP: `192.168.50.10` (reachable from EVE-NG host via vnet0_2 bridge)
- Direct SSH: `sshpass -p ubuntu ssh ubuntu@192.168.50.10`
- Student SSH: via pfSense DNAT TCP 22 -> `ssh analyst@<pfSense-WAN>`

## System Users

| Username | Password    | Groups    | Role in scenario              |
|----------|-------------|-----------|-------------------------------|
| ubuntu   | ubuntu      | sudo      | VM admin (not student-facing) |
| analyst  | An@lyst2024 | adm       | Student entry point           |
| devops   | D3v0ps#2023 | --        | Compromised user (attacker)   |
| maint    | M41nt#2024  | sudo      | Backdoor created by attacker  |

Note: `analyst` in group `adm` to allow reading `/var/log/auth.log`.

## Injected Scenario Files

| File                          | Purpose                                    |
|-------------------------------|--------------------------------------------|
| `/var/log/auth.log`           | Full attack timeline (see auth.log file)   |
| `/home/devops/.bash_history`  | Attacker post-escalation commands          |
| `/etc/sudoers.d/devops`       | Misconfiguration enabling privilege escalation |

## Misconfiguration (intentional)

`/etc/sudoers.d/devops`:
```
devops ALL=(ALL) NOPASSWD: /usr/bin/find
```
This allows privilege escalation via GTFOBins: `sudo find . -exec /bin/bash \; -quit`

## Disk Notes
- VG name: `lab3-web-vg` (renamed from `ubuntu-vg` to avoid LVM conflict with host)
- grub.cfg: `root=/dev/mapper/lab3--web--vg-ubuntu--lv`
- qcow2: flat copy, no backing file dependency
