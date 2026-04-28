## Evidence Artefact Locations

| **Artefact** | **Path** | **Host** |
| --- | --- | --- |
| SSH brute-force log | `/var/log/auth.log` | Server-Web |
| Privilege escalation | `/var/log/auth.log` (sudo entry) | Server-Web |
| Backdoor account | `/etc/passwd`, `/etc/sudoers.d/maint` | Server-Web |
| Sudoers misconfiguration | `/etc/sudoers.d/devops` | Server-Web |
| Bash history | `/home/devops/.bash_history` | Server-Web |
| Lateral movement log | `/var/log/auth.log` | Server-DB |
| Exfiltration marker | `/opt/helix/data/.exfil_marker` | Server-DB |
| Sensitive data | `/opt/helix/data/clients.db` | Server-DB |