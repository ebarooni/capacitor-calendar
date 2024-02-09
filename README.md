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

* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions()`](#requestpermissions)
* [`createEventWithPrompt()`](#createeventwithprompt)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

--------------------


### createEventWithPrompt()

```typescript
createEventWithPrompt() => Promise<CreateEventAction>
```

Creates an event in the calendar by displaying a prompt.

**Returns:** <code>Promise&lt;<a href="#createeventaction">CreateEventAction</a>&gt;</code>

--------------------


### Interfaces


#### PermissionStatus

| Prop               | Type                                                        |
| ------------------ | ----------------------------------------------------------- |
| **`readCalendar`** | <code><a href="#permissionstate">PermissionState</a></code> |


#### CreateEventAction

| Prop         | Type                                          |
| ------------ | --------------------------------------------- |
| **`action`** | <code>'error' \| 'saved' \| 'canceled'</code> |


### Type Aliases


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>

</docgen-api>
