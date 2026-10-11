# Method Spec: `{methodName}`

Filled out by the api-design skill. This is the single source of truth handed to the web, Android, and iOS subagents. Do not implement anything that deviates from this without routing the change back through this skill via the orchestrator.

## Metadata

- Task type: `new-method` | `modify-method` | `remove-method`
- Source task: (link to GitHub issue/PR, or original task text)
- Breaking change?: yes / no — if yes, see migration notes
- Target version: If `package.json` equals the latest published `v*` tag / npm `latest`, it is not yet bumped for this work — bump first (`version:minor` for a new method, `version:patch` for a fix or non-breaking modification, `version:major` for breaking), then use that new version in `@since`. Only reuse `package.json` when it is already strictly greater than the published baseline.

## TypeScript Interface

Pick the best fitting sub-interface under `src/sub-definitions` and add the method definition:

```ts
/**
 * {One-sentence description of what this method does.}
 *
 * @since {version}
 */
{methodName}(options: {MethodName}Options): Promise<{MethodName}Result>;
```

Preserve the alphabetic order of the methods.

If applicable, add the options and result interface under `src/schemas/interfaces`:

```ts
export interface {MethodName}Options {
  /**
   * {description}
   *
   * @example {a valid example value}
   * @default {default value if optional}
   * @platform {all | web | android | ios — list which support it (e.g. Android, iOS)}
   * @since {target version}
   */
  fieldName: FieldType;
}
```

```ts
export interface {MethodName}Result {
  /**
   * {description}
   *
   * @example {a valid example value}
   * @default {default value if optional}
   * @platform {all | web | android | ios — list which support it (e.g. Android, iOS)}
   * @since {target version}
   */
  fieldName: FieldType;
}
```

Keep the properties in both the options and result interface in alphabetic order.

## Field-by-field compatibility table

| Field       | Type     | Required? | Web   | Android | iOS   | Partial-support strategy (if any)                                                                                                             |
| ----------- | -------- | --------- | ----- | ------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `fieldName` | `string` | yes/no    | F/P/N | F/P/N   | F/P/N | (reject / no-op / separate method / feature-detect — see [Handling partial platform support](checklist.md#handling-partial-platform-support)) |

Legend: (F) full support / (P) partial/different behavior (explain in notes) / (N) not supported

## Error contract

| Error code     | Meaning                        | Platforms it applies to   |
| -------------- | ------------------------------ | ------------------------- |
| `{ERROR_CODE}` | {when this is thrown/rejected} | all / web / android / ios |

## Behavioral notes per platform

Short, implementation-relevant notes — not full implementation instructions, just what a platform subagent needs to know that isn't obvious from the table (e.g. "on iOS this requires an entitlement," "on web this only works in a secure context").

- Android: {notes, or "no special notes"}
- iOS: {notes, or "no special notes"}
- Web: {notes, or "no special notes"}

## Migration notes (only if breaking or modifying an existing method)

- What changes for existing callers.
- Whether a deprecated overload/alias is kept, and for how long.
- Suggested CHANGELOG entry.

## Open questions for platform agents

List anything this skill couldn't resolve without platform-specific knowledge. The orchestrator should get these answered and update this spec before dispatching implementation work.

- {question, or "none"}
