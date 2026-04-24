# Server-LAB1 (PEBCAK Corp) — Configuración

## Acceso
- SSH: `sshpass -p '!Bl4kM3s$' ssh blackmesa@192.168.20.50` (desde EVE-NG host)
- Requiere: bridge vnet0_2 con IP 192.168.20.254/24 activa

## Sistema
- OS: Ubuntu 24.04 LTS
- Hostname: pebcak
- IP: 192.168.20.50/24, GW: 192.168.20.1 (VyOS eth7)
- Usuario: blackmesa (sudo NOPASSWD), password: `!Bl4kM3s$`

## Servicios
- **nginx**: activo y habilitado en boot, puerto 80
- **SSH**: PasswordAuthentication yes, puerto 22
- **Red**: systemd-networkd (`/etc/systemd/network/10-ens3.network`)

## Archivos web (/var/www/html/)
| Archivo | Descripción |
|---------|-------------|
| `index.html` | PEBCAK Corp portal — HTML comment con pista (`<!-- sometimes simplify and search -->`) |
| `pebcak.html` | Página "hidden" con credenciales SSH en claro |

## Flag
- `/home/blackmesa/flag.txt` — `FLAG{p3bc4k_s3rv3r_0wn3d}` + pfSense creds (admin/pfsense @ 172.16.0.1)

## Authorized keys
- `eve-ng-claude` + `tfg-user` en `/home/blackmesa/.ssh/authorized_keys`

## Flujo del estudiante
1. `http://lab1` → ver source HTML → `<!-- sometimes simplify and search -->`
2. `http://lab1/pebcak.html` → blackmesa / !Bl4kM3s$
3. `ssh blackmesa@lab1` (via pfSense DNAT TCP 22) → `cat ~/flag.txt`
4. Credenciales pfSense en flag → `ssh admin@172.16.0.1` desde server

## NAT pfSense relevante
- DNAT TCP 80 WAN (192.168.0.29) → 192.168.20.50:80
- DNAT TCP 22 WAN → 192.168.20.50:22
