# VyOS-LAB1 — Configuración

## Acceso
- SSH: `sshpass -p vyos ssh vyos@192.168.20.1` (desde EVE-NG host, con bridge vnet0_2 activo)

## Interfaces
| Interfaz | IP              | Red           | Descripción           |
|----------|-----------------|---------------|-----------------------|
| eth0     | 172.16.0.2/30   | Net-Link      | Uplink a pfSense LAN  |
| eth6     | 192.168.10.5/24 | Users LAN     | Gateway PC1           |
| eth7     | 192.168.20.1/24 | Servers LAN   | Gateway Server        |

## NAT (source)
- Rule 50: exclude 192.168.20.0/24 → 192.168.0.0/24 (no masquerade)
- Rule 51: exclude 192.168.10.0/24 → 192.168.0.0/24 (no masquerade)
- Rule 100: 192.168.20.0/24 → masquerade saliendo por eth0
- Rule 110: 192.168.10.0/24 → masquerade saliendo por eth0

## Routing
- Default route: 0.0.0.0/0 via 172.16.0.1 (pfSense LAN)

## Bridge IPs EVE-NG host (persistentes via udev)
```bash
ip addr add 192.168.20.254/24 dev vnet0_2
ip addr add 192.168.10.254/24 dev vnet0_3
ip route add 172.16.0.0/30 via 192.168.20.1
```
Regla udev: /etc/udev/rules.d/99-lab1-bridges.rules
