# LAB3 — Evidence Walkthrough

Step-by-step investigation guide. Each step corresponds to specific log artefacts that the student is expected to locate, interpret, and document.

---

## Entry point

```bash
ssh analyst@<pfSense-WAN-IP>
# Password: An@lyst2024
# You land on: analyst@helix-web:~$
```

---

## Step 1 — Establish context

Before touching logs, orient yourself on the system.

```bash
hostname
# helix-web

uname -a
# Linux helix-web 6.8.x-xx-generic

grep -v nologin /etc/passwd | grep -v false
# root, ubuntu, analyst, devops, maint
```

!!! danger "First anomaly"
    The `maint` account is not a standard system account and has no documented business purpose. Note it immediately.

---

## Step 2 — Brute-force identification

```bash
grep 'Failed password' /var/log/auth.log | head -5
# Apr 24 03:05:03 helix-web sshd[1201]: Failed password for devops from 185.220.101.47 ...
# Apr 24 03:05:06 helix-web sshd[1202]: Failed password for devops from 185.220.101.47 ...

grep 'Failed password for devops' /var/log/auth.log | wc -l
# 25
```

25 consecutive failures from `185.220.101.47` within a two-minute window = **brute-force attack**.

---

## Step 3 — Successful login and privilege escalation

```bash
grep -E 'Accepted|sudo' /var/log/auth.log
# Apr 24 03:17:42 helix-web sshd[1231]: Accepted password for devops from 185.220.101.47 ...
# Apr 24 03:18:01 helix-web sudo: devops : ... COMMAND=/usr/bin/find
```

The 12-minute gap (03:05 last fail → 03:17 success) suggests the attacker paused to use the correct credential.
`sudo /usr/bin/find` by a developer account is anomalous — `find` has no legitimate need for root.

---

## Step 4 — Privilege escalation vector

```bash
sudo cat /etc/sudoers.d/devops
# devops ALL=(ALL) NOPASSWD: /usr/bin/find
```

`find -exec` allows running arbitrary commands as root. This is a well-known GTFOBins vector.

---

## Step 5 — Backdoor account and persistence

```bash
grep 'useradd\|maint' /var/log/auth.log
# Apr 24 03:19:15 helix-web useradd[2041]: new user: name=maint, UID=1003 ...

sudo cat /home/devops/.bash_history
# id
# whoami
# sudo /usr/bin/find / -name "*.conf" -exec cat {} \;
# useradd -m maint
# echo "maint ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/maint
# chmod 440 /etc/sudoers.d/maint
# exit

sudo cat /etc/sudoers.d/maint
# maint ALL=(ALL) NOPASSWD: ALL
```

The `.bash_history` confirms the exact sequence. The attacker created a backdoor account with full unrestricted sudo.

---

## Step 6 — Lateral movement to Server-DB

Pivot to Server-DB:

```bash
ssh analyst@192.168.60.10
# Password: An@lyst2024
# analyst@helix-db:~$
```

Check the auth log:

```bash
grep 'Accepted' /var/log/auth.log
# Apr 24 03:21:03 helix-db sshd[987]: Accepted password for devops from 192.168.50.10 port 51234 ssh2
```

Source `192.168.50.10` = Server-Web. The attacker reused `devops` credentials to reach the database server.

---

## Step 7 — Data exfiltration

```bash
ls -la /opt/helix/data/
# clients.db  .exfil_marker

cat /opt/helix/data/.exfil_marker
# 185.220.101.47 - 2026-04-24 03:22 - data accessed
```

The external attacker IP (`185.220.101.47`) matches the brute-force source. Timestamp `03:22` follows the lateral movement login at `03:21`.

---

## Incident findings summary

| Time | Host | Artefact | Finding |
|------|------|----------|---------|
| 03:05–03:16 | Server-Web | auth.log | 25 failed SSH attempts (brute force) from `185.220.101.47` |
| 03:17 | Server-Web | auth.log | Successful login as `devops` |
| 03:18 | Server-Web | auth.log | Privilege escalation via `sudo find` |
| 03:19 | Server-Web | auth.log + /etc/passwd | Backdoor account `maint` created |
| 03:21 | Server-DB | auth.log | Lateral movement from `192.168.50.10` |
| 03:22 | Server-DB | .exfil_marker | Access to `clients.db` confirmed |

---

## Mitigations

| Attack phase | Root cause | Fix |
|-------------|-----------|-----|
| Brute force | No rate limiting | fail2ban; SSH key auth only; disable password auth |
| Initial access | Weak/reused password | Strong password policy; MFA |
| Privilege escalation | `NOPASSWD: /usr/bin/find` | Never grant NOPASSWD to utility binaries |
| Persistence | Unrestricted root access | Audit `/etc/passwd` and `sudoers.d/` with FIM |
| Lateral movement | Password reuse | Unique credentials per system |
| Data exfiltration | No access control on `/opt/helix/data/` | Least-privilege ownership; audit logging |
