# App B — Lab 1: PEBCAK Corp Instructor Reference

This appendix provides the deployment reference for Lab 1 (Reconnaissance and
Enumeration). It is intended for instructors and system administrators responsible
for setting up and resetting the lab environment. The student-facing guide and
interactive walkthrough are available at docs/web/docs/labs/lab1/.

## Credentials and Access

| **Node** | **Username** | **Password** | **Access method** |
| --- | --- | --- | --- |
| pfSense | admin | pfsense | Web UI / SSH |
| VyOS | vyos | vyos | EVE-NG console |
| Server (PEBCAK) | blackmesa | `!Bl4kM3s` | SSH (via pfSense DNAT) |
| PC1 | ubuntu | ubuntu | EVE-NG console / VNC |
| Parrot OS | parrot | parrot | EVE-NG console / VNC |

## Network Segments

| **Segment** | **Subnet** | **Gateway** | **Purpose** |
| --- | --- | --- | --- |
| Homelab / WAN | 192.168.0.0/24 | 192.168.0.1 | Parrot attacker + pfSense WAN |
| Net-Link | 172.16.0.0/30 | pfSense vtnet0 | pfSense VyOS uplink |
| Users LAN | 192.168.10.0/24 | 192.168.10.x | PC1 internal workstation |
| Servers LAN | 192.168.20.0/24 | 192.168.20.1 | PEBCAK Corp server segment |

## Lab Startup Checklist

- Start all nodes from the EVE-NG web interface in order:
          pfSense VyOS Server PC1 Parrot.
    - Run the bridge script on the EVE-NG host (lost on reboot; persistent via
          `udev` rule):
- Verify DNS resolution from Parrot: the DNS server on Parrot must point to
          pfSense's WAN IP so that `lab1` resolves.
- Confirm flag is in place on the Server node:

## Expected Student Workflow

| **Step** | **Action** | **Tool** |
| --- | --- | --- |
| 1 | Navigate to `http://lab1` in Parrot browser | Firefox |
| 2 | Inspect page source; find HTML comment: `<! -\!- sometimes simplify and search -\!->` | Browser devtools |
| 3 | Access `http://lab1/pebcak.html`; read SSH credentials | Browser |
| 4 | `ssh blackmesa@lab1` (pfSense DNAT forwards TCP 22) | SSH |
| 5 | `cat  /flag.txt` — retrieves Flag 1 and pfSense credentials | Terminal |
| 6 | SSH to pfSense from Server: `ssh admin@172.16.x.x` | SSH (optional) |

## Flags

| **Flag** | **Value** | **Location** |
| --- | --- | --- |
| Flag 1 | `FLAGp3bc4k_s3rv3r_0wn3d` | `/home/blackmesa/flag.txt` on Server |
| Flag 2 | `FLAGpebcak_firewall_pivot` | pfSense admin panel (optional bonus) |