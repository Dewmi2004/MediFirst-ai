# AI Architecture

User Question
  -> Input Validation
  -> Emergency Detection (always runs, never entitlement-gated)
  -> Intent Classification (first-aid / symptoms / medicines / general chat)
  -> Entitlement Check (only for non-safety, quota-relevant features)
  -> RAG Retrieval (trusted sources only)
  -> AI Generation (via AIService abstraction)
  -> Safety Validation (diagnosis claims, dangerous instructions, missing escalation)
  -> Medical Risk Validation
  -> Citation Validation (no fabricated sources)
  -> Response + Source Display

Interfaces (illustrative, implemented starting Part 81):
AIProvider.generate(prompt, context) -> AIResponse
SafetyValidator.checkEmergency(input) -> EmergencyCheckResult
SafetyValidator.validateResponse(response) -> SafetyValidationResult

AIProvider has no knowledge of safety rules, plans, or quotas — that logic lives entirely in SafetyValidator and the Entitlement Service.
