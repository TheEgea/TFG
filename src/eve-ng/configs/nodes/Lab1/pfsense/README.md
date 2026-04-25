# pfSense-LAB1 -- Configuration

## Access
- Web UI: http://172.16.0.1 (from EVE-NG host via route 172.16.0.0/30)
- SSH: sshpass -p pfsense ssh -o PubkeyAuthentication=no -o PreferredAuthentications=password admin@172.16.0.1
- Requires route: ip route add 172.16.0.0/30 via 192.168.20.1 (via vnet0_2)

## Interfaces
| Interface | IP            | Network     | Description       |
|-----------|---------------|-------------|-------------------|
| vtnet0    | 172.16.0.1/30 | Net-Link    | LAN -> VyOS eth0  |
| vtnet1    | static        | Homelab LAN | WAN               |

## Credentials
- admin / pfsense

## NAT rules (WAN -> Server)
| Rule       | Proto | WAN port | Internal destination |
|------------|-------|----------|----------------------|
| LAB1-HTTP  | TCP   | 80       | 192.168.20.50:80     |
| LAB1-HTTPS | TCP   | 443      | 192.168.20.50:443    |
| LAB1-SSH   | TCP   | 22       | 192.168.20.50:22     |

## DNS Resolver (Unbound)
- Listens on: WAN + LAN interfaces
- local-zone: lab1. redirect
- local-data: lab1. A (WAN IP)
- WAN firewall rule: pass UDP port 53 from any source

## Important notes
- Static WAN IP fixed in config.xml, not DHCP
- Snapshot: lab1-session2
- Boot: uses SeaBIOS (machine=pc) -- BIOS install, not UEFI
