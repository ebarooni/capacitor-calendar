# Example App

A manual test harness for [`@ebarooni/capacitor-calendar`](https://github.com/ebarooni/capacitor-calendar). It has one button per plugin method and logs each result to the console, so you can exercise the plugin on iOS, Android, and web while you develop or review changes.

Run this app through the root project, not on its own. See [CONTRIBUTING.md](../CONTRIBUTING.md) for full prerequisites (Node version, CocoaPods, Android Studio).

## Bootstrap

From the repository root, install the plugin, build it, and wire this app to your local build:

```bash
npm run bootstrap:app
```

This installs dependencies, builds the plugin, installs and builds this app, and runs `npx cap sync` so the iOS and Android projects use your local build.

## Run

Paths below are from the repository root.

### iOS

Open `example-app/ios/App/App.xcworkspace` in Xcode and run on a simulator or device. Grant calendar and reminders access when prompted.

### Android

Open the `example-app/android` folder in Android Studio and run on an emulator or device. Grant calendar access when prompted.

### Web (smoke test only)

```bash
cd example-app
npm start
```

Opens the app at `http://localhost:5173`. `createEvent` still works — it builds a downloadable `.ics` file — but methods that need a native calendar or reminders store (for example `listCalendars`, native prompts, and all reminders methods) are not available on web.

## Using the app

Tap a button to call the matching plugin method. Some methods need an input value first:

- **Event ID**, **Calendar ID**, **Reminder ID**, **Reminders list ID** — paste an ID returned by a create button, or one you already have.
- **Event instance date (ms)** and **Event span** — set these before you modify or delete one occurrence of a recurring event.
- **Calendar color** — a hex color for methods that accept one. Leave it on "Omit" to test the plugin default, or pick an invalid entry to see the validation error.

Open your browser console (web), the Xcode console (iOS), or Logcat (Android) to see each method's result.

## After you change plugin code

From the repository root, rebuild the plugin and re-sync so the native apps pick up your change:

```bash
npm run build && npm run sync:app
```

If you only changed this app's web UI and will test on a simulator or device, run `npm run build:app` instead — native apps load `example-app/dist`, not the Vite dev server.
