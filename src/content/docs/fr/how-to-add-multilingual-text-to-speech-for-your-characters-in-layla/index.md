---
title: Comment ajouter une synthèse vocale multilingue aux personnages dans Layla
description: Découvrez comment activer la synthèse vocale multilingue dans Layla à l'aide de SherpaTTS.
category: Characters & voice
order: 60
keywords:
  - synthèse vocale multilingue
  - SherpaTTS
  - voix des personnages
  - TTS Android
  - voix hors ligne
lastUpdated: 2026-05-11
translationKey: how-to-add-multilingual-text-to-speech-for-your-characters-in-layla
ai_translated: true
---

Les mini-applications TTS par défaut de Layla fonctionnent toutes en anglais. Il est toutefois très facile d'ajouter une synthèse vocale multilingue dans Android.

Layla prend en charge SherpaTTS, une application locale de synthèse vocale qui se connecte à Internet.

**Étape 1 : télécharger SherpaTTS**

Téléchargez l'application depuis [F-Droid](https://f-droid.org/en/packages/org.woheller69.ttsengine/).

![Flèche rouge pointant vers le lien Download APK sur la page F-Droid de SherpaTTS.](./fdroid-download-apk.png)

Faites défiler jusqu'à la section **Versions** et téléchargez le dernier APK.

_F-Droid est une alternative à Google Play qui publie des applications **libres et open source (FOSS)**._

**Étape 2 : configurer SherpaTTS**

Après avoir téléchargé l'application SherpaTTS, ouvrez-la pour la configurer :

![Écran SherpaTTS avec le bouton d'ajout de modèle entouré.](./sherpatts-add-model.jpg)

Appuyez sur le signe plus pour ajouter un nouveau modèle.

Une liste de modèles s'affiche :

![Écran de téléchargement des langues de SherpaTTS affichant des modèles Piper et Coqui.](./sherpatts-download-language.jpg)

Téléchargez la langue souhaitée. La langue est indiquée par son code de pays à deux lettres. Par exemple, l'allemand correspond à « de » et le français à « fr ».

Une fois le téléchargement terminé, appuyez sur **Démarrer** pour charger le modèle.

**Étape 3 : définir SherpaTTS comme modèle TTS par défaut du téléphone**

Appuyez sur l'icône des paramètres dans l'écran principal de SherpaTTS :

![Écran SherpaTTS avec une flèche pointant vers le bouton des paramètres.](./sherpatts-settings.jpg)

Les paramètres système d'Android s'ouvrent. Appuyez sur le réglage **Synthèse vocale par défaut** :

![Paramètres de synthèse vocale Android avec Moteur préféré entouré.](./android-tts-preferred-engine.jpg)

Vous pouvez maintenant modifier le moteur par défaut. Sélectionnez SherpaTTS :

![Écran Moteur préféré d'Android avec SherpaTTS sélectionné et entouré.](./select-sherpatts-engine.jpg)

Votre voix par défaut utilise désormais Sherpa.

**Étape 4 : configurer Layla**

Layla détecte automatiquement ce réglage et rend les voix sélectionnées disponibles. _(Redémarrez Layla pour que les modifications prennent effet.)_

Ouvrez les paramètres de votre personnage (**Modifier le personnage** → onglet **Avancé**) :

![Écran Créer un personnage de Layla dans l'onglet Avancé avec le réglage Voix entouré.](./layla-character-advanced-voice.jpg)

Sélectionnez vos nouvelles voix dans la section **Natif** :

![Écran Sélectionner une voix de Layla avec le filtre Natif et les voix installées entourés.](./layla-native-voices.jpg)

Toutes les voix installées depuis Sherpa apparaissent ici.

Votre personnage peut maintenant parler dans plusieurs langues.
