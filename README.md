# capacitor-calendar

The Capacitor Calendar Plugin exposes functionalities for interacting with the calendar of the device.

## Install

```bash
npm install capacitor-calendar
npx cap sync
```

## Permissions

To be able to use the plugin, you will need to add the required permissions to your app. The required platform-specific 
permissions can be found below:

* [iOS](./ios/SETUP.md)

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

Represents the interface for the Calendar plugin in Capacitor.

### checkPermission(...)

```typescript
checkPermission(permission: keyof CalendarPermissionStatus) => Promise<{ result: PermissionState; }>
```

Checks the current permission status of a specific permission.

| Param            | Type                        |
| ---------------- | --------------------------- |
| **`permission`** | <code>'readCalendar'</code> |

**Returns:** <code>Promise&lt;{ result: <a href="#permissionstate">PermissionState</a>; }&gt;</code>

--------------------


### checkAllPermissions()

```typescript
checkAllPermissions() => Promise<CalendarPermissionStatus>
```

Checks the current permission status for all the required permissions for the plugin.

**Returns:** <code>Promise&lt;<a href="#calendarpermissionstatus">CalendarPermissionStatus</a>&gt;</code>

--------------------


### requestPermission(...)

```typescript
requestPermission(permission: keyof CalendarPermissionStatus) => Promise<{ result: PermissionState; }>
```

Requests authorization to a specific permission, if not already granted.

| Param            | Type                        |
| ---------------- | --------------------------- |
| **`permission`** | <code>'readCalendar'</code> |

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

Performs an action (create) on a calendar event by displaying a system prompt to the user.

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
