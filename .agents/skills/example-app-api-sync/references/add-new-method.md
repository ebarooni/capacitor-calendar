# Adding a new method to the example app

1. In `index.html`, add an `ion-button` in `ion-list#methods-list`, positioned alphabetically
2. Set the button's id to the method name in kebab case (e.g. `modifyEvent` becomes `modify-event`) and its label to a human-readable form (e.g. `Modify event`)
3. In `example.js`, add a matching event listener in the same alphabetical position, following the style of the existing listeners
4. In the callback, call the method with its input options (if any), await, and log the result (use async/await for the callback function)
5. Run `npm run fmt` from the repo root and fix any errors related to the example-app changes.
