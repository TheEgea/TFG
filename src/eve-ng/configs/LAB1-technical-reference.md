# LAB1 – Technical Reference

> **Status:** Fully operational
> **Last updated:** 2026-04-08
> **Deployment:** Homelab — EVE-NG on Proxmox VE (192.168.0.133), homelab LAN 192.168.0.0/24
> **Note:** IPs reflect the current homelab deployment. Adapt `192.168.0.x` ranges to your network when redeploying.

---

## Topology

```
Homelab LAN (192.168.0.0/24)
           |
  [Attacker – Parrot OS]
    pnet0 → 192.168.0.x (DHCP from home router)
    DNS → 192.168.0.29 (pfSense Unbound)
           |
  ┌────────────────────┐
  │  pfSense CE 2.7.2  │  node 6 in EVE-NG
  │  WAN vtnet1: 192.168.0.29/24  gw 192.168.0.1  (static)
  │  LAN vtnet0: 172.16.0.1/30
  └────────────────────┘
           |
  ┌────────────────────┐
  │  VyOS (rolling)    │  node 1 in EVE-NG
  │  eth0:  172.16.0.2/30    ← OUTSIDE (pfSense LAN)
  │  eth6:  192.168.10.5/24  ← Users LAN
  │  eth7:  192.168.20.1/24  ← Servers LAN
  └────────────────────┘
           |
    ┌──────┴──────┐
[Server]        [PC1]
Ubuntu 24.04    Ubuntu Desktop 24.04
192.168.20.50   192.168.10.50
nginx :80       (SSH pending)
host: pebcak
```

---

## Network addressing

| Node | Interface | IP | Subnet | Role |
|------|-----------|----|--------|------|
| pfSense | vtnet1 (WAN) | 192.168.0.29 | /24 | Homelab LAN — student entry point |
| pfSense | vtnet0 (LAN) | 172.16.0.1 | /30 | Link to VyOS |
| VyOS | eth0 (OUTSIDE) | 172.16.0.2 | /30 | Link to pfSense |
| VyOS | eth6 | 192.168.10.5 | /24 | Users LAN gateway |
| VyOS | eth7 | 192.168.20.1 | /24 | Servers LAN gateway |
| Server | ens3 | 192.168.20.50 | /24 | Target web + SSH server |
| PC1 | ens3 | 192.168.10.50 | /24 | Target workstation |
| Attacker | pnet0 | DHCP (192.168.0.x) | /24 | Pentesting node |
| EVE-NG host | vnet0_2 | 192.168.20.254 | /24 | Admin access to Servers LAN |
| EVE-NG host | vnet0_3 | 192.168.10.254 | /24 | Admin access to Users LAN |

---

## EVE-NG host — persistent bridge config

The EVE-NG host needs IPs on the internal bridges and a route to pfSense LAN
to allow SSH admin access after every reboot.

**File:** `/etc/udev/rules.d/99-lab1-bridges.rules`

```bash
ACTION=="add", SUBSYSTEM=="net", KERNEL=="vnet0_2", RUN+="/sbin/ip addr add 192.168.20.254/24 dev vnet0_2"
ACTION=="add", SUBSYSTEM=="net", KERNEL=="vnet0_3", RUN+="/sbin/ip addr add 192.168.10.254/24 dev vnet0_3"
ACTION=="add", SUBSYSTEM=="net", KERNEL=="vnet0_2", RUN+="/sbin/ip route add 172.16.0.0/30 via 192.168.20.1"
```

> The route `172.16.0.0/30 via 192.168.20.1` allows `ssh admin@172.16.0.1` directly
> from the EVE-NG host without going through the homelab LAN.

**Verify after reboot:**

```bash
ip addr show vnet0_2   # should show 192.168.20.254/24
ip route | grep 172.16 # should show 172.16.0.0/30 via 192.168.20.1
```

---

## pfSense CE 2.7.2

### Access from EVE-NG host

```bash
sshpass -p 'pfsense' ssh -o StrictHostKeyChecking=no \
  -o PubkeyAuthentication=no -o PreferredAuthentications=password \
  admin@172.16.0.1
```

VNC console: port 32774 on EVE-NG host.

### Interface assignment

| pfSense interface | QEMU device | IP | Mode |
|-------------------|-------------|----|------|
| WAN | vtnet1 | 192.168.0.29/24 | Static |
| LAN | vtnet0 | 172.16.0.1/30 | Static |

> Interface order: pfSense assigns in QEMU presentation order.
> vtnet0 = first NIC (e0 in EVE-NG) → LAN
> vtnet1 = second NIC (e1 in EVE-NG) → WAN

### Static routes (config.xml)

| Network | Gateway | Purpose |
|---------|---------|---------|
| 192.168.20.0/24 | 172.16.0.2 (VyOS) | Reach Server VLAN |
| 192.168.10.0/24 | 172.16.0.2 (VyOS) | Reach Users VLAN |

### NAT — port forwards (WAN → Server)

| Protocol | WAN port | Target | Description |
|----------|----------|--------|-------------|
| TCP | 80 | 192.168.20.50:80 | HTTP → nginx (LAB1-HTTP) |
| TCP | 443 | 192.168.20.50:443 | HTTPS → Server (LAB1-HTTPS) |
| TCP | 22 | 192.168.20.50:22 | SSH → Server (LAB1-SSH) |

FreeBSD `pf` evaluates filter rules **after** `rdr` (post-NAT destination).
Pass rules must match the **translated** destination (192.168.20.50), not the WAN IP.

### Firewall — WAN pass rules

```
pass in quick on vtnet1 tcp from any to 192.168.20.50 port 80  keep state  [LAB1-HTTP]
pass in quick on vtnet1 tcp from any to 192.168.20.50 port 443 keep state  [LAB1-HTTPS]
pass in quick on vtnet1 tcp from any to 192.168.20.50 port 22  keep state  [LAB1-WAN-SSH]
pass in quick on vtnet1 udp from any to any port 53                        [LAB1-DNS-WAN]
```

> `blockpriv` and `blockbogons` are **disabled** on WAN — the Attacker uses a
> private homelab IP and would be blocked otherwise.

### DNS Resolver — Unbound (hostname `lab1`)

pfSense Unbound configured to resolve `lab1 → 192.168.0.29` for clients on the
homelab LAN (192.168.0.0/24).

**Custom options** stored as base64 in `config.xml`
(System → Advanced → DNS Resolver → Custom options):

```
interface: 192.168.0.29
access-control: 192.168.0.0/24 allow
local-zone: "lab1." redirect
local-data: "lab1. A 192.168.0.29"
```

> **Caveat — Unbound startup path:**
> Always start/reload via pfSense's internal mechanism, not with
> `service unbound start` directly. The system service reads
> `/usr/local/etc/unbound/unbound.conf` (wrong), while pfSense generates
> its runtime config at `/var/unbound/unbound.conf` (correct).
> To reload without rebooting: `unbound-control -c /var/unbound/unbound.conf reload`

> **Caveat — base64 encoding:**
> The `custom_options` field in config.xml is base64-encoded. If editing via
> shell, always decode → edit → re-encode. Writing raw text corrupts the field.

### Users

| User | Password | Role |
|------|----------|------|
| admin | pfsense | Full admin |
| student | student | Read-only dashboard (no config access) |

### Snapshot

```bash
# Create (lab stopped):
qemu-img snapshot -c lab1-session2 \
  /opt/unetlab/tmp/0/64c869bb-bdae-4f79-9c38-f126b700b8ca/6/virtioa.qcow2

# Restore (lab stopped):
qemu-img snapshot -a lab1-session2 \
  /opt/unetlab/tmp/0/<UUID>/6/virtioa.qcow2
```

> **Note:** The UUID in `/opt/unetlab/tmp/0/<UUID>/` is fixed while the lab file
> exists. It changes only if the lab is deleted and re-imported.

---

## VyOS (rolling)

### Access

```bash
sshpass -p vyos ssh -o StrictHostKeyChecking=no vyos@192.168.20.1
```

VNC console: port 32771 (node 1 in EVE-NG).

### Full configuration

```bash
configure

# Interfaces
set interfaces ethernet eth0 address '172.16.0.2/30'
set interfaces ethernet eth0 description 'OUTSIDE'
set interfaces ethernet eth6 address '192.168.10.5/24'
set interfaces ethernet eth6 description 'Users-LAN'
set interfaces ethernet eth7 address '192.168.20.1/24'
set interfaces ethernet eth7 description 'Server-LAN'

# Default route
set protocols static route 0.0.0.0/0 next-hop 172.16.0.1

# SSH
set service ssh

# DNAT — port forwarding inbound (eth0)
set nat destination rule 10 description 'HTTP-to-Server'
set nat destination rule 10 inbound-interface name 'eth0'
set nat destination rule 10 protocol 'tcp'
set nat destination rule 10 destination port '80'
set nat destination rule 10 translation address '192.168.20.50'
set nat destination rule 10 translation port '80'

set nat destination rule 11 description 'HTTPS-to-Server'
set nat destination rule 11 inbound-interface name 'eth0'
set nat destination rule 11 protocol 'tcp'
set nat destination rule 11 destination port '443'
set nat destination rule 11 translation address '192.168.20.50'
set nat destination rule 11 translation port '443'

# SNAT exclude — prevent masquerade of replies toward homelab LAN
# (avoids breaking pfSense connection state tracking)
set nat source rule 50 exclude
set nat source rule 50 outbound-interface name 'eth0'
set nat source rule 50 source address '192.168.20.0/24'
set nat source rule 50 destination address '192.168.0.0/24'

set nat source rule 51 exclude
set nat source rule 51 outbound-interface name 'eth0'
set nat source rule 51 source address '192.168.10.0/24'
set nat source rule 51 destination address '192.168.0.0/24'

# SNAT masquerade — internet access for internal segments
set nat source rule 100 outbound-interface name 'eth0'
set nat source rule 100 source address '192.168.10.0/24'
set nat source rule 100 translation address 'masquerade'

set nat source rule 300 outbound-interface name 'eth0'
set nat source rule 300 source address '192.168.20.0/24'
set nat source rule 300 translation address 'masquerade'

# Firewall — allow HTTP/HTTPS forwarding to Server
set firewall ipv4 forward filter rule 10 action 'accept'
set firewall ipv4 forward filter rule 10 description 'Allow-HTTP-to-Server'
set firewall ipv4 forward filter rule 10 destination address '192.168.20.50'
set firewall ipv4 forward filter rule 10 destination port '80'
set firewall ipv4 forward filter rule 10 protocol 'tcp'

set firewall ipv4 forward filter rule 11 action 'accept'
set firewall ipv4 forward filter rule 11 description 'Allow-HTTPS-to-Server'
set firewall ipv4 forward filter rule 11 destination address '192.168.20.50'
set firewall ipv4 forward filter rule 11 destination port '443'
set firewall ipv4 forward filter rule 11 protocol 'tcp'

commit
save
exit
```

> **Why exclude rules 50/51?**
> Without them, VyOS masquerades reply traffic from Server toward the homelab LAN,
> changing the source IP. pfSense then drops the reply because its state table
> expects the original Server IP (192.168.20.50), not the VyOS WAN IP (172.16.0.2).

---

## Server — Ubuntu Server 24.04

**Hostname:** `pebcak`
**EVE-NG node:** 3 | VNC port: 32771

### Access from EVE-NG host

```bash
ssh -i ~/.ssh/id_ed25519 blackmesa@192.168.20.50
# or with password:
sshpass -p '!Bl4kM3s$' ssh -o StrictHostKeyChecking=no blackmesa@192.168.20.50
```

> **Note:** The `!` character is special in bash. Use single quotes or set via
> `SSHPASS` env var when scripting: `SSHPASS='!Bl4kM3s$' sshpass -e ssh ...`

### Persistent network — systemd-networkd

**File:** `/etc/systemd/network/10-ens3.network`

```ini
[Match]
Name=ens3

[Network]
Address=192.168.20.50/24
Gateway=192.168.20.1
DNS=8.8.8.8
DNS=1.1.1.1
```

```bash
systemctl enable --now systemd-networkd
```

### nginx

```bash
apt install -y nginx
systemctl enable --now nginx
```

### Web content

**`/var/www/html/index.html`** — public landing page

```html
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>PEBCAK Corp</title></head>
<body>
  <h1>PEBCAK CORP</h1>
  <p class="subtitle">Problem Exists Between Chair And Keyboard</p>
  <!-- sometimes simplify and search -->
</body>
</html>
```

**`/var/www/html/pebcak.html`** — hidden credentials page

```html
<!DOCTYPE html>
<html><head><title>PEBCAK Corp — Internal</title></head>
<body>
  <h2>Maintenance Access</h2>
  <table>
    <tr><td>Protocol</td><td>SSH</td></tr>
    <tr><td>Host</td><td>lab1</td></tr>
    <tr><td>User</td><td>blackmesa</td></tr>
    <tr><td>Password</td><td>!Bl4kM3s$</td></tr>
  </table>
</body>
</html>
```

**`/home/blackmesa/flag.txt`**

```
FLAG{p3bc4k_s3rv3r_0wn3d}

-- PEBCAK Corp Internal Credentials --
Firewall management access:
  Host     : 172.16.0.1
  Protocol : SSH / Web UI
  User     : admin
  Password : pfsense
```

### SSH configuration

**`/etc/ssh/sshd_config`** — relevant lines:

```
PasswordAuthentication yes
```

```bash
systemctl restart ssh
```

### Users

| User | Password | sudo | Notes |
|------|----------|------|-------|
| blackmesa | !Bl4kM3s$ | NOPASSWD all | Primary CTF user |

---

## Attacker — Parrot OS (rolling)

**EVE-NG node:** 5 | VNC port: 32773
**User:** lab1 / L4b1

### DNS — persistent via NetworkManager

```bash
NM_CON=$(nmcli -t -f NAME con show --active | head -1)
nmcli con mod "$NM_CON" ipv4.dns 192.168.0.29 ipv4.ignore-auto-dns yes
nmcli con up "$NM_CON"
```

Verify: `resolvectl status` or `cat /etc/resolv.conf` → nameserver 192.168.0.29

---

## PC1 — Ubuntu Desktop 24.04

**EVE-NG node:** 4 | VNC port: 32772
**User:** skynet / Sk1n3t

**Status:** partially configured
- Static IP `192.168.10.50/24` configured
- openssh-server **not yet installed** (pending for future lab phase)

---

## Credentials reference

| Node | User | Password | Access |
|------|------|----------|--------|
| pfSense | admin | pfsense | SSH 172.16.0.1 / VNC 32774 |
| pfSense | student | student | Web UI read-only |
| VyOS | vyos | vyos | SSH 192.168.20.1 |
| Server | blackmesa | !Bl4kM3s$ | SSH 192.168.20.50 |
| Attacker | lab1 | L4b1 | VNC 32773 |
| PC1 | skynet | Sk1n3t | VNC 32772 |

---

## Student workflow (CTF flow)

```
Step 1  → Browser: http://lab1
          Response: PEBCAK Corp landing page

Step 2  → View page source
          Find: <!-- sometimes simplify and search -->

Step 3  → Browser: http://lab1/pebcak.html
          Find: SSH credentials — blackmesa / !Bl4kM3s$

Step 4  → Terminal: ssh blackmesa@lab1
          Lands on: Server (pebcak) via pfSense NAT TCP 22

Step 5  → ls ~
          Finds: flag.txt

Step 6  → cat ~/flag.txt
          Reads: FLAG{p3bc4k_s3rv3r_0wn3d}
          Also finds: pfSense credentials + host 172.16.0.1

Step 7  → ssh admin@172.16.0.1
          Lands on: pfSense CE shell (via VyOS routing)
```

---

## Admin procedures

### Start lab

1. Open EVE-NG web UI → open lab
2. Start all nodes
3. Verify bridge IPs on EVE-NG host: `ip addr show vnet0_2`
4. Verify pfSense WAN IP: `ssh admin@172.16.0.1` → `ifconfig vtnet1`

### Restore pfSense to known state

```bash
# 1. Stop the lab in EVE-NG UI
# 2. Find the pfSense disk (node 6):
ls /opt/unetlab/tmp/0/*/6/virtioa.qcow2

# 3. Restore snapshot:
qemu-img snapshot -a lab1-session2 /opt/unetlab/tmp/0/<UUID>/6/virtioa.qcow2

# 4. Restart lab
```

### Verify full chain

```bash
# From EVE-NG host:
curl -s http://192.168.0.29 | grep PEBCAK        # HTTP via pfSense WAN
dig +short @192.168.0.29 lab1                     # DNS resolver
ssh -p 22 blackmesa@192.168.0.29                  # SSH via NAT (password: !Bl4kM3s$)
```

---

## Known issues and caveats

| # | Issue | Impact | Resolution |
|---|-------|--------|------------|
| 1 | TCP 80/443 **outbound** blocked by home router | Server cannot install packages via HTTP | Use DNS/ICMP; apt works via HTTPS (443 outbound also blocked — use local mirror or pre-install) |
| 2 | pfSense Unbound **startup path** | `service unbound start` reads wrong config | Use `unbound-control -c /var/unbound/unbound.conf reload` |
| 3 | `!` in blackmesa password breaks bash | `sshpass -p '!Bl4kM3s$'` fails in double quotes | Use single quotes or `SSHPASS` env var |
| 4 | pfSense `blockpriv` must be **disabled** | Attacker (private IP) blocked on WAN | Already disabled in current config |
| 5 | Bridge IPs on EVE-NG host lost on reboot | No SSH access to Server/VyOS from host | Handled by udev rule `99-lab1-bridges.rules` |
| 6 | pfSense snapshot UUID changes if lab deleted | `qemu-img snapshot -a` fails | Find new disk path with `ls /opt/unetlab/tmp/0/*/6/` |
| 7 | PC1 SSH not installed | Step 7+ not accessible from Server | Pending: `apt install openssh-server` via VNC |
