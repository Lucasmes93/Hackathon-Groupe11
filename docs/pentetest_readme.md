# 🛡️ Pentest Automatisé d'un Serveur MCP sous Docker (Kali Linux)

Ce guide complet permet de lancer un test d’intrusion local contre un serveur MCP (Minecraft Custom Protocol ou tout autre service similaire) tournant dans un conteneur Docker, depuis Kali Linux.

Le script fourni effectue automatiquement l’énumération réseau, le scan de ports, la vérification des privilèges, et d’autres tests courants. Un rapport texte est généré avec toutes les commandes exécutées et leurs résultats.

---

## 📦 Fichiers fournis

- `pentest_mcp.sh` : Script principal de pentest
- `pentest_mcp_report_<date>.txt` : Rapport généré automatiquement à chaque exécution

---

## ⚙️ Prérequis

### Système :
- Kali Linux (ou distribution Debian avec Docker)
- Docker installé et en cours d’exécution

### Outils recommandés :
- `nmap`
- `netcat` (`nc`)
- `mcstatus` *(optionnel pour test Minecraft)*

### Installer `mcstatus` (optionnel) :

```bash
pip install mcstatus

```
chmod +x pentest_mcp.sh
```

```
./pentest_mcp.sh
```

```
pentest_mcp_report_2025-07-02_15-43-10.txt
```