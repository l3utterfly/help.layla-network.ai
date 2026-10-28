---
title: "NPU Forge in Layla: Stable-Diffusion-Safetensors für die Snapdragon-NPU in QNN umwandeln"
description: Wandle mit der Mini-App NPU Forge SD-1.5- und SDXL-Safetensors-Checkpoints in QNN-Modelle um und erzeuge dann in Local Dream Bilder auf deiner Qualcomm-NPU.
category: Image generation
order: 25
keywords:
  - NPU Forge
  - Safetensors zu QNN
  - Safetensors konvertieren
  - QNN-Modell
  - Qualcomm-NPU
  - Bilderzeugung auf der Snapdragon-NPU
  - Hexagon-NPU
  - Stable Diffusion auf Android
  - SD 1.5
  - SDXL
  - LoRA
  - Civitai
  - Local Dream
  - Offline-Bilderzeugung
  - KI-Bildgenerator für Android
lastUpdated: 2026-10-28
translationKey: how-to-convert-safetensors-to-qnn-with-npu-forge-in-layla
ai_translated: true
---

**NPU Forge ist eine Layla-Mini-App, die einen Stable-Diffusion-Safetensors-Checkpoint in ein QNN-Modell umwandelt, also in das Format, das auf der Qualcomm-NPU von Snapdragon-Smartphones läuft.** Du wählst eine `.safetensors`-Datei aus, Layla prüft, ob sie umgewandelt werden kann, und die Umwandlung läuft auf deinem Smartphone. Wenn sie fertig ist, erscheint das Modell in Local Dream und ist bereit für die Bilderzeugung.

Layla kann einen Safetensors-Checkpoint bereits direkt importieren, wie in [So importierst du SD1.5-Safetensor-Modelle von Civit.ai in Layla](/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/) beschrieben. Dieser Weg erzeugt ein Modell, das auf dem Prozessor (CPU) deines Geräts läuft. NPU Forge bietet für Smartphones mit einem unterstützten Snapdragon-Chip einen zweiten Weg: denselben Checkpoint, so umgewandelt, dass das Bild auf der NPU erzeugt wird. Das ist schneller.

Diese Anleitung erklärt, was du brauchst, wie du einen Checkpoint Schritt für Schritt umwandelst, wie lange das dauert und wie du mit dem Ergebnis Bilder erzeugst. Umwandlung und Bilderzeugung finden beide auf deinem Gerät statt, es wird also nichts hochgeladen.

![Die Mini-App NPU Forge mit einer Schaltfläche zum Auswählen eines Safetensors-Checkpoints und einer Karte für ihren Entwickler AbrahamPaulJ.](./npu-forge-checkpoint-picker.jpg)

## Was NPU Forge umwandelt

NPU Forge funktioniert mit zwei Arten von Checkpoints:

- **Stable Diffusion 1.5 (SD 1.5)**, die häufigste Checkpoint-Familie auf Civitai.
- **Stable Diffusion XL (SDXL)**, die größere Familie, die Bilder mit 1024 x 1024 Pixeln erzeugt.

Du musst Layla nicht sagen, welche Familie du ausgewählt hast. Layla liest die Datei und erkennt die Familie selbst. Die Modelle werden für die Standardauflösung der jeweiligen Familie umgewandelt: 512 x 512 für SD 1.5 und 1024 x 1024 für SDXL.

Manche Checkpoints lassen sich nicht umwandeln. SD-2.x-Modelle, Inpainting-Modelle und SDXL-Refiner-Modelle werden nicht unterstützt. Layla sagt dir das, bevor es losgeht, damit du keine Zeit mit einer Datei verlierst, die nicht funktioniert.

## Was du brauchst

- Ein Android-Smartphone mit einem Qualcomm-Snapdragon-Chip, der eine NPU hat. NPU Forge zeigt oben auf dem Bildschirm eine Meldung an, wenn Layla deinen Chip nicht erkennt.
- Einen Snapdragon 8 Gen 3 oder neuer, wenn du SDXL-Checkpoints umwandeln möchtest. SD 1.5 funktioniert mit einer größeren Auswahl an Snapdragon-Chips.
- Android 13 oder neuer.
- Die Mini-App _NPU Forge_, die etwa 216 MB an Umwandlungswerkzeugen herunterlädt. Lies [So aktivierst oder deaktivierst du Mini-Apps in Layla](/how-to-enable-disable-mini-apps-within-layla/), wenn du noch nie eine Mini-App installiert hast.
- Die Mini-App _Local Dream_, mit der du Bilder erzeugst. Sie lädt außerdem die NPU-Laufzeitumgebung herunter, die umgewandelte Modelle brauchen. NPU Forge kann ein Modell auch ohne sie umwandeln, aber das Modell läuft erst, wenn Local Dream diese Dateien geholt hat.
- Einen `.safetensors`-Checkpoint, der auf deinem Smartphone gespeichert ist.
- Freien Speicherplatz und Arbeitsspeicher. Die Zahlen findest du im nächsten Abschnitt.

NPU Forge gibt es nur für Android. Die Mini-App ist auf iOS nicht verfügbar, weil die NPU, auf die sie zielt, eine Qualcomm-Funktion ist.

## Speicherplatz, Arbeitsspeicher und Dauer

Die Umwandlung ist anspruchsvoll. Layla misst dein Smartphone, bevor es startet, und warnt dich, wenn die Ressourcen knapp aussehen. Das sind die ungefähren Mengen, die Layla empfiehlt; sie enthalten etwas Spielraum für Android und deine anderen Apps:

|                                    | SD 1.5         | SDXL            |
| ---------------------------------- | -------------- | --------------- |
| Arbeitsspeicher (RAM)              | etwa 5 GB      | etwa 8 GB       |
| Freier Speicherplatz               | etwa 3 GB      | etwa 23 GB      |
| Dauer auf einem Snapdragon 8 Elite | etwa 2 Minuten | etwa 22 Minuten |

Der Speicherwert wird gemessen, nachdem Layla deinen Checkpoint in seinen eigenen Bereich kopiert hat. Du brauchst diesen freien Platz also zusätzlich zum Checkpoint selbst. Ein langsamerer Chip braucht länger als die oben genannten Zeiten.

Die Warnung ist ein Hinweis, keine Sperre. Wenn dein Smartphone knapp ist, kannst du die Umwandlung trotzdem starten, aber sie kann mittendrin ohne Arbeitsspeicher oder Speicherplatz dastehen und fehlschlagen.

## So wandelst du einen Safetensors-Checkpoint um

### Schritt 1: Einen Checkpoint besorgen

Lade einen SD-1.5- oder SDXL-Checkpoint auf dein Smartphone herunter. Filtere auf [Civitai](https://civitai.com/) nach **Model Type: Checkpoint**, **File format: SafeTensor** und dem gewünschten **Base Model**.

![Civitai-Modellfilter mit den Einstellungen Checkpoint, SafeTensor und SD 1.5.](./civitai-model-filters.png)

Behalte die Datei nach dem Herunterladen. NPU Forge wandelt die ursprüngliche `.safetensors`-Datei um, nicht ein Modell, das du bereits in Layla importiert hast. Wenn du es zuvor über **Benutzerdefiniertes Modell hinzufügen** importiert hast, brauchst du trotzdem die Originaldatei.

### Schritt 2: NPU Forge öffnen

Öffne die Mini-App NPU Forge über **Meine Apps**. Es gibt auch eine Abkürzung: Auf einem Smartphone mit unterstützter Qualcomm-NPU zeigt der Bildschirm **Benutzerdefiniertes Modell hinzufügen** in den Inferenz-Einstellungen einen Hinweis, der vorschlägt, deine Safetensors für schnellere Bilderzeugung umzuwandeln. Tippst du darauf, öffnet sich NPU Forge unter „Apps durchsuchen“, wo du die Mini-App installieren kannst.

Zeigt der Bildschirm eine Meldung wie _NPU-Forge-Assets fehlen_, wurden die Umwandlungswerkzeuge noch nicht heruntergeladen. Lade sie zuerst auf der Seite der Mini-App herunter.

### Schritt 3: Deinen Checkpoint auswählen

Tippe auf **Select a safetensors checkpoint** („Safetensors-Checkpoint auswählen“) und wähle deine Datei. Layla kopiert sie in seinen eigenen Speicher und prüft sie. Bei großen Dateien dauert das Kopieren einen Moment.

Wenn du eine Datei wählst, die nicht auf `.safetensors` endet, lehnt Layla sie ab.

### Schritt 4: Das erkannte Modell lesen

Nach der Prüfung zeigt eine Karte **Erkanntes Modell**, was Layla gefunden hat:

- die Modellfamilie, SD 1.5 oder SDXL;
- die Anzahl der Gewichte und die Dateigröße;
- ob die drei Hauptbestandteile des Modells gefunden wurden: das UNet, der CLIP-Textencoder und das VAE;
- ein Label **Convertible** („umwandelbar“) oder **Not convertible** („nicht umwandelbar“).

Lautet das Label _Not convertible_, erklärt die Karte den Grund, zum Beispiel dass erforderliche Teile des Modells fehlen. Wähle in diesem Fall einen anderen Checkpoint.

Wenn du einen SDXL-Checkpoint gewählt hast und dein Smartphone einen älteren Chip hat, weist Layla darauf hin, dass SDXL einen Snapdragon 8 Gen 3 oder neuer braucht, und die Schaltfläche **Start conversion** bleibt deaktiviert.

### Schritt 5: LoRAs hinzufügen (optional)

Ein LoRA ist eine kleine Zusatzdatei, die den Stil eines Modells verändert oder ihm einen Charakter oder ein Konzept beibringt. NPU Forge kann LoRAs im Zuge der Umwandlung in dein Modell einfließen lassen.

1. Tippe auf **Add a LoRA** („LoRA hinzufügen“) und wähle eine LoRA-Datei im Format `.safetensors`.
2. Stelle die Stärke ein. Der Standardwert ist 1,0. Niedrigere Werte wenden das LoRA schwächer an.
3. Wiederhole das für weitere LoRAs. Sie werden in der Reihenfolge der Liste angewendet.
4. Tippe auf das Papierkorb-Symbol neben einem LoRA, um es zu entfernen.

LoRAs werden fest in das Modell eingebaut. Du kannst sie danach weder ausschalten noch ihre Stärke ändern. Wenn du eine andere Kombination nutzen möchtest, wandle den Checkpoint noch einmal mit den gewünschten LoRAs um. Nur der Teil eines LoRA, der das Bildmodell selbst betrifft, wird eingebunden, und manche LoRA-Formate werden möglicherweise nicht unterstützt.

### Schritt 6: Das Modell benennen

Layla schlägt den Dateinamen des Checkpoints vor. Du kannst ihn ändern. Der Name darf nicht mit einem vorhandenen Modellordner übereinstimmen, und Zeichen, die Dateisysteme nicht erlauben, etwa `/` und `:`, werden durch Leerzeichen ersetzt.

### Schritt 7: Die Umwandlung starten

Tippe auf **Start conversion** („Umwandlung starten“). Ein Fortschrittsfenster im Vollbild erscheint und zeigt die aktuelle Phase an, zum Beispiel _Gewichte werden extrahiert_ oder _Kompilieren für die NPU_, zusammen mit dem Teil des Modells, der gerade bearbeitet wird.

Beachte Folgendes, solange sie läuft:

- **Sie lässt sich nicht abbrechen und nicht in den Hintergrund schicken.** Lass Layla im Vordergrund geöffnet.
- **Schließe dein Smartphone ans Ladegerät an.** Die längste Phase kann viele Minuten dauern, besonders bei SDXL.
- Während der Umwandlung wird eine Benachrichtigung angezeigt, damit Android den Prozess nicht beendet.
- Der Bildschirm kann sich abdunkeln. Das ist in Ordnung.

Bei der Umwandlung wird zuerst der Textencoder konvertiert, dann das UNet quantisiert und für die NPU kompiliert. Bei SD 1.5 geschieht dasselbe mit dem VAE. Bei SDXL verwendet Layla ein gemeinsames VAE, das mit NPU Forge mitgeliefert wird, statt das VAE in deinem Checkpoint umzuwandeln. Das eigene VAE eines SDXL-Checkpoints hat also keinen Einfluss auf das Ergebnis.

### Schritt 8: Abschluss

Wenn die Umwandlung fertig ist, zeigt Layla **Konvertierung abgeschlossen**. Das Modell wird in deinen Bilderzeugungsmodellen gespeichert und automatisch ausgewählt, und die temporäre Kopie deines Checkpoints wird gelöscht. Deine Originaldatei bleibt unverändert.

Schlägt die Umwandlung fehl, zeigt Layla einen Fehler an und entfernt unvollständige Ergebnisse, sodass der Name für einen neuen Versuch frei bleibt.

## Mit dem umgewandelten Modell Bilder erzeugen

Öffne die Mini-App **Local Dream**. Dein umgewandeltes Modell ist bereits ausgewählt. Um zu einem anderen Modell zu wechseln, wähle es in der Modellliste aus.

![Local-Dream-Bildschirm zur Modellauswahl mit mehreren installierten Modellen.](./local-dream-select-model.jpg)

Gib einen Prompt ein und tippe auf **Generieren**.

![Local Dream, konfiguriert für die Erzeugung eines Bildes.](./local-dream-generate.jpg)

Layla trägt für jede Familie Startwerte ein: 30 Schritte und eine CFG-Skala von 7 für SD 1.5 sowie 20 Schritte und eine CFG-Skala von 4 für SDXL. Beides kannst du in Local Dream ändern, und das umgewandelte Modell behält den Stil seines ursprünglichen Checkpoints, einschließlich aller LoRAs, die du eingebunden hast.

Passt der Chip deines Smartphones nicht zu dem, was das Modell braucht, zeigt Local Dream über **Generieren** eine Warnung an. Du kannst die Erzeugung trotzdem versuchen, sie kann aber fehlschlagen.

Umgewandelte Modelle funktionieren auch, wenn deine Charaktere im Chat Bilder erzeugen, denn sie sind normale Einträge in deiner Liste der Bilderzeugungsmodelle. Wie du pro Charakter ein Modell auswählst, steht in [So aktivierst du die Bilderzeugung in Layla](/how-to-enable-image-generation-in-layla/).

## Häufig gestellte Fragen

### Muss ich einen Checkpoint umwandeln, um ihn in Layla zu verwenden?

Nein. Layla kann eine Safetensors-Datei direkt importieren und auf der CPU ausführen. Die Umwandlung mit NPU Forge ist die richtige Wahl, wenn du eine unterstützte Snapdragon-NPU hast und schnellere Bilderzeugung möchtest.

### Kann ich ein Modell umwandeln, das ich schon in Layla importiert habe?

Nicht direkt. NPU Forge liest die ursprüngliche `.safetensors`-Datei. Wenn du sie noch hast, wähle sie in NPU Forge aus. Wenn du sie gelöscht hast, lade sie erneut herunter.

### Kann ich ein SD-2.x-, Inpainting- oder SDXL-Refiner-Modell umwandeln?

Nein. Unterstützt werden nur SD-1.5- und SDXL-Base-Checkpoints.

### Warum sagt NPU Forge, mein Smartphone habe keine Qualcomm-NPU?

Layla entscheidet das anhand des Chipsatzes, den dein Smartphone meldet. Smartphones mit anderen Chips, etwa von MediaTek oder Samsung Exynos, können keine QNN-Modelle ausführen, daher lässt sich NPU Forge darauf nicht verwenden.

### Braucht die Umwandlung eine Internetverbindung?

Nur, um zu Beginn die Mini-Apps und ihre Dateien herunterzuladen. Die Umwandlung selbst läuft auf deinem Smartphone, und dein Checkpoint bleibt dort.

### Kann ich eine Umwandlung mittendrin stoppen?

Nein. NPU Forge kann eine Umwandlung weder abbrechen noch in den Hintergrund schicken. Starte sie also, wenn du das Smartphone in Ruhe lassen kannst, am besten am Ladegerät.

### Kann ich die LoRA-Stärke nach der Umwandlung ändern?

Nein. Die Stärken werden bei der Umwandlung festgelegt. Wandle den ursprünglichen Checkpoint mit den neuen Werten und einem neuen Modellnamen erneut um.

### Wie lösche ich ein umgewandeltes Modell?

Öffne Local Dream, wähle das Modell aus und nutze die Löschoption. Dadurch wird der vom Modell belegte Speicherplatz freigegeben.

### Wo finde ich mehr Kontrolle über die Umwandlung?

NPU Forge in Layla verwendet sinnvolle Standardwerte, die für die meisten Checkpoints passen. Wenn du Optionen wie Clip Skip und andere VAE-Genauigkeiten möchtest, sieh dir das Originalprojekt auf [GitHub](https://github.com/AbrahamPaulJ/npuforge) an.

## Danksagung

NPU Forge wurde von AbrahamPaulJ entwickelt, und die Mini-App verlinkt auf das [Originalprojekt auf GitHub](https://github.com/AbrahamPaulJ/npuforge). Die Bilderzeugung in Layla basiert auf [Local Dream](https://github.com/xororz/local-dream) von XORORZ.
