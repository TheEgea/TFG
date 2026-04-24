# LAB1 – Server (PEBCAK Corp)

The Server node runs Ubuntu 24.04 and hosts the PEBCAK Corp nginx web server — the primary target for Lab1.

---

## Access

```bash
# From EVE-NG host (bridge vnet0_2 must have IP 192.168.20.x/24):
sshpass -p '!Bl4kM3s$' ssh blackmesa@192.168.20.x

# Via pfSense NAT (from Parrot / Homelab):
ssh blackmesa@192.168.0.x   # pfSense DNAT → 192.168.20.x:22
```

## Network configuration

| Parameter | Value |
|-----------|-------|
| Interface | ens3 |
| IP | 192.168.20.x/24 |
| Gateway | 192.168.20.x (VyOS eth7) |
| DNS | 8.8.8.8 / 1.1.1.1 |
| Network manager | systemd-networkd |

File: `/etc/systemd/network/10-ens3.network`

```ini
[Match]
Name=ens3

[Network]
Address=192.168.20.x/24
Gateway=192.168.20.x
DNS=8.8.8.8
DNS=1.1.1.1
```

## Services

| Service | Status | Port |
|---------|--------|------|
| nginx | enabled, active | 80 |
| openssh-server | enabled, active | 22 |
| systemd-networkd | enabled | — |

## Web content

### /var/www/html/index.html

The main landing page for `http://lab1`. Contains a hidden HTML comment:

```html
<!-- sometimes simplify and search -->
```

This is the clue that leads students to `pebcak.html`.

### /var/www/html/pebcak.html

Hidden page (not linked from index) containing SSH credentials in plain text:

```
User:     blackmesa
Password: !Bl4kM3s$
```

## Flag

```
/home/blackmesa/flag.txt
→ FLAG{p3bc4k_s3rv3r_0wn3d}

-- PEBCAK Corp Internal Credentials --
Firewall: 172.16.x.x | admin / pfsense
```

## nginx configuration

File: `/etc/nginx/sites-enabled/default`

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    root /var/www/html;
    index index.html index.htm;
    server_name _;
    location / {
        try_files $uri $uri/ =404;
    }
}
```
