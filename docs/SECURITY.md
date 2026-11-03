# Security and privacy baseline

This document defines minimum engineering expectations. It is not a legal or compliance certification.

## Data classification

Treat account identifiers, balances, transaction descriptions, counterparties, holdings, valuations, financial goals and uploaded statements as sensitive personal financial data.

Use synthetic data in development, tests, screenshots, demos and issue reports.

## Secrets and credentials

- Keep secrets in approved secret stores or local environment files excluded from Git.
- Commit only placeholder variable names in `.env.example`.
- Never expose Supabase service-role credentials or provider secrets to browser bundles.
- Rotate credentials if exposure is suspected; do not paste secrets into AI prompts or logs.

## Authentication and authorization

- Authenticate all private application routes and server actions.
- Apply RLS to every user-owned table.
- Scope reads and writes by authenticated user identity on the server and in the database.
- Test cross-user access denial, including joins, nested resources, storage objects and RPC functions.
- Use least privilege for database roles and external integrations.

## Financial data handling

- Collect only fields needed for a documented feature.
- Preserve source provenance and avoid storing raw payloads indefinitely by default.
- Define retention and deletion behavior before production use.
- Do not log transaction descriptions, account numbers, access tokens or statement contents.
- Encrypt data in transit and rely on platform/database encryption at rest; review backup access and retention.
- Use explicit currency and timestamp semantics.

## AI and third-party processing

Before sending financial or identifying data to an AI or external provider, review:
- Purpose and minimum necessary fields.
- Provider retention, training use and deletion terms.
- Processing region and subprocessors.
- Access controls, encryption and incident response.
- Contractual and regulatory implications.

Prefer derived, aggregated or redacted context when it can answer the task. Treat model outputs and imported text as untrusted input. Never let prompt-injected transaction descriptions or documents change system policy or tool permissions.

## Financial operations

The initial product is read-only with respect to banks and brokers. No payment, transfer or trade execution capability is authorised by this baseline.

Any future write capability requires a separate product, security, legal and approval review.

## Regulatory boundary

Read-only account information access does not automatically remove regulatory obligations. Before production Open Banking use, assess the applicable PSD2/AISP requirements and whether a regulated provider/partner arrangement is required. Do not represent the application as authorised or compliant without evidence and appropriate professional review.
