# AI-first development workflow

## Roles

- **Product Owner / Technical Lead (human):** owns priorities, product acceptance and material technical decisions.
- **Engineering Orchestrator (AI):** clarifies tasks, plans work, coordinates implementation, reviews diffs and reports status.
- **Implementation agents:** perform bounded code, test and documentation tasks.
- **Independent reviewer:** reviews correctness, maintainability, security and task acceptance separately from implementation where practical.

These are responsibilities, not a requirement to run multiple agents for every task. Prefer one agent for a small task; parallelise only independent work with clear file ownership.

## Task lifecycle

1. **Intake:** capture problem, user value, constraints and acceptance criteria.
2. **Discovery:** inspect the current repository, relevant docs, code, tests and Git state.
3. **Plan:** list files/modules, dependencies, risks, migration needs and verification commands.
4. **Approval:** obtain human approval for material architecture, security, data model, provider, cost or scope decisions.
5. **Implementation:** work on a focused feature branch; keep changes bounded.
6. **Verification:** add tests, run relevant checks and inspect the final diff.
7. **Independent review:** challenge assumptions and inspect edge cases, authorization and failure behavior.
8. **Pull request:** describe behavior, evidence, limitations and any approval needed.
9. **Acceptance:** human reviews and decides whether to merge.
10. **Closeout:** update task status and docs; capture follow-up work.

## Parallel work rules

- Parallel tasks must not edit the same files or shared schema concurrently unless coordinated.
- Assign explicit file/module ownership to each implementation agent.
- Integrate frequently and resolve interface contracts before parallel implementation.
- Never let multiple agents independently create migrations against the same evolving schema.
- The orchestrator owns integration and final consistency review.

## Definition of Ready

A task is ready when it has:
- A user/problem statement.
- In-scope and out-of-scope behavior.
- Acceptance criteria that can be verified.
- Relevant design and data constraints.
- Known dependencies and approval requirements.

## Definition of Done

A task is done when:
- Acceptance criteria are met.
- Relevant tests are added or updated.
- Applicable lint, type-check, test and build checks have been run.
- The final diff has been reviewed.
- Documentation is updated where needed.
- Security, privacy, migration and operational implications are stated.
- No secrets, real financial data or unrelated changes are included.
- The PR clearly reports any checks that could not be run.

## Pull request conventions

- Use a focused branch such as `feat/transaction-csv-import`, `fix/transfer-matching` or `docs/ai-workflow`.
- Use descriptive conventional commit messages where practical.
- Prefer draft PRs while implementation is incomplete.
- Never merge or deploy without explicit human approval.
- Do not mark a PR ready while required checks are failing or important review questions remain unresolved.

## Reporting format

At the end of each task, report:
1. Outcome.
2. Files changed.
3. Important implementation decisions.
4. Tests/checks run and exact results.
5. Risks, limitations and follow-up tasks.
6. Any decision or approval needed from the human.
