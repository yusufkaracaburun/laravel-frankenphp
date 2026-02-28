# Laravel Boost Setup Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Install and configure Laravel Boost in this Laravel 12 project, wire it into Cursor via MCP, and verify that Boost tools (routes, DB schema, logs, docs) work correctly for local development.

**Architecture:** Use Laravel Boost’s official Composer package and Artisan commands (`boost:install`, `boost:update`, `boost:mcp`) as the single integration point. Let Boost manage MCP server configuration, AI guidelines, and skills, while we keep our repo clean with sensible `.gitignore` rules and minimal Composer scripting.

**Tech Stack:** Laravel 12, PHP 8.4+, Composer, Laravel Boost, MCP (Model Context Protocol), Cursor IDE.

---

### Task 1: Add Laravel Boost dependency

**Files:**
- Modify: `composer.json`

**Step 1: Add `laravel/boost` to require-dev**

Edit `composer.json` to include Laravel Boost in the `require-dev` section:

```json
"require-dev": {
    "fakerphp/faker": "^1.23",
    "laravel/pail": "^1.2.2",
    "laravel/pint": "^1.24",
    "laravel/sail": "^1.41",
    "mockery/mockery": "^1.6",
    "nunomaduro/collision": "^8.6",
    "phpunit/phpunit": "^11.5.3",
    "laravel/boost": "^1.0"
}
```

**Step 2: Install the package**

Run from the project root:

```bash
composer update laravel/boost --dev
```

Expected: Composer installs `laravel/boost` without errors.

**Step 3: Commit**

```bash
git add composer.json composer.lock
git commit -m "chore: add laravel boost dev dependency"
```

---

### Task 2: Run `boost:install` to generate MCP config, guidelines, and skills

**Files:**
- Generated (do not edit manually): `.mcp.json`, `boost.json`, `CLAUDE.md`, `AGENTS.md`, `.ai/guidelines/*`, `.ai/skills/*`, and any agent-specific folders (e.g. `junie/`)

**Step 1: Run the install command**

From the project root:

```bash
php artisan boost:install
```

When prompted:
- Select **Cursor** as a supported agent.
- Optionally also select any other tools you use (Claude Code, Codex, Gemini CLI, etc.).

Expected: Command completes successfully and reports generated guideline/skill files.

**Step 2: Verify Boost Artisan commands exist**

Run:

```bash
php artisan
```

Confirm you see at least:
- `boost:install`
- `boost:update`
- `boost:mcp`

**Step 3: Commit (optional)**

Decide whether to commit generated files or ignore them (next task). If you choose to commit:

```bash
git add .mcp.json boost.json CLAUDE.md AGENTS.md .ai
git commit -m "chore: run laravel boost install"
```

---

### Task 3: Configure `.gitignore` for Boost-generated artifacts

**Files:**
- Modify: `.gitignore`

**Step 1: Decide your policy**

Choose one:
- **A. Commit generated files** (for full reproducibility), or
- **B. Ignore generated files** and rely on `php artisan boost:install` / `boost:update` to regenerate them.

The Laravel docs explicitly allow ignoring these files.

**Step 2: Add ignore rules (if choosing to ignore)**

Append to `.gitignore`:

```gitignore
# Laravel Boost generated files (safe to regenerate)
.mcp.json
boost.json
CLAUDE.md
AGENTS.md
junie/
.ai/guidelines/
.ai/skills/
```

**Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: configure gitignore for laravel boost artifacts"
```

---

### Task 4: Keep Boost resources updated with `boost:update`

**Files:**
- Modify: `composer.json`

**Step 1: Manually test `boost:update`**

Run:

```bash
php artisan boost:update
```

Expected: Command completes successfully, updating guidelines/skills based on your installed packages.

**Step 2: Add `post-update-cmd` hook**

In `composer.json`, ensure `post-update-cmd` includes:

```json
"scripts": {
    "post-update-cmd": [
        "@php artisan boost:update --ansi"
    ]
}
```

If `post-update-cmd` already exists, merge this line into the existing array.

**Step 3: Commit**

```bash
git add composer.json
git commit -m "chore: run laravel boost update after composer updates"
```

---

### Task 5: Enable `laravel-boost` MCP server in Cursor

**Files:**
- No repo files changed; configuration happens inside Cursor.

**Step 1: Open MCP settings in Cursor**

- Open the command palette: `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux).
- Type `/open MCP Settings` and press enter.

**Step 2: Enable the Boost server**

- Find `laravel-boost` in the list of MCP servers.
- Turn the toggle **on** for `laravel-boost`.

Expected: Cursor reports that the `laravel-boost` MCP server is configured and running using:

```bash
php artisan boost:mcp
```

**Step 3: (Optional) Manual MCP JSON reference**

If you ever need to configure MCP manually, use:

```json
{
  "mcpServers": {
    "laravel-boost": {
      "command": "php",
      "args": ["artisan", "boost:mcp"]
    }
  }
}
```

---

### Task 6: Verify application environment for Boost tools

**Files:**
- Verify: `.env`, `.env.example`

**Step 1: Confirm database configuration**

Open `.env` and ensure at minimum:
- `DB_CONNECTION` is set correctly (e.g. `mysql`, `pgsql`, or `sqlite`).
- Other DB credentials (`DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`) are valid for your local environment.

**Step 2: Confirm logging configuration**

Ensure `LOG_CHANNEL` is configured (Laravel defaults are fine) so that Boost can read log files:

```env
LOG_CHANNEL=stack
```

**Step 3: Mirror critical values into `.env.example`**

Update `.env.example` so new developers have a sane starting point, keeping any secrets blank:

```env
DB_CONNECTION=mysql
LOG_CHANNEL=stack
```

**Step 4: Commit**

```bash
git add .env.example
git commit -m "chore: align env example for laravel boost usage"
```

---

### Task 7: Smoke-test Laravel Boost MCP tools from Cursor

**Files:**
- No repo changes; this is a runtime verification task.

**Step 1: Test Application Info**

From Cursor chat (in this project directory), ask:

> Use Laravel Boost to fetch application info (Laravel and PHP versions, ecosystem packages, Eloquent models).

Expected:
- Response includes Laravel 12 and PHP 8.4+.
- Lists installed Laravel ecosystem packages.

**Step 2: Test routes inspection**

Ask Cursor:

> Use Laravel Boost to list the application routes and summarize the main ones.

Expected:
- Output similar to `php artisan route:list`.
- No errors about missing routes or failing to bootstrap the app.

**Step 3: Test database schema**

Ask Cursor:

> Use Laravel Boost to show the schema for the `users` table.

Expected:
- A schema description matching your migrations.
- No DB connection errors.

**Step 4: Test logs / last error**

Trigger a small, safe error (e.g. open a non-existent route in the browser), then ask:

> Use Laravel Boost to read the last error from the logs and explain it.

Expected:
- Boost reads the latest log entry.
- Explanation matches the deliberate error you triggered.

**Step 5: Test documentation search**

Ask Cursor:

> Use Laravel Boost Search Docs to show how to configure queues in Laravel 12.

Expected:
- Response citing relevant Laravel 12 docs content.

---

### Task 8: Document Laravel Boost setup for the project

**Files:**
- Create: `docs/boost-setup.md`

**Step 1: Create `docs/boost-setup.md`**

Add a concise guide that includes:

```markdown
# Laravel Boost Setup

## Installation

- `composer require laravel/boost --dev`
- `php artisan boost:install`
- (Optional) `php artisan boost:update`

## Composer Hook

```json
{
  "scripts": {
    "post-update-cmd": [
      "@php artisan boost:update --ansi"
    ]
  }
}
```

## Cursor Configuration

1. Open the command palette (`Cmd+Shift+P`).
2. Run `/open MCP Settings`.
3. Enable `laravel-boost`.

## Notes

- Generated Boost files (`.mcp.json`, `boost.json`, `CLAUDE.md`, `AGENTS.md`, `.ai/guidelines/*`, `.ai/skills/*`) are safe to regenerate via `boost:install` / `boost:update`.
- Use Boost tools for application info, routes, DB schema, logs, and docs search.
```

Adjust text to match the actual decisions you made (e.g. whether you ignore generated files).

**Step 2: Commit**

```bash
git add docs/boost-setup.md
git commit -m "docs: add laravel boost setup guide"
```

---

### Task 9: Optional – Add project-specific guidelines and skills

**Files:**
- Create: `.ai/guidelines/...` (optional)
- Create: `.ai/skills/{skill-name}/SKILL.md` (optional)

**Step 1: Identify recurring project patterns**

Decide which topics would benefit from AI-aware documentation, such as:
- Domain workflows (e.g. “invoice creation”, “subscription lifecycle”).
- Project-specific architecture conventions.

**Step 2: Add custom guideline (optional)**

Create a file like:

```text
.ai/guidelines/project-architecture.md
```

Describe overall architecture, conventions, and constraints in a concise, actionable way.

**Step 3: Add custom skill (optional)**

Create:

```text
.ai/skills/creating-invoices/SKILL.md
```

Use the Agent Skills format (YAML frontmatter with `name` and `description`, followed by Markdown instructions).

**Step 4: Refresh Boost resources**

Run:

```bash
php artisan boost:update
```

Expected: Boost picks up your new or overridden guidelines and skills.

**Step 5: Commit (if you choose to version these)**

```bash
git add .ai
git commit -m "feat: add project-specific laravel boost guidelines and skills"
```

