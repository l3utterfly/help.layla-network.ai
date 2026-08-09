---
title: Full MCP support in Layla
description: Use full MCP tool calling in Layla and connect characters to external MCP servers.
category: Agents & tools
order: 40
keywords:
  - Model Context Protocol
  - MCP server
  - Layla Agents
  - tool calling
  - remote MCP tools
lastUpdated: 2025-10-14
---

*In the previous two articles, we [introduced Agents in Layla](/how-to-enable-agents-functions-and-tool-calling-in-layla/) and then took a [deep dive into how they work](/deep-dive-into-layla-agents/).*

In this article, let's explore the final layer of Layla Agents: full MCP support.

**MCP**

MCP stands for Model Context Protocol. It is a way for LLMs to interact with external services through a predefined protocol using a combination of natural language and structured outputs. For more information, see the [Model Context Protocol introduction](https://modelcontextprotocol.io/docs/getting-started/intro).

In general, MCP works by putting the signature of every tool available to an LLM into its system prompt. The LLM should intelligently determine which tool to call during the conversation, then continue the conversation with the result of that tool call.

**Layla Agents & MCP**

By default, Layla's Agents are triggered through a combination of keywords and traditional machine-learning techniques such as intent detection. This is because context is limited on mobile, and injecting all possible tools into the system prompt consumes much of that valuable context. Smaller models that run on mobile may also not always determine the best tool to call, so traditional machine-learning techniques have an advantage here.

Layla also supports letting the LLM fully choose which tool to call. Let's see how this works.

The *Layla: Introspection* Agent is an example of how to use MCP tool calling in Layla. Start by searching for the tool name in the Agents mini-app and editing it. This opens the editing popup, where you can see how it works internally.

![Edit Agent screen for Layla Introspection, showing several Layla Tool Triggers.](./introspection-agent.jpg)

The main thing you will notice is that all the triggers use the special "Layla Tool Trigger" mentioned in the previous article. This trigger tells the Agent to inject the signatures of all possible tools into the system prompt. In this example, the signatures of *Layla Apps Info*, *Layla: Clear Caches*, and *Layla: Operating Stats* are injected into the system prompt.

The *Tools Flow* section contains one tool: *Layla Tool Call*, with `{{match$1}}` as its input. Leave this as it is; the tool call expects this format. There is no need to add other tools, because the LLM determines when to call each tool listed in the Triggers section. The output of each tool is automatically injected into the LLM's context, and the LLM may decide to chain other tool calls as needed.

To change the list of tools, edit the *Introspection* Agent and remove its triggers, then add new ones. In the dropdown list, you can select from all the tools available in Layla.

*Note: there is a balance to strike when selecting tools. You don't want to overwhelm the LLM to the point that it confuses which tool to call.*

A recommended way to organise tools is to group your commonly used ones into a single Agent, then attach that Agent to a new character you create. This gives the character a clear, specific goal, which will greatly reduce hallucinations.

**Connecting to external MCP Servers**

Layla supports connecting to external MCP servers, whether they are provided by known organisations or running on your own PC!

Layla provides a supporting mini-app called *MCP Support* to help you automatically discover and configure external MCP servers.

![MCP Support mini-app overview.](./mcp-support-mini-app.jpg)

You can see a list of commonly used MCP servers in the [Model Context Protocol servers repository](https://github.com/modelcontextprotocol/servers/tree/main).

The list includes MCP servers from numerous well-known organisations, including code for hosting your own server if you wish.

A well-implemented MCP server will have a tool-discovery endpoint. Let's use the public *Fetch* MCP server as an example. This server performs web-scraping functions that enable the LLM to read the contents of a webpage.

Start by opening the *MCP Support* mini-app in Layla and entering the remote MCP server URL:

![MCP Support screen with a remote server URL and controls to discover tools and create an Agent.](./discover-mcp-tools.jpg)

Tap *Discover Tools*. This initiates the connection to the MCP server and queries it for a list of available tools. In this case, there is only one tool called "fetch", and it will be displayed after the MCP server responds.

Select the tool so that it is highlighted in green, then tap *Create Agent*. This creates a new Layla Agent with your selected tool.

You will be directed to the Agents mini-app with a new Agent named "New Agent". Feel free to edit its name and description!

![Generated Fetch Agent with its MCP Tool Trigger configuration.](./generated-fetch-agent.jpg)

Leave all other parameters—Triggers, Tool Flow, and so on—unchanged. These are configured correctly for you.

You can now enable the Agent by creating a new character and attaching the Agent to it. We create a new character here because we don't want the new Agent to conflict with existing ones in Layla. You can also disable the existing Web Search Agent instead; the choice is yours.

Go to the *Advanced* tab in the character creator.

![Advanced tab in the Create Character screen.](./character-advanced-tab.jpg)

Tap *Select Agents* to open the popup.

![Available Agents popup listing the Fetch Agent and other Agents.](./available-agents.jpg)

Select the *Fetch* Agent. It will appear in the list.

![Create Character screen showing the Fetch Agent attached to the character.](./fetch-agent-selected.jpg)

After that, save your character! We will use a duplicate of *Kip* in this example.

Kip will initiate the MCP tool call when prompted:

![Chat with Kip showing an MCP tool call.](./mcp-tool-call.jpg)

After the MCP tool call, *Kip* responds to your request in *Kip's* personality. This is what we mean by **personalised**: your own characters respond to requests involving tool calls with their configured personalities.

![Kip responding in character with information obtained through the MCP tool.](./personalized-mcp-response.jpg)

Here is the MCP Agent JSON you can download and import into Layla:

[Download fetch.json](/assets/articles/full-mcp-support-in-layla/fetch.json)
