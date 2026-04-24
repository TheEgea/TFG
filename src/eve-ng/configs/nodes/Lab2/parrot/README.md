# Parrot-Attacker — Estado LAB2

## Estado actual (2026-04-24)
- Nodo corriendo (QEMU), boot desde CD (Parrot OS Security 6.4)
- **Sin IP estática configurada** — F5 pendiente
- Sin SSH server instalado
- ARP: sin respuesta en 10.0.40.10 ni 10.0.40.11

## Acceso actual
- VNC: puerto 32769 del host EVE-NG (display :26869)
- No accesible via SSH desde EVE-NG host

## Configuración pendiente (F5)
1. IP estática: 10.0.40.10/24, GW 10.0.40.1 (VyOS eth2)
2. Instalar openssh-server
3. Herramientas a verificar: nmap, curl, python3, netcat, hashcat/john

## Herramientas usadas en sesiones
- python3 -m http.server 8000  (listener para XSS cookie exfil)
- curl (peticiones HTTP al portal SYNAPSE)
- nc -lvnp 4444  (listener reverse shell)

## Notas
- El nodo arranca desde CD en cada reinicio → configuración no persiste
- Para persistencia: configurar IP via nmcli/NetworkManager antes de cada sesión
  o instalar en disco (F5 completo)
- DHCP server VyOS asigna rango 10.0.40.10-50 — verificar que VyOS DHCP esté activo
