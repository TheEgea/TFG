# LAB1 -- Reconnaissance (PEBCAK Corp)

Configurations exported from the production EVE-NG lab.

## Nodes

| Folder | Node | IP | Role |
|--------|------|----|------|
| pfsense/ | pfSense CE | WAN + 172.16.0.1 LAN | Perimeter firewall, NAT, DNS |
| vyos/ | VyOS router | 172.16.0.2, 192.168.10.5, 192.168.20.1 | Internal router |
| server/ | Ubuntu 24.04 | 192.168.20.50 | Target -- PEBCAK Corp nginx |
| pc1/ | Ubuntu Desktop | 192.168.10.50 | Internal user |
| parrot/ | Parrot OS 6.4 | 192.168.0.x DHCP | Attacker |

## Student Workflow

1. Browse http://lab1 -> PEBCAK Corp portal (Firefox on Parrot)
2. View HTML source -> find hint in HTML comment
3. Browse http://lab1/pebcak.html -> retrieve SSH credentials
4. ssh blackmesa@lab1 -> Server via pfSense DNAT TCP 22
5. cat ~/flag.txt -> FLAG + pfSense creds
6. ssh admin@172.16.0.1 -> pfSense from Server via VyOS

## Restore EVE-NG host bridges (after reboot)

```bash
ip addr add 192.168.20.254/24 dev vnet0_2
ip addr add 192.168.10.254/24 dev vnet0_3
ip route add 172.16.0.0/30 via 192.168.20.1
```
Persistent via udev: /etc/udev/rules.d/99-lab1-bridges.rules
