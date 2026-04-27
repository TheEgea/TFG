# LAB3 — Server-Web (helix-web)

Server-Web is the **primary forensic target**. It contains all the evidence of the initial attack phases: brute-force, successful login, privilege escalation, and backdoor creation.

---

## System

| Parameter | Value |
|-----------|-------|
| Hostname | helix-web |
| OS | Ubuntu Server 24.04 LTS |
| IP | 192.168.50.10/24 |
| Gateway | 192.168.50.1 (VyOS eth1) |

## Network config (Netplan)

```yaml
network:
  version: 2
  ethernets:
    ens3:
      addresses:
        - 192.168.50.10/24
      routes:
        - to: default
          via: 192.168.50.1
```

## OS accounts

| Account | Password | Role |
|---------|----------|------|
| ubuntu | ubuntu | Default installer account |
| analyst | An@lyst2024 | **Student entry** — member of `adm` group (can read auth.log) |
| devops | D3v0ps#2023 | Compromised developer account |
| maint | — | **Backdoor** — created by attacker at 03:19 |

!!! warning "analyst must be in adm group"
    `/var/log/auth.log` is owned `root:adm` mode `640`. The `analyst` user must be in the `adm` group to read it. Applied via nbd chroot:
    ```bash
    sudo chroot /mnt/lab3-web usermod -aG adm analyst
    ```

## Sudoers misconfiguration (privilege escalation vector)

```
# /etc/sudoers.d/devops
devops ALL=(ALL) NOPASSWD: /usr/bin/find
```

`find`'s `-exec` flag allows arbitrary command execution as root. The attacker ran:
```bash
sudo /usr/bin/find / -name "*.conf" -exec cat {} \;
```

## Pre-staged evidence in auth.log

```
# Brute-force phase (03:05–03:16): 25 entries like:
Apr 24 03:05:03 helix-web sshd[1201]: Failed password for devops from 185.220.101.47 port 42001 ssh2

# Successful login (03:17):
Apr 24 03:17:42 helix-web sshd[1231]: Accepted password for devops from 185.220.101.47 port 43100 ssh2

# Privilege escalation (03:18):
Apr 24 03:18:01 helix-web sudo: devops : TTY=pts/0 ; PWD=/home/devops ; USER=root ; COMMAND=/usr/bin/find

# Backdoor creation (03:19):
Apr 24 03:19:15 helix-web useradd[2041]: new user: name=maint, UID=1003, GID=1003, home=/home/maint, shell=/bin/bash
```

## Pre-staged command history (/home/devops/.bash_history)

```bash
id
whoami
sudo /usr/bin/find / -name "*.conf" -exec cat {} \;
useradd -m maint
echo "maint ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/maint
chmod 440 /etc/sudoers.d/maint
exit
```

## Useful investigation commands

```bash
# Count brute-force attempts
grep 'Failed password for devops' /var/log/auth.log | wc -l

# Find successful login + escalation
grep -E 'Accepted|sudo' /var/log/auth.log

# Find backdoor account creation
grep 'useradd\|maint' /var/log/auth.log

# Read attacker command history (needs sudo as analyst)
sudo cat /home/devops/.bash_history

# Check sudoers drop-in
sudo cat /etc/sudoers.d/devops
sudo cat /etc/sudoers.d/maint
```
