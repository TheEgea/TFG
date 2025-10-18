# Scripts de Workflow TFG 🛠️

Utilitats automatitzades per gestionar el desenvolupament del Treball Final de Grau.

## 📋 Scripts Disponibles

### 🚀 Scripts Principals de Git

#### `sync.sh` - Sincronització Completa
**Ús:** `./sync.sh "missatge de commit"`  
**Descripció:** Realitza pull, add, commit i push en una sola operació.
Exemples:
./sync.sh "docs: actualització capítol introducció"
./sync.sh "feat: nou laboratori DVWA"
./sync.sh "fix: correcció scripts automatització"

#### `push.sh` - Push Ràpid
**Ús:** `./push.sh "missatge de commit"`  
**Descripció:** Commit i push ràpid sense pull previ.

#### `pull.sh` - Pull Ràpid
**Ús:** `./pull.sh`  
**Descripció:** Baixa últims canvis de GitHub i mostra l'estat.

### 💾 Scripts de Backup

#### `backup-smb.sh` - Backup al Servidor SMB
**Ús:** `./backup-smb.sh`  
**Descripció:** Crea backup completa del projecte al servidor SMB amb timestamp.

### ⚙️ Scripts d'Utilitats

#### `setup-env.sh` - Configuració de l'Entorn
**Ús:** `./setup-env.sh`  
**Descripció:** Configura l'entorn de desenvolupament complet.

#### `utils.sh` - Utilitats i Estadístiques
**Ús:** `./utils.sh [comando]`  
**Comandos:** help, status, clean, stats

---

## 🎯 Workflow Diari Recomanat

### Launcher Principal (des de la raíz)

Usar el launcher tfg.sh des de la raíz:
./tfg.sh sync "docs: capítol metodologia completat"
./tfg.sh push "feat: implementació lab01 reconeixement"
./tfg.sh backup
./tfg.sh setup # Obre VSCode automàticament
---

*Scripts de Workflow TFG v1.0 - Octubre 2025*
