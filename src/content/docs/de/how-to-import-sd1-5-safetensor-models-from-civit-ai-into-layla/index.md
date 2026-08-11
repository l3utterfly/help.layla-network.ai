---
title: So importierst du SD1.5-Safetensor-Modelle von Civitai in Layla
description: Importiere Safetensor-Dateien von Civitai in Layla, um Bilder lokal zu erzeugen.
category: Image generation
order: 20
keywords:
  - SD 1.5
  - Safetensor
  - Civitai
  - Bilderzeugung
  - Local Dream
lastUpdated: 2026-05-06
translationKey: how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla
ai_translated: true
---

Layla unterstützt Safetensor-Modelle für die Bilderzeugung. Die meisten Safetensor-Dateien für die Bilderzeugung findest du auf [Civitai](https://civitai.com/).

Diese Anleitung erklärt, wie du Safetensor-Dateien von Civitai in Layla importierst.

**Schritt 1: [Civitai](https://civitai.com/) öffnen**

![Civitai-Modellseite mit hervorgehobenen Filtern für Modelltyp, Dateiformat und Basismodell.](./civitai-model-filters.png)

Öffne den Bereich **Modelle**. Wähle in den Filtern oben rechts unter **Modelltyp** die Option **Checkpoint**. Wähle unter **Dateiformat** die Option **SafeTensor** und unter **Basismodell** die Option **SD 1.5**.

Daraufhin wird eine Liste aller von Layla unterstützten Bildmodelle angezeigt.

**Schritt 2: Safetensor-Datei herunterladen**

![Civitai-Modelldownloadseite mit Beispielen erzeugter Bilder.](./civitai-model-download.png)

Lade die Safetensor-Datei von der Downloadseite herunter. _Achte darauf, dass die Datei ungefähr 2 GB groß ist. Daran erkennst du, dass sie richtig formatiert ist._

**Schritt 3: In Layla importieren**

Öffne **Einstellungen** → **Inferenz-Einstellungen**.

Scrolle nach unten zu den Einstellungen für die **Bilderzeugung** und tippe auf **Benutzerdefiniertes Modell hinzufügen**.

![Layla-Inferenz-Einstellungen mit „Benutzerdefiniertes Modell hinzufügen“ im Abschnitt Bilderzeugung.](./image-generation-settings.jpg)

![Layla-Dialog zur Auswahl eines lokalen Bilderzeugungsmodells oder der SD Web UI.](./choose-image-model.jpg)

Wähle die gerade heruntergeladene Safetensor-Datei aus. Layla beginnt mit dem Import.

![Layla-Fortschrittsdialog beim Importieren einer Safetensor-Datei.](./importing-safetensor.jpg)

![Layla-Dialog zur Auswahl eines lokalen Bilderzeugungsmodells oder der SD Web UI.](./choose-image-model.jpg)

**Schritt 4: Bild erzeugen**

Öffne nach dem Import deines Bildmodells die Mini-App Local Dream und erzeuge damit ein Bild.

![Local-Dream-Bildschirm, der für die Erzeugung eines schnellen Autos konfiguriert ist.](./local-dream-generate.jpg)

![Modellauswahl in Local Dream mit mehreren installierten Modellen.](./local-dream-select-model.jpg)
