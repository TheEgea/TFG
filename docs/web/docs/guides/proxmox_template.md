# Using Proxmox Template for EVE-NG

## 1. Import Template

1. Descarga OVA oficial EVE-NG
2. Proxmox → **Create VM** → **Import disk (OVA)**
3. RAM: **16GB+**, CPU: **8 cores+**, Storage: **100GB SSD**

## 2. Network Config

```bash
qm set 100 --net0 virtio=52:54:00:00:00:00,bridge=vmbr0
qm start 100
```

## 3 Initial Setup

> IP: DHCP or static
> - By default I leave it with a static IP: 192.168.0.133 but you can change it using terminal as is do it in a Ubuntu Server *[example](https://linuxconfig.org/change-ip-address-on-ubuntu-server)*
