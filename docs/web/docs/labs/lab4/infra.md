# LAB4 — Infrastructure Reference

Complete infrastructure reference for LAB4 CipherStrike. For instructor/lab admin use.

---

## Node inventory

| Node | EVE-NG ID | Console | Image | Role |
|------|-----------|---------|-------|------|
| pfSense-LAB4 | 1 | VNC (see EVE-NG UI) | pfsense-ce | Perimeter firewall · NAT |
| VyOS-LAB4 | 2 | Telnet (see EVE-NG UI) | vyos-rolling | Core router · zone segmentation |
| ServerA | 3 | VNC (see EVE-NG UI) | linux-ubuntu-server-24.04 | Cryptography module |
| ServerB | 4 | VNC (see EVE-NG UI) | linux-ubuntu-server-24.04 | Steganography module |
| ServerC | 5 | VNC (see EVE-NG UI) | linux-ubuntu-server-24.04 | Advanced mix (gated) |
| Defender | 6 | VNC (see EVE-NG UI) | linux-ubuntu-desktop-24.04 | SOC monitoring |

## Network addressing

| Segment | Subnet | Bridge | Host IP (EVE-NG) | Purpose |
|---------|--------|--------|-----------------|---------|
| Net-Link | 192.168.1.0/24 | vnet0_2 | — | pfSense LAN ↔ VyOS |
| Zone-A | 10.10.1.0/24 | vnet0_3 | 10.10.1.253 | ServerA |
| Zone-B | 10.10.2.0/24 | vnet0_4 | 10.10.2.253 | ServerB |
| Zone-C | 10.10.3.0/24 | vnet0_5 | 10.10.3.253 | ServerC (gated) |
| Zone-Defense | 10.10.4.0/24 | vnet0_6 | — | Defender |

!!! warning "Bridge IPs must be set on each session"
    EVE-NG bridge IPs are not persistent by default. Add them before testing SSH access:
    ```bash
    ip addr add 10.10.1.253/24 dev vnet0_3
    ip addr add 10.10.2.253/24 dev vnet0_4
    ip addr add 10.10.3.253/24 dev vnet0_5
    ```

## Credentials (full reference)

| Node | User | Password | Access |
|------|------|----------|--------|
| pfSense-LAB4 | admin | `pfsense` | Web GUI / SSH (192.168.0.18) |
| VyOS-LAB4 | vyos | `vyos` | EVE-NG console |
| ServerA | admin | `N3xaTech!` | SSH 10.10.1.10 |
| ServerA | root | `eve` | Console only |
| ServerB | sysop | `S3cure24!` | SSH 10.10.2.10 |
| ServerB | root | `eve` | Console only |
| ServerC | devops | `fa681b59855d` | SSH 10.10.3.10 (derived) |
| ServerC | root | `eve` | Console only |
| Defender | lab4 | `L4b4` | Ubuntu Desktop / EVE-NG console |

!!! info "ServerC password derivation"
    `password = md5(flag_A5 + flag_B5)[:12]`
    Students must solve modules A and B first. The decoy `D3vOps24!` is intentionally wrong.

## Lab startup procedure

```bash
# 1. Start all nodes from EVE-NG UI
#    Order: pfSense → VyOS → ServerA → ServerB → ServerC → Defender

# 2. Add bridge IPs on EVE-NG host
ip addr add 10.10.1.253/24 dev vnet0_3
ip addr add 10.10.2.253/24 dev vnet0_4
ip addr add 10.10.3.253/24 dev vnet0_5

# 3. Verify routing on VyOS console
show ip route

# 4. Verify student entry points
ssh admin@10.10.1.10    # Module A — N3xaTech!
ssh sysop@10.10.2.10    # Module B — S3cure24!

# 5. ServerC only after solving A5 + B5
ssh devops@10.10.3.10   # fa681b59855d (derived)
```
