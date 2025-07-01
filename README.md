````markdown
# 🎓 Student API — FastAPI + MySQL + Google Cloud SQL

Une API REST sécurisée pour gérer des étudiants (`Student`), construite avec **FastAPI**, **SQLAlchemy**, **MySQL** (Cloud SQL GCP), **Docker**, et des protections intégrées (validation, anti-DDoS, CORS, etc).

---

## 🚀 Fonctionnalités

- 🔐 Sécurité : validation stricte, protection contre les injections, gestion d'erreurs propre
- 🔄 CRUD étudiants (`GET`, `POST`)
- 🌐 Connexion sécurisée à Cloud SQL (MySQL)
- 🛡️ Limitation de requêtes (`slowapi`)
- 🧪 Basée sur Pydantic + SQLAlchemy ORM
- ☁️ Prête pour déploiement sur GCP / Cloud Run

---

## 📁 Arborescence

```text
.
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   ├── database.py
├── .env
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── README.md
````

---

## ⚙️ Variables `.env`

Crée un fichier `.env` à la racine :

```env
DB_USER=ton_user_sql
DB_PASSWORD=ton_password
DB_NAME=students_db
INSTANCE_CONNECTION_NAME=projet-gcp:region:instance-name
PRIVATE_IP=False
GOOGLE_APPLICATION_CREDENTIALS=/app/credentials.json
```

> Place aussi `credentials.json` à la racine (et ajoute-le dans `.gitignore`)

---

## 🐳 Démarrer avec Docker

```bash
docker-compose up --build
```

Visite l’API à : [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 📌 Endpoints principaux

| Méthode | URL          | Description                        |
| ------- | ------------ | ---------------------------------- |
| `GET`   | `/students/` | Lister les étudiants               |
| `POST`  | `/students/` | Ajouter un étudiant (limite 5/min) |

---

## 🧩 Exemple JSON `POST /students/`

```json
{
  "Nom": "Durand",
  "Prenom": "Alice",
  "Email": "alice@example.com",
  "Date_de_naissance": "2001-03-15"
}
```

---

## ✅ Sécurité & bonnes pratiques

* ✅ Validation Pydantic (`EmailStr`, `constr`)
* ✅ Longueurs max côté base (`String(length)`)
* ✅ Middleware d’erreurs globales
* ✅ Rate limiting (via IP)
* ✅ CORS activé (configurable)
* ✅ Variables sensibles dans `.env`

---

## 🧪 Tester l’API

* Swagger UI : [http://127.0.0.1:8000/docs](http://localhost:8000/docs)
* OpenAPI JSON : [http://127.0.0.1:8000/openapi.json](http://localhost:8000/openapi.json)

---


---
## © License

MIT – créé par [@Yvann Ds](mailto:yvann075@gmail.com)

```
