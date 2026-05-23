# Parrot-Attacker -- LAB2

## Current status
- Static IP configured: 10.0.40.10/24, GW 10.0.40.1 (VyOS eth2)
- SSH server installed and active

## Access
- VNC: port 32769 on EVE-NG host (display :26869)
- SSH: `ssh parrot@10.0.40.10` from EVE-NG host (bridge vnet0_3 must be active)

## Tools used in the lab

```bash
python3 -m http.server 8000   # listener for XSS cookie exfiltration
curl                          # HTTP requests to SYNAPSE portal
nc -lvnp 4444                 # reverse shell listener
sqlmap                        # SQL injection verification
```

## Notes

- Configure static IP via `nmcli` if lost after reboot:
  ```bash
  nmcli con mod "Wired connection 1" ipv4.addresses 10.0.40.10/24 ipv4.gateway 10.0.40.1 ipv4.method manual
  nmcli con up "Wired connection 1"
  ```
- EVE-NG host bridge must have `10.0.40.254/24` on `vnet0_3` to reach Parrot from host.
