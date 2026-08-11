---
title: Come importare modelli Safetensor SD1.5 da Civitai in Layla
description: Importa file Safetensor da Civitai in Layla per generare immagini localmente.
category: Image generation
order: 20
keywords:
  - SD 1.5
  - Safetensor
  - Civitai
  - generazione di immagini
  - Local Dream
lastUpdated: 2026-05-06
translationKey: how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla
ai_translated: true
---

Layla supporta i modelli Safetensor per la generazione di immagini. La maggior parte dei file Safetensor per la generazione di immagini è disponibile su [Civitai](https://civitai.com/).

Questo tutorial illustra come importare file Safetensor da Civitai in Layla.

**Passaggio 1: apri [Civitai](https://civitai.com/)**

![Pagina Modelli di Civitai con i filtri per tipo di modello, formato del file e modello di base evidenziati.](./civitai-model-filters.png)

Apri la sezione **Modelli**. Nei filtri nell'angolo in alto a destra, seleziona **Checkpoint** sotto **Tipo di modello**. Sotto **Formato file**, seleziona **SafeTensor** e sotto **Modello di base**, seleziona **SD 1.5**.

Verrà visualizzato un elenco di tutti i modelli di immagini supportati da Layla.

**Passaggio 2: scarica il file Safetensor**

![Pagina di download di un modello Civitai con esempi di immagini generate.](./civitai-model-download.png)

Scarica il file Safetensor dalla pagina di download. _Assicurati che le dimensioni del file siano di circa 2 GB: ciò indica che il file è formattato correttamente._

**Passaggio 3: importa il file in Layla**

Apri **Impostazioni** → **Impostazioni di inferenza**.

Scorri verso il basso fino alle impostazioni di **Generazione di immagini** e tocca **Aggiungi modello personalizzato**.

![Schermata Impostazioni di inferenza di Layla con Aggiungi modello personalizzato nella sezione Generazione di immagini.](./image-generation-settings.jpg)

![Finestra di dialogo di Layla per scegliere un modello locale di generazione di immagini o SD Web UI.](./choose-image-model.jpg)

Seleziona il file Safetensor appena scaricato. Layla inizierà a importarlo.

![Finestra di avanzamento di Layla durante l'importazione di un file Safetensor.](./importing-safetensor.jpg)

![Finestra di dialogo di Layla per scegliere un modello locale di generazione di immagini o SD Web UI.](./choose-image-model.jpg)

**Passaggio 4: genera un'immagine**

Dopo aver importato il modello di immagini, apri la mini-app Local Dream e usala per generare un'immagine.

![Schermata Local Dream configurata per generare l'immagine di un'auto veloce.](./local-dream-generate.jpg)

![Schermata di selezione del modello di Local Dream con diversi modelli installati.](./local-dream-select-model.jpg)
