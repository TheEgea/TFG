## Proxmox Network Configuration

Two bridge types are used:

- **`vmbr0** (bridged)` — management access from the LAN; also
          used as `pnet0` inside EVE-NG for labs that require connectivity to
          the homelab network (e.g., Lab 1).
    - **`vmbr1** (NAT)` — optional internet-facing bridge to keep
          lab traffic isolated from the LAN while allowing outbound connectivity.