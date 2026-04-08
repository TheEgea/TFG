# src/scripts/automation

Scripts that automate EVE-NG infrastructure tasks.

---

## Iso_uploader.py

Automates adding new ISO images to EVE-NG (GUI file picker + full preparation pipeline).

### Quick start

```bash
# 1. Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate        # Linux/macOS
# .venv\Scripts\activate        # Windows

# 2. Install dependencies
pip install python-dotenv paramiko

# 3. Configure connection
cp .env.example .env
# Edit .env with your EVE-NG host/user/password

# 4. Run
python Iso_uploader.py
```

### What it does

```
Select ISO file(s) via GUI
        ↓
SCP upload → /tmp/<name>.iso on EVE-NG host
        ↓
SSH: mkdir /opt/unetlab/addons/qemu/<name>/
SSH: mv /tmp/<name>.iso → cdrom.iso
SSH: qemu-img create virtioa.qcow2 <size>G
SSH: unl_wrapper -a fixpermissions
        ↓
Image ready in EVE-NG GUI (New Lab → Add Node → Linux → <name>)
```

### Dependencies

| Package | Purpose |
|---------|---------|
| `python-dotenv` | Load `.env` config |
| `paramiko` | SSH commands on EVE-NG |
| `tkinter` | GUI file picker (stdlib, may need `python3-tk` system package) |

### Notes

- SCP upload uses the system `scp` binary — SSH key auth recommended (see `~/.ssh/config`)
- Paramiko SSH uses `EVENG_PASSWORD` from `.env`
- Disk size is suggested automatically based on OS type; override at the prompt
- After running, refresh the EVE-NG web UI to see the new image
