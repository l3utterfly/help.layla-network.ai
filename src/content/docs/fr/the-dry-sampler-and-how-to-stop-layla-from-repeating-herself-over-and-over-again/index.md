---
title: L'échantillonneur DRY et comment empêcher Layla de se répéter
description: Activez l'échantillonneur DRY dans les paramètres avancés afin de réduire les phrases répétées dans les réponses de Layla.
category: Models & performance
order: 60
keywords:
  - échantillonneur DRY
  - pénalité de répétition
  - paramètres avancés de Layla
  - réponses répétées
  - LLM quantifié
lastUpdated: 2024-04-26
translationKey: the-dry-sampler-and-how-to-stop-layla-from-repeating-herself-over-and-over-again
ai_translated: true
---

![Valeurs par défaut recommandées pour l'échantillonneur DRY.](./dry-sampler-defaults.jpeg)

La répétition est un problème courant avec cette génération de LLM, en particulier ceux qui fonctionnent sur votre téléphone. Cela s'explique en partie par leur quantification : ils ont été compressés en réduisant la précision de chaque neurone.

Il arrive que vos personnages répètent sans cesse les mêmes phrases. Pour atténuer ce problème, ouvrez les _Paramètres avancés_ et activez le multiplicateur DRY. Les valeurs indiquées dans l'image ci-dessus constituent de bons réglages par défaut. Vous pouvez les modifier afin de trouver les réglages les mieux adaptés à votre personnage.

Pour une explication plus détaillée de l'origine de ce comportement et du fonctionnement de DRY, consultez la [discussion sur l'échantillonneur DRY dans text-generation-webui](https://github.com/oobabooga/text-generation-webui/pull/5677#issue-2177692564).
