---
title: The Mirostat sampler and how to reduce repeated responses
description: Enable the Mirostat sampler in Layla and learn how adaptive perplexity control can reduce repetition.
category: Guides
order: 330
keywords:
  - Mirostat sampler
  - repeated responses
  - perplexity
  - text generation
  - Layla Advanced Settings
sourceUrl: https://blog.layla-network.ai/post/the-mirostat-sampler-and-stopping-layla-from-repeating-the-same-thing-over-and-over-again
lastUpdated: 2024-01-12
---

If Layla repeats the same ending in her messages over and over, one solution is to enable the Mirostat sampler:

1. Go to the *Settings* page.
2. Tap *Advanced Settings*.
3. Scroll down and turn on the *MiroStat Sampler*.

![Steps for enabling the Mirostat sampler in Layla.](/assets/articles/the-mirostat-sampler-and-stopping-layla-from-repeating-the-same-thing-over-and-over-again/enable-mirostat.png)

**What is the Mirostat Sampler?**

The Mirostat sampler is a neural text-decoding algorithm designed for language models, with a particular focus on directly controlling perplexity during text generation. Perplexity measures uncertainty in predicting the next token in a sequence, with lower perplexity generally indicating more predictable text.

Mirostat is designed to maintain the quality of generated text within a desired range, balancing coherence and diversity. This helps avoid two common problems in text generation: the "boredom trap" of excessive repetition and the "confusion trap" of incoherence. By setting a target perplexity and using a feedback-based adaptive approach, Mirostat can generate text of any length with a predetermined level of perplexity without ad hoc parameter tuning.

The algorithm has been found to reduce sentence-level repetitions and improve fluency, coherence, and overall text quality in experiments with human raters. Controlling perplexity can influence important attributes of generated text, including the amount of repetition.

Mirostat advances beyond traditional sampling methods such as top-k, top-p or nucleus sampling, and temperature-based sampling. Those methods often require careful tuning and can still produce objectionable repetition or incoherence. By offering a more controlled approach, Mirostat contributes to more sophisticated and reliable language-model output.

For more information, read the paper [Mirostat: A Neural Text Decoding Algorithm that Directly Controls Perplexity](https://ar5iv.labs.arxiv.org/html/2007.14966).
