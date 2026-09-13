# Git Strategy

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

