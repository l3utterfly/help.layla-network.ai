---
title: "Génération d'images OpenRouter sur Android : un chat IA qui envoie des images"
description: Utilisez l'API de génération d'images OpenRouter dans Layla pour que vos personnages IA envoient des images dans le chat avec FLUX, Seedream ou Nano Banana. Configuration, tarifs et code.
category: Image generation
order: 55
keywords:
  - génération d'images OpenRouter
  - API de génération d'images OpenRouter
  - modèles de génération d'images OpenRouter
  - tarifs de génération d'images OpenRouter
  - génération d'images OpenRouter gratuite
  - endpoint de l'API d'images OpenRouter
  - clé API OpenRouter
  - clé API OpenRouter qui ne fonctionne pas
  - application OpenRouter pour Android
  - OpenRouter FLUX Klein
  - OpenRouter Nano Banana Pro
  - génération d'images SillyTavern avec OpenRouter
  - FLUX 3 Image Klein
  - API Seedream
  - API GPT Image
  - API de génération d'images la moins chère
  - chat IA avec génération d'images
  - chatbot IA qui envoie des images
  - générateur d'images de personnages IA
  - jeu de rôle IA avec génération d'images
  - images de compagnon IA
  - utiliser sa propre clé API
  - générateur d'images IA pour Android
  - LLM local avec génération d'images dans le cloud
  - Agent de génération d'images Layla
  - Agents Layla
lastUpdated: 2026-11-14
translationKey: how-to-use-the-openrouter-image-generation-agent
ai_translated: true
---

**La génération d'images OpenRouter vous donne une seule clé API pour des modèles d'images de nombreuses entreprises, dont FLUX de Black Forest Labs, Seedream de ByteDance, Nano Banana de Google et GPT Image d'OpenAI.** Ce guide connecte l'API de génération d'images OpenRouter à Layla, une application de chat IA pour Android, afin que vos personnages IA puissent envoyer des images dans le chat. Lorsqu'un personnage décrit une image dans sa réponse, un Agent Layla envoie cette description à OpenRouter, reçoit l'image terminée et l'affiche dans la conversation.

Layla génère déjà des images avec des modèles Stable Diffusion, sur votre appareil ou via Layla Cloud. Un Agent ajoute une autre option : vous choisissez le service, le modèle et les paramètres, et vous utilisez votre propre clé API. [L'API Nano Banana dans Layla](/fr/how-to-use-the-google-nano-banana-image-generation-agent/) fait cela avec un seul modèle de Google. L'Agent OpenRouter suit la même méthode, mais passer à un modèle d'une autre entreprise ne demande de modifier qu'une seule ligne.

L'article montre comment obtenir une clé API OpenRouter et configurer l'Agent, compare les modèles de génération d'images OpenRouter et leurs tarifs, et explique chaque étape du code de l'Agent.

Contrairement aux modèles locaux de Layla, cet Agent nécessite une connexion Internet. Votre description d'image est envoyée à OpenRouter et à l'entreprise qui exécute le modèle, et chaque image est payée avec vos crédits OpenRouter. Si vous discutez avec un modèle local, le reste de votre conversation reste sur votre appareil.

<div class="file-download">
  <div class="file-download-info">
    <span class="file-download-label">Fichier de l&#x27;Agent</span>
    <span class="file-download-name">openrouter-generate-image.json</span>
    <span class="file-download-hint">Il ne fonctionnera pas sans clé API OpenRouter, que l'article explique plus bas.</span>
  </div>
  <a class="file-download-button" href="/assets/articles/how-to-use-the-openrouter-image-generation-agent/openrouter-generate-image.json" download="openrouter-generate-image.json"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>Télécharger</a>
</div>

## Pourquoi utiliser la génération d'images OpenRouter dans Layla ?

Les modèles Stable Diffusion de Layla sont le bon choix lorsque vous voulez que les images soient générées entièrement sur votre appareil. OpenRouter répond à d'autres besoins :

- **De nombreux modèles d'images derrière une seule clé.** FLUX, Seedream, GPT Image, Nano Banana, Qwen Image, Grok Imagine et d'autres utilisent tous la même requête. Vous pouvez essayer un nouveau modèle sans créer un autre compte ni réécrire l'Agent.
- **Des prix bas par image.** Au moment de la rédaction, le modèle que cet Agent utilise par défaut, FLUX 3 Image Klein, coûte 0,009 $ pour une image 1K. OpenRouter répercute le prix de l'entreprise qui exécute le modèle et n'y ajoute aucune marge.
- **Une limite de dépenses sur la clé.** OpenRouter vous permet de donner à chaque clé API sa propre limite de crédit, de sorte que la clé stockée dans votre Agent ne peut jamais dépenser plus que ce que vous autorisez.
- **Une qualité d'image qui ne dépend pas de votre téléphone.** L'image est générée sur un serveur, donc la vitesse du CPU ou du NPU de votre appareil ne limite ni le résultat ni l'attente.
- **Un seul compte OpenRouter pour le chat et les images.** Layla peut aussi utiliser les modèles de langage d'OpenRouter pour la conversation elle-même, via sa [connexion à une API compatible avec OpenAI](/fr/how-to-connect-layla-to-any-openai-compatible-api/). Avec cet Agent, le même compte alimente à la fois les réponses de votre personnage et ses images, et Layla sert ainsi d'application OpenRouter pour Android pour les deux.
- **Ou un modèle de chat local avec des images dans le cloud.** L'Agent ne réagit qu'à la réponse du personnage, il fonctionne donc avec le modèle que vous utilisez pour discuter. Vous pouvez garder un LLM privé et hors ligne pour la conversation, et seule la description de l'image quitte votre téléphone.

## Fonctionnement de l'Agent en bref

L'Agent suit le même déroulement en quatre étapes que tout Agent de génération d'images qui fonctionne depuis le chat :

```text
You ask for an image
  -> the character replies with a tagged image description
  -> the Agent's trigger spots the tag
  -> the Eval tool calls OpenRouter's API and saves the picture
  -> the Display Image tool shows it in the chat
```

1. **Le prompt système demande une balise au modèle.** L'Agent indique au modèle de langage de votre personnage d'écrire une description d'image détaillée entre les balises `<stable_diffusion_prompt></stable_diffusion_prompt>` chaque fois que vous demandez une image.
2. **Un déclencheur repère la balise.** Un déclencheur regex surveille les réponses du modèle. Lorsqu'il voit la balise, il capture le texte qu'elle contient et démarre l'Agent.
3. **Un script appelle l'API.** Le premier outil de l'Agent exécute un court programme JavaScript. Il envoie la description à OpenRouter, reçoit l'image et l'enregistre dans un fichier.
4. **L'image apparaît dans le chat.** Le deuxième outil, _Display Image_, prend le fichier enregistré et l'affiche dans la conversation.

Le modèle de langage ne parle jamais directement à OpenRouter. Il se contente d'écrire du texte, et l'Agent prend en charge tout le reste.

La balise s'appelle `<stable_diffusion_prompt>` parce que la génération d'images propre à Layla écoute aussi cette balise. Cela compte pour la configuration, comme expliqué plus bas.

## Ce dont vous avez besoin

- La mini-app _Agents_ installée. Si vous n'avez jamais utilisé les Agents, lisez d'abord [Comment activer les Agents, les fonctions et l'appel d'outils dans Layla](/fr/how-to-enable-agents-functions-and-tool-calling-in-layla/).
- Un compte OpenRouter avec des crédits, et une clé API OpenRouter. La section suivante explique comment faire.
- Une connexion Internet.
- Le fichier de l'Agent, dont le lien se trouve à la fin de cet article.

Cet Agent utilise l'outil _Eval_, intégré à Layla. Vous n'avez pas besoin de la mini-app Interpréteur Python.

## Comment obtenir une clé API OpenRouter

Une clé API est une longue chaîne de caractères qui identifie votre compte OpenRouter lorsque l'Agent envoie une requête. Les clés OpenRouter commencent par `sk-or-v1-`. En obtenir une prend quelques minutes.

### Étape 1 : créer un compte OpenRouter

Allez sur [openrouter.ai](https://openrouter.ai) et sélectionnez **Sign up** en haut à droite. Vous pouvez vous inscrire avec un compte GitHub ou Google, ou avec une adresse e-mail et un mot de passe.

![La page Sign Up d'OpenRouter avec des boutons de connexion GitHub, Google et portefeuille, et des champs pour le nom, l'adresse e-mail et le mot de passe.](./openrouter-sign-up.jpg)

### Étape 2 : ajouter des crédits

OpenRouter fonctionne en prépaiement. Les modèles d'images facturent chaque image, votre compte doit donc avoir un solde avant que l'Agent puisse générer quoi que ce soit.

Ouvrez la [page Credits](https://openrouter.ai/settings/credits) et achetez des crédits. OpenRouter accepte les principales cartes bancaires, AliPay et l'USDC. Il prélève des frais de 5,5 % sur chaque achat par carte, avec des frais minimums de 0,80 $, si bien qu'une petite recharge coûte proportionnellement plus cher qu'une plus grande. La [FAQ](https://openrouter.ai/docs/faq) d'OpenRouter indique les frais en vigueur et précise que les crédits non utilisés peuvent expirer un an après l'achat.

Aux prix indiqués plus bas, quelques dollars de crédits couvrent des centaines d'images avec le modèle par défaut.

### Étape 3 : ouvrir la page des clés API

Ouvrez la [page des clés API](https://openrouter.ai/settings/keys). Dans la barre latérale des paramètres d'OpenRouter, elle apparaît sous le nom _Keys_. La page liste les clés que vous avez déjà, avec leur date de dernière utilisation, le montant qu'elles ont dépensé et leur limite. Sélectionnez **New key** en haut à droite.

![La page des clés API d'OpenRouter avec Keys sélectionné dans la barre latérale, deux clés existantes avec leur utilisation et leurs limites, et le bouton New key en haut à droite.](./openrouter-api-keys-page.jpg)

### Étape 4 : nommer la clé et définir une limite

La boîte de dialogue _Create API key_ demande trois informations :

- **Name** : un nom que vous reconnaîtrez, par exemple « Layla ».
- **Expiration** : la date à laquelle la clé cesse de fonctionner. Une clé qui expire est plus sûre, mais l'Agent cesse de fonctionner à cette date jusqu'à ce que vous créiez une nouvelle clé et la colliez dans l'Agent.
- **Credit limit** : le montant maximal que cette clé peut dépenser. Sous _Reset limit every_, vous pouvez faire réinitialiser la limite chaque jour, chaque semaine ou chaque mois, ou la laisser comme un total.

![La boîte de dialogue Create API key d'OpenRouter avec les champs Name, Expiration, Credit limit et Reset limit every, et un bouton Create.](./openrouter-create-key-dialog.jpg)

OpenRouter recommande de définir une limite de crédit sur chaque clé, et c'est une bonne idée ici. La clé sera stockée dans votre Agent, et une limite signifie qu'une clé divulguée ou un Agent qui s'emballe ne peut dépenser que ce montant. Lorsqu'une clé atteint sa limite, OpenRouter rejette ses requêtes jusqu'à ce que vous releviez la limite ou, pour une limite quotidienne, hebdomadaire ou mensuelle, jusqu'à sa réinitialisation. Une limite mensuelle de quelques dollars suffit largement pour des images occasionnelles avec le modèle par défaut.

Sélectionnez **Create**.

### Étape 5 : copier la clé

OpenRouter n'affiche la nouvelle clé qu'une seule fois. Sélectionnez le bouton de copie à côté et conservez la clé en lieu sûr, par exemple dans un gestionnaire de mots de passe. Comme l'indique la boîte de dialogue, vous ne pourrez plus la voir. Si vous la perdez, supprimez-la sur la page des clés API et créez-en une nouvelle.

![La boîte de dialogue Your new key d'OpenRouter montrant une clé qui commence par sk-or-v1-, le reste étant flouté, avec un bouton de copie et un avertissement indiquant que la clé ne pourra plus être affichée.](./openrouter-copy-api-key.jpg)

Traitez la clé comme un mot de passe. Toute personne qui la possède peut générer des images payées avec vos crédits. Le [guide d'authentification](https://openrouter.ai/docs/api_reference/authentication) d'OpenRouter explique le format des clés et ce qu'il faut faire si une clé est exposée.

## Modèles de génération d'images OpenRouter et tarifs

OpenRouter liste tous ses modèles de génération d'images sur sa [page des modèles, filtrée par sortie image](https://openrouter.ai/models?output_modalities=image). Chaque entrée indique le prix du modèle et sa date d'ajout.

![La page Models d'OpenRouter avec l'onglet Image sélectionné, listant les modèles de génération d'images avec leurs prix.](./openrouter-image-models.jpg)

Sélectionnez un modèle pour ouvrir sa page. L'identifiant du modèle, c'est-à-dire le nom dont l'Agent a besoin, se trouve sous le titre avec un bouton de copie à côté. La page indique aussi le prix et propose un espace d'essai (playground) où vous pouvez tester des prompts avant d'utiliser le modèle dans Layla.

![La page OpenRouter de Black Forest Labs: FLUX 3 Image Klein, montrant l'identifiant de modèle black-forest-labs/flux-3-image-klein avec un bouton de copie, un prix à partir de 0,008 $ par image et l'espace d'essai.](./openrouter-model-page.jpg)

L'Agent utilise FLUX 3 Image Klein, un modèle à poids ouverts de Black Forest Labs, rapide et peu coûteux. Voici quelques-uns des modèles d'images qu'OpenRouter répertorie au moment de la rédaction, avec le prix d'une image 1K :

| Modèle               | Identifiant du modèle                  | Prix par image 1K | Remarques                                                                                          |
| -------------------- | -------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------- |
| FLUX 3 Image Klein   | `black-forest-labs/flux-3-image-klein` | 0,009 $           | Le modèle utilisé par cet Agent. Prend en charge de 768 à 4K.                                      |
| Seedream 5.0 Flash   | `bytedance-seed/seedream-5-0-flash`    | 0,018 $           | Le modèle rapide de ByteDance. Prend en charge 1K et 2K.                                           |
| Qwen Image 2.1 Turbo | `qwen/qwen-image-2.1-turbo`            | 0,0184 $          | La version rapide de Qwen Image 2.1. Prend en charge 1K et 2K.                                     |
| Seedream 5.5         | `bytedance-seed/seedream-5-5`          | 0,02 $            | Le modèle le plus récent de ByteDance. Les résolutions supérieures coûtent 0,035 $.                |
| Nano Banana 2.1      | `google/gemini-nano-banana-2.1`        | environ 0,034 $   | Le modèle de Google, facturé au token. Prend en charge 1K, 2K et 4K.                               |
| FLUX 3 Image         | `black-forest-labs/flux-3-image`       | 0,048 $           | Le plus grand modèle FLUX 3. Les résolutions supérieures coûtent plus cher, jusqu'à 0,607 $ en 4K. |
| Nano Banana Pro      | `google/gemini-3-pro-image`            | environ 0,134 $   | Le modèle premium de Google, facturé au token.                                                     |
| GPT Image 2          | `openai/gpt-image-2`                   | variable          | Le modèle d'OpenAI, facturé au token. Le coût dépend de la taille et de la qualité.                |

À 0,009 $ l'image, FLUX 3 Image Klein est l'option la moins chère de ce tableau, ce qui en fait un choix par défaut raisonnable pour un chat IA qui envoie souvent des images. Nano Banana Pro et FLUX 3 Image coûtent plus cher et valent la peine d'être essayés lorsque vous voulez plus de détails.

Sur la plupart des modèles, les images plus grandes coûtent plus cher. Certains modèles, comme les modèles GPT Image et Recraft, n'acceptent pas le paramètre `resolution` que l'Agent envoie. D'autres, comme les modèles vectoriels de Recraft, renvoient des dessins SVG au lieu d'images, que _Display Image_ risque de ne pas afficher. Si vous choisissez l'un de ces modèles, lisez le paragraphe suivant.

Pour changer de modèle, copiez l'identifiant du modèle depuis sa page, collez-le dans `MODEL_ID` dans le script et utilisez le bouton **Test**. Si le modèle renvoie une erreur, vérifiez les paramètres qu'il prend en charge. La présentation du code plus bas explique comment les modifier ou les supprimer. Les prix et les modèles changent souvent, consultez donc la page du modèle sur OpenRouter avant de choisir.

## Configurer la génération d'images OpenRouter dans Layla

### Étape 1 : désactiver la génération d'images par défaut de Layla

Ouvrez vos _Paramètres d'inférence_, faites défiler jusqu'à la section _Génération d'images_ et sélectionnez le modèle de génération d'images. Dans la liste _Select Model_, choisissez **No Image Generation** (aucune génération d'images).

![L'écran Paramètres d'inférence avec la liste Select Model ouverte et No Image Generation sélectionné.](./no-img-gen-settings.jpg)

La génération d'images intégrée de Layla lit la même balise `<stable_diffusion_prompt>` dans la réponse d'un personnage. Si un modèle est encore sélectionné, Layla génère sa propre image à partir de la balise et vous recevez deux images. Avec _No Image Generation_ sélectionné, la balise est laissée à l'Agent. [Comment activer la génération d'images dans Layla](/fr/how-to-enable-image-generation-in-layla/) montre où se trouve ce réglage.

### Étape 2 : importer l'Agent

Téléchargez le fichier de l'Agent à la fin de cet article. Ouvrez la mini-app _Agents_ et utilisez le bouton **Import** en haut à droite pour l'importer. L'Agent s'appelle _OpenRouter: generate image_, et sa carte indique les deux outils qu'il utilise : _Eval_ et _Display Image_.

Vérifiez que l'interrupteur en haut à droite de la carte de l'Agent est activé.

Si vous utilisez déjà l'[Agent Nano Banana](/fr/how-to-use-the-google-nano-banana-image-generation-agent/) ou un autre Agent qui réagit à `<stable_diffusion_prompt>`, désactivez-le. Sinon, les deux Agents s'exécutent à chaque demande d'image, et vous payez deux images.

### Étape 3 : ajouter votre clé API

Ouvrez l'Agent avec son bouton **Edit** et repérez l'outil _Eval_. Près du début de son code se trouve cette ligne :

```js
const API_KEY = "PUT YOUR API KEY HERE";
```

Remplacez `PUT YOUR API KEY HERE` par votre clé, en conservant les guillemets. Enregistrez l'Agent.

Votre clé est désormais stockée dans l'Agent. Avant de partager ou de téléverser le fichier de l'Agent où que ce soit, remettez le texte de remplacement à la place de la clé.

### Étape 4 : demander une image

Démarrez un chat et demandez une image, par exemple « montre-moi un phare sur une falaise au crépuscule ». Le personnage répond avec une description d'image, l'Agent s'exécute, et l'image apparaît dans le chat après quelques secondes.

Si quelque chose ne fonctionne pas, utilisez le bouton **Test** de la mini-app Agents. Il affiche l'entrée et la sortie de chaque étape, comme décrit dans [Exploration approfondie des Agents Layla](/fr/deep-dive-into-layla-agents/). Vous pouvez aussi voir chaque requête, son modèle et son coût sur la [page Activity](https://openrouter.ai/activity) d'OpenRouter.

## Fonctionnement de l'Agent, étape par étape

Un Agent comporte trois parties : un prompt système, un déclencheur et une liste d'outils exécutés l'un après l'autre. La sortie de chaque outil est l'entrée du suivant. [Exploration approfondie des Agents Layla](/fr/deep-dive-into-layla-agents/) présente ces éléments de façon générale. Cette section suit l'Agent OpenRouter à travers chacun d'eux.

### 1. Le prompt système

Le prompt système est une instruction que Layla ajoute à la conversation tant que l'Agent est activé. Le prompt de l'Agent est rédigé en anglais, et le fichier le contient tel quel :

```text
When the user asks you to generate, draw or create an image, write a detailed
description of the image (subject, setting, style, lighting, composition) inside
<stable_diffusion_prompt></stable_diffusion_prompt> tags, e.g.
<stable_diffusion_prompt>a lighthouse on a cliff at dusk, oil painting, warm
light</stable_diffusion_prompt>. The image is generated from the text inside the
tags and shown in the chat. Use the tags only when an image is requested, and
never put backticks inside them.
```

C'est la même instruction que celle de l'Agent Nano Banana, car elle ne dépend pas du service d'images :

- **« When the user asks you to generate, draw or create an image »** (quand l'utilisateur vous demande de générer, dessiner ou créer une image) limite le comportement aux demandes d'images, de sorte que la conversation normale n'est pas affectée.
- **« A detailed description (subject, setting, style, lighting, composition) »** (une description détaillée : sujet, décor, style, éclairage, composition) donne une liste de contrôle au modèle. Les modèles d'images actuels comme FLUX 3 et Seedream comprennent des phrases complètes, donc une description détaillée produit généralement une meilleure image qu'une liste de mots-clés.
- **L'exemple** montre le format exact de la balise. Les modèles de langage suivent un exemple de façon plus fiable qu'une description de format.
- **« Use the tags only when an image is requested »** (n'utilisez les balises que lorsqu'une image est demandée) empêche le modèle d'ajouter des balises à chaque réponse, ce qui démarrerait l'Agent, et dépenserait des crédits, à chaque fois.
- **« Never put backticks inside them »** (ne mettez jamais d'accents graves à l'intérieur) protège le script. La présentation du code plus bas en explique la raison.

### 2. Le déclencheur

L'Agent a un seul déclencheur, un _déclencheur regex_ qui s'applique à la **sortie** du modèle plutôt qu'à votre saisie. Son motif est :

```text
/<stable_diffusion_prompt>(.*?)<\/stable_diffusion_prompt>/s
```

- Les balises ouvrante et fermante correspondent aux balises littérales.
- `(.*?)` est un groupe de capture. Il collecte tout ce qui se trouve entre les balises, et le `?` lui fait s'arrêter à la première balise fermante.
- Le drapeau `s` permet à la description de s'étendre sur plusieurs lignes.

Le texte capturé par le groupe devient disponible pour l'Agent sous la forme `{{match$1}}`. Tout ce que le modèle écrit entre les balises est transmis au premier outil.

### 3. L'outil Eval : appeler l'API

Le premier outil est _Eval_. Il exécute du JavaScript dans un environnement isolé à l'intérieur de Layla. Cet environnement dispose de `fetch` pour les requêtes web et d'un objet global nommé `layla` qui donne aux scripts accès aux fonctions de Layla, comme l'enregistrement de fichiers. Il n'y a ni page de navigateur ni modules Node.js.

Eval renvoie la valeur de la dernière expression du script et l'attend s'il s'agit d'une promesse. La dernière ligne du script, `generateImage(PROMPT);`, lance le travail.

#### Les réglages en haut

```js
const API_KEY = "PUT YOUR API KEY HERE";
const PROMPT = String.raw`{{match$1}}`.trim();

const MODEL_ID = "black-forest-labs/flux-3-image-klein";
const RESOLUTION = "1K";
const ASPECT_RATIO = "";
const API_URL = "https://openrouter.ai/api/v1/images";
const TIMEOUT_MS = 90000;
```

Tout ce que vous pourriez vouloir modifier se trouve au même endroit :

- `API_KEY` est votre clé.
- `PROMPT` est la description écrite par le modèle. Avant l'exécution du script, Layla remplace `{{match$1}}` par le texte capturé, de sorte que la description fait partie du programme. Elle est placée dans un littéral de gabarit avec `String.raw` pour que les barres obliques inverses soient conservées telles quelles, et `.trim()` supprime les espaces et sauts de ligne superflus. Un accent grave ou les caractères `${` dans la description mettraient fin au littéral prématurément et casseraient le script, c'est pourquoi le prompt système interdit les accents graves.
- `MODEL_ID` est le modèle à utiliser, copié depuis sa page sur OpenRouter.
- `RESOLUTION` est la taille de l'image. OpenRouter accepte `'512'`, `'768'`, `'1K'`, `'1.5K'`, `'2K'` et `'4K'`, et chaque modèle en prend en charge une partie. Mettez `''` pour les modèles qui n'acceptent pas de résolution, comme GPT Image.
- `ASPECT_RATIO` est la forme de l'image, par exemple `'9:16'` pour une image en hauteur qui remplit l'écran d'un téléphone ou `'16:9'` pour une image large. Lorsqu'il vaut `''`, le modèle utilise sa valeur par défaut.
- `API_URL` est l'endpoint de génération d'images d'OpenRouter. Il est le même pour tous les modèles.
- `TIMEOUT_MS` est la durée d'attente avant d'abandonner : 90 secondes. Certains modèles sont plus lents que d'autres, surtout pour les grandes tailles.

Le reste du script se trouve dans une fonction nommée `generateImage`. Elle reçoit la description dans un paramètre nommé `prompt`, et la dernière ligne du script l'appelle avec `PROMPT`.

#### Vérifier les entrées

```js
if (!prompt) throw new Error("The stable diffusion prompt was empty.");
if (!API_KEY || API_KEY === "PUT YOUR API KEY HERE")
  throw new Error("Set API_KEY in this agent first.");
```

Le script échoue tôt, avec un message lisible, lorsqu'il n'y a rien à envoyer ou que la clé n'a pas été renseignée. Lorsqu'un script lève une erreur, l'Agent s'arrête et aucune image n'apparaît. Le bouton **Test** affiche le message.

#### Construire la requête

```js
const payload = { model: MODEL_ID, prompt };
if (RESOLUTION) payload.resolution = RESOLUTION;
if (ASPECT_RATIO) payload.aspect_ratio = ASPECT_RATIO;
```

La charge utile (payload) correspond aux données envoyées à OpenRouter. Seuls `model` et `prompt` sont obligatoires. Le script n'ajoute `resolution` et `aspect_ratio` que lorsqu'ils ont une valeur, car tous les modèles n'acceptent pas tous les paramètres.

Le [guide de génération d'images](https://openrouter.ai/docs/guides/overview/multimodal/image-generation) d'OpenRouter liste les autres paramètres que vous pouvez ajouter à la charge utile, comme `seed` pour reproduire un résultat, `quality` pour les modèles GPT Image et `output_format` pour choisir entre PNG, JPEG et WebP. La page de chaque modèle indique ceux qu'il prend en charge.

#### Envoyer la requête avec une limite de temps

```js
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
let response;
let body;
try {
  response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(payload),
    signal: controller.signal,
  });
  body = await response.text();
} catch (error) {
  if (controller.signal.aborted)
    throw new Error(`Image generation timed out after ${TIMEOUT_MS / 1000} s.`);
  throw new Error(`Image generation request failed: ${error.message}`);
} finally {
  clearTimeout(timer);
}
```

C'est la partie qui communique avec OpenRouter :

- `fetch` envoie une requête `POST` avec la charge utile convertie en texte JSON.
- La clé API voyage dans l'en-tête `Authorization` sous forme de jeton bearer, le format qu'attend OpenRouter. Elle ne fait pas partie de l'adresse web.
- L'`AbortController` et le minuteur annulent la requête au bout de 90 secondes. Sans eux, une connexion bloquée laisserait l'Agent en attente.
- Le bloc `catch` distingue un dépassement de délai des autres échecs réseau, de sorte que le message d'erreur indique ce qui s'est passé. Le bloc `finally` arrête le minuteur dans les deux cas.

OpenRouter ne facture que les images terminées. Une génération qui échoue ou dépasse le délai n'est pas facturée.

#### Vérifier l'état de la réponse

```js
if (!response.ok) {
  throw new Error(
    `HTTP error ${response.status} ${response.statusText}. Response body: ${body.slice(0, 500)}`,
  );
}
```

Lorsqu'OpenRouter rejette une requête, il en explique la raison dans le corps de la réponse. Le script inclut les 500 premiers caractères de cette explication dans l'erreur, si bien qu'une mauvaise clé, un solde vide, une limite de crédit atteinte ou un paramètre que le modèle ne prend pas en charge apparaît sous forme de message clair lorsque vous utilisez le bouton **Test**.

#### Trouver l'image dans la réponse

```js
let data;
try {
  data = JSON.parse(body);
} catch (error) {
  throw new Error(`The response was not JSON: ${body.slice(0, 200)}`);
}

for (const image of data.data || []) {
  if (!image || !image.b64_json) continue;
  // ...save the image
}
```

OpenRouter répond à chaque requête d'image dans le même format, quel que soit le modèle qui a créé l'image :

```json
{
  "created": 1748372400,
  "data": [{ "b64_json": "<base64-encoded-image>", "media_type": "image/png" }],
  "usage": { "cost": 0.009 }
}
```

Le script transforme d'abord le texte de la réponse en objet, et s'arrête avec un message si le texte n'est pas du JSON valide. Dans cet objet, `data` est une liste d'images. Chacune contient l'image sous forme de texte base64, une manière d'écrire des données binaires avec des caractères ordinaires, et un `media_type` comme `image/png` ou `image/jpeg`. Le script prend la première image de la liste. La protection `|| []` évite qu'il plante lorsque la liste est absente. Le champ `usage` indique le coût de la requête.

Ce format commun est le principal avantage d'OpenRouter pour un Agent. Le script lit les mêmes champs pour FLUX, Seedream, Nano Banana ou GPT Image, donc modifier `MODEL_ID` suffit pour passer de l'un à l'autre.

#### Enregistrer l'image

```js
const mediaType = String(image.media_type || "image/png");
const extension =
  mediaType
    .split("/")
    .pop()
    .split("+")[0]
    .replace(/[^a-z0-9]/gi, "") || "png";
const id = Math.random().toString(16).slice(2, 10).padEnd(8, "0");
const path = `generated-images/output_image_${id}.${extension}`;

await layla.utils.saveFile(path, image.b64_json);
return path;
```

- L'extension du fichier provient du type d'image indiqué par OpenRouter, avec `png` comme valeur de repli.
- Un identifiant aléatoire de huit caractères donne à chaque image son propre nom de fichier, de sorte qu'une nouvelle image n'écrase jamais une image précédente de votre historique de chat.
- `layla.utils.saveFile` écrit le fichier dans le dossier de travail privé du personnage. Le chemin est relatif à ce dossier, et les dossiers manquants sont créés automatiquement. La fonction attend du texte base64, ce qu'OpenRouter envoie, donc les données sont enregistrées sans conversion.
- La fonction renvoie le chemin. Ce chemin est la sortie de l'outil.

#### Signaler clairement un échec

```js
const detail =
  data.error && data.error.message
    ? data.error.message
    : `Response keys: ${Object.keys(data).join(", ")}`;
throw new Error(`No image was found in the response. ${detail}`);
```

Si la boucle se termine sans avoir trouvé d'image, par exemple parce que le filtre de sécurité du modèle a refusé la requête, le script indique le message d'erreur d'OpenRouter ou les champs que contenait la réponse. Cela facilite beaucoup le diagnostic des échecs inhabituels.

### 4. L'outil Display Image

Le deuxième outil est _Display Image_, et son seul réglage est :

```text
{{input}}
```

`{{input}}` est remplacé par la sortie de l'outil précédent, c'est-à-dire le chemin de fichier renvoyé par le script. _Display Image_ ouvre ce fichier depuis le dossier de travail du personnage et le joint à la réponse, et l'image apparaît dans le chat.

## Jeu de rôle IA avec génération d'images : garder un personnage cohérent

Un modèle de langage écrit chaque description d'image de zéro. Sans consigne, un personnage peut donc avoir un aspect différent d'une image à l'autre. Ces approches permettent d'obtenir des images cohérentes de personnage IA dans les jeux de rôle et les chats avec un compagnon, et de décider à quelle fréquence les images apparaissent :

- **Décrire le personnage une seule fois.** Dans le _Scénario_ du personnage, ajoutez une instruction comme : « Chaque fois que tu écris un `<stable_diffusion_prompt>`, commence par cette description de toi : une femme d'une vingtaine d'années, cheveux roux courts, yeux verts et taches de rousseur. Décris ensuite la scène. » Le modèle répète l'apparence dans chaque prompt, ce qui aide le modèle d'images à dessiner le même personnage à chaque fois.
- **Fixer le style artistique.** Ajoutez un style à la même instruction, par exemple « photographie argentique 35 mm, lumière naturelle » ou « illustration à l'aquarelle ».
- **Générer une image après chaque message.** Ajoutez au _Scénario_ une instruction demandant de terminer chaque réponse par la balise, comme dans [Créer un Agent de génération d'images](/fr/creating-an-image-generation-agent/). Chaque réponse est alors accompagnée d'une image, ce qui convient au jeu de rôle IA et à la narration. Chaque image est payante, donc cela coûte plus cher que de demander des images à la demande. Un modèle peu coûteux comme FLUX 3 Image Klein limite la dépense.
- **Utiliser des images de référence.** La plupart des modèles d'images d'OpenRouter acceptent aussi des images de référence via le paramètre `input_references`, ce qui aide un personnage à garder le même visage. La description de FLUX 3 Image Klein par OpenRouter mentionne une édition multi-référence qui garde les personnages cohérents d'une image à l'autre. Cet Agent n'envoie que du texte, donc ajouter une image de référence à la requête est un bon projet pour la suite.

## Réutiliser le même schéma pour d'autres Agents

Le prompt système, le déclencheur regex et l'étape _Display Image_ restent identiques pour n'importe quel service d'images. Seul le script change, c'est pourquoi cet Agent et l'[Agent Nano Banana](/fr/how-to-use-the-google-nano-banana-image-generation-agent/) ne diffèrent que par le traitement de la requête et de la réponse. Quelques idées s'appuient dessus :

- **Garder deux versions.** Dupliquez l'Agent, donnez à chaque copie un `MODEL_ID` différent et activez celle que vous voulez. Une seule doit être activée à la fois, car les deux réagissent à la même balise.
- **Demander au modèle plus qu'une description.** Le prompt système peut demander quelques champs au lieu d'un texte libre, par exemple un court objet JSON avec un `prompt` et un `aspect_ratio`. Le script lit ensuite les champs dans le texte capturé. Gardez le texte de remplacement à l'intérieur d'un littéral de chaîne, comme le fait l'Agent avec `PROMPT`, et analysez le texte dans votre propre code.
- **Contrôler où va votre prompt.** OpenRouter peut limiter une requête aux fournisseurs qui n'entraînent pas leurs modèles sur vos données. Ajoutez `payload.provider = { data_collection: 'deny' };` au script, ou définissez la même préférence pour tout votre compte sur la [page des paramètres de confidentialité](https://openrouter.ai/settings/privacy) d'OpenRouter. Si aucun fournisseur du modèle ne remplit la condition, la requête échoue avec une erreur.
- **Faire autre chose que des images.** Choisissez une autre balise, laissez _Eval_ appeler une autre API et terminez par l'outil _Provide Context_ pour que le personnage puisse parler du résultat. L'[Agent de recherche Brave](/fr/how-to-create-a-brave-search-agent/) est un exemple de ce déroulement.

## Questions fréquentes

### Comment obtenir une clé API OpenRouter ?

Créez un compte sur [openrouter.ai](https://openrouter.ai), ajoutez des crédits sur la page Credits, puis ouvrez la page des clés API et sélectionnez **New key**. Donnez à la clé un nom, une date d'expiration et une limite de crédit, et copiez-la lorsqu'elle s'affiche, car OpenRouter ne l'affiche qu'une seule fois.

### La génération d'images OpenRouter est-elle gratuite ?

Créer un compte et une clé est gratuit, mais les modèles d'images facturent chaque image, vous avez donc besoin de crédits. Au moment de la rédaction, FLUX 3 Image Klein coûte 0,009 $ pour une image 1K. OpenRouter propose parfois un modèle de génération d'images gratuit pendant une durée limitée, signalé par « (free) » sur la page des modèles.

### Combien coûte la génération d'images OpenRouter ?

Chaque modèle a son propre prix, indiqué sur sa page. Au moment de la rédaction, le prix d'une image 1K va de moins d'un centime pour FLUX 3 Image Klein à environ 0,134 $ pour Nano Banana Pro. OpenRouter n'ajoute aucune marge aux prix des modèles, mais prélève des frais lorsque vous achetez des crédits.

### Quel est l'endpoint de l'API de génération d'images OpenRouter ?

Les requêtes sont envoyées à `https://openrouter.ai/api/v1/images` en `POST`, avec votre clé dans l'en-tête `Authorization`. Le même endpoint sert tous les modèles d'images, et le champ `model` de la requête choisit celui qui s'exécute. Le [guide de génération d'images](https://openrouter.ai/docs/guides/overview/multimodal/image-generation) d'OpenRouter documente chaque paramètre.

### Puis-je utiliser Nano Banana Pro via OpenRouter ?

Oui. Définissez `MODEL_ID` sur `google/gemini-3-pro-image` pour Nano Banana Pro ou sur `google/gemini-nano-banana-2.1` pour Nano Banana 2.1. Les deux acceptent 1K, 2K et 4K via le réglage `RESOLUTION`. Si vous préférez payer Google directement, utilisez plutôt l'[Agent Nano Banana](/fr/how-to-use-the-google-nano-banana-image-generation-agent/).

### Existe-t-il une application OpenRouter pour Android ?

OpenRouter lui-même est un site web et une API. Layla est une application Android qui fonctionne avec : elle peut discuter avec les modèles de langage d'OpenRouter via sa [connexion à une API compatible avec OpenAI](/fr/how-to-connect-layla-to-any-openai-compatible-api/), et générer des images avec les modèles d'images d'OpenRouter grâce à cet Agent.

### Un chatbot IA peut-il envoyer des images sur Android ?

Oui. Avec cet Agent, un personnage Layla envoie une image chaque fois que vous en demandez une, ou après chaque message si vous le configurez ainsi. Layla peut aussi envoyer des images sans aucun service dans le cloud, avec des modèles Stable Diffusion qui s'exécutent sur votre téléphone, comme décrit dans [Comment activer la génération d'images dans Layla](/fr/how-to-enable-image-generation-in-layla/).

### Puis-je utiliser mes personnages SillyTavern avec la génération d'images OpenRouter ?

Oui. Layla importe les [cartes de personnage TavernPNG](/fr/how-to-import-tavernpng-characters-in-layla/), le format qu'utilise SillyTavern, ainsi que les [presets SillyTavern](/fr/how-to-use-sillytavern-presets-in-layla/), et cet Agent fonctionne avec n'importe quel personnage. Si vous utilisiez la génération d'images OpenRouter avec SillyTavern sur un ordinateur, vous retrouvez la même configuration dans une application de chat sur votre téléphone.

### Pourquoi ai-je reçu deux images ?

Soit la génération d'images intégrée de Layla est encore activée, soit un autre Agent qui réagit à `<stable_diffusion_prompt>` est activé. Sélectionnez _No Image Generation_ dans les Paramètres d'inférence et désactivez les autres Agents d'images.

### L'Agent affiche « Set API_KEY in this agent first. »

Le texte de remplacement de la clé figure encore dans le script. Ouvrez l'Agent, modifiez l'outil _Eval_ et remplacez `PUT YOUR API KEY HERE` par votre clé.

### Pourquoi ma clé API OpenRouter ne fonctionne-t-elle pas ?

Lorsqu'une requête échoue, l'Agent affiche une erreur HTTP qui inclut l'explication d'OpenRouter. Une erreur 401 signifie que la clé est incorrecte, supprimée ou expirée. Une erreur 402 signifie que votre solde ou la limite de crédit de la clé est épuisé. Une erreur 400 signifie généralement que le modèle n'accepte pas l'un des paramètres, comme la résolution. Consultez la page du modèle et modifiez `RESOLUTION` ou `ASPECT_RATIO`.

### OpenRouter filtre-t-il les images ?

Oui. Chaque entreprise applique sa propre politique de contenu à ses modèles, et une requête qu'un modèle refuse ne renvoie aucune image. L'Agent indique alors l'erreur qu'il a reçue. Les politiques diffèrent d'un modèle à l'autre, donc un prompt refusé par un modèle peut fonctionner avec un autre. Pour une génération d'images entièrement réalisée sur votre appareil, sans prompt envoyé à aucun fournisseur, utilisez les modèles Stable Diffusion locaux décrits dans [Comment activer la génération d'images dans Layla](/fr/how-to-enable-image-generation-in-layla/).

### Mon prompt est-il privé ?

La description de l'image est envoyée à OpenRouter et à l'entreprise qui exécute le modèle que vous avez choisi. OpenRouter indique qu'il n'enregistre pas les prompts par défaut, et la politique de données du fournisseur s'applique à ce qu'il reçoit. Si vous discutez avec un modèle local, le reste de votre conversation reste sur votre appareil.

### Puis-je utiliser cet Agent sans connexion Internet ?

Non. L'Agent appelle les serveurs d'OpenRouter. Pour la génération d'images hors ligne, utilisez l'un des modèles locaux décrits dans [Comment activer la génération d'images dans Layla](/fr/how-to-enable-image-generation-in-layla/).

## Conclusion

L'Agent OpenRouter utilise les mêmes quatre éléments que tout Agent de génération d'images dans Layla : un prompt système qui demande une description balisée, un déclencheur regex qui la capture, un court script qui échange la description contre une image, et _Display Image_ pour placer le résultat dans votre chat. Comme OpenRouter répond dans le même format pour chaque modèle, un seul script donne à vos personnages IA accès à des dizaines de modèles de génération d'images, et passer de l'un à l'autre ne demande de modifier qu'une ligne.

Layla est conçue comme un assistant IA hors ligne pour Android, et ses modèles locaux restent le choix pour un chat et une génération d'images entièrement privés et hors ligne. La génération d'images OpenRouter est une option lorsque vous voulez un modèle en ligne particulier dans vos chats et acceptez la connexion et le coût par image.

## Télécharger l'Agent

<div class="file-download">
  <div class="file-download-info">
    <span class="file-download-label">Fichier de l&#x27;Agent</span>
    <span class="file-download-name">openrouter-generate-image.json</span>
    <span class="file-download-hint">Utilisez le bouton <em>Import</em> de la mini-app Agents pour l'importer, puis ajoutez votre clé API.</span>
  </div>
  <a class="file-download-button" href="/assets/articles/how-to-use-the-openrouter-image-generation-agent/openrouter-generate-image.json" download="openrouter-generate-image.json"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>Télécharger</a>
</div>
