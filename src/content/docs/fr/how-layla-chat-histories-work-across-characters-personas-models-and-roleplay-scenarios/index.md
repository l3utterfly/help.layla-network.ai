---
title: Fonctionnement des historiques de chat Layla avec les personnages, personas, modèles et scénarios de jeu de rôle
description: Comprenez ce qui appartient à une conversation Layla, ce qui est restauré à sa réouverture et l’effet des changements de configuration sur les réponses suivantes.
category: Chat & memory
order: 20
keywords:
  - historique de chat
  - personnages
  - personas
  - modèles d’IA locaux
  - scénarios de jeu de rôle
lastUpdated: 2026-07-31
translationKey: how-layla-chat-histories-work-across-characters-personas-models-and-roleplay-scenarios
ai_translated: true
---

**Dans Layla, l’historique appartient à la conversation ; il n’est pas définitivement lié à un personnage, une persona, un modèle d’IA ou un scénario de jeu de rôle.** Lorsque vous rouvrez une conversation, Layla restaure sa configuration enregistrée par défaut, mais vous pouvez la modifier pour les messages suivants sans réécrire l’historique existant.

Cet article décrit le comportement attendu à la fois comme guide utilisateur et comme spécification technique. Il explique les paramètres enregistrés avec un chat, ce qui se produit quand un paramètre change et quand il vaut mieux créer une branche plutôt que poursuivre la conversation d’origine.

## En bref

Une conversation Layla contient deux types de données liés mais distincts :

1. **Historique de la conversation :** les messages déjà échangés, avec leur ordre, leur rôle et leur contenu enregistré.
2. **Configuration active :** le personnage, la persona utilisateur, le modèle, le scénario de jeu de rôle, les paramètres du prompt et les ressources associées utilisés pour générer la prochaine réponse.

Les messages existants restent dans le même historique lorsque la configuration active change. La nouvelle configuration s’applique à partir du prochain message généré.

Vous pouvez, par exemple, rouvrir un chat de personnage IA qui utilisait un modèle GGUF, choisir un autre modèle d’IA local compatible et poursuivre la conversation. Layla ne régénère ni ne modifie silencieusement les anciens messages. Le nouveau modèle peut cependant interpréter le même historique différemment, car les modèles varient dans leur gestion des prompts, leur longueur de contexte, leur style et leur respect des instructions.

## Matrice de comportement de l’historique

| Élément de configuration                    | Enregistré avec la conversation | Modifiable après réouverture | Modifie les messages existants | S’applique aux réponses suivantes |
| ------------------------------------------- | ------------------------------- | ---------------------------- | ------------------------------ | --------------------------------- |
| Personnage                                  | Non                             | Oui                          | Non                            | Oui                               |
| Persona utilisateur                         | Non                             | Oui                          | Non                            | Oui                               |
| Modèle d’IA                                 | Non                             | Oui                          | Non                            | Oui                               |
| Moteur d’inférence                          | Non                             | Oui                          | Non                            | Oui                               |
| Scénario de jeu de rôle                     | Non                             | Oui                          | Non                            | Oui                               |
| Prompt système ou instructions avancées     | Non                             | Oui                          | Non                            | Oui                               |
| LoreBooks ou ressources contextuelles       | Non                             | Oui                          | Non                            | Oui                               |
| Paramètres de génération                    | Non                             | Oui                          | Non                            | Oui                               |
| Titre du chat et métadonnées d’organisation | Oui                             | Oui                          | Non                            | Non                               |

La règle essentielle est que les changements de configuration sont **prospectifs**. Ils modifient la composition du prochain prompt et la génération de la prochaine réponse, sans réécrire la transcription enregistrée.

## Rouvrir un chat

Lorsque vous rouvrez une conversation enregistrée, Layla restaure le personnage, la persona, le modèle d’IA, le moteur d’inférence, le scénario, les ressources contextuelles et les paramètres de génération actifs lors de la dernière utilisation. Un compagnon IA ou un jeu de rôle de longue durée peut ainsi reprendre sans configuration répétée.

Ces valeurs constituent seulement la configuration initiale. Vous pouvez les modifier avant d’envoyer le message suivant.

![Écran Messages sombre avec une rangée d’avatars, une barre Search Messages et deux chats Layla montrant des aperçus tronqués et des icônes de suppression.](./chat-history-messages.gif)

## Modifier la configuration active

Vous pouvez modifier un ou plusieurs éléments de configuration tout en conservant le même historique de chat IA. Layla utilise la configuration mise à jour pour construire la requête suivante.

### Changer de personnage

Changer de personnage conserve la transcription, mais modifie les instructions des réponses suivantes. Le nouveau personnage reçoit la partie du contexte qui tient dans la fenêtre active du modèle. Pour une identité ou un passé sans rapport, créez une branche ou un nouveau chat afin d’éviter les conflits de continuité.

### Changer de persona utilisateur

Changer de persona conserve les messages et applique la nouvelle description de l’utilisateur aux tours suivants. Utilisez une branche distincte lorsque les identités diffèrent fortement.

### Changer de modèle d’IA

Un chat enregistré peut utiliser un autre modèle pris en charge. Layla conserve l’historique et le prépare selon le format de prompt du nouveau modèle. L’interprétation des personnages, le ton, les capacités et la taille du contexte peuvent changer. Une fenêtre plus petite peut exclure d’anciens messages d’une génération, mais ceux-ci restent enregistrés.

### Changer de scénario de jeu de rôle

Un nouveau scénario guide les messages suivants tandis que l’historique existant reste disponible. Créez d’abord une branche pour tester une chronologie, un lieu ou un résultat contradictoire.

## Spécification technique du comportement

Les règles suivantes définissent le comportement attendu des historiques configurables de Layla :

1. **La conversation est le conteneur principal de l’historique.** Son identité est indépendante des identifiants de personnage, persona, modèle et scénario.
2. **Les messages sont des enregistrements préservés.** Un changement de configuration ne doit jamais réécrire silencieusement un contenu enregistré.
3. **La dernière configuration active est enregistrée avec le chat** et restaurée si ses ressources restent disponibles.
4. **Les changements s’appliquent à la génération suivante.** La composition du prompt utilise la configuration actuelle et l’historique admissible.
5. **La sélection du contexte dépend du modèle.** Les limites de contexte déterminent les messages inclus dans un prompt, pas ceux qui restent enregistrés.
6. **Les duplications ont des identités indépendantes.** Leur état futur n’est pas partagé avec le chat source.
7. **La suppression de la configuration et celle de l’historique sont deux opérations distinctes.**

Pour les diagnostics et les exportations, chaque message généré peut conserver des métadonnées de provenance identifiant son personnage, sa persona, son modèle, son moteur et son scénario. Elles aident à expliquer les changements de comportement d’une conversation ayant utilisé plusieurs configurations.

## Confidentialité et stockage local

Layla est un assistant IA privé et hors ligne pour Android et iOS. Avec un moteur d’inférence local et un modèle GGUF local, l’historique, la configuration, le traitement des prompts et la génération restent sur l’appareil. Si vous utilisez volontairement une API distante ou compatible OpenAI, les règles de traitement des données de ce point de terminaison s’appliquent également.

## Questions fréquentes

### Les historiques de Layla sont-ils isolés par personnage ?

Non. Une conversation mémorise le personnage sélectionné, mais l’historique appartient au chat. Vous pouvez changer de personnage pour les messages suivants sans supprimer ni réécrire la transcription existante.

### Puis-je rouvrir la même conversation avec une autre persona ?

Oui. La nouvelle persona s’applique aux générations suivantes. Si elle contredit l’historique, créez une branche ou un nouveau chat.

### Puis-je changer de modèle d’IA sans perdre l’historique ?

Oui. Les messages enregistrés restent disponibles. Une fenêtre de contexte plus petite peut inclure moins d’anciens messages dans une génération, sans les retirer du stockage.

### Changer de scénario réinitialise-t-il la conversation ?

Non. Le nouveau scénario met à jour les instructions des réponses suivantes. L’ancien historique de jeu de rôle reste dans la conversation.

### Quel est le moyen le plus sûr de comparer deux modèles ou scénarios ?

Créez une branche, attribuez un modèle ou un scénario différent à chaque copie, puis poursuivez-les séparément.

La conception centrée sur la conversation de Layla prend en charge les échanges de longue durée avec des compagnons IA, le jeu de rôle et les comparaisons de modèles sans imposer un historique distinct à chaque changement. La transcription reste stable tandis que la configuration active demeure suffisamment flexible pour poursuivre localement avec le personnage, la persona, le modèle et le scénario adaptés à la réponse suivante.
