# PART 02 — System Architecture

## Module List
Auth, Organizations, Billing, Entitlement Service, Safety, AI, RAG, First Aid, Symptoms, Medicines, Admin.

## Request Flow Ordering (fixed, non-negotiable)
Auth -> Safety (emergency check) -> Entitlement -> Feature module
The Safety Module is architecturally independent of Billing/Entitlement: emergency detection runs before any plan/quota check, never after.

## Table Ownership Per Module
- Auth: users, sessions
- Organizations: organizations, memberships
- Billing: plans, subscriptions, invoices, payment_methods, usage_records
- Safety: safety_events
- AI/RAG: conversations, messages, medical_sources, medical_documents, medical_chunks, embeddings
- First Aid/Symptoms/Medicines: first_aid_topics, symptoms, medicines, medicine_identifications
- Admin/Ops: audit_logs, security_events

## API Namespace Pattern (locked)
/api/v1/auth/*
/api/v1/organizations/*
/api/v1/billing/*
/api/v1/ai/*
/api/v1/first-aid/*
/api/v1/symptoms/*
/api/v1/medicines/*
/api/v1/admin/*

## Backend Folder Structure (target, built out starting Part 21-22)
backend/src/{config,modules/{auth,organizations,billing,entitlements,safety,ai,rag,first-aid,symptoms,medicines,admin},middleware,routes,services,utils,types,app.ts}
