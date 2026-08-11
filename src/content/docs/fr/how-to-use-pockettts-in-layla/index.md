---
title: Utiliser PocketTTS dans Layla pour cloner une voix sur l’appareil
description: Utilisez PocketTTS dans Layla pour cloner une voix depuis un fichier WAV ou le microphone, la tester localement et l’attribuer à un personnage IA pour une synthèse vocale privée hors ligne.
category: Characters & voice
order: 30
keywords:
  - PocketTTS Layla
  - clonage vocal sur l’appareil
  - synthèse vocale hors ligne
  - voix de personnage IA personnalisée
  - TTS local Android
  - assistant IA privé
  - clonage vocal one-shot
lastUpdated: 2026-08-09
translationKey: how-to-use-pockettts-in-layla
ai_translated: true
---

**PocketTTS est la mini-application de clonage vocal sur appareil de Layla. Elle crée une voix de synthèse vocale réutilisable à partir d’un bref échantillon enregistré dans Layla ou importé comme fichier WAV.** Vous pouvez tester le résultat, l’enregistrer dans votre bibliothèque et l’utiliser comme voix par défaut de Layla ou pour un personnage IA précis.

Après l’installation de PocketTTS, la génération s’exécute localement sur l’appareil Android. L’enregistrement de référence et le texte n’ont pas besoin d’être envoyés à un service Web, ce qui convient aux conversations IA privées et hors ligne.

## Fonctions de PocketTTS dans Layla

PocketTTS utilise le clonage vocal one-shot : au lieu d’un entraînement sur de nombreux enregistrements, vous fournissez un seul échantillon adapté, que Layla utilise pour transformer de nouveaux textes en parole.

La mini-application permet de :

- enregistrer un échantillon avec le microphone du téléphone ;
- importer un fichier WAV PCM 16 bits ;
- écouter l’échantillon d’origine ;
- saisir un texte et tester la voix clonée ;
- nommer et étiqueter les voix ;
- enregistrer plusieurs voix personnalisées ;
- utiliser une voix globalement ou pour un personnage précis.

PocketTTS est une fonction de synthèse vocale. Elle produit de l’audio à partir du texte, mais ne change pas le modèle de langage qui rédige les réponses.

## Installer et ouvrir PocketTTS

PocketTTS est une mini-application facultative, désactivée par défaut.

1. Ouvrez **My Apps** dans Layla.
2. Touchez le signe plus pour parcourir les mini-applications.
3. Recherchez **Pocket TTS (Voice Cloning)** et installez-la.
4. Ouvrez **Pocket TTS** depuis **My Apps**.

L’installation télécharge les fichiers nécessaires à la synthèse locale et exige Internet. Une fois terminée, le clonage et la génération peuvent fonctionner sur l’appareil.

Pour gérer les fonctions facultatives, consultez [comment activer ou désactiver les mini-applications dans Layla](/how-to-enable-disable-mini-apps-within-layla/).

## Étape 1 : fournir un échantillon vocal

En haut de PocketTTS, choisissez l’une des deux options sous **Voice Source**.

![Écran Pocket TTS avec les commandes d’importation WAV, d’enregistrement, de nom et d’étiquettes.](./pockettts.jpg)

### Importer un fichier WAV

Touchez **Upload .wav File**, puis choisissez un échantillon. Layla affiche son nom et sa durée. Si vous n’avez pas saisi de nom de voix, le nom du fichier sans extension sert de point de départ.

PocketTTS attend un **fichier WAV PCM 16 bits**. Convertissez les MP3, AAC et autres formats avant l’importation. Renommer simplement l’extension en `.wav` ne convertit pas l’audio.

### Enregistrer une voix dans Layla

Touchez **Record Voice**, autorisez le microphone, parlez naturellement, puis touchez **Stop Recording**. Layla prépare un WAV et l’affiche. Un nouvel enregistrement est nommé **My Recording** par défaut, sauf si vous avez déjà saisi un autre nom.

![Pocket TTS enregistrant un échantillon avec minuteur, forme d’onde et bouton Stop Recording.](./record.jpg)

Utilisez **Play Sample** pour écouter la source. En cas de bruit, long silence, saturation ou mauvais audio, touchez la corbeille et recommencez.

## Enregistrer un meilleur échantillon PocketTTS

L’échantillon influence directement la voix produite. PocketTTS apprend aussi facilement les défauts que la voix elle-même ; un enregistrement propre compte davantage qu’un enregistrement long.

- Enregistrez dans une pièce calme et gardez une distance constante du microphone.
- Évitez musique, autres voix, échos, ventilateurs, circulation et bruits de manipulation.
- Supprimez les longs silences ; ils peuvent produire des pauses indésirables.
- Utilisez un son clair et stable, sans distorsion ni saturation.
- Pour une voix de personnage distinctive, rendez ses caractéristiques clairement audibles. Les voix exagérées se transfèrent mieux que les nuances très subtiles.
- Écoutez l’échantillon complet avant de tester le clone.

N’utilisez la voix d’une personne qu’avec son autorisation. Une voix personnalisée peut sembler convaincante ; tenez compte de la manière dont un audio partagé pourrait être compris.

## Étape 2 : tester la voix personnalisée

Après le chargement d’un échantillon, Layla affiche **Test Voice**.

1. Modifiez la phrase de **Test Text** avec un mélange utile de sons proche des dialogues prévus.
2. Touchez **Test Custom Voice**.
3. Attendez l’initialisation et la génération locale.
4. Écoutez ; utilisez **Stop Test** pour interrompre la lecture.

Le test n’enregistre pas la voix. Répétez-le avec d’autres textes ou remplacez la source si le résultat contient du bruit, des pauses excessives ou des caractéristiques trop faibles.

La phrase de test n’a pas à reprendre les mots de l’enregistrement. PocketTTS utilise celui-ci comme référence vocale et prononce le nouveau texte.

## Étape 3 : nommer et étiqueter la voix

Saisissez un nom sous **Voice Details**. Un nom et un échantillon sont nécessaires pour activer **Save Custom Voice**.

Choisissez un nom reconnaissable, surtout si vous créez plusieurs voix. Un nom de personnage, locuteur ou rôle est plus utile que « Voice 1 ».

Les étiquettes sont facultatives. Layla propose notamment **Male**, **Female**, **Narrator**, **Character**, **Calm**, **Energetic**, **Deep**, **Soft**, **Robotic** et **Warm**. Touchez-les pour les ajouter ou les retirer, ou créez votre propre étiquette. Elles facilitent la recherche dans une grande bibliothèque.

## Étape 4 : enregistrer la voix PocketTTS

1. Touchez **Save Custom Voice**.
2. Vérifiez le nom, la source, la durée et les étiquettes dans **Save Voice**.
3. Touchez **Confirm & Save**.
4. Attendez la fin du traitement.

La voix apparaît sous **Existing Voices** et dans tous les sélecteurs de voix de Layla. Layla conserve une copie du WAV de référence dans les données de l’application pour générer la parole ultérieurement.

## Utiliser la voix enregistrée

### La définir comme voix par défaut

Ouvrez **Settings** → **Text-to-speech Settings** → **Default Voice**, puis choisissez la voix PocketTTS. Elle s’applique aux personnages sans voix personnalisée.

### L’attribuer à un personnage IA

Ouvrez l’éditeur du personnage, touchez **Voice** et choisissez la voix par son nom ou ses étiquettes. Pour la configuration complète, consultez [comment créer un personnage IA personnalisé](/how-do-i-create-custom-characters/).

La voix peut lire les messages et servir dans une conversation parlée. Consultez [comment démarrer un chat vocal avec vos personnages](/how-to-start-a-voice-chat-with-your-characters/).

## Gérer ou supprimer les voix

Les voix apparaissent sous **Existing Voices** et dans le sélecteur. Leur suppression demande confirmation et ne peut pas être annulée.

![Liste Existing Voices avec recherche, texte d’exemple, aperçu et suppression.](./test.jpg)

La désinstallation de PocketTTS supprime aussi ses voix personnalisées. Conservez le WAV d’origine hors de Layla si vous souhaitez pouvoir recréer une voix.

## Résoudre les problèmes de PocketTTS

### Pourquoi Save Custom Voice est-il désactivé ?

Chargez ou enregistrez un échantillon et saisissez un nom sous **Voice Details**. Les deux sont obligatoires.

### Pourquoi mon fichier audio ne fonctionne-t-il pas ?

Convertissez-le réellement en WAV PCM 16 bits. Renommer l’extension d’un MP3 ne suffit pas.

### Pourquoi la voix contient-elle de longues pauses ?

Retirez les silences de la référence, importez le WAV nettoyé et testez à nouveau.

### Pourquoi la voix est-elle bruyante ou peu claire ?

Réenregistrez dans un lieu calme, réduisez l’écho, excluez les autres locuteurs et évitez la saturation.

### Pourquoi ne puis-je pas enregistrer ?

PocketTTS a besoin de l’autorisation du microphone. Acceptez-la ou activez l’accès pour Layla dans les paramètres Android.

### PocketTTS fonctionne-t-il sans Internet ?

La mini-application et ses fichiers doivent d’abord être installés. Ensuite, le clonage et la synthèse s’exécutent localement sans envoyer l’échantillon ou la conversation à une API TTS en ligne.

PocketTTS ajoute des voix personnalisées tout en conservant l’avantage principal d’un assistant IA hors ligne sur Android : le modèle de langage, l’audio de référence et la parole générée peuvent rester sur l’appareil.
