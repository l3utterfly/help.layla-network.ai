---
title: How to create Agents in Layla
description: Create a basic Layla Agent, then build a more advanced Agent that uses an LLM to format API results.
category: Guides
order: 170
keywords:
  - Layla Agents
  - create an Agent
  - HTTP Request
  - Provide Context
  - agent triggers
sourceUrl: https://blog.layla-network.ai/post/how-to-create-agents-in-layla
lastUpdated: 2025-10-01
---

Layla gives you the ability to create and customise your own Agents, so you can create your own features!

This article will first go through creating a basic Agent, explain how Agents work in Layla, and then create a slightly more complex Agent.

If you want a general introduction first, read [How to enable Agents, Functions, and Tool-calling in Layla](/how-to-enable-agents-functions-and-tool-calling-in-layla/).

**Creating an Agent**

Without boring you with the details of how Agents work, let's get started immediately!

Go to the *Agents* mini-app in Layla:

![Layla Apps screen showing the Agents mini-app.](/assets/articles/how-to-create-agents-in-layla/open-agents-app.jpg)

The easiest way to create an Agent is to duplicate an existing one. *Don't worry about the **Add New Agent** button just yet; that is for advanced users.*

![Agents screen with an arrow pointing to the Duplicate action for an existing Agent.](/assets/articles/how-to-create-agents-in-layla/duplicate-agent.jpg)

After duplicating any existing Agent, edit your newly copied Agent with the *Edit* button.

The *Edit* button opens a popup with the Agent details. We are going to create a simple Agent that obtains a random cat fact from a public API!

Step 1: Open the Edit Agent popup.

![Edit Agent popup with name, description, triggers, and tools.](/assets/articles/how-to-create-agents-in-layla/edit-agent-popup.jpg)

Step 2: Delete the existing triggers and tools.

![Edit Agent popup with the delete control highlighted.](/assets/articles/how-to-create-agents-in-layla/clear-agent.jpg)

Step 3: Edit the name and description.

![Agent named Cat facts with the description Get a random cat fact.](/assets/articles/how-to-create-agents-in-layla/cat-facts-name.jpg)

The name and description are only for your reference and are not used at the moment. *In more complex Agents, the name and description are important!*

The next step is to add a *trigger*. Tap the plus sign next to "Triggers" and choose the "Phrase" trigger. This simple trigger activates the Agent when you enter a certain phrase in your chat. Don't worry about the other options yet!

![Edit Agent screen with arrows pointing to Add Trigger and Phrase.](/assets/articles/how-to-create-agents-in-layla/add-phrase-trigger.jpg)

We are going to trigger this Agent whenever the words "**cat fact**" are sent. This includes messages such as "send me a **cat fact**" and "what's a cool **cat fact**?"

![Cat Facts Agent configured with a phrase trigger.](/assets/articles/how-to-create-agents-in-layla/cat-fact-trigger.jpg)

The *trigger phrase* is "cat fact". It is case-insensitive, so it doesn't matter if you enter "cat fact" or "Cat fact". Since we only have one trigger, the *exclusivity* option does not matter, so we will leave it at *OR*.

Next, add a tool for this Agent. We will use the *HTTP Request* tool. Our cat-fact API is a simple public API documented here: [MeowFacts on GitHub](https://github.com/wh-iterabb-it/meowfacts).

![Tool list with an arrow pointing to HTTP Request.](/assets/articles/how-to-create-agents-in-layla/choose-http-request.jpg)

Add the *HTTP Request* tool and configure it as shown below:

![HTTP Request configured to make a GET request to the Meow Facts API.](/assets/articles/how-to-create-agents-in-layla/configure-cat-api.jpg)

The *URL* field is simply the URL given in the API documentation. The request is a GET request. We can leave the other two fields blank.

The first tool is added!

This tool makes the GET request to the specified API and obtains the result. The next step is to *tell* Layla how to use the result. The simplest way to do this is through the *Provide Context* tool. This tool takes input and injects it into the context of the conversation. Layla will pick up the context and respond accordingly.

Scroll to the bottom of the tool and tap *Add Tool* again. This time, choose *Provide Context*. This tool will be chained behind the *HTTP Request* tool we just added.

![Tool list with an arrow pointing to Provide Context.](/assets/articles/how-to-create-agents-in-layla/choose-provide-context.jpg)

We tell the LLM that this cat fact comes after searching the web:

![Provide Context configured for the Cat Facts Agent.](/assets/articles/how-to-create-agents-in-layla/configure-provide-context.jpg)

Note that we use the special template `{{input}}`. It will be replaced with the *output* of the previous tool—the output of the previous tool becomes the input of the current tool. Don't worry about other options such as *LLM tool call* yet.

And voilà! The Agent is complete. Save it and go back to start a chat with Layla.

![Chat demonstrating a cat fact returned by the new Agent.](/assets/articles/how-to-create-agents-in-layla/cat-fact-result.jpg)

You can see your new Agent in action! It makes an HTTP request to your URL and injects the result and instructions into the context.

**Conclusion**

You can now see how Agents generally work in Layla: each Agent is *triggered* under specific conditions, whether those are phrases, regexes, or other more complex conditions. The Agent then calls each configured tool in sequence, chaining the output of one tool into the input of the next.

The *Provide Context* tool is very important in this process. It is usually the last tool you add to your Agent because it provides the LLM—Layla in this case—with the execution results. Without this tool, the Agent will execute silently, and Layla won't know about it. You will almost always use this tool when creating your own Agents.

**A slightly more complex agent**

Here's an example of creating a slightly more complex Agent that uses your LLM's "brain"!

We make another simple *HTTP Request* to an API. This API returns a random picture of a dog: [https://random.dog/woof.json](https://random.dog/woof.json).

This time, the API returns the URL of an image. We then *ask* the LLM to format it correctly and display it!

Step 1: The HTTP Request tool works as before, except that we change the API URL. The difference is in the instruction we put in the *Provide Context* tool. We tell the LLM that the result is JSON with a `url` field, which should be used to display the image in Markdown format.

![Provide Context instructions for formatting the dog-image API result as Markdown.](/assets/articles/how-to-create-agents-in-layla/dog-image-instructions.jpg)

Step 2: Here is the result of executing the Agent!

This more complex Agent works best with a bigger model, around 8B parameters or more. You may still see artifacts where the LLM does not format the image completely correctly.

![Chat displaying a random dog picture returned by the Agent.](/assets/articles/how-to-create-agents-in-layla/dog-image-result.jpg)

This demonstrates the powerful functions you can achieve with Layla Agents!

Now you are ready to learn how to create **actually useful** Agents in the next articles:

- [Create a Roleplay Agent](/how-to-create-a-roleplay-agent/)
- [Create an image generation Agent](/creating-an-image-generation-agent/)
