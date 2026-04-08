# LAB1 — Exported Node Configurations

Running configurations exported from the live EVE-NG lab on 2026-04-08.
These files allow restoring any node to its known operational state.

---

## Files

| File | Node | Content |
|------|------|---------|
| `vyos-running.conf` | Router (VyOS) | Full `show configuration commands` output — paste into `configure` mode to restore |
| `pfsense-config.xml` | Firewall (pfSense) | Complete `config.xml` — restore via Diagnostics > Backup & Restore |
| `server-configs.txt` | Server (Ubuntu) | systemd-networkd interface config + active sshd_config |
| `pc1-network.txt` | PC1 (Ubuntu Desktop) | NetworkManager IPv4 connection parameters |

---

## How to restore

### VyOS
```bash
# Connect to VyOS console, then:
configure
# Paste contents of vyos-running.conf line by line (or load from file)
commit
save
exit
```

### pfSense
1. Open pfSense web UI → **Diagnostics > Backup & Restore**
2. Under **Restore Backup**, upload `pfsense-config.xml`
3. pfSense will reboot with the restored configuration

### Server (Ubuntu — systemd-networkd)
```bash
# Copy content of server-configs.txt [Match]/[Network] section to:
sudo nano /etc/systemd/network/10-ens3.network
sudo systemctl restart systemd-networkd
```

### PC1 (Ubuntu Desktop — NetworkManager)
```bash
# Re-apply the connection parameters:
nmcli con mod "Wired connection 1" \
  ipv4.method manual \
  ipv4.addresses 192.168.10.50/24 \
  ipv4.gateway 192.168.10.5 \
  ipv4.dns 8.8.8.8 \
  ipv4.ignore-auto-dns yes
nmcli con up "Wired connection 1"
```

---

## Export procedure (how these were generated)

```bash
# VyOS
vbash -i -c "show configuration commands"

# pfSense
cat /cf/conf/config.xml

# Server
cat /etc/systemd/network/10-ens3.network
grep -v "^#" /etc/ssh/sshd_config | grep -v "^$"

# PC1
nmcli con show "Wired connection 1" | grep -E "connection.id|ipv4\."
```
