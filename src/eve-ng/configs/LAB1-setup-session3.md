# LAB1 – Setup Session 3: Portal PEBCAK, NAT SSH y Restricciones

## Objetivo

Completar el flujo completo del estudiante: descubrimiento web → SSH al servidor → captura de flag → acceso a pfSense.

Fecha: 2026-04-07

---

## Bloque 2: Portal PEBCAK en Server nginx

### index.html (actualizado)

Página visible con branding PEBCAK Corp. Comentario HTML oculto como pista:

```html
<!-- sometimes simplify and search -->
<h1>PEBCAK CORP</h1>
<p class="subtitle">Problem Exists Between Chair And Keyboard</p>
```

### pebcak.html (nuevo)

Página interna con credenciales SSH del servidor:

| Parámetro | Valor |
|---|---|
| Protocol | SSH |
| Host | lab1 |
| User | blackmesa |
| Password | !Bl4kM3s$ |

URL: `http://lab1/pebcak.html`

### flag.txt en el servidor

Fichero en `/home/blackmesa/flag.txt`:

```
FLAG{p3bc4k_s3rv3r_0wn3d}

-- PEBCAK Corp Internal Credentials --
Firewall management access:
  Host     : 172.16.0.1
  Protocol : SSH / Web UI
  User     : admin
  Password : pfsense
```

### SSH con contraseña habilitado en Server

```bash
# /etc/ssh/sshd_config
PasswordAuthentication yes
# Password blackmesa seteado a: !Bl4kM3s$
```

---

## Bloque 4a: NAT SSH en pfSense

Regla NAT port-forward añadida: TCP 22 WAN → Server:22

```
rdr on vtnet1 inet proto tcp from any to 192.168.0.29 port = ssh -> 192.168.20.50
```

Regla firewall WAN pass correspondiente:

```
pass in quick on vtnet1 reply-to (vtnet1 192.168.0.1) inet proto tcp
  from any to 192.168.20.50 port = ssh  [USER_RULE: LAB1-WAN-SSH]
```

### Verificación

```bash
ssh blackmesa@lab1   # desde Attacker (password: !Bl4kM3s$)
ls ~                 # → flag.txt
cat ~/flag.txt       # → FLAG{p3bc4k_s3rv3r_0wn3d} + pfSense creds
```

---

## Bloque 4b: Snapshot pfSense y usuario student

### Snapshot

```bash
# En EVE-NG host:
qemu-img snapshot -c lab1-session2 \
  /opt/unetlab/tmp/0/64c869bb-bdae-4f79-9c38-f126b700b8ca/6/virtioa.qcow2
```

Para restaurar si el estudiante rompe pfSense:
```bash
# Parar el lab en EVE-NG, luego:
qemu-img snapshot -a lab1-session2 \
  /opt/unetlab/tmp/0/.../6/virtioa.qcow2
# Nota: el UUID del tmp cambia con cada apertura del lab.
# Restaurar desde el disco base si es necesario.
```

### Usuario student (read-only)

Usuario `student` / `student` creado en pfSense con permisos limitados
(solo dashboard y login/logout). No puede modificar reglas ni interfaces.

---

## Flujo completo del estudiante (verificado)

```
1. http://lab1            → PEBCAK Corp (Firefox Attacker)
2. Ver fuente HTML        → <!-- sometimes simplify and search -->
3. http://lab1/pebcak.html → blackmesa / !Bl4kM3s$
4. ssh blackmesa@lab1     → Server pebcak (via pfSense NAT TCP 22)
5. ls ~                   → flag.txt
6. cat flag.txt           → FLAG{p3bc4k_s3rv3r_0wn3d} + pfSense 172.16.0.1 admin/pfsense
7. ssh admin@172.16.0.1  → pfSense (desde Server, via VyOS)
```

---

## Estado final del lab (2026-04-07)

| Componente | Estado |
|---|---|
| pfSense WAN IP | Estática `192.168.0.29/24` ✅ |
| DNS `lab1` | pfSense Unbound → 192.168.0.29 ✅ |
| HTTP `http://lab1` | PEBCAK Corp index ✅ |
| HTTP `http://lab1/pebcak.html` | SSH creds blackmesa ✅ |
| SSH `blackmesa@lab1` | Via NAT → Server ✅ |
| `flag.txt` en Server | FLAG + pfSense creds ✅ |
| Snapshot pfSense | `lab1-session2` ✅ |
| Usuario student pfSense | Read-only ✅ |
