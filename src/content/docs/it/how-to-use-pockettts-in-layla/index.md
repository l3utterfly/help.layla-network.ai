---
title: Come usare PocketTTS in Layla per clonare la voce sul dispositivo
description: Usa PocketTTS in Layla per clonare una voce da un WAV o dal microfono, testarla in locale e assegnarla a un personaggio IA per una voce privata offline.
category: Characters & voice
order: 30
keywords:
  - PocketTTS Layla
  - clonazione vocale sul dispositivo
  - sintesi vocale offline
  - voce personalizzata personaggio IA
  - TTS locale Android
  - assistente IA privato
  - clonazione vocale one-shot
lastUpdated: 2026-08-09
translationKey: how-to-use-pockettts-in-layla
ai_translated: true
---

**PocketTTS è la mini-app di Layla per clonare voci sul dispositivo. Crea una voce di sintesi vocale riutilizzabile da un breve campione registrato in Layla o caricato come WAV.** Puoi testarla, salvarla nella libreria e usarla come voce predefinita o per un singolo personaggio IA.

Dopo l’installazione, la generazione avviene localmente sul dispositivo Android. Registrazione e testo non devono essere inviati a un servizio Web, rendendo PocketTTS adatto a conversazioni IA private offline.

## Cosa fa PocketTTS in Layla

PocketTTS usa la clonazione one-shot: invece di molti file di addestramento, fornisci un solo campione adatto che Layla usa per trasformare nuovi testi in voce.

La mini-app consente di registrare dal microfono, caricare WAV PCM a 16 bit, riascoltare la sorgente, testare testo personalizzato, assegnare nomi e tag, salvare più voci e usarle globalmente o per un personaggio.

PocketTTS è una funzione TTS: genera audio dal testo, ma non cambia il modello linguistico che scrive le risposte.

## Installa e apri PocketTTS

1. Apri **My Apps**.
2. Tocca il segno più.
3. Trova **Pocket TTS (Voice Cloning)** e installala.
4. Apri **Pocket TTS** da **My Apps**.

L’installazione richiede Internet per scaricare i file necessari; in seguito clonazione e generazione possono funzionare sul dispositivo. Consulta [come abilitare o disabilitare le mini-app](/how-to-enable-disable-mini-apps-within-layla/).

## Passaggio 1: fornisci un campione vocale

Scegli una delle due opzioni sotto **Voice Source**.

![Schermata Pocket TTS con caricamento WAV, registrazione, nome e tag.](./pockettts.jpg)

### Carica un WAV

Tocca **Upload .wav File** e scegli il campione. Layla mostra nome e durata e, se non hai inserito un nome, usa quello del file senza estensione.

Serve un **WAV PCM a 16 bit**. Converti MP3, AAC e altri formati; cambiare soltanto l’estensione in `.wav` non basta.

### Registra in Layla

Tocca **Record Voice**, consenti il microfono, parla naturalmente e tocca **Stop Recording**. Layla prepara un WAV. Il nome predefinito è **My Recording** se non ne hai già inserito uno.

![Pocket TTS durante una registrazione con timer, forma d’onda e Stop Recording.](./record.jpg)

Ascolta con **Play Sample**. Se senti rumore, silenzi lunghi, distorsione o audio errato, usa il cestino e riprova.

## Come registrare un campione migliore

Il campione influenza direttamente il risultato e PocketTTS apprende anche i difetti. Una registrazione pulita conta più di una lunga.

- Registra in silenzio mantenendo costante la distanza dal microfono.
- Evita musica, altre voci, eco, ventole, traffico e rumori di manipolazione.
- Rimuovi i silenzi lunghi, che possono produrre pause indesiderate.
- Usa audio chiaro e stabile senza distorsione.
- Rendi evidenti le qualità di una voce caratteristica; quelle marcate si trasferiscono meglio di quelle sottili.
- Ascolta l’intero campione prima del test.

Usa la voce di una persona solo con il suo permesso e considera come potrebbe essere interpretato l’audio generato se lo condividi.

## Passaggio 2: testa la voce

1. Modifica **Test Text** con una frase che contenga suoni vari e simili ai dialoghi previsti.
2. Tocca **Test Custom Voice**.
3. Attendi l’inizializzazione e la generazione locale.
4. Ascolta; **Stop Test** interrompe la riproduzione.

Il test non salva la voce. Ripetilo o sostituisci il campione in caso di rumore, pause o caratteristiche deboli. Il testo non deve coincidere con la registrazione originale.

## Passaggio 3: assegna nome e tag

Inserisci un nome sotto **Voice Details**. Nome e campione sono necessari per attivare **Save Custom Voice**. Scegli un nome riconoscibile, come personaggio, locutore o ruolo.

I tag sono opzionali. Layla include **Male**, **Female**, **Narrator**, **Character**, **Calm**, **Energetic**, **Deep**, **Soft**, **Robotic** e **Warm**; puoi anche crearne altri. Aiutano a cercare una libreria ampia.

## Passaggio 4: salva la voce

1. Tocca **Save Custom Voice**.
2. Controlla nome, sorgente, durata e tag in **Save Voice**.
3. Tocca **Confirm & Save**.
4. Attendi l’elaborazione.

La voce appare sotto **Existing Voices** e nei selettori di Layla. Una copia del WAV resta nei dati dell’app per le generazioni future.

## Usa la voce salvata

### Impostala come predefinita

Apri **Settings** → **Text-to-speech Settings** → **Default Voice** e scegli la voce PocketTTS. Si applica ai personaggi senza voce specifica.

### Assegnala a un personaggio

Apri l’editor, tocca **Voice** e selezionala per nome o tag. Consulta [come creare un personaggio IA personalizzato](/how-do-i-create-custom-characters/) e [come avviare una chat vocale](/how-to-start-a-voice-chat-with-your-characters/).

## Gestisci o elimina le voci

Le voci compaiono sotto **Existing Voices** e nel selettore. L’eliminazione richiede conferma ed è definitiva.

![Elenco Existing Voices con ricerca, testo di esempio, anteprima ed eliminazione.](./test.jpg)

Disinstallare PocketTTS elimina anche le voci. Conserva il WAV originale fuori da Layla se vuoi ricrearle.

## Risoluzione dei problemi

### Perché Save Custom Voice è disabilitato?

Carica o registra un campione e inserisci un nome sotto **Voice Details**.

### Perché il file non funziona?

Convertilo realmente in WAV PCM a 16 bit. Rinominare un MP3 non basta.

### Perché ci sono pause lunghe?

Rimuovi i silenzi dalla sorgente, importa il WAV pulito e riprova.

### Perché la voce è rumorosa o poco chiara?

Registra in un ambiente più silenzioso, riduci l’eco, escludi altre persone ed evita la distorsione.

### Perché non posso registrare?

Consenti il microfono quando richiesto o nelle impostazioni Android di Layla.

### PocketTTS funziona senza Internet?

La mini-app e i file devono essere installati prima. Poi clonazione e TTS funzionano localmente senza inviare campione o conversazione a un’API online.

PocketTTS aggiunge voci personalizzate mantenendo il vantaggio di un assistente IA offline: modello, audio di riferimento e voce generata possono restare sul dispositivo.
