## Lab Startup Checklist

- Start all nodes from the EVE-NG web interface in order:
          pfSense VyOS Server PC1 Parrot.
    - Run the bridge script on the EVE-NG host (lost on reboot; persistent via
          `udev` rule):
- Verify DNS resolution from Parrot: the DNS server on Parrot must point to
          pfSense's WAN IP so that `lab1` resolves.
- Confirm flag is in place on the Server node: