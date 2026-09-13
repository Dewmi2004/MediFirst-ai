# Security & Threat Model

| Threat Category | Example | Primary Mitigation (Part) |
|---|---|---|
| Authentication attacks | Credential stuffing, weak passwords | Argon2/bcrypt hashing (03), rate limiting + password policy (30) |
| Authorization attacks | Privilege escalation via role tampering | RBAC + permission checks on every endpoint (07, 29) |
| Prompt injection | Malicious instructions in retrieved documents or user input | Untrusted-content isolation in prompt template (09, 82) |
| Data poisoning | Malicious/incorrect content submitted as a trusted medical source | Ingestion -> validation -> admin approval pipeline (Part 84) |
| File upload attacks | Malicious file disguised as a medicine image | MIME/extension/size/content validation, never trust filename (Part 76) |
| XSS | Malicious script rendered unsafely | React default escaping + CSP headers (20, 91) |
| CSRF | Forged requests against authenticated session endpoints | SameSite cookies / CSRF tokens (30) |
| SQL injection | Malicious input in raw queries | Prisma parameterized queries (08, 32) |
| Rate-limit abuse | Scripted abuse of free-tier AI chat | Rate limiting + Entitlement quotas (105), never applied to emergency detection |
| Data leakage | Verbose error messages exposing internals | Standard sanitized error envelope (07, 43) |
| Payment/webhook forgery | Fake Stripe webhook events | Webhook signature verification, idempotency keys (104) |
| Billing bypass via plan tampering | Client-side plan spoofing to unlock paid features | All entitlement checks server-side only (09, 102) |
| Over-broad org admin access | OWNER reading members private health conversations | Least-privilege scoping (18, 109) |

Highest-priority medical-safety-specific threats: data poisoning and prompt injection (both target the emergency-escalation and trusted-knowledge guarantees).
Highest-priority SaaS-specific threats: billing bypass via plan tampering, over-broad org admin access (map to FR-15/FR-16).
