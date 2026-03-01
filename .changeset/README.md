# Changesets

This project uses [Changesets](https://github.com/changesets/changesets) for versioning and changelog management. The app is a **private** package (we do not publish to npm); Changesets is used to bump the version in `package.json` and maintain `CHANGELOG.md`.

## Contributor workflow

1. **Make your code changes** as usual.

2. **Add a changeset** when your change should be included in the next release:
   ```bash
   pnpm changeset
   ```
   - Choose the semver bump type (patch / minor / major).
   - Write a short summary of the change (this will appear in the changelog).
   - This creates a new file under `.changeset/` (e.g. `something-descriptive.md`).

3. **Commit** the new `.changeset/*.md` file(s) together with your code changes.

4. **Releasing** (when maintainers are ready to cut a release):
   - **Option A (CI):** Merge the automated **"Version Packages"** pull request created by the [Release workflow](../.github/workflows/release.yml). Pushing to `main`/`master` with new changesets will create or update this PR; merging it updates `package.json` version and `CHANGELOG.md`.
   - **Option B (manual):** Run `pnpm changeset version` locally, then commit the updated `package.json`, `CHANGELOG.md`, and the removal of consumed changeset files.

Do **not** run `changeset publish` — this app is private; we only use Changesets for version and changelog.

## Requiring changesets on PRs (optional)

To encourage or enforce that PRs that should trigger a release include a changeset:

- **GitHub app:** Install the [Changesets bot](https://github.com/apps/changesets); it will comment on PRs when a changeset is missing.
- **CI:** Add a step that runs `pnpm changeset status --since=origin/main` and fails when there are code changes but no pending changesets (if you want strict enforcement).

## More information

- [Changesets documentation](https://github.com/changesets/changesets)
- [Common questions](https://github.com/changesets/changesets/blob/main/docs/common-questions.md)
