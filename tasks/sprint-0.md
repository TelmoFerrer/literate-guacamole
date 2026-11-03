# Sprint 0 — AI engineering foundation

**Status:** In progress  
**Goal:** Establish a safe, repeatable AI-assisted engineering workflow before application implementation.

## Work items

### Repository and collaboration
- [x] Establish repository README and project documentation baseline.
- [ ] Confirm repository visibility and decide whether to make it private before any sensitive development.
- [ ] Establish branch naming and pull-request conventions.
- [ ] Add issue/task labels and milestone conventions.

### AI-agent operating model
- [x] Add root `AGENTS.md`.
- [x] Define human approval boundaries.
- [x] Define implementation, review and reporting workflow.
- [ ] Add agent-specific instructions only when a concrete tool/agent requires them.
- [ ] Trial the workflow on one small, non-sensitive documentation or scaffolding task.

### Quality gates
- [x] Add a CI workflow that is safe before the app scaffold exists.
- [ ] Scaffold Next.js and add lint, type-check, test and build scripts.
- [ ] Add Vitest and Playwright baseline configuration when the app exists.
- [ ] Add dependency and secret scanning after selecting repository security settings.

### Product and architecture
- [x] Record product scope and initial constraints.
- [x] Record proposed architecture and domain boundaries.
- [x] Record security/privacy baseline.
- [x] Record initial architecture decisions.
- [ ] Review the database model before creating migrations.
- [ ] Validate Portugal/EU Open Banking provider eligibility and regulatory assumptions before live connectivity.

## Definition of Done

- Agent instructions are clear and discoverable.
- Tasks have a consistent template and acceptance criteria.
- PRs require review and meaningful checks.
- CI succeeds without pretending application checks exist before app scaffolding.
- Product, architecture and security constraints are documented.
- No real financial data or secrets are present.
- Human approves the foundation PR before merge.

## Risks / open questions

- The repository is currently public. Decide on private visibility before adding any real financial data, secrets or sensitive project material.
- The app scaffold and lockfile do not exist yet; application CI steps are intentionally conditional.
- Supabase RLS, migrations and authentication need dedicated tests before any real user data is stored.
- Open Banking provider access and legal scope remain unverified.
