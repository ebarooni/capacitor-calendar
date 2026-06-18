package dev.barooni.capacitorcalendar.mcp.resources;

import io.quarkiverse.mcp.server.CompleteResourceTemplate;
import io.quarkiverse.mcp.server.ResourceTemplate;
import io.quarkiverse.mcp.server.RequestUri;
import io.quarkiverse.mcp.server.TextResourceContents;
import java.io.InputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class DocumentationResources {
    
    @ResourceTemplate(
        uriTemplate = "docs://permissions/{platform}",
        description = "Native permission keys required for ebarooni/capacitor-calendar on a given platform (ios or android). Contains Info.plist entries for iOS and AndroidManifest.xml entries for Android."
    )
    TextResourceContents permissionsGuide(final String platform, final RequestUri uri) {
        String content = loadDoc("docs/permissions-" + platform + ".md");
        return TextResourceContents.create(uri.value(), content);
    }

    @CompleteResourceTemplate("permissionsGuide")
    List<String> completePlatform(final String platform) {
        return List.of("ios", "android").stream()
                .filter(p -> p.startsWith(platform))
                .toList();
    }

    private String loadDoc(final String path) {
        try (InputStream is = getClass().getClassLoader().getResourceAsStream(path)) {
            if (is == null) {
                return "# Not Found\n\nNo documentation found for path: " + path;
            }
            return new String(is.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            return "# Error\n\nFailed to load documentation: " + e.getMessage();
        }
    }
}
