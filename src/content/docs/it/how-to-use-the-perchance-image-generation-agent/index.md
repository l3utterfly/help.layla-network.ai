---
title: Come generare immagini IA in Layla con l'Agente Perchance
description: Genera gratis immagini IA dei tuoi personaggi nelle chat di Layla con l'Agente Perchance. Legge il prompt dell'immagine dalla risposta del personaggio e automatizza il sito.
category: Image generation
order: 40
keywords:
  - generazione di immagini Perchance
  - Perchance AI girl generator
  - generatore di immagini IA gratuito
  - generatore di immagini IA per Android
  - generatore di immagini di personaggi IA
  - immagini per compagni IA
  - Agente di generazione di immagini Layla
  - Agenti Layla
  - Agente Python Layla
  - prompt Stable Diffusion
  - alternativa a Stable Diffusion
  - navigazione web automatizzata
lastUpdated: 2026-10-16
translationKey: how-to-use-the-perchance-image-generation-agent
ai_translated: true
---

**L'Agente di generazione di immagini Perchance permette a Layla di generare immagini IA nelle tue chat utilizzando al posto tuo il sito "AI girl generator" di Perchance.** Quando il tuo personaggio IA scrive un prompt per un'immagine nella sua risposta, l'Agente apre il generatore nel browser integrato di Layla, digita il prompt, avvia la generazione, attende l'immagine e la mostra nella chat.

È un'alternativa ai modelli di immagini Stable Diffusion integrati in Layla per Android. L'immagine non viene calcolata dal tuo telefono, quindi è un'opzione gratuita se il dispositivo è troppo lento per la generazione locale di immagini e non vuoi un abbonamento. Il compromesso è che serve una connessione a Internet e il tuo prompt viene inviato a Perchance. I modelli locali di Layla continuano a funzionare offline; questo Agente è l'eccezione. Questo articolo spiega come configurarlo, come funziona e come combinarlo con altri Agenti.

Ecco una dimostrazione dell'Agente in azione:

<video controls playsinline src="/assets/articles/how-to-use-the-perchance-image-generation-agent/perhance-auto.mp4"></video>

## Che cosa ti serve

- Le mini-app _Agenti_ e _Interprete Python_ installate. Se non le hai ancora configurate, segui [Come attivare il supporto Python in Layla](/how-to-enable-python-support-in-layla/).
- Una connessione a Internet. A differenza dei modelli locali di Layla, questo Agente usa un servizio online.
- Il file dell'Agente, il cui link si trova alla fine di questo articolo.

## Passaggio 1: disattiva la generazione di immagini predefinita di Layla

Questo passaggio è obbligatorio. Apri le _Impostazioni di inferenza_, scorri fino alla sezione _Generazione di immagini_ e imposta il modello di generazione di immagini su **Nessuno** (_None_).

Il motivo è che anche la generazione di immagini integrata di Layla legge il tag `<stable_diffusion_prompt>` dalla risposta di un personaggio. Se è ancora selezionato un modello, Layla genera una propria immagine dallo stesso tag e ne ottieni una seconda oltre a quella dell'Agente. Con il modello impostato su _None_, il tag resta a disposizione dell'Agente.

Per vedere dove si trova questa impostazione, consulta [Come attivare la generazione di immagini in Layla](/how-to-enable-image-generation-in-layla/), che mostra la sezione Generazione di immagini delle Impostazioni di inferenza.

## Passaggio 2: importa l'Agente

Scarica il file dell'Agente alla fine di questo articolo, poi apri la mini-app _Agenti_ e usa il pulsante _Add New Agent_ per importarlo. L'Agente si chiama _Perchance AI Girl: generate image_.

Assicurati che l'interruttore sotto l'icona dell'Agente sia attivo. Per impostazione predefinita, ogni Agente che attivi nella mini-app Agenti è disponibile per i tuoi personaggi. Puoi anche associarlo a un personaggio personalizzato specifico dalla scheda _Avanzate_ del creatore di personaggi, come descritto in [Come attivare Agenti, funzioni e chiamata di strumenti in Layla](/how-to-enable-agents-functions-and-tool-calling-in-layla/).

## Passaggio 3: chiedi un'immagine

Avvia una chat e chiedi un'immagine, per esempio "mostrami che aspetto hai" oppure "mandami un'immagine della spiaggia al tramonto".

L'Agente indica al modello di rispondere alle richieste di immagini soltanto con un prompt per l'immagine, senza altro testo. Dopo un breve ritardo, Layla esegue l'automazione e l'immagine compare nella chat. Metti in conto un po' di attesa: l'Agente aspetta fino a 30 secondi che la pagina si carichi e fino a tre minuti per l'immagine, perché la velocità del generatore gratuito varia.

## Come funziona l'Agente

L'Agente ha tre parti: un prompt di sistema, un attivatore e due strumenti. Capirli rende più semplice adattare l'Agente.

In breve, il flusso è questo:

```text
Model reply with tag -> Regex trigger -> Execute Python Code -> Display Image
```

### 1. Il prompt di sistema chiede al modello un prompt dentro un tag

L'Agente fornisce al modello questa istruzione:

```text
If the user asks you to generate an image, output the image prompt inside this tag:

<stable_diffusion_prompt>your image prompt here</stable_diffusion_prompt>

Do not include any other text when generating an image. For other requests, respond normally.
```

Così, quando chiedi un'immagine, il modello risponde con qualcosa come:

```text
<stable_diffusion_prompt>a lighthouse on a cliff at sunset, dramatic clouds, oil painting</stable_diffusion_prompt>
```

Per qualsiasi altro messaggio, il modello risponde normalmente.

### 2. Un attivatore regex riconosce il tag

L'Agente usa un _attivatore regex_ che agisce sull'**output** del modello anziché sul tuo input. Il suo schema è:

```text
/<stable_diffusion_prompt>(.*?)<\/stable_diffusion_prompt>/s
```

Lo schema riconosce il tag e cattura tutto ciò che si trova tra il tag di apertura e quello di chiusura. Il flag `s` permette al prompt di estendersi su più righe. Come spiegato in [Approfondimento sugli Agenti di Layla](/deep-dive-into-layla-agents/), il testo individuato diventa l'input del primo strumento dell'Agente. In questo Agente, il prompt catturato viene inserito nello script come `{{match$1}}`.

### 3. Uno strumento Python controlla il sito

Il primo strumento è _Esegui codice Python_. Lo script riceve il prompt, apre Perchance, genera l'immagine e la salva in un file. La sezione successiva lo descrive nel dettaglio.

### 4. Display Image mostra il risultato

Quando lo script termina, stampa una sola riga: la posizione dell'immagine salvata come indirizzo `file://`. Questo output è l'input del secondo strumento, _Display Image_, che mostra il file nella chat. Se lo script fallisce, stampa un messaggio di errore al posto dell'indirizzo e non compare alcuna immagine.

## Come funziona la navigazione web automatizzata di Layla

Layla include un browser integrato (una WebView) che gli script Python possono controllare. Uno script può caricare una pagina, leggerne il contenuto, compilare campi, fare clic sui pulsanti e attendere la comparsa di elementi, più o meno come farebbe una persona con un browser. Questo Agente sfrutta tale capacità per fare ciò che altrimenti faresti a mano sul sito di Perchance.

Lo script segue questi passaggi:

1. **Aprire il generatore.** Carica `perchance.org/improved-ai-girl-generator` e concede alla pagina qualche secondo per completare il caricamento.
2. **Digitare il prompt.** Trova il campo di descrizione nella pagina e vi inserisce il prompt preso dalla risposta del modello.
3. **Premere "generate".** Trova il pulsante di generazione e ci clicca. Se l'identificatore del pulsante dovesse cambiare, lo script ripiega sulla ricerca di un qualsiasi pulsante con l'etichetta "generate".
4. **Attendere l'immagine.** Il tempo di generazione varia, perciò lo script controlla ogni secondo, per un massimo di tre minuti, se l'immagine risultante è comparsa.
5. **Salvare l'immagine.** L'immagine finita è già incorporata nella pagina. Lo script la legge direttamente, la salva come file nella cartella temporanea e ne restituisce la posizione.

Un dettaglio merita attenzione. Il generatore di Perchance è costruito con frame annidati provenienti da origini diverse, che uno script normalmente non può ispezionare. Lo script risolve il problema cercando in tutti i frame della pagina il campo di descrizione, il pulsante e il risultato. Per questo ogni passaggio consiste nel cercare e poi agire, anziché fare clic in una posizione fissa nota in anticipo.

L'immagine viene salvata ogni volta con lo stesso nome di file, quindi una nuova generazione sostituisce il precedente file temporaneo. Considera il file temporaneo.

### Privacy e affidabilità

- Il prompt dell'immagine viene digitato nel sito di Perchance, quindi lascia il tuo dispositivo. Il resto della conversazione no.
- Layla è pensata per funzionare offline, ma questo Agente è l'eccezione. Senza una connessione a Internet non può caricare la pagina.
- L'Agente dipende dal layout di un sito di terze parti. Se Perchance ridisegna il generatore, lo script potrebbe non trovare più gli elementi giusti e l'Agente dovrà essere aggiornato.
- Se la generazione fallisce o scade il tempo, l'Agente restituisce un errore invece di un'immagine. Riprova oppure verifica che Perchance si carichi con la tua connessione.
- L'Agente usa il browser di automazione della chat, quindi funziona nelle chat ma non nelle esecuzioni pianificate.

## Combinarlo con altri Agenti di generazione di immagini

All'Agente interessa una sola cosa: che nell'output del modello compaia un tag `<stable_diffusion_prompt>`. Non importa come ci sia arrivato. Tutto ciò che influenza ciò che il modello scrive in quel tag migliora quindi il risultato, senza modificare l'Agente stesso.

Alcune idee:

- **Mantenere coerente l'aspetto di un personaggio.** Usa un altro Agente con lo strumento _Provide Context_ per dare al modello una descrizione dell'aspetto del tuo personaggio e chiedigli di includerla in ogni prompt per immagini.
- **Aggiungere uno stile.** Richiedi uno stile fisso, come "watercolor, soft lighting", nelle istruzioni dello _Scenario_ del personaggio o nel contesto di un Agente, così il modello lo include in ogni prompt.
- **Generare un'immagine dopo ogni messaggio.** Aggiungi allo _Scenario_ del personaggio un'istruzione che lo porti a chiudere ogni risposta con un tag `<stable_diffusion_prompt>`, come descritto in [Creare un Agente di generazione di immagini](/creating-an-image-generation-agent/). L'Agente Perchance verrà eseguito dopo ogni messaggio e non solo quando lo chiedi.
- **Usare un generatore diverso.** Gli strumenti dell'Agente sono un normale script Python seguito da _Display Image_. Puoi duplicare l'Agente e modificare lo script per automatizzare un altro sito, mantenendo lo stesso prompt di sistema e lo stesso attivatore.

Per ogni risposta viene eseguito un solo Agente attivato dall'output del modello (quello più pertinente), e nessuno viene eseguito se la risposta contiene anche una chiamata a uno strumento. Non attivare quindi due Agenti che reagiscono allo stesso tag nello stesso momento. Se duplichi questo Agente per cambiare generatore, disattiva l'originale.

## Domande frequenti

### Come genero gratis immagini IA del mio personaggio in Layla?

L'Agente Perchance è un modo: usa un generatore online gratuito, quindi non servono né un abbonamento né il download di un modello. L'altro è eseguire un modello Stable Diffusion locale sul tuo dispositivo, che funziona offline. Consulta [Come attivare la generazione di immagini in Layla](/how-to-enable-image-generation-in-layla/).

### Devo scaricare un modello Stable Diffusion?

No. L'immagine viene generata sui server di Perchance, quindi non serve scaricare alcun modello. Devi però impostare su _None_ il modello di generazione di immagini di Layla.

### Perché ho ottenuto due immagini?

Probabilmente la generazione di immagini integrata di Layla è ancora attiva. Imposta il modello di generazione di immagini su _None_ nelle Impostazioni di inferenza.

### Posso usarlo senza connessione a Internet?

No. L'Agente carica un sito web. Per la generazione di immagini offline, usa uno dei modelli locali descritti in [Come attivare la generazione di immagini in Layla](/how-to-enable-image-generation-in-layla/).

### Posso cambiare generatore o aggiungere passaggi personalizzati?

Sì. Apri l'Agente nella mini-app Agenti e modifica lo strumento _Esegui codice Python_. Lo script è normale Python che usa la libreria `lython` di Layla per controllare il browser.

## Scarica l'Agente

[Scarica perchance-ai-girl-generator-auto.json](/assets/articles/how-to-use-the-perchance-image-generation-agent/perchance-ai-girl-generator-auto.json)

Usa il pulsante _Add New Agent_ nella mini-app Agenti per importarlo.
