package dev.barooni.capacitorcalendar.mcp.prompts;

import java.util.List;

import io.quarkiverse.mcp.server.Prompt;
import io.quarkiverse.mcp.server.PromptArg;
import io.quarkiverse.mcp.server.PromptMessage;
import io.quarkiverse.mcp.server.TextContent;

public class PermissionPrompts {

    @Prompt(
        name = "setup-for-platform",
        description = "Guides a developer through the native permission configuration required for @ebarooni/capacitor-calendar on a given platform."
    )
    List<PromptMessage> setupForPlatform(
        @PromptArg(name = "platform", description = "Target platform: ios or android")
        final String platform
    ) {
        return List.of(
            PromptMessage.withUserRole(new TextContent("""
                I am setting up @ebarooni/capacitor-calendar in my app for %s.
                What native permission configuration do I need to add?
                Refer to the @ebarooni/capacitor-calendar documentation for the exact keys and entries required.
                """.formatted(platform)
            ))
        );
    }

    @Prompt(
        name = "choose-access-level",
        description = "Helps a developer choose the correct calendar access level " +
                      "(write-only, read-only, full, reminders) based on which " +
                      "@ebarooni/capacitor-calendar methods they intend to use."
    )
    List<PromptMessage> chooseAccessLevel(
        @PromptArg(name = "methods", description = "Comma-separated list of @ebarooni/capacitor-calendar " +
                                                   "methods the app will use, e.g. createEvent,listEventsInRange")
        final String methods
    ) {
        return List.of(
            PromptMessage.withUserRole(new TextContent("""
                I am using the following @ebarooni/capacitor-calendar methods in my app: %s
                Based on these methods, what is the minimum calendar access level I should request?
                Explain why each access level is or is not needed, and refer to the
                @ebarooni/capacitor-calendar documentation for the permission scopes.
                """.formatted(methods)
            ))
        );
    }

    @Prompt(
        name = "debug-permission-denied",
        description = "Structured diagnostic prompt for when calendar permission is always " +
                      "denied in an app that uses @ebarooni/capacitor-calendar. " +
                      "Guides through the most common causes."
    )
    List<PromptMessage> debugPermissionDenied(
        @PromptArg(name = "platform", description = "Platform where the issue occurs: ios or android")
        final String platform,
        @PromptArg(name = "accessLevel", description = "Access level being requested: write-only, read-only, full, or reminders")
        final String accessLevel
    ) {
        return List.of(
            PromptMessage.withUserRole(new TextContent("""
                I am using @ebarooni/capacitor-calendar on %s and requesting %s access, but permission is always denied.
                Help me diagnose the issue by checking the following in order:
                1. The correct permission keys are declared in the native project configuration.
                2. The correct access level method is being called at runtime.
                3. The permission has not been permanently denied by the user.
                4. The app is not running on the simulator with restricted permissions.
                Refer to the @ebarooni/capacitor-calendar permission documentation for the exact keys and methods required.
                """.formatted(platform, accessLevel)
            ))
        );
    }
}
