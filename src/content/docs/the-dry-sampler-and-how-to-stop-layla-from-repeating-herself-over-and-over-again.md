---
title: The DRY sampler and how to stop Layla from repeating herself
description: Enable the DRY sampler in Advanced Settings to reduce repeated phrases in Layla's responses.
category: Models & performance
order: 60
keywords:
  - DRY sampler
  - repetition penalty
  - Layla Advanced Settings
  - repeated responses
  - quantized LLM
lastUpdated: 2024-04-26
---

![Recommended default values for the DRY sampler.](/assets/articles/the-dry-sampler-and-how-to-stop-layla-from-repeating-herself-over-and-over-again/dry-sampler-defaults.jpeg)

Repetition is a common problem with this generation of LLMs, especially those running on your phone. This is partly because they are quantised, which means they have been compressed by reducing the precision of each neuron.

Sometimes, your characters may say the same few phrases over and over. To alleviate this problem, go to *Advanced Settings* and turn on the DRY multiplier. The values shown in the image above are sensible defaults. Feel free to adjust them to find the best results for your character!

For a deeper explanation of why this happens and how DRY works, see the [DRY sampler discussion in text-generation-webui](https://github.com/oobabooga/text-generation-webui/pull/5677#issue-2177692564).
