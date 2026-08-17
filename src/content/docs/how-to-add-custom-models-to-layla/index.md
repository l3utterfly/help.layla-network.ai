---
title: How to add a custom AI model to Layla
description: Add a local GGUF or LiteRT model to Layla, connect Layla Server or Layla Cloud, or configure an OpenAI-compatible or Claude API.
category: Models & performance
order: 10
keywords:
  - custom AI model
  - local LLM
  - GGUF model
  - offline AI
  - OpenAI-compatible API
  - Claude API
  - Layla Server
lastUpdated: 2026-08-09
---

Layla can run a custom AI model locally on your Android device or connect to a model hosted on your PC or in the cloud. This guide explains each option, including local GGUF and LiteRT models, Layla Server, Layla Cloud, OpenAI-compatible APIs, and the Claude API.

If you want a private, offline AI setup, import a compatible local model and run it directly on your device. The other options require a connection to a PC or an online service.

## 1. Open Inference Settings

Open **Inference Settings** from Layla's **Settings** page. You can also open the **Inference Settings** mini-app directly.

In the **My Models** section, tap **Add Custom Model**.

![The My Models section in Layla's Inference Settings, with the Add Custom Model button near the top.](./Screenshot_20260809_203116_Layla.jpg)

## 2. Choose where the model will run

Layla will open a window with several inference-engine options. You can import a local model, connect to Layla Server on your PC, use Layla Cloud, or configure an API provider.

![Layla's inference-engine window with Local model, Your PC, Layla Cloud, OpenAI API, and Claude API options.](./Screenshot_20260809_203121_Layla.jpg)

### Local model: Internal storage or SD card

Choose **Internal storage** or **SD card** to import a compatible GGUF or LiteRT model and run it locally on your Android device.

**Internal storage** copies the model into Layla's private storage. This leaves the original file in place, so the model uses disk space twice unless you remove the original copy afterwards. Copying the model gives Layla the most reliable access to it and normally provides the best performance and stability. This is the recommended option.

**SD card** references the model in its existing folder instead of copying it into Layla. This saves storage space, but access may be less stable. Do not move, rename, or delete the original model file after adding it, because Layla must continue to access that exact location.

### Your PC with Layla Server

Choose **Your PC** to connect Layla to a model running on your computer through Layla Server. The setup window includes a short tutorial that explains how to make the connection. A separate Layla Server article will cover the complete setup process.

### Layla Cloud

Choose **Layla Cloud** to use the models provided through Layla Cloud. These models run online rather than locally on your phone.

### OpenAI-compatible API

Choose **OpenAI API** to connect any service that provides an OpenAI-compatible chat-completions API. This includes OpenAI, the API provider behind ChatGPT, as well as services such as OpenRouter, Google AI Studio, Azure, and other compatible providers.

Enter a name for the connection, the endpoint supplied by your provider, and the API key if one is required. You can also enter a model name or use **Find models** when the provider supports model discovery.

![The OpenAI API configuration form in Layla, including the name, endpoint, API key, and model fields.](./Screenshot_20260809_203153_Layla.jpg)

The endpoint must be the complete chat-completions URL, not only the provider's domain or base API URL. It commonly ends in `/v1/chat/completions`, although you should use the exact path documented by your provider. A missing path segment or typing mistake in this field is a common reason Layla cannot connect.

### Claude API

Choose **Claude API** to connect a service that uses Anthropic's API format. Setup is similar to an OpenAI-compatible connection: enter the requested connection details, API key, model, and the complete API endpoint supplied by the provider.

The Claude API and OpenAI-compatible API use different request formats, so choose the option that matches your provider. As with the OpenAI API option, entering only the domain or an incomplete path can prevent the connection from working.

## 3. Start chatting with the custom model

Save the model or connection settings, then return to Layla and start a chat with any character. Layla will use the model configuration selected in **Inference Settings**.

If you imported a local model, also check that Layla is using the prompt template required by that model. The prompt format controls how the model receives system instructions, user messages, and replies. See [How to set up custom prompt templates for models in Layla](/how-to-set-up-custom-prompt-templates-for-models/).

You can return to **My Models** whenever you want to add another local LLM, change API providers, or switch between an offline model, Layla Server, and a cloud model.

## Frequently asked questions

### Can I add my own GGUF model to Layla?

Yes. In **Inference Settings**, tap **Add Custom Model**, then choose **Internal storage** or **SD card** to select a compatible GGUF model from your device.

### Does a local model work without internet access?

Yes. After the model has been imported, local inference runs on your Android device and can work offline. Connections to Layla Server, Layla Cloud, or an external API have their own network requirements.

### Should I import a model from internal storage or use the SD card?

Internal storage is recommended for the best performance and stability. The SD card option avoids making a second copy but depends on the model remaining available at its original location.

### Why can Layla not connect to my API model?

Check the endpoint first. It must be the full API path expected by your provider, often ending in `/v1/chat/completions` for an OpenAI-compatible service, and it must not contain typing errors. Also confirm that the API key and model name are valid for that provider.
