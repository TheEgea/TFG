# LAB3 — VyOS Router

VyOS-LAB3 provides inter-segment routing and SNAT masquerade for both internal networks. No DHCP or DNS forwarding — all addresses are static.

---

## Interfaces

| Interface | IP | Network | Description |
|-----------|----|---------|-------------|
| eth0 | 172.16.2.2/30 | Net-Link | Uplink to pfSense LAN |
| eth1 | 192.168.50.1/24 | Net-Servers | Gateway for Server-Web |
| eth2 | 192.168.60.1/24 | Net-Internal | Gateway for Server-DB |

## Access

```bash
# Console via EVE-NG telnet:
ssh eve-ng "telnet localhost 32770"
# user: vyos / vyos
```

## Interface and routing configuration

```bash
set interfaces ethernet eth0 address '172.16.2.2/30'
set interfaces ethernet eth0 description 'UPLINK-PFSENSE'
set interfaces ethernet eth1 address '192.168.50.1/24'
set interfaces ethernet eth1 description 'Net-Servers'
set interfaces ethernet eth2 address '192.168.60.1/24'
set interfaces ethernet eth2 description 'Net-Internal'

set protocols static route 0.0.0.0/0 next-hop 172.16.2.1
```

## NAT Source rules (SNAT masquerade)

```bash
set nat source rule 10 outbound-interface name 'eth0'
set nat source rule 10 source address '192.168.50.0/24'
set nat source rule 10 translation address 'masquerade'

set nat source rule 20 outbound-interface name 'eth0'
set nat source rule 20 source address '192.168.60.0/24'
set nat source rule 20 translation address 'masquerade'
```

## SSH service

```bash
set service ssh
commit
save
```

!!! note "No DHCP or DNS"
    Unlike LAB2, VyOS-LAB3 provides neither DHCP nor DNS forwarding. All node IPs are configured statically via Netplan.
