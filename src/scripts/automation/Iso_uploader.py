"""
EVE-NG QEMU Image Automation Script
Author: Eloi Egea (with Perplexity AI enhancements)
TFG: Pentesting Environments in Virtualized Infrastructure
Version: 1.0 - Production Ready

Description:
Automates the complete EVE-NG QEMU image preparation process:
1. GUI file selection (multiple ISOs)
2. SCP upload to /tmp
3. Create folder structure in /opt/unetlab/addons/qemu/
4. Rename ISO to cdrom.iso
5. Create virtioa.qcow2 disk image (configurable size)
6. Run unl_wrapper fixpermissions
7. Intelligent disk sizing based on image type

Dependencies:
pip install python-dotenv paramiko

Configuration:
.env file with EVENG_USER, EVENG_PASSWORD, EVENG_HOST, EVENG_SSH_PORT
"""

import os
import sys
import subprocess
from pathlib import Path
from dotenv import load_dotenv
import paramiko
from tkinter import filedialog
import tkinter as tk


# Load environment variables
load_dotenv()
root = tk.Tk()
root.withdraw()

# EVE-NG connection configuration
EVENG_USER = os.getenv('EVENG_USER')
EVENG_PASSWORD = os.getenv('EVENG_PASSWORD')
EVENG_HOST = os.getenv('EVENG_HOST')
EVENG_PORT = int(os.getenv('EVENG_SSH_PORT', 22))


def select_iso_files():
    """
    Opens file dialog to select one or multiple ISO files.
    
    Returns:
        list: List of selected ISO file paths
    """
    file_paths = filedialog.askopenfilenames(
        title="Select EVE-NG ISO Images", 
        filetypes=[("ISO files", "*.iso")]
    )
    return list(file_paths)


def run_ssh(command):
    """
    Execute SSH command on EVE-NG server.
    
    Args:
        command (str): SSH command to execute
        
    Returns:
        tuple: (stdout output, stderr error)
    """
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(EVENG_HOST, port=EVENG_PORT, username=EVENG_USER, password=EVENG_PASSWORD)
    stdin, stdout, stderr = ssh.exec_command(command)
    output = stdout.read().decode().strip()
    error = stderr.read().decode().strip()
    ssh.close()
    return output, error


def get_recommended_disk_size(folder_name):
    """
    Returns recommended disk size based on image type.
    
    Args:
        folder_name (str): Image folder name
        
    Returns:
        int: Recommended disk size in GB
    """
    disk_mapping = {
        # Servers (web, DB, services)
        "ubuntu": 20, "debian": 15, "centos": 15, "rhel": 20,
        # Attack platforms
        "kali": 25,
        # Desktop environments
        "mint": 25, "desktop": 25,
        # Routers/Firewalls (minimal)
        "pfsense": 8, "vyos": 8, "cumulus": 12,
        # Network appliances
        "netem": 4, "ostinato": 4,
        # Minimal/Dummy hosts
        "tinycore": 2, "dsl": 2, "slax": 2
    }
    
    # Extract base name from folder (handles versions like ubuntu-24.04)
    base_name = folder_name.split('-')[0].lower()
    return disk_mapping.get(base_name, 10)  # Default 10GB


def process_single_iso(iso_file):
    """
    Process single ISO file through complete EVE-NG preparation workflow.
    
    Args:
        iso_file (str): Local path to ISO file
    """
    file_name = Path(iso_file).name
    folder_name = file_name.replace(".iso", "").lower()
    remote_path = f"/tmp/{file_name}"
    
    print(f"\n{'='*60}")
    print(f"Processing: {file_name}")
    print(f"Target folder: {folder_name}")
    
    try:
        # Step 1: SCP upload to /tmp
        print("Step 1: Uploading ISO via SCP...")
        scp_command = f"scp -P {EVENG_PORT} \"{iso_file}\" {EVENG_USER}@{EVENG_HOST}:{remote_path}"
        subprocess.run(scp_command, shell=True, check=True)
        print(f"   ✓ Uploaded to {remote_path}")
        
        # Step 2: Intelligent disk sizing
        default_size = get_recommended_disk_size(folder_name)
        disk_input = input(f"Disk size for {folder_name} [{default_size}GB]: ").strip()
        disk_gb = disk_input if disk_input else str(default_size)
        print(f"   Selected disk size: {disk_gb}GB")
        
        # Step 3: Complete preparation sequence
        commands = [
            # Create folder structure
            f"mkdir -p /opt/unetlab/addons/qemu/{folder_name}",
            # Move ISO to final location
            f"mv {remote_path} /opt/unetlab/addons/qemu/{folder_name}/{file_name}",
            # Rename to EVE-NG standard cdrom.iso
            f"cd /opt/unetlab/addons/qemu/{folder_name} && mv {file_name} cdrom.iso",
            # Create virtioa.qcow2 disk image
            f"/opt/qemu/bin/qemu-img create -f qcow2 /opt/unetlab/addons/qemu/{folder_name}/virtioa.qcow2 {disk_gb}G",
            # Fix EVE-NG permissions (critical step)
            "/opt/unetlab/wrappers/unl_wrapper -a fixpermissions"
        ]
        
        for i, command in enumerate(commands, 1):
            print(f"Step {i}: {command.split()[0]}...")
            output, error = run_ssh(command)
            
            if error:
                print(f"   ⚠️  ERROR: {error}")
            else:
                if "Formatting" in output:
                    print(f"   ✓ Disk created: {disk_gb}GB (sparse)")
                else:
                    print(f"   ✓ Command completed")
        
        print(f"\n✅ SUCCESS: {folder_name} ready!")
        print(f"   Path: /opt/unetlab/addons/qemu/{folder_name}/")
        print(f"   Usage: GUI → New Lab → Add Node → Linux → {folder_name}")
        print(f"   Next: Connect network → Start → Install → Commit changes")
        
    except subprocess.CalledProcessError as e:
        print(f"❌ SCP upload failed: {e}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")


def main():
    """
    Main execution function.
    Handles multiple ISO files in batch mode.
    """
    print("EVE-NG QEMU Image Automation Tool")
    print("=" * 50)
    
    iso_files = select_iso_files()
    if not iso_files:
        print("No ISO files selected. Exiting.")
        return
    
    print(f"Processing {len(iso_files)} ISO file(s)...")
    
    for iso_file in iso_files:
        process_single_iso(iso_file)
    
    print("\n" + "=" * 50)
    print("ALL IMAGES PROCESSED SUCCESSFULLY!")
    print("Refresh EVE-NG GUI and create test lab.")


if __name__ == "__main__":
    main()
