---
title: How to add multilingual text-to-speech for your characters in Layla
description: How to enable multilingual text-to-speech in Layla by using SherpaTTS.
category: Characters & voice
order: 60
keywords:
  - multilingual text-to-speech
  - SherpaTTS
  - character voices
  - Android TTS
  - offline voice
lastUpdated: 2026-05-11
---

The default TTS mini-apps in Layla all work in English. However, adding multilingual text-to-speech is very easy in Android.

Layla supports SherpaTTS, which is a local text-to-speech app that does connect to internet.

**Step 1: Download SherpaTTS**

Download the app from [F-Droid](https://f-droid.org/en/packages/org.woheller69.ttsengine/).

![Red arrow pointing at the Download APK link on the F-Droid SherpaTTS page.](./fdroid-download-apk.png)

Scroll down the **Versions** section and download the latest APK.

*F-Droid is a Google Play alternative that publishes apps that are **free and open source (FOSS)**.*

**Step 2: Configure SherpaTTS**

After you've downloaded the SherpaTTS app, configure it by opening it:

![SherpaTTS screen with the add-model button circled.](./sherpatts-add-model.jpg)

Tap the plus sign to add a new model.

You will be presented with a list of models:

![SherpaTTS language-download screen listing Piper and Coqui models.](./sherpatts-download-language.jpg)

Download the language you want. The language is the two-letter country code. For example, German = "de", French = "fr".

After it's downloaded, tap **Start** and the model will be loaded.

**Step 3: Set SherpaTTS as your phone's default TTS model**

Tap the settings icon in the main SherpaTTS screen:

![SherpaTTS screen with an arrow pointing to the settings button.](./sherpatts-settings.jpg)

This will bring up your Android system settings. Tap the **Default Text-to-Speech** setting:

![Android Text-to-speech settings with Preferred engine circled.](./android-tts-preferred-engine.jpg)

You will be able to change the default engine. Change it to SherpaTTS:

![Android Preferred engine screen with SherpaTTS selected and circled.](./select-sherpatts-engine.jpg)

Done! Your default voice will now be using Sherpa.

**Step 4: Configure Layla**

Layla will automatically read this setting and make the voices you select available. *(Make sure you restart Layla for the changes to take effect.)*

Go to your character's settings (**Edit character** → **Advanced** tab):

![Layla Create Character screen on the Advanced tab with the Voice setting circled.](./layla-character-advanced-voice.jpg)

Select your new voices in the **Native** section:

![Layla Select Voice screen with the Native filter and installed voices circled.](./layla-native-voices.jpg)

All the voices you've installed from Sherpa will appear here.

Done! Your character will now speak multilingual!
