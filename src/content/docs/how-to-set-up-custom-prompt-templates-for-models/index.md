---
title: How to set up custom prompt templates for models in Layla
description: Configure system prompts, input prefixes and suffixes, stop phrases, context, and instruction templates for a custom AI model in Layla.
category: Models & performance
order: 20
keywords:
  - custom prompt template
  - LLM prompt format
  - system prompt
  - ChatML
  - local AI model
  - GGUF prompt template
lastUpdated: 2026-08-17
---

A custom prompt template tells Layla how to arrange the character description, instructions, conversation history, user messages, and model replies before they are sent to an AI model. It does not change the model itself. It translates a Layla conversation into the exact structure that the model learned during training.

Layla's included models already have suitable prompt settings. You normally change them when adding a custom model or when you deliberately want to change how Layla instructs a model. If you have not imported a model yet, begin with [How to add a custom AI model to Layla](/how-to-add-custom-models-to-layla/).

## Why the prompt template must match the model

Every chat model expects a particular prompt format. For example, models may use ChatML, Llama, Gemma, Mistral, or another family-specific format. These formats use different markers to identify the system message, the user, the assistant, and the end of each turn.

The correct format is determined by the model or fine-tune, not simply by the GGUF file type. Two GGUF models can require different templates, and even models based on the same architecture can be trained with different chat formats.

When you select a local model, Layla may choose a likely prompt preset from the model's filename. Treat this as a starting point. Check the model card or download page for terms such as **prompt format**, **chat template**, or **instruct template**, then confirm that the selected Layla preset matches it.

Using the wrong template may cause the model to:

- ignore the character description or system instructions;
- print special markers in its reply;
- continue as the user instead of stopping;
- confuse user and assistant messages; or
- produce short, repetitive, or otherwise poorly structured responses.

For more background on models, quants, and model cards, see [What Is GGUF? A Plain-English Guide to GGUF Models](/what-are-gguf-models-what-are-model-quants/).

## Open My Prompts and check the selected format

Open **Inference Settings** from Layla's **Settings** page, or open the **Inference Settings** mini-app. The selected model appears in **My Models**, and its active prompt format appears directly below in **My Prompts**.

In the example below, a Gemma 4 model is selected and **Gemma 4** is the active prompt. The **Add Custom Prompt** card creates a new format, while the switch button on the active prompt opens the list of formats already available.

![Layla Inference Settings showing a local GGUF model and controls for adding or switching custom prompt templates.](./infsettings.jpg)

Tap the switch button on the active prompt to open **Select Prompt**. Built-in formats such as ChatML, Llama 3, Phi, OpenELM, and Gemma appear alongside any custom prompts you have saved. The active format is highlighted in blue.

![Layla prompt template selector with ChatML, Llama 3, Phi, OpenELM, Gemma, and Gemma 4 formats.](./selectprompt.jpg)

If the model's documentation names one of these formats, tap it to use the preset without creating anything new. Create a custom prompt when the model requires a variation that is not listed, or when you want to add your own instructions while keeping the model's required formatting.

## Create a custom prompt

Tap **Add Custom Prompt** in **My Prompts** to open the editor. The top of the editor contains a scrollable **Presets** row. Tapping a preset copies that format into the fields below, giving you a safer starting point than entering every delimiter manually.

![Layla Edit Prompt screen for creating a custom LLM prompt template from presets and configuring the system prompt.](./editprompt.jpg)

1. In **Presets**, tap the format closest to the one required by your model.
2. Enter a clear **Prompt Name** and **Prompt Description**. These labels help you distinguish similar custom formats in **Select Prompt** later.
3. Scroll through **System Prompt** and **Formatting**, then adjust the fields described in the next section. Preserve every special marker, line break, and space required by the model.
4. Continue to **Available Templates** and **Live Preview** to check how the completed format is assembled.
5. Tap **Save Prompt**. The saved prompt immediately becomes active for the current inference settings and remains available for reuse.

## Configure the system and formatting fields

Below **System Prompt Start** and **System Prompt End**, the editor shows the red **Disable System Prompt** control followed by **Stop Phrase**, **Input Prefix**, **Input Suffix**, and **Context Prefix**. Keep **Disable System Prompt** switched off while setting up a normal chat model.

![Layla custom prompt settings for disabling the system prompt and configuring the stop phrase, input prefix, input suffix, and context prefix.](./disablesys.jpg)

Layla uses these fields to assemble the conversation in sections. In simplified form, it starts with the character information inside the system block, then adds the greeting, conversation history, app-provided context, the latest user message, and the marker that tells the model to begin its reply.

| Setting                 | What it controls                                                                                                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **System Prompt Start** | Opens the system section immediately before Layla's character description, personality, scenario, and other system-level information.                                  |
| **System Prompt End**   | Finishes the system section before the conversation begins. This is also where most presets include `{{instruction}}`.                                                 |
| **Stop Phrase**         | Marks the end of the assistant's turn. Layla uses it to stop generation and to separate completed messages. It is sometimes called an anti-prompt or reverse prompt.   |
| **Input Prefix**        | Appears before each user message and identifies the start of a user turn.                                                                                              |
| **Input Suffix**        | Appears after a user message. It normally closes the user turn and opens the assistant turn so the model knows it should reply next.                                   |
| **Context Prefix**      | Introduces extra context inserted by Layla features, such as recalled information or Agent results, so the model can distinguish that context from the user's message. |

The start and end fields wrap content supplied by Layla. Do not paste the full character description into them. Character details belong in the character editor; the prompt fields define how those details are presented to the model. See [How do I create custom characters?](/how-do-i-create-custom-characters/) for character setup.

The **Stop Phrase** and **Input Suffix** are related but not interchangeable. The stop phrase tells Layla where an assistant response ends. The input suffix tells the model that the user has finished and that an assistant response should begin. In some formats they share part of the same delimiter, but each field should still follow the model's documented template.

### When to disable the system prompt

**Disable System Prompt** prevents Layla from sending the character description and other system prompt content. This is an advanced compatibility option, not a general way to make a prompt shorter.

Only enable it when the model or service does not support a system prompt, or when its documentation explicitly requires instructions to be placed elsewhere. Disabling it can remove the character's identity and can interfere with apps that depend on system-level instructions.

For cloud and API models, start with Layla's **Cloud** prompt unless the provider documents a different requirement. Cloud services commonly handle their own role formatting, so local-model delimiters should not usually be added to an API connection.

## Use placeholders and check the Live Preview

Continue scrolling to reach **Available Templates**. This part of the editor lists the placeholders Layla can replace at runtime. Directly below it, **Live Preview** combines example character, user, reply, and delimiter text so you can see whether each part of the prompt appears in the intended order.

![Layla custom prompt placeholders for user, character, instruction, and time above the live prompt preview.](./templates.jpg)

The preview uses blue for character information, white for the user message, green for the reply, and grey for model delimiters. Use it to spot a missing role marker or an incorrectly placed prefix or suffix. It shows how Layla will assemble the sections, but you should still verify the required format against the model card.

### How `{{instruction}}` works

`{{instruction}}` is replaced with the instruction appropriate to the current task before inference. During a normal character chat, that instruction identifies the selected user persona and character and tells the model to embody the character. Other Layla features can supply task-specific instructions. Long-term memory, Dreams, Lorebooks, and other apps may rely on these instructions when preparing a prompt.

You can handle `{{instruction}}` in three ways:

- **Keep Layla's instruction unchanged:** Leave `{{instruction}}` in the template. This is the safest option and preserves compatibility with features that provide their own instructions.
- **Add to Layla's instruction:** Put your own natural-language guidance before or after `{{instruction}}`. Layla will insert its task-specific instruction as well as your additional rules.
- **Replace it completely:** Remove `{{instruction}}` and write your own instruction in its place. Layla will use your text, but feature-specific instructions that normally occupy this placeholder will no longer be included.

For example, you might add a short style rule after `{{instruction}}` while keeping Layla's character and app instructions intact. If you remove the placeholder entirely, test every feature you use, not only ordinary chat.

Do not confuse `{{instruction}}` with text typed by the user. It is resolved while Layla builds the prompt and is not shown as a separate chat message.

### Other available placeholders

The same **Available Templates** area lists three other placeholders:

- `{{user}}` becomes the selected persona's name.
- `{{char}}` becomes the character's name.
- `{{time}}` becomes the current date and time on the device.

Placeholders are not model control tokens. Layla replaces the placeholders with current information, while model control tokens are the exact special markers required by the model's chat format. Placeholder names are case-insensitive, but the model's own control tokens may be case-sensitive.

Using `{{user}}` and `{{char}}` can be useful with roleplay-oriented fine-tunes that were trained with named speakers. For general instruct models, fixed roles such as “user” and “assistant” may match the training format better. Follow the model card rather than changing role names based on preference alone.

## Test the template

After saving the prompt, start a new chat and try a few simple checks:

1. Ask the character to identify itself. This checks whether the system and character information was understood.
2. Send two or three messages and confirm that the model keeps the user and assistant roles separate.
3. Check that replies end normally and do not contain raw control markers.
4. Trigger any Layla features you regularly use, especially memory, Lorebooks, Dreams, roleplay, or Agents.

If the model behaves incorrectly, compare every field with the template published for that exact model. Pay particular attention to newlines around control markers; invisible formatting differences can change how a model reads the prompt.

## Common problems

### The model speaks for me

The stop phrase, input prefix, or input suffix probably does not match the model. Re-select the correct preset and compare it with the model card.

### The reply contains markers such as role names or angle-bracketed tokens

The model is receiving a format it does not recognize, or the stop phrase is incomplete. Confirm the exact chat template used by the fine-tune.

### The character personality is ignored

Check that **Disable System Prompt** is off and that the system prompt start and end markers are correct. Also confirm that the model supports system instructions.

### Memory, Lorebooks, or another app stopped influencing replies

Restore `{{instruction}}`, or add it back alongside your custom instruction. Also make sure the context prefix is appropriate for the selected model.

### A prompt works with one model but not another

This is expected when the models use different chat templates. Save a separate named prompt for each format and switch prompts when you switch models.
