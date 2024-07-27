<p align="center">
  <img src="assets/images/text-logo.png" alt="capacitor-calendar-logo" height="136"/>
  <br>
    <em>
        The Capacitor Calendar Plugin enables full calendar functionality on iOS and Android, with added reminder support for iOS devices.
    </em>
</p>
<p align="center">
    <a href="https://capacitor-calendar.pages.dev/"><strong>https://capacitor-calendar.pages.dev</strong></a>
    <br>
</p>
<p align="center">
    <a href="documentation.md">Documentation</a>
    ·
    <a href="SECURITY.md#capacitor-compatibility">Capacitor Compatibility</a>
    ·
    <a href="SECURITY.md#deployment-targets">Deployment Targets</a>
    <br>
</p>
<p align="center">
    <img src="https://img.shields.io/maintenance/yes/2024?style=flat-square" />
    <a href="https://www.npmjs.com/package/@ebarooni/capacitor-calendar"><img src="https://img.shields.io/npm/l/@ebarooni/capacitor-calendar?style=flat-square" /></a>
    <br>
    <a href="https://www.npmjs.com/package/@ebarooni/capacitor-calendar"><img src="https://img.shields.io/npm/dw/@ebarooni/capacitor-calendar?style=flat-square" /></a>
    <a href="https://www.npmjs.com/package/@ebarooni/capacitor-calendar"><img src="https://img.shields.io/npm/v/@ebarooni/capacitor-calendar?style=flat-square" /></a>
</p>

## Table of Contents

- [Installation](#installation)
  - [Stable](#stable)
    - [Capacitor 6](#capacitor-6)
    - [Capacitor 5](#capacitor-5)
  - [Development](#development)
    - [Setup](#setup)
    - [Install](#install-1)
- [Demo](#demo--click-for-details-)
- [Permissions](#permissions)
- [API](#-api)
- [Documentation](#-documentation)
- [Contributions](#-contributions)

## Installation

To use this package, follow the instructions for installing either the stable or development release.
Stable releases are recommended for production, while development releases provide access to the latest features and
fixes which are still under development.

### Stable

The stable releases are published to the npm package registry.

#### Capacitor 6

```bash
npm install @ebarooni/capacitor-calendar@latest
npx cap sync
```

#### Capacitor 5

> [!IMPORTANT]  
> This plugin no longer receives updates for Capacitor v5 and only supports the latest version.

```bash
npm install @ebarooni/capacitor-calendar@^5
npx cap sync
```

### Development

Development releases are published to the GitHub package registry. These releases are automatically generated from the
latest state of the `develop branch every time a pull request is merged into it.

> [!WARNING]
> Development releases are not recommended for production use as they may contain untested or experimental changes.

#### Setup

Create an `.npmrc` file and place it in the root of your project with the following content:

```
//npm.pkg.github.com/:_authToken=$GITHUB_PAT
@ebarooni:registry=https://npm.pkg.github.com
always-auth=true
```

Replace `$GITHUB_PAT` with your own personal access token with at least `read:packages` scope.

#### Install

```bash
npm install @ebarooni/capacitor-calendar
npx cap sync
```

## [Demo (click for details)](./example/README.md)

|                 iOS 17                 |                 Android 14                 |
| :------------------------------------: | :----------------------------------------: |
| ![](./example/src/assets/ios-demo.gif) | ![](./example/src/assets/android-demo.gif) |

On iOS, `readCalendar` permission is not needed when you a

re creating an event using the native prompt.
The video is just for showing the functionality, otherwise the `createEventWithPrompt` method works without the `readCalendar` authorization.

## Permissions

To be able to use the plugin, you will need to add the required usage descriptions to your app. The required platform-specific
usage descriptions can be found below:

- [iOS](./docs/usage-descriptions/ios.md)
- [Android](./docs/usage-descriptions/android.md)

## 📋 API

<docgen-index>

- [`checkPermission(...)`](#checkpermission)
- [`checkAllPermissions()`](#checkallpermissions)
- [`requestPermission(...)`](#requestpermission)
- [`requestAllPermissions()`](#requestallpermissions)
- [`createEventWithPrompt(...)`](#createeventwithprompt)
- [`selectCalendarsWithPrompt(...)`](#selectcalendarswithprompt)
- [`listCalendars()`](#listcalendars)
- [`getDefaultCalendar()`](#getdefaultcalendar)
- [`createEvent(...)`](#createevent)
- [`getDefaultRemindersList()`](#getdefaultreminderslist)
- [`getRemindersLists()`](#getreminderslists)
- [`createReminder(...)`](#createreminder)
- [`openCalendar(...)`](#opencalendar)
- [`openReminders()`](#openreminders)
- [`listEventsInRange(...)`](#listeventsinrange)
- [`deleteEventsById(...)`](#deleteeventsbyid)
- [`createCalendar(...)`](#createcalendar)
- [`deleteCalendar(...)`](#deletecalendar)
- [`getRemindersFromLists(...)`](#getremindersfromlists)
- [`deleteRemindersById(...)`](#deleteremindersbyid)
- [`requestWriteOnlyCalendarAccess()`](#requestwriteonlycalendaraccess)
- [`requestReadOnlyCalendarAccess()`](#requestreadonlycalendaraccess)
- [`requestFullCalendarAccess()`](#requestfullcalendaraccess)
- [`requestFullRemindersAccess()`](#requestfullremindersaccess)
- [`modifyEventWithPrompt(...)`](#modifyeventwithprompt)
- [`modifyEvent(...)`](#modifyevent)
- [`fetchAllCalendarSources()`](#fetchallcalendarsources)
- [`fetchAllRemindersSources()`](#fetchallreminderssources)
- [Interfaces](#interfaces)
- [Type Aliases](#type-aliases)
- [Enums](#enums)

</docgen-index>

## 📚 Documentation

For comprehensive explanations, usage examples, and additional information, please refer to the following resources:

- **[Online Documentation](https://ebarooni.github.io/capacitor-calendar/)**
- **[API Reference](docs/api-reference.md)**
- **[Type Definitions and Examples](src/definitions.ts)**

## 💙 Contributions

> [!NOTE]
> Thank you for your interest in contributing to the project! At the moment, the focus is on reaching the first major
> release. Until then, the contributions will not be accepted. This approach allows to set a solid
> foundation and maintain consistency throughout the development process.
>
> Community input is highly valued, and you are encouraged to engage with the project by providing feedback and suggestions.
> Feel free to open issues for bugs you've discovered or enhancements you'd like to see.
>
> Stay tuned for updates. Looking forward to collaborating with you in the future once contributions are opened up!
