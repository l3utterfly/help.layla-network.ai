---
title: What Is GGUF? A Plain-English Guide to GGUF Models
description: Learn what GGUF models and quantization are, how to choose a quant, and how to load a custom GGUF model in Layla.
category: Models & performance
order: 30
keywords:
  - GGUF models
  - model quants
  - quantization
  - custom LLM
  - Hugging Face
lastUpdated: 2024-08-21
---

If you've spent any time exploring local AI models on Hugging Face, you've probably noticed files ending in `.gguf` everywhere. So what is a GGUF model, and why does almost every offline AI app—including Layla—use this format?

This guide explains what GGUF means and how it works, then walks you through loading any custom GGUF model into Layla. This lets you run uncensored, role-playing, or specialised AI models directly on your Android phone, with no internet, subscription, or cloud service.

## What is GGUF?

**GGUF is a file format for running large language models on consumer hardware such as laptops, desktops, and phones.** A single `.gguf` file contains everything needed to run an AI model—the model weights, tokenizer, prompt template, and metadata—packed into one portable binary that can be loaded by a GGUF-compatible inference engine.

GGUF was introduced in August 2023 by the [llama.cpp](https://github.com/ggerganov/llama.cpp) project, the same open-source inference engine that powers Layla. Before GGUF, the project used an older format called GGML. That format required code changes whenever someone wanted to add a new model architecture. GGUF replaced it with a structured metadata system, which is why it has become the de facto standard for distributing locally run LLMs.

If you've used Ollama, LM Studio, GPT4All, Jan, koboldcpp, or Layla, you've used GGUF even if you didn't know it.

## What does GGUF stand for?

GGUF stands for **GGML Universal File**. GGML itself is the name of the underlying tensor library, named after its creator, Georgi Gerganov. You may occasionally see it expanded as "GPT-Generated Unified Format"; both versions appear online, but the llama.cpp project uses "GGML Universal File".

## Why GGUF models matter for offline AI on mobile

GGUF's key feature is **quantization**: a technique that shrinks a model's weights from 16-bit or 32-bit numbers to 8, 4, or even 2 bits each. This makes the file dramatically smaller without destroying its intelligence, which makes it possible to run a 7-billion or 8-billion parameter model on a phone.

In practical terms, GGUF lets you:

- Run a capable AI assistant entirely **offline**, with no internet connection.
- Keep your conversations **private**, because nothing leaves your device.
- Avoid subscriptions and rate limits.
- Pick **any model from the community**, including models fine-tuned for particular styles or with content filters removed.

## What you can do with custom GGUF models in Layla

The pre-built models Layla downloads on first launch are good general-purpose assistants. Layla also lets you load **any GGUF model you want**.

The open-source community has fine-tuned thousands of GGUF models for many use cases:

- **Uncensored or no-filter chat models** that respond without the guardrails of mainstream chatbots
- **Roleplay and creative-writing models** such as Stheno, MythoMax, and Mahou, built for immersive long-form conversations
- **Coding models** specialised for programming languages
- **Reasoning and math models** for problem-solving
- **Domain-specific models** for medicine, law, language learning, and more

You can browse GGUF models tested to work well with Layla on the [l3utterfly Hugging Face page](https://huggingface.co/l3utterfly).

## How to load a custom GGUF model into Layla

Here is the full walkthrough, using the popular Stheno-Mahou roleplay model as an example.

### Step 1 — Pick a model on Hugging Face

For this example, we'll use [Stheno-Mahou](https://huggingface.co/l3utterfly/llama-3-Stheno-Mahou-8B-gguf), a well-liked roleplay-focused fine-tune of Llama 3.

![Files and versions tab in the Stheno-Mahou Hugging Face repository.](./files-and-versions-tab.png)

### Step 2 — Open the Files and versions tab

This is where Hugging Face lists every downloadable variant of the model.

![List of quantized model files in a Hugging Face repository.](./model-files.png)

### Step 3 — Pick the right quant for your phone

Each filename is annotated with a Q number, such as Q2_K, Q4_K_M, Q6_K, or Q8_0. This is the **quantization level**: how aggressively the model has been compressed.

The rule is simple:

- **Higher Q number = bigger file = better response quality, but more RAM and a faster phone are required.**
- **Lower Q number = smaller file = faster on weaker hardware, but slightly lower-quality responses.**

A reasonable starting point for most phones is **Q4_K_M**. If it feels fast and responsive, try Q6 or Q8 for better quality. If it feels sluggish, drop to Q3 or Q2.

You may also notice three special quants: Q4_0_4_4, Q4_0_4_8, and Q4_0_8_8. These are optimised for newer ARM phones with **i8mm** hardware acceleration and can run noticeably faster on supported devices. Check the guide to [Layla's i8mm hardware support](https://www.layla-network.ai/post/layla-supports-i8mm-hardware-for-running-llm-models) to see if your phone qualifies.

### Step 4 — Download the file

Tap the download arrow next to the quant you picked. The `.gguf` file will be saved to your phone's Downloads folder, or wherever your browser saves files.

![Download button beside a GGUF quant in a Hugging Face repository.](./download-quant.png)

### Step 5 — Add the model in Layla

Open Layla and go to **Inference Settings** → **Add a custom model** → **Local file**. Use the file picker to find the `.gguf` file you just downloaded.

![LLM section of Layla's Inference Settings.](./llm-settings.png)

![Add a Custom Model screen in Layla.](./add-custom-model.png)

![Local file option for adding a custom model in Layla.](./choose-local-file.png)

In the file picker, choose the model you just downloaded.

### Step 6 — Set the correct prompt format

This is the step people forget. Every model family expects prompts wrapped in a specific format: Llama 3 uses one, Mistral uses another, ChatML is a third, and so on. The model's Hugging Face page will tell you which format it expects. Set it in Layla's prompt-format settings, and you're done—your custom GGUF model is now running fully offline on your phone. For a field-by-field walkthrough, see [How to set up custom prompt templates for models in Layla](/how-to-set-up-custom-prompt-templates-for-models/).

![Prompt-format selector for a custom model in Layla.](./prompt-format.png)

## Frequently asked questions about GGUF

### What is a GGUF file?

A `.gguf` file is a single binary that packages an AI model's weights, tokenizer, and configuration together. It is the format llama.cpp and many other local-AI tools use to load and run language models.

### What does GGUF mean in AI models?

When a model is listed as GGUF on Hugging Face, it has been converted into the GGUF format and is ready to run locally on consumer hardware through tools such as Layla, llama.cpp, Ollama, or LM Studio, without a GPU server or cloud API.

### Is GGUF better than safetensors or PyTorch?

They serve different purposes. PyTorch and safetensors are training and research formats: full-precision, large, and GPU-oriented. GGUF is an **inference** format: quantized, compact, and optimised for CPUs, phones, and modest GPUs. If you want to *use* a model rather than *train* it, GGUF is the more appropriate choice.

### Can I run GGUF models on Android?

Yes. That is exactly what Layla does. Layla wraps llama.cpp on Android and lets you load a GGUF model from your device or download one from Hugging Face.

### What GGUF quant should I download?

Start with **Q4_K_M**. It is a popular balance of size, speed, and quality. Move up to Q6 or Q8 if your phone handles it, or down to Q3 or Q2 if it does not.

### Where can I find GGUF models?

The largest collection is on [Hugging Face](https://huggingface.co). Search for a model name followed by "GGUF" to find quantized versions. For models tested to work well with Layla, see [huggingface.co/l3utterfly](https://huggingface.co/l3utterfly).
