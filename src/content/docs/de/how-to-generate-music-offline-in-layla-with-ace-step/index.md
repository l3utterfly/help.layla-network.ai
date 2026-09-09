---
title: So erzeugst du mit ACE-Step Musik offline in Layla
description: Installiere die ACE-Step-Mini-App, lade ein Musikmodell herunter und erzeuge vollständige Songs mit Text auf deinem Android-Handy oder iPhone – ganz ohne Internetverbindung.
category: Mini-apps & integrations
order: 35
keywords:
  - KI-Musikgenerator
  - KI-Musikerzeugung offline
  - Musik erzeugen auf Android
  - KI-Musikgenerator für iPhone
  - ACE-Step
  - KI-Songgenerator mit Songtext
  - Text zu Musik KI
  - Musikerzeugung auf dem Gerät
  - KI-Musik-App ohne Abo
  - lokales KI-Musikmodell
lastUpdated: 2026-09-09
translationKey: how-to-generate-music-offline-in-layla-with-ace-step
ai_translated: true
---

**Layla kann vollständige Songs erzeugen – Stil, Melodie, Arrangement und gesungenen Text – vollständig auf deinem Handy, mit dem Musikmodell ACE-Step 1.5. Nichts wird hochgeladen, es wird kein Konto benötigt, und es funktioniert bei ausgeschaltetem Netz.**

![Das ACE-Step-Logo.](./acestep.png)

Dieser Artikel behandelt die Installation der Mini-App Music Generation, das Herunterladen eines Modellpakets, das Schreiben eines Prompts und die Parameter, die Geschwindigkeit und Qualität steuern.

## Was ist ACE-Step?

ACE-Step ist ein Musikerzeugungsmodell von ACE Studio und StepFun. Es nimmt eine Textbeschreibung eines Songs entgegen – Genre, Stimmung, Instrumente, Tempo – und optional einen Songtext, und erzeugt daraus fertiges Audio in 48 kHz Stereo.

Anders als die Online-KI-Musikgeneratoren, die du vielleicht kennst, läuft ACE-Step in Layla lokal auf der CPU oder GPU deines Geräts. Es gibt keine Warteschlange, kein Guthabensystem und kein Limit pro Titel. Der Preis dafür: Die Erzeugung dauert auf einem Handy echte Zeit statt Sekunden auf einer Rechenzentrums-GPU, und die Modelldateien sind groß.

Layla führt ACE-Step über [acestep.cpp](https://github.com/ServeurpersoCom/acestep.cpp) aus, eine GGML-basierte Implementierung des Modells. Das ist dasselbe Prinzip wie bei Laylas Textmodellen, die auf [llama.cpp](https://github.com/ggerganov/llama.cpp) laufen: Das Modell wird so weit quantisiert, dass es auf ein Handy passt, und dann auf der Hardware ausgeführt, die du ohnehin besitzt.

## Was du brauchst

- **Layla unter Android oder iOS.** Die Musikerzeugung funktioniert auf beiden Plattformen gleich.
- **Die Premium-Version von Layla.** Alle Mini-Apps setzen sie voraus. Layla ist ein einmaliger Kauf, kein Abonnement.
- **Etwa 5 GB freien Speicher** für ein Modellpaket. Die Pakete liegen bei etwa 4,2 GB bis 5,3 GB.
- **6 GB Arbeitsspeicher** für die kleineren Quantisierungen, **8 GB** für die größeren.
- **Geduld beim ersten Durchlauf.** Das Modell muss vor dem ersten Titel einer Sitzung in den Speicher geladen werden.

## Schritt 1: Die Mini-App Music Generation aktivieren

Die Musikerzeugung ist eine optionale Funktion und daher nicht standardmäßig aktiviert. Öffne _Meine Apps_, tippe oben rechts auf das Pluszeichen, um alle verfügbaren Funktionen zu durchsuchen, und aktiviere **Music Generation (Ace Step)**.

Falls du das Mini-App-System noch nicht verwendet hast, lies [So aktivierst oder deaktivierst du Mini-Apps in Layla](/de/how-to-enable-disable-mini-apps-within-layla/).

Nach der Aktivierung erscheint die App in deiner App-Liste und öffnet sich mit zwei Reitern: **Create** und **Library**.

## Schritt 2: Ein Modellpaket herunterladen

Tippe oben im Reiter Create auf die Modellkarte, um die Paketauswahl zu öffnen. Jeder Eintrag ist ein eigenständiges Paket: das Sprachmodell, das Text und Melodie schreibt, der Diffusions-Transformer, der das Audio erzeugt, ein Text-Encoder und der Decoder, der das Ergebnis in Klang verwandelt. Du wählst immer nur ein Paket – es gibt keine einzelnen Dateien, die zusammenpassen müssen.

Die Pakete unterscheiden sich in zwei Dimensionen.

**Variante** – der musikalische Charakter des Modells:

| Variante                | Beschreibung                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| Turbo                   | Schnelle Erzeugung in 8 Schritten. Die beste Standardwahl fürs Handy.                             |
| SFT-Turbo50             | Eine Verschmelzung aus Turbo- und feinabgestimmtem Modell. Turbo-Tempo mit etwas reicherem Klang. |
| Turbo Continuous        | Turbo, abgestimmt auf durchgehendes Material und nahtlose Loops.                                  |
| Turbo Shift-1 / Shift-3 | Turbo mit alternativen Sampling-Zeitplänen. Anderes Klangempfinden.                               |

**Quantisierung** – der Kompromiss zwischen Größe und Qualität, dasselbe Konzept wie bei [GGUF-Quants für Textmodelle](/de/what-are-gguf-models-what-are-model-quants/):

| Quant  | Hinweise                                          |
| ------ | ------------------------------------------------- |
| Q4_K_M | Am kleinsten, niedrigste Qualität. 6 GB RAM.      |
| Q5_K_M | Klein und ausgewogen. 6 GB RAM.                   |
| Q6_K   | Größer, höhere Qualität. 8 GB RAM.                |
| Q8_0   | Am größten, nahezu verlustfreier Quant. 8 GB RAM. |

Wenn du unsicher bist, beginne mit **Turbo Q5_K_M**.

Tippe auf _Download bundle_: Der Download läuft im Hintergrund – du kannst die Mini-App und sogar Layla verlassen, ohne den Fortschritt zu verlieren. Ist die Übertragung abgeschlossen, entpackt Layla das Archiv und prüft, ob alle vier Modelldateien angekommen sind. Die Karte zeigt _Installed_, sobald das Paket bereit ist.

Ein Paket, das du nicht mehr brauchst, lässt sich mit _Delete bundle_ entfernen und später erneut herunterladen.

## Schritt 3: Die Musik beschreiben

Das Feld **Style** ist das wichtigste Steuerelement. Beschreibe die Musik so, wie du sie einem Musiker beschreiben würdest: Genre, Stimmung, Instrumentierung, Produktion, Tempo.

Schwacher Prompt:

> Popsong

Besserer Prompt:

> verträumter Synthpop, warme Analog-Pads, Gated-Reverb-Drums, hauchige Frauenstimme, 120 bpm, hell und nostalgisch

Details helfen. Das Modell liest diesen Text zweimal – einmal, wenn das Sprachmodell Struktur und Text plant, und noch einmal, wenn das Audio selbst erzeugt wird. Konkrete Instrumente, Produktionsadjektive und ein Tempo lenken das Ergebnis daher alle in eine klare Richtung.

![Der Reiter Create in Laylas Mini-App Music Generation mit der Modellpaketkarte, dem Feld Style und dem Feld Lyrics mit Abschnitts-Tags.](./lyrics.jpg)

## Schritt 4: Mit oder ohne Songtext

Unter dem Stilfeld liegt das Feld **Lyrics** mit dem Schalter **Instrumental**.

- **Lass das Textfeld leer**, und das Modell schreibt seinen eigenen Songtext aus deiner Stilbeschreibung. Das ist der schnellste Weg zu einem vollständigen Song aus einem einzeiligen Prompt.
- **Schreibe deinen eigenen Text**, und das Modell singt ihn genau so. Verwende Abschnitts-Tags in eigenen Zeilen, um das Arrangement zu formen:

```
[verse]
Streetlights blink along the empty road
Radio static, half a song I know

[chorus]
Drive until the morning finds us
Nothing in the mirror behind us
```

Tags wie `[intro]`, `[verse]`, `[pre-chorus]`, `[chorus]`, `[bridge]`, `[guitar solo]` und `[outro]` werden verstanden, und ein Tag kann eine eigene Beschreibung tragen, etwa `[bridge - saxophone and strings]`.

Die Gesangssprache wird aus dem Text erkannt, den du schreibst. Du kannst also auf Deutsch, Französisch, Japanisch oder in jeder anderen vom Modell unterstützten Sprache schreiben, und es wird in dieser Sprache gesungen.

- **Aktiviere Instrumental** für einen Titel ganz ohne Gesang.

## Schritt 5: Länge und Seed

**Duration** bietet Voreinstellungen von 30 Sekunden bis 3 Minuten. Längere Titel brauchen entsprechend länger, daher sind 30 Sekunden die sinnvolle Länge, solange du deinen Prompt noch verfeinerst.

**Seed** steuert den Zufall. Lass das Feld leer für jedes Mal ein anderes Ergebnis, oder setze eine Zahl – oder tippe auf den Würfel –, um einen Durchlauf wiederholbar zu machen. Derselbe Seed mit demselben Prompt und denselben Einstellungen erzeugt denselben Titel. Genau das willst du, wenn du nah am Ziel bist und nur ein Wort im Prompt ändern möchtest.

![Der Bereich Parameters mit dem Schalter Use GPU, den Dauer-Voreinstellungen, dem Seed-Feld und dem ausgeklappten Bereich Advanced mit Steps, Shift und Solver.](./duration.jpg)

## Einen Titel erzeugen

Tippe auf **Generate music**. Ein einziger Fortschrittsbalken läuft über den gesamten Vorgang, mit einer Beschriftung für die aktuelle Phase:

1. **Loading model** – das Sprachmodell wird in den Speicher geladen.
2. **Writing structure / Writing lyrics** – Tempo, Tonart, Taktart und der Songtext, falls du keinen vorgegeben hast.
3. **Composing melody** – der musikalische Inhalt wird geplant.
4. **Generating music** – das Audio selbst wird Schritt für Schritt erzeugt.
5. **Decoding audio** – das Ergebnis wird in eine Wellenform umgewandelt.

Du kannst jederzeit **Stop** drücken. Die Erzeugung hält an, sobald der aktuelle Schritt beendet ist, es gibt also eine kurze Wartezeit bis zum tatsächlichen Ende. Layla hält den Bildschirm währenddessen wach, damit der Vorgang nicht unterbrochen wird.

Ist der Durchlauf abgeschlossen, erscheint eine Player-Karte mit einer Wellenform. Tippe auf die Wellenform, um zu spulen, nutze die Wiedergabetaste zum Anhören, das Download-Symbol zum Speichern oder Teilen der Datei und das Papierkorb-Symbol zum Löschen.

Jeder Titel wird als 48-kHz-Stereo-WAV in den eigenen Ordner der Mini-App geschrieben und im Reiter **Library** aufgeführt, versehen mit Modell, Schrittzahl und Seed, die ihn erzeugt haben. Nichts wird automatisch gelöscht – räume auf, was du nicht behalten willst, denn WAV-Dateien in dieser Qualität summieren sich schnell.

## Erweiterte Parameter

Öffne **Advanced** unter Parameters für feinere Kontrolle. Die meisten Menschen müssen hier nie etwas ändern, und die Standardwerte passen zu den mitgelieferten Modellen.

**Steps und Shift** sind standardmäßig leer, das heißt, jedes Modell verwendet die Werte, mit denen es trainiert wurde – 8 Schritte für die Turbo-Familie, 50 für Basis- und feinabgestimmte Modelle. Gib eine Zahl ein, um sie zu überschreiben. Mehr Schritte bedeuten in der Regel mehr Detail und mehr Zeit.

**Solver** wählt den Sampling-Algorithmus: Euler, SDE, DPM++ 3M oder STORK-4. Euler ist der Standard. Ein Wechsel des Solvers verändert die Textur des Ergebnisses bei gleicher Schrittzahl und lohnt das Experimentieren, sobald du einen Prompt hast, der dir gefällt.

**Guidance (CFG)** steuert, wie eng das Audio deinem Stil-Prompt folgt. Es wird nur bei Modellen angezeigt, bei denen es greift: Turbo-Modelle haben die Führung in den Gewichten verankert, daher fixiert Layla den Wert auf 1.0 und weist darauf hin, statt dich das Ergebnis übersättigen zu lassen.

**LM Guidance (CFG)** tut dasselbe für die Text- und Melodiephase und gilt für alle Modelle. Der Standardwert 1.0 ist die schnellste Einstellung. Ihn Richtung 2.0 anzuheben, bindet die Komposition enger an deinen Prompt – zum Preis einer etwa doppelt so langen Dauer dieser Phase.

**Use GPU** verlagert die Audioerzeugung auf die GPU deines Geräts – Metal unter iOS, OpenCL unter Android – mit Rückfall auf die CPU, falls das fehlschlägt. Die Text- und Melodiephase läuft immer auf der CPU: Sie ist speicher- und nicht rechenlastig, und eine mobile GPU ist dabei langsamer. Die GPU ist standardmäßig aus, weil der CPU-Pfad die kompatible Grundlage ist; ob sie schneller ist, solltest du auf deinem eigenen Gerät testen.

**Flash attention** beschleunigt die Audioerzeugung auf Kosten etwas geringerer Qualität. Standardmäßig aus.

**VAE tile size** legt fest, wie viel Audio auf einmal dekodiert wird. Ein niedrigerer Wert senkt den Speicherbedarf in der letzten Phase, kostet aber etwas Geschwindigkeit – nützlich, wenn die Erzeugung durchläuft, die App aber genau am Ende auf einem Gerät mit weniger RAM beendet wird.

![Der untere Teil des Bereichs Advanced mit LM Guidance, dem Schalter Flash attention, VAE tile size und einer Übersicht des ausgewählten Pakets.](./advanced.jpg)

Die Tabelle unten fasst zusammen, was du tatsächlich ausführst: die Modellfamilie, den Text-Encoder Qwen3-Embedding, die Größe des enthaltenen Sprachmodells und das Ausgabeformat.

## Ein eigenes Modellpaket importieren

Die Auswahl liefert die Turbo-Familie, die auf einem Handy sinnvoll ist. Die langsameren Varianten Base und SFT sowie jedes andere kompatible Paket lassen sich manuell hinzufügen.

Tippe oben rechts in der Mini-App auf _Import_ und wähle eine `.zip`-Datei mit `lm.gguf`, `dit.gguf`, `text_encoder.gguf` und `vae.gguf`. Layla entpackt sie, glättet verschachtelte Ordner und prüft, ob alle vier Dateien vorhanden sind, bevor das Paket in deine Liste aufgenommen wird. Importierte Pakete verhalten sich genau wie die eingebauten und lassen sich genauso löschen.

## Bessere Ergebnisse erzielen

- **Iteriere mit 30 Sekunden.** Finde an einem kurzen Ausschnitt einen Prompt und Seed, die dir gefallen, und erzeuge dann mit demselben Seed in voller Länge neu.
- **Benenne die Produktion, nicht nur das Genre.** „Warmes Vinylknistern“, „polierter moderner Mix“ und „analoge Vintage-Wärme“ wirken alle konkret.
- **Gib ein Tempo an.** Ein bpm-Wert im Stil-Prompt verankert den Rhythmus.
- **Gliedere deine Songtexte.** Textblöcke ohne Tags geben dem Modell keine Struktur zum Arrangieren.
- **Ändere immer nur eine Sache.** Bei festem Seed hörst du genau, was eine einzelne Prompt-Änderung bewirkt hat.

## Häufige Fragen

### Funktioniert die KI-Musikerzeugung in Layla offline?

Ja. Sobald ein Modellpaket heruntergeladen ist, läuft die Erzeugung vollständig auf deinem Gerät. Du kannst das Handy in den Flugmodus schalten, und es funktioniert weiterhin. Deine Prompts und Songtexte verlassen das Gerät nie.

### Wie lange dauert es, einen Song auf einem Handy zu erzeugen?

Das hängt stark von deinem Gerät, der Titellänge, der Quantisierung und der Schrittzahl ab. Eine 30-sekündige Turbo-Erzeugung ist der schnellste Weg herauszufinden, wo dein eigenes Gerät landet. Längere Dauern und höhere Schrittzahlen erhöhen die Zeit etwa proportional.

### Brauche ich ein Abonnement, um Musik zu erzeugen?

Nein. Die Musikerzeugung ist in Laylas Premium-Freischaltung enthalten, einem einmaligen Kauf. Es gibt keine Guthaben, keine Kosten pro Titel und keine monatliche Gebühr.

### Darf ich die erzeugte Musik kommerziell nutzen?

Das hängt von der Lizenz der ACE-Step-Modellgewichte ab, nicht von Layla. Prüfe die von den Autoren des Modells veröffentlichten Bedingungen, bevor du die Ausgabe kommerziell verwendest.

### Warum ist meine erste Erzeugung langsamer als die folgenden?

Das Modell muss vor dem ersten Titel in den Speicher geladen werden. Weitere Durchläufe in derselben Sitzung sparen einen Teil dieses Aufwands.

### Welches Audioformat erzeugt Layla?

48 kHz Stereo-WAV. Über das Download-Symbol an jedem Titel speicherst du ihn auf deinem Gerät oder teilst ihn mit einer anderen App.

---

Die Musikerzeugung reiht sich neben [der Bilderzeugung](/de/how-to-enable-image-generation-in-layla/) und dem Offline-Textchat in das ein, was Layla auf dem Gerät selbst erledigt. Kein Konto, kein Upload, keine Verbindung nötig.
