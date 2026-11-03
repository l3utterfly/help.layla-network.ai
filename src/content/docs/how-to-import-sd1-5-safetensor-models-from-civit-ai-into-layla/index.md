---
title: How to import SD 1.5 safetensors models and LoRAs from Civitai into Layla
description: Import SD 1.5 safetensors checkpoints and LoRAs from Civitai into Layla and generate images offline on Android. Step-by-step guide to the right fp16 download.
category: Image generation
order: 20
keywords:
  - SD 1.5
  - SD1.5
  - Stable Diffusion 1.5
  - Stable Diffusion 1.5 checkpoint
  - Stable Diffusion 1.5 LoRA
  - SD 1.5 LoRA
  - Civitai
  - Civitai on Android
  - download Civitai models on phone
  - Civitai checkpoint
  - fp16 safetensors
  - import safetensors
  - safetensors on Android
  - custom Stable Diffusion models
  - Stable Diffusion LoRA
  - LoRA on Android
  - offline AI image generator
  - AI image generator for Android
  - Stable Diffusion on Android
  - Stable Diffusion on iPhone
  - run Stable Diffusion offline
  - on-device image generation
  - text-to-image
  - Local Dream
  - Layla
lastUpdated: 2026-11-03
---

**Layla can import Stable Diffusion 1.5 (SD 1.5) safetensors checkpoints and LoRAs from Civitai and use them to generate images offline on your Android phone or iPhone.** Most community Stable Diffusion models on [Civitai](https://civitai.com/) are shared as safetensors files. Layla converts them on your device, so once the file is downloaded you do not need an internet connection to generate images.

This tutorial shows how to find a compatible SD 1.5 checkpoint on Civitai, download the right file, import it into Layla, and add an SD 1.5 LoRA. For the other model families, see [SDXL](/how-to-import-sdxl-safetensor-models-from-civitai-into-layla/), [MOSS Image](/how-to-import-moss-image-safetensor-models-from-civitai-into-layla/), [Qwen Image 2.1](/how-to-import-qwen-image-2-1-safetensor-models-from-civitai-into-layla/), and [FLUX.2 Klein](/how-to-import-flux-2-klein-safetensor-models-from-civitai-into-layla/). For GGUF files, zip packages, and connecting a Web UI, see [How to import custom image generation models into Layla](/how-to-import-custom-image-generation-models-into-layla/).

## What is SD 1.5?

SD 1.5 is Stable Diffusion 1.5, a version of the [Stable Diffusion](https://en.wikipedia.org/wiki/Stable_Diffusion) text-to-image model that produces 512 x 512 images. It is the most common family on Civitai: thousands of photorealistic, anime, and illustration checkpoints and LoRAs are fine-tuned from it, which is why **SD 1.5** is one of the **Base model** filters on the site.

The base model matters because a LoRA only works with checkpoints built on the same base. An SD 1.5 LoRA does not work with an SDXL checkpoint, and the reverse is also true.

## Download the fp16 safetensors file

**Layla only supports f16 (half precision) safetensors files.** On Civitai, the file is labelled **fp16 SafeTensor** in the download box. An SD 1.5 checkpoint in this format is usually about 2 GB. Civitai sometimes lists more than one file for a model, such as a full-precision version that is several gigabytes larger. Pick the fp16 one.

## How to import an SD 1.5 checkpoint from Civitai

### Step 1: Open Civitai and go to Models

![The top of the Civitai home page with the Models tab highlighted.](./civitai-open-models-page.jpg)

Open [civitai.com](https://civitai.com/) in your browser and select **Models** in the top navigation bar. The screenshots in this tutorial were taken in a desktop browser, so the layout on a phone may differ slightly.

### Step 2: Filter by Checkpoint, SafeTensor, and SD 1.5

![Civitai filters panel with Checkpoint, SafeTensor, and SD 1.5 selected.](./civitai-sd-1-5-checkpoint-filters.jpg)

Tap **Filters** at the top right and set three things:

1. Under **Model types**, select **Checkpoint**.
2. Under **File format**, select **SafeTensor**.
3. Under **Base model**, search for and select **SD 1.5**.

The list now shows only SD 1.5 checkpoints in a format Layla can import. Sorting by **Most Downloaded** or **Highest Rated** is a good way to start. You can also [open this filtered list directly](https://civitai.com/models?types=Checkpoint&fileFormats=SafeTensor&baseModels=SD%201.5&sort=Most%20Downloaded).

### Step 3: Download the fp16 safetensors file

![Civitai model page showing an fp16 SafeTensor file of 1.99 GB and the Download button.](./civitai-sd-1-5-checkpoint-download-fp16.jpg)

Open a model and look at the **Download** box on the right. It should read **fp16 SafeTensor**, with a size of around 2 GB. Tap the **Download** button to save the file to your phone. _Only f16 safetensors files are supported, so if the box offers several variants, choose the fp16 one._

### Step 4: Import the checkpoint into Layla

Go to **Settings** → **Inference Settings**, scroll down to **Image Generation**, and tap **Add Custom Model**. You can also open the **Local Dream** mini-app and tap **Add Model**.

![Layla Inference Settings screen with Add Custom Model in the Image Generation section.](./image-generation-settings.jpg)

On the **Safetensor** tab, leave **Base Model** set to **SD1.5**, pick the safetensors file you downloaded under **MODEL CHECKPOINT**, check the model name, and tap **Import & Convert**. On iPhone the Base Model list is not shown, because SD 1.5 is the only family available there.

![The Add Image Model screen in Layla with the Safetensor tab and Base Model set to SD1.5.](./add-image-model-safetensor-tab-layla.jpg)

The import can take a few minutes, so keep Layla open until it finishes. When it is done, the model is saved and selected automatically.

### Step 5: Generate!

Open the **Local Dream** mini-app, check that your model is selected, and enter a prompt.

![Local Dream screen configured to generate an image of a fast car.](./local-dream-generate.jpg)

![Local Dream model-selection screen showing several installed models.](./local-dream-select-model.jpg)

SD 1.5 models imported this way run on your device's CPU, at sizes up to 512 x 512. If your phone has a supported Qualcomm Snapdragon chip, you can convert the same checkpoint for the NPU to generate faster. See [NPU Forge in Layla: convert Stable Diffusion safetensors to QNN for the Snapdragon NPU](/how-to-convert-safetensors-to-qnn-with-npu-forge-in-layla/).

## How to add an SD 1.5 LoRA from Civitai

A LoRA is a small file that changes a model's style or teaches it a character, object, or concept. Adding one follows the same path as a checkpoint, with a different filter.

### Step 1: Filter by LoRA and SD 1.5

![Civitai filters panel with LoRA and SD 1.5 selected.](./civitai-sd-1-5-lora-filters.jpg)

Open **Models** → **Filters**, then under **Model types** select **LoRA**, and under **Base model** select **SD 1.5**. You can also [open the filtered LoRA list directly](https://civitai.com/models?types=LORA&fileFormats=SafeTensor&baseModels=SD%201.5&sort=Most%20Downloaded). Civitai uses the same filter panel for every model type, so the steps are identical to the checkpoint search apart from the model type.

### Step 2: Download the LoRA safetensors file

![Civitai LoRA page showing an fp16 SafeTensor file of 9.11 MB and the Download button.](./civitai-sd-1-5-lora-download-fp16.jpg)

A LoRA file is far smaller than a checkpoint, often between 10 and 150 MB. As with checkpoints, choose the **fp16 SafeTensor** file when Civitai labels the precision, and tap **Download**.

### Step 3: Add the LoRA while importing

Back on the **Safetensor** tab, pick your SD 1.5 checkpoint first. Then, under **LORA FILES (OPTIONAL)**, tap **Add LoRA**, choose the LoRA file, and set its strength. The default is 1.0, and you can add several LoRAs. Tap **Import & Convert**.

For SD 1.5 models, LoRAs are merged into the converted model, so you cannot change or remove them afterwards. To use a different combination, import the original checkpoint again under a new name.

## Frequently asked questions

### Can I use Civitai models on my Android phone?

Yes. Download an SD 1.5 checkpoint in fp16 safetensors format from Civitai and import it with **Add Custom Model** in Layla. The model then runs on your phone, with no account or internet connection needed to generate images.

### Which file should I download from Civitai?

The one labelled **fp16 SafeTensor**. Layla supports only f16 safetensors files, so other precisions and formats such as PickleTensor (`.ckpt`) are not what you want.

### Does importing a Civitai model need an internet connection?

Only to download the file from Civitai. The conversion and the image generation both happen on your device.

### Can I run Stable Diffusion on an iPhone?

Yes, with SD 1.5. iOS imports SD 1.5 safetensors from the **Safetensor** tab. The other model families are available on Android only.

### Can I import SDXL or other models from Civitai?

On Android, yes for SDXL, MOSS Image, Qwen Image 2.1, and FLUX.2 Klein. Each has its own tutorial, linked at the top of this article.

### Can I use LoRAs with my SD 1.5 model?

Yes. Add them on the **Safetensor** tab while importing. They must be SD 1.5 LoRAs, and their strengths are fixed when the model is converted.

### Why does the import take so long?

Layla converts the whole checkpoint into an on-device model, which can take a few minutes. Keep Layla open and do not close it until the import finishes.

### How do I delete an imported model?

Open **Local Dream**, select the model, and tap **Delete Model**. This frees the storage the model uses.

## Run Stable Diffusion from Civitai without a connection

Once a checkpoint is imported, Layla works as an offline AI image generator: the prompts, the model, and the images all stay on your phone.
