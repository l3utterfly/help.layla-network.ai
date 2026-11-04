---
title: Comment créer une mini-application Layla avec le SDK Layla
description: Créez pas à pas une mini-application Layla avec le SDK Layla. Chat en streaming, image en entrée, voix, historique enregistré et empaquetage, d'après l'exemple de chat officiel.
category: Layla SDK
order: 30
keywords:
  - créer une mini-application Layla
  - tutoriel SDK Layla
  - "@layla-network/sdk"
  - API de chat Layla
  - API de chat en streaming
  - application d'IA embarquée
  - chatbot IA hors ligne
  - application LLM locale
  - API de chat compatible OpenAI
  - synthèse vocale
  - reconnaissance vocale
  - mini-application React Vite
  - compétence d'agent SDK Layla
lastUpdated: 2026-11-04
translationKey: how-to-build-a-layla-mini-app-with-the-layla-sdk
ai_translated: true
---

**Une mini-application Layla est une application web qui s'exécute dans Layla et utilise le SDK Layla pour accéder aux fonctionnalités d'IA de l'appareil, notamment le chat, la voix, les images, les souvenirs et le stockage privé.** Il n'y a ni clé d'API ni serveur à faire fonctionner. Vous écrivez une application web ordinaire en JavaScript ou en TypeScript, vous appelez `@layla-network/sdk`, et Layla effectue le travail avec le modèle et le moteur d'inférence que l'utilisateur a sélectionnés.

Ce tutoriel crée pas à pas une mini-application de chat complète, en s'appuyant sur l'[exemple de chat](https://github.com/l3utterfly/layla-sdk/tree/main/examples/chat) officiel du dépôt du SDK Layla. À la fin, vous saurez diffuser en streaming une réponse du modèle embarqué, arrêter une génération, envoyer une image, parler et écouter, conserver une conversation dans la base de données privée de la mini-application, développer dans un navigateur avec le mock du SDK et empaqueter le résultat pour Layla.

> **Vous utilisez un agent de codage ?** Le SDK Layla publie une compétence d'agent qui apprend aux agents de codage comme Codex, Claude Code et OpenCode à écrire des mini-applications avec le SDK. Vous pouvez fournir cette compétence à votre agent, décrire l'application souhaitée et lui laisser faire une grande partie du travail décrit dans cet article. Consultez [Utiliser la compétence d'agent du SDK Layla](/getting-started-with-the-layla-sdk/#use-the-layla-sdk-agent-skill) pour le téléchargement et la configuration. Cet article est aussi conçu comme une référence qu'un agent peut lire avec la compétence : la [référence rapide](#référence-rapide-pour-les-développeurs-et-les-agents-de-codage) en fin d'article répertorie donc tous les appels utilisés par l'exemple.

## Ce que vous allez créer

L'exemple de chat est une application React et Vite sur un seul écran, dotée des fonctionnalités suivantes :

| Fonctionnalité                                      | Appels du SDK utilisés                                                                     |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Réponses en streaming avec un curseur clignotant    | `layla.chat.completions.stream(...)`, `stream.on("content", ...)`, `stream.finalContent()` |
| Bouton d'arrêt pour une génération en cours         | `stream.abort()`, `LaylaAbortError`                                                        |
| Joindre une image à un message                      | parties de contenu `image_url` au format de message OpenAI                                 |
| Conversation conservée après un redémarrage         | `layla.db.executeSql(...)`                                                                 |
| Messages copiés dans l'historique de chat de Layla  | `layla.chat.saveChatMessage(...)`                                                          |
| Lire une réponse à voix haute avec une voix choisie | `layla.tts.getVoices()`, `layla.tts.generateVoice(...)`, `layla.tts.stopSpeaking()`        |
| Dicter un message ou parler mains libres            | `layla.stt.startListening()`, `layla.stt.on("speechRecognized", ...)`                      |
| Exécuter et déboguer dans un navigateur ordinaire   | `installLaylaMock(...)`                                                                    |

Presque toute la logique se trouve dans deux fichiers : [`src/App.tsx`](https://github.com/l3utterfly/layla-sdk/blob/main/examples/chat/src/App.tsx) pour l'application et [`src/main.tsx`](https://github.com/l3utterfly/layla-sdk/blob/main/examples/chat/src/main.tsx) pour le mock de développement.

## Avant de commencer

Vous avez besoin de :

- Node.js et npm installés sur votre ordinateur.
- Des notions de base en JavaScript ou en TypeScript. L'exemple utilise React, mais le SDK n'exige pas React. N'importe quelle pile web convient.
- Une version récente de Layla sur votre téléphone Android pour tester sur l'appareil. Certaines fonctionnalités exigent une version minimale, indiquée dans [Versions requises](#versions-requises).

Vous n'avez pas besoin d'un téléphone pour commencer. En développement, l'hôte simulé (mock) du SDK remplace Layla, ce qui vous permet de créer et de tester l'interface dans un navigateur de bureau.

## Comment fonctionne une mini-application Layla

Une mini-application est une page web que Layla charge dans sa propre WebView. Le SDK encapsule la couche de messagerie entre cette page et l'application Layla afin que vous puissiez appeler des méthodes ordinaires :

```text
Votre mini-application -> SDK Layla -> pont WebView -> application Layla -> modèle embarqué
```

Quelques conséquences façonnent la suite de ce tutoriel :

- **Il n'y a rien à configurer.** Pas de clé d'API, d'URL de base ni de point de terminaison. Le SDK ne fonctionne que là où le pont Layla existe, c'est-à-dire dans Layla. Partout ailleurs, les appels au SDK sont rejetés avec `LaylaBridgeUnavailableError`.
- **L'utilisateur choisit le modèle.** Votre code demande une complétion de chat et Layla utilise le moteur d'inférence actif. Pour savoir comment les utilisateurs passent de l'un à l'autre, consultez [Comment fonctionnent les moteurs d'inférence enregistrés dans Layla](/how-saved-inference-engines-work-in-layla/).
- **Les réponses peuvent être lentes.** Un modèle exécuté sur un téléphone est plus lent qu'une API cloud : diffusez donc la réponse en streaming, affichez un état de travail et laissez l'utilisateur arrêter.
- **Chaque mini-application dispose d'un stockage privé.** Une base de données SQLite privée et un espace de fichiers privé appartiennent à votre mini-application et ne sont pas partagés avec d'autres mini-applications.

Pour un peu de contexte avant d'écrire du code, lisez [Que sont les mini-applications Layla ?](/post-what-are-layla-mini-apps-codekitty/) et [Bien démarrer avec le SDK Layla](/getting-started-with-the-layla-sdk/), qui crée une application HTML simple plus petite.

## Étape 1 : Obtenir le projet

Il y a deux façons de commencer.

### Option A : exécuter l'exemple officiel

Clonez le dépôt du SDK et exécutez directement l'exemple :

```bash
git clone https://github.com/l3utterfly/layla-sdk.git
cd layla-sdk/examples/chat
npm install
npm run dev
```

Vite affiche une adresse locale. Ouvrez-la dans un navigateur et vous pouvez discuter immédiatement avec l'hôte simulé.

L'exemple se trouve dans le dossier `examples/chat` du dépôt, à côté des autres mini-applications d'exemple :

![Le dossier examples/chat du dépôt GitHub layla-sdk, avec les dossiers public et src, package.json, vite.config.ts et le README de l'exemple.](./chat.png)

### Option B : démarrer votre propre projet

Créez un projet React et TypeScript avec Vite, puis ajoutez le SDK :

```bash
npm create vite@latest my-chat -- --template react-ts
cd my-chat
npm install
npm install @layla-network/sdk
npm install --save-dev vite-plugin-singlefile
```

Si vous suivez le code source de l'exemple, changez une chose. Dans le dépôt du SDK, l'exemple importe le SDK depuis son dossier source :

```ts
import { LaylaSDK } from "../../../src/index";
```

Dans votre propre projet, importez plutôt depuis le paquet publié :

```ts
import { LaylaSDK } from "@layla-network/sdk";
```

Pour une application plus grande avec plusieurs pages et davantage d'état, le [modèle de mini-application Layla](https://github.com/l3utterfly/layla-miniapp-template) officiel fournit un point de départ prêt à l'emploi avec React, TypeScript et Vite.

### L'organisation des fichiers de l'exemple

```text
examples/chat/
  index.html        Page d'entrée Vite contenant l'élément #root
  package.json      React 19, Vite, TypeScript
  vite.config.ts    Plugin React plus vite-plugin-singlefile
  public/           Fichiers statiques copiés à la racine de la sortie de build
  src/
    main.tsx        Installe le mock Layla en développement et monte <App />
    App.tsx         Toute la logique du chat et l'interface (environ 760 lignes)
    App.css         Styles de l'écran de chat
    index.css       Styles globaux
```

L'étape de build, décrite à l'[étape 13](#étape-13--empaqueter-la-mini-application), transforme ce projet en un unique fichier `index.html` autonome, que Layla charge.

## Étape 2 : Créer le client Layla

Au début de `App.tsx`, créez un seul client et réutilisez-le partout :

```ts
import { LaylaSDK, LaylaAbortError } from "@layla-network/sdk";

const layla = new LaylaSDK();
```

`LaylaSDK` et `Layla` désignent la même classe. Chaque fonctionnalité est une propriété de ce client : `layla.chat`, `layla.tts`, `layla.stt`, `layla.db`, `layla.characters`, `layla.images`, etc. Créer le client au niveau du module, en dehors de tout composant, le rend partagé et évite de le recréer à chaque rendu.

## Étape 3 : Développer dans un navigateur avec le mock Layla

En dehors de Layla, il n'existe pas de pont, et chaque appel au SDK échouerait. Le SDK inclut un hôte simulé qui imite le pont pour le développement. Dans l'exemple, `main.tsx` ne l'installe que lorsque Vite exécute son serveur de développement :

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

Les options utilisées ici :

- `respond` reçoit la conversation et renvoie le texte que le faux modèle doit fournir en réponse. Le mock le diffuse morceau par morceau, de sorte que votre interface de streaming se comporte comme sur l'appareil. Chaque message de `messages` est au format natif de Layla, ce qui explique pourquoi l'exemple vérifie `message.image_base64` pour détecter une image jointe.
- `latencyMs` ajoute un délai avant le début de la réponse, pour imiter le démarrage du modèle.
- `tokenDelayMs` est le délai entre les morceaux diffusés.

Comme `import.meta.env.DEV` vaut `false` dans un build de production, le mock n'est pas installé dans le fichier que vous livrez, et les appels effectués dans Layla passent par le vrai pont.

Installez le mock avant le premier appel au SDK. L'exemple utilise un `import()` dynamique pour le mock afin que son code ne fasse pas partie du bundle de production. Si vous voyez `LaylaBridgeUnavailableError` au premier chargement de la page dans un navigateur, installez le mock avant d'afficher votre application :

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

### Simuler aussi la base de données

Le mock ne dispose pas d'un vrai SQLite. Par défaut, chaque appel à `layla.db.executeSql(...)` renvoie un résultat vide. L'exemple fournit un gestionnaire `executeSql` qui prend en charge les quatre instructions utilisées (`CREATE`, `INSERT`, `SELECT`, `DELETE`) avec `localStorage`, ce qui suffit pour que la conversation se recharge après une actualisation du navigateur. Dans Layla, ces mêmes appels s'exécutent sur une vraie base de données de l'appareil, et le gestionnaire n'est pas utilisé.

Le mock répond aussi à la reconnaissance vocale. Une fois `startListening()` réussi, il émet une transcription prédéfinie, que vous pouvez modifier avec l'option `sttTranscript` ou désactiver en passant `null`.

## Étape 4 : Modéliser la conversation

L'exemple conserve son propre type de message simple pour l'écran :

```ts
interface ChatMessage {
  role: "user" | "assistant";
  content: string | null;
  imageBase64?: string;
  imageName?: string;
}
```

L'API de chat du SDK suit le format OpenAI Chat Completions, avec les rôles `system`, `user` et `assistant` et un champ `content`. Une petite fonction convertit l'état de votre écran vers ce format. C'est ici qu'une image jointe devient une partie de contenu `image_url` :

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

Conserver un type distinct pour l'écran est un choix de conception, pas une obligation. Cela permet de stocker des champs supplémentaires, comme le nom de fichier de l'image, sans les envoyer au modèle.

Comme avec les autres API de type OpenAI, chaque requête transporte toute la conversation dans `messages` ; votre application doit donc mémoriser et renvoyer les tours précédents. Pour donner une personnalité ou des instructions au modèle, ajoutez un message `system` au début du tableau.

## Étape 5 : Diffuser une réponse en streaming

C'est le cœur de l'application. Lorsque l'utilisateur appuie sur **Envoyer**, l'exemple construit la nouvelle liste de messages, affiche un message d'assistant vide et démarre un flux :

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

Points à bien comprendre :

- **`stream(...)` retourne immédiatement.** Il vous donne l'objet de flux actif de façon synchrone, et non une promesse, ce qui vous permet d'attacher des écouteurs avant l'arrivée du premier jeton.
- **Utilisez l'instantané.** L'événement `content` transmet deux valeurs : le nouveau `delta` et l'`snapshot` complet de la réponse jusqu'ici. Définir votre état à partir de l'instantané est plus simple et plus sûr que d'ajouter des deltas, car un événement manqué ou répété ne peut pas corrompre le texte.
- **`finalContent()` attend la fin.** Il se résout avec la réponse visible complète, ou il est rejeté si le flux a échoué ou a été interrompu.
- **Le raisonnement est séparé pour vous.** Si le modèle place ses réflexions dans des balises `<think>`, le SDK les retire de `content` et les transmet via l'événement `reasoning`, de sorte que les balises n'apparaissent jamais dans votre bulle de chat.

Le flux émet ces événements :

| Événement   | Arguments           | Signification                                                      |
| ----------- | ------------------- | ------------------------------------------------------------------ |
| `content`   | `delta`, `snapshot` | Nouveau texte visible, et réponse visible complète jusqu'ici       |
| `reasoning` | `delta`, `snapshot` | Nouveau texte de raisonnement d'un modèle à réflexion              |
| `toolCall`  | `toolCall`          | Le modèle a demandé d'appeler un outil (nécessite un Layla récent) |
| `chunk`     | `chunk`             | Chaque fragment brut au style OpenAI                               |
| `end`       | aucun               | La réponse est terminée                                            |
| `error`     | `error`             | La requête a échoué ou a été interrompue                           |

### Autres façons de lire une réponse

Si vous n'avez besoin que de la réponse finale, évitez le streaming :

```ts
const completion = await layla.chat.completions.create({ messages });
const text = completion.choices[0]?.message.content ?? "";
```

Le flux est aussi un itérable asynchrone, dans le même style que le SDK OpenAI. Sortir de la boucle interrompt la requête :

```ts
for await (const chunk of stream) {
  const piece = chunk.choices[0]?.delta.content ?? "";
}
```

Pour tout ce qu'une personne regarde, préférez le streaming. Un modèle local peut mettre plusieurs secondes à produire le premier mot, et une réponse visible qui s'allonge vaut bien mieux qu'un écran figé.

### Montrer que l'application travaille

L'exemple pilote trois petits éléments d'interface à partir d'un seul indicateur `busy` : un libellé « Generating... » dans l'en-tête, un curseur clignotant sur la dernière bulle de l'assistant et un bouton **Arrêter** qui remplace **Envoyer**. Il conserve aussi une copie de l'indicateur dans `busyRef`. Les rappels de longue durée, comme l'écouteur vocal de l'étape 11, liraient sinon une valeur périmée de `busy` issue d'un ancien rendu. Lire une référence évite ce problème.

## Étape 6 : Permettre à l'utilisateur d'arrêter une génération

Conservez une référence au flux actif afin qu'un bouton puisse l'annuler :

```ts
const streamRef = useRef<ChatCompletionStream | null>(null);

// when starting:
streamRef.current = stream;

// the Stop button:
const stopGeneration = () => streamRef.current?.abort();
```

Interrompre le flux fait rejeter `finalContent()` avec une `LaylaAbortError`, et l'exemple traite ce cas séparément des vraies erreurs :

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

`abort()` émet aussi un événement `error` portant une `LaylaAbortError`. L'écouteur `error` de l'exemple affiche le texte du message à l'écran ; filtrez donc les interruptions dans votre propre écouteur, sinon le bouton Arrêter remplacera la réponse partielle par une ligne d'erreur :

```ts
stream.on("error", (err) => {
  if (err instanceof LaylaAbortError) return;
  setMessages([
    ...nextMessages,
    { role: "assistant", content: `Error: ${err.message}` },
  ]);
});
```

Vous pouvez aussi annuler avec le mécanisme standard du web en passant `signal` à la requête :

```ts
const controller = new AbortController();
const stream = layla.chat.completions.stream({
  messages,
  signal: controller.signal,
});
controller.abort();
```

## Étape 7 : Envoyer une image

L'entrée d'image utilise le format de parties de contenu OpenAI présenté à l'étape 4. L'exemple doit transformer un fichier choisi par l'utilisateur en URL de données base64 :

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

L'exemple limite le sélecteur à quatre formats courants et vérifie le type avant la lecture :

```ts
const supportedImageTypes = new Set([
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);
```

Le sélecteur lui-même est un `<input type="file" accept="image/png,image/jpeg,image/gif,image/webp">` masqué, ouvert par un bouton de pièce jointe. Après la sélection, l'application affiche un aperçu avec un bouton de suppression et joint l'URL de données au message suivant.

Deux conditions à garder à l'esprit :

- **Utilisez une URL de données base64.** Les anciennes versions de Layla ignorent les URL d'images distantes en `https://` ainsi que les images au-delà de la première dans un message ; une URL de données est donc le choix portable.
- **Le modèle doit pouvoir voir.** Une image envoyée à un modèle uniquement textuel ne peut pas être comprise. Pour utiliser l'entrée d'image dans Layla, un modèle compatible vision doit être actif. Consultez [Comment ajouter des LLM de vision dans Layla](/how-to-add-vision-llms-in-layla-qwen3-vl/).

## Étape 8 : Enregistrer la conversation dans la base de données privée

Une mini-application repart de zéro à chaque ouverture ; tout ce que l'utilisateur doit conserver doit donc être stocké. `layla.db` donne à chaque mini-application sa propre base de données SQLite privée. L'exemple l'utilise pour la conversation affichée à l'écran.

Créez la table au lancement. `IF NOT EXISTS` permet de l'exécuter sans risque à chaque fois :

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

Ajoutez chaque message avec des paramètres liés. Passez les valeurs dans le second argument et utilisez des marqueurs `?`. Ne construisez jamais du SQL en concaténant le texte de l'utilisateur dans la chaîne de requête :

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

Relisez la conversation dans l'ordre. Le résultat contient un tableau `rows` d'objets indexés par nom de colonne :

```ts
const result = await layla.db.executeSql(
  `SELECT role, content, image_base64, image_name
     FROM ${messagesTable}
    ORDER BY id ASC`,
);
const history = result.rows;
```

Chaque résultat contient aussi `rowsAffected` (le nombre de lignes modifiées par une écriture) et `insertId` (l'identifiant de la dernière ligne insérée, `0` si sans objet). Le bouton **Effacer** exécute simplement `DELETE FROM chat_messages`.

Exécutez la préparation une fois au montage du composant, puis remplissez l'écran avec les messages enregistrés :

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

L'exemple stocke les données d'image sous forme de texte base64 dans la table, ce qui est simple et suffisant pour une démonstration. Une application qui conserve de nombreuses images ou des images volumineuses devrait les écrire avec `layla.utils.saveFile(...)` et ne stocker que le nom de fichier dans la base de données.

## Étape 9 : Copier les messages dans l'historique de chat de Layla

`layla.db` est le stockage privé de votre application. Par ailleurs, vous pouvez écrire des messages dans l'historique de chat natif de Layla avec `layla.chat.saveChatMessage(...)`, afin qu'ils apparaissent parmi les conversations habituelles de l'utilisateur. L'exemple fait les deux pour chaque message :

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

Les champs :

| Champ             | Signification                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| `id`              | `0` ou moins crée une nouvelle entrée. Un identifiant positif écrase une entrée existante.            |
| `session_id`      | La session de chat à laquelle appartient l'entrée. L'exemple en crée une nouvelle à chaque lancement. |
| `character_id`    | `"user"` pour les messages de l'utilisateur, sinon l'identifiant du personnage.                       |
| `display_message` | Le texte affiché dans l'historique de chat.                                                           |
| `message`         | Le texte fourni au modèle lors des tours suivants. Il peut différer de `display_message`.             |
| `timestamp`       | Heure Unix en millisecondes. Une valeur de `0` ou moins utilise l'heure actuelle.                     |

L'appel se résout avec l'entrée enregistrée, y compris l'`id` attribué.

Quelques détails à garder à l'esprit :

- Seules les entrées d'un personnage créent une session manquante. Une entrée d'utilisateur enregistrée dans une session qui n'existe pas encore ne la crée pas.
- Les nouvelles entrées n'ont pas d'image. L'exemple conserve donc les images jointes uniquement dans sa propre base de données.
- L'exemple utilise l'identifiant littéral `"layla"` pour les réponses de l'assistant. Si votre mini-application discute en tant qu'un personnage précis, obtenez son vrai identifiant avec `layla.characters.list()` et utilisez-le à la place.
- L'appel nécessite une version de Layla qui prend en charge des textes `display_message` et `message` distincts. L'envelopper dans un `try/catch`, comme le fait l'exemple, permet à l'application de continuer à fonctionner si l'enregistrement échoue.

Les deux stockages répondent à des questions différentes :

| Stockage                     | Se trouve dans                    | À utiliser pour                                          |
| ---------------------------- | --------------------------------- | -------------------------------------------------------- |
| `layla.db`                   | Votre mini-application uniquement | Votre propre état et votre propre vue de la conversation |
| `layla.chat.saveChatMessage` | L'historique de chat de Layla     | Faire apparaître la conversation dans Layla elle-même    |

## Étape 10 : Ajouter la synthèse vocale

La synthèse vocale utilise les voix que l'utilisateur a installées dans Layla. Chargez-les une fois et laissez l'utilisateur choisir :

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

Chaque voix possède un `id`, un `name`, un `type` et des `tags`. Passez un identifiant à `generateVoice(...)` pour parler avec cette voix, ou `null` pour utiliser la voix par défaut de Layla. La promesse se résout à la fin de la lecture, ce qui permet d'utiliser `await` pour savoir quand la parole est terminée :

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

Chaque bulle d'assistant terminée reçoit un bouton **Lire** qui appelle `speak(message.content)`. Pour en savoir plus sur les voix dans l'application, consultez [Comment entendre vos personnages parler dans Layla](/how-to-hear-your-characters-speak-in-layla/).

Si vous voulez l'audio sans le lire, `layla.tts.generateVoiceToFile(voiceId, text)` renvoie un URI de données audio utilisable dans un élément `<audio>`, ou enregistre un fichier dans le stockage privé de la mini-application.

## Étape 11 : Ajouter la reconnaissance vocale et un mode mains libres

L'entrée vocale comporte trois parties : une demande de démarrage, un événement qui fournit chaque transcription et une demande d'arrêt.

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

Notez que `startListening()` ne renvoie pas la transcription. Sa promesse se résout lorsque le moteur de reconnaissance a démarré. Le texte arrive plus tard via l'événement `speechRecognized` : abonnez-vous donc avant le démarrage ou juste après.

L'exemple l'utilise de deux façons :

- **Appuyer pour parler.** Le bouton du microphone démarre l'écoute, et le texte reconnu est placé dans la zone de message où l'utilisateur peut le modifier avant l'envoi.
- **Mode vocal.** Un interrupteur dans l'en-tête active une boucle. L'application écoute, envoie ce qu'elle entend, lit la réponse avec `layla.tts.generateVoice(...)`, puis recommence à écouter. La boucle n'est que l'assemblage des éléments ci-dessus :

```ts
// at the end of sendMessage, after the reply has finished streaming
if (voiceModeRef.current && assistantContent) {
  await speak(assistantContent);
  if (voiceModeRef.current) void startListening();
}
```

Deux détails d'implémentation assurent la fiabilité. L'écouteur vocal est enregistré une seule fois et lit les valeurs courantes via des références (`voiceModeRef`, `busyRef`, `sendMessageRef`) plutôt qu'en capturant l'état, ce qui évite de le réabonner à chaque rendu. Et l'application arrête toute lecture en cours avant de commencer à écouter.

Dans le navigateur, le mock émet une transcription d'exemple peu après `startListening()`, ce qui vous permet de tester tout le parcours vocal sans microphone.

## Étape 12 : Gérer les erreurs

Toutes les erreurs du SDK étendent `LaylaError`. Trois cas méritent un traitement particulier :

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

L'exemple consigne la plupart des erreurs dans la console et affiche les problèmes de voix et d'image dans une petite alerte intégrée (`attachmentError` et `voiceError`). Pour une mini-application publiée, affichez le message dans l'interface, à un endroit où l'utilisateur le verra.

## Étape 13 : Empaqueter la mini-application

Layla charge un seul fichier HTML. Le `vite.config.ts` de l'exemple utilise `vite-plugin-singlefile` pour regrouper tous les scripts et styles dans `index.html` :

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [react(), viteSingleFile()],
});
```

Lancez le build :

```bash
npm run build
```

Le script `build` exécute `tsc -b && vite build`, de sorte que les erreurs TypeScript arrêtent le build avant que quoi que ce soit ne soit produit.

### Ajouter app.json

Layla lit le nom et la description d'une mini-application dans un fichier `app.json`. Le dossier de l'exemple n'en contient pas : ajoutez-le dans `public/`. Vite copie tout ce qui se trouve dans `public/` à la racine de la sortie de build :

```json
{
  "title": "Layla Chat",
  "tagline": "Chat with Layla by text, image or voice.",
  "description": "A simple chat mini-app that streams replies from the on-device model.",
  "iconUri": "icon.png"
}
```

`iconUri` pointe vers un fichier image du même dossier ; placez donc aussi un `icon.png` carré dans `public/`. Les icônes carrées s'intègrent le mieux aux grilles et listes de Layla. `backgroundImgUri` est un ajout facultatif pour une image d'arrière-plan ou d'aperçu.

### Compresser le contenu

Après le build, `dist` doit ressembler à ceci :

```text
dist/
  app.json
  index.html
  icon.png
```

Créez un ZIP du **contenu** de `dist`, et non du dossier `dist` lui-même. `app.json` et `index.html` doivent se trouver à la racine du ZIP, sans dossier parent. Si vous hébergez vous-même l'application, utilisez à la place de `index.html` un fichier `index.url` contenant l'adresse sur une seule ligne.

Le dépôt du SDK publie aussi ses mini-applications d'exemple sous forme de ZIP directement importable à chaque version, ce qui permet d'essayer rapidement l'exemple de chat sur votre téléphone avant de créer la vôtre.

## Étape 14 : Tester dans Layla

Importez le ZIP via le parcours d'importation de mini-applications de Layla, ouvrez l'application et vérifiez :

1. Un message arrive progressivement en streaming, et **Arrêter** y met fin sans perdre le texte partiel.
2. La réponse est plus lente que dans le navigateur. C'est normal, car un vrai modèle s'exécute sur l'appareil.
3. Fermer puis rouvrir la mini-application restaure la conversation depuis la base de données.
4. L'entrée d'image fonctionne avec un modèle de vision actif, et l'indique clairement dans le cas contraire.
5. **Lire** prononce la réponse, et le bouton du microphone remplit la zone de message.
6. La mini-application apparaît avec le titre et l'icône issus de `app.json`.

Si un appel au SDK échoue avec `LaylaBridgeUnavailableError`, la page s'exécute en dehors de Layla. Si le titre ou l'icône est absent, vérifiez que `app.json` est un JSON valide et se trouve à la racine du ZIP.

## Idées pour étendre l'application

Une fois le chat de base opérationnel, le même client offre davantage :

- **Personnages.** `layla.characters.list()` et `layla.characters.getImage(id)` permettent à l'utilisateur de choisir son interlocuteur. Utilisez la description du personnage dans un message `system`.
- **Mini-applications contextuelles.** `layla.contextual.getExecutionContext()` indique le personnage et la session de chat en cours, et `layla.contextual.on(...)` fournit des événements lorsque le chat environnant change.
- **Souvenirs et personas.** `layla.memories` et `layla.personas` donnent accès à ce que Layla sait de l'utilisateur et du personnage.
- **Images et musique.** `layla.images.generateImage(...)` et `layla.acestep.generateMusic(...)` génèrent des médias avec des modèles embarqués.
- **Appel d'outils.** Passez des `tools` au style OpenAI à une requête de chat et exécutez vous-même la boucle. Cela nécessite un Layla et un SDK récents, indiqués ci-dessous.
- **Travail en arrière-plan.** Un fichier `task.js` s'exécute périodiquement sans ouvrir la WebView. Consultez [Exécuter des tâches en arrière-plan dans votre mini-application](/running-background-tasks-in-your-mini-app/).

## Référence rapide pour les développeurs et les agents de codage

Cette section est une carte condensée de l'exemple. Elle répertorie chaque appel du SDK effectué par la mini-application de chat, avec le contrat qui compte lorsque vous écrivez du code similaire.

### Appels du SDK utilisés par l'exemple de chat

| Appel                                                                                               | Valeur retournée                   | Remarques                                                                         |
| --------------------------------------------------------------------------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------- |
| `new LaylaSDK()`                                                                                    | client                             | En créer un seul et le réutiliser. `Layla` en est un alias.                       |
| `layla.chat.completions.stream({ messages, signal? })`                                              | `ChatCompletionStream` (synchrone) | Attachez les écouteurs immédiatement. `abort()` annule.                           |
| `layla.chat.completions.create({ messages })`                                                       | `Promise<ChatCompletion>`          | Sans streaming. Passez `stream: true` pour obtenir un flux à la place.            |
| `stream.on("content", (delta, snapshot) => ...)`                                                    | flux                               | `snapshot` est tout le texte visible jusqu'ici.                                   |
| `stream.finalContent()`                                                                             | `Promise<string>`                  | Rejeté en cas d'échec ou d'interruption. Ne renvoie que le texte visible.         |
| `stream.abort()`                                                                                    | void                               | Fait rejeter `finalContent()` avec `LaylaAbortError` et émet `error`.             |
| `layla.chat.saveChatMessage({ id, session_id, character_id, display_message, message, timestamp })` | entrée enregistrée avec `id`       | `id <= 0` crée. Seules les entrées de personnage créent de nouvelles sessions.    |
| `layla.db.executeSql(query, params?)`                                                               | `{ rows, rowsAffected, insertId }` | SQLite privé par mini-application. Utilisez des marqueurs `?`.                    |
| `layla.tts.getVoices()`                                                                             | `LaylaTTSVoice[]`                  | Chacune possède `id`, `name`, `type`, `tags`.                                     |
| `layla.tts.generateVoice(voiceId \| null, text)`                                                    | `Promise<void>`                    | Lit l'audio. Se résout à la fin de la lecture. `null` utilise la voix par défaut. |
| `layla.tts.stopSpeaking()`                                                                          | `Promise<void>`                    | Arrête la lecture.                                                                |
| `layla.stt.startListening()`                                                                        | `Promise<void>`                    | Se résout au début de l'écoute. La transcription provient de l'événement.         |
| `layla.stt.on("speechRecognized", ({ transcript }) => ...)`                                         | client                             | Se retire avec `layla.stt.off(...)`.                                              |
| `layla.stt.stopListening()`                                                                         | `Promise<void>`                    | Libère le microphone. Ne supprime pas l'abonnement à l'événement.                 |
| `installLaylaMock(options)`                                                                         | descripteur du mock                | Développement uniquement. À installer avant le premier appel au SDK.              |

Pour les types et champs exacts, lisez les déclarations TypeScript générées du SDK et sa [référence d'API](https://github.com/l3utterfly/layla-sdk) plutôt que de deviner la forme d'un objet.

### Où trouver quoi dans l'exemple

| Fichier et fonction                                                                 | Ce qu'il montre                                                                          |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `src/main.tsx`                                                                      | Mock réservé au développement, avec un gestionnaire `executeSql` personnalisé            |
| `App.tsx` : `toCompletionMessage`                                                   | Conversion des messages d'écran en messages au format OpenAI avec parties d'image        |
| `App.tsx` : `sendMessage`                                                           | La boucle de streaming, la gestion de l'arrêt, la persistance et la boucle du mode vocal |
| `App.tsx` : `createMessagesTable`, `loadMessages`, `insertMessage`, `clearMessages` | Les fonctions SQLite avec paramètres liés                                                |
| `App.tsx` : `saveChatMessage`                                                       | Écriture dans l'historique de chat natif de Layla                                        |
| `App.tsx` : `speak`, `startListening`, `stopListening`                              | Contrôle de la synthèse vocale et de la reconnaissance vocale                            |
| `App.tsx` : `readImageAsDataUrl`, `selectImage`                                     | Lecture d'un fichier image en URL de données base64                                      |
| `vite.config.ts`                                                                    | Regroupement de l'application en un seul `index.html`                                    |

### Règles qui évitent les erreurs courantes

- Importez depuis la racine du paquet, `@layla-network/sdk`. N'importez pas depuis des chemins privés du paquet.
- N'appelez pas le SDK comme un client HTTP. Il n'y a ni clé d'API ni URL de base.
- Créez un seul client. N'installez le mock qu'en développement, avant le premier appel au SDK.
- Préférez `stream(...)` pour tout ce qui est montré à une personne, et donnez toujours à l'utilisateur un moyen d'arrêter.
- Considérez `snapshot` comme la source de vérité du texte de la réponse.
- Filtrez `LaylaAbortError` dans les écouteurs `error`.
- Passez les valeurs de base de données en paramètres `?`, et non en concaténant des chaînes.
- Lisez les valeurs modifiables via des références dans les écouteurs qui vivent pendant toute la durée de l'application.
- Les URL d'images des parties `image_url` doivent être des URL de données base64.
- Une mini-application compilée nécessite `app.json` et `index.html` (ou `index.url`) à la racine du ZIP.

### Versions requises

Le SDK dialogue avec la version de Layla dans laquelle il s'exécute et emprunte la meilleure voie que cette version prend en charge. Cet article a été rédigé pour `@layla-network/sdk` 7.6.

| Fonctionnalité                                                                                            | Nécessite                                                                       |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Chat, streaming, une image par message, synthèse vocale, reconnaissance vocale, base de données, fichiers | Toute version de Layla prise en charge                                          |
| Appel d'outils, contenu en plusieurs parties et plusieurs images dans un message                          | Layla 7.5.0-alpha ou plus récent et `@layla-network/sdk` 7.5.0 ou plus récent   |
| Textes `display_message` et `message` distincts dans `saveChatMessage`                                    | Une version de Layla qui prend en charge le contrat d'enregistrement mis à jour |

Sur un Layla plus ancien, les champs que l'hôte ne peut pas transmettre sont ignorés avec un avertissement dans la console plutôt que de provoquer une erreur. Une mini-application qui dépend de l'appel d'outils peut d'abord vérifier la version avec `layla.contextual.getExecutionContext()`, qui inclut `app_version`.

## Questions fréquentes

### Comment créer une mini-application Layla ?

Créez une application web, installez `@layla-network/sdk`, appelez le SDK depuis votre code, compilez-la en un seul `index.html`, ajoutez un `app.json` et importez le ZIP dans Layla. Cet article détaille chaque étape à l'aide d'une application de chat.

### Ai-je besoin d'une clé d'API pour utiliser le SDK Layla ?

Non. Le SDK n'utilise ni clé d'API, ni URL de base, ni point de terminaison réseau. Il envoie les requêtes à l'application Layla via le pont WebView, et Layla utilise le modèle et le moteur d'inférence choisis par l'utilisateur.

### L'API de chat de Layla est-elle compatible avec l'API OpenAI ?

Les formats de requête et de réponse suivent le format Chat Completions d'OpenAI, y compris les rôles, `messages`, le streaming, les parties de contenu d'image et les outils. C'est une bibliothèque cliente qui dialogue avec l'application Layla, et non un remplacement direct d'un point de terminaison HTTP d'OpenAI.

### Une mini-application Layla fonctionne-t-elle hors ligne ?

La mini-application elle-même est un fichier HTML local, et le chat passe par le modèle que l'utilisateur a sélectionné dans Layla. Avec un modèle local, aucune donnée ne quitte l'appareil. Si l'utilisateur bascule Layla vers un moteur d'inférence cloud, les règles de connexion de ce moteur s'appliquent.

### Puis-je utiliser un autre framework que React ?

Oui. Toute pile web capable de produire une page HTML autonome convient, y compris JavaScript simple, Vue et Svelte. L'exemple utilise React avec Vite parce que cela permet d'organiser une interface plus grande.

### Pourquoi obtiens-je LaylaBridgeUnavailableError dans mon navigateur ?

Le pont Layla n'existe que dans la WebView de Layla. Dans un navigateur ordinaire, installez le mock avec `installLaylaMock(...)` avant le premier appel au SDK, et uniquement en développement.

### Comment tester une mini-application sans téléphone ?

Lancez le serveur de développement Vite et ouvrez-le dans un navigateur de bureau. Le mock Layla répond aux appels de chat, de voix, de liste de voix et de base de données, ce qui vous permet de créer l'interface avant de l'installer dans Layla.

### Un agent de codage peut-il écrire la mini-application à ma place ?

Oui. Le dépôt du SDK Layla publie une compétence d'agent pour des outils comme Codex, Claude Code et OpenCode. Fournissez la compétence à votre agent, décrivez le comportement souhaité et demandez-lui d'utiliser le mock Layla pour le développement local. Consultez [Bien démarrer avec le SDK Layla](/getting-started-with-the-layla-sdk/#use-the-layla-sdk-agent-skill).

### Quelle est la différence entre layla.db et saveChatMessage ?

`layla.db` est une base de données SQLite privée qui appartient à votre mini-application et sert à vos propres données. `layla.chat.saveChatMessage(...)` écrit une entrée dans l'historique de chat de Layla afin qu'elle apparaisse avec les autres conversations de l'utilisateur.

## Pour aller plus loin

La mini-application de chat terminée est un petit exemple complet du schéma que suit toute mini-application Layla : diffuser les résultats du modèle embarqué en streaming, garder l'interface réactive pendant qu'un modèle local travaille, stocker l'état dans le stockage privé et livrer un seul fichier HTML autonome. Comme l'inférence a lieu sur le téléphone, les applications que vous créez avec le SDK Layla continuent de fonctionner sans service cloud. Pour la liste complète des appels, le dossier d'exemples et la compétence d'agent, consultez le [dépôt du SDK Layla](https://github.com/l3utterfly/layla-sdk).
