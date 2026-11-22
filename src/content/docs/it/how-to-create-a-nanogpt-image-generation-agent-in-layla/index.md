---
title: "Generazione di immagini NanoGPT su Android: creare un Agente di immagini IA in Layla"
description: Usa l'API di generazione di immagini NanoGPT in Layla su Android. Crea un Agente passo dopo passo perché i personaggi IA inviino immagini HiDream, FLUX o SDXL in chat.
category: Image generation
order: 60
keywords:
  - generazione di immagini NanoGPT
  - API di generazione di immagini NanoGPT
  - modelli di immagini NanoGPT
  - prezzi della generazione di immagini NanoGPT
  - API NanoGPT
  - chiave API NanoGPT
  - endpoint API NanoGPT
  - API immagini nano-gpt.com
  - app NanoGPT per Android
  - generazione di immagini NanoGPT SillyTavern
  - modelli di immagini NanoGPT senza censura
  - NanoGPT HiDream
  - API HiDream
  - API FLUX
  - API SDXL
  - API di generazione di immagini a consumo
  - API di generazione di immagini senza abbonamento
  - API di generazione di immagini economica
  - API di generazione di immagini compatibile con OpenAI
  - endpoint images/generations
  - chat IA con generazione di immagini
  - chatbot IA che invia immagini
  - gioco di ruolo IA con generazione di immagini
  - generatore di immagini di personaggi IA
  - generatore di immagini IA per Android
  - chat IA con la propria chiave API
  - LLM locale con generazione di immagini nel cloud
  - come creare un agente IA
  - agente IA in JavaScript
  - strumento Eval di Layla
  - Agente JavaScript di Layla
  - Agente di generazione di immagini Layla
  - Agenti Layla
lastUpdated: 2026-11-22
translationKey: how-to-create-a-nanogpt-image-generation-agent-in-layla
ai_translated: true
---

**La generazione di immagini NanoGPT dà accesso, con una sola chiave API a consumo, a oltre 200 modelli di immagini, tra cui HiDream, FLUX, Seedream, Qwen Image, Stable Diffusion XL e GPT Image, senza abbonamento.** Questa guida collega l'API di generazione di immagini NanoGPT a Layla, un'app di chat IA per Android, così i tuoi personaggi IA possono inviare immagini in chat. Quando il tuo personaggio descrive un'immagine nella sua risposta, un Agente di Layla invia la descrizione a NanoGPT, salva l'immagine che riceve e la mostra nella conversazione.

L'articolo ha due parti. La prima mostra come costruire l'Agente di immagini IA passo dopo passo nella mini-app _Agenti_, così vedi dove va ogni elemento. La seconda spiega, riga per riga, come funziona il codice JavaScript dell'Agente, così puoi modificarlo o scrivere un tuo Agente per un'altra API di generazione di immagini.

L'Agente viene eseguito nell'ambiente JavaScript integrato di Layla, quindi non ti serve la mini-app Interprete Python. Se preferisci non costruirlo tu, puoi scaricare il file dell'Agente finito e importarlo.

A differenza dei [modelli IA offline](/it/how-to-enable-image-generation-in-layla/) di Layla, questo Agente richiede una connessione a Internet. La descrizione dell'immagine viene inviata a NanoGPT e all'azienda che gestisce il modello, e ogni immagine viene pagata con il tuo saldo NanoGPT. Se chatti con un modello locale, il resto della conversazione resta sul tuo dispositivo.

<div class="file-download">
  <div class="file-download-info">
    <span class="file-download-label">File dell&#x27;Agente</span>
    <span class="file-download-name">nanogpt-generate-image.json</span>
    <span class="file-download-hint">Non funzionerà senza una chiave API NanoGPT, che l'articolo spiega più avanti.</span>
  </div>
  <a class="file-download-button" href="/assets/articles/how-to-create-a-nanogpt-image-generation-agent-in-layla/nanogpt-generate-image.json" download="nanogpt-generate-image.json"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>Scarica</a>
</div>

## Perché usare la generazione di immagini NanoGPT in Layla?

I modelli Stable Diffusion di Layla sono la scelta giusta quando vuoi che le immagini siano generate interamente sul tuo telefono. NanoGPT risponde a esigenze diverse:

- **Pagamento per immagine, senza abbonamento.** Ricarichi un saldo e ogni immagine viene scalata da quello. Al momento della scrittura, i modelli di immagini NanoGPT più economici costano meno di mezzo centesimo per immagine, e HiDream I1 Full, il modello usato da questo Agente, costa 0,0153 $.
- **Ricariche piccole e pagamenti in criptovaluta.** NanoGPT accetta carte da 1 $ e criptovalute da 0,10 $, il che è utile se vuoi provare un modello senza un grosso deposito o senza una carta.
- **Molti modelli di immagini con una sola chiave.** HiDream, FLUX, Seedream, Qwen Image, GPT Image, Stable Diffusion XL e modelli SDXL anime come Animagine XL e Illustrious usano tutti la stessa richiesta. Cambiare modello significa modificare una riga del codice dell'Agente.
- **Un'API di immagini compatibile con OpenAI.** L'endpoint delle immagini di NanoGPT segue il formato dell'API `images/generations` di OpenAI, quindi il codice di questa guida funziona anche come modello di partenza per altre API di generazione di immagini compatibili con OpenAI.
- **Un solo account NanoGPT per chat e immagini.** NanoGPT offre anche modelli linguistici tramite un'API compatibile con OpenAI all'indirizzo `https://api.nano-gpt.com/api/v1`, che Layla può usare per la conversazione stessa tramite la sua [connessione API compatibile con OpenAI](/it/how-to-connect-layla-to-any-openai-compatible-api/). Con questo Agente, la stessa chiave alimenta sia le risposte del tuo personaggio sia le sue immagini.
- **Oppure un modello di chat locale con immagini dal cloud.** L'Agente reagisce solo alla risposta del personaggio, quindi funziona con qualsiasi modello tu usi per chattare. Puoi tenere un LLM privato e offline per la conversazione, e solo il prompt dell'immagine lascia il tuo telefono.
- **Una qualità dell'immagine che non dipende dal tuo telefono.** L'immagine viene generata su un server, quindi la velocità del tuo dispositivo non limita né la dimensione del modello né i tempi di attesa.

## Come funziona l'Agente di immagini IA in breve

L'Agente usa lo stesso flusso degli altri Agenti di generazione di immagini di Layla, come l'[Agente OpenRouter](/it/how-to-use-the-openrouter-image-generation-agent/) e l'[Agente Nano Banana](/it/how-to-use-the-google-nano-banana-image-generation-agent/):

```text
Chiedi un'immagine
  -> il personaggio risponde con un prompt dell'immagine racchiuso in un tag
  -> l'attivatore dell'Agente individua il tag
  -> lo strumento Eval chiama l'API di NanoGPT e salva l'immagine
  -> lo strumento Display Image la mostra nella chat
```

Un Agente è composto da tre parti, e questo le usa ciascuna una volta:

1. **Un prompt di sistema** dice al modello linguistico del tuo personaggio che può creare immagini, e che lo fa scrivendo un prompt dell'immagine tra i tag `<stable_diffusion_prompt></stable_diffusion_prompt>`.
2. **Un attivatore** controlla le risposte del modello. Quando una risposta contiene il tag, l'attivatore cattura il testo al suo interno e avvia l'Agente.
3. **Due strumenti** vengono eseguiti uno dopo l'altro. _Eval_ esegue un breve programma JavaScript che invia il prompt a NanoGPT e salva l'immagine come file. _Display Image_ prende quel file e lo mostra nella chat.

Il modello linguistico non parla mai con NanoGPT. Scrive soltanto testo, e tutto il resto è gestito dall'Agente. Per questo l'Agente funziona con qualsiasi modello di chat, compreso un piccolo modello locale in esecuzione sul tuo telefono.

Il tag si chiama `<stable_diffusion_prompt>` perché è il tag che ascolta anche la generazione di immagini di Layla. Questo è importante per la configurazione, come spiegato nel [Passaggio 1](#passaggio-1-disattivare-la-generazione-di-immagini-predefinita-di-layla).

## Cosa ti serve

- La mini-app _Agenti_. Se non hai mai usato gli Agenti, leggi prima [Come attivare Agenti, funzioni e chiamate agli strumenti in Layla](/it/how-to-enable-agents-functions-and-tool-calling-in-layla/).
- Un account NanoGPT con un saldo e una chiave API NanoGPT. La sezione successiva spiega come fare.
- Una connessione a Internet.

## Come ottenere una chiave API NanoGPT

Una chiave API è una lunga stringa di caratteri che identifica il tuo account NanoGPT quando l'Agente invia una richiesta. Le chiavi NanoGPT iniziano con `sk-nano-`.

1. Vai su [nano-gpt.com](https://nano-gpt.com) e accedi oppure crea un account.
2. Apri la [pagina Balance](https://nano-gpt.com/balance) e aggiungi fondi. NanoGPT è prepagato: ricarichi un saldo e ogni immagine viene scalata da quello. Il saldo attuale è indicato accanto a _Usage & billing_ nella barra laterale. Al momento della scrittura, NanoGPT accetta carte, Apple Pay e Google Pay, con un minimo di 1 $ per il primo deposito con carta e di 5 $ per i successivi, oltre a diverse criptovalute a partire da 0,10 $. Non applica commissioni sui depositi. La [pagina dei prezzi](https://nano-gpt.com/pricing) riporta le condizioni attuali.
3. Seleziona **API** nella barra laterale per aprire la pagina _API integration_, oppure vai direttamente su [nano-gpt.com/api](https://nano-gpt.com/api). La scheda _API keys_ è selezionata ed elenca le chiavi che hai già.
4. Seleziona **Create API key** in alto a destra nella sezione _API keys_. La nuova chiave compare nell'elenco, in gran parte nascosta.
5. Seleziona l'icona a forma di occhio accanto alla chiave per mostrarla per intero, oppure l'icona di copia accanto a essa per copiarla.

![La pagina API integration di NanoGPT, con API selezionato nella barra laterale e un elenco API keys che mostra una chiave, sk-nano-...80ff, con le icone dell'occhio e di copia accanto e un pulsante Create API key in alto a destra.](./nano-gpt-api-key.png)

Il testo sotto l'elenco mostra come viene inviata una chiave: `Authorization: Bearer $NANOGPT_API_KEY`. È l'intestazione usata dal codice dell'Agente, come spiegato in [Inviare la richiesta](#inviare-la-richiesta).

Tratta la chiave come una password. Chiunque la possieda può generare immagini pagate con il tuo saldo. Se stai solo provando l'Agente, tieni un saldo basso sull'account.

## Modelli di immagini NanoGPT e prezzi

L'Agente usa un modello e una dimensione dell'immagine, che imposti all'inizio del suo codice. NanoGPT elenca i suoi modelli di immagini nella sua [pagina dei modelli di immagini](https://nano-gpt.com/models/image). Per i dettagli esatti di cui l'Agente ha bisogno, apri il catalogo dei modelli nel browser:

```text
https://api.nano-gpt.com/api/v1/images/models
```

Restituisce un lungo elenco JSON con una voce per modello. In ogni voce contano tre campi:

- `id` è il valore da mettere in `MODEL`.
- `supported_parameters.resolutions` elenca le dimensioni accettate dal modello. Una di esse va in `SIZE`.
- `pricing.per_image` indica il prezzo di un'immagine per ciascuna dimensione, in dollari statunitensi.

I nomi delle dimensioni variano da un modello all'altro. Alcuni usano `1024x1024`, altri `1024*1024`, altri ancora nomi come `1k` o `2k`. Copia la dimensione esattamente come la scrive il catalogo per il tuo modello. Una dimensione non supportata dal modello è il motivo più comune per cui una richiesta fallisce dopo un cambio di modello.

Questi sono alcuni dei modelli da testo a immagine elencati da NanoGPT al momento della scrittura, con il prezzo di un'immagine alla dimensione indicata:

| Modello              | ID modello                                   | Dimensione di esempio | Prezzo per immagine | Note                                                                                       |
| -------------------- | -------------------------------------------- | --------------------- | ------------------- | ------------------------------------------------------------------------------------------ |
| HiDream-I1 Fast      | `hidream-i1-fast`                            | `1024x1024`           | 0,0034 $            | La versione veloce di HiDream I1, per immagini frequenti a basso costo.                    |
| Stable Diffusion XL  | `fast-sdxl`                                  | `1024x1024`           | 0,0051 $            | Il modello SDXL su cui si basano molti dei modelli di immagini locali di Layla.            |
| WAI Illustrious SDXL | `wai-illustrious-sdxl`                       | `1024x1024`           | 0,0051 $            | Un modello SDXL anime, adatto ai personaggi anime e ai giochi di ruolo IA.                 |
| FLUX.3 Image Klein   | `blackforestlabs/flux-3/klein/text-to-image` | `1024x1024`           | 0,009 $             | Un modello FLUX veloce di Black Forest Labs. Dimensioni fino a `4096x4096`.                |
| FLUX.2 [klein] 9B    | `flux-2-klein-9b`                            | `1024*1024`           | 0,01 $              | Nota il `*` nei nomi delle dimensioni.                                                     |
| HiDream I1 Full      | `hidream`                                    | `1024x1024`           | 0,0153 $            | Il modello usato da questo Agente come predefinito. Stesso prezzo per ogni dimensione.     |
| Seedream 5.5         | `bytedance/seedream-v5.5`                    | `1k`                  | 0,02 $              | Il modello di ByteDance. `2k` costa 0,035 $.                                               |
| Qwen Image 3         | `qwen-image-3`                               | `1k`                  | 0,03 $              | Accetta `1k` e `2k`.                                                                       |
| GPT Image 2.6 Flare  | `gpt-image-2.6-flare`                        | `1k`                  | circa 0,09 $        | Il modello di OpenAI, addebitato in base all'uso, quindi il prezzo varia a ogni richiesta. |

Prezzi e modelli cambiano spesso, quindi controlla il catalogo prima di scegliere. Puoi cambiare modello in qualsiasi momento modificando due righe del codice, come descritto in [Le impostazioni in cima](#le-impostazioni-in-cima).

Per un'immagine verticale che riempia lo schermo del telefono, scegli una dimensione verticale dall'elenco del modello, come `768x1360` o `832x1248` per HiDream.

## Passaggio 1: disattivare la generazione di immagini predefinita di Layla

Apri le _Impostazioni di inferenza_, scorri fino alla sezione _Generazione di immagini_ e seleziona il modello di generazione di immagini. Nell'elenco _Select Model_ scegli **No Image Generation** (nessuna generazione di immagini).

![La schermata Impostazioni di inferenza con l'elenco Select Model aperto e No Image Generation selezionato.](./no-img-gen-settings.jpg)

La generazione di immagini integrata di Layla legge lo stesso tag `<stable_diffusion_prompt>` dalla risposta di un personaggio. Se un modello è ancora selezionato, Layla genera una propria immagine a partire dal tag e ricevi due immagini. Con _No Image Generation_ selezionato, il tag resta a disposizione dell'Agente. [Come attivare la generazione di immagini in Layla](/it/how-to-enable-image-generation-in-layla/) mostra dove si trova questa impostazione.

Se usi già l'[Agente OpenRouter](/it/how-to-use-the-openrouter-image-generation-agent/), l'[Agente Nano Banana](/it/how-to-use-the-google-nano-banana-image-generation-agent/) o un altro Agente che reagisce a `<stable_diffusion_prompt>`, disattivalo per lo stesso motivo.

## Passaggio 2: creare un nuovo Agente

Apri la mini-app _Agenti_. Il modo più rapido per iniziare un nuovo Agente è copiarne uno esistente e sostituirne il contenuto:

1. Sulla scheda di un Agente qualsiasi, seleziona **More**, poi **Duplicate**.
2. Sulla copia, seleziona **Edit**. Si apre la schermata _Edit Agent_ con i dettagli dell'Agente, i suoi attivatori e il suo flusso di strumenti.
3. Rimuovi gli attivatori esistenti della copia con l'icona del cestino su ciascuno, e rimuovi ciascuno dei suoi strumenti con **Remove tool**, così parti da un Agente vuoto.

Se preferisci saltare i passaggi di costruzione, scarica il file dell'Agente da questo articolo e usa invece il pulsante **Import** in alto nella mini-app _Agenti_. Poi prosegui dal [Passaggio 7](#passaggio-7-aggiungere-la-tua-chiave-api). Un Agente importato parte disattivato, quindi attiva l'interruttore sulla sua scheda.

## Passaggio 3: dare un nome all'Agente e aggiungere il prompt di sistema

Compila i tre campi in alto nella schermata _Edit Agent_:

- **Name**: `NanoGPT Image Generation (JS)`, o un qualsiasi nome che riconoscerai.
- **Description**: una frase per tuo riferimento, ad esempio "Genera immagini con l'API di immagini NanoGPT a partire dal prompt che l'IA scrive in un tag stable_diffusion_prompt."
- **System Prompt**: incolla il testo qui sotto.

```text
{{char}} can create images. Whenever {{user}} asks to see, draw, paint, picture or imagine something, or a visual would help the conversation, {{char}} writes an image prompt inside <stable_diffusion_prompt></stable_diffusion_prompt> tags. The image is then generated and shown in the chat automatically, so {{char}} never says it cannot create images and never describes the image as already visible before it is generated.

Rules for the tag:
- Use at most one <stable_diffusion_prompt> tag per reply, and place it at the end of the reply.
- Write the prompt in English as a comma-separated list of descriptive phrases: subject first, then appearance, clothing, pose and action, setting and background, lighting, camera angle and framing, art style or medium, and quality words.
- Be concrete and visual. Name colours, materials, time of day and mood. Do not use names the image model would not know; describe the person or thing instead.
- When the image shows {{char}} or {{user}}, describe their appearance in full inside the prompt every time.
- Keep the prompt on a single line, under 75 words, with no quotation marks, backticks or other tags inside it.

Example:
Here is the lighthouse I told you about.
<stable_diffusion_prompt>old stone lighthouse on a rocky cliff, stormy sea crashing below, dramatic overcast sky, warm light glowing from the lantern room, seagulls, wide angle, cinematic lighting, highly detailed digital painting</stable_diffusion_prompt>
```

Il prompt è scritto in inglese, come nel file dell'Agente. [Come funziona il prompt di sistema](#1-il-prompt-di-sistema), più avanti, ne spiega ogni parte.

## Passaggio 4: aggiungere l'attivatore

Sotto _Triggers_, aggiungi un attivatore e scegli **Regex** dall'elenco dei tipi di attivatore. Configuralo così:

- **Regex**: incolla questo schema.

  ```text
  /<stable_diffusion_prompt>(.*?)</stable_diffusion_prompt>/s
  ```

- **Match on agent output**: attiva questa opzione. L'attivatore controlla così le risposte del tuo personaggio invece dei tuoi messaggi.
- **Group**: lascialo su _ANY OF THESE_ (OR). Con un solo attivatore, il gruppo non fa differenza.

## Passaggio 5: aggiungere lo strumento Eval

Sotto _Tools flow_, seleziona **Add tool** e scegli **Eval**. Lascia _Input mode_ su **Fixed inputs** e incolla questo codice nel campo `code`:

```js
(async () => {
  // ---- configure these ----
  const API_KEY = "YOUR_NANOGPT_API_KEY"; // https://nano-gpt.com/api
  const MODEL = "hidream"; // any id from GET https://api.nano-gpt.com/api/v1/images/models
  const SIZE = "1024x1024";
  // --------------------------

  const PROMPT = String.raw`{{match$1}}`.trim();
  const ENDPOINT = "https://api.nano-gpt.com/v1/images/generations";

  if (!PROMPT) throw new Error("The <stable_diffusion_prompt> tag was empty.");
  if (!API_KEY || API_KEY.startsWith("YOUR_"))
    throw new Error("Set API_KEY in the NanoGPT Image Generation (JS) agent.");

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      prompt: PROMPT,
      n: 1,
      size: SIZE,
      response_format: "b64_json",
    }),
  });
  const text = await response.text();
  if (!response.ok)
    throw new Error(
      `nano-gpt returned HTTP ${response.status}: ${text.slice(0, 500)}`,
    );

  const item = (JSON.parse(text).data || [])[0];
  if (!item)
    throw new Error(`nano-gpt returned no image: ${text.slice(0, 500)}`);

  let base64;
  if (item.b64_json) {
    base64 = item.b64_json.replace(/^data:[^,]*,/, "");
  } else if (item.url) {
    // nano-gpt may answer with a link instead of base64; download it and encode it ourselves.
    const download = await fetch(item.url);
    if (!download.ok)
      throw new Error(`Image download failed: HTTP ${download.status}`);
    base64 = (await download.bytes()).toBase64();
  } else {
    throw new Error(
      `nano-gpt response had no b64_json or url: ${text.slice(0, 500)}`,
    );
  }

  const ext = base64.startsWith("/9j/")
    ? "jpg"
    : base64.startsWith("UklGR")
      ? "webp"
      : "png";
  const filename = `nanogpt_${Date.now()}.${ext}`;

  // Saved in the character workspace, the folder display-image resolves relative paths against.
  await layla.utils.saveFile(filename, base64);

  // The result is the next tool's input: display-image reads it as the image path.
  return filename;
})();
```

_Fixed inputs_ significa che il codice viene eseguito esattamente come è scritto. L'altra modalità, _AI decides_, chiederebbe al modello linguistico di scrivere da sé l'input dello strumento, il che non serve a questo Agente.

## Passaggio 6: aggiungere lo strumento Display Image

Seleziona di nuovo **Add tool** e scegli **Display Image**. Compare sotto _Eval_ nel flusso degli strumenti, quindi viene eseguito per secondo. Imposta il suo campo `imagePath` su:

```text
{{input}}
```

Seleziona **Save changes**. Tornato all'elenco degli Agenti, assicurati che l'interruttore sulla scheda dell'Agente sia attivo.

## Passaggio 7: aggiungere la tua chiave API

Apri l'Agente con **Edit** e trova questa riga vicino all'inizio del codice di _Eval_:

```js
const API_KEY = "YOUR_NANOGPT_API_KEY";
```

Sostituisci `YOUR_NANOGPT_API_KEY` con la tua chiave, mantenendo le virgolette. Se hai scelto un altro modello o un'altra dimensione, modifica `MODEL` e `SIZE` nelle due righe successive. Salva l'Agente.

La tua chiave è ora memorizzata all'interno dell'Agente. Prima di condividere l'Agente, o di esportarlo con **Share**, rimetti il segnaposto al posto della chiave.

## Passaggio 8: provare l'Agente

Seleziona **Test** sulla scheda dell'Agente. Nella schermata di test:

1. Attiva **Test as output**. L'attivatore dell'Agente guarda solo le risposte del personaggio, quindi anche l'input di test deve essere trattato come una risposta.
2. Inserisci una risposta che contenga il tag, ad esempio:

   ```text
   <stable_diffusion_prompt>red fox curled up in fresh snow, soft morning light, shallow depth of field, wildlife photograph</stable_diffusion_prompt>
   ```

3. Avvia il test.

L'elenco _Activity_ mostra lo stato di ogni strumento durante l'esecuzione. Un test riuscito invia una vera richiesta a NanoGPT, che costa un'immagine, ed entrambi gli strumenti terminano senza errori. Se lo script si interrompe con un errore, il messaggio di errore compare nel passaggio _Eval_. [Risoluzione dei problemi](#risoluzione-dei-problemi) elenca quelli più comuni. [Analisi approfondita degli Agenti Layla](/it/deep-dive-into-layla-agents/) spiega più in dettaglio la schermata di test.

Il test non inserisce l'immagine in una chat. Una volta superato il test, prova l'Agente in una conversazione vera.

## Passaggio 9: chiedere un'immagine in chat

Avvia una chat e chiedi un'immagine, ad esempio "mostrami un faro su una scogliera al crepuscolo". Il personaggio risponde con un prompt dell'immagine alla fine del suo messaggio, l'Agente si avvia e dopo alcuni secondi l'immagine compare nella chat.

## Come funziona il codice dell'Agente di immagini NanoGPT

Questa sezione segue l'Agente attraverso ciascuna delle parti che hai costruito e spiega perché è scritto in questo modo. [Analisi approfondita degli Agenti Layla](/it/deep-dive-into-layla-agents/) tratta gli stessi elementi in generale.

### 1. Il prompt di sistema

Il prompt di sistema di un Agente viene aggiunto al prompt di sistema del tuo personaggio a ogni turno mentre l'Agente è attivo, che l'Agente venga eseguito o meno. Prima che il prompt raggiunga il modello, Layla sostituisce `{{char}}` con il nome del tuo personaggio e `{{user}}` con il tuo.

Ogni parte del prompt ha un compito:

- **"{{char}} can create images."** ({{char}} può creare immagini.) Molti modelli linguistici sono addestrati a dire che non possono creare immagini. Dichiarare questa capacità, e aggiungere "never says it cannot create images" (non dice mai di non poter creare immagini), impedisce al personaggio di rifiutarsi.
- **"Whenever {{user}} asks to see, draw, paint, picture or imagine something, or a visual would help the conversation"** (ogni volta che {{user}} chiede di vedere, disegnare, dipingere, raffigurare o immaginare qualcosa, o quando un'immagine aiuterebbe la conversazione) decide quando compaiono le immagini. L'ultima parte permette al personaggio di inviare un'immagine senza che tu la chieda. Ogni immagine costa denaro, quindi rimuovi "or a visual would help the conversation" se vuoi immagini solo su richiesta.
- **"Never describes the image as already visible before it is generated"** (non descrive mai l'immagine come già visibile prima che sia generata) evita risposte come "Come vedi nell'immagine…", che suonerebbero strane mentre l'immagine è ancora in preparazione.
- **"At most one tag per reply, at the end"** (al massimo un tag per risposta, alla fine) è importante perché l'attivatore legge solo il primo tag di una risposta. Un secondo tag verrebbe ignorato, e un tag alla fine tiene l'immagine accanto al testo che la introduce.
- **"A comma-separated list of descriptive phrases"** (un elenco di frasi descrittive separate da virgole) e l'ordine che indica (soggetto, aspetto, posa, ambientazione, illuminazione, inquadratura, stile) sono lo stile di prompt a cui modelli di immagini come HiDream e Stable Diffusion rispondono meglio.
- **"Do not use names the image model would not know"** (non usare nomi che il modello di immagini non conoscerebbe) è presente perché un modello di immagini non ha mai sentito parlare del tuo personaggio. "Una donna con capelli rossi corti e occhi verdi" produce un risultato coerente, un nome no.
- **"Describe their appearance in full inside the prompt every time"** (descrivi ogni volta il loro aspetto per intero nel prompt) deriva dallo stesso fatto. Il modello di immagini vede solo questo prompt, non la conversazione, quindi ogni prompt deve contenere la descrizione completa.
- **"Single line, under 75 words, with no quotation marks, backticks or other tags"** (una sola riga, meno di 75 parole, senza virgolette, apici inversi o altri tag) protegge lo script. Un apice inverso all'interno del prompt romperebbe il codice, come spiegato in [Le impostazioni in cima](#le-impostazioni-in-cima). Il limite di parole mantiene i prompt brevi e mirati, il che si adatta ai modelli di immagini più vecchi: il codificatore di testo di Stable Diffusion legge solo 75 token alla volta, che sono meno di 75 parole.
- **L'esempio** mostra il formato esatto. I modelli linguistici seguono un esempio in modo più affidabile della descrizione di un formato.

### 2. L'attivatore

L'attivatore è un attivatore _Regex_ con _Match on agent output_ attivo, quindi controlla ogni risposta completa del personaggio. Il suo schema è:

```text
/<stable_diffusion_prompt>(.*?)</stable_diffusion_prompt>/s
```

- Layla legge come schema il testo tra la prima `/` e l'ultima `/`, e come flag le lettere dopo l'ultima `/`. La `/` all'interno del tag di chiusura fa parte dello schema, quindi non serve farne l'escape.
- I tag di apertura e di chiusura corrispondono ai tag letterali nella risposta.
- `(.*?)` è un gruppo di cattura. Raccoglie tutto ciò che si trova tra i tag. Il `?` lo fa fermare al primo tag di chiusura invece che all'ultimo.
- Il flag `s` permette a `.` di corrispondere anche alle interruzioni di riga, così l'attivatore funziona anche se il modello divide il prompt su più righe.

Quando lo schema corrisponde, l'intera corrispondenza diventa `{{match$0}}` e il testo catturato dal gruppo diventa `{{match$1}}`. Il codice di _Eval_ usa `{{match$1}}`, cioè solo il prompt senza i tag.

L'attivatore legge la risposta senza gli eventuali blocchi di ragionamento, quindi un modello di ragionamento che scrive il tag mentre sta ancora ragionando non avvia l'Agente. Conta solo il tag nella risposta visibile.

### 3. Lo strumento Eval: chiamare l'API di immagini NanoGPT

_Eval_ esegue JavaScript in un ambiente QuickJS isolato all'interno di Layla. Per ogni esecuzione viene creato un nuovo ambiente, che viene poi rimosso. Non ha una pagina web né moduli Node.js, ma fornisce ciò di cui questo Agente ha bisogno:

- `fetch` per le richieste web, con risposte che supportano `.text()`, `.json()`, `.bytes()` e `.arrayBuffer()`.
- `atob`, `btoa` e `toBase64()` sugli array di byte, per il testo base64.
- `setTimeout` e `AbortController`.
- Un oggetto globale chiamato `layla`, che dà agli script accesso alle funzioni di Layla, come il salvataggio di file.

_Eval_ restituisce il valore dell'ultima espressione dello script. Se quel valore è una promise, _Eval_ attende prima che si concluda. Ciò che restituisce diventa l'input dello strumento successivo.

#### Il wrapper async

```js
(async () => {
  // ...
})();
```

L'intero script si trova all'interno di una funzione freccia asincrona che si richiama subito. Questo schema fa due cose. Permette al codice di usare `await` per attendere la rete, e gli permette di usare `return` per restituire il risultato. La chiamata della funzione è l'ultima espressione dello script, quindi _Eval_ attende la promise che restituisce e usa il suo risultato, il nome del file, come output dello strumento.

#### Le impostazioni in cima

```js
const API_KEY = "YOUR_NANOGPT_API_KEY"; // https://nano-gpt.com/api
const MODEL = "hidream"; // any id from GET https://api.nano-gpt.com/api/v1/images/models
const SIZE = "1024x1024";

const PROMPT = String.raw`{{match$1}}`.trim();
const ENDPOINT = "https://api.nano-gpt.com/v1/images/generations";
```

Tutto ciò che potresti voler cambiare si trova in un unico posto:

- `API_KEY` è la tua chiave NanoGPT.
- `MODEL` è l'`id` del modello nel catalogo di NanoGPT.
- `SIZE` è una delle dimensioni dell'elenco `supported_parameters.resolutions` del modello, scritta esattamente come la scrive il catalogo.
- `ENDPOINT` è l'indirizzo di generazione di immagini di NanoGPT compatibile con OpenAI. È lo stesso per ogni modello. Poiché segue il formato dell'API di immagini di OpenAI, lo stesso codice funziona con altri servizi che offrono un endpoint `images/generations` compatibile con OpenAI, dopo aver cambiato indirizzo e chiave.

`PROMPT` merita un'analisi più attenta. Prima dell'esecuzione del codice, Layla sostituisce `{{match$1}}` con il testo catturato dall'attivatore, così il prompt dell'immagine diventa parte del programma stesso. Layla incolla il testo esattamente com'è, senza fare l'escape di alcun carattere. Per questo il prompt è racchiuso in un template literal, il testo tra gli apici inversi:

- Un template literal può contenere virgolette e interruzioni di riga, che chiuderebbero in anticipo una normale stringa `"…"` e romperebbero lo script.
- `String.raw` mantiene le barre inverse esattamente come scritte, invece di leggerle come sequenze di escape come `\n`.
- `.trim()` rimuove spazi e interruzioni di riga all'inizio e alla fine del prompt.

Un template literal termina comunque a un apice inverso, e `${` al suo interno avvia un frammento di codice. Uno qualsiasi dei due nel prompt romperebbe lo script, ed è per questo che il prompt di sistema vieta gli apici inversi.

#### Controllare gli input

```js
if (!PROMPT) throw new Error("The <stable_diffusion_prompt> tag was empty.");
if (!API_KEY || API_KEY.startsWith("YOUR_"))
  throw new Error("Set API_KEY in the NanoGPT Image Generation (JS) agent.");
```

Lo script si interrompe subito, con un messaggio leggibile, quando il tag era vuoto o la chiave non è stata impostata. Non ha senso pagare per una richiesta che non può funzionare.

Quando uno script _Eval_ genera un errore, l'Agente si ferma e _Display Image_ non viene eseguito. Layla restituisce il messaggio di errore al modello linguistico, quindi in una chat il tuo personaggio potrebbe dirti che qualcosa è andato storto. Nella schermata di test, il messaggio compare nel passaggio _Eval_.

#### Inviare la richiesta

```js
const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: MODEL,
    prompt: PROMPT,
    n: 1,
    size: SIZE,
    response_format: "b64_json",
  }),
});
const text = await response.text();
```

Questa è la parte che comunica con NanoGPT:

- `fetch` invia una richiesta `POST` all'endpoint, e `await` attende la risposta.
- L'intestazione `Authorization` trasporta la chiave API come bearer token, il formato che NanoGPT si aspetta. La chiave non fa parte dell'indirizzo web.
- L'intestazione `Content-Type` dice a NanoGPT che il corpo è in JSON.
- `JSON.stringify` trasforma i dati della richiesta in testo JSON. `model`, `prompt` e `size` vengono dalle impostazioni. `n: 1` chiede un'immagine. `response_format: "b64_json"` chiede a NanoGPT di inviare l'immagine stessa, come testo base64, invece di un link.
- `response.text()` legge l'intera risposta come testo. Lo script la legge come testo invece di chiamare subito `response.json()`, così può includere la risposta grezza in un messaggio di errore se qualcosa va storto.

La [documentazione sulla generazione di immagini](https://docs.nano-gpt.com/api-reference/endpoint/image-generation-openai) di NanoGPT elenca altri campi che puoi aggiungere al corpo. Alcuni di essi, come `seed`, `guidance_scale` e `num_inference_steps`, funzionano solo con certi modelli.

#### Controllare lo stato della risposta

```js
if (!response.ok)
  throw new Error(
    `nano-gpt returned HTTP ${response.status}: ${text.slice(0, 500)}`,
  );
```

`response.ok` è vero quando lo stato HTTP è nell'intervallo 200, il che significa che la richiesta è riuscita. Altrimenti lo script si interrompe e include nell'errore il codice di stato e i primi 500 caratteri della risposta di NanoGPT. NanoGPT spiega il problema in quella risposta, quindi una chiave sbagliata, un saldo esaurito o una dimensione non accettata dal modello compaiono come messaggio chiaro nella schermata di test.

#### Trovare l'immagine nella risposta

```js
const item = (JSON.parse(text).data || [])[0];
if (!item) throw new Error(`nano-gpt returned no image: ${text.slice(0, 500)}`);
```

Una risposta riuscita di NanoGPT ha questo aspetto:

```json
{
  "created": 1795351940,
  "data": [{ "b64_json": "iVBORw0KGgo..." }],
  "cost": 0.0153,
  "remainingBalance": 4.9847
}
```

`JSON.parse` trasforma il testo in un oggetto. `data` è l'elenco delle immagini, e `[0]` prende la prima. La parte `|| []` usa un elenco vuoto quando `data` manca, così lo script segnala "nessuna immagine" invece di bloccarsi. La risposta indica anche quanto è costata l'immagine e quanto saldo ti resta.

#### Ottenere l'immagine in base64

```js
let base64;
if (item.b64_json) {
  base64 = item.b64_json.replace(/^data:[^,]*,/, "");
} else if (item.url) {
  const download = await fetch(item.url);
  if (!download.ok)
    throw new Error(`Image download failed: HTTP ${download.status}`);
  base64 = (await download.bytes()).toBase64();
} else {
  throw new Error(
    `nano-gpt response had no b64_json or url: ${text.slice(0, 500)}`,
  );
}
```

Base64 è un modo di scrivere dati binari, come un'immagine, con semplici lettere e cifre. La funzione di salvataggio dei file di Layla si aspetta testo base64, quindi questo blocco fa in modo che lo script ottenga testo base64, qualunque sia la forma usata da NanoGPT:

- **`b64_json`**: il caso normale, perché la richiesta lo ha chiesto. La chiamata `replace` rimuove un eventuale prefisso `data:image/png;base64,`, perché il file deve contenere solo i dati base64. Quando non c'è alcun prefisso, `replace` non cambia nulla.
- **`url`**: NanoGPT può rispondere invece con un link, per alcuni modelli o quando non può inviare base64. Lo script scarica l'immagine con un secondo `fetch`, la legge come byte grezzi con `.bytes()` e converte i byte in base64 con `.toBase64()`. I link di NanoGPT scadono dopo circa un giorno, ed è per questo che lo script salva una copia invece di memorizzare il link.
- **Nessuno dei due**: lo script si interrompe con un errore che mostra cosa ha inviato NanoGPT.

#### Scegliere un nome di file

```js
const ext = base64.startsWith("/9j/")
  ? "jpg"
  : base64.startsWith("UklGR")
    ? "webp"
    : "png";
const filename = `nanogpt_${Date.now()}.${ext}`;
```

Modelli diversi restituiscono formati di immagine diversi, e la risposta di NanoGPT non sempre dice quale ha inviato. Lo script lo ricava dai primi caratteri del testo base64. Ogni formato di immagine inizia con una firma fissa, e quella firma si codifica sempre negli stessi caratteri base64:

- `/9j/` è l'inizio di un file JPEG.
- `UklGR` è l'inizio di un file WebP.
- Tutto il resto viene salvato come PNG, il formato più comune. Un file PNG si codifica in `iVBOR`.

`Date.now()` aggiunge l'ora corrente in millisecondi, così ogni immagine ha un proprio nome di file e una nuova immagine non sostituisce mai una precedente nella cronologia della chat.

#### Salvare il file e restituirne il nome

```js
await layla.utils.saveFile(filename, base64);
return filename;
```

`layla.utils.saveFile` decodifica il testo base64 e scrive il file nella cartella di lavoro del personaggio, una cartella privata che appartiene al personaggio con cui stai chattando. Il percorso è relativo a quella cartella.

Lo script restituisce poi il nome del file. Quel nome è l'output dello strumento _Eval_.

### 4. Lo strumento Display Image

Il secondo strumento è _Display Image_, e la sua unica impostazione è:

```text
{{input}}
```

`{{input}}` viene sostituito con l'output dello strumento precedente, cioè il nome del file restituito dallo script. _Display Image_ cerca quel nome prima nella cartella di lavoro del personaggio, dove lo script lo ha salvato. Copia il file nell'archivio delle immagini della chat di Layla e lo allega alla risposta del personaggio, e l'immagine compare nella chat.

_Display Image_ non restituisce testo, quindi l'Agente termina senza altri messaggi una volta mostrata l'immagine. Al modello linguistico non viene chiesto di rispondere di nuovo.

## Personalizzare l'Agente: altri modelli, immagini per lo schermo del telefono e giochi di ruolo IA

Tutte queste modifiche partono dallo stesso Agente:

- **Usare un altro modello.** Cambia `MODEL` con l'`id` di un altro modello e `SIZE` con una delle sue dimensioni, poi prova di nuovo l'Agente. Per i personaggi anime, un modello SDXL anime come `wai-illustrious-sdxl` di solito è più adatto di un modello fotografico.
- **Creare immagini verticali per lo schermo del telefono.** Imposta `SIZE` su una dimensione verticale dall'elenco del tuo modello, come `768x1360` per HiDream o `1088x1920` per HiDream-I1 Fast.
- **Generare un'immagine dopo ogni messaggio.** Sostituisci il primo paragrafo del prompt di sistema con un'istruzione che chieda di terminare ogni risposta con un prompt dell'immagine della scena corrente, come in [Creare un Agente per la generazione di immagini](/it/creating-an-image-generation-agent/). È adatto ai giochi di ruolo IA e alla narrazione, ma ogni risposta costa allora un'immagine. Un modello economico come `hidream-i1-fast` mantiene basso il costo.
- **Mantenere coerenti le immagini del tuo personaggio IA.** Nello _Scenario_ del personaggio aggiungi un'istruzione come: "Ogni volta che scrivi uno `<stable_diffusion_prompt>`, descriviti come una donna sulla fine dei vent'anni con capelli rossi corti, occhi verdi e lentiggini." Il modello ripete così lo stesso aspetto in ogni prompt. Aiuta anche aggiungere alla stessa istruzione uno stile artistico fisso, come "illustrazione ad acquerello".
- **Aggiungere impostazioni di generazione.** Per i modelli che le supportano, aggiungi campi come `seed: 42` all'oggetto all'interno di `JSON.stringify`. Un seed fisso fa sì che prompt ripetuti diano immagini simili.
- **Scrivere un Agente per un altro servizio.** Il prompt di sistema, l'attivatore e _Display Image_ restano uguali per qualsiasi servizio di immagini. Cambiano solo la richiesta e il modo in cui lo script trova l'immagine nella risposta. L'[Agente OpenRouter](/it/how-to-use-the-openrouter-image-generation-agent/) e l'[Agente Nano Banana](/it/how-to-use-the-google-nano-banana-image-generation-agent/) sono altri due esempi dello stesso schema.

Deve essere attivo un solo Agente di immagini alla volta, perché reagiscono tutti allo stesso tag.

## Risoluzione dei problemi

### Perché ho ricevuto due immagini?

La generazione di immagini integrata di Layla è ancora attiva, oppure è attivo un altro Agente che reagisce a `<stable_diffusion_prompt>`. Seleziona _No Image Generation_ nelle Impostazioni di inferenza e disattiva gli altri Agenti di immagini.

### L'Agente dice "Set API_KEY in the NanoGPT Image Generation (JS) agent."

Il segnaposto della chiave è ancora nel codice. Apri l'Agente, modifica il codice di _Eval_ e sostituisci `YOUR_NANOGPT_API_KEY` con la tua chiave.

### Perché la mia chiave API NanoGPT non funziona?

Quando NanoGPT rifiuta una richiesta, l'Agente si interrompe con un errore che inizia con "nano-gpt returned HTTP", seguito dal codice di stato e dalla spiegazione di NanoGPT. Le cause abituali sono:

- **Una chiave sbagliata o eliminata.** Copia di nuovo la chiave dalla [pagina API](https://nano-gpt.com/api), oppure creane una nuova.
- **Un saldo esaurito.** Aggiungi fondi nella [pagina Balance](https://nano-gpt.com/balance).
- **Una dimensione o un ID modello non accettati dal modello.** Controlla la voce del modello nel catalogo e copia esattamente `id` e una dimensione da `supported_parameters.resolutions`, facendo attenzione se usa `x`, `*` o un nome come `1k`.

### Il test dice che l'Agente non è stato attivato

Attiva **Test as output** e assicurati che l'input di test contenga sia il tag di apertura sia quello di chiusura.

### Il personaggio non invia mai un'immagine

Controlla che l'interruttore dell'Agente sia attivo, così il suo prompt di sistema viene aggiunto alla chat. I modelli locali più piccoli a volte dimenticano il tag. Di solito funziona chiedere in modo diretto, ad esempio "disegnami un'immagine di…". Se il personaggio scrive il tag ma non compare alcuna immagine, esegui il **Test** dell'Agente con la risposta esatta del personaggio per vedere quale passaggio fallisce.

### Un'immagine è stata rifiutata o è tornata vuota

Ogni azienda applica ai suoi modelli la propria politica sui contenuti. Un prompt rifiutato da un modello può funzionare con un altro. Lo script riporta la risposta inviata da NanoGPT, quindi la schermata di test mostra il motivo.

## Domande frequenti

### Come ottengo una chiave API NanoGPT?

Accedi su [nano-gpt.com](https://nano-gpt.com), aggiungi fondi nella pagina Balance, poi seleziona **API** nella barra laterale e seleziona **Create API key**. Usa l'icona a forma di occhio per mostrare la chiave o l'icona di copia per copiarla. Le chiavi NanoGPT iniziano con `sk-nano-`.

### Quanto costa la generazione di immagini NanoGPT?

Ogni modello ha un proprio prezzo, indicato nel catalogo di NanoGPT. Al momento della scrittura, HiDream I1 Full, il modello usato da questo Agente come predefinito, costa 0,0153 $ per immagine, e i modelli più economici costano meno di mezzo centesimo. Il tuo saldo NanoGPT mostra quanto hai speso, e ogni risposta dell'API include il costo di quell'immagine.

### Serve un abbonamento NanoGPT per la generazione di immagini?

No. NanoGPT funziona con un saldo prepagato, e ogni immagine viene pagata con quello. NanoGPT offre anche un abbonamento mensile facoltativo, e la sua [pagina dei prezzi](https://nano-gpt.com/pricing) elenca cosa include.

### Qual è l'endpoint dell'API di generazione di immagini NanoGPT?

L'endpoint compatibile con OpenAI è `https://api.nano-gpt.com/v1/images/generations`, chiamato con `POST` e con la tua chiave nell'intestazione `Authorization: Bearer`. Lo stesso endpoint serve tutti i modelli di immagini, e il campo `model` sceglie quale eseguire. Il catalogo dei modelli si trova su `https://api.nano-gpt.com/api/v1/images/models`.

### Posso usare questo Agente con un'altra API di generazione di immagini compatibile con OpenAI?

Di solito sì. Cambia `ENDPOINT` con l'indirizzo `images/generations` dell'altro servizio, `API_KEY` con la sua chiave, e `MODEL` e `SIZE` con valori che accetta. Lo script gestisce già entrambi i formati di risposta usati dalle API di immagini compatibili con OpenAI, `b64_json` e `url`.

### Quali modelli di immagini NanoGPT consentono contenuti per adulti?

Il catalogo di NanoGPT contrassegna ogni modello con un campo `capabilities.nsfw`. Al momento della scrittura, 37 dei suoi modelli da testo a immagine sono contrassegnati `true`, tra cui HiDream O1 Image, Qwen Image 3 Uncensored e diversi modelli SDXL anime e realistici come WAI Illustrious SDXL. Controlla questo campo per il modello che scegli prima di farci affidamento. I termini di servizio di NanoGPT si applicano comunque a ogni richiesta. Per una generazione di immagini senza alcun servizio esterno, usa i [modelli Stable Diffusion locali](/it/how-to-enable-image-generation-in-layla/) di Layla.

### Posso usare NanoGPT sia per la chat sia per le immagini?

Sì. NanoGPT offre modelli linguistici tramite un'API compatibile con OpenAI all'indirizzo `https://api.nano-gpt.com/api/v1`. Aggiungila in Layla con la stessa chiave, come descritto in [Come collegare Layla a qualsiasi API compatibile con OpenAI](/it/how-to-connect-layla-to-any-openai-compatible-api/), e questo Agente aggiunge le immagini.

### Esiste un'app NanoGPT per Android?

NanoGPT è un sito web e un'API. Layla è un'app Android che funziona con NanoGPT: può chattare con i modelli linguistici di NanoGPT tramite la sua connessione API compatibile con OpenAI, e generare immagini con i modelli di immagini di NanoGPT tramite questo Agente.

### Posso usare i miei personaggi di SillyTavern con la generazione di immagini NanoGPT?

Sì. SillyTavern ha una sorgente di immagini NanoGPT integrata, e questo Agente ti offre una configurazione simile in un'app di chat sul telefono. Layla importa le [schede personaggio TavernPNG](/it/how-to-import-tavernpng-characters-in-layla/), il formato usato da SillyTavern, e i [preset di SillyTavern](/it/how-to-use-sillytavern-presets-in-layla/), e questo Agente funziona con qualsiasi personaggio.

### Un chatbot IA può inviare immagini su Android?

Sì. Con questo Agente, un personaggio di Layla invia un'immagine ogni volta che la chiedi, oppure dopo ogni messaggio se lo configuri così. Layla può anche inviare immagini senza alcun servizio cloud, usando modelli Stable Diffusion che girano sul tuo telefono, come descritto in [Come attivare la generazione di immagini in Layla](/it/how-to-enable-image-generation-in-layla/).

### Mi serve la mini-app Interprete Python?

No. L'Agente usa lo strumento _Eval_, che esegue JavaScript all'interno di Layla stessa.

### Il mio prompt è privato?

Il prompt dell'immagine viene inviato a NanoGPT e all'azienda che gestisce il modello che hai scelto. L'[informativa sulla privacy](https://nano-gpt.com/legal/privacy-policy) di NanoGPT afferma che per impostazione predefinita non memorizza il contenuto dei prompt sui suoi server, ma la sua documentazione dice anche che le aziende che gestiscono i modelli di immagini possono conservare prompt e immagini secondo le proprie politiche. Se chatti con un modello locale, il resto della conversazione resta sul tuo dispositivo.

### Posso usare questo Agente senza connessione a Internet?

No. L'Agente chiama i server di NanoGPT. Per una generazione di immagini che avviene interamente sul tuo telefono, usa uno dei modelli locali descritti in [Come attivare la generazione di immagini in Layla](/it/how-to-enable-image-generation-in-layla/).

### Dove vengono salvate le immagini generate?

Lo script salva ogni immagine nella cartella di lavoro del personaggio, e _Display Image_ la copia nell'archivio delle immagini della chat di Layla, così l'immagine resta nella cronologia della chat.

## Conclusione

L'Agente NanoGPT usa gli stessi quattro elementi di qualsiasi Agente di generazione di immagini in Layla: un prompt di sistema che chiede un prompt dell'immagine racchiuso in un tag, un attivatore regex che lo cattura, un breve script che scambia il prompt con un'immagine, e _Display Image_ per mettere il risultato nella tua chat. Poiché NanoGPT offre oltre 200 modelli di immagini tramite un solo endpoint, lo stesso script dà ai tuoi personaggi IA immagini HiDream, FLUX, SDXL o GPT Image cambiando due righe.

Layla nasce come assistente IA offline per Android, e i suoi modelli locali restano la scelta per chat e generazione di immagini completamente private e offline. La generazione di immagini NanoGPT è un'opzione per quando vuoi un particolare modello online nelle tue chat e accetti la connessione e il costo per immagine.

## Scarica l'Agente

<div class="file-download">
  <div class="file-download-info">
    <span class="file-download-label">File dell&#x27;Agente</span>
    <span class="file-download-name">nanogpt-generate-image.json</span>
    <span class="file-download-hint">Usa il pulsante <em>Import</em> nella mini-app Agenti per importarlo, poi aggiungi la tua chiave API.</span>
  </div>
  <a class="file-download-button" href="/assets/articles/how-to-create-a-nanogpt-image-generation-agent-in-layla/nanogpt-generate-image.json" download="nanogpt-generate-image.json"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>Scarica</a>
</div>
