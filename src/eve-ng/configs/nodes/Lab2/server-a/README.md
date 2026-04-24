# Server-A-SYNAPSE — Configuración

## Acceso
- SSH: `sshpass -p ubuntu ssh ubuntu@192.168.30.10` (desde EVE-NG host)
- Requiere: bridge vnet0_2 con IP 192.168.30.254/24 activa

## Sistema
- OS: Ubuntu 24.04.3 LTS
- Hostname: server-a-synapse
- IP: 192.168.30.10/24, GW: 192.168.30.1 (VyOS eth1)
- Usuario: ubuntu (sudo NOPASSWD), synapse (Syn@pse2024)

## Aplicación SYNAPSE Intelligence Portal
- Ruta: /opt/synapse/
- Stack: Flask + SQLite + nginx (Docker Compose, 3 contenedores)
- Puerto público: 80 (nginx → flask:5000)

### Contenedores
| Nombre          | Imagen                          | Rol                     |
|-----------------|---------------------------------|-------------------------|
| synapse_flask_1 | python:3.11-slim                | App Flask (puerto 5000) |
| synapse_nginx_1 | nginx:alpine                    | Reverse proxy (80)      |
| synapse_victim  | playwright/python:v1.58.0-noble | Bot víctima (cada 20s)  |

### Arrancar
```bash
cd /opt/synapse
docker compose up -d
```

### Credenciales app
| Usuario | Password          | Rol   |
|---------|-------------------|-------|
| admin   | Admin@Synapse2024 | admin |
| guest   | guest123          | guest |
| monitor | M0nit0r2024       | (en admin_users — creds SSH Server-B) |

### Vulnerabilidades implementadas
1. **XSS almacenado** — /comments → `{{ c.body | safe }}` + cookie sin HttpOnly
2. **Broken auth** — cookie sin firma formato ID:ROLE:USERNAME
3. **SQL Injection** — /search?q= concatenación directa con error SQL visible

### Flags
- `FLAG{synapse_sqli_creds_dumped}` — tabla admin_users, columna flag

## Netplan (ens3)
Ver netplan-ens3.yaml

## Pendiente
- Verificar conectividad outbound a internet (NAT via VyOS → pfSense)
