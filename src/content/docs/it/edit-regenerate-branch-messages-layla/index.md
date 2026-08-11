---
title: Si possono modificare, rigenerare e diramare i messaggi in Layla?
description: Usa le azioni dei messaggi di Layla per modificare prompt e risposte, rigenerare risposte, eliminare messaggi o diramare una conversazione.
category: Chat & memory
order: 30
keywords:
  - modificare messaggi
  - rigenerare risposte
  - diramare conversazioni
  - azioni dei messaggi
  - chat offline
lastUpdated: 2026-07-25
translationKey: edit-regenerate-branch-messages-layla
ai_translated: true
---

**Sì. Puoi agire singolarmente su ogni messaggio di una chat Layla: modificarlo, rigenerarlo, copiarlo, eliminarlo, tradurlo, leggerlo ad alta voce e altro ancora. Tieni premuto il messaggio o tocca il menu di overflow per aprire le azioni.** Non tutte le azioni valgono per ogni messaggio: alcune riguardano solo i tuoi messaggi, altre soltanto le risposte di Layla.

Questa guida descrive ogni azione e i messaggi a cui si applica. Poiché Layla funziona interamente sul dispositivo, tutte le operazioni avvengono in locale: nulla viene inviato altrove per modificare o rigenerare un messaggio.

## Come aprire il menu delle azioni

Puoi accedere alle azioni di un singolo messaggio in due modi:

- **Tieni premuto il fumetto.** Premi qualsiasi messaggio, tuo o di Layla, finché compare il menu. È il gesto principale e funziona in tutta la vista della chat.
- **Tocca il menu di overflow.** Alcuni messaggi mostrano una piccola icona con tre puntini vicino al fumetto. Apre le stesse azioni senza pressione prolungata ed è utile per selezionare con precisione il messaggio.

![Chat in modalità scura con Layla che mostra una risposta dell’assistente.](./open-message-actions.gif)

Il menu dipende dal contesto. Sui tuoi messaggi mostra azioni per l’input come modifica, copia, eliminazione, citazione, fissaggio e diramazione. Sulle risposte di Layla aggiunge azioni di generazione come Regenerate e Retry. Se un’azione non compare, non è disponibile per quel tipo di messaggio.

| Azione     | Funzione                                                | Si applica a                           |
| ---------- | ------------------------------------------------------- | -------------------------------------- |
| Edit       | Modifica sul posto il testo di un messaggio             | I tuoi messaggi e le risposte di Layla |
| Regenerate | Produce una nuova versione di una risposta              | Risposte di Layla                      |
| Continue   | Continua un messaggio eventualmente interrotto          | Risposte di Layla                      |
| Copy       | Copia il testo del messaggio negli appunti              | Qualsiasi messaggio                    |
| Delete     | Rimuove il messaggio dalla conversazione                | Qualsiasi messaggio                    |
| Speak      | Legge il messaggio ad alta voce con la voce TTS attuale | Qualsiasi messaggio                    |

## Modificare un messaggio

La modifica cambia il testo senza ricominciare. Tieni premuto il messaggio, tocca **Edit**, modifica il testo e conferma.

Funziona su entrambi i lati della conversazione. Il caso più comune è modificare **un tuo messaggio** per correggere un errore, affinare un prompt o cambiare la richiesta, quindi reinviarlo perché Layla risponda alla versione corretta. Modificare **la risposta di Layla** è utile nel gioco di ruolo e nella scrittura: conserva le parti che ti piacciono e aggiusta il resto a mano invece di rigenerare tutto.

![Menu dei messaggi di Layla con le azioni Copy, Edit, Regen, Continue, Delete e Speak.](./edit-message.gif)

Quando modifichi e reinvii un tuo vecchio messaggio, le risposte successive restano basate sul testo originale. A seconda di quanto è indietro, potresti voler rigenerare la risposta seguente di Layla per mantenere coerente la conversazione.

## Rigenerare e riprovare una risposta

**Regenerate** chiede a Layla di produrre una nuova versione di una risposta. Se non è adatta, tienila premuta e tocca **Regenerate**. È il modo principale per migliorare il risultato senza riscrivere il prompt.

Le risposte rigenerate vengono normalmente conservate come alternative tra cui spostarti. Puoi confrontare la nuova versione con la precedente e scegliere quella che preferisci senza perdere l’originale.

![Chat Layla che mostra una risposta rigenerata dell’assistente.](./regenerate-message.gif)

Poiché la generazione avviene sul dispositivo, la velocità dipende dall’hardware del telefono e dalle dimensioni del modello caricato, non dalla connessione di rete.

## Eliminare un messaggio

L’eliminazione rimuove un solo messaggio dalla conversazione. Tienilo premuto, tocca **Delete** e conferma. È diversa dalla cancellazione di un’intera conversazione o della cronologia completa: interessa soltanto il messaggio selezionato.

Puoi rimuovere un falso avvio, una risposta duplicata o un messaggio da escludere dal contesto. Poiché il modello legge la cronologia per decidere cosa dire dopo, rimuovere un messaggio fuori posto può anche ripulire il contesto. L’eliminazione è locale e permanente; il messaggio non può essere recuperato.

> **Nota:** eliminare un messaggio precedente ricarica la chat e il modello ricomincia a elaborare dal messaggio eliminato. A seconda della sua posizione, l’operazione può richiedere tempo.

## Diramare una conversazione

**Branch** crea una diramazione dal messaggio corrente, consentendoti di esplorare una linea separata senza perdere l’originale. Da quel punto ottieni un nuovo percorso per provare una direzione, una formulazione o un risultato diversi, mantenendo intatta la conversazione iniziale.

![Conversazione Layla che mostra una diramazione da un messaggio precedente.](./branch-conversation.gif)

Le diramazioni sono particolarmente utili nel gioco di ruolo e nella scrittura, quando vuoi vedere una scena evolversi in due modi. Servono anche per le attività produttive, quando vuoi provare un approccio alternativo senza scartare il primo. Invece di sovrascrivere un percorso, li conservi entrambi.

## Domande frequenti

### Posso modificare le risposte di Layla o soltanto i miei messaggi?

Entrambi. Modificare i tuoi messaggi è il caso più comune, ma puoi anche cambiare sul posto le risposte di Layla per conservarne la maggior parte e aggiustarne una parte a mano.

### La rigenerazione elimina la vecchia risposta?

No. Le risposte rigenerate restano come alternative tra cui spostarti, per confrontare le versioni e sceglierne una senza perdere la precedente.

### Posso recuperare un messaggio eliminato?

No. L’eliminazione è locale e permanente, quindi conferma solo se non ti servirà in seguito.

### Posso diramare una conversazione senza perdere l’originale?

Sì. La diramazione crea un percorso separato dal messaggio scelto e lascia intatta la conversazione originale, alla quale puoi tornare.

### Le azioni dei messaggi funzionano offline?

Sì. Layla funziona sul dispositivo, quindi modifica, rigenerazione, copia, eliminazione e ogni altra azione avvengono localmente senza connessione a Internet.

Le azioni dei messaggi rendono pratico un assistente sul dispositivo: modificare un prompt, rigenerare una risposta o diramare una conversazione avviene sull’hardware locale, senza che nulla lasci il dispositivo.
