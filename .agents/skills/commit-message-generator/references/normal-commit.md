# Normal commit

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

## Workflow

1. Pick a type: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`
2. Determine the scope from the touched paths (`android/**` -> `android`, `ios/**` -> `ios` and `web/**` -> `web`)
3. Write the subject:
   - Imperative, present tense ("change", not "changed" or "changes")
   - Lowercase first letter, no trailing period
   - <= 100 characters
4. Add a body if the subject alone doesn't explain why — the body should include the motivation for the change and the contrast with the previous behavior
   - Imperative, present tense
5. Add a footer if either applies:
   | Case | Format |
   |-|-|
   | Breaking change | `BREAKING CHANGE: <what changed, what caller must do>` |
   | Closes an issue | `Closes #<issue_number>` |

## Rules

- Never guess a scope when multiple are touched — omit it instead
- Never fabricate an issue number — only include one if it's actually known
