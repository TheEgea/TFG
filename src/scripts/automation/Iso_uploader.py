#Reminder: pip freeze --local > requirements.txt
"""
Author: Eloi Egea
##################
Description:
Script to upload iso files to the server.
Then goes to /opt/unetlab/... and makes a folder for each iso and moves the iso to the folder.
Change the name of the iso, following the steps as it's said in the EVE-CE-BOOK-6.3-2024.pdf.

"""

import os
import sys
import subprocess
from pathlib import Path
from dotenv import load_dotenv
import paramiko
from tkinter import filedialog
import tkinter as tk

load_dotenv()
root = tk.Tk()
root.withdraw()
EVENG_USER = os.getenv('EVENG_USER')
EVENG_PASSWORD = os.getenv('EVENG_PASSWORD')
EVENG_HOST = os.getenv('EVENG_HOST')
EVENG_PORT = os.getenv('EVENG_SSH_PORT')

def select_iso_files():
    """
    Function to open a file dialog and select iso files.
    """
    file_paths = filedialog.askopenfilenames(title="Select ISO files", filetypes=[("ISO files", "*.iso")])
    return file_paths

def run_ssh(command):
    """
    Function to run a command on the remote server via SSH.
    """
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(EVENG_HOST, port=EVENG_PORT, username=EVENG_USER, password=EVENG_PASSWORD)
    stdin, stdout, stderr = ssh.exec_command(command)
    output = stdout.read().decode()
    error = stderr.read().decode()
    ssh.close()
    return output, error

def main():
    iso_files = select_iso_files()
    for iso_file in iso_files:
        file_name = Path(iso_file).name
        remote_path = f"/tmp/{file_name}"
        # Upload the file to the server
        scp_command = f"scp -P {EVENG_PORT} {iso_file} {EVENG_USER}@{EVENG_HOST}:{remote_path}"
        subprocess.run(scp_command, shell=True)
        print(f"Uploaded {file_name} to {remote_path}")

        # Create a folder for the iso and move the iso to the folder
        folder_name = file_name.replace(".iso", "")
        commands = [
            f"mkdir -p /opt/unetlab/addons/qemu/{folder_name}",
            f"mv {remote_path} /opt/unetlab/addons/qemu/{folder_name}/{file_name}"
        ]
        # Després de moure l'ISO:
        commands += [
            f"cd /opt/unetlab/addons/qemu/{folder_name} && mv {file_name} cdrom.iso",  # Renombrar
            f"/opt/qemu/bin/qemu-img create -f qcow2 /opt/unetlab/addons/qemu/{folder_name}/virtioa.qcow2 10G",  # Disco
            "/opt/unetlab/wrappers/unl_wrapper -a fixpermissions"  # Permissions
        ]

        for command in commands:
            output, error = run_ssh(command)
            if error:
                print(f"Error running command: {command}\nError: {error}")
            else:
                print(f"Successfully ran command: {command}\nOutput: {output}")

if __name__ == "__main__":
    main()