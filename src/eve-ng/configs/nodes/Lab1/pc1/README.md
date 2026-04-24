# PC1-LAB1 (Ubuntu Desktop) — Configuración

## Acceso
- VNC: puerto 32772 en EVE-NG host (`localhost:32772`)
- Usuario: skynet / Sk1n3t (o Sk1n3T)

## Red
- IP: 192.168.10.50/24, GW: 192.168.10.5 (VyOS eth6 — **nota: VyOS eth6 tiene IP .5, no .1**)
- Configuración: NetworkManager

```bash
nmcli con mod "Wired connection 1" \
  ipv4.method manual \
  ipv4.addresses 192.168.10.50/24 \
  ipv4.gateway 192.168.10.5 \
  ipv4.dns 8.8.8.8 \
  ipv4.ignore-auto-dns yes
nmcli con up "Wired connection 1"
```

## Notas
- SSH no configurado (openssh-server pendiente de instalar)
- Nodo interno en Users LAN (192.168.10.0/24)
- Rol secundario en Lab1 — no forma parte del flujo principal del estudiante
