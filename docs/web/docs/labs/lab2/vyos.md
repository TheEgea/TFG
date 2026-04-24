# LAB2 – VyOS Router

VyOS-LAB2 provides routing between pfSense, the DMZ (Server-A, Server-B), and the attacker network (Parrot).

---

## Interfaces

| Interface | IP | Network | Description |
|-----------|----|---------|-------------|
| eth0 | 172.16.x.x/30 | Net-Link | Uplink to pfSense LAN |
| eth1 | 192.168.30.x/24 | Net-DMZ | Gateway for servers |
| eth2 | 10.0.40.x/24 | Net-Attackers | Gateway for Parrot |

## Access

```bash
# Console only (SSH daemon not enabled by default after reboot):
ssh eve-ng "telnet localhost 32770"
# user: vyos / vyos
```

!!! warning "SSH may not start after reboot"
    VyOS SSH daemon sometimes fails to respond after an EVE-NG host reboot despite being configured.
    Console access via telnet :32770 always works.

## NAT rules

| Rule | Source | Action |
|------|--------|--------|
| 10 | 10.0.40.0/24 | masquerade via eth0 |
| 20 | 192.168.30.0/24 | masquerade via eth0 |

## DNS forwarding

- Listens on: `192.168.30.x`, `10.0.40.x`
- Allows queries from: `192.168.30.0/24`, `10.0.40.0/24`

## Static host mappings

| Hostname | IP |
|----------|----|
| attacker.lab2.internal | 10.0.40.x |
| server-a.lab2.internal | 192.168.30.x |
| server-b.lab2.internal | 192.168.30.x |
| router.lab2.internal | 192.168.30.x |

## Default route

```
0.0.0.0/0 via 172.16.x.x (pfSense LAN)
```
