# Local development

## Requirements

- Node.js 22 or newer.
- pnpm 10.12.1 (the version declared in `package.json`).
- A Supabase project is optional for running the current UI shell and unit tests.

## Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open http://localhost:3000.

The current Overview is an empty-state shell. It does not contain fabricated balances or sample personal transactions. Supabase credentials are only needed when exercising the Supabase client helpers.

## Quality checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Environment

Set these variables in `.env.local` when a Supabase project is available:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Never add a service-role key to a public environment variable. Never commit `.env.local`, credentials, bank statements or real financial data.

## Current limitations

- Authentication flows are not implemented yet.
- No database schema or migrations have been applied.
- No bank or broker integration is configured.
- The navigation destinations are early module placeholders.
