---
title: Integrazioni di Layla con Tasker
description: Usa le attività Tasker di Layla e l'evento di completamento per automatizzare flussi di lavoro Android con un LLM.
category: Mini-apps & integrations
order: 50
keywords:
  - integrazione di Layla con Tasker
  - automazione Android
  - inferenza in background
  - evento Task Completed
  - automazione con LLM
lastUpdated: 2024-10-17
translationKey: layla-integrations-with-tasker
ai_translated: true
---

Layla è integrata con Tasker. Puoi automatizzare le attività utilizzando un LLM.

![Logo di Tasker.](./tasker-logo.png)

**Che cos'è Tasker?**

Tasker consente di creare attività automatizzate in base a condizioni di attivazione sul dispositivo. Ad esempio, puoi chiedere a un LLM di riassumere il contenuto di una nuova e-mail quando arriva.

_Nota: questa funzione richiede l'acquisto di [Tasker su Google Play](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm&hl=en)._

Layla non è affiliata a Tasker. Tasker è un'app diffusa per l'automazione di Android.

**Come creare un'attività Tasker con Layla**

Layla offre due attività principali:

1. **Infer:** invia un prompt e un input a Layla. Layla crea un'attività di inferenza che successivamente elabora l'input tramite un LLM e restituisce l'output.
2. **Infer in Background:** esegue la stessa operazione, ma avvia immediatamente l'inferenza con l'LLM in background.

Entrambe le attività accettano input configurabili, come il modello LLM, i prompt di sistema e l'input non elaborato. Questi dati vengono forniti come variabili Tasker, perciò puoi concatenare facilmente le attività con altre azioni.

![Esempio di catena Tasker che usa una variabile e l'azione Create Infer Task di Layla.](./tasker-chain.jpg)

L'immagine precedente mostra un esempio di configurazione di un'attività:

1. L'azione _Variable Set_ può essere sostituita dall'output ottenuto da altre attività. Ad esempio, se utilizzi AutoNotification in Tasker, puoi acquisire input dalle notifiche e passarlo all'LLM.
2. _Create Infer Task_ è l'attività principale esposta da Layla. Prende le variabili impostate in precedenza e le elabora tramite l'LLM. Un esempio è un'istruzione per riassumere il contenuto della notifica fornito in precedenza.

![Opzioni configurabili per un'attività di inferenza Layla in Tasker.](./infer-task-options.jpg)

Layla espone anche un evento _Task Completed_:

![Evento Task Completed di Layla in Tasker.](./task-completed-event.jpg)

Questo evento viene attivato ogni volta che un'attività di inferenza termina nell'ambito del processo in background di Layla. Puoi intercettarlo ed eseguire altre azioni in base all'output dell'attività.
