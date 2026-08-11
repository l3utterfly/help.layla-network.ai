---
title: Exécuter Layla sur PC avec BlueStacks et LM Studio
description: Installez Layla dans BlueStacks et connectez-le à un modèle LM Studio via une API locale compatible OpenAI.
category: Mini-apps & integrations
order: 20
keywords:
  - Layla sur Windows
  - BlueStacks
  - LM Studio
  - API compatible OpenAI
  - LLM local
lastUpdated: 2026-07-26
translationKey: how-to-run-layla-on-your-pc-with-bluestacks-and-lm-studio
ai_translated: true
---

Layla est conçu pour Android et iOS, mais peut aussi s’exécuter sur un PC Windows avec l’émulateur Android BlueStacks. En le connectant à LM Studio, vous pouvez utiliser pour vos conversations un LLM exécuté localement sur l’ordinateur.

Cette configuration convient si vous appréciez l’interface et les fonctions de jeu de rôle de Layla et souhaitez discuter avec vos personnages sur un écran plus grand.

> **Remarque :** toutes les fonctions ne sont pas compatibles avec le PC, mais la majorité des fonctions de chat doivent fonctionner normalement.

Ce guide explique comment installer Layla dans BlueStacks, configurer LM Studio comme moteur d’inférence local et les relier par une API compatible OpenAI.

## Éléments nécessaires

Avant de commencer, préparez :

- un PC Windows capable d’exécuter BlueStacks ;
- suffisamment de RAM et de stockage pour le modèle choisi ;
- BlueStacks 5 ;
- l’APK officiel de Layla ;
- LM Studio ;
- Internet pour les téléchargements initiaux.

Une fois l’installation terminée, le modèle peut s’exécuter localement via LM Studio.

## 1. Télécharger et installer BlueStacks

Téléchargez [BlueStacks 5](https://www.bluestacks.com/bluestacks-5.html) depuis son site officiel. Exécutez le programme d’installation, suivez les instructions, puis ouvrez BlueStacks et laissez-le préparer son environnement Android.

Vous pouvez installer Layla depuis Google Play, mais les étapes suivantes utilisent directement l’APK officiel.

## 2. Télécharger l’APK officiel de Layla

Ouvrez le [site officiel de Layla](https://www.layla-network.ai/).

![Page d’accueil sombre de Layla avec des maquettes de téléphone et des boutons de téléchargement.](./download-layla.avif)

Choisissez le téléchargement direct de l’APK plutôt que Google Play et enregistrez-le dans un dossier facile à retrouver, comme Téléchargements. Pour votre sécurité, utilisez uniquement le site officiel.

## 3. Installer l’APK dans BlueStacks

1. Cliquez sur **Install APK** dans la barre latérale de BlueStacks.
2. Choisissez l’APK téléchargé.
3. Attendez la fin de l’installation.

Vous pouvez également faire glisser l’APK sur la fenêtre BlueStacks. L’icône Layla apparaît ensuite sur l’écran d’accueil. Vous pouvez ouvrir l’application, mais LM Studio doit être configuré avant une conversation locale.

![BlueStacks montrant l’écran Select Character de Layla, la recherche et les catégories.](./bluestacks-select-character.avif)

## 4. Télécharger et installer LM Studio

LM Studio est un moteur d’inférence qui télécharge et exécute des modèles localement sur votre PC.

Téléchargez [LM Studio](https://lmstudio.ai/download) depuis son site officiel, installez-le, ouvrez-le et suivez sa configuration initiale.

## 5. Télécharger un modèle de langage recommandé

Utilisez le navigateur de modèles de LM Studio. L’application peut proposer des modèles adaptés au matériel disponible ; choisissez-en un si vous hésitez.

Tenez compte des points suivants :

- Les petits modèles utilisent moins de RAM et répondent généralement plus vite.
- Les grands peuvent fournir de meilleures réponses, mais exigent plus de mémoire.
- Les modèles quantifiés utilisent généralement moins de RAM et de VRAM.
- Pour une première configuration, commencez par un petit modèle recommandé.

![Fenêtre de sélection de LM Studio avec les modèles téléchargés et leur taille.](./lm-studio-model-selection.avif)

Attendez la fin du téléchargement.

## 6. Démarrer le serveur API compatible OpenAI

Layla communique avec LM Studio via son API compatible OpenAI.

Dans LM Studio :

1. Ouvrez l’onglet **Developer**.
2. Sélectionnez ou chargez le modèle.
3. Ouvrez les paramètres du serveur.
4. Activez **Serve on Local Network**.
5. Démarrez le serveur API local.

![Écran Developer Local Server de LM Studio avec le serveur actif et ses paramètres.](./lm-studio-server-settings.avif)

LM Studio affiche une adresse API utilisant l’adresse IP locale du PC et le port du serveur, souvent `1234`, par exemple :

```text
http://192.168.1.100:1234
```

Pour une connexion compatible OpenAI, l’URL inclut normalement `/v1` :

```text
http://192.168.1.100:1234/v1/chat/completions
```

Utilisez l’adresse affichée par votre installation de LM Studio, car l’adresse IP réelle peut différer.

**Vous recherchez l’API compatible OpenAI à connecter à Layla.**

![Écran Developer montrant le serveur local, les points de terminaison compatibles OpenAI et les journaux, avec chat completions en évidence.](./lm-studio-api-endpoints.avif)

### Pourquoi Serve on Local Network est nécessaire

Même si Layla et LM Studio s’exécutent sur le même PC, BlueStacks utilise un environnement Android virtuel séparé. Cette adresse ne fonctionne donc généralement pas :

```text
http://localhost:1234/v1
```

Dans BlueStacks, `localhost` désigne Android, pas Windows. **Serve on Local Network** fournit une adresse réseau permettant à Layla d’atteindre LM Studio.

N’exposez le serveur que sur un réseau privé de confiance. Envisagez l’authentification API si d’autres appareils peuvent accéder au réseau.

## 7. Sélectionner l’API compatible OpenAI dans Layla

Dans Layla :

1. Ouvrez **Settings**.
2. Accédez à **Inference Settings**.
3. Choisissez **OpenAI Compatible API** comme moteur.

Layla enverra les requêtes à ce point de terminaison plutôt qu’à un moteur intégré.

![Fenêtre de choix du moteur d’inférence avec Local File, Your PC, Layla Cloud, OpenAI API et Claude API.](./layla-inference-engine.avif)

## 8. Saisir le point de terminaison LM Studio

Dans les paramètres de l’API compatible OpenAI, saisissez l’adresse réseau affichée par LM Studio, avec `/v1` si nécessaire, par exemple :

```text
http://192.168.1.100:1234/v1/chat/completions
```

**Ne copiez pas l’exemple tel quel. Utilisez l’adresse affichée sur votre PC.**

![Fenêtre Edit OpenAI API Settings avec nom, endpoint, clé API et modèle.](./layla-api-settings.avif)

Enregistrez les paramètres. Laissez LM Studio ouvert et vérifiez que le serveur fonctionne, que le modèle est disponible, que **Serve on Local Network** est actif et que le pare-feu Windows autorise LM Studio sur les réseaux privés.

## 9. Commencer à discuter

Ouvrez un personnage ou une nouvelle conversation et envoyez un message. Layla transmet le contexte au modèle de LM Studio et affiche sa réponse.

![Chat Layla via LM Studio, avec la question « Who are you? » et une réponse de Layla.](./layla-chat-via-lm-studio.avif)

Vous pouvez maintenant utiliser Layla dans BlueStacks et exécuter le modèle localement avec LM Studio.

## Résolution des problèmes

### Layla ne se connecte pas à LM Studio

Vérifiez que le serveur fonctionne, que **Serve on Local Network** est actif, que vous avez utilisé l’adresse réseau plutôt que `localhost`, que le port et `/v1` sont corrects et que le pare-feu ne bloque pas LM Studio. Redémarrez le serveur après tout changement réseau.

### Layla se connecte mais ne répond pas

Vérifiez qu’un modèle est téléchargé et disponible. Consultez les journaux du serveur pour confirmer la réception de la requête et essayez de charger manuellement le modèle.

### Les réponses sont très lentes

Les performances dépendent du processeur, du GPU, de la mémoire et du modèle. Essayez un modèle plus petit ou plus quantifié, fermez les applications gourmandes et réduisez la taille du contexte.

### BlueStacks indique que l’APK est incompatible

Ouvrez Multi-instance Manager et créez une nouvelle instance Android 64 bits, comme Pie 64-bit ou Android 11, puis installez-y l’APK.

### Le serveur ne fonctionne plus après le redémarrage du PC

Après un redémarrage de Windows, ouvrez LM Studio, revenez dans Developer et redémarrez le serveur avant de discuter.

## Questions fréquentes

### Puis-je exécuter Layla sur Windows ?

Oui. L’APK Android peut être exécuté sur Windows avec un émulateur comme BlueStacks.

### Existe-t-il une application Windows native ?

Ce guide utilise la version Android dans BlueStacks. Consultez le site de Layla pour les versions officielles et plateformes actuellement prises en charge.

### LM Studio exécute-t-il le modèle localement ?

Oui. LM Studio télécharge et exécute le modèle sur votre PC. D’autres fonctions de Layla peuvent néanmoins nécessiter Internet selon les services utilisés.

### BlueStacks et LM Studio doivent-ils rester ouverts ?

Oui. BlueStacks exécute Layla et le serveur API de LM Studio doit rester actif pour générer les réponses.

### Quel modèle LM Studio utiliser ?

Cela dépend de la RAM, de la VRAM et de la puissance du PC. Commencez par une recommandation de LM Studio, puis essayez des modèles plus grands si les performances le permettent.

## Résumé

1. Installez BlueStacks.
2. Téléchargez l’APK officiel de Layla.
3. Installez Layla dans BlueStacks.
4. Installez LM Studio et téléchargez un modèle.
5. Démarrez son serveur API compatible OpenAI.
6. Activez **Serve on Local Network**.
7. Saisissez le point de terminaison dans Layla.
8. Commencez à discuter.

Cette configuration fournit l’expérience Android de Layla sur un grand écran Windows tandis que le PC prend en charge l’inférence locale.
