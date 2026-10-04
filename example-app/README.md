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

Opens the app at `http://localhost:5173`. `createEvent` and `createEventWithPrompt` still work — they build a downloadable `.ics` file — but methods that need a native calendar or reminders store (for example `listCalendars`, modify/delete prompts, and all reminders methods) are not available on web.

## Using the app

The app has two tabs:

- **Methods** — ID fields and one button per plugin method. Tap a button to call the matching method.
- **Options** — global fields shared by recurring-event delete/modify flows, plus a collapsible section per method with that method’s own title/color/other fields.

On **Methods**, paste an **Event ID**, **Calendar ID**, **Reminder ID**, or **Reminders list ID** returned by a create button, or one you already have.

On **Options**:

- **Global:** **Event instance date (ms)** and **Event span** — set these before you modify or delete one occurrence of a recurring event.
- **Per method:** each accordion is independent. For example, `createCalendar` and `createRemindersList` each have their own title and color; `createEvent` has its own title and hex-only color; `modifyCalendar` / `modifyReminder` / `updateRemindersList` have their own titles (and colors where the API supports them).

Open your browser console (web), the Xcode console (iOS), or Logcat (Android) to see each method's result.

## After you change plugin code

From the repository root, rebuild the plugin and re-sync so the native apps pick up your change:

```bash
npm run build && npm run sync:app
```

If you only changed this app's web UI and will test on a simulator or device, run `npm run build:app` instead — native apps load `example-app/dist`, not the Vite dev server.
