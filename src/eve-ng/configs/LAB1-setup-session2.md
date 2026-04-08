# LAB1 – Setup Session 2: IP Estática pfSense, DNS Hostname y Acceso por Nombre

## Objetivo

Completar la infraestructura del LAB1 para que el estudiante acceda al target usando
el hostname `lab1` en lugar de la IP directa, con pfSense como servidor DNS y con
IP pública estable entre despliegues.

Fecha: 2026-04-07

---

## Cambios realizados

### Bloque 3: IP estática en pfSense WAN

La interfaz WAN de pfSense (`vtnet1`) pasó de DHCP a IP estática:

- **IP:** `192.168.0.29/24`
- **Gateway:** `192.168.0.1`
- Configurado vía consola VNC (pfSense menú > Interfaces > WAN > Static IPv4)

La IP ya no cambia tras reinicios de pfSense.

---

### Bloque 1: pfSense DNS Resolver — hostname `lab1`

pfSense Unbound DNS Resolver configurado para:

1. **Escuchar en la interfaz WAN** (`192.168.0.29:53`), además de las interfaces por defecto.
2. **Permitir consultas** desde `192.168.0.0/24` (red del Attacker).
3. **Resolver `lab1` → `192.168.0.29`** mediante entrada local.

#### Implementación técnica

Configuración añadida vía `custom_options` en pfSense (base64 en `config.xml`):

```
interface: 192.168.0.29
access-control: 192.168.0.0/24 allow
local-zone: "lab1." redirect
local-data: "lab1. A 192.168.0.29"
```

Regla de firewall WAN añadida en pfSense para permitir DNS desde WAN:

```
pass in quick on vtnet1 proto udp from any to any port 53
```

#### Verificación

```bash
# Desde EVE-NG host:
dig +short @192.168.0.29 lab1
# → 192.168.0.29 ✅
```

---

### Attacker: DNS apuntando a pfSense

El nodo Attacker (Parrot OS) configurado para usar pfSense como DNS primario:

```bash
# Ejecutado en el Attacker como root:
NM_CON=$(nmcli -t -f NAME con show --active | head -1)
nmcli con mod "$NM_CON" ipv4.dns 192.168.0.29 ipv4.ignore-auto-dns yes
nmcli con up "$NM_CON"
```

Configuración persistente (NetworkManager almacena en `/etc/NetworkManager/system-connections/`).

#### Verificación

```
Attacker Firefox → http://lab1 → página "LAB1 Target Server" ✅
```

---

### EVE-NG host: ruta persistente a pfSense LAN

Para acceder a pfSense via SSH desde el host EVE-NG (útil para mantenimiento),
se añadió la ruta a la LAN de pfSense/VyOS en el fichero udev de persistencia:

```
# /etc/udev/rules.d/99-lab1-bridges.rules (añadido)
ACTION=="add", SUBSYSTEM=="net", KERNEL=="vnet0_2", RUN+="/sbin/ip route add 172.16.0.0/30 via 192.168.20.1"
```

Esto permite `ssh admin@172.16.0.1` desde el host EVE-NG tras cada reinicio.

---

## Estado actual del lab (2026-04-07)

| Componente | Estado |
|---|---|
| pfSense WAN IP | Estática `192.168.0.29/24` ✅ |
| pfSense DNS Resolver | Escucha en WAN, resuelve `lab1` ✅ |
| Attacker DNS | `192.168.0.29` (persistente via NM) ✅ |
| HTTP chain | `http://lab1` → pfSense DNAT → Server nginx ✅ |
| Ruta EVE-NG → pfSense LAN | Persistente via udev ✅ |

---

## Flujo del estudiante (objetivo final)

```
Attacker → http://lab1 → página index.html
                                  ↓ (pista oculta en HTML)
                           /pebcak.html → FLAG1 + credenciales SSH
                                  ↓
              ssh blackmesa@lab1 → Server (via NAT port 22 pfSense)
                                  ↓
                     desde Server → SSH a pfSense LAN → descubrir PC1
```

---

## Pendientes para próxima sesión

- **Bloque 2**: Crear `pebcak.html` en Server nginx con FLAG1 y credenciales SSH.
  Añadir comentario HTML sutil en `index.html` apuntando a `/pebcak`.
- **Bloque 4 (NAT SSH)**: Regla pfSense NAT TCP 22 WAN → 192.168.20.50:22
  para que `ssh blackmesa@lab1` funcione desde el Attacker.
- **Bloque 4 (student)**: Usuario read-only `student` en pfSense + snapshot.
- **PC1**: Instalar openssh-server via VNC (pendiente de sesiones anteriores).

---

## Acceso a pfSense para mantenimiento

```bash
# Desde EVE-NG host (ruta ya persistente):
sshpass -p 'pfsense' ssh -o StrictHostKeyChecking=no \
  -o PubkeyAuthentication=no -o PreferredAuthentications=password \
  admin@172.16.0.1
```
