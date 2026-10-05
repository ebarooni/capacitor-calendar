# Adding a new method to the example app

1. In `index.html`, add an `ion-button` in `ion-list#methods-list`, positioned alphabetically.
2. Set the button’s id to the method name in kebab case (for example `modifyEvent` → `modify-event`). Set its label to a short human form (for example `Modify event`).
3. Add `example-app/src/js/methods/<kebab-method>.js`. Export `register<MethodName>()`. On click, call the plugin, await the result, and log it. Use helpers from `example-app/src/js/utils/` when they already fit.
4. If the method has Options-tab fields:
   - Add `example-app/src/js/methods/<kebab-method>.options.html` next to the method module. Put one `ion-accordion` in that file. Keep the same element ids the method JS will read.
   - In the method module, import with Vite `?raw`: `import optionsHtml from './<kebab-method>.options.html?raw'`. Call `injectMethodOptions(optionsHtml)` before you add the click listener.
   - Do not put that accordion in `index.html`. Do not share Options fields across methods.
5. Register the method from `example-app/src/js/methods/index.js` in `registerAllMethods()`. Keep alphabetical order.
6. Do not add method click handlers to `example-app/src/js/example.js`.
7. Run `npm run fmt` from the repo root. Fix any errors from the example-app changes.
