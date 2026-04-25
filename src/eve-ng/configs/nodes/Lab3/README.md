# LAB3 -- Incident Response (HELIX Systems)

Configurations and injected evidence from the LAB3 EVE-NG environment.

## Scenario
HELIX Systems has suffered a security incident. Students act as SOC analysts who must
SSH into each node, extract logs, and reconstruct what happened.

**Attack chain:** credential brute-force -> SSH login -> `sudo find` privilege escalation
(NOPASSWD misconfiguration) -> backdoor user creation -> lateral movement -> data exfiltration.

## Nodes

| Folder        | Node         | IP              | Role                        |
|---------------|--------------|-----------------|----------------------------|
| pfsense/      | pfSense CE   | WAN DHCP / LAN 172.16.2.1/30 | Perimeter firewall, DNAT SSH |
| vyos/         | VyOS router  | 172.16.2.2, 192.168.50.1, 192.168.60.1 | Internal router, SNAT |
| server-web/   | Ubuntu 24.04 | 192.168.50.10   | helix-web -- compromised server |
| server-db/    | Ubuntu 24.04 | 192.168.60.10   | helix-db -- internal DB server |

## Student Workflow

1. `ssh analyst@<pfSense-WAN>` -- pfSense DNAT forwards TCP 22 to Server-Web
2. Analyse `/var/log/auth.log` on Server-Web -- find brute-force, login, sudo escalation, backdoor
3. `cat /home/devops/.bash_history` -- attacker post-escalation commands
4. `ssh analyst@192.168.60.10` -- lateral movement to Server-DB
5. Analyse `/var/log/auth.log` on Server-DB -- find lateral movement entry
6. `ls /opt/helix/data/` -- find exfiltration evidence

## EVE-NG Host Bridges (persistent via udev)

File: `/etc/udev/rules.d/99-lab3-bridges.rules`

```bash
ACTION=="add", SUBSYSTEM=="net", KERNEL=="vnet0_2", RUN+="/sbin/ip addr add 192.168.50.254/24 dev vnet0_2"
ACTION=="add", SUBSYSTEM=="net", KERNEL=="vnet0_3", RUN+="/sbin/ip addr add 192.168.60.254/24 dev vnet0_3"
```

Note: vnet0_2 and vnet0_3 are also used by Lab1 with different IPs. Do not run Lab1 and Lab3 simultaneously.

## Lab UUID
`8d1d75f4-3817-448d-a59e-9bf2afc2ffc8`
