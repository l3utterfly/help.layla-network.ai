---
title: Come eseguire Layla su PC con BlueStacks e LM Studio
description: Installa Layla in BlueStacks e collegalo a un modello LM Studio tramite un’API locale compatibile con OpenAI.
category: Mini-apps & integrations
order: 20
keywords:
  - Layla su Windows
  - BlueStacks
  - LM Studio
  - API compatibile con OpenAI
  - LLM locale
lastUpdated: 2026-07-26
translationKey: how-to-run-layla-on-your-pc-with-bluestacks-and-lm-studio
ai_translated: true
---

Layla è progettato per Android e iOS, ma puoi eseguirlo anche su Windows tramite l’emulatore BlueStacks. Collegandolo a LM Studio, userai nelle conversazioni un LLM eseguito localmente sul computer.

La configurazione è utile se apprezzi l’interfaccia e il gioco di ruolo di Layla e vuoi chattare su uno schermo più grande.

> **Nota:** non tutte le funzioni operano su PC, ma la maggior parte della chat dovrebbe funzionare normalmente.

Questa guida illustra l’installazione in BlueStacks, LM Studio come motore locale e il collegamento tramite API compatibile con OpenAI.

## Cosa serve

Servono un PC Windows adatto a BlueStacks, RAM e spazio sufficienti, BlueStacks 5, l’APK ufficiale di Layla, LM Studio e Internet per i download iniziali. Dopo l’installazione, il modello può funzionare localmente.

## 1. Installa BlueStacks

Scarica [BlueStacks 5](https://www.bluestacks.com/bluestacks-5.html) dal sito ufficiale, installalo e lascia che prepari Android. Puoi usare Google Play, ma i passaggi seguenti installano direttamente l’APK ufficiale.

## 2. Scarica l’APK ufficiale di Layla

Visita il [sito ufficiale di Layla](https://www.layla-network.ai/).

![Pagina iniziale scura di Layla con mockup di telefoni e pulsanti di download.](./download-layla.avif)

Scegli il download diretto dell’APK e salvalo in una posizione facile da trovare. Per sicurezza, scaricalo solo dal sito ufficiale.

## 3. Installa l’APK in BlueStacks

1. Fai clic su **Install APK** nella barra laterale.
2. Seleziona l’APK.
3. Attendi l’installazione.

Puoi anche trascinare il file nella finestra. L’icona di Layla apparirà nella schermata iniziale; prima di una conversazione locale devi configurare LM Studio.

![BlueStacks con la schermata Select Character di Layla, ricerca e categorie.](./bluestacks-select-character.avif)

## 4. Installa LM Studio

LM Studio scarica ed esegue modelli linguistici localmente. Scarica [LM Studio](https://lmstudio.ai/download) dal sito ufficiale, installalo, aprilo e completa la configurazione iniziale.

## 5. Scarica un modello consigliato

Usa il browser dei modelli. LM Studio può proporre modelli adatti al tuo hardware.

- I modelli piccoli richiedono meno RAM e rispondono più velocemente.
- I modelli grandi possono rispondere meglio ma usano più memoria.
- I modelli quantizzati usano generalmente meno RAM e VRAM.
- Per la prima configurazione, inizia con un modello piccolo consigliato.

![Finestra di selezione di LM Studio con modelli scaricati e dimensioni.](./lm-studio-model-selection.avif)

Attendi la fine del download.

## 6. Avvia il server API compatibile con OpenAI

Layla comunica con LM Studio tramite questa API.

1. Apri **Developer**.
2. Seleziona o carica il modello.
3. Apri le impostazioni del server.
4. Abilita **Serve on Local Network**.
5. Avvia il server locale.

![Schermata Developer Local Server di LM Studio con server attivo e impostazioni evidenziate.](./lm-studio-server-settings.avif)

LM Studio mostra un indirizzo con IP locale e porta, spesso `1234`:

```text
http://192.168.1.100:1234
```

L’endpoint OpenAI normalmente include `/v1`:

```text
http://192.168.1.100:1234/v1/chat/completions
```

Usa l’indirizzo realmente mostrato sul tuo PC.

**Devi individuare l’API compatibile con OpenAI da collegare a Layla.**

![Schermata Developer con server, endpoint compatibili con OpenAI e log; chat completions è evidenziato.](./lm-studio-api-endpoints.avif)

### Perché serve Serve on Local Network

BlueStacks usa un ambiente Android virtuale separato. Perciò normalmente non funziona:

```text
http://localhost:1234/v1
```

In BlueStacks, `localhost` indica Android, non Windows. **Serve on Local Network** fornisce un indirizzo raggiungibile.

Esponi il server solo su una rete privata affidabile e valuta l’autenticazione API se altri dispositivi possono accedervi.

## 7. Seleziona l’API in Layla

1. Apri **Settings**.
2. Vai in **Inference Settings**.
3. Scegli **OpenAI Compatible API**.

![Finestra di scelta del motore con Local File, Your PC, Layla Cloud, OpenAI API e Claude API.](./layla-inference-engine.avif)

## 8. Inserisci l’endpoint LM Studio

Inserisci l’indirizzo di rete mostrato da LM Studio, con `/v1` quando necessario:

```text
http://192.168.1.100:1234/v1/chat/completions
```

**Non copiare l’esempio: usa l’indirizzo del tuo PC.**

![Edit OpenAI API Settings con nome, endpoint, chiave e modello.](./layla-api-settings.avif)

Salva. Mantieni LM Studio aperto e verifica che server e modello siano disponibili, **Serve on Local Network** sia attivo e Windows Firewall consenta LM Studio sulle reti private.

## 9. Inizia a chattare

Apri un personaggio o una nuova conversazione e invia un messaggio. Layla lo inoltra al modello locale e mostra la risposta.

![Chat Layla tramite LM Studio con la domanda “Who are you?” e la risposta.](./layla-chat-via-lm-studio.avif)

## Risoluzione dei problemi

### Layla non si collega

Controlla che il server funzioni, **Serve on Local Network** sia attivo, sia usato l’indirizzo di rete invece di `localhost`, porta e `/v1` siano corretti e il firewall non blocchi LM Studio. Riavvia il server dopo modifiche di rete.

### Si collega ma non risponde

Verifica che un modello sia scaricato e disponibile. Controlla i log e prova a caricarlo manualmente.

### Le risposte sono lente

Usa un modello più piccolo o più quantizzato, chiudi applicazioni pesanti e riduci il contesto.

### L’APK risulta incompatibile

Crea con Multi-instance Manager una nuova istanza Android a 64 bit, come Pie 64-bit o Android 11, e installa lì l’APK.

### Il server si ferma al riavvio

Dopo il riavvio di Windows, apri LM Studio, torna in Developer e riavvia il server.

## Domande frequenti

### Posso eseguire Layla su Windows?

Sì, tramite un emulatore Android come BlueStacks.

### Esiste un’app Windows nativa?

Questa guida usa Android in BlueStacks. Consulta il sito di Layla per le piattaforme attualmente supportate.

### LM Studio esegue il modello localmente?

Sì. Modello e generazione sono gestiti dal PC. Altre funzioni di Layla possono richiedere Internet in base ai servizi usati.

### BlueStacks e LM Studio devono restare aperti?

Sì. BlueStacks esegue Layla e il server LM Studio genera le risposte.

### Quale modello devo usare?

Dipende da RAM, VRAM e potenza. Inizia con una raccomandazione di LM Studio e prova modelli più grandi se possibile.

## Riepilogo

1. Installa BlueStacks.
2. Scarica l’APK ufficiale.
3. Installa Layla in BlueStacks.
4. Installa LM Studio e un modello.
5. Avvia il server API compatibile con OpenAI.
6. Abilita **Serve on Local Network**.
7. Inserisci l’endpoint in Layla.
8. Inizia a chattare.

La configurazione offre l’esperienza Android di Layla su uno schermo Windows più grande, affidando al PC l’inferenza locale.
