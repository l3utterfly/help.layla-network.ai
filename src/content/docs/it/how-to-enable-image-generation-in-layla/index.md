---
title: Attivare la generazione di immagini IA offline in Layla
description: Installa Local Dream per generare immagini offline su Android e iPhone. Scopri modelli, importazione, parametri e immagini dei personaggi in Layla.
category: Image generation
order: 10
keywords:
  - generazione immagini offline
  - generatore immagini IA Android
  - Stable Diffusion
  - modelli Civitai
  - importare safetensors
  - modelli immagini GGUF
  - LoRA
  - NPU Snapdragon
  - Local Dream
  - NPU Forge
  - testo-immagine
  - immagine-immagine
  - immagini dei personaggi
  - Stable Diffusion su iPhone
  - Layla
lastUpdated: 2026-11-04
translationKey: how-to-enable-image-generation-in-layla
ai_translated: true
---

**Layla genera immagini con IA offline su Android e iPhone. Installa la mini-app Local Dream per eseguire Stable Diffusion, SDXL, FLUX, Z-Image e altri modelli da testo a immagine direttamente sul telefono, senza Internet né account.** Prompt e immagini rimangono sul dispositivo e nessun servizio online esamina i risultati.

Questa panoramica spiega la generazione di immagini in Layla: installare Local Dream, scegliere o importare modelli, riconoscere le famiglie, regolare i parametri e impostare il modello usato da Layla e dai singoli personaggi in chat. Ogni sezione rimanda a una guida più dettagliata, quando disponibile.

## Perché generare immagini con IA sul telefono con Layla

- **Funziona offline.** Dopo il download del modello, Stable Diffusion funziona localmente senza Internet, anche in modalità aereo.
- **È privato.** Prompt e immagini non vengono inviati a server: nessun account, caricamento o controllo online.
- **Niente crediti o costi per immagine.** La generazione locale non ha limiti giornalieri; contano solo spazio e velocità del telefono.
- **Scegli il modello.** Usa quelli integrati, dai piccoli SD 1.5 a FLUX.2 Klein e Z-Image Turbo, oppure importa checkpoint e LoRA da [Civitai](https://civitai.com/).
- **Usa l'hardware IA.** Sui dispositivi Snapdragon compatibili, la NPU è generalmente molto più veloce della CPU.
- **È integrato nella chat.** I personaggi possono inviare immagini durante la conversazione con il modello che assegni loro.

## Tre modi per generare immagini in Layla

| Metodo                  | Dove vengono generate       | Connessione necessaria           | Costo                                           |
| ----------------------- | --------------------------- | -------------------------------- | ----------------------------------------------- |
| Sul dispositivo         | CPU, GPU o NPU del telefono | Solo per scaricare il modello    | Nessun costo per immagine                       |
| Layla Cloud             | Server di Layla             | Internet e accesso a Layla Cloud | Quota mensile secondo il piano                  |
| Stable Diffusion Web UI | PC sulla tua rete           | Rete locale                      | Nessun costo per immagine; il PC è a tuo carico |

La guida tratta soprattutto il primo metodo, che mantiene prompt e immagini interamente sul telefono. [Passare da un LLM locale a Layla Cloud](/it/how-to-switch-between-local-llm-and-layla-cloud/) spiega come alternare modelli locali e cloud.

## Installare Local Dream, la mini-app per immagini offline

Local Dream esegue la generazione sul dispositivo. È una funzione facoltativa e non è installata per impostazione predefinita.

1. Apri la schermata delle mini-app (**Browse Apps**) e cerca **Local Dream**. [Attivare o disattivare le mini-app](/it/how-to-enable-disable-mini-apps-within-layla/) spiega dove trovarle.
2. Apri la scheda e leggi la descrizione. Il download aggiuntivo è di circa 54 MB, piccolo rispetto a un modello.
3. Tocca **Download**.
4. Apri la mini-app. L'intestazione indica _On-device image generation_.

![Pagina Local Dream in Browse Apps con descrizione, download aggiuntivo di 54 MB e pulsante Download.](../../how-to-enable-image-generation-in-layla/install-local-dream-mini-app-layla.jpg)

Se un aggiornamento di Layla include un motore più recente, la mini-app richiede un aggiornamento. Aggiornala dalla schermata delle mini-app prima di generare o importare.

Disinstallare Local Dream elimina tutti i modelli d'immagini memorizzati al suo interno, anche quelli importati. Layla chiede prima conferma.

## Scegliere e scaricare un modello d'immagini

Tocca la scheda del modello o la freccia nella parte superiore di Local Dream per aprire **Select Model**.

![Select Model con ricerca, filtri Downloaded, CPU, NPU e Cloud, Tags e schede SD1.5 Base e DreamShaper.](../../how-to-enable-image-generation-in-layla/select-image-generation-model-local-dream.jpg)

- **Search** cerca il nome del modello.
- I **filtri** mostrano solo **Downloaded**, **CPU**, **NPU** o **Cloud**. **Tags** filtra lo stile, per esempio _realistic_, _anime_ o _sdxl_.
- Ogni scheda mostra un'icona di download, poi un segno di spunta quando il modello è sul telefono. Un badge indica CPU, NPU o cloud.

Scegli il modello e tocca **Download Model**. I file vanno da circa 1 GB per SD 1.5 a ben oltre 10 GB per i modelli NPU maggiori: usa il Wi-Fi e controlla lo spazio libero. Il modello resta sul telefono; **Delete Model** permette di liberare spazio in qualsiasi momento.

Layla legge le informazioni del chip. Se non rileva l'hardware richiesto, mostra un avviso sopra **Generate**. È solo informativo: puoi comunque provare il modello.

## Importare modelli Stable Diffusion personalizzati da Civitai

Se manca lo stile desiderato, importa i tuoi modelli. Due percorsi aprono la stessa schermata **Add Image Model**:

- In Local Dream, tocca **Add Model** in alto.
- Apri **Settings** → **Inference Settings**, scorri fino a **Image Generation** e tocca **Add Custom Model**.

![Add Image Model con schede Safetensor, Zip e Web UI, Base Model SD1.5 e selezione di checkpoint safetensors o GGUF.](../../how-to-enable-image-generation-in-layla/import-custom-image-model-safetensor-layla.jpg)

La schermata offre fino a tre schede:

- **Safetensor**: scegli un checkpoint `.safetensors`, per esempio da [Civitai](https://civitai.com/) o [Hugging Face](https://huggingface.co/), da convertire sul telefono. Android accetta anche modelli di diffusione `.gguf`. Scegli la famiglia di base e aggiungi eventuali LoRA.
- **Zip**: importa un modello già convertito e preparato per Layla.
- **Web UI**: collega AUTOMATIC1111 Stable Diffusion Web UI sul PC tramite l'indirizzo API.

Su iPhone, Safetensor accetta solo checkpoint SD 1.5. Sui telefoni con NPU Qualcomm compatibile compare anche un suggerimento per convertire il checkpoint e accelerare la generazione.

Consulta [Importare modelli personalizzati](/it/how-to-import-custom-image-generation-models-into-layla/) per tutti i dettagli e [Importare SD 1.5 da Civitai](/it/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/) per un esempio illustrato. Con Snapdragon compatibile, [NPU Forge](/it/how-to-convert-safetensors-to-qnn-with-npu-forge-in-layla/) converte SD 1.5 e SDXL per la NPU anziché la CPU.

## Modelli supportati: Stable Diffusion, SDXL, FLUX, Z-Image e altri

Layla raggruppa i modelli in base all'hardware che li esegue. Il badge sulla scheda indica il gruppo.

| Tipo                                    | Esempi integrati                                                                               | Esecuzione           | Piattaforme                    |
| --------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------- | ------------------------------ |
| SD 1.5 (CPU)                            | SD1.5 Base, DreamShaper, RealCartoon, Pastel-Mix                                               | CPU, GPU facoltativa | Android e iOS                  |
| SD 1.5 (NPU)                            | CyberRealistic, Realistic Vision Hyper, Reliberate, ToonYou                                    | NPU Snapdragon       | Android                        |
| SDXL (CPU)                              | SDXL Turbo, AnimeMix XL, IntoRealism                                                           | CPU                  | Android; IntoRealism anche iOS |
| SDXL (NPU)                              | Pony Realism V23, Illustrious V17, Nova Anime XL V10                                           | NPU Snapdragon       | Android                        |
| Transformer di diffusione recenti (NPU) | Z-Image Turbo, FLUX.2 Klein 4B e 9B, Qwen Image 2.1, Krea 2 Turbo, MOSS-Image, IntoRealism ZIT | NPU Snapdragon       | Android                        |
| FLUX e Z-Image compatti (locali)        | Bonsai Image 4B, FLUX.2 klein 4B, Z-Image Turbo 6B                                             | CPU o GPU            | Android e iOS                  |
| Core ML                                 | Realistic Vision Hyper, Deliberate v2                                                          | Hardware Apple       | iOS                            |
| Layla Cloud                             | FLUX.1[dev], BrainDance, CyberRealisticXL, iNiverse Mix                                        | Server di Layla      | Android e iOS                  |
| Web UI                                  | Qualsiasi modello servito dalla tua Web UI                                                     | Il tuo PC            | Android e iOS                  |

Cosa significano i gruppi:

- **SD 1.5** ([Stable Diffusion](https://en.wikipedia.org/wiki/Stable_Diffusion) 1.5) è la famiglia più vecchia e leggera, diffusissima su Civitai. Genera immagini 512 x 512 sulla maggior parte dei telefoni recenti.
- **SDXL** produce immagini più dettagliate 1024 x 1024 e richiede più memoria. Le versioni NPU richiedono Snapdragon 8 Elite o successivo.
- I **transformer di diffusione recenti** (Z-Image, FLUX.2 Klein, Qwen Image, Krea, MOSS-Image) offrono la qualità maggiore. Sono download grandi, richiedono la NPU di Snapdragon 8 Elite o successivo, arrivano a 2048 x 2048 e diversi consentono di modificare immagini.
- I **modelli FLUX e Z-Image compatti** usano un diverso motore locale su entrambe le piattaforme. Hanno risoluzioni piccole e fisse; i maggiori occupano diversi gigabyte e sono lenti.
- **Layla Cloud** non richiede download. Accedi al servizio: ogni piano comprende un numero mensile di generazioni cloud.

La NPU (unità di elaborazione neurale) è l'acceleratore IA dei chip Qualcomm Snapdragon. È in genere molto più veloce della CPU sullo stesso modello: per questo Layla offre varianti NPU e strumenti come NPU Forge.

## Impostare prompt, passaggi, CFG e seed

I controlli sotto la scheda del modello in Local Dream regolano la generazione. Quelli visibili dipendono dal modello: non tutti supportano ogni opzione.

![Parametri Local Dream: Size, Scheduler, Steps, CFG Scale, Seed, Auto Upscale, Advanced Settings e Generate.](../../how-to-enable-image-generation-in-layla/local-dream-image-generation-settings.jpg)

| Impostazione                      | Funzione                                                    | Note                                                                                                                                      |
| --------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Prompt**                        | Descrive l'immagine desiderata.                             | La stella crea un prompt da parole chiave con il modello di chat. Il secondo pulsante accorcia prompt lunghi e richiede Long-term Memory. |
| **Negative prompt**               | Descrive cosa evitare.                                      | Nascosto se ignorato dal modello. Nei transformer recenti agisce solo sopra CFG 1.                                                        |
| **Size**                          | Larghezza e altezza.                                        | SD 1.5 CPU offre varie dimensioni quadrate; i nuovi NPU arrivano a 2048 x 2048. Alcuni modelli hanno una misura fissa.                    |
| **Steps**                         | Numero di passaggi di rimozione del rumore.                 | Più passaggi richiedono più tempo. Modelli turbo e distillati sono pensati per 4–9 passaggi.                                              |
| **CFG Scale**                     | Fedeltà al prompt.                                          | Ogni modello integrato ha un valore iniziale adatto. Molti modelli recenti sono ottimizzati per 1.                                        |
| **Seed**                          | Punto di partenza casuale.                                  | -1 ne sceglie uno nuovo ogni volta. Il risultato mostra quello usato per ripetere l'immagine.                                             |
| **Scheduler**                     | Campionatore, per esempio DPM++ 2M Karras, Euler A o LCM.   | Visibile su SD 1.5 e SDXL; i modelli recenti usano il proprio.                                                                            |
| **Source image**                  | Parte da un'immagine invece del rumore (immagine-immagine). | SD 1.5 CPU/NPU, SDXL NPU e nuovi NPU. Dopo la scelta puoi dipingere una maschera per rifare una parte e regolare **Denoise Strength**.    |
| **Reference images**              | Fino a tre immagini per guidare una modifica.               | FLUX.2 Klein e Qwen Image.                                                                                                                |
| **Show Preview While Generating** | Anteprima approssimativa a ogni passaggio.                  | Non disponibile per tutti.                                                                                                                |
| **Auto Upscale**                  | Ingrandisce le immagini finite.                             | Scegli modello, uso di OpenCL sulla GPU e dimensione dei riquadri. Riquadri piccoli consumano meno memoria.                               |

In **Advanced Settings**:

- **Prompt prefix** antepone testo a ogni prompt, utile per uno stile o un tag di qualità ricorrente.
- **Use GPU** sposta la generazione sulla GPU per i modelli compatibili. Sotto 12 GB di RAM, Layla avverte del rischio di esaurire la memoria.
- **Reset All Settings** ripristina i valori del modello selezionato.

Tocca **Generate**. Durante il lavoro compare **Stop generating** per interromperlo. Le immagini finite appaiono nella galleria.

## Scegliere il modello in Inference Settings

Local Dream serve per generare manualmente. Per Layla e i personaggi in chat, scegli un modello in **Inference Settings**.

1. Apri **Settings** → **Inference Settings** → **Image Generation**.
2. La scheda sotto **Add Custom Model** mostra il modello attuale. Le frecce di scambio aprono **Select Model**.
3. Scegli un modello oppure **No Image Generation** per disattivare la funzione.

![Image Generation in Inference Settings con Add Custom Model, iNiverse Mix di Layla Cloud selezionato e pulsante di cambio.](../../how-to-enable-image-generation-in-layla/inference-settings-image-generation-model-layla.jpg)

È il modello predefinito per i personaggi senza scelta propria. Scarica prima i modelli locali da Local Dream. Quelli Cloud o Web UI sono pronti dopo accesso o connessione. Per modificare una connessione Web UI, apri la lista e tocca la matita sulla scheda.

## Configurare le immagini per ciascun personaggio

Inference Settings definisce solo il modello predefinito. Ogni personaggio personalizzato può avere modello e regole propri, inviando immagini in chat e usando, per esempio, uno stile anime mentre un altro resta fotorealistico.

1. Crea o modifica un personaggio. [Creare personaggi personalizzati](/it/how-do-i-create-custom-characters/) descrive l'editor.
2. In **Advanced**, trova **Image generation** sotto **OUTPUT**. Mostra il modello attuale oppure _No image generation_.
3. Tocca per aprire **Select Model** e scegli un modello. **No Image Generation** impedisce a quel personaggio di generare.
4. Regola le opzioni seguenti e tocca **Save**.

![Advanced nell'editor personaggi con RealCartoon, invio casuale, uso dell'immagine profilo e Fallback phrase.](../../how-to-enable-image-generation-in-layla/character-image-generation-settings-layla.jpg)

Quando assegni un modello, appaiono tre opzioni:

- **Send images randomly**: il personaggio può inviare immagini spontaneamente. Disattivato inizialmente.
- **Generate Images based on your character's profile image**: usa sempre la foto profilo come punto di partenza per mantenere l'aspetto del personaggio. Richiede immagine-immagine; consulta la tabella dei parametri.
- **Fallback phrase**: frasi separate da virgole, per esempio _mandami una foto_ o _genera un'immagine_. Se il messaggio ne contiene una, il personaggio propone un'immagine. Layla comprende anche normali richieste di foto, immagini e selfie: qui aggiungi le tue espressioni personali, anche in altre lingue.

Puoi rifiutare un'immagine proposta. Una corrispondenza accidentale richiede soltanto di chiudere la proposta.

Ricorda:

- Scarica prima il modello in Local Dream: senza i file sul telefono il personaggio non genera.
- Per i modelli Layla Cloud devi aver effettuato l'accesso. Ogni immagine usa la quota mensile del piano.
- Senza un modello proprio, il personaggio usa quello di Inference Settings.

## Altri modi per generare immagini

Anche gli agenti generano immagini, utile se il telefono è troppo lento. Questi metodi richiedono Internet e inviano il prompt a servizi esterni:

- [Creare un agente di generazione immagini](/it/creating-an-image-generation-agent/) produce la scena o il personaggio dopo ogni messaggio.
- [Generare immagini con l'agente Perchance](/it/how-to-use-the-perchance-image-generation-agent/) usa il sito gratuito Perchance.
- [API Nano Banana in Layla](/it/how-to-use-the-google-nano-banana-image-generation-agent/) collega il modello Google con una chiave API di Google AI Studio.

## Domande frequenti

### Come genero immagini offline su Android?

Installa Local Dream e scarica un modello. Poi Layla genera da testo o immagini sul telefono senza Internet. Solo installazione della mini-app e download del modello richiedono una connessione.

### La generazione funziona su iPhone?

Sì. SD 1.5 usa CPU o GPU, sono disponibili modelli Core ML e anche FLUX e Z-Image compatti funzionano su iOS. I modelli NPU Snapdragon sono solo Android.

### Posso eseguire Stable Diffusion sul telefono?

Sì. Layla esegue Stable Diffusion 1.5 e SDXL su Android e iPhone. SD 1.5 usa la CPU dei telefoni recenti o la NPU Snapdragon compatibile per accelerare. Puoi anche importare checkpoint e LoRA tuoi.

### Posso eseguire FLUX sul telefono?

Sì, su hardware compatibile. FLUX.2 Klein usa la NPU di Snapdragon 8 Elite o successivo. FLUX.2 klein 4B e Bonsai Image 4B compatti usano CPU o GPU su Android e iOS. FLUX.1[dev] è disponibile con Layla Cloud.

### Serve un telefono Snapdragon?

No. SD 1.5 CPU funziona sulla maggior parte dei telefoni recenti. Snapdragon serve solo per i modelli NPU; i più nuovi richiedono 8 Elite o successivo.

### Da quale modello conviene iniziare?

Prova SD 1.5, per esempio DreamShaper: download contenuto e compatibilità con quasi tutti i telefoni recenti. Con Snapdragon 8 Elite o successivo prova Z-Image Turbo su NPU per più qualità.

### Posso usare modelli Civitai?

Sì, delle famiglie supportate. Scarica un checkpoint safetensors e importalo da **Safetensor**. La guida sopra elenca le famiglie compatibili.

### Posso modificare un'immagine esistente?

Sì, con modelli immagine-immagine. Aggiungi un'immagine sorgente in Local Dream. FLUX.2 Klein e Qwen Image accettano anche fino a tre immagini di riferimento.

### Le immagini Layla Cloud sono a pagamento?

Ogni piano, anche gratuito, include una quota mensile. I piani superiori ne offrono di più. La generazione locale non ha limiti d'uso o costi per immagine.

### Come faccio inviare foto al personaggio?

Nell'editor apri **Advanced**, scegli il modello sotto **OUTPUT**, poi attiva **Send images randomly** o aggiungi le frasi in **Fallback phrase**.

### I personaggi possono usare modelli diversi?

Sì. Ciascuno può avere il proprio modello in **Advanced**. Senza scelta personale usa quello predefinito di Inference Settings.

### Layla controlla o censura le immagini?

In locale, prompt e immagini non lasciano il telefono e nessun servizio online li esamina. Layla Cloud usa i server di Layla; Web UI usa il tuo PC. Questi due metodi seguono le proprie impostazioni.

### Cosa cerco in un generatore di immagini offline per Android?

Verifica funzionamento senza Internet, modelli supportati, uso della NPU, importazione di checkpoint Stable Diffusion e LoRA e immagini conservate sul dispositivo. Layla copre tutti e cinque i punti e integra le immagini nella chat dei personaggi.

### Come collego Layla a Stable Diffusion sul PC?

Configura AUTOMATIC1111 Web UI con API attiva e aggiungi l'indirizzo in **Web UI** su Add Image Model. Le immagini vengono generate sul PC, che deve essere raggiungibile dal telefono in rete.

## Riconoscimenti

La generazione usa [Local Dream](https://github.com/xororz/local-dream), creato da XORORZ. NPU Forge è stato creato da AbrahamPaulJ.
