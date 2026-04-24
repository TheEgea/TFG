# pfSense-LAB1 — Configuración

## Acceso
- Web UI: `http://172.16.0.1` (desde EVE-NG host via ruta 172.16.0.0/30)
- SSH: `sshpass -p 'pfsense' ssh -o PubkeyAuthentication=no -o PreferredAuthentications=password admin@172.16.0.1`
- Requiere ruta: `ip route add 172.16.0.0/30 via 192.168.20.1` (via vnet0_2)

## Interfaces
| Interfaz | IP              | Red           | Descripción          |
|----------|-----------------|---------------|----------------------|
| vtnet0   | 172.16.0.1/30   | Net-Link      | LAN → VyOS eth0      |
| vtnet1   | 192.168.0.29/24 | Homelab LAN   | WAN (IP estática)    |

## Credenciales
- admin / pfsense

## NAT rules (WAN → Server)
| Rule | Proto | WAN port | Destino interno |
|------|-------|----------|-----------------|
| LAB1-HTTP | TCP | 80 | 192.168.20.50:80 |
| LAB1-HTTPS | TCP | 443 | 192.168.20.50:443 |
| LAB1-SSH | TCP | 22 | 192.168.20.50:22 |

## DNS Resolver (Unbound)
- Escucha en: 192.168.0.29 (WAN) + 172.16.0.1 (LAN)
- `local-zone: "lab1." redirect`
- `local-data: "lab1. A 192.168.0.29"`
- Regla firewall WAN: pass UDP port 53 desde cualquier origen

## Notas importantes
- **IP WAN estática**: 192.168.0.29/24 (fija en config.xml, no DHCP)
- **Snapshot**: `lab1-session2` en `/opt/unetlab/tmp/0/64c869bb-.../6/virtioa.qcow2`
- **Arranque**: usa SeaBIOS (machine=pc) — instalación BIOS, no UEFI
