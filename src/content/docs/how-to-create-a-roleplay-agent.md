---
title: How to create a Roleplay Agent
description: Create a Layla Agent that makes a character respond in action-dialogue format.
category: Agents & tools
order: 70
keywords:
  - Layla Agents
  - roleplay Agent
  - Structured Output
  - BNF grammar
  - action dialogue
lastUpdated: 2025-10-01
---

Let's explore creating a simple *Roleplay Agent* in Layla.

This Agent will force your character to respond in **action-dialogue** format.

For example:

> `*waves and smiles* Hi there!`

Create an Agent with the following settings:

![Roleplay Agent name, description, and regex trigger settings.](/assets/articles/how-to-create-a-roleplay-agent/roleplay-agent-settings.jpg)

![Roleplay Agent Structured Output tool and its BNF grammar.](/assets/articles/how-to-create-a-roleplay-agent/roleplay-structured-output.jpg)

Let's take a look at what this Agent does:

1. The name and description can be anything; they are there to help you easily identify your Agent.

2. We use the *Regex Trigger*. The `.` (dot) regex matches anything, so this will be triggered on every message. This is what we want because we want all outputs to follow our format.

3. We use the *Structured Output* tool. This uses BNF grammar to structure the output:

   - `root` is always needed; it starts the grammar definition.
   - `::=` is the assignment operator, which assigns grammar to variables.
   - `turn` is our custom-defined variable, with its definition on the next line. It is composed of the literal `*` character, then `fragment`—another user-defined variable—then another `*`, then another fragment.
   - `fragment` is our action or dialogue. It is defined as anything that is not a line break.

4. Putting this all together, our output is defined as `*fragment*fragment`, where each `fragment` is any text that is not a new line. This is exactly what we want.

Here is the Agent file for you to download and import. You can use the *Add New Agent* button to import it.

[Download roleplay-action-dialogue.json](/assets/articles/how-to-create-a-roleplay-agent/roleplay-action-dialogue.json)
