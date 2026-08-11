---
title: Layla mit BlueStacks und LM Studio auf dem PC ausführen
description: Installiere Layla in BlueStacks und verbinde es über eine lokale OpenAI-kompatible API mit einem Modell in LM Studio.
category: Mini-apps & integrations
order: 20
keywords:
  - Layla unter Windows
  - BlueStacks
  - LM Studio
  - OpenAI-kompatible API
  - lokales LLM
lastUpdated: 2026-07-26
translationKey: how-to-run-layla-on-your-pc-with-bluestacks-and-lm-studio
ai_translated: true
---

Layla ist für Android und iOS entwickelt, kann aber mit dem Android-Emulator BlueStacks auch auf einem Windows-PC laufen. Über LM Studio verwendest du für deine Unterhaltungen ein lokal auf dem Computer ausgeführtes LLM.

Diese Einrichtung eignet sich, wenn du Laylas Oberfläche und Rollenspielfunktionen auf einem größeren Bildschirm nutzen möchtest.

> **Hinweis:** Nicht alle Funktionen arbeiten auf dem PC, doch die meisten Chatfunktionen sollten normal funktionieren.

Dieser Leitfaden erklärt die Installation in BlueStacks, LM Studio als lokale Inferenz-Engine und die Verbindung über eine OpenAI-kompatible API.

## Voraussetzungen

Du benötigst einen Windows-PC für BlueStacks, genug RAM und Speicher für das Modell, BlueStacks 5, die offizielle Layla-APK, LM Studio und Internet für die ersten Downloads. Danach kann das Modell lokal in LM Studio laufen.

## 1. BlueStacks herunterladen und installieren

Lade [BlueStacks 5](https://www.bluestacks.com/bluestacks-5.html) von der offiziellen Website herunter, installiere es und lass die Android-Umgebung einrichten. Layla kann aus Google Play installiert werden, die folgenden Schritte verwenden jedoch die offizielle APK.

## 2. Die offizielle Layla-APK herunterladen

Öffne die [offizielle Layla-Website](https://www.layla-network.ai/).

![Dunkle Layla-Startseite mit Smartphone-Darstellungen und Downloadschaltflächen.](./download-layla.avif)

Wähle den direkten APK-Download und speichere ihn leicht auffindbar. Lade die APK aus Sicherheitsgründen nur von der offiziellen Website.

## 3. Die APK in BlueStacks installieren

1. Klicke in der Seitenleiste auf **Install APK**.
2. Wähle die heruntergeladene APK.
3. Warte auf die Installation.

Alternativ ziehst du die APK in das BlueStacks-Fenster. Danach erscheint Layla auf dem Startbildschirm. Vor einem lokalen Gespräch musst du LM Studio konfigurieren.

![BlueStacks mit Laylas Select-Character-Ansicht, Suche und Kategorien.](./bluestacks-select-character.avif)

## 4. LM Studio herunterladen und installieren

LM Studio ist eine Inferenz-Engine zum lokalen Herunterladen und Ausführen von Sprachmodellen. Lade [LM Studio](https://lmstudio.ai/download) offiziell herunter, installiere und öffne es und schließe die Ersteinrichtung ab.

## 5. Ein empfohlenes Sprachmodell herunterladen

Suche im Modellbrowser nach einem Modell. LM Studio kann Empfehlungen für deine Hardware anzeigen.

- Kleine Modelle benötigen weniger RAM und antworten meist schneller.
- Große Modelle können bessere Antworten erzeugen, brauchen aber mehr Speicher.
- Quantisierte Modelle verwenden gewöhnlich weniger RAM und VRAM.
- Beginne bei deiner ersten lokalen Einrichtung mit einem kleineren empfohlenen Modell.

![LM-Studio-Modellauswahl mit heruntergeladenen Modellen und Größen.](./lm-studio-model-selection.avif)

Warte, bis der Download abgeschlossen ist.

## 6. Den OpenAI-kompatiblen API-Server starten

Layla kommuniziert über die OpenAI-kompatible API von LM Studio.

1. Öffne **Developer**.
2. Wähle oder lade das Modell.
3. Öffne die Servereinstellungen.
4. Aktiviere **Serve on Local Network**.
5. Starte den lokalen API-Server.

![LM Studio Developer Local Server mit laufendem Server und hervorgehobenen Einstellungen.](./lm-studio-server-settings.avif)

LM Studio zeigt eine API-Adresse mit lokaler IP und Port, häufig `1234`, beispielsweise:

```text
http://192.168.1.100:1234
```

Die OpenAI-kompatible URL enthält normalerweise `/v1`:

```text
http://192.168.1.100:1234/v1/chat/completions
```

Verwende die tatsächlich angezeigte Adresse deines PCs.

**Gesucht ist die OpenAI-kompatible API zur Verbindung mit Layla.**

![Developer-Ansicht mit lokalem Server, OpenAI-kompatiblen Endpunkten und Protokollen; Chat Completions ist markiert.](./lm-studio-api-endpoints.avif)

### Warum Serve on Local Network nötig ist

BlueStacks läuft in einer eigenen virtuellen Android-Umgebung. Daher funktioniert meist nicht:

```text
http://localhost:1234/v1
```

In BlueStacks bezeichnet `localhost` Android statt den Windows-PC. **Serve on Local Network** stellt eine erreichbare Netzwerkadresse bereit.

Gib den Server nur in einem vertrauenswürdigen privaten Netzwerk frei. Erwäge API-Authentifizierung, wenn andere Geräte Zugriff haben.

## 7. Die OpenAI-kompatible API in Layla auswählen

1. Öffne **Settings**.
2. Gehe zu **Inference Settings**.
3. Wähle **OpenAI Compatible API**.

Layla sendet Chat-Anfragen nun an den Endpunkt statt an eine integrierte Engine.

![Auswahl der Inferenz-Engine mit Local File, Your PC, Layla Cloud, OpenAI API und Claude API.](./layla-inference-engine.avif)

## 8. Den LM-Studio-Endpunkt eingeben

Gib die in LM Studio angezeigte Netzwerkadresse einschließlich `/v1` ein, falls erforderlich, zum Beispiel:

```text
http://192.168.1.100:1234/v1/chat/completions
```

**Kopiere die Beispieladresse nicht unverändert, sondern verwende deine eigene.**

![Edit OpenAI API Settings in Layla mit Name, Endpunkt, API-Schlüssel und Modell.](./layla-api-settings.avif)

Speichere die Einstellungen. LM Studio muss geöffnet bleiben; Server und Modell müssen verfügbar sein, **Serve on Local Network** muss aktiv sein und die Windows-Firewall LM Studio in privaten Netzwerken erlauben.

## 9. Chatten

Öffne einen Charakter oder eine neue Unterhaltung und sende eine Nachricht. Layla leitet sie an das lokale Modell weiter und zeigt dessen Antwort.

![Layla-Chat über LM Studio mit der Frage „Who are you?“ und Laylas Antwort.](./layla-chat-via-lm-studio.avif)

## Fehlerbehebung

### Layla kann LM Studio nicht erreichen

Prüfe Serverstatus, **Serve on Local Network**, Netzwerkadresse statt `localhost`, Port, `/v1` und Windows-Firewall. Starte den Server nach Netzwerkänderungen neu.

### Verbindung besteht, aber es kommt keine Antwort

Prüfe, ob ein Modell heruntergeladen und verfügbar ist. Kontrolliere die Serverprotokolle und lade das Modell gegebenenfalls manuell.

### Antworten sind sehr langsam

Nutze ein kleineres oder stärker quantisiertes Modell, schließe speicherintensive Programme und verkleinere den Kontext.

### BlueStacks meldet eine inkompatible APK

Erstelle im Multi-instance Manager eine neue 64-Bit-Android-Instanz wie Pie 64-bit oder Android 11 und installiere Layla dort.

### Nach einem PC-Neustart funktioniert der Server nicht

Öffne LM Studio, gehe zu Developer und starte den Server erneut.

## Häufig gestellte Fragen

### Kann ich Layla unter Windows ausführen?

Ja. Die Android-APK läuft über einen Emulator wie BlueStacks.

### Gibt es eine native Windows-App?

Dieser Leitfaden verwendet Android in BlueStacks. Aktuell unterstützte Plattformen findest du auf der Layla-Website.

### Führt LM Studio das Modell lokal aus?

Ja. Modell und Generierung laufen auf deinem PC. Andere Layla-Funktionen können je nach Dienst Internet erfordern.

### Müssen BlueStacks und LM Studio geöffnet bleiben?

Ja. BlueStacks führt Layla aus, und der LM-Studio-API-Server erzeugt die Antworten.

### Welches LM-Studio-Modell sollte ich verwenden?

Das hängt von RAM, VRAM und Rechenleistung ab. Beginne mit einer Empfehlung für deine Hardware und teste später größere Modelle.

## Zusammenfassung

1. BlueStacks installieren.
2. Offizielle Layla-APK herunterladen.
3. Layla in BlueStacks installieren.
4. LM Studio installieren und ein Modell laden.
5. Den OpenAI-kompatiblen API-Server starten.
6. **Serve on Local Network** aktivieren.
7. Den Endpunkt in Layla eingeben.
8. Chatten.

Damit nutzt du Laylas Android-Erfahrung auf einem größeren Windows-Bildschirm, während dein PC die lokale LLM-Inferenz übernimmt.
