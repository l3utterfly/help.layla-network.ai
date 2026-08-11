---
title: Que sont les mini-apps Layla ? En créer une sur l'appareil avec CodeKitty
description: Découvrez comment les mini-apps Layla utilisent le modèle sur l'appareil, les personnages, les images, la voix et le stockage privé via le pont de l'hôte.
category: Mini-apps & integrations
order: 30
keywords:
  - mini-apps Layla
  - CodeKitty
  - SDK Layla
  - applications WebView
  - IA sur l'appareil
lastUpdated: 2026-07-18
translationKey: post-what-are-layla-mini-apps-codekitty
ai_translated: true
---

**Une mini-app Layla est une application web autonome qui s'exécute dans Layla et peut appeler l'IA déjà présente sur votre téléphone — le modèle local, la génération d'images, la voix, vos personnages et le stockage privé de fichiers — via un pont, sans clé API ni serveur.**

![Logo de chat cyber néon avec des symboles de code sur un fond sombre.](./codekitty-logo.avif)

[CodeKitty](https://apps.layla-cloud.com/app/codekitty) est une mini-app qui crée d'autres mini-apps. Il s'agit d'un éditeur de code, d'un aperçu en direct, d'une bibliothèque de projets, d'un générateur d'images et d'un assistant de programmation IA réunis dans un seul fichier HTML. Cet article s'en sert pour expliquer le fonctionnement du système de mini-apps, car CodeKitty en exploite presque toutes les facettes.

## Qu'est-ce qu'une mini-app Layla ?

Une mini-app est une application web ordinaire — HTML, CSS et JavaScript — que Layla exécute dans une WebView. Ce qui la distingue d'une simple page web, c'est le pont de l'hôte.

Une application web classique qui veut utiliser un LLM a besoin d'une clé API, d'un serveur et d'une connexion réseau. Elle envoie vos données ailleurs. Une mini-app Layla ne le fait pas. Elle s'exécute dans Layla, qui fournit les fonctions déjà installées sur l'appareil : inférence du modèle local, génération d'images, synthèse vocale, liste de vos personnages et système de fichiers privé propre à chaque application.

Cela inverse le fonctionnement habituel. L'IA n'est pas un service externe appelé par l'application ; c'est une ressource fournie par l'hôte. Il n'y a aucune clé à saisir, aucun endpoint à configurer et aucun compte à créer, car il n'y a rien auprès de quoi s'authentifier. L'inférence s'exécute sur votre matériel avec le [modèle GGUF](/fr/what-are-gguf-models-what-are-model-quants/) que vous avez chargé.

Une mini-app est distribuée sous forme de fichier ZIP contenant `app.json` pour les métadonnées, `index.html` pour l'application et tous les éléments associés, le tout à la racine.

## Qu'est-ce que CodeKitty ?

CodeKitty est un IDE qui s'exécute sur votre téléphone et produit des mini-apps Layla installables.

Il traite un projet comme un système de fichiers virtuel : un objet JavaScript dont les clés sont des noms de fichiers. Un nouveau projet commence avec quatre entrées : `index.html`, `app.json`, `icon.jpg` et `bg.jpg`. Comme ces fichiers résident en mémoire plutôt que sur le disque, l'éditeur peut passer de l'un à l'autre, les envoyer au modèle, les exécuter dans un aperçu ou les regrouper dans un ZIP sans système de fichiers classique sous-jacent.

L'interface utilise React, Prism pour la coloration syntaxique, Babel pour compiler le JSX dans le navigateur, JSZip pour créer les paquets et Marked pour afficher les réponses de l'assistant. L'ensemble tient dans un seul fichier `index.html`.

## L'hôte est l'API

La première chose à comprendre en tant que créateur est que le SDK n'est pas un client cloud.

```js
const layla = new LaylaSDK();
```

C'est toute la configuration nécessaire. Il n'y a ni clé ni URL de base. `LaylaSDK` sérialise les appels vers :

```js
window.ReactNativeWebView.postMessage(...);
```

Layla effectue le travail de manière native et renvoie les événements à la WebView. Une mini-app peut ainsi accéder aux personnages, aux complétions de chat en streaming, à la génération d'images, à la parole, aux fichiers privés et au partage natif.

En pratique, les mini-apps peuvent rester compactes. Une fonction qui nécessiterait normalement un backend, une authentification, un service multimédia et une couche de stockage devient un appel de méthode, car l'hôte possède déjà ces quatre éléments.

## Vos propres personnages deviennent l'assistant

CodeKitty récupère le portrait de chaque personnage, affiche les personnages dans une galerie consultable et vous permet d'en choisir un comme partenaire de programmation. Les données de la Character Card fournissent son nom et sa personnalité, que CodeKitty insère dans le prompt système. L'assistant peut expliquer un bug ou corriger un fichier tout en conservant la voix du personnage.

Votre bibliothèque de personnages est une couche de personnalisation que n'importe quelle mini-app peut consulter. Une application de fitness pourrait transformer les personnages en coachs, un outil d'étude pourrait les utiliser comme tuteurs pour différentes matières et un jeu narratif pourrait en faire sa distribution. La liste existe déjà et un seul appel au SDK suffit à la récupérer.

## Le modèle propose, l'application applique

Lorsque vous demandez une modification, CodeKitty ne transmet pas simplement votre phrase au modèle. Il constitue un ensemble de contexte qui contient la personnalité du partenaire de programmation, le nom du fichier actif et tout son contenu, le format de sortie attendu, les notes du projet, les échanges récents, les erreurs capturées dans l'aperçu en direct et la documentation du SDK. Il impose ensuite des contraintes au format de la réponse.

Pour un fichier source, le modèle doit renvoyer un remplacement complet ou un patch JSON :

![Éditeur de code affichant un patch JSON avec des entrées de recherche et de remplacement.](./json-patch.avif)

Pour `app.json`, le modèle renvoie le document complet. Pour une image, il propose un prompt visuel au lieu de code.

Cette séparation est essentielle. Le modèle suggère ; CodeKitty décide si et comment appliquer la suggestion. Le modèle ne dispose jamais d'un accès en écriture au stockage ni à l'hôte natif, et chaque modification appliquée crée un instantané permettant de l'annuler. Lorsque vous laissez un modèle de langage influer sur un état, faites-lui produire une proposition que votre code peut valider, et non une action que votre code exécute.

La génération est diffusée en streaming, car l'inférence locale sur un téléphone prend du temps :

![Éditeur de code affichant des gestionnaires de flux JavaScript pour le contenu du chat Layla, les événements de raisonnement et finalContent().](./streaming-events.avif)

Le raisonnement arrive sur un canal distinct et s'affiche dans un panneau repliable. La référence du flux est conservée afin qu'un bouton Arrêter puisse l'interrompre. Si votre mini-app dépend d'une génération sur l'appareil, considérez la progression comme une partie du produit : diffusez le texte, affichez les étapes de génération des images et permettez toujours l'annulation.

## L'aperçu emprunte le pont

L'aperçu en direct est l'aspect le plus intéressant de CodeKitty sur le plan technique.

Votre `index.html` s'exécute dans une iframe en bac à sable. Avant de le lancer, CodeKitty injecte deux éléments. D'abord, il ajoute des méthodes de console enveloppées et un gestionnaire d'erreurs afin que les exceptions non interceptées apparaissent dans un panneau de console et soient intégrées au contexte du modèle lors de votre prochaine question. Cela crée une boucle courte : exécuter, voir l'erreur, interroger le partenaire de programmation, appliquer le patch, puis relancer.

Ensuite, il ajoute un proxy `window.ReactNativeWebView`. Lorsque l'application dans l'iframe effectue un appel au SDK, le proxy transmet le message du pont à CodeKitty, qui le fait suivre à l'hôte Layla réel avant de renvoyer la réponse native vers l'iframe.

L'application d'aperçu emprunte la connexion de CodeKitty à Layla. Les opérations sur les fichiers reçoivent un préfixe de nom propre au projet ; une application test ne peut donc pas écraser la bibliothèque de CodeKitty en appelant `saveFile`. Une mini-app peut héberger une autre expérience web tout en contrôlant précisément les fonctions natives auxquelles elle a accès.

## Icônes, arrière-plans et exportation

Les paquets Layla ont besoin d'une icône et d'un arrière-plan. CodeKitty traite donc les fichiers image comme des onglets de projet à part entière. Rédigez un prompt ou demandez-en un au partenaire de programmation, puis générez l'image sur l'appareil :

```js
const imageSrc = await layla.images.generateImage();
```

Les résultats sont recadrés au centre à l'aide d'un canvas : 256 × 256 pour les icônes et 854 × 480 pour les arrière-plans. Ils sont stockés sous forme d'URI de données jusqu'à l'exportation.

L'exportation produit un ZIP contenant `app.json`, `index.html` et les éléments à la racine. Deux versions sont proposées :

- La **version de développement** conserve tout sous une forme lisible et modifiable.
- La **version compactée** compile le JSX, intègre React, incorpore les polices sous forme d'URI de données, adapte le paquet SDK pour une utilisation hors ligne et génère un unique fichier `index.html` autonome qui n'a pas besoin du réseau. Elle contient aussi une copie cachée des sources afin que le paquet puisse être réimporté plus tard dans CodeKitty.

L'exportation est un point de contrôle, pas une fin.

## À retenir si vous créez votre propre mini-app

Vous n'avez pas besoin de construire un IDE pour tirer parti des bonnes idées de CodeKitty.

Commencez par une seule fonction de l'hôte et utilisez-la pour résoudre une étape concrète, plutôt que pour simplement présenter une fonctionnalité. CodeKitty génère des images parce que les paquets ont besoin d'icônes. Concevez votre application pour la génération locale : diffusez les résultats, affichez la progression et permettez l'arrêt. Gardez le modèle derrière un contrat que votre code peut valider.

Évitez de faire transiter les données volumineuses par le pont. CodeKitty divise sa bibliothèque en un petit index et un fichier de contenu par projet, car de gros blocs en base64 traversant la limite d'une WebView ralentissent un téléphone. Créez aussi des boucles de rétroaction : c'est parce que la console d'aperçu devient un contexte du modèle que la boucle de débogage fonctionne.

Enfin, testez dans Layla. Le comportement du navigateur ne fait pas autorité sans l'installation du mock du SDK.

## Questions fréquentes

### Qu'est-ce qu'une mini-app Layla ?

Une application web autonome qui s'exécute dans Layla et peut utiliser l'IA de votre appareil — modèle local, génération d'images, voix, personnages et stockage privé — via le pont du SDK Layla. Elle est distribuée sous forme de ZIP contenant `app.json`, `index.html` et les éléments associés.

### Dois-je savoir programmer pour en créer une ?

Moins que vous ne le pensez. L'assistant de CodeKitty écrit et corrige le code, et vous le guidez en langage naturel. Connaître HTML et JavaScript vous permet d'aller plus vite et de corriger les erreurs du modèle, mais la boucle décrire, prévisualiser et corriger reste accessible sans ces connaissances.

### CodeKitty fonctionne-t-il hors ligne ?

L'IA, oui. L'assistant de programmation utilise votre modèle local et rien de ce que vous écrivez ne quitte le téléphone. Les bibliothèques de l'interface de CodeKitty sont actuellement chargées depuis un CDN au premier démarrage ; une connexion est donc nécessaire pour le lancer. Les applications exportées avec la version compactée sont entièrement autonomes et fonctionnent sans connexion réseau.

### Où va mon code ? Est-il envoyé quelque part ?

Nulle part. Les projets sont stockés sur votre appareil dans l'espace de fichiers privé de Layla propre à l'application. L'inférence du modèle s'effectue sur l'appareil. Aucun compte, aucune synchronisation et aucun serveur ne conserve vos projets.

### Puis-je partager les mini-apps que je crée ?

Oui. L'exportation produit un ZIP que toute personne utilisant Layla peut importer. Si vous le souhaitez, vous pouvez l'envoyer sur Layla Cloud à l'aide du gestionnaire de mini-apps de Layla.

### À quoi une mini-app peut-elle accéder ?

Aux personnages et à leurs portraits, aux complétions de chat en streaming avec le modèle local, au choix du moteur d'inférence, à la génération d'images, aux voix TTS installées et à un système de fichiers privé limité à cette application. Elle ne peut pas accéder aux fichiers des autres applications.

### Existe-t-il une référence du SDK ?

Oui. Consultez le [dépôt `@layla-network/sdk`](https://github.com/l3utterfly/layla-sdk).

## Créer la prochaine mini-app

CodeKitty est un IDE accompagné d'un partenaire de programmation sur le thème du chat, mais cette description minimise son aspect le plus intéressant : une mini-app peut constituer un workflow local complet. Elle peut coordonner personnages, modèles, images, voix, fichiers, aperçus et partage tout en restant une page web portable.

CodeKitty utilise ce système pour créer des logiciels. Les mêmes mécanismes pourraient produire un tuteur de langue qui énonce des exercices avec une voix installée, un journal qui reste sur l'appareil et fait ressortir d'anciennes entrées lorsqu'elles sont pertinentes, un studio narratif qui distribue vos propres personnages ou un outil de campagne qui vous envoie des messages entre les sessions.

Pour commencer, il n'est pas nécessaire d'apprendre l'ensemble du SDK. Trouvez un moment qui serait amélioré s'il se déroulait dans Layla, puis créez la plus petite chose capable de le concrétiser.
