## Lab Startup Procedure

- After EVE-NG host reboot, restore bridge addresses:
- Start the SYNAPSE Portal on Server-A:
- Start the DataVault on Server-B:
- Configure Parrot static IP and verify connectivity:
**Note:** pfSense-LAB2 is installed in UEFI mode. If it fails to boot,
use the start script: `/usr/local/bin/pfsense-lab2-start.sh`. Server-A
uses `docker-compose` (v1, hyphen); Server-B uses `docker compose`
(v2, space).