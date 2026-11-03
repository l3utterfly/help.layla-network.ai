---
title: How to import custom image generation models into Layla
description: Import custom Stable Diffusion, SDXL, and Civitai models into Layla for offline AI image generation on Android. Covers safetensors, GGUF, zip, LoRA, and NPUs.
category: Image generation
order: 15
keywords:
  - import custom image generation model
  - import image model
  - offline AI image generator
  - AI image generator for Android
  - offline image generation on Android
  - run Stable Diffusion offline
  - Stable Diffusion on Android
  - custom Stable Diffusion models
  - Stable Diffusion checkpoint
  - Civitai models on Android
  - import safetensors
  - safetensors on Android
  - GGUF image model
  - Stable Diffusion LoRA
  - text-to-image
  - image-to-image
  - on-device image generation
  - local image generation
  - private AI image generator
  - Snapdragon NPU Stable Diffusion
  - QNN
  - SD 1.5
  - SDXL
  - FLUX.2 Klein
  - Qwen Image
  - MOSS-Image
  - NPU Forge
  - Local Dream
  - Stable Diffusion Web UI
  - Automatic1111
  - Layla
lastUpdated: 2026-11-03
---

**Layla can import your own custom image generation models, including Stable Diffusion checkpoints from Civitai, in three ways: from a safetensors or GGUF file that Layla converts on your device, from a pre-packaged zip file, or by connecting to a Stable Diffusion Web UI running on your PC.** Models imported from a file generate images offline on your Android phone or iPhone. Which method you use depends on the model family and on the chip in your phone.

This article is the overview. It explains where the import screen is, what each import method does, which image generation models Layla supports, and how the optional NPU Forge mini-app fits in. Importing a checkpoint happens entirely on your device, so the files you pick are not uploaded anywhere.

If you only want to use the models Layla already offers, see [How to enable image generation in Layla](/how-to-enable-image-generation-in-layla/) instead.

## Why import a custom image model

Layla includes a set of ready-to-download image models, but most of the variety is elsewhere. [Civitai](https://civitai.com/) and [Hugging Face](https://huggingface.co/) host community-trained Stable Diffusion checkpoints in many styles, such as photorealistic, anime, and illustration, and many LoRAs that add a specific character, outfit, or look. Importing lets you use any of them in Layla instead of being limited to the built-in list.

An imported model runs through Local Dream, Layla's on-device image generator, so the whole process is local:

- **Offline.** After the import, generating an image needs no internet connection, account, or subscription.
- **Private.** Your prompts and images stay on your phone, and no online service reviews them.
- **Flexible.** The model supports text-to-image and, for most types, image-to-image. Your characters can also use it when they send images in chat.

## How to import a custom model into Layla

There are two ways to open the same **Add Image Model** screen:

- Go to **Settings** → **Inference Settings**, scroll to **Image Generation**, and tap **Add Custom Model**.
- Open the **Local Dream** mini-app and tap **Add Model** at the top of the screen.

Local Dream is the mini-app that runs image generation on your device, and every import method except the Web UI depends on it. Install it first if you have not already. See [How to enable or disable mini-apps within Layla](/how-to-enable-disable-mini-apps-within-layla/) for how mini-apps work. If the mini-app is out of date, Layla tells you it _needs an update_ before it will import a model.

The screen has up to three tabs: **Safetensor**, **Zip**, and **Web UI**. When an import finishes, the model is saved to your image generation models and selected automatically. Keep Layla open while it runs, because a large import can take several minutes.

## The three import methods

|                  | Safetensor tab                                            | Zip tab                                         | Web UI tab                         |
| ---------------- | --------------------------------------------------------- | ----------------------------------------------- | ---------------------------------- |
| You provide      | A `.safetensors` checkpoint, or a `.gguf` file on Android | A model zip that was already packaged for Layla | The address of a Web UI API        |
| What Layla does  | Converts the checkpoint into an on-device model           | Extracts the zip and detects its model type     | Saves the connection details       |
| Where images run | On your device                                            | On your device                                  | On the computer running the Web UI |
| Platforms        | Android and iOS (iOS accepts SD 1.5 only)                 | Android and iOS                                 | Android and iOS                    |
| Typical source   | [Civitai](https://civitai.com/) and Hugging Face          | Pre-converted packages                          | Your own PC                        |

## Which image generation models does Layla support?

The Safetensor tab has a **Base Model** list on Android. The base model tells Layla how to convert the file, so choose the family your checkpoint was trained from.

| Base model     | What Layla creates                                  | Runs on        | Platforms       |
| -------------- | --------------------------------------------------- | -------------- | --------------- |
| SD 1.5         | A single converted on-device model, LoRAs merged in | CPU            | Android and iOS |
| SDXL           | A Q4_0 GGUF model, LoRAs applied while generating   | Snapdragon NPU | Android         |
| MOSS           | A Q4_0 GGUF diffusion model                         | Snapdragon NPU | Android         |
| Qwen Image 2.1 | A Q4_0 GGUF diffusion model                         | Snapdragon NPU | Android         |
| Flux 2 Klein   | A Q4_0 GGUF diffusion model                         | Snapdragon NPU | Android         |

A few points about this table:

- **SD 1.5** is the most common family on Civitai and the only one iOS can import. The result runs on your CPU, so it works on almost any recent phone.
- **SDXL, MOSS, Qwen Image 2.1, and Flux 2 Klein** run on the Snapdragon NPU through the same engine that Layla's built-in models of those families use. That engine needs a Snapdragon 8 Elite (SM8750) or newer. Layla does not warn you about the chip when you import these, so check yours before you convert a large file.
- **MOSS, Qwen Image 2.1, and Flux 2 Klein** reuse the tokenizer, text encoder, and VAE from the matching built-in model, which you must download first. The [base model packages](#models-that-need-a-base-model-first) section lists them.
- **Z-Image Turbo, Krea 2 Turbo, and the other built-in NPU models** are not in the Base Model list. You can download them from Local Dream, but you cannot import your own checkpoint of those families.

Civitai lists a model's base model on its page, so check it before you download. Layla does not inspect the file to confirm the family you choose, so picking the wrong one can make the import or the generation fail.

## Import a safetensors or GGUF checkpoint

1. Download the checkpoint to your phone. On Civitai, filter by **Model Type: Checkpoint**, **File format: SafeTensor**, and the **Base Model** you want. For a worked example with screenshots, see [How to import SD1.5 Safetensor models from Civit.ai into Layla](/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/).
2. Open **Add Image Model** and stay on the **Safetensor** tab.
3. On Android, choose the **Base Model**. On iOS this list is not shown, because only SD 1.5 is available.
4. Under **MODEL CHECKPOINT**, pick your file. Layla rejects files that do not end in `.safetensors` (or `.gguf` on Android).
5. Check the **MODEL NAME**. Layla fills it in from the file name, and you can change it.
6. Optionally add LoRAs, described in the next section.
7. Tap **Import & Convert**.

The button reads **Import** instead when no conversion is needed, which is the case for a GGUF file and for a LoRA-only import. Layla shows its progress while it copies and converts the files, and it removes the temporary copies afterwards. Your original download is left where it was.

### GGUF files

On Android you can pick a `.gguf` diffusion model instead of a safetensors file. Layla copies it into its own folder without converting it, so it imports faster. Choose the base model that matches the GGUF so Layla knows which supporting files to use.

### LoRAs

A LoRA is a small add-on file that changes a model's style or teaches it a character or concept. Under **LORA FILES (OPTIONAL)**, tap **Add LoRA**, pick a `.safetensors` file, and set its strength. The default is 1.0, and you can add several.

How a LoRA is applied depends on the family:

- **SD 1.5**: LoRAs are merged into the converted model, so you cannot change or remove them afterwards.
- **SDXL, MOSS, Qwen Image 2.1, and Flux 2 Klein**: LoRAs are copied into the model's folder and applied while generating.

### Models that need a base model first

MOSS, Qwen Image 2.1, and Flux 2 Klein checkpoints are converted using the supporting files of a model you have already downloaded in Local Dream. If the files are missing, the Safetensor tab shows a warning and the import button stays disabled. Download one of these first:

| Base Model     | Download in Local Dream                |
| -------------- | -------------------------------------- |
| MOSS           | MOSS-Image Turbo or MOSS-Image Base    |
| Qwen Image 2.1 | Qwen Image 2.1 or Qwen Image 2.1 Turbo |
| Flux 2 Klein   | FLUX.2 Klein 4B                        |

For these three families you also get a **LoRA only** checkbox. It lets you skip the checkpoint and create a new model that uses the downloaded base model together with only your LoRAs, which saves the time and storage of converting a whole checkpoint.

## Import a zip

The **Zip** tab is for a model that someone has already converted and packaged for Layla. Pick the zip, check the name, and tap **Import & Extract**. Layla extracts it and works out the model type from what is inside:

- a Core ML bundle is imported as an SD 1.5 Core ML model, which is available on iOS;
- an SDXL package with MNN files becomes an SDXL CPU model;
- an SDXL package with QNN files becomes an SDXL NPU model;
- an ANIMA package becomes an ANIMA NPU model;
- a package with QNN files becomes an SD 1.5 NPU model;
- anything else is treated as an SD 1.5 CPU model.

Because the last case is a fallback, a zip that was not built for Layla can import without an error and then fail when you try to generate. Use zips from a source you trust that says they are for Layla's Local Dream engine. QNN packages are built for specific Snapdragon chips, so check which chips a package supports before downloading it.

## Connect a Web UI

If you already run an [AUTOMATIC1111 Stable Diffusion Web UI](https://github.com/AUTOMATIC1111/stable-diffusion-webui) on a PC, the **Web UI** tab connects Layla to it. The images are generated on that computer, so this method needs a network connection to it and does not run offline.

Fill in:

- **Name**: any label you will recognise.
- **Endpoint**: the API address, which usually ends with `/sdapi/v1/text2img`.
- **API Key**: leave this blank for a local API.
- **Model**: leave this blank to use the Web UI's default model.

Tap **Save & Select**. [How to enable image generation in Layla](/how-to-enable-image-generation-in-layla/) covers setting up the Web UI itself.

## Faster Stable Diffusion on the Snapdragon NPU with NPU Forge

An SD 1.5 safetensors import runs on your CPU. If your phone has a supported Qualcomm Snapdragon chip, **NPU Forge** can convert the same checkpoint into a QNN model instead, so that images are generated on the Snapdragon NPU (Qualcomm's AI accelerator), which is faster.

NPU Forge is a separate mini-app, available on Android only. It handles SD 1.5 and SDXL checkpoints, can merge LoRAs, and puts the finished model straight into Local Dream. On a phone with a supported chip, the Safetensor tab shows a notice that links to it. The full walkthrough, including storage and memory needs, is in [NPU Forge in Layla: convert Stable Diffusion safetensors to QNN for the Snapdragon NPU](/how-to-convert-safetensors-to-qnn-with-npu-forge-in-layla/).

## After you import a model

Open Local Dream. Your new model is already selected, and you can switch models from the model list at the top. Layla starts imported models at 20 steps and a CFG scale of 5, or 4 steps and a CFG scale of 1 for Flux 2 Klein. You can change both in Local Dream, and models trained with fewer steps in mind usually need lower values than these defaults.

Two actions are available for a selected model:

- **Model setup** appears for the models Layla runs through its newer engine (SDXL, MOSS, Qwen Image 2.1, and Flux 2 Klein imports). It opens the model's configuration, where you can see and edit the files it uses, its sampler, and its LoRAs.
- **Delete Model** removes the model and frees its storage.

Imported models also appear in the image generation model list for your characters, so a character can use one when it sends images in chat. See [How to enable image generation in Layla](/how-to-enable-image-generation-in-layla/) for how to choose a model per character.

## Frequently asked questions

### Can I run Stable Diffusion offline on Android?

Yes. Layla runs Stable Diffusion models on your device through the Local Dream mini-app. Most phones use the CPU, and phones with a supported Snapdragon chip can use the NPU. Once a model is on your phone, generating images needs no internet connection.

### Can I use Civitai models on my phone?

Yes, if the checkpoint is a safetensors file for a family Layla supports. On Civitai, filter by **Checkpoint**, **SafeTensor**, and a base model of **SD 1.5** or **SDXL**, download the file to your phone, and import it from the **Safetensor** tab.

### What is a safetensors file?

Safetensors is a file format for storing the weights of a machine learning model. Most Stable Diffusion checkpoints and LoRAs on Civitai use it. It replaces the older `.ckpt` format and, unlike `.ckpt`, cannot carry executable code, which is one reason it is now the usual way to share image models.

### What is the difference between a checkpoint and a LoRA?

A checkpoint is a complete image model. A LoRA is a small add-on that changes the style of a checkpoint or teaches it a specific subject, and it only works with a checkpoint built on the same base model. Layla imports both: pick the checkpoint first, then add LoRAs.

### Can I use LoRAs with Stable Diffusion in Layla?

Yes. The **Safetensor** tab lets you add one or more LoRAs with a strength for each, as described above. For SD 1.5 they are merged into the model, and for SDXL, MOSS, Qwen Image 2.1, and Flux 2 Klein they are applied while generating.

### Do I need a Snapdragon phone to import custom image models?

No. SD 1.5 safetensors import and run on the CPU of most recent Android phones and iPhones. A Snapdragon chip is only needed for NPU models, which includes NPU Forge conversions and the SDXL, MOSS, Qwen Image 2.1, and Flux 2 Klein imports on Android.

### Can I import any Stable Diffusion model into Layla?

Not any model. Layla's import options cover SD 1.5 and SDXL checkpoints, plus MOSS, Qwen Image 2.1, and Flux 2 Klein on Android. Other families, such as SD 2.x, are not in the Base Model list.

### Does importing a model need an internet connection?

Only to install the mini-apps and download any base model you need. The conversion itself runs on your phone. A Web UI connection is the exception, because it needs access to your PC while you generate.

### Why is the Base Model list missing on my iPhone?

iOS imports SD 1.5 safetensors only, so there is nothing to choose. The Zip tab also accepts Core ML packages.

### Will my imported model run on the NPU?

SD 1.5 safetensors imports run on the CPU. To use the NPU for SD 1.5 or SDXL, convert the checkpoint with NPU Forge. Imports of SDXL, MOSS, Qwen Image 2.1, and Flux 2 Klein checkpoints on Android already target the NPU and need a Snapdragon 8 Elite or newer.

### Can I change a LoRA after importing an SD 1.5 model?

No. LoRAs for SD 1.5 are merged into the converted model. Import the original checkpoint again with the LoRAs and strengths you want, using a new model name.

### Why does Layla say my Local Dream mini-app needs an update?

Importing relies on conversion files that ship with the Local Dream mini-app. Update it from your mini-apps area, then try the import again.

### How do I remove an imported model?

Open Local Dream, select the model, and tap **Delete Model**.

### Where can I get models to import?

[Civitai](https://civitai.com/) and [Hugging Face](https://huggingface.co/) host most checkpoints. Check the base model on each page before you download, because the base model decides which import route applies.

## Credits

Image generation in Layla is powered by [Local Dream](https://github.com/xororz/local-dream), created by XORORZ. NPU Forge was created by AbrahamPaulJ.
