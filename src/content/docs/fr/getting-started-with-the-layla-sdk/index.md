---
title: Bien démarrer avec le SDK Layla
description: Installez le SDK Layla, utilisez sa compétence d'agent et créez une mini-application HTML en streaming qui fonctionne avec un mock navigateur avant de se connecter à l'IA embarquée de Layla.
category: Layla SDK
order: 10
keywords:
  - SDK Layla
  - "@layla-network/sdk"
  - mini-application Layla
  - compétence d'agent du SDK Layla
  - SDK WebView
  - SDK d'IA locale
lastUpdated: 2026-08-30
translationKey: getting-started-with-the-layla-sdk
ai_translated: true
---

**Le SDK Layla est une bibliothèque TypeScript et JavaScript permettant de créer des mini-applications qui utilisent les fonctionnalités d'IA disponibles dans Layla.** Une mini-application peut diffuser une conversation depuis le modèle actif, manipuler des personnages et des mémoires, générer des images ou de la musique, utiliser la voix et stocker des données privées, sans configurer de clé d'API ni exécuter de serveur d'IA.

Ce guide explique où obtenir le SDK, comment fournir sa compétence d'agent à un agent de codage et comment créer une petite mini-application HTML qui diffuse une réponse depuis Layla.

## Parcourir les mini-applications existantes

Si vous souhaitez voir ce que d'autres ont créé avant de démarrer votre propre projet, parcourez [Layla Cloud Apps](https://apps.layla-cloud.com/). Examiner les mini-applications existantes est un bon moyen de comprendre quels types d'interfaces et de flux fonctionnent bien dans Layla, puis de choisir une idée simple pour votre première réalisation.

## Comment fonctionne le SDK Layla

Une mini-application Layla est une application web qui s'exécute dans la WebView React Native de Layla. Lorsque votre code appelle une méthode du SDK, celui-ci envoie un message via le pont de la WebView. L'hôte Layla effectue le travail sur l'appareil et renvoie le résultat.

```text
Mini-app -> Layla SDK -> WebView bridge -> Layla host -> on-device model
```

Le SDK n'est donc pas un client d'API cloud classique :

- Il n'y a ni clé d'API, ni URL de base, ni point de terminaison HTTP à configurer.
- L'hôte Layla choisit le modèle actif et le moteur d'inférence.
- Les véritables appels au SDK fonctionnent dans Layla, où le pont de l'hôte est disponible.
- Pendant le développement ordinaire en navigateur, vous installez à la place le mock d'hôte du SDK.

La génération par un modèle local peut prendre du temps sur un téléphone. Pour les fonctionnalités interactives, utilisez le streaming, affichez clairement un état de traitement et donnez à l'utilisateur un moyen d'arrêter la génération.

Si vous souhaitez plus de contexte avant d'écrire du code, lisez [Que sont les mini-applications Layla ?](/post-what-are-layla-mini-apps-codekitty/).

## Où obtenir le SDK

Le SDK est publié sous le nom [`@layla-network/sdk` sur npm](https://www.npmjs.com/package/@layla-network/sdk). Installez-le dans un projet JavaScript ou TypeScript existant avec :

```bash
npm install @layla-network/sdk
```

Le [dépôt du SDK Layla](https://github.com/l3utterfly/layla-sdk) contient les sources, la référence de l'API, les notes d'empaquetage et des exemples de mini-applications.

![Dépôt GitHub du SDK Layla affichant les dossiers de sources, de documentation, d'exemples et de compétence d'agent.](./github.png)

Il existe également un [projet de démarrage officiel React, TypeScript et Vite](https://github.com/l3utterfly/layla-miniapp-template) pour les applications nécessitant des composants, plusieurs fichiers sources et davantage d'état applicatif.

Pour une petite application, l'import important est :

```js
import { LaylaSDK } from "@layla-network/sdk";

const layla = new LaylaSDK();
```

Créez un seul client et réutilisez-le dans toute l'application.

## Utiliser la compétence d'agent du SDK Layla

Le projet du SDK publie également une compétence d'agent. Il s'agit d'un ensemble documentaire destiné aux agents de codage tels que Codex, Claude Code et OpenCode. Il leur enseigne les méthodes publiques du SDK, l'environnement d'exécution WebView, le mock local, les règles d'empaquetage et les erreurs courantes.

La compétence et le paquet npm ont des rôles différents : la compétence aide votre agent de codage à écrire l'application, tandis que `@layla-network/sdk` est la bibliothèque incluse dans l'application elle-même.

Pour utiliser la compétence :

1. Ouvrez les [versions de la compétence d'agent du SDK Layla](https://github.com/l3utterfly/layla-sdk/releases?q=agent+skill&expanded=true).
2. Téléchargez le ZIP de la compétence d'agent depuis la dernière version correspondante.
3. Importez ou installez ce ZIP en suivant le processus de compétences de votre agent de codage.
4. Ouvrez votre projet de mini-application dans l'agent de codage.
5. Nommez la compétence dans votre invite et décrivez le comportement de l'application.

Par exemple :

```text
Use the layla-sdk skill to build a self-contained Layla mini-app.
Create a simple writing prompt generator that streams its response,
shows a working state, has a Stop button, uses the Layla mock during
local development, and builds to an index.html with app.json at the
root of the output.
```

Soyez précis sur l'expérience utilisateur plutôt que de demander à l'agent de démontrer toutes les méthodes du SDK. Une première version ciblée est plus facile à tester sur un téléphone. Vous pourrez ajouter les personnages, les images, la voix, le stockage ou le chat contextuel lors d'itérations ultérieures.

## Créer une petite mini-application HTML

L'exemple ci-dessous crée une page avec un champ d'invite, un bouton **Ask Layla**, une réponse diffusée en continu et un bouton **Stop**. Vite gère l'import du SDK, tandis que `vite-plugin-singlefile` regroupe le JavaScript et le CSS de production dans un unique `index.html`.

Vous avez besoin de Node.js et de npm. Créez le projet et installez ses dépendances :

```bash
mkdir hello-layla
cd hello-layla
npm init -y
npm install @layla-network/sdk
npm install --save-dev vite vite-plugin-singlefile
npm pkg set scripts.dev="vite" scripts.build="vite build" scripts.preview="vite preview"
```

Créez cette structure :

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

### Ajouter les métadonnées de la mini-application

Créez `public/app.json` :

```json
{
  "title": "Hello Layla",
  "tagline": "Ask the on-device model for a short answer.",
  "description": "A small starter mini-app built with the Layla SDK."
}
```

Vite copie les fichiers de `public` à la racine de `dist` : le paquet généré contiendra donc `app.json` et `index.html` à sa racine.

### Créer la page

Créez `index.html` :

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

### Connecter la page à Layla

Créez `src/main.js` :

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

Le mock n'est installé que lorsque Vite s'exécute en mode développement. La version de production ne l'installe pas : les appels effectués dans Layla passent donc par le véritable pont de l'hôte.

### Regrouper l'application dans un seul fichier HTML

Créez `vite.config.js` :

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

Cette configuration intègre le JavaScript et le CSS du bundle directement dans la page. Les fichiers de `public`, dont `app.json`, sont toujours copiés à côté de l'`index.html` généré.

## Tester dans un navigateur

Démarrez le serveur de développement :

```bash
npm run dev
```

Ouvrez l'adresse locale affichée par Vite et sélectionnez **Ask Layla**. La réponse du mock doit apparaître progressivement. Cela valide la page, les gestionnaires d'événements et l'interface de streaming ; cela n'exécute pas un vrai modèle.

Si vous retirez le mock de développement et ouvrez la page dans un navigateur normal, le SDK signalera `LaylaBridgeUnavailableError`. C'est attendu, car le pont de la WebView Layla n'est pas présent.

## Compiler et importer la mini-application

Créez les fichiers de production :

```bash
npm run build
```

Le dossier `dist` doit contenir :

```text
dist/
  app.json
  index.html
```

Compressez le **contenu** de `dist`, et non le répertoire `dist` lui-même. `app.json` et `index.html` doivent se trouver à la racine du ZIP, sans dossier parent supplémentaire. Importez ce ZIP via le processus d'import de mini-applications de Layla, ouvrez **Hello Layla** et envoyez une invite.

La vraie réponse peut arriver plus lentement que le mock du navigateur, car Layla exécute le modèle sélectionné sur l'appareil. La page diffuse chaque mise à jour de contenu et garde le bouton Stop connecté à `stream.abort()` : elle reste donc réactive pendant la génération.

## Problèmes fréquents d'un premier projet

### Pourquoi le SDK indique-t-il que le pont est indisponible ?

L'application s'exécute dans un navigateur ordinaire sans `installLaylaMock(...)`, ou elle ne s'exécute pas dans la WebView de Layla. Installez le mock avant le premier appel au SDK pendant le développement local, et gardez-le derrière une condition réservée au développement.

### Pourquoi la mini-application importée n'a-t-elle pas de métadonnées ?

Vérifiez que `app.json` contient du JSON valide et se trouve à la racine du ZIP importé. Il doit être à côté d'`index.html`, et non dans `public`, `dist` ou un autre dossier englobant du ZIP.

### Dois-je choisir un modèle dans le SDK ?

Non. L'hôte Layla utilise le moteur d'inférence actif. De futurs articles pourront traiter du listage et du changement de moteurs d'inférence lorsqu'une mini-application doit proposer ce choix explicitement.

### Chaque mini-application doit-elle tenir dans un seul fichier HTML ?

Le projet source peut contenir autant de fichiers que nécessaire. Un `index.html` autonome est un format de distribution pratique pour les mini-applications hors ligne. Pour un projet plus vaste, partez du [modèle officiel de mini-application Layla](https://github.com/l3utterfly/layla-miniapp-template) et laissez l'étape de compilation produire la sortie en fichier unique.

## Pour aller plus loin

Ce projet de départ n'utilise que le chat en streaming, mais le même client expose les personnages, les événements de chat contextuel, les mémoires, les personas, la synthèse vocale, la reconnaissance vocale, l'audio en arrière-plan, la génération d'images et de musique, une base de données SQLite privée et des utilitaires de fichiers privés. La [référence de l'API du SDK et ses exemples](https://github.com/l3utterfly/layla-sdk) font foi pendant que le reste de cette catégorie développe chaque domaine en tutoriel dédié.
