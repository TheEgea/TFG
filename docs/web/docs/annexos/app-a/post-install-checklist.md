## Post-Install Checklist

- *** CPU type set to `host` in Proxmox VM options.
    - *** VM autostart enabled in Proxmox.
    - *** Snapshot taken after successful EVE-NG installation.
    - *** Default admin password changed.
    - *** OS Client Side installed on instructor workstation (HTML5 console
          option does not require it).
    - *** Image directories created under
          /opt/unetlab/addons/qemu/ and permissions fixed
          with `unl_wrapper -a fixpermissions`.