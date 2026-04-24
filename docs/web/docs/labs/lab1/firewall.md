# LAB1 – pfSense Firewall

pfSense sits at the perimeter between the Homelab LAN (WAN) and the internal VyOS router (LAN). It handles NAT port forwarding, DNS resolution for `lab1`, and SSH management access.

---

## Interfaces

| Interface | Role | IP |
|-----------|------|----|
| vtnet0 | LAN | 172.16.x.x/30 |
| vtnet1 | WAN | 192.168.0.x/24 (static) |

## Access

```bash
# From EVE-NG host (route 172.16.0.0/30 via 192.168.20.1 must exist):
sshpass -p 'pfsense' ssh -o PubkeyAuthentication=no \
  -o PreferredAuthentications=password admin@172.16.x.x

# Web UI:
# http://172.16.x.x  (admin / pfsense)
```

!!! warning "BIOS mode"
    pfSense LAB1 is installed in BIOS mode (SeaBIOS / machine=pc).
    EVE-NG default launcher works correctly — no custom script needed.

## NAT port forward rules

| Rule | Protocol | WAN port | Target |
|------|----------|----------|--------|
| LAB1-HTTP | TCP | 80 | 192.168.20.x:80 |
| LAB1-HTTPS | TCP | 443 | 192.168.20.x:443 |
| LAB1-SSH | TCP | 22 | 192.168.20.x:22 |

All three rules forward WAN traffic on pfSense (192.168.0.x) directly to the Server.

## DNS Resolver (Unbound)

Resolves `lab1` → `192.168.0.x` for clients using pfSense as DNS:

```
local-zone: "lab1." redirect
local-data: "lab1. A 192.168.0.x"
```

- Listens on: `0.0.0.0:53` (all interfaces)
- WAN firewall rule: `pass in quick on vtnet1 proto udp from any to any port 53`

!!! tip "Set Parrot DNS to 192.168.0.x"
    ```bash
    nmcli con mod "Wired connection 1" ipv4.dns "192.168.0.x" ipv4.ignore-auto-dns yes
    nmcli con up "Wired connection 1"
    ```
    After this, `curl http://lab1` resolves to pfSense and NAT forwards to the Server.

## Snapshot

A named snapshot `lab1-session2` exists on the pfSense disk:
```
/opt/unetlab/tmp/0/64c869bb-bdae-4f79-9c38-f126b700b8ca/6/virtioa.qcow2
```
Restore: `qemu-img snapshot -a lab1-session2 <disk>` (with pfSense stopped)
