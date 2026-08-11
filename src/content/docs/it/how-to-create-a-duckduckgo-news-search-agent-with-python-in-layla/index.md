---
title: Come creare un Agente di ricerca notizie DuckDuckGo con Python in Layla
description: Crea un Agente Layla che usa Python per cercare su DuckDuckGo News e restituire i risultati all'LLM.
category: Agents & tools
order: 60
keywords:
  - ricerca notizie DuckDuckGo
  - Agenti Layla
  - Agente Python
  - Esegui Python
  - chiamate agli strumenti
lastUpdated: 2026-04-02
translationKey: how-to-create-a-duckduckgo-news-search-agent-with-python-in-layla
ai_translated: true
---

In questo articolo creeremo con la mini-app Agenti di Layla un Agente di ricerca notizie DuckDuckGo eseguito in Python. Assicurati di avere [Python attivo in Layla](/how-to-enable-python-support-in-layla/).

**Passaggio 1: duplica un Agente esistente**

Il modo più semplice per iniziare consiste nel duplicare un Agente esistente e modificare la copia. Cambia il nome e la descrizione.

![Schermata Modifica Agente di Layla che assegna alla copia il nome DuckDuckGo News Search (Python).](./agent-name-description.jpg)

**Passaggio 2: aggiungi gli attivatori**

Aggiungi alcuni attivatori all'Agente.

![Schermata Modifica Agente di Layla con i tipi di attivatore disponibili.](./agent-trigger-options.jpg)

Aggiungeremo l'intento **News Search** e la frase fissa **news**. Puoi aggiungere altri attivatori in base al modo in cui vuoi richiamare l'Agente.

![Attivatore dell'Agente configurato con l'intento News Query.](./news-query-intent.jpg)

![Attivatore per frase dell'Agente configurato con la parola News.](./news-phrase-trigger.jpg)

**Passaggio 3: aggiungi lo strumento Python**

Aggiungi lo strumento Esegui Python. Questa sezione contiene il codice Python che esegue la logica per interrogare DuckDuckGo. Per comprenderla è utile conoscere Python.

Esamina il [codice Python in questo Gist di GitHub](https://gist.github.com/l3utterfly/bf9f703c09932fd87dbf68f2118e5ab4).

All'inizio del file, nota che è necessaria la libreria _requests_ (`re` e `html` fanno parte di Python):

![Import Python per requests, re e html.](./python-imports.png)

Apri la mini-app Python e aggiungi il pacchetto `requests`. Consulta [Come attivare il supporto Python in Layla](/how-to-enable-python-support-in-layla/) per la procedura di installazione.

La parte successiva riguarda `QUERY`:

![Codice Python che assegna il modello di input Layla a QUERY e imposta LIMIT su 5.](./python-query-input.png)

Layla inserisce l'input, proveniente dal tuo messaggio o dall'output dello strumento precedente, nel modello speciale `{{input}}`. Si tratta di una semplice sostituzione di testo; l'input non viene modificato ulteriormente.

Puoi usare questo schema per ricevere diversi tipi di input nello script Python.

Per questo Agente, passeremo l'intera richiesta dell'utente allo script Python.

Lo script esegue quindi una normale richiesta HTTP e analizza la risposta con il parser HTML integrato.

Lo script Python restituisce le informazioni all'LLM tramite semplici istruzioni `print`.

![Ciclo Python che stampa titolo, fonte, riepilogo e URL di ogni notizia.](./python-print-results.png)

Questo metodo è molto flessibile. Puoi stampare tutto ciò che l'LLM deve ricevere: risultati, istruzioni o entrambi.

Copia e incolla l'intero script Python nell'input dello strumento Python:

![Schermata Modifica Agente di Layla contenente lo script Python DuckDuckGo.](./agent-python-tool.jpg)

L'Agente è pronto.

**Infine: prova l'Agente**

Prova l'Agente. Ricorda di attivarlo per il personaggio predefinito Layla o di collegarlo a un personaggio esistente.

![Chat di Layla in cui la frase news attiva l'esecuzione del codice Python.](./news-agent-triggered.jpg)

L'Agente inizia a eseguire il codice Python quando viene rilevata la parola chiave **news**, configurata come attivatore nel primo passaggio.

![Chat di Layla con una risposta basata su cinque risultati di DuckDuckGo News.](./news-agent-response.jpg)

Layla legge l'output del codice Python e lo usa come contesto per rispondere alla domanda.

Ora disponi di un semplice Agente di ricerca notizie DuckDuckGo. Gli articoli futuri presenteranno Agenti più complessi.
