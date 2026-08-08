---
title: Creating an image generation agent
description: Create an Agent that uses conversation context to generate an image of the scene or character after each message.
category: Guides
order: 190
keywords:
  - Layla Agents
  - image generation Agent
  - Stable Diffusion prompt
  - Structured Output
  - roleplay images
sourceUrl: https://blog.layla-network.ai/post/creating-an-image-generation-agent
lastUpdated: 2025-10-01
---

In this article, we will explore how to create an image generation Agent. This Agent will automatically generate an image after every message, giving you a more immersive chatting experience.

The Agent will use your conversation context to generate an image!

Here is how the Agent looks in action:

![Chat showing a generated image of a mountain scene with a waterfall.](/assets/articles/creating-an-image-generation-agent/image-agent-in-action.jpg)

The idea is to have the LLM add a *Stable Diffusion prompt* after each message. We add an instruction to the character card telling the LLM to append a short description of the scene inside `<stable_diffusion_prompt></stable_diffusion_prompt>` tags.

First, create the Agent. This Agent is very similar to our [Roleplay Agent](/how-to-create-a-roleplay-agent/):

![Image generation Agent settings, including its regex trigger.](/assets/articles/creating-an-image-generation-agent/image-agent-triggers.jpg)

![Structured Output tool configured with grammar for the Stable Diffusion prompt tags.](/assets/articles/creating-an-image-generation-agent/structured-output-grammar.jpg)

Here we use a simple grammar to structure the output so it ends with `<stable_diffusion_prompt></stable_diffusion_prompt>` tags.

The next step is to create or copy your own character. You need to do two things here. First, add a custom instruction in the *Scenario* section telling the LLM to put scene-description keywords in the Stable Diffusion prompt tags. You can get creative here: try telling the LLM to include character descriptions to focus on generating images of your character instead of scenes!

![Character Scenario instructions telling the LLM to add image-generation keywords.](/assets/articles/creating-an-image-generation-agent/character-scenario-instructions.jpg)

Then attach the Agent to your character in the *Advanced* tab, just like before.

The last thing you need to do is enable image generation in your *Inference Settings*. For more information, read [How to enable image generation in Layla](/how-to-enable-image-generation-in-layla/).

If you have a phone with a Snapdragon CPU, I strongly recommend generating images with the NPU. Read [Layla supports generating images locally using the NPU](https://www.layla-network.ai/post/layla-supports-generating-images-locally-using-the-npu) for more details. This means your images will take only a few seconds to generate after each message, so your conversation flow is not interrupted!

Here is the Agent for you to import if you wish:

[Download generate-image-agent.json](/assets/articles/creating-an-image-generation-agent/generate-image-agent.json)
