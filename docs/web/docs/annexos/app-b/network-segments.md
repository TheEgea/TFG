## Network Segments

| **Segment** | **Subnet** | **Gateway** | **Purpose** |
| --- | --- | --- | --- |
| Homelab / WAN | 192.168.0.0/24 | 192.168.0.1 | Parrot attacker + pfSense WAN |
| Net-Link | 172.16.0.0/30 | pfSense vtnet0 | pfSense VyOS uplink |
| Users LAN | 192.168.10.0/24 | 192.168.10.x | PC1 internal workstation |
| Servers LAN | 192.168.20.0/24 | 192.168.20.1 | PEBCAK Corp server segment |