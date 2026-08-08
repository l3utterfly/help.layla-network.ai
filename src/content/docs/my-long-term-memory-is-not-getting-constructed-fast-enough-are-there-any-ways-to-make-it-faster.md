---
title: How can I make Long-Term Memory construction faster?
description: Give Layla background permissions, use manual ingestion, and keep the app running so Long-Term Memory can process conversations.
category: Guides
order: 310
keywords:
  - Layla Long-Term Memory
  - memory ingestion
  - background processing
  - battery optimization
  - Android permissions
sourceUrl: https://blog.layla-network.ai/post/my-long-term-memory-is-not-getting-constructed-fast-enough-are-there-any-ways-to-make-it-faster
lastUpdated: 2024-03-15
---

For more information on the feature, read [How does Long-Term Memory work in Layla?](https://www.layla-network.ai/post/how-does-long-term-memory-work-in-layla).

As explained in that article, Long-Term Memory is constructed in the background.

Modern mobile operating systems such as Android and iOS strictly limit the amount of processing power apps can use in the background.

Here are some things you can do to speed up ingestion:

1. Give Layla *Unrestricted background usage* in Android Settings.
2. Turn off *Battery optimisation* for Layla in Android Settings.
3. Enable background-fetch permissions for Layla in iOS Settings.

You can also go directly to the Long-Term Memory app in Layla and tap *Ingest*.

You can do this before going to sleep each night to make sure your conversations are ingested. The button starts the ingestion process, which continues until there are no more conversations to process.

Leaving the app in the foreground before you go to sleep also helps, because the operating system allocates more processing power to foreground apps.

**Important: whichever method you use, keep Layla running in the background so this process can occur. Do not exit the app.**

![Long-Term Memory app in Layla.](/assets/articles/my-long-term-memory-is-not-getting-constructed-fast-enough-are-there-any-ways-to-make-it-faster/long-term-memory-app.png)
