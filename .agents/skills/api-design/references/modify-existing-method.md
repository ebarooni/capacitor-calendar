# Modify Existing Method

- Diff the proposed change against the current signature
- Classify the overall change as breaking or non-breaking (new optional field = non-breaking; removing/renaming/retyping a field, or changing default behavior = breaking)
  - Breaking: the spec must include a migration path — either a deprecated-but-functional overload kept for one version, or a clear "this is a major-version bump" note for the orchestrator's changelog step.
  - Non-breaking: proceed as in the normal process, scoped to the changed/added fields only.

## Rules

- Don't silently break signatures
