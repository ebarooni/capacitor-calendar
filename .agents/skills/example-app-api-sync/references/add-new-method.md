# Adding a new method to the example app

1. In `index.html`, add an `ion-button` in `ion-list#methods-list`, positioned alphabetically
2. Set the button's id to the method name in kebab case (e.g. `modifyEvent` becomes `modify-event`) and its label to a human-readable form (e.g. `Modify event`)
3. If the method has Options-tab fields, add an `ion-accordion` under Options → Per method with that method's own inputs (do not share fields across methods)
4. Add `example-app/src/js/methods/<kebab-method>.js` that exports `register<MethodName>()` and wires the button click (call the plugin, await, log). Use helpers from `example-app/src/js/utils/` when shared
5. Register it from `example-app/src/js/methods/index.js` in `registerAllMethods()`, keeping alphabetical order
6. Keep `example-app/src/js/example.js` as the thin entry (init + `registerAllMethods()` only)
7. Run `npm run fmt` from the repo root and fix any errors related to the example-app changes
