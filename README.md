# MyFinance

A personal finance application designed to bring accounts, transactions, cash, investments, assets, liabilities and net worth into one clear view.

## Project status

**Stage:** Application foundation  
**Current milestone:** Sprint 0 — runnable web application and engineering baseline

## Stack

- Next.js 16 App Router and React 19
- TypeScript
- Tailwind CSS 4
- Supabase (PostgreSQL and Auth integration boundary)
- Vitest and ESLint
- pnpm

## Getting started

See [Local development](docs/LOCAL_DEVELOPMENT.md).

## Project documentation

- [Product brief](docs/PRODUCT.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Security principles](docs/SECURITY.md)
- [Development workflow](docs/DEVELOPMENT_WORKFLOW.md)
- [Architecture decisions](docs/DECISIONS.md)
- [Sprint 0](tasks/sprint-0.md)

## Principles

- Financial correctness and explainability before visual polish.
- Read-only access to banks and brokers in the initial product.
- No fabricated financial values in the interface.
- User-owned data protected at application and database boundaries.
- AI-generated implementation must be reviewed and tested.
