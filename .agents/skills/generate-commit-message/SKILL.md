---
name: generate-commit-message
description: >
  Use before any git commit, including commit-and-push and PR updates. Drafts a
  conventional commit message, proposes a split when staged changes are not
  cohesive, and waits for confirmation before committing.
metadata:
  version: '1.2'
---

# Generate Commit Message

1. Run `git diff --cached`. If it is empty, ask the user to stage changes.
2. If the changes are not cohesive, propose a split (commits, messages, files or hunks for each) and stop.
3. Draft the message. Put one blank line between the sections that exist:

   ```
   <header>

   <body>

   <footer>
   ```

   - Header: types and `!` from `CONTRIBUTING.md` › Pull requests › Title format. Scope from the touched paths: `android/**` → `android`, `ios/**` → `ios`, `src/web.ts` or `src/web/**` → `web`. Omit the scope when several apply.
   - Subject: imperative, lowercase start, no trailing period, at most 72 characters.
   - Body (optional): why, and how behavior differs from before.
   - Footer (optional): `BREAKING CHANGE: <what changed, what callers must do>`, or `Closes #<n>` only for a known issue.
4. Revert: `revert: <exact header of the reverted commit>`, blank line, `This reverts commit <hash>.`
5. Show the draft. Run `git commit` only when the user asks.
