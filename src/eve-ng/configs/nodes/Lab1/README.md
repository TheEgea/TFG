# LAB1 — Reconnaissance (PEBCAK Corp)

Configuraciones exportadas del lab EVE-NG en producción.

## Topología

```
Internet / Homelab LAN (192.168.0.0/24)
        |
[Parrot — Attacker]  192.168.0.x  (pnet0 cloud NAT)
        |
[pfSense — Firewall]
  WAN vtnet1: 192.168.0.29/24  (estática)
  LAN vtnet0: 172.16.0.1/30
        |
[VyOS — Router]
  eth0:  172.16.0.2/30    (OUTSIDE → pfSense)
  eth6:  192.168.10.5/24  (Users LAN → PC1)
  eth7:  192.168.20.1/24  (Servers LAN → Server)
        |
  ┌─────┴─────┐
[Server]     [PC1]
192.168.20.50  192.168.10.50
nginx:80       (sin SSH)
hostname: pebcak
```

## Nodos

| Carpeta | Nodo | IP | Rol |
|---------|------|----|-----|
| `pfsense/` | pfSense CE | 192.168.0.29 (WAN), 172.16.0.1 (LAN) | Firewall perimetral, NAT, DNS |
| `vyos/` | VyOS router | 172.16.0.2, 192.168.10.5, 192.168.20.1 | Router interno |
| `server/` | Ubuntu 24.04 | 192.168.20.50 | Target — PEBCAK Corp nginx |
| `pc1/` | Ubuntu Desktop | 192.168.10.50 | Usuario interno |
| `parrot/` | Parrot OS 6.4 | 192.168.0.x (DHCP) | Atacante |

## Flujo del estudiante

```
1. http://lab1               → PEBCAK Corp (Firefox en Parrot)
2. Fuente HTML               → <!-- sometimes simplify and search -->
3. http://lab1/pebcak.html  → blackmesa / !Bl4kM3s$
4. ssh blackmesa@lab1        → Server (via pfSense DNAT TCP 22)
5. cat ~/flag.txt            → FLAG{p3bc4k_s3rv3r_0wn3d} + pfSense creds
6. ssh admin@172.16.0.1     → pfSense (desde Server via VyOS)
```

## Restaurar bridges EVE-NG host (tras reboot)

```bash
ip addr add 192.168.20.254/24 dev vnet0_2
ip addr add 192.168.10.254/24 dev vnet0_3
ip route add 172.16.0.0/30 via 192.168.20.1
```
Persistente via udev: `/etc/udev/rules.d/99-lab1-bridges.rules`
