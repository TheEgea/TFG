# LAB1 – PC1 (Ubuntu Desktop)

PC1 is an internal user workstation on the Users LAN segment. It is not part of the primary attack chain but represents an internal user that could be targeted in extended exercises.

---

## Access

- VNC: port 32772 on EVE-NG host
- Credentials: skynet / Sk1n3t

## Network configuration

| Parameter | Value |
|-----------|-------|
| IP | 192.168.10.x/24 |
| Gateway | 192.168.10.x (VyOS eth6) |
| DNS | 8.8.8.8 |
| Manager | NetworkManager |

```bash
nmcli con mod "Wired connection 1" \
  ipv4.method manual \
  ipv4.addresses 192.168.10.x/24 \
  ipv4.gateway 192.168.10.x \
  ipv4.dns 8.8.8.8 \
  ipv4.ignore-auto-dns yes
nmcli con up "Wired connection 1"
```

!!! note
    SSH server not installed. Access only via VNC.
