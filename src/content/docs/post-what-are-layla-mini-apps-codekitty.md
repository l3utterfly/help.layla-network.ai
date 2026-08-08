---
title: What are Layla mini-apps? Building one on-device with CodeKitty
description: Learn how Layla mini-apps use the on-device model, characters, images, voice, and private storage through the host bridge.
category: Guides
order: 50
keywords:
  - Layla mini-apps
  - CodeKitty
  - Layla SDK
  - WebView apps
  - on-device AI
sourceUrl: https://blog.layla-network.ai/post/post-what-are-layla-mini-apps-codekitty
lastUpdated: 2026-07-18
---

**A Layla mini-app is a self-contained web app that runs inside Layla and can call the AI already on your phone — the local model, image generation, voice, your characters, and private file storage — through a bridge, with no API keys and no server.**

![Neon cyber cat logo with code symbols on a dark background.](/assets/articles/post-what-are-layla-mini-apps-codekitty/codekitty-logo.avif)

[CodeKitty](https://apps.layla-cloud.com/app/codekitty) is a mini-app that builds other mini-apps. It is a code editor, live preview, project library, image generator, and AI coding assistant packaged as a single HTML file. This article uses it to explain how the mini-app system works because it touches almost every part of that system.

## What is a Layla mini-app?

A mini-app is an ordinary web application — HTML, CSS, and JavaScript — that Layla runs in a WebView. What makes it more than a web page is the host bridge.

A normal web app that wants an LLM needs an API key, a server, and a network connection. It sends your data somewhere. A Layla mini-app does not. It runs inside Layla, and Layla provides the capabilities already installed on the device: local model inference, image generation, text-to-speech, your character roster, and a private per-app filesystem.

That inverts the usual arrangement. The AI is not a service the app calls out to; it is a facility the host provides. There is no key to paste in, endpoint to configure, or account to create because there is nothing to authenticate against. Inference runs on your hardware using whichever [GGUF model](/what-are-gguf-models-what-are-model-quants/) you have loaded.

A mini-app ships as a ZIP with `app.json` for metadata, `index.html` for the app, and any assets, all at the root.

## What CodeKitty is

CodeKitty is an IDE that runs on your phone and produces installable Layla mini-apps.

It treats a project as a virtual filesystem: a JavaScript object whose keys are filenames. A new project starts with four entries: `index.html`, `app.json`, `icon.jpg`, and `bg.jpg`. Because those files live in memory rather than on disk, the editor can switch between them, send them to the model, run them in a preview, or package them into a ZIP without a conventional filesystem underneath.

The interface is React, with Prism for highlighting, Babel compiling JSX in the browser, JSZip for packaging, and Marked for rendering the assistant's replies. All of it is contained in one `index.html`.

## The host is the API

The first thing to understand as a creator is that the SDK is not a cloud client.

```js
const layla = new LaylaSDK();
```

That is the entire setup. There is no key and no base URL. `LaylaSDK` serialises calls to:

```js
window.ReactNativeWebView.postMessage(...);
```

Layla performs the work natively and returns events to the WebView. From there, a mini-app can access characters, streaming chat completions, image generation, speech, private files, and native sharing.

The practical consequence is that mini-apps can stay small. A feature that would normally require a backend, authentication, a media service, and a storage layer becomes a method call because the host already has all four.

## Your own characters become the assistant

CodeKitty fetches each character portrait, displays the characters as a searchable gallery, and lets you choose one as your coding buddy. Character Card data supplies the name and personality, which CodeKitty writes into the system prompt. The assistant can explain a bug or patch a file while keeping the character's voice.

Your character library is a personalisation layer that any mini-app can read. A fitness app could turn characters into coaches, a study tool could use them as tutors for different subjects, and a story game could use them as its cast. The roster is already there, and one SDK call retrieves it.

## The model proposes, the app applies

When you ask for a change, CodeKitty does not simply hand your sentence to the model. It assembles a context package containing the coding buddy's personality, the active filename and its full contents, the expected output format, project notes, recent chat, errors captured from the live preview, and the SDK documentation. It then constrains the response format.

For a source file, the model must return a full replacement or a JSON patch:

![Code editor showing a JSON patch with search and replace entries.](/assets/articles/post-what-are-layla-mini-apps-codekitty/json-patch.avif)

For `app.json`, the model returns the complete document. For an image asset, it proposes a visual prompt instead of code.

The separation is the point. The model suggests; CodeKitty decides whether and how to apply the suggestion. The model never gets write access to storage or the native host, and every applied change becomes an undo snapshot. When you give a language model influence over state, make it produce a proposal your code can validate, not an action your code executes.

Generation is streamed because local inference on a phone takes time:

![Code editor showing JavaScript stream handlers for Layla chat content, reasoning events, and finalContent().](/assets/articles/post-what-are-layla-mini-apps-codekitty/streaming-events.avif)

Reasoning arrives on its own channel and gets a collapsible panel. The stream handle is retained so a Stop button can abort it. If your mini-app depends on on-device generation, treat progress as part of the product: stream text, show image-generation steps, and always allow cancellation.

## The preview borrows the bridge

Live preview is the most interesting thing CodeKitty does technically.

Your `index.html` runs in a sandboxed iframe. Before launching it, CodeKitty injects two things. First, it adds wrapped console methods and an error handler so uncaught exceptions appear in a console panel and are included in the model's context for your next question. That creates a tight loop: run, see the error, ask the coding buddy, apply the patch, and run again.

Second, it adds a proxy `window.ReactNativeWebView`. When the app inside the iframe makes an SDK call, the proxy relays the bridge message to CodeKitty, which forwards it to the real Layla host and passes the native response back down.

The preview app borrows CodeKitty's connection to Layla. File operations get a project-scoped filename prefix, so a test app cannot overwrite CodeKitty's own library by calling `saveFile`. A mini-app can host another web experience while mediating exactly which native capabilities that experience receives.

## Icons, backgrounds, and export

Layla packages need an icon and a background, so CodeKitty makes image files first-class project tabs. Write a prompt or ask the coding buddy for one, then generate it on-device:

```js
const imageSrc = await layla.images.generateImage();
```

Results are centre-cropped through a canvas: 256×256 for icons and 854×480 for backgrounds. They are stored as data URIs until export.

Export produces a ZIP with `app.json`, `index.html`, and assets at the root. There are two builds:

- The **development build** keeps everything readable and editable.
- The **smashed build** compiles the JSX, inlines React, embeds fonts as data URIs, rewrites the SDK bundle for offline use, and emits one self-contained `index.html` that needs no network. It also includes a hidden source copy so the package can be imported back into CodeKitty later.

Export is a checkpoint, not an ending.

## What to take from this if you are building one

You do not need to build an IDE to use the good ideas in CodeKitty.

Start with one host capability and make it solve a real step rather than merely demonstrating a feature. CodeKitty generates images because packages need icons. Design for local generation: stream, show progress, and allow stopping. Keep the model behind a contract your code validates.

Keep heavy data off the bridge. CodeKitty splits its library into a small index and one payload file per project because large base64 blobs crossing a WebView boundary will make a phone feel slow. Build feedback loops as well: the preview console becoming model context is why the debugging loop works.

Then test inside Layla. Browser behaviour is not authoritative without the SDK's mock installed.

## Frequently asked questions

### What is a Layla mini-app?

A self-contained web app that runs inside Layla and can use the AI on your device — the local model, image generation, voice, characters, and private storage — through the Layla SDK bridge. It ships as a ZIP containing `app.json`, `index.html`, and assets.

### Do I need to know how to code to build one?

Less than you might think. CodeKitty's assistant writes and patches the code, and you steer it in plain language. Knowing HTML and JavaScript makes you faster and lets you fix things the model gets wrong, but the describe, preview, and correct loop is workable without it.

### Does CodeKitty work offline?

The AI does. The coding assistant is your local model, and nothing you write leaves the phone. CodeKitty's interface libraries currently load from a CDN on first boot, so it needs a connection to start. Apps exported with the smashed build are fully self-contained and run without a network connection.

### Where does my code go? Is any of it uploaded?

Nowhere. Projects are stored in Layla's private per-app file storage on your device. Model inference is on-device. There is no account, sync, or server holding your projects.

### Can I share the mini-apps I make?

Yes. Export produces a ZIP that anyone with Layla can import. You can upload it to Layla Cloud through the Mini-app Manager in Layla if you want.

### What can a mini-app access?

Characters and their portraits, streaming chat completions against the local model, inference engine selection, image generation, installed TTS voices, and a private filesystem scoped to that app. It cannot reach other apps' files.

### Is there an SDK reference?

Yes. See the [`@layla-network/sdk` repository](https://github.com/l3utterfly/layla-sdk).

## Building the next one

CodeKitty is an IDE with a cat-themed coding buddy, which undersells the more interesting fact about it: a mini-app can be a complete local workflow. It can coordinate characters, models, images, voice, files, previews, and sharing while remaining a portable web page.

CodeKitty uses that system to make software. The same machinery could make a language tutor that speaks exercises in an installed voice, a journal that stays on the device and surfaces old entries when relevant, a story studio that casts your own character roster, or a campaign tool that messages you between sessions.

The way in is not to learn the entire SDK. Find one moment that would be better if it happened inside Layla, and build the smallest thing that makes that moment real.
