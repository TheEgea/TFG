# pfSense-LAB3 -- Configuration

## Access
- VNC: port 32769 on EVE-NG host (`vncviewer 192.168.0.133:32769`)
- Credentials: `admin` / `pfsense`
- SSH (if enabled): via LAN IP 172.16.2.1

## Interfaces

| Interface | vtnet  | IP                    | Description       |
|-----------|--------|-----------------------|-------------------|
| WAN       | vtnet0 | DHCP (192.168.0.x)    | External access   |
| LAN       | vtnet1 | 172.16.2.1/30         | Link to VyOS eth0 |

## NAT / Port Forwards

| Protocol | WAN Port | Destination         | Description             |
|----------|----------|---------------------|-------------------------|
| TCP      | 22       | 192.168.50.10:22    | Student SSH to Server-Web |

## Console Access Notes
pfSense CE 2.6.0 uses VGA output (not serial). The telnet console does not show pfSense
output directly. To interact via the QEMU monitor:

```python
# Connect to telnet port 32769
# Negotiate IAC, then send Ctrl-A C (bytes 0x01 0x63) to enter QEMU monitor
# Useful monitor commands:
#   screendump /opt/screen.ppm   -- capture VGA framebuffer
#   xp /40wx 0xb8000             -- read VGA text buffer (80x25 chars)
#   sendkey <key>                -- send keystroke to pfSense
```

## ZFS Filesystem Note
pfSense CE 2.6.0 uses ZFS for its root filesystem. The EVE-NG host kernel
(`6.7.5-eveng-6-ksm+`) does not include the ZFS module, so direct disk mounting
is not possible. Configuration must be done through the VGA console.
