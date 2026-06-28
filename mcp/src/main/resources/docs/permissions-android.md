# Android Permissions

Add the following permissions to your `AndroidManifest.xml` based on the level of calendar access your app requires.

## AndroidManifest.xml

### Read access

Use when your app reads existing calendar data.

```xml
<uses-permission android:name="android.permission.READ_CALENDAR" />
```

### Write access

Use when your app creates or modifies events.

```xml
<uses-permission android:name="android.permission.WRITE_CALENDAR" />
```

## Runtime Permissions

`READ_CALENDAR` and `WRITE_CALENDAR` are classified as dangerous-level permissions on Android. Declaring them in `AndroidManifest.xml` is not enough — your app must also request them at runtime.

## Notes

- Reminders are not supported on Android.
- Both permissions are independent. Only declare what your app actually uses.
