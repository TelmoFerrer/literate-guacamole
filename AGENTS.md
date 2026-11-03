# Agent instructions

These instructions apply to every AI coding agent working in this repository. More specific instructions in a nested `AGENTS.md` may add constraints but must not weaken these rules without human approval.

## Mission

Build MyFinance as a reliable, maintainable, secure personal finance application. Prefer small, reviewable changes over broad rewrites. Treat the repository documentation as the project source of truth.

## Required workflow

1. Inspect the repository, relevant code, documentation and current Git state before making changes.
2. Read the applicable task and identify its acceptance criteria.
3. Produce a short implementation plan for non-trivial work. Identify assumptions, affected files, risks and tests.
4. Implement only the agreed scope. Do not opportunistically rewrite unrelated areas.
5. Add or update tests with the implementation.
6. Run the relevant checks and report their exact outcomes. Never claim checks passed if they were not run.
7. Review the final diff for correctness, security, accidental scope expansion and generated-file noise.
8. Update documentation when behavior, architecture, setup or operational procedures change.
9. Summarise files changed, decisions made, tests run, known limitations and follow-up work.

## Decision boundaries

### Agents may do without additional approval
- Read repository files and inspect Git history/status.
- Propose plans and implementation details within an approved task.
- Implement isolated application code and tests.
- Improve local documentation and non-sensitive developer tooling.
- Run local lint, type-check, test and build commands.
- Create a feature branch and draft a pull request when explicitly asked.

### Human approval is required before
- Changing product scope or material architecture decisions.
- Adding a runtime dependency, paid service, external data processor or AI provider.
- Changing database schema, migrations, RLS policies, authentication or authorization.
- Introducing a new source of financial data or transmitting financial data to an external service.
- Accessing, exporting, logging or using real personal financial data.
- Changing secrets, permissions, repository settings or branch protection.
- Deploying, releasing, merging a pull request or changing production infrastructure.
- Performing destructive, irreversible or externally visible operations.

If an approval boundary is reached, stop and explain the decision needed. Do not infer consent.

## Financial-data correctness

- Never use JavaScript floating-point arithmetic for authoritative monetary calculations. Use integer minor units where appropriate or a decimal arithmetic library, with PostgreSQL `NUMERIC` for persisted decimal amounts.
- Keep source/import records distinguishable from canonical transactions.
- Treat deduplication fingerprints as matching evidence, not unconditional unique identifiers; legitimate recurring transactions can share attributes.
- Transfer matches must be explainable, reversible and reviewable. Do not delete underlying transactions to represent a transfer.
- Preserve user categorisation overrides when applying automated categorisation.
- AI output is not a source of truth for balances, totals, performance or forecasts. Obtain figures from deterministic, tested application services and show their basis.
- Never fabricate missing financial data or silently infer currency, date, account ownership or transaction direction.

## Security and privacy

- Never commit secrets, tokens, credentials, real bank statements or personal financial data.
- Never put service-role keys or other privileged credentials in browser code or public environment variables.
- Minimise sensitive data sent to LLMs and external providers. Do not send real financial data to an external model unless the data flow and provider have been explicitly approved.
- Enforce user ownership at the database and server boundaries; do not rely on UI filtering for authorization.
- Validate all external input at trust boundaries.
- Do not weaken RLS, authentication, authorization, auditability or security checks to make tests pass.
- Use synthetic fixtures for tests and examples.

## Engineering conventions

- Prefer TypeScript and explicit types at application boundaries.
- Keep business logic out of UI components and route handlers where practical.
- Prefer a modular monolith over premature microservices.
- Keep provider-specific integration code behind adapters.
- Avoid unnecessary abstractions, speculative extensibility and new dependencies.
- Make errors actionable; do not swallow exceptions.
- Keep changes accessible, responsive and consistent with the established UI system.
- Follow existing formatting and naming conventions. If none exist, use clear, conventional defaults.

## Pull-request expectations

Every PR should:
- Link to or identify the task it implements.
- Explain the problem and chosen approach.
- List meaningful behavior changes.
- Include tests and actual check results.
- Call out migration, security, privacy, cost and operational implications.
- Identify anything requiring human review.
- Contain no unrelated changes.

Do not merge PRs unless the human explicitly instructs you to do so.
