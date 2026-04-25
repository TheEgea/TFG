# Parrot-LAB1 (Attacker) -- Configuration

## Access
- VNC: port 32773 on EVE-NG host (localhost:32773)
- User: lab1 / L4b1

## Network
- Interface: connected to pnet0 (cloud NAT -> Homelab LAN 192.168.0.0/24)
- IP: DHCP from home router (192.168.0.x)
- DNS configured: pfSense LAB1 via NetworkManager

## Lab DNS
```bash
# Persistent configuration (NetworkManager)
nmcli con mod "Wired connection 1" ipv4.dns "192.168.0.29" ipv4.ignore-auto-dns yes
nmcli con up "Wired connection 1"
```
This allows resolving lab1 to the pfSense WAN IP.

## Tools used in Lab1
- Firefox -- web browsing to the PEBCAK portal
- SSH client -- connection to lab1 (blackmesa@lab1)

## Role in the lab
External attacker node. Accesses the PEBCAK Corp server through pfSense:
- HTTP port 80 -> index.html, pebcak.html
- SSH port 22 -> login as blackmesa, retrieve flag
