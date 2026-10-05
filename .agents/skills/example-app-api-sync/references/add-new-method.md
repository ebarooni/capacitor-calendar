# Adding a new method to the example app

1. In `index.html`, add an `ion-button` in `ion-list#methods-list`, positioned alphabetically
2. Set the button's id to the method name in kebab case (e.g. `modifyEvent` → `modify-event`) and its label to a human-readable form (e.g. `Modify event`)
3. Add `example-app/src/js/methods/<kebab-method>.js` that exports `register<MethodName>()`, calls the plugin on click, awaits, and logs. Use helpers from `example-app/src/js/utils/` when shared
4. If the method has Options-tab fields:
   - Add sibling `example-app/src/js/methods/<kebab-method>.options.html` with one `ion-accordion` (same ids/structure the JS will query)
   - In the method module: `import optionsHtml from './<kebab-method>.options.html?raw'`, then `injectMethodOptions(optionsHtml)` before wiring the click listener
   - Do not put that accordion in `index.html`; do not share fields across methods
5. Register it from `example-app/src/js/methods/index.js` in `registerAllMethods()`, keeping alphabetical order
6. Keep `example-app/src/js/example.js` as the thin entry (init + `registerAllMethods()` only)
7. Run `npm run fmt` from the repo root and fix any errors related to the example-app changes
