---
title: Come funzionano le cronologie chat di Layla con personaggi, persona, modelli e scenari di gioco di ruolo
description: Scopri cosa appartiene a una conversazione Layla, cosa viene ripristinato quando la riapri e come le modifiche alla configurazione influenzano le risposte future.
category: Chat & memory
order: 20
keywords:
  - cronologia chat
  - personaggi
  - persona
  - modelli IA locali
  - scenari di gioco di ruolo
lastUpdated: 2026-07-31
translationKey: how-layla-chat-histories-work-across-characters-personas-models-and-roleplay-scenarios
ai_translated: true
---

**In Layla, la cronologia appartiene alla conversazione e non è vincolata in modo permanente a un personaggio, una persona, un modello IA o uno scenario di gioco di ruolo.** Quando riapri una conversazione, Layla ne ripristina per impostazione predefinita la configurazione salvata, ma puoi modificarla per i messaggi futuri senza riscrivere la cronologia esistente.

Questo articolo descrive il comportamento previsto sia come guida per l’utente sia come specifica tecnica. Illustra le impostazioni salvate con una chat, cosa accade quando cambiano e quando è meglio diramare una conversazione invece di continuare l’originale.

## In breve

Una conversazione Layla contiene due tipi di dati correlati ma distinti:

1. **Cronologia della conversazione:** i messaggi già scambiati, compresi ordine, ruoli e contenuti memorizzati.
2. **Configurazione attiva:** personaggio, persona utente, modello, scenario di gioco di ruolo, impostazioni del prompt e risorse associate usate per generare la risposta successiva.

I messaggi esistenti restano nella stessa cronologia quando cambia la configurazione attiva. La nuova configurazione si applica a partire dal messaggio generato successivo.

Puoi, ad esempio, riaprire una chat con un personaggio IA che usava un modello GGUF, passare a un altro modello IA locale compatibile e continuare la conversazione. Layla non rigenera né modifica silenziosamente i messaggi precedenti. Il nuovo modello può però interpretare la stessa cronologia in modo diverso, perché i modelli variano nella gestione dei prompt, nella lunghezza del contesto, nello stile e nel rispetto delle istruzioni.

## Matrice del comportamento della cronologia

| Elemento di configurazione                 | Salvato con la conversazione | Modificabile dopo la riapertura | Modifica i messaggi esistenti | Si applica alle risposte future |
| ------------------------------------------ | ---------------------------- | ------------------------------- | ----------------------------- | ------------------------------- |
| Personaggio                                | No                           | Sì                              | No                            | Sì                              |
| Persona utente                             | No                           | Sì                              | No                            | Sì                              |
| Modello IA                                 | No                           | Sì                              | No                            | Sì                              |
| Motore di inferenza                        | No                           | Sì                              | No                            | Sì                              |
| Scenario di gioco di ruolo                 | No                           | Sì                              | No                            | Sì                              |
| Prompt di sistema o istruzioni avanzate    | No                           | Sì                              | No                            | Sì                              |
| LoreBooks o risorse contestuali            | No                           | Sì                              | No                            | Sì                              |
| Impostazioni di generazione                | No                           | Sì                              | No                            | Sì                              |
| Titolo della chat e metadati organizzativi | Sì                           | Sì                              | No                            | No                              |

La regola fondamentale è che le modifiche alla configurazione sono **rivolte al futuro**. Cambiano la composizione del prompt e la generazione della risposta successiva, ma non riscrivono la trascrizione salvata.

## Riaprire una chat

Quando riapri una conversazione salvata, Layla ripristina il personaggio, la persona, il modello IA, il motore di inferenza, lo scenario, le risorse contestuali e le impostazioni di generazione attivi all’ultimo utilizzo. Un compagno IA o un gioco di ruolo di lunga durata può così continuare senza ripetere la configurazione.

Questi valori sono soltanto la configurazione iniziale. Puoi modificarli prima di inviare il messaggio successivo.

![Schermata Messages scura con una fila di avatar, la barra Search Messages e due chat Layla con anteprime troncate e icone di eliminazione.](./chat-history-messages.gif)

## Modificare la configurazione attiva

Puoi modificare uno o più elementi mantenendo la stessa cronologia della chat IA. Layla usa la configurazione aggiornata per costruire la richiesta successiva.

### Cambiare personaggio

Il cambio di personaggio conserva la trascrizione, ma modifica le istruzioni per le risposte future. Il nuovo personaggio riceve il contesto che rientra nella finestra attiva del modello. Per un’identità o un passato non correlati, dirama la chat o avviane una nuova per evitare conflitti di continuità.

### Cambiare la persona utente

Il cambio di persona conserva i messaggi e applica la nuova descrizione dell’utente ai turni successivi. Usa una diramazione separata quando le identità differiscono notevolmente.

### Cambiare il modello IA

Una chat salvata può usare un altro modello supportato. Layla mantiene la cronologia e la prepara con il formato di prompt del nuovo modello. Interpretazione del personaggio, tono, capacità e dimensione del contesto possono cambiare. Una finestra più piccola può escludere i messaggi meno recenti da una generazione, ma questi restano memorizzati.

### Cambiare lo scenario di gioco di ruolo

Un nuovo scenario guida i messaggi futuri mentre la cronologia esistente resta disponibile. Dirama prima la chat quando provi una cronologia, un luogo o un esito contraddittori.

## Specifica tecnica del comportamento

Le regole seguenti definiscono il comportamento previsto delle cronologie configurabili di Layla:

1. **La conversazione è il contenitore principale della cronologia.** La sua identità è indipendente dagli ID di personaggio, persona, modello e scenario.
2. **I messaggi sono record conservati.** Le modifiche alla configurazione non devono riscrivere silenziosamente i contenuti salvati.
3. **L’ultima configurazione attiva viene salvata con la chat** e ripristinata quando le sue risorse restano disponibili.
4. **Le modifiche si applicano alla generazione successiva.** La composizione del prompt usa la configurazione attuale e la cronologia idonea.
5. **La selezione del contesto dipende dal modello.** I limiti determinano quali messaggi entrano nel prompt, non quali restano memorizzati.
6. **I duplicati hanno identità indipendenti.** Lo stato futuro non è condiviso con la chat di origine.
7. **Eliminare la configurazione ed eliminare la cronologia sono operazioni distinte.**

Per diagnostica ed esportazioni, ogni messaggio generato può conservare metadati di provenienza che identificano personaggio, persona, modello, motore e scenario. Aiutano a spiegare i cambiamenti di comportamento in una conversazione che ha usato più configurazioni.

## Privacy e archiviazione locale

Layla è un assistente IA privato e offline per Android e iOS. Con un motore di inferenza locale e un modello GGUF locale, cronologia, configurazione, elaborazione dei prompt e generazione restano sul dispositivo. Se usi intenzionalmente un’API remota o compatibile con OpenAI, si applicano anche le regole di trattamento dei dati di tale endpoint.

## Domande frequenti

### Le cronologie di Layla sono isolate per personaggio?

No. Una conversazione ricorda il personaggio selezionato, ma la cronologia appartiene alla chat. Puoi cambiare personaggio per i messaggi futuri senza eliminare o riscrivere la trascrizione esistente.

### Posso riaprire la stessa conversazione con un’altra persona?

Sì. La nuova persona si applica alle generazioni future. Se è in conflitto con la cronologia, dirama la conversazione o avvia una nuova chat.

### Posso cambiare modello IA senza perdere la cronologia?

Sì. I messaggi memorizzati restano disponibili. Una finestra di contesto più piccola può includere meno messaggi precedenti in una generazione, ma non li rimuove dall’archiviazione.

### Cambiare scenario di gioco di ruolo reimposta la conversazione?

No. Il nuovo scenario aggiorna le istruzioni per le risposte future. La cronologia precedente resta nella conversazione.

### Qual è il modo più sicuro per confrontare due modelli o scenari?

Dirama la conversazione, assegna un modello o uno scenario diverso a ogni copia e continua entrambe in modo indipendente.

La struttura di Layla centrata sulla conversazione supporta chat prolungate con compagni IA, giochi di ruolo e confronti tra modelli senza imporre una cronologia distinta per ogni modifica. La trascrizione resta stabile, mentre la configurazione attiva è abbastanza flessibile da continuare in locale con personaggio, persona, modello e scenario adatti alla risposta successiva.
