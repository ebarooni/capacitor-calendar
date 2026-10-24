---
name: consistency-check
description: >
  Use after all three capacitor-platform-developer runs report complete for a method-spec.md.
  Verifies web, Android, and iOS against the spec: signature, error codes, partial-support
  strategy, and doc comments. Not a general code review.
metadata:
  version: '1.1'
---

# Consistency Check

Called by `plugin-task-orchestrator` after all three `capacitor-platform-developer` reports in `agent-reports/` say `complete`. Running earlier produces false mismatches.

## Inputs

- `method-spec.md` — the source of truth
- Path to the TypeScript API changes — should already match the spec (the orchestrator applied it in its own step; this skill re-verifies rather than assuming)
- The three platform implementation files/functions for this method
- The three `agent-reports/{platform}.md` files, for their self-reported deviations

## Workflow

1. Interface parity (TypeScript API vs. spec):
   Confirm the shared TypeScript interface actually matches what `method-spec.md` specifies — method name, options object shape, return type, JSDoc.

2. Confirm Signature parity (platform vs. TypeScript API) for each platform:
   - The exposed method name matches
   - The fields in the compatibility table are correctly reflected for each platform

3. Error-code parity:
   Cross-reference each platform's actual reject/error paths against the spec's error contract table. Flag:
   - An error code the platform uses that isn't in the spec's table.
   - A spec-mandated error code that isn't implemented anywhere for that
     platform.
   - The same logical error condition surfaced under different codes on
     different platforms, when the spec says it should be shared.

4. Doc-comment accuracy:
   Confirm each platform's inline documentation doesn't contradict the TypeScript API or claim behavior the implementation doesn't actually have (e.g. a stale comment from a previous spec revision).

5. Self-reported deviations:
   Read each platform's `agent-reports/{platform}.md` "Deviations from spec" section. Every deviation listed there must correspond to something legitimately unresolvable (per the spec's own open questions or `UNVERIFIED` markers) — a deviation that was never surfaced to the orchestrator as a blocker is itself a finding, not just a note.

## Output

Write `consistency-report.md` to the task workspace with one of two outcomes:

Clean:

```md
## Consistency check — passed

All three platforms conform to method-spec.md. No action needed.
```

Mismatches found:

```md
## Consistency check — mismatches found

1. **[Android] Error code drift**
   - Spec says: `{expected}`
   - Implementation uses: `{actual}`
   - File: {path}

2. **[iOS] Unimplemented supported field**
   - Spec marks `{field}` as supported on iOS
   - Not found in implementation
   - File: {path}
```

Each finding should name the platform, the category (signature / error-code / partial-support / doc), the expected vs. actual state, and the file. This is what the orchestrator uses to decide which platform(s) need to go back through the escape-hatch loop — vague findings just cause another round of guessing.

## Rules

- Don't check code quality or style — that's the platform developer's job.
- Don't fix anything itself. Only report; the orchestrator decides the resolution path.
