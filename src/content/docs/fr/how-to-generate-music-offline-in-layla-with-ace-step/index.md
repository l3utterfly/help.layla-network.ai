---
title: Comment générer de la musique hors ligne dans Layla avec ACE-Step
description: Installez la mini-application ACE-Step, téléchargez un modèle musical et générez des chansons complètes avec paroles sur votre téléphone Android ou votre iPhone, sans connexion Internet.
category: Mini-apps & integrations
order: 35
keywords:
  - générateur de musique IA
  - génération musicale IA hors ligne
  - générer de la musique sur Android
  - générateur de musique IA pour iPhone
  - ACE-Step
  - générateur de chansons IA avec paroles
  - texte vers musique IA
  - génération musicale sur l'appareil
  - application de musique IA sans abonnement
  - modèle musical IA local
lastUpdated: 2026-09-09
translationKey: how-to-generate-music-offline-in-layla-with-ace-step
ai_translated: true
---

**Layla peut générer des chansons complètes — style, mélodie, arrangement et paroles chantées — entièrement sur votre téléphone, grâce au modèle musical ACE-Step 1.5. Rien n'est envoyé en ligne, aucun compte n'est nécessaire, et tout fonctionne avec le réseau désactivé.**

![Le logo ACE-Step.](./acestep.png)

Cet article explique comment installer la mini-application Music Generation, télécharger un pack de modèle, rédiger une invite et utiliser les paramètres qui contrôlent la vitesse et la qualité.

## Qu'est-ce qu'ACE-Step ?

ACE-Step est un modèle de génération musicale développé par ACE Studio et StepFun. Il prend une description textuelle d'une chanson — genre, ambiance, instruments, tempo — et éventuellement des paroles, puis produit un fichier audio fini en 48 kHz stéréo.

Contrairement aux générateurs de musique IA en ligne que vous avez peut-être utilisés, ACE-Step dans Layla s'exécute localement sur le processeur ou le GPU de votre appareil. Il n'y a ni file d'attente, ni système de crédits, ni limite du nombre de morceaux. En contrepartie, la génération prend un temps réel sur un téléphone plutôt que quelques secondes sur un GPU de centre de données, et les fichiers de modèle sont volumineux.

Layla exécute ACE-Step via [acestep.cpp](https://github.com/ServeurpersoCom/acestep.cpp), une implémentation du modèle basée sur GGML. C'est le même principe que les modèles de texte de Layla qui tournent sur [llama.cpp](https://github.com/ggerganov/llama.cpp) : le modèle est quantifié jusqu'à une taille qu'un téléphone peut contenir, puis exécuté sur le matériel que vous possédez déjà.

## Ce qu'il vous faut

- **Layla sur Android ou iOS.** La génération musicale fonctionne de la même manière sur les deux plateformes.
- **La version premium de Layla.** Toutes les mini-applications l'exigent. Layla est un achat unique, pas un abonnement.
- **Environ 5 Go d'espace libre** pour un pack de modèle. Les packs pèsent entre 4,2 Go et 5,3 Go environ.
- **6 Go de mémoire vive** pour les quantifications les plus légères, **8 Go** pour les plus lourdes.
- **De la patience au premier lancement.** Le modèle doit être chargé en mémoire avant le premier morceau d'une session.

## Étape 1 : activer la mini-application Music Generation

La génération musicale est une fonctionnalité optionnelle, elle n'est donc pas activée par défaut. Ouvrez _Mes applications_, appuyez sur le signe plus en haut à droite pour parcourir toutes les fonctionnalités disponibles, puis activez **Music Generation (Ace Step)**.

Si vous n'avez jamais utilisé le système de mini-applications, consultez [Comment activer ou désactiver les mini-applications dans Layla](/fr/how-to-enable-disable-mini-apps-within-layla/).

Une fois activée, l'application apparaît dans votre liste d'applications et s'ouvre sur deux onglets : **Create** et **Library**.

## Étape 2 : télécharger un pack de modèle

Appuyez sur la carte du modèle en haut de l'onglet Create pour ouvrir le sélecteur de packs. Chaque entrée est un pack autonome : le modèle de langage qui écrit les paroles et la mélodie, le transformeur de diffusion qui génère l'audio, un encodeur de texte et le décodeur qui transforme le résultat en son. Vous ne choisissez qu'un seul pack — il n'y a aucun fichier séparé à assortir.

Les packs se distinguent selon deux axes.

**Variante** — le caractère musical du modèle :

| Variante                | Description                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| Turbo                   | Génération rapide en 8 étapes. Le meilleur choix par défaut sur téléphone.                |
| SFT-Turbo50             | Une fusion des modèles turbo et affiné. Vitesse du turbo avec un rendu un peu plus riche. |
| Turbo Continuous        | Turbo réglé pour les morceaux continus ou en boucle transparente.                         |
| Turbo Shift-1 / Shift-3 | Turbo avec des programmes d'échantillonnage alternatifs. Timbre différent.                |

**Quantification** — le compromis entre taille et qualité, le même concept que [les quantifications GGUF pour les modèles de texte](/fr/what-are-gguf-models-what-are-model-quants/) :

| Quant  | Remarques                                        |
| ------ | ------------------------------------------------ |
| Q4_K_M | La plus légère, qualité la plus basse. 6 Go RAM. |
| Q5_K_M | Légère et équilibrée. 6 Go RAM.                  |
| Q6_K   | Plus lourde, meilleure qualité. 8 Go RAM.        |
| Q8_0   | La plus lourde, quasiment sans perte. 8 Go RAM.  |

En cas de doute, commencez par **Turbo Q5_K_M**.

Appuyez sur _Download bundle_ : le téléchargement se poursuit en arrière-plan — vous pouvez quitter la mini-application, et même quitter Layla, sans perdre la progression. Une fois le transfert terminé, Layla décompresse l'archive et vérifie que les quatre fichiers de modèle sont bien arrivés. La carte affiche _Installed_ lorsque le pack est prêt.

Un pack dont vous n'avez plus besoin peut être supprimé avec _Delete bundle_ et retéléchargé plus tard.

## Étape 3 : décrire la musique

Le champ **Style** est le contrôle principal. Décrivez la musique comme vous la décririez à un musicien : genre, ambiance, instrumentation, production, tempo.

Invite faible :

> chanson pop

Meilleure invite :

> synthpop onirique, nappes analogiques chaudes, batterie à réverbération gated, voix féminine soufflée, 120 bpm, lumineux et nostalgique

Le détail aide. Le modèle lit ce texte deux fois — une première fois lorsque le modèle de langage planifie la structure et les paroles, puis une seconde fois lors de la génération de l'audio — si bien que les instruments précis, les adjectifs de production et un tempo orientent tous le résultat dans une direction nette.

![L'onglet Create de la mini-application Music Generation de Layla, avec la carte du pack de modèle, le champ Style et le champ Lyrics contenant des balises de section.](./lyrics.jpg)

## Étape 4 : avec ou sans paroles

Sous le champ de style se trouve le champ **Lyrics** et son interrupteur **Instrumental**.

- **Laissez le champ des paroles vide** et le modèle écrit lui-même les paroles à partir de votre description de style. C'est le moyen le plus rapide d'obtenir une chanson complète à partir d'une invite d'une seule ligne.
- **Écrivez vos propres paroles** et le modèle les chante telles quelles. Utilisez des balises de section sur leur propre ligne pour structurer l'arrangement :

```
[verse]
Streetlights blink along the empty road
Radio static, half a song I know

[chorus]
Drive until the morning finds us
Nothing in the mirror behind us
```

Les balises comme `[intro]`, `[verse]`, `[pre-chorus]`, `[chorus]`, `[bridge]`, `[guitar solo]` et `[outro]` sont comprises, et une balise peut porter sa propre description, par exemple `[bridge - saxophone and strings]`.

La langue du chant est détectée à partir des paroles que vous écrivez : vous pouvez donc écrire en français, en japonais ou dans toute autre langue prise en charge par le modèle, et le résultat sera chanté dans cette langue.

- **Activez Instrumental** pour un morceau entièrement sans voix.

## Étape 5 : durée et graine

**Duration** propose des durées prédéfinies de 30 secondes à 3 minutes. Les morceaux plus longs prennent proportionnellement plus de temps à générer : 30 secondes est donc la durée raisonnable tant que vous peaufinez encore votre invite.

**Seed** contrôle l'aléatoire. Laissez le champ vide pour obtenir un résultat différent à chaque fois, ou saisissez un nombre — ou appuyez sur le dé — pour rendre une génération reproductible. La même graine avec la même invite et les mêmes réglages produit le même morceau, ce qui est exactement ce que vous voulez lorsque vous approchez du résultat souhaité et ne modifiez qu'un mot de l'invite.

![La section Parameters avec l'interrupteur Use GPU, les durées prédéfinies, le champ de graine et le panneau Advanced déplié montrant Steps, Shift et Solver.](./duration.jpg)

## Générer un morceau

Appuyez sur **Generate music**. Une seule barre de progression couvre l'ensemble du travail, avec une étiquette indiquant l'étape en cours :

1. **Loading model** — le modèle de langage est chargé en mémoire.
2. **Writing structure / Writing lyrics** — le tempo, la tonalité, la signature rythmique et les paroles, si vous ne les avez pas fournies.
3. **Composing melody** — le contenu musical est planifié.
4. **Generating music** — l'audio lui-même est généré, étape par étape.
5. **Decoding audio** — le résultat est converti en forme d'onde.

Vous pouvez appuyer sur **Stop** à tout moment. La génération s'arrête une fois l'étape en cours terminée, il y a donc une courte attente avant l'arrêt effectif. Layla garde l'écran allumé pendant toute la durée afin que le travail ne soit pas interrompu.

À la fin de la génération, une carte de lecture apparaît avec une forme d'onde. Appuyez sur la forme d'onde pour vous déplacer dans le morceau, utilisez le bouton de lecture pour l'écouter, l'icône de téléchargement pour enregistrer ou partager le fichier, et l'icône de corbeille pour le supprimer.

Chaque morceau est écrit sous forme de fichier WAV 48 kHz stéréo dans le dossier propre à la mini-application et répertorié dans l'onglet **Library**, accompagné du modèle, du nombre d'étapes et de la graine qui l'ont produit. Rien n'est supprimé automatiquement — faites le ménage de ce dont vous ne voulez pas, car des fichiers WAV de cette qualité s'accumulent vite.

## Paramètres avancés

Ouvrez **Advanced** sous Parameters pour un contrôle plus fin. La plupart des utilisateurs n'ont jamais besoin d'y toucher, et les valeurs par défaut conviennent aux modèles fournis.

**Steps et Shift** sont vides par défaut, ce qui signifie que chaque modèle utilise les valeurs avec lesquelles il a été entraîné — 8 étapes pour la famille turbo, 50 pour les modèles de base et affinés. Saisissez un nombre pour les remplacer. Davantage d'étapes signifie généralement plus de détail et plus de temps.

**Solver** sélectionne l'algorithme d'échantillonnage : Euler, SDE, DPM++ 3M ou STORK-4. Euler est la valeur par défaut. Changer de solveur modifie la texture du résultat à nombre d'étapes égal, et vaut la peine d'être expérimenté une fois que vous avez une invite qui vous plaît.

**Guidance (CFG)** contrôle la fidélité de l'audio à votre invite de style. Ce réglage n'apparaît que pour les modèles où il s'applique : les modèles turbo intègrent le guidage dans leurs poids, Layla le fixe donc à 1.0 et vous l'indique plutôt que de vous laisser saturer le résultat.

**LM Guidance (CFG)** fait de même pour l'étape des paroles et de la mélodie, et s'applique à tous les modèles. La valeur par défaut de 1.0 est le réglage le plus rapide. L'augmenter vers 2.0 resserre la fidélité de la composition à votre invite, au prix d'un temps environ doublé pour cette étape.

**Use GPU** déplace la génération audio vers le GPU de votre appareil — Metal sur iOS, OpenCL sur Android — avec un repli sur le processeur en cas d'échec. L'étape des paroles et de la mélodie s'exécute toujours sur le processeur : elle est limitée par la mémoire plutôt que par le calcul, et un GPU mobile y est plus lent. Le GPU est désactivé par défaut car le chemin processeur est la référence compatible ; savoir s'il est plus rapide mérite d'être testé sur votre propre appareil.

**Flash attention** accélère la génération audio au prix d'une certaine qualité. Désactivé par défaut.

**VAE tile size** définit la quantité d'audio décodée en une fois. Réduire cette valeur diminue le pic de mémoire lors de la dernière étape au prix d'un peu de vitesse — utile si la génération se termine mais que l'application est fermée juste à la fin sur un appareil disposant de moins de mémoire vive.

![La partie inférieure du panneau Advanced, avec LM Guidance, l'interrupteur Flash attention, VAE tile size et un récapitulatif du pack sélectionné.](./advanced.jpg)

Le tableau en bas récapitule ce que vous exécutez réellement : la famille du modèle, l'encodeur de texte Qwen3-Embedding, la taille du modèle de langage inclus et le format de sortie.

## Importer votre propre pack de modèle

Le sélecteur propose la famille turbo, celle qui a du sens sur un téléphone. Les variantes base et SFT, plus lentes, ainsi que tout autre pack compatible, peuvent être ajoutées manuellement.

Appuyez sur _Import_ en haut à droite de la mini-application et sélectionnez un fichier `.zip` contenant `lm.gguf`, `dit.gguf`, `text_encoder.gguf` et `vae.gguf`. Layla l'extrait, aplatit les éventuels dossiers imbriqués et vérifie que les quatre fichiers sont présents avant d'ajouter le pack à votre liste. Les packs importés se comportent exactement comme ceux intégrés et se suppriment de la même façon.

## Obtenir de meilleurs résultats

- **Itérez sur 30 secondes.** Trouvez une invite et une graine qui vous plaisent sur un extrait court, puis régénérez en pleine durée avec la même graine.
- **Nommez la production, pas seulement le genre.** « Craquement de vinyle chaleureux », « mixage moderne soigné » et « chaleur analogique vintage » ont tous un effet réel.
- **Indiquez un tempo.** Une valeur en bpm dans l'invite de style ancre le rythme.
- **Structurez vos paroles.** Des blocs de texte sans balises ne donnent au modèle aucune structure à arranger.
- **Changez une chose à la fois.** Avec une graine fixe, vous entendez exactement l'effet d'une seule modification de l'invite.

## Questions fréquentes

### La génération musicale par IA dans Layla fonctionne-t-elle hors ligne ?

Oui. Une fois le pack de modèle téléchargé, la génération s'exécute entièrement sur votre appareil. Vous pouvez mettre le téléphone en mode avion, cela fonctionnera toujours. Vos invites et vos paroles ne quittent jamais l'appareil.

### Combien de temps faut-il pour générer une chanson sur un téléphone ?

Cela dépend beaucoup de votre appareil, de la durée du morceau, de la quantification et du nombre d'étapes. Une génération turbo de 30 secondes est le moyen le plus rapide de découvrir où se situe votre propre appareil. Les durées plus longues et les nombres d'étapes plus élevés augmentent le temps à peu près proportionnellement.

### Faut-il un abonnement pour générer de la musique ?

Non. La génération musicale est incluse dans le déblocage premium de Layla, qui est un achat unique. Il n'y a ni crédits, ni frais par morceau, ni frais mensuels.

### Puis-je utiliser la musique générée à des fins commerciales ?

Cela dépend de la licence des poids du modèle ACE-Step, et non de Layla. Consultez les conditions publiées par les auteurs du modèle avant toute utilisation commerciale.

### Pourquoi ma première génération est-elle plus lente que les suivantes ?

Le modèle doit être chargé en mémoire avant le premier morceau. Les générations suivantes de la même session évitent une partie de ce coût.

### Quel format audio Layla produit-elle ?

Du WAV 48 kHz stéréo. Utilisez l'icône de téléchargement sur n'importe quel morceau pour l'enregistrer sur votre appareil ou le partager vers une autre application.

---

La génération musicale rejoint [la génération d'images](/fr/how-to-enable-image-generation-in-layla/) et la conversation textuelle hors ligne parmi les choses que Layla fait sur l'appareil lui-même. Aucun compte, aucun envoi, aucune connexion requise.
