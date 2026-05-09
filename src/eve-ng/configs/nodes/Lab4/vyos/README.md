# VyOS -- Lab4 CipherStrike Router

## Credentials
- User: `vyos` / Password: `vyos`
- Console: telnet EVE-NG:32773

## Interfaces

| Interface | IP | Zone |
|-----------|-----|------|
| eth0 | 192.168.1.2/24 | LAN to pfSense |
| eth1 | 10.10.1.1/24 | Zone-A to ServerA |
| eth2 | 10.10.2.1/24 | Zone-B to ServerB |
| eth3 | 10.10.3.1/24 | Zone-C to ServerC |
| eth4 | 10.10.4.1/24 | Zone-Defense to Defender |

## Routing
Default route via pfSense LAN (192.168.1.1).

## EVE-NG bridge IPs (add each session on EVE-NG host)
```bash
ip addr add 10.10.1.253/24 dev vnet0_3
ip addr add 10.10.2.253/24 dev vnet0_4
ip addr add 10.10.3.253/24 dev vnet0_5
```
