---
title: How to generate AI images in Layla with the Perchance Agent
description: Generate free AI character images in Layla chats with the Perchance Agent. It reads the image prompt from your character's reply and automates the website.
category: Image generation
order: 40
keywords:
  - Perchance image generation
  - Perchance AI girl generator
  - free AI image generator
  - AI image generator for Android
  - AI character image generator
  - AI companion images
  - Layla image generation Agent
  - Layla Agents
  - Layla Python Agent
  - Stable Diffusion prompt
  - Stable Diffusion alternative
  - automated web browsing
lastUpdated: 2026-10-16
---

**The Perchance image generation Agent lets Layla generate AI images in your chats by operating the Perchance "AI girl generator" website for you.** When your AI character writes an image prompt in its reply, the Agent opens the generator in Layla's embedded browser, types the prompt, presses generate, waits for the picture, and shows it in your chat.

This is an alternative to the Stable Diffusion image models built into Layla for Android. It does not use your phone to render the image, which makes it a free option if your device is too slow for local image generation and you do not want a subscription. The trade-off is that it needs an internet connection, and your prompt is sent to Perchance. Layla's local models still work offline; this Agent is the exception. This article explains how to set it up, how it works, and how to combine it with other Agents.

Here is a demo of the Agent in action:

<video controls playsinline src="/assets/articles/how-to-use-the-perchance-image-generation-agent/perhance-auto.mp4"></video>

## What you need

- The _Agents_ and _Python Interpreter_ mini-apps installed. If you have not set these up, follow [How to enable Python support in Layla](/how-to-enable-python-support-in-layla/).
- An internet connection. Unlike Layla's local models, this Agent uses an online service.
- The Agent file, which is linked at the end of this article.

## Step 1: Turn off Layla's default image generation

This step is required. Open your _Inference Settings_, scroll down to the _Image Generation_ section, and set the image generation model to **None**.

The reason is that Layla's own image generation also reads the `<stable_diffusion_prompt>` tag from a character's reply. If a model is still selected, Layla generates its own image from the same tag, and you will get a second image alongside the Agent's. With the model set to _None_, the tag is left for the Agent to handle.

If you want to see where this setting lives, [How to enable image generation in Layla](/how-to-enable-image-generation-in-layla/) shows the Image Generation section of the Inference Settings.

## Step 2: Import the Agent

Download the Agent file at the end of this article, then open the _Agents_ mini-app and use the _Add New Agent_ button to import it. The Agent is named _Perchance AI Girl: generate image_.

Make sure the switch beneath the Agent's icon is on. By default, any Agent you enable in the Agents mini-app is available to your characters. You can also attach it to a specific custom character from the _Advanced_ tab in the character creator, as described in [How to enable Agents, Functions, and Tool-calling in Layla](/how-to-enable-agents-functions-and-tool-calling-in-layla/).

## Step 3: Ask for an image

Start a chat and ask for a picture, for example "show me what you look like" or "send me a picture of the beach at sunset".

The Agent tells the model to answer image requests with only an image prompt, and nothing else. After a short delay, Layla runs the automation and the picture appears in the chat. Expect it to take a while: the Agent waits up to 30 seconds for the page to load and up to three minutes for the image, because the free generator's speed varies.

## How the Agent works

The Agent has three parts: a system prompt, a trigger, and two tools. Understanding them makes it easier to adapt the Agent.

In short, the flow is:

```text
Model reply with tag -> Regex trigger -> Execute Python Code -> Display Image
```

### 1. The system prompt asks the model for a tagged prompt

The Agent includes this instruction for the model:

```text
If the user asks you to generate an image, output the image prompt inside this tag:

<stable_diffusion_prompt>your image prompt here</stable_diffusion_prompt>

Do not include any other text when generating an image. For other requests, respond normally.
```

So when you ask for a picture, the model replies with something like:

```text
<stable_diffusion_prompt>a lighthouse on a cliff at sunset, dramatic clouds, oil painting</stable_diffusion_prompt>
```

For any other message, the model answers normally.

### 2. A regex trigger matches the tag

The Agent uses a _Regex trigger_ that runs on the model's **output** instead of your input. Its pattern is:

```text
/<stable_diffusion_prompt>(.*?)<\/stable_diffusion_prompt>/s
```

The pattern matches the tag and captures everything between the opening and closing tags. The `s` flag lets the prompt span multiple lines. As explained in [Deep dive into Layla Agents](/deep-dive-into-layla-agents/), the matched text becomes the input of the Agent's first tool. In this Agent, the captured prompt is written into the script as `{{match$1}}`.

### 3. A Python tool drives the website

The first tool is _Execute Python Code_. The script receives the prompt, opens Perchance, generates the image, and saves it to a file. The next section covers this in detail.

### 4. Display Image shows the result

When the script finishes, it prints a single line: the location of the saved image as a `file://` address. This output is the input of the second tool, _Display Image_, which shows the file in the chat. If the script fails, it prints an error message instead of an address, and no image appears.

## How Layla's automated web browsing works

Layla includes an embedded browser (a WebView) that Python scripts can operate. A script can load a page, read what is on it, fill in fields, click buttons, and wait for things to appear, much like a person using a browser would. This Agent uses that ability to do what you would otherwise do by hand on the Perchance website.

The script follows these steps:

1. **Open the generator.** It loads `perchance.org/improved-ai-girl-generator` and gives the page a few seconds to finish loading.
2. **Type the prompt.** It finds the description box on the page and enters the prompt from the model's reply.
3. **Press generate.** It finds the generate button and clicks it. If the button's identifier ever changes, the script falls back to looking for any button labelled "generate".
4. **Wait for the image.** Generation time varies, so the script checks once per second, for up to three minutes, until the result image appears.
5. **Save the image.** The finished picture is already embedded in the page. The script reads it directly, saves it as a file in the temporary folder, and returns its location.

One detail is worth knowing. The Perchance generator is built from nested frames from different origins, which a script cannot normally look inside. The script handles this by searching every frame on the page for the description box, the button, and the result. That is why each step is a search-and-act operation rather than a fixed click at a known position.

The image is saved under the same file name each time, so a new generation replaces the previous temporary file. Treat the file as temporary.

### Privacy and reliability

- Your image prompt is typed into Perchance's website, so it leaves your device. The rest of your conversation does not.
- Layla is built to work offline, but this Agent is the exception. Without an internet connection, it cannot load the page.
- The Agent depends on the layout of a third-party website. If Perchance redesigns the generator, the script may stop finding the right elements, and the Agent will need updating.
- If generation fails or times out, the Agent returns an error instead of an image. Try again, or check that Perchance loads on your connection.

## Combine it with other image generation Agents

The Agent only cares about one thing: a `<stable_diffusion_prompt>` tag appearing in the model's output. It does not matter how the tag got there. This means any other Agent that creates or changes the contents of that tag works with it, and you can build a small pipeline from separate Agents.

Some ideas:

- **Keep a character looking consistent.** Use an Agent with the _Provide Context_ tool to give the model a description of your character's appearance, and tell it to include that description in every image prompt.
- **Add a style.** Use an Agent that appends a fixed style, such as "watercolor, soft lighting", to the contents of the tag. You can also ask for this in the character's _Scenario_ instructions.
- **Generate an image after every message.** Add an instruction to your character's _Scenario_ telling it to finish each reply with a `<stable_diffusion_prompt>` tag, as described in [Creating an image generation Agent](/creating-an-image-generation-agent/). The Perchance Agent will then run after each message instead of only when you ask.
- **Use a different generator.** The Agent's tools are a normal Python script followed by _Display Image_. You can duplicate the Agent and change the script to automate a different website, while keeping the same system prompt and trigger.

If you build several Agents that handle the same tag, keep in mind that each one will run when the tag appears. Only enable the ones you want to act on a given reply.

## Frequently asked questions

### How do I generate free AI images of my character in Layla?

The Perchance Agent is one way: it uses a free online generator, so you do not need a subscription or a model download. The other is to run a local Stable Diffusion model on your device, which works offline. See [How to enable image generation in Layla](/how-to-enable-image-generation-in-layla/).

### Do I need to download a Stable Diffusion model?

No. The image is generated on Perchance's servers, so no model download is needed. You do need to set Layla's own image generation model to _None_.

### Why did I get two images?

Layla's built-in image generation is probably still enabled. Set the image generation model to _None_ in the Inference Settings.

### Can I use it without an internet connection?

No. The Agent loads a website. For offline image generation, use one of the local models described in [How to enable image generation in Layla](/how-to-enable-image-generation-in-layla/).

### Can I change the generator or add my own steps?

Yes. Open the Agent in the Agents mini-app and edit the _Execute Python Code_ tool. The script is plain Python that uses Layla's `lython` library to control the browser.

## Download the Agent

[Download perchance-ai-girl-generator-auto.json](/assets/articles/how-to-use-the-perchance-image-generation-agent/perchance-ai-girl-generator-auto.json)

Use the _Add New Agent_ button in the Agents mini-app to import it.
