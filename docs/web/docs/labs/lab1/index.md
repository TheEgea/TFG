# LAB1 – Network Setup Overview

LAB1 is the base lab environment used throughout this thesis. It defines the network
segments, routing, and firewall rules that all subsequent pentesting labs build upon.

---

## Topology

```
Internet / Homelab
        |
   [pfSense]  WAN: 10.x.x.x  |  LAN: 172.16.x.x/30
        |
   [Router - VyOS]  eth0: 172.16.x.x/30
        |
        ├── eth6: 192.168.10.x/24 ──► [PC1 – Ubuntu Desktop]  192.168.10.x/24
        |
        └── eth7: 192.168.20.x/24 ──► [Server – Ubuntu Server] 192.168.20.x/24

[Attacker – Parrot OS] ── connected directly to WAN segment
```

## Node summary

| Node | Role | OS | Console |
|------|------|----|---------|
| Router | Core routing + NAT | VyOS (rolling) | Telnet |
| Server | Victim web server | Ubuntu Server 24.04 | VNC |
| PC1 | Victim workstation | Ubuntu Desktop 24.04 | VNC |
| Attacker | Pentesting platform | Parrot Security 6.4 | VNC |
| Firewall | Perimeter firewall | pfSense CE 2.6 | VNC |

## Network segments

| Segment | Subnet | Gateway | Purpose |
|---------|--------|---------|---------|
| WAN | 172.16.x.x/30 | pfSense | Router ↔ Firewall |
| Users LAN | 192.168.10.x/24 | 192.168.10.x | PC1 segment |
| Servers LAN | 192.168.20.x/24 | 192.168.20.x | Server segment |

## EVE-NG cabling rules

!!! warning "One interface = one bridge"
    Each router interface must be connected to its own dedicated bridge in EVE-NG.
    If two interfaces share the same bridge, ARP will resolve to the wrong interface
    and connectivity will fail even if IPs are correctly configured.
    Always delete and recreate links if connectivity does not work after configuration.

!!! tip "EVE-NG pnet bridge for WAN access"
    The pfSense WAN interface uses an EVE-NG `pnet` bridge to reach the outside network.
    After each lab start, verify the virtual interface is a member of the correct bridge:

    ```bash
    ip a | grep vunl   # find pfSense WAN tap interface
    brctl show         # verify bridge membership
    ```

## Lab startup checklist

1. Start all nodes from EVE-NG web UI
2. Verify pfSense WAN tap is bridged to `pnet`
3. Configure static IPs on Server and PC1 (see their respective pages)
4. Verify connectivity with ping from the Router (see [Router page](router.md))
