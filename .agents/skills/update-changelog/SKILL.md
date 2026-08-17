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
  version: '1.0'
---

# Update Changelog

## 1. Prepare the release version

1. Read `package.json` and determine the current package version
2. If the version has already been raised for the planned release, do not change it
3. If the version has not been raised, ask what the release is (patch/minor/major), then run:
   - patch: `npm run version:patch`
   - minor: `npm run version:minor`
   - major: `npm run version:major`

## 2. Identify changes

1. Determine the base branch (`git symbolic-ref refs/remotes/origin/HEAD`, falling back to `main` if unset)
2. Run `git diff $(git merge-base HEAD origin/<base-branch>)...HEAD -- src ios android`
3. Identify only finalized (native + web sides both complete, not WIP), user-facing API changes

## 3. Update the changelog

1. Run `cat CHANGELOG.md | grep <new_version>` to see if the new version already has a section
   - If not, add it to the content table and create a section for the new version
2. If the current version section already exists, reuse the existing section and add only missing changelog-worthy changes (do not duplicate existing entries)
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
- All previous release sections are historical records and are strictly read-only
