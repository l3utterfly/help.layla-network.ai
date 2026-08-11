---
title: Was sind Layla-Mini-Apps? Mit CodeKitty eine App direkt auf dem Gerät erstellen
description: Erfahren Sie, wie Layla-Mini-Apps über die Host-Bridge das Modell auf dem Gerät, Charaktere, Bilder, Sprache und privaten Speicher nutzen.
category: Mini-apps & integrations
order: 30
keywords:
  - Layla-Mini-Apps
  - CodeKitty
  - Layla SDK
  - WebView-Apps
  - KI auf dem Gerät
lastUpdated: 2026-07-18
translationKey: post-what-are-layla-mini-apps-codekitty
ai_translated: true
---

**Eine Layla-Mini-App ist eine eigenständige Web-App, die in Layla ausgeführt wird und über eine Bridge auf die bereits auf Ihrem Smartphone vorhandene KI zugreifen kann — das lokale Modell, Bilderzeugung, Sprache, Ihre Charaktere und privaten Dateispeicher — ganz ohne API-Schlüssel und Server.**

![Neonfarbenes Cyberkatzen-Logo mit Code-Symbolen auf dunklem Hintergrund.](./codekitty-logo.avif)

[CodeKitty](https://apps.layla-cloud.com/app/codekitty) ist eine Mini-App, die andere Mini-Apps erstellt. Sie vereint Code-Editor, Live-Vorschau, Projektbibliothek, Bildgenerator und KI-Programmierassistent in einer einzigen HTML-Datei. Dieser Artikel erklärt anhand von CodeKitty, wie das Mini-App-System funktioniert, denn die App nutzt fast jeden Teil dieses Systems.

## Was ist eine Layla-Mini-App?

Eine Mini-App ist eine gewöhnliche Webanwendung — HTML, CSS und JavaScript — die Layla in einer WebView ausführt. Erst die Host-Bridge macht sie zu mehr als einer Webseite.

Eine normale Web-App, die ein LLM verwenden möchte, benötigt einen API-Schlüssel, einen Server und eine Netzwerkverbindung. Sie sendet Ihre Daten an einen anderen Ort. Eine Layla-Mini-App tut das nicht. Sie läuft innerhalb von Layla, und Layla stellt die bereits auf dem Gerät installierten Funktionen bereit: lokale Modellinferenz, Bilderzeugung, Text-to-Speech, Ihre Charakterliste und ein privates Dateisystem für jede App.

Damit wird das übliche Prinzip umgekehrt. Die KI ist kein externer Dienst, den die App aufruft, sondern eine vom Host bereitgestellte Funktion. Sie müssen keinen Schlüssel eingeben, keinen Endpoint konfigurieren und kein Konto erstellen, weil es keinen externen Dienst gibt, bei dem eine Authentifizierung nötig wäre. Die Inferenz läuft auf Ihrer Hardware mit dem jeweils geladenen [GGUF-Modell](/de/what-are-gguf-models-what-are-model-quants/).

Eine Mini-App wird als ZIP-Datei ausgeliefert. Sie enthält `app.json` für die Metadaten, `index.html` für die App und sämtliche Assets direkt im Stammverzeichnis.

## Was CodeKitty ist

CodeKitty ist eine IDE, die auf Ihrem Smartphone läuft und installierbare Layla-Mini-Apps erzeugt.

Ein Projekt wird als virtuelles Dateisystem behandelt: als JavaScript-Objekt, dessen Schlüssel Dateinamen sind. Ein neues Projekt beginnt mit vier Einträgen: `index.html`, `app.json`, `icon.jpg` und `bg.jpg`. Da diese Dateien im Speicher statt auf der Festplatte liegen, kann der Editor zwischen ihnen wechseln, sie an das Modell senden, in einer Vorschau ausführen oder ohne ein konventionelles zugrunde liegendes Dateisystem als ZIP verpacken.

Die Oberfläche verwendet React, Prism für die Syntaxhervorhebung, Babel zum Kompilieren von JSX im Browser, JSZip für die Paketierung und Marked zum Anzeigen der Antworten des Assistenten. Alles ist in einer einzigen `index.html` enthalten.

## Der Host ist die API

Als Entwickler sollten Sie zuerst verstehen, dass das SDK kein Cloud-Client ist.

```js
const layla = new LaylaSDK();
```

Das ist die gesamte Einrichtung. Es gibt weder Schlüssel noch Basis-URL. `LaylaSDK` serialisiert Aufrufe an:

```js
window.ReactNativeWebView.postMessage(...);
```

Layla führt die Arbeit nativ aus und sendet Ereignisse an die WebView zurück. Von dort aus kann eine Mini-App auf Charaktere, gestreamte Chat-Completions, Bilderzeugung, Sprachausgabe, private Dateien und natives Teilen zugreifen.

In der Praxis können Mini-Apps dadurch klein bleiben. Eine Funktion, für die normalerweise Backend, Authentifizierung, Mediendienst und Speicherschicht erforderlich wären, wird zu einem Methodenaufruf, weil der Host bereits alle vier bereitstellt.

## Ihre eigenen Charaktere werden zum Assistenten

CodeKitty ruft jedes Charakterporträt ab, zeigt die Charaktere in einer durchsuchbaren Galerie und lässt Sie einen davon als Programmierpartner auswählen. Die Daten der Character Card liefern Namen und Persönlichkeit, die CodeKitty in den System-Prompt schreibt. Der Assistent kann einen Fehler erklären oder eine Datei korrigieren und dabei in der Stimme des Charakters bleiben.

Ihre Charakterbibliothek ist eine Personalisierungsebene, auf die jede Mini-App zugreifen kann. Eine Fitness-App könnte Charaktere zu Trainern machen, ein Lerntool könnte sie als Tutoren für verschiedene Fächer einsetzen und ein Story-Spiel könnte sie als Besetzung verwenden. Die Liste ist bereits vorhanden und lässt sich mit einem einzigen SDK-Aufruf abrufen.

## Das Modell schlägt vor, die App wendet an

Wenn Sie eine Änderung anfordern, übergibt CodeKitty Ihren Satz nicht einfach an das Modell. Es stellt ein Kontextpaket zusammen, das die Persönlichkeit des Programmierpartners, den aktiven Dateinamen und dessen vollständigen Inhalt, das erwartete Ausgabeformat, Projektnotizen, den letzten Chatverlauf, in der Live-Vorschau erfasste Fehler und die SDK-Dokumentation enthält. Anschließend schränkt es das Antwortformat ein.

Für eine Quelldatei muss das Modell einen vollständigen Ersatz oder einen JSON-Patch zurückgeben:

![Code-Editor mit einem JSON-Patch aus Such- und Ersetzungseinträgen.](./json-patch.avif)

Für `app.json` gibt das Modell das vollständige Dokument zurück. Bei einem Bild-Asset schlägt es statt Code einen visuellen Prompt vor.

Diese Trennung ist entscheidend. Das Modell macht einen Vorschlag; CodeKitty entscheidet, ob und wie er angewendet wird. Das Modell erhält nie Schreibzugriff auf den Speicher oder den nativen Host, und jede angewendete Änderung erzeugt einen Snapshot zum Rückgängigmachen. Wenn Sie einem Sprachmodell Einfluss auf einen Zustand geben, sollte es einen Vorschlag erzeugen, den Ihr Code validieren kann, und keine Aktion, die Ihr Code unmittelbar ausführt.

Die Ausgabe wird gestreamt, weil lokale Inferenz auf einem Smartphone Zeit benötigt:

![Code-Editor mit JavaScript-Stream-Handlern für Layla-Chatinhalte, Reasoning-Ereignisse und finalContent().](./streaming-events.avif)

Reasoning wird über einen eigenen Kanal übertragen und in einem einklappbaren Bereich angezeigt. Das Stream-Handle bleibt erhalten, damit eine Stopp-Schaltfläche die Generierung abbrechen kann. Wenn Ihre Mini-App von der Generierung auf dem Gerät abhängt, sollten Sie den Fortschritt als Teil des Produkts behandeln: Streamen Sie Text, zeigen Sie die Schritte der Bilderzeugung und ermöglichen Sie immer einen Abbruch.

## Die Vorschau leiht sich die Bridge

Die Live-Vorschau ist die technisch interessanteste Funktion von CodeKitty.

Ihre `index.html` läuft in einem Sandbox-iframe. Vor dem Start injiziert CodeKitty zwei Dinge. Erstens fügt es umschlossene Konsolenmethoden und einen Error-Handler hinzu. Dadurch erscheinen nicht abgefangene Ausnahmen in einem Konsolenbereich und fließen bei Ihrer nächsten Frage in den Modellkontext ein. So entsteht eine enge Schleife: ausführen, Fehler sehen, den Programmierpartner fragen, Patch anwenden und erneut ausführen.

Zweitens fügt es einen Proxy für `window.ReactNativeWebView` hinzu. Wenn die App im iframe einen SDK-Aufruf tätigt, leitet der Proxy die Bridge-Nachricht an CodeKitty weiter. CodeKitty sendet sie an den echten Layla-Host und gibt die native Antwort anschließend an den iframe zurück.

Die Vorschau-App leiht sich CodeKittys Verbindung zu Layla. Dateioperationen erhalten einen projektspezifischen Präfix, sodass eine Test-App die eigene Bibliothek von CodeKitty nicht durch einen Aufruf von `saveFile` überschreiben kann. Eine Mini-App kann eine weitere Weberfahrung hosten und zugleich genau steuern, welche nativen Funktionen diese erhält.

## Symbole, Hintergründe und Export

Layla-Pakete benötigen ein Symbol und einen Hintergrund. Deshalb behandelt CodeKitty Bilddateien als vollwertige Projekt-Tabs. Schreiben Sie einen Prompt oder lassen Sie sich vom Programmierpartner einen erstellen und generieren Sie das Bild anschließend auf dem Gerät:

```js
const imageSrc = await layla.images.generateImage();
```

Die Ergebnisse werden über ein Canvas mittig zugeschnitten: 256 × 256 für Symbole und 854 × 480 für Hintergründe. Bis zum Export werden sie als Daten-URIs gespeichert.

Der Export erstellt eine ZIP-Datei mit `app.json`, `index.html` und den Assets im Stammverzeichnis. Es gibt zwei Builds:

- Der **Development-Build** lässt alles lesbar und bearbeitbar.
- Der **Smashed-Build** kompiliert das JSX, bindet React direkt ein, bettet Schriftarten als Daten-URIs ein, passt das SDK-Bundle für die Offline-Nutzung an und erzeugt eine einzige eigenständige `index.html`, die kein Netzwerk benötigt. Außerdem enthält er eine verborgene Kopie des Quellcodes, sodass das Paket später wieder in CodeKitty importiert werden kann.

Der Export ist ein Kontrollpunkt, nicht das Ende.

## Was Sie beim Erstellen einer eigenen Mini-App mitnehmen sollten

Sie müssen keine IDE entwickeln, um die guten Ideen aus CodeKitty zu nutzen.

Beginnen Sie mit einer Host-Funktion und lassen Sie sie einen echten Arbeitsschritt lösen, statt nur eine Funktion vorzuführen. CodeKitty generiert Bilder, weil Pakete Symbole benötigen. Planen Sie für lokale Generierung: Streamen Sie Ergebnisse, zeigen Sie den Fortschritt und erlauben Sie den Abbruch. Halten Sie das Modell hinter einem Vertrag, den Ihr Code validiert.

Übertragen Sie große Datenmengen nicht über die Bridge. CodeKitty teilt seine Bibliothek in einen kleinen Index und eine Nutzdatendatei pro Projekt auf, denn große Base64-Blöcke über eine WebView-Grenze lassen ein Smartphone langsam wirken. Bauen Sie außerdem Feedback-Schleifen ein: Die Vorschaukonsole wird zum Modellkontext, und genau deshalb funktioniert die Debugging-Schleife.

Testen Sie anschließend innerhalb von Layla. Das Verhalten im Browser ist ohne installiertes Mock des SDK nicht maßgeblich.

## Häufig gestellte Fragen

### Was ist eine Layla-Mini-App?

Eine eigenständige Web-App, die in Layla läuft und über die Layla-SDK-Bridge die KI auf Ihrem Gerät nutzen kann — lokales Modell, Bilderzeugung, Sprache, Charaktere und privaten Speicher. Sie wird als ZIP-Datei mit `app.json`, `index.html` und Assets ausgeliefert.

### Muss ich programmieren können, um eine zu erstellen?

Weniger, als Sie vielleicht denken. CodeKittys Assistent schreibt und korrigiert den Code, während Sie ihn in natürlicher Sprache anleiten. HTML- und JavaScript-Kenntnisse machen Sie schneller und helfen dabei, Fehler des Modells zu beheben. Die Schleife aus Beschreiben, Vorschau und Korrigieren funktioniert jedoch auch ohne diese Kenntnisse.

### Funktioniert CodeKitty offline?

Die KI schon. Der Programmierassistent ist Ihr lokales Modell, und nichts von dem, was Sie schreiben, verlässt das Smartphone. CodeKittys Oberflächenbibliotheken werden beim ersten Start derzeit von einem CDN geladen, daher benötigt die App zum Starten eine Verbindung. Mit dem Smashed-Build exportierte Apps sind vollständig eigenständig und funktionieren ohne Netzwerkverbindung.

### Wohin gelangt mein Code? Wird er hochgeladen?

Nirgendwohin. Projekte werden im privaten, app-spezifischen Dateispeicher von Layla auf Ihrem Gerät abgelegt. Die Modellinferenz erfolgt auf dem Gerät. Es gibt kein Konto, keine Synchronisierung und keinen Server, der Ihre Projekte speichert.

### Kann ich die von mir erstellten Mini-Apps teilen?

Ja. Der Export erzeugt eine ZIP-Datei, die alle Layla-Nutzer importieren können. Wenn Sie möchten, können Sie sie über den Mini-App Manager in Layla in die Layla Cloud hochladen.

### Worauf kann eine Mini-App zugreifen?

Auf Charaktere und deren Porträts, gestreamte Chat-Completions mit dem lokalen Modell, die Auswahl der Inferenz-Engine, Bilderzeugung, installierte TTS-Stimmen und ein privates Dateisystem, das auf diese App beschränkt ist. Auf Dateien anderer Apps kann sie nicht zugreifen.

### Gibt es eine SDK-Referenz?

Ja. Sie finden sie im [Repository von `@layla-network/sdk`](https://github.com/l3utterfly/layla-sdk).

## Die nächste Mini-App erstellen

CodeKitty ist eine IDE mit einem katzenartigen Programmierpartner. Diese Beschreibung unterschätzt jedoch die interessantere Tatsache: Eine Mini-App kann einen vollständigen lokalen Workflow abbilden. Sie kann Charaktere, Modelle, Bilder, Sprache, Dateien, Vorschauen und Freigaben koordinieren und bleibt dabei eine portable Webseite.

CodeKitty nutzt dieses System, um Software zu erstellen. Mit denselben Mechanismen ließe sich ein Sprachtrainer bauen, der Übungen mit einer installierten Stimme vorliest, ein Tagebuch, das auf dem Gerät bleibt und relevante alte Einträge wieder hervorholt, ein Geschichtenstudio mit Ihrer eigenen Charakterliste als Besetzung oder ein Kampagnenwerkzeug, das Ihnen zwischen Sitzungen Nachrichten sendet.

Der Einstieg besteht nicht darin, das gesamte SDK zu lernen. Finden Sie einen Moment, der besser wäre, wenn er innerhalb von Layla stattfände, und entwickeln Sie die kleinste Lösung, die diesen Moment Wirklichkeit werden lässt.
