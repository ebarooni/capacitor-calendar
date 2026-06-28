package dev.barooni.capacitorcalendar.mcp.tools;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import dev.barooni.capacitorcalendar.mcp.tools.model.ValidationResult;
import io.quarkiverse.mcp.server.Tool;
import io.quarkiverse.mcp.server.ToolArg;

public class ValidationTools {
    
    // iOS 16 keys
    private static final String IOS16_CALENDAR  = "NSCalendarsUsageDescription";
    private static final String IOS16_REMINDERS = "NSRemindersUsageDescription";

    // iOS 17+ keys
    private static final String IOS17_WRITE_ONLY = "NSCalendarsWriteOnlyAccessUsageDescription";
    private static final String IOS17_FULL       = "NSCalendarsFullAccessUsageDescription";
    private static final String IOS17_REMINDERS  = "NSRemindersFullAccessUsageDescription";

    @Tool(
        description = "Validates the Info.plist of an iOS project for correct @ebarooni/capacitor-calendar " +
                      "permission configuration. Infers the configured access level from the keys " +
                      "present and reports what is missing, unnecessary, or misconfigured based on " +
                      "the declared iOS version target."
    )
    public String validateInfoPlist(
        @ToolArg(description = "Full XML content of the Info.plist file. Takes precedence over filePath if both are provided.")
        final String content,
        @ToolArg(
            description = "Absolute path to the Info.plist file. Used only if content is not provided.",
            required = false
        )
        final String filePath,
        @ToolArg(description = "iOS version target: ios16, ios17, or both.")
        final String iosTarget
    ) {
        String plistContent = resolveContent(content, filePath);
        if (plistContent == null) {
            return "❌ No input provided. Supply either content or filePath.";
        }

        Set<String> keys;
        try {
            keys = extractPlistKeys(plistContent);
        } catch (Exception e) {
            return "❌ Failed to parse Info.plist: " + e.getMessage();
        }

        return validate(keys, iosTarget).toString();
    }

    @Tool(
        description = "Validates the AndroidManifest.xml of an Android project for correct " +
                      "@ebarooni/capacitor-calendar permission configuration. Reports which permissions " +
                      "are present, missing, or unnecessary."
    )
    public String validateAndroidManifest(
        @ToolArg(description = "Full XML content of the AndroidManifest.xml file. Takes precedence over filePath if both are provided.")
        final String content,
        @ToolArg(
            description = "Absolute path to the AndroidManifest.xml file. Used only if content is not provided.",
            required = false
        )
        final String filePath
    ) {
        String manifestContent = resolveContent(content, filePath);
        if (manifestContent == null) {
            return "❌ No input provided. Supply either content or filePath.";
        }

        Set<String> permissions;
        try {
            permissions = extractAndroidPermissions(manifestContent);
        } catch (Exception e) {
            return "❌ Failed to parse AndroidManifest.xml: " + e.getMessage();
        }

        return validateAndroid(permissions).toString();
    }

    private ValidationResult validate(final Set<String> keys, final String iosTarget) {
        List<String> present = new ArrayList<>();
        List<String> missing = new ArrayList<>();
        List<String> unnecessary = new ArrayList<>();
        List<String> warnings = new ArrayList<>();

        boolean targetIos16 = iosTarget.equals("ios16") || iosTarget.equals("both");
        boolean targetIos17 = iosTarget.equals("ios17") || iosTarget.equals("both");

        if (targetIos16) {
            checkKey(keys, IOS16_CALENDAR,  "iOS 16 calendar access",  present, missing);
            checkKey(keys, IOS16_REMINDERS, "iOS 16 reminders access", present, missing);
        } else {
            if (keys.contains(IOS16_CALENDAR))
                unnecessary.add(IOS16_CALENDAR + " (not needed for iOS 17+ only target)");
            if (keys.contains(IOS16_REMINDERS))
                unnecessary.add(IOS16_REMINDERS + " (not needed for iOS 17+ only target)");
        }

        if (targetIos17) {
            boolean hasWriteOnly = keys.contains(IOS17_WRITE_ONLY);
            boolean hasFull = keys.contains(IOS17_FULL);

            if (!hasWriteOnly && !hasFull) {
                missing.add(IOS17_WRITE_ONLY + " or " + IOS17_FULL + " (at least one is required for iOS 17+)");
            } else {
                if (hasWriteOnly) {
                    present.add(IOS17_WRITE_ONLY + " (write-only access)");
                }
                if (hasFull) {
                    present.add(IOS17_FULL + " (full access)");
                }
                if (hasWriteOnly && hasFull)
                    warnings.add("Both write-only and full access keys are present. " +
                                 "Only declaring the full access key is sufficient.");
            }
            checkKey(keys, IOS17_REMINDERS, "iOS 17+ reminders access", present, missing);
        } else {
            if (keys.contains(IOS17_WRITE_ONLY))
                unnecessary.add(IOS17_WRITE_ONLY + " (not needed for iOS 16 only target)");
            if (keys.contains(IOS17_FULL))
                unnecessary.add(IOS17_FULL + " (not needed for iOS 16 only target)");
            if (keys.contains(IOS17_REMINDERS))
                unnecessary.add(IOS17_REMINDERS + " (not needed for iOS 16 only target)");
        }

        boolean valid = missing.isEmpty() && warnings.isEmpty();
        return new ValidationResult(valid, present, missing, unnecessary, warnings);
    }

    private ValidationResult validateAndroid(final Set<String> permissions) {
        List<String> present = new ArrayList<>();
        List<String> missing = new ArrayList<>();
        List<String> unnecessary = new ArrayList<>();
        List<String> warnings = new ArrayList<>();

        checkKey(permissions, "android.permission.READ_CALENDAR",  "READ_CALENDAR",  present, missing);
        checkKey(permissions, "android.permission.WRITE_CALENDAR", "WRITE_CALENDAR", present, missing);

        boolean valid = missing.isEmpty();
        return new ValidationResult(valid, present, missing, unnecessary, warnings);
    }

    private Set<String> extractPlistKeys(final String content) throws Exception {
        Document doc = DocumentBuilderFactory.newInstance()
                .newDocumentBuilder()
                .parse(new ByteArrayInputStream(content.getBytes(StandardCharsets.UTF_8)));

        Set<String> keys = new HashSet<>();
        NodeList keyNodes = doc.getElementsByTagName("key");
        for (int i = 0; i < keyNodes.getLength(); i++) {
            keys.add(keyNodes.item(i).getTextContent().trim());
        }
        return keys;
    }

    private Set<String> extractAndroidPermissions(final String content) throws Exception {
        Document doc = DocumentBuilderFactory.newInstance()
                .newDocumentBuilder()
                .parse(new ByteArrayInputStream(content.getBytes(StandardCharsets.UTF_8)));

        Set<String> permissions = new HashSet<>();
        NodeList nodes = doc.getElementsByTagName("uses-permission");
        for (int i = 0; i < nodes.getLength(); i++) {
            String name = nodes.item(i).getAttributes()
                               .getNamedItem("android:name")
                               .getNodeValue();
            permissions.add(name);
        }
        return permissions;
    }

    private void checkKey(
        final Set<String> keys,
        final String key,
        final String label,
        final List<String> present,
        final List<String> missing
    ) {
        if (keys.contains(key)) {
            present.add(key + " (" + label + ")");
        } else {
            missing.add(key + " (" + label + ")");
        }
    }

    private String resolveContent(final String content, final String filePath) {
        if (content != null && !content.isBlank()) {
            return content;
        }

        if (filePath != null && !filePath.isBlank()) {
            try {
                return Files.readString(Path.of(filePath));
            } catch (IOException e) {
                return null;
            }
        }
        return null;
    }
}
