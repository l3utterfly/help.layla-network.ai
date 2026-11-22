---
title: "AndroidでNanoGPT画像生成：LaylaでAI画像Agentを作る"
description: AndroidのLaylaでNanoGPTの画像生成APIを使います。AIキャラクターがHiDream、FLUX、SDXLの画像をチャットで送れるよう、Agentを1ステップずつ作ります。
category: Image generation
order: 60
keywords:
  - NanoGPT 画像生成
  - NanoGPT 画像生成 API
  - NanoGPT 画像モデル
  - NanoGPT 画像生成 料金
  - NanoGPT API
  - NanoGPT APIキー
  - NanoGPT API エンドポイント
  - nano-gpt.com 画像API
  - NanoGPT Androidアプリ
  - NanoGPT SillyTavern 画像生成
  - NanoGPT 無検閲 画像モデル
  - NanoGPT HiDream
  - HiDream API
  - FLUX API
  - SDXL API
  - 従量課金 画像生成API
  - サブスクなし 画像生成API
  - 安い 画像生成API
  - OpenAI互換 画像生成API
  - images/generations エンドポイント
  - 画像生成付きAIチャット
  - 画像を送れるAIチャットボット
  - 画像生成付きAIロールプレイ
  - AIキャラクター画像ジェネレーター
  - Android向けAI画像ジェネレーター
  - 自分のAPIキーを使うAIチャット
  - ローカルLLMとクラウド画像生成
  - AIエージェントの作り方
  - JavaScript AIエージェント
  - Layla Evalツール
  - Layla JavaScript Agent
  - Layla画像生成Agent
  - Layla Agents
lastUpdated: 2026-11-22
translationKey: how-to-create-a-nanogpt-image-generation-agent-in-layla
ai_translated: true
---

**NanoGPTの画像生成では、従量課金制のAPIキー1つで、HiDream、FLUX、Seedream、Qwen Image、Stable Diffusion XL、GPT Imageなど200以上の画像モデルを使えます。サブスクリプションは不要です。** このガイドでは、NanoGPTの画像生成APIをAndroid向けAIチャットアプリのLaylaに接続し、AIキャラクターがチャットで画像を送れるようにします。キャラクターが返信で画像を描写すると、Layla Agentがその描写をNanoGPTに送り、受け取った画像を保存して、会話に表示します。

この記事は2部構成です。前半では、*Agent*ミニアプリでAI画像Agentを1ステップずつ作り、各部分をどこに設定するかを示します。後半では、AgentのJavaScriptコードの仕組みを1行ずつ解説するので、コードを変更したり、別の画像生成API向けに自分でAgentを書いたりできます。

AgentはLaylaに内蔵されているJavaScript実行環境で動作するため、Pythonインタープリターミニアプリは不要です。自分で作らない場合は、完成したAgentファイルをダウンロードしてインポートすることもできます。

Laylaの[オフラインAIモデル](/ja/how-to-enable-image-generation-in-layla/)と違い、このAgentにはインターネット接続が必要です。画像の描写はNanoGPTと、モデルを運用している企業に送信され、画像1枚ごとの料金がNanoGPTの残高から支払われます。ローカルモデルでチャットしている場合、会話のそれ以外の部分は端末内に残ります。

<div class="file-download">
  <div class="file-download-info">
    <span class="file-download-label">Agentファイル</span>
    <span class="file-download-name">nanogpt-generate-image.json</span>
    <span class="file-download-hint">動作にはNanoGPT APIキーが必要です。取得方法はこの記事の後半で説明します。</span>
  </div>
  <a class="file-download-button" href="/assets/articles/how-to-create-a-nanogpt-image-generation-agent-in-layla/nanogpt-generate-image.json" download="nanogpt-generate-image.json"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>ダウンロード</a>
</div>

## LaylaでNanoGPT画像生成を使う理由

画像をすべてスマートフォン上で生成したい場合は、LaylaのStable Diffusionモデルが適しています。NanoGPTは、それとは別のニーズに応えます。

- **画像ごとの支払いで、サブスクリプションは不要。** 残高をチャージし、画像1枚ごとにそこから差し引かれます。執筆時点で、NanoGPTで最も安い画像モデルは1枚あたり0.5セント未満で、このAgentが使うHiDream I1 Fullは$0.0153です。
- **少額のチャージと暗号資産での支払い。** NanoGPTはカードなら$1から、暗号資産なら$0.10から受け付けています。大きな額を入金せずに、またはカードを使わずにモデルを試したい人に向いています。
- **1つのキーで多数の画像モデル。** HiDream、FLUX、Seedream、Qwen Image、GPT Image、Stable Diffusion XL、Animagine XLやIllustriousなどのアニメ系SDXLモデルが、すべて同じリクエストで使えます。モデルの切り替えは、Agentのコードを1行変えるだけです。
- **OpenAI互換の画像API。** NanoGPTの画像エンドポイントはOpenAIの`images/generations` APIの形式に沿っているため、このガイドのコードは他のOpenAI互換の画像生成API向けのテンプレートとしても使えます。
- **1つのNanoGPTアカウントでチャットも画像も。** NanoGPTは`https://api.nano-gpt.com/api/v1`のOpenAI互換APIで言語モデルも提供しており、Laylaは[OpenAI互換APIの接続](/ja/how-to-connect-layla-to-any-openai-compatible-api/)を通じて会話そのものにも使えます。このAgentと組み合わせれば、同じキーでキャラクターの返信と画像の両方をまかなえます。
- **ローカルのチャットモデルとクラウドの画像生成の組み合わせ。** Agentはキャラクターの返信にだけ反応するため、どのモデルでチャットしていても動作します。会話にはプライベートなオフラインLLMを使い続け、スマートフォンの外に出るのは画像プロンプトだけにできます。
- **スマートフォンの性能に左右されない画質。** 画像はサーバー上で生成されるため、端末の速度がモデルのサイズや待ち時間を制限することはありません。

## AI画像Agentの仕組みの概要

このAgentは、[OpenRouter Agent](/ja/how-to-use-the-openrouter-image-generation-agent/)や[Nano Banana Agent](/ja/how-to-use-the-google-nano-banana-image-generation-agent/)など、Laylaの他の画像生成Agentと同じ流れで動きます。

```text
画像をリクエストする
  -> キャラクターがタグで囲んだ画像プロンプトを返信する
  -> Agentのトリガーがタグを検出する
  -> EvalツールがNanoGPTのAPIを呼び出して画像を保存する
  -> Display Imageツールがチャットに表示する
```

Agentは3つの部分でできており、このAgentはそれぞれを1回ずつ使います。

1. **システムプロンプト**は、キャラクターの言語モデルに、画像を作成できること、そして`<stable_diffusion_prompt></stable_diffusion_prompt>`タグの中に画像プロンプトを書くことで作成することを伝えます。
2. **トリガー**はモデルの返信を監視します。返信にタグが含まれていると、トリガーは中のテキストを取り出してAgentを起動します。
3. **2つのツール**が順番に実行されます。*Eval*は、プロンプトをNanoGPTに送って画像をファイルとして保存する短いJavaScriptプログラムを実行します。*Display Image*は、そのファイルを受け取ってチャットに表示します。

言語モデルがNanoGPTとやり取りすることはありません。モデルが書くのはテキストだけで、それ以降はすべてAgentが処理します。そのため、このAgentはスマートフォン上で動く小さなローカルモデルを含め、どのチャットモデルでも動作します。

タグの名前が`<stable_diffusion_prompt>`なのは、Layla自身の画像生成もこのタグを待ち受けているためです。これはセットアップで重要になります。詳しくは[ステップ1](#ステップ1laylaのデフォルトの画像生成をオフにする)で説明します。

## 必要なもの

- *Agent*ミニアプリ。Agentを使ったことがない場合は、先に[LaylaでAgent、Function、Tool Callingを有効にする方法](/ja/how-to-enable-agents-functions-and-tool-calling-in-layla/)をお読みください。
- 残高のあるNanoGPTアカウントと、NanoGPT APIキー。次のセクションで取得方法を説明します。
- インターネット接続。

## NanoGPT APIキーを取得する方法

APIキーは、Agentがリクエストを送るときにNanoGPTアカウントを識別する長い文字列です。NanoGPTのキーは`sk-nano-`で始まります。

1. [nano-gpt.com](https://nano-gpt.com)にアクセスし、ログインするかアカウントを作成します。
2. [Balanceページ](https://nano-gpt.com/balance)を開いて残高をチャージします。NanoGPTは前払い制で、チャージした残高から画像1枚ごとに差し引かれます。現在の残高は、サイドバーの*Usage & billing*の横に表示されます。執筆時点では、NanoGPTはカード、Apple Pay、Google Payに対応しており、カードでの最初の入金は最低$1、2回目以降は最低$5です。さまざまな暗号資産も$0.10から使えます。入金手数料はかかりません。最新の条件は[料金ページ](https://nano-gpt.com/pricing)に記載されています。
3. サイドバーで**API**を選んで*API integration*ページを開くか、[nano-gpt.com/api](https://nano-gpt.com/api)に直接アクセスします。*API keys*タブが選択されており、すでに持っているキーが一覧表示されます。
4. *API keys*セクションの右上にある**Create API key**を選びます。新しいキーが、大部分が隠された状態で一覧に表示されます。
5. キーの横にある目のアイコンを選ぶとキー全体が表示され、その隣のコピーアイコンを選ぶとキーがコピーされます。

![サイドバーでAPIが選択され、API keysの一覧に目とコピーのアイコンが付いたキーsk-nano-...80ffが1つあり、右上にCreate API keyボタンがあるNanoGPTのAPI integrationページ。](./nano-gpt-api-key.png)

一覧の下のテキストには、キーの送り方が`Authorization: Bearer $NANOGPT_API_KEY`と示されています。これはAgentのコードが使うヘッダーと同じです。詳しくは[リクエストを送信する](#リクエストを送信する)で説明します。

キーはパスワードのように扱ってください。キーを持っている人は、あなたの残高から支払われる画像を生成できます。Agentを試すだけの場合は、アカウントの残高を少額にしておいてください。

## NanoGPTの画像モデルと料金

Agentが使うモデルと画像サイズは1つずつで、どちらもコードの先頭で設定します。NanoGPTは画像モデルを[画像モデルのページ](https://nano-gpt.com/models/image)に掲載しています。Agentに必要な正確な情報を確認するには、ブラウザーでモデルカタログを開きます。

```text
https://api.nano-gpt.com/api/v1/images/models
```

モデルごとに1つのエントリーを持つ長いJSONのリストが返されます。ここで重要なのは、各エントリーの次の3つのフィールドです。

- `id`は、`MODEL`に入れる値です。
- `supported_parameters.resolutions`は、モデルが受け付けるサイズの一覧です。そのうちの1つを`SIZE`に入れます。
- `pricing.per_image`は、各サイズでの画像1枚の価格を米ドルで示します。

サイズの名前はモデルによって異なります。`1024x1024`を使うモデルもあれば、`1024*1024`を使うモデルや、`1k`や`2k`のような名前を使うモデルもあります。使うモデルについて、カタログに書かれているとおりにサイズをコピーしてください。モデルを切り替えたあとにリクエストが失敗する原因で最も多いのは、モデルが対応していないサイズです。

次は、執筆時点でNanoGPTが掲載しているテキストから画像を生成するモデルの一部と、表示したサイズでの画像1枚の価格です。

| モデル               | モデルID                                     | サイズの例  | 画像1枚の価格 | 備考                                                                   |
| -------------------- | -------------------------------------------- | ----------- | ------------- | ---------------------------------------------------------------------- |
| HiDream-I1 Fast      | `hidream-i1-fast`                            | `1024x1024` | $0.0034       | HiDream I1の高速版。低コストで頻繁に画像を出したい場合向け。           |
| Stable Diffusion XL  | `fast-sdxl`                                  | `1024x1024` | $0.0051       | Laylaのローカル画像モデルの多くがベースにしているSDXLモデル。          |
| WAI Illustrious SDXL | `wai-illustrious-sdxl`                       | `1024x1024` | $0.0051       | アニメ系SDXLモデル。アニメキャラクターやAIロールプレイに向く。         |
| FLUX.3 Image Klein   | `blackforestlabs/flux-3/klein/text-to-image` | `1024x1024` | $0.009        | Black Forest Labsの高速なFLUXモデル。最大`4096x4096`に対応。           |
| FLUX.2 [klein] 9B    | `flux-2-klein-9b`                            | `1024*1024` | $0.01         | サイズ名に`*`を使う点に注意。                                          |
| HiDream I1 Full      | `hidream`                                    | `1024x1024` | $0.0153       | このAgentがデフォルトで使うモデル。どのサイズでも同じ価格。            |
| Seedream 5.5         | `bytedance/seedream-v5.5`                    | `1k`        | $0.02         | ByteDanceのモデル。`2k`は$0.035。                                      |
| Qwen Image 3         | `qwen-image-3`                               | `1k`        | $0.03         | `1k`と`2k`に対応。                                                     |
| GPT Image 2.6 Flare  | `gpt-image-2.6-flare`                        | `1k`        | 約$0.09       | OpenAIのモデル。使用量で課金されるため、価格はリクエストごとに変わる。 |

価格とモデルはよく変わるため、選ぶ前にカタログを確認してください。[先頭の設定](#先頭の設定)で説明しているとおり、コードの2行を変更すればいつでもモデルを切り替えられます。

スマートフォンの画面いっぱいに表示される縦長の画像にするには、モデルのサイズ一覧から縦向きのサイズを選びます。HiDreamなら`768x1360`や`832x1248`などです。

## ステップ1：Laylaのデフォルトの画像生成をオフにする

*推論設定*を開き、*画像生成*セクションまでスクロールして、画像生成モデルを選びます。*Select Model*の一覧で**No Image Generation**（画像生成なし）を選びます。

![Select Modelの一覧が開き、No Image Generationが選択された推論設定の画面。](./no-img-gen-settings.jpg)

Layla内蔵の画像生成も、キャラクターの返信から同じ`<stable_diffusion_prompt>`タグを読み取ります。モデルが選択されたままだと、Laylaがそのタグから独自の画像を生成し、画像が2枚届きます。*No Image Generation*を選んでおけば、タグはAgentに任されます。[Laylaで画像生成を有効にする方法](/ja/how-to-enable-image-generation-in-layla/)で、この設定の場所を確認できます。

すでに[OpenRouter Agent](/ja/how-to-use-the-openrouter-image-generation-agent/)、[Nano Banana Agent](/ja/how-to-use-the-google-nano-banana-image-generation-agent/)、または`<stable_diffusion_prompt>`に反応する別のAgentを使っている場合は、同じ理由でそれをオフにしてください。

## ステップ2：新しいAgentを作成する

*Agent*ミニアプリを開きます。新しいAgentを始めるいちばん早い方法は、既存のAgentをコピーして中身を入れ替えることです。

1. いずれかのAgentのカードで**More**を選び、次に**Duplicate**を選びます。
2. コピーで**Edit**を選びます。*Edit Agent*画面が開き、Agentの詳細、トリガー、ツールの流れが表示されます。
3. コピーにある既存のトリガーをそれぞれのゴミ箱アイコンで削除し、各ツールを**Remove tool**で削除して、空のAgentから始めます。

作成手順を省きたい場合は、この記事のAgentファイルをダウンロードし、代わりに*Agent*ミニアプリ上部の**Import**ボタンを使ってください。そのあとは[ステップ7](#ステップ7apiキーを追加する)に進みます。インポートしたAgentはオフの状態で始まるため、カードのスイッチをオンにしてください。

## ステップ3：Agentに名前を付けてシステムプロンプトを追加する

*Edit Agent*画面の上部にある3つの欄に入力します。

- **Name**：`NanoGPT Image Generation (JS)`、または自分で分かる任意の名前。
- **Description**：自分用のメモとなる一文。例：「Generates images with the NanoGPT image API from the prompt the AI writes in a stable_diffusion_prompt tag.」
- **System Prompt**：次のテキストを貼り付けます。

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

各部分の意味は、後の[システムプロンプトの仕組み](#1-システムプロンプト)で説明します。

## ステップ4：トリガーを追加する

*Triggers*でトリガーを追加し、トリガーの種類の一覧から**Regex**を選びます。次のように設定します。

- **Regex**：次のパターンを貼り付けます。

  ```text
  /<stable_diffusion_prompt>(.*?)</stable_diffusion_prompt>/s
  ```

- **Match on agent output**：オンにします。これにより、トリガーはあなたのメッセージではなく、キャラクターの返信を確認します。
- **Group**：_ANY OF THESE_（OR）のままにします。トリガーが1つだけなら、グループの設定は結果に影響しません。

## ステップ5：Evalツールを追加する

*Tools flow*で**Add tool**を選び、**Eval**を選びます。*Input mode*は**Fixed inputs**のままにし、`code`欄に次のコードを貼り付けます。

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

*Fixed inputs*は、コードが書かれたとおりに実行されることを意味します。もう1つのモード*AI decides*では、ツールの入力を言語モデル自身に書かせますが、このAgentにはそれは必要ありません。

## ステップ6：Display Imageツールを追加する

もう一度**Add tool**を選び、**Display Image**を選びます。ツールの流れで*Eval*の下に表示されるため、2番目に実行されます。`imagePath`欄を次のように設定します。

```text
{{input}}
```

**Save changes**を選びます。Agentの一覧に戻ったら、Agentのカードのスイッチがオンになっていることを確認してください。

## ステップ7：APIキーを追加する

**Edit**でAgentを開き、*Eval*のコードの冒頭付近にある次の行を探します。

```js
const API_KEY = "YOUR_NANOGPT_API_KEY";
```

`YOUR_NANOGPT_API_KEY`を自分のキーに置き換えます。引用符はそのまま残してください。別のモデルやサイズを選んだ場合は、続く2行の`MODEL`と`SIZE`を変更します。Agentを保存します。

キーはAgentの内部に保存されました。Agentを共有したり**Share**でエクスポートしたりする前に、キーを元のプレースホルダーに戻してください。

## ステップ8：Agentをテストする

Agentのカードで**Test**を選びます。テスト画面で次のように操作します。

1. **Test as output**をオンにします。Agentのトリガーはキャラクターの返信だけを見るため、テストの入力も返信として扱う必要があります。
2. タグを含む返信を入力します。例：

   ```text
   <stable_diffusion_prompt>red fox curled up in fresh snow, soft morning light, shallow depth of field, wildlife photograph</stable_diffusion_prompt>
   ```

3. テストを実行します。

*Activity*の一覧に、実行中の各ツールの状態が表示されます。テストが成功すると、NanoGPTに実際のリクエストが1回送られて画像1枚分の料金がかかり、両方のツールがエラーなしで完了します。スクリプトがエラーで止まった場合は、*Eval*のステップにエラーメッセージが表示されます。よくあるエラーは[トラブルシューティング](#トラブルシューティング)にまとめています。テスト画面の詳しい説明は[Layla Agentsの詳しい仕組み](/ja/deep-dive-into-layla-agents/)にあります。

テストでは画像はチャットに表示されません。テストに成功したら、実際の会話でAgentを試してください。

## ステップ9：チャットで画像をリクエストする

チャットを開始し、画像をリクエストします。たとえば「夕暮れの崖の上の灯台を見せて」と送ります。キャラクターがメッセージの最後に画像プロンプトを付けて返信し、Agentが実行され、数秒後に画像がチャットに表示されます。

## NanoGPT画像Agentのコードの仕組み

このセクションでは、作成した各部分に沿ってAgentを見ていき、それぞれがなぜそのように書かれているかを説明します。同じ構成要素の全般的な説明は[Layla Agentsの詳しい仕組み](/ja/deep-dive-into-layla-agents/)にあります。

### 1. システムプロンプト

Agentのシステムプロンプトは、Agentが有効な間、Agentが実行されるかどうかに関係なく、毎ターン、キャラクターのシステムプロンプトに追加されます。プロンプトがモデルに届く前に、Laylaは`{{char}}`をキャラクターの名前に、`{{user}}`をあなたの名前に置き換えます。

プロンプトの各部分には役割があります。

- **「{{char}} can create images.」**（{{char}}は画像を作成できる）多くの言語モデルは、画像は作れないと答えるように学習されています。この能力を明記し、「never says it cannot create images」（画像を作成できないとは決して言わない）と加えることで、キャラクターが断るのを防ぎます。
- **「Whenever {{user}} asks to see, draw, paint, picture or imagine something, or a visual would help the conversation」**（{{user}}が何かを見たい、描いてほしい、思い浮かべてほしいと求めたとき、または視覚的な表現が会話に役立つとき）は、画像が表示されるタイミングを決めます。最後の部分により、キャラクターは頼まれなくても画像を送れます。画像1枚ごとに料金がかかるため、リクエストしたときだけ画像を出したい場合は「or a visual would help the conversation」を削除してください。
- **「Never describes the image as already visible before it is generated」**（生成される前に、画像がすでに見えているかのように描写しない）は、「画像を見ると分かるように…」のような返信を防ぎます。画像がまだ作られている間にこうした返信があると不自然になります。
- **「At most one tag per reply, at the end」**（タグは1つの返信につき最大1つで、最後に置く）が重要なのは、トリガーが返信の最初のタグしか読まないためです。2つ目のタグは無視されます。また、タグを最後に置くと、画像を紹介するテキストのすぐ隣に画像が表示されます。
- **「A comma-separated list of descriptive phrases」**（カンマ区切りの描写フレーズのリスト）と、そこで示す順序（被写体、外見、ポーズ、背景、照明、構図、スタイル）は、HiDreamやStable Diffusionなどの画像モデルが最もよく反応するプロンプトの書き方です。
- **「Do not use names the image model would not know」**（画像モデルが知らない名前を使わない）があるのは、画像モデルがあなたのキャラクターを知らないためです。「短い赤い髪と緑の瞳の女性」と書けば一貫した結果になりますが、名前ではそうなりません。
- **「Describe their appearance in full inside the prompt every time」**（毎回、プロンプトの中で外見をすべて描写する）も同じ理由によるものです。画像モデルが見るのはこの1つのプロンプトだけで、会話は見ないため、どのプロンプトにも完全な描写が必要です。
- **「Single line, under 75 words, with no quotation marks, backticks or other tags」**（1行で75語未満、引用符、バッククォート、他のタグを含めない）は、スクリプトを守ります。[先頭の設定](#先頭の設定)で説明するとおり、プロンプトの中にバッククォートがあるとコードが壊れます。語数の上限はプロンプトを短く焦点の絞られたものにし、古い画像モデルにも合います。Stable Diffusionのテキストエンコーダーが一度に読むのは75トークンだけで、これは75語より少なくなります。
- **例**は、正確な形式を示します。言語モデルは、形式の説明よりも例のほうを確実に守ります。

### 2. トリガー

トリガーは、*Match on agent output*をオンにした*Regex*トリガーなので、キャラクターの完成した返信を1つずつ確認します。パターンは次のとおりです。

```text
/<stable_diffusion_prompt>(.*?)</stable_diffusion_prompt>/s
```

- Laylaは、最初の`/`と最後の`/`の間のテキストをパターンとして、最後の`/`より後の文字をフラグとして読み取ります。終了タグの中の`/`はパターンの一部なので、エスケープする必要はありません。
- 開始タグと終了タグは、返信の中のタグそのものに一致します。
- `(.*?)`はキャプチャグループです。タグの間にあるすべてを取り出します。`?`によって、最後ではなく最初の終了タグで止まります。
- `s`フラグにより`.`が改行にも一致するため、モデルがプロンプトを複数行に分けて書いてもトリガーは動作します。

パターンが一致すると、一致した全体が`{{match$0}}`になり、グループが取り出したテキストが`{{match$1}}`になります。*Eval*のコードは`{{match$1}}`を使います。これはタグを除いたプロンプトだけです。

トリガーは思考ブロックを取り除いた返信を読むため、推論モデルが思考中にタグを書いてもAgentは起動しません。対象になるのは、表示される返信の中のタグだけです。

### 3. Evalツール：NanoGPT画像APIを呼び出す

*Eval*は、Layla内のサンドボックス化されたQuickJS実行環境でJavaScriptを実行します。実行環境は実行のたびに新しく作られ、終わると削除されます。WebページもNode.jsのモジュールもありませんが、このAgentに必要なものはそろっています。

- Webリクエスト用の`fetch`。レスポンスは`.text()`、`.json()`、`.bytes()`、`.arrayBuffer()`に対応しています。
- base64テキスト用の`atob`、`btoa`と、バイト配列の`toBase64()`。
- `setTimeout`と`AbortController`。
- `layla`というグローバルオブジェクト。ファイルの保存など、Laylaの機能にスクリプトからアクセスできます。

*Eval*はスクリプトの最後の式の値を返します。その値がPromiseの場合、*Eval*はまず完了を待ちます。返された値が、次のツールの入力になります。

#### asyncラッパー

```js
(async () => {
  // ...
})();
```

スクリプト全体は、すぐに自分自身を呼び出すasyncのアロー関数の中にあります。このパターンには2つの役割があります。コードで`await`を使ってネットワークを待てるようにし、`return`で結果を返せるようにします。関数の呼び出しがスクリプトの最後の式なので、*Eval*はそれが返すPromiseを待ち、その結果であるファイル名をツールの出力として使います。

#### 先頭の設定

```js
const API_KEY = "YOUR_NANOGPT_API_KEY"; // https://nano-gpt.com/api
const MODEL = "hidream"; // any id from GET https://api.nano-gpt.com/api/v1/images/models
const SIZE = "1024x1024";

const PROMPT = String.raw`{{match$1}}`.trim();
const ENDPOINT = "https://api.nano-gpt.com/v1/images/generations";
```

変更したくなる可能性のあるものは、すべて1か所にまとまっています。

- `API_KEY`はあなたのNanoGPTのキーです。
- `MODEL`は、NanoGPTのカタログにあるモデルの`id`です。
- `SIZE`は、モデルの`supported_parameters.resolutions`一覧にあるサイズの1つで、カタログに書かれているとおりに書きます。
- `ENDPOINT`は、NanoGPTのOpenAI互換の画像生成アドレスです。どのモデルでも同じです。OpenAIの画像APIの形式に沿っているため、アドレスとキーを変更すれば、OpenAI互換の`images/generations`エンドポイントを提供する他のサービスでも同じコードが使えます。

`PROMPT`はもう少し詳しく見る必要があります。コードが実行される前に、Laylaは`{{match$1}}`をトリガーが取り出したテキストに置き換えるため、画像プロンプトがプログラムそのものの一部になります。Laylaはテキストを、どの文字もエスケープせず、そのまま貼り付けます。そのため、プロンプトはテンプレートリテラル（バッククォートの間のテキスト）の中に置かれています。

- テンプレートリテラルには、引用符や改行を含められます。通常の`"…"`文字列では、これらによって文字列が途中で終わり、スクリプトが壊れてしまいます。
- `String.raw`は、バックスラッシュを`\n`のようなエスケープコードとして読まず、入力どおりに保ちます。
- `.trim()`は、プロンプトの先頭と末尾の空白や改行を取り除きます。

テンプレートリテラルもバッククォートで終わり、中の`${`はコードの始まりになります。プロンプトにどちらかがあるとスクリプトが壊れるため、システムプロンプトでバッククォートを禁止しています。

#### 入力を確認する

```js
if (!PROMPT) throw new Error("The <stable_diffusion_prompt> tag was empty.");
if (!API_KEY || API_KEY.startsWith("YOUR_"))
  throw new Error("Set API_KEY in the NanoGPT Image Generation (JS) agent.");
```

タグが空だった場合や、キーが設定されていない場合、スクリプトは分かりやすいメッセージとともに早い段階で止まります。うまくいくはずのないリクエストに料金を払う意味はありません。

*Eval*のスクリプトがエラーを投げると、Agentは停止し、*Display Image*は実行されません。Laylaはエラーメッセージを言語モデルに返すため、チャットではキャラクターが問題が起きたことを伝えることがあります。テスト画面では、メッセージは*Eval*のステップに表示されます。

#### リクエストを送信する

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

ここがNanoGPTとやり取りする部分です。

- `fetch`はエンドポイントに`POST`リクエストを送り、`await`が応答を待ちます。
- `Authorization`ヘッダーは、APIキーをNanoGPTが求める形式であるBearerトークンとして送ります。キーはWebアドレスには含まれません。
- `Content-Type`ヘッダーは、本文がJSONであることをNanoGPTに伝えます。
- `JSON.stringify`は、リクエストのデータをJSONテキストに変換します。`model`、`prompt`、`size`は設定から取られます。`n: 1`は画像を1枚求めます。`response_format: "b64_json"`は、画像へのリンクではなく、画像そのものをbase64テキストとして送るようNanoGPTに求めます。
- `response.text()`は、応答全体をテキストとして読み取ります。すぐに`response.json()`を呼ばずにテキストとして読むのは、問題が起きたときに生の応答をエラーメッセージに含められるようにするためです。

NanoGPTの[画像生成ドキュメント](https://docs.nano-gpt.com/api-reference/endpoint/image-generation-openai)には、本文に追加できる他のフィールドが記載されています。`seed`、`guidance_scale`、`num_inference_steps`など、一部のフィールドは特定のモデルでしか機能しません。

#### レスポンスのステータスを確認する

```js
if (!response.ok)
  throw new Error(
    `nano-gpt returned HTTP ${response.status}: ${text.slice(0, 500)}`,
  );
```

`response.ok`は、HTTPステータスが200番台、つまりリクエストが成功したときにtrueになります。それ以外の場合、スクリプトは停止し、ステータスコードとNanoGPTの応答の先頭500文字をエラーに含めます。NanoGPTはその応答の中で問題を説明するため、キーの誤り、残高不足、モデルが受け付けないサイズなどが、テスト画面に分かりやすいメッセージとして表示されます。

#### レスポンスから画像を見つける

```js
const item = (JSON.parse(text).data || [])[0];
if (!item) throw new Error(`nano-gpt returned no image: ${text.slice(0, 500)}`);
```

NanoGPTからの成功した応答は次のようになります。

```json
{
  "created": 1795351940,
  "data": [{ "b64_json": "iVBORw0KGgo..." }],
  "cost": 0.0153,
  "remainingBalance": 4.9847
}
```

`JSON.parse`はテキストをオブジェクトに変換します。`data`は画像のリストで、`[0]`で最初の1枚を取り出します。`|| []`の部分は、`data`がない場合に空のリストを使うため、スクリプトはクラッシュせずに「画像がない」と報告します。応答には、その画像の料金と残りの残高も含まれています。

#### 画像をbase64で取得する

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

base64は、画像などのバイナリデータを通常の英字と数字で表す方法です。Laylaのファイル保存関数はbase64を受け取るため、このブロックは、NanoGPTがどちらの形式を使った場合でも、スクリプトが最終的にbase64テキストを持つようにします。

- **`b64_json`**：リクエストでこれを求めているため、通常はこちらです。`replace`の呼び出しは、`data:image/png;base64,`という接頭辞があれば取り除きます。ファイルにはbase64のデータだけが含まれている必要があるためです。接頭辞がない場合、`replace`は何も変更しません。
- **`url`**：モデルによっては、またはbase64を送れない場合に、NanoGPTが代わりにリンクで応答することがあります。スクリプトは2回目の`fetch`で画像をダウンロードし、`.bytes()`で生のバイト列として読み取り、`.toBase64()`でバイト列をbase64に変換します。NanoGPTのリンクは約1日で期限切れになるため、スクリプトはリンクを保存せずに画像のコピーを保存します。
- **どちらもない場合**：スクリプトは、NanoGPTが送ってきた内容を示すエラーとともに停止します。

#### ファイル名を決める

```js
const ext = base64.startsWith("/9j/")
  ? "jpg"
  : base64.startsWith("UklGR")
    ? "webp"
    : "png";
const filename = `nanogpt_${Date.now()}.${ext}`;
```

モデルによって返す画像の形式は異なり、NanoGPTの応答にはどの形式を送ったかが必ずしも書かれていません。スクリプトは、base64テキストの最初の数文字から形式を判断します。どの画像形式も決まったシグネチャーで始まり、そのシグネチャーは常に同じbase64の文字に変換されます。

- `/9j/`はJPEGファイルの先頭です。
- `UklGR`はWebPファイルの先頭です。
- それ以外は、最も一般的な形式であるPNGとして保存されます。PNGファイルは`iVBOR`に変換されます。

`Date.now()`は現在の時刻をミリ秒で加えるため、画像ごとに固有のファイル名が付き、新しい画像がチャット履歴にある以前の画像を上書きすることはありません。

#### ファイルを保存して名前を返す

```js
await layla.utils.saveFile(filename, base64);
return filename;
```

`layla.utils.saveFile`はbase64テキストをデコードし、キャラクターのワークスペースにファイルを書き込みます。ワークスペースは、チャットしているキャラクターに属するプライベートなフォルダーです。パスはそのフォルダーからの相対パスです。

その後、スクリプトはファイル名を返します。この名前が*Eval*ツールの出力になります。

### 4. Display Imageツール

2つ目のツールは*Display Image*で、設定は次の1つだけです。

```text
{{input}}
```

`{{input}}`は、前のツールの出力、つまりスクリプトが返したファイル名に置き換えられます。*Display Image*は、まずキャラクターのワークスペースでその名前を探します。スクリプトがファイルを保存した場所です。ファイルをLaylaのチャット画像の保存場所にコピーしてキャラクターの返信に添付し、画像がチャットに表示されます。

*Display Image*はテキストを返さないため、画像が表示されるとAgentは静かに終了します。言語モデルに再び返信させることはありません。

## Agentをカスタマイズする：他のモデル、スマートフォンサイズの画像、AIロールプレイ

次の変更は、どれも同じAgentから始められます。

- **別のモデルを使う。** `MODEL`を別のモデルの`id`に、`SIZE`をそのモデルのサイズの1つに変更し、もう一度Agentをテストします。アニメキャラクターには、写真向けのモデルよりも、`wai-illustrious-sdxl`などのアニメ系SDXLモデルのほうが合うことが多いです。
- **スマートフォンの画面に合う縦長の画像にする。** `SIZE`を、使うモデルの一覧にある縦向きのサイズに設定します。HiDreamなら`768x1360`、HiDream-I1 Fastなら`1088x1920`などです。
- **メッセージごとに画像を生成する。** [画像生成Agentを作成する方法](/ja/creating-an-image-generation-agent/)のように、システムプロンプトの最初の段落を、すべての返信の最後に現在のシーンの画像プロンプトを付ける指示に置き換えます。AIロールプレイやストーリーに向いていますが、すべての返信に画像1枚分の料金がかかります。`hidream-i1-fast`のような低価格のモデルなら費用を抑えられます。
- **AIキャラクターの画像を一貫させる。** キャラクターの*シナリオ*に、次のような指示を追加します。「`<stable_diffusion_prompt>`を書くときは、自分自身を20代後半の女性、短い赤い髪、緑の瞳、そばかすとして描写すること。」モデルがすべてのプロンプトで同じ外見を繰り返すようになります。同じ指示に「水彩イラスト」のような固定の画風を加えるのも効果があります。
- **生成設定を追加する。** 対応しているモデルでは、`JSON.stringify`の中のオブジェクトに`seed: 42`などのフィールドを追加します。シードを固定すると、同じプロンプトを繰り返したときに似た画像になります。
- **別のサービス向けのAgentを書く。** システムプロンプト、トリガー、*Display Image*は、どの画像サービスでも変わりません。変わるのは、リクエストと、スクリプトが応答から画像を見つける方法だけです。[OpenRouter Agent](/ja/how-to-use-the-openrouter-image-generation-agent/)と[Nano Banana Agent](/ja/how-to-use-the-google-nano-banana-image-generation-agent/)も、同じパターンの例です。

画像Agentはどれも同じタグに反応するため、オンにするのは一度に1つだけにしてください。

## トラブルシューティング

### 画像が2枚届いたのはなぜですか？

Layla内蔵の画像生成がまだ有効になっているか、`<stable_diffusion_prompt>`に反応する別のAgentがオンになっています。推論設定で*No Image Generation*を選び、他の画像Agentをオフにしてください。

### Agentに「Set API_KEY in the NanoGPT Image Generation (JS) agent.」と表示されます

キーのプレースホルダーがコードに残っています。Agentを開いて*Eval*のコードを編集し、`YOUR_NANOGPT_API_KEY`を自分のキーに置き換えてください。

### NanoGPT APIキーが動作しないのはなぜですか？

NanoGPTがリクエストを拒否すると、Agentは「nano-gpt returned HTTP」で始まるエラーで停止し、その後にステータスコードとNanoGPT自身の説明が続きます。よくある原因は次のとおりです。

- **キーが間違っているか、削除されている。** [APIページ](https://nano-gpt.com/api)からキーをもう一度コピーするか、新しいキーを作成してください。
- **残高がない。** [Balanceページ](https://nano-gpt.com/balance)で残高をチャージしてください。
- **モデルが受け付けないサイズやモデルID。** カタログでモデルのエントリーを確認し、`id`と、`supported_parameters.resolutions`にあるサイズを正確にコピーしてください。`x`、`*`、`1k`のような名前のどれを使うかも含めて確認します。

### テストでAgentがトリガーされなかったと表示されます

**Test as output**をオンにし、テストの入力に開始タグと終了タグの両方が含まれていることを確認してください。

### キャラクターが画像を送ってこない

Agentのスイッチがオンになっていて、システムプロンプトがチャットに追加されていることを確認してください。小さなローカルモデルは、タグを忘れることがあります。「…の絵を描いて」のように直接頼むと、たいていうまくいきます。キャラクターがタグを書いているのに画像が表示されない場合は、キャラクターの返信をそのまま使ってAgentの**Test**を実行し、どのステップで失敗しているかを確認してください。

### 画像が拒否された、または空で返ってきた

各企業は、自社のモデルに独自のコンテンツポリシーを適用しています。あるモデルが断るプロンプトでも、別のモデルでは動作することがあります。スクリプトはNanoGPTが送ってきた応答を報告するため、テスト画面に理由が表示されます。

## よくある質問

### NanoGPT APIキーはどうすれば取得できますか？

[nano-gpt.com](https://nano-gpt.com)にログインし、Balanceページで残高をチャージしてから、サイドバーで**API**を選び、**Create API key**を選びます。目のアイコンでキーを表示し、コピーアイコンでコピーします。NanoGPTのキーは`sk-nano-`で始まります。

### NanoGPTの画像生成の料金はいくらですか？

モデルごとに価格が異なり、NanoGPTのカタログに記載されています。執筆時点で、このAgentがデフォルトで使うHiDream I1 Fullは画像1枚あたり$0.0153で、最も安いモデルは0.5セント未満です。NanoGPTの残高で支出を確認でき、APIからの応答にはその画像の料金が毎回含まれています。

### 画像生成にNanoGPTのサブスクリプションは必要ですか？

いいえ。NanoGPTは前払いの残高で動作し、画像1枚ごとにそこから支払われます。NanoGPTには任意の月額サブスクリプションもあり、その内容は[料金ページ](https://nano-gpt.com/pricing)に記載されています。

### NanoGPTの画像生成APIのエンドポイントは何ですか？

OpenAI互換のエンドポイントは`https://api.nano-gpt.com/v1/images/generations`で、`POST`で呼び出し、キーを`Authorization: Bearer`ヘッダーに入れます。同じエンドポイントですべての画像モデルが使え、`model`フィールドでどのモデルを実行するかを選びます。モデルカタログは`https://api.nano-gpt.com/api/v1/images/models`にあります。

### このAgentを別のOpenAI互換の画像生成APIで使えますか？

たいていは使えます。`ENDPOINT`を相手のサービスの`images/generations`のアドレスに、`API_KEY`をそのサービスのキーに、`MODEL`と`SIZE`をそのサービスが受け付ける値に変更します。スクリプトは、OpenAI互換の画像APIが使う2つの応答形式、`b64_json`と`url`の両方にすでに対応しています。

### 成人向けコンテンツを許可しているNanoGPTの画像モデルはどれですか？

NanoGPTのカタログでは、各モデルに`capabilities.nsfw`フィールドが付いています。執筆時点で、テキストから画像を生成するモデルのうち37個が`true`になっており、HiDream O1 Image、Qwen Image 3 Uncensored、WAI Illustrious SDXLなどのアニメ系や写実系のSDXLモデルが含まれます。選んだモデルについて、頼る前にこのフィールドを確認してください。どのリクエストにもNanoGPTの利用規約が適用されます。外部のサービスをまったく使わずに画像を生成したい場合は、Laylaの[ローカルのStable Diffusionモデル](/ja/how-to-enable-image-generation-in-layla/)を使ってください。

### チャットにも画像にもNanoGPTを使えますか？

はい。NanoGPTは`https://api.nano-gpt.com/api/v1`のOpenAI互換APIで言語モデルを提供しています。[LaylaをOpenAI互換APIに接続する方法](/ja/how-to-connect-layla-to-any-openai-compatible-api/)の説明に従って同じキーでLaylaに追加すれば、このAgentが画像を加えます。

### Android向けのNanoGPTアプリはありますか？

NanoGPTはWebサイトとAPIです。LaylaはNanoGPTと連携できるAndroidアプリで、OpenAI互換APIの接続を通じてNanoGPTの言語モデルとチャットでき、このAgentを通じてNanoGPTの画像モデルで画像を生成できます。

### SillyTavernのキャラクターでNanoGPTの画像生成を使えますか？

はい。SillyTavernにはNanoGPTの画像ソースが内蔵されており、このAgentを使えば、スマートフォンのチャットアプリで同様の構成を実現できます。Laylaは、SillyTavernが使う形式である[TavernPNGキャラクターカード](/ja/how-to-import-tavernpng-characters-in-layla/)と[SillyTavernのプリセット](/ja/how-to-use-sillytavern-presets-in-layla/)をインポートでき、このAgentはどのキャラクターでも動作します。

### AndroidでAIチャットボットに画像を送らせることはできますか？

はい。このAgentを使うと、Laylaのキャラクターは、頼んだときに、または設定すればメッセージごとに画像を送ります。[Laylaで画像生成を有効にする方法](/ja/how-to-enable-image-generation-in-layla/)で説明しているように、スマートフォン上で動くStable Diffusionモデルを使えば、クラウドサービスなしでも画像を送れます。

### Pythonインタープリターミニアプリは必要ですか？

いいえ。このAgentは*Eval*ツールを使い、Layla自体の中でJavaScriptを実行します。

### プロンプトはプライベートですか？

画像プロンプトは、NanoGPTと、選んだモデルを運用している企業に送信されます。NanoGPTの[プライバシーポリシー](https://nano-gpt.com/legal/privacy-policy)には、デフォルトではプロンプトの内容をサーバーに保存しないと記載されていますが、ドキュメントには、画像モデルを運用する企業がそれぞれのポリシーに基づいてプロンプトや画像を保持する場合があるとも書かれています。ローカルモデルでチャットしている場合、会話のそれ以外の部分は端末内に残ります。

### インターネット接続なしでこのAgentを使えますか？

いいえ。AgentはNanoGPTのサーバーを呼び出します。画像生成をすべてスマートフォン上で行うには、[Laylaで画像生成を有効にする方法](/ja/how-to-enable-image-generation-in-layla/)で説明しているローカルモデルのいずれかを使ってください。

### 生成された画像はどこに保存されますか？

スクリプトは各画像をキャラクターのワークスペースフォルダーに保存し、*Display Image*がそれをLaylaのチャット画像の保存場所にコピーするため、画像はチャット履歴に残ります。

## まとめ

NanoGPT Agentは、Laylaのどの画像生成Agentとも同じ4つの要素を使います。タグ付きの画像プロンプトを求めるシステムプロンプト、それを捉える正規表現トリガー、プロンプトを画像に変える短いスクリプト、そして結果をチャットに表示する*Display Image*です。NanoGPTは1つのエンドポイントで200以上の画像モデルを提供しているため、同じスクリプトの2行を変更するだけで、AIキャラクターにHiDream、FLUX、SDXL、GPT Imageの画像を送らせることができます。

LaylaはAndroid向けのオフラインAIアシスタントとして作られており、完全にプライベートでオフラインのチャットと画像生成には、引き続きローカルモデルが適しています。NanoGPTの画像生成は、特定のオンラインモデルをチャットで使いたく、接続と画像1枚ごとの費用を受け入れられる場合の選択肢です。

## Agentをダウンロードする

<div class="file-download">
  <div class="file-download-info">
    <span class="file-download-label">Agentファイル</span>
    <span class="file-download-name">nanogpt-generate-image.json</span>
    <span class="file-download-hint">Agentミニアプリの<em>Import</em>ボタンでインポートし、APIキーを追加してください。</span>
  </div>
  <a class="file-download-button" href="/assets/articles/how-to-create-a-nanogpt-image-generation-agent-in-layla/nanogpt-generate-image.json" download="nanogpt-generate-image.json"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>ダウンロード</a>
</div>
