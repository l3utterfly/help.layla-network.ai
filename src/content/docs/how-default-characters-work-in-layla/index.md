---
title: How default characters work in Layla
description: Set a default Layla character and learn how it is used for new chats, the welcome screen, Quick Actions, and your phone's assistant.
category: Characters & voice
order: 30
keywords:
  - default character
  - Layla characters
  - AI assistant character
  - default chat
  - Quick Actions
  - Android default assistant
lastUpdated: 2026-08-22
---

**Your default character is the character Layla chooses when you start an interaction without selecting one yourself.** It can appear on the welcome screen, open when Layla starts directly in Chat, handle Quick Actions that do not specify another character, and become the character used when Layla is your phone's assistant.

Layla uses its built-in Layla character by default. You can replace it with a preset, imported, or custom character at any time.

## Set a default character

The option is available from inside a regular chat with the character you want to use:

1. Open **Choose Personalities** and select the character.
2. Start or reopen a chat with that character.
3. Tap the **three dots** in the upper-right corner of the chat.
4. Tap **Set as Default**.

In the example below, Annie is open in the chat and has been set as the default character.

![Annie's chat settings with Set as Default marked by a gold medal icon.](./setasdefault.jpg)

The medal icon beside **Set as Default** turns gold when the open character is already your default. There is no separate list of default characters: only one character can be the default at a time. To change it, open a chat with a different character and repeat the steps.

If you have not created a character yet, see [how to create a custom AI character in Layla](/how-do-i-create-custom-characters/) or [download one from the Personalities Hub](/personality-hub-ai-characters/).

## What changes after setting a default

Setting a default character tells Layla which character to use when another part of the app needs one but has not been given a specific choice. Layla uses that character's identity, personality, appearance, and configured chat features when it prepares the new interaction.

The setting does not replace the character in conversations you already have open, alter saved messages, or edit any character. It also does not merge chat histories. You can continue choosing any other character normally from **Choose Personalities**.

## The welcome screen

When the **Welcome** start screen is active, the result is visible as soon as you return to it. Layla displays the default character's name and main image, and tapping the large character image starts a chat with them. It also uses the character's background unless you have chosen a custom wallpaper.

Here, the Welcome screen now shows Annie rather than the built-in Layla character:

![Layla's Welcome screen showing Annie's name and character image above the Tap to chat control.](./welcome.jpg)

A default mini-app is a separate setting. If you have chosen a mini-app to replace the large welcome-screen icon, tapping it opens the mini-app instead of your default character. Your character remains the default everywhere else. Remove the default mini-app from the **Wallpaper & UI** mini-app if you want the welcome-screen icon to open your character again.

## Opening Layla directly in Chat

Go to **Settings** > **UI Settings** > **Start Screen** and choose **Chat** if you want Layla to open directly into a character chat. Layla uses your default character for that chat.

This works independently from setting **Welcome** as the start screen. With **Welcome**, you see the character first and tap to begin. With **Chat**, Layla goes straight to the chat screen.

## Layla as your phone's assistant

If Layla is configured as your phone's default assistant, opening the assistant uses your default Layla character. The assistant input changes to **Ask [character name]**, and the character's personality and configured capabilities are used for the session. In this example, the same setting that placed Annie on the Welcome screen also changes the assistant prompt to **Ask Annie...**.

![Layla opened over the Android home screen as the phone's assistant, with an Ask Annie input.](./assistant.jpg)

Setting a character as the default inside Layla does not, by itself, replace Google Gemini or another system assistant. That is a separate phone setting. See [how to replace Google Gemini with Layla as your phone's default assistant](/how-to-replace-google-gemini-with-layla-as-your-phone-s-default-assistant/) for the Android setup.

## Quick Actions and shared text

Quick Actions can be assigned to a particular character. When an action does not have its own character, Layla falls back to your default character. This includes the standard actions used to summarise, explain, set a reminder, or search from text shared to Layla.

The default character is also shown first when choosing a character for a Quick Action. Assigning a different character to an individual action overrides the default for that action only.

On supported iOS shortcuts, text sent to Layla without another character choice also opens with the default character.

## Long-Term Memory integrations

When another app or automation sends text to Layla's **Remember** action, Layla associates that memory with the default character. This matters because Long-Term Memory is organised by character: changing the default later does not move memories that were already stored.

This behavior is separate from manually selecting messages in an existing chat and choosing **Add to Long-term Memory**. In that case, the messages belong to the character in the open chat.

## Settings that remain separate

Several similar-sounding options do not follow the default character automatically:

- **Existing chats:** Reopening a saved conversation uses that conversation's character rather than replacing it with the current default.
- **Quick Actions with an assigned character:** The action's own character takes priority.
- **Default mini-app:** This can replace what opens from the large icon on the welcome screen, but it does not replace the character used elsewhere.
- **Companion mode:** Companion mode has its own character selection. Changing the default character does not switch the active companion.
- **Roleplay scenarios and group chats:** Characters are chosen within the Roleplay mini-app rather than inherited from the default-character setting.

## Frequently asked questions

### Can I have more than one default character?

No. Layla stores one default character at a time. Setting another character as the default replaces the previous choice.

### How do I know which character is the default?

Open a chat with the character, tap the three dots, and look at **Set as Default**. Its badge is gold for the current default character.

### Does changing the default start a new chat?

No. Tapping **Set as Default** only saves the preference. A new chat begins when you later open the character from the welcome screen, start Layla in **Chat**, use a qualifying Quick Action, or launch Layla as your phone's assistant.

### Will my existing chat histories change?

No. Existing histories and their messages remain unchanged. The default is used when Layla needs to choose a character for a new interaction.

### Why does a mini-app open when I tap my character on the welcome screen?

You have probably selected a default mini-app. Open **Wallpaper & UI**, find the default mini-app setting, and choose **Remove default app**. The welcome-screen icon will then use your default character again.

### Does the default character also become my Companion character?

No. Choose the Companion character separately in Companion mode.

The default-character setting is most useful when you regularly use the same character across chat, Quick Actions, and the phone-assistant interface. It gives those entry points a consistent character without limiting which personalities you can select for other conversations.
