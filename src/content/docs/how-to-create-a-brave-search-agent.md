---
title: How to create a Brave Search agent
description: Create a Layla agent that searches through the Brave Search API, parses the JSON response, and provides the results to the LLM.
category: Agents & tools
order: 50
keywords:
  - Brave Search API
  - Layla Agents
  - HTTP Request
  - Eval tool
  - web search agent
sourceUrl: https://blog.layla-network.ai/post/how-to-create-a-brave-search-agent
lastUpdated: 2025-10-24
---

Brave offers an alternative search to Google, with more of a focus on privacy.

Brave offers an API: [Brave Search API](https://brave.com/search/api/).

If you would like to use Brave Search instead of DuckDuckGo in Layla, this article will show you how to create your own Brave Search Agent, using your own API key, to replace the DuckDuckGo Agent in Layla.

*This is an advanced tutorial. You will learn several methods of obtaining and parsing results from HTTP requests, which you can hopefully use in your future agents!*

**Register an API key**

The first step is to register on [Brave](https://brave.com/) and get an API key. Follow the instructions on their website. From now on, we will assume you have obtained an API key and saved it somewhere.

Familiarise yourself with the [Brave Search API documentation](https://api-dashboard.search.brave.com/app/documentation/web-search/get-started). We will create our agent using this.

**Duplicate the DuckDuckGo Agent in Layla**

The easiest way to start is to duplicate the DuckDuckGo Agent in Layla. This will give you most things already set up.

![Layla Agents screen showing the DuckDuckGo web and news search agents.](/assets/articles/how-to-create-a-brave-search-agent/duplicate-duckduckgo-agent.jpg)

After you've duplicated the agent, remove all the tools but keep the triggers. We want this new agent to be triggered by a web search query as well, and the default DuckDuckGo agent already has that set up.

Add four tools in this order:

1. Eval
2. HTTP Request
3. Eval
4. Provide Context

We will go through what each tool does and how they connect below.

**Eval (1)**

![Layla Eval tool configured to encode the input as a URI component.](/assets/articles/how-to-create-a-brave-search-agent/eval-encode-input.jpg)

The first tool is simple: we need to encode any input as a URI component to send to the API. This is the JavaScript function:

```js
encodeURIComponent
```

Your input to the tool will be run through Eval, and the result will be the output of this tool. You can see `{{input}}` here, which represents the raw text from your input message.

**HTTP Request (2)**

The second tool is the HTTP Request tool, where we will call the Brave Search API. See the [Brave Search API documentation](https://api-dashboard.search.brave.com/app/documentation/web-search/get-started).

![Layla HTTP Request tool configured for the Brave Search API.](/assets/articles/how-to-create-a-brave-search-agent/brave-http-request.jpg)

Note the URL and headers. The `X-Subscription-Token` header contains our API key.

You can see `{{input}}` in the URL query string, which will be sent to the API.

**Eval (3)**

This is the most complicated tool call to date.

This tool takes the output from the previous tool call—the HTTP Request—which should be in JSON format according to the Brave API documentation. It parses the JSON and converts it to plain text, ready to be sent to the LLM.

![Layla Eval tool containing JavaScript that parses the Brave Search results.](/assets/articles/how-to-create-a-brave-search-agent/eval-parse-results.jpg)

This tool takes `{{input}}` as a raw string and assigns it to the `i` variable. It calls `JSON.parse` and maps the result to a standard bullet-point list, which becomes the output of the tool.

This is all just JavaScript; those of you familiar with programming should understand this just fine.

**Provide Context (4)**

The last step is to take our output and provide it as context to the LLM.

![Layla Provide Context tool configured with instructions for the Brave Search results.](/assets/articles/how-to-create-a-brave-search-agent/provide-context.jpg)

This tool is simple: it explains that the results come from the Brave API and instructs your character to tell you about them.

With these four tools, your agent is complete!

I recommend disabling the original DuckDuckGo agent so the two do not conflict.

Here is the Agent JSON for you to import directly:

[Download brave-search.json](/assets/articles/how-to-create-a-brave-search-agent/brave-search.json)
