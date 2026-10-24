---
name: resolve-review-threads
description: >
  Lists the open review threads on a pull request, replies to each with the
  fixing commit or the reason to decline, and resolves it. Use when addressing
  or resolving PR review comments, including bot review threads.
metadata:
  version: '1.0'
---

# Resolve Review Threads

Requires an authenticated `gh`. Post replies only when the user asked you to address the review.
Paths are relative to this skill's folder.

1. Run `scripts/list-threads.sh <pr> [owner/repo]`. It prints only unresolved, non-outdated threads.
2. For each thread, fix it or decline it with [references/replies.md](references/replies.md).
3. Commit and push the fixes.
4. Reply to each thread with `scripts/reply-resolve.sh <thread-id> -- <body>` (use `--` so multi-word text, and a leading `-`, is not split into extra args). Add `--no-resolve` to leave it open. If the reply posted but resolve failed, rerun with `--resolve-only <thread-id>`.
5. Run step 1 again. Stop when stderr prints `No unresolved, current threads on …`. When a new review arrives, start again at step 1.
