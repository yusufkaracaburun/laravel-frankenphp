# Laravel + FrankenPHP + Docker

A production-ready Laravel application stack using [FrankenPHP](https://frankenphp.dev/) as the web server, with MySQL, Redis, queue workers, and the task scheduler—all managed via Docker Compose. Includes a React SPA with authentication (Fortify + Sanctum) for user registration, login, logout, and profile updates.

## Table of contents

- [Stack overview](#stack-overview)
- [Requirements](#requirements)
- [Local development](#local-development)
  - [Initial setup](#initial-setup)
  - [Start the stack](#start-the-stack)
  - [Optional dev tools](#optional-dev-tools)
  - [Dev dashboards](#dev-dashboards-when-stack-is-running)
  - [Run Artisan, Composer, NPM](#run-artisan-composer-npm)
  - [Auth flow (React SPA + Sanctum)](#auth-flow-react-spa--sanctum)
  - [Manage the stack](#manage-the-stack)
  - [Full reset and rebuild](#full-reset-everything-removed--rebuild)
  - [Troubleshooting](#troubleshooting)
- [Production](#production)
  - [Configuration](#configuration)
  - [Deploy](#deploy)
  - [After code updates](#after-code-updates)
- [Multi-tenancy (Tenancy for Laravel)](#multi-tenancy-with-tenancy-for-laravel)
  - [Concept](#concept)
  - [Installation](#installation)
  - [Configuration](#configuration-1)
  - [Tenant identification](#tenant-identification)
  - [Migrations](#migrations)
  - [Queues, sessions, cache](#queues-sessions-cache)
  - [Local development with tenants](#local-development-with-tenants)
  - [Production with tenants](#production-with-tenants)
- [License](#license)

---

## Stack overview

- **Laravel** – PHP framework
- **FrankenPHP** – Modern PHP application server (Caddy + PHP, HTTP/3, Worker Mode)
- **MySQL 8.0** – Primary database
- **Redis 7** – Cache, sessions, and queues
- **Supervisor** – Manages FrankenPHP, queue workers, and scheduler in one container

## Requirements

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- Basic familiarity with Laravel and the command line

**Windows users:** Use WSL 2 and store the project under `/home/username/` (not `/mnt/c/`) for better performance.

---

## Local development

### Initial setup

1. Copy the environment file and configure it:
  ```bash
   cp .env.example .env
  ```
2. Ensure these values in `.env` match the Docker services:
  ```env
   DB_HOST=mysql
   DB_DATABASE=laravel
   DB_USERNAME=laravel
   DB_PASSWORD=secret
   REDIS_HOST=redis
   REDIS_PASSWORD=
   REDIS_PORT=6379
   CACHE_STORE=redis
   SESSION_DRIVER=redis
   QUEUE_CONNECTION=redis
  ```
   **Important:** Leave `REDIS_PASSWORD=` empty (not `null`). The string `"null"` causes Redis authentication errors.
3. Clear the bootstrap cache before the first build (avoids Laravel Pail issues):
  ```bash
   rm -f bootstrap/cache/packages.php bootstrap/cache/services.php
  ```

### Start the stack

```bash
docker compose up -d --build
```

On first run, this builds the FrankenPHP image and starts MySQL, Redis, and the app. The app will run migrations automatically.

**Local domains:** The central app is configured for `http://central.test` and tenants for `http://tenant1.test`, `http://tenant2.test`, etc. Add these to your hosts file so they resolve to `127.0.0.1` (e.g. on macOS/Linux: `/etc/hosts`). Example:

```
127.0.0.1 central.test tenant1.test tenant2.test
```

Then open the central app at [http://central.test](http://central.test) and tenant apps at [http://tenant1.test](http://tenant1.test), etc.

### Optional dev tools

Start phpMyAdmin and Redis Commander (dev profile):

```bash
docker compose --profile dev up -d phpmyadmin redis-commander
```

- phpMyAdmin: [http://localhost:8080](http://localhost:8080)
- Redis Commander: [http://localhost:8081](http://localhost:8081)

### Dev dashboards (when stack is running)

- **Central app:** [http://central.test](http://central.test) (or your `APP_URL`)
- **API docs (Scramble):** [http://central.test/docs/api](http://central.test/docs/api)
- **Horizon (queues):** [http://central.test/horizon](http://central.test/horizon)
- **Telescope (debugging):** [http://central.test/telescope](http://central.test/telescope)
- **Tenants:** [http://tenant1.test](http://tenant1.test), [http://tenant2.test](http://tenant2.test), etc. (after creating tenants and adding domains to `/etc/hosts`)

### Run Artisan, Composer, NPM

Enter the app container:

```bash
docker compose exec app bash
```

Then run commands as usual:

```bash
php artisan migrate
php artisan make:model Post -mcr
composer require spatie/laravel-permission
npm install && npm run dev
```

### Auth Flow (React SPA + Sanctum)

The app uses **Laravel Fortify** and **Sanctum** for SPA authentication (cookie-based):

1. **Backend (Docker):** Start the stack with `docker compose up -d --build`. The API runs at `http://central.test` (or your configured `APP_URL`). Ensure `central.test` and any tenant hosts (e.g. `tenant1.test`) are in your hosts file.
2. **Frontend:** Run `npm run dev` (from host or inside the app container). Vite serves assets; the React SPA is loaded from Laravel at the same origin.
3. **Auth flow:**
  - User visits `/login` or `/register`
  - Before login/register, the frontend calls `GET /sanctum/csrf-cookie` to obtain a CSRF token
  - Login: `POST /api/login` with `{ email, password }`
  - Register: `POST /api/register` with `{ name, email, password, password_confirmation }`
  - Profile: `GET /api/v1/user` (current user), `PUT /api/user/profile-information` (Fortify profile update)
  - Logout: `POST /api/logout`
4. **Environment:** Ensure `.env` has `SANCTUM_STATEFUL_DOMAINS`, `FRONTEND_URL`, and `CORS_ALLOWED_ORIGINS` (see `.env.example`).

### Manage the stack

- **View logs:** `docker compose logs -f app`
- **Stop:** `docker compose down`
- **Stop and remove volumes:** `docker compose down -v` (use with caution; deletes DB data)

### Full reset (everything removed) + rebuild

Use this when you want to completely wipe local state (including the MySQL database volume) and rebuild from scratch.

1. Stop containers and delete volumes (this wipes DB + Redis data):

```bash
docker compose down -v
```

2. (Optional) Remove built images and rebuild without cache:

```bash
docker compose build --no-cache
```

3. Start the stack again:

```bash
docker compose up -d --build
```

4. (Optional) Rerun seeders:

```bash
docker compose exec app php artisan migrate
docker compose exec app php artisan db:seed
docker compose exec app php artisan tenants:migrate
docker compose exec app php artisan tenants:seed
```

### Troubleshooting


| Issue                                                      | Solution                                                                       |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `require(/app/vendor/autoload.php): Failed to open stream` | Run `docker compose exec app composer install`                                 |
| Redis `NOAUTH Authentication required`                     | Set `REDIS_PASSWORD=` (empty) in `.env`                                        |
| Caddyfile `php_server` error                               | Ensure `order php_server before file_server` is in the global Caddy block      |
| Permission denied on `rm -rf`                              | Docker creates files as root; use `sudo rm -rf` when cleaning up from the host |


---

## Production

### Configuration

1. Set production values in `.env`:
  ```env
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://yourdomain.com
  ```
2. Use strong passwords for `DB_PASSWORD`, `DB_ROOT_PASSWORD`, and Redis if you add authentication.
3. **HTTPS:** Remove `auto_https off` from `docker/frankenphp/Caddyfile` so Caddy can obtain and renew Let's Encrypt certificates automatically.

### Deploy

```bash
docker compose up -d --build
```

### After code updates

```bash
docker compose exec app php artisan migrate --force
docker compose exec app php artisan config:cache
docker compose exec app php artisan route:cache
docker compose exec app php artisan view:cache
```

---

## Multi-tenancy with Tenancy for Laravel

This project can be extended for multi-tenant SaaS using [Tenancy for Laravel v3](https://tenancyforlaravel.com/docs/v3/introduction/).

### Concept

- **Central application:** Handles signups, billing, and tenant management.
- **Tenant application:** Per-tenant data and features, usually on subdomains (e.g. `tenant1.yourdomain.com`).

**Multi-database tenancy** is recommended: each tenant has its own database on the same MySQL container, with full data isolation.

### Installation

Inside the app container:

```bash
docker compose exec app composer require stancl/tenancy
docker compose exec app php artisan vendor:publish --tag=tenancy
```

Run central migrations:

```bash
docker compose exec app php artisan migrate
```

### Configuration

1. In `config/tenancy.php`, set multi-database tenancy mode.
2. In `config/database.php`:
  - **Central connection:** Use `DB_HOST=mysql`, `DB_DATABASE=central_db` (or your central DB name).
  - **Tenant connection template:** Same host (`mysql`), dynamic database name per tenant.

### Tenant identification

Use domain/subdomain middleware from the package. Example:

- Central: `app.yourdomain.com`
- Tenants: `{tenant}.yourdomain.com`

Configure central vs tenant routes per the [Tenancy for Laravel docs](https://tenancyforlaravel.com/docs/v3/concepts/routes/).

### Migrations

- **Central:** `php artisan migrate`
- **Tenant:** `php artisan tenants:artisan migrate` (or equivalent package command)

### Queues, sessions, cache

- Redis remains `REDIS_HOST=redis`; the package scopes queues, sessions, and cache to tenants.
- Jobs must be tenant-aware (use the package’s traits/middleware).
- Supervisor workers (`queue:work`, `schedule:run`) run as configured in `supervisord.conf`; ensure tenant context is applied per the package’s queue documentation.

### Local development with tenants

- Add wildcard subdomains in `/etc/hosts` (e.g. `127.0.0.1 tenant1.test tenant2.test`).
- Run tenant commands: `docker compose exec app php artisan tenants:artisan migrate`

### Production with tenants

- Configure DNS so tenant domains point to your FrankenPHP server.
- Use a secure `.env` and follow the package’s onboarding flow for tenant database creation.

---

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).