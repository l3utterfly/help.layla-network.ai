---
title: How to connect Layla to any OpenAI-compatible API
description: Connect Layla to any OpenAI-compatible endpoint, including LM Studio, Ollama, and llama.cpp, and run a private local LLM on your own PC or home server.
category: Models & performance
order: 15
keywords:
  - Layla OpenAI-compatible API
  - OpenAI-compatible endpoint
  - local LLM Android
  - LM Studio API endpoint
  - Ollama OpenAI API
  - llama.cpp server
  - connect Android to local LLM
  - self-hosted AI chatbot
  - private AI assistant
  - local AI server
lastUpdated: 2026-08-22
---

**Layla can connect to any service that provides an OpenAI-compatible chat-completions endpoint.** The model can run on your own computer through a local LLM server such as LM Studio, Ollama, or llama.cpp, or it can run on a remote service that uses the same API format.

This guide first explains the settings that every OpenAI-compatible API connection needs, then walks through three concrete local AI setups. The examples use a phone and a Windows PC on the same private network, but the same Layla settings also work with compatible servers on macOS, Linux, a home server, or the internet.

## What is an OpenAI-compatible endpoint?

An OpenAI-compatible endpoint is an API address that accepts requests in the same general format as OpenAI's Chat Completions API. It does not have to connect to OpenAI, ChatGPT, or any OpenAI-hosted model.

Many local LLM inference engines reproduce this API format so that one app can work with different model servers. Layla sends the conversation, selected model name, and a request for a streamed response to the endpoint. The server runs the language model and returns the reply to Layla.

For a service to work with Layla's **OpenAI API** connection, it should support:

- The OpenAI-compatible Chat Completions route, normally `/v1/chat/completions`
- Chat messages and a model identifier
- Streaming responses
- Bearer-token authentication when an API key is required

LM Studio, Ollama, and `llama-server.exe` all provide the required chat-completions route.

## What you need before starting

For a local LLM running on your PC, prepare the following:

- Layla installed on your Android or iOS device
- A computer capable of running your chosen language model
- A model downloaded through your selected inference engine, or a compatible GGUF model for llama.cpp
- Your phone and computer connected to the same trusted Wi-Fi or local network
- Permission to allow the model server through your computer's firewall on private networks

Model size has a direct effect on memory use and response speed. If you are new to local AI, start with a smaller quantised model recommended for your computer. You can move to a larger local model after confirming that the connection works.

## Add an OpenAI-compatible connection in Layla

Open **Settings** in Layla, go to **Inference Settings**, then tap **Add Custom Model** under **My Models**. The next window separates models that run on the phone from connected services. Under **Connected Services**, choose **OpenAI API**.

Despite its name, this option is not limited to OpenAI's own models. It is the connection type for LM Studio, Ollama, llama.cpp, OpenRouter, and any other service that accepts the compatible chat-completions format described above.

![Layla's Choose an inference engine window with OpenAI API listed under Connected Services.](./choose.jpg)

The **OpenAI API** window then asks for the connection details and model. You will use the same four fields for every example in this guide; only their values change:

| Setting      | What to enter                                                                                                                                         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**     | Any clear label, such as “LM Studio on my PC” or “Ollama — Llama 3.2.”                                                                                |
| **Endpoint** | The complete chat-completions URL. For most compatible servers, it ends in `/v1/chat/completions`.                                                    |
| **API key**  | The key supplied by a remote provider. Leave it blank for an unsecured local server, or enter the local server's token if you enabled authentication. |
| **Model**    | The exact model identifier expected by the server. Tap **Find models** when the server supports model discovery.                                      |

![Layla's OpenAI API configuration screen showing the Name, Endpoint, API key, Model, Find models, and Save changes controls.](./settings1.jpg)

Enter a name that will make the connection easy to recognise later. The endpoint must be the complete route: a base address ending only in a port number or `/v1` is not enough. Layla sends each chat request directly to the address entered in this field.

After entering the endpoint and any required API key, tap **Find models** if you do not know the exact model name. Layla asks the same server for its OpenAI-compatible model list and lets you select a returned identifier. If model discovery is unavailable, copy the model name from the server or provider exactly. Leave the model blank only when the endpoint explicitly supports a default model.

Below the model field is **Advanced request settings**. Expanding it reveals an **Extra JSON** area for custom request overrides, as shown below. Most readers should leave this empty: it is intended for a provider that specifically tells you to add another request field. You do not need to enter the temperature example shown in the interface to use LM Studio, Ollama, or llama.cpp.

![Layla's OpenAI API screen with Advanced request settings expanded to show the Extra JSON request overrides field.](./settings2.jpg)

Once the connection details and model are correct, tap **Save changes**. Layla saves the API connection in **My Models** and selects it as the current model source.

## Why localhost does not work from your phone

When a server displays an address such as `http://localhost:1234`, that address works only on the computer running the server. On your phone, `localhost` means the phone itself.

Layla therefore needs your computer's private IPv4 address, which commonly begins with `192.168.` or `10.`. On Windows, open **Settings**, select **Network & internet**, open the properties for the active Wi-Fi or Ethernet connection, and find **IPv4 address**. Some server applications, including LM Studio, can display the correct local-network address after network access is enabled.

If your computer's address is `192.168.1.50`, keep that address and add the port and full API path for your chosen server. Do not copy an example IP address from this article: use the address assigned to your own computer.

## Quick reference: local OpenAI-compatible endpoints for Layla

| Inference engine | Default Layla endpoint                        | Default API key                                     | Model field                                              |
| ---------------- | --------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------- |
| LM Studio        | `http://YOUR-PC-IP:1234/v1/chat/completions`  | Blank unless authentication is enabled              | Use **Find models** or the identifier shown by LM Studio |
| Ollama           | `http://YOUR-PC-IP:11434/v1/chat/completions` | Blank                                               | The installed Ollama model name, such as `llama3.2`      |
| llama.cpp server | `http://YOUR-PC-IP:8080/v1/chat/completions`  | Blank unless the server was started with an API key | Use **Find models** to select the loaded model           |

Replace `YOUR-PC-IP` with your computer's private IPv4 address.

## Example 1: connect Layla to LM Studio

[LM Studio](https://lmstudio.ai/download) provides a desktop interface for finding, downloading, and running local language models. Its Developer page can expose those models through [OpenAI-compatible endpoints](https://lmstudio.ai/docs/developer/openai-compat). This is usually the simplest option for someone who wants a graphical local LLM setup.

### Install a model in LM Studio

1. Download the current installer from the official [LM Studio download page](https://lmstudio.ai/download).
2. Install and open LM Studio.
3. Open the **Discover** page and search for a model.
4. Choose a model and quantisation that fit your computer. LM Studio's recommendations are a sensible starting point if you are unsure.
5. Wait for the model download to finish.

Smaller models and lower-bit quantisations use less RAM or VRAM. A model that cannot fit comfortably in memory may load slowly, respond slowly, or fail to start.

### Start the LM Studio local API server

1. Open LM Studio's **Developer** page.
2. Select or load the downloaded model.
3. Open the server settings.
4. Enable **Serve on Local Network** so that Layla can reach the server from your phone.
5. Keep the default port `1234`, unless another program already uses it.
6. Start the server.
7. If Windows asks whether to allow LM Studio through the firewall, allow it on **Private networks** only.

LM Studio does not require authentication by default. Its documentation recommends enabling authentication when the server listens beyond `localhost`. If you enable **Require Authentication**, create an API token in LM Studio and enter that token in Layla's **API key** field.

### Add LM Studio to Layla

In Layla's **OpenAI API** window, enter:

- **Name:** LM Studio on my PC
- **Endpoint:** `http://YOUR-PC-IP:1234/v1/chat/completions`
- **API key:** Leave blank unless you enabled LM Studio authentication
- **Model:** Tap **Find models** and select the model you downloaded

Tap **Save changes**, keep the LM Studio server running, and open a Layla chat. The conversation will be generated by the model on your computer and returned to Layla over your local network.

For a separate guide to using both apps inside Windows, see [How to run Layla on your PC with BlueStacks and LM Studio](/how-to-run-layla-on-your-pc-with-bluestacks-and-lm-studio/).

## Example 2: connect Layla to Ollama

[Ollama](https://ollama.com/download) is a local model runner available for Windows, macOS, and Linux. It includes an [OpenAI-compatible API](https://docs.ollama.com/api/openai-compatibility) and serves it on port `11434` by default.

The following steps use Ollama for Windows. Ollama's official documentation provides the equivalent installation instructions for other operating systems.

### Install Ollama and download a model

1. Download Ollama from the official [Ollama download page](https://ollama.com/download).
2. Run the installer and open Ollama.
3. Open Windows Terminal or PowerShell.
4. Enter **ollama run llama3.2** to download and start the `llama3.2` model used in this example.
5. Wait for the download to complete and send a short test message.
6. Enter **/bye** when you are ready to leave the terminal chat. Ollama continues running in the background.

You can use another model from the Ollama library. If you do, substitute its exact Ollama name everywhere this example uses `llama3.2`.

### Allow Ollama connections from your local network

Ollama listens only on the PC's own `127.0.0.1` address by default. Change its bind address before connecting Layla:

1. Quit Ollama from the Windows taskbar tray.
2. Open Windows **Settings** and search for **environment variables**.
3. Choose **Edit environment variables for your account**.
4. Create a user variable named **OLLAMA_HOST** with the value **0.0.0.0:11434**.
5. Apply the change and start Ollama again from the Windows Start menu.
6. Allow Ollama through Windows Firewall on private networks if prompted.

Binding to `0.0.0.0` lets devices on the local network reach Ollama. It does not mean that you should expose port `11434` to the public internet. Keep it behind your router and use it only on a trusted network.

### Add Ollama to Layla

In Layla's **OpenAI API** window, enter:

- **Name:** Ollama on my PC
- **Endpoint:** `http://YOUR-PC-IP:11434/v1/chat/completions`
- **API key:** Leave blank
- **Model:** `llama3.2`, or tap **Find models** and select an installed Ollama model

Tap **Save changes** and start a conversation. Ollama loads the selected model when it receives the request, so the first reply may take longer than later replies.

If **Find models** returns no choices, confirm that the model finished downloading and that Ollama restarted after the `OLLAMA_HOST` change.

## Example 3: connect Layla to llama-server.exe

[`llama-server.exe`](https://github.com/ggml-org/llama.cpp/releases/latest) is the Windows server included with llama.cpp. It is a lightweight option for running a GGUF model without a separate desktop model manager. The official [llama.cpp server documentation](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md) describes its OpenAI-compatible API, which uses port `8080` by default.

This route involves one terminal command, but no programming or source-code compilation is required when you use the official prebuilt Windows files.

### Download llama.cpp and a GGUF model

1. Open the official [latest llama.cpp release](https://github.com/ggml-org/llama.cpp/releases/latest) on GitHub.
2. Under **Assets**, download the current Windows x64 CPU ZIP if you want the most broadly compatible starting point. Hardware-specific CUDA, Vulkan, SYCL, and HIP builds may provide better acceleration on supported systems.
3. Extract the entire ZIP into a new folder. Keep all included DLL files beside `llama-server.exe`.
4. Download a chat or instruct model in GGUF format. If you need help choosing a file and quantisation, read [What are GGUF models and model quants?](/what-are-gguf-models-what-are-model-quants/).
5. Move the GGUF file into the extracted llama.cpp folder and give it a short, recognisable filename if necessary.

Do not download a base model unless you specifically know how to prompt it. A chat or instruct model is the appropriate choice for normal Layla conversations.

### Start llama-server.exe for Layla

1. Open the extracted llama.cpp folder in File Explorer.
2. Click the File Explorer address bar, enter **cmd**, and press Enter. Command Prompt will open in that folder.
3. Enter **llama-server.exe -m "your-model.gguf" --host 0.0.0.0 --port 8080**, replacing `your-model.gguf` with the actual filename.
4. Keep the Command Prompt window open while using Layla.
5. Wait until the server reports that the model is loaded and the HTTP server is listening.
6. Allow the server through Windows Firewall on private networks if prompted.

The `--host 0.0.0.0` part is required for a phone on the local network to connect. Without it, llama.cpp listens only on the PC itself. The server also includes a web interface at your computer's address on port `8080`, which you can use to confirm that it started.

### Add llama.cpp server to Layla

In Layla's **OpenAI API** window, enter:

- **Name:** llama.cpp on my PC
- **Endpoint:** `http://YOUR-PC-IP:8080/v1/chat/completions`
- **API key:** Leave blank
- **Model:** Tap **Find models** and select the loaded model

Tap **Save changes** and start a Layla chat. If you close the Command Prompt window, the server stops and Layla cannot generate another response until you start it again.

For better privacy on a shared network, llama.cpp can be started with API-key protection. If you enable that option, use the same key in Layla.

## Connect Layla to another OpenAI-compatible API provider

The same process works with a hosted AI API, a home server, a network-attached GPU machine, or another local inference engine:

1. Confirm that the service supports OpenAI-compatible streaming chat completions.
2. Obtain the provider's complete chat-completions URL.
3. Obtain an API key if the service requires one.
4. Find the exact model identifier in the provider's dashboard or documentation.
5. In Layla, open **Inference Settings** > **Add Custom Model** > **OpenAI API**.
6. Enter the name, endpoint, key, and model.
7. Tap **Find models** if the service exposes an OpenAI-compatible model list.
8. Save the connection and test it in a new chat.

For an internet-hosted endpoint, use the provider's secure `https://` URL exactly as documented. Do not add `/v1/chat/completions` when the provider already gives you a full route, and do not remove provider-specific path segments.

You can save several API connections in **My Models** and switch between them later. If you want a connection, prompt, persona, and sampler preset to stay together, see [How saved inference engines work in Layla](/how-saved-inference-engines-work-in-layla/).

## Privacy and security considerations

A local OpenAI-compatible API can keep language-model inference on hardware you control. When Layla connects to LM Studio, Ollama, or llama.cpp over your home network, the chat content is sent from the phone to your PC rather than to a commercial model provider.

This is local network inference, not on-device inference. The model runs on the computer, and the phone must be able to reach it. Your router does not need an internet connection after the required apps and models have been downloaded, although individual Layla features or third-party model tools may have their own online requirements.

Do not expose an unauthenticated local LLM server to public Wi-Fi or forward its port through your internet router. Anyone who can reach an unsecured server may be able to use the model and consume your computer's resources. Use authentication where available, allow firewall access only on trusted private networks, and stop the server when you no longer need it.

When you use a cloud OpenAI-compatible endpoint, the conversation leaves your device and is handled under that provider's privacy and data-retention policies. Review those policies before sending private chats or personal information.

## Troubleshooting an OpenAI-compatible connection

### Layla says the endpoint or model was not found

A `404` error usually means that the endpoint is incomplete or the model identifier does not match. Check that the URL ends in the full chat-completions path required by the server, normally `/v1/chat/completions`, then use **Find models** or copy the exact model name again.

### Layla cannot connect to the PC

Check all of the following:

- The local LLM server is running and the model has finished loading.
- The phone and PC are on the same Wi-Fi or local network.
- The endpoint uses the PC's private IPv4 address rather than `localhost` or `127.0.0.1`.
- LM Studio has **Serve on Local Network** enabled, Ollama has `OLLAMA_HOST` configured, or llama.cpp was started with `--host 0.0.0.0`.
- Windows Firewall allows the server on private networks.
- A VPN, guest Wi-Fi setting, or router client-isolation feature is not preventing devices from communicating.

### Layla receives an authentication error

A `401` or `403` error normally indicates a missing or incorrect API key. Copy the token again without adding the word “Bearer”; Layla adds the Bearer authentication format to the request. If you are using an unsecured local server, disable accidental authentication requirements or leave the key field blank.

### The model list is empty

Make sure at least one model is downloaded and available to the server. LM Studio must have a model available to its server, Ollama must have pulled the model, and a single-model llama.cpp server must finish loading its GGUF file. You can also type the exact model identifier manually.

### The server works on the PC but not in Layla

Opening `localhost` on the PC proves only that the server works locally. Recheck the network bind setting, PC IP address, and firewall. Some guest or public Wi-Fi networks deliberately block communication between connected devices.

### The connection stopped working after a restart

LM Studio and llama.cpp may need their servers started again. Ollama normally runs in the background, but it must be restarted after environment-variable changes. Your router may also assign the PC a different IP address after a restart; if it changed, update the endpoint saved in Layla.

### Responses are slow

Inference speed depends on the model size, quantisation, available RAM or VRAM, CPU, GPU, context length, and network quality. Try a smaller model or a more compressed quantisation, close memory-intensive applications, and keep the phone on a stable local network.

## Frequently asked questions

### Can Layla use a local LLM running on my PC?

Yes. Run the model through an OpenAI-compatible local server such as LM Studio, Ollama, or llama.cpp, enable local-network access, and enter the PC's chat-completions endpoint in Layla.

### Can I connect Layla to Ollama on Android?

Yes. Ollama runs on the computer while Layla runs on Android. Configure Ollama to listen on the local network, then use `http://YOUR-PC-IP:11434/v1/chat/completions` as Layla's endpoint.

### Is an API key required for a local LLM server?

Not by default for the three examples in this article. If you enable authentication in LM Studio or llama.cpp, enter the matching token in Layla. Remote providers normally require their own API key.

### Can this setup work without internet access?

Yes, when the model and server are on your own PC and both devices remain connected to the same local network. You need internet access for the initial app and model downloads. Cloud APIs still require an internet connection.

### Does the model run on my phone?

Not in these three setups. Layla is the chat interface and API client; the language model runs on the PC. To run a model directly on the phone, import a compatible local model instead. See [How to add a custom AI model to Layla](/how-to-add-custom-models-to-layla/).

### Can I use OpenRouter or another cloud provider?

Yes, provided the service offers a compatible streaming chat-completions API. Use the full endpoint, API key, and model identifier documented by that provider.

An OpenAI-compatible API gives Layla a common way to talk to many local and hosted language models. With LM Studio, Ollama, or llama.cpp on a trusted local network, you can use Layla as a private AI assistant interface while your PC handles the local LLM inference.
