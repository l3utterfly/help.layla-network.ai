---
title: Come usare i preset SillyTavern in Layla
description: Importa un preset di chat completion SillyTavern in Layla, leggi le informazioni della scheda del preset e collegalo ai tuoi personaggi per il roleplay IA offline su Android.
category: Characters & voice
order: 45
keywords:
  - preset SillyTavern
  - SillyTavern su Android
  - importazione preset SillyTavern
  - preset del gestore prompt
  - roleplay IA offline
  - prompt per personaggi IA
  - IA offline per Android
  - chat IA senza censura
lastUpdated: 2026-09-03
translationKey: how-to-use-sillytavern-presets-in-layla
ai_translated: true
---

**Un preset SillyTavern è un file JSON che definisce i prompt inviati a un modello, l'ordine in cui vengono inviati e quali di essi sono attivi. Layla può importare questi file e usarli per costruire il prompt di qualsiasi personaggio a cui li colleghi.** Tutto avviene sul tuo dispositivo: importare un preset non lo invia da nessuna parte.

Questa guida spiega come installare la mini-app Preset SillyTavern, esportare un preset da SillyTavern, importarlo in Layla, leggere le informazioni sulla scheda di un preset, collegare i preset ai personaggi e quali parti di un preset Layla deliberatamente non esegue.

## Che cosa contiene davvero un preset SillyTavern

In SillyTavern, un preset di chat completion si gestisce dal gestore dei prompt (Prompt Manager). Contiene un elenco di prompt con nome — prompt principale, descrizione del personaggio, personalità, scenario, descrizione del persona, esempi di dialogo, cronologia della chat, istruzioni post-cronologia e qualsiasi prompt personalizzato aggiunto dall'autore — più un elenco dell'ordine dei prompt che indica quali sono attivi e in quale sequenza compaiono.

Gli autori di preset lo usano per costruire sistemi di prompt elaborati: pile di istruzioni in più parti, regole di formattazione, prompt inseriti a una profondità fissa nella conversazione e prompt che si attivano solo per determinati tipi di generazione. Quando qualcuno condivide un «preset» per il roleplay, è questo file che sta condividendo.

Due cose vale la pena sapere prima di importarne uno:

- Layla legge i **preset di chat completion**, cioè i file che contengono un elenco di prompt e un elenco dell'ordine dei prompt. I preset di text completion, che contengono solo valori di campionamento, sono un formato diverso e vengono rifiutati all'importazione.
- Un preset riguarda la **costruzione del prompt**, non il modello. Non scarica un modello e non cambia quello che stai usando. Consulta [come aggiungere un modello IA personalizzato a Layla](/how-to-add-custom-models-to-layla/) se vuoi anche cambiare modello.

## Installare la mini-app Preset SillyTavern

La gestione dei preset è una mini-app Layla opzionale.

1. Apri **Le mie app** in Layla, oppure tocca **Aggiungi mini-app** nella prima schermata.
2. Tocca il segno più per sfogliare le mini-app disponibili.
3. Trova **Preset SillyTavern** e aggiungila.
4. Apri **Preset SillyTavern** da **Le mie app**.

Non c'è nulla da scaricare per questa mini-app, quindi è disponibile subito. Per saperne di più su come aggiungere e rimuovere funzionalità, consulta [come aggiungere funzionalità (mini-app) in Layla](/how-to-add-features-mini-apps-in-layla/).

## Esportare un preset da SillyTavern

Se hai già il file `.json` — pubblicato dall'autore oppure ricevuto da un amico — puoi saltare questa sezione.

Per esportarlo dalla tua installazione di SillyTavern, apri il pannello **AI Response Configuration** (l'icona dei cursori nella barra superiore), individua in alto il menu a discesa **Chat Completion Presets**, seleziona il preset desiderato e usa il pulsante di esportazione accanto al menu. SillyTavern lo salva come file `.json`.

Puoi anche copiare il file direttamente dalla cartella dati di SillyTavern. I preset di chat completion si trovano in `data/<il-tuo-nome-utente>/OpenAI Settings/`.

Trasferisci il file sul telefono con il metodo che preferisci: cavo, archiviazione cloud, un messaggio inviato a te stesso. A Layla serve solo che il file sia raggiungibile dal selettore file di Android.

## Importare il preset in Layla

1. Apri la mini-app **Preset SillyTavern**.
2. Tocca **Importa preset**.
3. Scegli il file `.json` dal tuo dispositivo.

Layla convalida il file prima di salvarlo. Deve terminare con `.json`, essere JSON valido e contenere sia un elenco di prompt sia un elenco dell'ordine dei prompt non vuoto. Se qualcosa manca, Layla mostra un errore che indica il problema — per esempio che il preset non è JSON valido, o che a una voce di prompt manca l'identificatore — e non importa nulla.

Se importi un preset con un nome di file già presente, Layla li conserva entrambi e aggiunge un numero al nuovo, invece di sovrascrivere il file esistente. I preset sono elencati partendo dal più recentemente modificato e puoi tirare l'elenco verso il basso per aggiornarlo.

## Leggere la scheda del preset

Ogni preset importato ha una sua scheda. Il nome grande è il nome interno del preset; la riga più piccola sotto è il nome del file con cui Layla lo ha salvato. Vale la pena leggere la scheda, perché i preset variano moltissimo ed è così che capisci a colpo d'occhio che cosa hai appena importato.

I tre valori riepilogativi sono:

- **Prompt attivi** — quanti prompt del preset sono attivi, sul totale. Un preset con 40 prompt di cui 12 attivi è normale: l'autore ha disattivato gli altri.
- **Sistema / utente / assistente** — come si distribuiscono i prompt attivi tra i tre ruoli dei messaggi.
- **Dimensione del file** — utile soprattutto per individuare un preset insolitamente grande.

Sotto, Layla mostra delle etichette per tutto ciò che il preset specifica: i limiti di token di contesto e di output, la temperatura, quanti prompt attivi sono marcatori, quanti sono iniezioni in profondità, quante impostazioni di prompt di utilità sono compilate e quanti script regex contiene il file. Alcune etichette sono evidenziate come avvisi anziché come semplici informazioni:

- **Sostituzione del prompt principale** — il preset sostituisce il prompt di sistema principale con il proprio testo.
- **Prompt di sistema personalizzati** — il preset aggiunge propri prompt con ruolo di sistema.
- **Prompt di sistema disattivati** — il preset ha disattivato completamente i prompt di sistema.
- **Jailbreak attivo** — il prompt di istruzioni post-cronologia del preset contiene del testo. In SillyTavern questo prompt è tradizionalmente chiamato «jailbreak»: è semplicemente l'ultimo blocco di istruzioni prima della generazione.

Se durante la lettura del file Layla ha trovato qualcosa di discutibile, accanto al badge del preset JSON compare un badge **avvisi**. Toccalo per espandere i dettagli. Gli avvisi più comuni segnalano che il preset usa un ordine dei prompt obsoleto o non standard, oppure che contiene un'estensione che Layla salva ma non esegue. Gli avvisi sono informativi — il preset funziona comunque — ma ti dicono quali parti delle intenzioni dell'autore non sopravvivranno al passaggio.

## Collegare un preset ai tuoi personaggi

Un preset non fa nulla finché un personaggio non lo usa. Ci sono due modi per creare questo collegamento.

**Dalla scheda del preset.** Tocca **Personaggi collegati** in fondo alla scheda, seleziona i personaggi che devono usare questo preset, poi chiudi il selettore con la **X** o toccando fuori. La selezione viene salvata alla chiusura.

**Dall'editor del personaggio.** Apri un personaggio in modifica, vai alla scheda **Avanzate** e, sotto **Preset e conoscenze**, tocca **Preset SillyTavern**. Scegli un preset dall'elenco e salva il personaggio.

Da come questo viene memorizzato derivano due regole:

- Un personaggio può usare **un solo preset alla volta**. Collegare un personaggio a un secondo preset lo scollega dal primo.
- Si possono collegare solo i personaggi **che hai creato o importato**. I personaggi predefiniti integrati in Layla non compaiono nel selettore. Se vuoi usare un preset con una personalità integrata, copiala prima in un personaggio personalizzato — consulta [come creare un personaggio IA personalizzato in Layla](/how-do-i-create-custom-characters/) e [come importare personaggi TavernPNG in Layla](/how-to-import-tavernpng-characters-in-layla/).

Una volta che un personaggio ha un preset collegato, Layla costruisce il prompt di quel personaggio a partire dal preset ogni volta che ci chatti. I prompt attivi vengono assemblati nell'ordine del preset, i prompt marcatori vengono riempiti con la descrizione, la personalità, lo scenario e gli esempi di dialogo del personaggio e con la descrizione del tuo persona, la cronologia della chat viene collocata dove la mette il preset e i prompt a iniezione in profondità vengono inseriti alla profondità configurata nella conversazione. Le macro vengono valutate come in SillyTavern, incluse `{{char}}`, `{{user}}`, `{{persona}}`, `{{description}}`, `{{personality}}`, `{{scenario}}` e `{{lastmessage}}`, le macro di data e ora, i tiri di dado e le scelte casuali, e le macro delle variabili locali e globali. Una macro che Layla non riconosce viene lasciata invariata anziché eliminata in silenzio.

## Che cosa un preset non cambia

I preset sono file di prompt, e Layla ne esegue fedelmente la parte relativa ai prompt. Alcuni elementi del file vengono salvati e mostrati, ma non applicati:

- **Impostazioni di campionamento e di contesto.** La temperatura, il limite di contesto e il limite di token di output mostrati sulla scheda descrivono ciò che il preset richiede. La generazione resta governata dalle impostazioni di inferenza di Layla. Modificale invece nelle impostazioni del tuo motore di inferenza — consulta [come funzionano i motori di inferenza salvati in Layla](/how-saved-inference-engines-work-in-layla/).
- **Script regex e dati delle estensioni.** Layla li conta e li mantiene nel file, ma non li esegue.
- **Posizionamento delle informazioni sul mondo.** I marcatori di world info del preset vengono riconosciuti, ma al momento Layla non vi inserisce il testo dei lorebook.
- **Il template di prompt del modello.** Il preset decide contenuto e ordine dei messaggi; il template di chat che li racchiude appartiene al modello. Consulta [come configurare template di prompt personalizzati per i modelli](/how-to-set-up-custom-prompt-templates-for-models/).

Nulla di tutto questo impedisce a un preset di funzionare. Significa però che un preset costruito attorno alle particolarità di uno specifico modello cloud può comportarsi diversamente su un modello locale: vale la pena ricordarlo quando un preset lodato da altri a te sembra strano.

## Gestire e rimuovere i preset

Tocca l'icona del cestino su una scheda per eliminare un preset; Layla chiede prima conferma. Eliminare un preset rimuove il file dal dispositivo. I personaggi che vi erano collegati smettono di usare un preset e tornano alla normale costruzione del prompt di Layla.

Poiché i preset sono file ordinari, conservare il `.json` originale fuori da Layla è un'abitudine sensata se lo hai modificato, o se proviene da una fonte che potresti non ritrovare.

## Domande frequenti

### Posso usare i preset SillyTavern offline?

Sì. L'importazione, l'archiviazione e l'applicazione di un preset avvengono tutte sul tuo dispositivo. Se usi un modello GGUF locale, l'intera chat — preset compreso — funziona senza connessione a internet.

### Perché il mio preset è stato rifiutato all'importazione?

Il motivo più comune è che il file è un preset di text completion o un backup delle impostazioni anziché un preset di chat completion. Layla richiede sia un elenco di prompt sia un elenco dell'ordine dei prompt. Anche un file JSON malformato o troncato viene rifiutato, e il messaggio di errore indica il problema specifico.

### Importare un preset sovrascrive la personalità del mio personaggio?

No. La descrizione, la personalità e lo scenario del personaggio restano i tuoi; il preset decide come e in quale ordine vengono presentati al modello. Un preset che sostituisce il prompt principale cambia l'istruzione che avvolge il tuo personaggio, non il personaggio stesso.

### Due personaggi possono condividere lo stesso preset?

Sì. Collega quanti personaggi vuoi a un singolo preset. Il contrario non vale: ogni personaggio usa un solo preset.

### Che cosa significa il numero d'ordine sulla scheda?

È l'identificatore del blocco dell'ordine dei prompt che Layla ha selezionato nel file. `100001` è l'attuale valore predefinito di SillyTavern. Se il tuo preset contiene solo un vecchio blocco `100000`, o uno non standard, Layla lo usa e mostra un avviso perché tu sappia quale ordine è stato seguito.

### Serve un'installazione di SillyTavern per usare i preset in Layla?

No. Serve solo il file `.json`. Molti autori pubblicano i loro file direttamente, e Layla li importa senza che SillyTavern sia coinvolto in alcun momento.

I preset sono un esempio di come Layla parli i formati del più ampio ecosistema IA locale: modelli GGUF, schede personaggio TavernPNG e preset SillyTavern si importano tutti in un'app Android che funziona offline, senza abbonamento e senza account.
