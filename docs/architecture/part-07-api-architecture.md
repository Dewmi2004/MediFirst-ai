# PART 07 — API Architecture

## Layering
Route -> Middleware (auth, validation, rate limit) -> Controller -> Service -> Data layer (Prisma)

## Versioning
All routes prefixed /api/v1/... A breaking change gets /api/v2/... rather than mutating v1.

## Standard success response
{ "success": true, "data": {} }

## Standard error response
{ "success": false, "message": "Unable to process the request", "errorCode": "REQUEST_PROCESSING_ERROR" }

## Safety-first ordering
Controllers never contain safety logic directly. They call safetyService.checkForEmergency(input) first.
Entitlement checks follow the same service-layer pattern, called immediately after the safety check succeeds — never before it, never merged into the same function.
