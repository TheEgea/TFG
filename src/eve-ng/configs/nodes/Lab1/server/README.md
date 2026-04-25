# Server-LAB1 (PEBCAK Corp) -- Configuration

## Access
- SSH: sshpass ssh blackmesa@192.168.20.50 (from EVE-NG host)
- Requires: bridge vnet0_2 with IP 192.168.20.254/24 active

## System
- OS: Ubuntu 24.04 LTS
- Hostname: pebcak
- IP: 192.168.20.50/24, GW: 192.168.20.1 (VyOS eth7)
- User: blackmesa (sudo NOPASSWD)

## Services
- nginx: active and enabled on boot, port 80
- SSH: PasswordAuthentication yes, port 22
- Network: systemd-networkd (/etc/systemd/network/10-ens3.network)

## Web files (/var/www/html/)
| File | Description |
|------|-------------|
| index.html | PEBCAK Corp portal -- HTML comment with hint |
| pebcak.html | Hidden page with SSH credentials in cleartext |

## Flag
- /home/blackmesa/flag.txt -- FLAG{p3bc4k_s3rv3r_0wn3d} + pfSense creds (admin/pfsense @ 172.16.0.1)

## Authorized keys
- eve-ng-claude + tfg-user in /home/blackmesa/.ssh/authorized_keys

## Student workflow
1. http://lab1 -> view HTML source -> find hint comment
2. http://lab1/pebcak.html -> get SSH credentials
3. ssh blackmesa@lab1 (via pfSense DNAT TCP 22) -> cat ~/flag.txt
4. pfSense creds in flag -> ssh admin@172.16.0.1 from server

## Relevant pfSense NAT
- DNAT TCP 80 WAN -> 192.168.20.50:80
- DNAT TCP 22 WAN -> 192.168.20.50:22
