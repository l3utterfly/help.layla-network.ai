---
title: Il campionatore Mirostat e come ridurre le risposte ripetute
description: Attiva il campionatore Mirostat in Layla e scopri come il controllo adattivo della perplessità può ridurre le ripetizioni.
category: Models & performance
order: 70
keywords:
  - campionatore Mirostat
  - risposte ripetute
  - perplessità
  - generazione di testo
  - Impostazioni avanzate di Layla
lastUpdated: 2024-01-12
translationKey: the-mirostat-sampler-and-stopping-layla-from-repeating-the-same-thing-over-and-over-again
ai_translated: true
---

Se Layla ripete continuamente la stessa conclusione nei suoi messaggi, una soluzione è attivare il campionatore Mirostat:

1. Apri la pagina _Impostazioni_.
2. Tocca _Impostazioni avanzate_.
3. Scorri verso il basso e attiva il _Campionatore MiroStat_.

![Passaggi per attivare il campionatore Mirostat in Layla.](./enable-mirostat.png)

**Che cos'è il campionatore Mirostat?**

Il campionatore Mirostat è un algoritmo neurale di decodifica del testo progettato per i modelli linguistici, con particolare attenzione al controllo diretto della perplessità durante la generazione. La perplessità misura l'incertezza nella previsione del token successivo di una sequenza; una perplessità inferiore indica generalmente un testo più prevedibile.

Mirostat è progettato per mantenere la qualità del testo generato entro un intervallo desiderato, bilanciando coerenza e varietà. Aiuta così a evitare due problemi comuni nella generazione del testo: la «trappola della noia» causata da ripetizioni eccessive e la «trappola della confusione» causata dall'incoerenza. Impostando una perplessità obiettivo e utilizzando un approccio adattivo basato sul feedback, Mirostat può generare testo di qualsiasi lunghezza con un livello di perplessità prestabilito, senza regolazioni specifiche dei parametri.

Negli esperimenti con valutatori umani, l'algoritmo ha ridotto le ripetizioni a livello di frase e migliorato fluidità, coerenza e qualità complessiva del testo. Il controllo della perplessità può influire su caratteristiche importanti del testo generato, tra cui la quantità di ripetizioni.

Mirostat supera i metodi di campionamento tradizionali come top-k, top-p o nucleus sampling e il campionamento basato sulla temperatura. Questi metodi richiedono spesso una regolazione accurata e possono comunque produrre ripetizioni indesiderate o testo incoerente. Grazie a un approccio più controllato, Mirostat contribuisce a produrre output dei modelli linguistici più affidabili.

Per ulteriori informazioni, leggi l'articolo [Mirostat: A Neural Text Decoding Algorithm that Directly Controls Perplexity](https://ar5iv.labs.arxiv.org/html/2007.14966).
