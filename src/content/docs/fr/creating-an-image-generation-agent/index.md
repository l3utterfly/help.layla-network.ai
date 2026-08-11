---
title: Créer un Agent de génération d'images
description: Créez un Agent qui utilise le contexte de la conversation pour générer une image de la scène ou du personnage après chaque message.
category: Image generation
order: 30
keywords:
  - Agents Layla
  - Agent de génération d'images
  - invite Stable Diffusion
  - sortie structurée
  - images de jeu de rôle
lastUpdated: 2025-10-01
translationKey: creating-an-image-generation-agent
ai_translated: true
---

Dans cet article, nous allons créer un Agent de génération d'images. Cet Agent générera automatiquement une image après chaque message, afin de rendre la conversation plus immersive.

L'Agent utilisera le contexte de votre conversation pour générer une image.

Voici l'Agent en fonctionnement :

![Chat affichant une image générée d'une scène de montagne avec une cascade.](./image-agent-in-action.jpg)

Le principe consiste à demander au LLM d'ajouter une _invite Stable Diffusion_ après chaque message. Nous ajoutons une instruction à la fiche du personnage pour demander au LLM d'insérer une brève description de la scène entre les balises `<stable_diffusion_prompt></stable_diffusion_prompt>`.

Commencez par créer l'Agent. Cet Agent ressemble beaucoup à notre [Agent de jeu de rôle](/how-to-create-a-roleplay-agent/) :

![Paramètres de l'Agent de génération d'images, y compris son déclencheur regex.](./image-agent-triggers.jpg)

![Outil Sortie structurée configuré avec une grammaire pour les balises de l'invite Stable Diffusion.](./structured-output-grammar.jpg)

Nous utilisons ici une grammaire simple pour structurer la sortie afin qu'elle se termine par les balises `<stable_diffusion_prompt></stable_diffusion_prompt>`.

Créez ou copiez ensuite votre propre personnage. Deux opérations sont nécessaires. Commencez par ajouter une instruction personnalisée dans la section _Scénario_ afin de demander au LLM d'insérer des mots-clés décrivant la scène dans les balises de l'invite Stable Diffusion. Vous pouvez adapter cette instruction : demandez par exemple au LLM d'inclure la description du personnage pour générer des images centrées sur celui-ci plutôt que sur les scènes.

![Instructions du scénario du personnage demandant au LLM d'ajouter des mots-clés de génération d'images.](./character-scenario-instructions.jpg)

Associez ensuite l'Agent à votre personnage dans l'onglet _Avancé_, comme précédemment.

Enfin, activez la génération d'images dans vos _Paramètres d'inférence_. Pour en savoir plus, consultez [Comment activer la génération d'images dans Layla](/how-to-enable-image-generation-in-layla/).

Si votre téléphone est équipé d'un processeur Snapdragon, il est fortement recommandé de générer les images avec le NPU. Consultez [Layla prend en charge la génération locale d'images avec le NPU](https://www.layla-network.ai/post/layla-supports-generating-images-locally-using-the-npu) pour en savoir plus. Vos images ne prendront ainsi que quelques secondes à générer après chaque message et n'interrompront pas le fil de la conversation.

Voici l'Agent que vous pouvez importer :

[Télécharger generate-image-agent.json](/assets/articles/creating-an-image-generation-agent/generate-image-agent.json)
