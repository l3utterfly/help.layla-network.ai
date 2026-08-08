---
title: Layla integrations with Tasker
description: Use Layla's Tasker tasks and completion event to automate Android workflows with an LLM.
category: Mini-apps & integrations
order: 50
keywords:
  - Layla Tasker integration
  - Android automation
  - background inference
  - Task Completed event
  - LLM automation
sourceUrl: https://blog.layla-network.ai/post/layla-integrations-with-tasker
lastUpdated: 2024-10-17
---

Layla is integrated with Tasker! You can automate tasks with an LLM.

![Tasker logo.](/assets/articles/layla-integrations-with-tasker/tasker-logo.png)

**What is Tasker?**

Tasker allows you to create automated tasks based on triggering conditions on your device. For example, you can ask an LLM to summarise the content of a new email when it arrives.

*Note: this requires purchasing [Tasker from Google Play](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm&hl=en).*

Layla is not affiliated with Tasker. Tasker is a popular app for Android automation.

**How to create a Layla Tasker task**

Layla provides two main tasks:

1. **Infer:** Sends a prompt and input to Layla. Layla creates an inference task that runs the input through an LLM later and returns the output.
2. **Infer in Background:** Does the same thing, but immediately executes the inference with the LLM in the background.

Both tasks accept configurable inputs such as the LLM model, system prompts, and raw input. These are provided as Tasker variables, so you can easily chain the tasks with others.

![Example Tasker chain using a variable and Layla's Create Infer Task action.](/assets/articles/layla-integrations-with-tasker/tasker-chain.jpg)

The image above shows an example of how a task can be configured:

1. The *Variable Set* action can be replaced with output obtained from other tasks. For example, if you use AutoNotification in Tasker, you can obtain input from your notifications and pass it to the LLM.
2. *Create Infer Task* is the main task exposed by Layla. It takes the variables set before it and runs them through the LLM. One example would be an instruction to summarise the notification content provided earlier.

![Configurable options for a Layla inference task in Tasker.](/assets/articles/layla-integrations-with-tasker/infer-task-options.jpg)

Layla also exposes a *Task Completed* event:

![Layla Task Completed event in Tasker.](/assets/articles/layla-integrations-with-tasker/task-completed-event.jpg)

This event is triggered whenever an inference task finishes as part of Layla's background process. This allows you to hook into it and run further actions based on the task's output.
