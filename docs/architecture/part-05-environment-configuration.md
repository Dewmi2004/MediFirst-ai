# PART 05 — Environment Configuration

## backend/.env.example
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/medifirst
JWT_SECRET=replace_with_a_long_random_value
SESSION_SECRET=replace_with_a_long_random_value
AI_PROVIDER=openai
AI_PROVIDER_API_KEY=replace_with_real_key
STRIPE_SECRET_KEY=replace_with_real_key
STRIPE_WEBHOOK_SECRET=replace_with_real_key
LOG_LEVEL=info

## frontend/.env.example
VITE_API_BASE_URL=http://localhost:4000/api/v1

No real secrets committed. Secrets management strategy (vault vs plain env vars in production) deferred to Part 91.
