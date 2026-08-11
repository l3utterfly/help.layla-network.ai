---
title: Der DRY-Sampler und wie du Wiederholungen von Layla reduzierst
description: Aktiviere den DRY-Sampler in den erweiterten Einstellungen, um wiederholte Formulierungen in Laylas Antworten zu reduzieren.
category: Models & performance
order: 60
keywords:
  - DRY-Sampler
  - Wiederholungsstrafe
  - erweiterte Layla-Einstellungen
  - wiederholte Antworten
  - quantisiertes LLM
lastUpdated: 2024-04-26
translationKey: the-dry-sampler-and-how-to-stop-layla-from-repeating-herself-over-and-over-again
ai_translated: true
---

![Empfohlene Standardwerte für den DRY-Sampler.](./dry-sampler-defaults.jpeg)

Wiederholungen sind ein häufiges Problem dieser LLM-Generation, besonders bei Modellen, die auf deinem Smartphone ausgeführt werden. Das liegt unter anderem daran, dass sie quantisiert wurden. Dabei werden die Modelle komprimiert, indem die Genauigkeit jedes Neurons reduziert wird.

Manchmal wiederholen deine Charaktere immer wieder dieselben Formulierungen. Öffne die _Erweiterten Einstellungen_ und aktiviere den DRY-Multiplikator, um dieses Problem abzuschwächen. Die im Bild oben gezeigten Werte eignen sich als Standardeinstellungen. Du kannst sie anpassen, um die besten Ergebnisse für deinen Charakter zu finden.

Eine ausführlichere Erklärung der Ursache und der Funktionsweise von DRY findest du in der [Diskussion zum DRY-Sampler in text-generation-webui](https://github.com/oobabooga/text-generation-webui/pull/5677#issue-2177692564).
