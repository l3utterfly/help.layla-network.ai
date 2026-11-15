---
title: "Stable Diffusion WebUI on Android: connect AUTOMATIC1111 to Layla"
description: Use Stable Diffusion WebUI on Android. Connect AUTOMATIC1111 to Layla, enable the API, add a Web UI model in Local Dream, and edit the request JSON template.
category: Image generation
order: 17
keywords:
  - Stable Diffusion WebUI Android
  - Stable Diffusion WebUI on Android
  - Stable Diffusion WebUI Android client
  - Stable Diffusion Android app
  - AUTOMATIC1111 Android
  - AUTOMATIC1111 Android app
  - AUTOMATIC1111 mobile
  - AUTOMATIC1111 API
  - AUTOMATIC1111 API on phone
  - connect Stable Diffusion WebUI to phone
  - access Stable Diffusion WebUI from phone
  - use Stable Diffusion on your phone
  - use Stable Diffusion from your phone
  - run Stable Diffusion on Android
  - Stable Diffusion remote access phone
  - Stable Diffusion on local network
  - Stable Diffusion API on local network
  - Stable Diffusion WebUI listen on network
  - stable-diffusion-webui --api
  - stable-diffusion-webui --listen
  - sdapi/v1/txt2img
  - txt2img API request body
  - Stable Diffusion WebUI API settings
  - Stable Diffusion WebUI API JSON
  - Stable Diffusion WebUI Forge Android
  - Stable Diffusion SDXL on Android
  - Stable Diffusion LoRA on phone
  - Stable Diffusion hires fix API
  - override_settings sd_model_checkpoint
  - AI image generator for Android
  - AI image generator app
  - text-to-image app
  - AI character image generation
  - Local Dream
  - Layla image generation
lastUpdated: 2026-11-15
---

**Layla is an Android app that works as a client for AUTOMATIC1111 Stable Diffusion WebUI: your phone sends the prompt over your network to the WebUI on your own PC, and the PC does the rendering.** You turn on the WebUI's API, add a _Web UI_ model in the Local Dream mini-app, and Layla builds each request from a JSON template that you can edit. The image appears in Local Dream and in your chats, the same as with any other Layla image model.

AUTOMATIC1111 is a web interface for a computer and does not ship an Android app of its own. This connection is how you use Stable Diffusion WebUI on Android: you keep the checkpoints, LoRAs and extensions you already set up in the WebUI, and you generate from your phone. This guide covers starting the WebUI with its API enabled, adding the model in Local Dream, the request template and every placeholder in it, ready-to-use templates for SD 1.5, SDXL, LoRAs and hires fix, and fixes for the usual connection errors.

Unlike Layla's on-device models, this method needs the PC to be switched on and reachable from the phone while you generate. The prompt and the image travel over your local network to your own computer, not to an online service, so the connection does not need internet access.

## Why use Stable Diffusion WebUI on Android with Layla?

Layla can also run Stable Diffusion on the phone itself, so this is one of two ways to get an AI image generator for Android in Layla. The WebUI connection suits these cases:

- **You already have a Stable Diffusion setup.** Your checkpoints, LoRAs, embeddings and extensions such as ControlNet or ADetailer stay on the PC and are available from the phone.
- **Your PC has a faster graphics card than your phone.** The PC renders, so the speed of the phone's processor does not limit the image size, the step count or the model.
- **You want models a phone cannot run.** Large SDXL checkpoints and heavy extensions run on a desktop GPU without any conversion.
- **There is no per-image cost.** You generate with your own hardware, with no credits and no account.
- **It works in chat.** A Web UI model can be the image model for Layla or for a single character, so your characters can send you pictures made by your own PC.

|                        | On-device model                              | Web UI connection                     |
| ---------------------- | -------------------------------------------- | ------------------------------------- |
| Where images are made  | On your phone                                | On your PC                            |
| Needs a PC and network | No                                           | Yes, the PC must be on and reachable  |
| Models                 | Models Layla can import and run on the phone | Anything your WebUI can load          |
| Settings               | Layla's controls                             | Layla's controls plus a JSON template |

[How to import custom image generation models into Layla](/how-to-import-custom-image-generation-models-into-layla/) covers the on-device route, including Civitai checkpoints and LoRAs.

## How Layla talks to the Stable Diffusion WebUI

The WebUI has an HTTP API that is separate from its browser page. Layla uses one call from it:

```text
Layla (phone)                         Stable Diffusion WebUI (PC)
  |  POST /sdapi/v1/txt2img               |
  |  JSON body built from your template -> |  renders the image
  |  <- JSON with "images": [base64]      |
  |  saves the first image, shows it      |
```

When you tap **Generate**, Layla takes your template, replaces the placeholders such as `{prompt}` and `{steps}` with your current settings, and sends the result as the body of a `POST` request to the endpoint you entered. The WebUI answers with the image encoded as base64 text in an `images` list. Layla decodes the first one and saves it as a normal image file. If you filled in an API key, Layla sends it in an `Authorization: Bearer` header.

Nothing else is sent. Layla does not switch the model, set a sampler or choose a size on its own. Everything the WebUI needs to know is in the template.

## What you need

- A PC with the [AUTOMATIC1111 Stable Diffusion WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui) installed and able to generate an image in its own browser page. Forks that keep the same API, such as Forge, usually accept the same requests.
- Your phone and PC on the same network, for example the same Wi-Fi.
- Layla with the **Local Dream** mini-app installed. [How to enable image generation in Layla](/how-to-enable-image-generation-in-layla/) shows how to install it, and [How to enable or disable mini-apps within Layla](/how-to-enable-disable-mini-apps-within-layla/) explains where mini-apps live.

## Step 1: Enable the Stable Diffusion WebUI API (--api and --listen)

The API is off by default. Add the `--api` flag, and add `--listen` so the WebUI accepts connections from other devices and not only from the PC itself. Both go in the `COMMANDLINE_ARGS` line of the WebUI's launcher file, which is `webui-user.bat` on Windows and `webui-user.sh` on Linux:

```text
set COMMANDLINE_ARGS=--api --listen
```

If you already have other arguments on that line, add these two to them rather than replacing them. Start the WebUI with that file. By default it listens on port `7860`.

You can check that the API is running by opening `http://localhost:7860/docs` in a browser on the PC. It lists the available API calls, including `/sdapi/v1/txt2img`.

### Find the PC's address and allow the port

The phone cannot use `localhost`, because that would mean the phone itself. It needs the PC's address on your network:

1. On Windows, open a terminal and run `ipconfig`. Look for the **IPv4 Address** of your Wi-Fi or Ethernet adapter. It looks like `192.168.1.50`.
2. If Windows Defender Firewall asks whether to allow Python on private networks, allow it. If it did not ask and the phone cannot connect later, add an inbound rule for TCP port `7860`.
3. On the phone, open `http://192.168.1.50:7860` in a browser, using your own address. If the WebUI page loads, the phone can reach it and the same address will work in Layla.

Your endpoint is that address followed by the txt2img path, for example:

```text
http://192.168.1.50:7860/sdapi/v1/txt2img
```

The route is spelled `txt2img`. Layla's placeholder text on the endpoint field says `text2img`, which is not a route the WebUI has.

### A note on API keys and security

`--listen` makes the WebUI reachable by every device on your network, and the API has no login unless you add one. Use it on a network you trust, and do not forward port `7860` to the internet.

The WebUI's own `--api-auth` option sets a username and password, but it uses HTTP Basic authentication, and Layla sends its API key as a Bearer token. The two do not match, so leave the **API Key** field empty for a plain WebUI. The field is for setups where something in front of the WebUI, such as a reverse proxy, checks a Bearer token.

## Step 2: Add the WebUI to Layla as a Web UI model in Local Dream

1. Open the **Local Dream** mini-app.
2. Tap **Add Model** at the top right. The Add Image Model screen opens with three tabs: Safetensor, Zip and Web UI.
3. Select the **Web UI** tab.

![The Web UI tab of Layla's Add Image Model screen with Name, Endpoint, API Key, and Model fields for an Automatic1111-compatible Stable Diffusion API.](./connect-stable-diffusion-web-ui-api-layla.jpg)

4. Fill in the fields:
   - **Name**: any label you will recognise, for example `PC SDXL`. This is the name shown in the model list.
   - **Endpoint**: the full address from Step 1, for example `http://192.168.1.50:7860/sdapi/v1/txt2img`.
   - **API Key**: leave it blank for a normal WebUI.
   - **Model**: see the note below. You can leave it blank.
5. Tap **Save & Select**.

Name and Endpoint are required. If either is empty, Layla asks you to provide at least a name and an API endpoint.

The model is saved to your image models and selected right away. It needs no download, so it is ready as soon as the WebUI is running. New Web UI models start with 20 steps, a CFG scale of 7, and an empty negative prompt, and you can change all three in Local Dream.

### What the Model field does

The WebUI renders with whichever checkpoint it has loaded. In the current version of Layla, the text in the **Model** field is stored with the connection but is not added to the request, so typing a checkpoint name there does not switch the WebUI's model. To choose a checkpoint from Layla, put it in the request template, as shown in the [SDXL template](#template-sdxl-with-a-chosen-checkpoint) below.

### Add one connection for each setup

Every Web UI model keeps its own settings, including its own request template. You can add the same endpoint several times under different names, for example one connection for an SD 1.5 anime checkpoint and one for an SDXL photo checkpoint, each with a template that selects the right checkpoint and image size. Switching between them in Local Dream then switches the whole setup. To change a connection's name, endpoint or key later, open the model list and tap the pencil icon on its card.

## Step 3: Generate Stable Diffusion images from your phone

With the Web UI model selected, Local Dream shows the same controls as for other models:

1. Enter a prompt and, if you like, a negative prompt.
2. Set **Steps**, **CFG Scale** and **Seed**. A seed of `-1` picks a random one.
3. Tap **Generate**.

![The Local Dream parameters in Layla: Size, Scheduler, Steps, CFG Scale, Seed, Auto Upscale and the Advanced Settings section.](./local-dream-image-generation-settings.jpg)

The phone waits while the PC renders, so the time depends on your graphics card and settings, not on the phone. A progress preview is not available for Web UI models, because the request returns only when the image is finished. If **Auto Upscale** is turned on, Layla runs the upscaler on the phone after the image arrives.

A few controls do not apply to a Web UI model:

- **Size** offers a single 512×512 option. To render at another size, set `width` and `height` in the template, as described below.
- **Scheduler** is for Layla's on-device models. It is not sent to the WebUI. To choose a sampler or scheduler, set them in the template.
- **Image to image** is not available. Layla's Web UI connection only calls txt2img.

## The Stable Diffusion WebUI API request template (JSON)

The template is the JSON that Layla sends to the WebUI. Select a Web UI model in Local Dream, open **Advanced Settings**, and scroll to **WEBUI API BODY TEMPLATE**. The text box holds the whole request body, and you can edit it freely. Layla saves the change automatically a moment after you stop typing, and it applies to that model only.

**Reset All Settings** at the bottom of Advanced Settings puts the template back to Layla's default, along with the other settings of that model.

### The default template

This is the template every new Web UI model starts with. It lists almost every field the txt2img API accepts:

```json
{
  "prompt": "{prompt}",
  "negative_prompt": "{negativePrompt}",
  "styles": [],
  "seed": {seed},
  "subseed": -1,
  "subseed_strength": 0,
  "seed_resize_from_h": -1,
  "seed_resize_from_w": -1,
  "sampler_name": "Euler A",
  "scheduler": "",
  "batch_size": 1,
  "n_iter": 1,
  "steps": {steps},
  "cfg_scale": {cfg},
  "width": {width},
  "height": {height},
  "restore_faces": true,
  "tiling": false,
  "do_not_save_samples": false,
  "do_not_save_grid": false,
  "eta": 0,
  "denoising_strength": 0,
  "s_min_uncond": 0,
  "s_churn": 0,
  "s_tmax": 0,
  "s_tmin": 0,
  "s_noise": 0,
  "override_settings": {},
  "override_settings_restore_afterwards": true,
  "refiner_checkpoint": "",
  "refiner_switch_at": 0,
  "disable_extra_networks": false,
  "firstpass_image": "",
  "comments": {},
  "enable_hr": false,
  "firstphase_width": 0,
  "firstphase_height": 0,
  "force_task_id": "",
  "sampler_index": "",
  "script_name": "",
  "script_args": [],
  "send_images": true,
  "save_images": false,
  "alwayson_scripts": {},
  "infotext": ""
}
```

You do not need all of it. Any field you leave out takes the WebUI's own default, so a short template is easier to read and to maintain. The next sections cover the placeholders first and then the fields most worth changing.

### The placeholders

Seven placeholders are replaced with your settings each time you generate. Every other piece of text in the template is sent as it is.

| Placeholder        | Replaced with                                                                     | How to write it                     |
| ------------------ | --------------------------------------------------------------------------------- | ----------------------------------- |
| `{prompt}`         | Your prompt, with the Prompt Prefix added in front                                | Inside quotes: `"{prompt}"`         |
| `{negativePrompt}` | The negative prompt                                                               | Inside quotes: `"{negativePrompt}"` |
| `{seed}`           | The Seed field. If it is `-1` or `0`, Layla picks a random number below 1,000,000 | No quotes                           |
| `{steps}`          | The Steps field                                                                   | No quotes                           |
| `{cfg}`            | The CFG Scale field                                                               | No quotes                           |
| `{width}`          | The selected width, which is 512 for a Web UI model                               | No quotes                           |
| `{height}`         | The selected height, which is 512 for a Web UI model                              | No quotes                           |

Some rules follow from how Layla fills them in:

- **Quote the text placeholders and not the numbers.** Layla escapes quotes and line breaks inside your prompt so they cannot break the JSON, and it expects `{prompt}` and `{negativePrompt}` to sit inside a string. The number placeholders become bare numbers, so `"steps": {steps}` is correct and `"steps": "{steps}"` sends the steps as text.
- **The result must be valid JSON.** Layla does not check it. A missing comma or a trailing comma makes the WebUI return an error instead of an image.
- **Every occurrence is replaced.** If you write `{prompt}` in two places, both are filled in.
- **There is no `{scheduler}` or `{model}` placeholder.** Write the sampler, scheduler or checkpoint directly in the template.

### What Layla does to the prompt first

Before the prompt reaches `{prompt}`, Layla prepares it for Stable Diffusion's comma-separated style:

1. The **Prompt Prefix** from Advanced Settings is added in front, followed by a comma.
2. The whole prompt is converted to lowercase.
3. The text is split at commas and a tag that appears twice is kept once.

The negative prompt is also lowercased. Weights such as `(detailed eyes:1.2)` pass through unchanged.

Text you type directly into the template is not touched. This matters for LoRAs, because LoRA names can be case-sensitive on the PC. Write a tag like `<lora:MyStyle:0.8>` in the template, not in Layla's prompt box, and it keeps its capital letters. The [LoRA template](#template-lora-and-fixed-quality-tags) below does this.

### The fields worth changing

| Field                  | What it does                                                                                                                                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sampler_name`         | The sampler. The WebUI expects a name exactly as it lists it, for example `Euler a`. Layla's default is `Euler A`, so if the WebUI reports an unknown sampler, copy the name from its **Sampling method** list. |
| `scheduler`            | The noise schedule in WebUI 1.9 and newer, for example `Karras`. An empty string leaves it on the default.                                                                                                      |
| `restore_faces`        | Runs a face-restoration model on the result. It is `true` in Layla's default. Set it to `false` for stylised or anime checkpoints, where it can change the look of faces.                                       |
| `width`, `height`      | The output size. Set numbers here to render above 512×512. Use sizes your checkpoint was trained for, such as 1024 for SDXL.                                                                                    |
| `batch_size`, `n_iter` | How many images the WebUI makes per request. Layla only uses the first, so keep both at `1`.                                                                                                                    |
| `override_settings`    | Settings applied to this request only. It is how you choose the checkpoint.                                                                                                                                     |
| `enable_hr`            | Turns on hires fix, which renders small and then upscales with a second pass.                                                                                                                                   |
| `send_images`          | Must stay `true`. Layla reads the picture from the response.                                                                                                                                                    |
| `save_images`          | Whether the WebUI also keeps a copy on the PC. It is `false` by default.                                                                                                                                        |
| `alwayson_scripts`     | Arguments for extensions, such as ControlNet or ADetailer, if you have them installed.                                                                                                                          |

The WebUI's [API documentation](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API) describes the request, and the `/docs` page of your own WebUI lists every field your installed version accepts.

## Ready-to-use templates

Copy one into the template box and adjust it. Each is complete, valid JSON.

### Template: minimal SD 1.5

The smallest useful template. The WebUI fills in everything that is not listed.

```json
{
  "prompt": "{prompt}",
  "negative_prompt": "{negativePrompt}",
  "seed": {seed},
  "steps": {steps},
  "cfg_scale": {cfg},
  "width": {width},
  "height": {height},
  "sampler_name": "Euler a",
  "restore_faces": false,
  "send_images": true,
  "save_images": false
}
```

### Template: SDXL with a chosen checkpoint

SDXL renders at about 1024×1024, so the template sets the size itself. The `override_settings` block loads the named checkpoint for this request, and `override_settings_restore_afterwards` puts the WebUI's previous checkpoint back when it is done.

```json
{
  "prompt": "{prompt}",
  "negative_prompt": "{negativePrompt}",
  "seed": {seed},
  "steps": {steps},
  "cfg_scale": {cfg},
  "width": 1024,
  "height": 1024,
  "sampler_name": "DPM++ 2M",
  "scheduler": "Karras",
  "restore_faces": false,
  "override_settings": {
    "sd_model_checkpoint": "your-sdxl-checkpoint.safetensors"
  },
  "override_settings_restore_afterwards": true,
  "send_images": true,
  "save_images": false
}
```

Replace `your-sdxl-checkpoint.safetensors` with the checkpoint's name as the WebUI shows it. The WebUI also accepts the file name without the extension. If you always use the same checkpoint, it is faster to load it once in the WebUI and remove `override_settings`, because a request that names a different checkpoint than the loaded one makes the WebUI load it first, which adds time to every image.

### Template: LoRA and fixed quality tags

Text written in the template is sent exactly as typed. Use that for a LoRA tag and for quality tags you always want, and keep the box in Layla for what changes between images:

```json
{
  "prompt": "masterpiece, best quality, <lora:MyStyle:0.8>, {prompt}",
  "negative_prompt": "{negativePrompt}",
  "seed": {seed},
  "steps": {steps},
  "cfg_scale": {cfg},
  "width": {width},
  "height": {height},
  "sampler_name": "Euler a",
  "restore_faces": false,
  "send_images": true,
  "save_images": false
}
```

Here `MyStyle` is the LoRA's name in the WebUI. The tag keeps its capitals, and only the `{prompt}` part is converted to lowercase.

### Template: hires fix

Hires fix renders at the base size and then upscales and refines the result, which gives a sharper image without the repeated subjects that a large first pass can cause. It takes noticeably longer.

```json
{
  "prompt": "{prompt}",
  "negative_prompt": "{negativePrompt}",
  "seed": {seed},
  "steps": {steps},
  "cfg_scale": {cfg},
  "width": {width},
  "height": {height},
  "sampler_name": "Euler a",
  "restore_faces": false,
  "enable_hr": true,
  "hr_scale": 2,
  "hr_upscaler": "Latent",
  "hr_second_pass_steps": 10,
  "denoising_strength": 0.5,
  "send_images": true,
  "save_images": false
}
```

Layla's default template sets `denoising_strength` to `0`, which is fine when hires fix is off. When you turn it on, set a value such as `0.5` or the second pass will change nothing. A 512×512 base with `hr_scale` of `2` gives a 1024×1024 image.

## Tips for a reliable setup

- **Test in the WebUI first.** If a combination of checkpoint, sampler and size works in the WebUI's browser page, the same values work in the template. The WebUI's **PNG Info** tab shows the settings of an image it made.
- **Keep the PC awake.** If the PC sleeps, the phone gets a connection error. Switch off sleep while you generate.
- **Give the PC a fixed address.** If your router changes the PC's address, the saved endpoint stops working. Reserve an address for the PC in your router's settings, or edit the endpoint from the model list when it changes.
- **Use the Prompt Prefix for words you always want.** It is added before every prompt and, like the rest of the prompt, converted to lowercase. For anything case-sensitive, put it in the template instead.
- **Use the connection in chat as well.** Once a Web UI model exists, you can set it as Layla's image model or as the image model of one character. [How to enable image generation in Layla](/how-to-enable-image-generation-in-layla/) covers where to choose it.

## Frequently asked questions

### How can I use Stable Diffusion WebUI on my Android phone?

Run the WebUI on a PC with `--api --listen`, then add it in Layla's Local Dream mini-app as a **Web UI** model, using the PC's address followed by `/sdapi/v1/txt2img`. The phone sends the prompt, the PC renders the image, and Layla shows it. Opening the WebUI page in the phone's browser also works, but then you use the WebUI's own page and not Layla's chat and image tools.

### Is there an AUTOMATIC1111 app for Android?

AUTOMATIC1111 is a web interface that runs on a computer, and it does not ship an Android app. Layla acts as an Android client for it: its Web UI model sends txt2img requests to your WebUI and shows the pictures it returns, and it also lets your characters use the WebUI in chat.

### Can I run Stable Diffusion on Android without a PC?

Yes, but not with a Web UI connection, which needs the WebUI to run on a computer. Layla can run Stable Diffusion on the phone with its on-device models, with no PC and no internet connection. [How to enable image generation in Layla](/how-to-enable-image-generation-in-layla/) covers them.

### How do I enable the Stable Diffusion WebUI API?

Start the WebUI with the `--api` flag, normally by adding it to `COMMANDLINE_ARGS` in `webui-user.bat` or `webui-user.sh`. Add `--listen` as well so other devices on your network, such as your phone, can reach it. You can confirm it works by opening `/docs` on the WebUI's address.

### What is the Stable Diffusion WebUI API endpoint for Layla?

The WebUI's address followed by `/sdapi/v1/txt2img`, for example `http://192.168.1.50:7860/sdapi/v1/txt2img`. Use the PC's address on your network and not `localhost`, because on the phone `localhost` refers to the phone.

### Can I access Stable Diffusion WebUI from my phone when I am away from home?

Only if the phone can reach the PC. At home, the same Wi-Fi is enough, and mobile data does not reach the PC on its own. Away from home you would need a private connection to your home network, such as a VPN. Do not expose the WebUI directly to the internet, because its API has no login by default. For images away from home with nothing to set up, Layla's on-device models work on mobile data or with no connection at all.

### Does Layla work with Forge, reForge or SD.Next?

Layla only sends a txt2img request in the AUTOMATIC1111 format, so any server that accepts the same request at `/sdapi/v1/txt2img` can work. Forks differ in which fields and sampler names they accept, so check the `/docs` page of yours and adjust the template.

### How do I use SDXL, a different checkpoint, a LoRA or another sampler with the WebUI API?

Edit the template. Add the checkpoint under `override_settings` as `"sd_model_checkpoint"`, write the LoRA tag into the `prompt` line, and set `sampler_name` and `scheduler` to names the WebUI lists. For an SDXL checkpoint, also set `width` and `height` to around 1024. The templates above show each one.

### How do I generate larger images?

Set `width` and `height` to numbers in the template. A Web UI model in Layla only offers a 512×512 size button, which is the value used for `{width}` and `{height}`, so fixed numbers in the template are the way to go above that. For SDXL checkpoints use around 1024×1024. For more detail on an SD 1.5 checkpoint, turn on hires fix.

### Why is my image generation failing with "Failed to generate image"?

Layla shows the WebUI's own status code and message after that text, which tells you what went wrong. A `404` usually means the API is not enabled or the endpoint path is misspelled, so check `--api` and `txt2img`. A `422` means the WebUI rejected the request body: a field has the wrong type, a name is misspelled, or the JSON is invalid. A `500` means the WebUI hit an error while rendering, and its console window on the PC shows the reason, such as an unknown sampler or an out-of-memory error.

### Why can't my phone connect to Stable Diffusion WebUI? (network request failed)

The phone could not reach the PC. Check that the WebUI is running, that it was started with `--listen`, that the phone and PC are on the same network, that the IP address in the endpoint is current, and that the firewall allows port `7860`. Opening the WebUI address in the phone's browser is the quickest test.

### Why does Layla say "No images returned"?

The WebUI answered successfully but the response had no image list. Check that `send_images` is `true` in the template and that nothing in `alwayson_scripts` stops the image from being returned.

### Why is my LoRA ignored?

Layla converts the prompt to lowercase, so a LoRA tag typed in the prompt box can stop matching a name that has capital letters. Put the tag in the template's `prompt` line instead, where it is sent as typed, and make sure the name matches the one in the WebUI.

### Is image generation through the WebUI private?

The prompt and the image go from your phone to your own PC over your network, and Layla does not send them to an online service. Nothing leaves your network unless you set up remote access yourself. For generation that needs no PC at all, use Layla's on-device models, described in [How to enable image generation in Layla](/how-to-enable-image-generation-in-layla/).

### Can I use this in chat so my character sends pictures?

Yes. A Web UI model is an image model like any other. Select it as the default image generation model in Inference Settings, or choose it for a single character in the **Advanced** tab of the character editor. The PC must be on and the WebUI running when the character generates a picture.

## Conclusion

A Web UI model lets you use Stable Diffusion WebUI on Android by turning the AUTOMATIC1111 install on your PC into an image generator for Layla. The WebUI needs `--api` and `--listen`, Local Dream needs the address of its `txt2img` endpoint, and the request template decides everything else: the checkpoint, the sampler, the size, the LoRAs and hires fix. Keeping a short template for each setup, saved as separate connections, lets you switch between them from the model list.

Layla is built as an offline AI assistant for Android, and its on-device models remain the way to run Stable Diffusion on your phone with no PC and no network. The WebUI connection is for the case where you already have a Stable Diffusion setup on a computer you own and want it available in your chats and in Local Dream.
