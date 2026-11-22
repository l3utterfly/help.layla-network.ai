---
title: "Génération d'images NanoGPT sur Android : créer un Agent d'images IA dans Layla"
description: Utilisez l'API de génération d'images NanoGPT dans Layla sur Android. Créez un Agent pas à pas pour que vos personnages IA envoient des images HiDream, FLUX ou SDXL dans le chat.
category: Image generation
order: 60
keywords:
  - génération d'images NanoGPT
  - API de génération d'images NanoGPT
  - modèles d'images NanoGPT
  - tarifs de génération d'images NanoGPT
  - API NanoGPT
  - clé API NanoGPT
  - endpoint de l'API NanoGPT
  - API d'images nano-gpt.com
  - application NanoGPT Android
  - génération d'images NanoGPT SillyTavern
  - modèles d'images NanoGPT non censurés
  - NanoGPT HiDream
  - API HiDream
  - API FLUX
  - API SDXL
  - API de génération d'images payée à l'usage
  - API de génération d'images sans abonnement
  - API de génération d'images pas chère
  - API de génération d'images compatible OpenAI
  - endpoint images/generations
  - chat IA avec génération d'images
  - chatbot IA qui envoie des images
  - jeu de rôle IA avec génération d'images
  - générateur d'images de personnages IA
  - générateur d'images IA pour Android
  - utiliser sa propre clé API
  - LLM local avec génération d'images dans le cloud
  - comment créer un agent IA
  - agent IA en JavaScript
  - outil Eval de Layla
  - Agent JavaScript Layla
  - Agent de génération d'images Layla
  - Agents Layla
lastUpdated: 2026-11-22
translationKey: how-to-create-a-nanogpt-image-generation-agent-in-layla
ai_translated: true
---

**La génération d'images NanoGPT donne accès, avec une seule clé API payée à l'usage, à plus de 200 modèles d'images, dont HiDream, FLUX, Seedream, Qwen Image, Stable Diffusion XL et GPT Image, sans abonnement.** Ce guide connecte l'API de génération d'images NanoGPT à Layla, une application de chat IA pour Android, afin que vos personnages IA puissent envoyer des images dans le chat. Lorsque votre personnage décrit une image dans sa réponse, un Agent Layla envoie cette description à NanoGPT, enregistre l'image reçue en retour et l'affiche dans la conversation.

L'article comporte deux parties. La première montre comment construire l'Agent d'images IA pas à pas dans la mini-app _Agents_, pour que vous voyiez où va chaque élément. La seconde explique le code JavaScript de l'Agent ligne par ligne, pour que vous puissiez le modifier ou écrire votre propre Agent pour une autre API de génération d'images.

L'Agent s'exécute dans l'environnement JavaScript intégré à Layla, vous n'avez donc pas besoin de la mini-app Interpréteur Python. Si vous préférez ne pas le construire vous-même, vous pouvez télécharger le fichier de l'Agent terminé et l'importer.

Contrairement aux [modèles d'IA hors ligne](/fr/how-to-enable-image-generation-in-layla/) de Layla, cet Agent nécessite une connexion Internet. Votre description d'image est envoyée à NanoGPT et à l'entreprise qui exploite le modèle, et chaque image est payée sur votre solde NanoGPT. Si vous discutez avec un modèle local, le reste de votre conversation reste sur votre appareil.

<div class="file-download">
  <div class="file-download-info">
    <span class="file-download-label">Fichier de l&#x27;Agent</span>
    <span class="file-download-name">nanogpt-generate-image.json</span>
    <span class="file-download-hint">Il ne fonctionnera pas sans clé API NanoGPT, que l'article explique plus bas.</span>
  </div>
  <a class="file-download-button" href="/assets/articles/how-to-create-a-nanogpt-image-generation-agent-in-layla/nanogpt-generate-image.json" download="nanogpt-generate-image.json"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>Télécharger</a>
</div>

## Pourquoi utiliser la génération d'images NanoGPT dans Layla ?

Les modèles Stable Diffusion de Layla sont le bon choix lorsque vous voulez que les images soient générées entièrement sur votre téléphone. NanoGPT répond à d'autres besoins :

- **Un paiement à l'image, sans abonnement.** Vous approvisionnez un solde, et chaque image en est déduite. Au moment de la rédaction, les modèles d'images NanoGPT les moins chers coûtent moins d'un demi-cent par image, et HiDream I1 Full, que cet Agent utilise, coûte 0,0153 $.
- **De petits dépôts et des paiements en cryptomonnaie.** NanoGPT accepte les cartes à partir de 1 $ et les cryptomonnaies à partir de 0,10 $, ce qui convient à ceux qui veulent essayer un modèle sans gros dépôt ni carte bancaire.
- **De nombreux modèles d'images derrière une seule clé.** HiDream, FLUX, Seedream, Qwen Image, GPT Image, Stable Diffusion XL et des modèles SDXL anime comme Animagine XL et Illustrious utilisent tous la même requête. Changer de modèle revient à modifier une ligne du code de l'Agent.
- **Une API d'images compatible OpenAI.** L'endpoint d'images de NanoGPT suit le format de l'API `images/generations` d'OpenAI, de sorte que le code de ce guide sert aussi de modèle pour d'autres API de génération d'images compatibles OpenAI.
- **Un seul compte NanoGPT pour le chat et les images.** NanoGPT propose aussi des modèles de langage via une API compatible OpenAI à l'adresse `https://api.nano-gpt.com/api/v1`, que Layla peut utiliser pour la conversation elle-même grâce à sa [connexion à une API compatible OpenAI](/fr/how-to-connect-layla-to-any-openai-compatible-api/). Avec cet Agent, la même clé sert à la fois pour les réponses de votre personnage et pour ses images.
- **Ou un modèle de chat local avec des images dans le cloud.** L'Agent ne réagit qu'à la réponse du personnage, il fonctionne donc avec le modèle que vous utilisez pour discuter. Vous pouvez garder un LLM privé et hors ligne pour la conversation, et seul le prompt d'image quitte votre téléphone.
- **Une qualité d'image qui ne dépend pas de votre téléphone.** L'image est générée sur un serveur, donc la vitesse de votre appareil ne limite ni la taille du modèle ni l'attente.

## Fonctionnement de l'Agent d'images IA en bref

L'Agent suit le même déroulement que les autres Agents de génération d'images de Layla, comme l'[Agent OpenRouter](/fr/how-to-use-the-openrouter-image-generation-agent/) et l'[Agent Nano Banana](/fr/how-to-use-the-google-nano-banana-image-generation-agent/) :

```text
You ask for an image
  -> the character replies with a tagged image prompt
  -> the Agent's trigger spots the tag
  -> the Eval tool calls NanoGPT's API and saves the picture
  -> the Display Image tool shows it in the chat
```

Un Agent se compose de trois parties, et celui-ci utilise chacune d'elles une fois :

1. **Un prompt système** indique au modèle de langage de votre personnage qu'il peut créer des images, et qu'il le fait en écrivant un prompt d'image entre les balises `<stable_diffusion_prompt></stable_diffusion_prompt>`.
2. **Un déclencheur** surveille les réponses du modèle. Lorsqu'une réponse contient la balise, le déclencheur capture le texte qu'elle contient et démarre l'Agent.
3. **Deux outils** s'exécutent l'un après l'autre. _Eval_ exécute un court programme JavaScript qui envoie le prompt à NanoGPT et enregistre l'image dans un fichier. _Display Image_ prend ce fichier et l'affiche dans le chat.

Le modèle de langage ne parle jamais à NanoGPT. Il se contente d'écrire du texte, et l'Agent prend en charge tout le reste. C'est pourquoi l'Agent fonctionne avec n'importe quel modèle de chat, y compris un petit modèle local exécuté sur votre téléphone.

La balise s'appelle `<stable_diffusion_prompt>` parce que la génération d'images propre à Layla écoute aussi cette balise. Cela compte pour la configuration, comme l'explique l'[Étape 1](#étape-1--désactiver-la-génération-dimages-par-défaut-de-layla).

## Ce dont vous avez besoin

- La mini-app _Agents_. Si vous n'avez jamais utilisé les Agents, lisez d'abord [Comment activer les Agents, les fonctions et l'appel d'outils dans Layla](/fr/how-to-enable-agents-functions-and-tool-calling-in-layla/).
- Un compte NanoGPT approvisionné et une clé API NanoGPT. La section suivante explique comment faire.
- Une connexion Internet.

## Comment obtenir une clé API NanoGPT

Une clé API est une longue chaîne de caractères qui identifie votre compte NanoGPT lorsque l'Agent envoie une requête. Les clés NanoGPT commencent par `sk-nano-`.

1. Allez sur [nano-gpt.com](https://nano-gpt.com) et connectez-vous ou créez un compte.
2. Ouvrez la [page Balance](https://nano-gpt.com/balance) et ajoutez des fonds. NanoGPT fonctionne en prépaiement : vous approvisionnez un solde, et chaque image en est déduite. Votre solde actuel s'affiche à côté de _Usage & billing_ dans la barre latérale. Au moment de la rédaction, NanoGPT accepte les cartes, Apple Pay et Google Pay, avec un minimum de 1 $ pour le premier dépôt par carte et de 5 $ ensuite, ainsi qu'un éventail de cryptomonnaies à partir de 0,10 $. Il ne prélève aucuns frais de dépôt. La [page des tarifs](https://nano-gpt.com/pricing) présente les conditions en vigueur.
3. Sélectionnez **API** dans la barre latérale pour ouvrir la page _API integration_, ou allez directement sur [nano-gpt.com/api](https://nano-gpt.com/api). L'onglet _API keys_ est sélectionné et liste les clés que vous possédez déjà.
4. Sélectionnez **Create API key** en haut à droite de la section _API keys_. La nouvelle clé apparaît dans la liste, en grande partie masquée.
5. Sélectionnez l'icône en forme d'œil à côté de la clé pour l'afficher en entier, ou l'icône de copie juste à côté pour la copier.

![La page API integration de NanoGPT, avec API sélectionné dans la barre latérale et une liste API keys contenant une clé, sk-nano-...80ff, avec les icônes d'œil et de copie à côté et un bouton Create API key en haut à droite.](./nano-gpt-api-key.png)

Le texte sous la liste montre comment une clé est envoyée : `Authorization: Bearer $NANOGPT_API_KEY`. C'est l'en-tête qu'utilise le code de l'Agent, comme expliqué dans [Envoyer la requête](#envoyer-la-requête).

Traitez la clé comme un mot de passe. Toute personne qui la possède peut générer des images payées sur votre solde. Si vous essayez simplement l'Agent, ne gardez qu'un petit solde sur le compte.

## Modèles d'images NanoGPT et tarifs

L'Agent utilise un modèle et une taille d'image, que vous définissez en haut de son code. NanoGPT liste ses modèles d'images sur sa [page des modèles d'images](https://nano-gpt.com/models/image). Pour obtenir les détails exacts dont l'Agent a besoin, ouvrez le catalogue des modèles dans votre navigateur :

```text
https://api.nano-gpt.com/api/v1/images/models
```

Il renvoie une longue liste JSON avec une entrée par modèle. Trois champs de chaque entrée comptent ici :

- `id` est la valeur à placer dans `MODEL`.
- `supported_parameters.resolutions` liste les tailles acceptées par le modèle. L'une d'elles va dans `SIZE`.
- `pricing.per_image` indique le prix d'une image pour chaque taille, en dollars américains.

Les noms de taille diffèrent d'un modèle à l'autre. Certains utilisent `1024x1024`, d'autres `1024*1024`, et d'autres encore des noms comme `1k` ou `2k`. Copiez la taille exactement telle que le catalogue l'écrit pour votre modèle. Une taille que le modèle ne prend pas en charge est la cause la plus fréquente d'échec d'une requête après un changement de modèle.

Voici quelques-uns des modèles texte-image que NanoGPT liste au moment de la rédaction, avec le prix d'une image à la taille indiquée :

| Modèle               | ID du modèle                                 | Exemple de taille | Prix par image | Remarques                                                                                |
| -------------------- | -------------------------------------------- | ----------------- | -------------- | ---------------------------------------------------------------------------------------- |
| HiDream-I1 Fast      | `hidream-i1-fast`                            | `1024x1024`       | 0,0034 $       | La version rapide de HiDream I1, pour des images fréquentes à faible coût.               |
| Stable Diffusion XL  | `fast-sdxl`                                  | `1024x1024`       | 0,0051 $       | Le modèle SDXL sur lequel reposent de nombreux modèles d'images locaux de Layla.         |
| WAI Illustrious SDXL | `wai-illustrious-sdxl`                       | `1024x1024`       | 0,0051 $       | Un modèle SDXL anime, adapté aux personnages d'anime et au jeu de rôle IA.               |
| FLUX.3 Image Klein   | `blackforestlabs/flux-3/klein/text-to-image` | `1024x1024`       | 0,009 $        | Un modèle FLUX rapide de Black Forest Labs. Tailles jusqu'à `4096x4096`.                 |
| FLUX.2 [klein] 9B    | `flux-2-klein-9b`                            | `1024*1024`       | 0,01 $         | Notez le `*` dans ses noms de taille.                                                    |
| HiDream I1 Full      | `hidream`                                    | `1024x1024`       | 0,0153 $       | Le modèle utilisé par défaut par cet Agent. Le même prix pour toutes les tailles.        |
| Seedream 5.5         | `bytedance/seedream-v5.5`                    | `1k`              | 0,02 $         | Le modèle de ByteDance. `2k` coûte 0,035 $.                                              |
| Qwen Image 3         | `qwen-image-3`                               | `1k`              | 0,03 $         | Accepte `1k` et `2k`.                                                                    |
| GPT Image 2.6 Flare  | `gpt-image-2.6-flare`                        | `1k`              | environ 0,09 $ | Le modèle d'OpenAI, facturé à l'utilisation, donc le prix varie d'une requête à l'autre. |

Les prix et les modèles changent souvent, consultez donc le catalogue avant de choisir. Vous pouvez changer de modèle à tout moment en modifiant deux lignes du code, comme décrit dans [Les réglages en haut](#les-réglages-en-haut).

Pour une image verticale qui remplit l'écran d'un téléphone, choisissez une taille portrait dans la liste du modèle, comme `768x1360` ou `832x1248` pour HiDream.

## Étape 1 : désactiver la génération d'images par défaut de Layla

Ouvrez vos _Paramètres d'inférence_, faites défiler jusqu'à la section _Génération d'images_ et sélectionnez le modèle de génération d'images. Dans la liste _Select Model_, choisissez **No Image Generation** (aucune génération d'images).

![L'écran Paramètres d'inférence avec la liste Select Model ouverte et No Image Generation sélectionné.](./no-img-gen-settings.jpg)

La génération d'images intégrée de Layla lit la même balise `<stable_diffusion_prompt>` dans la réponse d'un personnage. Si un modèle est encore sélectionné, Layla génère sa propre image à partir de la balise et vous recevez deux images. Avec _No Image Generation_ sélectionné, la balise est laissée à l'Agent. [Comment activer la génération d'images dans Layla](/fr/how-to-enable-image-generation-in-layla/) montre où se trouve ce réglage.

Si vous utilisez déjà l'[Agent OpenRouter](/fr/how-to-use-the-openrouter-image-generation-agent/), l'[Agent Nano Banana](/fr/how-to-use-the-google-nano-banana-image-generation-agent/) ou un autre Agent qui réagit à `<stable_diffusion_prompt>`, désactivez-le pour la même raison.

## Étape 2 : créer un nouvel Agent

Ouvrez la mini-app _Agents_. Le moyen le plus rapide de commencer un nouvel Agent est de copier un Agent existant et de remplacer son contenu :

1. Sur la carte de n'importe quel Agent, sélectionnez **More**, puis **Duplicate**.
2. Sur la copie, sélectionnez **Edit**. L'écran _Edit Agent_ s'ouvre avec les informations de l'Agent, ses déclencheurs et son enchaînement d'outils.
3. Supprimez les déclencheurs existants de la copie avec l'icône de corbeille de chacun, et retirez chacun de ses outils avec **Remove tool**, afin de partir d'un Agent vide.

Si vous préférez sauter les étapes de construction, téléchargez le fichier de l'Agent depuis cet article et utilisez plutôt le bouton **Import** en haut de la mini-app _Agents_. Passez ensuite à l'[Étape 7](#étape-7--ajouter-votre-clé-api). Un Agent importé est désactivé au départ, activez donc l'interrupteur de sa carte.

## Étape 3 : nommer l'Agent et ajouter le prompt système

Remplissez les trois champs en haut de l'écran _Edit Agent_ :

- **Name** : `NanoGPT Image Generation (JS)`, ou tout nom que vous reconnaîtrez.
- **Description** : une phrase pour votre propre référence, par exemple « Génère des images avec l'API d'images NanoGPT à partir du prompt que l'IA écrit dans une balise stable_diffusion_prompt. »
- **System Prompt** : collez le texte ci-dessous. Il est rédigé en anglais, comme dans le fichier de l'Agent.

```text
{{char}} can create images. Whenever {{user}} asks to see, draw, paint, picture or imagine something, or a visual would help the conversation, {{char}} writes an image prompt inside <stable_diffusion_prompt></stable_diffusion_prompt> tags. The image is then generated and shown in the chat automatically, so {{char}} never says it cannot create images and never describes the image as already visible before it is generated.

Rules for the tag:
- Use at most one <stable_diffusion_prompt> tag per reply, and place it at the end of the reply.
- Write the prompt in English as a comma-separated list of descriptive phrases: subject first, then appearance, clothing, pose and action, setting and background, lighting, camera angle and framing, art style or medium, and quality words.
- Be concrete and visual. Name colours, materials, time of day and mood. Do not use names the image model would not know; describe the person or thing instead.
- When the image shows {{char}} or {{user}}, describe their appearance in full inside the prompt every time.
- Keep the prompt on a single line, under 75 words, with no quotation marks, backticks or other tags inside it.

Example:
Here is the lighthouse I told you about.
<stable_diffusion_prompt>old stone lighthouse on a rocky cliff, stormy sea crashing below, dramatic overcast sky, warm light glowing from the lantern room, seagulls, wide angle, cinematic lighting, highly detailed digital painting</stable_diffusion_prompt>
```

[Le prompt système](#1-le-prompt-système), plus bas, explique chacune de ses parties.

## Étape 4 : ajouter le déclencheur

Sous _Triggers_, ajoutez un déclencheur et choisissez **Regex** dans la liste des types de déclencheurs. Configurez-le ainsi :

- **Regex** : collez ce motif.

  ```text
  /<stable_diffusion_prompt>(.*?)</stable_diffusion_prompt>/s
  ```

- **Match on agent output** : activez cette option. Le déclencheur vérifie alors les réponses de votre personnage au lieu de vos messages.
- **Group** : laissez la valeur _ANY OF THESE_ (OU). Avec un seul déclencheur, le groupe ne change rien.

## Étape 5 : ajouter l'outil Eval

Sous _Tools flow_, sélectionnez **Add tool** et choisissez **Eval**. Laissez _Input mode_ sur **Fixed inputs**, et collez ce code dans le champ `code` :

```js
(async () => {
  // ---- configure these ----
  const API_KEY = "YOUR_NANOGPT_API_KEY"; // https://nano-gpt.com/api
  const MODEL = "hidream"; // any id from GET https://api.nano-gpt.com/api/v1/images/models
  const SIZE = "1024x1024";
  // --------------------------

  const PROMPT = String.raw`{{match$1}}`.trim();
  const ENDPOINT = "https://api.nano-gpt.com/v1/images/generations";

  if (!PROMPT) throw new Error("The <stable_diffusion_prompt> tag was empty.");
  if (!API_KEY || API_KEY.startsWith("YOUR_"))
    throw new Error("Set API_KEY in the NanoGPT Image Generation (JS) agent.");

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      prompt: PROMPT,
      n: 1,
      size: SIZE,
      response_format: "b64_json",
    }),
  });
  const text = await response.text();
  if (!response.ok)
    throw new Error(
      `nano-gpt returned HTTP ${response.status}: ${text.slice(0, 500)}`,
    );

  const item = (JSON.parse(text).data || [])[0];
  if (!item)
    throw new Error(`nano-gpt returned no image: ${text.slice(0, 500)}`);

  let base64;
  if (item.b64_json) {
    base64 = item.b64_json.replace(/^data:[^,]*,/, "");
  } else if (item.url) {
    // nano-gpt may answer with a link instead of base64; download it and encode it ourselves.
    const download = await fetch(item.url);
    if (!download.ok)
      throw new Error(`Image download failed: HTTP ${download.status}`);
    base64 = (await download.bytes()).toBase64();
  } else {
    throw new Error(
      `nano-gpt response had no b64_json or url: ${text.slice(0, 500)}`,
    );
  }

  const ext = base64.startsWith("/9j/")
    ? "jpg"
    : base64.startsWith("UklGR")
      ? "webp"
      : "png";
  const filename = `nanogpt_${Date.now()}.${ext}`;

  // Saved in the character workspace, the folder display-image resolves relative paths against.
  await layla.utils.saveFile(filename, base64);

  // The result is the next tool's input: display-image reads it as the image path.
  return filename;
})();
```

_Fixed inputs_ signifie que le code s'exécute exactement tel qu'il est écrit. L'autre mode, _AI decides_, demanderait au modèle de langage d'écrire lui-même l'entrée de l'outil, ce dont cet Agent n'a pas besoin.

## Étape 6 : ajouter l'outil Display Image

Sélectionnez à nouveau **Add tool** et choisissez **Display Image**. Il apparaît sous _Eval_ dans l'enchaînement d'outils, il s'exécute donc en second. Définissez son champ `imagePath` sur :

```text
{{input}}
```

Sélectionnez **Save changes**. De retour dans la liste des Agents, vérifiez que l'interrupteur de la carte de l'Agent est activé.

## Étape 7 : ajouter votre clé API

Ouvrez l'Agent avec **Edit** et repérez cette ligne près du début du code d'_Eval_ :

```js
const API_KEY = "YOUR_NANOGPT_API_KEY";
```

Remplacez `YOUR_NANOGPT_API_KEY` par votre clé, en conservant les guillemets. Si vous avez choisi un autre modèle ou une autre taille, modifiez `MODEL` et `SIZE` sur les deux lignes suivantes. Enregistrez l'Agent.

Votre clé est désormais stockée dans l'Agent. Avant de partager l'Agent, ou de l'exporter avec **Share**, remettez le texte de remplacement à la place de la clé.

## Étape 8 : tester l'Agent

Sélectionnez **Test** sur la carte de l'Agent. Dans l'écran de test :

1. Activez **Test as output**. Le déclencheur de l'Agent ne regarde que les réponses du personnage, l'entrée de test doit donc elle aussi être traitée comme une réponse.
2. Saisissez une réponse qui contient la balise, par exemple :

   ```text
   <stable_diffusion_prompt>red fox curled up in fresh snow, soft morning light, shallow depth of field, wildlife photograph</stable_diffusion_prompt>
   ```

3. Lancez le test.

La liste _Activity_ affiche l'état de chaque outil pendant son exécution. Un test réussi envoie une vraie requête à NanoGPT, qui coûte une image, et les deux outils se terminent sans erreur. Si le script s'arrête sur une erreur, le message d'erreur apparaît sur l'étape _Eval_. La section [Dépannage](#dépannage) liste les erreurs courantes. [Exploration approfondie des Agents Layla](/fr/deep-dive-into-layla-agents/) présente l'écran de test plus en détail.

Le test ne place pas l'image dans un chat. Une fois le test réussi, essayez l'Agent dans une vraie conversation.

## Étape 9 : demander une image dans le chat

Démarrez un chat et demandez une image, par exemple « montre-moi un phare sur une falaise au crépuscule ». Le personnage répond avec un prompt d'image à la fin de son message, l'Agent s'exécute, et l'image apparaît dans le chat après quelques secondes.

## Fonctionnement du code de l'Agent d'images NanoGPT

Cette section suit l'Agent à travers chacune des parties que vous avez construites et explique pourquoi elle est écrite ainsi. [Exploration approfondie des Agents Layla](/fr/deep-dive-into-layla-agents/) présente ces mêmes éléments de façon générale.

### 1. Le prompt système

Le prompt système d'un Agent est ajouté au prompt système de votre personnage à chaque tour tant que l'Agent est activé, que l'Agent s'exécute ou non. Avant que le prompt n'atteigne le modèle, Layla remplace `{{char}}` par le nom de votre personnage et `{{user}}` par le vôtre.

Chaque partie du prompt a un rôle :

- **« {{char}} can create images. »** (« {{char}} peut créer des images. ») De nombreux modèles de langage sont entraînés à dire qu'ils ne peuvent pas créer d'images. Affirmer cette capacité, et ajouter « never says it cannot create images » (ne dit jamais qu'il ne peut pas créer d'images), empêche le personnage de refuser.
- **« Whenever {{user}} asks to see, draw, paint, picture or imagine something, or a visual would help the conversation »** (chaque fois que {{user}} demande à voir, dessiner, peindre, représenter ou imaginer quelque chose, ou qu'un visuel aiderait la conversation) décide du moment où les images apparaissent. La dernière partie permet au personnage d'envoyer une image sans qu'on la lui demande. Chaque image coûte de l'argent, supprimez donc « or a visual would help the conversation » si vous ne voulez des images que sur demande.
- **« Never describes the image as already visible before it is generated »** (ne décrit jamais l'image comme déjà visible avant qu'elle soit générée) évite des réponses comme « Comme vous pouvez le voir sur l'image… », qui sonneraient bizarrement pendant que l'image est encore en cours de création.
- **« At most one tag per reply, at the end »** (une balise au maximum par réponse, à la fin) compte parce que le déclencheur ne lit que la première balise d'une réponse. Une deuxième balise serait ignorée, et une balise placée à la fin garde l'image à côté du texte qui la présente.
- **« A comma-separated list of descriptive phrases »** (une liste de groupes de mots descriptifs séparés par des virgules) et l'ordre indiqué (sujet, apparence, pose, décor, éclairage, cadrage, style) correspondent au style de prompt auquel les modèles d'images comme HiDream et Stable Diffusion répondent le mieux.
- **« Do not use names the image model would not know »** (n'utilisez pas de noms que le modèle d'images ne connaîtrait pas) est là parce qu'un modèle d'images n'a jamais entendu parler de votre personnage. « Une femme aux cheveux roux courts et aux yeux verts » produit un résultat cohérent, ce qui n'est pas le cas d'un nom.
- **« Describe their appearance in full inside the prompt every time »** (décrivez leur apparence en entier dans le prompt à chaque fois) découle du même constat. Le modèle d'images ne voit que ce prompt, pas la conversation, donc chaque prompt doit contenir la description complète.
- **« Single line, under 75 words, with no quotation marks, backticks or other tags »** (une seule ligne, moins de 75 mots, sans guillemets, accents graves ni autres balises) protège le script. Un accent grave dans le prompt casserait le code, comme expliqué dans [Les réglages en haut](#les-réglages-en-haut). La limite de mots garde les prompts courts et ciblés, ce qui convient aux modèles d'images plus anciens : l'encodeur de texte de Stable Diffusion ne lit que 75 tokens à la fois, soit moins que 75 mots.
- **L'exemple** montre le format exact. Les modèles de langage suivent un exemple de façon plus fiable qu'une description de format.

### 2. Le déclencheur

Le déclencheur est un déclencheur _Regex_ avec _Match on agent output_ activé, il vérifie donc chacune des réponses terminées du personnage. Son motif est :

```text
/<stable_diffusion_prompt>(.*?)</stable_diffusion_prompt>/s
```

- Layla lit le texte entre le premier `/` et le dernier `/` comme le motif, et les lettres après le dernier `/` comme des drapeaux. Le `/` de la balise fermante fait partie du motif, il n'a donc pas besoin d'être échappé.
- Les balises ouvrante et fermante correspondent aux balises littérales de la réponse.
- `(.*?)` est un groupe de capture. Il collecte tout ce qui se trouve entre les balises. Le `?` lui fait s'arrêter à la première balise fermante au lieu de la dernière.
- Le drapeau `s` permet à `.` de correspondre aussi aux sauts de ligne, de sorte que le déclencheur fonctionne encore si le modèle répartit le prompt sur plusieurs lignes.

Lorsque le motif correspond, la correspondance complète devient `{{match$0}}` et le texte capturé par le groupe devient `{{match$1}}`. Le code d'_Eval_ utilise `{{match$1}}`, c'est-à-dire uniquement le prompt, sans les balises.

Le déclencheur lit la réponse sans ses blocs de réflexion, de sorte qu'un modèle de raisonnement qui écrit la balise pendant sa réflexion ne démarre pas l'Agent. Seule la balise de la réponse visible compte.

### 3. L'outil Eval : appeler l'API d'images NanoGPT

_Eval_ exécute du JavaScript dans un environnement QuickJS isolé à l'intérieur de Layla. Un nouvel environnement est créé pour chaque exécution, puis supprimé. Il n'a ni page web ni modules Node.js, mais il fournit ce dont cet Agent a besoin :

- `fetch` pour les requêtes web, avec des réponses qui prennent en charge `.text()`, `.json()`, `.bytes()` et `.arrayBuffer()`.
- `atob`, `btoa` et `toBase64()` sur les tableaux d'octets, pour le texte base64.
- `setTimeout` et `AbortController`.
- Un objet global nommé `layla`, qui donne aux scripts accès aux fonctions de Layla, comme l'enregistrement de fichiers.

_Eval_ renvoie la valeur de la dernière expression du script. Si cette valeur est une promesse, _Eval_ attend d'abord qu'elle se termine. Ce qu'il renvoie devient l'entrée de l'outil suivant.

#### La fonction async englobante

```js
(async () => {
  // ...
})();
```

Tout le script se trouve dans une fonction fléchée asynchrone qui s'appelle elle-même immédiatement. Ce schéma remplit deux rôles. Il permet au code d'utiliser `await` pour attendre le réseau, et il lui permet d'utiliser `return` pour renvoyer son résultat. L'appel de la fonction est la dernière expression du script, donc _Eval_ attend la promesse qu'elle renvoie et utilise son résultat, le nom du fichier, comme sortie de l'outil.

#### Les réglages en haut

```js
const API_KEY = "YOUR_NANOGPT_API_KEY"; // https://nano-gpt.com/api
const MODEL = "hidream"; // any id from GET https://api.nano-gpt.com/api/v1/images/models
const SIZE = "1024x1024";

const PROMPT = String.raw`{{match$1}}`.trim();
const ENDPOINT = "https://api.nano-gpt.com/v1/images/generations";
```

Tout ce que vous pourriez vouloir modifier se trouve au même endroit :

- `API_KEY` est votre clé NanoGPT.
- `MODEL` est l'`id` du modèle dans le catalogue de NanoGPT.
- `SIZE` est l'une des tailles de la liste `supported_parameters.resolutions` du modèle, écrite exactement comme dans le catalogue.
- `ENDPOINT` est l'adresse de génération d'images compatible OpenAI de NanoGPT. Elle est la même pour tous les modèles. Comme elle suit le format de l'API d'images d'OpenAI, le même code fonctionne avec d'autres services qui proposent un endpoint `images/generations` compatible OpenAI, une fois l'adresse et la clé modifiées.

`PROMPT` mérite qu'on s'y arrête. Avant l'exécution du code, Layla remplace `{{match$1}}` par le texte capturé par le déclencheur, de sorte que le prompt d'image fait partie du programme lui-même. Layla colle le texte exactement tel quel, sans échapper aucun caractère. C'est pourquoi le prompt est placé dans un littéral de gabarit, le texte entre les accents graves :

- Un littéral de gabarit peut contenir des guillemets et des sauts de ligne, qui mettraient fin prématurément à une chaîne ordinaire `"…"` et casseraient le script.
- `String.raw` conserve les barres obliques inverses telles qu'elles ont été saisies, au lieu de les lire comme des séquences d'échappement comme `\n`.
- `.trim()` supprime les espaces et sauts de ligne au début et à la fin du prompt.

Un littéral de gabarit se termine malgré tout à un accent grave, et `${` à l'intérieur démarre un morceau de code. L'un ou l'autre dans le prompt casserait le script, c'est pourquoi le prompt système interdit les accents graves.

#### Vérifier les entrées

```js
if (!PROMPT) throw new Error("The <stable_diffusion_prompt> tag was empty.");
if (!API_KEY || API_KEY.startsWith("YOUR_"))
  throw new Error("Set API_KEY in the NanoGPT Image Generation (JS) agent.");
```

Le script s'arrête tôt, avec un message lisible, lorsque la balise était vide ou que la clé n'a pas été renseignée. Inutile de payer une requête qui ne peut pas fonctionner.

Lorsqu'un script _Eval_ lève une erreur, l'Agent s'arrête et _Display Image_ ne s'exécute pas. Layla renvoie le message d'erreur au modèle de langage, de sorte que, dans un chat, votre personnage peut vous dire que quelque chose s'est mal passé. Dans l'écran de test, le message apparaît sur l'étape _Eval_.

#### Envoyer la requête

```js
const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: MODEL,
    prompt: PROMPT,
    n: 1,
    size: SIZE,
    response_format: "b64_json",
  }),
});
const text = await response.text();
```

C'est la partie qui communique avec NanoGPT :

- `fetch` envoie une requête `POST` à l'endpoint, et `await` attend la réponse.
- L'en-tête `Authorization` transporte la clé API sous forme de jeton bearer, le format qu'attend NanoGPT. La clé ne fait pas partie de l'adresse web.
- L'en-tête `Content-Type` indique à NanoGPT que le corps est du JSON.
- `JSON.stringify` transforme les données de la requête en texte JSON. `model`, `prompt` et `size` proviennent des réglages. `n: 1` demande une seule image. `response_format: "b64_json"` demande à NanoGPT d'envoyer l'image elle-même, sous forme de texte base64, au lieu d'un lien vers celle-ci.
- `response.text()` lit toute la réponse sous forme de texte. Le script la lit comme du texte au lieu d'appeler directement `response.json()`, afin de pouvoir inclure la réponse brute dans un message d'erreur en cas de problème.

La [documentation sur la génération d'images](https://docs.nano-gpt.com/api-reference/endpoint/image-generation-openai) de NanoGPT liste d'autres champs que vous pouvez ajouter au corps. Certains, comme `seed`, `guidance_scale` et `num_inference_steps`, ne fonctionnent qu'avec certains modèles.

#### Vérifier l'état de la réponse

```js
if (!response.ok)
  throw new Error(
    `nano-gpt returned HTTP ${response.status}: ${text.slice(0, 500)}`,
  );
```

`response.ok` vaut true lorsque le code d'état HTTP se situe dans les 200, ce qui signifie que la requête a réussi. Sinon, le script s'arrête et inclut dans l'erreur le code d'état et les 500 premiers caractères de la réponse de NanoGPT. NanoGPT explique le problème dans cette réponse, si bien qu'une mauvaise clé, un solde vide ou une taille que le modèle n'accepte pas apparaît sous forme de message clair dans l'écran de test.

#### Trouver l'image dans la réponse

```js
const item = (JSON.parse(text).data || [])[0];
if (!item) throw new Error(`nano-gpt returned no image: ${text.slice(0, 500)}`);
```

Une réponse réussie de NanoGPT ressemble à ceci :

```json
{
  "created": 1795351940,
  "data": [{ "b64_json": "iVBORw0KGgo..." }],
  "cost": 0.0153,
  "remainingBalance": 4.9847
}
```

`JSON.parse` transforme le texte en objet. `data` est la liste des images, et `[0]` prend la première. La partie `|| []` utilise une liste vide lorsque `data` est absent, de sorte que le script signale « no image » au lieu de planter. La réponse indique aussi le coût de l'image et le solde qu'il vous reste.

#### Obtenir l'image en base64

```js
let base64;
if (item.b64_json) {
  base64 = item.b64_json.replace(/^data:[^,]*,/, "");
} else if (item.url) {
  const download = await fetch(item.url);
  if (!download.ok)
    throw new Error(`Image download failed: HTTP ${download.status}`);
  base64 = (await download.bytes()).toBase64();
} else {
  throw new Error(
    `nano-gpt response had no b64_json or url: ${text.slice(0, 500)}`,
  );
}
```

Le base64 est une manière d'écrire des données binaires, comme une image, avec des lettres et des chiffres ordinaires. La fonction d'enregistrement de fichiers de Layla attend du base64, donc ce bloc garantit que le script obtient du texte base64, quelle que soit la forme utilisée par NanoGPT :

- **`b64_json`** : le cas habituel, puisque la requête l'a demandé. L'appel à `replace` supprime un éventuel préfixe `data:image/png;base64,`, car le fichier ne doit contenir que les données base64. En l'absence de préfixe, `replace` ne change rien.
- **`url`** : NanoGPT peut répondre par un lien à la place, pour certains modèles ou lorsqu'il ne peut pas envoyer de base64. Le script télécharge l'image avec un second `fetch`, la lit sous forme d'octets bruts avec `.bytes()` et convertit les octets en base64 avec `.toBase64()`. Les liens de NanoGPT expirent au bout d'environ une journée, c'est pourquoi le script enregistre une copie au lieu de conserver le lien.
- **Ni l'un ni l'autre** : le script s'arrête avec une erreur qui montre ce que NanoGPT a envoyé.

#### Choisir un nom de fichier

```js
const ext = base64.startsWith("/9j/")
  ? "jpg"
  : base64.startsWith("UklGR")
    ? "webp"
    : "png";
const filename = `nanogpt_${Date.now()}.${ext}`;
```

Les modèles ne renvoient pas tous le même format d'image, et la réponse de NanoGPT n'indique pas toujours lequel elle a envoyé. Le script le déduit des premiers caractères du texte base64. Chaque format d'image commence par une signature fixe, et cette signature s'encode toujours avec les mêmes caractères base64 :

- `/9j/` est le début d'un fichier JPEG.
- `UklGR` est le début d'un fichier WebP.
- Tout le reste est enregistré en PNG, le format le plus courant. Un fichier PNG s'encode en `iVBOR`.

`Date.now()` ajoute l'heure actuelle en millisecondes, de sorte que chaque image reçoit son propre nom de fichier et qu'une nouvelle image ne remplace jamais une image précédente de votre historique de chat.

#### Enregistrer le fichier et renvoyer son nom

```js
await layla.utils.saveFile(filename, base64);
return filename;
```

`layla.utils.saveFile` décode le texte base64 et écrit le fichier dans le dossier de travail du personnage, un dossier privé qui appartient au personnage avec lequel vous discutez. Le chemin est relatif à ce dossier.

Le script renvoie ensuite le nom du fichier. Ce nom est la sortie de l'outil _Eval_.

### 4. L'outil Display Image

Le deuxième outil est _Display Image_, et son seul réglage est :

```text
{{input}}
```

`{{input}}` est remplacé par la sortie de l'outil précédent, c'est-à-dire le nom de fichier renvoyé par le script. _Display Image_ cherche d'abord ce nom dans le dossier de travail du personnage, là où le script l'a enregistré. Il copie le fichier dans le stockage d'images de chat de Layla et le joint à la réponse du personnage, et l'image apparaît dans le chat.

_Display Image_ ne renvoie aucun texte, donc l'Agent se termine discrètement une fois l'image affichée. Le modèle de langage n'est pas invité à répondre de nouveau.

## Personnaliser l'Agent : autres modèles, images au format téléphone et jeu de rôle IA

Toutes ces modifications partent du même Agent :

- **Utiliser un autre modèle.** Remplacez `MODEL` par l'`id` d'un autre modèle et `SIZE` par l'une de ses tailles, puis testez à nouveau l'Agent. Pour les personnages d'anime, un modèle SDXL anime comme `wai-illustrious-sdxl` convient généralement mieux qu'un modèle photographique.
- **Créer des images verticales pour l'écran de votre téléphone.** Définissez `SIZE` sur une taille portrait de la liste de votre modèle, comme `768x1360` pour HiDream ou `1088x1920` pour HiDream-I1 Fast.
- **Générer une image après chaque message.** Remplacez le premier paragraphe du prompt système par une instruction demandant de terminer chaque réponse par un prompt d'image de la scène en cours, comme dans [Créer un Agent de génération d'images](/fr/creating-an-image-generation-agent/). Cela convient au jeu de rôle IA et à la narration, mais chaque réponse coûte alors une image. Un modèle peu coûteux comme `hidream-i1-fast` limite la dépense.
- **Garder des images cohérentes pour votre personnage IA.** Dans le _Scénario_ du personnage, ajoutez une instruction comme : « Chaque fois que tu écris un `<stable_diffusion_prompt>`, décris-toi comme une femme approchant la trentaine, aux cheveux roux courts, aux yeux verts et aux taches de rousseur. » Le modèle répète alors la même apparence dans chaque prompt. Ajouter un style artistique fixe, comme « illustration à l'aquarelle », à la même instruction aide aussi.
- **Ajouter des réglages de génération.** Pour les modèles qui les prennent en charge, ajoutez des champs comme `seed: 42` à l'objet passé à `JSON.stringify`. Une graine fixe fait que des prompts répétés donnent des images similaires.
- **Écrire un Agent pour un autre service.** Le prompt système, le déclencheur et _Display Image_ restent identiques pour n'importe quel service d'images. Seuls la requête et la façon dont le script trouve l'image dans la réponse changent. L'[Agent OpenRouter](/fr/how-to-use-the-openrouter-image-generation-agent/) et l'[Agent Nano Banana](/fr/how-to-use-the-google-nano-banana-image-generation-agent/) sont deux autres exemples du même schéma.

Un seul Agent d'images doit être activé à la fois, car ils réagissent tous à la même balise.

## Dépannage

### Pourquoi ai-je reçu deux images ?

Soit la génération d'images intégrée de Layla est encore activée, soit un autre Agent qui réagit à `<stable_diffusion_prompt>` est activé. Sélectionnez _No Image Generation_ dans les Paramètres d'inférence et désactivez les autres Agents d'images.

### L'Agent affiche « Set API_KEY in the NanoGPT Image Generation (JS) agent. »

Le texte de remplacement de la clé figure encore dans le code. Ouvrez l'Agent, modifiez le code d'_Eval_ et remplacez `YOUR_NANOGPT_API_KEY` par votre clé.

### Pourquoi ma clé API NanoGPT ne fonctionne-t-elle pas ?

Lorsque NanoGPT rejette une requête, l'Agent s'arrête avec une erreur qui commence par « nano-gpt returned HTTP », suivie du code d'état et de l'explication de NanoGPT. Les causes habituelles sont :

- **Une clé erronée ou supprimée.** Copiez à nouveau la clé depuis la [page API](https://nano-gpt.com/api), ou créez-en une nouvelle.
- **Un solde vide.** Ajoutez des fonds sur la [page Balance](https://nano-gpt.com/balance).
- **Une taille ou un ID de modèle que le modèle n'accepte pas.** Vérifiez l'entrée du modèle dans le catalogue et copiez exactement l'`id` et une taille de `supported_parameters.resolutions`, en respectant l'utilisation de `x`, de `*` ou d'un nom comme `1k`.

### Le test indique que l'Agent n'a pas été déclenché

Activez **Test as output**, et vérifiez que l'entrée de test contient à la fois la balise ouvrante et la balise fermante.

### Le personnage n'envoie jamais d'image

Vérifiez que l'interrupteur de l'Agent est activé, afin que son prompt système soit ajouté au chat. Les petits modèles locaux oublient parfois la balise. Une demande directe, par exemple « dessine-moi une image de… », fonctionne généralement. Si le personnage écrit la balise mais qu'aucune image n'apparaît, lancez le **Test** de l'Agent avec la réponse exacte du personnage pour voir quelle étape échoue.

### Une image a été refusée ou est revenue vide

Chaque entreprise applique sa propre politique de contenu à ses modèles. Un prompt refusé par un modèle peut fonctionner avec un autre. Le script affiche la réponse envoyée par NanoGPT, donc l'écran de test en indique la raison.

## Questions fréquentes

### Comment obtenir une clé API NanoGPT ?

Connectez-vous sur [nano-gpt.com](https://nano-gpt.com), ajoutez des fonds sur la page Balance, puis sélectionnez **API** dans la barre latérale et sélectionnez **Create API key**. Utilisez l'icône en forme d'œil pour afficher la clé ou l'icône de copie pour la copier. Les clés NanoGPT commencent par `sk-nano-`.

### Combien coûte la génération d'images NanoGPT ?

Chaque modèle a son propre prix, indiqué dans le catalogue de NanoGPT. Au moment de la rédaction, HiDream I1 Full, le modèle utilisé par défaut par cet Agent, coûte 0,0153 $ par image, et les modèles les moins chers coûtent moins d'un demi-cent. Votre solde NanoGPT indique ce que vous avez dépensé, et chaque réponse de l'API inclut le coût de l'image.

### Faut-il un abonnement NanoGPT pour la génération d'images ?

Non. NanoGPT fonctionne avec un solde prépayé, et chaque image est payée sur ce solde. NanoGPT propose aussi un abonnement mensuel facultatif, et sa [page des tarifs](https://nano-gpt.com/pricing) indique ce qu'il comprend.

### Quel est l'endpoint de l'API de génération d'images NanoGPT ?

L'endpoint compatible OpenAI est `https://api.nano-gpt.com/v1/images/generations`, appelé avec `POST` et votre clé dans l'en-tête `Authorization: Bearer`. Le même endpoint sert tous les modèles d'images, et le champ `model` choisit celui qui s'exécute. Le catalogue des modèles se trouve à l'adresse `https://api.nano-gpt.com/api/v1/images/models`.

### Puis-je utiliser cet Agent avec une autre API de génération d'images compatible OpenAI ?

En général, oui. Remplacez `ENDPOINT` par l'adresse `images/generations` de l'autre service, `API_KEY` par sa clé, et `MODEL` et `SIZE` par des valeurs qu'il accepte. Le script gère déjà les deux formats de réponse utilisés par les API d'images compatibles OpenAI, `b64_json` et `url`.

### Quels modèles d'images NanoGPT autorisent les contenus pour adultes ?

Le catalogue de NanoGPT marque chaque modèle avec un champ `capabilities.nsfw`. Au moment de la rédaction, 37 de ses modèles texte-image sont marqués `true`, dont HiDream O1 Image, Qwen Image 3 Uncensored et plusieurs modèles SDXL anime et réalistes comme WAI Illustrious SDXL. Vérifiez ce champ pour le modèle que vous choisissez avant de vous y fier. Les conditions d'utilisation de NanoGPT s'appliquent toujours à chaque requête. Pour une génération d'images sans aucun service extérieur, utilisez les [modèles Stable Diffusion locaux](/fr/how-to-enable-image-generation-in-layla/) de Layla.

### Puis-je utiliser NanoGPT pour le chat en plus des images ?

Oui. NanoGPT propose des modèles de langage via une API compatible OpenAI à l'adresse `https://api.nano-gpt.com/api/v1`. Ajoutez-la dans Layla avec la même clé, comme décrit dans [Comment connecter Layla à n'importe quelle API compatible avec OpenAI](/fr/how-to-connect-layla-to-any-openai-compatible-api/), et cet Agent ajoute les images.

### Existe-t-il une application NanoGPT pour Android ?

NanoGPT est un site web et une API. Layla est une application Android qui fonctionne avec lui : elle peut discuter avec les modèles de langage de NanoGPT grâce à sa connexion à une API compatible OpenAI, et générer des images avec les modèles d'images de NanoGPT grâce à cet Agent.

### Puis-je utiliser mes personnages SillyTavern avec la génération d'images NanoGPT ?

Oui. SillyTavern dispose d'une source d'images NanoGPT intégrée, et cet Agent vous offre une configuration similaire dans une application de chat sur votre téléphone. Layla importe les [cartes de personnage TavernPNG](/fr/how-to-import-tavernpng-characters-in-layla/), le format utilisé par SillyTavern, ainsi que les [presets SillyTavern](/fr/how-to-use-sillytavern-presets-in-layla/), et cet Agent fonctionne avec n'importe quel personnage.

### Un chatbot IA peut-il envoyer des images sur Android ?

Oui. Avec cet Agent, un personnage Layla envoie une image chaque fois que vous en demandez une, ou après chaque message si vous le configurez ainsi. Layla peut aussi envoyer des images sans aucun service cloud, grâce à des modèles Stable Diffusion qui s'exécutent sur votre téléphone, comme décrit dans [Comment activer la génération d'images dans Layla](/fr/how-to-enable-image-generation-in-layla/).

### Ai-je besoin de la mini-app Interpréteur Python ?

Non. L'Agent utilise l'outil _Eval_, qui exécute du JavaScript à l'intérieur même de Layla.

### Mon prompt est-il privé ?

Le prompt d'image est envoyé à NanoGPT et à l'entreprise qui exploite le modèle que vous avez choisi. La [politique de confidentialité](https://nano-gpt.com/legal/privacy-policy) de NanoGPT indique qu'il ne stocke pas par défaut le contenu des prompts sur ses serveurs, mais sa documentation précise aussi que les entreprises qui exploitent les modèles d'images peuvent conserver les prompts et les images selon leurs propres politiques. Si vous discutez avec un modèle local, le reste de votre conversation reste sur votre appareil.

### Puis-je utiliser cet Agent sans connexion Internet ?

Non. L'Agent appelle les serveurs de NanoGPT. Pour une génération d'images entièrement réalisée sur votre téléphone, utilisez l'un des modèles locaux décrits dans [Comment activer la génération d'images dans Layla](/fr/how-to-enable-image-generation-in-layla/).

### Où sont stockées les images générées ?

Le script enregistre chaque image dans le dossier de travail du personnage, et _Display Image_ la copie dans le stockage d'images de chat de Layla, de sorte que l'image reste dans votre historique de chat.

## Conclusion

L'Agent NanoGPT utilise les quatre mêmes éléments que tout Agent de génération d'images dans Layla : un prompt système qui demande un prompt d'image balisé, un déclencheur regex qui le capture, un court script qui échange le prompt contre une image, et _Display Image_ pour placer le résultat dans votre chat. Comme NanoGPT donne accès à plus de 200 modèles d'images via un seul endpoint, le même script fournit à vos personnages IA des images HiDream, FLUX, SDXL ou GPT Image en modifiant deux lignes.

Layla est conçue comme un assistant IA hors ligne pour Android, et ses modèles locaux restent le choix pour un chat et une génération d'images entièrement privés et hors ligne. La génération d'images NanoGPT est une option lorsque vous voulez un modèle en ligne particulier dans vos chats et acceptez la connexion et le coût par image.

## Télécharger l'Agent

<div class="file-download">
  <div class="file-download-info">
    <span class="file-download-label">Fichier de l&#x27;Agent</span>
    <span class="file-download-name">nanogpt-generate-image.json</span>
    <span class="file-download-hint">Utilisez le bouton <em>Import</em> de la mini-app Agents pour l'importer, puis ajoutez votre clé API.</span>
  </div>
  <a class="file-download-button" href="/assets/articles/how-to-create-a-nanogpt-image-generation-agent-in-layla/nanogpt-generate-image.json" download="nanogpt-generate-image.json"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>Télécharger</a>
</div>
