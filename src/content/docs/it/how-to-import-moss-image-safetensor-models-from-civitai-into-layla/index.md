---
title: Importare modelli safetensors e LoRA MOSS Image da Civitai in Layla
description: Scarica checkpoint safetensors e LoRA MOSS Image da Civitai e importali in Layla per generare immagini offline sul telefono.
category: Image generation
order: 22
keywords:
  - MOSS Image
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
translationKey: how-to-import-moss-image-safetensor-models-from-civitai-into-layla
ai_translated: true
---

**Layla importa checkpoint safetensors e LoRA MOSS Image da Civitai per generare offline su Android.** MOSS Image è un modello testo-immagine più recente di Stable Diffusion; la comunità pubblica già versioni affinate e LoRA su [Civitai](https://civitai.com/). Conversione e generazione avvengono sul dispositivo.

La guida spiega ricerca, download corretto, importazione e aggiunta di LoRA. Per altre famiglie: [SD 1.5](/it/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/), [SDXL](/it/how-to-import-sdxl-safetensor-models-from-civitai-into-layla/), [Qwen Image 2.1](/it/how-to-import-qwen-image-2-1-safetensor-models-from-civitai-into-layla/), [FLUX.2 Klein](/it/how-to-import-flux-2-klein-safetensor-models-from-civitai-into-layla/). Per GGUF, zip e Web UI consulta [Importare modelli di generazione immagini personalizzati in Layla](/it/how-to-import-custom-image-generation-models-into-layla/).

## Che cos'è MOSS Image?

MOSS-Image è un modello testo-immagine a pesi aperti del team OpenMOSS: transformer di diffusione con 5 miliardi di parametri pubblicato nell'ottobre 2026. **Base** serve per affinamento e addestramento LoRA; **SFT** per generazione quotidiana. Su Civitai si trovano versioni derivate da entrambe.

Su Civitai il filtro **Base model** si chiama **MOSS Image**; in Layla scegli **MOSS**. Un LoRA MOSS Image richiede un checkpoint della stessa famiglia.

## Requisiti

- Telefono Android con Snapdragon 8 Elite (SM8750) o successivo. Gli import MOSS Image usano la NPU Snapdragon e non sono disponibili su iPhone. Layla non verifica il chip all'importazione: controllalo prima di convertire file grandi.

- Mini-app **Local Dream**. Per installarla consulta [Attivare o disattivare le mini-app in Layla](/it/how-to-enable-disable-mini-apps-within-layla/).

- Un modello integrato già scaricato in Local Dream: **MOSS-Image Turbo** / **MOSS-Image Base**. Layla ne riutilizza tokenizer, codificatore di testo e VAE. Se mancano, Safetensor mostra un avviso e disattiva l'importazione.

- Molto spazio libero: un checkpoint MOSS fp16 sfiora 10 GB.

## Quale file safetensors scaricare

**Layla supporta safetensors f16 (mezza precisione)**, etichettati **fp16 SafeTensor** su Civitai. Per MOSS Image accetta anche bf16. I file quantizzati **fp8**, **int8**, **int4** e **nvfp4** non sono supportati.

Molti checkpoint MOSS sono disponibili solo in int8 o bf16. **Best match** può indicare un file quantizzato. Apri la lista delle varianti e verifica prima del download.

## Importare un checkpoint MOSS Image da Civitai

### Passaggio 1: aprire Civitai e Models

![Pagina iniziale Civitai con scheda Models evidenziata.](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/civitai-open-models-page.jpg)

Apri [civitai.com](https://civitai.com/) e scegli **Models** nella navigazione superiore. Le schermate provengono da browser desktop; sul telefono la disposizione può cambiare leggermente.

### Passaggio 2: filtrare Checkpoint, SafeTensor e MOSS Image

![Filtri Civitai con Checkpoint, SafeTensor e MOSS Image selezionati.](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/civitai-moss-image-checkpoint-filters.jpg)

Apri **Filters** in alto a destra:

1. **Model types**: **Checkpoint**.
2. **File format**: **SafeTensor**.
3. **Base model**: cerca e seleziona **MOSS Image**.

La lista mostra i checkpoint MOSS Image nel formato adatto. [Apri la lista filtrata](https://civitai.com/models?types=Checkpoint&fileFormats=SafeTensor&baseModels=MOSS%20Image&sort=Most%20Downloaded).

### Passaggio 3: scaricare il file safetensors fp16

![Download Civitai con fp16 SafeTensor da 9.47 GB e pulsante Download.](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/civitai-moss-image-checkpoint-download-fp16.jpg)

Apri il modello e controlla **Download** a destra. Scegli **fp16 SafeTensor**, qui 9.47 GB, poi **Download** per salvarlo sul telefono. Se esistono più varianti, scegli fp16. Le eccezioni bf16 supportate sono spiegate sopra.

Serve solo il checkpoint. I **Required Components** di Civitai, come codificatore di testo e VAE, servono ad altri strumenti. Layla usa i file di supporto del modello di base già scaricato in Local Dream.

### Passaggio 4: importare in Layla

Apri **Settings** → **Inference Settings** → **Image Generation** → **Add Custom Model**, oppure **Local Dream** → **Add Model**.

![Inference Settings con Add Custom Model in Image Generation.](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/image-generation-settings.jpg)

In **Safetensor**, seleziona **MOSS** in **Base Model**.

![Lista Base Model con SD1.5, SDXL, MOSS, Qwen Image 2.1 e Flux 2 Klein.](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/image-model-base-model-list-layla.jpg)

In **MODEL CHECKPOINT** scegli il file, controlla **MODEL NAME** e tocca **Import & Convert**. Layla converte in un modello di diffusione GGUF Q4_0. Può richiedere diversi minuti: tieni l'app aperta. Il modello viene salvato e selezionato automaticamente.

Layla non esamina il file per confermare la famiglia. Scegliere **MOSS** per un checkpoint diverso può far fallire importazione o generazione.

### Passaggio 5: generare un'immagine

Apri **Local Dream**, verifica il modello e scrivi un prompt. I valori iniziali sono 20 passaggi e CFG 5, modificabili. Turbo e altri checkpoint per pochi passaggi richiedono solitamente valori inferiori.

## Aggiungere un LoRA MOSS Image da Civitai

Un LoRA è un piccolo file che modifica lo stile o insegna un personaggio, oggetto o concetto. Si cerca come un checkpoint, cambiando il tipo di modello.

### Passaggio 1: filtrare LoRA e MOSS Image

![Filtri Civitai con LoRA e MOSS Image selezionati.](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/civitai-moss-image-lora-filters.jpg)

Apri **Models** → **Filters**, scegli **LoRA** in **Model types** e **MOSS Image** in **Base model**. [Apri la lista filtrata](https://civitai.com/models?types=LORA&fileFormats=SafeTensor&baseModels=MOSS%20Image&sort=Most%20Downloaded). Il pannello è lo stesso usato per i checkpoint.

### Passaggio 2: scaricare il LoRA safetensors

![Pagina LoRA MOSS Image con SafeTensor da 61.54 MB e download.](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/civitai-moss-image-lora-download-fp16.jpg)

Alcuni LoRA hanno una versione per ogni base. Scegli MOSS Image, qui **v1.0 Moss**, controlla **fp16 SafeTensor**, qui 61,54 MB, e tocca **Download**.

### Passaggio 3: aggiungere il LoRA durante l'importazione

In **Safetensor** scegli **MOSS** come **Base Model** e il checkpoint. In **LORA FILES (OPTIONAL)** → **Add LoRA** scegli file e intensità, inizialmente 1.0. Puoi aggiungerne diversi. Infine usa **Import & Convert**.

Per MOSS Image i LoRA vengono copiati nella cartella e applicati durante la generazione. Dopo l'importazione seleziona il modello in Local Dream e **Model setup** per vedere o modificare file, campionatore e LoRA.

### Usare un LoRA senza importare un checkpoint intero

Per MOSS Image, attiva **LoRA only** in **Safetensor**. Crei un modello dalla base già scaricata in Local Dream e dai LoRA, saltando il checkpoint e risparmiando tempo e spazio di conversione.

## Domande frequenti

### Posso usare MOSS Image sul telefono?

Sì, rispettando i requisiti sopra. Scegli **MOSS** come **Base Model** e importa il checkpoint Civitai. Le famiglie che riutilizzano una base richiedono prima il suo download in Local Dream.

### Quale file MOSS Image scarico da Civitai?

**fp16 SafeTensor**, oppure bf16. Evita fp8, int8, int4 e nvfp4, anche se Civitai li propone come predefiniti.

### Perché i checkpoint MOSS Image sono grandi?

fp16 memorizza tutti i pesi a mezza precisione: quasi 10 GB per 5 miliardi di parametri. I file quantizzati sono più piccoli ma non importabili.

### Che differenza c'è tra MOSS Base e SFT?

Base serve ad affinamento e addestramento LoRA, SFT alla generazione quotidiana. Entrambi usano **MOSS** in Layla.

### Posso importare MOSS Image su iPhone?

No. iOS importa solo safetensors SD 1.5. Vedi la guida SD 1.5 collegata all'inizio.

### Serve Internet per importare da Civitai?

Solo per scaricare i file. Conversione e generazione avvengono sul dispositivo.

### Come elimino un modello importato?

Apri **Local Dream**, seleziona il modello e tocca **Delete Model** per liberare spazio.

## MOSS Image offline sul telefono

Dopo l'importazione, MOSS Image funziona sul telefono senza Internet, account o abbonamento. Prompt, modello e immagini restano sul dispositivo.
