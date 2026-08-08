---
title: How to add vision LLMs in Layla (Qwen3-VL)
description: Download a Qwen3-VL GGUF model and its mmproj file, then configure both in Layla for image recognition in chat.
category: Guides
order: 120
keywords:
  - vision LLM
  - Qwen3-VL
  - mmproj
  - GGUF vision model
  - image recognition
sourceUrl: https://blog.layla-network.ai/post/how-to-add-vision-llms-in-layla-qwen3-vl
lastUpdated: 2025-11-24
---

This article shows you how to add vision LLMs to Layla.

Layla supports vision LLMs so you can send images in chat for her to recognise and discuss.

Let's take the Qwen3-VL family of models as an example. These models come with image-recognition capabilities that work well on mobile!

Here's how you can use them in Layla:

**Step 1: Download the Qwen3-VL models**

You can find them in the [Qwen3-VL-2B-Instruct-GGUF repository on Hugging Face](https://huggingface.co/unsloth/Qwen3-VL-2B-Instruct-GGUF/tree/main).

I recommend the 2B model. It works fast and is pretty accurate. If you have a good phone, you can try the larger 4B or 8B models!

In the list of files on the page, choose the **Q4_K_M** quant and download it.

![Hugging Face file list with the Qwen3-VL 2B Q4_K_M GGUF file highlighted.](/assets/articles/how-to-add-vision-llms-in-layla-qwen3-vl/qwen-model-download.png)

Scroll down a bit and find the **mmproj-F16** file:

![Hugging Face file list with the Qwen3-VL mmproj-F16 GGUF file highlighted.](/assets/articles/how-to-add-vision-llms-in-layla-qwen3-vl/mmproj-download.png)

Download that as well.

**Step 2: Configure the model in Layla**

Go back to Layla and open **Inference Settings**. In the **LLM** section, choose **Add Custom Model**, then **Pick from Internal Storage**.

![Layla Inference Settings with Add Custom Model highlighted.](/assets/articles/how-to-add-vision-llms-in-layla-qwen3-vl/add-custom-model.jpg)

![Layla inference-engine picker with Internal Storage highlighted.](/assets/articles/how-to-add-vision-llms-in-layla-qwen3-vl/pick-internal-storage.jpg)

Your settings should look like this afterwards. Note the **Q4_K_M** suffix in your selected model:

![Layla Inference Settings showing the selected Qwen3-VL Q4_K_M model.](/assets/articles/how-to-add-vision-llms-in-layla-qwen3-vl/selected-qwen-model.jpg)

Next, go to the **LLM Vision** section and select your `mmproj` file. Your settings should look like this:

![Layla LLM Vision setting showing the selected Qwen3-VL mmproj-F16 model.](/assets/articles/how-to-add-vision-llms-in-layla-qwen3-vl/selected-mmproj-model.jpg)

With these settings, you can send images in chat and Layla will recognise them!
