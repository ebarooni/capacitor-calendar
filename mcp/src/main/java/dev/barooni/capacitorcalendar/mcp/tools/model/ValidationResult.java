package dev.barooni.capacitorcalendar.mcp.tools.model;

import java.util.List;

public record ValidationResult(
    boolean valid,
    List<String> present,
    List<String> missing,
    List<String> unnecessary,
    List<String> warnings
) {
    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder();
        sb.append(valid ? "✅ Configuration is valid.\n" : "❌ Configuration has issues.\n");

        if (!present.isEmpty()) {
            sb.append("\n✅ Present:\n");
            present.forEach(e -> sb.append("  - ").append(e).append("\n"));
        }
        if (!missing.isEmpty()) {
            sb.append("\n❌ Missing:\n");
            missing.forEach(e -> sb.append("  - ").append(e).append("\n"));
        }
        if (!unnecessary.isEmpty()) {
            sb.append("\n⚠️ Unnecessary:\n");
            unnecessary.forEach(e -> sb.append("  - ").append(e).append("\n"));
        }
        if (!warnings.isEmpty()) {
            sb.append("\n⚠️ Warnings:\n");
            warnings.forEach(e -> sb.append("  - ").append(e).append("\n"));
        }

        return sb.toString();
    }
}
