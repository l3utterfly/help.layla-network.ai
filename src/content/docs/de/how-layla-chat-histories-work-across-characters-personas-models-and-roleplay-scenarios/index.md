---
title: So funktionieren Layla-Chatverläufe mit Charakteren, Personas, Modellen und Rollenspielszenarien
description: Erfahre, was zu einer Layla-Unterhaltung gehört, was beim erneuten Öffnen wiederhergestellt wird und wie Konfigurationsänderungen spätere Antworten beeinflussen.
category: Chat & memory
order: 20
keywords:
  - Chatverlauf
  - Charaktere
  - Personas
  - lokale KI-Modelle
  - Rollenspielszenarien
lastUpdated: 2026-07-31
translationKey: how-layla-chat-histories-work-across-characters-personas-models-and-roleplay-scenarios
ai_translated: true
---

**In Layla gehört der Chatverlauf zur Unterhaltung und ist nicht dauerhaft an einen Charakter, eine Persona, ein KI-Modell oder ein Rollenspielszenario gebunden.** Beim erneuten Öffnen stellt Layla standardmäßig die gespeicherte Konfiguration wieder her. Du kannst sie für zukünftige Nachrichten ändern, ohne den vorhandenen Verlauf umzuschreiben.

Dieser Artikel beschreibt das erwartete Verhalten als Benutzerleitfaden und technische Spezifikation. Er erklärt, welche Einstellungen mit einem Chat gespeichert werden, was bei Änderungen geschieht und wann sich eine Verzweigung besser eignet als die Fortsetzung des Originals.

## Kurzfassung

Eine Layla-Unterhaltung enthält zwei miteinander verbundene, aber getrennte Arten von Daten:

1. **Unterhaltungsverlauf:** die bereits ausgetauschten Nachrichten mit Reihenfolge, Rollen und gespeichertem Inhalt.
2. **Aktive Konfiguration:** Charakter, Benutzer-Persona, Modell, Rollenspielszenario, Prompt-Einstellungen und zugehörige Ressourcen für die nächste Antwort.

Vorhandene Nachrichten bleiben Teil desselben Verlaufs, wenn sich die aktive Konfiguration ändert. Die neu gewählte Konfiguration gilt ab der nächsten generierten Nachricht.

Du kannst etwa einen Charakter-Chat, der ursprünglich ein GGUF-Modell nutzte, erneut öffnen, zu einem anderen kompatiblen lokalen KI-Modell wechseln und weiterchatten. Layla generiert frühere Nachrichten nicht neu und ändert sie nicht unbemerkt. Das neue Modell kann denselben Verlauf jedoch anders interpretieren, da Modelle Prompts, Kontextlängen, Schreibstile und Anweisungen unterschiedlich handhaben.

## Verhaltensmatrix für Chatverläufe

| Konfigurationselement                     | Mit der Unterhaltung gespeichert | Nach erneutem Öffnen änderbar | Ändert vorhandene Nachrichten | Gilt für zukünftige Antworten |
| ----------------------------------------- | -------------------------------- | ----------------------------- | ----------------------------- | ----------------------------- |
| Charakter                                 | Nein                             | Ja                            | Nein                          | Ja                            |
| Benutzer-Persona                          | Nein                             | Ja                            | Nein                          | Ja                            |
| KI-Modell                                 | Nein                             | Ja                            | Nein                          | Ja                            |
| Inferenz-Engine                           | Nein                             | Ja                            | Nein                          | Ja                            |
| Rollenspielszenario                       | Nein                             | Ja                            | Nein                          | Ja                            |
| System-Prompt oder erweiterte Anweisungen | Nein                             | Ja                            | Nein                          | Ja                            |
| LoreBooks oder Kontextressourcen          | Nein                             | Ja                            | Nein                          | Ja                            |
| Generierungseinstellungen                 | Nein                             | Ja                            | Nein                          | Ja                            |
| Chattitel und Organisationsmetadaten      | Ja                               | Ja                            | Nein                          | Nein                          |

Wichtig ist, dass Konfigurationsänderungen **vorausschauend** wirken. Sie beeinflussen den Aufbau des nächsten Prompts und die nächste Antwort, schreiben aber das gespeicherte Protokoll nicht um.

## Einen Chat erneut öffnen

Beim Öffnen einer gespeicherten Unterhaltung stellt Layla den Charakter, die Persona, das KI-Modell, die Inferenz-Engine, das Szenario, die Kontextressourcen und die Generierungseinstellungen der letzten Verwendung wieder her. So können KI-Begleiter und längere Rollenspiele ohne wiederholte Einrichtung fortgesetzt werden.

Diese Werte sind nur die Ausgangskonfiguration. Vor der nächsten Nachricht kannst du sie ändern.

![Dunkle Messages-Ansicht mit Avatarzeile, Search-Messages-Leiste und zwei Layla-Chats mit gekürzten Vorschauen und Löschsymbolen.](./chat-history-messages.gif)

## Die aktive Konfiguration ändern

Du kannst ein oder mehrere Elemente ändern und denselben KI-Chatverlauf behalten. Layla verwendet die aktualisierte Konfiguration beim Aufbau der nächsten Anfrage.

### Den Charakter ändern

Ein Charakterwechsel erhält das Protokoll, ändert aber die Anweisungen für zukünftige Antworten. Der neue Charakter erhält den Teil des Gesprächskontexts, der in das aktive Kontextfenster passt. Bei einer nicht verwandten Identität oder Vorgeschichte solltest du den Chat verzweigen oder neu beginnen, um Kontinuitätskonflikte zu vermeiden.

### Die Benutzer-Persona ändern

Ein Personawechsel behält die Nachrichten bei und wendet die neue Benutzerbeschreibung auf spätere Runden an. Verwende bei grundlegend anderen Identitäten eine separate Verzweigung.

### Das KI-Modell ändern

Ein gespeicherter Chat kann ein anderes unterstütztes Modell verwenden. Layla erhält den Verlauf und bereitet ihn im Prompt-Format des neuen Modells auf. Charakterinterpretation, Ton, Fähigkeiten und Kontextgröße können sich unterscheiden. Ein kleineres Kontextfenster kann ältere Nachrichten aus einer Generierung ausschließen; gespeichert bleiben sie dennoch.

### Das Rollenspielszenario ändern

Ein neues Szenario steuert zukünftige Nachrichten, während der vorhandene Verlauf verfügbar bleibt. Verzweige den Chat zuerst, wenn du eine widersprüchliche Zeitlinie, einen anderen Ort oder Ausgang testen möchtest.

## Technische Verhaltensspezifikation

Die folgenden Regeln definieren das erwartete Verhalten konfigurierbarer Layla-Chatverläufe:

1. **Eine Unterhaltung ist der primäre Verlaufscontainer.** Ihre Identität ist unabhängig von Charakter-, Persona-, Modell- und Szenario-IDs.
2. **Nachrichten bleiben als Datensätze erhalten.** Konfigurationsänderungen dürfen gespeicherte Inhalte nicht unbemerkt umschreiben.
3. **Die letzte aktive Konfiguration wird mit dem Chat gespeichert** und wiederhergestellt, sofern ihre Ressourcen verfügbar sind.
4. **Änderungen gelten für die nächste Generierung.** Der Prompt-Aufbau verwendet die aktuelle Konfiguration und den geeigneten Verlauf.
5. **Die Kontextauswahl hängt vom Modell ab.** Kontextgrenzen bestimmen, welche Nachrichten in einen Prompt gelangen, nicht welche gespeichert bleiben.
6. **Duplikate haben unabhängige Identitäten.** Der zukünftige Zustand wird nicht mit dem Quellchat geteilt.
7. **Konfiguration und Verlauf werden in getrennten Vorgängen gelöscht.**

Für Diagnose und Export kann jede generierte Nachricht Herkunftsmetadaten zu Charakter, Persona, Modell, Engine und Szenario behalten. Damit lassen sich Verhaltensänderungen in Unterhaltungen mit mehreren Konfigurationen erklären.

## Datenschutz und lokale Speicherung

Layla ist ein privater Offline-KI-Assistent für Android und iOS. Bei ausgewählter lokaler Inferenz-Engine und lokalem GGUF-Modell bleiben Verlauf, Konfiguration, Prompt-Verarbeitung und Generierung auf dem Gerät. Wenn du bewusst eine entfernte oder OpenAI-kompatible API verwendest, gelten zusätzlich deren Regeln zur Datenverarbeitung.

## Häufig gestellte Fragen

### Sind Layla-Chatverläufe nach Charakter getrennt?

Nein. Eine Unterhaltung merkt sich den ausgewählten Charakter, doch der Verlauf gehört zum Chat. Du kannst den Charakter für zukünftige Nachrichten wechseln, ohne das vorhandene Protokoll zu löschen oder umzuschreiben.

### Kann ich dieselbe Unterhaltung mit einer anderen Persona öffnen?

Ja. Die neue Persona gilt für zukünftige Generierungen. Wenn sie dem Verlauf widerspricht, verzweige die Unterhaltung oder beginne einen neuen Chat.

### Kann ich das KI-Modell wechseln, ohne den Verlauf zu verlieren?

Ja. Gespeicherte Nachrichten bleiben verfügbar. Ein kleineres Kontextfenster kann weniger ältere Nachrichten in eine Generierung aufnehmen, entfernt sie aber nicht aus dem Speicher.

### Setzt ein neues Rollenspielszenario die Unterhaltung zurück?

Nein. Das Szenario aktualisiert die Anweisungen für zukünftige Antworten. Der bisherige Rollenspielverlauf bleibt Teil der Unterhaltung.

### Wie vergleiche ich zwei Modelle oder Szenarien am sichersten?

Verzweige die Unterhaltung, weise jeder Kopie ein anderes Modell oder Szenario zu und führe beide unabhängig fort.

Laylas unterhaltungszentrierter Aufbau unterstützt lange Begleiter-Chats, Charakter-Rollenspiele und Modellvergleiche, ohne jede Konfigurationsänderung in einen separaten Verlauf zu zwingen. Das Protokoll bleibt stabil, während die aktive Einrichtung flexibel genug ist, lokal mit dem für die nächste Antwort passenden Charakter, der Persona, dem Modell und dem Szenario fortzufahren.
