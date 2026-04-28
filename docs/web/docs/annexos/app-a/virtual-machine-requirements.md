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