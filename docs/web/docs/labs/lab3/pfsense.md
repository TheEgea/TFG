# LAB3 — pfSense Firewall

pfSense-LAB3 is the perimeter firewall and student entry point. The key feature is a **DNAT rule** that forwards incoming TCP:22 directly to Server-Web, simulating the realistic scenario where an analyst connects to the affected host.

---

## Access

| Interface | Assignment | IP |
|-----------|------------|-----|
| vtnet0 | WAN | DHCP from homelab (~192.168.0.x) |
| vtnet1 | LAN | 172.16.2.1/30 (static) |

## Required fixes (applied at setup)

Same two corrections as LAB2:

1. **Block private networks** — disabled on WAN (WAN shares 192.168.0.0/24 = RFC 1918 space)
2. **reply-to** directive — removed from WAN rules (causes asymmetric routing in single-ISP setups)

## DNAT rule — student entry point

Port forward on WAN interface:

| Field | Value |
|-------|-------|
| Interface | WAN |
| Protocol | TCP |
| Destination port | 22 |
| Redirect target IP | 192.168.50.10 (Server-Web) |
| Redirect target port | 22 |

Students connect with:
```bash
ssh analyst@<pfSense-WAN-IP>
# Password: An@lyst2024
```

The connection lands directly on `helix-web`, the primary forensic target.

## Static routes

Two static routes pointing both internal segments via VyOS:

| Destination | Gateway |
|-------------|---------|
| 192.168.50.0/24 | 172.16.2.2 (VyOS eth0) |
| 192.168.60.0/24 | 172.16.2.2 (VyOS eth0) |

!!! tip "pfSense console access"
    pfSense CE outputs only to VGA framebuffer — the EVE-NG telnet console (port 32769) is silent.
    To interact: connect via raw socket and send `Ctrl-A C` to enter QEMU monitor mode.
    Use `xp /40wx 0xb8000` to read the VGA text buffer and `sendkey` to inject keystrokes.
