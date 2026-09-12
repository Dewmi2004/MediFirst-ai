# PART 06 — Git Strategy

## .gitignore (root)
node_modules/
dist/
build/
.env
.env.local
*.log
.DS_Store
coverage/

## Branching Model
main        — always deployable
develop     — integration branch (optional)
part/NN-short-name — one branch per roadmap part, e.g. part/13-app-layout

## Commit Convention (Conventional Commits, tied to part numbers)
feat(part-13): add AppLayout, Header, Sidebar, Footer components
fix(part-12): correct Tailwind content paths
docs(part-02): finalize module table ownership
chore(env): update .env.example with Stripe keys
