---
name: manage-github-issues
description: >
  Use when creating or modifying GitHub issues to ensure they follow repository-specific templates, formatting conventions, and established patterns.
metadata:
  version: '1.0'
---

# GitHub Issues

## Issue Title

Title must follow this format: `<type>(<scope>): <description>`

The type should be one of: `feat`, `bug`, `docs`, `refactor`, `chore`

The scope should be one of: `android`, `ios`, `web`

Omit the scope if the issue applies to multiple scopes. 

Append `!` to the type or scope when the issue describes a breaking change.

### Examples

- feat!: replace the public configuration API
- feat(android)!: change the authentication API
- docs: document the authentication flow
