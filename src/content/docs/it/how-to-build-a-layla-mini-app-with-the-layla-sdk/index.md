---
title: Come creare una mini-app Layla con l'SDK Layla
description: Crea passo dopo passo una mini-app Layla con l'SDK Layla. Chat in streaming, immagini in ingresso, voce, cronologia salvata e pacchettizzazione, basati sull'esempio di chat ufficiale.
category: Layla SDK
order: 30
keywords:
  - creare una mini-app Layla
  - tutorial SDK Layla
  - "@layla-network/sdk"
  - API chat di Layla
  - API chat in streaming
  - app IA sul dispositivo
  - chatbot IA offline
  - app LLM locale
  - API chat compatibile con OpenAI
  - sintesi vocale
  - riconoscimento vocale
  - mini-app React Vite
  - agent skill SDK Layla
lastUpdated: 2026-11-04
translationKey: how-to-build-a-layla-mini-app-with-the-layla-sdk
ai_translated: true
---

**Una mini-app Layla è un'app web che gira dentro Layla e usa l'SDK Layla per accedere alle funzionalità di IA del dispositivo, tra cui chat, voce, immagini, memorie e archiviazione privata.** Non servono chiavi API né un server da gestire. Scrivi una normale app web in JavaScript o TypeScript, chiami `@layla-network/sdk`, e Layla esegue il lavoro con il modello e il motore di inferenza che l'utente ha selezionato.

Questo tutorial costruisce passo dopo passo una mini-app di chat completa, usando come riferimento l'[esempio di chat](https://github.com/l3utterfly/layla-sdk/tree/main/examples/chat) ufficiale del repository dell'SDK Layla. Alla fine saprai come ricevere in streaming una risposta dal modello sul dispositivo, interrompere una generazione, inviare un'immagine, parlare e ascoltare, conservare una cronologia nel database privato della mini-app, sviluppare nel browser con il mock dell'SDK e pacchettizzare il risultato per Layla.

> **Usi un agente di programmazione?** L'SDK Layla pubblica una agent skill che insegna agli agenti di programmazione come Codex, Claude Code e OpenCode a scrivere mini-app con l'SDK. Puoi fornire la skill al tuo agente, descrivere l'app che vuoi e lasciare che svolga gran parte del lavoro descritto in questo articolo. Per il download e la configurazione, consulta [Usare l'agent skill dell'SDK Layla](/getting-started-with-the-layla-sdk/#use-the-layla-sdk-agent-skill). Questo articolo è pensato anche come riferimento che un agente può leggere insieme alla skill, quindi il [riferimento rapido](#riferimento-rapido-per-sviluppatori-e-agenti-di-programmazione) verso la fine elenca ogni chiamata usata dall'esempio.

## Cosa costruirai

L'esempio di chat è un'app React e Vite a schermata singola con queste funzionalità:

| Funzionalità                                              | Chiamate SDK utilizzate                                                                    |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Risposte in streaming con cursore lampeggiante            | `layla.chat.completions.stream(...)`, `stream.on("content", ...)`, `stream.finalContent()` |
| Pulsante di arresto per una generazione in corso          | `stream.abort()`, `LaylaAbortError`                                                        |
| Allegare un'immagine a un messaggio                       | parti di contenuto `image_url` nel formato dei messaggi OpenAI                             |
| Cronologia che sopravvive ai riavvii                      | `layla.db.executeSql(...)`                                                                 |
| Messaggi copiati nella cronologia chat di Layla           | `layla.chat.saveChatMessage(...)`                                                          |
| Riprodurre ogni risposta ad alta voce con una voce scelta | `layla.tts.getVoices()`, `layla.tts.generateVoice(...)`, `layla.tts.stopSpeaking()`        |
| Dettare un messaggio o parlare a mani libere              | `layla.stt.startListening()`, `layla.stt.on("speechRecognized", ...)`                      |
| Eseguire ed effettuare il debug in un normale browser     | `installLaylaMock(...)`                                                                    |

Quasi tutta la logica si trova in due file: [`src/App.tsx`](https://github.com/l3utterfly/layla-sdk/blob/main/examples/chat/src/App.tsx) per l'app e [`src/main.tsx`](https://github.com/l3utterfly/layla-sdk/blob/main/examples/chat/src/main.tsx) per il mock di sviluppo.

## Prima di iniziare

Ti serve:

- Node.js e npm installati sul computer.
- Familiarità di base con JavaScript o TypeScript. L'esempio usa React, ma l'SDK non richiede React. Va bene qualsiasi stack web.
- Una versione recente di Layla sul tuo telefono Android per testare sul dispositivo. Alcune funzionalità richiedono una versione minima, elencata in [Requisiti di versione](#requisiti-di-versione).

Non ti serve un telefono per iniziare. In sviluppo, l'host fittizio (mock) dell'SDK prende il posto di Layla, così puoi costruire e testare l'interfaccia in un browser desktop.

## Come funziona una mini-app Layla

Una mini-app è una pagina web che Layla carica in una propria WebView. L'SDK incapsula il livello di messaggistica tra quella pagina e l'app Layla, così puoi chiamare normali metodi:

```text
La tua mini-app -> SDK Layla -> ponte WebView -> app Layla -> modello sul dispositivo
```

Alcune conseguenze caratterizzano il resto di questo tutorial:

- **Non c'è nulla da configurare.** Nessuna chiave API, URL di base o endpoint. L'SDK funziona solo dove esiste il ponte di Layla, cioè dentro Layla. Altrove le chiamate all'SDK vengono rifiutate con `LaylaBridgeUnavailableError`.
- **Il modello lo sceglie l'utente.** Il tuo codice richiede un completamento di chat e Layla usa il motore di inferenza attivo. Per sapere come gli utenti passano dall'uno all'altro, consulta [Come funzionano i motori di inferenza salvati in Layla](/how-saved-inference-engines-work-in-layla/).
- **Le risposte possono essere lente.** Un modello eseguito su un telefono è più lento di un'API cloud, quindi ricevi la risposta in streaming, mostra uno stato di lavoro e lascia che l'utente possa interrompere.
- **Ogni mini-app ha un'archiviazione privata.** Un database SQLite privato e un'area di file privata appartengono alla tua mini-app e non sono condivisi con altre mini-app.

Se vuoi un po' di contesto prima di scrivere codice, leggi [Cosa sono le mini-app di Layla?](/post-what-are-layla-mini-apps-codekitty/) e [Iniziare con l'SDK Layla](/getting-started-with-the-layla-sdk/), che costruisce un'app HTML semplice più piccola.

## Passo 1: Ottenere il progetto

Ci sono due modi per iniziare.

### Opzione A: eseguire l'esempio ufficiale

Clona il repository dell'SDK ed esegui direttamente l'esempio:

```bash
git clone https://github.com/l3utterfly/layla-sdk.git
cd layla-sdk/examples/chat
npm install
npm run dev
```

Vite stampa un indirizzo locale. Aprilo in un browser e potrai subito chattare con l'host fittizio.

L'esempio si trova nella cartella `examples/chat` del repository, accanto alle altre mini-app di esempio:

![La cartella examples/chat nel repository GitHub layla-sdk, con le cartelle public e src, package.json, vite.config.ts e il README dell'esempio.](./chat.png)

### Opzione B: avviare un progetto tuo

Crea un nuovo progetto React e TypeScript con Vite e aggiungi l'SDK:

```bash
npm create vite@latest my-chat -- --template react-ts
cd my-chat
npm install
npm install @layla-network/sdk
npm install --save-dev vite-plugin-singlefile
```

Se segui il codice sorgente dell'esempio, cambia una cosa. All'interno del repository dell'SDK l'esempio importa l'SDK dalla sua cartella sorgente:

```ts
import { LaylaSDK } from "../../../src/index";
```

Nel tuo progetto importa invece dal pacchetto pubblicato:

```ts
import { LaylaSDK } from "@layla-network/sdk";
```

Per un'app più grande, con più pagine e più stato, il [modello di mini-app Layla](https://github.com/l3utterfly/layla-miniapp-template) ufficiale offre un punto di partenza già pronto con React, TypeScript e Vite.

### La struttura dei file dell'esempio

```text
examples/chat/
  index.html        Pagina di ingresso Vite con l'elemento #root
  package.json      React 19, Vite, TypeScript
  vite.config.ts    Plugin React più vite-plugin-singlefile
  public/           File statici copiati nella radice dell'output di build
  src/
    main.tsx        Installa il mock di Layla in sviluppo e monta <App />
    App.tsx         Tutta la logica della chat e l'interfaccia (circa 760 righe)
    App.css         Stili della schermata di chat
    index.css       Stili globali
```

Il passaggio di build, descritto nel [Passo 13](#passo-13-pacchettizzare-la-mini-app), trasforma tutto questo in un unico `index.html` autonomo, che è ciò che Layla carica.

## Passo 2: Creare il client Layla

All'inizio di `App.tsx` crea un solo client e riutilizzalo ovunque:

```ts
import { LaylaSDK, LaylaAbortError } from "@layla-network/sdk";

const layla = new LaylaSDK();
```

`LaylaSDK` e `Layla` sono la stessa classe. Ogni funzionalità è una proprietà di questo client: `layla.chat`, `layla.tts`, `layla.stt`, `layla.db`, `layla.characters`, `layla.images` e così via. Creare il client a livello di modulo, fuori da qualsiasi componente, significa che è condiviso e non viene ricreato a ogni nuovo rendering.

## Passo 3: Sviluppare in un browser con il mock di Layla

Fuori da Layla non esiste alcun ponte, quindi ogni chiamata all'SDK fallirebbe. L'SDK include un host fittizio che simula il ponte per lo sviluppo. Nell'esempio, `main.tsx` lo installa solo quando Vite esegue il suo server di sviluppo:

```ts
import { installLaylaMock } from "@layla-network/sdk";

if (import.meta.env.DEV) {
  installLaylaMock({
    respond: (messages) => {
      const message = messages.at(-1);
      return `You said: ${message?.content ?? "(no text)"}. Mock response from Layla.`;
    },
    latencyMs: 300,
    tokenDelayMs: 25,
  });
}
```

Le opzioni usate qui:

- `respond` riceve la conversazione e restituisce il testo con cui il finto modello deve rispondere. Il mock lo restituisce a pezzi in streaming, così l'interfaccia di streaming si comporta come sul dispositivo. Ogni messaggio in `messages` ha il formato nativo di Layla, ed è per questo che l'esempio controlla `message.image_base64` per riconoscere un'immagine allegata.
- `latencyMs` aggiunge un ritardo prima dell'inizio della risposta, per imitare l'avvio del modello.
- `tokenDelayMs` è il ritardo tra i pezzi trasmessi in streaming.

Poiché `import.meta.env.DEV` è `false` in una build di produzione, il mock non viene installato nel file che distribuisci, e le chiamate effettuate dentro Layla vanno al ponte reale.

Installa il mock prima della prima chiamata all'SDK. L'esempio usa un `import()` dinamico per il mock, in modo che il suo codice non faccia parte del bundle di produzione. Se vedi `LaylaBridgeUnavailableError` al primo caricamento della pagina in un browser, installa il mock prima di renderizzare l'app:

```tsx
async function start() {
  if (import.meta.env.DEV) {
    const { installLaylaMock } = await import("@layla-network/sdk");
    installLaylaMock({/* options */});
  }
  ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
}

void start();
```

### Simulare anche il database

Il mock non ha un vero SQLite. Per impostazione predefinita ogni chiamata a `layla.db.executeSql(...)` restituisce un risultato vuoto. L'esempio passa un gestore `executeSql` che supporta con `localStorage` le quattro istruzioni usate (`CREATE`, `INSERT`, `SELECT`, `DELETE`), sufficienti perché la cronologia si ricarichi dopo un aggiornamento del browser. Dentro Layla le stesse chiamate vengono eseguite su un vero database sul dispositivo e il gestore non viene usato.

Il mock risponde anche al riconoscimento vocale. Dopo che `startListening()` ha successo, emette una trascrizione predefinita, che puoi cambiare con l'opzione `sttTranscript` o disattivare passando `null`.

## Passo 4: Modellare la conversazione

L'esempio mantiene un proprio semplice tipo di messaggio per lo schermo:

```ts
interface ChatMessage {
  role: "user" | "assistant";
  content: string | null;
  imageBase64?: string;
  imageName?: string;
}
```

L'API di chat dell'SDK segue il formato OpenAI Chat Completions, con i ruoli `system`, `user` e `assistant` e un campo `content`. Una piccola funzione converte lo stato dello schermo in questo formato. Qui un'immagine allegata diventa una parte di contenuto `image_url`:

```ts
import type {
  ChatCompletionContentPart,
  ChatCompletionMessageParam,
} from "@layla-network/sdk";

const toCompletionMessage = (
  message: ChatMessage,
): ChatCompletionMessageParam => {
  if (message.role === "assistant") {
    return { role: "assistant", content: message.content };
  }

  if (!message.imageBase64) {
    return { role: "user", content: message.content ?? "" };
  }

  const content: ChatCompletionContentPart[] = [];
  if (message.content) {
    content.push({ type: "text", text: message.content });
  }
  content.push({
    type: "image_url",
    image_url: { url: message.imageBase64, detail: "auto" },
  });

  return { role: "user", content };
};
```

Mantenere un tipo separato per lo schermo è una scelta di progetto, non un requisito. Ti permette di memorizzare campi aggiuntivi, come il nome file dell'immagine, senza inviarli al modello.

Come per le altre API in stile OpenAI, ogni richiesta porta con sé l'intera conversazione in `messages`, quindi la tua app è responsabile di ricordare e rinviare i turni precedenti. Per dare al modello una personalità o delle istruzioni, aggiungi un messaggio `system` all'inizio dell'array.

## Passo 5: Ricevere una risposta in streaming

Questo è il cuore dell'app. Quando l'utente preme **Invia**, l'esempio costruisce il nuovo elenco di messaggi, mostra un messaggio vuoto dell'assistente e avvia un flusso:

```ts
const userMessage: ChatMessage = { role: "user", content: text };
const nextMessages = [...messages, userMessage];

// Show the user's message and an empty reply bubble immediately.
setMessages([...nextMessages, { role: "assistant", content: "" }]);

const stream = layla.chat.completions.stream({
  messages: nextMessages.map(toCompletionMessage),
});

stream.on("content", (_delta, snapshot) => {
  setMessages([...nextMessages, { role: "assistant", content: snapshot }]);
});

const reply = await stream.finalContent();
```

Punti da capire:

- **`stream(...)` ritorna subito.** Ti restituisce l'oggetto di flusso attivo in modo sincrono, non una promise, così puoi collegare i listener prima che arrivi il primo token.
- **Usa lo snapshot.** L'evento `content` passa due valori: il nuovo `delta` e lo `snapshot` completo della risposta finora. Impostare lo stato sullo snapshot è più semplice e più sicuro che accodare i delta, perché un evento perso o ripetuto non può corrompere il testo.
- **`finalContent()` attende la fine.** Si risolve con l'intera risposta visibile, oppure viene rifiutato se il flusso è fallito o è stato interrotto.
- **Il ragionamento viene separato per te.** Se il modello racchiude i suoi pensieri in tag `<think>`, l'SDK li rimuove da `content` e li consegna tramite l'evento `reasoning`, quindi i tag non compaiono mai nella tua bolla di chat.

Il flusso emette questi eventi:

| Evento      | Argomenti           | Significato                                                                 |
| ----------- | ------------------- | --------------------------------------------------------------------------- |
| `content`   | `delta`, `snapshot` | Nuovo testo visibile e intera risposta visibile finora                      |
| `reasoning` | `delta`, `snapshot` | Nuovo testo di ragionamento da un modello che "pensa"                       |
| `toolCall`  | `toolCall`          | Il modello ha chiesto di chiamare uno strumento (richiede un Layla recente) |
| `chunk`     | `chunk`             | Ogni chunk grezzo in stile OpenAI                                           |
| `end`       | nessuno             | La risposta è terminata                                                     |
| `error`     | `error`             | La richiesta è fallita o è stata interrotta                                 |

### Altri modi per leggere una risposta

Se ti serve solo la risposta finale, salta lo streaming:

```ts
const completion = await layla.chat.completions.create({ messages });
const text = completion.choices[0]?.message.content ?? "";
```

Il flusso è anche un iterabile asincrono, nello stesso stile dell'SDK OpenAI. Uscire dal ciclo interrompe la richiesta:

```ts
for await (const chunk of stream) {
  const piece = chunk.choices[0]?.delta.content ?? "";
}
```

Per tutto ciò che una persona guarda, preferisci lo streaming. Un modello locale può impiegare diversi secondi per arrivare alla prima parola, e una risposta visibile che cresce è molto meglio di una schermata bloccata.

### Mostrare che l'app sta lavorando

L'esempio comanda tre piccoli elementi dell'interfaccia da un solo flag `busy`: un'etichetta "Generating..." nell'intestazione, un cursore lampeggiante sull'ultima bolla dell'assistente e un pulsante **Stop** che sostituisce **Invia**. Mantiene inoltre una copia del flag in `busyRef`. I callback di lunga durata, come il listener vocale del Passo 11, altrimenti leggerebbero un valore obsoleto di `busy` da un rendering precedente. Leggere un ref evita il problema.

## Passo 6: Permettere all'utente di interrompere una generazione

Conserva un riferimento al flusso attivo, in modo che un pulsante possa annullarlo:

```ts
const streamRef = useRef<ChatCompletionStream | null>(null);

// when starting:
streamRef.current = stream;

// the Stop button:
const stopGeneration = () => streamRef.current?.abort();
```

L'interruzione fa sì che `finalContent()` venga rifiutato con una `LaylaAbortError`, e l'esempio gestisce questo caso separatamente dagli errori veri:

```ts
try {
  assistantContent = await stream.finalContent();
  // save the finished reply
} catch (err) {
  if (err instanceof LaylaAbortError) {
    // The user pressed Stop. Keep whatever text arrived so far.
    if (assistantContent) {
      // save the partial reply
    }
  } else {
    console.error(err);
  }
} finally {
  streamRef.current = null;
  setBusy(false);
}
```

`abort()` emette anche un evento `error` che trasporta una `LaylaAbortError`. Il listener `error` dell'esempio mostra il testo del messaggio sullo schermo, quindi filtra le interruzioni nel tuo listener, altrimenti il pulsante Stop sostituirà la risposta parziale con una riga di errore:

```ts
stream.on("error", (err) => {
  if (err instanceof LaylaAbortError) return;
  setMessages([
    ...nextMessages,
    { role: "assistant", content: `Error: ${err.message}` },
  ]);
});
```

Puoi anche annullare con il meccanismo standard del web passando `signal` alla richiesta:

```ts
const controller = new AbortController();
const stream = layla.chat.completions.stream({
  messages,
  signal: controller.signal,
});
controller.abort();
```

## Passo 7: Inviare un'immagine

L'ingresso di immagini usa il formato delle parti di contenuto OpenAI mostrato al Passo 4. L'esempio deve trasformare un file scelto dall'utente in un data URL base64:

```ts
const readImageAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("The selected image could not be read."));
    };
    reader.onerror = () =>
      reject(
        reader.error ?? new Error("The selected image could not be read."),
      );
    reader.readAsDataURL(file);
  });
```

L'esempio limita il selettore a quattro formati comuni e controlla il tipo prima di leggere:

```ts
const supportedImageTypes = new Set([
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);
```

Il selettore è un `<input type="file" accept="image/png,image/jpeg,image/gif,image/webp">` nascosto, aperto da un pulsante di allegato. Dopo la selezione, l'app mostra un'anteprima con un pulsante di rimozione e allega il data URL al messaggio successivo.

Due requisiti da tenere a mente:

- **Usa un data URL base64.** Le versioni più vecchie di Layla ignorano gli URL di immagini remoti `https://` e tutte le immagini dopo la prima in un messaggio, quindi un data URL è la scelta portabile.
- **Il modello deve poter vedere.** Un'immagine inviata a un modello solo testuale non può essere compresa. Per usare l'ingresso di immagini in Layla deve essere attivo un modello con capacità di visione. Vedi [Come aggiungere LLM con visione in Layla](/how-to-add-vision-llms-in-layla-qwen3-vl/).

## Passo 8: Salvare la cronologia nel database privato

Una mini-app si ricarica da zero a ogni apertura, quindi tutto ciò che l'utente deve conservare va memorizzato. `layla.db` dà a ogni mini-app un proprio database SQLite privato. L'esempio lo usa per la cronologia mostrata sullo schermo.

Crea la tabella all'avvio. `IF NOT EXISTS` rende sicuro eseguirla ogni volta:

```ts
const messagesTable = "chat_messages";

const createMessagesTable = () =>
  layla.db.executeSql(
    `CREATE TABLE IF NOT EXISTS ${messagesTable} (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       role TEXT NOT NULL,
       content TEXT,
       image_base64 TEXT,
       image_name TEXT,
       timestamp INTEGER NOT NULL
     )`,
  );
```

Aggiungi ogni messaggio con parametri vincolati. Passa i valori nel secondo argomento e usa segnaposto `?`. Non costruire mai SQL unendo il testo dell'utente alla stringa della query:

```ts
const insertMessage = async (message: ChatMessage) => {
  try {
    await layla.db.executeSql(
      `INSERT INTO ${messagesTable} (role, content, image_base64, image_name, timestamp)
       VALUES (?, ?, ?, ?, ?)`,
      [
        message.role,
        message.content,
        message.imageBase64 ?? null,
        message.imageName ?? null,
        Date.now(),
      ],
    );
  } catch (err) {
    console.error("Failed to persist chat message", err);
  }
};
```

Rileggi la cronologia in ordine. Il risultato ha un array `rows` di oggetti indicizzati per nome di colonna:

```ts
const result = await layla.db.executeSql(
  `SELECT role, content, image_base64, image_name
     FROM ${messagesTable}
    ORDER BY id ASC`,
);
const history = result.rows;
```

Ogni risultato contiene anche `rowsAffected` (quante righe ha modificato una scrittura) e `insertId` (l'id dell'ultima riga inserita, `0` se non applicabile). Il pulsante **Cancella** esegue semplicemente `DELETE FROM chat_messages`.

Esegui la preparazione una volta al montaggio del componente, poi riempi lo schermo con i messaggi salvati:

```ts
useEffect(() => {
  (async () => {
    try {
      await createMessagesTable();
      const history = await loadMessages();
      if (history.length > 0) setMessages(history);
    } catch (err) {
      console.error("Failed to load chat history", err);
    }
  })();
}, []);
```

L'esempio memorizza i dati delle immagini come testo base64 nella tabella, il che è semplice e va bene per una dimostrazione. Un'app che conserva molte immagini o immagini grandi dovrebbe scriverle con `layla.utils.saveFile(...)` e salvare nel database solo il nome del file.

## Passo 9: Copiare i messaggi nella cronologia chat di Layla

`layla.db` è l'archivio privato della tua app. Separatamente, puoi scrivere messaggi nella cronologia chat nativa di Layla con `layla.chat.saveChatMessage(...)`, così compaiono tra le normali conversazioni dell'utente. L'esempio fa entrambe le cose per ogni messaggio:

```ts
const sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const saveChatMessage = async (
  message: ChatMessage,
  characterId: "layla" | "user",
) => {
  try {
    await layla.chat.saveChatMessage({
      display_message: message.content ?? "",
      message: message.content ?? "",
      id: 0,
      character_id: characterId,
      session_id: sessionId,
      timestamp: Date.now(),
    });
  } catch (err) {
    console.error("Failed to save chat message", err);
  }
};
```

I campi:

| Campo             | Significato                                                                             |
| ----------------- | --------------------------------------------------------------------------------------- |
| `id`              | `0` o inferiore crea una nuova voce. Un id positivo sovrascrive una voce esistente.     |
| `session_id`      | La sessione di chat a cui appartiene la voce. L'esempio ne crea una nuova a ogni avvio. |
| `character_id`    | `"user"` per i messaggi dell'utente, altrimenti l'id del personaggio.                   |
| `display_message` | Il testo mostrato nella cronologia chat.                                                |
| `message`         | Il testo dato al modello nei turni successivi. Può differire da `display_message`.      |
| `timestamp`       | Tempo Unix in millisecondi. Un valore pari o inferiore a `0` usa l'ora corrente.        |

La chiamata si risolve con la voce memorizzata, incluso l'`id` assegnato.

Alcuni dettagli da tenere a mente:

- Solo le voci di un personaggio creano una sessione mancante. Una voce dell'utente salvata in una sessione non ancora esistente non la crea.
- Le nuove voci non hanno immagine. L'esempio mantiene quindi gli allegati immagine solo nel proprio database.
- L'esempio usa l'id letterale `"layla"` per le risposte dell'assistente. Se la tua mini-app chatta come un personaggio specifico, ottieni il suo vero id da `layla.characters.list()` e usalo al suo posto.
- La chiamata richiede una versione di Layla che supporti testi separati per `display_message` e `message`. Avvolgerla in un `try/catch`, come fa l'esempio, mantiene l'app funzionante se il salvataggio fallisce.

I due archivi rispondono a esigenze diverse:

| Archivio                     | Si trova in              | Usalo per                                          |
| ---------------------------- | ------------------------ | -------------------------------------------------- |
| `layla.db`                   | Solo nella tua mini-app  | Il tuo stato e la tua vista della cronologia       |
| `layla.chat.saveChatMessage` | Cronologia chat di Layla | Far comparire la conversazione dentro Layla stessa |

## Passo 10: Aggiungere la sintesi vocale

La sintesi vocale usa le voci che l'utente ha installato in Layla. Caricale una volta e lascia scegliere all'utente:

```ts
const [voices, setVoices] = useState<LaylaTTSVoice[]>([]);
const [voiceId, setVoiceId] = useState<string | null>(null);

useEffect(() => {
  layla.tts
    .getVoices()
    .then((available) => {
      setVoices(available);
      setVoiceId((current) => current ?? available[0]?.id ?? null);
    })
    .catch((err) => console.error("Failed to load TTS voices", err));
}, []);
```

Ogni voce ha un `id`, un `name`, un `type` e dei `tags`. Passa un id a `generateVoice(...)` per parlare con quella voce, oppure `null` per usare la voce predefinita di Layla. La promise si risolve al termine della riproduzione, quindi puoi usare `await` per sapere quando il parlato è finito:

```ts
const speak = async (text: string) => {
  setSpeaking(true);
  try {
    await layla.tts.generateVoice(voiceIdRef.current, text.trim());
  } catch (err) {
    if (!(err instanceof LaylaAbortError)) {
      console.error("TTS playback failed", err);
    }
  } finally {
    setSpeaking(false);
  }
};

const stopSpeaking = () => void layla.tts.stopSpeaking();
```

Ogni bolla dell'assistente completata ottiene un pulsante **Riproduci** che chiama `speak(message.content)`. Per approfondire le voci nell'app, vedi [Come far parlare i tuoi personaggi in Layla](/how-to-hear-your-characters-speak-in-layla/).

Se vuoi l'audio senza riprodurlo, `layla.tts.generateVoiceToFile(voiceId, text)` restituisce un data URI audio da usare in un elemento `<audio>`, oppure salva un file nell'archivio privato della mini-app.

## Passo 11: Aggiungere il riconoscimento vocale e una modalità a mani libere

L'ingresso vocale ha tre parti: una richiesta di avvio, un evento che consegna ogni trascrizione e una richiesta di arresto.

```ts
import type { STTSpeechRecognizedListener } from "@layla-network/sdk";

// 1. Subscribe once, for the lifetime of the app.
useEffect(() => {
  const handleSpeech: STTSpeechRecognizedListener = ({ transcript }) => {
    const text = transcript.trim();
    if (!text) return;
    setInput((prev) => (prev ? `${prev} ${text}` : text));
  };

  layla.stt.on("speechRecognized", handleSpeech);
  return () => {
    layla.stt.off("speechRecognized", handleSpeech);
    void layla.tts.stopSpeaking();
    void layla.stt.stopListening();
  };
}, []);

// 2. Ask the host to start listening.
await layla.stt.startListening();

// 3. Release the microphone when you are done.
await layla.stt.stopListening();
```

Nota che `startListening()` non restituisce la trascrizione. La sua promise si risolve quando il riconoscitore è partito. Il testo arriva dopo tramite l'evento `speechRecognized`, quindi iscriviti prima dell'avvio o subito dopo.

L'esempio lo usa in due modi:

- **Premi per parlare.** Il pulsante del microfono avvia l'ascolto e il testo riconosciuto viene inserito nella casella del messaggio, dove l'utente può modificarlo prima di inviarlo.
- **Modalità vocale.** Un interruttore nell'intestazione attiva un ciclo. L'app ascolta, invia ciò che sente, pronuncia la risposta con `layla.tts.generateVoice(...)` e poi riprende ad ascoltare. Il ciclo è solo l'unione dei pezzi visti sopra:

```ts
// at the end of sendMessage, after the reply has finished streaming
if (voiceModeRef.current && assistantContent) {
  await speak(assistantContent);
  if (voiceModeRef.current) void startListening();
}
```

Due dettagli di implementazione lo rendono affidabile. Il listener vocale viene registrato una sola volta e legge i valori correnti tramite ref (`voiceModeRef`, `busyRef`, `sendMessageRef`) invece di catturare lo stato, quindi non deve essere ri-sottoscritto a ogni rendering. Inoltre l'app interrompe qualsiasi riproduzione prima di iniziare ad ascoltare.

Nel browser, il mock emette una trascrizione di esempio poco dopo `startListening()`, così puoi testare l'intero flusso vocale senza microfono.

## Passo 12: Gestire gli errori

Tutti gli errori dell'SDK estendono `LaylaError`. Tre casi meritano una gestione specifica:

```ts
import {
  LaylaAbortError,
  LaylaBridgeUnavailableError,
  LaylaError,
} from "@layla-network/sdk";

try {
  const text = await stream.finalContent();
} catch (err) {
  if (err instanceof LaylaAbortError) {
    // The user stopped the request. Not a failure.
  } else if (err instanceof LaylaBridgeUnavailableError) {
    showMessage("Open this mini-app inside Layla.");
  } else if (err instanceof LaylaError) {
    showMessage(err.message);
  } else {
    throw err;
  }
}
```

L'esempio registra la maggior parte degli errori nella console e mostra i problemi di voce e immagine in un piccolo avviso in linea (`attachmentError` e `voiceError`). In una mini-app pubblicata, mostra il messaggio nell'interfaccia, dove l'utente lo vedrà.

## Passo 13: Pacchettizzare la mini-app

Layla carica un solo file HTML. Il `vite.config.ts` dell'esempio usa `vite-plugin-singlefile` per raggruppare tutti gli script e gli stili in `index.html`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [react(), viteSingleFile()],
});
```

Esegui la build:

```bash
npm run build
```

Lo script `build` esegue `tsc -b && vite build`, quindi gli errori TypeScript fermano la build prima che venga prodotto qualsiasi file.

### Aggiungere app.json

Layla legge nome e descrizione di una mini-app da un file `app.json`. La cartella dell'esempio non ne include uno, quindi aggiungilo in `public/`. Vite copia tutto ciò che si trova in `public/` nella radice dell'output di build:

```json
{
  "title": "Layla Chat",
  "tagline": "Chat with Layla by text, image or voice.",
  "description": "A simple chat mini-app that streams replies from the on-device model.",
  "iconUri": "icon.png"
}
```

`iconUri` punta a un file immagine nella stessa cartella, quindi inserisci in `public/` anche un `icon.png` quadrato. Le icone quadrate si adattano meglio alle griglie e agli elenchi di Layla. `backgroundImgUri` è un'aggiunta facoltativa per un'immagine di sfondo o di anteprima.

### Comprimere il contenuto

Dopo la build, `dist` dovrebbe apparire così:

```text
dist/
  app.json
  index.html
  icon.png
```

Crea uno ZIP del **contenuto** di `dist`, non della cartella `dist` stessa. `app.json` e `index.html` devono trovarsi nella radice dello ZIP, senza una cartella genitore. Se ospiti l'app per conto tuo, al posto di `index.html` usa un file `index.url` che contiene l'indirizzo su una sola riga.

Il repository dell'SDK pubblica inoltre le sue mini-app di esempio come ZIP importabile direttamente a ogni rilascio, un modo rapido per provare l'esempio di chat sul tuo telefono prima di costruire la tua app.

## Passo 14: Testare dentro Layla

Importa lo ZIP tramite il flusso di importazione delle mini-app di Layla, apri l'app e verifica:

1. Un messaggio arriva in streaming in modo progressivo e **Stop** lo termina senza perdere il testo parziale.
2. La risposta è più lenta che nel browser. È normale, perché sul dispositivo gira un vero modello.
3. Chiudere e riaprire la mini-app ripristina la cronologia dal database.
4. L'ingresso di immagini funziona con un modello con visione attivo e lo segnala chiaramente in caso contrario.
5. **Riproduci** pronuncia la risposta e il pulsante del microfono riempie la casella del messaggio.
6. La mini-app compare con il titolo e l'icona di `app.json`.

Se una chiamata all'SDK fallisce con `LaylaBridgeUnavailableError`, la pagina sta girando fuori da Layla. Se mancano titolo o icona, controlla che `app.json` sia JSON valido e si trovi nella radice dello ZIP.

## Idee per estendere l'app

Quando la chat di base funziona, lo stesso client offre di più:

- **Personaggi.** `layla.characters.list()` e `layla.characters.getImage(id)` permettono all'utente di scegliere con chi parlare. Usa la descrizione del personaggio in un messaggio `system`.
- **Mini-app contestuali.** `layla.contextual.getExecutionContext()` riporta il personaggio e la sessione di chat correnti, e `layla.contextual.on(...)` consegna eventi mentre la chat circostante cambia.
- **Memorie e persona.** `layla.memories` e `layla.personas` danno accesso a ciò che Layla sa dell'utente e del personaggio.
- **Immagini e musica.** `layla.images.generateImage(...)` e `layla.acestep.generateMusic(...)` generano contenuti multimediali con modelli sul dispositivo.
- **Chiamata di strumenti.** Passa `tools` in stile OpenAI a una richiesta di chat ed esegui tu il ciclo. Richiede un Layla e un SDK recenti, indicati più avanti.
- **Lavoro in background.** Un file `task.js` viene eseguito periodicamente senza aprire la WebView. Vedi [Eseguire attività in background nella tua mini-app](/running-background-tasks-in-your-mini-app/).

## Riferimento rapido per sviluppatori e agenti di programmazione

Questa sezione è una mappa condensata dell'esempio. Elenca ogni chiamata SDK effettuata dalla mini-app di chat, con il contratto che conta quando si scrive codice simile.

### Chiamate SDK usate dall'esempio di chat

| Chiamata                                                                                            | Restituisce                        | Note                                                                                         |
| --------------------------------------------------------------------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------- |
| `new LaylaSDK()`                                                                                    | client                             | Creane uno e riutilizzalo. `Layla` è un alias.                                               |
| `layla.chat.completions.stream({ messages, signal? })`                                              | `ChatCompletionStream` (sincrono)  | Collega subito i listener. `abort()` annulla.                                                |
| `layla.chat.completions.create({ messages })`                                                       | `Promise<ChatCompletion>`          | Senza streaming. Passa `stream: true` per ottenere invece un flusso.                         |
| `stream.on("content", (delta, snapshot) => ...)`                                                    | flusso                             | `snapshot` è l'intero testo visibile finora.                                                 |
| `stream.finalContent()`                                                                             | `Promise<string>`                  | Rifiutata in caso di errore o interruzione. Restituisce solo il testo visibile.              |
| `stream.abort()`                                                                                    | void                               | Fa rifiutare `finalContent()` con `LaylaAbortError` ed emette `error`.                       |
| `layla.chat.saveChatMessage({ id, session_id, character_id, display_message, message, timestamp })` | voce salvata con `id`              | `id <= 0` crea. Solo le voci dei personaggi creano nuove sessioni.                           |
| `layla.db.executeSql(query, params?)`                                                               | `{ rows, rowsAffected, insertId }` | SQLite privato per mini-app. Usa segnaposto `?`.                                             |
| `layla.tts.getVoices()`                                                                             | `LaylaTTSVoice[]`                  | Ognuna ha `id`, `name`, `type`, `tags`.                                                      |
| `layla.tts.generateVoice(voiceId \| null, text)`                                                    | `Promise<void>`                    | Riproduce l'audio. Si risolve al termine della riproduzione. `null` usa la voce predefinita. |
| `layla.tts.stopSpeaking()`                                                                          | `Promise<void>`                    | Interrompe la riproduzione.                                                                  |
| `layla.stt.startListening()`                                                                        | `Promise<void>`                    | Si risolve quando inizia l'ascolto. La trascrizione arriva dall'evento.                      |
| `layla.stt.on("speechRecognized", ({ transcript }) => ...)`                                         | client                             | Si rimuove con `layla.stt.off(...)`.                                                         |
| `layla.stt.stopListening()`                                                                         | `Promise<void>`                    | Rilascia il microfono. Non rimuove l'iscrizione all'evento.                                  |
| `installLaylaMock(options)`                                                                         | handle del mock                    | Solo sviluppo. Installalo prima della prima chiamata SDK.                                    |

Per tipi e campi esatti, leggi le dichiarazioni TypeScript generate dell'SDK e il suo [riferimento API](https://github.com/l3utterfly/layla-sdk) invece di indovinare la forma di un oggetto.

### Dove si trova cosa nell'esempio

| File e funzione                                                                    | Cosa mostra                                                                                           |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `src/main.tsx`                                                                     | Mock solo per lo sviluppo, incluso un gestore `executeSql` personalizzato                             |
| `App.tsx`: `toCompletionMessage`                                                   | Conversione dei messaggi dello schermo in messaggi in formato OpenAI con parti immagine               |
| `App.tsx`: `sendMessage`                                                           | Il ciclo di streaming, la gestione dell'interruzione, la persistenza e il ciclo della modalità vocale |
| `App.tsx`: `createMessagesTable`, `loadMessages`, `insertMessage`, `clearMessages` | Le funzioni SQLite con parametri vincolati                                                            |
| `App.tsx`: `saveChatMessage`                                                       | Scrittura nella cronologia chat nativa di Layla                                                       |
| `App.tsx`: `speak`, `startListening`, `stopListening`                              | Controllo della sintesi e del riconoscimento vocale                                                   |
| `App.tsx`: `readImageAsDataUrl`, `selectImage`                                     | Lettura di un file immagine in un data URL base64                                                     |
| `vite.config.ts`                                                                   | Raggruppamento dell'app in un unico `index.html`                                                      |

### Regole che evitano gli errori più comuni

- Importa dalla radice del pacchetto, `@layla-network/sdk`. Non importare da percorsi privati interni al pacchetto.
- Non chiamare l'SDK come un client HTTP. Non esistono chiave API né URL di base.
- Crea un solo client. Installa il mock solo in sviluppo, prima della prima chiamata SDK.
- Preferisci `stream(...)` per tutto ciò che viene mostrato a una persona e offri sempre all'utente un modo per interrompere.
- Considera `snapshot` la fonte di verità per il testo della risposta.
- Filtra `LaylaAbortError` nei listener `error`.
- Passa i valori del database come parametri `?`, non concatenando stringhe.
- Leggi i valori modificabili tramite ref nei listener che vivono per tutta la durata dell'app.
- Gli URL delle immagini nelle parti `image_url` devono essere data URL base64.
- Una mini-app compilata ha bisogno di `app.json` e `index.html` (o `index.url`) nella radice dello ZIP.

### Requisiti di versione

L'SDK dialoga con la versione di Layla in cui gira e sceglie il percorso migliore che quella versione supporta. Questo articolo è stato scritto per `@layla-network/sdk` 7.6.

| Funzionalità                                                                                      | Richiede                                                                 |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Chat, streaming, un'immagine per messaggio, sintesi vocale, riconoscimento vocale, database, file | Qualsiasi versione di Layla supportata                                   |
| Chiamata di strumenti, contenuti in più parti e più immagini in un messaggio                      | Layla 7.5.0-alpha o successiva e `@layla-network/sdk` 7.5.0 o successivo |
| Testi `display_message` e `message` separati in `saveChatMessage`                                 | Una build di Layla che supporta il contratto di salvataggio aggiornato   |

Su un Layla più vecchio, i campi che l'host non può trasportare vengono scartati con un avviso in console invece di generare un errore. Una mini-app che dipende dalla chiamata di strumenti può controllare prima la versione con `layla.contextual.getExecutionContext()`, che include `app_version`.

## Domande frequenti

### Come si crea una mini-app Layla?

Crea un'app web, installa `@layla-network/sdk`, chiama l'SDK dal tuo codice, compilala in un unico `index.html`, aggiungi un `app.json` e importa lo ZIP in Layla. Questo articolo percorre ogni passaggio usando un'app di chat.

### Serve una chiave API per usare l'SDK Layla?

No. L'SDK non usa chiavi API, URL di base o endpoint di rete. Invia le richieste all'app Layla tramite il ponte WebView, e Layla usa il modello e il motore di inferenza scelti dall'utente.

### L'API di chat di Layla è compatibile con l'API OpenAI?

Le forme di richiesta e risposta seguono il formato Chat Completions di OpenAI, inclusi ruoli, `messages`, streaming, parti di contenuto immagine e strumenti. È una libreria client che dialoga con l'app Layla, non un sostituto diretto di un endpoint HTTP OpenAI.

### Una mini-app Layla funziona offline?

La mini-app stessa è un file HTML locale e la chat passa dal modello che l'utente ha selezionato in Layla. Con un modello locale, nessun dato lascia il dispositivo. Se l'utente passa Layla a un motore di inferenza cloud, valgono le regole di connessione di quel motore.

### Posso usare un framework diverso da React?

Sì. Funziona qualsiasi stack web in grado di produrre una pagina HTML autonoma, inclusi JavaScript semplice, Vue e Svelte. L'esempio usa React con Vite perché aiuta a organizzare un'interfaccia più grande.

### Perché ricevo LaylaBridgeUnavailableError nel browser?

Il ponte di Layla esiste solo dentro la WebView di Layla. In un normale browser, installa il mock con `installLaylaMock(...)` prima della prima chiamata SDK, e solo in sviluppo.

### Come testo una mini-app senza un telefono?

Avvia il server di sviluppo di Vite e aprilo in un browser desktop. Il mock di Layla risponde alle chiamate di chat, voce, elenco delle voci e database, così puoi costruire l'interfaccia prima di installarla in Layla.

### Un agente di programmazione può scrivere la mini-app al posto mio?

Sì. Il repository dell'SDK Layla pubblica una agent skill per strumenti come Codex, Claude Code e OpenCode. Fornisci la skill al tuo agente, descrivi il comportamento desiderato e chiedigli di usare il mock di Layla per lo sviluppo locale. Vedi [Iniziare con l'SDK Layla](/getting-started-with-the-layla-sdk/#use-the-layla-sdk-agent-skill).

### Qual è la differenza tra layla.db e saveChatMessage?

`layla.db` è un database SQLite privato che appartiene alla tua mini-app e serve per i tuoi dati. `layla.chat.saveChatMessage(...)` scrive una voce nella cronologia chat di Layla, così compare insieme alle altre conversazioni dell'utente.

## Dove andare da qui

La mini-app di chat completata è un piccolo esempio completo dello schema seguito da ogni mini-app Layla: ricevere in streaming i risultati dal modello sul dispositivo, mantenere reattiva l'interfaccia mentre un modello locale lavora, conservare lo stato nell'archiviazione privata e distribuire un unico file HTML autonomo. Poiché l'inferenza avviene sul telefono, le app che crei con l'SDK Layla continuano a funzionare senza un servizio cloud. Per l'elenco completo delle chiamate, la cartella degli esempi e la agent skill, consulta il [repository dell'SDK Layla](https://github.com/l3utterfly/layla-sdk).
