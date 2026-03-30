# LAB1 – Server Configuration (Ubuntu Server 24.04)

The Server node acts as the victim web server. It runs Ubuntu Server 24.04 and
is connected directly to the Router on a dedicated segment.

---

## Network parameters

| Parameter | Value |
|-----------|-------|
| Interface | ens3 |
| IP | 192.168.20.x/24 |
| Gateway | 192.168.20.x (Router eth7) |
| DNS | 8.8.8.8 |

## Temporary IP configuration (lost on reboot)

```bash
sudo ip link set ens3 up
sudo ip addr add 192.168.20.x/24 dev ens3
sudo ip route add default via 192.168.20.x
```

## Persistent IP configuration via Netplan

!!! warning "Disable cloud-init network management"
    Ubuntu Server 24.04 uses cloud-init by default, which may overwrite Netplan on boot.
    Disable it first:

    ```bash
    sudo touch /etc/cloud/cloud-init.disabled
    ```

Edit `/etc/netplan/50-cloud-init.yaml`:

```yaml
network:
  version: 2
  ethernets:
    ens3:
      dhcp4: no
      addresses:
        - 192.168.20.x/24
      routes:
        - to: default
          via: 192.168.20.x
      nameservers:
        addresses:
          - 8.8.8.8
```

Apply:

```bash
sudo netplan generate && sudo netplan apply
```

!!! warning "Always shut down cleanly"
    Use `sudo shutdown -h now` instead of stopping the node from the EVE-NG GUI directly.
    A hard stop may not flush disk writes and the IP configuration can be lost on the next boot.

## SSH access

Ubuntu Server 24.04 ships with `openssh-server` enabled by default.
After setting the IP, you can connect from any host that has L2 reachability to the segment:

```bash
ssh <user>@192.168.20.x
```

## Connectivity verification

```bash
ping 192.168.20.x   # Router eth7 (gateway)
ping 192.168.10.x   # PC1 (cross-segment via Router)
```
