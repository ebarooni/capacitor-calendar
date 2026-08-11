---
name: example-app-api-sync
description: >
  Use when a plugin API change may require updating how the example-app calls the plugin.
  Trigger for adding, removing, renaming, or changing public API methods, and for changes to their input options under src/schemas/.
  Also when explicitly asked to add the call for a method that is already available in the API but not in the example-app.
  Do not trigger for return types, internal implementation changes, refactors, or changes that cannot affect how the example-app calls the API.
paths:
  - 'src/schemas/**'
  - 'src/sub-definitions/**'
metadata:
  version: '1.0'
---

# Example App API Sync

## Workflow

1. Identify which method was affected by the change
2. Check `example-app/src/index.html` and `example-app/src/js/example.js` for an existing button/listener for that method
3. Based on whether the method was added, removed, renamed, or had its options changed:
   - No button yet: add one (continue with the next steps)
   - Removed: delete its button and listener
   - Renamed: update id, label, and call to the new name; reposition alphabetically if needed
   - Options changed: update the call if it no longer matches `src/schemas/`
   - No change: no action
4. In `index.html`, add an `ion-button` in `ion-list#methods-list`, positioned alphabetically
5. Set the button's id to the method name in kebab case (e.g. `modifyEvent` becomes `modify-event`) and its label to a human-readable form (e.g. `Modify event`)
6. In `example.js`, add a matching event listener in the same alphabetical position, following the style of the existing listeners
7. In the callback, call the method with its input options (if any), await, and log the result
8. Run `npm run fmt` from the repo root and fix any errors related to the example-app changes

## Rules

- Only sync the method(s) affected by the current change — don't proactively add, remove, or rename other methods that weren't part of it, unless explicitly asked
- Use async/await for callback functions
- Preserve existing behavior for unaffected methods
