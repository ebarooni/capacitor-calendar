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
            "Requests permission for all calendar and reminder permissions.",
            List.of("Android", "iOS"), "0.1.0", true
        ),
        new PluginMethod(
            "requestPermission",
            "Requests permission for a given scope.",
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
            "Opens the calendar app.",
            List.of("Android", "iOS"), "7.1.0", false
        ),
        new PluginMethod(
            "selectCalendarsWithPrompt",
            "Opens a system interface to choose one or multiple calendars.",
            List.of("iOS"), "0.2.0", false
        ),

        // --- Event Operations ---
        new PluginMethod(
            "createEvent",
            "Creates an event in the calendar.",
            List.of("Android", "iOS"), "0.4.0", false
        ),
        new PluginMethod(
            "createEventWithPrompt",
            "Opens the system calendar interface to create a new event. On Android always returns null.",
            List.of("Android", "iOS"), "0.1.0", false
        ),
        new PluginMethod(
            "deleteEvent",
            "Deletes an event.",
            List.of("Android", "iOS"), "7.1.0", false
        ),
        new PluginMethod(
            "deleteEventsById",
            "Deletes multiple events.",
            List.of("Android", "iOS"), "0.11.0", true
        ),
        new PluginMethod(
            "deleteEventWithPrompt",
            "Opens a dialog to delete an event.",
            List.of("Android", "iOS"), "7.1.0", false
        ),
        new PluginMethod(
            "listEventsInRange",
            "Retrieves the events within a date range.",
            List.of("Android", "iOS"), "0.10.0", false
        ),
        new PluginMethod(
            "modifyEvent",
            "Modifies an event.",
            List.of("Android", "iOS"), "6.6.0", false
        ),
        new PluginMethod(
            "modifyEventWithPrompt",
            "Opens a system calendar interface to modify an event. On Android always returns null.",
            List.of("Android", "iOS"), "6.6.0", false
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
            "Deletes multiple reminders.",
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
            "Retrieves a list of reminders sources.",
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
                    "Optionally filter by platform (ios or android). " +
                    "Use this to discover available methods before calling getMethod or searchMethods."
    )
    public String listMethods(
        @ToolArg(description = "Optional platform filter: ios or android. Leave empty to list all platforms.")
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

    public String searchMethods(
        @ToolArg(description = "Keyword to search for in method names and descriptions")
        String keyword,
        @ToolArg(description = "Optional platform filter: ios or android. Leave empty to search all platforms.")
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
