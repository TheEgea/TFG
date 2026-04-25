# PC1-LAB1 (Ubuntu Desktop) -- Configuration

## Access
- VNC: port 32772 on EVE-NG host (localhost:32772)
- User: skynet / Sk1n3t (or Sk1n3T)

## Network
- IP: 192.168.10.50/24, GW: 192.168.10.5 (VyOS eth6)
- Note: VyOS eth6 has IP .5, not .1
- Configuration: NetworkManager

```bash
nmcli con mod "Wired connection 1" \
  ipv4.method manual \
  ipv4.addresses 192.168.10.50/24 \
  ipv4.gateway 192.168.10.5 \
  ipv4.dns 8.8.8.8 \
  ipv4.ignore-auto-dns yes
nmcli con up "Wired connection 1"
```

## Notes
- SSH not configured (openssh-server pending installation)
- Internal node on Users LAN (192.168.10.0/24)
- Secondary role in Lab1 -- not part of the main student workflow
