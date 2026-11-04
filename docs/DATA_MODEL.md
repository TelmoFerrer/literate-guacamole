# Data model and database security design

## Status

Proposed for review. This document is the design gate before creating production migrations or connecting real financial data. It is not an applied schema and does not claim regulatory or security certification.

## Design goals

- Make every user's financial records tenant-isolated at the database boundary.
- Preserve imported source rows independently from user-editable canonical transactions.
- Support repeated legitimate transactions without relying on a globally unique fingerprint.
- Keep money exact and currency explicit.
- Make transfers reviewable and reversible.
- Support manual assets and liabilities before adding broker or Open Banking integrations.
- Keep the initial model small enough for a personal-use MVP.

## Ownership model

Use Supabase Auth as the identity provider. Every user-owned table has a non-null `user_id UUID` referencing `auth.users(id)` (or a profile row keyed by the same UUID).

For relationships between user-owned tables, use composite unique keys and foreign keys:

- Each owned table exposes `UNIQUE (user_id, id)`.
- A child relationship uses `FOREIGN KEY (user_id, parent_id) REFERENCES parent(user_id, id)`.
- This prevents a row owned by user A from referencing a parent owned by user B, even if application code is defective.
- Enable RLS on every user-owned table. Policies use `auth.uid() = user_id` for both `USING` and `WITH CHECK`.
- Do not rely on RLS alone: retain the composite constraints.
- Browser clients use only the Supabase publishable key. Service-role credentials remain server-side and are not part of the first implementation.

For the first release, copy the built-in category catalogue into each user's account during onboarding. This avoids nullable ownership and complicated cross-tenant category foreign keys. Users can rename, reorder, disable or create their own categories.

## Proposed entities

All IDs are UUIDs. All user-owned entities carry `user_id`. Exact column names and constraints will be settled in migrations.

### Identity and reference data

| Entity | Purpose | Ownership |
| --- | --- | --- |
| `profiles` | Minimal application profile and preferences | One row per `auth.users` user |
| `institutions` | Curated bank/broker display catalogue | Shared reference data; read-only to clients |

Do not store bank login credentials or provider access tokens in these tables.

### Accounts and balances

| Entity | Purpose | Important fields / rules |
| --- | --- | --- |
| `accounts` | Bank, cash, savings, credit or investment account | `user_id`, optional institution, display name, account type, currency, archived timestamp |
| `balance_snapshots` | Historical account balance observations | `user_id`, account, observed timestamp, amount, currency, source; append-only observations |

Account currency is an ISO 4217 code. A balance is always denominated in its account currency. Never add balances in different currencies without a separately stored FX rate, quote timestamp and conversion policy.

### Imports and transaction provenance

| Entity | Purpose | Important fields / rules |
| --- | --- | --- |
| `imports` | One CSV/file import attempt | `user_id`, source type, file metadata, content checksum, status, counts, timestamps |
| `transaction_sources` | One normalised source row from a statement/provider | `user_id`, import, source row reference, source identifiers, source dates, raw/normalised description, amount, currency, fingerprint, optional canonical transaction link |

Keep the source record immutable after import except for operational metadata and its canonical link. If raw source payloads are retained, minimise fields, restrict access and define retention/deletion rules. Do not log source descriptions or statement contents.

A fingerprint is a matching aid, not a unique key. Identical-looking rows can be legitimate recurring purchases, salaries or fees. Do not create a unique constraint on `(user_id, fingerprint)`. Re-import handling must compare context and let the user resolve ambiguous matches.

### Canonical transactions and categorisation

| Entity | Purpose | Important fields / rules |
| --- | --- | --- |
| `transactions` | User-facing, editable ledger entry | `user_id`, account, signed amount, currency, booking/value dates, description, status, optional category, created/updated timestamps |
| `categories` | User's income/expense taxonomy | `user_id`, name, kind, optional parent, display order, archived timestamp |
| `categorization_rules` | Optional deterministic user rules | `user_id`, match criteria, category, priority, enabled flag |

Use a signed amount convention consistently: inflows positive, outflows negative, with the account currency stored alongside. Persist amounts as PostgreSQL `NUMERIC`; never use JavaScript floating-point arithmetic for authoritative financial calculations. Keep the domain boundary in exact decimal strings or integer minor units.

Category references must be ownership-safe using composite foreign keys. Parent categories must belong to the same user. Validate category kind against transaction direction in application/domain logic; avoid assumptions that every bank feed has consistent sign conventions before normalisation.

### Transfers

| Entity | Purpose | Important fields / rules |
| --- | --- | --- |
| `transfer_matches` | Proposed or confirmed relationship between two transactions | `user_id`, outgoing transaction, incoming transaction, status, confidence/reason, reviewed timestamp |

A transfer is not a new cash movement and must not be counted as income or expense. Require two distinct transactions owned by the same user, usually in different accounts. Confirmation and unmatching are explicit, reversible user actions. Candidate matching can be heuristic; never silently confirm a match based only on amount/date.

### Assets, liabilities and valuations

| Entity | Purpose | Important fields / rules |
| --- | --- | --- |
| `assets` | Manually tracked non-account assets | `user_id`, type, name, currency, archived timestamp |
| `asset_valuations` | Dated value observations | `user_id`, asset, value, currency, observed date, source/note |
| `liabilities` | Manually tracked debts not already represented by an account | `user_id`, type, name, currency, archived timestamp |
| `liability_valuations` | Dated outstanding-balance observations | `user_id`, liability, amount, currency, observed date, source/note |

Avoid double counting: a credit-card account balance should not also be entered as a manually tracked liability unless the account is explicitly excluded from the net-worth calculation. Net worth is a deterministic calculation over selected latest valuations and account balances, with explicit FX conversion inputs where needed.

### Auditability

| Entity | Purpose | Important fields / rules |
| --- | --- | --- |
| `audit_events` | Security-relevant and financial-record change history | `user_id`, actor, action, entity type/id, timestamp, minimal metadata |

Do not copy full transaction descriptions, imported payloads, secrets or account numbers into audit metadata. Define which user actions are audited and how users can request data export/deletion before production.

## Money, dates and deletion semantics

- Use PostgreSQL `NUMERIC(20, 6)` for imported and canonical monetary amounts initially, plus a required three-letter currency code. Validate currency-specific scale at domain boundaries; do not assume every currency has two decimal places.
- Store transaction booking/value dates as `DATE` when they are calendar dates from a statement. Store event/creation times as `TIMESTAMPTZ`.
- Store provider timestamps and original offsets when their meaning would otherwise be lost.
- Prefer archive/soft-delete for accounts, categories, assets and liabilities that have historical references.
- Do not cascade-delete a transaction's source provenance or audit trail by accident.
- Account deletion should be blocked while referenced financial history exists, unless a deliberate archival/data-erasure workflow handles the dependent rows.
- User deletion must have a documented, tested cascade/export policy. Do not assume that deleting an auth user automatically implements the product's retention obligations.

## RLS and database test requirements

Before enabling real data, add automated database tests using at least two distinct authenticated users and prove:

1. User A can read and mutate their own rows.
2. User A cannot select, insert, update or delete User B's rows.
3. User A cannot attach an account, category, import, asset or liability owned by User B to one of their rows.
4. Nested joins and relationship queries do not reveal another user's data.
5. Anonymous users cannot access private financial tables.
6. Shared institution reference data is readable but not client-writable.
7. RPC functions, views and storage policies do not bypass the same ownership boundary.
8. A user's import cannot link a source row to another user's canonical transaction.
9. Transfer pairs must belong to the same user and contain two distinct transactions.

Use Supabase local development or an isolated disposable database for these tests. Never run destructive schema experiments against a production project.

## Implementation sequence

1. Confirm this model and the category/account/transaction semantics.
2. Create versioned SQL migrations and local Supabase configuration.
3. Add ownership constraints, indexes and RLS policies in the same migration set.
4. Add database-level cross-user isolation tests before building user-facing CRUD.
5. Generate TypeScript database types from the migrated schema.
6. Implement auth/session handling and a protected route boundary.
7. Only then add manual account entry and CSV import using synthetic test fixtures.

## Explicitly out of scope for the first schema

- Bank or broker credentials, OAuth tokens and live provider sync.
- Payments, transfers or trade execution.
- Automatic FX conversion without a recorded rate source and timestamp.
- AI-generated writes or authoritative financial calculations.
- Shared household accounts or multi-user workspaces.
- Complex double-entry accounting and multi-currency general ledger.

These can be revisited with separate decisions when a concrete requirement exists.
