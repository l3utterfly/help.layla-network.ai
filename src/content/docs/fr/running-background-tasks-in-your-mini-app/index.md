---
title: Exécuter des tâches en arrière-plan dans votre mini-application
description: Découvrez comment task.js exécute périodiquement du travail en arrière-plan dans les mini-applications Layla, utilise le SDK préchargé, enregistre les résultats et partage sa logique avec votre application WebView.
category: Layla SDK
order: 20
keywords:
  - SDK Layla
  - task.js
  - tâches en arrière-plan des mini-applications Layla
  - QuickJS
  - build de tâche Vite
  - JavaScript en arrière-plan
lastUpdated: 2026-08-30
translationKey: running-background-tasks-in-your-mini-app
ai_translated: true
---

**Un fichier `task.js` donne à une mini-application Layla une tâche JavaScript à exécution unique que Layla peut lancer périodiquement en arrière-plan, sans ouvrir la WebView de la mini-application.** La tâche s'exécute dans un environnement isolé, reçoit un client SDK Layla prêt à l'emploi et peut renvoyer un résultat que l'utilisateur consultera dans le Gestionnaire de tâches de Layla.

Ce guide explique le modèle d'exécution, présente une petite tâche autonome, puis construit un `task.js` généré afin qu'une mini-application plus grande puisse réutiliser le même flux dans son interface et dans sa tâche en arrière-plan.

Le Gestionnaire de tâches distingue les tâches actives et désactivées des mini-applications installées qui ne fournissent pas de travail en arrière-plan. Pour chaque tâche active, il propose l'exécution manuelle, les journaux et le code source généré au même endroit.

![Gestionnaire de tâches de Layla affichant Dream comme tâche de mini-application active, une tâche de diagnostic désactivée et des mini-applications installées sans tâche en arrière-plan.](./task-manager.jpg)

Si vous débutez dans le développement de mini-applications, commencez par [Bien démarrer avec le SDK Layla](/getting-started-with-the-layla-sdk/).

## Qu'est-ce que `task.js` ?

`task.js` est un fichier facultatif situé à la racine d'une mini-application Layla empaquetée, à côté d'`app.json` et d'`index.html` :

```text
my-mini-app/
  app.json
  index.html
  task.js
  icon.png
```

Lorsque Layla trouve ce fichier, la mini-application apparaît dans le Gestionnaire de tâches. L'utilisateur peut lancer la tâche manuellement, activer ou désactiver son exécution en arrière-plan, et consulter le résultat et les journaux de sa dernière exécution.

Une tâche n'est pas un service qui tourne en continu. Layla la démarre, attend que sa valeur finale ou sa promesse se résolve, enregistre le résultat et détruit son environnement d'exécution. C'est l'hôte qui décide quand tenter le travail périodique en arrière-plan : `task.js` doit donc effectuer un seul passage utile puis se terminer. N'y placez pas votre propre planificateur ni de boucle d'interrogation.

`task.js` convient donc à des travaux tels que :

- Lire les conversations ou les mémoires récentes et enregistrer un résumé.
- Mettre à jour des données en cache pour la prochaine ouverture de la mini-application.
- Créer ou mettre à jour des enregistrements structurés dans la base de données de la mini-application.
- Générer un message et le programmer pour plus tard.
- Vérifier quels personnages nécessitent un traitement et traiter chacun d'eux une fois.

## Comment Layla exécute une tâche en arrière-plan

Les environnements WebView et tâche utilisent le même protocole SDK, mais ce sont deux environnements d'exécution distincts.

Lorsque Layla exécute une tâche, elle :

1. Crée un environnement QuickJS neuf, limité à cette mini-application.
2. Précharge le SDK Layla et le connecte à l'hôte.
3. Évalue le `task.js` de la mini-application comme un script JavaScript classique.
4. Attend si la valeur de complétion du script est une promesse.
5. Enregistre la réussite ou l'échec de l'exécution, sa durée, sa sortie et les journaux de console mis en tampon.
6. Détruit l'environnement d'exécution.

La file d'attente en arrière-plan exécute les tâches éligibles des mini-applications lorsque Layla n'est pas au premier plan. Les tâches désactivées sont ignorées. Une exécution manuelle utilise le même modèle d'exécution isolé.

Comme chaque exécution repart de zéro, les variables déclarées lors d'une exécution n'existeront pas lors de la suivante. Enregistrez l'état durable via le SDK. `layla.db.executeSql(...)` est un bon choix par défaut pour les données structurées. La tâche et l'application WebView partagent le même stockage privé de mini-application : l'interface peut donc lire ce que la tâche en arrière-plan a enregistré.

## Le SDK Layla est déjà disponible

N'importez pas `@layla-network/sdk` dans le `task.js` final. Layla injecte le SDK avant l'exécution de votre code et fournit ces variables globales :

- `layla` : un client SDK prêt à l'emploi.
- `Layla` : la classe du client SDK.
- `LaylaError`, `LaylaAbortError` et `LaylaBridgeUnavailableError` : les classes d'erreur du SDK.

Dans la plupart des tâches, utilisez directement l'instance `layla` existante :

```js
const characters = await layla.characters.list(0, 10);
```

Cette ligne doit toutefois se trouver dans une fonction asynchrone. `task.js` est évalué comme un script classique et non comme un module ES : `await` au niveau supérieur, `import`, `export` et `require(...)` ne sont donc pas disponibles. Encapsulez le travail asynchrone dans une expression de fonction asynchrone immédiatement invoquée (IIFE asynchrone) et faites de cette promesse la dernière expression du fichier.

L'environnement n'est pas non plus un navigateur. Il n'a ni DOM, ni `document`, ni `fetch`, ni `XMLHttpRequest`, ni `localStorage`, ni `setTimeout`, ni `setInterval`. Les promesses, `async`/`await`, `queueMicrotask`, `JSON` et les appels au SDK fonctionnent normalement.

Privilégiez les méthodes du SDK qui ont du sens sans interface visible : complétions de chat non diffusées, personnages, mémoires, messages programmés, classification de sentiment, fichiers privés et base de données SQLite privée. Évitez les flux d'interface ou d'interaction avec l'appareil comme l'entrée microphone, la lecture de synthèse vocale et l'audio en arrière-plan. Les écouteurs d'événements de longue durée conviennent également mal, car l'environnement disparaît à la fin de la tâche.

## Un exemple simple de `task.js`

Cette tâche compte la première page de personnages et enregistre chaque exécution dans la base de données privée de la mini-application :

```js
// task.js — the host has already created the global `layla` client.
console.info("Character snapshot task starting.");

(async () => {
  const ranAt = Date.now();
  const characters = await layla.characters.list(0, 10);

  await layla.db.executeSql(
    "CREATE TABLE IF NOT EXISTS character_snapshots (" +
      "id INTEGER PRIMARY KEY, ran_at INTEGER, character_count INTEGER)",
  );

  await layla.db.executeSql(
    "INSERT INTO character_snapshots (ran_at, character_count) VALUES (?, ?)",
    [ranAt, characters.length],
  );

  console.info(`Recorded ${characters.length} characters.`);

  return {
    status: "ok",
    ranAt,
    characterCount: characters.length,
  };
})();
```

L'IIFE asynchrone est délibérément la dernière expression. Layla attend sa promesse, puis enregistre l'objet renvoyé comme sortie de l'exécution. Veillez à ce que la valeur de retour soit sérialisable en JSON. Une promesse rejetée ou une erreur levée marque l'exécution comme un échec, tandis que tout ce qui est écrit avec `console.log`, `console.info`, `console.debug`, `console.warn` ou `console.error` est mis en tampon dans le journal d'exécution.

Les journaux sont affichés une fois l'exécution terminée, pas diffusés en direct. Utilisez-les pour des jalons concis et du contexte de diagnostic, et servez-vous de la valeur renvoyée pour le résumé final exploitable par une machine.

## Générer `task.js` quand le flux est plus complexe

Écrire `task.js` à la main convient à un petit travail. Cela devient malcommode lorsque la tâche en arrière-plan doit utiliser la même logique de sélection, d'invite, de validation ou de persistance que la mini-application visible.

Dream, une mini-application Layla en production, utilise un point d'entrée de tâche et une configuration de build distincts. Son point d'entrée importe des modules de flux et d'invites partagés depuis les sources de l'application principale. Vite suit ces imports et génère un unique `dist/task.js` autonome, avec le code partagé inclus. L'artefact généré ne contient aucun import, mais les sources restent découpées en modules ordinaires et maintenables.

La décision de conception clé est l'injection de dépendances : le code partagé reçoit un client Layla au lieu d'en construire un lui-même. La WebView transmet le client SDK qu'elle a importé ; la tâche transmet le client global `layla` fourni par l'hôte.

Commencez par un flux partagé :

```ts
// src/lib/recordCharacterSnapshot.ts
import type LaylaSDK from "@layla-network/sdk";

export async function recordCharacterSnapshot({
  layla,
  ranAt = Date.now(),
}: {
  layla: LaylaSDK;
  ranAt?: number;
}) {
  const characters = await layla.characters.list(0, 10);

  await layla.db.executeSql(
    "CREATE TABLE IF NOT EXISTS character_snapshots (" +
      "id INTEGER PRIMARY KEY, ran_at INTEGER, character_count INTEGER)",
  );
  await layla.db.executeSql(
    "INSERT INTO character_snapshots (ran_at, character_count) VALUES (?, ?)",
    [ranAt, characters.length],
  );

  return { status: "ok", ranAt, characterCount: characters.length };
}
```

L'import de type seul permet à TypeScript de vérifier la fonction partagée et disparaît du JavaScript compilé. La mini-application visible peut appeler la même fonction avec son instance SDK habituelle :

```ts
// src/main.ts
import LaylaSDK from "@layla-network/sdk";
import { recordCharacterSnapshot } from "./lib/recordCharacterSnapshot";

const layla = new LaylaSDK();

document.querySelector("#refresh")?.addEventListener("click", async () => {
  const result = await recordCharacterSnapshot({ layla });
  console.log(result);
});
```

Créez ensuite un petit point d'entrée de tâche. Il importe les sources partagées pendant le développement, mais le build supprime cette frontière de module :

```js
// src/task-entry.js
import { recordCharacterSnapshot } from "./lib/recordCharacterSnapshot";

console.info("Character snapshot background task starting.");

(async () => {
  return recordCharacterSnapshot({ layla });
})();
```

Donnez à ce point d'entrée son propre build Vite :

```ts
// vite.task.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  publicDir: false,
  build: {
    target: "es2020",
    outDir: "dist",
    emptyOutDir: false,
    copyPublicDir: false,
    minify: false,
    lib: {
      entry: "src/task-entry.js",
      formats: ["es"],
      fileName: () => "task.js",
    },
  },
});
```

Exécutez d'abord le build WebView habituel, puis le build de la tâche :

```json
{
  "scripts": {
    "build": "vite build && vite build --config vite.task.config.ts",
    "build:task": "vite build --config vite.task.config.ts"
  }
}
```

`emptyOutDir: false` préserve l'`index.html`, l'`app.json` et les ressources créés par le premier build. Le second build ajoute `dist/task.js` à côté d'eux.

Gardez les imports d'exécution de `@layla-network/sdk` hors du graphe de dépendances de la tâche. Les imports de type seul sont acceptables, mais la tâche générée doit utiliser le client injecté plutôt que d'embarquer un autre client SDK. Dans une application plus vaste, gardez le code propre à la WebView — mises à jour du DOM, état React, stockage navigateur, interface de streaming — en dehors du flux partagé.

Dream applique cette séparation à plus grande échelle : sa tâche source gère le chargement de données sans interface et l'orchestration, tandis que des modules partagés contiennent le flux qui choisit et programme un message de personnage. Le `task.js` de production est généré à partir de ces sources, si bien que les corrections du flux partagé s'appliquent aussi bien à l'action visible qu'à la tâche en arrière-plan.

## Vérifier l'artefact généré

Testez le fichier que Layla exécutera réellement, pas seulement `src/task-entry.js`.

Après le build, vérifiez que `dist/task.js` :

- Se trouve à la racine du paquet, à côté d'`app.json` et d'`index.html`.
- Ne contient aucune instruction `import`, `export` ni `require(...)`.
- N'embarque ni ne référence `@layla-network/sdk` à l'exécution.
- Se termine par l'IIFE asynchrone produisant une promesse comme expression de complétion.
- N'appelle ni API de navigateur, ni minuteurs, ni `fetch`.
- Renvoie une valeur sérialisable en JSON sur chaque chemin de réussite.

Pour une tâche complexe, ajoutez un petit harnais de test qui évalue `dist/task.js` avec un objet global `layla` factice. La mini-application Dream utilise cette approche pour éprouver l'artefact généré, capturer les requêtes SDK et vérifier les chemins d'inactivité comme de programmation réussie. Tester le bundle révèle des problèmes qu'un test unitaire au niveau des sources laisse passer, notamment des imports résiduels et un point d'entrée dont la valeur finale n'est pas la promesse du flux.

## Questions fréquentes

### `task.js` s'exécute-t-il dans la WebView de la mini-application ?

Non. Il s'exécute dans un environnement QuickJS isolé et neuf. Il ne peut pas accéder à la page, à l'état React ni au DOM, mais il peut utiliser le SDK Layla préchargé.

### Dois-je importer `LaylaSDK` dans `task.js` ?

Non. Utilisez l'instance globale `layla` injectée. Dans les modules TypeScript partagés, un import de type seul du SDK est acceptable, car il est supprimé à la compilation.

### Comment partager des données entre la tâche et l'interface ?

Utilisez le stockage privé de la mini-application via le SDK. `layla.db.executeSql(...)` convient bien à un état structuré, tandis que les utilitaires de fichiers privés du SDK conviennent aux réglages en forme de document ou aux fichiers générés. Les deux exécutions sont rattachées à la même mini-application.

### Une tâche peut-elle attendre avec `setTimeout` ?

Non. Les minuteurs ne sont pas disponibles, et une tâche en arrière-plan doit effectuer un seul passage. Terminez une fois le travail en cours achevé. Pour un futur message de personnage, utilisez `layla.chat.scheduleChatMessage(...)` plutôt que de maintenir la tâche en vie.

### Que doit renvoyer une tâche en arrière-plan ?

Renvoyez un petit résumé sérialisable en JSON, par exemple `{ status: "ok", processed: 4 }`. Utilisez les messages de console pour les détails de diagnostic. Levez une erreur lorsque l'exécution a réellement échoué, afin que le Gestionnaire de tâches la signale comme un échec.

## Concevoir pour un environnement éphémère et sans interface

Le bon modèle mental n'est pas « une copie cachée de ma mini-application », mais « un passage en arrière-plan avec le SDK Layla déjà connecté ». Gardez le point d'entrée réduit, déplacez le travail réutilisable dans des fonctions qui reçoivent leurs dépendances, persistez tout ce dont l'interface a besoin, et laissez le `task.js` généré se terminer sur un résultat clair.

Cette structure garde l'artefact d'arrière-plan compatible avec l'environnement isolé de Layla tout en permettant à une mini-application plus vaste de conserver une seule implémentation de son flux principal.
