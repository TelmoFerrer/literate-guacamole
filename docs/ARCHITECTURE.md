# Architecture

## Status

Proposed baseline for the first implementation. Material changes require an Architecture Decision Record (ADR) and human approval.

## Architectural style

Use a **modular monolith**. Keep the first release in one deployable application with clear module boundaries. Do not introduce microservices, Kubernetes, message brokers or distributed infrastructure without evidence that the product needs them.

## Proposed stack

- Web application: Next.js, React and TypeScript.
- UI: Tailwind CSS and shadcn/ui.
- Database and authentication: Supabase (PostgreSQL and Supabase Auth).
- Validation: Zod at API, import and integration boundaries.
- Database typing: Supabase-generated TypeScript types.
- Monetary calculations: decimal arithmetic or integer minor units; PostgreSQL `NUMERIC` for persisted amounts.
- Charts: Recharts, subject to implementation needs.
- Tests: Vitest for unit/integration tests; Playwright for end-to-end tests.
- Hosting: choose after the first deployable vertical slice; Vercel is the initial candidate.
- Package manager: pnpm.

This is a proposed baseline, not permission to add every dependency immediately. Confirm current versions and compatibility when scaffolding the application.

## High-level boundaries

```text
Next.js application
  ├── UI / route handlers
  ├── Application services
  │     ├── Accounts
  │     ├── Transactions
  │     ├── Imports
  │     ├── Categorisation
  │     ├── Transfers
  │     ├── Investments
  │     ├── Net worth
  │     └── Forecasting
  ├── Domain / financial calculation layer
  ├── Integration adapters
  │     ├── CSV formats
  │     └── Open Banking / broker providers (later)
  └── Supabase / PostgreSQL
```

## Module responsibilities

- **Imports:** parse, validate, normalise and record provenance for external data.
- **Transactions:** canonical transaction lifecycle, search and user edits.
- **Categorisation:** category taxonomy, rules, suggestions and user overrides.
- **Transfers:** candidate matching, confidence and reversible confirmation.
- **Accounts:** institution, account metadata and balance snapshots.
- **Investments:** holdings, valuations and performance inputs.
- **Net worth:** deterministic aggregation of assets and liabilities.
- **Forecasting:** explicit assumptions and deterministic projection logic.

Keep provider-specific parsing and API contracts inside adapters. Domain services should not depend on a specific bank, broker or aggregator.

## Data ownership and persistence

- Every user-owned row must have an explicit `user_id`.
- Enforce ownership with database constraints and Row Level Security (RLS), not only application filters.
- Use composite foreign keys where needed to ensure related records belong to the same user.
- Preserve original imported source records and link them to canonical records.
- Store timestamps with clear timezone semantics; retain the source timezone or offset when relevant.
- Store monetary values with explicit currency. Never aggregate unlike currencies without a documented FX rate and valuation timestamp.
- Make imports idempotent where possible, but do not discard potentially legitimate repeated transactions solely because a fingerprint matches.

## AI integration boundary

AI is an application capability, not the financial system of record.

- Route model access through a server-side provider abstraction.
- Expose narrowly scoped, typed tools backed by application services.
- Authoritative balances, totals, categorisation persistence, transfer confirmation and forecasts must be computed or validated by deterministic services.
- Require explicit user approval for writes to financial records.
- Record model/provider, prompt or policy version, tool invocations and outcome metadata where useful, while minimising sensitive payload retention.
- Do not send personal financial data to an LLM provider until the provider, retention terms, region, security posture and data minimisation approach have been reviewed and approved.
- Avoid multi-agent runtime complexity until a concrete use case demonstrates the need.

## Initial data model candidates

The following are conceptual entities, not a final migration:
- `profiles`, `institutions`, `accounts`
- `imports`, `transaction_sources`, `transactions`
- `categories`, `categorization_rules`, `transfer_matches`
- `balance_snapshots`
- `assets`, `asset_valuations`, `liabilities`, `liability_valuations`
- `audit_events`

Review uniqueness, nullable-parent category semantics, composite ownership constraints, deletion behavior and RLS before implementing schema migrations.

## Repository layout target

```text
src/
  app/
  components/
  modules/
    accounts/
    transactions/
    imports/
    categorisation/
    transfers/
    investments/
    net-worth/
    forecasting/
  lib/
  types/
supabase/
  migrations/
  seed.sql
docs/
tasks/
tests/
```

Do not create empty directories solely to match this diagram. Introduce them as code arrives.
