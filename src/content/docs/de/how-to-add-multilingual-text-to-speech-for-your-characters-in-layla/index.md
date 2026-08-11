---
title: So fügst du deinen Charakteren in Layla mehrsprachige Sprachausgabe hinzu
description: Aktiviere mit SherpaTTS mehrsprachige Sprachausgabe in Layla.
category: Characters & voice
order: 60
keywords:
  - mehrsprachige Sprachausgabe
  - SherpaTTS
  - Charakterstimmen
  - Android-TTS
  - Offline-Stimme
lastUpdated: 2026-05-11
translationKey: how-to-add-multilingual-text-to-speech-for-your-characters-in-layla
ai_translated: true
---

Die standardmäßigen TTS-Mini-Apps in Layla funktionieren alle auf Englisch. Mehrsprachige Sprachausgabe lässt sich unter Android jedoch sehr einfach hinzufügen.

Layla unterstützt SherpaTTS, eine lokale Text-to-Speech-App, die eine Internetverbindung herstellt.

**Schritt 1: SherpaTTS herunterladen**

Lade die App von [F-Droid](https://f-droid.org/en/packages/org.woheller69.ttsengine/) herunter.

![Roter Pfeil auf den Link „Download APK“ auf der F-Droid-Seite von SherpaTTS.](./fdroid-download-apk.png)

Scrolle zum Abschnitt **Versionen** und lade die neueste APK herunter.

_F-Droid ist eine Alternative zu Google Play, die **freie und quelloffene Software (FOSS)** veröffentlicht._

**Schritt 2: SherpaTTS konfigurieren**

Öffne die heruntergeladene SherpaTTS-App, um sie zu konfigurieren:

![SherpaTTS-Bildschirm mit eingekreister Schaltfläche zum Hinzufügen eines Modells.](./sherpatts-add-model.jpg)

Tippe auf das Pluszeichen, um ein neues Modell hinzuzufügen.

Eine Liste von Modellen wird angezeigt:

![SherpaTTS-Bildschirm zum Herunterladen von Sprachen mit Piper- und Coqui-Modellen.](./sherpatts-download-language.jpg)

Lade die gewünschte Sprache herunter. Die Sprache wird durch den zweistelligen Ländercode angegeben. Beispielsweise steht „de“ für Deutsch und „fr“ für Französisch.

Tippe nach dem Download auf **Start**, um das Modell zu laden.

**Schritt 3: SherpaTTS als standardmäßiges TTS-Modell des Smartphones festlegen**

Tippe auf dem SherpaTTS-Hauptbildschirm auf das Einstellungssymbol:

![SherpaTTS-Bildschirm mit einem Pfeil auf die Einstellungsschaltfläche.](./sherpatts-settings.jpg)

Dadurch werden die Android-Systemeinstellungen geöffnet. Tippe auf die Einstellung **Standard-Text-to-Speech**:

![Android-Einstellungen für Text-to-Speech mit eingekreister bevorzugter Engine.](./android-tts-preferred-engine.jpg)

Ändere die Standard-Engine zu SherpaTTS:

![Android-Bildschirm „Bevorzugte Engine“ mit ausgewähltem und eingekreistem SherpaTTS.](./select-sherpatts-engine.jpg)

Deine Standardstimme verwendet nun Sherpa.

**Schritt 4: Layla konfigurieren**

Layla erkennt diese Einstellung automatisch und stellt die ausgewählten Stimmen bereit. _(Starte Layla neu, damit die Änderungen wirksam werden.)_

Öffne die Einstellungen deines Charakters (**Charakter bearbeiten** → Tab **Erweitert**):

![Laylas Bildschirm „Charakter erstellen“ im Tab „Erweitert“ mit eingekreister Stimmeinstellung.](./layla-character-advanced-voice.jpg)

Wähle deine neuen Stimmen im Abschnitt **Nativ** aus:

![Laylas Bildschirm „Stimme auswählen“ mit eingekreistem Filter „Nativ“ und installierten Stimmen.](./layla-native-voices.jpg)

Alle über Sherpa installierten Stimmen werden hier angezeigt.

Dein Charakter kann jetzt mehrsprachig sprechen.
