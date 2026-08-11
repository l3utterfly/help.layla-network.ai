---
title: So erstellst du in Layla einen DuckDuckGo-News-Suchagenten mit Python
description: Erstelle einen Layla-Agenten, der mit Python DuckDuckGo News durchsucht und die Ergebnisse an das LLM zurückgibt.
category: Agents & tools
order: 60
keywords:
  - DuckDuckGo-News-Suche
  - Layla-Agenten
  - Python-Agent
  - Python ausführen
  - Tool-Aufrufe
lastUpdated: 2026-04-02
translationKey: how-to-create-a-duckduckgo-news-search-agent-with-python-in-layla
ai_translated: true
---

In diesem Artikel erstellen wir mit der Agenten-Mini-App von Layla einen in Python ausgeführten DuckDuckGo-News-Suchagenten. Stelle sicher, dass du [Python in Layla aktiviert hast](/how-to-enable-python-support-in-layla/).

**Schritt 1: Vorhandenen Agenten duplizieren**

Am einfachsten beginnst du, indem du einen vorhandenen Agenten duplizierst und die Kopie bearbeitest. Ändere den Namen und die Beschreibung.

![Laylas Bildschirm „Agent bearbeiten“, auf dem die Kopie DuckDuckGo News Search (Python) genannt wird.](./agent-name-description.jpg)

**Schritt 2: Auslöser hinzufügen**

Füge diesem Agenten einige Auslöser hinzu.

![Laylas Bildschirm „Agent bearbeiten“ mit den verfügbaren Auslösertypen.](./agent-trigger-options.jpg)

Wir fügen die Absicht **News Search** und den fest vorgegebenen Ausdruck **news** hinzu. Je nachdem, wie du den Agenten aufrufen möchtest, kannst du eigene Auslöser ergänzen.

![Agentenauslöser mit der Absicht News Query.](./news-query-intent.jpg)

![Ausdrucksauslöser des Agenten mit dem Wort News.](./news-phrase-trigger.jpg)

**Schritt 3: Python-Tool hinzufügen**

Füge als Nächstes das Tool „Python ausführen“ hinzu. Dieser Abschnitt enthält den Python-Code, der DuckDuckGo tatsächlich abfragt. Für diesen Teil sind Python-Grundkenntnisse hilfreich.

Sieh dir den [Python-Code in diesem GitHub Gist](https://gist.github.com/l3utterfly/bf9f703c09932fd87dbf68f2118e5ab4) an.

Oben in der Datei siehst du, dass die Bibliothek _requests_ benötigt wird (`re` und `html` gehören zu Python):

![Python-Imports für requests, re und html.](./python-imports.png)

Öffne die Python-Mini-App und füge das Paket `requests` hinzu. Die Installationsschritte findest du unter [So aktivierst du Python-Unterstützung in Layla](/how-to-enable-python-support-in-layla/).

Der nächste Abschnitt ist `QUERY`:

![Python-Code, der die Layla-Eingabevorlage QUERY zuweist und LIMIT auf 5 setzt.](./python-query-input.png)

Layla fügt die Eingabe – deine Nachricht oder die Ausgabe des vorherigen Tools – in die spezielle Vorlage `{{input}}` ein. Dies erfolgt durch einfachen Textersatz; die Eingabe wird nicht weiter verändert.

Mit diesem Muster kann dein Python-Skript verschiedene Eingabearten empfangen.

Für diesen Agenten übergeben wir einfach die gesamte Benutzeranfrage an das Python-Skript.

Das Skript führt anschließend eine normale HTTP-Anfrage aus und analysiert die Antwort mit dem integrierten HTML-Parser.

Informationen werden über einfache `print`-Anweisungen vom Python-Skript an das LLM zurückgegeben.

![Python-Schleife, die Titel, Quelle, Zusammenfassung und URL jedes Nachrichtenergebnisses ausgibt.](./python-print-results.png)

Das ist sehr flexibel. Du kannst alles ausgeben, was das LLM erhalten soll: Ergebnisse, Anweisungen oder eine Kombination daraus.

Kopiere das vollständige Python-Skript in das Eingabefeld des Python-Tools:

![Laylas Bildschirm „Agent bearbeiten“ mit dem DuckDuckGo-Python-Skript.](./agent-python-tool.jpg)

Der Agent ist fertig.

**Zum Schluss: Agenten testen**

Teste den Agenten. Aktiviere ihn für den Standardcharakter Layla oder verknüpfe ihn mit einem vorhandenen Charakter.

![Layla-Chat, in dem der Ausdruck news die Ausführung von Python-Code auslöst.](./news-agent-triggered.jpg)

Der Agent beginnt mit der Ausführung des Python-Codes, sobald das Schlüsselwort **news** ausgelöst wird. Diesen Auslöser hast du im ersten Schritt konfiguriert.

![Layla-Chat mit einer Antwort auf Grundlage von fünf DuckDuckGo-News-Ergebnissen.](./news-agent-response.jpg)

Layla liest die Ausgabe des Python-Codes und verwendet sie als Kontext für die Antwort auf deine Frage.

Damit ist ein einfacher DuckDuckGo-News-Suchagent fertig. Spätere Artikel behandeln komplexere Agenten.
