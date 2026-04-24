# Parrot-LAB1 (Attacker) — Configuración

## Acceso
- VNC: puerto 32773 en EVE-NG host (`localhost:32773`)
- Usuario: lab1 / L4b1

## Red
- Interfaz: conectada a pnet0 (cloud NAT → Homelab LAN 192.168.0.0/24)
- IP: DHCP desde router doméstico (192.168.0.x)
- DNS configurado: 192.168.0.29 (pfSense LAB1) via NetworkManager

## DNS del lab
```bash
# Configuración persistente (NetworkManager)
nmcli con mod "Wired connection 1" ipv4.dns "192.168.0.29" ipv4.ignore-auto-dns yes
nmcli con up "Wired connection 1"
```
Esto permite resolver `lab1` → 192.168.0.29 (pfSense WAN).

## Herramientas usadas en Lab1
- Firefox — navegación web al portal PEBCAK
- SSH client — conexión a lab1 (blackmesa@lab1)

## Rol en el lab
Nodo atacante externo. Accede al servidor PEBCAK Corp a través de pfSense (WAN 192.168.0.29):
- HTTP port 80 → index.html, pebcak.html
- SSH port 22 → login como blackmesa, obtención de flag
