---
title: So bauen Sie eine Layla-Mini-App mit dem Layla SDK
description: Bauen Sie Schritt für Schritt eine Layla-Mini-App mit dem Layla SDK. Streaming-Chat, Bildeingabe, Sprache, gespeicherter Verlauf und Paketierung, basierend auf dem offiziellen Chat-Beispiel.
category: Layla SDK
order: 30
keywords:
  - Layla-Mini-App bauen
  - Layla SDK Tutorial
  - "@layla-network/sdk"
  - Layla Chat-API
  - Streaming-Chat-API
  - KI-App auf dem Gerät
  - Offline-KI-Chatbot
  - lokale LLM-App
  - OpenAI-kompatible Chat-API
  - Text-to-Speech
  - Speech-to-Text
  - React Vite Mini-App
  - Layla SDK Agent-Skill
lastUpdated: 2026-11-04
translationKey: how-to-build-a-layla-mini-app-with-the-layla-sdk
ai_translated: true
---

**Eine Layla-Mini-App ist eine Web-App, die in Layla läuft und über das Layla SDK auf die KI-Funktionen des Geräts zugreift, darunter Chat, Sprache, Bilder, Erinnerungen und privaten Speicher.** Es gibt keinen API-Schlüssel und keinen Server, den Sie betreiben müssen. Sie schreiben eine gewöhnliche Web-App in JavaScript oder TypeScript, rufen `@layla-network/sdk` auf, und Layla erledigt die Arbeit mit dem Modell und der Inferenz-Engine, die der Nutzer ausgewählt hat.

Dieses Tutorial baut Schritt für Schritt eine vollständige Chat-Mini-App und verwendet als Vorlage das offizielle [Chat-Beispiel](https://github.com/l3utterfly/layla-sdk/tree/main/examples/chat) aus dem Layla-SDK-Repository. Am Ende wissen Sie, wie Sie eine Antwort des Modells auf dem Gerät streamen, eine Generierung stoppen, ein Bild senden, sprechen und zuhören, einen Verlauf in der privaten Datenbank der Mini-App speichern, im Browser mit dem SDK-Mock entwickeln und das Ergebnis für Layla paketieren.

> **Sie nutzen einen Coding-Agenten?** Das Layla SDK veröffentlicht einen Agent-Skill, der Coding-Agenten wie Codex, Claude Code und OpenCode beibringt, wie man Mini-Apps mit dem SDK schreibt. Sie können dem Agenten den Skill geben, die gewünschte App beschreiben und ihn einen Großteil der Arbeit in diesem Artikel für Sie erledigen lassen. Download und Einrichtung finden Sie unter [Den Layla-SDK-Agent-Skill verwenden](/getting-started-with-the-layla-sdk/#use-the-layla-sdk-agent-skill). Dieser Artikel ist außerdem als Referenz gedacht, die ein Agent zusammen mit dem Skill lesen kann. Die [Kurzreferenz](#kurzreferenz-für-entwickler-und-coding-agenten) weiter unten listet daher jeden Aufruf auf, den das Beispiel verwendet.

## Was Sie bauen werden

Das Chat-Beispiel ist eine einseitige React-und-Vite-App mit diesen Funktionen:

| Funktion                                          | Verwendete SDK-Aufrufe                                                                     |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Streaming-Antworten mit blinkendem Cursor         | `layla.chat.completions.stream(...)`, `stream.on("content", ...)`, `stream.finalContent()` |
| Stopp-Schaltfläche für eine laufende Generierung  | `stream.abort()`, `LaylaAbortError`                                                        |
| Ein Bild an eine Nachricht anhängen               | `image_url`-Inhaltsteile im OpenAI-Nachrichtenformat                                       |
| Verlauf, der Neustarts übersteht                  | `layla.db.executeSql(...)`                                                                 |
| Nachrichten in Laylas eigenen Chatverlauf kopiert | `layla.chat.saveChatMessage(...)`                                                          |
| Jede Antwort mit einer gewählten Stimme vorlesen  | `layla.tts.getVoices()`, `layla.tts.generateVoice(...)`, `layla.tts.stopSpeaking()`        |
| Eine Nachricht diktieren oder freihändig sprechen | `layla.stt.startListening()`, `layla.stt.on("speechRecognized", ...)`                      |
| In einem normalen Browser ausführen und debuggen  | `installLaylaMock(...)`                                                                    |

Fast die gesamte Logik steckt in zwei Dateien: [`src/App.tsx`](https://github.com/l3utterfly/layla-sdk/blob/main/examples/chat/src/App.tsx) für die App und [`src/main.tsx`](https://github.com/l3utterfly/layla-sdk/blob/main/examples/chat/src/main.tsx) für den Entwicklungs-Mock.

## Bevor Sie beginnen

Sie benötigen:

- Node.js und npm auf Ihrem Computer.
- Grundkenntnisse in JavaScript oder TypeScript. Das Beispiel verwendet React, das SDK setzt React aber nicht voraus. Jeder Web-Stack funktioniert.
- Eine aktuelle Version von Layla auf Ihrem Android-Smartphone, um auf dem Gerät zu testen. Einige Funktionen erfordern eine Mindestversion, die unter [Versionsanforderungen](#versionsanforderungen) aufgeführt ist.

Zum Einstieg brauchen Sie kein Smartphone. In der Entwicklung ersetzt der Mock-Host des SDK Layla, sodass Sie die Oberfläche in einem Desktop-Browser bauen und testen können.

## Wie eine Layla-Mini-App funktioniert

Eine Mini-App ist eine Webseite, die Layla in einer eigenen WebView lädt. Das SDK kapselt die Nachrichtenschicht zwischen dieser Seite und der Layla-App, sodass Sie gewöhnliche Methoden aufrufen können:

```text
Ihre Mini-App -> Layla SDK -> WebView-Brücke -> Layla-App -> Modell auf dem Gerät
```

Einige Folgen davon prägen den Rest dieses Tutorials:

- **Es gibt nichts zu konfigurieren.** Kein API-Schlüssel, keine Basis-URL, kein Endpunkt. Das SDK funktioniert nur dort, wo die Layla-Brücke existiert, also innerhalb von Layla. Überall sonst werden SDK-Aufrufe mit `LaylaBridgeUnavailableError` abgelehnt.
- **Der Nutzer wählt das Modell.** Ihr Code fordert eine Chat-Completion an, und Layla verwendet die aktive Inferenz-Engine. Wie Nutzer zwischen ihnen wechseln, erfahren Sie unter [So funktionieren gespeicherte Inferenz-Engines in Layla](/how-saved-inference-engines-work-in-layla/).
- **Antworten können langsam sein.** Ein Modell auf einem Smartphone ist langsamer als eine Cloud-API. Streamen Sie daher die Antwort, zeigen Sie einen Arbeitsstatus an und lassen Sie den Nutzer abbrechen.
- **Jede Mini-App hat privaten Speicher.** Eine private SQLite-Datenbank und ein privater Dateibereich gehören Ihrer Mini-App und werden nicht mit anderen Mini-Apps geteilt.

Wenn Sie vor dem Programmieren Hintergrundwissen möchten, lesen Sie [Was sind Layla-Mini-Apps?](/post-what-are-layla-mini-apps-codekitty/) und [Erste Schritte mit dem Layla SDK](/getting-started-with-the-layla-sdk/), das eine kleinere reine HTML-App baut.

## Schritt 1: Das Projekt beschaffen

Es gibt zwei Möglichkeiten zu starten.

### Option A: Das offizielle Beispiel ausführen

Klonen Sie das SDK-Repository und führen Sie das Beispiel direkt aus:

```bash
git clone https://github.com/l3utterfly/layla-sdk.git
cd layla-sdk/examples/chat
npm install
npm run dev
```

Vite gibt eine lokale Adresse aus. Öffnen Sie sie in einem Browser, dann können Sie sofort mit dem Mock-Host chatten.

Das Beispiel befindet sich im Ordner `examples/chat` des Repositorys, neben den anderen Beispiel-Mini-Apps:

![Der Ordner examples/chat im GitHub-Repository layla-sdk mit den Ordnern public und src, package.json, vite.config.ts und der README des Beispiels.](./chat.png)

### Option B: Ein eigenes Projekt starten

Erstellen Sie ein neues React-und-TypeScript-Projekt mit Vite und fügen Sie das SDK hinzu:

```bash
npm create vite@latest my-chat -- --template react-ts
cd my-chat
npm install
npm install @layla-network/sdk
npm install --save-dev vite-plugin-singlefile
```

Wenn Sie dem Quellcode des Beispiels folgen, ändern Sie eine Sache. Innerhalb des SDK-Repositorys importiert das Beispiel das SDK aus dem Quellordner:

```ts
import { LaylaSDK } from "../../../src/index";
```

Importieren Sie in Ihrem eigenen Projekt stattdessen aus dem veröffentlichten Paket:

```ts
import { LaylaSDK } from "@layla-network/sdk";
```

Für eine größere App mit mehreren Seiten und mehr Zustand bietet die offizielle [Layla-Mini-App-Vorlage](https://github.com/l3utterfly/layla-miniapp-template) einen fertigen Ausgangspunkt mit React, TypeScript und Vite.

### Die Dateistruktur des Beispiels

```text
examples/chat/
  index.html        Vite-Einstiegsseite mit dem #root-Element
  package.json      React 19, Vite, TypeScript
  vite.config.ts    React-Plugin plus vite-plugin-singlefile
  public/           Statische Dateien, die in das Stammverzeichnis der Build-Ausgabe kopiert werden
  src/
    main.tsx        Installiert den Layla-Mock in der Entwicklung und bindet <App /> ein
    App.tsx         Gesamte Chat-Logik und Oberfläche (etwa 760 Zeilen)
    App.css         Stile für den Chat-Bildschirm
    index.css       Globale Stile
```

Der Build-Schritt, beschrieben in [Schritt 13](#schritt-13-die-mini-app-paketieren), macht daraus eine einzige eigenständige `index.html`, die Layla lädt.

## Schritt 2: Den Layla-Client erstellen

Erstellen Sie am Anfang von `App.tsx` einen Client und verwenden Sie ihn überall wieder:

```ts
import { LaylaSDK, LaylaAbortError } from "@layla-network/sdk";

const layla = new LaylaSDK();
```

`LaylaSDK` und `Layla` sind dieselbe Klasse. Jede Funktion ist eine Eigenschaft dieses Clients: `layla.chat`, `layla.tts`, `layla.stt`, `layla.db`, `layla.characters`, `layla.images` und so weiter. Wird der Client auf Modulebene außerhalb einer Komponente erstellt, wird er geteilt und bei einem erneuten Rendern nicht neu erzeugt.

## Schritt 3: Im Browser mit dem Layla-Mock entwickeln

Außerhalb von Layla gibt es keine Brücke, sodass jeder SDK-Aufruf fehlschlagen würde. Das SDK enthält einen Mock-Host, der die Brücke für die Entwicklung simuliert. Im Beispiel installiert `main.tsx` ihn nur, wenn Vite seinen Entwicklungsserver ausführt:

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

Die hier verwendeten Optionen:

- `respond` erhält die Unterhaltung und gibt den Text zurück, mit dem das simulierte Modell antworten soll. Der Mock streamt ihn Stück für Stück zurück, sodass sich Ihre Streaming-Oberfläche so verhält wie auf dem Gerät. Jede Nachricht in `messages` hat Laylas natives Format, weshalb das Beispiel `message.image_base64` prüft, um ein angehängtes Bild zu erkennen.
- `latencyMs` fügt vor Beginn der Antwort eine Verzögerung ein, um den Start des Modells nachzuahmen.
- `tokenDelayMs` ist die Verzögerung zwischen den gestreamten Teilen.

Da `import.meta.env.DEV` in einem Produktions-Build `false` ist, wird der Mock in der Datei, die Sie ausliefern, nicht installiert, und Aufrufe innerhalb von Layla gehen an die echte Brücke.

Installieren Sie den Mock vor dem ersten SDK-Aufruf. Das Beispiel verwendet für den Mock ein dynamisches `import()`, damit der Mock-Code nicht Teil des Produktions-Bundles ist. Wenn beim ersten Laden der Seite im Browser `LaylaBridgeUnavailableError` auftritt, installieren Sie den Mock, bevor Sie Ihre App rendern:

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

### Auch die Datenbank mocken

Der Mock hat kein echtes SQLite. Standardmäßig gibt jeder Aufruf von `layla.db.executeSql(...)` ein leeres Ergebnis zurück. Das Beispiel übergibt einen `executeSql`-Handler, der die vier verwendeten Anweisungen (`CREATE`, `INSERT`, `SELECT`, `DELETE`) mit `localStorage` abbildet. Das genügt, damit der Verlauf nach einer Browser-Aktualisierung wieder geladen wird. Innerhalb von Layla laufen dieselben Aufrufe gegen eine echte Datenbank auf dem Gerät, und der Handler wird nicht verwendet.

Der Mock beantwortet auch Speech-to-Text. Nachdem `startListening()` erfolgreich war, sendet er ein vorgefertigtes Transkript, das Sie mit der Option `sttTranscript` ändern oder mit `null` deaktivieren können.

## Schritt 4: Die Unterhaltung modellieren

Das Beispiel führt für den Bildschirm einen eigenen einfachen Nachrichtentyp:

```ts
interface ChatMessage {
  role: "user" | "assistant";
  content: string | null;
  imageBase64?: string;
  imageName?: string;
}
```

Die Chat-API des SDK folgt dem OpenAI-Chat-Completions-Format mit den Rollen `system`, `user` und `assistant` sowie einem Feld `content`. Eine kleine Funktion wandelt Ihren Bildschirmzustand in dieses Format um. Hier wird ein angehängtes Bild zu einem `image_url`-Inhaltsteil:

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

Einen eigenen Bildschirmtyp zu führen ist eine Designentscheidung, keine Pflicht. So können Sie zusätzliche Felder wie den Dateinamen des Bildes speichern, ohne sie an das Modell zu senden.

Wie bei anderen OpenAI-artigen APIs enthält jede Anfrage die gesamte Unterhaltung in `messages`. Ihre App ist also dafür verantwortlich, frühere Beiträge zu merken und erneut zu senden. Um dem Modell eine Persönlichkeit oder Anweisungen zu geben, fügen Sie am Anfang des Arrays eine `system`-Nachricht ein.

## Schritt 5: Eine Antwort streamen

Das ist das Herzstück der App. Wenn der Nutzer auf **Senden** drückt, erstellt das Beispiel die neue Nachrichtenliste, zeigt eine leere Assistenten-Nachricht an und startet einen Stream:

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

Wichtige Punkte:

- **`stream(...)` kehrt sofort zurück.** Es liefert das laufende Stream-Objekt synchron, nicht als Promise, sodass Sie Listener anhängen können, bevor das erste Token eintrifft.
- **Verwenden Sie den Snapshot.** Das Ereignis `content` übergibt zwei Werte: das neue `delta` und den vollständigen `snapshot` der bisherigen Antwort. Den Zustand auf den Snapshot zu setzen ist einfacher und sicherer, als Deltas anzuhängen, denn ein verpasstes oder doppeltes Ereignis kann den Text nicht beschädigen.
- **`finalContent()` wartet auf das Ende.** Es wird mit der vollständigen sichtbaren Antwort aufgelöst oder abgelehnt, wenn der Stream fehlgeschlagen ist oder abgebrochen wurde.
- **Reasoning wird für Sie getrennt.** Wenn das Modell seine Überlegungen in `<think>`-Tags einschließt, entfernt das SDK sie aus `content` und liefert sie über das Ereignis `reasoning`, sodass Tags nie in Ihrer Chat-Blase erscheinen.

Der Stream sendet diese Ereignisse:

| Ereignis    | Argumente           | Bedeutung                                                           |
| ----------- | ------------------- | ------------------------------------------------------------------- |
| `content`   | `delta`, `snapshot` | Neuer sichtbarer Text und die gesamte bisher sichtbare Antwort      |
| `reasoning` | `delta`, `snapshot` | Neuer Reasoning-Text eines Denkmodells                              |
| `toolCall`  | `toolCall`          | Das Modell wollte ein Tool aufrufen (erfordert ein aktuelles Layla) |
| `chunk`     | `chunk`             | Jeder rohe Chunk im OpenAI-Stil                                     |
| `end`       | keine               | Die Antwort ist abgeschlossen                                       |
| `error`     | `error`             | Die Anfrage ist fehlgeschlagen oder wurde abgebrochen               |

### Weitere Möglichkeiten, eine Antwort zu lesen

Wenn Sie nur die endgültige Antwort brauchen, verzichten Sie auf Streaming:

```ts
const completion = await layla.chat.completions.create({ messages });
const text = completion.choices[0]?.message.content ?? "";
```

Der Stream ist außerdem ein asynchron iterierbares Objekt, im selben Stil wie das OpenAI-SDK. Verlassen Sie die Schleife mit `break`, wird die Anfrage abgebrochen:

```ts
for await (const chunk of stream) {
  const piece = chunk.choices[0]?.delta.content ?? "";
}
```

Bevorzugen Sie für alles, was ein Mensch beobachtet, Streaming. Ein lokales Modell kann mehrere Sekunden bis zum ersten Wort brauchen, und eine wachsende sichtbare Antwort ist weit besser als ein eingefrorener Bildschirm.

### Zeigen, dass die App arbeitet

Das Beispiel steuert drei kleine Teile der Oberfläche über ein einziges `busy`-Flag: ein Label „Generating...“ in der Kopfzeile, einen blinkenden Cursor in der letzten Assistenten-Blase und eine **Stopp**-Schaltfläche, die **Senden** ersetzt. Außerdem hält es eine Kopie des Flags in `busyRef`. Langlebige Callbacks, etwa der Sprach-Listener in Schritt 11, würden sonst einen veralteten Wert von `busy` aus einem früheren Render lesen. Das Lesen einer Ref verhindert das.

## Schritt 6: Den Nutzer eine Generierung stoppen lassen

Behalten Sie einen Verweis auf den aktiven Stream, damit eine Schaltfläche ihn abbrechen kann:

```ts
const streamRef = useRef<ChatCompletionStream | null>(null);

// when starting:
streamRef.current = stream;

// the Stop button:
const stopGeneration = () => streamRef.current?.abort();
```

Ein Abbruch lässt `finalContent()` mit einem `LaylaAbortError` ablehnen, und das Beispiel behandelt diesen Fall getrennt von echten Fehlern:

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

`abort()` sendet außerdem ein `error`-Ereignis mit einem `LaylaAbortError`. Der `error`-Listener des Beispiels zeigt den Nachrichtentext auf dem Bildschirm an. Filtern Sie Abbrüche daher in Ihrem eigenen Listener heraus, sonst ersetzt die Stopp-Schaltfläche die Teilantwort durch eine Fehlerzeile:

```ts
stream.on("error", (err) => {
  if (err instanceof LaylaAbortError) return;
  setMessages([
    ...nextMessages,
    { role: "assistant", content: `Error: ${err.message}` },
  ]);
});
```

Sie können auch mit dem Standardmechanismus des Webs abbrechen, indem Sie `signal` an die Anfrage übergeben:

```ts
const controller = new AbortController();
const stream = layla.chat.completions.stream({
  messages,
  signal: controller.signal,
});
controller.abort();
```

## Schritt 7: Ein Bild senden

Die Bildeingabe verwendet das in Schritt 4 gezeigte OpenAI-Inhaltsteil-Format. Das Beispiel muss eine vom Nutzer gewählte Datei in eine Base64-Data-URL umwandeln:

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

Das Beispiel beschränkt die Auswahl auf vier gängige Formate und prüft den Typ vor dem Lesen:

```ts
const supportedImageTypes = new Set([
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);
```

Die Auswahl selbst ist ein verstecktes `<input type="file" accept="image/png,image/jpeg,image/gif,image/webp">`, das über eine Anhängen-Schaltfläche geöffnet wird. Nach der Auswahl zeigt die App eine Vorschau mit einer Entfernen-Schaltfläche und hängt die Data-URL an die nächste Nachricht an.

Zwei Voraussetzungen sollten Sie beachten:

- **Verwenden Sie eine Base64-Data-URL.** Ältere Layla-Versionen ignorieren entfernte `https://`-Bild-URLs und alle Bilder nach dem ersten in einer Nachricht, daher ist eine Data-URL die portable Wahl.
- **Das Modell muss sehen können.** Ein an ein reines Textmodell gesendetes Bild kann nicht verstanden werden. Für die Bildeingabe in Layla muss ein Vision-fähiges Modell aktiv sein. Siehe [So fügen Sie Vision-LLMs in Layla hinzu](/how-to-add-vision-llms-in-layla-qwen3-vl/).

## Schritt 8: Den Verlauf in der privaten Datenbank speichern

Eine Mini-App wird bei jedem Öffnen neu geladen, daher muss alles, was der Nutzer behalten soll, gespeichert werden. `layla.db` gibt jeder Mini-App eine eigene private SQLite-Datenbank. Das Beispiel nutzt sie für den Verlauf auf dem Bildschirm.

Erstellen Sie die Tabelle beim Start. `IF NOT EXISTS` macht es sicher, sie jedes Mal auszuführen:

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

Fügen Sie jede Nachricht mit gebundenen Parametern an. Übergeben Sie Werte über das zweite Argument und verwenden Sie `?`-Platzhalter. Bauen Sie SQL niemals, indem Sie Nutzertext in den Abfrage-String einfügen:

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

Lesen Sie den Verlauf der Reihe nach zurück. Das Ergebnis hat ein `rows`-Array aus Objekten, die nach Spaltennamen indiziert sind:

```ts
const result = await layla.db.executeSql(
  `SELECT role, content, image_base64, image_name
     FROM ${messagesTable}
    ORDER BY id ASC`,
);
const history = result.rows;
```

Jedes Ergebnis enthält außerdem `rowsAffected` (wie viele Zeilen ein Schreibvorgang geändert hat) und `insertId` (die ID der zuletzt eingefügten Zeile, `0`, wenn nicht zutreffend). Die Schaltfläche **Löschen** führt einfach `DELETE FROM chat_messages` aus.

Führen Sie die Einrichtung einmal aus, wenn die Komponente eingehängt wird, und füllen Sie dann den Bildschirm mit den gespeicherten Nachrichten:

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

Das Beispiel speichert Bilddaten als Base64-Text in der Tabelle, was einfach und für eine Demonstration in Ordnung ist. Eine App, die viele oder große Bilder aufbewahrt, sollte sie mit `layla.utils.saveFile(...)` schreiben und in der Datenbank nur den Dateinamen speichern.

## Schritt 9: Nachrichten in Laylas Chatverlauf kopieren

`layla.db` ist der private Speicher Ihrer App. Unabhängig davon können Sie mit `layla.chat.saveChatMessage(...)` Nachrichten in Laylas nativen Chatverlauf schreiben, sodass sie zwischen den normalen Unterhaltungen des Nutzers erscheinen. Das Beispiel tut beides für jede Nachricht:

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

Die Felder:

| Feld              | Bedeutung                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------- |
| `id`              | `0` oder kleiner erstellt einen neuen Eintrag. Eine positive ID überschreibt einen vorhandenen Eintrag. |
| `session_id`      | Die Chat-Sitzung, zu der der Eintrag gehört. Das Beispiel erzeugt bei jedem Start eine neue.            |
| `character_id`    | `"user"` für die eigenen Nachrichten des Nutzers, sonst die ID des Charakters.                          |
| `display_message` | Der im Chatverlauf angezeigte Text.                                                                     |
| `message`         | Der Text, der dem Modell in späteren Runden übergeben wird. Er kann von `display_message` abweichen.    |
| `timestamp`       | Unix-Zeit in Millisekunden. Bei `0` oder kleiner wird die aktuelle Zeit verwendet.                      |

Der Aufruf wird mit dem gespeicherten Eintrag aufgelöst, einschließlich der zugewiesenen `id`.

Einige Details, die Sie beachten sollten:

- Nur Einträge eines Charakters erstellen eine fehlende Sitzung. Ein Nutzer-Eintrag, der in einer noch nicht existierenden Sitzung gespeichert wird, erstellt sie nicht.
- Neue Einträge haben kein Bild. Das Beispiel behält Bildanhänge deshalb nur in seiner eigenen Datenbank.
- Das Beispiel verwendet die feste ID `"layla"` für Assistenten-Antworten. Wenn Ihre Mini-App als bestimmter Charakter chattet, holen Sie sich dessen echte ID aus `layla.characters.list()` und verwenden Sie diese stattdessen.
- Der Aufruf benötigt eine Layla-Version, die getrennte Texte für `display_message` und `message` unterstützt. Verpacken Sie ihn wie im Beispiel in `try/catch`, damit die App weiterläuft, falls das Speichern fehlschlägt.

Die beiden Speicher beantworten unterschiedliche Fragen:

| Speicher                     | Liegt in              | Verwenden Sie ihn für                                 |
| ---------------------------- | --------------------- | ----------------------------------------------------- |
| `layla.db`                   | Nur in Ihrer Mini-App | Ihren eigenen Zustand und Ihre eigene Verlaufsansicht |
| `layla.chat.saveChatMessage` | Laylas Chatverlauf    | Damit die Unterhaltung auch in Layla selbst erscheint |

## Schritt 10: Text-to-Speech hinzufügen

Text-to-Speech verwendet die Stimmen, die der Nutzer in Layla installiert hat. Laden Sie sie einmal und lassen Sie den Nutzer wählen:

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

Jede Stimme hat eine `id`, einen `name`, einen `type` und `tags`. Übergeben Sie eine ID an `generateVoice(...)`, um mit dieser Stimme zu sprechen, oder `null`, um Laylas Standardstimme zu verwenden. Das Promise wird aufgelöst, wenn die Wiedergabe endet, sodass Sie mit `await` wissen, wann die Sprachausgabe fertig ist:

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

Jede fertige Assistenten-Blase erhält eine Schaltfläche **Abspielen**, die `speak(message.content)` aufruft. Hintergrundwissen zu Stimmen in der App finden Sie unter [So hören Sie Ihre Charaktere in Layla sprechen](/how-to-hear-your-characters-speak-in-layla/).

Wenn Sie das Audio ohne Wiedergabe möchten, liefert `layla.tts.generateVoiceToFile(voiceId, text)` einen Audio-Data-URI, den Sie in einem `<audio>`-Element verwenden können, oder speichert eine Datei im privaten Speicher der Mini-App.

## Schritt 11: Speech-to-Text und einen Freisprechmodus hinzufügen

Die Spracheingabe besteht aus drei Teilen: einer Anfrage zum Starten, einem Ereignis, das jedes Transkript liefert, und einer Anfrage zum Stoppen.

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

Beachten Sie, dass `startListening()` das Transkript nicht zurückgibt. Sein Promise wird aufgelöst, sobald der Erkenner gestartet ist. Der Text kommt später über das Ereignis `speechRecognized`, abonnieren Sie es also vor oder direkt nach dem Start.

Das Beispiel nutzt dies auf zwei Arten:

- **Push-to-Talk.** Die Mikrofon-Schaltfläche startet die Aufnahme, und der erkannte Text landet im Nachrichtenfeld, wo der Nutzer ihn vor dem Senden bearbeiten kann.
- **Sprachmodus.** Ein Schalter in der Kopfzeile aktiviert eine Schleife. Die App hört zu, sendet das Gehörte, spricht die Antwort mit `layla.tts.generateVoice(...)` und beginnt dann wieder zuzuhören. Die Schleife besteht nur aus den oben gezeigten Bausteinen:

```ts
// at the end of sendMessage, after the reply has finished streaming
if (voiceModeRef.current && assistantContent) {
  await speak(assistantContent);
  if (voiceModeRef.current) void startListening();
}
```

Zwei Implementierungsdetails machen das zuverlässig. Der Sprach-Listener wird einmal registriert und liest aktuelle Werte über Refs (`voiceModeRef`, `busyRef`, `sendMessageRef`), statt Zustand einzuschließen, sodass er nicht bei jedem Render neu abonniert werden muss. Und die App beendet jede laufende Wiedergabe, bevor sie mit dem Zuhören beginnt.

Im Browser sendet der Mock kurz nach `startListening()` ein Beispiel-Transkript, sodass Sie den gesamten Sprachablauf ohne Mikrofon testen können.

## Schritt 12: Fehler behandeln

Alle Fehler des SDK erweitern `LaylaError`. Drei Fälle verdienen eine eigene Behandlung:

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

Das Beispiel schreibt die meisten Fehler in die Konsole und zeigt Sprach- und Bildprobleme in einer kleinen Inline-Meldung (`attachmentError` und `voiceError`). Zeigen Sie die Meldung in einer veröffentlichten Mini-App dort in der Oberfläche an, wo der Nutzer sie sieht.

## Schritt 13: Die Mini-App paketieren

Layla lädt eine einzige HTML-Datei. Die `vite.config.ts` des Beispiels verwendet `vite-plugin-singlefile`, um alle Skripte und Stile in `index.html` zu bündeln:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [react(), viteSingleFile()],
});
```

Erstellen Sie den Build:

```bash
npm run build
```

Das Skript `build` führt `tsc -b && vite build` aus, sodass TypeScript-Fehler den Build stoppen, bevor etwas erzeugt wird.

### app.json hinzufügen

Layla liest Name und Beschreibung einer Mini-App aus einer Datei `app.json`. Der Beispielordner enthält keine, fügen Sie sie also in `public/` hinzu. Vite kopiert alles aus `public/` in das Stammverzeichnis der Build-Ausgabe:

```json
{
  "title": "Layla Chat",
  "tagline": "Chat with Layla by text, image or voice.",
  "description": "A simple chat mini-app that streams replies from the on-device model.",
  "iconUri": "icon.png"
}
```

`iconUri` verweist auf eine Bilddatei im selben Ordner, legen Sie also auch ein quadratisches `icon.png` in `public/` ab. Quadratische Symbole passen am besten in Laylas Raster und Listen. `backgroundImgUri` ist eine optionale Ergänzung für ein Hintergrund- oder Vorschaubild.

### Den Inhalt zippen

Nach dem Build sollte `dist` so aussehen:

```text
dist/
  app.json
  index.html
  icon.png
```

Erstellen Sie eine ZIP-Datei aus dem **Inhalt** von `dist`, nicht aus dem Ordner `dist` selbst. `app.json` und `index.html` müssen im Stammverzeichnis der ZIP-Datei liegen, ohne übergeordneten Ordner. Wenn Sie die App selbst hosten, verwenden Sie statt `index.html` eine Datei `index.url`, die die Adresse in einer einzigen Zeile enthält.

Das SDK-Repository veröffentlicht seine Beispiel-Mini-Apps mit jedem Release außerdem als sofort importierbare ZIP-Datei. Damit können Sie das Chat-Beispiel schnell auf Ihrem Smartphone ausprobieren, bevor Sie Ihre eigene App bauen.

## Schritt 14: In Layla testen

Importieren Sie die ZIP-Datei über Laylas Mini-App-Importablauf, öffnen Sie die App und prüfen Sie:

1. Eine Nachricht wird fortlaufend gestreamt, und **Stopp** beendet sie, ohne den Teiltext zu verlieren.
2. Die Antwort ist langsamer als im Browser. Das ist zu erwarten, weil auf dem Gerät ein echtes Modell läuft.
3. Nach dem Schließen und erneuten Öffnen der Mini-App wird der Verlauf aus der Datenbank wiederhergestellt.
4. Die Bildeingabe funktioniert mit einem aktiven Vision-fähigen Modell und weist klar darauf hin, wenn nicht.
5. **Abspielen** spricht die Antwort, und die Mikrofon-Schaltfläche füllt das Nachrichtenfeld.
6. Die Mini-App erscheint mit dem Titel und dem Symbol aus `app.json`.

Schlägt ein SDK-Aufruf mit `LaylaBridgeUnavailableError` fehl, läuft die Seite außerhalb von Layla. Fehlt der Titel oder das Symbol, prüfen Sie, ob `app.json` gültiges JSON ist und im Stammverzeichnis der ZIP-Datei liegt.

## Ideen zur Erweiterung der App

Sobald der grundlegende Chat funktioniert, bietet derselbe Client mehr:

- **Charaktere.** Mit `layla.characters.list()` und `layla.characters.getImage(id)` kann der Nutzer wählen, mit wem er spricht. Verwenden Sie die Beschreibung des Charakters in einer `system`-Nachricht.
- **Kontextbezogene Mini-Apps.** `layla.contextual.getExecutionContext()` meldet den aktuellen Charakter und die Chat-Sitzung, und `layla.contextual.on(...)` liefert Ereignisse, während sich der umgebende Chat ändert.
- **Erinnerungen und Personas.** `layla.memories` und `layla.personas` geben Zugriff darauf, was Layla über den Nutzer und den Charakter weiß.
- **Bilder und Musik.** `layla.images.generateImage(...)` und `layla.acestep.generateMusic(...)` erzeugen Medien mit Modellen auf dem Gerät.
- **Tool-Aufrufe.** Übergeben Sie OpenAI-artige `tools` an eine Chat-Anfrage und führen Sie die Schleife selbst aus. Das erfordert ein aktuelles Layla und SDK, siehe unten.
- **Hintergrundarbeit.** Eine Datei `task.js` läuft periodisch, ohne die WebView zu öffnen. Siehe [Hintergrundaufgaben in Ihrer Mini-App ausführen](/running-background-tasks-in-your-mini-app/).

## Kurzreferenz für Entwickler und Coding-Agenten

Dieser Abschnitt ist eine verdichtete Übersicht über das Beispiel. Er listet jeden SDK-Aufruf auf, den die Chat-Mini-App macht, mit dem Vertrag, der beim Schreiben ähnlichen Codes zählt.

### Vom Chat-Beispiel verwendete SDK-Aufrufe

| Aufruf                                                                                              | Rückgabe                           | Hinweise                                                                                   |
| --------------------------------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------ |
| `new LaylaSDK()`                                                                                    | Client                             | Einen erstellen und wiederverwenden. `Layla` ist ein Alias.                                |
| `layla.chat.completions.stream({ messages, signal? })`                                              | `ChatCompletionStream` (synchron)  | Listener sofort anhängen. `abort()` bricht ab.                                             |
| `layla.chat.completions.create({ messages })`                                                       | `Promise<ChatCompletion>`          | Ohne Streaming. Mit `stream: true` erhalten Sie stattdessen einen Stream.                  |
| `stream.on("content", (delta, snapshot) => ...)`                                                    | Stream                             | `snapshot` ist der gesamte bisher sichtbare Text.                                          |
| `stream.finalContent()`                                                                             | `Promise<string>`                  | Wird bei Fehler oder Abbruch abgelehnt. Gibt nur sichtbaren Text zurück.                   |
| `stream.abort()`                                                                                    | void                               | Lässt `finalContent()` mit `LaylaAbortError` ablehnen und sendet `error`.                  |
| `layla.chat.saveChatMessage({ id, session_id, character_id, display_message, message, timestamp })` | gespeicherter Eintrag mit `id`     | `id <= 0` erstellt. Nur Charakter-Einträge erstellen neue Sitzungen.                       |
| `layla.db.executeSql(query, params?)`                                                               | `{ rows, rowsAffected, insertId }` | Private SQLite-Datenbank pro Mini-App. `?`-Platzhalter verwenden.                          |
| `layla.tts.getVoices()`                                                                             | `LaylaTTSVoice[]`                  | Jede hat `id`, `name`, `type`, `tags`.                                                     |
| `layla.tts.generateVoice(voiceId \| null, text)`                                                    | `Promise<void>`                    | Spielt Audio ab. Wird nach Ende der Wiedergabe aufgelöst. `null` nutzt die Standardstimme. |
| `layla.tts.stopSpeaking()`                                                                          | `Promise<void>`                    | Beendet die Wiedergabe.                                                                    |
| `layla.stt.startListening()`                                                                        | `Promise<void>`                    | Wird aufgelöst, wenn das Zuhören beginnt. Das Transkript kommt über das Ereignis.          |
| `layla.stt.on("speechRecognized", ({ transcript }) => ...)`                                         | Client                             | Mit `layla.stt.off(...)` entfernen.                                                        |
| `layla.stt.stopListening()`                                                                         | `Promise<void>`                    | Gibt das Mikrofon frei. Entfernt das Ereignis-Abonnement nicht.                            |
| `installLaylaMock(options)`                                                                         | Mock-Handle                        | Nur für die Entwicklung. Vor dem ersten SDK-Aufruf installieren.                           |

Genaue Typen und Felder entnehmen Sie den generierten TypeScript-Deklarationen des SDK und seiner [API-Referenz](https://github.com/l3utterfly/layla-sdk), statt die Form eines Objekts zu raten.

### Wo im Beispiel was zu finden ist

| Datei und Funktion                                                                 | Was sie zeigt                                                                       |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `src/main.tsx`                                                                     | Mock nur für die Entwicklung, einschließlich eines eigenen `executeSql`-Handlers    |
| `App.tsx`: `toCompletionMessage`                                                   | Umwandlung von Bildschirmnachrichten in Nachrichten im OpenAI-Format mit Bildteilen |
| `App.tsx`: `sendMessage`                                                           | Die Streaming-Schleife, Abbruchbehandlung, Speicherung und die Sprachmodus-Schleife |
| `App.tsx`: `createMessagesTable`, `loadMessages`, `insertMessage`, `clearMessages` | Die SQLite-Helfer mit gebundenen Parametern                                         |
| `App.tsx`: `saveChatMessage`                                                       | Schreiben in Laylas nativen Chatverlauf                                             |
| `App.tsx`: `speak`, `startListening`, `stopListening`                              | Steuerung von Text-to-Speech und Speech-to-Text                                     |
| `App.tsx`: `readImageAsDataUrl`, `selectImage`                                     | Eine Bilddatei in eine Base64-Data-URL einlesen                                     |
| `vite.config.ts`                                                                   | Die App in eine einzige `index.html` bündeln                                        |

### Regeln, die häufige Fehler verhindern

- Importieren Sie aus dem Paket-Stamm `@layla-network/sdk`. Importieren Sie nicht aus privaten Pfaden im Paket.
- Rufen Sie das SDK nicht wie einen HTTP-Client auf. Es gibt keinen API-Schlüssel und keine Basis-URL.
- Erstellen Sie einen Client. Installieren Sie den Mock nur in der Entwicklung und vor dem ersten SDK-Aufruf.
- Bevorzugen Sie `stream(...)` für alles, was ein Mensch sieht, und geben Sie dem Nutzer immer eine Möglichkeit zum Stoppen.
- Betrachten Sie `snapshot` als maßgebliche Quelle für den Antworttext.
- Filtern Sie `LaylaAbortError` in `error`-Listenern heraus.
- Übergeben Sie Datenbankwerte als `?`-Parameter, nicht durch Verketten von Strings.
- Lesen Sie veränderliche Werte in Listenern, die während der gesamten App-Laufzeit bestehen, über Refs.
- Bild-URLs in `image_url`-Teilen müssen Base64-Data-URLs sein.
- Eine gebaute Mini-App benötigt `app.json` und `index.html` (oder `index.url`) im Stammverzeichnis der ZIP-Datei.

### Versionsanforderungen

Das SDK spricht mit der Layla-Version, in der es läuft, und nutzt den besten Weg, den diese Version unterstützt. Dieser Artikel wurde für `@layla-network/sdk` 7.6 geschrieben.

| Funktion                                                                | Erfordert                                                              |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Chat, Streaming, ein Bild pro Nachricht, TTS, STT, Datenbank, Dateien   | Jede unterstützte Layla-Version                                        |
| Tool-Aufrufe, mehrteilige Inhalte und mehrere Bilder in einer Nachricht | Layla 7.5.0-alpha oder neuer und `@layla-network/sdk` 7.5.0 oder neuer |
| Getrennte Texte `display_message` und `message` in `saveChatMessage`    | Ein Layla-Build, der den aktualisierten Speichervertrag unterstützt    |

Bei einem älteren Layla werden Felder, die der Host nicht übertragen kann, mit einer Konsolenwarnung verworfen, statt einen Fehler auszulösen. Eine Mini-App, die von Tool-Aufrufen abhängt, kann vorher die Version mit `layla.contextual.getExecutionContext()` prüfen, das `app_version` enthält.

## Häufig gestellte Fragen

### Wie baue ich eine Layla-Mini-App?

Erstellen Sie eine Web-App, installieren Sie `@layla-network/sdk`, rufen Sie das SDK aus Ihrem Code auf, bauen Sie sie zu einer einzigen `index.html`, fügen Sie eine `app.json` hinzu und importieren Sie die ZIP-Datei in Layla. Dieser Artikel führt anhand einer Chat-App durch jeden Schritt.

### Brauche ich einen API-Schlüssel für das Layla SDK?

Nein. Das SDK verwendet keinen API-Schlüssel, keine Basis-URL und keinen Netzwerk-Endpunkt. Es sendet Anfragen über die WebView-Brücke an die Layla-App, und Layla verwendet das Modell und die Inferenz-Engine, die der Nutzer gewählt hat.

### Ist die Layla-Chat-API mit der OpenAI-API kompatibel?

Die Formen von Anfrage und Antwort folgen dem Chat-Completions-Format von OpenAI, einschließlich Rollen, `messages`, Streaming, Bild-Inhaltsteilen und Tools. Es ist eine Client-Bibliothek, die mit der Layla-App spricht, kein direkter Ersatz für einen OpenAI-HTTP-Endpunkt.

### Funktioniert eine Layla-Mini-App offline?

Die Mini-App selbst ist eine lokale HTML-Datei, und der Chat läuft über das Modell, das der Nutzer in Layla ausgewählt hat. Mit einem lokalen Modell verlassen keine Daten das Gerät. Wechselt der Nutzer in Layla zu einer Cloud-Inferenz-Engine, gelten die Verbindungsregeln dieser Engine.

### Kann ich ein anderes Framework als React verwenden?

Ja. Jeder Web-Stack, der eine eigenständige HTML-Seite erzeugen kann, funktioniert, darunter reines JavaScript, Vue und Svelte. Das Beispiel verwendet React mit Vite, weil sich damit eine größere Oberfläche übersichtlich organisieren lässt.

### Warum erhalte ich in meinem Browser LaylaBridgeUnavailableError?

Die Layla-Brücke existiert nur innerhalb von Laylas WebView. Installieren Sie in einem normalen Browser den Mock mit `installLaylaMock(...)` vor dem ersten SDK-Aufruf, und nur in der Entwicklung.

### Wie teste ich eine Mini-App ohne Smartphone?

Starten Sie den Vite-Entwicklungsserver und öffnen Sie ihn in einem Desktop-Browser. Der Layla-Mock beantwortet Chat-, Sprach-, Stimmen- und Datenbankaufrufe, sodass Sie die Oberfläche bauen können, bevor Sie sie in Layla installieren.

### Kann ein Coding-Agent die Mini-App für mich schreiben?

Ja. Das Layla-SDK-Repository veröffentlicht einen Agent-Skill für Tools wie Codex, Claude Code und OpenCode. Geben Sie dem Agenten den Skill, beschreiben Sie das gewünschte Verhalten und bitten Sie ihn, für die lokale Entwicklung den Layla-Mock zu verwenden. Siehe [Erste Schritte mit dem Layla SDK](/getting-started-with-the-layla-sdk/#use-the-layla-sdk-agent-skill).

### Was ist der Unterschied zwischen layla.db und saveChatMessage?

`layla.db` ist eine private SQLite-Datenbank, die Ihrer Mini-App gehört und für Ihre eigenen Daten gedacht ist. `layla.chat.saveChatMessage(...)` schreibt einen Eintrag in Laylas eigenen Chatverlauf, sodass er zusammen mit den anderen Unterhaltungen des Nutzers erscheint.

## Wie es weitergeht

Die fertige Chat-Mini-App ist ein kleines, vollständiges Beispiel für das Muster, dem jede Layla-Mini-App folgt: Ergebnisse des Modells auf dem Gerät streamen, die Oberfläche reaktionsfähig halten, während ein lokales Modell arbeitet, Zustand im privaten Speicher ablegen und eine einzige eigenständige HTML-Datei ausliefern. Da die Inferenz auf dem Smartphone stattfindet, funktionieren die mit dem Layla SDK gebauten Apps auch ohne Cloud-Dienst. Die vollständige Liste der Aufrufe, den Beispielordner und den Agent-Skill finden Sie im [Layla-SDK-Repository](https://github.com/l3utterfly/layla-sdk).
