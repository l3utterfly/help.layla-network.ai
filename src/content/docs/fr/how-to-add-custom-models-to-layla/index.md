---
title: Comment ajouter un modèle d’IA personnalisé à Layla
description: Ajoutez un modèle GGUF ou LiteRT local à Layla, connectez Layla Server ou Layla Cloud, ou configurez une API compatible OpenAI ou Claude.
category: Models & performance
order: 10
keywords:
  - modèle d’IA personnalisé
  - LLM local
  - modèle GGUF
  - IA hors ligne
  - API compatible OpenAI
  - API Claude
  - Layla Server
lastUpdated: 2026-08-09
translationKey: how-to-add-custom-models-to-layla
ai_translated: true
---

Layla peut exécuter un modèle d’IA personnalisé localement sur votre appareil Android ou se connecter à un modèle hébergé sur votre PC ou dans le cloud. Ce guide présente chaque option, notamment les modèles GGUF et LiteRT locaux, Layla Server, Layla Cloud, les API compatibles OpenAI et l’API Claude.

Si vous souhaitez une configuration d’IA privée et hors ligne, importez un modèle local compatible et exécutez-le directement sur votre appareil. Les autres options nécessitent une connexion à un PC ou à un service en ligne.

## 1. Ouvrir les paramètres d’inférence

Ouvrez **Paramètres d’inférence** depuis la page **Paramètres** de Layla. Vous pouvez également ouvrir directement la mini-application **Paramètres d’inférence**.

Dans la section **Mes modèles**, appuyez sur **Ajouter un modèle personnalisé**.

![La section Mes modèles des paramètres d’inférence de Layla, avec le bouton Ajouter un modèle personnalisé près du haut.](./Screenshot_20260809_203116_Layla.jpg)

## 2. Choisir où le modèle sera exécuté

Layla ouvre une fenêtre proposant plusieurs moteurs d’inférence. Vous pouvez importer un modèle local, vous connecter à Layla Server sur votre PC, utiliser Layla Cloud ou configurer un fournisseur d’API.

![La fenêtre des moteurs d’inférence de Layla avec les options Modèle local, Votre PC, Layla Cloud, API OpenAI et API Claude.](./Screenshot_20260809_203121_Layla.jpg)

### Modèle local : stockage interne ou carte SD

Choisissez **Stockage interne** ou **Carte SD** pour importer un modèle GGUF ou LiteRT compatible et l’exécuter localement sur votre appareil Android.

**Stockage interne** copie le modèle dans le stockage privé de Layla. Le fichier d’origine reste en place ; le modèle occupe donc deux fois l’espace disque, sauf si vous supprimez ensuite la copie d’origine. Cette copie garantit à Layla l’accès le plus fiable au modèle et offre généralement les meilleures performances et la meilleure stabilité. C’est l’option recommandée.

**Carte SD** référence le modèle dans son dossier existant au lieu de le copier dans Layla. Cela économise de l’espace, mais l’accès peut être moins stable. Après l’ajout, ne déplacez pas, ne renommez pas et ne supprimez pas le fichier d’origine, car Layla doit continuer à accéder exactement à cet emplacement.

### Votre PC avec Layla Server

Choisissez **Votre PC** pour connecter Layla à un modèle exécuté sur votre ordinateur via Layla Server. La fenêtre de configuration contient un bref tutoriel expliquant comment établir la connexion. Un article distinct sur Layla Server présentera la procédure complète.

### Layla Cloud

Choisissez **Layla Cloud** pour utiliser les modèles proposés par Layla Cloud. Ils sont exécutés en ligne, et non localement sur votre téléphone.

### API compatible OpenAI

Choisissez **API OpenAI** pour connecter tout service proposant une API de complétion de chat compatible OpenAI. Cela comprend OpenAI, le fournisseur d’API derrière ChatGPT, ainsi que des services comme OpenRouter, Google AI Studio, Azure et d’autres fournisseurs compatibles.

Saisissez un nom pour la connexion, le point de terminaison fourni par votre fournisseur et la clé d’API si elle est nécessaire. Vous pouvez également saisir un nom de modèle ou utiliser **Rechercher des modèles** lorsque le fournisseur prend en charge leur découverte.

![Le formulaire de configuration de l’API OpenAI dans Layla, avec les champs du nom, du point de terminaison, de la clé d’API et du modèle.](./Screenshot_20260809_203153_Layla.jpg)

Le point de terminaison doit être l’URL complète de complétion de chat, et non le seul domaine ou l’URL de base de l’API du fournisseur. Il se termine généralement par `/v1/chat/completions`, mais utilisez le chemin exact indiqué dans la documentation de votre fournisseur. Un segment manquant ou une faute de frappe dans ce champ empêche souvent Layla de se connecter.

### API Claude

Choisissez **API Claude** pour connecter un service utilisant le format d’API d’Anthropic. La configuration est similaire à celle d’une connexion compatible OpenAI : saisissez les informations de connexion demandées, la clé d’API, le modèle et le point de terminaison complet fourni par le fournisseur.

L’API Claude et l’API compatible OpenAI utilisent des formats de requête différents. Choisissez donc l’option correspondant à votre fournisseur. Comme avec l’option API OpenAI, un domaine seul ou un chemin incomplet peut empêcher la connexion.

## 3. Commencer à discuter avec le modèle personnalisé

Enregistrez les paramètres du modèle ou de la connexion, puis revenez dans Layla et commencez une conversation avec n’importe quel personnage. Layla utilisera la configuration de modèle sélectionnée dans **Paramètres d’inférence**.

Vous pouvez revenir dans **Mes modèles** à tout moment pour ajouter un autre LLM local, changer de fournisseur d’API ou basculer entre un modèle hors ligne, Layla Server et un modèle cloud.

## Questions fréquentes

### Puis-je ajouter mon propre modèle GGUF à Layla ?

Oui. Dans **Paramètres d’inférence**, appuyez sur **Ajouter un modèle personnalisé**, puis choisissez **Stockage interne** ou **Carte SD** afin de sélectionner un modèle GGUF compatible sur votre appareil.

### Un modèle local fonctionne-t-il sans accès à Internet ?

Oui. Une fois le modèle importé, l’inférence locale est exécutée sur votre appareil Android et peut fonctionner hors ligne. Les connexions à Layla Server, Layla Cloud ou à une API externe ont leurs propres exigences réseau.

### Dois-je importer un modèle dans le stockage interne ou utiliser la carte SD ?

Le stockage interne est recommandé pour bénéficier des meilleures performances et de la meilleure stabilité. L’option Carte SD évite de créer une seconde copie, mais exige que le modèle reste disponible à son emplacement d’origine.

### Pourquoi Layla ne parvient-elle pas à se connecter à mon modèle d’API ?

Vérifiez d’abord le point de terminaison. Il doit correspondre au chemin d’API complet attendu par votre fournisseur, souvent terminé par `/v1/chat/completions` pour un service compatible OpenAI, et ne contenir aucune faute de frappe. Vérifiez également que la clé d’API et le nom du modèle sont valides pour ce fournisseur.
