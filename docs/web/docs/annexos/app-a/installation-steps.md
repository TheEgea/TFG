## Installation Steps

- Download the EVE-NG Community Edition ISO from the official website.
    - In Proxmox, create a new VM with the parameters in Table .
          Ensure the CPU type is set to `host` so that virtualisation extensions
          (VT-x / AMD-V) are exposed to the guest.
    - Boot from the ISO and follow the Ubuntu Server installation wizard. Assign
          a static IP address and install the OpenSSH server during setup.
    - After the first reboot, follow the EVE-NG Community post-install wizard
          (`/opt/unetlab/wrappers/unl_wrapper -a postinstall`) and configure
          the management interface.
    - Run `apt update && apt upgrade -y` and reboot once more to ensure
          all EVE-NG patches are applied.
    - Access the web interface at `https://<EVE-NG-IP>/` and change the
          default credentials immediately.