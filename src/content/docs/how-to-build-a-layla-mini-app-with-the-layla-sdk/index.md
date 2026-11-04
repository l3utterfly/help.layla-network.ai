---
title: How to build a Layla mini-app with the Layla SDK
description: Build a Layla mini-app step by step with the Layla SDK. Streaming chat, image input, voice, saved history and packaging, based on the official chat example.
category: Layla SDK
order: 30
keywords:
  - build a Layla mini-app
  - Layla SDK tutorial
  - "@layla-network/sdk"
  - Layla chat API
  - streaming chat API
  - on-device AI app
  - offline AI chatbot
  - local LLM app
  - OpenAI-compatible chat API
  - text to speech
  - speech to text
  - React Vite mini-app
  - Layla SDK agent skill
lastUpdated: 2026-11-04
---

**A Layla mini-app is a web app that runs inside Layla and uses the Layla SDK to talk to the AI features on the device, including chat, speech, images, memories and private storage.** There is no API key and no server to run. You write a normal web app in JavaScript or TypeScript, call `@layla-network/sdk`, and Layla performs the work with whichever model and inference engine the user has selected.

This tutorial builds a complete chat mini-app step by step, using the official [chat example](https://github.com/l3utterfly/layla-sdk/tree/main/examples/chat) from the Layla SDK repository as the reference. By the end you will know how to stream a reply from the on-device model, stop a generation, send an image, speak and listen, keep a transcript in the mini-app's private database, develop in a browser with the SDK mock, and package the result for Layla.

> **Using a coding agent?** The Layla SDK publishes an agent skill that teaches coding agents such as Codex, Claude Code and OpenCode how to write mini-apps with the SDK. You can give the skill to your agent, describe the app you want, and let it do most of the work in this article for you. See [Use the Layla SDK agent skill](/getting-started-with-the-layla-sdk/#use-the-layla-sdk-agent-skill) for the download and setup steps. This article is also written to be a reference an agent can read alongside the skill, so the [quick reference](#quick-reference-for-developers-and-coding-agents) near the end lists every call the example uses.

## What you will build

The chat example is a single-screen React and Vite app with these features:

| Feature                                       | SDK calls used                                                                             |
| --------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Streaming replies with a typing cursor        | `layla.chat.completions.stream(...)`, `stream.on("content", ...)`, `stream.finalContent()` |
| Stop button for a running generation          | `stream.abort()`, `LaylaAbortError`                                                        |
| Attach an image to a message                  | `image_url` content parts in the OpenAI message format                                     |
| Transcript that survives restarts             | `layla.db.executeSql(...)`                                                                 |
| Messages copied into Layla's own chat history | `layla.chat.saveChatMessage(...)`                                                          |
| Play any reply aloud with a chosen voice      | `layla.tts.getVoices()`, `layla.tts.generateVoice(...)`, `layla.tts.stopSpeaking()`        |
| Dictate a message, or talk hands-free         | `layla.stt.startListening()`, `layla.stt.on("speechRecognized", ...)`                      |
| Run and debug in a normal browser             | `installLaylaMock(...)`                                                                    |

Almost all of the logic lives in two files: [`src/App.tsx`](https://github.com/l3utterfly/layla-sdk/blob/main/examples/chat/src/App.tsx) for the app and [`src/main.tsx`](https://github.com/l3utterfly/layla-sdk/blob/main/examples/chat/src/main.tsx) for the development mock.

## Before you start

You need:

- Node.js and npm installed on your computer.
- Basic familiarity with JavaScript or TypeScript. The example uses React, but the SDK does not require React. Any web stack works.
- A recent version of Layla on your Android phone for testing on the device. Some features need a minimum version, listed in [Version requirements](#version-requirements).

You do not need a phone to start. In development, the SDK's mock host stands in for Layla so you can build and test the interface in a desktop browser.

## How a Layla mini-app works

A mini-app is a web page that Layla loads in its own WebView. The SDK wraps the messaging layer between that page and the Layla app so you can call ordinary methods:

```text
Your mini-app -> Layla SDK -> WebView bridge -> Layla app -> on-device model
```

A few consequences shape the rest of this tutorial:

- **There is nothing to configure.** No API key, base URL or endpoint. The SDK only works where the Layla bridge exists, which is inside Layla. Anywhere else, SDK calls reject with `LaylaBridgeUnavailableError`.
- **The user chooses the model.** Your code asks for a chat completion and Layla uses the active inference engine. See [How saved inference engines work in Layla](/how-saved-inference-engines-work-in-layla/) for how users switch between them.
- **Responses can be slow.** A model running on a phone is slower than a cloud API, so stream the reply, show a working state and let the user stop.
- **Each mini-app has private storage.** A private sqlite database and a private file area belong to your mini-app and are not shared with other mini-apps.

If you want background before writing code, read [What are Layla mini-apps?](/post-what-are-layla-mini-apps-codekitty/) and [Getting started with the Layla SDK](/getting-started-with-the-layla-sdk/), which builds a smaller plain-HTML app.

## Step 1: Get the project

There are two ways to start.

### Option A: run the official example

Clone the SDK repository and run the example directly:

```bash
git clone https://github.com/l3utterfly/layla-sdk.git
cd layla-sdk/examples/chat
npm install
npm run dev
```

Vite prints a local address. Open it in a browser and you can chat against the mock host straight away.

The example lives in the `examples/chat` folder of the repository, next to the other example mini-apps:

![The examples/chat folder in the layla-sdk GitHub repository, showing the public and src folders, package.json, vite.config.ts and the example's README.](./chat.png)

### Option B: start your own project

Create a new React and TypeScript project with Vite and add the SDK:

```bash
npm create vite@latest my-chat -- --template react-ts
cd my-chat
npm install
npm install @layla-network/sdk
npm install --save-dev vite-plugin-singlefile
```

If you are following along with the example's source code, change one thing. Inside the SDK repository the example imports the SDK from its source folder:

```ts
import { LaylaSDK } from "../../../src/index";
```

In your own project, import from the published package instead:

```ts
import { LaylaSDK } from "@layla-network/sdk";
```

For a larger app with multiple pages and state, the official [Layla mini-app template](https://github.com/l3utterfly/layla-miniapp-template) provides a ready-made React, TypeScript and Vite starting point.

### The example's file layout

```text
examples/chat/
  index.html        Vite entry page containing the #root element
  package.json      React 19, Vite, TypeScript
  vite.config.ts    React plugin plus vite-plugin-singlefile
  public/           Static files copied to the root of the build output
  src/
    main.tsx        Installs the Layla mock in development and mounts <App />
    App.tsx         All chat logic and UI (about 760 lines)
    App.css         Styles for the chat screen
    index.css       Global styles
```

The build step, covered in [Step 13](#step-13-package-the-mini-app), turns this into one self-contained `index.html`, which is what Layla loads.

## Step 2: Create the Layla client

At the top of `App.tsx`, create one client and reuse it everywhere:

```ts
import { LaylaSDK, LaylaAbortError } from "@layla-network/sdk";

const layla = new LaylaSDK();
```

`LaylaSDK` and `Layla` are the same class. Every feature is a property of this client: `layla.chat`, `layla.tts`, `layla.stt`, `layla.db`, `layla.characters`, `layla.images` and so on. Creating the client at module level, outside any component, means it is shared and never recreated on re-render.

## Step 3: Develop in a browser with the Layla mock

Outside Layla there is no bridge, so every SDK call would fail. The SDK includes a mock host that fakes the bridge for development. In the example, `main.tsx` installs it only when Vite is running its development server:

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

The options used here:

- `respond` receives the conversation and returns the text the fake model should answer with. The mock streams it back piece by piece, so your streaming UI behaves as it would on the device. Each message in `messages` is in Layla's native shape, which is why the example checks `message.image_base64` to detect an attached image.
- `latencyMs` adds a delay before the reply starts, to imitate model start-up.
- `tokenDelayMs` is the delay between streamed pieces.

Because `import.meta.env.DEV` is `false` in a production build, the mock is not installed in the file you ship, and calls made inside Layla go to the real bridge.

Install the mock before the first SDK call. The example uses a dynamic `import()` for the mock so that the mock code is not part of the production bundle. If you see `LaylaBridgeUnavailableError` the first time the page loads in a browser, install the mock before rendering your app:

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

### Mock the database too

The mock has no real sqlite. By default every `layla.db.executeSql(...)` call returns an empty result. The example passes an `executeSql` handler that backs the four statements it uses (`CREATE`, `INSERT`, `SELECT`, `DELETE`) with `localStorage`, which is enough for the transcript to reload after a browser refresh. Inside Layla, those same calls run against a real on-device database, and the handler is not used.

The mock also answers speech-to-text. After `startListening()` succeeds it emits a canned transcript, which you can change with the `sttTranscript` option or disable by passing `null`.

## Step 4: Model the conversation

The example keeps its own simple message type for the screen:

```ts
interface ChatMessage {
  role: "user" | "assistant";
  content: string | null;
  imageBase64?: string;
  imageName?: string;
}
```

The SDK's chat API follows the OpenAI Chat Completions format, with `system`, `user` and `assistant` roles and a `content` field. A small function converts your screen state into that format. This is where an attached image becomes an `image_url` content part:

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

Keeping a separate screen type is a design choice, not a requirement. It lets you store extra fields such as the image's file name without sending them to the model.

As with other OpenAI-shaped APIs, every request carries the whole conversation in `messages`, so your app is responsible for remembering and resending earlier turns. To give the model a personality or instructions, add a `system` message at the start of the array.

## Step 5: Stream a reply

This is the heart of the app. When the user presses **Send**, the example builds the new message list, puts an empty assistant message on screen, and starts a stream:

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

Points worth understanding:

- **`stream(...)` returns immediately.** It gives you the live stream object synchronously, not a promise, so you can attach listeners before the first token arrives.
- **Use the snapshot.** The `content` event passes two values: the new `delta` and the full `snapshot` of the reply so far. Setting your state to the snapshot is simpler and safer than appending deltas, because a missed or repeated event cannot corrupt the text.
- **`finalContent()` waits for the end.** It resolves with the complete visible reply, or rejects if the stream failed or was aborted.
- **Reasoning is separated for you.** If the model wraps its thinking in `<think>` tags, the SDK strips them from `content` and delivers them through the `reasoning` event instead, so tags never appear in your chat bubble.

The stream emits these events:

| Event       | Arguments           | Meaning                                               |
| ----------- | ------------------- | ----------------------------------------------------- |
| `content`   | `delta`, `snapshot` | New visible text, and the whole visible reply so far  |
| `reasoning` | `delta`, `snapshot` | New reasoning text from a thinking model              |
| `toolCall`  | `toolCall`          | The model asked to call a tool (needs a recent Layla) |
| `chunk`     | `chunk`             | Every raw OpenAI-style chunk                          |
| `end`       | none                | The reply finished                                    |
| `error`     | `error`             | The request failed or was aborted                     |

### Other ways to read a response

If you only need the final answer, skip streaming:

```ts
const completion = await layla.chat.completions.create({ messages });
const text = completion.choices[0]?.message.content ?? "";
```

The stream is also an async iterable, in the same style as the OpenAI SDK. Breaking out of the loop aborts the request:

```ts
for await (const chunk of stream) {
  const piece = chunk.choices[0]?.delta.content ?? "";
}
```

For anything a person watches, prefer streaming. A local model may take several seconds to reach the first word, and a visible reply that grows is far better than a frozen screen.

### Show that the app is working

The example drives three small pieces of interface from one `busy` flag: a "Generating..." label in the header, a blinking cursor on the last assistant bubble, and a **Stop** button that replaces **Send**. It also keeps a `busyRef` copy of the flag. Long-lived callbacks, such as the speech listener in Step 11, would otherwise read a stale value of `busy` from an old render. Reading a ref avoids that.

## Step 6: Let the user stop a generation

Keep a reference to the active stream so a button can cancel it:

```ts
const streamRef = useRef<ChatCompletionStream | null>(null);

// when starting:
streamRef.current = stream;

// the Stop button:
const stopGeneration = () => streamRef.current?.abort();
```

Aborting makes `finalContent()` reject with a `LaylaAbortError`, and the example handles that case separately from real errors:

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

`abort()` also emits an `error` event carrying a `LaylaAbortError`. The example's `error` listener shows the message text on screen, so filter aborts out in your own listener or the Stop button will replace the partial reply with an error line:

```ts
stream.on("error", (err) => {
  if (err instanceof LaylaAbortError) return;
  setMessages([
    ...nextMessages,
    { role: "assistant", content: `Error: ${err.message}` },
  ]);
});
```

You can also cancel with the standard web mechanism by passing `signal` to the request:

```ts
const controller = new AbortController();
const stream = layla.chat.completions.stream({
  messages,
  signal: controller.signal,
});
controller.abort();
```

## Step 7: Send an image

Image input uses the OpenAI content-part format shown in Step 4. The example needs to turn a file the user picks into a base64 data URL:

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

The example limits the picker to four common formats and checks the type before reading:

```ts
const supportedImageTypes = new Set([
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);
```

The picker itself is a hidden `<input type="file" accept="image/png,image/jpeg,image/gif,image/webp">` opened by an attach button. After selection, the app shows a preview with a remove button, and attaches the data URL to the next message.

Two requirements to keep in mind:

- **Use a base64 data URL.** Older Layla versions ignore remote `https://` image URLs and any images after the first in a message, so a data URL is the portable choice.
- **The model must be able to see.** An image sent to a text-only model cannot be understood. To use image input in Layla, a vision-capable model has to be active. See [How to add vision LLMs in Layla](/how-to-add-vision-llms-in-layla-qwen3-vl/).

## Step 8: Save the transcript in the private database

A mini-app reloads from scratch each time it opens, so anything the user should keep has to be stored. `layla.db` gives each mini-app its own private sqlite database. The example uses it for the on-screen transcript.

Create the table on launch. `IF NOT EXISTS` makes it safe to run every time:

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

Append each message with bound parameters. Pass values through the second argument and use `?` placeholders. Never build SQL by joining user text into the query string:

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

Read the transcript back in order. The result has a `rows` array of objects keyed by column name:

```ts
const result = await layla.db.executeSql(
  `SELECT role, content, image_base64, image_name
     FROM ${messagesTable}
    ORDER BY id ASC`,
);
const history = result.rows;
```

Every result also contains `rowsAffected` (how many rows a write changed) and `insertId` (the id of the last inserted row, `0` when not applicable). The **Clear** button simply runs `DELETE FROM chat_messages`.

Run the setup once when the component mounts, then fill the screen with the saved messages:

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

The example stores image data as base64 text in the table, which is simple and fine for a demonstration. An app that keeps many or large images should write them with `layla.utils.saveFile(...)` and store only the file name in the database.

## Step 9: Copy messages into Layla's chat history

`layla.db` is your app's private store. Separately, you can write messages into Layla's native chat history with `layla.chat.saveChatMessage(...)`, so they appear among the user's normal conversations. The example does both for every message:

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

The fields:

| Field             | Meaning                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------- |
| `id`              | `0` or lower creates a new entry. A positive id overwrites an existing entry.             |
| `session_id`      | The chat session the entry belongs to. The example makes a new one each time it launches. |
| `character_id`    | `"user"` for the user's own messages, otherwise the character's id.                       |
| `display_message` | The text shown in the chat history.                                                       |
| `message`         | The text given to the model in later turns. It can differ from `display_message`.         |
| `timestamp`       | Unix time in milliseconds. A value of `0` or lower uses the current time.                 |

The call resolves with the stored entry, including its assigned `id`.

Some details to keep in mind:

- Only entries from a character create a missing session. A user entry saved to a session that does not exist yet does not create it.
- New entries have no image. The example therefore keeps image attachments in its own database only.
- The example uses the literal id `"layla"` for assistant replies. If your mini-app chats as a specific character, get that character's real id from `layla.characters.list()` and use it instead.
- The call needs a Layla version that supports separate `display_message` and `message` text. Wrapping it in `try/catch`, as the example does, keeps the app working if saving fails.

The two stores answer different questions:

| Store                        | Lives in             | Use it for                                           |
| ---------------------------- | -------------------- | ---------------------------------------------------- |
| `layla.db`                   | Your mini-app only   | Your own state and your own transcript view          |
| `layla.chat.saveChatMessage` | Layla's chat history | Letting the conversation show up inside Layla itself |

## Step 10: Add text-to-speech

Text-to-speech uses the voices the user has installed in Layla. Load them once and let the user pick:

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

Each voice has an `id`, `name`, `type` and `tags`. Pass an id to `generateVoice(...)` to speak with that voice, or `null` to use Layla's default voice. The promise resolves when playback finishes, so you can use `await` to know when speech is done:

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

Each finished assistant bubble gets a **Play** button that calls `speak(message.content)`. For background on voices in the app, see [How to hear your characters speak in Layla](/how-to-hear-your-characters-speak-in-layla/).

If you want the audio without playing it, `layla.tts.generateVoiceToFile(voiceId, text)` returns an audio data URI you can use in an `<audio>` element, or saves a file in the mini-app's private storage.

## Step 11: Add speech-to-text and a hands-free mode

Speech input has three parts: a request to start, an event that delivers each transcript, and a request to stop.

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

Note that `startListening()` does not return the transcript. Its promise resolves once the recogniser has started. The text arrives later through the `speechRecognized` event, so subscribe before or right after starting.

The example uses this in two ways:

- **Push to talk.** The microphone button starts listening, and the recognised text is placed in the message box where the user can edit it before sending.
- **Voice mode.** A toggle in the header turns on a loop. The app listens, sends whatever it hears, speaks the reply with `layla.tts.generateVoice(...)`, then starts listening again. The loop is just the pieces above joined together:

```ts
// at the end of sendMessage, after the reply has finished streaming
if (voiceModeRef.current && assistantContent) {
  await speak(assistantContent);
  if (voiceModeRef.current) void startListening();
}
```

Two implementation details make this reliable. The speech listener is registered once and reads current values through refs (`voiceModeRef`, `busyRef`, `sendMessageRef`) rather than closing over state, so it does not need to be re-subscribed on every render. And the app stops any playback before it starts listening.

In the browser, the mock emits a sample transcript shortly after `startListening()`, so you can test the whole voice flow without a microphone.

## Step 12: Handle errors

All errors from the SDK extend `LaylaError`. Three cases deserve their own handling:

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

The example logs most errors to the console and shows speech and image problems in a small inline alert (`attachmentError` and `voiceError`). For a published mini-app, show the message in the interface where the user will see it.

## Step 13: Package the mini-app

Layla loads one HTML file. The example's `vite.config.ts` uses `vite-plugin-singlefile` to bundle all scripts and styles into `index.html`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [react(), viteSingleFile()],
});
```

Build it:

```bash
npm run build
```

The `build` script runs `tsc -b && vite build`, so TypeScript errors stop the build before anything is produced.

### Add app.json

Layla reads a mini-app's name and description from an `app.json` file. The example folder does not include one, so add it to `public/`. Vite copies everything in `public/` to the root of the build output:

```json
{
  "title": "Layla Chat",
  "tagline": "Chat with Layla by text, image or voice.",
  "description": "A simple chat mini-app that streams replies from the on-device model.",
  "iconUri": "icon.png"
}
```

`iconUri` points to an image file in the same folder, so put a square `icon.png` in `public/` as well. Square icons fit Layla's grids and lists best. `backgroundImgUri` is an optional extra for a background or preview image.

### Zip the contents

After the build, `dist` should look like this:

```text
dist/
  app.json
  index.html
  icon.png
```

Create a ZIP of the **contents** of `dist`, not of the `dist` folder itself. `app.json` and `index.html` must sit at the root of the ZIP with no parent folder around them. If you host the app yourself instead, use an `index.url` file containing the address on a single line in place of `index.html`.

The SDK repository also publishes its example mini-apps as a ready-to-import ZIP with every release, which is a quick way to try the chat example on your phone before building your own.

## Step 14: Test inside Layla

Import the ZIP through Layla's mini-app import flow, open the app and check:

1. A message streams in progressively, and **Stop** ends it without losing the partial text.
2. The reply is slower than in the browser. That is expected, because a real model is running on the device.
3. Closing and reopening the mini-app restores the transcript from the database.
4. Image input works with a vision-capable model active, and says so clearly if it does not.
5. **Play** speaks the reply, and the microphone button fills the message box.
6. The mini-app appears with the title and icon from `app.json`.

If an SDK call fails with `LaylaBridgeUnavailableError`, the page is running outside Layla. If the title or icon is missing, check that `app.json` is valid JSON and is at the root of the ZIP.

## Ideas for extending the app

Once the basic chat works, the same client offers more:

- **Characters.** `layla.characters.list()` and `layla.characters.getImage(id)` let the user pick who they talk to. Use the character's description in a `system` message.
- **Contextual mini-apps.** `layla.contextual.getExecutionContext()` reports the current character and chat session, and `layla.contextual.on(...)` delivers events as the surrounding chat changes.
- **Memories and personas.** `layla.memories` and `layla.personas` give access to what Layla knows about the user and character.
- **Images and music.** `layla.images.generateImage(...)` and `layla.acestep.generateMusic(...)` generate media with on-device models.
- **Tool calling.** Pass OpenAI-style `tools` to a chat request and run the loop yourself. This needs a recent Layla and SDK, listed below.
- **Background work.** A `task.js` file runs periodically without opening the WebView. See [Running background tasks in your mini-app](/running-background-tasks-in-your-mini-app/).

## Quick reference for developers and coding agents

This section is a condensed map of the example. It lists every SDK call the chat mini-app makes, with the contract that matters when writing similar code.

### SDK calls used by the chat example

| Call                                                                                                | Returns                            | Notes                                                                        |
| --------------------------------------------------------------------------------------------------- | ---------------------------------- | ---------------------------------------------------------------------------- |
| `new LaylaSDK()`                                                                                    | client                             | Create one and reuse it. `Layla` is an alias.                                |
| `layla.chat.completions.stream({ messages, signal? })`                                              | `ChatCompletionStream` (sync)      | Attach listeners immediately. `abort()` cancels.                             |
| `layla.chat.completions.create({ messages })`                                                       | `Promise<ChatCompletion>`          | Non-streaming. Pass `stream: true` to get a stream instead.                  |
| `stream.on("content", (delta, snapshot) => ...)`                                                    | stream                             | `snapshot` is the full visible text so far.                                  |
| `stream.finalContent()`                                                                             | `Promise<string>`                  | Rejects on failure or abort. Returns visible text only.                      |
| `stream.abort()`                                                                                    | void                               | Rejects `finalContent()` with `LaylaAbortError` and emits `error`.           |
| `layla.chat.saveChatMessage({ id, session_id, character_id, display_message, message, timestamp })` | saved entry with `id`              | `id <= 0` creates. Only character entries create new sessions.               |
| `layla.db.executeSql(query, params?)`                                                               | `{ rows, rowsAffected, insertId }` | Private per-mini-app sqlite. Use `?` placeholders.                           |
| `layla.tts.getVoices()`                                                                             | `LaylaTTSVoice[]`                  | Each has `id`, `name`, `type`, `tags`.                                       |
| `layla.tts.generateVoice(voiceId \| null, text)`                                                    | `Promise<void>`                    | Plays audio. Resolves when playback finishes. `null` uses the default voice. |
| `layla.tts.stopSpeaking()`                                                                          | `Promise<void>`                    | Stops playback.                                                              |
| `layla.stt.startListening()`                                                                        | `Promise<void>`                    | Resolves when listening starts. The transcript comes from the event.         |
| `layla.stt.on("speechRecognized", ({ transcript }) => ...)`                                         | client                             | Remove with `layla.stt.off(...)`.                                            |
| `layla.stt.stopListening()`                                                                         | `Promise<void>`                    | Releases the microphone. Does not remove the event subscription.             |
| `installLaylaMock(options)`                                                                         | mock handle                        | Development only. Install before the first SDK call.                         |

For exact types and fields, read the SDK's generated TypeScript declarations and its [API reference](https://github.com/l3utterfly/layla-sdk) rather than guessing an object shape.

### Where things are in the example

| File and function                                                                  | What it shows                                                           |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `src/main.tsx`                                                                     | Development-only mock, including a custom `executeSql` handler          |
| `App.tsx`: `toCompletionMessage`                                                   | Converting screen messages into OpenAI-format messages with image parts |
| `App.tsx`: `sendMessage`                                                           | The streaming loop, abort handling, persistence and the voice-mode loop |
| `App.tsx`: `createMessagesTable`, `loadMessages`, `insertMessage`, `clearMessages` | The sqlite helpers using bound parameters                               |
| `App.tsx`: `saveChatMessage`                                                       | Writing to Layla's native chat history                                  |
| `App.tsx`: `speak`, `startListening`, `stopListening`                              | Text-to-speech and speech-to-text control                               |
| `App.tsx`: `readImageAsDataUrl`, `selectImage`                                     | Reading an image file into a base64 data URL                            |
| `vite.config.ts`                                                                   | Bundling the app into a single `index.html`                             |

### Rules that prevent common mistakes

- Import from the package root, `@layla-network/sdk`. Do not import from private paths inside the package.
- Do not call the SDK like an HTTP client. There is no API key or base URL.
- Create one client. Install the mock only in development, before the first SDK call.
- Prefer `stream(...)` for anything shown to a person, and always give the user a way to stop.
- Treat `snapshot` as the source of truth for the reply text.
- Filter `LaylaAbortError` in `error` listeners.
- Pass database values as `?` parameters, not by joining strings.
- Read mutable values through refs inside listeners that live for the whole app.
- Image URLs in `image_url` parts must be base64 data URLs.
- A built mini-app needs `app.json` and `index.html` (or `index.url`) at the root of the ZIP.

### Version requirements

The SDK talks to whichever Layla version it runs in and uses the best route that version supports. This article was written against `@layla-network/sdk` 7.6.

| Capability                                                         | Requires                                                           |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| Chat, streaming, one image per message, TTS, STT, database, files  | Any supported Layla version                                        |
| Tool calling, multi-part content and several images in one message | Layla 7.5.0-alpha or newer and `@layla-network/sdk` 7.5.0 or newer |
| Separate `display_message` and `message` text in `saveChatMessage` | A Layla build that supports the updated save contract              |

On an older Layla, fields the host cannot carry are dropped with a console warning rather than raising an error. A mini-app that depends on tool calling can check the version first with `layla.contextual.getExecutionContext()`, which includes `app_version`.

## Frequently asked questions

### How do I build a Layla mini-app?

Create a web app, install `@layla-network/sdk`, call the SDK from your code, build it into a single `index.html`, add an `app.json`, and import the ZIP into Layla. This article walks through each step using a chat app.

### Do I need an API key to use the Layla SDK?

No. The SDK does not use an API key, base URL or network endpoint. It sends requests to the Layla app through the WebView bridge, and Layla uses the model and inference engine the user has chosen.

### Is the Layla chat API compatible with the OpenAI API?

The request and response shapes follow OpenAI's Chat Completions format, including roles, `messages`, streaming, image content parts and tools. It is a client library that talks to the Layla app, not a drop-in replacement for an OpenAI HTTP endpoint.

### Does a Layla mini-app work offline?

The mini-app itself is a local HTML file, and chat runs through whichever model the user has selected in Layla. With a local model, no data leaves the device. If the user switches Layla to a cloud inference engine, that engine's connection rules apply.

### Can I use a framework other than React?

Yes. Any web stack that can produce a self-contained HTML page works, including plain JavaScript, Vue and Svelte. The example uses React with Vite because it keeps a larger interface organised.

### Why do I get LaylaBridgeUnavailableError in my browser?

The Layla bridge only exists inside Layla's WebView. In a normal browser, install the mock with `installLaylaMock(...)` before the first SDK call, and only in development.

### How do I test a mini-app without a phone?

Run the Vite development server and open it in a desktop browser. The Layla mock answers chat, speech, voices and database calls so you can build the interface before installing it in Layla.

### Can a coding agent write the mini-app for me?

Yes. The Layla SDK repository publishes an agent skill for tools such as Codex, Claude Code and OpenCode. Give the skill to your agent, describe the behaviour you want, and ask it to use the Layla mock for local development. See [Getting started with the Layla SDK](/getting-started-with-the-layla-sdk/#use-the-layla-sdk-agent-skill).

### What is the difference between layla.db and saveChatMessage?

`layla.db` is a private sqlite database that belongs to your mini-app and is used for your own data. `layla.chat.saveChatMessage(...)` writes an entry into Layla's own chat history so it appears with the user's other conversations.

## Where to go next

The finished chat mini-app is a small, complete example of the pattern every Layla mini-app follows: stream results from the on-device model, keep the interface responsive while a local model works, store state in private storage, and ship one self-contained HTML file. Because inference happens on the phone, the apps you build with the Layla SDK keep working without a cloud service. For the full list of calls, the example folder and the agent skill, see the [Layla SDK repository](https://github.com/l3utterfly/layla-sdk).
