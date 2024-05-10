#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(CapacitorCalendarPlugin, "CapacitorCalendar",
           CAP_PLUGIN_METHOD(createEventWithPrompt, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(checkPermission, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(checkAllPermissions, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(requestPermission, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(requestAllPermissions, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(selectCalendarsWithPrompt, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(listCalendars, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getDefaultCalendar, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(createEvent, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getDefaultRemindersList, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getRemindersLists, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(createReminder, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(openCalendar, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(openReminders, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(listEventsInRange, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(deleteEventsById, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(createCalendar, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(deleteCalendar, CAPPluginReturnNone);
           CAP_PLUGIN_METHOD(getRemindersFromLists, CAPPluginReturnPromise);
)
