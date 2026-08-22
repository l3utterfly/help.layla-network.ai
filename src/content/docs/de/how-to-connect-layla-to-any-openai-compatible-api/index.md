---
title: So verbindest du Layla mit jeder OpenAI-kompatiblen API
description: Verbinde Layla mit einem OpenAI-kompatiblen Endpunkt wie LM Studio, Ollama oder llama.cpp und betreibe ein privates lokales LLM auf deinem PC.
category: Models & performance
order: 15
keywords:
  - OpenAI-kompatible API für Layla
  - OpenAI-kompatibler Endpunkt
  - lokales LLM Android
  - LM Studio API-Endpunkt
  - Ollama OpenAI API
  - llama.cpp Server
  - Android mit lokalem LLM verbinden
  - selbst gehosteter KI-Chatbot
  - privater KI-Assistent
  - lokaler KI-Server
lastUpdated: 2026-08-22
translationKey: how-to-connect-layla-to-any-openai-compatible-api
ai_translated: true
---

**Layla kann sich mit jedem Dienst verbinden, der einen OpenAI-kompatiblen Chat-Completions-Endpunkt bereitstellt.** Das Modell kann über einen lokalen LLM-Server wie LM Studio, Ollama oder llama.cpp auf deinem eigenen Computer laufen oder über einen entfernten Dienst, der dasselbe API-Format verwendet.

Dieser Leitfaden erklärt zuerst die Einstellungen, die jede OpenAI-kompatible API-Verbindung benötigt, und führt anschließend durch drei konkrete lokale KI-Konfigurationen. In den Beispielen befinden sich ein Smartphone und ein Windows-PC im selben privaten Netzwerk. Dieselben Layla-Einstellungen funktionieren aber auch mit kompatiblen Servern unter macOS oder Linux, einem Heimserver oder einem Dienst im Internet.

## Was ist ein OpenAI-kompatibler Endpunkt?

Ein OpenAI-kompatibler Endpunkt ist eine API-Adresse, die Anfragen im allgemeinen Format der Chat-Completions-API von OpenAI akzeptiert. Sie muss weder eine Verbindung zu OpenAI oder ChatGPT herstellen noch ein von OpenAI gehostetes Modell verwenden.

Viele lokale LLM-Inferenz-Engines bilden dieses API-Format nach, damit eine App mit verschiedenen Modellservern arbeiten kann. Layla sendet die Unterhaltung, den Namen des ausgewählten Modells und die Anforderung einer gestreamten Antwort an den Endpunkt. Der Server führt das Sprachmodell aus und sendet die Antwort an Layla zurück.

Damit ein Dienst mit Laylas Verbindung **OpenAI API** funktioniert, sollte er Folgendes unterstützen:

- Die OpenAI-kompatible Chat-Completions-Route, normalerweise `/v1/chat/completions`
- Chatnachrichten und eine Modellkennung
- Gestreamte Antworten
- Bearer-Token-Authentifizierung, wenn ein API-Schlüssel erforderlich ist

LM Studio, Ollama und `llama-server.exe` stellen alle die benötigte Chat-Completions-Route bereit.

## Was du vor dem Start benötigst

Für ein lokales LLM auf deinem PC brauchst du:

- Layla auf deinem Android- oder iOS-Gerät
- Einen Computer, der das ausgewählte Sprachmodell ausführen kann
- Ein über die ausgewählte Inferenz-Engine heruntergeladenes Modell oder ein kompatibles GGUF-Modell für llama.cpp
- Smartphone und Computer im selben vertrauenswürdigen WLAN oder lokalen Netzwerk
- Die Berechtigung, den Modellserver in der Firewall des Computers für private Netzwerke freizugeben

Die Modellgröße wirkt sich direkt auf Speicherbedarf und Antwortgeschwindigkeit aus. Wenn lokale KI für dich neu ist, beginne mit einem kleineren quantisierten Modell, das für deinen Computer empfohlen wird. Sobald die Verbindung funktioniert, kannst du ein größeres lokales Modell ausprobieren.

## Eine OpenAI-kompatible Verbindung in Layla hinzufügen

Öffne in Layla die **Einstellungen**, gehe zu **Inferenz-Einstellungen** und tippe unter **Meine Modelle** auf **Benutzerdefiniertes Modell hinzufügen**. Im nächsten Fenster werden Modelle auf dem Smartphone von verbundenen Diensten getrennt. Wähle unter **Verbundene Dienste** die Option **OpenAI API**.

Trotz ihres Namens ist diese Option nicht auf Modelle von OpenAI beschränkt. Sie ist für LM Studio, Ollama, llama.cpp, OpenRouter und jeden anderen Dienst vorgesehen, der das oben beschriebene kompatible Chat-Completions-Format akzeptiert.

![Laylas Fenster zur Auswahl einer Inferenz-Engine mit OpenAI API unter den verbundenen Diensten.](./choose.jpg)

Im Fenster **OpenAI API** werden anschließend die Verbindungsdaten und das Modell abgefragt. Für jedes Beispiel in diesem Leitfaden verwendest du dieselben vier Felder; nur die Werte ändern sich:

| Einstellung       | Einzutragender Wert                                                                                                                                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**          | Eine eindeutige Bezeichnung, etwa „LM Studio auf meinem PC“ oder „Ollama — Llama 3.2“.                                                                                                                            |
| **Endpunkt**      | Die vollständige Chat-Completions-URL. Bei den meisten kompatiblen Servern endet sie mit `/v1/chat/completions`.                                                                                                  |
| **API-Schlüssel** | Der von einem entfernten Anbieter bereitgestellte Schlüssel. Lasse das Feld bei einem ungesicherten lokalen Server leer oder gib das Token des lokalen Servers ein, wenn du die Authentifizierung aktiviert hast. |
| **Modell**        | Die genaue Modellkennung, die der Server erwartet. Tippe auf **Modelle suchen**, wenn der Server die Modellsuche unterstützt.                                                                                     |

![Laylas OpenAI-API-Konfiguration mit den Feldern Name, Endpunkt, API-Schlüssel und Modell sowie den Schaltflächen zum Suchen und Speichern.](./settings1.jpg)

Wähle einen Namen, an dem du die Verbindung später leicht erkennst. Der Endpunkt muss die vollständige Route enthalten: Eine Basisadresse, die nur mit einer Portnummer oder `/v1` endet, reicht nicht aus. Layla sendet jede Chatanfrage direkt an die Adresse in diesem Feld.

Nachdem du den Endpunkt und gegebenenfalls den API-Schlüssel eingetragen hast, tippe auf **Modelle suchen**, wenn du den genauen Modellnamen nicht kennst. Layla fragt beim selben Server die OpenAI-kompatible Modellliste ab und lässt dich eine zurückgegebene Kennung auswählen. Wenn die Modellsuche nicht verfügbar ist, kopiere den Modellnamen exakt vom Server oder Anbieter. Lasse das Feld nur leer, wenn der Endpunkt ausdrücklich ein Standardmodell unterstützt.

Unter dem Modellfeld befinden sich die **Erweiterten Anfrageeinstellungen**. Beim Aufklappen erscheint der Bereich **Zusätzliches JSON** für benutzerdefinierte Überschreibungen der Anfrage. Die meisten Nutzer sollten ihn leer lassen: Er ist für Anbieter gedacht, die ausdrücklich ein zusätzliches Anfragefeld verlangen. Das in der Oberfläche gezeigte Temperaturbeispiel ist für LM Studio, Ollama und llama.cpp nicht erforderlich.

![Laylas OpenAI-API-Fenster mit aufgeklappten erweiterten Anfrageeinstellungen und dem Feld für zusätzliche JSON-Werte.](./settings2.jpg)

Wenn Verbindungsdaten und Modell stimmen, tippe auf **Änderungen speichern**. Layla speichert die API-Verbindung unter **Meine Modelle** und wählt sie als aktuelle Modellquelle aus.

## Warum localhost auf deinem Smartphone nicht funktioniert

Wenn ein Server eine Adresse wie `http://localhost:1234` anzeigt, funktioniert diese nur auf dem Computer, auf dem der Server läuft. Auf deinem Smartphone bezeichnet `localhost` das Smartphone selbst.

Layla benötigt deshalb die private IPv4-Adresse deines Computers, die häufig mit `192.168.` oder `10.` beginnt. Öffne unter Windows die **Einstellungen**, wähle **Netzwerk und Internet**, öffne die Eigenschaften der aktiven WLAN- oder Ethernet-Verbindung und suche nach der **IPv4-Adresse**. Manche Serveranwendungen, darunter LM Studio, zeigen nach Aktivierung des Netzwerkzugriffs direkt die richtige lokale Netzwerkadresse an.

Wenn dein Computer beispielsweise die Adresse `192.168.1.50` hat, verwendest du diese Adresse zusammen mit dem Port und dem vollständigen API-Pfad des ausgewählten Servers. Kopiere nicht die Beispiel-IP-Adresse aus diesem Artikel, sondern verwende die Adresse deines eigenen Computers.

## Schnellübersicht: lokale OpenAI-kompatible Endpunkte für Layla

| Inferenz-Engine  | Standardendpunkt in Layla                     | Standard-API-Schlüssel                                                | Modellfeld                                                                       |
| ---------------- | --------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| LM Studio        | `http://YOUR-PC-IP:1234/v1/chat/completions`  | Leer, sofern keine Authentifizierung aktiviert ist                    | **Modelle suchen** verwenden oder die von LM Studio angezeigte Kennung eintragen |
| Ollama           | `http://YOUR-PC-IP:11434/v1/chat/completions` | Leer                                                                  | Name des installierten Ollama-Modells, zum Beispiel `llama3.2`                   |
| llama.cpp-Server | `http://YOUR-PC-IP:8080/v1/chat/completions`  | Leer, sofern der Server nicht mit einem API-Schlüssel gestartet wurde | Über **Modelle suchen** das geladene Modell auswählen                            |

Ersetze `YOUR-PC-IP` durch die private IPv4-Adresse deines Computers.

## Beispiel 1: Layla mit LM Studio verbinden

[LM Studio](https://lmstudio.ai/download) bietet eine Desktop-Oberfläche zum Suchen, Herunterladen und Ausführen lokaler Sprachmodelle. Über die Developer-Seite können diese Modelle an [OpenAI-kompatiblen Endpunkten](https://lmstudio.ai/docs/developer/openai-compat) bereitgestellt werden. Für eine lokale LLM-Konfiguration mit grafischer Oberfläche ist dies in der Regel der einfachste Einstieg.

### Ein Modell in LM Studio installieren

1. Lade das aktuelle Installationsprogramm von der offiziellen [Downloadseite von LM Studio](https://lmstudio.ai/download) herunter.
2. Installiere und öffne LM Studio.
3. Öffne die Seite **Discover** und suche nach einem Modell.
4. Wähle ein Modell und eine Quantisierung, die zu deinem Computer passen. Wenn du unsicher bist, sind die Empfehlungen von LM Studio ein sinnvoller Ausgangspunkt.
5. Warte, bis der Modelldownload abgeschlossen ist.

Kleinere Modelle und Quantisierungen mit weniger Bits benötigen weniger RAM oder VRAM. Wenn ein Modell nicht bequem in den verfügbaren Speicher passt, kann es langsam laden, langsam antworten oder gar nicht starten.

### Den lokalen API-Server von LM Studio starten

1. Öffne in LM Studio die Seite **Developer**.
2. Wähle oder lade das heruntergeladene Modell.
3. Öffne die Servereinstellungen.
4. Aktiviere **Serve on Local Network**, damit Layla den Server vom Smartphone aus erreichen kann.
5. Behalte den Standardport `1234` bei, sofern er nicht bereits von einem anderen Programm verwendet wird.
6. Starte den Server.
7. Wenn Windows nach einer Firewallfreigabe fragt, erlaube LM Studio nur in **Privaten Netzwerken**.

LM Studio verlangt standardmäßig keine Authentifizierung. Die Dokumentation empfiehlt sie, sobald der Server nicht nur auf `localhost` lauscht. Wenn du **Require Authentication** aktivierst, erstelle in LM Studio ein API-Token und trage es in Laylas Feld **API-Schlüssel** ein.

### LM Studio zu Layla hinzufügen

Trage im Layla-Fenster **OpenAI API** Folgendes ein:

- **Name:** LM Studio auf meinem PC
- **Endpunkt:** `http://YOUR-PC-IP:1234/v1/chat/completions`
- **API-Schlüssel:** Leer lassen, sofern du die Authentifizierung in LM Studio nicht aktiviert hast
- **Modell:** Auf **Modelle suchen** tippen und das heruntergeladene Modell auswählen

Tippe auf **Änderungen speichern**, lasse den LM-Studio-Server laufen und öffne einen Chat in Layla. Das Modell auf deinem Computer erzeugt die Antwort und sendet sie über dein lokales Netzwerk an Layla zurück.

Wenn du beide Apps direkt unter Windows verwenden möchtest, lies [So verwendest du Layla mit BlueStacks und LM Studio auf deinem PC](/de/how-to-run-layla-on-your-pc-with-bluestacks-and-lm-studio/).

## Beispiel 2: Layla mit Ollama verbinden

[Ollama](https://ollama.com/download) ist ein lokaler Modell-Runner für Windows, macOS und Linux. Er stellt eine [OpenAI-kompatible API](https://docs.ollama.com/api/openai-compatibility) bereit, die standardmäßig Port `11434` verwendet.

Die folgenden Schritte beziehen sich auf Ollama für Windows. In der offiziellen Ollama-Dokumentation findest du die entsprechenden Installationsanweisungen für andere Betriebssysteme.

### Ollama installieren und ein Modell herunterladen

1. Lade Ollama von der offiziellen [Ollama-Downloadseite](https://ollama.com/download) herunter.
2. Führe das Installationsprogramm aus und öffne Ollama.
3. Öffne Windows Terminal oder PowerShell.
4. Gib **ollama run llama3.2** ein, um das in diesem Beispiel verwendete Modell `llama3.2` herunterzuladen und zu starten.
5. Warte, bis der Download abgeschlossen ist, und sende eine kurze Testnachricht.
6. Gib **/bye** ein, wenn du den Terminalchat verlassen möchtest. Ollama läuft im Hintergrund weiter.

Du kannst ein anderes Modell aus der Ollama-Bibliothek verwenden. Ersetze in diesem Fall `llama3.2` überall in diesem Beispiel durch den genauen Ollama-Namen deines Modells.

### Ollama-Verbindungen aus dem lokalen Netzwerk zulassen

Ollama lauscht standardmäßig nur auf der PC-eigenen Adresse `127.0.0.1`. Ändere die Bind-Adresse, bevor du Layla verbindest:

1. Beende Ollama über den Infobereich der Windows-Taskleiste.
2. Öffne die Windows-**Einstellungen** und suche nach **Umgebungsvariablen**.
3. Wähle **Umgebungsvariablen für dieses Konto bearbeiten**.
4. Erstelle eine Benutzervariable namens **OLLAMA_HOST** mit dem Wert **0.0.0.0:11434**.
5. Übernimm die Änderung und starte Ollama erneut über das Windows-Startmenü.
6. Erlaube Ollama bei Bedarf in der Windows-Firewall den Zugriff auf private Netzwerke.

Durch die Bindung an `0.0.0.0` können Geräte im lokalen Netzwerk Ollama erreichen. Du solltest Port `11434` deshalb nicht im öffentlichen Internet freigeben. Lasse ihn hinter deinem Router und verwende ihn nur in einem vertrauenswürdigen Netzwerk.

### Ollama zu Layla hinzufügen

Trage im Layla-Fenster **OpenAI API** Folgendes ein:

- **Name:** Ollama auf meinem PC
- **Endpunkt:** `http://YOUR-PC-IP:11434/v1/chat/completions`
- **API-Schlüssel:** Leer lassen
- **Modell:** `llama3.2` oder über **Modelle suchen** ein installiertes Ollama-Modell auswählen

Tippe auf **Änderungen speichern** und beginne eine Unterhaltung. Ollama lädt das ausgewählte Modell beim Eingang der Anfrage. Die erste Antwort kann deshalb länger dauern als spätere Antworten.

Wenn **Modelle suchen** keine Auswahl liefert, prüfe, ob das Modell vollständig heruntergeladen wurde und ob Ollama nach der Änderung von `OLLAMA_HOST` neu gestartet wurde.

## Beispiel 3: Layla mit llama-server.exe verbinden

[`llama-server.exe`](https://github.com/ggml-org/llama.cpp/releases/latest) ist der in llama.cpp enthaltene Windows-Server. Er ist eine schlanke Möglichkeit, ein GGUF-Modell ohne separaten Desktop-Modellmanager auszuführen. Die offizielle [Dokumentation des llama.cpp-Servers](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md) beschreibt seine OpenAI-kompatible API, die standardmäßig Port `8080` verwendet.

Für diese Methode ist ein Terminalbefehl erforderlich. Wenn du die offiziellen vorkompilierten Windows-Dateien verwendest, musst du jedoch weder programmieren noch Quellcode kompilieren.

### llama.cpp und ein GGUF-Modell herunterladen

1. Öffne die offizielle [neueste llama.cpp-Version](https://github.com/ggml-org/llama.cpp/releases/latest) auf GitHub.
2. Lade unter **Assets** die aktuelle Windows-x64-CPU-ZIP-Datei herunter, wenn du mit der am breitesten kompatiblen Variante beginnen möchtest. CUDA-, Vulkan-, SYCL- und HIP-Builds können auf unterstützter Hardware eine bessere Beschleunigung bieten.
3. Entpacke die gesamte ZIP-Datei in einen neuen Ordner. Lasse alle enthaltenen DLL-Dateien neben `llama-server.exe` liegen.
4. Lade ein Chat- oder Instruct-Modell im GGUF-Format herunter. Hilfe bei der Auswahl von Datei und Quantisierung findest du unter [Was sind GGUF-Modelle und Modell-Quantisierungen?](/de/what-are-gguf-models-what-are-model-quants/).
5. Verschiebe die GGUF-Datei in den entpackten llama.cpp-Ordner und gib ihr bei Bedarf einen kurzen, leicht erkennbaren Dateinamen.

Lade kein Basismodell herunter, sofern du nicht genau weißt, wie es gepromptet werden muss. Für normale Layla-Unterhaltungen ist ein Chat- oder Instruct-Modell die passende Wahl.

### llama-server.exe für Layla starten

1. Öffne den entpackten llama.cpp-Ordner im Datei-Explorer.
2. Klicke in die Adressleiste des Datei-Explorers, gib **cmd** ein und drücke die Eingabetaste. Die Eingabeaufforderung wird in diesem Ordner geöffnet.
3. Gib **llama-server.exe -m "your-model.gguf" --host 0.0.0.0 --port 8080** ein und ersetze `your-model.gguf` durch den tatsächlichen Dateinamen.
4. Lasse das Fenster der Eingabeaufforderung geöffnet, während du Layla verwendest.
5. Warte, bis der Server meldet, dass das Modell geladen wurde und der HTTP-Server lauscht.
6. Erlaube den Server bei Bedarf in der Windows-Firewall für private Netzwerke.

Der Teil `--host 0.0.0.0` ist erforderlich, damit sich ein Smartphone im lokalen Netzwerk verbinden kann. Ohne diese Option lauscht llama.cpp nur auf dem PC selbst. Der Server enthält außerdem eine Weboberfläche unter der Adresse deines Computers auf Port `8080`, über die du den erfolgreichen Start prüfen kannst.

### Den llama.cpp-Server zu Layla hinzufügen

Trage im Layla-Fenster **OpenAI API** Folgendes ein:

- **Name:** llama.cpp auf meinem PC
- **Endpunkt:** `http://YOUR-PC-IP:8080/v1/chat/completions`
- **API-Schlüssel:** Leer lassen
- **Modell:** Auf **Modelle suchen** tippen und das geladene Modell auswählen

Tippe auf **Änderungen speichern** und starte einen Layla-Chat. Wenn du das Fenster der Eingabeaufforderung schließt, wird der Server beendet und Layla kann erst nach einem Neustart des Servers wieder Antworten erzeugen.

Für mehr Datenschutz in einem gemeinsam genutzten Netzwerk kann llama.cpp mit API-Schlüsselschutz gestartet werden. Verwende dann denselben Schlüssel in Layla.

## Layla mit einem anderen OpenAI-kompatiblen API-Anbieter verbinden

Dasselbe Verfahren funktioniert mit einer gehosteten KI-API, einem Heimserver, einem GPU-Rechner im Netzwerk oder einer anderen lokalen Inferenz-Engine:

1. Prüfe, ob der Dienst OpenAI-kompatible gestreamte Chat Completions unterstützt.
2. Besorge dir die vollständige Chat-Completions-URL des Anbieters.
3. Besorge dir einen API-Schlüssel, falls der Dienst einen verlangt.
4. Suche im Dashboard oder in der Dokumentation des Anbieters nach der genauen Modellkennung.
5. Öffne in Layla **Inferenz-Einstellungen** > **Benutzerdefiniertes Modell hinzufügen** > **OpenAI API**.
6. Trage Name, Endpunkt, Schlüssel und Modell ein.
7. Tippe auf **Modelle suchen**, wenn der Dienst eine OpenAI-kompatible Modellliste bereitstellt.
8. Speichere die Verbindung und teste sie in einem neuen Chat.

Verwende bei einem über das Internet erreichbaren Endpunkt exakt die vom Anbieter dokumentierte sichere `https://`-URL. Füge `/v1/chat/completions` nicht hinzu, wenn der Anbieter bereits eine vollständige Route angibt, und entferne keine anbieterspezifischen Pfadabschnitte.

Du kannst unter **Meine Modelle** mehrere API-Verbindungen speichern und später zwischen ihnen wechseln. Wenn Verbindung, Prompt, Persona und Sampler-Voreinstellung zusammenbleiben sollen, lies [So funktionieren gespeicherte Inferenz-Engines in Layla](/de/how-saved-inference-engines-work-in-layla/).

## Hinweise zu Datenschutz und Sicherheit

Eine lokale OpenAI-kompatible API kann die Sprachmodell-Inferenz auf deiner eigenen Hardware halten. Wenn Layla über dein Heimnetzwerk eine Verbindung zu LM Studio, Ollama oder llama.cpp herstellt, werden die Chatinhalte vom Smartphone an deinen PC und nicht an einen kommerziellen Modellanbieter gesendet.

Dabei handelt es sich um Inferenz im lokalen Netzwerk, nicht um Inferenz direkt auf dem Gerät. Das Modell läuft auf dem Computer, der für das Smartphone erreichbar sein muss. Nachdem die benötigten Apps und Modelle heruntergeladen wurden, benötigt dein Router keine Internetverbindung. Einzelne Layla-Funktionen oder Werkzeuge von Drittanbietern können jedoch eigene Online-Anforderungen haben.

Gib einen nicht authentifizierten lokalen LLM-Server niemals in einem öffentlichen WLAN frei und leite seinen Port nicht über deinen Internetrouter weiter. Jeder, der einen ungesicherten Server erreicht, könnte das Modell verwenden und Ressourcen deines Computers beanspruchen. Aktiviere die Authentifizierung, wenn sie verfügbar ist, erlaube den Firewallzugriff nur in vertrauenswürdigen privaten Netzwerken und stoppe den Server, wenn du ihn nicht mehr benötigst.

Bei einem OpenAI-kompatiblen Cloud-Endpunkt verlassen die Unterhaltungen dein Gerät und werden nach den Datenschutz- und Aufbewahrungsregeln des jeweiligen Anbieters verarbeitet. Prüfe diese Regeln, bevor du private Chats oder persönliche Daten sendest.

## Probleme mit einer OpenAI-kompatiblen Verbindung beheben

### Layla meldet, dass Endpunkt oder Modell nicht gefunden wurden

Ein `404`-Fehler bedeutet meistens, dass der Endpunkt unvollständig ist oder die Modellkennung nicht übereinstimmt. Prüfe, ob die URL mit dem vollständigen, vom Server verlangten Chat-Completions-Pfad endet, normalerweise `/v1/chat/completions`. Verwende anschließend **Modelle suchen** oder kopiere den genauen Modellnamen erneut.

### Layla kann keine Verbindung zum PC herstellen

Prüfe Folgendes:

- Der lokale LLM-Server läuft und das Modell ist vollständig geladen.
- Smartphone und PC befinden sich im selben WLAN oder lokalen Netzwerk.
- Der Endpunkt verwendet die private IPv4-Adresse des PCs statt `localhost` oder `127.0.0.1`.
- In LM Studio ist **Serve on Local Network** aktiviert, für Ollama ist `OLLAMA_HOST` konfiguriert oder llama.cpp wurde mit `--host 0.0.0.0` gestartet.
- Die Windows-Firewall erlaubt den Server in privaten Netzwerken.
- Kein VPN, Gast-WLAN oder Client-Isolation des Routers verhindert die Kommunikation zwischen den Geräten.

### Layla erhält einen Authentifizierungsfehler

Ein `401`- oder `403`-Fehler weist normalerweise auf einen fehlenden oder falschen API-Schlüssel hin. Kopiere das Token erneut, ohne das Wort „Bearer“ hinzuzufügen; Layla ergänzt das Bearer-Authentifizierungsformat selbst. Deaktiviere bei einem ungesicherten lokalen Server versehentlich eingeschaltete Authentifizierungsanforderungen oder lasse das Schlüsselfeld leer.

### Die Modellliste ist leer

Stelle sicher, dass mindestens ein Modell heruntergeladen wurde und für den Server verfügbar ist. LM Studio benötigt ein für seinen Server verfügbares Modell, Ollama muss das Modell heruntergeladen haben und ein llama.cpp-Server mit einem einzelnen Modell muss seine GGUF-Datei vollständig geladen haben. Du kannst die genaue Modellkennung auch manuell eintragen.

### Der Server funktioniert auf dem PC, aber nicht in Layla

Wenn du `localhost` auf dem PC öffnen kannst, beweist das nur, dass der Server lokal funktioniert. Prüfe erneut die Netzwerk-Bind-Adresse, die IP-Adresse des PCs und die Firewall. Manche Gast- oder öffentlichen WLANs blockieren absichtlich die Kommunikation zwischen verbundenen Geräten.

### Die Verbindung funktioniert nach einem Neustart nicht mehr

Die Server von LM Studio und llama.cpp müssen möglicherweise erneut gestartet werden. Ollama läuft normalerweise im Hintergrund, muss aber nach Änderungen an Umgebungsvariablen neu gestartet werden. Dein Router kann dem PC nach einem Neustart außerdem eine andere IP-Adresse zuweisen. Aktualisiere in diesem Fall den in Layla gespeicherten Endpunkt.

### Antworten sind langsam

Die Inferenzgeschwindigkeit hängt von Modellgröße, Quantisierung, verfügbarem RAM oder VRAM, CPU, GPU, Kontextlänge und Netzwerkqualität ab. Probiere ein kleineres Modell oder eine stärker komprimierte Quantisierung, schließe speicherintensive Anwendungen und halte das Smartphone in einem stabilen lokalen Netzwerk.

## Häufig gestellte Fragen

### Kann Layla ein lokales LLM auf meinem PC verwenden?

Ja. Führe das Modell über einen lokalen OpenAI-kompatiblen Server wie LM Studio, Ollama oder llama.cpp aus, aktiviere den Zugriff aus dem lokalen Netzwerk und trage den Chat-Completions-Endpunkt des PCs in Layla ein.

### Kann ich Layla unter Android mit Ollama verbinden?

Ja. Ollama läuft auf dem Computer, während Layla unter Android läuft. Konfiguriere Ollama für das lokale Netzwerk und verwende dann `http://YOUR-PC-IP:11434/v1/chat/completions` als Endpunkt in Layla.

### Benötigt ein lokaler LLM-Server einen API-Schlüssel?

Bei den drei Beispielen in diesem Artikel standardmäßig nicht. Wenn du in LM Studio oder llama.cpp die Authentifizierung aktivierst, trage das passende Token in Layla ein. Entfernte Anbieter verlangen normalerweise einen eigenen API-Schlüssel.

### Funktioniert diese Konfiguration ohne Internetzugang?

Ja, wenn sich Modell und Server auf deinem eigenen PC befinden und beide Geräte mit demselben lokalen Netzwerk verbunden bleiben. Für den ersten Download der Apps und Modelle ist eine Internetverbindung erforderlich. Cloud-APIs benötigen weiterhin Internetzugang.

### Läuft das Modell auf meinem Smartphone?

Bei diesen drei Konfigurationen nicht. Layla ist die Chatoberfläche und der API-Client; das Sprachmodell läuft auf dem PC. Wenn du ein Modell direkt auf dem Smartphone ausführen möchtest, importiere stattdessen ein kompatibles lokales Modell. Siehe [So fügst du Layla ein benutzerdefiniertes KI-Modell hinzu](/de/how-to-add-custom-models-to-layla/).

### Kann ich OpenRouter oder einen anderen Cloud-Anbieter verwenden?

Ja, sofern der Dienst eine kompatible API für gestreamte Chat Completions bereitstellt. Verwende den vollständigen Endpunkt, API-Schlüssel und die vom Anbieter dokumentierte Modellkennung.

Eine OpenAI-kompatible API ermöglicht Layla die Kommunikation mit vielen lokalen und gehosteten Sprachmodellen über ein gemeinsames Format. Mit LM Studio, Ollama oder llama.cpp in einem vertrauenswürdigen lokalen Netzwerk kannst du Layla als Oberfläche für einen privaten KI-Assistenten verwenden, während dein PC die lokale LLM-Inferenz übernimmt.
