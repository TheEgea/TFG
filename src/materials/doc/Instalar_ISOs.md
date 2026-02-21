# 1. Free / Open Source Images

### Free / open source images for EVE‑NG

| Image / Family               | Main role in the lab            | License / usage notes                                          |
|-----------------------------|----------------------------------|----------------------------------------------------------------|
| pfSense FW                  | Firewall / Router                | Open source (pfSense CE), free for lab use.[1][2]             |
| VyOS                        | L3 Router / Firewall             | Open source router/firewall project.[3][4]                    |
| CumulusVX                   | L3 Switch / DC routing           | Free virtual image for NVIDIA Cumulus labs.[5][6]             |
| Linux Ubuntu Desktop        | Client PC                        | GNU/Linux desktop, free.[7]                                   |
| Linux Ubuntu Server         | Server (web, DB, etc.)           | Free, ideal for services.[7][8]                               |
| Linux Debian                | Server / PC                      | Classic 100% free software server distro.[7]                  |
| Linux Kali x64 Full         | Attacker / pentest machine       | Open source security distribution.[7]                         |
| Linux Mint                  | Client PC                        | Free desktop distribution.[7]                                 |
| Linux TinyCore / DSL / Slax | Lightweight PC / “dummy” hosts   | Minimalist OSS distros.[7][9]                                 |
| Linux NETem                 | WAN emulation appliance          | Linux-based, NETem tools (OSS).[7]                            |
| Linux CentOS                | Server                           | Free Linux distro (RHEL derivative).[7]                       |
| Linux RHEL (eval)           | Server                           | Proprietary, free eval available; not pure OSS.[7]            |
| Windows 7/8.1/10            | Client PC                        | Proprietary; usually trial/educational licenses.[7]           |
| Windows Server 2003–2022    | Server (DC, AD, etc.)            | Proprietary, typically eval/educational use.[7]               |
| Ostinato                    | Traffic generator                | Project with open‑source core.[7]                             |

---

# 2. Recommended EVE‑NG Paths

### Recommended folders in EVE‑NG (`/opt/unetlab/addons/qemu`)

| Product / Image      | Recommended folder                                   | Files inside                               |
|----------------------|------------------------------------------------------|--------------------------------------------|
| pfSense CE           | `/opt/unetlab/addons/qemu/pfsense-2.7.2`             | `virtioa.qcow2`                            |
| VyOS Rolling         | `/opt/unetlab/addons/qemu/vyos-1.x-rolling-amd64`    | `virtioa.qcow2`                            |
| CumulusVX            | `/opt/unetlab/addons/qemu/cumulusvx-5.x`             | `virtioa.qcow2`                            |
| Ubuntu Server        | `/opt/unetlab/addons/qemu/linux-ubuntu-server-24.04` | `cdrom.iso` + `virtioa.qcow2`              |
| Ubuntu Desktop       | `/opt/unetlab/addons/qemu/linux-ubuntu-desktop-24.04`| `cdrom.iso` + `virtioa.qcow2`              |
| Debian Server        | `/opt/unetlab/addons/qemu/linux-debian-server`       | `cdrom.iso` + `virtioa.qcow2`              |
| Kali Linux           | `/opt/unetlab/addons/qemu/linux-kali-rolling`        | `cdrom.iso` + `virtioa.qcow2`              |
| TinyCore / DSL / Slax| `/opt/unetlab/addons/qemu/linux-tinycore` (example)  | `cdrom.iso` + `virtioa.qcow2`              |
| NETem                | `/opt/unetlab/addons/qemu/linux-netem`               | `virtioa.qcow2` (or ISO + qcow2)           |
| Ostinato             | `/opt/unetlab/addons/qemu/linux-ostinato`            | `virtioa.qcow2` (depends on image)         |

> **Important note (Linux category in EVE‑NG):**  
> The *Linux* node category in EVE‑NG only becomes active if there are images whose **folder names start with `linux-`** (for example `linux-ubuntu-server-24.04`, `linux-parrot-security-6.4`).  
> If the folders are called `ubuntu-24.04...` without the `linux-` prefix, the Linux category stays **greyed out** and you cannot add Linux nodes.

---

# 3. ISO Automation Script for EVE‑NG (`Iso_uploader.py`)

To avoid creating folders and disks manually on the EVE‑NG server, this project provides a Python automation script:

`src/scripts/automation/Iso_uploader.py`.[file:94]

The script automatically:

1. Opens a GUI file picker and lets you select **one or multiple ISO files**.  
2. Uploads each ISO via **SCP** to `/tmp` on the EVE‑NG server.  
3. Creates the target folder in `/opt/unetlab/addons/qemu/<folder_name>/`.  
4. Renames the ISO to `cdrom.iso` inside that folder.  
5. Creates the `virtioa.qcow2` disk with a **recommended size** (configurable).  
6. Runs `unl_wrapper -a fixpermissions`.  
7. Prints the final path and how to add the node from the EVE‑NG GUI.[file:94][file:78]

## 3.1. Requirements on the local machine

- Python 3.10+  
- Dependencies:

```bash
pip install -r requirements.txt
```
