---
title: So erzeugst du KI-Bilder in Layla mit dem Perchance-Agenten
description: Erzeuge kostenlose KI-Charakterbilder in Layla-Chats mit dem Perchance-Agenten. Er liest den Bildprompt aus der Antwort deines Charakters und automatisiert die Website.
category: Image generation
order: 40
keywords:
  - Perchance-Bilderzeugung
  - Perchance AI Girl Generator
  - kostenloser KI-Bildgenerator
  - KI-Bildgenerator für Android
  - KI-Charakterbilder erzeugen
  - Bilder für KI-Begleiter
  - Layla-Agent für Bilderzeugung
  - Layla-Agenten
  - Layla-Python-Agent
  - Stable-Diffusion-Prompt
  - Stable-Diffusion-Alternative
  - automatisches Web-Browsing
lastUpdated: 2026-10-16
translationKey: how-to-use-the-perchance-image-generation-agent
ai_translated: true
---

**Der Perchance-Agent für die Bilderzeugung lässt Layla KI-Bilder in deinen Chats erzeugen, indem er für dich die Website „AI girl generator“ von Perchance bedient.** Wenn dein KI-Charakter in seiner Antwort einen Bildprompt schreibt, öffnet der Agent den Generator in Laylas eingebettetem Browser, gibt den Prompt ein, startet die Erzeugung, wartet auf das Bild und zeigt es in deinem Chat an.

Das ist eine Alternative zu den in Layla für Android integrierten Stable-Diffusion-Bildmodellen. Das Bild wird nicht von deinem Smartphone berechnet. Damit ist es eine kostenlose Option, wenn dein Gerät für die lokale Bilderzeugung zu langsam ist und du kein Abonnement möchtest. Der Nachteil: Du brauchst eine Internetverbindung, und dein Prompt wird an Perchance gesendet. Laylas lokale Modelle funktionieren weiterhin offline; dieser Agent ist die Ausnahme. Diese Anleitung erklärt, wie du ihn einrichtest, wie er funktioniert und wie du ihn mit anderen Agenten kombinierst.

Hier ist eine Demo des Agenten in Aktion:

<video controls playsinline src="/assets/articles/how-to-use-the-perchance-image-generation-agent/perhance-auto.mp4"></video>

## Was du brauchst

- Die installierten Mini-Apps _Agenten_ und _Python-Interpreter_. Falls du sie noch nicht eingerichtet hast, folge der Anleitung [So aktivierst du Python-Unterstützung in Layla](/how-to-enable-python-support-in-layla/).
- Eine Internetverbindung. Anders als Laylas lokale Modelle nutzt dieser Agent einen Online-Dienst.
- Die Agent-Datei, die am Ende dieser Anleitung verlinkt ist.

## Schritt 1: Laylas Standard-Bilderzeugung ausschalten

Dieser Schritt ist erforderlich. Öffne deine _Inferenz-Einstellungen_, scrolle zum Abschnitt _Bilderzeugung_ und setze das Bilderzeugungsmodell auf **Keines** (_None_).

Der Grund: Laylas eigene Bilderzeugung liest ebenfalls das Tag `<stable_diffusion_prompt>` aus der Antwort eines Charakters. Ist noch ein Modell ausgewählt, erzeugt Layla aus demselben Tag ein eigenes Bild, und du erhältst neben dem Bild des Agenten ein zweites. Ist das Modell auf _None_ gesetzt, bleibt das Tag dem Agenten überlassen.

Wo sich diese Einstellung befindet, zeigt [So aktivierst du die Bilderzeugung in Layla](/how-to-enable-image-generation-in-layla/) im Abschnitt „Bilderzeugung“ der Inferenz-Einstellungen.

## Schritt 2: Den Agenten importieren

Lade die Agent-Datei am Ende dieser Anleitung herunter, öffne die Mini-App _Agenten_ und importiere sie mit der Schaltfläche _Add New Agent_. Der Agent heißt _Perchance AI Girl: generate image_.

Achte darauf, dass der Schalter unter dem Symbol des Agenten eingeschaltet ist. Standardmäßig steht jeder Agent, den du in der Mini-App Agenten aktivierst, deinen Charakteren zur Verfügung. Du kannst ihn außerdem im Tab _Erweitert_ des Charaktereditors an einen bestimmten eigenen Charakter anhängen, wie in [So aktivierst du Agenten, Funktionen und Tool-Aufrufe in Layla](/how-to-enable-agents-functions-and-tool-calling-in-layla/) beschrieben.

## Schritt 3: Ein Bild anfordern

Starte einen Chat und bitte um ein Bild, zum Beispiel „Zeig mir, wie du aussiehst“ oder „Schick mir ein Bild vom Strand bei Sonnenuntergang“.

Der Agent weist das Modell an, Bildanfragen ausschließlich mit einem Bildprompt zu beantworten und sonst nichts. Nach kurzer Zeit führt Layla die Automatisierung aus, und das Bild erscheint im Chat. Rechne mit einer gewissen Wartezeit: Der Agent wartet bis zu 30 Sekunden auf das Laden der Seite und bis zu drei Minuten auf das Bild, da die Geschwindigkeit des kostenlosen Generators schwankt.

## So funktioniert der Agent

Der Agent besteht aus drei Teilen: einem System-Prompt, einem Auslöser und zwei Tools. Wenn du sie verstehst, kannst du den Agenten leichter anpassen.

Kurz gesagt, läuft es so ab:

```text
Model reply with tag -> Regex trigger -> Execute Python Code -> Display Image
```

### 1. Der System-Prompt fordert vom Modell einen Prompt in einem Tag an

Der Agent gibt dem Modell diese Anweisung:

```text
If the user asks you to generate an image, output the image prompt inside this tag:

<stable_diffusion_prompt>your image prompt here</stable_diffusion_prompt>

Do not include any other text when generating an image. For other requests, respond normally.
```

Wenn du also um ein Bild bittest, antwortet das Modell mit etwas wie:

```text
<stable_diffusion_prompt>a lighthouse on a cliff at sunset, dramatic clouds, oil painting</stable_diffusion_prompt>
```

Bei allen anderen Nachrichten antwortet das Modell ganz normal.

### 2. Ein Regex-Auslöser erkennt das Tag

Der Agent verwendet einen _Regex-Auslöser_, der nicht auf deine Eingabe, sondern auf die **Ausgabe** des Modells reagiert. Das Muster lautet:

```text
/<stable_diffusion_prompt>(.*?)<\/stable_diffusion_prompt>/s
```

Das Muster erkennt das Tag und erfasst alles zwischen dem öffnenden und dem schließenden Tag. Das Flag `s` erlaubt, dass sich der Prompt über mehrere Zeilen erstreckt. Wie in [Ein genauerer Blick auf Layla-Agenten](/deep-dive-into-layla-agents/) erklärt, wird der erkannte Text zur Eingabe des ersten Tools des Agenten. In diesem Agenten steht der erfasste Prompt im Skript als `{{match$1}}`.

### 3. Ein Python-Tool bedient die Website

Das erste Tool ist _Python-Code ausführen_. Das Skript erhält den Prompt, öffnet Perchance, erzeugt das Bild und speichert es in einer Datei. Der nächste Abschnitt behandelt das im Detail.

### 4. Display Image zeigt das Ergebnis

Wenn das Skript fertig ist, gibt es eine einzelne Zeile aus: den Speicherort des Bildes als `file://`-Adresse. Diese Ausgabe ist die Eingabe des zweiten Tools, _Display Image_, das die Datei im Chat anzeigt. Schlägt das Skript fehl, gibt es statt einer Adresse eine Fehlermeldung aus, und es erscheint kein Bild.

## So funktioniert Laylas automatisches Web-Browsing

Layla enthält einen eingebetteten Browser (eine WebView), den Python-Skripte bedienen können. Ein Skript kann eine Seite laden, ihren Inhalt lesen, Felder ausfüllen, Schaltflächen anklicken und darauf warten, dass etwas erscheint – ähnlich wie ein Mensch, der einen Browser benutzt. Dieser Agent nutzt diese Fähigkeit, um das zu tun, was du sonst von Hand auf der Perchance-Website erledigen würdest.

Das Skript geht so vor:

1. **Den Generator öffnen.** Es lädt `perchance.org/improved-ai-girl-generator` und gibt der Seite einige Sekunden, um vollständig zu laden.
2. **Den Prompt eingeben.** Es sucht das Beschreibungsfeld auf der Seite und trägt den Prompt aus der Antwort des Modells ein.
3. **Auf „generate“ klicken.** Es sucht die Schaltfläche zum Erzeugen und klickt darauf. Falls sich deren Kennung jemals ändert, sucht das Skript ersatzweise nach einer beliebigen Schaltfläche mit der Beschriftung „generate“.
4. **Auf das Bild warten.** Die Erzeugungszeit schwankt, daher prüft das Skript jede Sekunde, bis zu drei Minuten lang, ob das Ergebnisbild erschienen ist.
5. **Das Bild speichern.** Das fertige Bild ist bereits in die Seite eingebettet. Das Skript liest es direkt aus, speichert es als Datei im temporären Ordner und gibt den Speicherort zurück.

Ein Detail ist wissenswert: Der Perchance-Generator besteht aus verschachtelten Frames unterschiedlicher Herkunft, in die ein Skript normalerweise nicht hineinschauen kann. Das Skript löst das, indem es alle Frames der Seite nach dem Beschreibungsfeld, der Schaltfläche und dem Ergebnis durchsucht. Deshalb besteht jeder Schritt aus Suchen und anschließendem Ausführen und nicht aus einem festen Klick an einer bekannten Position.

Das Bild wird jedes Mal unter demselben Dateinamen gespeichert, sodass eine neue Erzeugung die vorherige temporäre Datei ersetzt. Behandle die Datei als temporär.

### Datenschutz und Zuverlässigkeit

- Dein Bildprompt wird in die Website von Perchance eingegeben und verlässt dadurch dein Gerät. Der Rest deiner Unterhaltung nicht.
- Layla ist darauf ausgelegt, offline zu funktionieren, aber dieser Agent ist die Ausnahme. Ohne Internetverbindung kann er die Seite nicht laden.
- Der Agent hängt vom Aufbau einer Website eines Drittanbieters ab. Gestaltet Perchance den Generator um, findet das Skript die richtigen Elemente möglicherweise nicht mehr, und der Agent muss aktualisiert werden.
- Schlägt die Erzeugung fehl oder läuft in eine Zeitüberschreitung, gibt der Agent statt eines Bildes eine Fehlermeldung zurück. Versuche es erneut oder prüfe, ob Perchance mit deiner Verbindung lädt.
- Der Agent nutzt den Automatisierungsbrowser des Chats. Er funktioniert daher in Chats, aber nicht in geplanten Ausführungen.

## Mit anderen Agenten für die Bilderzeugung kombinieren

Dem Agenten ist nur eines wichtig: dass in der Ausgabe des Modells ein Tag `<stable_diffusion_prompt>` auftaucht. Wie das Tag dorthin gelangt, spielt keine Rolle. Alles, was beeinflusst, was das Modell in dieses Tag schreibt, verbessert daher das Ergebnis, ohne den Agenten selbst zu ändern.

Einige Ideen:

- **Einen Charakter einheitlich aussehen lassen.** Nutze einen weiteren Agenten mit dem Tool _Provide Context_, um dem Modell eine Beschreibung des Aussehens deines Charakters mitzugeben, und weise es an, diese Beschreibung in jeden Bildprompt aufzunehmen.
- **Einen Stil hinzufügen.** Verlange einen festen Stil, etwa „watercolor, soft lighting“, in den _Szenario_-Anweisungen des Charakters oder im Kontext eines Agenten, damit das Modell ihn in jeden Prompt aufnimmt.
- **Nach jeder Nachricht ein Bild erzeugen.** Füge dem _Szenario_ deines Charakters die Anweisung hinzu, jede Antwort mit einem Tag `<stable_diffusion_prompt>` zu beenden, wie in [Einen Agenten für die Bilderzeugung erstellen](/creating-an-image-generation-agent/) beschrieben. Der Perchance-Agent läuft dann nach jeder Nachricht, nicht nur, wenn du darum bittest.
- **Einen anderen Generator verwenden.** Die Tools des Agenten sind ein gewöhnliches Python-Skript, gefolgt von _Display Image_. Du kannst den Agenten duplizieren und das Skript so ändern, dass es eine andere Website automatisiert, während System-Prompt und Auslöser gleich bleiben.

Pro Antwort läuft nur ein Agent, der auf die Ausgabe des Modells reagiert (der am besten passende), und keiner läuft, wenn die Antwort zusätzlich einen Tool-Aufruf enthält. Aktiviere daher nicht zwei Agenten, die auf dasselbe Tag reagieren, gleichzeitig. Wenn du diesen Agenten duplizierst, um den Generator zu ändern, deaktiviere das Original.

## Häufig gestellte Fragen

### Wie erzeuge ich in Layla kostenlose KI-Bilder von meinem Charakter?

Der Perchance-Agent ist eine Möglichkeit: Er nutzt einen kostenlosen Online-Generator, sodass du weder ein Abonnement noch einen Modell-Download brauchst. Die andere Möglichkeit ist, ein lokales Stable-Diffusion-Modell auf deinem Gerät auszuführen, was offline funktioniert. Siehe [So aktivierst du die Bilderzeugung in Layla](/how-to-enable-image-generation-in-layla/).

### Muss ich ein Stable-Diffusion-Modell herunterladen?

Nein. Das Bild wird auf den Servern von Perchance erzeugt, ein Modell-Download ist daher nicht nötig. Du musst aber das Bilderzeugungsmodell von Layla selbst auf _None_ setzen.

### Warum habe ich zwei Bilder erhalten?

Wahrscheinlich ist Laylas integrierte Bilderzeugung noch aktiv. Setze das Bilderzeugungsmodell in den Inferenz-Einstellungen auf _None_.

### Kann ich ihn ohne Internetverbindung nutzen?

Nein. Der Agent lädt eine Website. Für die Bilderzeugung offline nutze eines der lokalen Modelle, die in [So aktivierst du die Bilderzeugung in Layla](/how-to-enable-image-generation-in-layla/) beschrieben sind.

### Kann ich den Generator ändern oder eigene Schritte hinzufügen?

Ja. Öffne den Agenten in der Mini-App Agenten und bearbeite das Tool _Python-Code ausführen_. Das Skript ist gewöhnliches Python, das Laylas Bibliothek `lython` zur Steuerung des Browsers verwendet.

## Den Agenten herunterladen

[perchance-ai-girl-generator-auto.json herunterladen](/assets/articles/how-to-use-the-perchance-image-generation-agent/perchance-ai-girl-generator-auto.json)

Importiere die Datei mit der Schaltfläche _Add New Agent_ in der Mini-App Agenten.
