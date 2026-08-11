---
title: Comment importer des modèles Safetensor SD1.5 de Civitai dans Layla
description: Découvrez comment importer des fichiers Safetensor de Civitai dans Layla pour générer des images localement.
category: Image generation
order: 20
keywords:
  - SD 1.5
  - Safetensor
  - Civitai
  - génération d'images
  - Local Dream
lastUpdated: 2026-05-06
translationKey: how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla
ai_translated: true
---

Layla prend en charge les modèles Safetensor pour la génération d'images. La plupart des fichiers Safetensor de génération d'images sont disponibles sur [Civitai](https://civitai.com/).

Ce tutoriel vous accompagne dans l'importation de fichiers Safetensor de Civitai vers Layla.

**Étape 1 : ouvrir [Civitai](https://civitai.com/)**

![Page Modèles de Civitai avec les filtres de type de modèle, de format de fichier et de modèle de base en surbrillance.](./civitai-model-filters.png)

Ouvrez la section **Modèles**. Dans les filtres situés en haut à droite, sélectionnez **Checkpoint** sous **Type de modèle**. Sous **Format de fichier**, sélectionnez **SafeTensor**, puis sous **Modèle de base**, sélectionnez **SD 1.5**.

Vous obtiendrez une liste de tous les modèles d'images pris en charge par Layla.

**Étape 2 : télécharger le fichier Safetensor**

![Page de téléchargement d'un modèle Civitai affichant des exemples d'images générées.](./civitai-model-download.png)

Téléchargez le fichier Safetensor depuis la page de téléchargement. _Vérifiez que sa taille est d'environ 2 Go. Cela indique que le fichier est correctement formaté._

**Étape 3 : importer le fichier dans Layla**

Ouvrez **Paramètres** → **Paramètres d'inférence**.

Faites défiler jusqu'aux paramètres de **Génération d'images**, puis appuyez sur **Ajouter un modèle personnalisé**.

![Écran Paramètres d'inférence de Layla avec Ajouter un modèle personnalisé dans la section Génération d'images.](./image-generation-settings.jpg)

![Boîte de dialogue Layla permettant de choisir un modèle local de génération d'images ou SD Web UI.](./choose-image-model.jpg)

Sélectionnez le fichier Safetensor que vous venez de télécharger. Layla commencera à l'importer.

![Boîte de dialogue de progression de Layla pendant l'importation d'un fichier Safetensor.](./importing-safetensor.jpg)

![Boîte de dialogue Layla permettant de choisir un modèle local de génération d'images ou SD Web UI.](./choose-image-model.jpg)

**Étape 4 : générer une image**

Une fois votre modèle d'images importé, ouvrez la mini-application Local Dream et utilisez-la pour générer une image.

![Écran Local Dream configuré pour générer l'image d'une voiture rapide.](./local-dream-generate.jpg)

![Écran de sélection du modèle Local Dream affichant plusieurs modèles installés.](./local-dream-select-model.jpg)
