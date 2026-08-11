---
title: Comment activer la génération d'images dans Layla
description: Activez Stable Diffusion dans Layla et générez des images sur votre appareil, depuis votre PC ou avec Layla Cloud.
category: Image generation
order: 10
keywords:
  - génération d'images Layla
  - Stable Diffusion
  - Automatic1111
  - Layla Cloud
  - images de personnages
lastUpdated: 2024-12-14
translationKey: how-to-enable-image-generation-in-layla
ai_translated: true
---

Layla v5 permet de générer des images avec des modèles Stable Diffusion.

Dans Layla, vous pouvez générer des images de plusieurs manières :

1. Directement sur votre appareil, sans connexion à un fournisseur externe
2. En connectant votre téléphone à votre PC
3. Avec Layla Cloud

Quelle que soit la méthode choisie, vous devez activer la mini-application Stable Diffusion dans Layla :

![Mini-application Stable Diffusion dans Layla.](./stable-diffusion-mini-app.jpg)

**Utiliser directement votre appareil**

La génération d'images est effectuée par le processeur de votre téléphone ou de votre tablette. Layla propose plusieurs modèles Stable Diffusion intégrés à l'application. Vous pouvez les télécharger depuis la mini-application Stable Diffusion :

![Mini-application Stable Diffusion affichant le sélecteur de modèle local et la commande de téléchargement.](./choose-local-model.jpg)

Appuyez sur le bouton bleu de téléchargement en forme de nuage pour télécharger le modèle. L'opération peut prendre du temps, car les modèles sont assez volumineux. Appuyez sur la vignette du modèle en haut pour choisir un autre modèle.

Après avoir sélectionné un modèle et téléchargé ses fichiers, saisissez votre invite et les autres paramètres pour générer une image.

**Connecter votre téléphone à votre PC**

Si vous possédez un PC, vous pouvez installer [Stable Diffusion WebUI par AUTOMATIC1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui).

La configuration de Stable Diffusion WebUI d'AUTOMATIC1111 dépasse le cadre de ce tutoriel. Suivez le README de son dépôt GitHub ou l'un des tutoriels disponibles sur YouTube.

Après l'installation et la configuration de son API, connectez Layla depuis l'application Paramètres d'inférence. Faites défiler jusqu'aux paramètres Génération d'images :

![Section Génération d'images dans les Paramètres d'inférence de Layla.](./image-generation-settings.jpg)

Appuyez sur _Ajouter un modèle personnalisé_. Vous pourrez configurer les paramètres de l'API :

![Paramètres d'API d'un modèle d'images personnalisé pour connecter Layla à un PC.](./custom-model-api-settings.jpg)

Vous pouvez trouver l'adresse IP de votre PC à l'aide de votre routeur ou d'autres méthodes.

Une fois votre PC configuré, il sera disponible en tant que modèle Stable Diffusion lors de la génération d'images :

![Sélecteur de modèle Stable Diffusion affichant un modèle personnalisé exécuté sur un PC.](./select-pc-model.jpg)

**Utiliser Layla Cloud**

Certains modèles comportent un symbole de papillon dans le coin supérieur droit. Cela signifie qu'ils sont fournis par Layla Cloud et nécessitent un abonnement acheté dans l'application Layla Cloud. Tous les autres modèles génèrent les images localement sur votre téléphone.

![Modèles de génération d'images fournis par Layla Cloud, identifiés par des icônes de papillon.](./layla-cloud-models.png)

Ces modèles Layla Cloud offrent une génération d'images rapide et fluide et nécessitent l'abonnement correspondant.

**Autoriser vos personnages à envoyer des images pendant le chat**

Enfin, vous pouvez autoriser vos personnages à générer des images pendant la conversation. Cette fonction est disponible pour les personnages personnalisés.

Configurez les paramètres de génération d'images dans l'écran de création du personnage :

![Écran de création d'un personnage affichant sa configuration de génération d'images.](./character-image-generation.jpg)

Vous pouvez choisir le modèle Stable Diffusion propre à ce personnage.
