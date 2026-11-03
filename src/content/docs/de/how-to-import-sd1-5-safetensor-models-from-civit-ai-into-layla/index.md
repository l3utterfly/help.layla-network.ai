---
title: SD 1.5-safetensors-Modelle und LoRAs von Civitai in Layla importieren
description: Laden Sie SD 1.5-Checkpoints und LoRAs von Civitai herunter und importieren Sie sie in Layla für die Offline-Bildgenerierung auf Ihrem Smartphone.
category: Image generation
order: 20
keywords:
  - SD 1.5
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
translationKey: how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla
ai_translated: true
---

**Layla importiert Stable-Diffusion-1.5-Checkpoints (SD 1.5) und LoRAs im safetensors-Format von Civitai für Offline-Bilder auf Android und iPhone.** Die meisten Community-Modelle auf [Civitai](https://civitai.com/) verwenden safetensors. Die Konvertierung erfolgt auf dem Gerät; nach dem Download brauchen Sie zum Generieren kein Internet.

Diese Anleitung erklärt Suche, richtigen Download, Import und LoRAs. Andere Familien: [SDXL](/de/how-to-import-sdxl-safetensor-models-from-civitai-into-layla/), [MOSS Image](/de/how-to-import-moss-image-safetensor-models-from-civitai-into-layla/), [Qwen Image 2.1](/de/how-to-import-qwen-image-2-1-safetensor-models-from-civitai-into-layla/), [FLUX.2 Klein](/de/how-to-import-flux-2-klein-safetensor-models-from-civitai-into-layla/). GGUF, Zip und Web UI behandelt [Eigene Bildgenerierungsmodelle in Layla importieren](/de/how-to-import-custom-image-generation-models-into-layla/).

## Was ist SD 1.5?

SD 1.5 ist Stable Diffusion 1.5, eine Version von [Stable Diffusion](https://en.wikipedia.org/wiki/Stable_Diffusion) für 512 x 512 Pixel. Tausende fotorealistische, Anime- und Illustrations-Checkpoints und LoRAs machen sie zur häufigsten Familie auf Civitai. Deshalb gibt es den **Base model**-Filter **SD 1.5**.

LoRAs funktionieren nur mit Checkpoints derselben Basis. Ein SD-1.5-LoRA funktioniert nicht mit SDXL und umgekehrt.

## Welche safetensors-Datei herunterladen?

**Layla unterstützt nur f16-safetensors (halbe Genauigkeit).** Suchen Sie bei Civitai nach **fp16 SafeTensor**. Prüfen Sie die Genauigkeit vor dem Download.

SD 1.5 in fp16 ist meist etwa 2 GB groß. Vollpräzisionsvarianten können mehrere Gigabyte größer sein. Wählen Sie fp16.

## Einen SD 1.5-Checkpoint von Civitai importieren

### Schritt 1: Civitai und Models öffnen

![Civitai-Startseite mit hervorgehobenem Models-Tab.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-open-models-page.jpg)

Öffnen Sie [civitai.com](https://civitai.com/) und wählen Sie oben **Models**. Die Screenshots stammen vom Desktop-Browser; auf dem Smartphone kann das Layout abweichen.

### Schritt 2: Checkpoint, SafeTensor und SD 1.5 filtern

![Civitai-Filter mit Checkpoint, SafeTensor und SD 1.5.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-sd-1-5-checkpoint-filters.jpg)

Öffnen Sie oben rechts **Filters**:

1. **Model types**: **Checkpoint**.
2. **File format**: **SafeTensor**.
3. **Base model**: **SD 1.5** suchen und auswählen.

Jetzt sehen Sie SD 1.5-Checkpoints im passenden Format. [Gefilterte Liste öffnen](https://civitai.com/models?types=Checkpoint&fileFormats=SafeTensor&baseModels=SD%201.5&sort=Most%20Downloaded).

Zum Einstieg eignen sich **Most Downloaded** oder **Highest Rated** als Sortierung.

### Schritt 3: Die fp16-safetensors-Datei herunterladen

![Civitai-Download mit fp16 SafeTensor, 1.99 GB und Download-Schaltfläche.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-sd-1-5-checkpoint-download-fp16.jpg)

Öffnen Sie das Modell und prüfen Sie rechts **Download**. Wählen Sie **fp16 SafeTensor**, hier 1.99 GB, und **Download**. Bei mehreren Varianten nehmen Sie fp16. Unterstützte bf16-Ausnahmen sind oben erklärt.

### Schritt 4: In Layla importieren

Öffnen Sie **Settings** → **Inference Settings** → **Image Generation** → **Add Custom Model** oder **Local Dream** → **Add Model**.

![Inference Settings mit Add Custom Model unter Image Generation.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/image-generation-settings.jpg)

Lassen Sie unter **Safetensor** das **Base Model** auf **SD1.5**. Auf iPhone fehlt diese Liste, da nur SD 1.5 verfügbar ist.

![Add Image Model mit Safetensor und Base Model SD1.5.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/add-image-model-safetensor-tab-layla.jpg)

Wählen Sie unter **MODEL CHECKPOINT** die Datei, prüfen Sie den Namen und tippen Sie auf **Import & Convert**. Lassen Sie Layla während der mehrminütigen Verarbeitung geöffnet. Danach wird das Modell gespeichert und automatisch ausgewählt.

### Schritt 5: Ein Bild erzeugen

Öffnen Sie **Local Dream**, prüfen Sie das gewählte Modell und geben Sie einen Prompt ein.

![Local Dream mit Einstellungen für das Bild eines schnellen Autos.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/local-dream-generate.jpg)

![Local-Dream-Modellauswahl mit mehreren installierten Modellen.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/local-dream-select-model.jpg)

So importierte SD-1.5-Modelle laufen auf der CPU bis 512 x 512. Mit unterstütztem Qualcomm Snapdragon konvertieren Sie denselben Checkpoint für schnellere NPU-Generierung. Siehe [NPU Forge](/de/how-to-convert-safetensors-to-qnn-with-npu-forge-in-layla/).

## Ein SD 1.5-LoRA von Civitai hinzufügen

Ein LoRA ist eine kleine Datei, die Stil verändert oder einen Charakter, ein Objekt oder Konzept ergänzt. Die Suche ähnelt der nach Checkpoints, mit anderem Modelltyp.

### Schritt 1: LoRA und SD 1.5 filtern

![Civitai-Filter mit LoRA und SD 1.5.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-sd-1-5-lora-filters.jpg)

Öffnen Sie **Models** → **Filters**, unter **Model types** wählen Sie **LoRA**, unter **Base model** **SD 1.5**. [Gefilterte Liste öffnen](https://civitai.com/models?types=LORA&fileFormats=SafeTensor&baseModels=SD%201.5&sort=Most%20Downloaded). Das Filterpanel ist dasselbe wie für Checkpoints.

### Schritt 2: Die LoRA-safetensors-Datei herunterladen

![Civitai-LoRA-Seite für SD 1.5 mit SafeTensor-Datei von 9.11 MB und Download.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-sd-1-5-lora-download-fp16.jpg)

LoRAs sind oft 10 bis 150 MB groß und deutlich kleiner als Checkpoints; das Beispiel hat 9,11 MB. Wählen Sie **fp16 SafeTensor**, wenn die Genauigkeit angegeben ist, und **Download**.

### Schritt 3: LoRA beim Import hinzufügen

Wählen Sie unter **Safetensor** das **Base Model** **SD1.5** und Ihren Checkpoint. Unter **LORA FILES (OPTIONAL)** → **Add LoRA** wählen Sie die Datei und Stärke (Standard 1.0). Mehrere sind möglich. Starten Sie anschließend **Import & Convert**.

Bei SD 1.5 werden LoRAs fest in das konvertierte Modell integriert. Änderungen oder Entfernen sind danach unmöglich. Importieren Sie für andere Kombinationen den Originalcheckpoint unter neuem Namen erneut.

## Häufige Fragen

### Kann ich SD 1.5 auf meinem Smartphone nutzen?

Ja, mit den oben genannten Voraussetzungen. Wählen Sie **SD1.5** als **Base Model** und importieren Sie den Civitai-Checkpoint. Familien mit wiederverwendeter Basis benötigen vorher den entsprechenden Download in Local Dream.

### Welche SD 1.5-Datei von Civitai soll ich laden?

**fp16 SafeTensor**. Andere Genauigkeiten und Formate wie PickleTensor (`.ckpt`) eignen sich nicht.

### Braucht ein Civitai-Import Internet?

Nur zum Dateidownload. Konvertierung und Bildgenerierung erfolgen auf Ihrem Gerät.

### Kann ich SD 1.5 auf iPhone importieren?

Ja. iOS importiert SD 1.5 über **Safetensor**. Andere Familien sind nur für Android.

### Kann ich SDXL oder andere Familien importieren?

Unter Android ja: SDXL, MOSS Image, Qwen Image 2.1 und FLUX.2 Klein. Die Anleitungen sind oben verlinkt.

### Kann ich SD-1.5-LoRAs verwenden?

Ja, beim Import unter **Safetensor**. Es müssen SD-1.5-LoRAs sein; ihre Stärke wird bei der Konvertierung festgelegt.

### Warum dauert der Import so lange?

Layla konvertiert den vollständigen Checkpoint. Das kann mehrere Minuten dauern. Lassen Sie die App bis zum Abschluss geöffnet.

### Wie lösche ich ein importiertes Modell?

Öffnen Sie **Local Dream**, wählen Sie das Modell und **Delete Model**, um Speicher freizugeben.

## SD 1.5 offline auf dem Smartphone

Nach dem Import läuft SD 1.5 ohne Internet, Konto oder Abo auf Ihrem Smartphone. Prompts, Modell und Bilder bleiben auf dem Gerät.
