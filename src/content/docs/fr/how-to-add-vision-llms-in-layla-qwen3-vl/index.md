---
title: Comment ajouter des LLM de vision dans Layla (Qwen3-VL)
description: Téléchargez un modèle GGUF Qwen3-VL et son fichier mmproj, puis configurez-les dans Layla pour reconnaître les images dans le chat.
category: Models & performance
order: 40
keywords:
  - LLM de vision
  - Qwen3-VL
  - mmproj
  - modèle de vision GGUF
  - reconnaissance d'images
lastUpdated: 2025-11-24
translationKey: how-to-add-vision-llms-in-layla-qwen3-vl
ai_translated: true
---

Cet article explique comment ajouter des LLM de vision à Layla.

Layla prend en charge les LLM de vision : vous pouvez envoyer des images dans le chat pour qu'elle les reconnaisse et en discute.

Prenons comme exemple la famille de modèles Qwen3-VL. Ces modèles offrent des fonctions de reconnaissance d'images qui fonctionnent bien sur mobile.

Voici comment les utiliser dans Layla :

**Étape 1 : télécharger les modèles Qwen3-VL**

Vous les trouverez dans le [dépôt Qwen3-VL-2B-Instruct-GGUF sur Hugging Face](https://huggingface.co/unsloth/Qwen3-VL-2B-Instruct-GGUF/tree/main).

Le modèle 2B est recommandé. Il est rapide et assez précis. Si votre téléphone est performant, vous pouvez essayer les modèles 4B ou 8B, plus grands.

Dans la liste des fichiers de la page, choisissez la quantification **Q4_K_M** et téléchargez-la.

![Liste de fichiers Hugging Face avec le fichier GGUF Qwen3-VL 2B Q4_K_M en surbrillance.](./qwen-model-download.png)

Faites défiler un peu la page et recherchez le fichier **mmproj-F16** :

![Liste de fichiers Hugging Face avec le fichier GGUF mmproj-F16 de Qwen3-VL en surbrillance.](./mmproj-download.png)

Téléchargez-le également.

**Étape 2 : configurer le modèle dans Layla**

Revenez dans Layla et ouvrez **Paramètres d'inférence**. Dans la section **LLM**, sélectionnez **Ajouter un modèle personnalisé**, puis **Choisir dans le stockage interne**.

![Paramètres d'inférence de Layla avec Ajouter un modèle personnalisé en surbrillance.](./add-custom-model.jpg)

![Sélecteur de moteur d'inférence de Layla avec Stockage interne en surbrillance.](./pick-internal-storage.jpg)

Vos paramètres devraient ensuite ressembler à ceux-ci. Notez le suffixe **Q4_K_M** dans le modèle sélectionné :

![Paramètres d'inférence de Layla affichant le modèle Qwen3-VL Q4_K_M sélectionné.](./selected-qwen-model.jpg)

Ouvrez ensuite la section **Vision du LLM** et sélectionnez votre fichier `mmproj`. Vos paramètres devraient ressembler à ceci :

![Paramètre Vision du LLM dans Layla affichant le modèle Qwen3-VL mmproj-F16 sélectionné.](./selected-mmproj-model.jpg)

Avec ces paramètres, vous pouvez envoyer des images dans le chat et Layla les reconnaîtra.
