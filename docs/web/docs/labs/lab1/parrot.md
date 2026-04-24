# LAB1 – Parrot OS (Attacker)

The Parrot node is the attacker's machine. It sits directly on the Homelab LAN and attacks the Server through pfSense's NAT rules.

---

## Access

- VNC: port 32773 on EVE-NG host
- Credentials: lab1 / L4b1

## Network

| Parameter | Value |
|-----------|-------|
| IP | 192.168.0.x (DHCP from home router) |
| DNS | 192.168.0.x (pfSense — set manually) |

## DNS setup (required before starting)

```bash
nmcli con mod "Wired connection 1" \
  ipv4.dns "192.168.0.x" \
  ipv4.ignore-auto-dns yes
nmcli con up "Wired connection 1"
nslookup lab1   # should resolve to 192.168.0.x
```

## Tools used in Lab1

| Tool | Purpose |
|------|---------|
| Firefox | Browse `http://lab1`, view page source |
| ssh client | `ssh blackmesa@lab1` after finding creds |

## Attack flow

```bash
# 1. Browse and find the hidden page
firefox http://lab1        # → view source → <!-- sometimes simplify and search -->
firefox http://lab1/pebcak.html  # → blackmesa / !Bl4kM3s$

# 2. SSH via pfSense DNAT (TCP 22 → 192.168.20.x)
ssh blackmesa@lab1

# 3. Get the flag
cat ~/flag.txt
```
