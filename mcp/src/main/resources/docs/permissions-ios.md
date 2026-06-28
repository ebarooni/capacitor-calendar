# iOS Permissions

Add the following keys to your `Info.plist` based on the iOS versions you support and the level of calendar access your app requires.

## iOS 17+

### Write-only access

Use when your app only creates events. The user selects the target calendar via the system sheet. No existing calendar data is accessible to your app.

```xml
<key>NSCalendarsWriteOnlyAccessUsageDescription</key>
<string>YOUR_USAGE_DESCRIPTION</string>
```

### Full access

Use when your app reads existing calendar data in addition to writing.

```xml
<key>NSCalendarsFullAccessUsageDescription</key>
<string>YOUR_USAGE_DESCRIPTION</string>
```

### Reminders access

```xml
<key>NSRemindersFullAccessUsageDescription</key>
<string>YOUR_USAGE_DESCRIPTION</string>
```

## iOS 16 and below

### Calendar access

```xml
<key>NSCalendarsUsageDescription</key>
<string>YOUR_USAGE_DESCRIPTION</string>
```

### Reminders access

```xml
<key>NSRemindersUsageDescription</key>
<string>YOUR_USAGE_DESCRIPTION</string>
```

## Supporting iOS 16 and iOS 17+

Include keys from both sections. The system uses whichever applies to the running OS version.

## Usage Description Strings

Replace `YOUR_USAGE_DESCRIPTION` with a user-facing explanation of why your app needs access. Vague or missing strings will result in App Store rejection. Request only the access level your app actually needs — reviewers will flag unnecessary permissions.
