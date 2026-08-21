---
name: api-design
description: >
  Use whenever a task involves adding a new plugin method, changing an existing method's signature/options/return type, or removing a method — even if the request only mentions one platform, because the contract must hold across web, Android, and iOS.
  Designs or revises a Capacitor plugin's public TypeScript API contract for a single method (add, modify, or remove) before any platform implementation work begins.
  Do not use this skill for pure bugfixes, refactors, or doc-only changes that don't touch the public interface.
metadata:
  version: '1.0'
---

# API Design

Designs the public contract for one Capacitor plugin method. This is a design-only skill and never writes platform implementation code. Its output is a method-spec artifact (see [Method Spec Template](references/method-spec-template.md)) that gets handed to the web/Android/iOS subagents.

## Workflow

1. Classify the task:
   - New method: full design from scratch – continue with next steps
   - Modify method: diff mode — see [Modify Existing Method](references/modify-existing-method.md)
   - Remove method: skip steps 2 to 4 – see [Remove Method](references/remove-method.md)

2. Determine the method's shape:
   Work through the [Decision Checklist](references/checklist.md)

3. Resolve per-field compatibility. For every input option and every return field, decide one of:
   - Universal: works the same on all three platforms
   - Universal but different underlying behavior: same field, platforms implement it differently (note the difference subagents don't need to guess intent)
   - Partial support: works on some platforms only. Pick and record one handling strategy (see checklist in references) rather than leaving it to each subagent to invent their own.
   - Not feasible anywhere reasonable: drop the field; don't design around a hypothetical

4. Define error behavior:
   Specify the error/rejection contract explicitly: what error codes/messages exist, which are platform-agnostic, and which are platform-specific extensions of a common base.

5. Write the method spec:
   Fill out [Method Spec Template](references/method-spec-template.md) completely. This becomes the shared artifact every subagent implements against. It must be precise enough that a subagent never needs to ask "wait, what should this actually do?"

6. Flag open questions:
   If any decision is genuinely blocked on information only a platform subagent has (e.g. "does Android's API 26+ still support this?"), list it explicitly under "Open questions for platform agents" in the spec rather than guessing. The orchestrator resolves these before dispatch.

7. Hand off:
   Return the completed spec to the orchestrator. Do not proceed to implementation guidance, that's the platform subagents' job.

## Anti-patterns to avoid

- Designing the options object around one platform's native API shape.
- Adding a "just in case" option nobody asked for and no platform can act on consistently.
- Silently dropping a field instead of recording it as "not feasible" with a reason.
- Skipping the existing-interface survey step and inventing a naming style that doesn't match the rest of the plugin.
- Leaving partial-support handling unspecified and letting each platform subagent decide independently.
- Never just prose description of the method
- Never let an easy web implementation silently expand scope beyond what Android/iOS can honestly do
