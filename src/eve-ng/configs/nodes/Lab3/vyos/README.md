# VyOS-LAB3 -- Configuration

## Access
- Console: `ssh eve-ng` then `telnet localhost 32770`
- Credentials: `vyos` / `vyos`
- SSH (when running): `sshpass -p vyos ssh vyos@192.168.50.1`

## Interfaces

| Interface | IP              | Network       | Description           |
|-----------|-----------------|---------------|-----------------------|
| eth0      | 172.16.2.2/30   | Net-Link      | Uplink to pfSense LAN |
| eth1      | 192.168.50.1/24 | Net-Servers   | Server-Web gateway    |
| eth2      | 192.168.60.1/24 | Net-Internal  | Server-DB gateway     |

## NAT (source masquerade)
- Rule 10: `192.168.50.0/24` out eth0 -> masquerade
- Rule 20: `192.168.60.0/24` out eth0 -> masquerade

## Routing
- Default: `0.0.0.0/0` via `172.16.2.1` (pfSense LAN)

## Important Note
If the VyOS node is recreated in EVE-NG, the qcow2 overlay resets (196K empty).
Re-run all `set` commands below and `commit` + `save`.

## Post-reboot bridge restore
```bash
# EVE-NG host -- bridges set by udev on interface UP event
# Manual restore if needed:
ip addr add 192.168.50.254/24 dev vnet0_2
ip addr add 192.168.60.254/24 dev vnet0_3
```
