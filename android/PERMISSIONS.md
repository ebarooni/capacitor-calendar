# Permissions

To read calendar data, an application must include the `READ_CALENDAR` permission in its manifest file.
It must include the `WRITE_CALENDAR` permission to delete, insert or update calendar data:

```
<!-- AndroidManifest.xml -->

<!-- If you need read access -->
<uses-permission android:name="android.permission.READ_CALENDAR" />

<!-- If you need write access -->
<uses-permission android:name="android.permission.WRITE_CALENDAR" />
```
