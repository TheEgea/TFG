# LAB1 – PC1 Configuration (Ubuntu Desktop 24.04)

PC1 represents the victim workstation. It runs Ubuntu Desktop 24.04 and is connected
directly to the Router on a dedicated segment.

---

## Network parameters

| Parameter | Value |
|-----------|-------|
| Interface | ens3 |
| IP | 192.168.10.x/24 |
| Gateway | 192.168.10.x (Router eth6) |
| DNS | 8.8.8.8 |

## Persistent IP via nmcli

Ubuntu Desktop uses NetworkManager by default. Configure a persistent static IP:

```bash
sudo nmcli connection add type ethernet ifname ens3 con-name "LAN" \
  ipv4.method manual \
  ipv4.addresses 192.168.10.x/24 \
  ipv4.gateway 192.168.10.x \
  ipv4.dns 8.8.8.8 \
  connection.autoconnect yes

sudo nmcli connection up "LAN"
```

Alternatively, use the graphical `nmtui` tool from the terminal.

!!! info "Ubuntu Desktop and SSH"
    Unlike Ubuntu Server, Desktop editions do **not** include `openssh-server` by default.
    Install it to enable remote SSH access:

    ```bash
    sudo apt update && sudo apt install -y openssh-server
    sudo systemctl enable --now ssh
    ```

## Connectivity verification

```bash
ip a
ip route
ping 192.168.10.x   # Router eth6 (gateway)
ping 192.168.20.x   # Server (cross-segment via Router)
```
