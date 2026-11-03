---
title: Importare modelli safetensors e LoRA SD 1.5 da Civitai in Layla
description: Scarica checkpoint safetensors e LoRA SD 1.5 da Civitai e importali in Layla per generare immagini offline sul telefono.
category: Image generation
order: 20
keywords:
  - SD 1.5
  - generazione immagini offline
  - generatore immagini IA Android
  - Stable Diffusion
  - modelli Civitai
  - importare safetensors
  - modelli immagini GGUF
  - LoRA
  - NPU Snapdragon
  - Local Dream
  - NPU Forge
  - testo-immagine
  - immagine-immagine
  - immagini dei personaggi
  - Stable Diffusion su iPhone
  - Layla
lastUpdated: 2026-11-04
translationKey: how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla
ai_translated: true
---

**Layla importa checkpoint safetensors e LoRA Stable Diffusion 1.5 (SD 1.5) da Civitai per generare offline su Android e iPhone.** La maggior parte dei modelli della comunità su [Civitai](https://civitai.com/) usa safetensors. Layla li converte sul dispositivo: dopo il download non serve Internet per generare.

La guida spiega ricerca, download corretto, importazione e aggiunta di LoRA. Per altre famiglie: [SDXL](/it/how-to-import-sdxl-safetensor-models-from-civitai-into-layla/), [MOSS Image](/it/how-to-import-moss-image-safetensor-models-from-civitai-into-layla/), [Qwen Image 2.1](/it/how-to-import-qwen-image-2-1-safetensor-models-from-civitai-into-layla/), [FLUX.2 Klein](/it/how-to-import-flux-2-klein-safetensor-models-from-civitai-into-layla/). Per GGUF, zip e Web UI consulta [Importare modelli di generazione immagini personalizzati in Layla](/it/how-to-import-custom-image-generation-models-into-layla/).

## Che cos'è SD 1.5?

SD 1.5 è Stable Diffusion 1.5, versione di [Stable Diffusion](https://en.wikipedia.org/wiki/Stable_Diffusion) che genera immagini 512 x 512. È la famiglia più diffusa su Civitai, con migliaia di checkpoint e LoRA fotorealistici, anime e per illustrazioni. Compare come **SD 1.5** nel filtro **Base model**.

Un LoRA funziona solo con checkpoint della stessa base. Un LoRA SD 1.5 non funziona con SDXL e viceversa.

## Quale file safetensors scaricare

**Layla supporta solo safetensors f16 (mezza precisione).** Su Civitai cerca **fp16 SafeTensor** nella sezione download e verifica la precisione.

Un checkpoint SD 1.5 fp16 è solitamente circa 2 GB. Una versione a piena precisione può occupare diversi gigabyte in più. Scegli fp16.

## Importare un checkpoint SD 1.5 da Civitai

### Passaggio 1: aprire Civitai e Models

![Pagina iniziale Civitai con scheda Models evidenziata.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-open-models-page.jpg)

Apri [civitai.com](https://civitai.com/) e scegli **Models** nella navigazione superiore. Le schermate provengono da browser desktop; sul telefono la disposizione può cambiare leggermente.

### Passaggio 2: filtrare Checkpoint, SafeTensor e SD 1.5

![Filtri Civitai con Checkpoint, SafeTensor e SD 1.5 selezionati.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-sd-1-5-checkpoint-filters.jpg)

Apri **Filters** in alto a destra:

1. **Model types**: **Checkpoint**.
2. **File format**: **SafeTensor**.
3. **Base model**: cerca e seleziona **SD 1.5**.

La lista mostra i checkpoint SD 1.5 nel formato adatto. [Apri la lista filtrata](https://civitai.com/models?types=Checkpoint&fileFormats=SafeTensor&baseModels=SD%201.5&sort=Most%20Downloaded).

Per iniziare puoi ordinare per **Most Downloaded** o **Highest Rated**.

### Passaggio 3: scaricare il file safetensors fp16

![Download Civitai con fp16 SafeTensor da 1.99 GB e pulsante Download.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-sd-1-5-checkpoint-download-fp16.jpg)

Apri il modello e controlla **Download** a destra. Scegli **fp16 SafeTensor**, qui 1.99 GB, poi **Download** per salvarlo sul telefono. Se esistono più varianti, scegli fp16. Le eccezioni bf16 supportate sono spiegate sopra.

### Passaggio 4: importare in Layla

Apri **Settings** → **Inference Settings** → **Image Generation** → **Add Custom Model**, oppure **Local Dream** → **Add Model**.

![Inference Settings con Add Custom Model in Image Generation.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/image-generation-settings.jpg)

In **Safetensor**, lascia **Base Model** su **SD1.5**. Su iPhone la lista non appare perché solo questa famiglia è disponibile.

![Add Image Model con Safetensor e Base Model SD1.5.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/add-image-model-safetensor-tab-layla.jpg)

In **MODEL CHECKPOINT** scegli il file, controlla il nome e tocca **Import & Convert**. Tieni Layla aperta per i minuti necessari. Al termine il modello viene salvato e selezionato automaticamente.

### Passaggio 5: generare un'immagine

Apri **Local Dream**, verifica il modello selezionato e scrivi un prompt.

![Local Dream impostato per generare l'immagine di un'auto veloce.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/local-dream-generate.jpg)

![Selezione Local Dream con diversi modelli installati.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/local-dream-select-model.jpg)

Gli import SD 1.5 eseguiti così usano la CPU fino a 512 x 512. Con Qualcomm Snapdragon compatibile puoi convertire lo stesso checkpoint per la NPU e accelerare. Consulta [NPU Forge](/it/how-to-convert-safetensors-to-qnn-with-npu-forge-in-layla/).

## Aggiungere un LoRA SD 1.5 da Civitai

Un LoRA è un piccolo file che modifica lo stile o insegna un personaggio, oggetto o concetto. Si cerca come un checkpoint, cambiando il tipo di modello.

### Passaggio 1: filtrare LoRA e SD 1.5

![Filtri Civitai con LoRA e SD 1.5 selezionati.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-sd-1-5-lora-filters.jpg)

Apri **Models** → **Filters**, scegli **LoRA** in **Model types** e **SD 1.5** in **Base model**. [Apri la lista filtrata](https://civitai.com/models?types=LORA&fileFormats=SafeTensor&baseModels=SD%201.5&sort=Most%20Downloaded). Il pannello è lo stesso usato per i checkpoint.

### Passaggio 2: scaricare il LoRA safetensors

![Pagina LoRA SD 1.5 con SafeTensor da 9.11 MB e download.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-sd-1-5-lora-download-fp16.jpg)

Un LoRA è molto più piccolo, spesso 10–150 MB; l'esempio è 9,11 MB. Scegli **fp16 SafeTensor** quando la precisione è indicata e tocca **Download**.

### Passaggio 3: aggiungere il LoRA durante l'importazione

In **Safetensor** scegli **SD1.5** come **Base Model** e il checkpoint. In **LORA FILES (OPTIONAL)** → **Add LoRA** scegli file e intensità, inizialmente 1.0. Puoi aggiungerne diversi. Infine usa **Import & Convert**.

Per SD 1.5 i LoRA vengono incorporati nel modello convertito e non sono più modificabili o rimovibili. Per cambiare combinazione reimporta il checkpoint originale con un nuovo nome.

## Domande frequenti

### Posso usare SD 1.5 sul telefono?

Sì, rispettando i requisiti sopra. Scegli **SD1.5** come **Base Model** e importa il checkpoint Civitai. Le famiglie che riutilizzano una base richiedono prima il suo download in Local Dream.

### Quale file SD 1.5 scarico da Civitai?

**fp16 SafeTensor**. Altre precisioni e formati come PickleTensor (`.ckpt`) non sono adatti.

### Serve Internet per importare da Civitai?

Solo per scaricare i file. Conversione e generazione avvengono sul dispositivo.

### Posso importare SD 1.5 su iPhone?

Sì. iOS importa SD 1.5 da **Safetensor**. Le altre famiglie sono solo Android.

### Posso importare SDXL o altre famiglie?

Su Android sì: SDXL, MOSS Image, Qwen Image 2.1 e FLUX.2 Klein. Le guide sono collegate sopra.

### Posso usare LoRA SD 1.5?

Sì, durante l'importazione in **Safetensor**. Devono essere SD 1.5 e l'intensità viene fissata con la conversione.

### Perché l'importazione è lenta?

Convertire l'intero checkpoint può richiedere diversi minuti. Tieni Layla aperta fino alla fine.

### Come elimino un modello importato?

Apri **Local Dream**, seleziona il modello e tocca **Delete Model** per liberare spazio.

## SD 1.5 offline sul telefono

Dopo l'importazione, SD 1.5 funziona sul telefono senza Internet, account o abbonamento. Prompt, modello e immagini restano sul dispositivo.
