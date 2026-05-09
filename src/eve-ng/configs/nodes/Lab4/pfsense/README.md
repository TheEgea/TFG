# pfSense -- Lab4 CipherStrike Perimeter Firewall

## Credentials
- User: `admin` / Password: `pfsense`
- WebGUI: http://192.168.1.1 (from LAN)
- Console: telnet EVE-NG:32772

## Interfaces

| Interface | IP | Role |
|-----------|----|------|
| WAN (em0) | 192.168.0.18 (DHCP) | Internet uplink |
| LAN (em1) | 192.168.1.1/24 | Internal LAN to VyOS |

## Notes
- NAT masquerade on WAN for outbound internet
- DNS resolver enabled (Unbound)
- WAN IP is DHCP -- may change between sessions
