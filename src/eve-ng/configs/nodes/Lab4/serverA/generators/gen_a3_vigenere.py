#!/usr/bin/env python3
"""
Generador A3 — Vigenère + Kasiski (Media)
Produce: a3_documento_clasificado.txt
Flag: H4U{v1g3n3r3_k4s1sk1_4tt4ck}
Clave Vigenère: NEXATECH (8 letras)
"""

KEY = "NEXATECH"
FLAG = "H4U{v1g3n3r3_k4s1sk1_4tt4ck}"

def vigenere_encrypt(plaintext, key):
    key = key.upper()
    result = []
    key_idx = 0
    for c in plaintext:
        if c.isalpha():
            shift = ord(key[key_idx % len(key)]) - ord('A')
            base = ord('A') if c.isupper() else ord('a')
            result.append(chr((ord(c) - base + shift) % 26 + base))
            key_idx += 1
        else:
            result.append(c)
    return ''.join(result)

# Documento largo en inglés (importante: en inglés para que el análisis de frecuencias funcione)
# El flag está al final del documento
PLAINTEXT = """CLASSIFIED DOCUMENT — NOVATECH INTERNAL SECURITY REPORT
CLEARANCE LEVEL: ALPHA-3
DATE: 2026-04-10

EXECUTIVE SUMMARY

This report details the security assessment conducted on NovaCorp internal
infrastructure following anomalous network activity detected on the perimeter
firewall systems. The analysis team identified several critical vulnerabilities
that were actively exploited by an external threat actor.

SECTION ONE: INCIDENT TIMELINE

At approximately zero two hundred hours on the fourteenth of April the network
monitoring system generated alerts indicating unauthorized access to the internal
database server cluster. The attacker used stolen administrator credentials to
bypass the authentication layer and gain access to restricted file systems.

The threat actor proceeded to exfiltrate sensitive documentation including
personnel records, financial projections, and proprietary technical designs.
The exfiltration was conducted over an encrypted channel to avoid detection
by the deep packet inspection systems currently deployed at the network boundary.

SECTION TWO: AFFECTED SYSTEMS

Primary damage assessment indicates the following systems were compromised
during the intrusion event that lasted approximately three hours before
detection by the automated response platform triggered a system lockdown.

The database server containing customer records was accessed without authorization.
The file sharing system was used to stage the exfiltrated data temporarily.
The backup server was targeted but access was denied due to separate credentials.
The internal communications platform logs show lateral movement between systems.

SECTION THREE: THREAT ACTOR ANALYSIS

Based on the tactics techniques and procedures observed during this incident
the analysis team has attributed the attack to a sophisticated threat actor
with significant resources and advanced persistent threat capabilities.

The attacker demonstrated knowledge of internal network topology suggesting
prior reconnaissance activity or the assistance of an insider threat element.
Command and control infrastructure was identified in multiple geographic regions.

SECTION FOUR: CRYPTOGRAPHIC EVIDENCE

During forensic analysis of the compromised systems investigators recovered
encrypted communications between the attacker and external command infrastructure.
The following verification code was extracted from recovered memory artifacts.

VERIFICATION CODE: {flag}

This code confirms successful exfiltration of sensitive materials. The format
of the code matches previously observed threat actor communication patterns
documented in intelligence reports from partner security organizations.

SECTION FIVE: RECOMMENDATIONS

Immediate rotation of all administrative credentials across affected systems.
Implementation of multi factor authentication for privileged account access.
Enhanced monitoring of outbound network traffic with behavioral analytics.
Regular penetration testing exercises to identify vulnerabilities proactively.
Employee security awareness training to reduce insider threat risk exposure.

END OF CLASSIFIED DOCUMENT
""".format(flag=FLAG)

ciphertext = vigenere_encrypt(PLAINTEXT, KEY)

output = f"""=== ARCHIVO RECUPERADO: /home/admin/Documents/a3_documento_clasificado.txt ===
=== CIFRADO: Vigenere (clave desconocida) ===
=== LONGITUD TEXTO: {len([c for c in PLAINTEXT if c.isalpha()])} caracteres alfabéticos ===

{ciphertext}

--- FIN DEL DOCUMENTO CIFRADO ---
NOTA: El documento original estaba en inglés. La clave es una palabra en mayúsculas.
"""

with open("a3_documento_clasificado.txt", "w") as f:
    f.write(output)

print(f"[OK] a3_documento_clasificado.txt generado")
print(f"     Clave: {KEY}")
print(f"     Longitud texto: {len([c for c in PLAINTEXT if c.isalpha()])} caracteres alfabéticos")
print(f"     Flag en plaintext: {FLAG}")
print()
print("SOLUCIÓN ESPERADA DEL ALUMNO:")
print("  1. Detectar que es Vigenère por la distribución de frecuencias no uniforme")
print("  2. Usar test de Kasiski o IC para estimar longitud clave = 8")
print("  3. Analizar frecuencias en grupos cada 8 → recuperar NEXATECH")
print("  4. Descifrar → leer el flag al final del documento")
print(f"     Flag: {FLAG}")

# Verificar
def vigenere_decrypt(ct, key):
    key = key.upper()
    result = []
    key_idx = 0
    for c in ct:
        if c.isalpha():
            shift = ord(key[key_idx % len(key)]) - ord('A')
            base = ord('A') if c.isupper() else ord('a')
            result.append(chr((ord(c) - base - shift) % 26 + base))
            key_idx += 1
        else:
            result.append(c)
    return ''.join(result)

decrypted = vigenere_decrypt(ciphertext, KEY)
assert FLAG in decrypted, "ERROR: Flag no encontrada en texto descifrado"
print(f"[OK] Verificación: flag encontrada en texto descifrado")
