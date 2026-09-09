---
title: Eseguire attività in background nella tua mini-app
description: Scopri come task.js esegue lavoro periodico in background nelle mini-app Layla, usa l'SDK precaricato, registra i risultati e condivide in sicurezza la logica con la tua app WebView.
category: Layla SDK
order: 20
keywords:
  - SDK Layla
  - task.js
  - attività in background delle mini-app Layla
  - QuickJS
  - build Vite per task
  - JavaScript in background
lastUpdated: 2026-08-30
translationKey: running-background-tasks-in-your-mini-app
ai_translated: true
---

**Un file `task.js` dà a una mini-app Layla un'attività JavaScript a esecuzione singola che Layla può avviare periodicamente in background, senza aprire la WebView della mini-app.** L'attività gira in un runtime isolato, riceve un client SDK Layla pronto all'uso e può restituire un risultato che l'utente può consultare nel Gestore attività di Layla.

Questa guida spiega il modello di esecuzione, mostra una piccola attività autonoma e poi costruisce un `task.js` generato, così che una mini-app più grande possa riutilizzare lo stesso flusso nella sua interfaccia e nell'attività in background.

Il Gestore attività distingue le attività attive e disattivate dalle mini-app installate che non forniscono lavoro in background. Per ogni attività attiva mostra in un unico punto l'esecuzione manuale, i log e il codice sorgente generato.

![Gestore attività di Layla con Dream come attività attiva di una mini-app, un'attività di diagnostica disattivata e mini-app installate senza attività in background.](./task-manager.jpg)

Se sei alle prime armi con lo sviluppo di mini-app, comincia da [Iniziare con l'SDK Layla](/getting-started-with-the-layla-sdk/).

## Che cos'è `task.js`?

`task.js` è un file facoltativo nella radice di una mini-app Layla impacchettata, accanto ad `app.json` e `index.html`:

```text
my-mini-app/
  app.json
  index.html
  task.js
  icon.png
```

Quando Layla trova il file, la mini-app compare nel Gestore attività. L'utente può eseguire l'attività manualmente, attivarne o disattivarne l'esecuzione in background e rivedere il risultato e i log dell'ultima esecuzione.

Un'attività non è un servizio sempre attivo. Layla la avvia, attende che il suo valore finale o la sua promise si risolva, registra l'esito ed elimina il runtime. È l'host a decidere quando tentare il lavoro periodico in background, quindi `task.js` dovrebbe compiere un solo passaggio utile e terminare. Non inserirci uno scheduler o un ciclo di polling tuo.

Questo rende `task.js` adatto ad attività come:

- Leggere chat o memorie recenti e salvare un riepilogo.
- Aggiornare dati in cache per la prossima apertura della mini-app.
- Creare o aggiornare record strutturati nel database della mini-app.
- Generare un messaggio e programmarlo per più tardi.
- Verificare quali personaggi richiedono lavoro ed elaborare ciascuno una volta.

## Come Layla esegue un'attività in background

Gli ambienti WebView e attività usano lo stesso protocollo SDK, ma sono runtime separati.

Quando Layla esegue un'attività:

1. Crea un runtime QuickJS nuovo, limitato a quella mini-app.
2. Precarica l'SDK Layla e lo collega all'host.
3. Valuta il `task.js` della mini-app come un normale script JavaScript.
4. Attende se il valore di completamento dello script è una promise.
5. Registra se l'esecuzione è riuscita, quanto è durata, il suo output e i log della console messi in buffer.
6. Distrugge il runtime.

La coda in background esegue le attività idonee delle mini-app mentre Layla non è in primo piano. Le attività disattivate vengono saltate. Un'esecuzione manuale usa lo stesso modello di esecuzione isolato.

Poiché ogni esecuzione parte pulita, le variabili dichiarate in un'esecuzione non esisteranno in quella successiva. Salva lo stato durevole tramite l'SDK. `layla.db.executeSql(...)` è una buona scelta predefinita per i dati strutturati. L'attività e l'app WebView usano la stessa archiviazione privata della mini-app, quindi l'interfaccia può leggere ciò che l'attività in background ha salvato.

## L'SDK Layla è già disponibile

Non importare `@layla-network/sdk` nel `task.js` finale. Layla inietta l'SDK prima che il tuo codice venga eseguito e fornisce queste variabili globali:

- `layla`: un client SDK pronto all'uso.
- `Layla`: la classe del client SDK.
- `LaylaError`, `LaylaAbortError` e `LaylaBridgeUnavailableError`: le classi di errore dell'SDK.

Nella maggior parte delle attività, usa direttamente l'istanza `layla` esistente:

```js
const characters = await layla.characters.list(0, 10);
```

Quella riga, però, va dentro una funzione asincrona. `task.js` viene valutato come script classico e non come modulo ES, quindi `await` di primo livello, `import`, `export` e `require(...)` non sono disponibili. Racchiudi il lavoro asincrono in un'espressione di funzione asincrona invocata immediatamente (async IIFE) e fai in modo che quella promise sia l'ultima espressione del file.

Il runtime non è nemmeno un browser. Non ha DOM, `document`, `fetch`, `XMLHttpRequest`, `localStorage`, `setTimeout` o `setInterval`. Promise, `async`/`await`, `queueMicrotask`, `JSON` e le chiamate all'SDK funzionano normalmente.

Preferisci i metodi dell'SDK che hanno senso senza un'interfaccia visibile: chat completion non in streaming, personaggi, memorie, messaggi programmati, classificazione del sentiment, file privati e database SQLite privato. Evita i flussi di interfaccia o di interazione con il dispositivo come l'ingresso microfono, la riproduzione TTS e l'audio in background. Anche i listener di eventi di lunga durata sono poco adatti, perché il runtime scompare quando l'attività finisce.

## Un semplice esempio di `task.js`

Questa attività conta la prima pagina di personaggi e registra ogni esecuzione nel database privato della mini-app:

```js
// task.js — the host has already created the global `layla` client.
console.info("Character snapshot task starting.");

(async () => {
  const ranAt = Date.now();
  const characters = await layla.characters.list(0, 10);

  await layla.db.executeSql(
    "CREATE TABLE IF NOT EXISTS character_snapshots (" +
      "id INTEGER PRIMARY KEY, ran_at INTEGER, character_count INTEGER)",
  );

  await layla.db.executeSql(
    "INSERT INTO character_snapshots (ran_at, character_count) VALUES (?, ?)",
    [ranAt, characters.length],
  );

  console.info(`Recorded ${characters.length} characters.`);

  return {
    status: "ok",
    ranAt,
    characterCount: characters.length,
  };
})();
```

L'async IIFE è deliberatamente l'ultima espressione. Layla attende la sua promise e poi registra l'oggetto restituito come output dell'esecuzione. Mantieni il valore di ritorno serializzabile in JSON. Una promise rifiutata o un errore lanciato segnano l'esecuzione come fallita, mentre tutto ciò che viene scritto con `console.log`, `console.info`, `console.debug`, `console.warn` o `console.error` finisce nel buffer del log di esecuzione.

I log vengono mostrati al termine dell'esecuzione, non trasmessi in tempo reale. Usali per tappe sintetiche e contesto diagnostico, e usa il valore restituito per il riepilogo finale leggibile da una macchina.

## Generare `task.js` quando il flusso è più complesso

Scrivere `task.js` a mano va bene per un lavoro piccolo. Diventa scomodo quando l'attività in background deve usare la stessa logica di selezione, prompt, validazione o persistenza della mini-app visibile.

Dream, una mini-app Layla funzionante, usa un entry point per l'attività e una configurazione di build separati. Il suo entry point importa moduli condivisi di workflow e di prompt dal codice sorgente dell'applicazione principale. Vite segue quegli import e genera un unico `dist/task.js` autonomo con il codice condiviso incluso. L'artefatto generato non contiene import, ma il sorgente resta diviso in normali moduli manutenibili.

La decisione progettuale chiave è l'iniezione delle dipendenze: il codice condiviso riceve un client Layla invece di costruirne uno al proprio interno. La WebView passa il client SDK che ha importato; l'attività passa il client globale `layla` fornito dall'host.

Parti da un workflow condiviso:

```ts
// src/lib/recordCharacterSnapshot.ts
import type LaylaSDK from "@layla-network/sdk";

export async function recordCharacterSnapshot({
  layla,
  ranAt = Date.now(),
}: {
  layla: LaylaSDK;
  ranAt?: number;
}) {
  const characters = await layla.characters.list(0, 10);

  await layla.db.executeSql(
    "CREATE TABLE IF NOT EXISTS character_snapshots (" +
      "id INTEGER PRIMARY KEY, ran_at INTEGER, character_count INTEGER)",
  );
  await layla.db.executeSql(
    "INSERT INTO character_snapshots (ran_at, character_count) VALUES (?, ?)",
    [ranAt, characters.length],
  );

  return { status: "ok", ranAt, characterCount: characters.length };
}
```

L'import di solo tipo aiuta TypeScript a controllare la funzione condivisa e scompare dal JavaScript compilato. La mini-app visibile può chiamare la stessa funzione con la sua normale istanza dell'SDK:

```ts
// src/main.ts
import LaylaSDK from "@layla-network/sdk";
import { recordCharacterSnapshot } from "./lib/recordCharacterSnapshot";

const layla = new LaylaSDK();

document.querySelector("#refresh")?.addEventListener("click", async () => {
  const result = await recordCharacterSnapshot({ layla });
  console.log(result);
});
```

Poi crea un piccolo entry point per l'attività. Durante lo sviluppo importa il sorgente condiviso, ma la build rimuove quel confine tra moduli:

```js
// src/task-entry.js
import { recordCharacterSnapshot } from "./lib/recordCharacterSnapshot";

console.info("Character snapshot background task starting.");

(async () => {
  return recordCharacterSnapshot({ layla });
})();
```

Assegna a quell'entry point una build Vite dedicata:

```ts
// vite.task.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  publicDir: false,
  build: {
    target: "es2020",
    outDir: "dist",
    emptyOutDir: false,
    copyPublicDir: false,
    minify: false,
    lib: {
      entry: "src/task-entry.js",
      formats: ["es"],
      fileName: () => "task.js",
    },
  },
});
```

Esegui prima la normale build della WebView, poi quella dell'attività:

```json
{
  "scripts": {
    "build": "vite build && vite build --config vite.task.config.ts",
    "build:task": "vite build --config vite.task.config.ts"
  }
}
```

`emptyOutDir: false` preserva `index.html`, `app.json` e gli asset creati dalla prima build. La seconda build aggiunge `dist/task.js` accanto a essi.

Tieni gli import a runtime di `@layla-network/sdk` fuori dal grafo delle dipendenze dell'attività. Gli import di solo tipo vanno bene, ma l'attività generata deve usare il client iniettato anziché includere un altro client SDK. In un'app più grande, tieni fuori dal workflow condiviso il codice specifico della WebView, come gli aggiornamenti del DOM, lo stato React, l'archiviazione del browser e l'interfaccia di streaming.

Dream applica questa separazione su scala maggiore: la sua attività sorgente gestisce il caricamento dati senza interfaccia e l'orchestrazione, mentre i moduli condivisi contengono il flusso che sceglie e programma un messaggio di un personaggio. Il `task.js` di produzione è generato da quei sorgenti, così le correzioni al workflow condiviso valgono sia per l'azione visibile sia per l'attività in background.

## Verificare l'artefatto generato

Prova il file che Layla eseguirà davvero, non solo `src/task-entry.js`.

Dopo la build, verifica che `dist/task.js`:

- Si trovi alla radice del pacchetto, accanto ad `app.json` e `index.html`.
- Non contenga istruzioni `import`, `export` o `require(...)`.
- Non includa né referenzi `@layla-network/sdk` a runtime.
- Termini con l'async IIFE che produce una promise come espressione di completamento.
- Non richiami API del browser, timer o `fetch`.
- Restituisca un valore serializzabile in JSON su ogni percorso di successo.

Per un'attività complessa, aggiungi un piccolo banco di prova che valuti `dist/task.js` con un oggetto globale `layla` fittizio. La mini-app Dream usa questo approccio per esercitare l'artefatto generato, catturare le richieste all'SDK e verificare sia il percorso di inattività sia quello di programmazione riuscita. Testare il bundle intercetta problemi che un test unitario a livello di sorgente non vede, come import rimasti e un entry point il cui valore finale non è la promise del workflow.

## Domande frequenti

### `task.js` viene eseguito nella WebView della mini-app?

No. Viene eseguito in un runtime QuickJS isolato e nuovo. Non può accedere alla pagina, allo stato React o al DOM, ma può usare l'SDK Layla precaricato.

### Devo importare `LaylaSDK` in `task.js`?

No. Usa l'istanza globale `layla` iniettata. Nei moduli TypeScript condivisi un import di solo tipo dell'SDK va bene, perché viene rimosso in compilazione.

### Come condivido i dati tra l'attività e l'interfaccia?

Usa l'archiviazione privata dell'SDK della mini-app. `layla.db.executeSql(...)` funziona bene per lo stato strutturato, mentre le utilità dell'SDK per i file privati sono adatte a impostazioni in forma di documento o a file generati. Entrambe le esecuzioni sono associate alla stessa mini-app.

### Un'attività può attendere con `setTimeout`?

No. I timer non sono disponibili e un'attività in background dovrebbe completare un solo passaggio. Termina dopo aver concluso il lavoro corrente. Per un futuro messaggio di un personaggio usa `layla.chat.scheduleChatMessage(...)` invece di tenere viva l'attività.

### Che cosa dovrebbe restituire un'attività in background?

Restituisci un piccolo riepilogo serializzabile in JSON, per esempio `{ status: "ok", processed: 4 }`. Usa i messaggi di console per i dettagli diagnostici. Lancia un errore quando l'esecuzione è davvero fallita, così che il Gestore attività la segnali come fallimento.

## Progettare per un runtime effimero e senza interfaccia

Il modello mentale utile non è «una copia nascosta della mia mini-app», ma «un passaggio in background con l'SDK Layla già collegato». Mantieni piccolo l'entry point, sposta il lavoro riutilizzabile in funzioni che ricevono le proprie dipendenze, salva tutto ciò che serve all'interfaccia e lascia che il `task.js` generato termini con un risultato chiaro.

Questa struttura mantiene l'artefatto di background compatibile con il runtime isolato di Layla, permettendo al tempo stesso a una mini-app più grande di mantenere un'unica implementazione del suo flusso principale.
