---
name: manage-pull-requests
description: >
  Use when creating or modifying pull requests (merge requests) to ensure they follow repository-specific templates, formatting conventions, and established patterns.
metadata:
  version: '1.0'
---

# Manage Pull Requests

## PR Title

Title must follow this format: `<type>(<scope>): <description>`

The type should be one of: `feat`, `fix`, `docs`, `refactor`, `chore`, `style`, `perf`

The scope should be one of: `android`, `ios`, `web`

Omit the scope if the issue applies to multiple scopes.

Append `!` to the type or scope when the PR introduces a breaking change.

### Examples

`feat!: <description>` or `feat(android)!: <description>`

## PR Body

The body should reference the issue the PR closes: `Closes: #<ISSUE_NUMBER>`
