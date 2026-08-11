---
title: Il campionatore DRY e come impedire a Layla di ripetersi
description: Attiva il campionatore DRY nelle Impostazioni avanzate per ridurre le frasi ripetute nelle risposte di Layla.
category: Models & performance
order: 60
keywords:
  - campionatore DRY
  - penalità di ripetizione
  - Impostazioni avanzate di Layla
  - risposte ripetute
  - LLM quantizzato
lastUpdated: 2024-04-26
translationKey: the-dry-sampler-and-how-to-stop-layla-from-repeating-herself-over-and-over-again
ai_translated: true
---

![Valori predefiniti consigliati per il campionatore DRY.](./dry-sampler-defaults.jpeg)

La ripetizione è un problema comune di questa generazione di LLM, in particolare di quelli eseguiti sul telefono. Ciò è dovuto in parte alla quantizzazione: i modelli sono stati compressi riducendo la precisione di ogni neurone.

A volte i personaggi possono ripetere continuamente le stesse frasi. Per attenuare il problema, apri le _Impostazioni avanzate_ e attiva il moltiplicatore DRY. I valori mostrati nell'immagine precedente sono impostazioni predefinite adeguate. Puoi modificarli per trovare i risultati migliori per il tuo personaggio.

Per una spiegazione più approfondita del motivo per cui ciò accade e del funzionamento di DRY, consulta la [discussione sul campionatore DRY in text-generation-webui](https://github.com/oobabooga/text-generation-webui/pull/5677#issue-2177692564).
