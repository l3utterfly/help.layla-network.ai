---
title: "NanoGPT image generation on Android: build an AI image Agent in Layla"
description: Use the NanoGPT image generation API in Layla on Android. Build an Agent step by step so AI characters send HiDream, FLUX or SDXL pictures in chat.
category: Image generation
order: 60
keywords:
  - NanoGPT image generation
  - NanoGPT image generation API
  - NanoGPT image models
  - NanoGPT image generation pricing
  - NanoGPT API
  - NanoGPT API key
  - NanoGPT API endpoint
  - nano-gpt.com image API
  - NanoGPT Android app
  - NanoGPT SillyTavern image generation
  - NanoGPT uncensored image models
  - NanoGPT HiDream
  - HiDream API
  - FLUX API
  - SDXL API
  - pay as you go image generation API
  - image generation API without subscription
  - cheap image generation API
  - OpenAI-compatible image generation API
  - images/generations endpoint
  - AI chat with image generation
  - AI chatbot that can send pictures
  - AI roleplay with image generation
  - AI character image generator
  - AI image generator for Android
  - bring your own API key AI chat
  - local LLM with cloud image generation
  - how to build an AI agent
  - JavaScript AI agent
  - Layla Eval tool
  - Layla JavaScript Agent
  - Layla image generation Agent
  - Layla Agents
lastUpdated: 2026-11-22
---

**NanoGPT image generation gives one pay-as-you-go API key access to over 200 image models, including HiDream, FLUX, Seedream, Qwen Image, Stable Diffusion XL and GPT Image, with no subscription.** This guide connects the NanoGPT image generation API to Layla, an AI chat app for Android, so your AI characters can send pictures in chat. When your character describes a picture in its reply, a Layla Agent sends that description to NanoGPT, saves the image it gets back, and shows it in the conversation.

The article has two parts. The first shows how to build the AI image Agent step by step in the _Agents_ mini-app, so you can see where each piece goes. The second explains how the Agent's JavaScript code works, line by line, so you can change it or write your own Agent for a different image generation API.

The Agent runs in Layla's built-in JavaScript runtime, so you do not need the Python Interpreter mini-app. If you would rather not build it yourself, you can download the finished Agent file and import it instead.

Unlike Layla's [offline AI models](/how-to-enable-image-generation-in-layla/), this Agent needs an internet connection. Your image description is sent to NanoGPT and to the company that runs the model, and each image is paid for from your NanoGPT balance. If you chat with a local model, the rest of your conversation stays on your device.

<div class="file-download">
  <div class="file-download-info">
    <span class="file-download-label">Agent file</span>
    <span class="file-download-name">nanogpt-generate-image.json</span>
    <span class="file-download-hint">You will need a NanoGPT API key before it works, which the article explains below.</span>
  </div>
  <a class="file-download-button" href="/assets/articles/how-to-create-a-nanogpt-image-generation-agent-in-layla/nanogpt-generate-image.json" download="nanogpt-generate-image.json"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>Download</a>
</div>

## Why use NanoGPT image generation in Layla?

Layla's own Stable Diffusion models are the right choice when you want images generated entirely on your phone. NanoGPT suits a different set of needs:

- **Pay per image, with no subscription.** You top up a balance and each picture is deducted from it. At the time of writing, the cheapest NanoGPT image models cost less than half a cent per image, and HiDream I1 Full, which this Agent uses, costs $0.0153.
- **Small top-ups and crypto payments.** NanoGPT accepts cards from $1 and cryptocurrencies from $0.10, which suits people who want to try a model without a large deposit or a card.
- **Many image models behind one key.** HiDream, FLUX, Seedream, Qwen Image, GPT Image, Stable Diffusion XL and anime SDXL models such as Animagine XL and Illustrious all use the same request. Switching models means changing one line of the Agent's code.
- **An OpenAI-compatible image API.** NanoGPT's image endpoint follows the format of OpenAI's `images/generations` API, so the code in this guide also works as a template for other OpenAI-compatible image generation APIs.
- **One NanoGPT account for chat and images.** NanoGPT also serves language models through an OpenAI-compatible API at `https://api.nano-gpt.com/api/v1`, which Layla can use for the conversation itself through its [OpenAI-compatible API connection](/how-to-connect-layla-to-any-openai-compatible-api/). With this Agent, the same key powers both your character's replies and its pictures.
- **Or a local chat model with cloud images.** The Agent only reacts to the character's reply, so it works with whichever model you chat with. You can keep a private, offline LLM for the conversation, and only the image prompt leaves your phone.
- **Image quality that does not depend on your phone.** The picture is generated on a server, so the speed of your device does not limit the model size or the wait.

## How the AI image Agent works at a glance

The Agent uses the same flow as the other image generation Agents in Layla, such as the [OpenRouter Agent](/how-to-use-the-openrouter-image-generation-agent/) and the [Nano Banana Agent](/how-to-use-the-google-nano-banana-image-generation-agent/):

```text
You ask for an image
  -> the character replies with a tagged image prompt
  -> the Agent's trigger spots the tag
  -> the Eval tool calls NanoGPT's API and saves the picture
  -> the Display Image tool shows it in the chat
```

An Agent is made of three parts, and this one uses each of them once:

1. **A system prompt** tells your character's language model that it can create images, and that it does so by writing an image prompt inside `<stable_diffusion_prompt></stable_diffusion_prompt>` tags.
2. **A trigger** watches the model's replies. When a reply contains the tag, the trigger captures the text inside it and starts the Agent.
3. **Two tools** run one after the other. _Eval_ runs a short JavaScript program that sends the prompt to NanoGPT and saves the image as a file. _Display Image_ takes that file and shows it in the chat.

The language model never talks to NanoGPT. It only writes text, and the Agent handles everything after that. This is why the Agent works with any chat model, including a small local model running on your phone.

The tag is named `<stable_diffusion_prompt>` because that is the tag Layla's own image generation also listens for. This matters for setup, as explained in [Step 1](#step-1-turn-off-laylas-default-image-generation).

## What you need

- The _Agents_ mini-app. If you have not used Agents before, read [How to enable Agents, Functions, and Tool-calling in Layla](/how-to-enable-agents-functions-and-tool-calling-in-layla/) first.
- A NanoGPT account with a balance, and a NanoGPT API key. The next section shows how.
- An internet connection.

## How to get a NanoGPT API key

An API key is a long string of characters that identifies your NanoGPT account when the Agent sends a request. NanoGPT keys start with `sk-nano-`.

1. Go to [nano-gpt.com](https://nano-gpt.com) and sign in or create an account.
2. Open the [Balance page](https://nano-gpt.com/balance) and add funds. NanoGPT is prepaid: you top up a balance and each image is deducted from it. Your current balance is shown next to _Usage & billing_ in the sidebar. At the time of writing, NanoGPT accepts cards, Apple Pay and Google Pay, with a $1 minimum for the first card deposit and $5 after that, and a range of cryptocurrencies from $0.10. It charges no deposit fees. The [pricing page](https://nano-gpt.com/pricing) has the current terms.
3. Select **API** in the sidebar to open the _API integration_ page, or go to [nano-gpt.com/api](https://nano-gpt.com/api) directly. The _API keys_ tab is selected and lists the keys you already have.
4. Select **Create API key** at the top right of the _API keys_ section. The new key appears in the list, with most of it hidden.
5. Select the eye icon next to the key to show it in full, or the copy icon beside it to copy it.

![The NanoGPT API integration page, with API selected in the sidebar and an API keys list showing one key, sk-nano-...80ff, with eye and copy icons next to it and a Create API key button at the top right.](./nano-gpt-api-key.png)

The text under the list shows how a key is sent: `Authorization: Bearer $NANOGPT_API_KEY`. That is the header the Agent's code uses, as explained in [Send the request](#send-the-request).

Treat the key like a password. Anyone who has it can generate images that are paid for from your balance. Keep only a small balance on the account if you are trying the Agent out.

## NanoGPT image models and pricing

The Agent uses one model and one image size, which you set at the top of its code. NanoGPT lists its image models on its [image models page](https://nano-gpt.com/models/image). For the exact details the Agent needs, open the model catalog in your browser:

```text
https://api.nano-gpt.com/api/v1/images/models
```

It returns a long JSON list with one entry per model. Three fields in each entry matter here:

- `id` is the value you put in `MODEL`.
- `supported_parameters.resolutions` lists the sizes the model accepts. One of them goes in `SIZE`.
- `pricing.per_image` shows the price of one image at each size, in US dollars.

Size names differ between models. Some use `1024x1024`, some use `1024*1024`, and some use names such as `1k` or `2k`. Copy the size exactly as the catalog writes it for your model. A size the model does not support is the most common reason a request fails after you switch models.

These are some of the text-to-image models NanoGPT lists at the time of writing, with the price of one image at the size shown:

| Model                | Model ID                                     | Example size | Price per image | Notes                                                                   |
| -------------------- | -------------------------------------------- | ------------ | --------------- | ----------------------------------------------------------------------- |
| HiDream-I1 Fast      | `hidream-i1-fast`                            | `1024x1024`  | $0.0034         | The fast version of HiDream I1, for frequent pictures at a low cost.    |
| Stable Diffusion XL  | `fast-sdxl`                                  | `1024x1024`  | $0.0051         | The SDXL model that many of Layla's local image models are based on.    |
| WAI Illustrious SDXL | `wai-illustrious-sdxl`                       | `1024x1024`  | $0.0051         | An anime SDXL model, suited to anime characters and AI roleplay.        |
| FLUX.3 Image Klein   | `blackforestlabs/flux-3/klein/text-to-image` | `1024x1024`  | $0.009          | A fast FLUX model from Black Forest Labs. Sizes up to `4096x4096`.      |
| FLUX.2 [klein] 9B    | `flux-2-klein-9b`                            | `1024*1024`  | $0.01           | Note the `*` in its size names.                                         |
| HiDream I1 Full      | `hidream`                                    | `1024x1024`  | $0.0153         | The model this Agent uses by default. The same price at every size.     |
| Seedream 5.5         | `bytedance/seedream-v5.5`                    | `1k`         | $0.02           | ByteDance's model. `2k` costs $0.035.                                   |
| Qwen Image 3         | `qwen-image-3`                               | `1k`         | $0.03           | Accepts `1k` and `2k`.                                                  |
| GPT Image 2.6 Flare  | `gpt-image-2.6-flare`                        | `1k`         | about $0.09     | OpenAI's model, billed by usage, so the price varies with each request. |

Prices and models change often, so check the catalog before you choose. You can switch models at any time by changing two lines of the code, as described in [Settings at the top](#settings-at-the-top).

For a tall picture that fills a phone screen, choose a portrait size from the model's list, such as `768x1360` or `832x1248` for HiDream.

## Step 1: Turn off Layla's default image generation

Open your _Inference Settings_, scroll to the _Image Generation_ section, and select the image generation model. In the _Select Model_ list, choose **No Image Generation**.

![The Inference Settings screen with the Select Model list open and No Image Generation selected.](./no-img-gen-settings.jpg)

Layla's built-in image generation reads the same `<stable_diffusion_prompt>` tag from a character's reply. If a model is still selected, Layla generates its own image from the tag and you receive two pictures. With _No Image Generation_ selected, the tag is left for the Agent. [How to enable image generation in Layla](/how-to-enable-image-generation-in-layla/) shows where this setting is.

If you already use the [OpenRouter Agent](/how-to-use-the-openrouter-image-generation-agent/), the [Nano Banana Agent](/how-to-use-the-google-nano-banana-image-generation-agent/) or another Agent that reacts to `<stable_diffusion_prompt>`, turn it off for the same reason.

## Step 2: Create a new Agent

Open the _Agents_ mini-app. The quickest way to start a new Agent is to copy an existing one and replace its contents:

1. On any Agent's card, select **More**, then **Duplicate**.
2. On the copy, select **Edit**. The _Edit Agent_ screen opens with the Agent's details, its triggers and its tool flow.
3. Remove the copy's existing triggers with the trash icon on each one, and remove each of its tools with **Remove tool**, so you start with an empty Agent.

If you would rather skip the building steps, download the Agent file from this article and use the **Import** button at the top of the _Agents_ mini-app instead. Then continue at [Step 7](#step-7-add-your-api-key). An imported Agent starts switched off, so turn on the switch on its card.

## Step 3: Name the Agent and add the system prompt

Fill in the three fields at the top of the _Edit Agent_ screen:

- **Name**: `NanoGPT Image Generation (JS)`, or any name you will recognise.
- **Description**: a sentence for your own reference, such as "Generates images with the NanoGPT image API from the prompt the AI writes in a stable_diffusion_prompt tag."
- **System Prompt**: paste the text below.

```text
{{char}} can create images. Whenever {{user}} asks to see, draw, paint, picture or imagine something, or a visual would help the conversation, {{char}} writes an image prompt inside <stable_diffusion_prompt></stable_diffusion_prompt> tags. The image is then generated and shown in the chat automatically, so {{char}} never says it cannot create images and never describes the image as already visible before it is generated.

Rules for the tag:
- Use at most one <stable_diffusion_prompt> tag per reply, and place it at the end of the reply.
- Write the prompt in English as a comma-separated list of descriptive phrases: subject first, then appearance, clothing, pose and action, setting and background, lighting, camera angle and framing, art style or medium, and quality words.
- Be concrete and visual. Name colours, materials, time of day and mood. Do not use names the image model would not know; describe the person or thing instead.
- When the image shows {{char}} or {{user}}, describe their appearance in full inside the prompt every time.
- Keep the prompt on a single line, under 75 words, with no quotation marks, backticks or other tags inside it.

Example:
Here is the lighthouse I told you about.
<stable_diffusion_prompt>old stone lighthouse on a rocky cliff, stormy sea crashing below, dramatic overcast sky, warm light glowing from the lantern room, seagulls, wide angle, cinematic lighting, highly detailed digital painting</stable_diffusion_prompt>
```

[How the system prompt works](#1-the-system-prompt) below explains each part of it.

## Step 4: Add the trigger

Under _Triggers_, add a trigger and choose **Regex** from the list of trigger types. Configure it like this:

- **Regex**: paste this pattern.

  ```text
  /<stable_diffusion_prompt>(.*?)</stable_diffusion_prompt>/s
  ```

- **Match on agent output**: turn this on. The trigger then checks your character's replies instead of your messages.
- **Group**: leave it on _ANY OF THESE_ (OR). With only one trigger, the group makes no difference.

## Step 5: Add the Eval tool

Under _Tools flow_, select **Add tool** and choose **Eval**. Leave _Input mode_ on **Fixed inputs**, and paste this code into the `code` field:

```js
(async () => {
  // ---- configure these ----
  const API_KEY = "YOUR_NANOGPT_API_KEY"; // https://nano-gpt.com/api
  const MODEL = "hidream"; // any id from GET https://api.nano-gpt.com/api/v1/images/models
  const SIZE = "1024x1024";
  // --------------------------

  const PROMPT = String.raw`{{match$1}}`.trim();
  const ENDPOINT = "https://api.nano-gpt.com/v1/images/generations";

  if (!PROMPT) throw new Error("The <stable_diffusion_prompt> tag was empty.");
  if (!API_KEY || API_KEY.startsWith("YOUR_"))
    throw new Error("Set API_KEY in the NanoGPT Image Generation (JS) agent.");

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      prompt: PROMPT,
      n: 1,
      size: SIZE,
      response_format: "b64_json",
    }),
  });
  const text = await response.text();
  if (!response.ok)
    throw new Error(
      `nano-gpt returned HTTP ${response.status}: ${text.slice(0, 500)}`,
    );

  const item = (JSON.parse(text).data || [])[0];
  if (!item)
    throw new Error(`nano-gpt returned no image: ${text.slice(0, 500)}`);

  let base64;
  if (item.b64_json) {
    base64 = item.b64_json.replace(/^data:[^,]*,/, "");
  } else if (item.url) {
    // nano-gpt may answer with a link instead of base64; download it and encode it ourselves.
    const download = await fetch(item.url);
    if (!download.ok)
      throw new Error(`Image download failed: HTTP ${download.status}`);
    base64 = (await download.bytes()).toBase64();
  } else {
    throw new Error(
      `nano-gpt response had no b64_json or url: ${text.slice(0, 500)}`,
    );
  }

  const ext = base64.startsWith("/9j/")
    ? "jpg"
    : base64.startsWith("UklGR")
      ? "webp"
      : "png";
  const filename = `nanogpt_${Date.now()}.${ext}`;

  // Saved in the character workspace, the folder display-image resolves relative paths against.
  await layla.utils.saveFile(filename, base64);

  // The result is the next tool's input: display-image reads it as the image path.
  return filename;
})();
```

_Fixed inputs_ means the code runs exactly as written. The other mode, _AI decides_, would ask the language model to write the tool's input itself, which is not what this Agent needs.

## Step 6: Add the Display Image tool

Select **Add tool** again and choose **Display Image**. It appears below _Eval_ in the tool flow, so it runs second. Set its `imagePath` field to:

```text
{{input}}
```

Select **Save changes**. Back in the Agent list, make sure the switch on the Agent's card is on.

## Step 7: Add your API key

Open the Agent with **Edit** and find this line near the top of the _Eval_ code:

```js
const API_KEY = "YOUR_NANOGPT_API_KEY";
```

Replace `YOUR_NANOGPT_API_KEY` with your key, and keep the quotation marks. If you chose a different model or size, change `MODEL` and `SIZE` on the next two lines. Save the Agent.

Your key is now stored inside the Agent. Before you share the Agent, or export it with **Share**, replace the key with the placeholder again.

## Step 8: Test the Agent

Select **Test** on the Agent's card. In the test screen:

1. Turn on **Test as output**. The Agent's trigger only looks at the character's replies, so the test input has to be treated as a reply too.
2. Enter a reply that contains the tag, for example:

   ```text
   <stable_diffusion_prompt>red fox curled up in fresh snow, soft morning light, shallow depth of field, wildlife photograph</stable_diffusion_prompt>
   ```

3. Run the test.

The _Activity_ list shows each tool's status as it runs. A successful test sends one real request to NanoGPT, which costs one picture, and both tools finish without an error. If the script stops with an error, the error message appears on the _Eval_ step. [Troubleshooting](#troubleshooting) lists the common ones. [Deep dive into Layla Agents](/deep-dive-into-layla-agents/) explains the test screen in more detail.

The test does not put the picture in a chat. Once the test passes, try the Agent in a real conversation.

## Step 9: Ask for an image in chat

Start a chat and ask for a picture, for example "show me a lighthouse on a cliff at dusk". The character replies with an image prompt at the end of its message, the Agent runs, and the picture appears in the chat after a few seconds.

## How the NanoGPT image Agent's code works

This section follows the Agent through each part you built and explains why it is written the way it is. [Deep dive into Layla Agents](/deep-dive-into-layla-agents/) covers the same building blocks in general.

### 1. The system prompt

An Agent's system prompt is added to your character's system prompt on every turn while the Agent is enabled, whether or not the Agent runs. Before the prompt reaches the model, Layla replaces `{{char}}` with your character's name and `{{user}}` with yours.

Each part of the prompt has a job:

- **"{{char}} can create images."** Many language models are trained to say that they cannot make pictures. Stating the ability, and adding "never says it cannot create images", stops the character from refusing.
- **"Whenever {{user}} asks to see, draw, paint, picture or imagine something, or a visual would help the conversation"** decides when pictures appear. The last part lets the character send a picture without being asked. Each picture costs money, so remove "or a visual would help the conversation" if you only want images on request.
- **"Never describes the image as already visible before it is generated"** stops replies such as "As you can see in the picture…", which would read oddly while the image is still being made.
- **"At most one tag per reply, at the end"** matters because the trigger only reads the first tag in a reply. A second tag would be ignored, and a tag at the end keeps the picture next to the text that introduces it.
- **"A comma-separated list of descriptive phrases"** and the order it gives (subject, appearance, pose, setting, lighting, framing, style) is the prompt style that image models such as HiDream and Stable Diffusion respond to best.
- **"Do not use names the image model would not know"** is there because an image model has never heard of your character. "A woman with short red hair and green eyes" produces a consistent result, while a name does not.
- **"Describe their appearance in full inside the prompt every time"** follows from the same fact. The image model sees only this one prompt, not the conversation, so every prompt has to carry the full description.
- **"Single line, under 75 words, with no quotation marks, backticks or other tags"** protects the script. A backtick inside the prompt would break the code, as explained in [Settings at the top](#settings-at-the-top). The word limit keeps prompts short and focused, which suits older image models: Stable Diffusion's text encoder reads only 75 tokens at a time, which is fewer than 75 words.
- **The example** shows the exact format. Language models follow an example more reliably than a description of a format.

### 2. The trigger

The trigger is a _Regex_ trigger with _Match on agent output_ turned on, so it checks each of the character's finished replies. Its pattern is:

```text
/<stable_diffusion_prompt>(.*?)</stable_diffusion_prompt>/s
```

- Layla reads the text between the first `/` and the last `/` as the pattern, and the letters after the last `/` as flags. The `/` inside the closing tag is part of the pattern, so it does not need to be escaped.
- The opening and closing tags match the literal tags in the reply.
- `(.*?)` is a capture group. It collects everything between the tags. The `?` makes it stop at the first closing tag instead of the last one.
- The `s` flag lets `.` match line breaks as well, so the trigger still works if the model splits the prompt over several lines.

When the pattern matches, the whole match becomes `{{match$0}}` and the text captured by the group becomes `{{match$1}}`. The _Eval_ code uses `{{match$1}}`, which is just the prompt without the tags.

The trigger reads the reply with any thinking blocks removed, so a reasoning model that writes the tag while it is still thinking does not start the Agent. Only the tag in the visible reply counts.

### 3. The Eval tool: calling the NanoGPT image API

_Eval_ runs JavaScript in a sandboxed QuickJS runtime inside Layla. A fresh runtime is created for each run and removed afterwards. It has no web page and no Node.js modules, but it provides what this Agent needs:

- `fetch` for web requests, with responses that support `.text()`, `.json()`, `.bytes()` and `.arrayBuffer()`.
- `atob`, `btoa`, and `toBase64()` on byte arrays, for base64 text.
- `setTimeout` and `AbortController`.
- A global object called `layla`, which gives scripts access to Layla's features, such as saving files.

_Eval_ returns the value of the script's last expression. If that value is a promise, _Eval_ waits for it to finish first. Whatever it returns becomes the input of the next tool.

#### The async wrapper

```js
(async () => {
  // ...
})();
```

The whole script sits inside an async arrow function that calls itself straight away. This pattern does two things. It lets the code use `await` to wait for the network, and it lets the code use `return` to hand back its result. The function call is the last expression of the script, so _Eval_ waits for the promise it returns and uses its result, the file name, as the tool's output.

#### Settings at the top

```js
const API_KEY = "YOUR_NANOGPT_API_KEY"; // https://nano-gpt.com/api
const MODEL = "hidream"; // any id from GET https://api.nano-gpt.com/api/v1/images/models
const SIZE = "1024x1024";

const PROMPT = String.raw`{{match$1}}`.trim();
const ENDPOINT = "https://api.nano-gpt.com/v1/images/generations";
```

Everything you might want to change sits in one place:

- `API_KEY` is your NanoGPT key.
- `MODEL` is the model's `id` from NanoGPT's catalog.
- `SIZE` is one of the sizes in the model's `supported_parameters.resolutions` list, written exactly as the catalog writes it.
- `ENDPOINT` is NanoGPT's OpenAI-compatible image generation address. It is the same for every model. Because it follows the format of OpenAI's image API, the same code works with other services that offer an OpenAI-compatible `images/generations` endpoint, after you change the address and the key.

`PROMPT` needs a closer look. Before the code runs, Layla replaces `{{match$1}}` with the text the trigger captured, so the image prompt becomes part of the program itself. Layla pastes the text in exactly as it is, without escaping any characters. For that reason the prompt is placed inside a template literal, the text between the backticks:

- A template literal can contain quotation marks and line breaks, which would end an ordinary `"…"` string early and break the script.
- `String.raw` keeps backslashes exactly as typed, instead of reading them as escape codes such as `\n`.
- `.trim()` removes spaces and line breaks from the start and end of the prompt.

A template literal still ends at a backtick, and `${` inside it starts a piece of code. Either one in the prompt would break the script, which is why the system prompt forbids backticks.

#### Check the inputs

```js
if (!PROMPT) throw new Error("The <stable_diffusion_prompt> tag was empty.");
if (!API_KEY || API_KEY.startsWith("YOUR_"))
  throw new Error("Set API_KEY in the NanoGPT Image Generation (JS) agent.");
```

The script stops early, with a readable message, when the tag was empty or the key has not been set. There is no point paying for a request that cannot work.

When an _Eval_ script throws an error, the Agent stops and _Display Image_ does not run. Layla passes the error message back to the language model, so in a chat your character may tell you that something went wrong. In the test screen, the message appears on the _Eval_ step.

#### Send the request

```js
const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: MODEL,
    prompt: PROMPT,
    n: 1,
    size: SIZE,
    response_format: "b64_json",
  }),
});
const text = await response.text();
```

This is the part that talks to NanoGPT:

- `fetch` sends a `POST` request to the endpoint, and `await` waits for the answer.
- The `Authorization` header carries the API key as a bearer token, which is the format NanoGPT expects. The key is not part of the web address.
- The `Content-Type` header tells NanoGPT that the body is JSON.
- `JSON.stringify` turns the request data into JSON text. `model`, `prompt` and `size` come from the settings. `n: 1` asks for one image. `response_format: "b64_json"` asks NanoGPT to send the picture itself, as base64 text, instead of a link to it.
- `response.text()` reads the whole answer as text. The script reads it as text instead of calling `response.json()` straight away, so that it can include the raw answer in an error message if something goes wrong.

NanoGPT's [image generation documentation](https://docs.nano-gpt.com/api-reference/endpoint/image-generation-openai) lists other fields you can add to the body. Some of them, such as `seed`, `guidance_scale` and `num_inference_steps`, only work with certain models.

#### Check the response status

```js
if (!response.ok)
  throw new Error(
    `nano-gpt returned HTTP ${response.status}: ${text.slice(0, 500)}`,
  );
```

`response.ok` is true when the HTTP status is in the 200s, which means the request succeeded. Otherwise the script stops and includes the status code and the first 500 characters of NanoGPT's answer in the error. NanoGPT explains the problem in that answer, so a wrong key, an empty balance or a size the model does not accept shows up as a clear message in the test screen.

#### Find the image in the response

```js
const item = (JSON.parse(text).data || [])[0];
if (!item) throw new Error(`nano-gpt returned no image: ${text.slice(0, 500)}`);
```

A successful answer from NanoGPT looks like this:

```json
{
  "created": 1795351940,
  "data": [{ "b64_json": "iVBORw0KGgo..." }],
  "cost": 0.0153,
  "remainingBalance": 4.9847
}
```

`JSON.parse` turns the text into an object. `data` is the list of images, and `[0]` takes the first one. The `|| []` part uses an empty list when `data` is missing, so the script reports "no image" instead of crashing. The answer also says what the image cost and how much balance you have left.

#### Get the image as base64

```js
let base64;
if (item.b64_json) {
  base64 = item.b64_json.replace(/^data:[^,]*,/, "");
} else if (item.url) {
  const download = await fetch(item.url);
  if (!download.ok)
    throw new Error(`Image download failed: HTTP ${download.status}`);
  base64 = (await download.bytes()).toBase64();
} else {
  throw new Error(
    `nano-gpt response had no b64_json or url: ${text.slice(0, 500)}`,
  );
}
```

Base64 is a way of writing binary data, such as a picture, as plain letters and digits. Layla's file saving function expects base64, so this block makes sure the script ends up with base64 text, whichever form NanoGPT used:

- **`b64_json`**: the usual case, because the request asked for it. The `replace` call removes a `data:image/png;base64,` prefix if one is there, because the file must contain only the base64 data. When there is no prefix, `replace` changes nothing.
- **`url`**: NanoGPT may answer with a link instead, for some models or when it cannot send base64. The script downloads the image with a second `fetch`, reads it as raw bytes with `.bytes()`, and converts the bytes to base64 with `.toBase64()`. NanoGPT's links expire after about a day, which is why the script saves a copy instead of storing the link.
- **Neither**: the script stops with an error that shows what NanoGPT sent.

#### Choose a file name

```js
const ext = base64.startsWith("/9j/")
  ? "jpg"
  : base64.startsWith("UklGR")
    ? "webp"
    : "png";
const filename = `nanogpt_${Date.now()}.${ext}`;
```

Different models return different image formats, and NanoGPT's answer does not always say which one it sent. The script works it out from the first characters of the base64 text. Every image format begins with a fixed signature, and that signature always encodes to the same base64 characters:

- `/9j/` is the start of a JPEG file.
- `UklGR` is the start of a WebP file.
- Anything else is saved as PNG, the most common format. A PNG file encodes to `iVBOR`.

`Date.now()` adds the current time in milliseconds, so every picture gets its own file name and a new image never replaces an earlier one in your chat history.

#### Save the file and return its name

```js
await layla.utils.saveFile(filename, base64);
return filename;
```

`layla.utils.saveFile` decodes the base64 text and writes the file into the character's workspace, a private folder that belongs to the character you are chatting with. The path is relative to that folder.

The script then returns the file name. That name is the output of the _Eval_ tool.

### 4. The Display Image tool

The second tool is _Display Image_, and its only setting is:

```text
{{input}}
```

`{{input}}` is replaced with the output of the previous tool, which is the file name that the script returned. _Display Image_ looks for that name in the character's workspace first, which is where the script saved it. It copies the file into Layla's chat image storage and attaches it to the character's reply, and the picture appears in the chat.

_Display Image_ returns no text, so the Agent finishes quietly once the picture is shown. The language model is not asked to reply again.

## Customise the Agent: other models, phone-sized images and AI roleplay

These changes all start from the same Agent:

- **Use a different model.** Change `MODEL` to another model's `id` and `SIZE` to one of its sizes, then test the Agent again. For anime characters, an anime SDXL model such as `wai-illustrious-sdxl` usually suits better than a photographic model.
- **Make tall pictures for your phone screen.** Set `SIZE` to a portrait size from your model's list, such as `768x1360` for HiDream or `1088x1920` for HiDream-I1 Fast.
- **Generate an image after every message.** Replace the first paragraph of the system prompt with an instruction to end every reply with an image prompt of the current scene, as in [Creating an image generation Agent](/creating-an-image-generation-agent/). This suits AI roleplay and storytelling, but every reply then costs one picture. A low-cost model such as `hidream-i1-fast` keeps the cost down.
- **Keep your AI character's images consistent.** In the character's _Scenario_, add an instruction such as: "Whenever you write a `<stable_diffusion_prompt>`, describe yourself as a woman in her late twenties with short red hair, green eyes and freckles." The model then repeats the same appearance in every prompt. Adding a fixed art style, such as "watercolor illustration", to the same instruction helps too.
- **Add generation settings.** For models that support them, add fields such as `seed: 42` to the object inside `JSON.stringify`. A fixed seed makes repeated prompts give similar pictures.
- **Write an Agent for another service.** The system prompt, the trigger and _Display Image_ stay the same for any image service. Only the request and the way the script finds the image in the answer change. The [OpenRouter Agent](/how-to-use-the-openrouter-image-generation-agent/) and the [Nano Banana Agent](/how-to-use-the-google-nano-banana-image-generation-agent/) are two more examples of the same pattern.

Only one image Agent should be switched on at a time, because they all react to the same tag.

## Troubleshooting

### Why did I get two images?

Either Layla's built-in image generation is still enabled, or another Agent that reacts to `<stable_diffusion_prompt>` is switched on. Select _No Image Generation_ in the Inference Settings and turn off other image Agents.

### The Agent says "Set API_KEY in the NanoGPT Image Generation (JS) agent."

The key placeholder is still in the code. Open the Agent, edit the _Eval_ code, and replace `YOUR_NANOGPT_API_KEY` with your key.

### Why is my NanoGPT API key not working?

When NanoGPT rejects a request, the Agent stops with an error that starts with "nano-gpt returned HTTP", followed by the status code and NanoGPT's own explanation. The usual causes are:

- **A wrong or deleted key.** Copy the key again from the [API page](https://nano-gpt.com/api), or create a new one.
- **An empty balance.** Add funds on the [Balance page](https://nano-gpt.com/balance).
- **A size or model ID the model does not accept.** Check the model's entry in the catalog and copy `id` and a size from `supported_parameters.resolutions` exactly, including whether it uses `x`, `*` or a name such as `1k`.

### The test says the Agent was not triggered

Turn on **Test as output**, and make sure the test input contains both the opening and the closing tag.

### The character never sends a picture

Check that the Agent's switch is on, so its system prompt is added to the chat. Smaller local models sometimes forget the tag. Asking directly, for example "draw me a picture of…", usually works. If the character writes the tag but no picture appears, run the Agent's **Test** with the character's exact reply to see which step fails.

### A picture was refused or came back empty

Each company applies its own content policy to its models. A prompt one model declines may work with another. The script reports the answer NanoGPT sent, so the test screen shows the reason.

## Frequently asked questions

### How do I get a NanoGPT API key?

Sign in at [nano-gpt.com](https://nano-gpt.com), add funds on the Balance page, then select **API** in the sidebar and select **Create API key**. Use the eye icon to show the key or the copy icon to copy it. NanoGPT keys start with `sk-nano-`.

### How much does NanoGPT image generation cost?

Each model has its own price, shown in NanoGPT's catalog. At the time of writing, HiDream I1 Full, the model this Agent uses by default, costs $0.0153 per image, and the cheapest models cost less than half a cent. Your NanoGPT balance shows what you have spent, and every answer from the API includes the cost of that image.

### Do I need a NanoGPT subscription for image generation?

No. NanoGPT works on a prepaid balance, and each image is paid for from it. NanoGPT also offers an optional monthly subscription, and its [pricing page](https://nano-gpt.com/pricing) lists what that includes.

### What is the NanoGPT image generation API endpoint?

The OpenAI-compatible endpoint is `https://api.nano-gpt.com/v1/images/generations`, called with `POST` and your key in the `Authorization: Bearer` header. The same endpoint serves every image model, and the `model` field chooses which one runs. The model catalog is at `https://api.nano-gpt.com/api/v1/images/models`.

### Can I use this Agent with another OpenAI-compatible image generation API?

Usually, yes. Change `ENDPOINT` to the other service's `images/generations` address, `API_KEY` to its key, and `MODEL` and `SIZE` to values it accepts. The script already handles both answer formats that OpenAI-compatible image APIs use, `b64_json` and `url`.

### Which NanoGPT image models allow mature content?

NanoGPT's catalog marks each model with a `capabilities.nsfw` field. At the time of writing, 37 of its text-to-image models are marked `true`, including HiDream O1 Image, Qwen Image 3 Uncensored and several anime and realistic SDXL models such as WAI Illustrious SDXL. Check this field for the model you choose before you rely on it. NanoGPT's terms of service still apply to every request. For image generation with no outside service involved at all, use Layla's [local Stable Diffusion models](/how-to-enable-image-generation-in-layla/).

### Can I use NanoGPT for the chat as well as the images?

Yes. NanoGPT serves language models through an OpenAI-compatible API at `https://api.nano-gpt.com/api/v1`. Add it in Layla with the same key, as described in [How to connect Layla to any OpenAI-compatible API](/how-to-connect-layla-to-any-openai-compatible-api/), and this Agent adds the pictures.

### Is there a NanoGPT app for Android?

NanoGPT is a website and an API. Layla is an Android app that works with it: it can chat with NanoGPT's language models through its OpenAI-compatible API connection, and generate pictures with NanoGPT's image models through this Agent.

### Can I use my SillyTavern characters with NanoGPT image generation?

Yes. SillyTavern has a built-in NanoGPT image source, and this Agent gives you a similar setup in a chat app on your phone. Layla imports [TavernPNG character cards](/how-to-import-tavernpng-characters-in-layla/), the format SillyTavern uses, and [SillyTavern presets](/how-to-use-sillytavern-presets-in-layla/), and this Agent works with any character.

### Can an AI chatbot send pictures on Android?

Yes. With this Agent, a Layla character sends a picture whenever you ask for one, or after every message if you set it up that way. Layla can also send pictures without any cloud service, using Stable Diffusion models that run on your phone, as described in [How to enable image generation in Layla](/how-to-enable-image-generation-in-layla/).

### Do I need the Python Interpreter mini-app?

No. The Agent uses the _Eval_ tool, which runs JavaScript inside Layla itself.

### Is my prompt private?

The image prompt is sent to NanoGPT and to the company that runs the model you chose. NanoGPT's [privacy policy](https://nano-gpt.com/legal/privacy-policy) states that it does not store prompt content on its servers by default, but its documentation also says that the companies that run image models may keep prompts and images under their own policies. If you chat with a local model, the rest of your conversation stays on your device.

### Can I use this Agent without an internet connection?

No. The Agent calls NanoGPT's servers. For image generation that runs entirely on your phone, use one of the local models described in [How to enable image generation in Layla](/how-to-enable-image-generation-in-layla/).

### Where are the generated images stored?

The script saves each image in the character's workspace folder, and _Display Image_ copies it into Layla's chat image storage, so the picture stays in your chat history.

## Conclusion

The NanoGPT Agent uses the same four pieces as any image generation Agent in Layla: a system prompt that asks for a tagged image prompt, a regex trigger that catches it, a short script that exchanges the prompt for an image, and _Display Image_ to put the result in your chat. Because NanoGPT serves over 200 image models through one endpoint, the same script gives your AI characters HiDream, FLUX, SDXL or GPT Image pictures by changing two lines.

Layla is built as an offline AI assistant for Android, and its local models remain the choice for fully private, offline chat and image generation. NanoGPT image generation is an option for when you want a particular online model in your chats and accept the connection and the cost per picture.

## Download the Agent

<div class="file-download">
  <div class="file-download-info">
    <span class="file-download-label">Agent file</span>
    <span class="file-download-name">nanogpt-generate-image.json</span>
    <span class="file-download-hint">Use the <em>Import</em> button in the Agents mini-app to import it, then add your API key.</span>
  </div>
  <a class="file-download-button" href="/assets/articles/how-to-create-a-nanogpt-image-generation-agent-in-layla/nanogpt-generate-image.json" download="nanogpt-generate-image.json"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>Download</a>
</div>
