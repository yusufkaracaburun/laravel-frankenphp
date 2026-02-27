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
