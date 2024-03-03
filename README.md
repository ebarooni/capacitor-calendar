<h1 align="center">CapacitorCalendar</h1>
<p align="center">
    <em>
        This CapacitorJS plugin simplifies the process of managing calendar events within your hybrid mobile applications. 
        With CRUD functionalities (Create, Read, Update, Delete), you can seamlessly interact with the device's native 
        calendar directly from your app.
    </em>
</p>
<p align="center">
    <a href="https://capacitor-calendar.pages.dev/"><strong>https://capacitor-calendar.pages.dev</strong></a>
    <br>
</p>

## Table of Contents

- [Demo](#demo--click-for-details-)
- [MVP](#mvp)
- [Support Range](#support-range)
- [Install](#install)
- [Permissions](#permissions)
- [API](#api)

## [Demo (click for details)](./example/README.md)


|                 iOS 17                 |                 Android 14                 |
|:--------------------------------------:|:------------------------------------------:|
| ![](./example/src/assets/ios-demo.gif) | ![](./example/src/assets/android-demo.gif) |

On iOS, `readCalendar` permission is not needed when you are creating an event using the native prompt. 
The video is just for showing the functionality, otherwise the `createEventWithPrompt` method works without the `readCalendar` authorization.

## MVP

- ✅ Choose calendars with prompt (only supported on iOS)
- ⌛ Create calendar events without native prompts
- ⌛️ Create reminders (only supported on iOS)
- ⌛️ Find calendar events
- ⌛️ Delete calendar events

## Support Range

|  Platform  |                range                 |
|:----------:|:------------------------------------:|
|    iOS     |               &ge; 13                |
|  Android   | &ge; 4 (SDK 14 – Ice Cream Sandwich) |

## Install

```bash
npm install @ebarooni/capacitor-calendar
npx cap sync
```

## Permissions

To be able to use the plugin, you will need to add the required permissions to your app. The required platform-specific 
permissions can be found below:

* [iOS](./ios/PERMISSIONS.md)
* [Android](./android/PERMISSIONS.md)

## API

<docgen-index>

* [`checkPermission(...)`](#checkpermission)
* [`checkAllPermissions()`](#checkallpermissions)
* [`requestPermission(...)`](#requestpermission)
* [`requestAllPermissions()`](#requestallpermissions)
* [`createEventWithPrompt()`](#createeventwithprompt)
* [`selectCalendarsWithPrompt()`](#selectcalendarswithprompt)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### checkPermission(...)

```typescript
checkPermission(options: { alias: keyof CalendarPermissionStatus; }) => Promise<{ result: PermissionState; }>
```

Checks the current authorization status of a specific permission.

| Param         | Type                                                                                            | Description                               |
| ------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------- |
| **`options`** | <code>{ alias: keyof <a href="#calendarpermissionstatus">CalendarPermissionStatus</a>; }</code> | An object with the name of the permission |

**Returns:** <code>Promise&lt;{ result: <a href="#permissionstate">PermissionState</a>; }&gt;</code>

--------------------


### checkAllPermissions()

```typescript
checkAllPermissions() => Promise<CalendarPermissionStatus>
```

Checks the current authorization status of all the required permissions for the plugin.

**Returns:** <code>Promise&lt;<a href="#calendarpermissionstatus">CalendarPermissionStatus</a>&gt;</code>

--------------------


### requestPermission(...)

```typescript
requestPermission(options: { alias: keyof CalendarPermissionStatus; }) => Promise<{ result: PermissionState; }>
```

Requests authorization to a specific permission, if not already granted.
If the permission is already granted, it will directly return the status.

| Param         | Type                                                                                            | Description                               |
| ------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------- |
| **`options`** | <code>{ alias: keyof <a href="#calendarpermissionstatus">CalendarPermissionStatus</a>; }</code> | An object with the name of the permission |

**Returns:** <code>Promise&lt;{ result: <a href="#permissionstate">PermissionState</a>; }&gt;</code>

--------------------


### requestAllPermissions()

```typescript
requestAllPermissions() => Promise<CalendarPermissionStatus>
```

Requests authorization to all the required permissions for the plugin, if they have not already been granted.

**Returns:** <code>Promise&lt;<a href="#calendarpermissionstatus">CalendarPermissionStatus</a>&gt;</code>

--------------------


### createEventWithPrompt()

```typescript
createEventWithPrompt() => Promise<{ eventCreated: boolean; }>
```

Creates an event in the calendar by using the native calendar.
On iOS opens a native sheet and on Android opens an intent.
This method does not need any read or write authorization from the user on iOS. However, the entries in the Info.plist file are still needed.
On Android, the user has to authorize for read access.

**Returns:** <code>Promise&lt;{ eventCreated: boolean; }&gt;</code>

--------------------


### selectCalendarsWithPrompt()

```typescript
selectCalendarsWithPrompt() => Promise<{ result: Calendar[]; }>
```

Presents a prompt to the user to select calendars. This method is available only on iOS.

**Returns:** <code>Promise&lt;{ result: Calendar[]; }&gt;</code>

--------------------


### Interfaces


#### CalendarPermissionStatus

Describes the permission status for reading from the calendar.

| Prop                | Type                                                        |
| ------------------- | ----------------------------------------------------------- |
| **`readCalendar`**  | <code><a href="#permissionstate">PermissionState</a></code> |
| **`writeCalendar`** | <code><a href="#permissionstate">PermissionState</a></code> |


#### Calendar

Represents a calendar object with an ID and title.

| Prop        | Type                |
| ----------- | ------------------- |
| **`id`**    | <code>string</code> |
| **`title`** | <code>string</code> |


### Type Aliases


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

</docgen-api>
