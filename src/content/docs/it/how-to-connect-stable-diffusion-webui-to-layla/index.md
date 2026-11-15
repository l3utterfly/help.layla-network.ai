---
title: "Stable Diffusion WebUI su Android: collegare AUTOMATIC1111 a Layla"
description: "Usa Stable Diffusion WebUI su Android. Collega AUTOMATIC1111 a Layla, attiva l'API, aggiungi un modello Web UI in Local Dream e modifica il modello JSON."
category: Image generation
order: 17
keywords:
  - Stable Diffusion WebUI Android
  - Stable Diffusion WebUI su Android
  - app Stable Diffusion Android
  - AUTOMATIC1111 Android
  - API AUTOMATIC1111
  - collegare Stable Diffusion WebUI allo smartphone
  - usare Stable Diffusion sullo smartphone
  - eseguire Stable Diffusion su Android
  - Stable Diffusion su rete locale
  - accesso remoto Stable Diffusion WebUI
  - stable-diffusion-webui --api
  - stable-diffusion-webui --listen
  - sdapi/v1/txt2img
  - corpo della richiesta txt2img
  - impostazioni API Stable Diffusion WebUI
  - Stable Diffusion SDXL su Android
  - Stable Diffusion LoRA
  - API Hires fix
  - generatore di immagini IA per Android
  - app per generare immagini con IA
  - app da testo a immagine
  - generazione di immagini Layla
  - Local Dream
lastUpdated: 2026-11-15
translationKey: how-to-connect-stable-diffusion-webui-to-layla
ai_translated: true
---

**Layla è un'app Android che funziona da client per AUTOMATIC1111 Stable Diffusion WebUI: lo smartphone invia il prompt tramite la tua rete alla WebUI sul tuo PC, e l'immagine viene calcolata dal PC.** Attivi l'API della WebUI, aggiungi un modello _Web UI_ nella mini-app Local Dream, e Layla costruisce ogni richiesta da un modello JSON che puoi modificare. L'immagine compare in Local Dream e nelle tue chat, come con qualsiasi altro modello di immagini di Layla.

AUTOMATIC1111 è un'interfaccia web per computer e non offre un'app Android propria. Questo collegamento è il modo di usare Stable Diffusion WebUI su Android: conservi checkpoint, LoRA ed estensioni già configurati nella WebUI e generi dallo smartphone. La guida spiega come avviare la WebUI con l'API attiva, come aggiungere il modello in Local Dream, il modello di richiesta con tutti i segnaposto, modelli pronti per SD 1.5, SDXL, LoRA e Hires fix e le soluzioni agli errori di connessione più comuni.

A differenza dei modelli di Layla sul dispositivo, questo metodo richiede che il PC sia acceso e raggiungibile dallo smartphone mentre generi. Il prompt e l'immagine viaggiano sulla tua rete locale fino al tuo computer, non verso un servizio online, quindi il collegamento non richiede l'accesso a Internet.

## Perché usare Stable Diffusion WebUI su Android con Layla?

Layla può anche eseguire Stable Diffusion direttamente sullo smartphone, quindi il collegamento alla WebUI è uno dei due modi per avere un generatore di immagini IA per Android in Layla. È adatto in questi casi:

- **Hai già una configurazione Stable Diffusion.** Checkpoint, LoRA, embedding ed estensioni come ControlNet o ADetailer restano sul PC e sono disponibili dallo smartphone.
- **Il tuo PC ha una scheda grafica più veloce dello smartphone.** Il calcolo avviene sul PC, quindi il processore dello smartphone non limita dimensione dell'immagine, numero di passaggi o modello.
- **Vuoi modelli che uno smartphone non può eseguire.** I grandi checkpoint SDXL e le estensioni pesanti girano su una GPU desktop senza alcuna conversione.
- **Non ci sono costi per immagine.** Generi con il tuo hardware, senza crediti e senza account.
- **Funziona in chat.** Un modello Web UI può essere il modello di immagini di Layla o di un singolo personaggio, così i tuoi personaggi possono inviarti immagini create dal tuo PC.

|                          | Modello sul dispositivo                                      | Collegamento Web UI                          |
| ------------------------ | ------------------------------------------------------------ | -------------------------------------------- |
| Dove nascono le immagini | Sul tuo smartphone                                           | Sul tuo PC                                   |
| PC e rete necessari      | No                                                           | Sì, il PC deve essere acceso e raggiungibile |
| Modelli                  | Modelli che Layla può importare ed eseguire sullo smartphone | Tutto ciò che la tua WebUI può caricare      |
| Impostazioni             | I controlli di Layla                                         | I controlli di Layla più un modello JSON     |

[Importare modelli di generazione immagini personalizzati in Layla](/it/how-to-import-custom-image-generation-models-into-layla/) tratta il metodo sul dispositivo, compresi checkpoint e LoRA di Civitai.

## Come Layla comunica con Stable Diffusion WebUI

La WebUI ha un'API HTTP separata dalla sua pagina nel browser. Layla ne usa una sola chiamata:

```text
Layla (phone)                         Stable Diffusion WebUI (PC)
  |  POST /sdapi/v1/txt2img               |
  |  JSON body built from your template -> |  renders the image
  |  <- JSON with "images": [base64]      |
  |  saves the first image, shows it      |
```

Quando tocchi **Generate**, Layla prende il tuo modello, sostituisce i segnaposto come `{prompt}` e `{steps}` con le impostazioni correnti e invia il risultato come corpo di una richiesta `POST` all'endpoint inserito. La WebUI risponde con l'immagine codificata in base64 in un elenco `images`. Layla decodifica la prima e la salva come normale file immagine. Se hai inserito una chiave API, Layla la invia in un'intestazione `Authorization: Bearer`.

Non viene inviato altro. Layla non cambia modello, non imposta un sampler e non sceglie una dimensione da sola. Tutto ciò che la WebUI deve sapere è nel modello.

## Cosa serve

- Un PC con [AUTOMATIC1111 Stable Diffusion WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui) installata e in grado di generare un'immagine nella sua pagina del browser. I fork che mantengono la stessa API, come Forge, di solito accettano le stesse richieste.
- Smartphone e PC sulla stessa rete, per esempio lo stesso Wi-Fi.
- Layla con la mini-app **Local Dream** installata. [Attivare la generazione d'immagini in Layla](/it/how-to-enable-image-generation-in-layla/) mostra come installarla, e [Attivare o disattivare le mini-app in Layla](/it/how-to-enable-disable-mini-apps-within-layla/) spiega dove si trovano le mini-app.

## Passaggio 1: attivare l'API di Stable Diffusion WebUI (--api e --listen)

L'API è disattivata per impostazione predefinita. Aggiungi l'argomento `--api` e aggiungi `--listen` perché la WebUI accetti connessioni da altri dispositivi e non solo dal PC stesso. Entrambi vanno nella riga `COMMANDLINE_ARGS` del file di avvio della WebUI, cioè `webui-user.bat` su Windows e `webui-user.sh` su Linux:

```text
set COMMANDLINE_ARGS=--api --listen
```

Se su quella riga ci sono già altri argomenti, aggiungi questi due invece di sostituirli. Avvia la WebUI con quel file. Per impostazione predefinita ascolta sulla porta `7860`.

Per verificare che l'API sia attiva, apri `http://localhost:7860/docs` in un browser sul PC. La pagina elenca le chiamate disponibili, tra cui `/sdapi/v1/txt2img`.

### Trovare l'indirizzo del PC e consentire la porta

Lo smartphone non può usare `localhost`, perché indicherebbe lo smartphone stesso. Gli serve l'indirizzo del PC sulla tua rete:

1. Su Windows apri un terminale ed esegui `ipconfig`. Cerca l'**indirizzo IPv4** della scheda Wi-Fi o Ethernet. Ha un aspetto come `192.168.1.50`.
2. Se Windows Defender Firewall chiede se consentire Python sulle reti private, consenti. Se non l'ha chiesto e in seguito lo smartphone non riesce a connettersi, aggiungi una regola in entrata per la porta TCP `7860`.
3. Sullo smartphone apri `http://192.168.1.50:7860` in un browser, con il tuo indirizzo. Se la pagina della WebUI si carica, lo smartphone raggiunge il PC e lo stesso indirizzo funzionerà in Layla.

Il tuo endpoint è quell'indirizzo seguito dal percorso txt2img, per esempio:

```text
http://192.168.1.50:7860/sdapi/v1/txt2img
```

La route si scrive `txt2img`. Le versioni precedenti di Layla mostravano `text2img` nel testo di esempio del campo Endpoint, ma la WebUI non ha una route con quel nome.

### Una nota su chiavi API e sicurezza

`--listen` rende la WebUI raggiungibile da ogni dispositivo della tua rete, e l'API non ha un accesso protetto a meno che tu non ne aggiunga uno. Usala su una rete di cui ti fidi e non inoltrare la porta `7860` a Internet.

L'opzione `--api-auth` della WebUI imposta nome utente e password, ma usa l'autenticazione HTTP Basic, mentre Layla invia la chiave API come token Bearer. Le due cose non coincidono: lascia quindi vuoto il campo **API Key** per una WebUI normale. Il campo serve per configurazioni in cui qualcosa davanti alla WebUI, come un reverse proxy, controlla un token Bearer.

## Passaggio 2: aggiungere la WebUI a Layla come modello Web UI in Local Dream

1. Apri la mini-app **Local Dream**.
2. Tocca **Add Model** in alto a destra. Si apre la schermata Add Image Model con tre schede: Safetensor, Zip e Web UI.
3. Seleziona la scheda **Web UI**.

![La scheda Web UI della schermata Add Image Model di Layla con i campi Name, Endpoint, API Key e Model per un'API Stable Diffusion compatibile con Automatic1111.](../../how-to-connect-stable-diffusion-webui-to-layla/connect-stable-diffusion-web-ui-api-layla.jpg)

4. Compila i campi:
   - **Name**: un'etichetta che riconoscerai, per esempio `PC SDXL`. È il nome mostrato nell'elenco dei modelli.
   - **Endpoint**: l'indirizzo completo del passaggio 1, per esempio `http://192.168.1.50:7860/sdapi/v1/txt2img`.
   - **API Key**: lascialo vuoto per una WebUI normale.
   - **Model**: vedi la nota qui sotto. Puoi lasciarlo vuoto.
5. Tocca **Save & Select**.

Name ed Endpoint sono obbligatori. Se uno dei due è vuoto, Layla chiede di indicare almeno un nome e un endpoint API.

Il modello viene salvato tra i tuoi modelli di immagini e selezionato subito. Non richiede download ed è pronto non appena la WebUI è in esecuzione. I nuovi modelli Web UI partono con 20 passaggi, scala CFG 7 e negative prompt vuoto; puoi cambiare tutti e tre i valori in Local Dream.

### Cosa fa il campo Model

La WebUI genera con il checkpoint che ha caricato. Nella versione attuale di Layla, il testo del campo **Model** viene salvato con il collegamento ma non viene aggiunto alla richiesta, quindi scrivervi il nome di un checkpoint non cambia il modello della WebUI. Per scegliere un checkpoint da Layla, inseriscilo nel modello di richiesta, come mostra il modello SDXL più sotto.

### Aggiungere un collegamento per ogni configurazione

Ogni modello Web UI conserva le proprie impostazioni, compreso il proprio modello di richiesta. Puoi aggiungere lo stesso endpoint più volte con nomi diversi, per esempio un collegamento per un checkpoint anime SD 1.5 e uno per un checkpoint fotografico SDXL, ciascuno con un modello che seleziona il checkpoint e la dimensione giusti. Passare dall'uno all'altro in Local Dream cambia quindi l'intera configurazione. Per cambiare in seguito nome, endpoint o chiave di un collegamento, apri l'elenco dei modelli e tocca l'icona a forma di matita sulla sua scheda.

## Passaggio 3: generare immagini Stable Diffusion dallo smartphone

Con il modello Web UI selezionato, Local Dream mostra gli stessi controlli degli altri modelli:

1. Inserisci un prompt e, se vuoi, un negative prompt.
2. Imposta **Steps**, **CFG Scale** e **Seed**. Un seed `-1` ne sceglie uno casuale.
3. Tocca **Generate**.

![I parametri di Local Dream in Layla: Size, Scheduler, Steps, CFG Scale, Seed, Auto Upscale e la sezione Advanced Settings.](../../how-to-connect-stable-diffusion-webui-to-layla/local-dream-image-generation-settings.jpg)

Lo smartphone attende mentre il PC calcola, quindi il tempo dipende dalla tua scheda grafica e dalle impostazioni, non dallo smartphone. L'anteprima di avanzamento non è disponibile per i modelli Web UI, perché la richiesta ritorna solo a immagine completata. Se **Auto Upscale** è attivo, Layla esegue l'upscaler sullo smartphone dopo l'arrivo dell'immagine.

Alcuni controlli non si applicano a un modello Web UI:

- **Size** offre una sola opzione, 512×512. Per un'altra dimensione imposta `width` e `height` nel modello, come descritto più sotto.
- **Scheduler** riguarda i modelli di Layla sul dispositivo. Non viene inviato alla WebUI. Per scegliere sampler o scheduler, impostali nel modello.
- **Da immagine a immagine** non è disponibile. Il collegamento Web UI di Layla chiama solo txt2img.

## Il modello di richiesta JSON dell'API Stable Diffusion WebUI

Il modello è il JSON che Layla invia alla WebUI. Seleziona un modello Web UI in Local Dream, apri **Advanced Settings** e scorri fino a **WEBUI API BODY TEMPLATE**. La casella di testo contiene l'intero corpo della richiesta e puoi modificarla liberamente. Layla salva la modifica automaticamente un attimo dopo che smetti di scrivere, e vale solo per quel modello.

**Reset All Settings**, in fondo ad Advanced Settings, riporta il modello al valore predefinito di Layla, insieme alle altre impostazioni di quel modello.

### Il modello predefinito

È il modello con cui parte ogni nuovo modello Web UI. Elenca quasi tutti i campi accettati dall'API txt2img:

```json
{
  "prompt": "{prompt}",
  "negative_prompt": "{negativePrompt}",
  "styles": [],
  "seed": {seed},
  "subseed": -1,
  "subseed_strength": 0,
  "seed_resize_from_h": -1,
  "seed_resize_from_w": -1,
  "sampler_name": "Euler A",
  "scheduler": "",
  "batch_size": 1,
  "n_iter": 1,
  "steps": {steps},
  "cfg_scale": {cfg},
  "width": {width},
  "height": {height},
  "restore_faces": true,
  "tiling": false,
  "do_not_save_samples": false,
  "do_not_save_grid": false,
  "eta": 0,
  "denoising_strength": 0,
  "s_min_uncond": 0,
  "s_churn": 0,
  "s_tmax": 0,
  "s_tmin": 0,
  "s_noise": 0,
  "override_settings": {},
  "override_settings_restore_afterwards": true,
  "refiner_checkpoint": "",
  "refiner_switch_at": 0,
  "disable_extra_networks": false,
  "firstpass_image": "",
  "comments": {},
  "enable_hr": false,
  "firstphase_width": 0,
  "firstphase_height": 0,
  "force_task_id": "",
  "sampler_index": "",
  "script_name": "",
  "script_args": [],
  "send_images": true,
  "save_images": false,
  "alwayson_scripts": {},
  "infotext": ""
}
```

Non ti serve tutto. Ogni campo omesso assume il valore predefinito della WebUI, quindi un modello breve è più facile da leggere e da mantenere. Le sezioni seguenti trattano prima i segnaposto e poi i campi che conviene di più modificare.

### I segnaposto

Sette segnaposto vengono sostituiti con le tue impostazioni a ogni generazione. Ogni altro testo del modello viene inviato così com'è.

| Segnaposto         | Sostituito con                                                                           | Come scriverlo                       |
| ------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------ |
| `{prompt}`         | Il tuo prompt, con il Prompt Prefix aggiunto davanti                                     | Tra virgolette: `"{prompt}"`         |
| `{negativePrompt}` | Il negative prompt                                                                       | Tra virgolette: `"{negativePrompt}"` |
| `{seed}`           | Il campo Seed. Se vale `-1` o `0`, Layla sceglie un numero casuale inferiore a 1.000.000 | Senza virgolette                     |
| `{steps}`          | Il campo Steps                                                                           | Senza virgolette                     |
| `{cfg}`            | Il campo CFG Scale                                                                       | Senza virgolette                     |
| `{width}`          | La larghezza selezionata, che per un modello Web UI è 512                                | Senza virgolette                     |
| `{height}`         | L'altezza selezionata, che per un modello Web UI è 512                                   | Senza virgolette                     |

Alcune regole derivano dal modo in cui Layla li compila:

- **Metti tra virgolette i segnaposto di testo, non i numeri.** Layla esegue l'escape di virgolette e a capo nel prompt perché non rompano il JSON, e si aspetta `{prompt}` e `{negativePrompt}` dentro una stringa. I segnaposto numerici diventano numeri semplici: `"steps": {steps}` è corretto, mentre `"steps": "{steps}"` invia i passaggi come testo.
- **Il risultato deve essere JSON valido.** Layla non lo controlla. Una virgola mancante o di troppo fa restituire alla WebUI un errore invece di un'immagine.
- **Ogni occorrenza viene sostituita.** Se scrivi `{prompt}` in due punti, entrambi vengono compilati.
- **Non esistono segnaposto `{scheduler}` o `{model}`.** Scrivi sampler, scheduler o checkpoint direttamente nel modello.

### Cosa fa Layla al prompt prima di tutto

Prima che il prompt arrivi in `{prompt}`, Layla lo prepara allo stile di Stable Diffusion, separato da virgole:

1. Il **Prompt Prefix** di Advanced Settings viene aggiunto davanti, seguito da una virgola.
2. L'intero prompt viene convertito in minuscolo.
3. Il testo viene diviso alle virgole e un tag che compare due volte viene mantenuto una sola volta.

Anche il negative prompt viene convertito in minuscolo. I pesi come `(detailed eyes:1.2)` passano invariati.

Il testo che scrivi direttamente nel modello non viene toccato. Conta per le LoRA, perché i nomi delle LoRA possono distinguere maiuscole e minuscole sul PC. Scrivi un tag come `<lora:MyStyle:0.8>` nel modello e non nella casella del prompt di Layla, e conserva le maiuscole. Il modello LoRA più sotto fa proprio questo.

### I campi che conviene modificare

| Campo                  | Cosa fa                                                                                                                                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `sampler_name`         | Il sampler. La WebUI si aspetta il nome esattamente come lo elenca, per esempio `Euler a`. Il valore predefinito di Layla è `Euler A`: se la WebUI segnala un sampler sconosciuto, copia il nome dal suo elenco **Sampling method**. |
| `scheduler`            | La pianificazione del rumore dalla WebUI 1.9, per esempio `Karras`. Una stringa vuota lascia il valore predefinito.                                                                                                                  |
| `restore_faces`        | Esegue un modello di ripristino dei volti sul risultato. Nel modello predefinito di Layla è `true`. Impostalo su `false` per checkpoint stilizzati o anime, dove può alterare l'aspetto dei volti.                                   |
| `width`, `height`      | La dimensione di output. Inserisci qui dei numeri per generare oltre 512×512. Usa dimensioni per cui il tuo checkpoint è stato addestrato, per esempio 1024 per SDXL.                                                                |
| `batch_size`, `n_iter` | Quante immagini crea la WebUI per richiesta. Layla usa solo la prima: lascia entrambi a `1`.                                                                                                                                         |
| `override_settings`    | Impostazioni applicate solo a questa richiesta. È il modo per scegliere il checkpoint.                                                                                                                                               |
| `enable_hr`            | Attiva Hires fix: un rendering piccolo, poi un ingrandimento con un secondo passaggio.                                                                                                                                               |
| `send_images`          | Deve restare `true`. Layla legge l'immagine dalla risposta.                                                                                                                                                                          |
| `save_images`          | Indica se la WebUI conserva anche una copia sul PC. Per impostazione predefinita è `false`.                                                                                                                                          |
| `alwayson_scripts`     | Argomenti per estensioni come ControlNet o ADetailer, se installate.                                                                                                                                                                 |

La [documentazione dell'API della WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API) descrive la richiesta, e la pagina `/docs` della tua WebUI elenca ogni campo accettato dalla versione installata.

## Modelli pronti all'uso

Copiane uno nella casella del modello e adattalo. Ognuno è JSON completo e valido.

### Modello: SD 1.5 minimo

Il modello più piccolo utile. La WebUI completa tutto ciò che non è elencato.

```json
{
  "prompt": "{prompt}",
  "negative_prompt": "{negativePrompt}",
  "seed": {seed},
  "steps": {steps},
  "cfg_scale": {cfg},
  "width": {width},
  "height": {height},
  "sampler_name": "Euler a",
  "restore_faces": false,
  "send_images": true,
  "save_images": false
}
```

### Modello: SDXL con un checkpoint scelto

SDXL genera a circa 1024×1024, quindi il modello imposta da sé la dimensione. Il blocco `override_settings` carica il checkpoint indicato per questa richiesta, e `override_settings_restore_afterwards` rimette poi il checkpoint precedente della WebUI.

```json
{
  "prompt": "{prompt}",
  "negative_prompt": "{negativePrompt}",
  "seed": {seed},
  "steps": {steps},
  "cfg_scale": {cfg},
  "width": 1024,
  "height": 1024,
  "sampler_name": "DPM++ 2M",
  "scheduler": "Karras",
  "restore_faces": false,
  "override_settings": {
    "sd_model_checkpoint": "your-sdxl-checkpoint.safetensors"
  },
  "override_settings_restore_afterwards": true,
  "send_images": true,
  "save_images": false
}
```

Sostituisci `your-sdxl-checkpoint.safetensors` con il nome del checkpoint come lo mostra la WebUI. La WebUI accetta anche il nome del file senza estensione. Se usi sempre lo stesso checkpoint, è più rapido caricarlo una volta nella WebUI e rimuovere `override_settings`: una richiesta che indica un checkpoint diverso da quello caricato costringe la WebUI a caricarlo prima, il che allunga ogni immagine.

### Modello: LoRA e tag di qualità fissi

Il testo scritto nel modello viene inviato esattamente come lo digiti. Usalo per un tag LoRA e per tag di qualità che vuoi sempre, e lascia la casella di Layla a ciò che cambia da un'immagine all'altra:

```json
{
  "prompt": "masterpiece, best quality, <lora:MyStyle:0.8>, {prompt}",
  "negative_prompt": "{negativePrompt}",
  "seed": {seed},
  "steps": {steps},
  "cfg_scale": {cfg},
  "width": {width},
  "height": {height},
  "sampler_name": "Euler a",
  "restore_faces": false,
  "send_images": true,
  "save_images": false
}
```

Qui `MyStyle` è il nome della LoRA nella WebUI. Il tag conserva le maiuscole e solo la parte `{prompt}` viene convertita in minuscolo.

### Modello: Hires fix

Hires fix genera alla dimensione di base, poi ingrandisce e rifinisce il risultato, ottenendo un'immagine più nitida senza i soggetti ripetuti che un primo passaggio molto grande può causare. Richiede un tempo sensibilmente maggiore.

```json
{
  "prompt": "{prompt}",
  "negative_prompt": "{negativePrompt}",
  "seed": {seed},
  "steps": {steps},
  "cfg_scale": {cfg},
  "width": {width},
  "height": {height},
  "sampler_name": "Euler a",
  "restore_faces": false,
  "enable_hr": true,
  "hr_scale": 2,
  "hr_upscaler": "Latent",
  "hr_second_pass_steps": 10,
  "denoising_strength": 0.5,
  "send_images": true,
  "save_images": false
}
```

Il modello predefinito di Layla imposta `denoising_strength` su `0`, il che va bene con Hires fix disattivato. Quando lo attivi, imposta un valore come `0.5`, altrimenti il secondo passaggio non cambierà nulla. Una base di 512×512 con `hr_scale` pari a `2` dà un'immagine di 1024×1024.

## Consigli per una configurazione affidabile

- **Prova prima nella WebUI.** Se una combinazione di checkpoint, sampler e dimensione funziona nella pagina della WebUI, gli stessi valori funzionano nel modello. La scheda **PNG Info** della WebUI mostra le impostazioni di un'immagine da essa creata.
- **Tieni il PC attivo.** Se il PC va in sospensione, lo smartphone riceve un errore di connessione. Disattiva la sospensione mentre generi.
- **Dai al PC un indirizzo fisso.** Se il router cambia l'indirizzo del PC, l'endpoint salvato smette di funzionare. Riserva un indirizzo per il PC nelle impostazioni del router, oppure modifica l'endpoint dall'elenco dei modelli quando cambia.
- **Usa il Prompt Prefix per le parole che vuoi sempre.** Viene aggiunto prima di ogni prompt e, come il resto del prompt, convertito in minuscolo. Per tutto ciò che distingue maiuscole e minuscole, mettilo invece nel modello.
- **Usa il collegamento anche in chat.** Una volta creato un modello Web UI, puoi impostarlo come modello di immagini di Layla o di un singolo personaggio. [Attivare la generazione d'immagini in Layla](/it/how-to-enable-image-generation-in-layla/) indica dove sceglierlo.

## Domande frequenti

### Come posso usare Stable Diffusion WebUI sul mio smartphone Android?

Avvia la WebUI su un PC con `--api --listen`, poi aggiungila nella mini-app Local Dream di Layla come modello **Web UI**, con l'indirizzo del PC seguito da `/sdapi/v1/txt2img`. Lo smartphone invia il prompt, il PC calcola l'immagine e Layla la mostra. Anche aprire la pagina della WebUI nel browser dello smartphone funziona, ma così usi la pagina propria della WebUI e non la chat e gli strumenti per le immagini di Layla.

### Esiste un'app AUTOMATIC1111 per Android?

AUTOMATIC1111 è un'interfaccia web che gira su un computer e non offre un'app Android. Layla fa da client Android: il suo modello Web UI invia richieste txt2img alla tua WebUI e mostra le immagini restituite, e i tuoi personaggi possono usare la WebUI anche in chat.

### Posso eseguire Stable Diffusion su Android senza PC?

Sì, ma non con un collegamento Web UI, che richiede una WebUI in esecuzione su un computer. Layla può eseguire Stable Diffusion sullo smartphone con i suoi modelli sul dispositivo, senza PC e senza connessione a Internet. [Attivare la generazione d'immagini in Layla](/it/how-to-enable-image-generation-in-layla/) li presenta.

### Come attivo l'API di Stable Diffusion WebUI?

Avvia la WebUI con l'argomento `--api`, normalmente aggiungendolo a `COMMANDLINE_ARGS` in `webui-user.bat` o `webui-user.sh`. Aggiungi anche `--listen` perché gli altri dispositivi della tua rete, come lo smartphone, possano raggiungerla. Puoi verificare che funzioni aprendo `/docs` all'indirizzo della WebUI.

### Qual è l'endpoint dell'API Stable Diffusion WebUI per Layla?

L'indirizzo della WebUI seguito da `/sdapi/v1/txt2img`, per esempio `http://192.168.1.50:7860/sdapi/v1/txt2img`. Usa l'indirizzo del PC sulla tua rete e non `localhost`, perché sullo smartphone `localhost` indica lo smartphone stesso.

### Posso accedere a Stable Diffusion WebUI dallo smartphone quando sono fuori casa?

Solo se lo smartphone riesce a raggiungere il PC. A casa basta lo stesso Wi-Fi, e i dati mobili non raggiungono il PC da soli. Fuori casa servirebbe una connessione privata alla rete domestica, come una VPN. Non esporre direttamente la WebUI a Internet, perché la sua API non ha un accesso protetto per impostazione predefinita. Per immagini fuori casa senza configurare nulla, i modelli di Layla sul dispositivo funzionano con i dati mobili o senza alcuna connessione.

### Layla funziona con Forge, reForge o SD.Next?

Layla invia solo una richiesta txt2img nel formato AUTOMATIC1111, quindi può funzionare qualsiasi server che accetti la stessa richiesta su `/sdapi/v1/txt2img`. I fork differiscono per i campi e i nomi dei sampler che accettano: controlla la pagina `/docs` del tuo e adatta il modello.

### Come uso SDXL, un altro checkpoint, una LoRA o un altro sampler con l'API della WebUI?

Modifica il modello. Aggiungi il checkpoint in `override_settings` come `"sd_model_checkpoint"`, scrivi il tag LoRA nella riga `prompt` e imposta `sampler_name` e `scheduler` su nomi che la WebUI elenca. Per un checkpoint SDXL imposta anche `width` e `height` intorno a 1024. I modelli qui sopra ne mostrano un esempio ciascuno.

### Come genero immagini più grandi?

Imposta `width` e `height` su numeri fissi nel modello. Un modello Web UI in Layla offre solo il pulsante di dimensione 512×512, che è il valore usato per `{width}` e `{height}`, quindi oltre quel limite la strada è inserire numeri fissi nel modello. Per i checkpoint SDXL usa circa 1024×1024. Per più dettagli con un checkpoint SD 1.5, attiva Hires fix.

### Perché la generazione fallisce con «Failed to generate image»?

Dopo questo testo Layla mostra il codice di stato e il messaggio della WebUI, che indicano cosa è andato storto. Un `404` di solito significa che l'API non è attiva o che il percorso dell'endpoint è scritto male: controlla `--api` e `txt2img`. Un `422` significa che la WebUI ha rifiutato il corpo della richiesta: un campo ha il tipo sbagliato, un nome è scritto male o il JSON non è valido. Un `500` significa che la WebUI ha avuto un errore durante il calcolo; la sua finestra della console sul PC ne mostra il motivo, per esempio un sampler sconosciuto o memoria esaurita.

### Perché il mio smartphone non riesce a connettersi a Stable Diffusion WebUI? (network request failed)

Lo smartphone non ha potuto raggiungere il PC. Controlla che la WebUI sia in esecuzione, che sia stata avviata con `--listen`, che smartphone e PC siano sulla stessa rete, che l'indirizzo IP nell'endpoint sia aggiornato e che il firewall consenta la porta `7860`. La prova più rapida è aprire l'indirizzo della WebUI nel browser dello smartphone.

### Perché Layla mostra «No images returned»?

La WebUI ha risposto con successo, ma la risposta non conteneva un elenco di immagini. Controlla che `send_images` sia `true` nel modello e che nulla in `alwayson_scripts` impedisca la restituzione dell'immagine.

### Perché la mia LoRA viene ignorata?

Layla converte il prompt in minuscolo, quindi un tag LoRA scritto nella casella del prompt può non corrispondere più a un nome con lettere maiuscole. Inserisci invece il tag nella riga `prompt` del modello, dove viene inviato così com'è, e verifica che il nome corrisponda a quello nella WebUI.

### La generazione di immagini tramite la WebUI è privata?

Il prompt e l'immagine vanno dal tuo smartphone al tuo PC sulla tua rete, e Layla non li invia a un servizio online. Nulla lascia la tua rete a meno che tu non configuri l'accesso remoto. Per una generazione che non richiede alcun PC, usa i modelli di Layla sul dispositivo, descritti in [Attivare la generazione d'immagini in Layla](/it/how-to-enable-image-generation-in-layla/).

### Posso usarlo in chat perché il mio personaggio invii immagini?

Sì. Un modello Web UI è un modello di immagini come gli altri. Selezionalo come modello di generazione immagini predefinito in Inference Settings, oppure sceglilo per un singolo personaggio nella scheda **Advanced** dell'editor dei personaggi. Il PC deve essere acceso e la WebUI avviata quando il personaggio genera un'immagine.

## Conclusione

Un modello Web UI ti permette di usare Stable Diffusion WebUI su Android: l'installazione AUTOMATIC1111 sul tuo PC diventa un generatore di immagini per Layla. La WebUI richiede `--api` e `--listen`, Local Dream richiede l'indirizzo del suo endpoint `txt2img`, e il modello di richiesta decide tutto il resto: checkpoint, sampler, dimensione, LoRA e Hires fix. Tenendo un modello breve per ogni configurazione, salvato come collegamenti separati, puoi passare dall'uno all'altro dall'elenco dei modelli.

Layla è pensato come assistente IA offline per Android, e i suoi modelli sul dispositivo restano il modo per eseguire Stable Diffusion sullo smartphone senza PC e senza rete. Il collegamento alla WebUI è per il caso in cui hai già una configurazione Stable Diffusion su un computer tuo e vuoi averla a disposizione nelle chat e in Local Dream.
