# LAB1 – Reconnaissance (PEBCAK Corp)

LAB1 is the foundational reconnaissance lab. Students discover a hidden web page containing SSH credentials, log into the target server, and retrieve a flag that leads to firewall access.

---

## Topology

```
Homelab LAN (192.168.0.0/24)
        |
[Parrot – Attacker]  192.168.0.x (DHCP, pnet0 cloud)
        |
[pfSense – Firewall]
  WAN vtnet1: 192.168.0.x/24  (static)
  LAN vtnet0: 172.16.x.x/30
        |
[VyOS – Router]
  eth0: 172.16.x.x/30    ← uplink to pfSense
  eth6: 192.168.10.x/24  ← Users LAN
  eth7: 192.168.20.x/24  ← Servers LAN
        |
  ┌─────┴─────┐
[Server]     [PC1]
192.168.20.x  192.168.10.x
nginx :80      Ubuntu Desktop
hostname: pebcak
```

## Node summary

| Node | OS | IP | Role |
|------|----|----|------|
| pfSense | pfSense CE 2.6 | WAN: 192.168.0.x / LAN: 172.16.x.x | Perimeter firewall + DNS + NAT |
| VyOS | VyOS rolling | 172.16.x.x / 192.168.10.x / 192.168.20.1 | Core router + NAT |
| Server | Ubuntu Server 24.04 | 192.168.20.x | Target — PEBCAK Corp nginx |
| PC1 | Ubuntu Desktop 24.04 | 192.168.10.x | Internal user workstation |
| Parrot | Parrot Security 6.4 | 192.168.0.x (DHCP) | Attacker |

## Network segments

| Segment | Subnet | Gateway | Purpose |
|---------|--------|---------|---------|
| Net-Link | 172.16.0.0/30 | pfSense vtnet0 | pfSense ↔ VyOS |
| Users LAN | 192.168.10.0/24 | 192.168.10.x | PC1 segment |
| Servers LAN | 192.168.20.0/24 | 192.168.20.1 | Server segment |
| Homelab | 192.168.0.0/24 | 192.168.0.1 | WAN / Attacker |

## Student workflow

```
1. http://lab1               → PEBCAK Corp portal (Firefox on Parrot)
2. View page source          → <!-- sometimes simplify and search -->
3. http://lab1/pebcak.html  → SSH creds: blackmesa / !Bl4kM3s$
4. ssh blackmesa@lab1       → Server via pfSense DNAT (TCP 22)
5. cat ~/flag.txt            → FLAG{p3bc4k_s3rv3r_0wn3d} + pfSense creds
6. ssh admin@172.16.x.x     → pfSense access from Server via VyOS
```

## Lab startup checklist

1. Start all nodes from EVE-NG web UI
2. Run bridge script on EVE-NG host (lost on reboot):
   ```bash
   ip addr add 192.168.20.x/24 dev vnet0_2
   ip addr add 192.168.10.x/24 dev vnet0_3
   ip route add 172.16.0.0/30 via 192.168.20.1
   ```
   Persistent via: `/etc/udev/rules.d/99-lab1-bridges.rules`
3. Set DNS on Parrot to `192.168.0.x` (pfSense) so `lab1` resolves
4. Verify: `curl http://lab1` from Parrot Firefox
