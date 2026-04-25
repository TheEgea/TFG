# LAB3 -- Instructor Resolution Guide (HELIX Systems)

## Task 1 -- Initial Access

**Attacker IP:** `185.220.101.47`
**Targeted user:** `devops`
**Successful login time:** `03:17:02`

Key log lines:
```
Apr 24 03:05:01 helix-web sshd[3821]: Invalid user devops from 185.220.101.47 port 51234
...
Apr 24 03:17:02 helix-web sshd[3944]: Accepted password for devops from 185.220.101.47 port 52201 ssh2
```

## Task 2 -- Privilege Escalation

**Command used:** `sudo find /. -exec /bin/bash \; -quit`
**Misconfiguration:** `/etc/sudoers.d/devops` contains `NOPASSWD: /usr/bin/find`
**MITRE technique:** T1548.003 -- Abuse Elevation Control Mechanism: Sudo and Sudo Caching
**Prevention:** Remove `NOPASSWD` from sudoers; apply principle of least privilege

Key log lines:
```
Apr 24 03:19:07 helix-web sudo: devops : ... COMMAND=/usr/bin/find /. -exec /bin/bash \; -quit
```

## Task 3 -- Persistence

**Backdoor account:** `maint` (UID 1003)
**Privileges:** member of `sudo` group (full root via sudo)

Key log lines:
```
Apr 24 03:19:22 helix-web useradd[4021]: new user: name=maint, UID=1003 ...
Apr 24 03:19:23 helix-web usermod[4022]: add maint to group sudo
```

## Task 4 -- Lateral Movement

**Source IP:** `192.168.50.10` (helix-web)
**User:** `devops` (same compromised credentials)
**Time:** `03:21:08`

Key log line:
```
Apr 24 03:21:08 helix-db sshd[2201]: Accepted password for devops from 192.168.50.10 port 43100 ssh2
```

## Task 5 -- Data Exfiltration

**Sensitive data:** `/opt/helix/data/clients.db` (client contracts + revenue data)
**Evidence:** `/opt/helix/data/.exfil_marker` contains `185.220.101.47 - 2026-04-24 03:22 - data accessed`

## Task 6 -- Incident Report (model answer)

**IOCs:**
- IP: `185.220.101.47`
- User: `devops` (compromised)
- Backdoor: `maint` (UID 1003, sudo group)
- Files: `/opt/helix/data/clients.db`, `/opt/helix/data/.exfil_marker`
- Technique: GTFOBins sudo find (T1548.003)

**Remediation:**
1. Disable `devops` and `maint` accounts immediately
2. Remove NOPASSWD from `/etc/sudoers.d/devops`
3. Rotate all credentials on both servers
4. Review all sudoers entries for NOPASSWD rules
5. Implement SSH key-based auth, disable password auth
6. Deploy intrusion detection (fail2ban, auditd)
7. Review data access controls on `/opt/helix/data/`
