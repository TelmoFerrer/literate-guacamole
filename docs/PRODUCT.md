# Product brief

## Vision

Give one person a trustworthy, consolidated understanding of their financial life.

## Initial audience and market

- Initial user: the project owner.
- Initial market and financial context: Portugal.
- Potential future expansion: other EU markets.
- Design data ownership around `user_id` from the beginning, but do not build enterprise tenancy, teams or complex role management in the initial version.

## Product principles

1. Accuracy and explainability before visual polish.
2. Read-only access to banks and brokers in the initial product.
3. The user remains in control of financial records and decisions.
4. Import provenance and corrections must be traceable.
5. A single coherent overview should bring together cash, investments, assets, liabilities and net worth.
6. Privacy and security are product requirements, not later hardening tasks.

## Initial scope

- Accounts and institutions.
- Transaction import, initially via CSV.
- Transaction search, filtering and bulk categorisation.
- Predefined categories with user customisation.
- Duplicate detection with reviewable matching.
- Detection and reversible matching of transfers between the user's own accounts.
- Refund handling and recurring-payment identification.
- Cash balances, balance history and cash-flow views.
- Assets, liabilities and net-worth tracking.
- Investment accounts, holdings and valuations, initially using imports where direct connectivity is unavailable.
- Cash-flow forecasting and scenario exploration.
- AI-assisted explanations and insights, grounded in verified application data.

## Explicitly out of scope for the initial release

- Initiating payments or transfers.
- Executing trades or investment orders.
- Custody of funds.
- Automated tax filing.
- Unsupervised changes to financial records.
- Claims of regulated personalised investment advice.

## Financial institutions and data sources to investigate

Priority bank connectivity targets:
1. ABANCA Portugal (not ABANCA Spain).
2. Revolut.
3. Trade Republic.
4. ActivoBank.
5. Crédito Agrícola.

Investment connectivity is desirable for Trade Republic, Trading 212 and DEGIRO. Do not assume that bank-account aggregation includes brokerage holdings or transactions. Validate provider coverage, contractual eligibility, pricing, refresh behavior and Portuguese/EU regulatory implications before selecting a production provider.

## Delivery strategy

Build a reliable personal-use foundation first. Start with CSV imports and a provider-independent integration boundary. Treat live Open Banking connectivity as a separately validated workstream; a sandbox or marketing coverage list is not proof of production eligibility or complete data coverage.
