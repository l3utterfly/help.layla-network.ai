---
title: Come aggiungere la sintesi vocale multilingue ai personaggi in Layla
description: Attiva la sintesi vocale multilingue in Layla utilizzando SherpaTTS.
category: Characters & voice
order: 60
keywords:
  - sintesi vocale multilingue
  - SherpaTTS
  - voci dei personaggi
  - TTS Android
  - voce offline
lastUpdated: 2026-05-11
translationKey: how-to-add-multilingual-text-to-speech-for-your-characters-in-layla
ai_translated: true
---

Le mini-app TTS predefinite di Layla funzionano tutte in inglese. Tuttavia, aggiungere la sintesi vocale multilingue in Android è molto semplice.

Layla supporta SherpaTTS, un'app di sintesi vocale locale che si connette a Internet.

**Passaggio 1: scarica SherpaTTS**

Scarica l'app da [F-Droid](https://f-droid.org/en/packages/org.woheller69.ttsengine/).

![Freccia rossa che indica il collegamento Download APK nella pagina F-Droid di SherpaTTS.](./fdroid-download-apk.png)

Scorri fino alla sezione **Versioni** e scarica l'APK più recente.

_F-Droid è un'alternativa a Google Play che pubblica app **gratuite e open source (FOSS)**._

**Passaggio 2: configura SherpaTTS**

Dopo aver scaricato l'app SherpaTTS, aprila per configurarla:

![Schermata SherpaTTS con il pulsante per aggiungere un modello cerchiato.](./sherpatts-add-model.jpg)

Tocca il segno più per aggiungere un nuovo modello.

Verrà visualizzato un elenco di modelli:

![Schermata di download delle lingue di SherpaTTS con modelli Piper e Coqui.](./sherpatts-download-language.jpg)

Scarica la lingua desiderata. La lingua è indicata dal codice paese di due lettere. Ad esempio, tedesco = «de» e francese = «fr».

Al termine del download, tocca **Avvia** per caricare il modello.

**Passaggio 3: imposta SherpaTTS come modello TTS predefinito del telefono**

Tocca l'icona delle impostazioni nella schermata principale di SherpaTTS:

![Schermata SherpaTTS con una freccia che indica il pulsante delle impostazioni.](./sherpatts-settings.jpg)

Si apriranno le impostazioni di sistema di Android. Tocca l'impostazione **Sintesi vocale predefinita**:

![Impostazioni di sintesi vocale di Android con Motore preferito cerchiato.](./android-tts-preferred-engine.jpg)

Ora puoi modificare il motore predefinito. Seleziona SherpaTTS:

![Schermata Motore preferito di Android con SherpaTTS selezionato e cerchiato.](./select-sherpatts-engine.jpg)

La voce predefinita utilizzerà ora Sherpa.

**Passaggio 4: configura Layla**

Layla rileva automaticamente questa impostazione e rende disponibili le voci selezionate. _(Riavvia Layla affinché le modifiche abbiano effetto.)_

Apri le impostazioni del personaggio (**Modifica personaggio** → scheda **Avanzate**):

![Schermata Crea personaggio di Layla nella scheda Avanzate con l'impostazione Voce cerchiata.](./layla-character-advanced-voice.jpg)

Seleziona le nuove voci nella sezione **Nativa**:

![Schermata Seleziona voce di Layla con il filtro Nativa e le voci installate cerchiati.](./layla-native-voices.jpg)

Qui verranno visualizzate tutte le voci installate da Sherpa.

Il personaggio può ora parlare in più lingue.
