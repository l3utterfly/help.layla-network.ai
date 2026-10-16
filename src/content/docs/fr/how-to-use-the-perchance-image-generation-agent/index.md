---
title: Comment générer des images IA dans Layla avec l'Agent Perchance
description: Générez gratuitement des images IA de vos personnages dans les chats Layla avec l'Agent Perchance. Il lit le prompt d'image dans la réponse du personnage et automatise le site.
category: Image generation
order: 40
keywords:
  - génération d'images Perchance
  - Perchance AI girl generator
  - générateur d'images IA gratuit
  - générateur d'images IA pour Android
  - générateur d'images de personnages IA
  - images de compagnon IA
  - Agent de génération d'images Layla
  - Agents Layla
  - Agent Python Layla
  - prompt Stable Diffusion
  - alternative à Stable Diffusion
  - navigation web automatisée
lastUpdated: 2026-10-16
translationKey: how-to-use-the-perchance-image-generation-agent
ai_translated: true
---

**L'Agent de génération d'images Perchance permet à Layla de générer des images IA dans vos chats en utilisant à votre place le site « AI girl generator » de Perchance.** Lorsque votre personnage IA écrit un prompt d'image dans sa réponse, l'Agent ouvre le générateur dans le navigateur intégré de Layla, saisit le prompt, lance la génération, attend l'image et l'affiche dans votre chat.

C'est une alternative aux modèles d'images Stable Diffusion intégrés à Layla pour Android. L'image n'est pas calculée par votre téléphone, ce qui en fait une option gratuite si votre appareil est trop lent pour la génération d'images en local et que vous ne souhaitez pas d'abonnement. La contrepartie : une connexion Internet est nécessaire et votre prompt est envoyé à Perchance. Les modèles locaux de Layla continuent de fonctionner hors ligne ; cet Agent fait exception. Cet article explique comment le configurer, comment il fonctionne et comment le combiner avec d'autres Agents.

Voici une démonstration de l'Agent en action :

<video controls playsinline src="/assets/articles/how-to-use-the-perchance-image-generation-agent/perhance-auto.mp4"></video>

## Ce dont vous avez besoin

- Les mini-applications _Agents_ et _Interpréteur Python_ installées. Si vous ne les avez pas encore configurées, suivez [Comment activer la prise en charge de Python dans Layla](/how-to-enable-python-support-in-layla/).
- Une connexion Internet. Contrairement aux modèles locaux de Layla, cet Agent utilise un service en ligne.
- Le fichier de l'Agent, dont le lien figure à la fin de cet article.

## Étape 1 : désactiver la génération d'images par défaut de Layla

Cette étape est obligatoire. Ouvrez vos _Paramètres d'inférence_, faites défiler jusqu'à la section _Génération d'images_ et définissez le modèle de génération d'images sur **Aucun** (_None_).

La raison : la génération d'images native de Layla lit elle aussi la balise `<stable_diffusion_prompt>` dans la réponse d'un personnage. Si un modèle est encore sélectionné, Layla génère sa propre image à partir de la même balise et vous obtenez une seconde image en plus de celle de l'Agent. Lorsque le modèle est défini sur _None_, la balise est laissée à l'Agent.

Pour voir où se trouve ce paramètre, consultez [Comment activer la génération d'images dans Layla](/how-to-enable-image-generation-in-layla/), qui présente la section Génération d'images des Paramètres d'inférence.

## Étape 2 : importer l'Agent

Téléchargez le fichier de l'Agent à la fin de cet article, puis ouvrez la mini-application _Agents_ et utilisez le bouton _Add New Agent_ pour l'importer. L'Agent s'appelle _Perchance AI Girl: generate image_.

Vérifiez que l'interrupteur situé sous l'icône de l'Agent est activé. Par défaut, tout Agent que vous activez dans la mini-application Agents est disponible pour vos personnages. Vous pouvez aussi l'associer à un personnage personnalisé précis depuis l'onglet _Avancé_ du créateur de personnage, comme décrit dans [Comment activer les Agents, les fonctions et l'appel d'outils dans Layla](/how-to-enable-agents-functions-and-tool-calling-in-layla/).

## Étape 3 : demander une image

Lancez un chat et demandez une image, par exemple « montre-moi à quoi tu ressembles » ou « envoie-moi une image de la plage au coucher du soleil ».

L'Agent demande au modèle de répondre aux demandes d'image uniquement par un prompt d'image, sans rien d'autre. Après un court délai, Layla exécute l'automatisation et l'image apparaît dans le chat. Prévoyez un certain temps d'attente : l'Agent patiente jusqu'à 30 secondes pour le chargement de la page et jusqu'à trois minutes pour l'image, car la vitesse du générateur gratuit varie.

## Comment fonctionne l'Agent

L'Agent comprend trois éléments : un prompt système, un déclencheur et deux outils. Les comprendre facilite son adaptation.

En résumé, le déroulement est le suivant :

```text
Model reply with tag -> Regex trigger -> Execute Python Code -> Display Image
```

### 1. Le prompt système demande au modèle un prompt balisé

L'Agent donne cette instruction au modèle :

```text
If the user asks you to generate an image, output the image prompt inside this tag:

<stable_diffusion_prompt>your image prompt here</stable_diffusion_prompt>

Do not include any other text when generating an image. For other requests, respond normally.
```

Ainsi, lorsque vous demandez une image, le modèle répond par quelque chose comme :

```text
<stable_diffusion_prompt>a lighthouse on a cliff at sunset, dramatic clouds, oil painting</stable_diffusion_prompt>
```

Pour tout autre message, le modèle répond normalement.

### 2. Un déclencheur regex repère la balise

L'Agent utilise un _déclencheur regex_ qui s'applique à la **sortie** du modèle plutôt qu'à votre saisie. Son motif est :

```text
/<stable_diffusion_prompt>(.*?)<\/stable_diffusion_prompt>/s
```

Le motif repère la balise et capture tout ce qui se trouve entre la balise ouvrante et la balise fermante. Le drapeau `s` permet au prompt de s'étendre sur plusieurs lignes. Comme expliqué dans [Plongée au cœur des Agents Layla](/deep-dive-into-layla-agents/), le texte capturé devient l'entrée du premier outil de l'Agent. Dans cet Agent, le prompt capturé est inséré dans le script sous la forme `{{match$1}}`.

### 3. Un outil Python pilote le site

Le premier outil est _Exécuter du code Python_. Le script reçoit le prompt, ouvre Perchance, génère l'image et l'enregistre dans un fichier. La section suivante détaille ce fonctionnement.

### 4. Display Image affiche le résultat

Lorsque le script se termine, il affiche une seule ligne : l'emplacement de l'image enregistrée sous forme d'adresse `file://`. Cette sortie est l'entrée du second outil, _Display Image_, qui affiche le fichier dans le chat. Si le script échoue, il affiche un message d'erreur à la place d'une adresse et aucune image n'apparaît.

## Comment fonctionne la navigation web automatisée de Layla

Layla inclut un navigateur intégré (une WebView) que les scripts Python peuvent piloter. Un script peut charger une page, en lire le contenu, remplir des champs, cliquer sur des boutons et attendre l'apparition d'éléments, un peu comme une personne qui utilise un navigateur. Cet Agent s'appuie sur cette capacité pour faire ce que vous feriez autrement à la main sur le site de Perchance.

Le script suit ces étapes :

1. **Ouvrir le générateur.** Il charge `perchance.org/improved-ai-girl-generator` et laisse quelques secondes à la page pour finir de se charger.
2. **Saisir le prompt.** Il repère la zone de description sur la page et y entre le prompt issu de la réponse du modèle.
3. **Cliquer sur « generate ».** Il repère le bouton de génération et clique dessus. Si l'identifiant du bouton change un jour, le script se rabat sur la recherche de n'importe quel bouton intitulé « generate ».
4. **Attendre l'image.** Le temps de génération varie : le script vérifie donc chaque seconde, pendant trois minutes au maximum, si l'image résultante est apparue.
5. **Enregistrer l'image.** L'image terminée est déjà intégrée à la page. Le script la lit directement, l'enregistre dans un fichier du dossier temporaire et renvoie son emplacement.

Un détail mérite d'être connu. Le générateur Perchance est constitué de cadres imbriqués provenant d'origines différentes, dans lesquels un script ne peut normalement pas regarder. Le script contourne cela en parcourant tous les cadres de la page pour trouver la zone de description, le bouton et le résultat. C'est pourquoi chaque étape consiste à chercher puis agir, et non à cliquer à un emplacement fixe connu à l'avance.

L'image est enregistrée à chaque fois sous le même nom de fichier ; une nouvelle génération remplace donc le fichier temporaire précédent. Considérez ce fichier comme temporaire.

### Confidentialité et fiabilité

- Votre prompt d'image est saisi sur le site de Perchance : il quitte donc votre appareil. Le reste de votre conversation, non.
- Layla est conçue pour fonctionner hors ligne, mais cet Agent fait exception. Sans connexion Internet, il ne peut pas charger la page.
- L'Agent dépend de la mise en page d'un site tiers. Si Perchance refond le générateur, le script risque de ne plus trouver les bons éléments et l'Agent devra être mis à jour.
- Si la génération échoue ou dépasse le délai, l'Agent renvoie une erreur au lieu d'une image. Réessayez ou vérifiez que Perchance se charge avec votre connexion.

## Combiner l'Agent avec d'autres Agents de génération d'images

L'Agent ne se soucie que d'une chose : qu'une balise `<stable_diffusion_prompt>` apparaisse dans la sortie du modèle. Peu importe comment elle y est arrivée. Tout autre Agent qui crée ou modifie le contenu de cette balise fonctionne donc avec lui, et vous pouvez construire une petite chaîne à partir d'Agents distincts.

Quelques idées :

- **Garder un personnage cohérent.** Utilisez un Agent avec l'outil _Provide Context_ pour donner au modèle une description de l'apparence de votre personnage, et demandez-lui d'inclure cette description dans chaque prompt d'image.
- **Ajouter un style.** Utilisez un Agent qui ajoute un style fixe, comme « watercolor, soft lighting », au contenu de la balise. Vous pouvez aussi le demander dans les instructions de _Scénario_ du personnage.
- **Générer une image après chaque message.** Ajoutez au _Scénario_ de votre personnage une instruction lui demandant de terminer chaque réponse par une balise `<stable_diffusion_prompt>`, comme décrit dans [Créer un Agent de génération d'images](/creating-an-image-generation-agent/). L'Agent Perchance s'exécutera alors après chaque message, et pas seulement quand vous le demandez.
- **Utiliser un autre générateur.** Les outils de l'Agent sont un script Python ordinaire suivi de _Display Image_. Vous pouvez dupliquer l'Agent et modifier le script pour automatiser un autre site, en conservant le même prompt système et le même déclencheur.

Si vous créez plusieurs Agents qui traitent la même balise, gardez à l'esprit que chacun s'exécutera dès que la balise apparaît. N'activez que ceux que vous voulez voir agir sur une réponse donnée.

## Questions fréquentes

### Comment générer gratuitement des images IA de mon personnage dans Layla ?

L'Agent Perchance est une solution : il utilise un générateur en ligne gratuit, donc ni abonnement ni téléchargement de modèle. L'autre consiste à exécuter un modèle Stable Diffusion local sur votre appareil, ce qui fonctionne hors ligne. Consultez [Comment activer la génération d'images dans Layla](/how-to-enable-image-generation-in-layla/).

### Dois-je télécharger un modèle Stable Diffusion ?

Non. L'image est générée sur les serveurs de Perchance, aucun téléchargement de modèle n'est donc nécessaire. En revanche, vous devez définir le modèle de génération d'images propre à Layla sur _None_.

### Pourquoi ai-je obtenu deux images ?

La génération d'images intégrée de Layla est probablement toujours activée. Définissez le modèle de génération d'images sur _None_ dans les Paramètres d'inférence.

### Puis-je l'utiliser sans connexion Internet ?

Non. L'Agent charge un site web. Pour la génération d'images hors ligne, utilisez l'un des modèles locaux décrits dans [Comment activer la génération d'images dans Layla](/how-to-enable-image-generation-in-layla/).

### Puis-je changer de générateur ou ajouter mes propres étapes ?

Oui. Ouvrez l'Agent dans la mini-application Agents et modifiez l'outil _Exécuter du code Python_. Le script est du Python ordinaire qui utilise la bibliothèque `lython` de Layla pour contrôler le navigateur.

## Télécharger l'Agent

[Télécharger perchance-ai-girl-generator-auto.json](/assets/articles/how-to-use-the-perchance-image-generation-agent/perchance-ai-girl-generator-auto.json)

Utilisez le bouton _Add New Agent_ de la mini-application Agents pour l'importer.
