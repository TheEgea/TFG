interfaces {
    ethernet eth0 {
        address "172.16.2.2/30"
        description "UPLINK-PFSENSE"
        hw-id "50:00:00:02:00:00"
        offload { gro; gso; sg; tso }
    }
    ethernet eth1 {
        address "192.168.50.1/24"
        description "Net-Servers"
        hw-id "50:00:00:02:00:01"
        offload { gro; gso; sg; tso }
    }
    ethernet eth2 {
        address "192.168.60.1/24"
        description "Net-Internal"
        hw-id "50:00:00:02:00:02"
        offload { gro; gso; sg; tso }
    }
    loopback lo {
    }
}
nat {
    source {
        rule 10 {
            description "SNAT Net-Servers to WAN"
            outbound-interface { name "eth0" }
            source { address "192.168.50.0/24" }
            translation { address "masquerade" }
        }
        rule 20 {
            description "SNAT Net-Internal to WAN"
            outbound-interface { name "eth0" }
            source { address "192.168.60.0/24" }
            translation { address "masquerade" }
        }
    }
}
protocols {
    static {
        route 0.0.0.0/0 {
            next-hop 172.16.2.1 {
            }
        }
    }
}
service {
    ssh {
        port "22"
    }
    ntp {
        allow-client { address "0.0.0.0/0" }
        server time1.vyos.net { }
        server time2.vyos.net { }
    }
}
system {
    config-management { commit-revisions "100" }
    console { device ttyS0 { speed "115200" } }
    host-name "vyos-lab3"
    login {
        user vyos {
            authentication {
                encrypted-password "$6$rounds=656000$vyos$..."
                plaintext-password ""
            }
        }
    }
    syslog { local { facility all { level "info" } } }
    time-zone "Europe/Madrid"
}
// vyos-config-version: rolling-2026.02.13
