---
title: How to enable offline AI image generation in Layla
description: Generate AI images offline on Android and iPhone with Layla. Install Local Dream and run Stable Diffusion, SDXL, FLUX or Z-Image models on your phone.
category: Image generation
order: 10
keywords:
  - offline AI image generator
  - AI image generator for Android
  - AI image generator for iPhone
  - AI image generator app
  - AI art generator
  - text to image app
  - Stable Diffusion on Android
  - run Stable Diffusion locally
  - run Stable Diffusion on your phone
  - run Stable Diffusion offline
  - on-device image generation
  - local image generation
  - private AI image generator
  - AI image generator no internet
  - AI image generator with no subscription
  - Layla image generation
  - Local Dream
  - SDXL on Android
  - FLUX on Android
  - FLUX.2 Klein
  - Z-Image Turbo
  - Qwen Image
  - Snapdragon NPU
  - Civitai models on Android
  - Stable Diffusion LoRA
  - import Stable Diffusion models
  - text-to-image
  - image-to-image
  - AI inpainting
  - AI upscaler
  - Layla Cloud
  - Automatic1111
  - character images
  - AI character that sends pictures
  - AI companion image generation
  - per-character image generation
lastUpdated: 2026-11-03
---

**Layla is an offline AI image generator for Android and iPhone. Install the Local Dream mini-app and Layla runs Stable Diffusion, SDXL, FLUX, Z-Image, and other text-to-image models directly on your phone, with no internet connection and no account.** Because the images are made on your device, your prompts and pictures stay on it, and no online service reviews what you generate.

This is the overview article for image generation in Layla. It walks through the whole path in order: installing Local Dream, choosing a model, importing your own, what the different model types are, the generation settings, and how to set the model Layla and each of your characters use in chat. Each section links to a longer guide where one exists.

## Why generate AI images on your phone with Layla

- **It works offline.** After you download a model, you can run Stable Diffusion locally with no internet connection. Airplane mode is fine.
- **It is private.** Prompts and generated images are not sent to any server, so there is no account, upload, or online moderation step.
- **There are no credits or per-image charges.** On-device generation has no daily limit and no pay-per-image fee. You are limited by your phone's storage and speed, not by a quota.
- **You choose the model.** Pick from a built-in list that runs from small SD 1.5 models to FLUX.2 Klein and Z-Image Turbo, or import your own [Civitai](https://civitai.com/) checkpoints and LoRAs.
- **It uses your phone's AI hardware.** On supported Snapdragon phones, models can run on the NPU, which is usually much faster than the CPU.
- **It is built into chat.** Your characters can send you pictures during a conversation, using the model you choose for them.

## Three ways to generate AI images in Layla

| Method                  | Where images are made         | Needs internet               | Cost                                          |
| ----------------------- | ----------------------------- | ---------------------------- | --------------------------------------------- |
| On your device          | Your phone's CPU, GPU, or NPU | Only to download a model     | No per-image cost                             |
| Layla Cloud             | Layla's servers               | Yes, and a Layla Cloud login | A monthly allowance that depends on your plan |
| Stable Diffusion Web UI | A PC on your network          | Your local network           | No per-image cost, but you run the PC         |

The first method is what most of this article covers. It is the one that keeps your prompts and images entirely on your phone. [How to switch between a local LLM and Layla Cloud](/how-to-switch-between-local-llm-and-layla-cloud/) covers moving between Layla Cloud and models on your device.

## Install Local Dream, the offline image generation mini-app

Local Dream is the mini-app that does the on-device generating. It is an optional feature, so it is not installed by default.

1. Open Layla's mini-apps screen (**Browse Apps**) and find **Local Dream**. [How to enable or disable mini-apps within Layla](/how-to-enable-disable-mini-apps-within-layla/) shows where mini-apps live.
2. Tap it and read the description. The page shows the size of the additional download, which is about 54 MB and small compared to a model.
3. Tap **Download**.
4. Open the mini-app. The header reads _On-device image generation_.

![The Local Dream mini-app page in Layla's Browse Apps screen, showing its description, a 54 MB additional download, and the Download button.](./install-local-dream-mini-app-layla.jpg)

If a Layla update ships a newer engine, the mini-app shows that it needs an update. Update it from the mini-apps screen before you generate or import anything.

Uninstalling Local Dream deletes every image model stored in it, including models you imported. Layla asks you to confirm first.

## Choose and download an AI image model

At the top of the Local Dream screen is the model card. Tap it, or its arrow, to open the **Select Model** list.

![Local Dream's Select Model list with a search box, Downloaded, CPU, NPU, and Cloud filter chips, a Tags filter, and model cards such as SD1.5 Base and DreamShaper.](./select-image-generation-model-local-dream.jpg)

- **Search** finds a model by name.
- **Filter chips** narrow the list to **Downloaded**, **CPU**, **NPU**, or **Cloud** models. **Tags** filter by style, for example _realistic_, _anime_, or _sdxl_.
- Each card shows a download icon until the model is on your phone, then a check mark. A small badge in the corner tells you whether it runs on the CPU, the NPU, or in the cloud.

Select a model, then tap **Download Model**. Models are large, ranging from roughly 1 GB for an SD 1.5 model to well over 10 GB for the biggest NPU models, so use Wi-Fi and check your free storage first. The download stays on your phone, and you can **Delete Model** at any time to get the space back.

You do not have to guess which models your phone can run. Layla reads your chip, and if a model needs hardware yours does not report, it shows a warning above the **Generate** button. The warning is advisory: you can still try the model.

## Import custom Stable Diffusion models from Civitai

If the built-in list does not have the style you want, you can import your own. There are two ways to reach the same **Add Image Model** screen:

- In Local Dream, tap **Add Model** at the top of the screen.
- Go to **Settings** → **Inference Settings**, scroll to **Image Generation**, and tap **Add Custom Model**.

![The Add Image Model screen in Layla with Safetensor, Zip, and Web UI tabs, a Base Model selector set to SD1.5, and a button to pick a safetensors or GGUF checkpoint.](./import-custom-image-model-safetensor-layla.jpg)

The screen offers up to three tabs:

- **Safetensor**: pick a `.safetensors` checkpoint, for example from [Civitai](https://civitai.com/) or [Hugging Face](https://huggingface.co/), and Layla converts it on your phone. On Android it can also take a `.gguf` diffusion model. You choose the base model the checkpoint was trained from, and you can add LoRAs.
- **Zip**: import a model someone has already converted and packaged for Layla.
- **Web UI**: connect to an AUTOMATIC1111 Stable Diffusion Web UI on your PC by entering its API address.

On iPhone, the Safetensor tab accepts SD 1.5 checkpoints only. On a phone with a supported Qualcomm NPU, the tab also shows a notice suggesting you convert the checkpoint for faster generation.

For the full walkthrough, see [How to import custom image generation models into Layla](/how-to-import-custom-image-generation-models-into-layla/). For a step-by-step example with screenshots, see [How to import SD1.5 Safetensor models from Civit.ai into Layla](/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/). If your phone has a supported Snapdragon chip, [NPU Forge](/how-to-convert-safetensors-to-qnn-with-npu-forge-in-layla/) can convert SD 1.5 and SDXL checkpoints so they run on the NPU instead of the CPU.

## Supported AI image models: Stable Diffusion, SDXL, FLUX, Z-Image, and more

Layla groups models by the hardware that runs them. The badge on each model card shows the group.

| Model type                           | Examples in the built-in list                                                                    | Runs on           | Platforms                        |
| ------------------------------------ | ------------------------------------------------------------------------------------------------ | ----------------- | -------------------------------- |
| SD 1.5 (CPU)                         | SD1.5 Base, DreamShaper, RealCartoon, Pastel-Mix                                                 | CPU, optional GPU | Android and iOS                  |
| SD 1.5 (NPU)                         | CyberRealistic, Realistic Vision Hyper, Reliberate, ToonYou                                      | Snapdragon NPU    | Android                          |
| SDXL (CPU)                           | SDXL Turbo, AnimeMix XL, IntoRealism                                                             | CPU               | Android; IntoRealism also on iOS |
| SDXL (NPU)                           | Pony Realism V23, Illustrious V17, Nova Anime XL V10                                             | Snapdragon NPU    | Android                          |
| Newer diffusion transformers (NPU)   | Z-Image Turbo, FLUX.2 Klein 4B and 9B, Qwen Image 2.1, Krea 2 Turbo, MOSS-Image, IntoRealism ZIT | Snapdragon NPU    | Android                          |
| Compact FLUX and Z-Image (on-device) | Bonsai Image 4B, FLUX.2 klein 4B, Z-Image Turbo 6B                                               | CPU or GPU        | Android and iOS                  |
| Core ML                              | Realistic Vision Hyper, Deliberate v2                                                            | Apple hardware    | iOS                              |
| Layla Cloud                          | FLUX.1[dev], BrainDance, CyberRealisticXL, iNiverse Mix                                          | Layla's servers   | Android and iOS                  |
| Web UI                               | Any model your Web UI serves                                                                     | Your PC           | Android and iOS                  |

What the groups mean in practice:

- **SD 1.5** ([Stable Diffusion](https://en.wikipedia.org/wiki/Stable_Diffusion) 1.5) is the oldest and lightest family and by far the most common on Civitai. It generates 512 x 512 images and runs on most recent phones.
- **SDXL** produces larger, more detailed 1024 x 1024 images but needs more memory. The SDXL NPU models need a Snapdragon 8 Elite or newer.
- **Newer diffusion transformers** (Z-Image, FLUX.2 Klein, Qwen Image, Krea, MOSS-Image) are the highest-quality models in the list. They are large downloads that run on the NPU of a Snapdragon 8 Elite or newer, support sizes up to 2048 x 2048, and several of them can edit existing images.
- **Compact FLUX and Z-Image models** run through a different on-device engine on both platforms. They use fixed small resolutions, and the largest of them is a slow, multi-gigabyte option.
- **Layla Cloud** models need no download. You sign in to Layla Cloud, and each plan includes a monthly number of cloud image generations.

The NPU (neural processing unit) is the AI accelerator in Qualcomm Snapdragon chips. It is usually much faster than the CPU for the same model, which is why Layla offers NPU versions of many models and tools like NPU Forge to convert your own.

## Configure image generation settings: prompt, steps, CFG scale, and seed

Everything on the Local Dream screen below the model card controls how an image is made. Which controls appear depends on the model, because not every model supports every option.

![Local Dream's Parameters section with the Size, Scheduler, Steps, CFG Scale, and Seed settings, the Auto Upscale toggle, Advanced Settings, and the Generate button.](./local-dream-image-generation-settings.jpg)

| Setting                           | What it does                                                               | Notes                                                                                                                                                                                   |
| --------------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prompt**                        | Describes the image you want.                                              | The star button writes a prompt for you from keywords using your chat model. The second button condenses a long prompt, and needs the Long-term Memory mini-app.                        |
| **Negative prompt**               | Lists what the image should avoid.                                         | Hidden for models that ignore it. On newer diffusion transformers it only takes effect above CFG 1.                                                                                     |
| **Size**                          | Sets the image width and height.                                           | SD 1.5 CPU models offer several square sizes. The newer NPU models accept sizes up to 2048 x 2048. Some models are fixed at one size.                                                   |
| **Steps**                         | How many denoising steps to run.                                           | More steps cost more time. Fast "turbo" and distilled models are built for 4 to 9 steps.                                                                                                |
| **CFG Scale**                     | How strictly the image follows the prompt.                                 | Each built-in model starts from a sensible default. Many newer models are tuned for 1.                                                                                                  |
| **Seed**                          | Fixes the random starting point.                                           | A value of -1 picks a random seed each time. The result shows the seed it used, so you can repeat an image.                                                                             |
| **Scheduler**                     | The sampler that runs the steps, such as DPM++ 2M Karras, Euler A, or LCM. | Shown for SD 1.5 and SDXL models. Newer models use their own.                                                                                                                           |
| **Source image**                  | Starts from an image you pick instead of from noise (image-to-image).      | Supported by SD 1.5 CPU and NPU models, SDXL NPU models, and the newer NPU models. Once you pick an image you can paint a mask to redo only part of it, and set a **Denoise Strength**. |
| **Reference images**              | Up to three images the model uses as guidance for an edit.                 | FLUX.2 Klein and Qwen Image models.                                                                                                                                                     |
| **Show Preview While Generating** | Shows a rough preview at every step.                                       | Not available on every model.                                                                                                                                                           |
| **Auto Upscale**                  | Enlarges each finished image with an upscaling model.                      | You choose the upscaler, whether it uses OpenCL on your GPU, and a tile size. Smaller tiles use less memory.                                                                            |

Under **Advanced Settings**:

- **Prompt prefix** is text Layla adds in front of every prompt, which is useful for a style or quality tag you always want.
- **Use GPU** moves generation to your GPU on the models that support it. Layla warns you on phones with less than 12 GB of RAM, because GPU generation can run out of memory.
- **Reset All Settings** restores the selected model's defaults.

Tap **Generate** to start. A **Stop generating** button appears while an image is being made, and finished images appear in the gallery.

## Set the image generation model in Inference Settings

Local Dream is where you generate images by hand. To let Layla and your characters generate images during a chat, pick a model in **Inference Settings**.

1. Go to **Settings** → **Inference Settings** and scroll to the **Image Generation** section.
2. The card under **Add Custom Model** shows the current image generation model. Tap its swap arrows to open the same **Select Model** list described above.
3. Choose a model, or choose **No Image Generation** to turn the feature off.

![Layla's Inference Settings screen with the Image Generation section showing Add Custom Model and the selected image model, iNiverse Mix from Layla Cloud, with a swap button.](./inference-settings-image-generation-model-layla.jpg)

This is the default image model for every character that does not have its own. A model that is not yet downloaded still has to be downloaded from Local Dream before it can generate. Models from Layla Cloud and Web UI connections are ready as soon as you are signed in or connected. To edit a Web UI connection later, open the model list and tap the pencil icon on its card.

## Configure image generation for each character

The model in Inference Settings is only the default. Each custom character can have its own image generation model and its own rules for when it sends images. That lets an AI companion send you pictures during a chat, and it lets one character draw in an anime style while another stays photorealistic.

1. Open the character editor, either by creating a new character or by editing an existing one. [How to create custom characters](/how-do-i-create-custom-characters/) covers the editor in full.
2. Open the **Advanced** tab and find **Image generation** under **OUTPUT**. It shows the model the character currently uses, or _No image generation_.
3. Tap it to open the **Select Model** list, then choose a model. Choose **No Image Generation** to stop this character from generating images.
4. Adjust the options below, then tap **Save**.

![The Advanced tab of Layla's Create Character screen with the image generation model set to RealCartoon, the Send images randomly and profile-image toggles, and the Fallback phrase box.](./character-image-generation-settings-layla.jpg)

Once a character has an image model, three more options appear:

- **Send images randomly**: the character may send you an image during the conversation without being asked. It is off by default.
- **Generate Images based on your character's profile image**: always uses the character's profile image as the starting point for image-to-image generation. Turn it on when you want every image to stay close to how the character looks. It needs a model that supports image-to-image. The table in the settings section above lists which ones do.
- **Fallback phrase**: a comma-separated list of phrases, such as _send me a pic_ or _generate an image_. When your message contains one of them, the character offers to send an image. Layla also recognises ordinary requests for pictures, photos, or selfies, so the list is for the phrases you personally use, including in other languages.

When a character offers an image, you can still decline it, so a phrase that matches by accident costs you one dismissed offer.

A few points to keep in mind:

- Download the model in Local Dream first. A character set to a model that is not on your phone cannot generate an image.
- A character set to a Layla Cloud model needs you to be signed in to Layla Cloud. Each image counts against your plan's monthly allowance.
- A character that has no image model of its own uses the default from Inference Settings.

## Other ways to generate images in Layla

On-device models are not the only route. Layla's agents can generate images too, which is useful when your phone is too slow for local generation. These routes need an internet connection and send your prompt to an outside service:

- [Creating an image generation agent](/creating-an-image-generation-agent/) builds an agent that generates an image of the scene or character after each message.
- [How to generate AI images in Layla with the Perchance Agent](/how-to-use-the-perchance-image-generation-agent/) uses the free Perchance website.
- [Nano Banana API in Layla: AI chat with image generation](/how-to-use-the-google-nano-banana-image-generation-agent/) connects Google's Nano Banana model with an API key from Google AI Studio.

## Frequently asked questions

### How do I generate AI images offline on Android?

Install the Local Dream mini-app, download a model, and Layla generates images on your phone with no internet connection, as a text-to-image or image-to-image AI art generator. The only online steps are installing the mini-app and downloading a model.

### Does Layla image generation work on iPhone?

Yes. SD 1.5 models run on iPhone through the CPU or GPU, Core ML models are available, and the compact FLUX and Z-Image models run on iOS as well. The Snapdragon NPU models are Android only.

### Can I run Stable Diffusion on my phone?

Yes. Layla runs Stable Diffusion 1.5 and SDXL models directly on Android phones and iPhones. SD 1.5 models run on the CPU of most recent phones, and phones with a supported Snapdragon chip can run them on the NPU for faster generation. You can also import your own checkpoints and LoRAs.

### Can I run FLUX on my phone?

On supported hardware, yes. Layla includes FLUX.2 Klein models that run on the Snapdragon NPU of an 8 Elite or newer, and compact FLUX-family models such as FLUX.2 klein 4B and Bonsai Image 4B that run on the CPU or GPU on both Android and iOS. FLUX.1[dev] is available through Layla Cloud.

### Do I need a Snapdragon phone?

No. SD 1.5 CPU models run on most recent phones. A Snapdragon chip is only needed for the NPU models, and the newest ones need a Snapdragon 8 Elite or newer.

### Which image model should I start with?

If you are unsure, start with an SD 1.5 model such as DreamShaper. It is a small download and runs on almost any recent phone. If your phone has a Snapdragon 8 Elite or newer, try an NPU model such as Z-Image Turbo for higher quality.

### Can I use Civitai models in Layla?

Yes, for the supported base models. Download a checkpoint as a safetensors file and import it from the **Safetensor** tab. See the import guide linked above for which base models are supported.

### Can I edit an existing image instead of starting from text?

Yes, on models with image-to-image support. Add a source image on the Local Dream screen. FLUX.2 Klein and Qwen Image models also accept up to three reference images.

### Does Layla Cloud image generation cost money?

Layla Cloud includes a monthly allowance of cloud image generations on every plan, including the free plan. Higher plans include more. On-device generation has no usage limit and no per-image charge.

### How do I make my AI character send pictures in Layla?

Open the character editor, go to the **Advanced** tab, and choose an image generation model under **OUTPUT**. Then turn on **Send images randomly**, or add the phrases you want to trigger an image in **Fallback phrase**.

### Can different characters use different image models?

Yes. Each custom character can have its own image generation model, set in the **Advanced** tab of the character editor. Characters without one use the default model from Inference Settings.

### Does Layla censor or review the images I generate?

When you generate on your device, your prompt and the image never leave your phone, so no online service reviews them. Layla Cloud models run on Layla's servers, and a Web UI you connect runs on your own computer, so those two follow their own settings.

### What should I look for in an offline AI image generator for Android?

Check five things: whether it generates with no internet connection, which models it supports, whether it can use your phone's NPU, whether you can import your own Stable Diffusion checkpoints and LoRAs, and whether the images stay on your device. Layla covers all five, and it also lets your characters send pictures during chat.

### How do I connect Layla to Stable Diffusion on my PC?

Set up the AUTOMATIC1111 Web UI with its API enabled, then add it from the **Web UI** tab of the Add Image Model screen using the API address. Images are then generated on your PC, so your phone must be able to reach it over the network.

## Credits

Image generation in Layla is powered by [Local Dream](https://github.com/xororz/local-dream), created by XORORZ. NPU Forge was created by AbrahamPaulJ.
