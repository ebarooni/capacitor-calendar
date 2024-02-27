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
)
