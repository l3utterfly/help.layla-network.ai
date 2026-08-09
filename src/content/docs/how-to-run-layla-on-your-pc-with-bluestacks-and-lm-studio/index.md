---
title: How to run Layla on your PC with BlueStacks and LM Studio
description: Install Layla in BlueStacks and connect it to an LM Studio model through a local OpenAI-compatible API.
category: Mini-apps & integrations
order: 20
keywords:
  - Layla on Windows
  - BlueStacks
  - LM Studio
  - OpenAI-compatible API
  - local LLM
lastUpdated: 2026-07-26
---

Layla is designed for Android and iOS, but you can also run it on a Windows PC using the BlueStacks Android emulator. By connecting Layla to LM Studio, you can use an LLM running locally on your computer for your conversations.

This setup is useful if you like Layla's interface and roleplay capabilities and also want a bigger screen when chatting with your characters.

> **Please note:** Not all features work on PC, but the majority of chatting should work normally.

This guide explains how to install Layla in BlueStacks, configure LM Studio as a local inference engine, and connect the two through an OpenAI-compatible API.

## What you will need

Before getting started, make sure you have:

- A Windows PC capable of running BlueStacks
- Enough RAM and storage for your chosen language model
- BlueStacks 5
- The official Layla APK
- LM Studio
- An internet connection for the initial downloads

After everything has been installed, the language model itself can run locally through LM Studio.

## 1. Download and install BlueStacks

Download [BlueStacks 5](https://www.bluestacks.com/bluestacks-5.html) from the official website.

Run the downloaded installer and follow the on-screen instructions. Once installation is complete, open BlueStacks and allow it to finish setting up its Android environment.

You do not need to install Layla from the Google Play Store, although you can if you prefer. The following steps use the official APK directly.

## 2. Download the official Layla APK

Visit the official [Layla website](https://www.layla-network.ai/).

![Dark Layla landing page with smartphone mockups and app download buttons.](./download-layla.avif)

Select the direct APK download rather than the Google Play version. Save the APK somewhere easy to find, such as your Downloads folder.

For security, only download the Layla APK from the official Layla website.

## 3. Install the Layla APK in BlueStacks

Open BlueStacks 5 and install the downloaded APK:

1. Click **Install APK** in the BlueStacks side toolbar.
2. Select the Layla APK you downloaded.
3. Wait for BlueStacks to finish installing the app.

You can also drag and drop the Layla APK directly onto the BlueStacks window.

After installation, the Layla icon should appear on the BlueStacks home screen. You can open the app now, but you will need to configure LM Studio before starting a local conversation.

![BlueStacks showing Layla's Select Character screen, search bar, and character categories.](./bluestacks-select-character.avif)

## 4. Download and install LM Studio

LM Studio is an LLM inference engine that lets you download and run language models locally on your PC.

Download [LM Studio](https://lmstudio.ai/download) from its official website. Install and open it, then complete the initial setup using the instructions shown inside the application.

## 5. Download a recommended language model

Use LM Studio's model browser to find and download a language model.

LM Studio may show recommended models based on your computer's available hardware. Choose one of these recommendations if you are unsure which model to use.

When selecting a model, keep the following in mind:

- Smaller models require less RAM and usually respond faster.
- Larger models may produce better responses but require more memory.
- Quantised models generally use less RAM and VRAM.
- Start with a smaller recommended model if this is your first local LLM setup.

![LM Studio model selection dialog listing downloaded AI models and their sizes.](./lm-studio-model-selection.avif)

Wait for the model download to finish before continuing.

## 6. Start the OpenAI-compatible API server

Layla communicates with LM Studio through its OpenAI-compatible API.

In LM Studio:

1. Open the **Developer** tab.
2. Select or load the model you downloaded.
3. Open the server settings.
4. Enable **Serve on Local Network**.
5. Start the local API server.

![LM Studio Developer Local Server screen with the server running and the server settings highlighted.](./lm-studio-server-settings.avif)

LM Studio will display an API address using your computer's local network IP address and server port. The default port is commonly `1234`.

Your address may look similar to:

```text
http://192.168.1.100:1234
```

For an OpenAI-compatible connection, the base URL will normally include `/v1`:

```text
http://192.168.1.100:1234/v1/chat/completions
```

Your computer's actual IP address may be different, so use the address displayed by LM Studio.

**You are looking for the OpenAI-compatible API to connect to Layla.**

![LM Studio Developer screen showing the local server, OpenAI-compatible endpoints, and logs, with the chat completions endpoint highlighted.](./lm-studio-api-endpoints.avif)

### Why “Serve on Local Network” is required

Although Layla and LM Studio are running on the same physical PC, BlueStacks operates inside a separate virtual Android environment.

Entering this address will therefore usually not work:

```text
http://localhost:1234/v1
```

Inside BlueStacks, `localhost` refers to the Android environment rather than the Windows PC running LM Studio. Enabling **Serve on Local Network** gives you a network address that Layla can use to reach the LM Studio server.

Only expose the LM Studio server on a trusted private network. Consider enabling LM Studio API authentication if other devices can access your network.

## 7. Select the OpenAI-compatible API in Layla

Return to BlueStacks and open Layla.

In Layla:

1. Open **Settings**.
2. Go to **Inference Settings**.
3. Select **OpenAI Compatible API** as the inference engine.

This tells Layla to send chat requests to an OpenAI-compatible endpoint instead of using one of its built-in inference engines.

![Layla dialog for choosing an inference engine, with options for Local File, Your PC, Layla Cloud, OpenAI API, and Claude API.](./layla-inference-engine.avif)

## 8. Enter the LM Studio endpoint

Find the endpoint or base URL field in Layla's OpenAI-compatible API settings.

Enter the network address shown by LM Studio, including `/v1` when required. For example:

```text
http://192.168.1.100:1234/v1/chat/completions
```

**Do not copy the example address exactly. Replace it with the address displayed by LM Studio on your own PC.**

![Layla's Edit OpenAI API Settings dialog with name, endpoint, API key, and model fields.](./layla-api-settings.avif)

Save the inference settings after entering the endpoint.

Keep LM Studio open and make sure:

- The API server is running.
- Your language model is available or loaded.
- **Serve on Local Network** is enabled.
- Windows Firewall is allowing LM Studio on private networks.

## 9. Start chatting in Layla

Open one of your Layla characters or create a new conversation.

Send a message as normal. Layla will forward the conversation to the local model running in LM Studio and display the generated response.

![Layla chat running through LM Studio, with a user asking “Who are you?” and Layla replying.](./layla-chat-via-lm-studio.avif)

You can now use Layla on your PC through BlueStacks while running the language model locally with LM Studio.

## Troubleshooting

### Layla cannot connect to LM Studio

Check the following:

- The LM Studio server is running.
- **Serve on Local Network** is enabled.
- You entered the network address rather than `localhost`.
- The endpoint includes the correct port.
- The endpoint includes `/v1` if Layla expects an OpenAI-compatible base URL.
- Windows Firewall is not blocking LM Studio.

Try restarting the LM Studio server after changing its network settings.

### Layla connects but does not generate a response

Make sure a model has been downloaded and is available in LM Studio. Check the LM Studio server logs to see whether Layla's request is reaching the server.

You can also try manually loading the model before sending another message.

### Responses are very slow

Local inference performance depends on your processor, graphics card, available memory, and chosen model.

Try:

- Using a smaller model
- Choosing a more heavily quantised version
- Closing other memory-intensive applications
- Reducing the context size in your inference settings

### BlueStacks reports that the APK is incompatible

Open the BlueStacks Multi-instance Manager and create a fresh 64-bit Android instance, such as Pie 64-bit or Android 11. Install the Layla APK in the new instance and try again.

### The server works until your PC restarts

LM Studio's server may need to be started again after restarting Windows. Open LM Studio, return to the Developer tab, and start the server before opening a chat in Layla.

## Frequently asked questions

### Can I run Layla on Windows?

Yes. Although Layla is an Android application, you can run the direct APK on a Windows PC through an Android emulator such as BlueStacks.

### Does Layla have a native Windows application?

This guide uses the Android version of Layla inside BlueStacks. Download the latest official versions and check for currently supported platforms on the Layla website.

### Does LM Studio run the model locally?

Yes. LM Studio downloads and runs supported language models on your computer. When Layla uses the LM Studio endpoint, language-model generation is handled by your PC.

Other Layla features may still require an internet connection depending on the services and content you use.

### Do BlueStacks and LM Studio need to remain open?

Yes. BlueStacks must remain open to run Layla, and the LM Studio API server must remain active for Layla to generate responses through your local model.

### Which LM Studio model should I use with Layla?

The best model depends on your computer's available RAM, VRAM, and processing power. Start with one of the models recommended by LM Studio for your hardware. You can experiment with larger models later if performance and memory usage allow it.

## Summary

To run Layla on a PC with BlueStacks and LM Studio:

1. Install BlueStacks.
2. Download the official Layla APK.
3. Install Layla inside BlueStacks.
4. Install LM Studio and download a language model.
5. Start LM Studio's OpenAI-compatible API server.
6. Enable **Serve on Local Network**.
7. Enter the LM Studio endpoint in Layla's inference settings.
8. Start chatting.

This setup gives you the full Layla Android experience on a larger Windows screen while allowing your PC to handle local LLM inference.
