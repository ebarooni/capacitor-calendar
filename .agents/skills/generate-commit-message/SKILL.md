---
name: generate-commit-message
description: >
  Use before any git commit, including when updating a PR, pushing branch
  work, or when the user asks to commit / commit-and-push. Drafts conventional
  commit messages, proposes splits when staged changes are not cohesive, and
  waits for confirmation before running git commit.
metadata:
  version: '1.1'
---

# Generate Commit Message

## Triggers

Use this skill whenever any of these apply:

- The user asks to commit, commit and push, or land changes
- Updating a PR requires new commits on the branch
- Pushing work that is not yet committed
- Reviewing or drafting messages for staged changes

## Workflow

1. Run `git diff --cached`. If empty, ask the user to stage changes
2. Identify the commit type:
   - Normal commit: [`references/normal-commit.md`](references/normal-commit.md)
   - Revert commit: [`references/revert.md`](references/revert.md)
3. If staged changes are not cohesive, propose a split (commits, messages, and which files/hunks belong to each) before drafting a single message

## Rules

- Present the drafted message (or proposed split) to the user for confirmation. Do not run `git commit` unless the user explicitly asks you to.
