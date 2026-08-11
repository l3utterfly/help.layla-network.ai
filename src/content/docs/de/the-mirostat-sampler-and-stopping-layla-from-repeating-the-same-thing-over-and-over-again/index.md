---
title: Der Mirostat-Sampler und wie du wiederholte Antworten reduzierst
description: Aktiviere den Mirostat-Sampler in Layla und erfahre, wie adaptive Perplexitätssteuerung Wiederholungen reduzieren kann.
category: Models & performance
order: 70
keywords:
  - Mirostat-Sampler
  - wiederholte Antworten
  - Perplexität
  - Texterzeugung
  - erweiterte Layla-Einstellungen
lastUpdated: 2024-01-12
translationKey: the-mirostat-sampler-and-stopping-layla-from-repeating-the-same-thing-over-and-over-again
ai_translated: true
---

Wenn Layla in ihren Nachrichten immer wieder dasselbe Ende verwendet, kannst du den Mirostat-Sampler aktivieren:

1. Öffne die Seite _Einstellungen_.
2. Tippe auf _Erweiterte Einstellungen_.
3. Scrolle nach unten und aktiviere den _MiroStat-Sampler_.

![Schritte zum Aktivieren des Mirostat-Samplers in Layla.](./enable-mirostat.png)

**Was ist der Mirostat-Sampler?**

Der Mirostat-Sampler ist ein neuronaler Textdecodierungsalgorithmus für Sprachmodelle, der sich besonders auf die direkte Steuerung der Perplexität bei der Texterzeugung konzentriert. Perplexität misst die Unsicherheit bei der Vorhersage des nächsten Tokens in einer Sequenz. Eine niedrigere Perplexität steht im Allgemeinen für besser vorhersehbaren Text.

Mirostat soll die Qualität des erzeugten Textes in einem gewünschten Bereich halten und dabei Kohärenz und Vielfalt ausbalancieren. Dadurch lassen sich zwei verbreitete Probleme bei der Texterzeugung vermeiden: die „Langeweile-Falle“ übermäßiger Wiederholungen und die „Verwirrungs-Falle“ mangelnder Kohärenz. Durch eine Zielperplexität und einen feedbackbasierten adaptiven Ansatz kann Mirostat Texte beliebiger Länge mit einem vorgegebenen Perplexitätsniveau erzeugen, ohne Parameter nachträglich abstimmen zu müssen.

In Experimenten mit menschlichen Bewertenden reduzierte der Algorithmus Wiederholungen auf Satzebene und verbesserte Flüssigkeit, Kohärenz und allgemeine Textqualität. Die Steuerung der Perplexität kann wichtige Eigenschaften erzeugter Texte beeinflussen, darunter die Häufigkeit von Wiederholungen.

Mirostat geht über traditionelle Samplingmethoden wie Top-k, Top-p beziehungsweise Nucleus Sampling und temperaturbasiertes Sampling hinaus. Diese Methoden erfordern häufig eine sorgfältige Abstimmung und können dennoch störende Wiederholungen oder inkohärente Texte erzeugen. Mit seinem stärker kontrollierten Ansatz trägt Mirostat zu zuverlässigeren Ausgaben von Sprachmodellen bei.

Weitere Informationen findest du im Paper [Mirostat: A Neural Text Decoding Algorithm that Directly Controls Perplexity](https://ar5iv.labs.arxiv.org/html/2007.14966).
