package dev.barooni.capacitorcalendar.mcp.resources;

import io.quarkiverse.mcp.server.Resource;
import io.quarkiverse.mcp.server.RequestUri;
import io.quarkiverse.mcp.server.TextResourceContents;
import java.io.InputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class ErrorResources {

    @Resource(
        uri = "docs://error-codes",
        description = "Reject codes of @ebarooni/capacitor-calendar (EB-CLDR-NNNN) on Android and iOS, " +
                      "when each code occurs, and how to compare error.code with CapacitorCalendarErrorCode."
    )
    TextResourceContents errorCodes(final RequestUri uri) {
        String content = loadDoc("docs/error-codes.md");
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
