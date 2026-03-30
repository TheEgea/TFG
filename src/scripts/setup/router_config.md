# Lab 1 Router

```bash
configure

#### WAN towards Firewall (pfSense) ####
set interfaces ethernet eth0 address '172.16.0.2/30'

#### LAN side towards Switch, trunk (VLANs 10 and 20) ####
# Physical interface eth1 carries VLAN tags
# No IP on plain eth1, only on subinterfaces
delete interfaces ethernet eth1 address

# VLAN 10 - Users (PC1)
set interfaces ethernet eth1 vif 10 description 'VLAN10-Users'
set interfaces ethernet eth1 vif 10 address '192.168.10.1/24'

# VLAN 20 - Servers (Server)
set interfaces ethernet eth1 vif 20 description 'VLAN20-Servers'
set interfaces ethernet eth1 vif 20 address '192.168.20.1/24'

#### Default route towards pfSense ####
set protocols static route 0.0.0.0/0 next-hop '172.16.0.1'

#### DHCP server for VLAN 10 (Users) ####
set service dhcp-server shared-network-name VLAN10-Users subnet 192.168.10.0/24 default-router '192.168.10.1'
set service dhcp-server shared-network-name VLAN10-Users subnet 192.168.10.0/24 dns-server '8.8.8.8'
set service dhcp-server shared-network-name VLAN10-Users subnet 192.168.10.0/24 range 0 start '192.168.10.50'
set service dhcp-server shared-network-name VLAN10-Users subnet 192.168.10.0/24 range 0 stop '192.168.10.100'

#### DHCP server for VLAN 20 (Servers) ####
set service dhcp-server shared-network-name VLAN20-Servers subnet 192.168.20.0/24 default-router '192.168.20.1'
set service dhcp-server shared-network-name VLAN20-Servers subnet 192.168.20.0/24 dns-server '8.8.4.4'
set service dhcp-server shared-network-name VLAN20-Servers subnet 192.168.20.0/24 range 0 start '192.168.20.50'
set service dhcp-server shared-network-name VLAN20-Servers subnet 192.168.20.0/24 range 0 stop '192.168.20.100'

#### Basic system bits (optional, si no los tienes ya) ####
set system host-name 'Router'
set system name-server '8.8.8.8'

commit
save
exit

```