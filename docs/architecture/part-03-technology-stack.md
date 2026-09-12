# PART 03 — Technology Stack

| Layer | Technology | Justification |
|---|---|---|
| Frontend framework | React 18 + TypeScript | Strong typing reduces medical-UI bugs |
| Build tool | Vite | Fast dev/build |
| Styling | Tailwind CSS | Utility-first, consistent risk-level colors |
| Routing | React Router | Standard |
| Server state | TanStack Query | Caching/retry for API calls |
| Forms | React Hook Form + Zod | Type-safe validation |
| Backend runtime | Node.js + Express + TypeScript | Modular monolith friendly |
| Validation | Zod (both ends) | Single validation mental model |
| Auth | JWT or secure server sessions | Exact choice finalized in Part 25 |
| Password hashing | Argon2 (preferred) or bcrypt fallback | Argon2id current recommended default |
| Database | PostgreSQL | Relational integrity for medical/billing data |
| Vector search | pgvector | Avoids a second database system |
| ORM | Prisma | Strong TypeScript integration, migrations |
| AI provider | Abstracted AIService interface | Prevents vendor lock-in |
| Payments | Stripe behind PaymentService abstraction | Industry standard, tokenized card data |
| Testing | Vitest/Jest, Supertest, Playwright | Standard, integrates with stack |
