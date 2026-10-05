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
  version: '1.1'
---

# Example App API Sync

## Layout

- Methods-tab buttons: `example-app/src/index.html` (`#methods-list`)
- Shared Options chrome + empty `#options-accordion-group`: `index.html`
- Per-method listeners: `example-app/src/js/methods/<kebab-method>.js`, registered from `methods/index.js`
- Per-method Options accordion (only when the method has fields): sibling `example-app/src/js/methods/<kebab-method>.options.html`, imported with Vite `?raw` and injected via `injectMethodOptions` before wiring listeners
- Boot: `example-app/src/js/example.js` (init + `registerAllMethods()`; do not put method listeners here)

## Workflow

1. Identify which method was affected by the change
2. Check `#methods-list`, `js/methods/`, and any sibling `*.options.html` for that method
3. Apply the matching action:

   | Change type                                    | Action                                                                         |
   | ---------------------------------------------- | ------------------------------------------------------------------------------ |
   | New method (no button yet) or explicitly asked | See [Adding a new method to the example app](references/add-new-method.md)     |
   | Removed                                        | Delete button, `*.options.html` (if any), method module, and index import      |
   | Renamed                                        | Update button id/label, method file, options HTML (if any), and call; keep A–Z |
   | Options changed                                | Update the method module and its `*.options.html` (if any) to match schemas    |
   | No change                                      | No action                                                                      |

## Rules

- Only sync the method(s) affected by the current change — don't proactively add, remove, or rename other methods that weren't part of it, unless explicitly asked
- Do not put per-method Options accordion markup in `index.html`
- Do not add Vite HTML plugins or new deps for options partials — use built-in `?raw` only
