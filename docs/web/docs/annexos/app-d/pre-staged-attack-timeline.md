## Pre-Staged Attack Timeline

| **Time** | **Host** | **Event** |
| --- | --- | --- |
| 03:05–03:16 | Server-Web | 25 failed SSH attempts for `devops` from `185.220.101.47` |
| 03:17 | Server-Web | Successful SSH login as `devops` |
| 03:18 | Server-Web | `sudo /usr/bin/find` — privilege escalation to root via GTFOBins |
| 03:19 | Server-Web | `useradd maint` + `/etc/sudoers.d/maint` — backdoor + persistence |
| 03:21 | Server-DB | SSH login as `devops` from `192.168.50.10` (lateral movement) |
| 03:22 | Server-DB | Access to `clients.db`; `.exfil_marker` created |