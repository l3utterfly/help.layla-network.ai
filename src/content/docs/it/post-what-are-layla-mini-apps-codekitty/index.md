---
title: Cosa sono le mini-app Layla? Crearne una sul dispositivo con CodeKitty
description: Scopri come le mini-app Layla usano il modello sul dispositivo, i personaggi, le immagini, la voce e l'archiviazione privata tramite il bridge dell'host.
category: Mini-apps & integrations
order: 30
keywords:
  - mini-app Layla
  - CodeKitty
  - Layla SDK
  - app WebView
  - IA sul dispositivo
lastUpdated: 2026-07-18
translationKey: post-what-are-layla-mini-apps-codekitty
ai_translated: true
---

**Una mini-app Layla è un'app web autonoma che viene eseguita all'interno di Layla e può richiamare l'IA già presente sul telefono — il modello locale, la generazione di immagini, la voce, i personaggi e l'archiviazione privata dei file — tramite un bridge, senza chiavi API né server.**

![Logo di un gatto cyber al neon con simboli di codice su uno sfondo scuro.](./codekitty-logo.avif)

[CodeKitty](https://apps.layla-cloud.com/app/codekitty) è una mini-app che crea altre mini-app. Riunisce in un unico file HTML un editor di codice, un'anteprima in tempo reale, una libreria di progetti, un generatore di immagini e un assistente di programmazione IA. Questo articolo la usa per spiegare come funziona il sistema delle mini-app, perché CodeKitty ne utilizza quasi ogni componente.

## Cos'è una mini-app Layla?

Una mini-app è una normale applicazione web — HTML, CSS e JavaScript — che Layla esegue in una WebView. A renderla più di una semplice pagina web è il bridge dell'host.

Una normale app web che vuole usare un LLM ha bisogno di una chiave API, un server e una connessione di rete. Invia i tuoi dati altrove. Una mini-app Layla non lo fa. Viene eseguita all'interno di Layla, che mette a disposizione le funzioni già installate sul dispositivo: inferenza del modello locale, generazione di immagini, sintesi vocale, elenco dei personaggi e un filesystem privato per ogni app.

Questo capovolge il funzionamento abituale. L'IA non è un servizio esterno richiamato dall'app, ma una risorsa fornita dall'host. Non ci sono chiavi da inserire, endpoint da configurare o account da creare, perché non esiste un servizio esterno presso cui autenticarsi. L'inferenza viene eseguita sul tuo hardware con il [modello GGUF](/it/what-are-gguf-models-what-are-model-quants/) che hai caricato.

Una mini-app viene distribuita come file ZIP con `app.json` per i metadati, `index.html` per l'app e tutti gli asset, collocati nella directory principale.

## Cos'è CodeKitty

CodeKitty è un IDE che viene eseguito sul telefono e produce mini-app Layla installabili.

Tratta un progetto come un filesystem virtuale: un oggetto JavaScript le cui chiavi sono nomi di file. Un nuovo progetto inizia con quattro elementi: `index.html`, `app.json`, `icon.jpg` e `bg.jpg`. Poiché questi file risiedono in memoria anziché su disco, l'editor può passare dall'uno all'altro, inviarli al modello, eseguirli in un'anteprima o inserirli in un file ZIP senza un filesystem convenzionale sottostante.

L'interfaccia usa React, Prism per l'evidenziazione della sintassi, Babel per compilare JSX nel browser, JSZip per creare i pacchetti e Marked per visualizzare le risposte dell'assistente. Tutto è contenuto in un unico `index.html`.

## L'host è l'API

La prima cosa da comprendere come sviluppatore è che l'SDK non è un client cloud.

```js
const layla = new LaylaSDK();
```

Questa è l'intera configurazione. Non ci sono chiavi né URL di base. `LaylaSDK` serializza le chiamate verso:

```js
window.ReactNativeWebView.postMessage(...);
```

Layla esegue il lavoro in modo nativo e restituisce gli eventi alla WebView. Da lì, una mini-app può accedere ai personaggi, ai completamenti chat in streaming, alla generazione di immagini, alla voce, ai file privati e alla condivisione nativa.

La conseguenza pratica è che le mini-app possono rimanere piccole. Una funzione che normalmente richiederebbe un backend, l'autenticazione, un servizio multimediale e un livello di archiviazione si riduce a una chiamata di metodo, perché l'host dispone già di tutti e quattro.

## I tuoi personaggi diventano l'assistente

CodeKitty recupera il ritratto di ogni personaggio, mostra i personaggi in una galleria ricercabile e ti consente di sceglierne uno come compagno di programmazione. I dati della Character Card forniscono il nome e la personalità, che CodeKitty inserisce nel prompt di sistema. L'assistente può spiegare un bug o correggere un file mantenendo la voce del personaggio.

La tua libreria di personaggi è un livello di personalizzazione che qualsiasi mini-app può leggere. Un'app di fitness potrebbe trasformare i personaggi in allenatori, uno strumento di studio potrebbe usarli come tutor per materie diverse e un gioco narrativo potrebbe usarli come cast. L'elenco è già disponibile e basta una chiamata all'SDK per recuperarlo.

## Il modello propone, l'app applica

Quando chiedi una modifica, CodeKitty non si limita a passare la tua frase al modello. Prepara un pacchetto di contesto contenente la personalità del compagno di programmazione, il nome del file attivo e il suo contenuto completo, il formato di output previsto, le note del progetto, la chat recente, gli errori acquisiti dall'anteprima in tempo reale e la documentazione dell'SDK. Impone quindi dei vincoli al formato della risposta.

Per un file sorgente, il modello deve restituire un file sostitutivo completo o una patch JSON:

![Editor di codice che mostra una patch JSON con voci di ricerca e sostituzione.](./json-patch.avif)

Per `app.json`, il modello restituisce il documento completo. Per un asset immagine, propone un prompt visivo anziché il codice.

Questa separazione è fondamentale. Il modello suggerisce; CodeKitty decide se e come applicare il suggerimento. Il modello non ottiene mai accesso in scrittura all'archiviazione o all'host nativo, e ogni modifica applicata diventa un'istantanea che può essere annullata. Quando consenti a un modello linguistico di influire sullo stato, fagli produrre una proposta che il tuo codice possa convalidare, non un'azione che il codice esegua direttamente.

La generazione avviene in streaming, perché l'inferenza locale su un telefono richiede tempo:

![Editor di codice che mostra gestori di stream JavaScript per il contenuto della chat Layla, gli eventi di ragionamento e finalContent().](./streaming-events.avif)

Il ragionamento arriva su un canale separato e viene visualizzato in un pannello comprimibile. Il riferimento allo stream viene conservato affinché un pulsante Interrompi possa annullarlo. Se la tua mini-app dipende dalla generazione sul dispositivo, considera l'avanzamento parte del prodotto: trasmetti il testo in streaming, mostra i passaggi della generazione delle immagini e consenti sempre l'annullamento.

## L'anteprima prende in prestito il bridge

L'anteprima in tempo reale è l'aspetto tecnicamente più interessante di CodeKitty.

Il tuo `index.html` viene eseguito in un iframe con sandbox. Prima di avviarlo, CodeKitty inserisce due elementi. Per prima cosa, aggiunge metodi console incapsulati e un gestore degli errori, in modo che le eccezioni non rilevate vengano visualizzate in un pannello console e incluse nel contesto del modello per la domanda successiva. Si crea così un ciclo rapido: esegui, osserva l'errore, chiedi al compagno di programmazione, applica la patch ed esegui di nuovo.

In secondo luogo, aggiunge un proxy `window.ReactNativeWebView`. Quando l'app all'interno dell'iframe effettua una chiamata all'SDK, il proxy inoltra il messaggio del bridge a CodeKitty, che lo trasmette all'host Layla reale e invia la risposta nativa all'iframe.

L'app di anteprima prende in prestito la connessione di CodeKitty a Layla. Le operazioni sui file ricevono un prefisso del nome specifico del progetto, quindi un'app di prova non può sovrascrivere la libreria di CodeKitty chiamando `saveFile`. Una mini-app può ospitare un'altra esperienza web e stabilire con precisione quali funzioni native metterle a disposizione.

## Icone, sfondi ed esportazione

I pacchetti Layla richiedono un'icona e uno sfondo, quindi CodeKitty tratta i file immagine come schede di progetto a tutti gli effetti. Scrivi un prompt o chiedi al compagno di programmazione di crearne uno, quindi genera l'immagine sul dispositivo:

```js
const imageSrc = await layla.images.generateImage();
```

I risultati vengono ritagliati al centro tramite un canvas: 256 × 256 per le icone e 854 × 480 per gli sfondi. Vengono archiviati come URI di dati fino all'esportazione.

L'esportazione produce un file ZIP con `app.json`, `index.html` e gli asset nella directory principale. Sono disponibili due build:

- La **build di sviluppo** mantiene tutto leggibile e modificabile.
- La **build smashed** compila JSX, incorpora React, integra i font come URI di dati, adatta il bundle dell'SDK per l'uso offline e produce un unico `index.html` autonomo che non richiede la rete. Include inoltre una copia nascosta del codice sorgente, così il pacchetto può essere reimportato in CodeKitty in seguito.

L'esportazione è un punto di controllo, non una conclusione.

## Cosa imparare da CodeKitty quando ne crei una

Non devi creare un IDE per sfruttare le buone idee di CodeKitty.

Inizia con una sola funzione dell'host e usala per risolvere un passaggio reale, anziché limitarti a dimostrare una funzionalità. CodeKitty genera immagini perché i pacchetti hanno bisogno di icone. Progetta per la generazione locale: usa lo streaming, mostra l'avanzamento e consenti l'interruzione. Mantieni il modello dietro un contratto che il tuo codice possa convalidare.

Evita di far passare dati pesanti attraverso il bridge. CodeKitty suddivide la libreria in un piccolo indice e un file di contenuto per ogni progetto, perché grandi blocchi base64 che attraversano il confine di una WebView rallentano il telefono. Crea anche cicli di feedback: la console dell'anteprima diventa contesto per il modello, ed è per questo che il ciclo di debug funziona.

Infine, esegui i test all'interno di Layla. Il comportamento del browser non è definitivo senza il mock dell'SDK installato.

## Domande frequenti

### Cos'è una mini-app Layla?

Un'app web autonoma che viene eseguita all'interno di Layla e può usare l'IA sul tuo dispositivo — modello locale, generazione di immagini, voce, personaggi e archiviazione privata — tramite il bridge dell'SDK Layla. Viene distribuita come ZIP contenente `app.json`, `index.html` e gli asset.

### Devo saper programmare per crearne una?

Meno di quanto potresti pensare. L'assistente di CodeKitty scrive e corregge il codice, mentre tu lo guidi usando il linguaggio naturale. Conoscere HTML e JavaScript ti rende più veloce e ti consente di correggere gli errori del modello, ma il ciclo descrivi, visualizza in anteprima e correggi è praticabile anche senza queste conoscenze.

### CodeKitty funziona offline?

L'IA sì. L'assistente di programmazione usa il tuo modello locale e nulla di ciò che scrivi lascia il telefono. Le librerie dell'interfaccia di CodeKitty vengono attualmente caricate da un CDN al primo avvio, quindi è necessaria una connessione per avviarlo. Le app esportate con la build smashed sono completamente autonome e funzionano senza una connessione di rete.

### Dove viene salvato il mio codice? Viene caricato da qualche parte?

Da nessuna parte altrove. I progetti vengono archiviati sul tuo dispositivo nello spazio file privato per app di Layla. L'inferenza del modello avviene sul dispositivo. Non esistono account, sincronizzazione o server che conservino i tuoi progetti.

### Posso condividere le mini-app che creo?

Sì. L'esportazione produce un file ZIP che chiunque utilizzi Layla può importare. Se vuoi, puoi caricarlo su Layla Cloud tramite Mini-app Manager in Layla.

### A cosa può accedere una mini-app?

Ai personaggi e ai loro ritratti, ai completamenti chat in streaming con il modello locale, alla selezione del motore di inferenza, alla generazione di immagini, alle voci TTS installate e a un filesystem privato limitato all'app. Non può accedere ai file di altre app.

### Esiste una documentazione di riferimento dell'SDK?

Sì. Consulta il [repository di `@layla-network/sdk`](https://github.com/l3utterfly/layla-sdk).

## Creare la prossima mini-app

CodeKitty è un IDE con un compagno di programmazione a tema felino, ma questa descrizione sminuisce il fatto più interessante: una mini-app può costituire un flusso di lavoro locale completo. Può coordinare personaggi, modelli, immagini, voce, file, anteprime e condivisione, pur rimanendo una pagina web portatile.

CodeKitty usa questo sistema per creare software. Gli stessi strumenti potrebbero creare un tutor linguistico che legge gli esercizi con una voce installata, un diario che rimane sul dispositivo e ripropone vecchie voci quando sono pertinenti, uno studio narrativo che usa la tua lista di personaggi come cast o uno strumento per campagne che ti invia messaggi tra una sessione e l'altra.

Per iniziare non occorre imparare l'intero SDK. Trova un momento che sarebbe migliore se avvenisse all'interno di Layla e crea la cosa più piccola capace di renderlo reale.
