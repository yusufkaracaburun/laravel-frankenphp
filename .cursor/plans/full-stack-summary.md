# Full Stack Summary

## Architecture Overview

- **Backend:** Laravel API (FrankenPHP) with central and tenant domains
- **Frontend:** React SPA with shadcn/ui
- **Auth:** Fortify + Sanctum
- **Multi-tenancy:** Tenancy for Laravel v3 (domain-based, multi-database)
- **Infrastructure:** Docker, MySQL 8, Redis 7, Supervisor

---

## Backend (Laravel)

| Layer | Technology |
|-------|------------|
| Runtime | FrankenPHP (PHP 8.4) |
| Framework | Laravel |
| Auth | Fortify + Sanctum |
| Multi-tenancy | Tenancy for Laravel v3 |
| API docs | Scramble – OpenAPI/Swagger generator |

### Packages

Mollie, Horizon, Telescope, Spatie Permission, Spatie Activity Log, Spatie Query Builder, Laravel Excel, Spatie Webhook Client, Scramble, Pint, IDE Helper, Debugbar

### Design Patterns

Service layer, Actions, DTOs, API Resources, Form Requests, Policies, Jobs, Events

### Coding Guidelines

PSR-12, SOLID, thin controllers, consistent naming, API versioning

---

## Frontend (React)

| Layer | Technology |
|-------|------------|
| Framework | React |
| Build | Vite |
| UI | shadcn/ui + Tailwind CSS |
| Routing | React Router |

### Must-have Packages

TanStack Query, React Hook Form, Zod, @hookform/resolvers, Axios, Lucide React, Sonner, date-fns, clsx, tailwind-merge

### Recommended Packages

Zustand, TanStack Table, cmdk, Recharts

### Additional Packages

react-dropzone, @dnd-kit/core, framer-motion, @react-pdf/renderer, react-i18next

### Dev Tools

ESLint, Prettier, Vitest

### Design Patterns

Component composition, custom hooks, React Query for server state, Zustand for client state

### Coding Guidelines

Functional components, TypeScript, small components, accessibility

---

## Infrastructure

| Component | Technology |
|-----------|------------|
| Containerization | Docker + Docker Compose |
| Web server | FrankenPHP (Caddy) |
| Database | MySQL 8.0 |
| Cache / queues | Redis 7 |
| Process manager | Supervisor |
| Dev tools | phpMyAdmin, Redis Commander |

---

## Domain Model

| Domain | Frontend | Backend | Database |
|--------|----------|---------|----------|
| Central (app.yoursaas.com) | Landing, signup, billing | Central API routes | Central DB |
| Tenant (acme.yoursaas.com) | Dashboard, features | Tenant API routes | Tenant DB |

---

## Data Flow

```
User → React (shadcn) → Laravel API (Fortify/Sanctum)
                    → Tenancy (domain → tenant)
                    → MySQL / Redis
                    → Horizon (queues)
                    → Mollie (payments)
                    → Webhooks (Spatie)
                    → Scramble (API docs)
```

---

## Scramble (API Documentation)

[Scramble](https://scramble.dedoc.co/) generates OpenAPI (Swagger) documentation from Laravel routes and controllers automatically:

- No manual PHPDoc annotations required
- OpenAPI 3.1.0 format
- Works with Spatie Query Builder
- Pro version supports Laravel Data, Laravel Actions
- Uses Stoplight Elements for UI

Install: `composer require dedoc/scramble`

---

## Laravel Skills (Laravel Boost)

[Laravel Skills](https://skills.laravel.cloud/) provides AI agent skills for Laravel. Requires `laravel/boost` (dev). Install skills with `php artisan boost:add-skill owner/repo`.

### Recommended Skills

| Skill | Install command | Purpose |
|-------|-----------------|---------|
| developing-with-fortify | `php artisan boost:add-skill laravel/developing-with-fortify` | Fortify auth (login, register, 2FA, headless) |
| laravel-11-12-app-guidelines | `php artisan boost:add-skill thienanblog/laravel-11-12-app-guidelines` | Laravel 12, Docker, Fortify, API-only, Pint |
| laravel-specialist | `php artisan boost:add-skill jeffallan/laravel-specialist` | Eloquent, API resources, Sanctum, Horizon |
| laravel-best-practices | `php artisan boost:add-skill asyrafhussin/laravel-best-practices` | Controllers, models, migrations, services |
| eloquent-best-practices | `php artisan boost:add-skill iserter/eloquent-best-practices` | Query optimization, N+1 avoidance |
| php-best-practices | `php artisan boost:add-skill asyrafhussin/php-best-practices` | PSR, SOLID, type safety |

### Optional Skills

| Skill | Install command | When to use |
|-------|-----------------|-------------|
| pennant-development | `php artisan boost:add-skill laravel/pennant-development` | Feature flags with Laravel Pennant |
| ai-sdk-development | `php artisan boost:add-skill laravel/ai-sdk-development` | AI features with Laravel AI SDK |

### Skills to Skip

- **inertia-react-development** – Not using Inertia (separate React SPA)
- **shadcn-vue** – Using React + shadcn, not Vue
