# Lab4 -- CipherStrike (Cryptography & Steganography CTF)

## Nodes

| Folder | Node | IP | Role |
|--------|------|----|------|
| vyos/ | VyOS router | eth0=192.168.1.2, eth1-4=10.10.x.1 | Inter-zone router |
| pfsense/ | pfSense CE | WAN DHCP, LAN 192.168.1.1 | Perimeter firewall |
| serverA/ | Ubuntu 24.04 | 10.10.1.10 | Crypto challenges A1-A5 |
| serverB/ | Ubuntu 24.04 | 10.10.2.10 | Stego challenges B1-B5 |
| serverC/ | Ubuntu 24.04 | 10.10.3.10 | Mix hard challenges C1-C4 |
| defender/ | Ubuntu Desktop | 10.10.4.10 | Monitoring workstation |

## CTF Gate Mechanism
```
MD5(A5_flag + B5_flag)[:12] = ServerC password (fa681b59855d)
```

## All 14 challenges verified end-to-end on 2026-05-09
