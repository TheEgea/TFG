interfaces {
    ethernet eth0 {
        address "172.16.1.2/30"
        description "Net-Link-pfSense"
        hw-id "50:00:00:02:00:00"
        offload { gro; gso; sg; tso }
    }
    ethernet eth1 {
        address "192.168.30.1/24"
        description "Net-DMZ-Servers"
        hw-id "50:00:00:02:00:01"
        offload { gro; gso; sg; tso }
    }
    ethernet eth2 {
        address "10.0.40.1/24"
        description "Net-Attackers-Parrot"
        hw-id "50:00:00:02:00:02"
        offload { gro; gso; sg; tso }
    }
    ethernet eth3 {
        hw-id "50:00:00:02:00:03"
        offload { gro; gso; sg; tso }
    }
    loopback lo {
    }
}
nat {
    source {
        rule 10 {
            description "NAT attackers to pfSense"
            source { address "10.0.40.0/24" }
            translation { address "masquerade" }
        }
        rule 20 {
            description "NAT DMZ to WAN"
            outbound-interface { name "eth0" }
            source { address "192.168.30.0/24" }
            translation { address "masquerade" }
        }
    }
}
protocols {
    static {
        route 0.0.0.0/0 {
            next-hop 172.16.1.1 {
            }
        }
    }
}
service {
    dns {
        forwarding {
            allow-from "192.168.30.0/24"
            allow-from "10.0.40.0/24"
            cache-size "200"
            listen-address "192.168.30.1"
            listen-address "10.0.40.1"
        }
    }
    ntp {
        allow-client {
            address "0.0.0.0/0"
        }
        server time1.vyos.net { }
        server time2.vyos.net { }
        server time3.vyos.net { }
    }
}
system {
    config-management { commit-revisions "100" }
    console { device ttyS0 { speed "115200" } }
    host-name "vyos-lab2"
    login {
        user vyos {
            authentication {
                encrypted-password "$6$rounds=656000$RttPhfiS1882Xufu$mvLPxZhz5b/xIaaiM0fhVrTCerX2.VbvSczO9iJQlgZsDXnQm5Ps.JiDqyKadQtjeuAWGscbIFRWMztIIvVMB1"
                plaintext-password ""
            }
        }
    }
    static-host-mapping {
        host-name attacker.lab2.internal { inet "10.0.40.10" }
        host-name router.lab2.internal   { inet "192.168.30.1" }
        host-name server-a.lab2.internal { inet "192.168.30.10" }
        host-name server-b.lab2.internal { inet "192.168.30.20" }
    }
    syslog { local { facility all { level "info" } } }
    time-zone "Europe/Madrid"
}
// vyos-config-version: ...rolling
// Release version: 2026.02.13-0029-rolling
