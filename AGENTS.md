# Repository Guidelines

## Project Structure & Module Organization

This repository contains Cypress + TypeScript E2E tests for the sibling Laravel application at `../income-control-system`. Keep application code there unchanged when contributing here.

- `cypress/e2e/HU-{id}/`: acceptance suites, `*.cy.ts` specs, and suite-specific `helpers.ts`.
- `cypress/support/`: shared commands, per-test resets, protected PHP database helpers, and storage initialization.
- `cypress/fixtures/archivos/`: upload and photo fixtures.
- `cypress.config.ts` and `cypress/tsconfig.json`: Cypress and TypeScript configuration.
- `cypress/compose.yaml`, `Containerfile`, and `apache.conf`: isolated Podman environment.
- `cypress/HU-*-cobertura.md`, `*-resultados.md`, and `*-inventario.json`: coverage matrices, results, and static inventories.

## Build, Test, and Development Commands

Read `README.md` for initial setup. Use Podman Compose from this directory:

```bash
podman compose -p income-e2e -f cypress/compose.yaml build runner
podman compose -p income-e2e -f cypress/compose.yaml up -d
podman compose -p income-e2e -f cypress/compose.yaml exec -T runner bash -ic 'npm run e2e:types'
```

Inside the runner, `npm ci` installs locked dependencies; `npx cypress install` installs the browser runner. `npm run e2e:hu12` executes HU-12; analogous scripts select HU-9, HU-10, HU-11, and HU-15. `e2e:run` selects HU-15, `e2e:all` runs every suite, and `e2e:open` opens Cypress when a display is available.

## Coding Style & Naming Conventions

Prefer two-space indentation, single quotes, and existing TypeScript conventions. Use explicit `.js` extensions for relative imports under NodeNext resolution. Follow four-space indentation in PHP helpers. Name cases with their HU identifier and concrete expected behavior. No formatter or lint command is configured; run `e2e:types`.

## Testing Guidelines

Prepare deterministic, independent data for every case. Use real selectors and authenticated endpoints with CSRF. Observe requests with `cy.intercept`; never replace successful backend responses. Avoid fixed waits. Verify persistence through protected read-only database tasks. Preserve exact acceptance messages and document implementation failures. Update coverage and results; distinguish static checks, executed cases, and blocked assertions. Run existing suites after shared-helper changes.

## Commit & Pull Request Guidelines

Git history is unavailable in this checkout, so no historical commit convention can be verified. Use concise, imperative subjects identifying the affected HU. PRs should describe scope, link the requirement or issue, summarize validation and infrastructure blockers, and include relevant screenshots for UI failures.

## Isolation & Configuration

Use only `income-e2e`, database `app_e2e`, and port `8082`. Preserve database guards, read-only Laravel mounts, and existing changes. Never run concurrent suites against the shared E2E database or modify development/production data.
