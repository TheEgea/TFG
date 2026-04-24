# VyOS-LAB2 — Configuración

## Acceso
- Consola: `ssh eve-ng "telnet localhost 32770"` (usuario: vyos / vyos)
- SSH: **no configurado** — pendiente añadir bloque `service ssh` en config.boot
- Desde EVE-NG host cuando SSH activo: `sshpass -p vyos ssh vyos@192.168.30.1`

## Interfaces
| Interfaz | IP              | Red           | Descripción          |
|----------|-----------------|---------------|----------------------|
| eth0     | 172.16.1.2/30   | Net-Link      | Uplink a pfSense LAN |
| eth1     | 192.168.30.1/24 | Net-DMZ       | Gateway DMZ servers  |
| eth2     | 10.0.40.1/24    | Net-Attackers | Gateway Parrot       |
| eth3     | —               | —             | Sin uso              |

## NAT (source)
- Rule 10: 10.0.40.0/24 → masquerade saliendo por eth0
- Rule 20: 192.168.30.0/24 → masquerade saliendo por eth0

## Routing
- Default route: 0.0.0.0/0 via 172.16.1.1 (pfSense LAN)

## DNS Forwarding
- Escucha en: 192.168.30.1, 10.0.40.1
- Permite desde: 192.168.30.0/24, 10.0.40.0/24

## Static host mappings
- attacker.lab2.internal → 10.0.40.10
- server-a.lab2.internal → 192.168.30.10
- server-b.lab2.internal → 192.168.30.20
- router.lab2.internal   → 192.168.30.1

## Pendiente
- Añadir `service ssh` para acceso SSH
- Verificar DHCP server para red Net-Attackers (Parrot sin IP actualmente)

## Nota post-reboot
Los bridges del host EVE-NG pierden sus IPs al reiniciar EVE-NG host.
Ejecutar: `bash /usr/local/bin/lab2-bridges-up.sh`
