---
title: MOSS Image-safetensors-Modelle und LoRAs von Civitai in Layla importieren
description: Laden Sie MOSS Image-Checkpoints und LoRAs von Civitai herunter und importieren Sie sie in Layla für die Offline-Bildgenerierung auf Ihrem Smartphone.
category: Image generation
order: 22
keywords:
  - MOSS Image
  - Offline-Bildgenerierung
  - KI-Bildgenerator Android
  - Stable Diffusion
  - Civitai-Modelle
  - safetensors importieren
  - GGUF-Bildmodelle
  - LoRA
  - Snapdragon-NPU
  - Local Dream
  - NPU Forge
  - Text-zu-Bild
  - Bild-zu-Bild
  - Charakterbilder
  - Stable Diffusion auf iPhone
  - Layla
lastUpdated: 2026-11-04
translationKey: how-to-import-moss-image-safetensor-models-from-civitai-into-layla
ai_translated: true
---

**Layla importiert MOSS-Image-safetensors-Checkpoints und LoRAs von Civitai für Offline-Bilder auf Android.** MOSS Image ist ein neueres Text-zu-Bild-Modell als Stable Diffusion. Auf [Civitai](https://civitai.com/) gibt es bereits Community-Finetunes und LoRAs. Konvertierung und spätere Generierung erfolgen lokal.

Diese Anleitung erklärt Suche, richtigen Download, Import und LoRAs. Andere Familien: [SD 1.5](/de/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/), [SDXL](/de/how-to-import-sdxl-safetensor-models-from-civitai-into-layla/), [Qwen Image 2.1](/de/how-to-import-qwen-image-2-1-safetensor-models-from-civitai-into-layla/), [FLUX.2 Klein](/de/how-to-import-flux-2-klein-safetensor-models-from-civitai-into-layla/). GGUF, Zip und Web UI behandelt [Eigene Bildgenerierungsmodelle in Layla importieren](/de/how-to-import-custom-image-generation-models-into-layla/).

## Was ist MOSS Image?

MOSS-Image ist ein Text-zu-Bild-Modell mit offenen Gewichten vom OpenMOSS-Team: ein Diffusionstransformer mit 5 Milliarden Parametern, veröffentlicht im Oktober 2026. **Base** dient Finetuning und LoRA-Training, **SFT** der normalen Generierung. Civitai-Anbieter veröffentlichen Finetunes beider Varianten.

Civitais **Base model**-Filter heißt **MOSS Image**, Laylas Auswahl **MOSS**. Ein MOSS-Image-LoRA benötigt einen Checkpoint derselben Familie.

## Voraussetzungen

- Android mit Snapdragon 8 Elite (SM8750) oder neuer. MOSS Image-Imports laufen auf der Snapdragon-NPU und sind nicht für iPhone verfügbar. Layla prüft den Chip beim Import nicht; kontrollieren Sie ihn vor einer großen Konvertierung.

- Die Mini-App **Local Dream**. Zur Installation siehe [Mini-Apps in Layla aktivieren oder deaktivieren](/de/how-to-enable-disable-mini-apps-within-layla/).

- Ein in Local Dream heruntergeladenes integriertes Modell: **MOSS-Image Turbo** / **MOSS-Image Base**. Layla verwendet dessen Tokenizer, Textencoder und VAE. Fehlen sie, warnt Safetensor und deaktiviert den Import.

- Viel freier Speicher: Ein fp16-MOSS-Checkpoint benötigt fast 10 GB.

## Welche safetensors-Datei herunterladen?

**Layla unterstützt f16-safetensors (halbe Genauigkeit)**, auf Civitai **fp16 SafeTensor** genannt. Für MOSS Image werden auch bf16-Dateien akzeptiert. Quantisierte Varianten wie **fp8**, **int8**, **int4** und **nvfp4** werden nicht unterstützt.

Viele MOSS-Checkpoints werden nur als int8 oder bf16 angeboten. **Best match** kann auf eine quantisierte Datei zeigen. Öffnen Sie die Variantenliste und prüfen Sie das Label.

## Einen MOSS Image-Checkpoint von Civitai importieren

### Schritt 1: Civitai und Models öffnen

![Civitai-Startseite mit hervorgehobenem Models-Tab.](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/civitai-open-models-page.jpg)

Öffnen Sie [civitai.com](https://civitai.com/) und wählen Sie oben **Models**. Die Screenshots stammen vom Desktop-Browser; auf dem Smartphone kann das Layout abweichen.

### Schritt 2: Checkpoint, SafeTensor und MOSS Image filtern

![Civitai-Filter mit Checkpoint, SafeTensor und MOSS Image.](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/civitai-moss-image-checkpoint-filters.jpg)

Öffnen Sie oben rechts **Filters**:

1. **Model types**: **Checkpoint**.
2. **File format**: **SafeTensor**.
3. **Base model**: **MOSS Image** suchen und auswählen.

Jetzt sehen Sie MOSS Image-Checkpoints im passenden Format. [Gefilterte Liste öffnen](https://civitai.com/models?types=Checkpoint&fileFormats=SafeTensor&baseModels=MOSS%20Image&sort=Most%20Downloaded).

### Schritt 3: Die fp16-safetensors-Datei herunterladen

![Civitai-Download mit fp16 SafeTensor, 9.47 GB und Download-Schaltfläche.](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/civitai-moss-image-checkpoint-download-fp16.jpg)

Öffnen Sie das Modell und prüfen Sie rechts **Download**. Wählen Sie **fp16 SafeTensor**, hier 9.47 GB, und **Download**. Bei mehreren Varianten nehmen Sie fp16. Unterstützte bf16-Ausnahmen sind oben erklärt.

Sie benötigen nur den Checkpoint. Civitais **Required Components** wie Textencoder und VAE sind für andere Programme bestimmt. Layla verwendet die Zusatzdateien des bereits in Local Dream geladenen Basismodells.

### Schritt 4: In Layla importieren

Öffnen Sie **Settings** → **Inference Settings** → **Image Generation** → **Add Custom Model** oder **Local Dream** → **Add Model**.

![Inference Settings mit Add Custom Model unter Image Generation.](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/image-generation-settings.jpg)

Wählen Sie unter **Safetensor** das **Base Model** **MOSS**.

![Base Model mit SD1.5, SDXL, MOSS, Qwen Image 2.1 und Flux 2 Klein.](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/image-model-base-model-list-layla.jpg)

Wählen Sie unter **MODEL CHECKPOINT** die Datei, prüfen Sie **MODEL NAME** und tippen Sie auf **Import & Convert**. Layla konvertiert in ein Q4_0-GGUF-Diffusionsmodell. Das dauert eventuell mehrere Minuten; lassen Sie die App geöffnet. Das fertige Modell wird gespeichert und automatisch gewählt.

Layla prüft die Modellfamilie nicht anhand der Datei. **MOSS** für eine andere Familie auszuwählen kann Import oder Generierung scheitern lassen.

### Schritt 5: Ein Bild erzeugen

Öffnen Sie **Local Dream**, prüfen Sie das Modell und geben Sie einen Prompt ein. Anfangswerte sind 20 Schritte und CFG 5, beide änderbar. Turbo- und andere Wenig-Schritt-Modelle benötigen meist niedrigere Werte.

## Ein MOSS Image-LoRA von Civitai hinzufügen

Ein LoRA ist eine kleine Datei, die Stil verändert oder einen Charakter, ein Objekt oder Konzept ergänzt. Die Suche ähnelt der nach Checkpoints, mit anderem Modelltyp.

### Schritt 1: LoRA und MOSS Image filtern

![Civitai-Filter mit LoRA und MOSS Image.](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/civitai-moss-image-lora-filters.jpg)

Öffnen Sie **Models** → **Filters**, unter **Model types** wählen Sie **LoRA**, unter **Base model** **MOSS Image**. [Gefilterte Liste öffnen](https://civitai.com/models?types=LORA&fileFormats=SafeTensor&baseModels=MOSS%20Image&sort=Most%20Downloaded). Das Filterpanel ist dasselbe wie für Checkpoints.

### Schritt 2: Die LoRA-safetensors-Datei herunterladen

![Civitai-LoRA-Seite für MOSS Image mit SafeTensor-Datei von 61.54 MB und Download.](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/civitai-moss-image-lora-download-fp16.jpg)

Manche LoRAs bieten eine Version je Basisfamilie. Wählen Sie MOSS Image, hier **v1.0 Moss**, prüfen Sie **fp16 SafeTensor**, hier 61,54 MB, und wählen Sie **Download**.

### Schritt 3: LoRA beim Import hinzufügen

Wählen Sie unter **Safetensor** das **Base Model** **MOSS** und Ihren Checkpoint. Unter **LORA FILES (OPTIONAL)** → **Add LoRA** wählen Sie die Datei und Stärke (Standard 1.0). Mehrere sind möglich. Starten Sie anschließend **Import & Convert**.

Bei MOSS Image werden LoRAs in den Modellordner kopiert und während der Generierung angewendet. Wählen Sie danach das Modell in Local Dream und **Model setup**, um Dateien, Sampler und LoRAs anzusehen oder zu ändern.

### LoRA ohne vollständigen Checkpoint verwenden

Aktivieren Sie bei MOSS Image unter **Safetensor** **LoRA only**. Das neue Modell nutzt die bereits geladene Basis in Local Dream und Ihre LoRAs ohne Checkpoint. Das spart Zeit und Speicher der Konvertierung.

## Häufige Fragen

### Kann ich MOSS Image auf meinem Smartphone nutzen?

Ja, mit den oben genannten Voraussetzungen. Wählen Sie **MOSS** als **Base Model** und importieren Sie den Civitai-Checkpoint. Familien mit wiederverwendeter Basis benötigen vorher den entsprechenden Download in Local Dream.

### Welche MOSS Image-Datei von Civitai soll ich laden?

**fp16 SafeTensor** oder bf16. Kein fp8, int8, int4 oder nvfp4, auch wenn Civitai es als Standard zeigt.

### Warum sind MOSS-Image-Checkpoints so groß?

fp16 speichert alle Gewichte mit halber Genauigkeit: fast 10 GB bei 5 Milliarden Parametern. Quantisierte Dateien sind kleiner, werden aber nicht importiert.

### Was unterscheidet MOSS Base und SFT?

Base dient Finetuning und LoRA-Training, SFT der normalen Generierung. Beide nutzen in Layla **MOSS**.

### Kann ich MOSS Image auf iPhone importieren?

Nein. iOS importiert nur SD-1.5-safetensors. Siehe die oben verlinkte SD-1.5-Anleitung.

### Braucht ein Civitai-Import Internet?

Nur zum Dateidownload. Konvertierung und Bildgenerierung erfolgen auf Ihrem Gerät.

### Wie lösche ich ein importiertes Modell?

Öffnen Sie **Local Dream**, wählen Sie das Modell und **Delete Model**, um Speicher freizugeben.

## MOSS Image offline auf dem Smartphone

Nach dem Import läuft MOSS Image ohne Internet, Konto oder Abo auf Ihrem Smartphone. Prompts, Modell und Bilder bleiben auf dem Gerät.
