# MediFirst AI

**AI-assisted health information, first-aid guidance, symptom risk education, and medicine information — delivered as a secure, multi-tenant SaaS platform.**

> **MediFirst AI is not a doctor, hospital, pharmacist, or emergency service.** It is an AI-assisted health information and education platform. It does not diagnose disease, prescribe medication, or replace professional medical care. If you are experiencing a medical emergency, contact your local emergency services immediately.

---

## Table of Contents

- [What is MediFirst AI](#what-is-medifirst-ai)
- [Core Principles](#core-principles)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [SaaS Model](#saas-model)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Development Roadmap](#development-roadmap)
- [Security & Privacy](#security--privacy)
- [Medical Safety Design](#medical-safety-design)
- [Testing](#testing)
- [Documentation](#documentation)
- [Disclaimer](#disclaimer)

---

## What is MediFirst AI

MediFirst AI helps people:

- Understand general health information
- Receive safe, structured first-aid guidance
- Get a transparent, rule-based **risk category** for symptoms (not a diagnosis)
- Identify medicines from photos, as an *identification assistance* feature
- Look up reliable medicine information
- Ask health-related questions and get evidence-based, source-cited answers via Retrieval-Augmented Generation (RAG)
- Know when to seek professional medical attention or emergency care

It is built and marketed strictly as an **AI-assisted health information and educational platform** — never as an AI doctor, autonomous diagnostic system, or replacement for a licensed healthcare professional.

## Core Principles

Every design and engineering decision in this project follows this priority order:

```
SAFETY > CORRECTNESS > TRANSPARENCY > USEFULNESS > CONVENIENCE > REVENUE
```

The single non-negotiable rule of the whole system:

> **Emergency detection, emergency escalation, and core safety validation are never plan-gated, rate-limited by subscription tier, or hidden behind a paywall.** Every user — free, trial, paid, or with a lapsed subscription — receives the same safety-critical behavior.

## Features

| Area | Description |
|---|---|
| **AI Health Chat** | RAG-grounded conversational Q&A with visible sources and confidence/uncertainty language |
| **First Aid** | Structured, categorized guidance (cuts, burns, bleeding, sprains, choking, allergic reactions) with warning banners |
| **Symptom Risk Assessment** | Transparent rule-based classification: Emergency / Urgent / Non-urgent / Informational — never a diagnosis |
| **Medicine Information** | Searchable database of generic/brand names, uses, warnings, and source provenance |
| **Medicine Image Identification** | Photo-based identification *assistance* with confidence scoring and mandatory pharmacist-verification guidance |
| **Organizations & Teams** | Multi-seat organization accounts with centralized billing and least-privilege admin access |
| **Subscription Plans** | FREE / STARTER / PRO / TEAM / ENTERPRISE tiers, entitlement-based feature gating that never touches safety features |
| **Admin Console** | Source/content approval, safety event review, user and role management, aggregate billing health |

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, React Router, TanStack Query, React Hook Form, Zod |
| Backend | Node.js, Express, TypeScript, Zod, JWT/session auth, Argon2/bcrypt, Helmet, CORS, rate limiting |
| Database | PostgreSQL, pgvector (vector search), Prisma ORM |
| AI | Provider-agnostic `AIService` abstraction (OpenAI, other providers, or local models) |
| Payments | Stripe behind a `PaymentService` abstraction |
| Testing | Vitest/Jest, Supertest, Playwright |

The application is never tightly coupled to a single AI or payment vendor — both sit behind swappable provider interfaces.

## Architecture Overview

MediFirst AI is built as a **modular monolith** — not microservices — with clearly separated modules that can later be extracted into independent services if needed.

```
React Frontend
      │
      ▼
API Gateway (Express)
      │
Auth → Safety (emergency check, always runs) → Entitlement → Feature Modules
      │                                              │
      ├── Organizations        ├── First Aid
      ├── Billing               ├── Symptoms
      ├── AI + RAG              └── Medicines
      │
PostgreSQL + pgvector
```

**Fixed request ordering:** Authentication → Safety (emergency detection) → Entitlement (plan/quota check) → Feature logic. Safety checks always run before any billing/quota logic — this ordering is the architectural enforcement of the core safety principle above.

Full details: [`docs/architecture/`](./docs/architecture/).

## Project Structure

```text
medifirst-ai/
├── frontend/                 # React + TypeScript + Vite app
│   └── src/
│       ├── components/       # Shared UI (layout, design system)
│       ├── features/         # auth, organizations, billing, first-aid,
│       │                     # symptoms, medicines, chat
│       ├── pages/            # Route-level pages
│       ├── router/           # Routing + route guards
│       └── styles/
├── backend/                  # Express + TypeScript modular monolith
│   └── src/
│       ├── modules/          # auth, organizations, billing, entitlements,
│       │                     # safety, ai, rag, first-aid, symptoms,
│       │                     # medicines, admin
│       ├── middleware/
│       ├── routes/
│       ├── services/
│       └── config/
├── docs/
│   ├── requirements/
│   ├── architecture/
│   ├── security/
│   ├── medical-safety/
│   ├── api/
│   └── deployment/
└── scripts/
```

## SaaS Model

| Account Type | Description |
|---|---|
| **Individual** | Single-user, personal subscription |
| **Organization** | Multiple seats, centralized billing, `OWNER` role for org admin |

| Plan (illustrative) | Notes |
|---|---|
| FREE | Limited AI messages/month. First-aid, symptom risk tools, and all emergency/safety behavior fully available |
| STARTER | Higher AI quota, medicine ID included with a monthly cap |
| PRO | Higher/near-unlimited quotas, priority support |
| TEAM | Organization seats, shared billing, usage analytics |
| ENTERPRISE | Custom quotas, custom terms, dedicated support |

Feature access is resolved through a single **Entitlement Service**, never scattered plan checks — and safety-critical features are hardcoded to always be available regardless of plan.

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+ with the `pgvector` extension
- npm

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`.

### Backend
*(Available starting Part 21 of the development roadmap.)*

```bash
cd backend
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env` in both `frontend/` and `backend/` and fill in real values. **Never commit real secrets.**

**`backend/.env`**
```dotenv
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/medifirst
JWT_SECRET=
SESSION_SECRET=
AI_PROVIDER=openai
AI_PROVIDER_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
LOG_LEVEL=info
```

**`frontend/.env`**
```dotenv
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

## Development Roadmap

The project is built sequentially across **110 parts**, one part at a time, each leaving the system in a working, testable state.

| Phase | Parts | Status |
|---|---|---|
| 1 — Planning & Architecture | 01–10 | ✅ Complete |
| 2 — Frontend Foundation | 11–20 | 🔄 In progress (through Part 14) |
| 3 — Backend Foundation & Authentication | 21–30 | ⏳ Not started |
| 4 — Database & User Management | 31–40 | ⏳ Not started |
| 5 — Safety Controller | 41–50 | ⏳ Not started |
| 6 — First-Aid Assistant | 51–60 | ⏳ Not started |
| 7 — Symptom Risk Guidance | 61–70 | ⏳ Not started |
| 8 — Medicine System | 71–80 | ⏳ Not started |
| 9 — AI + RAG Architecture | 81–90 | ⏳ Not started |
| 10 — Security, Privacy & Production | 91–100 | ⏳ Not started |
| 11 — SaaS, Billing & Multi-Tenancy | 101–110 | ⏳ Not started |

See [`docs/`](./docs/) for the completed parts' full specifications.

## Security & Privacy

- HTTPS, Argon2/bcrypt password hashing, JWT/session security, rate limiting, Helmet, CORS
- Input and output validation on every endpoint via Zod
- File upload validation (MIME, extension, size, content) — filenames are never trusted
- Privacy-by-design: minimal data collection, configurable retention, user-controlled deletion
- Organization admins never get automatic access to members' private health conversations — only billing, seats, and aggregate usage
- No sensitive medical or payment data is logged; structured logs use `requestId`, `route`, `statusCode`, `duration`, `userId` only
- Full threat model: [`docs/security/part-10-threat-model.md`](./docs/security/part-10-threat-model.md)

## Medical Safety Design

- Emergency-indicator input short-circuits normal AI conversation and returns an immediate escalation response
- No AI response may state or imply a confirmed diagnosis
- All medical uncertainty is communicated explicitly ("may", "can", "cannot be confirmed from this information alone")
- Medicine identification always includes a confidence indicator and a "verify with a pharmacist" warning
- No citation, study, dosage, or source is ever fabricated — if reliable information isn't available, the system says so
- All of the above applies identically regardless of subscription plan or account status

## Testing

- **Unit tests** — services, utilities, safety rules, validation, entitlement logic
- **Integration tests** — APIs, database, authentication, RAG, billing webhooks
- **End-to-end tests** — login, chat, first aid, symptom assessment, medicine ID, admin functions, subscription lifecycle
- **AI safety tests** — emergency scenarios, unsafe medical questions, prompt injection, hallucinated citations, mental-health emergencies
- **Billing safety tests** — confirm safety behavior is unaffected by expired subscriptions, exhausted quotas, or failed payments

## Documentation

| Document | Path |
|---|---|
| Project Requirements | `docs/requirements/part-01-project-requirements.md` |
| System Architecture | `docs/architecture/part-02-system-architecture.md` |
| Technology Stack | `docs/architecture/part-03-technology-stack.md` |
| Repository Structure | `docs/architecture/part-04-repository-structure.md` |
| Environment Configuration | `docs/architecture/part-05-environment-configuration.md` |
| Git Strategy | `docs/architecture/part-06-git-strategy.md` |
| API Architecture | `docs/architecture/part-07-api-architecture.md` |
| Database Architecture | `docs/architecture/part-08-database-architecture.md` |
| AI Architecture | `docs/architecture/part-09-ai-architecture.md` |
| Security & Threat Model | `docs/security/part-10-threat-model.md` |

## Disclaimer

MediFirst AI is presented as an **AI-assisted health information and educational platform**, offered as a subscription service. It is **not** marketed as an AI doctor, an autonomous diagnostic system, or a replacement for healthcare professionals, unless and until it undergoes the clinical validation, regulatory assessment, and professional oversight such claims would require. Paid subscription tiers unlock convenience and capacity — never a higher standard of medical safety, which is guaranteed equally to every user.
