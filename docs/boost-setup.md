# Laravel Boost Setup

## Installation

- Require the package in your Laravel 12 project:

```bash
composer require laravel/boost --dev
```

- Run the installer to generate MCP configuration, AI guidelines, and skills for your selected agents (including Cursor):

```bash
php artisan boost:install
```

If you change your Composer dependencies later, you can re‑run `php artisan boost:install` to regenerate guidelines and skills.

## Environment notes

This project is configured to avoid requiring a local Redis extension:

- `SESSION_DRIVER=file`
- `QUEUE_CONNECTION=sync`
- `CACHE_STORE=file`

If you later install Redis and want to use it, you can switch these values in `.env` and `.env.example` back to `redis` and configure your Redis server accordingly.

## Generated files

Laravel Boost generates several files that are safe to regenerate and are ignored by git:

- `.mcp.json`
- `boost.json`
- `CLAUDE.md`
- `AGENTS.md`
- `junie/`
- `.ai/guidelines/`
- `.ai/skills/`

If they are ever missing or out of date, run:

```bash
php artisan boost:install
```

to recreate them.

## Cursor configuration

To use Boost from Cursor:

1. Open the command palette (`Cmd+Shift+P` or `Ctrl+Shift+P`).
2. Run `/open MCP Settings`.
3. Enable the `laravel-boost` server.

Cursor will then connect to the Boost MCP server, which runs:

```bash
php artisan boost:mcp
```

## Example things to ask Boost from Cursor

- “Use Laravel Boost to show Laravel and PHP versions plus installed Laravel ecosystem packages.”
- “Use Laravel Boost to list routes and summarize the main ones.”
- “Use Laravel Boost to describe the schema for the `users` table.”
- “Use Laravel Boost to read the last application error from the logs and explain it.”
- “Use Laravel Boost Search Docs to show how to configure queues in Laravel 12.”

