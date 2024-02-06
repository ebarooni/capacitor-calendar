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

* [`createEventWithPrompt()`](#createeventwithprompt)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### createEventWithPrompt()

```typescript
createEventWithPrompt() => Promise<ICreateEventAction>
```

Creates an event in the calendar by displaying a prompt.

**Returns:** <code>Promise&lt;<a href="#icreateeventaction">ICreateEventAction</a>&gt;</code>

--------------------


### Interfaces


#### ICreateEventAction

| Prop         | Type                                          |
| ------------ | --------------------------------------------- |
| **`action`** | <code>'error' \| 'saved' \| 'canceled'</code> |

</docgen-api>
