# 3. Objectius i Abast

## 3.1 Objectiu Principal

Desenvolupar, implementar i validar un paquet docent reutilitzable de laboratoris pràctics de ciberseguretat basat en EVE-NG, que permeti als estudiants de l'assignatura "Introduction to Cybersecurity" adquirir competències pràctiques en pentesting ètic mitjançant escenaris realistes i automatitzats.

## 3.2 Objectius Específics (Mesurables amb KPIs)

### OE1: Dissenyar i Implementar Laboratoris EVE-NG
**Descripció**: Crear quatre laboratoris temàtics funcionals i interconnectats.

**KPIs Mesurables**:
- 4 topologies .unl completament funcionals (100%)
- Temps de desplegament ≤ 2 minuts per laboratori (95% dels casos)
- Taxa d'èxit en el boot de VMs ≥ 95%
- Compatibilitat amb EVE-NG Community i Professional editions

**Lliurables**:
- 4 fitxers .unl (topologies)
- 8-12 imatges de màquines virtuals optimitzades
- Documentació tècnica de configuració per laboratori

### OE2: Desenvolupar Scripts d'Automatització
**Descripció**: Crear un sistema d'automatització complet per al cicle de vida dels laboratoris.

**KPIs Mesurables**:
- 12 scripts funcionals (3 per laboratori: deploy, reset, validate)
- Temps d'execució del reset ≤ 30 segons per laboratori
- Cobertura de validació automàtica ≥ 80% dels components crítics
- Zero errors en 10 execucions consecutives del cicle complet

**Lliurables**:
- Scripts de desplegament (Bash/Python)
- Scripts de reset automatitzat
- Scripts de validació i verificació d'estat

### OE3: Crear Material Docent Estructurat
**Descripció**: Desenvolupar documentació completa per a estudiants i professorat.

**KPIs Mesurables**:
- 4 manuals d'usuari (1 per laboratori), mínim 15 pàgines cadascun
- 4 rúbriques d'avaluació amb criteris quantificables
- 1 guia de docent amb instruccions de desplegament
- Temps de configuració inicial per docent ≤ 1 hora

**Lliurables**:
- Manual de l'alumne (anglès, format markdown/PDF)
- Guia del professor amb instruccions detallades
- Rúbriques d'avaluació estruturades
- README tècnic amb requisits i instruccions

### OE4: Validar la Usabilitat i Eficàcia Educativa
**Descripció**: Verificar que el paquet compleix els requisits educatius i tècnics.

**KPIs Mesurables**:
- Temps mitjà de resolució per laboratori: 90-120 minuts
- Taxa de finalització exitosa ≥ 85% (pilot amb 10 usuaris)
- Puntuació de satisfacció usuaris ≥ 4/5
- Zero incidències crítiques en entorn de producció

**Lliurables**:
- Informe de validació pilot
- Mètriques d'usabilitat i rendiment
- Recomanacions de millora implementades

## 3.3 Definició del Client i Usuari Final

### Client Principal
- **Professor responsable**: Pere Vidiella i Catalan
- **Assignatura**: Introduction to Cybersecurity (GEISI, Tecnocampus)
- **Context**: Docència de grau en ciberseguretat pràctica

### Usuaris Finals Primaris
- **Estudiants de GEISI**: 25-30 alumnes per edició
- **Perfil**: Coneixements bàsics en xarxes i sistemes operatius
- **Objectiu**: Aprendre pentesting ètic de forma pràctica i segura

### Usuaris Finals Secundaris
- **Professorat de ciberseguretat**: Altres docents interessats en reutilitzar el material
- **Estudiants de postgrau**: Possibles extensions del material per a nivells avançats

## 3.4 Públic Potencial

### Àmbit Intern (Tecnocampus)
- Altres assignatures relacionades amb ciberseguretat
- Projectes de recerca en seguretat informàtica
- Formació contínua i certificacions professionals

### Àmbit Extern
- Institucions educatives amb formació en ciberseguretat
- Centres de formació professional especialitzats
- Empreses amb programes de formació interna en seguretat

## 3.5 KPIs i Indicadors Clau de Rendiment

### Indicadors Tècnics
| Mètrica | Objectiu | Mètode de Mesura |
|---------|----------|------------------|
| Temps desplegament laboratori | ≤ 2 min | Cronometratge automatitzat |
| Taxa d'èxit boot VMs | ≥ 95% | Logs de sistema + scripts validació |
| Temps reset complet | ≤ 30 seg | Scripts amb timestamps |
| Reproducibilitat escenaris | 100% | Tests automatitzats |

### Indicadors Educatius
| Mètrica | Objectiu | Mètode de Mesura |
|---------|----------|------------------|
| Temps resolució laboratori | 90-120 min | Tracking temporal en pilot |
| Taxa de finalització exitosa | ≥ 85% | Seguiment progressió usuaris pilot |
| Satisfacció usuaris | ≥ 4/5 | Enquesta post-utilització |
| Comprensió conceptes clau | ≥ 80% correcte | Qüestionari d'avaluació |

### Indicadors de Qualitat
| Mètrica | Objectiu | Mètode de Mesura |
|---------|----------|------------------|
| Cobertura documentació | 100% funcionalitats | Checklist de verificació |
| Errors crítics | 0 | Testing exhaustiu |
| Compatibilitat versions EVE-NG | 100% | Tests en múltiples entorns |
| Usabilitat interfície | ≥ 4/5 | Avaluació heurística UX |

---

**Nota**: Tots els KPIs seran mesurats durant la fase de validació pilot (abril-maig 2026) i documentats en l'informe final del TFG.
