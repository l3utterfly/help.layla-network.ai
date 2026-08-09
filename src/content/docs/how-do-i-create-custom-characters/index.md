---
title: How to create a custom AI character in Layla
description: "Learn how to create a custom AI character in Layla: define its personality, appearance, voice, expressions, image generation, agents, and sharing options."
category: Characters & voice
order: 20
keywords:
  - create custom AI character
  - Layla custom characters
  - AI character creator
  - offline AI character
  - AI companion
  - TavernPNG character
lastUpdated: 2026-08-09
---

If you'd like to start with existing characters made by others, look here: [importing characters from the Personalities Hub](/personality-hub-ai-characters/).

Layla's character creator lets you build a custom AI character for private, on-device conversations. You can define who the character is, how they speak, what your conversations are about, how they look, and which optional features they can use.

This guide walks through each tab in the character editor, from the basic character details to voices, image generation, and sharing.

## Open the character creator

Go to the character selection screen and tap the large **+** button underneath your character roster. This opens the character editor directly.

You can also open **Apps** and choose the **Create Character** mini-app. Both routes lead to the same editor.

## Add your character's basic details

The **Core Info** tab contains the details that determine your character's identity and behaviour.

![The Core Info tab in Layla's Create Character screen.](./create-character.jpg)

Work through the inputs as follows:

- **Character picture:** Choose the profile image used to identify your character. It appears as a small circle beside their messages during a chat.

- **Character name:** Enter the name Layla should use for the character.

- **Description:** Explain who the character is. You can include their background, role, knowledge, relationships, or other facts they should consistently remember about themselves.

- **Personality:** Describe how the character behaves and communicates. This can cover traits, values, habits, emotional temperament, sense of humour, vocabulary, and speaking style.

- **Scenario:** Establish the situation in which the conversation takes place. For example, describe where the character and user are, how they know each other, and what is happening when the chat begins.

- **Impression:** This is the character's impression of you. The Dream mini-app can generate it from your previous chats, including a summary of your shared history and how the character sees you. You can also edit it manually.

- **Greetings:** Write the opening message your character sends when you begin a new conversation. You can add several greetings, in which case Layla chooses one at random for each new chat. Add an empty greeting if you would rather speak first.

- **Tags:** Add comma-separated labels to organise your characters. If you later share the character, tags also help other people find it.

The `{{char}}` and `{{user}}` placeholders can be used in the description, personality, and scenario. Layla replaces them with the current character and user names when preparing the conversation.

![The greetings, tags, summary, and loading-time estimate in the Core Info tab.](./create-character-2.jpg)

The fields are separated for convenience while you write. They are not independent instructions sent to separate parts of the AI. Layla combines the description, personality, and scenario into one long block of text for the character's system prompt. A selected greeting is then added when a new chat starts.

The **Summary** at the bottom previews the combined character text. Layla also estimates how long the information may take to load, which is useful if you have written a particularly detailed custom AI character.

## Configure your character's appearance

Open the **Appearance** tab to control the images shown for your character and during chat.

![The Appearance tab with character and chat background image settings.](./character-appearance.jpg)

The profile picture selected in **Core Info** is the small circular image shown beside the character's chat messages. The **Character Background** is the character's main static image, while the **Chat Background** fills the main background of the conversation.

You can also choose an animated background. Layla provides three options:

- **Rive:** A 2D animated background.
- **Live2D:** A Live2D character model.
- **Mini-app:** A custom Layla mini-app that provides the character background.

![The Rive, Live2D, and custom mini-app animated background choices.](./choose-animated-bg.jpg)

Rive, Live2D, and custom character mini-apps require their own setup. Later guides will cover how each format works in more detail; you can leave the animated background empty when creating your first character.

### Add images for different expressions

Layla can show a different image depending on the emotion expressed in your character's response. Open the character expressions control and assign images for emotions such as admiration, amusement, anger, or annoyance.

![The character expressions editor with a separate image slot for each emotion.](./choose-expressions.jpg)

During a conversation, Layla detects the expression associated with the character's response and changes the displayed image. Any expression without its own image falls back to the default chat background. You can add the images individually or import a prepared ZIP file.

## Choose voices, image generation, references, and agents

The **Advanced** tab contains optional integrations for your character. It also provides the control for importing an existing TavernPNG character card.

![The Advanced tab with TavernPNG import, voice, and image-generation settings.](./advanced.jpg)

### Import a TavernPNG character

A TavernPNG is an image file that also contains character-card data. Importing one fills the compatible character fields and image automatically. See [how to import TavernPNG characters in Layla](/how-to-import-tavernpng-characters-in-layla/) for the complete process.

### Give your character a unique voice

Tap **Voice** to browse the voices available through your phone and any text-to-speech mini-apps installed in Layla. You can search by name or tag and play a preview before making a selection.

![The voice selector with search, filters, sample text, and voice previews.](./choose-voice.jpg)

Once a voice is selected, you can start a voice chat and hear the character respond with that voice. See [how to add multilingual text-to-speech voices](/how-to-add-multilingual-text-to-speech-for-your-characters-in-layla/) or [how to start a voice chat with your characters](/how-to-start-a-voice-chat-with-your-characters/) for more help.

### Let your character generate images

Choose an image-generation model if you want the character to send generated images when you ask for one during chat. The model selector includes the image-generation options currently available on your device or through the services you have configured.

![The image-generation model selector for a custom character.](./select-image-gen.jpg)

Image generation is optional. Leave **No Image Generation** selected if you do not need it. To configure a model first, read [how to enable image generation in Layla](/how-to-enable-image-generation-in-layla/).

### References and agents

Reference documents give a character access to selected background material. Agents let the character use configured tools or workflows. Both are advanced features and can be left blank while you are getting started.

![The Advanced tab controls for image generation, reference documents, and agents.](./advanced-2.jpg)

![The reference document selector for a custom character.](./select-references.jpg)

![The agent selector for attaching optional tools and workflows to a character.](./select-agents.jpg)

If you want to explore agents later, start with [how to enable agents, functions, and tool calling in Layla](/how-to-enable-agents-functions-and-tool-calling-in-layla/).

## Share or export your character

Sharing is optional. Tap **Share** to upload the character to the Personalities Hub or download it as a TavernPNG file.

![The anonymous Personalities Hub sharing and TavernPNG download options.](./share.jpg)

Characters shared through the Personalities Hub are uploaded anonymously. You can choose any creator name to display, and you can add the source if the character comes from a television series, film, anime, book, or other work. Leave the source empty for an original character.

Choose **Download as TavernPNG** when you want a portable character card to send directly to friends or import into another compatible app.

## Save the character and start chatting

Tap **Save** when you are finished. Your new character will appear in your character roster on the selection screen. Tap the character to start a chat.

You can return to the editor later if you want to refine the personality, change the appearance, choose another voice, or add advanced features. Your conversations with a character can run locally on your device when you use Layla's offline AI models.

## Frequently asked questions

### Do I need to complete every character field?

No. Start with a name and enough description, personality, scenario, and greeting text to establish the character. Images, expressions, voices, image generation, references, and agents are optional.

### What is the difference between a profile picture and a chat background?

The profile picture is the small circular image displayed beside the character's messages. The chat background is the main image behind the conversation.

### Can a Layla character use an animated background?

Yes. A custom character can use a Rive animation, a Live2D model, or a custom Layla mini-app as its animated background.

### Can I share a Layla character privately?

Yes. Download the character as a TavernPNG and send the file directly to a friend. You can also share it anonymously through the Personalities Hub for other users to find.
