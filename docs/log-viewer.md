## Log Viewer

This project uses the [`opcodesio/log-viewer`](https://log-viewer.opcodes.io/docs/3.x) package to inspect application logs via a browser UI.

- **URL (central domains only)**: `/log-viewer`
- **Domain**: Respects `LOG_VIEWER_DOMAIN` (e.g. `central.test`) and is **not** available on tenant domains.
- **Access control**: Only authenticated users who either have the `admin` role or the `view log viewer` permission can access Log Viewer.
- **Stateful API domains**: Controlled via `LOG_VIEWER_API_STATEFUL_DOMAINS` in `.env`.

### Configuration

- Main config: `config/log-viewer.php`
  - `route_domain` is driven by `LOG_VIEWER_DOMAIN` (e.g. `central.test`).
  - `route_path` is `log-viewer`, so the UI lives at `/log-viewer`.
  - `middleware` includes `web`, `auth`, and `AuthorizeLogViewer`.

### Environment

Key environment variables:

- `LOG_VIEWER_DOMAIN` – central host that serves `/log-viewer` (e.g. `central.test` in local development).
- `LOG_VIEWER_API_STATEFUL_DOMAINS` – comma‑separated list of hosts treated as stateful for the Log Viewer API.

Update these values per environment if your central domain differs from local development.

