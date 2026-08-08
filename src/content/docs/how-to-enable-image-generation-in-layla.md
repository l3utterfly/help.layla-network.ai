---
title: How to enable image generation in Layla
description: Enable Stable Diffusion in Layla and generate images on your device, through your PC, or with Layla Cloud.
category: Guides
order: 230
keywords:
  - Layla image generation
  - Stable Diffusion
  - Automatic1111
  - Layla Cloud
  - character images
sourceUrl: https://blog.layla-network.ai/post/how-to-enable-image-generation-in-layla
lastUpdated: 2024-12-14
---

Layla v5 supports generating images with Stable Diffusion models.

In Layla, you can generate images in several ways:

1. Using your device itself, without connecting to any external provider
2. Connecting your phone to your PC
3. Using Layla Cloud

Whichever method you choose, you must enable the Stable Diffusion mini-app in Layla:

![Stable Diffusion mini-app in Layla.](/assets/articles/how-to-enable-image-generation-in-layla/stable-diffusion-mini-app.jpg)

**Using your device itself**

Image generation is performed by your phone or tablet's CPU. Layla provides a variety of Stable Diffusion models built into the app. You can download them from the Stable Diffusion mini-app:

![Stable Diffusion mini-app showing the local model selector and download control.](/assets/articles/how-to-enable-image-generation-in-layla/choose-local-model.jpg)

Tap the blue cloud-download button to download the model. This may take some time because the models are quite large. Tap the model tile at the top to choose from different models.

After selecting a model and downloading its files, you can enter your prompt and other settings to generate an image.

**Connecting to your PC**

If you have a PC, you can install the popular [Stable Diffusion WebUI by AUTOMATIC1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui).

Setting up AUTOMATIC1111's Stable Diffusion WebUI is beyond the scope of this tutorial. Follow the README in its GitHub repository or one of the available tutorials on YouTube.

After setting it up and configuring its API, connect to it in Layla through the Inference Settings app. Scroll down to the Image Generation settings:

![Image Generation section in Layla's Inference Settings.](/assets/articles/how-to-enable-image-generation-in-layla/image-generation-settings.jpg)

Tap *Add Custom Model*. You will be able to configure your API settings:

![Custom image model API settings for connecting Layla to a PC.](/assets/articles/how-to-enable-image-generation-in-layla/custom-model-api-settings.jpg)

You can find your PC's IP address through your router or other methods.

After configuring your PC, it will be available as a Stable Diffusion model when you generate images:

![Stable Diffusion model selector showing a custom model running on a PC.](/assets/articles/how-to-enable-image-generation-in-layla/select-pc-model.jpg)

**Using Layla Cloud**

You will notice that some models have a butterfly symbol in the top-right corner. This means they are provided by Layla Cloud and require a subscription purchased in the Layla Cloud app. All other models are generated locally on your phone.

![Image-generation models provided by Layla Cloud, marked with butterfly icons.](/assets/articles/how-to-enable-image-generation-in-layla/layla-cloud-models.png)

These Layla Cloud models provide fast, seamless image generation and require a corresponding subscription.

**Allowing your characters to send you images during chatting**

Lastly, you can allow your characters to generate images while chatting. This feature is available for custom characters.

Configure the image-generation settings in the character-creation screen:

![Character creation screen showing its image-generation configuration.](/assets/articles/how-to-enable-image-generation-in-layla/character-image-generation.jpg)

You can choose the Stable Diffusion model for that specific character.
