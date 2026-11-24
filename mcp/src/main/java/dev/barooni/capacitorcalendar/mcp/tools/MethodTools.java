package dev.barooni.capacitorcalendar.mcp.tools;

import java.util.List;
import java.util.stream.Collectors;

import dev.barooni.capacitorcalendar.mcp.tools.model.PluginMethod;
import io.quarkiverse.mcp.server.Tool;
import io.quarkiverse.mcp.server.ToolArg;
import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;

public class MethodTools {
    private static final List<PluginMethod> METHODS = List.of(
        // --- Calendar Access ---
        new PluginMethod(
            "checkAllPermissions",
            "Retrieves the current state of all permissions.",
            List.of("Android", "iOS"), "0.1.0", false
        ),
        new PluginMethod(
            "checkPermission",
            "Retrieves the current permission state for a given scope.",
            List.of("Android", "iOS"), "0.1.0", false
        ),
        new PluginMethod(
            "requestAllPermissions",
            "Requests permission for all calendar and reminder permissions. " +
                "Use requestFullCalendarAccess or requestFullRemindersAccess instead.",
            List.of("Android", "iOS"), "0.1.0", true
        ),
        new PluginMethod(
            "requestPermission",
            "Requests permission for a given scope. Use requestWriteOnlyCalendarAccess, " +
                "requestReadOnlyCalendarAccess (Android), requestFullCalendarAccess, or requestFullRemindersAccess instead.",
            List.of("Android", "iOS"), "0.1.0", true
        ),
        new PluginMethod(
            "requestFullCalendarAccess",
            "Requests read and write access to the calendar.",
            List.of("Android", "iOS"), "5.4.0", false
        ),
        new PluginMethod(
            "requestReadOnlyCalendarAccess",
            "Requests read access to the calendar.",
            List.of("Android"), "5.4.0", false
        ),
        new PluginMethod(
            "requestWriteOnlyCalendarAccess",
            "Requests write access to the calendar.",
            List.of("Android", "iOS"), "5.4.0", false
        ),

        // --- Reminders Access ---
        new PluginMethod(
            "requestFullRemindersAccess",
            "Requests read and write access to the reminders.",
            List.of("iOS"), "5.4.0", false
        ),

        // --- Calendar Operations ---
        new PluginMethod(
            "commit",
            "Saves pending calendar changes.",
            List.of("iOS"), "7.1.0", false
        ),
        new PluginMethod(
            "createCalendar",
            "Creates a calendar.",
            List.of("Android", "iOS"), "5.2.0", false
        ),
        new PluginMethod(
            "deleteCalendar",
            "Deletes a calendar by id.",
            List.of("Android", "iOS"), "5.2.0", false
        ),
        new PluginMethod(
            "fetchAllCalendarSources",
            "Retrieves a list of calendar sources.",
            List.of("iOS"), "6.6.0", false
        ),
        new PluginMethod(
            "getDefaultCalendar",
            "Retrieves the default calendar.",
            List.of("Android", "iOS"), "0.3.0", false
        ),
        new PluginMethod(
            "listCalendars",
            "Retrieves a list of all available calendars.",
            List.of("Android", "iOS"), "7.1.0", false
        ),
        new PluginMethod(
            "modifyCalendar",
            "Modifies a calendar with options.",
            List.of("Android", "iOS"), "7.2.0", false
        ),
        new PluginMethod(
            "openCalendar",
            "Opens the calendar app. On Web, opens the day view of a web calendar in a new tab when provider " +
                "(google, outlook, or office365) is set, and rejects with unimplemented otherwise.",
            List.of("Android", "iOS", "Web"), "7.1.0", false
        ),
        new PluginMethod(
            "selectCalendarsWithPrompt",
            "Opens a system interface to choose one or multiple calendars.",
            List.of("iOS"), "0.2.0", false
        ),

        // --- Event Operations ---
        new PluginMethod(
            "createEvent",
            "Creates an event in the calendar. On Web, returns an .ics File as ics with id always null; " +
                "optional icsFileName sets the download name. Use the exported downloadIcsFile helper to download it.",
            List.of("Android", "iOS", "Web"), "0.4.0", false
        ),
        new PluginMethod(
            "createEventWithPrompt",
            "Opens a calendar interface to create a new event. On Android and iOS, opens the system editor; " +
                "on Android id is always null. On Web, shows a confirm dialog and returns an .ics File as ics; " +
                "on cancel, resolves with id and ics null. Set skipPrompt to skip the dialog.",
            List.of("Android", "iOS", "Web"), "0.1.0", false
        ),
        new PluginMethod(
            "deleteEvent",
            "Deletes an event.",
            List.of("Android", "iOS"), "7.1.0", false
        ),
        new PluginMethod(
            "deleteEventsById",
            "Deletes multiple events. Use deleteEvent instead.",
            List.of("Android", "iOS"), "0.11.0", true
        ),
        new PluginMethod(
            "deleteEventWithPrompt",
            "Opens a dialog to delete an event.",
            List.of("Android", "iOS"), "7.1.0", false
        ),
        new PluginMethod(
            "listEventsInRange",
            "Retrieves events that overlap a date range. Pass calendarIds to search only some calendars.",
            List.of("Android", "iOS"), "0.10.0", false
        ),
        new PluginMethod(
            "getEventById",
            "Retrieves an event by id. For a recurring event, returns the first occurrence on iOS and " +
                "the series master on Android.",
            List.of("Android", "iOS"), "8.11.0", false
        ),
        new PluginMethod(
            "modifyEvent",
            "Modifies an event. Fields that you omit keep their current values.",
            List.of("Android", "iOS"), "6.6.0", false
        ),
        new PluginMethod(
            "modifyEventWithPrompt",
            "Opens a system calendar interface to modify an event. On Android always returns null.",
            List.of("Android", "iOS"), "6.6.0", false
        ),

        // --- Calendar Listening ---
        new PluginMethod(
            "startListening",
            "Starts to watch the calendar for changes in a time window (from, to, optional calendarIds). " +
                "Changes arrive through addListener('calendarChanged', ...). A new call replaces the previous window. " +
                "Needs calendar read access.",
            List.of("Android", "iOS"), "8.12.0", false
        ),
        new PluginMethod(
            "stopListening",
            "Stops to watch the calendar. Listeners stay registered.",
            List.of("Android", "iOS"), "8.12.0", false
        ),
        new PluginMethod(
            "addListener",
            "Adds a listener for the calendarChanged event. The payload has created, updated, deletedIds, " +
                "calendarsChanged, remindersChanged, and precise. Call startListening to start the events.",
            List.of("Android", "iOS"), "8.12.0", false
        ),
        new PluginMethod(
            "removeAllListeners",
            "Removes all listeners of this plugin.",
            List.of("Android", "iOS"), "8.12.0", false
        ),

        // --- Reminders Operations ---
        new PluginMethod(
            "createReminder",
            "Creates a reminder.",
            List.of("iOS"), "0.5.0", false
        ),
        new PluginMethod(
            "createRemindersList",
            "Creates a new reminders list.",
            List.of("iOS"), "8.1.0", false
        ),
        new PluginMethod(
            "deleteReminder",
            "Deletes a reminder.",
            List.of("iOS"), "7.1.0", false
        ),
        new PluginMethod(
            "deleteRemindersById",
            "Deletes multiple reminders. Use deleteReminder instead.",
            List.of("iOS"), "5.3.0", true
        ),
        new PluginMethod(
            "deleteRemindersList",
            "Deletes a reminders list.",
            List.of("iOS"), "8.2.0", false
        ),
        new PluginMethod(
            "deleteReminderWithPrompt",
            "Opens a dialog to delete a reminder.",
            List.of("iOS"), "7.2.0", false
        ),
        new PluginMethod(
            "fetchAllRemindersSources",
            "Retrieves a list of reminders sources. Use fetchAllCalendarSources instead.",
            List.of("iOS"), "6.6.0", true
        ),
        new PluginMethod(
            "getDefaultRemindersList",
            "Retrieves the default reminders list.",
            List.of("iOS"), "7.1.0", false
        ),
        new PluginMethod(
            "getReminderById",
            "Retrieves a reminder by ID.",
            List.of("iOS"), "7.1.0", false
        ),
        new PluginMethod(
            "getRemindersFromLists",
            "Retrieves reminders from multiple lists.",
            List.of("iOS"), "5.3.0", false
        ),
        new PluginMethod(
            "getRemindersLists",
            "Retrieves all available reminders lists.",
            List.of("iOS"), "7.1.0", false
        ),
        new PluginMethod(
            "modifyReminder",
            "Modifies a reminder.",
            List.of("iOS"), "6.7.0", false
        ),
        new PluginMethod(
            "openReminders",
            "Opens the reminders app.",
            List.of("iOS"), "7.1.0", false
        ),
        new PluginMethod(
            "updateRemindersList",
            "Updates a reminders list with options.",
            List.of("iOS"), "8.2.0", false
        )
    );

    @Tool(
        description = "Looks up a specific @ebarooni/capacitor-calendar method by exact name. " +
        "Returns the method description, supported platforms, and the version it was introduced in."
    )
    public String getMethod(
        @ToolArg(description = "Exact method name, e.g. createEvent, listEventsInRange")
        String name
    ) {
        return METHODS.stream()
            .filter(method -> method.name().equalsIgnoreCase(name))
            .findFirst()
            .map(PluginMethod::toString)
            .orElse("No method found with name: " + name);
    }

    @Tool(
        description = "Lists all available @ebarooni/capacitor-calendar method names. " +
                    "Optionally filter by platform (ios, android, or web). " +
                    "Use this to discover available methods before calling getMethod or searchMethods."
    )
    public String listMethods(
        @ToolArg(description = "Optional platform filter: ios, android, or web. Leave empty to list all platforms.")
        String platform
    ) {
        String pl = platform == null ? "" : platform.toLowerCase();

        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();

        METHODS.stream()
            .filter(m -> pl.isEmpty() || m.supportedPlatforms().stream()
                .anyMatch(p -> p.toLowerCase().contains(pl)))
            .forEach(m -> arrayBuilder.add(
                Json.createObjectBuilder()
                    .add("name", m.name())
                    .add("deprecated", m.deprecated())
            ));

        return arrayBuilder.build().toString();
    }

    @Tool(
        description = "Searches @ebarooni/capacitor-calendar methods by keyword. Matches against method " +
                      "names and descriptions. Optionally filter by platform (ios, android, or web). " +
                      "Returns all matching methods with their description, platforms, and since version."
    )
    public String searchMethods(
        @ToolArg(description = "Keyword to search for in method names and descriptions")
        String keyword,
        @ToolArg(description = "Optional platform filter: ios, android, or web. Leave empty to search all platforms.")
        String platform
    ) {
        String kw = keyword.toLowerCase();
        String pl = platform == null ? "" : platform.toLowerCase();

        List<PluginMethod> results = METHODS.stream()
            .filter(m -> m.name().toLowerCase().contains(kw) ||
                         m.description().toLowerCase().contains(kw))
            .filter(m -> pl.isEmpty() || m.supportedPlatforms().stream()
                .anyMatch(p -> p.toLowerCase().contains(pl)))
            .toList();

        if (results.isEmpty()) {
            return "No methods found for keyword: " + keyword +
                   (pl.isEmpty() ? "" : " on platform: " + platform);
        }

        return results.stream()
            .map(PluginMethod::toString)
            .collect(Collectors.joining("\n---\n"));
    }
}
