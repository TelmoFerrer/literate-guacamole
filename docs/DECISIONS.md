# Architecture decision records

This file is an index and concise record of currently proposed decisions. Expand consequential decisions into individual ADRs when implementation begins.

## ADR-001 — Modular monolith

**Status:** Accepted as initial direction  
**Decision:** Build one deployable application with explicit domain modules.  
**Rationale:** Keeps operational complexity and cost low while preserving separation of concerns.  
**Revisit when:** Independent scaling, deployment or team ownership becomes a demonstrated need.

## ADR-002 — TypeScript-first application

**Status:** Accepted as initial direction  
**Decision:** Use TypeScript for UI, server-side application services and initial financial domain logic.  
**Rationale:** Shared types and one primary runtime reduce early complexity.  
**Revisit when:** A concrete data-science or batch-processing requirement justifies another runtime.

## ADR-003 — PostgreSQL / Supabase

**Status:** Proposed; confirm during implementation  
**Decision:** Use PostgreSQL as the source of truth, with Supabase for managed database and authentication capabilities.  
**Rationale:** Relational constraints, transactions and RLS suit financial records and user ownership.  
**Conditions:** Review RLS and composite ownership constraints; never expose service-role credentials.

## ADR-004 — Provider-independent integrations

**Status:** Accepted as initial direction  
**Decision:** Isolate CSV, bank aggregation and broker integrations behind adapters.  
**Rationale:** Coverage, pricing and eligibility may change; domain logic should not depend on one vendor.

## ADR-005 — Preserve imported source records

**Status:** Accepted as initial direction  
**Decision:** Retain import provenance and source records separately from canonical transactions.  
**Rationale:** Supports auditability, reprocessing, duplicate review and correction.

## ADR-006 — Read-only financial scope

**Status:** Accepted for initial product  
**Decision:** No payment, transfer or investment execution.  
**Rationale:** Limits product risk and keeps the initial scope focused.

## ADR-007 — User ownership from day one

**Status:** Accepted as initial direction  
**Decision:** Put `user_id` ownership on user data from the start, without building full multi-tenant enterprise features.  
**Rationale:** Avoids a costly ownership migration if the product later supports more users.

## ADR-008 — AI as a bounded engineering capability

**Status:** Accepted as engineering principle  
**Decision:** Use AI agents for planning, implementation, tests and review under repository instructions and human approval gates.  
**Rationale:** Accelerates delivery while keeping product, architecture, security and release decisions accountable.  
**Guardrail:** Agents must not invent test results, bypass security controls or merge/deploy without approval.

## ADR-009 — Deterministic financial calculations

**Status:** Accepted as engineering principle  
**Decision:** Use deterministic, tested services for money arithmetic, balances, net worth and forecasts. AI may explain or help investigate results but is not authoritative for numeric outputs.  
**Rationale:** Financial correctness must be reproducible and testable.
