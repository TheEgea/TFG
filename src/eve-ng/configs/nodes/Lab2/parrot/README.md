# Parrot-Attacker -- LAB2 Status

## Current status (2026-04-24)
- Node running (QEMU), booting from CD (Parrot OS Security 6.4)
- No static IP configured -- F5 pending
- No SSH server installed

## Current access
- VNC: port 32769 on EVE-NG host (display :26869)
- Not accessible via SSH from EVE-NG host

## Pending configuration (F5)
1. Static IP: 10.0.40.10/24, GW 10.0.40.1 (VyOS eth2)
2. Install openssh-server
3. Tools to verify: nmap, curl, python3, netcat, hashcat/john

## Tools used in sessions
- python3 -m http.server 8000  (listener for XSS cookie exfil)
- curl (HTTP requests to SYNAPSE portal)
- nc -lvnp 4444  (reverse shell listener)

## Notes
- Node boots from CD on each restart -> configuration does not persist
- For persistence: configure IP via nmcli/NetworkManager before each session,
  or install to disk (full F5)
- VyOS DHCP server assigns range 10.0.40.10-50 -- verify VyOS DHCP is active
