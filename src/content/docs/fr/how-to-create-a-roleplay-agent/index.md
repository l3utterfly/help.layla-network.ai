---
title: Comment créer un Agent de jeu de rôle
description: Créez un Agent Layla qui oblige un personnage à répondre au format action-dialogue.
category: Agents & tools
order: 70
keywords:
  - Agents Layla
  - Agent de jeu de rôle
  - sortie structurée
  - grammaire BNF
  - action et dialogue
lastUpdated: 2025-10-01
translationKey: how-to-create-a-roleplay-agent
ai_translated: true
---

Voyons comment créer un _Agent de jeu de rôle_ simple dans Layla.

Cet Agent obligera votre personnage à répondre au format **action-dialogue**.

Par exemple :

> `*salue de la main et sourit* Bonjour !`

Créez un Agent avec les paramètres suivants :

![Paramètres du nom, de la description et du déclencheur regex de l'Agent de jeu de rôle.](./roleplay-agent-settings.jpg)

![Outil Sortie structurée de l'Agent de jeu de rôle et sa grammaire BNF.](./roleplay-structured-output.jpg)

Examinons le fonctionnement de cet Agent :

1. Le nom et la description peuvent être quelconques ; ils servent à identifier facilement votre Agent.

2. Nous utilisons le _Déclencheur regex_. Le regex `.` (point) correspond à n'importe quel contenu, donc l'Agent se déclenche à chaque message. C'est le comportement souhaité, car toutes les sorties doivent respecter notre format.

3. Nous utilisons l'outil _Sortie structurée_. Il utilise une grammaire BNF pour structurer la sortie :

   - `root` est toujours nécessaire ; il commence la définition de la grammaire.
   - `::=` est l'opérateur d'affectation qui associe une grammaire aux variables.
   - `turn` est notre variable personnalisée, définie sur la ligne suivante. Elle est composée du caractère littéral `*`, suivi de `fragment` — une autre variable définie par l'utilisateur —, d'un autre `*`, puis d'un second fragment.
   - `fragment` représente l'action ou le dialogue. Il correspond à tout contenu autre qu'un saut de ligne.

4. En combinant ces éléments, notre sortie est définie sous la forme `*fragment*fragment`, où chaque `fragment` peut contenir n'importe quel texte sans saut de ligne. C'est exactement le format recherché.

Voici le fichier de l'Agent à télécharger et à importer. Utilisez le bouton _Ajouter un nouvel Agent_ pour l'importer.

[Télécharger roleplay-action-dialogue.json](/assets/articles/how-to-create-a-roleplay-agent/roleplay-action-dialogue.json)
