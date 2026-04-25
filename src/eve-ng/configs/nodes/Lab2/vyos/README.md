# VyOS-LAB2 -- Configuration

## Access
- Console: ssh eve-ng then telnet localhost 32770 (user: vyos / vyos)
- SSH: not configured -- pending: add service ssh block to config.boot
- From EVE-NG host when SSH active: sshpass -p vyos ssh vyos@192.168.30.1

## Interfaces
| Interface | IP              | Network       | Description           |
|-----------|-----------------|---------------|-----------------------|
| eth0      | 172.16.1.2/30   | Net-Link      | Uplink to pfSense LAN |
| eth1      | 192.168.30.1/24 | Net-DMZ       | DMZ servers gateway   |
| eth2      | 10.0.40.1/24    | Net-Attackers | Parrot gateway        |
| eth3      | unused          | --            | --                    |

## NAT (source)
- Rule 10: 10.0.40.0/24 -> masquerade out eth0
- Rule 20: 192.168.30.0/24 -> masquerade out eth0

## Routing
- Default route: 0.0.0.0/0 via 172.16.1.1 (pfSense LAN)

## DNS Forwarding
- Listens on: 192.168.30.1, 10.0.40.1
- Allowed from: 192.168.30.0/24, 10.0.40.0/24

## Static host mappings
- attacker.lab2.internal  -> 10.0.40.10
- server-a.lab2.internal  -> 192.168.30.10
- server-b.lab2.internal  -> 192.168.30.20
- router.lab2.internal    -> 192.168.30.1

## Pending
- Add service ssh for SSH access
- Verify DHCP server for Net-Attackers (Parrot currently without IP)

## Post-reboot note
EVE-NG host bridges lose their IPs on restart.
Run: bash /usr/local/bin/lab2-bridges-up.sh
