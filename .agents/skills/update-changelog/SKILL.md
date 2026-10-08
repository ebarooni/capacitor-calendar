---
name: update-changelog
description: >
  Use when a finalized, noteworthy plugin change under src/, ios/, or android/ is not yet reflected in CHANGELOG.md, or when explicitly asked to update it.
  Compares the current branch with its base branch and adds missing changelog entries for user-facing features, fixes, and breaking changes.
  Do not use for work-in-progress or internal-only changes, or package.json-only version bumps.
paths:
  - 'package.json'
  - 'src/**'
  - 'ios/**'
  - 'android/**'
metadata:
  version: '1.1'
---

# Update Changelog

## 1. Prepare the release version

1. Read `package.json` and determine the current package version `V`
2. Resolve the published baseline: latest `v*` git tag (fallback: `npm view @ebarooni/capacitor-calendar version` for npm `latest`)
3. Treat `V` as the planned release only when it is strictly greater than that baseline (not yet published / not yet tagged). If `V` equals the baseline, bump first — do not append new notes under an already-published section:

- patch: `npm run version:patch`
- minor: `npm run version:minor`
- major: `npm run version:major`

4. Ask which bump to use when the change type is unclear (additive API → minor; fix → patch; breaking → major)

## 2. Identify changes

1. Determine the base branch (`git symbolic-ref refs/remotes/origin/HEAD`, falling back to `main` if unset)
2. Run `git diff $(git merge-base HEAD origin/<base-branch>)...HEAD -- src ios android`
3. Identify only finalized (native + web sides both complete, not WIP), user-facing API changes

## 3. Update the changelog

1. Run `cat CHANGELOG.md | grep <new_version>` to see if the new version already has a section

- If not, add it to the content table and create a section for the new version

2. If the current (unpublished) version section already exists, reuse it and add only missing changelog-worthy changes (do not duplicate existing entries)
3. Use these categories to describe the changes:

- Added: new features
- Changed: changes in existing functionality
- Deprecated: soon-to-be removed features
- Removed: now removed features
- Fixed: any bug fixes
- Security: in case of vulnerabilities

## Rules

- Group related implementation changes into a single changelog entry when they represent one user-facing change
- Keep entries concise and specific
- Prefer one entry for one meaningful API change rather than one entry per commit or file
- Describe user-visible API changes, not implementation details
- Changelog sections for versions that already have a git tag / npm publish are read-only; never append new release notes there
- All previous release sections are historical records and are strictly read-only
