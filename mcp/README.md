# ebarooni/capacitor-calendar-mcp

<p>
  <img src="https://img.shields.io/maintenance/yes/2026?style=flat-square" />
  <a href="https://www.npmjs.com/package/@ebarooni/capacitor-calendar">
    <img src="https://img.shields.io/npm/l/@ebarooni/capacitor-calendar?style=flat-square" />
  </a>
  <a href="https://www.npmjs.com/package/@ebarooni/capacitor-calendar">
    <img src="https://img.shields.io/npm/dm/@ebarooni/capacitor-calendar?style=flat-square" />
  </a>
  <a href="https://www.npmjs.com/package/@ebarooni/capacitor-calendar">
    <img src="https://img.shields.io/npm/v/@ebarooni/capacitor-calendar?style=flat-square" />
  </a>
  <a href="https://capacitorjs.com/">
    <img src="https://img.shields.io/badge/Capacitor-8.x-119EFF.svg?style=flat-square" />
  </a>
</p>

![capacitor-calendar-logo](../assets/images/text-logo.png)

An official MCP server for [`@ebarooni/capacitor-calendar`](https://github.com/ebarooni/capacitor-calendar). Gives AI coding assistants accurate, grounded knowledge of the plugin: native permission setup, API reference, and config validation.

Built with [Quarkus](https://quarkus.io). Published to the GitHub Container Registry.

## Getting Started

```bash
docker run --rm -d --name capacitor-calendar-mcp -p 8080:8080 ghcr.io/ebarooni/capacitor-calendar-mcp:1.1.0
```

The server starts at `http://localhost:8080/mcp`.

If port 8080 is already in use, map it to any available port on your machine:

```bash
docker run --rm -d --name capacitor-calendar-mcp -p 9090:8080 ghcr.io/ebarooni/capacitor-calendar-mcp:1.1.0
```

The server would then be available at `http://localhost:9090/mcp`. Update your client configuration accordingly.

To stop the server:

```bash
docker stop capacitor-calendar-mcp
```

## Connecting Your AI Client

### Claude Code

Run the following command in your terminal:

```bash
claude mcp add-json capacitor-calendar '{"type":"http","url":"http://localhost:8080/mcp"}'
```

This adds the server to your user scope, making it available across all projects. To scope it to a single project instead, add `--scope project` to the command.

### Cursor

Add to `~/.cursor/mcp.json` (global) or `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "capacitor-calendar": {
      "type": "http",
      "url": "http://localhost:8080/mcp"
    }
  }
}
```

### GitHub Copilot

Open `mcp.json` in your editor and add the following:

**VS Code:** `Command Palette → MCP: Open User Configuration`

**JetBrains:** `GitHub Copilot icon → Edit Settings → MCP Servers → Configure`

```json
{
  "servers": {
    "capacitor-calendar": {
      "type": "http",
      "url": "http://localhost:8080/mcp"
    }
  }
}
```

## What's Available

### Resources

| URI                          | Description                                                  |
| ---------------------------- | ------------------------------------------------------------ |
| `docs://permissions/android` | Required `AndroidManifest.xml` entries for calendar access   |
| `docs://permissions/ios`     | Required `Info.plist` keys for calendar and reminders access |

### Tools

| Tool                      | Description                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------- |
| `getMethod`               | Returns the description, supported platforms, and since version for a specific method |
| `listMethods`             | Lists all plugin methods, optionally filtered by platform                             |
| `searchMethods`           | Searches methods by keyword, optionally filtered by platform                          |
| `validateAndroidManifest` | Validates an `AndroidManifest.xml` for correct permission configuration               |
| `validateInfoPlist`       | Validates an iOS `Info.plist` for correct permission configuration                    |

### Prompts

| Prompt                    | Description                                                            |
| ------------------------- | ---------------------------------------------------------------------- |
| `choose-access-level`     | Recommends the right access level based on which methods your app uses |
| `debug-permission-denied` | Diagnostic flow for when calendar permission is always denied          |
| `setup-for-platform`      | Walks through native permission setup for a given platform             |

## Versioning

All available versions are listed on the [GitHub Packages page](https://github.com/ebarooni/capacitor-calendar/pkgs/container/capacitor-calendar-mcp). Always use a specific version tag:

```bash
docker run --rm -d --name capacitor-calendar-mcp -p 8080:8080 ghcr.io/ebarooni/capacitor-calendar-mcp:1.1.0
```

## Local Development

**Prerequisites:** JDK 25+, Maven 3.9+

```bash
# Run with live reload
mvn quarkus:dev
```

The server starts at `http://localhost:8080/mcp`. The Dev UI at `http://localhost:8080/q/dev-ui` lets you test tools, resources, and prompts interactively without an MCP client.

```bash
# Build the Docker image
mvn install -Ddocker.skip.push=true
```

## License

This project is licensed under the **MIT License**. See [LICENSE](../LICENSE) for details.

## Related Guides

- MCP Server - HTTP ([guide](https://docs.quarkiverse.io/quarkus-mcp-server/dev/)): The HTTP/SSE transport the MCP server.
