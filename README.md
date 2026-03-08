# Draw — Plateforme de tournois self-hosted

Application web permettant d'organiser et gérer des tournois en self-hosting.

## Stack technique

- **Backend** : Symfony 7.4 (API) — PHP 8.2+
- **Frontend** : Next.js 16 — React 19, TypeScript, Tailwind CSS
- **Base de données** : PostgreSQL 16
- **Temps réel** : Mercure
- **Serveur web** : Nginx + PHP-FPM
- **Déploiement** : Docker Compose, compatible Coolify

## Prérequis

- Docker & Docker Compose

## Développement

```bash
# Lancer l'environnement de dev
docker compose -f docker-compose.dev.yml --env-file .env.dev up --build
```

| Service    | URL                         |
|------------|-----------------------------|
| Frontend   | http://localhost:3000        |
| API        | http://localhost:8080        |
| PostgreSQL | localhost:5432               |
| Mercure    | http://localhost:3001/.well-known/mercure |

Les fichiers sources sont montés en volume : le hot-reload est actif sur le frontend et le backend.

## Production (Coolify)

1. Connecter le dépôt Git dans Coolify (type **Docker Compose**)
2. Configurer les variables d'environnement (voir `.env.prod`)
3. Associer les domaines aux services :
   - `api.example.com` → nginx:80
   - `app.example.com` → frontend:3000
   - `mercure.example.com` → mercure:80

## Structure du projet

```
├── backend/            # Symfony API
│   ├── docker/         # nginx.conf, php.ini
│   └── Dockerfile
├── frontend/           # Next.js
│   └── Dockerfile
├── docker-compose.yml      # Production
├── docker-compose.dev.yml  # Développement
├── .env.dev                # Variables d'env dev
└── .env.prod               # Variables d'env prod (template)
```
