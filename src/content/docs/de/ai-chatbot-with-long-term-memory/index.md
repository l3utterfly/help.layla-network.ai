---
title: "KI-Chatbot mit Langzeitgedächtnis: So erinnert sich Layla an dich"
description: Gib deinem KI-Begleiter oder Rollenspiel-Charakter ein Langzeitgedächtnis. Vergleiche Laylas integrierte automatische Erfassung, den Memory-Agent und die LLM-Aufnahme, alles offline.
category: Chat & memory
order: 45
keywords:
  - KI-Chatbot mit Langzeitgedächtnis
  - KI mit Langzeitgedächtnis
  - KI, die sich an dich erinnert
  - KI, die sich an Unterhaltungen erinnert
  - KI-Chatbot mit Gedächtnis
  - KI-Begleiter mit Gedächtnis
  - KI-Begleiter-App mit Langzeitgedächtnis
  - KI-Rollenspiel-Gedächtnis
  - warum vergisst mein KI-Chatbot
  - KI-Gedächtnis-App für Android
  - Offline-KI-Chatbot mit Gedächtnis
  - privater KI-Chatbot
  - lokales LLM Langzeitgedächtnis
  - LLM-Gedächtnis
  - Wissensgraph-Gedächtnis
  - Layla Long-Term Memory
  - automatische Erfassung von Erinnerungen
  - Agent Auto-collect Memories
  - LLM-basiertes Langzeitgedächtnis
  - Aufnahme von Erinnerungen
  - Layla Agents
lastUpdated: 2026-11-28
translationKey: ai-chatbot-with-long-term-memory
ai_translated: true
---

**Layla ist ein KI-Chatbot mit Langzeitgedächtnis, der auf deinem Smartphone läuft, und er kann deine Unterhaltungen auf drei Wegen in Erinnerungen verwandeln: mit einer integrierten Zusammenfassung, die nach jeder Antwort läuft, mit einem Agent, der dein Chat-Modell alle paar Antworten Erinnerungen schreiben lässt, und mit einer Mini-App, die deinen Chatverlauf mit einem LLM verarbeitet, wenn du es startest.** Alle drei speichern im selben Long-Term-Memory-Speicher, sodass sich dein KI-Begleiter oder Rollenspiel-Charakter unabhängig von der Methode auf dieselbe Weise an die Erinnerungen erinnert.

Die Methoden tauschen Geschwindigkeit gegen Qualität. Dieser Artikel erklärt, warum KI-Chatbots überhaupt vergessen, wie jede Methode funktioniert, was sie kostet und wie du sie einrichtest, damit du für jeden Charakter eine auswählen kannst.

## Warum KI-Chatbots vergessen und was Langzeitgedächtnis ändert

Ein Sprachmodell behält zwischen Nachrichten nichts. Bei jeder Antwort liest es die Unterhaltung erneut aus seinem Kontextfenster, das nur eine begrenzte Textmenge fasst. Wächst ein Chat über diese Grenze hinaus, passen die ältesten Nachrichten nicht mehr hinein, und die KI vergisst deinen Namen, eure Pläne oder was früher in einer Geschichte passiert ist.

Langzeitgedächtnis umgeht diese Grenze. Layla speichert kurze Erinnerungen an deine Unterhaltungen, durchsucht sie, während du chattest, und fügt die passenden dem Kontext des Modells hinzu, bevor es antwortet. Der Charakter kann sich so an etwas von vor Wochen erinnern, ohne dass der gesamte Chatverlauf in das Kontextfenster passen muss. Jeder Charakter hat seine eigenen Erinnerungen, sodass sich ein KI-Begleiter, ein Rollenspiel-Charakter und ein Assistent jeweils an ihre eigenen Unterhaltungen mit dir erinnern.

Layla speichert und durchsucht diese Erinnerungen auf deinem Gerät. Mit einem lokalen LLM bleiben deine Chats und Erinnerungen auf deinen eigenen Geräten. So erhältst du einen privaten KI-Chatbot, der sich an dich erinnert, ohne dass ein Unternehmen deine Unterhaltungen auf seinen Servern speichert.

## Drei Wege, deiner KI ein Langzeitgedächtnis zu geben

|                                 | Integrierte automatische Erfassung              | Agent Auto-collect Memories                    | Mini-App LLM-based Long-term Memory                |
| ------------------------------- | ----------------------------------------------- | ---------------------------------------------- | -------------------------------------------------- |
| **Wer die Erinnerung schreibt** | Ein kleines integriertes Zusammenfassungsmodell | Dein Chat-Modell                               | Eine Inferenz-Engine deiner Wahl                   |
| **Wann sie läuft**              | Nach jeder Antwort, automatisch                 | Alle 3 Antworten, automatisch                  | Nur, wenn du **Start ingesting memories** antippst |
| **Sprachen**                    | Nur Englisch                                    | Jede Sprache, die dein Chat-Modell beherrscht  | Jede Sprache, die das gewählte Modell beherrscht   |
| **Qualität**                    | Einfache Zusammenfassungen                      | Gut: Der Charakter schreibt eigene Notizen     | Am höchsten: Du steuerst die Prompts               |
| **Geschwindigkeit**             | Schnell, ohne Auswirkung auf den Chat           | Fügt alle 3 Antworten einen Modellaufruf hinzu | Langsam, läuft aber außerhalb deiner Chats         |
| **Anpassung**                   | Keine                                           | Prompt im Code des Agents bearbeiten           | System-Prompt und Anweisung pro Charakter          |

Alle drei benötigen die Mini-App **Long Term Memory**, die die Erinnerungen speichert und die Modelle herunterlädt, die sie durchsuchen. In der Mini-App schaltest du das Gedächtnis für jeden Charakter ein oder aus. [So fügst du Funktionen (Mini-Apps) in Layla hinzu](/de/how-to-add-features-mini-apps-in-layla/) zeigt, wo du sie findest.

## Methode 1: Integrierte automatische Erfassung, schnell und automatisch

Das macht Layla standardmäßig, sobald die Mini-App Long Term Memory installiert ist, und es ist der einfachste Weg zu einer KI, die sich an Unterhaltungen erinnert.

Nach jeder Antwort des Charakters nimmt Layla die letzten drei Nachrichten des Chats und gibt sie an ein kleines Zusammenfassungsmodell, das in der Mini-App integriert ist. Die Zusammenfassung, die ursprünglichen Nachrichten und ein einfacher Graph der erwähnten Personen und Dinge werden als eine Erinnerung gespeichert. Das passiert im Hintergrund auf deinem Gerät. Dein Chat-Modell wird dafür nicht benutzt, sodass es die Unterhaltung nicht verlangsamt und nicht um Speicher mit ihr konkurriert.

Die Grenzen ergeben sich aus diesem kleinen Modell:

- **Es versteht nur Englisch.** Chats in anderen Sprachen ergeben schlechte oder bedeutungslose Zusammenfassungen. Wenn du in einer anderen Sprache chattest, nutze eine der beiden anderen Methoden.
- **Die Zusammenfassungen sind kurz und wörtlich.** Das Modell verdichtet, was gesagt wurde; es entscheidet nicht, was wichtig ist. Smalltalk wird genauso gespeichert wie ein wichtiges Ereignis.
- **Es gibt nichts zu konfigurieren**, außer es für jeden Charakter ein- oder auszuschalten.

### So schaltest du sie ein oder aus

1. Öffne die Mini-App **Long Term Memory**.
2. Wähle den Charakter unter **Characters** aus.
3. Verwende unter **Per character settings** die Option **Auto-collect memories for this character**.

**Enable LTM for this character** ist ein separater Schalter. Er steuert, ob der Charakter Long-Term Memory überhaupt nutzt, einschließlich des Abrufs von Erinnerungen im Chat. Du kannst die automatische Erfassung ausschalten und LTM eingeschaltet lassen, was die anderen beiden Methoden benötigen.

## Methode 2: Der Agent Auto-collect Memories, Erinnerungen in den eigenen Worten des Charakters

Der Agent **Auto-collect Memories** lässt deinen Charakter eigene Notizen führen, so wie es ein KI-Begleiter mit Gedächtnis tun sollte: Er entscheidet selbst, was an dir erinnernswert ist. Nach jeweils 3 Antworten des Charakters pausiert er das Rollenspiel und fragt das Chat-Modell, was der Charakter aus diesen Runden behalten möchte: Fakten über dich, wichtige Ereignisse, Versprechen oder Pläne und wie sich der Charakter fühlt. Das Modell sieht die gesamte Unterhaltung und die letzten Erinnerungen des Charakters und kann so Details auslassen, die bereits gespeichert sind.

Der Agent dann:

- behält pro Durchlauf höchstens 3 Erinnerungen,
- verwirft alles, was das Modell auf einer Wichtigkeitsskala von 1 bis 5 unter 3 bewertet hat,
- speichert den Rest in Long-Term Memory, in der ersten Person und in der Stimme des Charakters geschrieben, und
- zeigt unter der Antwort des Charakters eine Karte **Saved to memory** an, damit du siehst, was behalten wurde.

Weil das Modell die Erinnerungen schreibt, sind sie besser als die integrierten Zusammenfassungen. Sie folgen dem Sinn der Unterhaltung statt ihrem Wortlaut, sie behalten die Stimme des Charakters, was im KI-Rollenspiel wichtig ist, und sie funktionieren in jeder Sprache, die dein Modell beherrscht. Der Preis ist die Geschwindigkeit: Auf jede dritte Antwort folgt eine zusätzliche Anfrage an das Modell, und die Erinnerungskarte erscheint erst, wenn diese Anfrage abgeschlossen ist. Wenn du eine kostenpflichtige API über eine [OpenAI-kompatible Verbindung](/de/how-to-connect-layla-to-any-openai-compatible-api/) nutzt, verbraucht diese Anfrage außerdem Tokens.

### So richtest du sie ein

1. Installiere die Mini-App **Agents**, falls noch nicht geschehen. [So aktivierst du Agenten, Funktionen und Tool-Aufrufe in Layla](/de/how-to-enable-agents-functions-and-tool-calling-in-layla/) erklärt, wie.
2. Öffne die Einstellungen deines Charakters und hänge den Agent **Auto-collect Memories** in der Agent-Auswahl auf dem Tab **Advanced** an. [So erstellst du einen eigenen KI-Charakter in Layla](/de/how-do-i-create-custom-characters/) zeigt, wo die Auswahl ist. Ein an einen Charakter angehängter Agent läuft für diesen Charakter, auch wenn er in der Mini-App Agents ausgeschaltet ist.
3. Schalte in der Mini-App **Long Term Memory** für denselben Charakter **Auto-collect memories for this character** aus. Laufen beide, wird jede Unterhaltung doppelt erfasst.
4. Chatte wie gewohnt. Nach 3 Antworten erscheint die erste Karte **Saved to memory**.

Die Standard-Charaktere von Layla verwenden keine Liste angehängter Agents; sie nutzen jeden Agent, der in der Mini-App Agents eingeschaltet ist. Um diese Methode mit ihnen zu verwenden, schalte stattdessen den Agent Auto-collect Memories in der Mini-App Agents ein. Wenn du dort nach „memor“ suchst, findest du ihn schnell.

![Die Mini-App Agents, gefiltert nach dem Suchbegriff Memor, mit dem Agent Auto-collect Memories, dessen Schalter aus ist, und den Schaltflächen Edit, Test und More.](./agents.jpg)

### Ändern, woran sich der Agent erinnert

Tippe auf **Edit** auf der Karte des Agents, um ihn zu öffnen. Der Dialog beginnt mit der ID, dem Namen und der Beschreibung, die den obigen Einrichtungshinweis wiederholt.

![Der Dialog Edit Agent für den Agent Auto-collect Memories mit der Agent-ID auto-collect-memories, seinem Namen und seiner Beschreibung.](./auto-memory-agent.jpg)

Der Prompt steht ganz am Anfang des Codes des Eval-Tools des Agents, weiter unten im Dialog. Du kannst ihn umschreiben, zum Beispiel um dich auf Fakten zu konzentrieren und Gefühle zu ignorieren, solange du am Ende das JSON-Format beibehältst, das er verlangt. Unter dem Prompt stehen Einstellungen dazu, wie oft er läuft (`COLLECT_EVERY_N_REPLIES`), wie viele Erinnerungen er pro Durchlauf behält (`MAX_MEMORIES`) und welche geringste Wichtigkeit er behält (`MIN_IMPORTANCE`).

Wenn das Speichern einer Erinnerung fehlschlägt, zum Beispiel weil die Mini-App Long Term Memory nicht installiert ist, versucht der Agent es 24 Stunden lang nicht mehr. Jeder Durchlauf schreibt ein Protokoll nach `auto-collect-memories/last-run.log` im Arbeitsbereich des Charakters. Das ist die erste Anlaufstelle, wenn keine Karten erscheinen.

## Methode 3: Die Mini-App LLM-based Long-term Memory, das Gedächtnis mit der höchsten Qualität

Die Mini-App **LLM-based Long-term Memory** verarbeitet deinen Chatverlauf in einem separaten Schritt, wenn du sie startest. Sie nutzt ein LLM deiner Wahl, lokal oder online, um jede Erinnerung zu schreiben und einen Wissensgraphen der Personen, Orte und Ereignisse in deinen Chats aufzubauen. Sie bietet die höchste Qualität und die meiste Kontrolle, ist dafür aber langsam und manuell.

Sie ist auf Layla Cloud Apps veröffentlicht, der Galerie für Mini-Apps, die mit dem Layla SDK gebaut wurden. Zum Installieren öffnest du die [Seite LLM-based Long-term Memory auf Layla Cloud Apps](https://apps.layla-cloud.com/app/llm-based-long-term-memory) auf deinem Smartphone und tippst auf **Open in Layla**. Außerdem brauchst du die Mini-App Long Term Memory, denn diese hier speichert ihre Ergebnisse dort.

![Die Seite der Mini-App LLM-based Long-term Memory im Bildschirm Browse Apps von Layla mit Symbol, Slogan, Version, Screenshots, Beschreibung und der Schaltfläche Go to App.](./llm-ltm.jpg)

Wenn du eine Aufnahme startest, geht die Mini-App so vor:

1. **Lesen:** Sie liest die Chats des Charakters, beginnend nach der neuesten Erinnerung, die der Charakter bereits hat, und verarbeitet so nur neue Nachrichten.
2. **Zusammenfassen:** Sie fasst die Nachrichten in überlappenden Fenstern von drei zusammen und schickt jedes Fenster mit deinem Zusammenfassungs-Prompt an das Modell.
3. **Graph erstellen:** Für jede Zusammenfassung bittet sie das Modell, die darin enthaltenen Personen, Orte, Ereignisse, Eigenschaften und Gegenstände sowie ihre Beziehungen zueinander zu extrahieren.
4. **Speichern:** Sie speichert jedes Ergebnis als Erinnerung mit den ursprünglichen Nachrichten, der Zusammenfassung und dem Graphen.

![Der Bildschirm Configure ingest der Mini-App LLM-based Long-term Memory für einen Charakter namens Annie mit dem System-Prompt für die Zusammenfassung, der benutzerdefinierten Anweisung und der Schaltfläche Start ingesting memories.](./llm-ltm-configure-ingest.jpg)

### Eigene Prompts schreiben

Jeder Charakter hat eigene Einstellungen, die zwischen den Durchläufen gespeichert bleiben:

- **Inference engine.** Wähle eine deiner [gespeicherten Inferenz-Engines](/de/how-saved-inference-engines-work-in-layla/) oder die Standard-Engine. Da die Aufnahme außerhalb deiner Chats läuft, kannst du ein größeres oder langsameres lokales LLM wählen als das, mit dem du chattest, oder ein Online-Modell, wenn du das bevorzugst.
- **Summarising conversations.** Ein **System prompt** und eine **Custom instruction**, die festlegen, was eine Erinnerung enthalten soll. Die Vorgabe bittet das Modell, dauerhafte Fakten, Gefühle, Beziehungen und Wendepunkte zu behalten und Smalltalk zu ignorieren. Du kannst sie auf alles Mögliche ausrichten: Handlung und Figuren einer Geschichte für ein Rollenspiel oder deine Projekte und Fristen für einen Assistenten.
- **Constructing the knowledge graph.** Ein zweiter System-Prompt samt Anweisung zum Extrahieren des Graphen. Behalte das JSON-Format bei, das die Standardanweisung verlangt.

Beide System-Prompts akzeptieren die Vorlagen `{{char}}`, `{{user}}`, `{{persona}}`, `{{description}}`, `{{personality}}` und `{{character_card}}`, die vor jeder Anfrage aus dem Charakter und seiner Persona ausgefüllt werden.

### Eine Aufnahme starten

Tippe auf **Start ingesting memories**. Der Bildschirm zeigt jede Phase während des Ablaufs, und du kannst mit der Schaltfläche **X** abbrechen.

![Die Mini-App beim Zusammenfassen von Annies Chats: Die Phase Reading ist abgeschlossen, die Phase Summarising läuft bei 12 Prozent, und ein Protokoll zeigt, dass 8 neue Nachrichten geladen wurden.](./llm-ltm-summarising.jpg)

![Die Phase Graphing der Aufnahme mit dem Wissensgraphen der aus Annies Erinnerungen extrahierten Entitäten, etwa der Hund Jasper, eine Eiche und ein Spaziergang am Bach.](./llm-ltm-graphing.jpg)

Jedes Nachrichtenfenster braucht zwei Anfragen an das Modell, ein langer Chatverlauf kann auf einem Smartphone daher lange dauern. Lass Layla währenddessen im Vordergrund. Starte die Aufnahme erneut, wann immer du neue Unterhaltungen verarbeiten möchtest; es gibt keinen Zeitplan.

### Die automatischen Methoden für den Charakter ausschalten

Die Mini-App beginnt nach der neuesten Erinnerung des Charakters zu lesen. Läuft für diesen Charakter auch die integrierte automatische Erfassung oder der Agent, ist die neueste Erinnerung immer aktuell, und die Mini-App findet wenig oder nichts Neues zu verarbeiten. Schalte beide für jeden Charakter aus, den du auf diese Weise aufnimmst.

## Welche Methode solltest du verwenden?

- **Integrierte automatische Erfassung**, wenn du auf Englisch chattest und das Gedächtnis ohne Einrichtung und ohne Einfluss auf die Geschwindigkeit funktionieren soll. Sie passt zu einem Alltagsassistenten, der sich nur an das Wesentliche vergangener Chats erinnern muss.
- **Der Agent Auto-collect Memories**, wenn du in einer anderen Sprache chattest oder Erinnerungen willst, die festhalten, was wichtig war, statt was gesagt wurde, und eine etwas langsamere Antwort jede dritte Runde in Kauf nehmen kannst. Er passt zu einem KI-Begleiter oder Freund, der sich an dich, deine Pläne und seine Gefühle dir gegenüber erinnern soll.
- **Die Mini-App LLM-based Long-term Memory**, wenn du die besten Erinnerungen und volle Kontrolle darüber willst, worauf sie sich konzentrieren, und es dir nichts ausmacht, sie selbst zu starten, zum Beispiel einmal am Tag. Sie passt zu langen KI-Rollenspiel-Kampagnen, bei denen ein eigener Prompt Handlung, Figuren und Welt verfolgen kann.

Du kannst für jeden Charakter eine andere Methode wählen. Verwende pro Charakter jeweils nur eine Methode.

## Häufig gestellte Fragen

### Warum vergisst mein KI-Chatbot Dinge?

Jedes Modell hat ein begrenztes Kontextfenster. Ist eine Unterhaltung länger als dieses Fenster, werden die ältesten Nachrichten weggelassen, und das Modell kann sie nicht mehr sehen. Langzeitgedächtnis speichert die wichtigen Teile dieser Nachrichten und holt sie zurück, wenn sie relevant sind.

### Gibt es einen KI-Chatbot, der sich an frühere Unterhaltungen erinnert?

Ja. Layla erinnert sich über die Mini-App Long-Term Memory an frühere Unterhaltungen mit jedem Charakter, und zwar auf deinem Smartphone statt auf einem Server. Die Methoden in diesem Artikel steuern, wie diese Erinnerungen geschrieben werden.

### Erinnert sich Layla an alles, was ich sage?

Nein. Sie speichert Erinnerungen an deine Unterhaltungen und ruft dann nur die ab, die zu dem passen, worüber du gerade sprichst. Die Einstellungen **Max Number of Memory Injections** und **Minimum Memory Score** in der Mini-App Long Term Memory steuern, wie viele Erinnerungen abgerufen werden und wie genau sie passen müssen.

### Funktionieren Erinnerungen aus verschiedenen Methoden zusammen?

Ja. Alle drei speichern im selben Long-Term-Memory-Speicher, und der Abruf im Chat funktioniert für alle gleich. Du kannst einen Charakter von einer Methode auf eine andere umstellen, ohne zu verlieren, woran er sich bereits erinnert.

### Warum sind die Erinnerungen meines Charakters auf Englisch, obwohl ich in einer anderen Sprache chatte?

Die integrierte Zusammenfassung versteht nur Englisch. Nutze den Agent Auto-collect Memories oder die Mini-App LLM-based Long-term Memory, die ein Sprachmodell verwenden, das Erinnerungen in der Sprache deines Chats schreiben kann.

### Funktioniert Langzeitgedächtnis offline?

Ja, mit einem lokalen Modell. Alle drei Methoden laufen auf deinem Gerät, sodass du einen Offline-KI-Chatbot mit Gedächtnis ohne Internetverbindung haben kannst.

### Wird dadurch etwas von meinen Chats ins Internet gesendet?

Nicht, solange du kein Online-Modell wählst. Ist dein Chat-Modell oder deine Aufnahme-Engine eine Online-API, senden der Agent und die Mini-App deine Nachrichten an diesen Dienst, so wie es deine Chats ohnehin tun.

### Kann ich eine Erinnerung bearbeiten oder löschen?

Ja. Öffne die Mini-App **Long Term Memory**, wähle den Charakter aus und öffne eine Erinnerung, um ihre Zusammenfassung und Beziehungen zu bearbeiten oder sie zu löschen.

Welche Methode du auch wählst: Die Erinnerungen bleiben auf deinem Smartphone, und deine Charaktere können sich in späteren Chats daran erinnern, ohne Cloud-Dienst und ohne Abonnement. Das bedeutet Langzeitgedächtnis in Layla: eine Offline-KI, die sich an dich erinnert, auf Hardware, die dir gehört.
