---
title: Come aggiungere LLM visivi in Layla (Qwen3-VL)
description: Scarica un modello GGUF Qwen3-VL e il relativo file mmproj, quindi configuralo in Layla per riconoscere le immagini nelle chat.
category: Models & performance
order: 40
keywords:
  - LLM visivo
  - Qwen3-VL
  - mmproj
  - modello visivo GGUF
  - riconoscimento delle immagini
lastUpdated: 2025-11-24
translationKey: how-to-add-vision-llms-in-layla-qwen3-vl
ai_translated: true
---

Questo articolo spiega come aggiungere LLM visivi a Layla.

Layla supporta gli LLM visivi, quindi puoi inviare immagini in chat affinché le riconosca e ne discuta.

Prendiamo come esempio la famiglia di modelli Qwen3-VL. Questi modelli includono funzionalità di riconoscimento delle immagini che funzionano bene sui dispositivi mobili.

Ecco come utilizzarli in Layla:

**Passaggio 1: scarica i modelli Qwen3-VL**

Puoi trovarli nel [repository Qwen3-VL-2B-Instruct-GGUF su Hugging Face](https://huggingface.co/unsloth/Qwen3-VL-2B-Instruct-GGUF/tree/main).

È consigliato il modello 2B: è veloce e abbastanza preciso. Se hai un telefono potente, puoi provare i modelli 4B o 8B più grandi.

Nell'elenco dei file della pagina, scegli la quantizzazione **Q4_K_M** e scaricala.

![Elenco di file di Hugging Face con il file GGUF Qwen3-VL 2B Q4_K_M evidenziato.](./qwen-model-download.png)

Scorri leggermente verso il basso e cerca il file **mmproj-F16**:

![Elenco di file di Hugging Face con il file GGUF mmproj-F16 di Qwen3-VL evidenziato.](./mmproj-download.png)

Scarica anche questo file.

**Passaggio 2: configura il modello in Layla**

Torna in Layla e apri **Impostazioni di inferenza**. Nella sezione **LLM**, scegli **Aggiungi modello personalizzato**, quindi **Scegli dalla memoria interna**.

![Impostazioni di inferenza di Layla con Aggiungi modello personalizzato evidenziato.](./add-custom-model.jpg)

![Selettore del motore di inferenza di Layla con Memoria interna evidenziata.](./pick-internal-storage.jpg)

Le impostazioni dovrebbero quindi apparire come segue. Nota il suffisso **Q4_K_M** nel modello selezionato:

![Impostazioni di inferenza di Layla con il modello Qwen3-VL Q4_K_M selezionato.](./selected-qwen-model.jpg)

Apri quindi la sezione **Visione LLM** e seleziona il file `mmproj`. Le impostazioni dovrebbero apparire così:

![Impostazione Visione LLM di Layla con il modello Qwen3-VL mmproj-F16 selezionato.](./selected-mmproj-model.jpg)

Con queste impostazioni puoi inviare immagini in chat e Layla sarà in grado di riconoscerle.
