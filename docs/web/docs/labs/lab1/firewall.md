# LAB1 – Firewall Configuration (pfSense CE 2.6)

pfSense sits at the perimeter between the simulated internet (WAN) and the internal
Router segment (LAN). It controls what traffic can enter the lab from outside.

---

## Interface assignment

| Interface | Role | IP |
|-----------|------|----|
| vtnet0 | LAN | 172.16.x.x/30 |
| vtnet1 | WAN | 10.x.x.x/24 (or DHCP) |

!!! info "Interface order in pfSense"
    pfSense assigns interfaces in the order QEMU presents them.
    In EVE-NG, `e0` maps to `vtnet0` (first NIC) and `e1` to `vtnet1` (second NIC).
    Verify the assignment under **Interfaces → Assignments** after first boot.

## WAN connectivity – EVE-NG pnet bridge

The pfSense WAN port (`vtnet1`) must be a member of the correct EVE-NG `pnet` bridge
to reach the outside network. Run the following on the EVE-NG host after each lab start:

```bash
# Enable IP forwarding
echo 1 > /proc/sys/net/ipv4/ip_forward

# NAT outbound from WAN segment toward the real network
iptables -t nat -A POSTROUTING -s 10.x.x.0/24 -o pnet0 -j MASQUERADE
iptables -A FORWARD -i pnet1 -o pnet0 -j ACCEPT
iptables -A FORWARD -i pnet0 -o pnet1 -m state --state RELATED,ESTABLISHED -j ACCEPT

# Add pfSense WAN tap interface to the bridge
brctl addif pnet1 <vunl_interface>
```

!!! warning "Interface name may change"
    The tap interface name (`vunl0_X_Y`) can change between sessions.
    Always verify it before adding to the bridge:
    ```bash
    ip a | grep vunl
    ```

## Port forwarding – expose Server on ports 80/443

To allow inbound HTTP/HTTPS from the WAN to reach the internal Server:

1. Go to **Firewall → NAT → Port Forward**
2. Add rule:
    - Interface: WAN
    - Protocol: TCP
    - Destination port: 80 (repeat for 443)
    - Redirect target IP: 192.168.20.x (Server)
    - Redirect target port: 80 / 443
3. Add a static route to reach the Server subnet:
    - **System → Routing → Static Routes**
    - Network: 192.168.20.0/24
    - Gateway: 172.16.x.x (Router eth0)

## Enable SSH management

Go to **System → Advanced → Admin Access** and enable **Secure Shell**.
This allows connecting to pfSense from the Router (172.16.x.x) for remote management.

## Connectivity verification

From the Router console:

```bash
ping 172.16.x.x count 3   # pfSense LAN interface
```

From the Attacker machine (WAN segment):

```bash
curl http://192.168.20.x   # should reach the Server if port forward is active
```
