---
title: "NanoGPT-Bilderzeugung auf Android: einen KI-Bild-Agenten in Layla bauen"
description: Nutze die NanoGPT-API zur Bilderzeugung in Layla auf Android. Baue Schritt für Schritt einen Agenten, mit dem KI-Charaktere HiDream-, FLUX- oder SDXL-Bilder im Chat senden.
category: Image generation
order: 60
keywords:
  - NanoGPT-Bilderzeugung
  - NanoGPT-API für Bilderzeugung
  - NanoGPT-Bildmodelle
  - NanoGPT-Bilderzeugung Preise
  - NanoGPT-API
  - NanoGPT-API-Schlüssel
  - NanoGPT-API-Endpunkt
  - nano-gpt.com Bild-API
  - NanoGPT Android-App
  - NanoGPT SillyTavern Bilderzeugung
  - NanoGPT unzensierte Bildmodelle
  - NanoGPT HiDream
  - HiDream-API
  - FLUX-API
  - SDXL-API
  - Bilderzeugungs-API mit Bezahlung pro Bild
  - Bilderzeugungs-API ohne Abo
  - günstige Bilderzeugungs-API
  - OpenAI-kompatible Bilderzeugungs-API
  - images/generations-Endpunkt
  - KI-Chat mit Bilderzeugung
  - KI-Chatbot, der Bilder senden kann
  - KI-Rollenspiel mit Bilderzeugung
  - KI-Charakterbilder erzeugen
  - KI-Bildgenerator für Android
  - eigenen API-Schlüssel verwenden
  - lokales LLM mit Cloud-Bilderzeugung
  - KI-Agenten selbst bauen
  - JavaScript-KI-Agent
  - Layla Eval-Tool
  - Layla JavaScript-Agent
  - Layla-Agent für Bilderzeugung
  - Layla-Agenten
lastUpdated: 2026-11-22
translationKey: how-to-create-a-nanogpt-image-generation-agent-in-layla
ai_translated: true
---

**Mit der NanoGPT-Bilderzeugung erhältst du über einen einzigen API-Schlüssel mit Bezahlung nach Verbrauch Zugriff auf über 200 Bildmodelle, darunter HiDream, FLUX, Seedream, Qwen Image, Stable Diffusion XL und GPT Image, ohne Abonnement.** Diese Anleitung verbindet die NanoGPT-API zur Bilderzeugung mit Layla, einer KI-Chat-App für Android, damit deine KI-Charaktere Bilder im Chat senden können. Wenn dein Charakter in seiner Antwort ein Bild beschreibt, sendet ein Layla-Agent diese Beschreibung an NanoGPT, speichert das zurückgegebene Bild und zeigt es in der Unterhaltung an.

Die Anleitung hat zwei Teile. Der erste zeigt Schritt für Schritt, wie du den KI-Bild-Agenten in der Mini-App _Agenten_ baust, sodass du siehst, wohin jedes Teil gehört. Der zweite erklärt Zeile für Zeile, wie der JavaScript-Code des Agenten funktioniert, damit du ihn ändern oder einen eigenen Agenten für eine andere Bilderzeugungs-API schreiben kannst.

Der Agent läuft in Laylas integrierter JavaScript-Laufzeitumgebung, die Mini-App Python-Interpreter brauchst du also nicht. Wenn du ihn nicht selbst bauen möchtest, kannst du die fertige Agent-Datei herunterladen und stattdessen importieren.

Anders als Laylas [Offline-KI-Modelle](/de/how-to-enable-image-generation-in-layla/) braucht dieser Agent eine Internetverbindung. Deine Bildbeschreibung wird an NanoGPT und an das Unternehmen gesendet, das das Modell betreibt, und jedes Bild wird von deinem NanoGPT-Guthaben bezahlt. Wenn du mit einem lokalen Modell chattest, bleibt der Rest deiner Unterhaltung auf deinem Gerät.

<div class="file-download">
  <div class="file-download-info">
    <span class="file-download-label">Agent-Datei</span>
    <span class="file-download-name">nanogpt-generate-image.json</span>
    <span class="file-download-hint">Ohne NanoGPT-API-Schlüssel funktioniert sie nicht; wie du ihn bekommst, erklärt die Anleitung weiter unten.</span>
  </div>
  <a class="file-download-button" href="/assets/articles/how-to-create-a-nanogpt-image-generation-agent-in-layla/nanogpt-generate-image.json" download="nanogpt-generate-image.json"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>Herunterladen</a>
</div>

## Warum NanoGPT-Bilderzeugung in Layla nutzen?

Laylas eigene Stable-Diffusion-Modelle sind die richtige Wahl, wenn Bilder vollständig auf deinem Smartphone entstehen sollen. NanoGPT passt zu anderen Anforderungen:

- **Bezahlung pro Bild, ohne Abonnement.** Du lädst ein Guthaben auf, und jedes Bild wird davon abgezogen. Zum Zeitpunkt der Erstellung kosten die günstigsten Bildmodelle von NanoGPT weniger als einen halben Cent pro Bild, und HiDream I1 Full, das dieser Agent nutzt, kostet 0,0153 $.
- **Kleine Aufladungen und Zahlung mit Kryptowährung.** NanoGPT akzeptiert Karten ab 1 $ und Kryptowährungen ab 0,10 $. Das passt, wenn du ein Modell ohne große Einzahlung oder ohne Karte ausprobieren möchtest.
- **Viele Bildmodelle hinter einem Schlüssel.** HiDream, FLUX, Seedream, Qwen Image, GPT Image, Stable Diffusion XL und Anime-SDXL-Modelle wie Animagine XL und Illustrious verwenden alle dieselbe Anfrage. Um das Modell zu wechseln, änderst du eine Zeile im Code des Agenten.
- **Eine OpenAI-kompatible Bild-API.** Der Bild-Endpunkt von NanoGPT folgt dem Format von OpenAIs `images/generations`-API. Der Code in dieser Anleitung dient daher auch als Vorlage für andere OpenAI-kompatible Bilderzeugungs-APIs.
- **Ein NanoGPT-Konto für Chat und Bilder.** NanoGPT bietet auch Sprachmodelle über eine OpenAI-kompatible API unter `https://api.nano-gpt.com/api/v1` an, die Layla über seine [Verbindung zu OpenAI-kompatiblen APIs](/de/how-to-connect-layla-to-any-openai-compatible-api/) für die Unterhaltung selbst nutzen kann. Mit diesem Agenten liefert derselbe Schlüssel sowohl die Antworten deines Charakters als auch seine Bilder.
- **Oder ein lokales Chatmodell mit Bildern aus der Cloud.** Der Agent reagiert nur auf die Antwort des Charakters und funktioniert daher mit jedem Modell, mit dem du chattest. Du kannst ein privates Offline-LLM für die Unterhaltung behalten, und nur die Bildbeschreibung verlässt dein Smartphone.
- **Bildqualität, die nicht von deinem Smartphone abhängt.** Das Bild wird auf einem Server erzeugt. Die Geschwindigkeit deines Geräts begrenzt also weder die Modellgröße noch die Wartezeit.

## So funktioniert der KI-Bild-Agent im Überblick

Der Agent nutzt denselben Ablauf wie die anderen Agenten zur Bilderzeugung in Layla, etwa der [OpenRouter-Agent](/de/how-to-use-the-openrouter-image-generation-agent/) und der [Nano-Banana-Agent](/de/how-to-use-the-google-nano-banana-image-generation-agent/):

```text
You ask for an image
  -> the character replies with a tagged image prompt
  -> the Agent's trigger spots the tag
  -> the Eval tool calls NanoGPT's API and saves the picture
  -> the Display Image tool shows it in the chat
```

Ein Agent besteht aus drei Teilen, und dieser nutzt jeden davon einmal:

1. **Ein System-Prompt** teilt dem Sprachmodell deines Charakters mit, dass es Bilder erstellen kann, und zwar indem es eine Bildbeschreibung in `<stable_diffusion_prompt></stable_diffusion_prompt>`-Tags schreibt.
2. **Ein Trigger** überwacht die Antworten des Modells. Enthält eine Antwort den Tag, erfasst der Trigger den Text darin und startet den Agenten.
3. **Zwei Tools** laufen nacheinander. _Eval_ führt ein kurzes JavaScript-Programm aus, das die Beschreibung an NanoGPT sendet und das Bild als Datei speichert. _Display Image_ nimmt diese Datei und zeigt sie im Chat an.

Das Sprachmodell spricht nie mit NanoGPT. Es schreibt nur Text, und alles Weitere übernimmt der Agent. Deshalb funktioniert der Agent mit jedem Chatmodell, auch mit einem kleinen lokalen Modell auf deinem Smartphone.

Der Tag heißt `<stable_diffusion_prompt>`, weil auch Laylas eigene Bilderzeugung auf diesen Tag reagiert. Das ist für die Einrichtung wichtig, wie in [Schritt 1](#schritt-1-laylas-standard-bilderzeugung-ausschalten) erklärt.

## Was du brauchst

- Die Mini-App _Agenten_. Falls du noch nicht mit Agenten gearbeitet hast, lies zuerst [So aktivierst du Agenten, Funktionen und Tool-Aufrufe in Layla](/de/how-to-enable-agents-functions-and-tool-calling-in-layla/).
- Ein NanoGPT-Konto mit Guthaben und einen NanoGPT-API-Schlüssel. Der nächste Abschnitt zeigt, wie das geht.
- Eine Internetverbindung.

## So bekommst du einen NanoGPT-API-Schlüssel

Ein API-Schlüssel ist eine lange Zeichenfolge, die dein NanoGPT-Konto identifiziert, wenn der Agent eine Anfrage sendet. NanoGPT-Schlüssel beginnen mit `sk-nano-`.

1. Rufe [nano-gpt.com](https://nano-gpt.com) auf und melde dich an oder erstelle ein Konto.
2. Öffne die [Balance-Seite](https://nano-gpt.com/balance) und lade Guthaben auf. NanoGPT funktioniert mit Vorauszahlung: Du lädst ein Guthaben auf, und jedes Bild wird davon abgezogen. Dein aktuelles Guthaben steht in der Seitenleiste neben _Usage & billing_. Zum Zeitpunkt der Erstellung akzeptiert NanoGPT Karten, Apple Pay und Google Pay, mit mindestens 1 $ für die erste Karteneinzahlung und danach 5 $, sowie eine Reihe von Kryptowährungen ab 0,10 $. Einzahlungsgebühren fallen nicht an. Die aktuellen Bedingungen stehen auf der [Preisseite](https://nano-gpt.com/pricing).
3. Wähle in der Seitenleiste **API**, um die Seite _API integration_ zu öffnen, oder rufe direkt [nano-gpt.com/api](https://nano-gpt.com/api) auf. Der Tab _API keys_ ist ausgewählt und listet die Schlüssel auf, die du bereits hast.
4. Wähle **Create API key** oben rechts im Abschnitt _API keys_. Der neue Schlüssel erscheint in der Liste, größtenteils verborgen.
5. Wähle das Augensymbol neben dem Schlüssel, um ihn vollständig anzuzeigen, oder das Kopiersymbol daneben, um ihn zu kopieren.

![Die Seite API integration von NanoGPT mit ausgewähltem Eintrag API in der Seitenleiste und einer Liste API keys mit einem Schlüssel, sk-nano-...80ff, daneben Augen- und Kopiersymbol, sowie der Schaltfläche Create API key oben rechts.](./nano-gpt-api-key.png)

Der Text unter der Liste zeigt, wie ein Schlüssel gesendet wird: `Authorization: Bearer $NANOGPT_API_KEY`. Diesen Header verwendet der Code des Agenten, wie in [Die Anfrage senden](#die-anfrage-senden) erklärt.

Behandle den Schlüssel wie ein Passwort. Jeder, der ihn hat, kann Bilder erzeugen, die von deinem Guthaben bezahlt werden. Halte nur ein kleines Guthaben auf dem Konto, wenn du den Agenten ausprobierst.

## NanoGPT-Bildmodelle und Preise

Der Agent nutzt ein Modell und eine Bildgröße, die du oben in seinem Code festlegst. NanoGPT listet seine Bildmodelle auf seiner [Seite zu Bildmodellen](https://nano-gpt.com/models/image) auf. Die genauen Angaben, die der Agent braucht, findest du im Modellkatalog, den du im Browser öffnest:

```text
https://api.nano-gpt.com/api/v1/images/models
```

Er liefert eine lange JSON-Liste mit einem Eintrag pro Modell. Drei Felder in jedem Eintrag sind hier wichtig:

- `id` ist der Wert, den du in `MODEL` einträgst.
- `supported_parameters.resolutions` listet die Größen auf, die das Modell akzeptiert. Eine davon kommt in `SIZE`.
- `pricing.per_image` zeigt den Preis eines Bildes in jeder Größe in US-Dollar.

Die Bezeichnungen der Größen unterscheiden sich von Modell zu Modell. Manche verwenden `1024x1024`, manche `1024*1024`, und manche Namen wie `1k` oder `2k`. Kopiere die Größe genau so, wie der Katalog sie für dein Modell schreibt. Eine Größe, die das Modell nicht unterstützt, ist der häufigste Grund, warum eine Anfrage nach einem Modellwechsel fehlschlägt.

Das sind einige der Text-zu-Bild-Modelle, die NanoGPT zum Zeitpunkt der Erstellung auflistet, mit dem Preis eines Bildes in der angegebenen Größe:

| Modell               | Modell-ID                                    | Beispielgröße | Preis pro Bild | Hinweise                                                                                     |
| -------------------- | -------------------------------------------- | ------------- | -------------- | -------------------------------------------------------------------------------------------- |
| HiDream-I1 Fast      | `hidream-i1-fast`                            | `1024x1024`   | 0,0034 $       | Die schnelle Version von HiDream I1, für häufige Bilder zu geringen Kosten.                  |
| Stable Diffusion XL  | `fast-sdxl`                                  | `1024x1024`   | 0,0051 $       | Das SDXL-Modell, auf dem viele lokale Bildmodelle von Layla basieren.                        |
| WAI Illustrious SDXL | `wai-illustrious-sdxl`                       | `1024x1024`   | 0,0051 $       | Ein Anime-SDXL-Modell, geeignet für Anime-Charaktere und KI-Rollenspiele.                    |
| FLUX.3 Image Klein   | `blackforestlabs/flux-3/klein/text-to-image` | `1024x1024`   | 0,009 $        | Ein schnelles FLUX-Modell von Black Forest Labs. Größen bis `4096x4096`.                     |
| FLUX.2 [klein] 9B    | `flux-2-klein-9b`                            | `1024*1024`   | 0,01 $         | Achte auf das `*` in den Größenangaben.                                                      |
| HiDream I1 Full      | `hidream`                                    | `1024x1024`   | 0,0153 $       | Das Modell, das dieser Agent standardmäßig nutzt. Derselbe Preis in jeder Größe.             |
| Seedream 5.5         | `bytedance/seedream-v5.5`                    | `1k`          | 0,02 $         | Das Modell von ByteDance. `2k` kostet 0,035 $.                                               |
| Qwen Image 3         | `qwen-image-3`                               | `1k`          | 0,03 $         | Akzeptiert `1k` und `2k`.                                                                    |
| GPT Image 2.6 Flare  | `gpt-image-2.6-flare`                        | `1k`          | etwa 0,09 $    | Das Modell von OpenAI, nach Nutzung abgerechnet, daher schwankt der Preis mit jeder Anfrage. |

Preise und Modelle ändern sich häufig. Prüfe daher den Katalog, bevor du dich entscheidest. Du kannst das Modell jederzeit wechseln, indem du zwei Zeilen im Code änderst, wie in [Einstellungen am Anfang](#einstellungen-am-anfang) beschrieben.

Für ein hohes Bild, das einen Smartphone-Bildschirm ausfüllt, wähle eine Hochformat-Größe aus der Liste des Modells, etwa `768x1360` oder `832x1248` für HiDream.

## Schritt 1: Laylas Standard-Bilderzeugung ausschalten

Öffne deine _Inferenz-Einstellungen_, scrolle zum Abschnitt _Bilderzeugung_ und wähle das Bilderzeugungsmodell aus. Wähle in der Liste _Select Model_ den Eintrag **No Image Generation** (keine Bilderzeugung).

![Der Bildschirm Inferenz-Einstellungen mit geöffneter Liste Select Model und ausgewähltem Eintrag No Image Generation.](./no-img-gen-settings.jpg)

Laylas integrierte Bilderzeugung liest denselben Tag `<stable_diffusion_prompt>` aus der Antwort eines Charakters. Ist noch ein Modell ausgewählt, erzeugt Layla aus dem Tag ein eigenes Bild, und du erhältst zwei Bilder. Ist _No Image Generation_ ausgewählt, bleibt der Tag für den Agenten übrig. [So aktivierst du die Bilderzeugung in Layla](/de/how-to-enable-image-generation-in-layla/) zeigt, wo sich diese Einstellung befindet.

Wenn du bereits den [OpenRouter-Agenten](/de/how-to-use-the-openrouter-image-generation-agent/), den [Nano-Banana-Agenten](/de/how-to-use-the-google-nano-banana-image-generation-agent/) oder einen anderen Agenten nutzt, der auf `<stable_diffusion_prompt>` reagiert, schalte ihn aus demselben Grund aus.

## Schritt 2: Einen neuen Agenten erstellen

Öffne die Mini-App _Agenten_. Am schnellsten beginnst du einen neuen Agenten, indem du einen vorhandenen kopierst und seinen Inhalt ersetzt:

1. Wähle auf der Karte eines beliebigen Agenten **More** und dann **Duplicate**.
2. Wähle auf der Kopie **Edit**. Der Bildschirm _Edit Agent_ öffnet sich mit den Angaben des Agenten, seinen Triggern und seinem Tool-Ablauf.
3. Entferne die vorhandenen Trigger der Kopie jeweils mit dem Papierkorbsymbol und jedes ihrer Tools mit **Remove tool**, sodass du mit einem leeren Agenten beginnst.

Wenn du die Bauschritte lieber überspringen möchtest, lade die Agent-Datei aus dieser Anleitung herunter und nutze stattdessen die Schaltfläche **Import** oben in der Mini-App _Agenten_. Mach dann bei [Schritt 7](#schritt-7-deinen-api-schlüssel-eintragen) weiter. Ein importierter Agent ist zunächst ausgeschaltet, schalte also den Schalter auf seiner Karte ein.

## Schritt 3: Den Agenten benennen und den System-Prompt hinzufügen

Fülle die drei Felder oben auf dem Bildschirm _Edit Agent_ aus:

- **Name**: `NanoGPT Image Generation (JS)` oder ein anderer Name, den du wiedererkennst.
- **Description**: ein Satz für dich selbst, zum Beispiel „Erzeugt Bilder mit der NanoGPT-Bild-API aus der Beschreibung, die die KI in einen stable_diffusion_prompt-Tag schreibt.“
- **System Prompt**: Füge den folgenden Text ein.

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

Der Prompt ist auf Englisch verfasst, so wie er in der Agent-Datei steht. [So funktioniert der System-Prompt](#1-der-system-prompt) weiter unten erklärt jeden Teil davon.

## Schritt 4: Den Trigger hinzufügen

Füge unter _Triggers_ einen Trigger hinzu und wähle in der Liste der Trigger-Typen **Regex**. Richte ihn so ein:

- **Regex**: Füge dieses Muster ein.

  ```text
  /<stable_diffusion_prompt>(.*?)</stable_diffusion_prompt>/s
  ```

- **Match on agent output**: Schalte diese Option ein. Der Trigger prüft dann die Antworten deines Charakters statt deiner Nachrichten.
- **Group**: Lass die Einstellung auf _ANY OF THESE_ (OR). Bei nur einem Trigger spielt die Gruppe keine Rolle.

## Schritt 5: Das Tool Eval hinzufügen

Wähle unter _Tools flow_ **Add tool** und dann **Eval**. Lass _Input mode_ auf **Fixed inputs** und füge diesen Code in das Feld `code` ein:

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

_Fixed inputs_ bedeutet, dass der Code genau so ausgeführt wird, wie er dasteht. Der andere Modus, _AI decides_, würde das Sprachmodell bitten, die Eingabe des Tools selbst zu schreiben, und das braucht dieser Agent nicht.

## Schritt 6: Das Tool Display Image hinzufügen

Wähle erneut **Add tool** und dann **Display Image**. Es erscheint im Tool-Ablauf unter _Eval_ und läuft daher als zweites. Setze sein Feld `imagePath` auf:

```text
{{input}}
```

Wähle **Save changes**. Achte danach in der Agentenliste darauf, dass der Schalter auf der Karte des Agenten eingeschaltet ist.

## Schritt 7: Deinen API-Schlüssel eintragen

Öffne den Agenten mit **Edit** und suche diese Zeile oben im Code von _Eval_:

```js
const API_KEY = "YOUR_NANOGPT_API_KEY";
```

Ersetze `YOUR_NANOGPT_API_KEY` durch deinen Schlüssel und behalte die Anführungszeichen bei. Wenn du ein anderes Modell oder eine andere Größe gewählt hast, ändere `MODEL` und `SIZE` in den nächsten beiden Zeilen. Speichere den Agenten.

Dein Schlüssel ist jetzt im Agenten gespeichert. Bevor du den Agenten teilst oder mit **Share** exportierst, setze wieder den Platzhalter ein.

## Schritt 8: Den Agenten testen

Wähle **Test** auf der Karte des Agenten. Im Testbildschirm:

1. Schalte **Test as output** ein. Der Trigger des Agenten prüft nur die Antworten des Charakters, also muss auch die Testeingabe als Antwort behandelt werden.
2. Gib eine Antwort ein, die den Tag enthält, zum Beispiel:

   ```text
   <stable_diffusion_prompt>red fox curled up in fresh snow, soft morning light, shallow depth of field, wildlife photograph</stable_diffusion_prompt>
   ```

3. Starte den Test.

Die Liste _Activity_ zeigt während der Ausführung den Status jedes Tools. Ein erfolgreicher Test sendet eine echte Anfrage an NanoGPT, die ein Bild kostet, und beide Tools laufen ohne Fehler durch. Bricht das Skript mit einem Fehler ab, erscheint die Fehlermeldung beim Schritt _Eval_. Die häufigsten Fehler stehen unter [Fehlerbehebung](#fehlerbehebung). [Layla Agents im Detail](/de/deep-dive-into-layla-agents/) erklärt den Testbildschirm ausführlicher.

Der Test stellt das Bild nicht in einen Chat. Sobald der Test erfolgreich ist, probiere den Agenten in einer echten Unterhaltung aus.

## Schritt 9: Im Chat um ein Bild bitten

Starte einen Chat und bitte um ein Bild, zum Beispiel „Zeig mir einen Leuchtturm auf einer Klippe in der Abenddämmerung“. Der Charakter antwortet mit einer Bildbeschreibung am Ende seiner Nachricht, der Agent läuft, und nach einigen Sekunden erscheint das Bild im Chat.

## So funktioniert der Code des NanoGPT-Bild-Agenten

Dieser Abschnitt begleitet den Agenten durch jedes Teil, das du gebaut hast, und erklärt, warum es so geschrieben ist. [Layla Agents im Detail](/de/deep-dive-into-layla-agents/) behandelt dieselben Bausteine allgemein.

### 1. Der System-Prompt

Der System-Prompt eines Agenten wird bei jedem Durchgang an den System-Prompt deines Charakters angehängt, solange der Agent aktiviert ist, unabhängig davon, ob der Agent läuft. Bevor der Prompt das Modell erreicht, ersetzt Layla `{{char}}` durch den Namen deines Charakters und `{{user}}` durch deinen.

Jeder Teil des Prompts hat eine Aufgabe:

- **„{{char}} can create images.“** (kann Bilder erstellen) Viele Sprachmodelle sind darauf trainiert zu sagen, dass sie keine Bilder machen können. Die Fähigkeit ausdrücklich zu nennen und „never says it cannot create images“ (sagt nie, dass es keine Bilder erstellen kann) hinzuzufügen, verhindert, dass der Charakter ablehnt.
- **„Whenever {{user}} asks to see, draw, paint, picture or imagine something, or a visual would help the conversation“** (immer wenn der Nutzer etwas sehen, zeichnen, malen, abbilden oder sich vorstellen möchte oder ein Bild dem Gespräch helfen würde) legt fest, wann Bilder erscheinen. Der letzte Teil erlaubt dem Charakter, ein Bild zu senden, ohne darum gebeten zu werden. Jedes Bild kostet Geld, entferne also „or a visual would help the conversation“, wenn du Bilder nur auf Anfrage möchtest.
- **„Never describes the image as already visible before it is generated“** (beschreibt das Bild nie als bereits sichtbar, bevor es erzeugt wurde) verhindert Antworten wie „Wie du auf dem Bild sehen kannst …“, die seltsam wirken würden, während das Bild noch entsteht.
- **„At most one tag per reply, at the end“** (höchstens ein Tag pro Antwort, am Ende) ist wichtig, weil der Trigger nur den ersten Tag in einer Antwort liest. Ein zweiter Tag würde ignoriert, und ein Tag am Ende hält das Bild neben dem Text, der es einleitet.
- **„A comma-separated list of descriptive phrases“** (eine kommagetrennte Liste beschreibender Ausdrücke) und die vorgegebene Reihenfolge (Motiv, Aussehen, Pose, Umgebung, Beleuchtung, Bildausschnitt, Stil) sind der Prompt-Stil, auf den Bildmodelle wie HiDream und Stable Diffusion am besten reagieren.
- **„Do not use names the image model would not know“** (keine Namen verwenden, die das Bildmodell nicht kennt) steht dort, weil ein Bildmodell noch nie von deinem Charakter gehört hat. „Eine Frau mit kurzen roten Haaren und grünen Augen“ liefert ein einheitliches Ergebnis, ein Name dagegen nicht.
- **„Describe their appearance in full inside the prompt every time“** (ihr Aussehen jedes Mal vollständig im Prompt beschreiben) folgt aus demselben Umstand. Das Bildmodell sieht nur diesen einen Prompt, nicht die Unterhaltung, also muss jeder Prompt die vollständige Beschreibung enthalten.
- **„Single line, under 75 words, with no quotation marks, backticks or other tags“** (eine Zeile, unter 75 Wörtern, ohne Anführungszeichen, Backticks oder andere Tags) schützt das Skript. Ein Backtick im Prompt würde den Code beschädigen, wie in [Einstellungen am Anfang](#einstellungen-am-anfang) erklärt. Die Wortgrenze hält Prompts kurz und fokussiert, was älteren Bildmodellen entgegenkommt: Der Text-Encoder von Stable Diffusion liest nur 75 Tokens auf einmal, und das sind weniger als 75 Wörter.
- **Das Beispiel** zeigt das genaue Format. Sprachmodelle folgen einem Beispiel zuverlässiger als der Beschreibung eines Formats.

### 2. Der Trigger

Der Trigger ist ein _Regex_-Trigger mit eingeschalteter Option _Match on agent output_, er prüft also jede fertige Antwort des Charakters. Sein Muster lautet:

```text
/<stable_diffusion_prompt>(.*?)</stable_diffusion_prompt>/s
```

- Layla liest den Text zwischen dem ersten `/` und dem letzten `/` als Muster und die Buchstaben nach dem letzten `/` als Flags. Der `/` im schließenden Tag gehört zum Muster und muss daher nicht maskiert werden.
- Die öffnenden und schließenden Tags entsprechen den Tags in der Antwort im Wortlaut.
- `(.*?)` ist eine Erfassungsgruppe. Sie sammelt alles zwischen den Tags. Das `?` sorgt dafür, dass sie am ersten schließenden Tag aufhört statt am letzten.
- Das Flag `s` erlaubt, dass `.` auch Zeilenumbrüche erfasst. Der Trigger funktioniert also auch, wenn das Modell die Beschreibung auf mehrere Zeilen verteilt.

Wenn das Muster passt, wird der gesamte Treffer zu `{{match$0}}` und der von der Gruppe erfasste Text zu `{{match$1}}`. Der Code in _Eval_ verwendet `{{match$1}}`, also nur die Beschreibung ohne die Tags.

Der Trigger liest die Antwort ohne Denkblöcke. Ein Reasoning-Modell, das den Tag schreibt, während es noch nachdenkt, startet den Agenten also nicht. Nur der Tag in der sichtbaren Antwort zählt.

### 3. Das Tool Eval: die NanoGPT-Bild-API aufrufen

_Eval_ führt JavaScript in einer abgeschotteten QuickJS-Laufzeitumgebung innerhalb von Layla aus. Für jede Ausführung wird eine neue Laufzeitumgebung erstellt und danach wieder entfernt. Sie hat keine Webseite und keine Node.js-Module, bietet aber, was dieser Agent braucht:

- `fetch` für Webanfragen, mit Antworten, die `.text()`, `.json()`, `.bytes()` und `.arrayBuffer()` unterstützen.
- `atob`, `btoa` und `toBase64()` für Byte-Arrays, für Base64-Text.
- `setTimeout` und `AbortController`.
- Ein globales Objekt namens `layla`, über das Skripte auf Funktionen von Layla zugreifen, etwa zum Speichern von Dateien.

_Eval_ gibt den Wert des letzten Ausdrucks im Skript zurück. Ist dieser Wert ein Promise, wartet _Eval_ zuerst, bis es erfüllt ist. Was zurückgegeben wird, wird zur Eingabe des nächsten Tools.

#### Der async-Wrapper

```js
(async () => {
  // ...
})();
```

Das gesamte Skript steht in einer asynchronen Pfeilfunktion, die sich sofort selbst aufruft. Dieses Muster erfüllt zwei Zwecke. Der Code kann mit `await` auf das Netzwerk warten, und er kann mit `return` sein Ergebnis zurückgeben. Der Funktionsaufruf ist der letzte Ausdruck des Skripts. _Eval_ wartet also auf das Promise, das er zurückgibt, und verwendet dessen Ergebnis, den Dateinamen, als Ausgabe des Tools.

#### Einstellungen am Anfang

```js
const API_KEY = "YOUR_NANOGPT_API_KEY"; // https://nano-gpt.com/api
const MODEL = "hidream"; // any id from GET https://api.nano-gpt.com/api/v1/images/models
const SIZE = "1024x1024";

const PROMPT = String.raw`{{match$1}}`.trim();
const ENDPOINT = "https://api.nano-gpt.com/v1/images/generations";
```

Alles, was du eventuell ändern möchtest, steht an einer Stelle:

- `API_KEY` ist dein NanoGPT-Schlüssel.
- `MODEL` ist die `id` des Modells aus dem Katalog von NanoGPT.
- `SIZE` ist eine der Größen aus der Liste `supported_parameters.resolutions` des Modells, genau so geschrieben wie im Katalog.
- `ENDPOINT` ist die OpenAI-kompatible Adresse von NanoGPT für die Bilderzeugung. Sie ist für jedes Modell gleich. Weil sie dem Format von OpenAIs Bild-API folgt, funktioniert derselbe Code auch mit anderen Diensten, die einen OpenAI-kompatiblen `images/generations`-Endpunkt anbieten, nachdem du Adresse und Schlüssel geändert hast.

`PROMPT` verdient einen genaueren Blick. Bevor der Code läuft, ersetzt Layla `{{match$1}}` durch den Text, den der Trigger erfasst hat, sodass die Bildbeschreibung Teil des Programms selbst wird. Layla fügt den Text genau so ein, wie er ist, ohne Zeichen zu maskieren. Deshalb steht die Beschreibung in einem Template-Literal, dem Text zwischen den Backticks:

- Ein Template-Literal kann Anführungszeichen und Zeilenumbrüche enthalten, die einen gewöhnlichen `"…"`-String vorzeitig beenden und das Skript beschädigen würden.
- `String.raw` erhält Backslashes so, wie sie geschrieben wurden, statt sie als Escape-Sequenzen wie `\n` zu lesen.
- `.trim()` entfernt Leerzeichen und Zeilenumbrüche am Anfang und Ende der Beschreibung.

Ein Template-Literal endet trotzdem an einem Backtick, und `${` darin beginnt ein Stück Code. Beides in der Beschreibung würde das Skript beschädigen. Deshalb verbietet der System-Prompt Backticks.

#### Die Eingaben prüfen

```js
if (!PROMPT) throw new Error("The <stable_diffusion_prompt> tag was empty.");
if (!API_KEY || API_KEY.startsWith("YOUR_"))
  throw new Error("Set API_KEY in the NanoGPT Image Generation (JS) agent.");
```

Das Skript bricht früh mit einer verständlichen Meldung ab, wenn der Tag leer war oder der Schlüssel nicht gesetzt wurde. Es hat keinen Sinn, für eine Anfrage zu bezahlen, die nicht funktionieren kann.

Wirft ein _Eval_-Skript einen Fehler, hält der Agent an, und _Display Image_ läuft nicht. Layla gibt die Fehlermeldung an das Sprachmodell zurück, im Chat sagt dir dein Charakter also möglicherweise, dass etwas schiefgegangen ist. Im Testbildschirm erscheint die Meldung beim Schritt _Eval_.

#### Die Anfrage senden

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

Dieser Teil spricht mit NanoGPT:

- `fetch` sendet eine `POST`-Anfrage an den Endpunkt, und `await` wartet auf die Antwort.
- Der Header `Authorization` überträgt den API-Schlüssel als Bearer-Token, das Format, das NanoGPT erwartet. Der Schlüssel ist nicht Teil der Webadresse.
- Der Header `Content-Type` teilt NanoGPT mit, dass der Body JSON ist.
- `JSON.stringify` wandelt die Anfragedaten in JSON-Text um. `model`, `prompt` und `size` stammen aus den Einstellungen. `n: 1` fordert ein Bild an. `response_format: "b64_json"` bittet NanoGPT, das Bild selbst als Base64-Text zu senden statt eines Links darauf.
- `response.text()` liest die gesamte Antwort als Text. Das Skript liest sie als Text, statt sofort `response.json()` aufzurufen, damit es die rohe Antwort in eine Fehlermeldung übernehmen kann, falls etwas schiefgeht.

Die [Dokumentation zur Bilderzeugung](https://docs.nano-gpt.com/api-reference/endpoint/image-generation-openai) von NanoGPT listet weitere Felder auf, die du dem Body hinzufügen kannst. Einige davon, etwa `seed`, `guidance_scale` und `num_inference_steps`, funktionieren nur mit bestimmten Modellen.

#### Den Antwortstatus prüfen

```js
if (!response.ok)
  throw new Error(
    `nano-gpt returned HTTP ${response.status}: ${text.slice(0, 500)}`,
  );
```

`response.ok` ist wahr, wenn der HTTP-Status im 200er-Bereich liegt, die Anfrage also erfolgreich war. Andernfalls bricht das Skript ab und übernimmt den Statuscode und die ersten 500 Zeichen der Antwort von NanoGPT in den Fehler. NanoGPT erklärt das Problem in dieser Antwort, sodass ein falscher Schlüssel, ein leeres Guthaben oder eine Größe, die das Modell nicht akzeptiert, im Testbildschirm als klare Meldung erscheint.

#### Das Bild in der Antwort finden

```js
const item = (JSON.parse(text).data || [])[0];
if (!item) throw new Error(`nano-gpt returned no image: ${text.slice(0, 500)}`);
```

Eine erfolgreiche Antwort von NanoGPT sieht so aus:

```json
{
  "created": 1795351940,
  "data": [{ "b64_json": "iVBORw0KGgo..." }],
  "cost": 0.0153,
  "remainingBalance": 4.9847
}
```

`JSON.parse` wandelt den Text in ein Objekt um. `data` ist die Liste der Bilder, und `[0]` nimmt das erste. Der Teil `|| []` verwendet eine leere Liste, wenn `data` fehlt, sodass das Skript „no image“ meldet, statt abzustürzen. Die Antwort nennt außerdem, was das Bild gekostet hat und wie viel Guthaben dir bleibt.

#### Das Bild als Base64 erhalten

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

Base64 ist eine Möglichkeit, Binärdaten wie ein Bild als normale Buchstaben und Ziffern zu schreiben. Laylas Funktion zum Speichern von Dateien erwartet Base64. Dieser Block stellt daher sicher, dass das Skript am Ende Base64-Text hat, egal welche Form NanoGPT verwendet hat:

- **`b64_json`**: der übliche Fall, weil die Anfrage danach gefragt hat. Der Aufruf `replace` entfernt ein Präfix `data:image/png;base64,`, falls vorhanden, denn die Datei darf nur die Base64-Daten enthalten. Gibt es kein Präfix, ändert `replace` nichts.
- **`url`**: NanoGPT antwortet bei manchen Modellen oder wenn es kein Base64 senden kann, möglicherweise stattdessen mit einem Link. Das Skript lädt das Bild mit einem zweiten `fetch` herunter, liest es mit `.bytes()` als rohe Bytes und wandelt die Bytes mit `.toBase64()` in Base64 um. Die Links von NanoGPT laufen nach etwa einem Tag ab. Deshalb speichert das Skript eine Kopie, statt den Link zu speichern.
- **Keins von beiden**: Das Skript bricht mit einem Fehler ab, der zeigt, was NanoGPT gesendet hat.

#### Einen Dateinamen wählen

```js
const ext = base64.startsWith("/9j/")
  ? "jpg"
  : base64.startsWith("UklGR")
    ? "webp"
    : "png";
const filename = `nanogpt_${Date.now()}.${ext}`;
```

Verschiedene Modelle liefern verschiedene Bildformate, und die Antwort von NanoGPT sagt nicht immer, welches gesendet wurde. Das Skript ermittelt es aus den ersten Zeichen des Base64-Texts. Jedes Bildformat beginnt mit einer festen Signatur, und diese Signatur ergibt in Base64 immer dieselben Zeichen:

- `/9j/` ist der Anfang einer JPEG-Datei.
- `UklGR` ist der Anfang einer WebP-Datei.
- Alles andere wird als PNG gespeichert, das häufigste Format. Eine PNG-Datei beginnt in Base64 mit `iVBOR`.

`Date.now()` fügt die aktuelle Zeit in Millisekunden hinzu. So bekommt jedes Bild einen eigenen Dateinamen, und ein neues Bild ersetzt nie ein früheres in deinem Chatverlauf.

#### Die Datei speichern und ihren Namen zurückgeben

```js
await layla.utils.saveFile(filename, base64);
return filename;
```

`layla.utils.saveFile` dekodiert den Base64-Text und schreibt die Datei in den Arbeitsordner des Charakters, einen privaten Ordner, der zu dem Charakter gehört, mit dem du chattest. Der Pfad ist relativ zu diesem Ordner.

Das Skript gibt dann den Dateinamen zurück. Dieser Name ist die Ausgabe des Tools _Eval_.

### 4. Das Tool Display Image

Das zweite Tool ist _Display Image_, und seine einzige Einstellung lautet:

```text
{{input}}
```

`{{input}}` wird durch die Ausgabe des vorherigen Tools ersetzt, also durch den Dateinamen, den das Skript zurückgegeben hat. _Display Image_ sucht diesen Namen zuerst im Arbeitsordner des Charakters, wo das Skript die Datei gespeichert hat. Es kopiert die Datei in Laylas Speicher für Chatbilder und hängt sie an die Antwort des Charakters an, und das Bild erscheint im Chat.

_Display Image_ gibt keinen Text zurück, der Agent endet also still, sobald das Bild angezeigt wird. Das Sprachmodell wird nicht erneut um eine Antwort gebeten.

## Den Agenten anpassen: andere Modelle, Bilder im Smartphone-Format und KI-Rollenspiel

Alle diese Änderungen gehen vom selben Agenten aus:

- **Ein anderes Modell verwenden.** Ändere `MODEL` auf die `id` eines anderen Modells und `SIZE` auf eine seiner Größen und teste den Agenten dann erneut. Für Anime-Charaktere passt ein Anime-SDXL-Modell wie `wai-illustrious-sdxl` meist besser als ein fotografisches Modell.
- **Hohe Bilder für deinen Smartphone-Bildschirm erzeugen.** Setze `SIZE` auf eine Hochformat-Größe aus der Liste deines Modells, etwa `768x1360` für HiDream oder `1088x1920` für HiDream-I1 Fast.
- **Nach jeder Nachricht ein Bild erzeugen.** Ersetze den ersten Absatz des System-Prompts durch die Anweisung, jede Antwort mit einer Bildbeschreibung der aktuellen Szene zu beenden, wie in [Einen Agenten zur Bilderzeugung erstellen](/de/creating-an-image-generation-agent/). Das eignet sich für KI-Rollenspiele und Geschichten, aber dann kostet jede Antwort ein Bild. Ein günstiges Modell wie `hidream-i1-fast` hält die Kosten niedrig.
- **Die Bilder deines KI-Charakters einheitlich halten.** Füge im _Szenario_ des Charakters eine Anweisung wie diese hinzu: „Wenn du einen `<stable_diffusion_prompt>` schreibst, beschreibe dich als eine Frau Ende zwanzig mit kurzen roten Haaren, grünen Augen und Sommersprossen.“ Das Modell wiederholt dann in jedem Prompt dasselbe Aussehen. Ein fester Stil in derselben Anweisung, etwa „Aquarellillustration“, hilft ebenfalls.
- **Generierungseinstellungen hinzufügen.** Füge bei Modellen, die sie unterstützen, Felder wie `seed: 42` zum Objekt in `JSON.stringify` hinzu. Ein fester Seed sorgt dafür, dass wiederholte Prompts ähnliche Bilder liefern.
- **Einen Agenten für einen anderen Dienst schreiben.** System-Prompt, Trigger und _Display Image_ bleiben für jeden Bilddienst gleich. Nur die Anfrage und die Art, wie das Skript das Bild in der Antwort findet, ändern sich. Der [OpenRouter-Agent](/de/how-to-use-the-openrouter-image-generation-agent/) und der [Nano-Banana-Agent](/de/how-to-use-the-google-nano-banana-image-generation-agent/) sind zwei weitere Beispiele für dasselbe Muster.

Es sollte immer nur ein Bild-Agent eingeschaltet sein, weil alle auf denselben Tag reagieren.

## Fehlerbehebung

### Warum habe ich zwei Bilder bekommen?

Entweder ist Laylas integrierte Bilderzeugung noch aktiviert, oder ein anderer Agent, der auf `<stable_diffusion_prompt>` reagiert, ist eingeschaltet. Wähle in den Inferenz-Einstellungen _No Image Generation_ und schalte andere Bild-Agenten aus.

### Der Agent meldet „Set API_KEY in the NanoGPT Image Generation (JS) agent.“

Der Platzhalter für den Schlüssel steht noch im Code. Öffne den Agenten, bearbeite den Code von _Eval_ und ersetze `YOUR_NANOGPT_API_KEY` durch deinen Schlüssel.

### Warum funktioniert mein NanoGPT-API-Schlüssel nicht?

Wenn NanoGPT eine Anfrage ablehnt, bricht der Agent mit einem Fehler ab, der mit „nano-gpt returned HTTP“ beginnt, gefolgt vom Statuscode und der Erklärung von NanoGPT. Die üblichen Ursachen sind:

- **Ein falscher oder gelöschter Schlüssel.** Kopiere den Schlüssel erneut von der [API-Seite](https://nano-gpt.com/api) oder erstelle einen neuen.
- **Ein leeres Guthaben.** Lade auf der [Balance-Seite](https://nano-gpt.com/balance) Guthaben auf.
- **Eine Größe oder Modell-ID, die das Modell nicht akzeptiert.** Prüfe den Eintrag des Modells im Katalog und kopiere `id` und eine Größe aus `supported_parameters.resolutions` exakt, einschließlich der Frage, ob sie `x`, `*` oder einen Namen wie `1k` verwendet.

### Der Test meldet, dass der Agent nicht ausgelöst wurde

Schalte **Test as output** ein und achte darauf, dass die Testeingabe sowohl den öffnenden als auch den schließenden Tag enthält.

### Der Charakter sendet nie ein Bild

Prüfe, ob der Schalter des Agenten eingeschaltet ist, damit sein System-Prompt dem Chat hinzugefügt wird. Kleinere lokale Modelle vergessen den Tag manchmal. Eine direkte Bitte, zum Beispiel „Zeichne mir ein Bild von …“, funktioniert meist. Wenn der Charakter den Tag schreibt, aber kein Bild erscheint, führe den **Test** des Agenten mit der genauen Antwort des Charakters aus, um zu sehen, welcher Schritt fehlschlägt.

### Ein Bild wurde abgelehnt oder kam leer zurück

Jedes Unternehmen wendet auf seine Modelle eigene Inhaltsrichtlinien an. Ein Prompt, den ein Modell ablehnt, kann mit einem anderen funktionieren. Das Skript meldet die Antwort, die NanoGPT gesendet hat, sodass der Testbildschirm den Grund zeigt.

## Häufig gestellte Fragen

### Wie bekomme ich einen NanoGPT-API-Schlüssel?

Melde dich bei [nano-gpt.com](https://nano-gpt.com) an, lade auf der Balance-Seite Guthaben auf, wähle dann in der Seitenleiste **API** und anschließend **Create API key**. Mit dem Augensymbol zeigst du den Schlüssel an, mit dem Kopiersymbol kopierst du ihn. NanoGPT-Schlüssel beginnen mit `sk-nano-`.

### Was kostet die Bilderzeugung mit NanoGPT?

Jedes Modell hat einen eigenen Preis, der im Katalog von NanoGPT steht. Zum Zeitpunkt der Erstellung kostet HiDream I1 Full, das Modell, das dieser Agent standardmäßig nutzt, 0,0153 $ pro Bild, und die günstigsten Modelle kosten weniger als einen halben Cent. Dein NanoGPT-Guthaben zeigt, was du ausgegeben hast, und jede Antwort der API enthält die Kosten des jeweiligen Bildes.

### Brauche ich für die Bilderzeugung ein NanoGPT-Abonnement?

Nein. NanoGPT arbeitet mit einem vorausbezahlten Guthaben, von dem jedes Bild bezahlt wird. NanoGPT bietet zusätzlich ein optionales Monatsabonnement an, und seine [Preisseite](https://nano-gpt.com/pricing) listet auf, was darin enthalten ist.

### Wie lautet der API-Endpunkt für die Bilderzeugung bei NanoGPT?

Der OpenAI-kompatible Endpunkt ist `https://api.nano-gpt.com/v1/images/generations`, aufgerufen mit `POST` und deinem Schlüssel im Header `Authorization: Bearer`. Derselbe Endpunkt bedient jedes Bildmodell, und das Feld `model` bestimmt, welches läuft. Der Modellkatalog liegt unter `https://api.nano-gpt.com/api/v1/images/models`.

### Kann ich diesen Agenten mit einer anderen OpenAI-kompatiblen Bilderzeugungs-API nutzen?

In der Regel ja. Ändere `ENDPOINT` auf die `images/generations`-Adresse des anderen Dienstes, `API_KEY` auf dessen Schlüssel und `MODEL` und `SIZE` auf Werte, die er akzeptiert. Das Skript verarbeitet bereits beide Antwortformate, die OpenAI-kompatible Bild-APIs verwenden: `b64_json` und `url`.

### Welche NanoGPT-Bildmodelle erlauben Inhalte für Erwachsene?

Der Katalog von NanoGPT kennzeichnet jedes Modell mit einem Feld `capabilities.nsfw`. Zum Zeitpunkt der Erstellung sind 37 seiner Text-zu-Bild-Modelle mit `true` markiert, darunter HiDream O1 Image, Qwen Image 3 Uncensored und mehrere Anime- und realistische SDXL-Modelle wie WAI Illustrious SDXL. Prüfe dieses Feld für das gewählte Modell, bevor du dich darauf verlässt. Die Nutzungsbedingungen von NanoGPT gelten trotzdem für jede Anfrage. Für eine Bilderzeugung ganz ohne externen Dienst nutze Laylas [lokale Stable-Diffusion-Modelle](/de/how-to-enable-image-generation-in-layla/).

### Kann ich NanoGPT auch für den Chat nutzen, nicht nur für die Bilder?

Ja. NanoGPT bietet Sprachmodelle über eine OpenAI-kompatible API unter `https://api.nano-gpt.com/api/v1` an. Füge sie in Layla mit demselben Schlüssel hinzu, wie in [So verbindest du Layla mit einer beliebigen OpenAI-kompatiblen API](/de/how-to-connect-layla-to-any-openai-compatible-api/) beschrieben, und dieser Agent ergänzt die Bilder.

### Gibt es eine NanoGPT-App für Android?

NanoGPT ist eine Website und eine API. Layla ist eine Android-App, die damit zusammenarbeitet: Sie kann über ihre Verbindung zu OpenAI-kompatiblen APIs mit den Sprachmodellen von NanoGPT chatten und über diesen Agenten Bilder mit den Bildmodellen von NanoGPT erzeugen.

### Kann ich meine SillyTavern-Charaktere mit der NanoGPT-Bilderzeugung nutzen?

Ja. SillyTavern hat eine integrierte NanoGPT-Bildquelle, und dieser Agent bietet dir eine ähnliche Einrichtung in einer Chat-App auf deinem Smartphone. Layla importiert [TavernPNG-Charakterkarten](/de/how-to-import-tavernpng-characters-in-layla/), das Format, das SillyTavern verwendet, sowie [SillyTavern-Presets](/de/how-to-use-sillytavern-presets-in-layla/), und dieser Agent funktioniert mit jedem Charakter.

### Kann ein KI-Chatbot auf Android Bilder senden?

Ja. Mit diesem Agenten sendet ein Layla-Charakter ein Bild, wann immer du darum bittest, oder nach jeder Nachricht, wenn du es so einrichtest. Layla kann Bilder auch ganz ohne Cloud-Dienst senden, mit Stable-Diffusion-Modellen, die auf deinem Smartphone laufen, wie in [So aktivierst du die Bilderzeugung in Layla](/de/how-to-enable-image-generation-in-layla/) beschrieben.

### Brauche ich die Mini-App Python-Interpreter?

Nein. Der Agent nutzt das Tool _Eval_, das JavaScript direkt in Layla ausführt.

### Ist mein Prompt privat?

Die Bildbeschreibung wird an NanoGPT und an das Unternehmen gesendet, das das gewählte Modell betreibt. Laut der [Datenschutzerklärung](https://nano-gpt.com/legal/privacy-policy) von NanoGPT speichert NanoGPT Prompt-Inhalte standardmäßig nicht auf seinen Servern. Seine Dokumentation weist aber auch darauf hin, dass die Unternehmen, die Bildmodelle betreiben, Prompts und Bilder nach ihren eigenen Richtlinien aufbewahren können. Wenn du mit einem lokalen Modell chattest, bleibt der Rest deiner Unterhaltung auf deinem Gerät.

### Kann ich diesen Agenten ohne Internetverbindung nutzen?

Nein. Der Agent ruft die Server von NanoGPT auf. Für eine Bilderzeugung, die vollständig auf deinem Smartphone läuft, nutze eines der lokalen Modelle aus [So aktivierst du die Bilderzeugung in Layla](/de/how-to-enable-image-generation-in-layla/).

### Wo werden die erzeugten Bilder gespeichert?

Das Skript speichert jedes Bild im Arbeitsordner des Charakters, und _Display Image_ kopiert es in Laylas Speicher für Chatbilder, sodass das Bild in deinem Chatverlauf erhalten bleibt.

## Fazit

Der NanoGPT-Agent nutzt dieselben vier Bausteine wie jeder Agent zur Bilderzeugung in Layla: einen System-Prompt, der um eine Bildbeschreibung in einem Tag bittet, einen Regex-Trigger, der sie abfängt, ein kurzes Skript, das die Beschreibung gegen ein Bild tauscht, und _Display Image_, das das Ergebnis in deinen Chat stellt. Weil NanoGPT über 200 Bildmodelle über einen einzigen Endpunkt anbietet, liefert dasselbe Skript deinen KI-Charakteren Bilder von HiDream, FLUX, SDXL oder GPT Image, wenn du zwei Zeilen änderst.

Layla ist als Offline-KI-Assistent für Android gebaut, und seine lokalen Modelle bleiben die Wahl für vollständig privaten Offline-Chat und Offline-Bilderzeugung. Die NanoGPT-Bilderzeugung ist eine Option, wenn du ein bestimmtes Online-Modell in deinen Chats möchtest und die Verbindung und die Kosten pro Bild in Kauf nimmst.

## Den Agenten herunterladen

<div class="file-download">
  <div class="file-download-info">
    <span class="file-download-label">Agent-Datei</span>
    <span class="file-download-name">nanogpt-generate-image.json</span>
    <span class="file-download-hint">Importiere die Datei mit der Schaltfläche <em>Import</em> in der Mini-App Agenten und trage dann deinen API-Schlüssel ein.</span>
  </div>
  <a class="file-download-button" href="/assets/articles/how-to-create-a-nanogpt-image-generation-agent-in-layla/nanogpt-generate-image.json" download="nanogpt-generate-image.json"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>Herunterladen</a>
</div>
