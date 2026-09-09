---
title: Iniziare con l'SDK Layla
description: Installa l'SDK Layla, usa la sua agent skill e crea una mini-app HTML in streaming che funziona con un mock nel browser prima di collegarsi all'IA sul dispositivo di Layla.
category: Layla SDK
order: 10
keywords:
  - SDK Layla
  - "@layla-network/sdk"
  - mini-app Layla
  - agent skill dell'SDK Layla
  - SDK WebView
  - SDK IA locale
lastUpdated: 2026-08-30
translationKey: getting-started-with-the-layla-sdk
ai_translated: true
---

**L'SDK Layla è una libreria TypeScript e JavaScript per creare mini-app che usano le funzionalità di IA disponibili dentro Layla.** Una mini-app può ricevere in streaming la chat dal modello attivo, lavorare con personaggi e memorie, generare immagini o musica, usare la voce e archiviare dati privati senza configurare una chiave API né avviare un server di IA.

Questa guida spiega dove ottenere l'SDK, come fornire la sua agent skill a un agente di programmazione e come costruire una piccola mini-app HTML che riceve in streaming una risposta da Layla.

## Sfogliare le mini-app esistenti

Se vuoi vedere che cosa hanno costruito gli altri prima di avviare il tuo progetto, sfoglia [Layla Cloud Apps](https://apps.layla-cloud.com/). Guardare le mini-app esistenti è un buon modo per capire quali interfacce e flussi funzionano bene dentro Layla, e poi scegliere una piccola idea per la tua prima realizzazione.

## Come funziona l'SDK Layla

Una mini-app Layla è un'app web che gira nella WebView React Native di Layla. Quando il tuo codice chiama un metodo dell'SDK, l'SDK invia un messaggio attraverso il ponte della WebView. L'host Layla esegue il lavoro sul dispositivo e restituisce il risultato.

```text
Mini-app -> Layla SDK -> WebView bridge -> Layla host -> on-device model
```

L'SDK non è quindi un normale client di API cloud:

- Non c'è nessuna chiave API, URL di base o endpoint HTTP da configurare.
- L'host Layla sceglie il modello attivo e il motore di inferenza.
- Le chiamate reali all'SDK funzionano dentro Layla, dove il ponte dell'host è disponibile.
- Durante il normale sviluppo nel browser, installi invece il mock host dell'SDK.

La generazione con un modello locale può richiedere tempo su un telefono. Per le funzionalità interattive usa lo streaming, mostra chiaramente uno stato di elaborazione e offri all'utente un modo per interrompere la generazione.

Se vuoi più contesto prima di scrivere codice, leggi [Che cosa sono le mini-app Layla?](/post-what-are-layla-mini-apps-codekitty/).

## Dove ottenere l'SDK

L'SDK è pubblicato come [`@layla-network/sdk` su npm](https://www.npmjs.com/package/@layla-network/sdk). Installalo in un progetto JavaScript o TypeScript esistente con:

```bash
npm install @layla-network/sdk
```

Il [repository dell'SDK Layla](https://github.com/l3utterfly/layla-sdk) contiene il codice sorgente, il riferimento API, le note sul packaging ed esempi di mini-app.

![Repository GitHub dell'SDK Layla con le cartelle del codice sorgente, della documentazione, degli esempi e dell'agent skill.](./github.png)

Esiste anche un [progetto di partenza ufficiale con React, TypeScript e Vite](https://github.com/l3utterfly/layla-miniapp-template) per le app che richiedono componenti, più file sorgente e uno stato applicativo più ampio.

Per una piccola app, l'import importante è:

```js
import { LaylaSDK } from "@layla-network/sdk";

const layla = new LaylaSDK();
```

Crea un solo client e riutilizzalo in tutta l'app.

## Usare l'agent skill dell'SDK Layla

Il progetto dell'SDK pubblica anche una agent skill: un pacchetto di documentazione per agenti di programmazione come Codex, Claude Code e OpenCode. Insegna all'agente i metodi pubblici dell'SDK, il runtime WebView, il mock locale, le regole di packaging e gli errori più comuni.

La skill e il pacchetto npm hanno compiti diversi: la skill aiuta il tuo agente di programmazione a scrivere l'app, mentre `@layla-network/sdk` è la libreria inclusa nell'app stessa.

Per usare la skill:

1. Apri le [release dell'agent skill dell'SDK Layla](https://github.com/l3utterfly/layla-sdk/releases?q=agent+skill&expanded=true).
2. Scarica lo ZIP dell'agent skill dalla release più recente corrispondente.
3. Importa o installa quello ZIP con il flusso di gestione delle skill del tuo agente di programmazione.
4. Apri il progetto della tua mini-app nell'agente di programmazione.
5. Cita la skill nel tuo prompt e descrivi il comportamento dell'app.

Per esempio:

```text
Use the layla-sdk skill to build a self-contained Layla mini-app.
Create a simple writing prompt generator that streams its response,
shows a working state, has a Stop button, uses the Layla mock during
local development, and builds to an index.html with app.json at the
root of the output.
```

Sii preciso sull'esperienza d'uso invece di chiedere all'agente di mostrare tutti i metodi dell'SDK. Una prima versione mirata è più facile da provare sul telefono. Personaggi, immagini, voce, archiviazione o chat contestuale si possono aggiungere nelle iterazioni successive.

## Costruire una piccola mini-app HTML

L'esempio seguente crea una pagina con un campo per il prompt, un pulsante **Ask Layla**, una risposta in streaming e un pulsante **Stop**. Vite gestisce l'import dell'SDK, mentre `vite-plugin-singlefile` inserisce il JavaScript e il CSS di produzione in un unico `index.html`.

Servono Node.js e npm. Crea il progetto e installa le dipendenze:

```bash
mkdir hello-layla
cd hello-layla
npm init -y
npm install @layla-network/sdk
npm install --save-dev vite vite-plugin-singlefile
npm pkg set scripts.dev="vite" scripts.build="vite build" scripts.preview="vite preview"
```

Crea questa struttura:

```text
hello-layla/
  public/
    app.json
  src/
    main.js
  index.html
  package.json
  vite.config.js
```

### Aggiungere i metadati della mini-app

Crea `public/app.json`:

```json
{
  "title": "Hello Layla",
  "tagline": "Ask the on-device model for a short answer.",
  "description": "A small starter mini-app built with the Layla SDK."
}
```

Vite copia i file da `public` alla radice di `dist`, quindi il pacchetto compilato conterrà sia `app.json` sia `index.html` alla sua radice.

### Creare la pagina

Crea `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello Layla</title>
    <style>
      :root {
        color: #f4f3f8;
        background: #111017;
        font-family: system-ui, sans-serif;
      }

      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
      }

      main {
        width: min(42rem, calc(100% - 2rem));
      }

      textarea,
      pre {
        box-sizing: border-box;
        width: 100%;
        padding: 1rem;
        border: 1px solid #3a3744;
        border-radius: 0.75rem;
        color: inherit;
        background: #1b1922;
      }

      textarea {
        min-height: 7rem;
        resize: vertical;
      }

      pre {
        min-height: 9rem;
        white-space: pre-wrap;
      }

      .actions {
        display: flex;
        gap: 0.75rem;
        margin: 0.75rem 0;
      }

      button {
        padding: 0.7rem 1rem;
        border: 0;
        border-radius: 999px;
        font: inherit;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Hello Layla</h1>
      <p>Ask the model running through your selected Layla inference engine.</p>

      <label for="prompt">Prompt</label>
      <textarea id="prompt">Give me one practical writing tip.</textarea>

      <div class="actions">
        <button id="send">Ask Layla</button>
        <button id="stop" disabled>Stop</button>
      </div>

      <p id="status" aria-live="polite">Ready.</p>
      <pre id="answer" aria-live="polite">The response will appear here.</pre>
    </main>

    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

### Collegare la pagina a Layla

Crea `src/main.js`:

```js
import {
  LaylaAbortError,
  LaylaBridgeUnavailableError,
  LaylaError,
  LaylaSDK,
  installLaylaMock,
} from "@layla-network/sdk";

if (import.meta.env.DEV) {
  installLaylaMock({
    respond: (messages) =>
      `Mock response to: ${messages.at(-1)?.content ?? ""}`,
  });
}

const layla = new LaylaSDK();
const promptInput = document.querySelector("#prompt");
const sendButton = document.querySelector("#send");
const stopButton = document.querySelector("#stop");
const status = document.querySelector("#status");
const answer = document.querySelector("#answer");

let activeStream = null;

sendButton.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();
  if (!prompt || activeStream) return;

  answer.textContent = "";
  status.textContent = "Layla is thinking…";
  sendButton.disabled = true;
  stopButton.disabled = false;

  const stream = layla.chat.completions.stream({
    messages: [{ role: "user", content: prompt }],
  });

  activeStream = stream;

  stream.on("content", (_delta, snapshot) => {
    answer.textContent = snapshot;
  });

  try {
    await stream.finalContent();
    status.textContent = "Finished.";
  } catch (error) {
    if (error instanceof LaylaAbortError) {
      status.textContent = "Stopped.";
    } else if (error instanceof LaylaBridgeUnavailableError) {
      status.textContent = "Open this mini-app inside Layla.";
    } else if (error instanceof LaylaError) {
      status.textContent = error.message;
    } else {
      console.error(error);
      status.textContent = "Something went wrong.";
    }
  } finally {
    activeStream = null;
    sendButton.disabled = false;
    stopButton.disabled = true;
  }
});

stopButton.addEventListener("click", () => {
  activeStream?.abort();
});
```

Il mock viene installato solo quando Vite è in modalità sviluppo. La build di produzione non lo installa, quindi le chiamate effettuate dentro Layla passano dal vero ponte dell'host.

### Impacchettare l'app in un unico file HTML

Crea `vite.config.js`:

```js
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [viteSingleFile()],
  build: {
    assetsInlineLimit: Infinity,
  },
});
```

Questa configurazione incorpora il JavaScript e il CSS del bundle. I file da `public`, compreso `app.json`, vengono comunque copiati accanto all'`index.html` generato.

## Provare nel browser

Avvia il server di sviluppo:

```bash
npm run dev
```

Apri l'indirizzo locale stampato da Vite e scegli **Ask Layla**. Dovresti vedere la risposta del mock comparire progressivamente. Questo verifica la pagina, i gestori di eventi e l'interfaccia di streaming; non esegue un modello reale.

Se rimuovi il mock di sviluppo e apri la pagina in un browser normale, l'SDK segnalerà `LaylaBridgeUnavailableError`. È il comportamento atteso, perché il ponte della WebView di Layla non è presente.

## Compilare e importare la mini-app

Crea i file di produzione:

```bash
npm run build
```

La cartella `dist` dovrebbe contenere:

```text
dist/
  app.json
  index.html
```

Comprimi il **contenuto** di `dist`, non la cartella `dist` stessa. `app.json` e `index.html` devono trovarsi alla radice dello ZIP, senza un'altra cartella che li racchiuda. Importa quello ZIP con la procedura di importazione delle mini-app di Layla, apri **Hello Layla** e invia un prompt.

La risposta reale può arrivare più lentamente del mock del browser, perché Layla esegue il modello selezionato sul dispositivo. La pagina trasmette ogni aggiornamento del contenuto e mantiene il pulsante Stop collegato a `stream.abort()`, quindi resta reattiva durante la generazione.

## Problemi comuni al primo progetto

### Perché l'SDK dice che il ponte non è disponibile?

L'app sta girando in un normale browser senza `installLaylaMock(...)`, oppure non sta girando nella WebView di Layla. Installa il mock prima della prima chiamata all'SDK durante lo sviluppo locale e tienilo dietro una condizione valida solo in sviluppo.

### Perché la mini-app importata non ha metadati?

Verifica che `app.json` contenga JSON valido e si trovi alla radice dello ZIP importato. Deve stare accanto a `index.html`, non dentro `public`, `dist` o un'altra cartella contenitore nello ZIP.

### Devo scegliere un modello nell'SDK?

No. L'host Layla usa il motore di inferenza attivo. Articoli successivi potranno spiegare come elencare e cambiare i motori di inferenza quando una mini-app deve offrire esplicitamente questa scelta.

### Ogni mini-app deve essere un unico file HTML?

Il progetto sorgente può contenere tutti i file necessari. Un `index.html` autonomo è un formato di distribuzione comodo per le mini-app offline. Per un progetto più grande, parti dal [template ufficiale per mini-app Layla](https://github.com/l3utterfly/layla-miniapp-template) e lascia che sia la fase di build a produrre l'output in un solo file.

## Come proseguire

Questo progetto iniziale usa solo la chat in streaming, ma lo stesso client espone personaggi, eventi di chat contestuale, memorie, persona, sintesi vocale, riconoscimento vocale, audio in background, generazione di immagini e musica, un database SQLite privato e utilità per i file privati. Il [riferimento API dell'SDK con gli esempi](https://github.com/l3utterfly/layla-sdk) resta la fonte autorevole mentre il resto di questa categoria approfondisce ogni area in un tutorial dedicato.
