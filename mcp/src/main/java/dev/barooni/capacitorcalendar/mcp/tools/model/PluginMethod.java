package dev.barooni.capacitorcalendar.mcp.tools.model;

import java.util.List;

public record PluginMethod(
    String name,
    String description,
    List<String> supportedPlatforms,
    String since,
    boolean deprecated
) {
    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("**").append(name).append("**\n");
        sb.append("Description: ").append(description).append("\n");
        sb.append("Platforms: ").append(String.join(", ", supportedPlatforms)).append("\n");
        sb.append("Since: ").append(since).append("\n");
        if (deprecated) {
            sb.append("⚠️ Deprecated\n");
        }
        return sb.toString();
    }
}
