package dev.barooni.capacitorcalendar.mcp.resources;

import io.quarkiverse.mcp.server.Resource;
import io.quarkiverse.mcp.server.RequestUri;
import io.quarkiverse.mcp.server.TextResourceContents;
import java.io.InputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class WebResources {

    @Resource(
        uri = "docs://web-behavior",
        description = "How @ebarooni/capacitor-calendar behaves on the web: ICS export, permission grants, ignored options, and UTC timed times."
    )
    TextResourceContents webBehavior(final RequestUri uri) {
        String content = loadDoc("docs/web-behavior.md");
        return TextResourceContents.create(uri.value(), content);
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
