---
title: How to import SD1.5 Safetensor models from Civit.ai into Layla
description: How to import Safetensor files from Civitai into Layla for local image generation.
category: Image generation
order: 20
keywords:
  - SD 1.5
  - Safetensor
  - Civitai
  - image generation
  - Local Dream
lastUpdated: 2026-05-06
---

Layla supports Safetensor models for image generation. Most image-generation Safetensor files can be found on [Civitai](https://civitai.com/).

This tutorial will walk you through importing Safetensor files from Civitai into Layla.

**Step 1: Go to [Civitai](https://civitai.com/)**

![Civitai Models page with model-type, file-format, and base-model filters highlighted.](/assets/articles/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-model-filters.png)

Go to the **Models** section. In the filters at the top-right corner, filter by **Model Type** and select **Checkpoint**. Under **File format**, select **SafeTensor**, and under **Base Model**, select **SD 1.5**.

This will give you a list of all image models supported by Layla.

**Step 2: Download the Safetensor file**

![Civitai model download page showing example generated images.](/assets/articles/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-model-download.png)

Download the Safetensor file from the download page. *Make sure the file size is around 2 GB. That will let you know the file is formatted correctly.*

**Step 3: Import into Layla**

Go to **Settings** → **Inference Settings**.

Scroll down to **Image Generation** settings and tap **Add Custom Model**.

![Layla Inference Settings screen with Add Custom Model in the Image Generation section.](/assets/articles/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/image-generation-settings.jpg)

![Layla dialog for choosing a local image-generation model or SD Web UI.](/assets/articles/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/choose-image-model.jpg)

Select the Safetensor file you just downloaded. Layla will begin to import the file.

![Layla progress dialog showing a Safetensor file being imported.](/assets/articles/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/importing-safetensor.jpg)

![Layla dialog for choosing a local image-generation model or SD Web UI.](/assets/articles/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/choose-image-model.jpg)

**Step 4: Generate!**

After your image model is imported, go to the Local Dream mini-app and use it to generate an image!

![Local Dream screen configured to generate an image of a fast car.](/assets/articles/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/local-dream-generate.jpg)

![Local Dream model-selection screen showing several installed models.](/assets/articles/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/local-dream-select-model.jpg)
