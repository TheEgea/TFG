# LAB1 – Router Configuration (VyOS)

The Router is the core of the lab. It connects the pfSense firewall on one side
and the internal segments (PC1 and Server) on the other, providing routing and NAT.

---

## Interface layout

| Interface | Address | Connected to |
|-----------|---------|--------------|
| eth0 | 172.16.x.x/30 | pfSense LAN |
| eth6 | 192.168.10.x/24 | PC1 (direct link) |
| eth7 | 192.168.20.x/24 | Server (direct link) |

## Full configuration

```bash
configure

# WAN interface toward pfSense
set interfaces ethernet eth0 address '172.16.x.x/30'
set interfaces ethernet eth0 description 'OUTSIDE'

# LAN interface toward PC1
set interfaces ethernet eth6 address '192.168.10.x/24'
set interfaces ethernet eth6 description 'PC1-LAN'

# LAN interface toward Server
set interfaces ethernet eth7 address '192.168.20.x/24'
set interfaces ethernet eth7 description 'Server-LAN'

# Default route toward pfSense
set protocols static route 0.0.0.0/0 next-hop '172.16.x.x'

# NAT masquerade – PC1 segment outbound
set nat source rule 100 outbound-interface name 'eth0'
set nat source rule 100 source address '192.168.10.0/24'
set nat source rule 100 translation address 'masquerade'

# NAT masquerade – Server segment outbound
set nat source rule 300 outbound-interface name 'eth0'
set nat source rule 300 source address '192.168.20.0/24'
set nat source rule 300 translation address 'masquerade'

set system host-name 'Router'

commit
save
exit
```

## Port forwarding – expose Server on ports 80/443

To allow inbound HTTP/HTTPS from outside to reach the Server:

```bash
configure

# DNAT rules – redirect inbound traffic to Server
set nat destination rule 10 description 'HTTP to Server'
set nat destination rule 10 inbound-interface name 'eth0'
set nat destination rule 10 protocol 'tcp'
set nat destination rule 10 destination port '80'
set nat destination rule 10 translation address '192.168.20.x'
set nat destination rule 10 translation port '80'

set nat destination rule 11 description 'HTTPS to Server'
set nat destination rule 11 inbound-interface name 'eth0'
set nat destination rule 11 protocol 'tcp'
set nat destination rule 11 destination port '443'
set nat destination rule 11 translation address '192.168.20.x'
set nat destination rule 11 translation port '443'

# Firewall – allow forwarded traffic to reach Server
set firewall ipv4 forward filter rule 10 action 'accept'
set firewall ipv4 forward filter rule 10 destination address '192.168.20.x'
set firewall ipv4 forward filter rule 10 destination port '80'
set firewall ipv4 forward filter rule 10 protocol 'tcp'

set firewall ipv4 forward filter rule 11 action 'accept'
set firewall ipv4 forward filter rule 11 destination address '192.168.20.x'
set firewall ipv4 forward filter rule 11 destination port '443'
set firewall ipv4 forward filter rule 11 protocol 'tcp'

commit
save
exit
```

## Enable SSH management

```bash
configure
set service ssh
commit
save
exit
```

## Connectivity verification

```bash
# From the Router console
ping 172.16.x.x count 3    # pfSense LAN
ping 192.168.10.x count 3  # PC1
ping 192.168.20.x count 3  # Server

show interfaces
show ip route
show arp
show nat source rules
show nat destination rules
```

Expected interface table:

| Interface | IP | Description |
|-----------|----|-------------|
| eth0 | 172.16.x.x/30 | OUTSIDE (→ pfSense) |
| eth6 | 192.168.10.x/24 | PC1-LAN |
| eth7 | 192.168.20.x/24 | Server-LAN |
