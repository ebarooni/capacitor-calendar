---
name: commit-message-generator
description: >
  Use when generating commit messages or reviewing staged changes.
  Handles conventional commits format, scope detection, and breaking change notation.
disable-model-invocation: true
---

# Commit Message Generator

## Workflow

1. Run `git diff --cached`. If empty, ask the user to stage changes
2. Identify the commit type:
   - Normal commit: [`references/normal-commit.md`](references/normal-commit.md)
   - Revert commit: [`references/revert.md`](references/revert.md)

## Rules

- Present the drafted message to the user for confirmation. Do not run `git commit` unless the user explicitly asks you to.
