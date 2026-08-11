---
title: Intégrations de Layla avec Tasker
description: Utilisez les tâches Tasker de Layla et l'événement de fin de tâche pour automatiser des processus Android à l'aide d'un LLM.
category: Mini-apps & integrations
order: 50
keywords:
  - intégration de Layla avec Tasker
  - automatisation Android
  - inférence en arrière-plan
  - événement Tâche terminée
  - automatisation avec un LLM
lastUpdated: 2024-10-17
translationKey: layla-integrations-with-tasker
ai_translated: true
---

Layla est intégrée à Tasker. Vous pouvez automatiser des tâches à l'aide d'un LLM.

![Logo de Tasker.](./tasker-logo.png)

**Qu'est-ce que Tasker ?**

Tasker permet de créer des tâches automatisées en fonction de conditions de déclenchement sur votre appareil. Vous pouvez par exemple demander à un LLM de résumer le contenu d'un nouvel e-mail dès sa réception.

_Remarque : cette fonctionnalité nécessite l'achat de [Tasker sur Google Play](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm&hl=en)._

Layla n'est pas affiliée à Tasker. Tasker est une application populaire d'automatisation Android.

**Comment créer une tâche Tasker avec Layla**

Layla propose deux tâches principales :

1. **Infer:** envoie une invite et une entrée à Layla. Layla crée une tâche d'inférence qui transmettra ensuite l'entrée à un LLM et renverra la sortie.
2. **Infer in Background:** effectue la même opération, mais exécute immédiatement l'inférence avec le LLM en arrière-plan.

Les deux tâches acceptent des entrées configurables, telles que le modèle LLM, les invites système et l'entrée brute. Celles-ci sont fournies sous forme de variables Tasker, ce qui permet d'enchaîner facilement les tâches avec d'autres actions.

![Exemple de chaîne Tasker utilisant une variable et l'action Create Infer Task de Layla.](./tasker-chain.jpg)

L'image ci-dessus montre un exemple de configuration d'une tâche :

1. L'action _Variable Set_ peut être remplacée par une sortie obtenue à partir d'autres tâches. Par exemple, si vous utilisez AutoNotification dans Tasker, vous pouvez récupérer les données de vos notifications et les transmettre au LLM.
2. _Create Infer Task_ est la tâche principale exposée par Layla. Elle transmet au LLM les variables définies avant son exécution. Vous pouvez par exemple lui demander de résumer le contenu de la notification fournie précédemment.

![Options configurables d'une tâche d'inférence Layla dans Tasker.](./infer-task-options.jpg)

Layla expose également un événement _Task Completed_ :

![Événement Task Completed de Layla dans Tasker.](./task-completed-event.jpg)

Cet événement est déclenché chaque fois qu'une tâche d'inférence se termine dans le cadre du traitement en arrière-plan de Layla. Vous pouvez ainsi l'intercepter et exécuter d'autres actions à partir de la sortie de la tâche.
