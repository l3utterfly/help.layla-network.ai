---
title: Come generare musica offline in Layla con ACE-Step
description: Installa la mini-app ACE-Step, scarica un modello musicale e genera canzoni complete con testo sul tuo telefono Android o iPhone, senza connessione a Internet.
category: Mini-apps & integrations
order: 35
keywords:
  - generatore di musica IA
  - generazione musicale IA offline
  - generare musica su Android
  - generatore di musica IA per iPhone
  - ACE-Step
  - generatore di canzoni IA con testo
  - da testo a musica IA
  - generazione musicale sul dispositivo
  - app di musica IA senza abbonamento
  - modello musicale IA locale
lastUpdated: 2026-09-09
translationKey: how-to-generate-music-offline-in-layla-with-ace-step
ai_translated: true
---

**Layla può generare canzoni complete — stile, melodia, arrangiamento e testo cantato — interamente sul tuo telefono, usando il modello musicale ACE-Step 1.5. Nulla viene caricato online, non serve alcun account e funziona con la rete disattivata.**

![Il logo ACE-Step.](./acestep.png)

Questo articolo spiega come installare la mini-app Music Generation, scaricare un pacchetto di modello, scrivere un prompt e usare i parametri che controllano velocità e qualità.

## Che cos'è ACE-Step?

ACE-Step è un modello di generazione musicale sviluppato da ACE Studio e StepFun. Riceve una descrizione testuale di una canzone — genere, atmosfera, strumenti, tempo — ed eventualmente un testo, e produce audio finito a 48 kHz in stereo.

A differenza dei generatori di musica IA online che potresti aver usato, ACE-Step in Layla viene eseguito localmente sulla CPU o sulla GPU del tuo dispositivo. Non ci sono code, sistemi a crediti o limiti per brano. In cambio, la generazione richiede tempo reale su un telefono anziché pochi secondi su una GPU da datacenter, e i file del modello sono di grandi dimensioni.

Layla esegue ACE-Step tramite [acestep.cpp](https://github.com/ServeurpersoCom/acestep.cpp), un'implementazione del modello basata su GGML. È lo stesso principio dei modelli testuali di Layla che girano su [llama.cpp](https://github.com/ggerganov/llama.cpp): il modello viene quantizzato fino a una dimensione che un telefono può contenere, poi eseguito sull'hardware che possiedi già.

## Che cosa ti serve

- **Layla su Android o iOS.** La generazione musicale funziona allo stesso modo su entrambe le piattaforme.
- **La versione premium di Layla.** Tutte le mini-app la richiedono. Layla è un acquisto una tantum, non un abbonamento.
- **Circa 5 GB di spazio libero** per un pacchetto di modello. I pacchetti vanno da circa 4,2 GB a 5,3 GB.
- **6 GB di RAM** per le quantizzazioni più leggere, **8 GB** per quelle più pesanti.
- **Un po' di pazienza al primo avvio.** Il modello deve essere caricato in memoria prima del primo brano di una sessione.

## Passaggio 1: attivare la mini-app Music Generation

La generazione musicale è una funzione opzionale, quindi non è attiva per impostazione predefinita. Apri _Le mie app_, tocca il segno più in alto a destra per sfogliare tutte le funzioni disponibili e attiva **Music Generation (Ace Step)**.

Se non hai mai usato il sistema delle mini-app, consulta [Come attivare o disattivare le mini-app in Layla](/it/how-to-enable-disable-mini-apps-within-layla/).

Una volta attivata, l'app compare nell'elenco delle tue app e si apre su due schede: **Create** e **Library**.

## Passaggio 2: scaricare un pacchetto di modello

Tocca la scheda del modello in cima alla scheda Create per aprire il selettore dei pacchetti. Ogni voce è un pacchetto autonomo: il modello linguistico che scrive testo e melodia, il transformer di diffusione che genera l'audio, un encoder di testo e il decoder che trasforma il risultato in suono. Scegli sempre un solo pacchetto — non ci sono file separati da abbinare.

I pacchetti si differenziano lungo due assi.

**Variante** — il carattere musicale del modello:

| Variante                | Descrizione                                                                             |
| ----------------------- | --------------------------------------------------------------------------------------- |
| Turbo                   | Generazione rapida in 8 passi. La scelta predefinita migliore su telefono.              |
| SFT-Turbo50             | Una fusione dei modelli turbo e ottimizzato. Velocità turbo con un risultato più ricco. |
| Turbo Continuous        | Turbo calibrato per materiale continuo o in loop senza interruzioni.                    |
| Turbo Shift-1 / Shift-3 | Turbo con programmi di campionamento alternativi. Timbro diverso.                       |

**Quantizzazione** — il compromesso tra dimensione e qualità, lo stesso concetto dei [quant GGUF per i modelli testuali](/it/what-are-gguf-models-what-are-model-quants/):

| Quant  | Note                                             |
| ------ | ------------------------------------------------ |
| Q4_K_M | Il più piccolo, qualità più bassa. 6 GB di RAM.  |
| Q5_K_M | Piccolo ed equilibrato. 6 GB di RAM.             |
| Q6_K   | Più grande, qualità più alta. 8 GB di RAM.       |
| Q8_0   | Il più grande, quasi senza perdite. 8 GB di RAM. |

Se hai dubbi, parti da **Turbo Q5_K_M**.

Tocca _Download bundle_: il download prosegue in background — puoi uscire dalla mini-app, e persino da Layla, senza perdere l'avanzamento. Al termine del trasferimento, Layla estrae l'archivio e verifica che tutti e quattro i file del modello siano arrivati. La scheda mostra _Installed_ quando il pacchetto è pronto.

Un pacchetto che non ti serve più può essere rimosso con _Delete bundle_ e riscaricato in seguito.

## Passaggio 3: descrivere la musica

Il campo **Style** è il controllo principale. Descrivi la musica come la descriveresti a un musicista: genere, atmosfera, strumentazione, produzione, tempo.

Prompt debole:

> canzone pop

Prompt migliore:

> synthpop onirico, pad analogici caldi, batteria con gated reverb, voce femminile soffiata, 120 bpm, luminoso e nostalgico

I dettagli aiutano. Il modello legge questo testo due volte — una quando il modello linguistico pianifica struttura e testo, e di nuovo quando viene generato l'audio — quindi strumenti specifici, aggettivi di produzione e un tempo indirizzano tutti il risultato in una direzione precisa.

![La scheda Create nella mini-app Music Generation di Layla, con la scheda del pacchetto di modello, il campo Style e il campo Lyrics con i tag di sezione.](./lyrics.jpg)

## Passaggio 4: con o senza testo

Sotto il riquadro dello stile si trova il campo **Lyrics** con l'interruttore **Instrumental**.

- **Lascia vuoto il riquadro del testo** e il modello scriverà da solo le parole a partire dalla tua descrizione di stile. È il modo più rapido per ottenere una canzone completa da un prompt di una riga.
- **Scrivi il tuo testo** e il modello lo canterà così com'è. Usa i tag di sezione su righe dedicate per dare forma all'arrangiamento:

```
[verse]
Streetlights blink along the empty road
Radio static, half a song I know

[chorus]
Drive until the morning finds us
Nothing in the mirror behind us
```

Tag come `[intro]`, `[verse]`, `[pre-chorus]`, `[chorus]`, `[bridge]`, `[guitar solo]` e `[outro]` vengono compresi, e un tag può portare una descrizione propria, ad esempio `[bridge - saxophone and strings]`.

La lingua del canto viene rilevata dal testo che scrivi, quindi puoi scrivere in italiano, giapponese o in qualsiasi altra lingua supportata dal modello e verrà cantata in quella lingua.

- **Attiva Instrumental** per un brano completamente senza voce.

## Passaggio 5: durata e seed

**Duration** offre valori predefiniti da 30 secondi a 3 minuti. I brani più lunghi richiedono proporzionalmente più tempo, quindi 30 secondi è la durata sensata finché stai ancora perfezionando il prompt.

**Seed** controlla la casualità. Lascialo vuoto per un risultato diverso ogni volta, oppure imposta un numero — o tocca il dado — per rendere ripetibile una generazione. Lo stesso seed con lo stesso prompt e le stesse impostazioni produce lo stesso brano: è esattamente ciò che serve quando sei vicino al risultato voluto e vuoi cambiare una sola parola del prompt.

![La sezione Parameters con l'interruttore Use GPU, le durate predefinite, il campo del seed e il pannello Advanced aperto con Steps, Shift e Solver.](./duration.jpg)

## Generare un brano

Tocca **Generate music**. Una sola barra di avanzamento copre l'intera operazione, con un'etichetta che indica la fase in corso:

1. **Loading model** — il modello linguistico viene caricato in memoria.
2. **Writing structure / Writing lyrics** — tempo, tonalità, metro e il testo, se non l'hai fornito tu.
3. **Composing melody** — viene pianificato il contenuto musicale.
4. **Generating music** — l'audio vero e proprio viene generato, un passo alla volta.
5. **Decoding audio** — il risultato viene trasformato in forma d'onda.

Puoi premere **Stop** in qualsiasi momento. La generazione si ferma al termine del passo in corso, quindi c'è una breve attesa prima dell'arresto effettivo. Layla mantiene lo schermo acceso per tutta la durata, così l'operazione non viene interrotta.

Al termine compare una scheda di riproduzione con una forma d'onda. Tocca la forma d'onda per spostarti nel brano, usa il pulsante di riproduzione per ascoltarlo, l'icona di download per salvare o condividere il file e l'icona del cestino per eliminarlo.

Ogni brano viene scritto come file WAV stereo a 48 kHz nella cartella dedicata della mini-app ed elencato nella scheda **Library**, con l'indicazione del modello, del numero di passi e del seed che l'hanno prodotto. Nulla viene eliminato automaticamente: fai pulizia di ciò che non ti serve, perché i file WAV di questa qualità occupano spazio in fretta.

## Parametri avanzati

Apri **Advanced** sotto Parameters per un controllo più fine. Nella maggior parte dei casi non serve toccarli, e i valori predefiniti sono corretti per i modelli inclusi.

**Steps e Shift** sono vuoti per impostazione predefinita, il che significa che ogni modello usa i valori con cui è stato addestrato — 8 passi per la famiglia turbo, 50 per i modelli base e ottimizzati. Inserisci un numero per sovrascriverli. Più passi significano in genere più dettaglio e più tempo.

**Solver** seleziona l'algoritmo di campionamento: Euler, SDE, DPM++ 3M o STORK-4. Euler è quello predefinito. Cambiare solver modifica la texture del risultato a parità di passi e vale la pena sperimentarlo una volta trovato un prompt che ti piace.

**Guidance (CFG)** controlla quanto strettamente l'audio segua il tuo prompt di stile. Viene mostrato solo per i modelli in cui ha effetto: i modelli turbo hanno la guida integrata nei pesi, quindi Layla la fissa a 1.0 e te lo segnala, invece di lasciarti saturare il risultato.

**LM Guidance (CFG)** fa lo stesso per la fase di testo e melodia e vale per tutti i modelli. Il valore predefinito di 1.0 è l'impostazione più veloce. Alzarlo verso 2.0 lega più strettamente la composizione al tuo prompt, al costo di raddoppiare all'incirca il tempo di quella fase.

**Use GPU** sposta la generazione audio sulla GPU del dispositivo — Metal su iOS, OpenCL su Android — con ricaduta sulla CPU in caso di problemi. La fase di testo e melodia gira sempre sulla CPU: è limitata dalla memoria più che dal calcolo, e una GPU mobile è più lenta in questo compito. La GPU è disattivata per impostazione predefinita perché il percorso su CPU è la base compatibile; se sia più veloce vale la pena provarlo sul tuo dispositivo.

**Flash attention** velocizza la generazione audio a scapito di un po' di qualità. Disattivata per impostazione predefinita.

**VAE tile size** stabilisce quanto audio viene decodificato in una volta. Abbassarlo riduce il picco di memoria nell'ultima fase al costo di un po' di velocità — utile se la generazione si completa ma l'app viene chiusa proprio alla fine su un dispositivo con meno RAM.

![La parte inferiore del pannello Advanced, con LM Guidance, l'interruttore Flash attention, VAE tile size e un riepilogo del pacchetto selezionato.](./advanced.jpg)

Il riquadro in basso riassume ciò che stai effettivamente eseguendo: la famiglia del modello, l'encoder di testo Qwen3-Embedding, la dimensione del modello linguistico incluso e il formato di uscita.

## Importare un pacchetto di modello personale

Il selettore include la famiglia turbo, quella che ha senso su un telefono. Le varianti base e SFT, più lente, e qualsiasi altro pacchetto compatibile possono essere aggiunte manualmente.

Tocca _Import_ in alto a destra nella mini-app e seleziona un file `.zip` contenente `lm.gguf`, `dit.gguf`, `text_encoder.gguf` e `vae.gguf`. Layla lo estrae, appiattisce eventuali cartelle annidate e verifica che tutti e quattro i file siano presenti prima di aggiungere il pacchetto al tuo elenco. I pacchetti importati si comportano esattamente come quelli inclusi e si eliminano allo stesso modo.

## Ottenere risultati migliori

- **Itera a 30 secondi.** Trova un prompt e un seed che ti piacciono su un breve estratto, poi rigenera a durata piena con lo stesso seed.
- **Nomina la produzione, non solo il genere.** «Calore del vinile», «mix moderno curato» e «calore analogico vintage» hanno tutti un effetto concreto.
- **Indica un tempo.** Un valore in bpm nel prompt di stile ancora il ritmo.
- **Struttura il testo in sezioni.** Blocchi di testo senza tag non danno al modello alcuna struttura da arrangiare.
- **Cambia una cosa alla volta.** Con un seed fisso senti esattamente l'effetto di una singola modifica al prompt.

## Domande frequenti

### La generazione musicale con IA in Layla funziona offline?

Sì. Una volta scaricato un pacchetto di modello, la generazione avviene interamente sul tuo dispositivo. Puoi mettere il telefono in modalità aereo e continuerà a funzionare. I tuoi prompt e i tuoi testi non lasciano mai il dispositivo.

### Quanto tempo serve per generare una canzone su un telefono?

Dipende molto dal dispositivo, dalla durata del brano, dalla quantizzazione e dal numero di passi. Una generazione turbo di 30 secondi è il modo più rapido per scoprire come si comporta il tuo dispositivo. Durate maggiori e conteggi di passi più alti aumentano il tempo in modo grossomodo proporzionale.

### Serve un abbonamento per generare musica?

No. La generazione musicale è inclusa nello sblocco premium di Layla, che è un acquisto una tantum. Non ci sono crediti, costi per brano o canoni mensili.

### Posso usare commercialmente la musica generata?

Dipende dalla licenza dei pesi del modello ACE-Step, non da Layla. Verifica le condizioni pubblicate dagli autori del modello prima di usare il risultato a fini commerciali.

### Perché la prima generazione è più lenta delle successive?

Il modello deve essere caricato in memoria prima del primo brano. Le esecuzioni successive nella stessa sessione evitano parte di questo costo.

### Quale formato audio produce Layla?

WAV stereo a 48 kHz. Usa l'icona di download su qualsiasi brano per salvarlo sul dispositivo o condividerlo con un'altra app.

---

La generazione musicale si affianca alla [generazione di immagini](/it/how-to-enable-image-generation-in-layla/) e alla chat testuale offline tra le cose che Layla fa sul dispositivo stesso. Nessun account, nessun caricamento, nessuna connessione necessaria.
