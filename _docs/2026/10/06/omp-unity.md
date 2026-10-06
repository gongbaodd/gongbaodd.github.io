---
type: post
category: tech
---

# OMP connect Unity through MCP

It is very useful to use AI agent to connect Unity through MCP. However, there is not enough contents about how to config that, if you ask ChatGPT, it will start gibberishing.

In Unity, When you installed AI assistant, you can see a "Unity MCP Server" in the project settings. There are some integrations such as codex, claude code.

Anyway, there is no integration config for OMP. I have to do it "manually". Well, it is just to paste this MCP server config to the agent's mcp configs. If you do not know where to paste, just copy the config shown under the integrations and ask AI to do it instead.

```json
{
  "mcpServers": {
    "unity-mcp": {
      "command": "${Home}/.unity/relay/relay_mac_arm64.app/Contents/MacOS/relay_mac_arm64",
      "args": ["--mcp"]
    }
  }
}
```

Then Unity will ask for permissions. Make sure you are using a model with MCP support. Then, you agent can control the Unity editor now.