# Database Architecture

-- Identity & Org
users (id, email, password_hash, role, created_at, ...)
organizations (id, name, owner_user_id, created_at, ...)
memberships (id, user_id, organization_id, org_role, created_at)

-- Conversations
conversations (id, user_id, organization_id?, started_at)
messages (id, conversation_id, role, content, created_at)

-- Medical knowledge (admin-curated, separate from user content)
medical_sources (source_id, title, publisher, url, country, jurisdiction, publication_date, last_reviewed, content_version, source_type, trust_level, created_at, updated_at)
medical_documents (id, source_id, title, raw_content, status)
medical_chunks (id, document_id, chunk_text, position)
embeddings (id, chunk_id, vector, model_version)
first_aid_topics (id, category, title, content, source_id)
symptoms (id, name, description)
medicines (id, generic_name, brand_name, use, warnings, source_id)
medicine_identifications (id, user_id, image_ref, result, confidence, created_at)

-- Billing (isolated — never joined directly into medical/RAG queries)
plans (id, name, price, quotas_json)
subscriptions (id, organization_id?, user_id?, plan_id, status, current_period_end)
invoices (id, subscription_id, amount, status, issued_at)
payment_methods (id, subscription_id, provider_ref)
usage_records (id, subscription_id, feature_key, count, period)

-- Ops
audit_logs (id, actor_id, action, target, created_at)
security_events (id, type, severity, details_redacted, created_at)
