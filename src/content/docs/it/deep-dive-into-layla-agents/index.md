---
title: Analisi approfondita degli Agenti Layla
description: Un’analisi dettagliata del funzionamento degli Agenti in Layla.
category: Agents & tools
order: 30
keywords:
  - Agenti Layla
  - trigger degli Agenti
  - strumenti degli Agenti
  - chiamata di strumenti
  - parametri LLM
lastUpdated: 2025-10-01
translationKey: deep-dive-into-layla-agents
ai_translated: true
---

_Se non l’hai ancora fatto, leggi prima [una breve panoramica del funzionamento degli Agenti in Layla](/how-to-enable-agents-functions-and-tool-calling-in-layla/)._

Questo articolo approfondisce le funzioni agentiche di Layla.

**Funzionamento interno degli Agenti**

Gli Agenti sono flussi di lavoro autonomi eseguiti quando necessario durante le chat con l’LLM. Ogni Agente ha un _trigger_, che si attiva in condizioni configurabili specifiche, e un elenco di strumenti eseguiti consecutivamente.

![Diagramma che mostra l’input della chat che attiva gli strumenti di un Agente e produce il risultato dell’Agente.](./agent-workflow.jpg)

Il risultato dell’Agente viene inserito nella conversazione come contesto e l’LLM lo usa per fornire una risposta contestualizzata.

**Trigger**

Layla offre molti tipi di trigger. L’immagine seguente ne mostra alcuni:

![Interfaccia Layla con i trigger Intent, Regex, Phrase, Date or Time, MCP Tool, Layla Tool e Voice Mode.](./trigger-types.jpg)

- **Intent** — Layla classifica l’intento dell’input e attiva l’Agente in base a quello rilevato. Il classificatore include numerosi intenti, come “search news”, “query weather”, “set alarm” e “set calendar”. L’elenco completo appare nel menu dopo aver aggiunto un _Intent Trigger_.
- **Regex** — L’Agente si attiva quando l’espressione regolare trova una corrispondenza nel messaggio. La stringa corrispondente diventa l’input del primo strumento.
- **Phrase** — L’Agente si attiva quando rileva nel messaggio la frase inserita, senza distinzione tra maiuscole e minuscole. La frase diventa l’input del primo strumento.
- **Date/Time Detected** — L’Agente si attiva quando nel messaggio viene rilevata una data o un’ora. Il valore rilevato diventa l’input del primo strumento.
- **MCP/Layla Tool Trigger** — Questa funzione avanzata è trattata nell’articolo sul [supporto MCP completo in Layla](/full-mcp-support-in-layla/).
- **Is Voice Mode** — Un trigger semplice che si attiva quando Voice Mode è acceso.

I trigger vengono eseguiti su ogni messaggio in entrata e in uscita nelle chat. Quando uno si attiva, l’Agente parte e la condizione del trigger viene usata come input del primo strumento.

**Strumenti**

Gli _strumenti_ sono il cuore degli Agenti in Layla.

Eseguono funzioni: chiamare servizi esterni, controllare il telefono e molto altro. Layla include numerosi strumenti e ne vengono aggiunti regolarmente di nuovi.

Sono troppi per descriverli tutti qui, quindi evidenziamo alcuni dei più comuni.

Nella mini-app _Agenti_, scorri fino all’elenco degli strumenti disponibili. Toccandone uno si apre una finestra con maggiori dettagli. Usiamo _HTTP Request_ come esempio:

![Informazioni dello strumento HTTP Request con i parametri URL, method e headers.](./http-request-tool.jpg)

_HTTP Request_ ha diversi parametri configurabili. Possono essere fissi — ad esempio indicando un URL preciso — oppure generati dall’LLM, come spiegato più avanti.

Dopo aver aggiunto uno strumento, puoi configurarne i parametri nella finestra Edit Agent. Come mostrato nell’articolo precedente, puoi digitare direttamente l’URL.

![Schermata Edit Agent che configura una HTTP Request verso l’API Meow Facts.](./http-request-config.jpg)

L’output di ogni strumento diventa l’input del successivo. In questo modo puoi concatenare più strumenti in un Agente. Nell’esempio, l’output di _HTTP Request_ è la stringa grezza restituita dall’URL con i parametri configurati.

_Provide Context_ è uno strumento fondamentale che inserisce l’output finale dell’Agente nel contesto dell’LLM. Fornisce così al modello risultati fondati dopo l’esecuzione.

**Testare gli Agenti**

Dopo aver creato un Agente, puoi provarlo con il pulsante _Test Agent_ nell’elenco. Il test mostra anche input e output di ogni passaggio, aiutandoti a comprenderne il funzionamento.

Usiamo l’Agente “What's My IP?” come esempio:

![Finestra Test Agent con i passaggi e il risultato dell’Agente What's My IP.](./test-ip-agent.jpg)

Lo strumento invia prima una richiesta HTTP a [https://api.ipify.org](https://api.ipify.org).

Viene mostrato l’output della richiesta, cioè il tuo IP in testo semplice.

L’output passa quindi a _Provide Context_, che lo formatta come messaggio contestuale per l’LLM.

Il messaggio si configura nello strumento. In questo esempio:

![Configurazione di Provide Context che usa i modelli user e input per un indirizzo IP.](./provide-context-templates.jpg)

Nota i modelli tra doppie parentesi graffe, come `{{input}}`. `{{input}}` viene sostituito con l’input dello strumento.

Nell’esempio, l’output della richiesta HTTP è l’input di _Provide Context_. Dopo la sostituzione, l’output sarà: `{{user}}'s current IP address is xx.xx.xx.xx`.

Quando viene inserito nella conversazione, `{{user}}` viene ulteriormente sostituito dalla persona selezionata. Funziona come i prompt personalizzati.

**Parametri generati dall’LLM**

Finora abbiamo sempre impostato parametri fissi per ogni strumento, limitandoci al massimo a usare come parametri gli input corrispondenti.

Con gli Agenti integrati nell’LLM possiamo _**chiedere al modello di generare gli input degli strumenti**_. Otteniamo così flessibilità sfruttando le capacità di linguaggio naturale.

Un caso comune è chiedere all’LLM di cercare qualcosa sul Web. Non vogliamo usare l’intero messaggio come parole chiave: il modello può ricavare termini intelligenti dal messaggio e dagli indizi contestuali della conversazione.

Un altro caso è la stesura di un’e-mail. Potresti dire: “draft an email to my co-worker reminding him of our meeting”. Vorresti che l’LLM generasse il corpo e aprisse l’app di posta con il contenuto già inserito.

Layla può farlo:

![Schermata Edit Agent con lo strumento Send Email e i campi subject e message.](./send-email-llm-tool.jpg)

Prendiamo l’Agente “Send Email”. Lo strumento ha due parametri: “Subject” e “Message”. **LLM tool call** è impostato su **ON**.

Questo indica all’LLM di generare il contenuto dei parametri. Quando l’Agente si attiva, il modello genera oggetto e corpo, quindi esegue lo strumento, che apre il client di posta con le informazioni necessarie.

Con **LLM tool call** su **ON**, puoi inserire istruzioni in linguaggio naturale nei campi. L’LLM comprende la funzione di ciascun campo e genera gli input adatti in base al contesto della conversazione.

Un esempio più complesso è l’Agente _Schedule Event_: ha molti parametri, ciascuno spiegato dettagliatamente all’LLM.
