---
name: api-design
description: >
  Use when plugin-task-orchestrator (or the user) designs a public API change for one method:
  add, change signature/options/result, or remove. Produces method-spec.md before any platform
  work. Not for bugfixes, refactors, or doc-only changes.
metadata:
  version: '1.1'
---

# API Design

Design only. Output: a completed [method spec](references/method-spec-template.md) for the platform subagents.

1. Classify: new method (continue), modify ([diff mode](references/modify-existing-method.md)), remove ([remove](references/remove-method.md); skip steps 2-4).
2. Shape: read the neighboring methods in `src/sub-definitions/` and `src/schemas/interfaces/`, and match their naming and `*Options` / `*Result` style.
3. Per field (options and result), record one of: universal; universal with different platform behavior (say how); partial support (pick one strategy from the [checklist](references/checklist.md)); not feasible (drop it and give the reason).
4. Errors: list the codes and messages, and which ones are shared or platform-specific.
5. Fill in the template completely. A subagent must never need to ask what the method should do.
6. List anything that needs platform knowledge under "Open questions for platform agents". Do not guess.
7. Return the spec to the orchestrator. No implementation guidance.

## Anti-patterns

- Options shaped around one platform's native API.
- "Just in case" options that no platform can honor consistently.
- Dropping a field without recording "not feasible" and the reason.
- Leaving partial-support handling to each platform.
- An easy web implementation that widens scope beyond what iOS and Android can do.
