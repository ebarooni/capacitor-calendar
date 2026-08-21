# API Design Decision Checklists

Work through the relevant checklist and record the decision (and reason) directly in the method spec. Don't just pick silently.

## Handling partial platform support

For each option/field flagged as partial support in `SKILL.md` step 3, pick exactly one of these strategies and record which:

1. Reject with a typed error on unsupported platforms:
   Best when using the field on that platform would silently produce wrong behavior if ignored. The spec must name the exact error code/message.
2. Silently ignore / no-op on unsupported platforms:
   Documented clearly in the JSDoc with an `@platform` or equivalent tag. Best when the field is a soft enhancement (e.g. a UI hint) and app behavior is still correct without it.
3. Split into separate, optional fields:
   Instead of a shared field on method, split the field into separate platform specific fields. Use sparingly as this adds surface area.
