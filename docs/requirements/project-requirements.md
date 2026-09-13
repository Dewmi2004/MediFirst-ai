# Project Requirements (Revised for SaaS)

## Functional Requirements

| ID | Requirement |
|----|-------------|
| FR-01 | Users can register and log in securely |
| FR-02 | Users can chat with an AI assistant about general health topics |
| FR-03 | System detects emergency indicators and prioritizes escalation over conversation, on every plan and account state |
| FR-04 | Users can browse first-aid guidance by category |
| FR-05 | Users can submit symptoms and get a rule-based risk category |
| FR-06 | Users can search medicine information |
| FR-07 | Users can upload a medicine photo for identification assistance |
| FR-08 | AI responses are RAG-grounded with visible sources |
| FR-09 | AI responses pass a safety validation layer |
| FR-10 | Admins manage users, sources, content, audit events |
| FR-11 | Users can view/delete their own data |
| FR-12 | A user can create or join an Organization account with multiple seats |
| FR-13 | A user/org can view available plans and subscribe, upgrade, downgrade, or cancel |
| FR-14 | The system enforces plan-based quotas via a single Entitlement Service |
| FR-15 | Safety-critical features remain fully available regardless of plan, quota exhaustion, or payment failure |
| FR-16 | Org OWNER can view seats, invite members, and manage billing without accessing members private health conversations |

## Non-Functional Requirements

- NFR-01 Security: HTTPS, hashed passwords, JWT/session security, input/output validation, rate limiting
- NFR-02 Privacy: data minimization by default
- NFR-03 Availability: single-region MVP
- NFR-04 Accessibility: WCAG-aligned
- NFR-05 Maintainability: modular monolith
- NFR-06 Observability: structured logs, no sensitive medical content logged
- NFR-07 Extensibility: AI provider abstraction
- NFR-08 Testability: unit tests minimum, AI-safety tests for safety-critical modules
- NFR-09 Billing idempotency and PCI-scope minimization (no raw card data touches our servers)
- NFR-10 Entitlement checks centralized in one service

## User Roles

- USER — registered end user
- CONTENT_MANAGER — submits/edits content, requires admin approval
- ADMIN — full platform administration, least-privilege
- OWNER — organization billing/admin owner

## Product Boundaries

In scope: general health education, first-aid education, symptom risk categorization (not diagnosis), medicine information and image-based identification assistance, RAG-grounded Q&A with visible sources, escalation guidance, organization/team subscription management.

Out of scope permanently unless clinically/regulatory validated: diagnosing disease, prescribing medication, replacing a doctor/pharmacist/emergency service, changing/stopping medication, guaranteeing outcomes, fabricating sources, gating safety behind a paywall.

## Medical Safety Boundaries (Non-Negotiable)

- Emergency-indicator inputs short-circuit normal conversation and return immediate escalation guidance
- Every AI medical response is treated as fallible, carries uncertainty language
- No response may state or imply a confirmed diagnosis
- Medicine identification always carries a do-not-take-based-solely-on-this warning plus a confidence indicator
- No citation, study, dosage, or source may ever be invented

## MVP Scope

Auth (register/login/RBAC), Safety module (emergency detection + risk classification), first-aid content browsing, symptom risk assessment, medicine search + image identification assistance, AI chat backed by RAG with visible sources, minimal admin panel for source/content approval.

Excluded from MVP: multi-language localization, native mobile apps, payment/subscription systems beyond basic plan gating, real-time human clinician handoff, telehealth, insurance integration, wearable ingestion, multi-tenant white-labeling, e-prescribing.

## Acceptance Criteria

- Register/login reaches dashboard
- Emergency message returns escalation response same-turn, no multi-turn diagnostic conversation first
- Symptom submission returns one of four risk categories with plain-language explanation, never a named diagnosis
- Medicine search returns records with visible source/provenance
- Medicine photo upload returns identification with confidence + verification warning, or explicit "unable to identify"
- Every RAG-backed chat response displays its sources
- Admin can deactivate a source and see it stop appearing in retrieval
- No secrets/stack traces/internal paths in any API error response
