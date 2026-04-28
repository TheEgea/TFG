# App A — EVE-NG Installation on Proxmox VE

This appendix documents the configuration used to deploy EVE-NG Community Edition
on the Proxmox VE server used for this project. The procedure has been validated and
the same steps can be used to reproduce the environment on any compatible Proxmox
host. Screenshots and extended notes are available in the companion web documentation
at docs/web/docs/guides/eve_ng_install_proxmox/.

## Virtual Machine Requirements

| **Parameter** | **Value used in this project** |
| --- | --- |
| Hypervisor | Proxmox VE 8.x |
| CPU type | `host` (required for nested virtualisation) |
| vCPU cores | 16 (minimum 8) |
| RAM | 32 GB per EVE-NG instance (host upgraded to 64 GB total) |
| Disk | 100 GB VirtIO, SSD-backed Proxmox pool |
| SCSI controller | VirtIO SCSI |
| Network | VirtIO, bridged on `vmbr0` (management); `pnet0`–`pnetN` as cloud bridges |
| BIOS | SeaBIOS (default; OVMF also works) |

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

## Proxmox Network Configuration

Two bridge types are used:

- **`vmbr0** (bridged)` — management access from the LAN; also
          used as `pnet0` inside EVE-NG for labs that require connectivity to
          the homelab network (e.g., Lab 1).
    - **`vmbr1** (NAT)` — optional internet-facing bridge to keep
          lab traffic isolated from the LAN while allowing outbound connectivity.

## Post-Install Checklist

- *** CPU type set to `host` in Proxmox VM options.
    - *** VM autostart enabled in Proxmox.
    - *** Snapshot taken after successful EVE-NG installation.
    - *** Default admin password changed.
    - *** OS Client Side installed on instructor workstation (HTML5 console
          option does not require it).
    - *** Image directories created under
          /opt/unetlab/addons/qemu/ and permissions fixed
          with `unl_wrapper -a fixpermissions`.