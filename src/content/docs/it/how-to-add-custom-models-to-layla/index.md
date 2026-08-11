---
title: Come aggiungere un modello IA personalizzato a Layla
description: Aggiungi a Layla un modello GGUF o LiteRT locale, collega Layla Server o Layla Cloud oppure configura un’API compatibile con OpenAI o l’API Claude.
category: Models & performance
order: 10
keywords:
  - modello IA personalizzato
  - LLM locale
  - modello GGUF
  - IA offline
  - API compatibile con OpenAI
  - API Claude
  - Layla Server
lastUpdated: 2026-08-09
translationKey: how-to-add-custom-models-to-layla
ai_translated: true
---

Layla può eseguire un modello IA personalizzato in locale sul tuo dispositivo Android o collegarsi a un modello ospitato sul PC o nel cloud. Questa guida illustra tutte le opzioni, inclusi i modelli GGUF e LiteRT locali, Layla Server, Layla Cloud, le API compatibili con OpenAI e l’API Claude.

Se desideri una configurazione IA privata e offline, importa un modello locale compatibile ed eseguilo direttamente sul dispositivo. Le altre opzioni richiedono una connessione a un PC o a un servizio online.

## 1. Apri le impostazioni di inferenza

Apri **Impostazioni di inferenza** dalla pagina **Impostazioni** di Layla. Puoi anche aprire direttamente la mini-app **Impostazioni di inferenza**.

Nella sezione **I miei modelli**, tocca **Aggiungi modello personalizzato**.

![La sezione I miei modelli nelle impostazioni di inferenza di Layla, con il pulsante Aggiungi modello personalizzato vicino alla parte superiore.](./Screenshot_20260809_203116_Layla.jpg)

## 2. Scegli dove verrà eseguito il modello

Layla apre una finestra con diverse opzioni per il motore di inferenza. Puoi importare un modello locale, collegarti a Layla Server sul PC, usare Layla Cloud o configurare un fornitore API.

![La finestra del motore di inferenza di Layla con le opzioni Modello locale, Il tuo PC, Layla Cloud, API OpenAI e API Claude.](./Screenshot_20260809_203121_Layla.jpg)

### Modello locale: memoria interna o scheda SD

Scegli **Memoria interna** o **Scheda SD** per importare un modello GGUF o LiteRT compatibile ed eseguirlo localmente sul dispositivo Android.

**Memoria interna** copia il modello nella memoria privata di Layla. Il file originale resta al suo posto, quindi il modello occupa il doppio dello spazio su disco, a meno che tu non rimuova successivamente la copia originale. Copiare il modello assicura a Layla l’accesso più affidabile e normalmente offre le migliori prestazioni e stabilità. È l’opzione consigliata.

**Scheda SD** fa riferimento al modello nella cartella esistente anziché copiarlo in Layla. In questo modo risparmi spazio, ma l’accesso potrebbe essere meno stabile. Dopo aver aggiunto il modello, non spostare, rinominare o eliminare il file originale: Layla deve continuare ad accedere esattamente a quella posizione.

### Il tuo PC con Layla Server

Scegli **Il tuo PC** per collegare Layla a un modello in esecuzione sul computer tramite Layla Server. La finestra di configurazione include un breve tutorial che spiega come effettuare il collegamento. Un articolo dedicato a Layla Server illustrerà la procedura completa.

### Layla Cloud

Scegli **Layla Cloud** per usare i modelli disponibili tramite Layla Cloud. Questi modelli vengono eseguiti online anziché localmente sul telefono.

### API compatibile con OpenAI

Scegli **API OpenAI** per collegare qualsiasi servizio che fornisca un’API di completamento chat compatibile con OpenAI. Sono inclusi OpenAI, il fornitore dell’API alla base di ChatGPT, e servizi come OpenRouter, Google AI Studio, Azure e altri fornitori compatibili.

Inserisci un nome per la connessione, l’endpoint fornito dal provider e la chiave API, se richiesta. Puoi anche inserire il nome di un modello oppure usare **Trova modelli** se il provider supporta il rilevamento dei modelli.

![Il modulo di configurazione dell’API OpenAI in Layla, con i campi nome, endpoint, chiave API e modello.](./Screenshot_20260809_203153_Layla.jpg)

L’endpoint deve essere l’URL completo per i completamenti chat, non soltanto il dominio o l’URL API di base del provider. In genere termina con `/v1/chat/completions`, ma devi usare il percorso esatto indicato nella documentazione del provider. Un segmento mancante o un errore di battitura in questo campo è una causa comune di problemi di connessione di Layla.

### API Claude

Scegli **API Claude** per collegare un servizio che utilizza il formato API di Anthropic. La configurazione è simile a una connessione compatibile con OpenAI: inserisci i dati di connessione richiesti, la chiave API, il modello e l’endpoint API completo fornito dal provider.

L’API Claude e l’API compatibile con OpenAI utilizzano formati di richiesta diversi, quindi scegli l’opzione corrispondente al tuo provider. Come per l’opzione API OpenAI, inserire solo il dominio o un percorso incompleto può impedire il collegamento.

## 3. Inizia a chattare con il modello personalizzato

Salva le impostazioni del modello o della connessione, quindi torna a Layla e avvia una chat con qualsiasi personaggio. Layla utilizzerà la configurazione del modello selezionata in **Impostazioni di inferenza**.

Puoi tornare in **I miei modelli** in qualsiasi momento per aggiungere un altro LLM locale, cambiare provider API o passare da un modello offline a Layla Server o a un modello cloud.

## Domande frequenti

### Posso aggiungere a Layla il mio modello GGUF?

Sì. In **Impostazioni di inferenza**, tocca **Aggiungi modello personalizzato**, quindi scegli **Memoria interna** o **Scheda SD** per selezionare un modello GGUF compatibile sul dispositivo.

### Un modello locale funziona senza accesso a Internet?

Sì. Dopo l’importazione del modello, l’inferenza locale viene eseguita sul dispositivo Android e può funzionare offline. Le connessioni a Layla Server, Layla Cloud o a un’API esterna hanno requisiti di rete propri.

### Devo importare un modello nella memoria interna o usare la scheda SD?

La memoria interna è consigliata per ottenere le migliori prestazioni e stabilità. L’opzione Scheda SD evita di creare una seconda copia, ma richiede che il modello rimanga disponibile nella posizione originale.

### Perché Layla non riesce a collegarsi al mio modello API?

Controlla prima l’endpoint. Deve essere il percorso API completo previsto dal provider, spesso con `/v1/chat/completions` alla fine per un servizio compatibile con OpenAI, e non deve contenere errori di battitura. Verifica inoltre che la chiave API e il nome del modello siano validi per quel provider.
