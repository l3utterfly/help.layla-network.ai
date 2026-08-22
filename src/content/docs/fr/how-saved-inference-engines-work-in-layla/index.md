---
title: Fonctionnement des moteurs d’inférence enregistrés dans Layla
description: Découvrez comment Layla réunit modèles, vision, prompts, personas et préréglages d’échantillonnage dans des moteurs d’inférence réutilisables.
category: Models & performance
order: 45
keywords:
  - moteurs d’inférence
  - moteurs d’inférence enregistrés
  - paramètres de modèle par personnage
  - LLM local
  - modèles de prompt
  - préréglages d’échantillonnage
lastUpdated: 2026-08-22
translationKey: how-saved-inference-engines-work-in-layla
ai_translated: true
---

**Un moteur d’inférence enregistré est un ensemble réutilisable de paramètres qui indique à Layla comment générer une réponse.** Il peut associer un modèle ou une connexion à un modèle avec un modèle de vision, un modèle de prompt, une persona utilisateur et un préréglage d’échantillonnage. Vous pouvez sélectionner vous-même un moteur ou l’associer à un ou plusieurs personnages afin que Layla utilise la bonne configuration au début d’un chat.

Cette fonction est utile lorsqu’une configuration unique ne convient pas à toutes les conversations. Un assistant généraliste, un personnage de jeu de rôle et un personnage capable d’analyser des images peuvent nécessiter des modèles et des prompts différents, même s’ils fonctionnent tous dans la même application.

## Un moteur d’inférence ne se limite pas à un modèle d’IA

Le modèle est la partie qui produit le texte. Dans Layla, un moteur d’inférence décrit la configuration plus large utilisée pour exécuter ou contacter ce modèle et préparer ses réponses.

Par exemple, deux moteurs enregistrés peuvent utiliser le même modèle GGUF local avec des modèles de prompt, des personas ou des paramètres de génération différents. Un moteur peut aussi utiliser un modèle stocké sur votre téléphone, tandis qu’un autre se connecte à Layla Server, Layla Cloud, une API compatible avec OpenAI ou une API Claude.

Considérez **Mes modèles** comme la collection des modèles et connexions disponibles pour Layla. **Moteurs enregistrés** transforme une combinaison précise de paramètres en une configuration nommée que vous pouvez réutiliser plus tard.

Si vous n’avez pas encore ajouté le modèle ou la connexion souhaités, consultez [Comment ajouter un modèle d’IA personnalisé à Layla](/fr/how-to-add-custom-models-to-layla/).

## Contenu d’un moteur d’inférence enregistré

Lorsque vous enregistrez la configuration actuelle comme moteur, Layla conserve ensemble les choix suivants :

- **Modèle et source d’inférence :** un modèle local, Layla Server, Layla Cloud, un service compatible avec OpenAI ou un service compatible avec Claude.
- **Modèle de vision :** le composant de vision sélectionné, si le modèle de langage doit comprendre les images.
- **Modèle de prompt :** le format utilisé pour organiser les instructions du personnage, le contexte, les messages de l’utilisateur et les réponses destinées au modèle.
- **Persona :** l’identité et la description de l’utilisateur présentées au personnage.
- **Préréglage d’échantillonnage :** un ensemble facultatif de réglages de génération enregistrés, sélectionné lorsque vous nommez ou modifiez le moteur.
- **Associations aux personnages :** les personnages qui doivent utiliser automatiquement ce moteur.

Le moteur ne contient pas le fichier du modèle lui-même. Enregistrer un moteur ne crée donc pas une nouvelle copie d’un modèle GGUF local. Le modèle d’origine ou la connexion configurée doit rester disponible pour que le moteur fonctionne.

Les modèles de génération d’images sont configurés séparément. Les voix des personnages, les Agents, les LoreBooks, les instructions des personnages et les historiques de chat restent également distincts des moteurs d’inférence enregistrés.

## Créer un moteur d’inférence enregistré

Ouvrez **Paramètres d’inférence** depuis la page **Paramètres** de Layla, ou ouvrez directement la mini-application **Paramètres d’inférence**.

1. Sous **Mes modèles**, choisissez le modèle ou la connexion que vous souhaitez utiliser.
2. Sélectionnez un modèle de prompt adapté à ce modèle.
3. Sélectionnez un modèle de vision si la configuration doit accepter des images.
4. Sélectionnez la persona utilisateur à utiliser avec cette configuration.
5. Sous **Moteurs enregistrés**, touchez **Enregistrer la configuration actuelle comme moteur personnalisé**.

Layla affiche d’abord un récapitulatif du modèle, de la vision, du prompt et de la persona actuels. Vérifiez-le avant de continuer : ce sont ces paramètres qui formeront le moteur réutilisable. Touchez **Créer un nouveau moteur** pour ajouter une configuration distincte. Si des moteurs sont déjà enregistrés, vous pouvez plutôt en choisir un sous **Remplacer un moteur existant** afin de le mettre à jour avec la configuration actuelle.

![La fenêtre Enregistrer comme moteur récapitulant le modèle Layla Cloud sélectionné, le réglage de vision, le prompt Cloud et la persona User.](./new.jpg)

La fenêtre suivante détermine comment Layla identifie et utilise le moteur :

6. Saisissez un nom explicite pour le moteur.
7. Choisissez un préréglage d’échantillonnage enregistré ou laissez **Global** sélectionné pour utiliser les paramètres généraux de génération de Layla.
8. Sous **Associer au personnage**, sélectionnez tous les personnages qui doivent passer automatiquement à ce moteur.
9. Touchez **Enregistrer les modifications**.

![La fenêtre de modification d’un moteur d’inférence avec le nom du moteur, le préréglage d’échantillonnage Global et plusieurs personnages pouvant lui être associés.](./edit.jpg)

Des noms tels que « Chat général local », « Assistant vision » ou « Jeu de rôle — créatif » facilitent la lecture de la liste des moteurs. Le nom est particulièrement important lorsqu’un personnage possède plusieurs moteurs, car Layla l’affiche dans la fenêtre de sélection.

Pour en savoir plus sur l’association d’un modèle au bon format de prompt, consultez [Comment configurer des modèles de prompt personnalisés dans Layla](/fr/how-to-set-up-custom-prompt-templates-for-models/).

## Comment Layla choisit un moteur pour un chat

Au démarrage d’un chat, Layla vérifie si des moteurs enregistrés sont associés au personnage.

### Aucun moteur n’est associé au personnage

Layla utilise la configuration générale actuelle des **Paramètres d’inférence**. Il s’agit du réglage de secours normal pour les personnages qui n’ont pas besoin d’une configuration dédiée.

Vous pouvez modifier cette configuration générale en ouvrant la carte du moteur actuel sous **Moteurs enregistrés**, puis en choisissant un autre moteur. Layla charge alors ses choix de modèle, de vision, de prompt et de persona comme configuration actuelle.

### Un moteur est associé au personnage

Layla utilise automatiquement ce moteur. Il est prioritaire sur la configuration générale, ce qui permet au personnage d’utiliser systématiquement le modèle et le prompt prévus sans vous obliger à changer les paramètres avant chaque chat.

### Plusieurs moteurs sont associés au personnage

Dans un chat normal avec un personnage, Layla vous demande quel moteur utiliser avant de charger la conversation. Un même personnage peut ainsi disposer de plusieurs configurations valides, par exemple un modèle local rapide pour les échanges courts et un modèle plus grand pour un jeu de rôle prolongé.

La fenêtre de sélection affiche le nom et la source du modèle de chaque moteur. Touchez la configuration souhaitée pour ce chat ; Layla charge ensuite le moteur sélectionné.

![Un chat avec un personnage Layla demandant de choisir entre deux moteurs d’inférence associés au même personnage.](./select.jpg)

## Vérifier le moteur utilisé par un chat ouvert

Touchez le titre du chat en haut d’une conversation ouverte pour afficher les **Informations du chat**. Développez **Moteur d’inférence** pour voir le moteur sélectionné, le format du prompt, l’état du prompt système et la persona. La même fenêtre présente séparément les paramètres d’échantillonnage et les autres fonctions du chat, ce qui permet de distinguer le moteur d’inférence de la génération d’images, de la mémoire à long terme et des Agents.

![La fenêtre Informations du chat montrant le préréglage My engine, le format de prompt Cloud, le prompt système activé et la persona User.](./info.jpg)

## Fonctionnement des moteurs associés dans le jeu de rôle en groupe

Dans le jeu de rôle en groupe, chaque participant peut avoir un moteur différent. Layla vérifie le moteur associé au personnage dont c’est le tour et change la configuration du modèle si nécessaire.

Vous pouvez ainsi attribuer un modèle local spécialisé dans le jeu de rôle à un participant, et un modèle ou un format de prompt différent à un autre. Lorsque plusieurs intervenants consécutifs utilisent le même moteur, Layla peut conserver le modèle prêt à l’emploi au lieu de le recharger. Passer d’un modèle local à un autre peut prendre du temps et demander beaucoup de mémoire ; partager un moteur entre plusieurs participants est donc généralement plus fluide sur les appareils aux ressources limitées.

## Utiliser des préréglages d’échantillonnage avec les moteurs

Les paramètres d’échantillonnage influencent la manière dont un modèle choisit ses mots suivants. Ils peuvent modifier notamment la prévisibilité, la variété, la longueur des réponses et les répétitions.

Lorsque vous modifiez un moteur enregistré, vous pouvez lui associer l’un de vos préréglages d’échantillonnage ou conserver **Global**. Un moteur associé à un personnage et doté de son propre préréglage utilise ce dernier au démarrage du modèle. **Global** utilise à la place les paramètres de génération actuels des paramètres avancés de Layla.

Les préréglages d’échantillonnage sont utiles lorsqu’un personnage ou un modèle particulier nécessite un comportement de génération différent. Une configuration de jeu de rôle créative peut, par exemple, employer un autre préréglage qu’un assistant concis. Ils ne corrigent pas un modèle de prompt incompatible et ne permettent pas à un modèle trop volumineux de tenir en mémoire ; il s’agit d’éléments distincts de la configuration.

## Modifier, remplacer et supprimer des moteurs

Ouvrez la carte du moteur actuel sous **Moteurs enregistrés** pour afficher la liste. Chaque carte indique le nom du moteur, la source du modèle, le prompt, la persona et les personnages associés. Des étiquettes supplémentaires apparaissent si le moteur inclut la vision ou un préréglage d’échantillonnage.

Utilisez les filtres de personnages en haut pour limiter la liste aux moteurs associés à un personnage précis. Touchez la carte d’un moteur pour activer cette configuration, ou son icône en forme de crayon pour la modifier.

![La liste des moteurs d’inférence enregistrés avec des filtres par personnage et deux moteurs indiquant leur source, leur prompt, leur persona et les personnages associés.](./list.jpg)

La commande de modification permet de renommer un moteur, de changer son préréglage d’échantillonnage, de mettre à jour ses associations aux personnages ou de le supprimer. Pour actualiser en une fois le modèle, la vision, le prompt et la persona, préparez d’abord la nouvelle combinaison sur la page principale **Paramètres d’inférence**. Touchez ensuite **Enregistrer la configuration actuelle comme moteur personnalisé** et remplacez le moteur existant.

Supprimer un moteur retire la configuration réutilisable et ses associations aux personnages. Cette opération ne supprime pas le modèle local sous-jacent, le personnage, la persona, le modèle de prompt ni l’historique de chat.

## Confidentialité et utilisation du réseau

Le fait d’enregistrer un moteur d’inférence ne détermine pas s’il fonctionne hors ligne. Cela dépend de la source du modèle contenue dans le moteur.

Un modèle local et un modèle de vision local peuvent fonctionner entièrement sur votre appareil. Layla Server utilise une connexion à votre propre ordinateur, tandis que Layla Cloud et les API tierces envoient les requêtes aux services configurés. Changer de moteur peut donc également modifier le lieu où s’effectue l’inférence et les règles de confidentialité applicables.

## Questions fréquentes

### Un moteur d’inférence enregistré est-il identique à un modèle ?

Non. Le modèle n’est qu’une partie du moteur. Le moteur enregistré mémorise également les choix de vision, de prompt, de persona, d’échantillonnage et d’association aux personnages.

### L’enregistrement d’un moteur duplique-t-il mon modèle local ?

Non. Le moteur fait référence au modèle déjà disponible dans Layla. Il ne crée pas une autre copie du fichier GGUF ou LiteRT.

### Puis-je associer un moteur à plusieurs personnages ?

Oui. Sélectionnez tous les personnages qui doivent l’utiliser lors de la création ou de la modification du moteur.

### Que se passe-t-il si j’associe plusieurs moteurs au même personnage ?

Lorsque vous ouvrez un chat normal avec ce personnage, Layla vous demande quel moteur associé utiliser.

### Un moteur associé remplace-t-il mes paramètres d’inférence généraux ?

Oui. Si Layla trouve un moteur associé au personnage actif, celui-ci est prioritaire. Lorsqu’aucune association ne correspond, Layla utilise la configuration générale sélectionnée dans les **Paramètres d’inférence**.

### Un moteur enregistré inclut-il la génération d’images ?

Non. Les modèles et paramètres de génération d’images sont gérés séparément des moteurs d’inférence des modèles de langage.

### Que se passe-t-il si je supprime un modèle utilisé par un moteur enregistré ?

Le moteur ne dispose plus d’un modèle fonctionnel à charger. Sélectionnez un autre modèle et remplacez le moteur enregistré, ou restaurez le modèle ou la connexion manquants.

Les moteurs d’inférence enregistrés permettent à Layla d’organiser plusieurs configurations de modèles sans dupliquer leurs fichiers. Un moteur local reste une configuration hors ligne sur l’appareil ; les moteurs distants restent disponibles lorsque vous choisissez délibérément d’utiliser un PC ou un service en ligne.
