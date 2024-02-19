# capacitor-calendar

This CapacitorJS plugin simplifies the process of managing calendar events within your hybrid mobile applications. 
With CRUD functionalities (Create, Read, Update, Delete), you can seamlessly interact with the device's native 
calendar directly from your app.

## Support Range

|  Platform  |                range                |
|:----------:|:-----------------------------------:|
|    iOS     |               \>= 13                |
|  Android   | \>= 4 (SDk 14 – Ice Cream Sandwich) |

## Install

```bash
npm install capacitor-calendar
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
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### checkPermission(...)

```typescript
checkPermission(options: { alias: keyof CalendarPermissionStatus; }) => Promise<{ result: PermissionState; }>
```

Checks the current authorization status of a specific permission.

| Param         | Type                                    | Description                               |
| ------------- | --------------------------------------- | ----------------------------------------- |
| **`options`** | <code>{ alias: 'readCalendar'; }</code> | An object with the name of the permission |

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

| Param         | Type                                    | Description                               |
| ------------- | --------------------------------------- | ----------------------------------------- |
| **`options`** | <code>{ alias: 'readCalendar'; }</code> | An object with the name of the permission |

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
createEventWithPrompt() => Promise<{ result: CalendarEventActionResult; }>
```

Creates an event in the calendar by using the native calendar.
On iOS opens a native sheet and on Android opens an intent.
This method does not need any read or write authorization from the user on iOS. However, the entries in the Info.plist file are still needed.
On Android, the user has to authorize for read access.

**Returns:** <code>Promise&lt;{ result: <a href="#calendareventactionresult">CalendarEventActionResult</a>; }&gt;</code>

--------------------


### Interfaces


#### CalendarPermissionStatus

Describes the permission status for reading from the calendar.

| Prop               | Type                                                        |
| ------------------ | ----------------------------------------------------------- |
| **`readCalendar`** | <code><a href="#permissionstate">PermissionState</a></code> |


### Type Aliases


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


### Enums


#### CalendarEventActionResult

| Members        | Value                   |
| -------------- | ----------------------- |
| **`Saved`**    | <code>'saved'</code>    |
| **`Canceled`** | <code>'canceled'</code> |
| **`Error`**    | <code>'error'</code>    |

</docgen-api>
