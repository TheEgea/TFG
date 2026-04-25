# VyOS-LAB1 -- Configuration

## Access
- SSH: sshpass -p vyos ssh vyos@192.168.20.1 (from EVE-NG host, with bridge vnet0_2 active)

## Interfaces
| Interface | IP              | Network     | Description           |
|-----------|-----------------|-------------|-----------------------|
| eth0      | 172.16.0.2/30   | Net-Link    | Uplink to pfSense LAN |
| eth6      | 192.168.10.5/24 | Users LAN   | PC1 gateway           |
| eth7      | 192.168.20.1/24 | Servers LAN | Server gateway        |

## NAT (source)
- Rule 50: exclude 192.168.20.0/24 -> 192.168.0.0/24 (no masquerade)
- Rule 51: exclude 192.168.10.0/24 -> 192.168.0.0/24 (no masquerade)
- Rule 100: 192.168.20.0/24 -> masquerade out eth0
- Rule 110: 192.168.10.0/24 -> masquerade out eth0

## Routing
- Default route: 0.0.0.0/0 via 172.16.0.1 (pfSense LAN)

## EVE-NG host bridge IPs (persistent via udev)
```bash
ip addr add 192.168.20.254/24 dev vnet0_2
ip addr add 192.168.10.254/24 dev vnet0_3
ip route add 172.16.0.0/30 via 192.168.20.1
```
udev rule: /etc/udev/rules.d/99-lab1-bridges.rules
