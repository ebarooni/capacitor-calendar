# Review replies

- Fix when the comment is correct and in scope. Decline when it is wrong, out of scope, or the current behavior is intended.
- Push the fix before you reply. Reply right after that push and name the commit by its short SHA.
- Post one reply per thread. Run the list script first so that you never answer a thread twice.
- Skip outdated threads. The list script leaves them out because the code they point at has changed.
- Use one of these forms:
  - `Fixed in <sha>: <what changed>.` Then resolve.
  - `Keeping as designed: <reason>.` Resolve it, or add `--no-resolve` if the reviewer must decide.
  - `Acknowledged residual: <limit and why it is acceptable>.` Then resolve.
- Answer a review-summary item that has no thread in one PR comment, not in many replies.
