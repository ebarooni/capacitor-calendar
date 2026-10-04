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
2. Check `example-app/src/index.html`, `example-app/src/js/methods/`, and Options-tab accordions for an existing button/listener for that method
3. Apply the matching action:

   | Change type                                    | Action                                                                           |
   | ---------------------------------------------- | -------------------------------------------------------------------------------- |
   | New method (no button yet) or explicitly asked | See [Adding a new method to the example app](references/add-new-method.md)       |
   | Removed                                        | Delete its button, Options accordion (if any), method module, and index import   |
   | Renamed                                        | Update id, label, method file, and call to the new name; keep alphabetical order |
   | Options changed                                | Update the method module (and its Options accordion) to match `src/schemas/`     |
   | No change                                      | No action                                                                        |

## Rules

- Only sync the method(s) affected by the current change — don't proactively add, remove, or rename other methods that weren't part of it, unless explicitly asked
