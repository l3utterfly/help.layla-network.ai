---
title: How to import MOSS Image safetensors models and LoRAs from Civitai into Layla
description: Import MOSS Image safetensors checkpoints and LoRAs from Civitai into Layla and generate images offline on Android. Filters, the fp16 download, and steps.
category: Image generation
order: 22
keywords:
  - MOSS Image
  - MOSS-Image
  - MOSS Image checkpoint
  - MOSS Image LoRA
  - MOSS Image on Android
  - MOSS Image Civitai
  - OpenMOSS
  - Civitai
  - Civitai on Android
  - download Civitai models on phone
  - fp16 safetensors
  - bf16 safetensors
  - import safetensors
  - safetensors on Android
  - custom image generation models
  - offline AI image generator
  - AI image generator for Android
  - Snapdragon NPU image generation
  - on-device image generation
  - text-to-image
  - Local Dream
  - Layla
lastUpdated: 2026-11-03
---

**Layla can import MOSS Image safetensors checkpoints and LoRAs from Civitai and generate images with them offline on your Android phone.** MOSS Image is a newer text-to-image model than Stable Diffusion, and the community already publishes fine-tuned checkpoints and LoRAs for it on [Civitai](https://civitai.com/). Layla converts the checkpoint on your device, so after the download you do not need an internet connection to generate images.

This tutorial shows how to find a MOSS Image checkpoint on Civitai, download the correct file, import it into Layla, and add a MOSS Image LoRA. For the other model families, see [SD 1.5](/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/), [SDXL](/how-to-import-sdxl-safetensor-models-from-civitai-into-layla/), [Qwen Image 2.1](/how-to-import-qwen-image-2-1-safetensor-models-from-civitai-into-layla/), and [FLUX.2 Klein](/how-to-import-flux-2-klein-safetensor-models-from-civitai-into-layla/). For an overview of every import method, see [How to import custom image generation models into Layla](/how-to-import-custom-image-generation-models-into-layla/).

## What is MOSS Image?

MOSS-Image is an open-weight text-to-image model from the OpenMOSS team, a 5-billion-parameter diffusion transformer released in October 2026. It comes as two checkpoints: **Base**, meant for fine-tuning and LoRA training, and **SFT**, tuned for everyday generation. Many Civitai creators publish their own fine-tunes on top of either.

On Civitai it appears as **MOSS Image** in the **Base model** filter. In Layla's **Base Model** list it is called **MOSS**. A LoRA only works with checkpoints built on the same base, so a MOSS Image LoRA needs a MOSS Image checkpoint.

## What you need

- An Android phone with a Snapdragon 8 Elite (SM8750) or newer chip. MOSS imports run on the Snapdragon NPU, and they are not available on iPhone. Layla does not check your chip when you import, so confirm it before you convert a large file.
- The **Local Dream** mini-app. See [How to enable or disable mini-apps within Layla](/how-to-enable-disable-mini-apps-within-layla/) if you have not installed one before.
- A built-in MOSS model downloaded in Local Dream: **MOSS-Image Turbo** or **MOSS-Image Base**. Layla reuses its tokenizer, text encoder, and VAE to convert your checkpoint. If they are missing, the Safetensor tab shows a warning and the import button stays disabled.
- Plenty of free storage. An fp16 MOSS checkpoint is close to 10 GB.

## Download the fp16 safetensors file

**Layla supports f16 (half precision) safetensors files.** On Civitai the file is labelled **fp16 SafeTensor** in the download box. For MOSS Image, bf16 files also import. Quantized files, such as **fp8**, **int8**, **int4**, and **nvfp4**, are not supported.

This matters for MOSS Image in particular, because many checkpoints on Civitai are published only as int8 or bf16 files, and Civitai's **Best match** label can point at a quantized file. Open the variants list on the model page and check the label before you download.

## How to import a MOSS Image checkpoint from Civitai

### Step 1: Open Civitai and go to Models

![The top of the Civitai home page with the Models tab highlighted.](./civitai-open-models-page.jpg)

Open [civitai.com](https://civitai.com/) in your browser and select **Models** in the top navigation bar. The screenshots in this tutorial were taken in a desktop browser, so the layout on a phone may differ slightly.

### Step 2: Filter by Checkpoint, SafeTensor, and MOSS Image

![Civitai filters panel with Checkpoint, SafeTensor, and MOSS Image selected.](./civitai-moss-image-checkpoint-filters.jpg)

Select **Filters** at the top right and set three things:

1. Under **Model types**, select **Checkpoint**.
2. Under **File format**, select **SafeTensor**.
3. Under **Base model**, search for and select **MOSS Image**.

The list now shows MOSS Image checkpoints in a format Layla can import. You can also [open this filtered list directly](https://civitai.com/models?types=Checkpoint&fileFormats=SafeTensor&baseModels=MOSS%20Image&sort=Most%20Downloaded).

### Step 3: Download the fp16 safetensors file

![Civitai model page showing an fp16 SafeTensor file of 9.47 GB and the Download button.](./civitai-moss-image-checkpoint-download-fp16.jpg)

Open a model and look at the **Download** box on the right. It should read **fp16 SafeTensor**, here with a size of 9.47 GB. If there is more than one variant, open the list and select the fp16 file before you tap **Download**. _Only f16 safetensors files are supported, with bf16 also accepted for MOSS Image._

You only need the checkpoint. Civitai's **Required Components** list names a text encoder and a VAE that other tools need to run the model. Layla uses the supporting files from the MOSS model you downloaded in Local Dream.

### Step 4: Import the checkpoint into Layla

Go to **Settings** → **Inference Settings**, scroll down to **Image Generation**, and tap **Add Custom Model**. You can also open the **Local Dream** mini-app and tap **Add Model**.

![Layla Inference Settings screen with Add Custom Model in the Image Generation section.](./image-generation-settings.jpg)

On the **Safetensor** tab, open the **Base Model** list and choose **MOSS**.

![The Base Model list in Layla's Add Image Model screen showing SD1.5, SDXL, MOSS, Qwen Image 2.1, and Flux 2 Klein.](./image-model-base-model-list-layla.jpg)

Under **MODEL CHECKPOINT**, pick the safetensors file you downloaded, check the **MODEL NAME**, and tap **Import & Convert**. Layla converts the checkpoint into a Q4_0 GGUF diffusion model, which can take several minutes, so keep Layla open until it finishes. When it is done, the model is saved and selected automatically.

Layla does not inspect the file to confirm its family. If you pick MOSS for a checkpoint that is not a MOSS Image model, the import or the generation can fail.

### Step 5: Generate!

Open **Local Dream**, check that your model is selected, and enter a prompt. Layla starts imported models at 20 steps and a CFG scale of 5, and you can change both in Local Dream. Checkpoints built for fewer steps, such as Turbo versions, usually need lower values than these defaults.

## How to add a MOSS Image LoRA from Civitai

A LoRA is a small file that changes a model's style or teaches it a character, object, or concept.

### Step 1: Filter by LoRA and MOSS Image

![Civitai filters panel with LoRA and MOSS Image selected.](./civitai-moss-image-lora-filters.jpg)

Open **Models** → **Filters**, then under **Model types** select **LoRA**, and under **Base model** select **MOSS Image**. You can also [open the filtered LoRA list directly](https://civitai.com/models?types=LORA&fileFormats=SafeTensor&baseModels=MOSS%20Image&sort=Most%20Downloaded).

### Step 2: Download the LoRA safetensors file

![Civitai LoRA page with the v1.0 Moss version selected, an fp16 SafeTensor file of 61.54 MB, and the Download button.](./civitai-moss-image-lora-download-fp16.jpg)

Some LoRAs publish one version for each base model. Select the version that matches MOSS Image, such as **v1.0 Moss** in this example, then check that the download box reads **fp16 SafeTensor** and select **Download**. A LoRA file is much smaller than a checkpoint, around 61 MB here.

### Step 3: Add the LoRA while importing

On the **Safetensor** tab, set **Base Model** to **MOSS**, then under **LORA FILES (OPTIONAL)** tap **Add LoRA**, choose the LoRA file, and set its strength. The default is 1.0, and you can add several.

For MOSS, LoRAs are copied into the model's folder and applied while generating. After the import, select the model in Local Dream and tap **Model setup** to see the files the model uses, its sampler, and its LoRAs.

### Use a LoRA without importing a whole checkpoint

For MOSS, the **Safetensor** tab has a **LoRA only** checkbox. It lets you skip the checkpoint and create a new model from the MOSS model you already downloaded in Local Dream, plus only your LoRAs. This saves the time and storage of converting a large checkpoint.

## Frequently asked questions

### Can I run MOSS Image on my phone?

Yes, on an Android phone with a Snapdragon 8 Elite (SM8750) or newer. Download a MOSS model in Local Dream, then import a MOSS Image checkpoint from Civitai with **MOSS** as the Base Model.

### Which MOSS Image file should I download from Civitai?

The one labelled **fp16 SafeTensor**. A bf16 file also imports. Do not download fp8, int8, int4, or nvfp4 variants, which Civitai can show as the default.

### Why are MOSS Image checkpoints so large?

An fp16 checkpoint stores every weight in half precision, which is close to 10 GB for a 5-billion-parameter model. Quantized files are smaller, but Layla does not import them.

### What is the difference between MOSS Image Base and SFT?

Base is intended for fine-tuning and LoRA training, and SFT is tuned for everyday generation. Checkpoints built on either use the same **MOSS** base model in Layla.

### Can I run MOSS Image on an iPhone?

No. iOS imports SD 1.5 safetensors only. See [How to import SD 1.5 safetensors models from Civitai into Layla](/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/).

### Does importing a Civitai model need an internet connection?

Only to download the files. The conversion and the image generation both happen on your device.

### How do I delete an imported model?

Open **Local Dream**, select the model, and tap **Delete Model**.

## Offline MOSS Image on Android

After the import, MOSS Image runs on your phone with no internet connection, account, or subscription. Your prompts and images stay on the device.
