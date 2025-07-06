# 🚀 Hackathon-Groupe11

Bienvenue sur le dépôt du projet **Hackathon-Groupe11** !  
Ce projet a été réalisé dans le cadre d’un hackathon et combine une application web moderne avec une API backend robuste.

---

## 🗂️ Structure du projet

```
Hackathon-Groupe11/
│
├── backend/         # API Python (FastAPI)
│   ├── app/         # Code source backend
│   ├── public/      # Images connues pour la reconnaissance faciale
│   ├── Dockerfile   # Conteneurisation backend
│   └── requirements.txt
│
├── src/             # Frontend React + TypeScript
│   ├── components/  # Composants réutilisables
│   ├── pages/       # Pages principales
│   └── assets/      # Images et ressources
│
├── public/          # Modèles de reconnaissance faciale
├── docs/            # Documentation, rapports, chartes
├── package.json     # Dépendances frontend
└── README.md        # Ce fichier
```

---

## ✨ Fonctionnalités principales

- 🔒 Authentification sécurisée
- 🧑‍💻 Reconnaissance faciale (Face Recognition)
- 💬 Chat intégré
- 📄 Pages légales : Politique de confidentialité, Conditions d’utilisation
- 🐳 Conteneurisation Docker pour le backend
- 📊 Documentation et rapports de sécurité inclus

---

## ⚙️ Installation & Lancement

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-utilisateur/Hackathon-Groupe11.git
cd Hackathon-Groupe11
```

### 2. Lancer le backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # ou .\venv\Scripts\activate sous Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Ou via Docker :

```bash
docker build -t hackathon-backend .
docker run -p 8000:8000 hackathon-backend
```

### 3. Lancer le frontend (React)

```bash
npm install
npm run dev
```

---

## 🖼️ Aperçu

- Page d’accueil moderne avec logo Estiam
- Interface de chat conviviale
- Module de reconnaissance faciale en temps réel

---

## 📁 Documentation

- [Charte de confidentialité](docs/Charte_de_confidentialite_HackSquad%201.pdf)
- [Politique de confidentialité](docs/Politique_de_confidentialite_HackSquad%201.pdf)
- [Rapport d’audit sécurité](docs/Rapport_Audit_Securite.pdf)
- [Stratégie de gouvernance](docs/Strategie_Gouvernance.pdf)
- [Rapport de pentest](docs/rapport_pentest_mcp.md)

---

## 👥 Équipe

- Lucas Messia-Doliveux
- Iles Yazi
- Yvann De-Souza
- Yanis Mekkaoui
- Thibault Druelle
- Sidy Diallo
- Reda Bouhired
- Quentin Gautier
- Philippe-Ivan Mbarga
- Ousmane-Mamadou Djire
- Maxime-Jules-Elliott Feltrin
- Koboyo-Florent Atakora
- Japhet Ntantu
- Gabriel Molinier
- Adam Amara

---

## 🛡️ Sécurité

- Audit de sécurité réalisé (voir docs/)
- Pentest inclus (voir docs/pentest_mcp.sh)

---

## 📜 Licence

Ce projet est sous licence [MIT](LICENSE) (à adapter selon votre cas).

---

## 🙏 Remerciements

Merci à tous les membres de l’équipe, aux encadrants et à l’école Estiam pour leur soutien lors de ce hackathon !

---

## Démo de l'application
[![Watch the demo](https://img.youtube.com/vi/nXD0ZHyaxFw/0.jpg)](https://www.youtube.com/watch?v=nXD0ZHyaxFw)
