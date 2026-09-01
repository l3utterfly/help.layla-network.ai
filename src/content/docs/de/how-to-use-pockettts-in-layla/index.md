---
title: PocketTTS in Layla für geräteinternes Stimmenklonen verwenden
description: Klone mit PocketTTS in Layla eine Stimme aus einer WAV-Datei oder Mikrofonaufnahme, teste sie lokal und weise sie einem KI-Charakter für private Offline-Sprachausgabe zu.
category: Characters & voice
order: 30
keywords:
  - PocketTTS Layla
  - geräteinternes Stimmenklonen
  - Offline-Text-zu-Sprache
  - eigene KI-Charakterstimme
  - lokales TTS Android
  - privater KI-Assistent
  - One-Shot-Stimmenklonen
lastUpdated: 2026-08-09
translationKey: how-to-use-pockettts-in-layla
ai_translated: true
---

**PocketTTS ist Laylas Mini-App zum geräteinternen Stimmenklonen. Sie erstellt aus einer kurzen Aufnahme in Layla oder einer WAV-Datei eine wiederverwendbare Text-zu-Sprache-Stimme.** Du kannst sie testen, in der Stimmenbibliothek speichern und als Laylas Standardstimme oder für einen bestimmten KI-Charakter verwenden.

Nach der Installation läuft die Erzeugung lokal auf deinem Android-Gerät. Referenzaufnahme und Text müssen nicht an einen Webdienst gesendet werden, was private Offline-KI-Gespräche ermöglicht.

## Was PocketTTS in Layla macht

PocketTTS nutzt One-Shot-Stimmenklonen: Statt vieler Trainingsaufnahmen reicht ein geeignetes Referenzbeispiel, das Layla beim Umwandeln neuen Texts in Sprache verwendet.

Die Mini-App kann:

- mit dem Smartphone-Mikrofon aufnehmen;
- eine vorhandene 16-Bit-PCM-WAV-Datei laden;
- das Original abspielen;
- eigenen Text mit der geklonten Stimme testen;
- Stimmen benennen und taggen;
- mehrere Stimmen speichern;
- eine Stimme global oder für einen Charakter verwenden.

PocketTTS ist Text-zu-Sprache. Es erzeugt Audio aus Text, ändert aber nicht das Sprachmodell, das Antworten verfasst.

## PocketTTS installieren und öffnen

PocketTTS ist optional und standardmäßig nicht aktiviert.

1. Öffne **My Apps**.
2. Tippe auf das Pluszeichen.
3. Suche **Pocket TTS (Voice Cloning)** und installiere es.
4. Öffne **Pocket TTS** unter **My Apps**.

Die Installation lädt Dateien für lokale Sprachausgabe herunter und benötigt Internet. Danach können Klonen und Spracherzeugung auf dem Gerät laufen.

Weitere Informationen: [Mini-Apps in Layla aktivieren oder deaktivieren](/how-to-enable-disable-mini-apps-within-layla/).

## Schritt 1: Ein Stimmbeispiel bereitstellen

Wähle oben unter **Voice Source** eine von zwei Optionen.

![Pocket-TTS-Ansicht mit WAV-Upload, Aufnahme, Name und Tags.](./pockettts.jpg)

### Eine WAV-Datei hochladen

Tippe auf **Upload .wav File** und wähle eine Aufnahme. Layla zeigt Dateiname und Dauer an. Ohne bereits eingegebenen Stimmennamen wird der Dateiname ohne Erweiterung als Ausgangspunkt verwendet.

PocketTTS erwartet eine **16-Bit-PCM-WAV-Datei**. MP3, AAC und andere Formate müssen vor dem Import konvertiert werden. Das Umbenennen der Erweiterung in `.wav` reicht nicht.

### Eine Stimme in Layla aufnehmen

Tippe auf **Record Voice**, erlaube den Mikrofonzugriff, sprich natürlich und tippe auf **Stop Recording**. Layla erstellt eine WAV-Datei. Ohne eigenen Namen heißt eine neue Aufnahme **My Recording**.

![Pocket TTS bei einer Mikrofonaufnahme mit Timer, Wellenform und Stop Recording.](./record.jpg)

Höre die Quelle mit **Play Sample** an. Bei Hintergrundgeräuschen, langen Pausen, Übersteuerung oder falschem Audio entfernst du sie über den Papierkorb und versuchst es erneut.

## Ein besseres PocketTTS-Beispiel aufnehmen

Die Referenz beeinflusst die erzeugte Stimme direkt. PocketTTS übernimmt unerwünschte Merkmale ebenso leicht wie die Stimme; Sauberkeit ist wichtiger als Länge.

- Nimm in einem ruhigen Raum und mit konstantem Mikrofonabstand auf.
- Vermeide Musik, andere Stimmen, Echo, Ventilatoren, Verkehr und Griffgeräusche.
- Entferne lange Pausen, da sie in der Ausgabe wiederkehren können.
- Verwende eine klare, gleichmäßige Aufnahme ohne Verzerrung oder Übersteuerung.
- Mache besondere Charaktermerkmale deutlich hörbar; überzeichnete Stimmen übertragen sich zuverlässiger als sehr subtile.
- Höre die vollständige Aufnahme vor dem Test an.

Nutze die Stimme einer Person nur mit ihrer Erlaubnis. Eine eigene Charakterstimme kann überzeugend klingen; beachte dies beim Teilen erzeugter Audiodateien.

## Schritt 2: Die Stimme testen

Nach dem Laden erscheint **Test Voice**.

1. Bearbeite den Satz unter **Test Text** und verwende eine sinnvolle Lautmischung, die den späteren Dialogen ähnelt.
2. Tippe auf **Test Custom Voice**.
3. Warte auf Initialisierung und lokale Generierung.
4. Höre das Ergebnis; **Stop Test** beendet die Wiedergabe.

Ein Test speichert die Stimme nicht. Ändere den Text beliebig oft oder ersetze das Beispiel bei Rauschen, langen Pausen oder schwachen Stimmmerkmalen.

Der Testsatz muss nicht dem Original entsprechen. PocketTTS nutzt die Referenz als Stimmbeispiel und spricht den neuen Text.

## Schritt 3: Stimme benennen und taggen

Gib unter **Voice Details** einen Namen ein. Name und Audiobeispiel sind erforderlich, bevor **Save Custom Voice** verfügbar wird.

Wähle einen gut erkennbaren Namen. Ein Charakter-, Sprecher- oder Rollenname ist hilfreicher als „Voice 1“.

Tags sind optional. Layla bietet **Male**, **Female**, **Narrator**, **Character**, **Calm**, **Energetic**, **Deep**, **Soft**, **Robotic** und **Warm**. Tippe zum Hinzufügen oder Entfernen oder erstelle eigene Tags. Namen und Tags erleichtern die Suche.

## Schritt 4: Die PocketTTS-Stimme speichern

1. Tippe auf **Save Custom Voice**.
2. Prüfe Name, Quelle, Dauer und Tags unter **Save Voice**.
3. Tippe auf **Confirm & Save**.
4. Warte auf die Verarbeitung.

Die Stimme erscheint unter **Existing Voices** und in Laylas Stimmenauswahl. Layla bewahrt eine Kopie der Referenz-WAV in den App-Daten auf.

## Die gespeicherte Stimme verwenden

### Als Standardstimme festlegen

Öffne **Settings** → **Text-to-speech Settings** → **Default Voice** und wähle die PocketTTS-Stimme. Sie gilt für Charaktere ohne eigene Stimme.

### Einem KI-Charakter zuweisen

Öffne den Charaktereditor, tippe auf **Voice** und wähle die Stimme nach Name oder Tags. Sie ersetzt für diesen Charakter den globalen Standard. Siehe [einen eigenen KI-Charakter erstellen](/how-do-i-create-custom-characters/).

Die Stimme kann Nachrichten vorlesen und in gesprochenen Unterhaltungen verwendet werden. Siehe [Sprachchat mit Charakteren starten](/how-to-hear-your-characters-speak-in-layla/).

## Stimmen verwalten oder löschen

Gespeicherte Stimmen stehen unter **Existing Voices** und in der Stimmenauswahl. Das Löschen muss bestätigt werden und kann nicht rückgängig gemacht werden.

![Existing-Voices-Liste mit Suche, Beispieltext, Vorschau und Löschen.](./test.jpg)

Beim Deinstallieren von PocketTTS werden auch die eigenen Stimmen gelöscht. Bewahre die Referenz-WAV außerhalb Laylas auf, wenn du sie später neu erstellen möchtest.

## Fehlerbehebung

### Warum ist Save Custom Voice deaktiviert?

Lade oder nimm ein Beispiel auf und gib unter **Voice Details** einen Namen ein. Beides ist erforderlich.

### Warum funktioniert meine Audiodatei nicht?

Konvertiere sie tatsächlich in 16-Bit-PCM-WAV. Eine umbenannte MP3 ist nicht kompatibel.

### Warum enthält die Stimme lange Pausen?

Entferne Stille aus der Referenz, importiere die bereinigte WAV und teste erneut.

### Warum klingt sie verrauscht oder undeutlich?

Nimm in ruhigerer Umgebung erneut auf, reduziere Echo, schließe andere Sprecher aus und vermeide Übersteuerung.

### Warum kann ich nicht aufnehmen?

PocketTTS benötigt Mikrofonberechtigung. Erlaube sie bei der Abfrage oder in den Android-App-Einstellungen.

### Funktioniert PocketTTS ohne Internet?

Mini-App und Dateien müssen zuerst installiert werden. Danach laufen Stimmenklonen und Text-zu-Sprache lokal, ohne Beispiel oder Gespräch an eine Online-TTS-API zu senden.

PocketTTS ergänzt Layla um eigene Stimmen und bewahrt den Vorteil eines Offline-KI-Assistenten für Android: Sprachmodell, Referenzaudio und erzeugte Sprache können auf dem Gerät bleiben.
