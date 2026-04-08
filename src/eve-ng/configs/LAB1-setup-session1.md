# LAB1 – Setup Session 1: Servidor Web Permanente y Acceso del Atacante

## Objetivo

Hacer que el nodo **Server** (Ubuntu, `pebcak`) sirva una página web accesible
permanentemente desde el nodo **Attacker** (Parrot OS) a través del firewall **pfSense**.

Fecha: 2026-04-06

---

## Topología relevante

```
[Attacker – Parrot OS]  192.168.0.x  (red externa, simula internet)
         |
[pfSense – Firewall]
  WAN: 192.168.0.29/24  (DHCP desde router doméstico)
  LAN: 172.16.0.1/30
         |
[VyOS – Router]
  eth0:  172.16.0.2/30
  eth7:  192.168.20.1/24  (Servers LAN)
         |
[Server – Ubuntu 24.04]
  ens3:  192.168.20.50/24
  nginx: puerto 80w
```

El Attacker NO tiene ruta directa al Server. Lo alcanza a través del DNAT del pfSense:
**Attacker → pfSense WAN:80 → DNAT → Server:80**

---

## Pasos realizados para hacer el entorno permanente

### 1. Red persistente en el Server

El Server usaba `netplan` en disco pero `systemd-networkd` no tenía configuración
persistente (vivía en `/run/`, volátil). Se creó el fichero correcto:

```ini
# /etc/systemd/network/10-ens3.network
[Match]
Name=ens3

[Network]
Address=192.168.20.50/24
Gateway=192.168.20.1
DNS=8.8.8.8
DNS=1.1.1.1
```

Con esto, la IP `192.168.20.50` sobrevive reinicios sin intervención manual.

### 2. nginx instalado y habilitado

```bash
apt install -y nginx
systemctl enable --now nginx
```

Página web creada en `/var/www/html/index.html`:

```html
<!DOCTYPE html><html><head><title>LAB1 - Server</title></head>
<body>
  <h1>LAB1 Target Server</h1>
  <p>Host: pebcak | IP: 192.168.20.50</p>
  <p>TFG - Ciberseguridad</p>
</body></html>
```

### 3. DNAT en pfSense (ya configurado)

pfSense tiene regla NAT port forward:
- TCP 80 WAN → 192.168.20.50:80
- TCP 443 WAN → 192.168.20.50:443

### 4. Bridge IPs persistentes en el host EVE-NG

Las interfaces `vnet0_2` y `vnet0_3` (bridges de EVE-NG hacia las redes internas)
perdían su IP al reiniciar. Se creó regla udev:

```bash
# /etc/udev/rules.d/99-lab1-bridges.rules
ACTION=="add", SUBSYSTEM=="net", KERNEL=="vnet0_2", RUN+="/sbin/ip addr add 192.168.20.254/24 dev vnet0_2"
ACTION=="add", SUBSYSTEM=="net", KERNEL=="vnet0_3", RUN+="/sbin/ip addr add 192.168.10.254/24 dev vnet0_3"
```

### 5. Verificación

Desde el Attacker (Firefox en Parrot OS):
- URL: `http://192.168.0.29`
- Resultado: página "LAB1 Target Server" ✅

---

## Pendientes y consideraciones para futuros despliegues

### A. IP pública del firewall debe ser estática

**Problema**: la WAN de pfSense obtiene IP por DHCP del router doméstico. Si cambia,
el Attacker ya no llega al Server sin saber la nueva IP.

**Solución recomendada**: asignar una IP estática a pfSense desde la reserva DHCP del
router (por MAC address), o configurar IP estática directamente en pfSense WAN.

**Cómo hacerlo en pfSense sin que el estudiante lo vea:**
El profesor/administrador debe configurar la IP estática antes de entregar el lab.
Opciones:
1. **Reserva DHCP en el router doméstico**: asignar siempre la misma IP a la MAC de
   la interfaz WAN de pfSense (vtnet1). No requiere cambiar nada en pfSense.
2. **IP estática en pfSense**: via consola VNC (acceso al nodo) → Interfaces → WAN →
   cambiar de DHCP a Static IPv4.

En cualquier caso, el Attacker debería recibir la IP objetivo como parte del enunciado
del lab, no necesita conocer cómo funciona el firewall internamente.

### B. Restricción de acceso a la consola de pfSense para el estudiante

**Problema**: Al hacer clic en el nodo pfSense en EVE-NG, se abre la consola con
acceso completo a la configuración del firewall. El estudiante no debería poder
modificar reglas, NAT, ni interfaces.

**Opciones a estudiar**:
1. **No dar acceso VNC al nodo pfSense**: en EVE-NG se puede configurar qué nodos
   son accesibles. El estudiante solo necesita acceso al Attacker y al PC1.
2. **Instrucciones claras en el enunciado**: indicar explícitamente que pfSense es
   infraestructura del lab y no debe modificarse.
3. **Snapshot del estado**: antes de distribuir el lab, hacer snapshot de pfSense con
   la configuración correcta para poder restaurar si el estudiante lo rompe.
4. **Usuario de solo lectura en pfSense**: crear usuario con permisos de lectura únicamente.

**Decisión pendiente**: definir qué nodos son accesibles para el rol "estudiante" en EVE-NG.

---

## Credenciales del lab (referencia interna, no distribuir)

| Nodo     | Usuario    | Contraseña    | Acceso           |
|----------|------------|---------------|------------------|
| pfSense  | admin      | pfsense       | VNC 32774        |
| VyOS     | vyos       | vyos          | SSH 192.168.20.1 |
| Server   | blackmesa  | !Bl4kM3s$     | SSH 192.168.20.50|
| Attacker | lab1       | L4b1          | VNC 32773        |
| PC1      | skynet     | Sk1n3t        | VNC 32772        |
