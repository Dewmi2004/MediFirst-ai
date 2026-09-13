# MediFirst AI

**AI-assisted health information, first-aid guidance, symptom risk education, and medicine information — delivered as a secure, multi-tenant SaaS platform.**

>  **MediFirst AI is not a doctor, hospital, pharmacist, or emergency service.** It is an AI-assisted health information and education platform. It does not diagnose disease, prescribe medication, or replace professional medical care. If you are experiencing a medical emergency, contact your local emergency services immediately.
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
- [Roadmap](#roadmap)
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
| **Subscription Plans** | Tiered plans with entitlement-based feature gating that never touches safety features |
| **Admin Console** | Source/content approval, safety event review, user and role management, aggregate billing health |

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, React Router, TanStack Query, React Hook Form, Zod |
| Backend | Node.js, Express, TypeScript, Zod, JWT/session auth, Argon2/bcrypt, Helmet, CORS, rate limiting |
| Database | PostgreSQL, pgvector (vector search), Prisma ORM — self-hosted, no paid managed database |
| AI | Ollama, running an open-source local model, behind a provider-agnostic `AIService` abstraction |
| Payments | PayHere behind a `PaymentService` abstraction — sandbox mode only, for academic demonstration; no real transactions |
| Testing | Vitest/Jest, Supertest, Playwright |

All infrastructure is free and self-hostable: no paid cloud AI APIs, no paid database/hosting tiers, and no live payment processing. The provider abstractions (`AIService`, `PaymentService`) exist so a paid provider could be swapped in later, but none is required to run or demonstrate the project.

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
| Free | Limited AI messages/month. First-aid, symptom risk tools, and all emergency/safety behavior fully available |
| Starter | Higher AI quota, medicine ID included with a monthly cap |
| Pro | Higher/near-unlimited quotas, priority support |
| Team | Organization seats, shared billing, usage analytics |
| Enterprise | Custom quotas, custom terms, dedicated support |

Feature access is resolved through a single **Entitlement Service**, never scattered plan checks — and safety-critical features are hardcoded to always be available regardless of plan.

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+ with the `pgvector` extension
- [Ollama](https://ollama.com) installed locally, with a model pulled (e.g. `ollama pull llama3`)
- npm

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`.

### Backend

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
AI_PROVIDER=ollama
AI_PROVIDER_BASE_URL=http://localhost:11434
AI_PROVIDER_MODEL=llama3
PAYHERE_MERCHANT_ID=
PAYHERE_MERCHANT_SECRET=
PAYHERE_MODE=sandbox
LOG_LEVEL=info
```

**`frontend/.env`**
```dotenv
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

## Roadmap

- Planning & architecture — functional/non-functional requirements, system design, technology stack, repository conventions, API and database design, AI architecture, and the security threat model
- Frontend foundation — React application shell, styling system, routing, UI design system, accessibility baseline, API client, state management, and error/loading handling
- Backend foundation & authentication — Express API, global error handling, request validation, registration, login, session/token security, and role-based access control
- Database & user management — PostgreSQL schema, user profiles, account settings, data retention policy, account deletion, and audit logging
- Safety controller — emergency detection, emergency response templates, risk classification, unsafe-request detection, medication safety rules, diagnosis-safety guardrails, and AI response validation
- First-aid assistant — structured guidance for cuts, burns, bleeding, sprains, choking, and allergic reactions, plus the first-aid browsing UI
- Symptom risk guidance — symptom input, validation, the rule-based risk engine, emergency symptom detection, risk explanations, and follow-up questioning
- Medicine system — medicine database, search, image upload and processing, image-based identification, confidence/uncertainty display, and pharmacist-verification guidance
- AI + RAG architecture — AI provider abstraction, prompt architecture, vector database, document ingestion and chunking, embeddings, similarity search, and citation/provenance display
- Security, privacy & production hardening — API and file security, privacy architecture, security and AI safety audits, automated testing, deployment, and documentation
- SaaS, billing & multi-tenancy — organization/tenant support, subscription plans and entitlements, payment provider integration, billing webhooks, usage metering, pricing and checkout, billing settings, trial/grace-period logic, and the organization admin dashboard

## Security & Privacy

- HTTPS, Argon2/bcrypt password hashing, JWT/session security, rate limiting, Helmet, CORS
- Input and output validation on every endpoint via Zod
- File upload validation (MIME, extension, size, content) — filenames are never trusted
- Privacy-by-design: minimal data collection, configurable retention, user-controlled deletion
- Organization admins never get automatic access to members' private health conversations — only billing, seats, and aggregate usage
- No sensitive medical or payment data is logged; structured logs use `requestId`, `route`, `statusCode`, `duration`, `userId` only
- Full threat model: [`docs/security/threat-model.md`](./docs/security/threat-model.md)

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
| Project Requirements | `docs/requirements/project-requirements.md` |
| System Architecture | `docs/architecture/system-architecture.md` |
| Technology Stack | `docs/architecture/technology-stack.md` |
| Repository Structure | `docs/architecture/repository-structure.md` |
| Environment Configuration | `docs/architecture/environment-configuration.md` |
| Git Strategy | `docs/architecture/git-strategy.md` |
| API Architecture | `docs/architecture/api-architecture.md` |
| Database Architecture | `docs/architecture/database-schema.md` |
| AI Architecture | `docs/architecture/ai-rag-architecture.md` |
| Security & Threat Model | `docs/security/threat-model.md` |

## Disclaimer

MediFirst AI is presented as an **AI-assisted health information and educational platform**, offered as a subscription service. It is **not** marketed as an AI doctor, an autonomous diagnostic system, or a replacement for healthcare professionals, unless and until it undergoes the clinical validation, regulatory assessment, and professional oversight such claims would require. Paid subscription tiers unlock convenience and capacity — never a higher standard of medical safety, which is guaranteed equally to every user.

This project is developed for academic purposes using free and open-source tools throughout (self-hosted PostgreSQL, a locally run Ollama model, and a payment integration kept in sandbox/demo mode). No paid cloud services or paid deployment infrastructure are required to build, run, or evaluate it.