---
title: "LaylaでNano Banana API：画像生成機能付きAIチャット"
description: Google AI StudioでNano Banana APIキーを取得し、AndroidのLaylaでAIキャラクターがチャット内で画像を生成できるようにします。セットアップ、費用、コードを解説します。
category: Image generation
order: 50
keywords:
  - Nano Banana API
  - Nano Banana APIキー
  - Nano Banana Pro
  - Nano Banana API 料金
  - Nano Banana と Nano Banana 2 の違い
  - Android で Nano Banana
  - gemini-3-pro-image
  - Google AI Studio APIキー
  - 画像生成用 Gemini APIキー
  - 画像生成付きAIチャット
  - 画像を生成するAIチャットボット
  - AIキャラクター画像ジェネレーター
  - AIコンパニオンの画像
  - AIロールプレイの画像生成
  - AIキャラクターの画像を一貫させる
  - 自分のAPIキーを使う
  - カスタム画像生成Agent
  - Android向けAI画像ジェネレーター
  - 画像生成付きのプライベートAIチャット
  - ローカルLLMとクラウド画像生成
  - Layla画像生成Agent
  - Layla Agents
  - Evalツール
  - Stable Diffusionの代替
lastUpdated: 2026-10-28
translationKey: how-to-use-the-google-nano-banana-image-generation-agent
ai_translated: true
---

**カスタム画像生成Agentを使うと、Laylaをアプリ内蔵のモデルに限定されず、APIを提供するあらゆるサービスで画像を生成するAIチャットボットにできます。** AIキャラクターが返信で画像を描写すると、Agentがその描写をサービスに送り、完成した画像を受け取って、チャットに表示します。

Laylaはすでに、端末上またはLayla Cloud経由でStable Diffusionモデルによる画像生成に対応しています。Agentを使うと、サービス、モデル、設定を自分で選べるうえ、自分のAPIキーを使うことができます。このような方法は「bring your own key」と呼ばれることがよくあります。この記事では、Nano Banana APIを使ったAgentを作ります。Nano BananaはGoogleがGeminiの画像生成モデルにつけた名前で、この記事のAgentはAPI名が`gemini-3-pro-image`のNano Banana Proを使います。

この記事には3つの目的があります。Nano Banana APIキーの取得方法とAgentのセットアップ方法を示します。次にAgentのコードを1ステップずつ解説し、最後に同じパターンを使って他の画像サービス向けのAgentを作る方法を説明します。

Laylaのローカルモデルと違い、このAgentにはインターネット接続が必要です。画像の描写はGoogleに送信され、Googleは画像1枚ごとに課金します。ローカルモデルでチャットしている場合、会話のそれ以外の部分は端末内に残ります。

Agentが動作する様子は次のとおりです。キャラクターが返信し、書き込んだ画像の描写に続いて、完成した画像が表示されます。

![キャラクターの返信、彼女が書いた画像の描写、そして夕暮れの岩場の海岸に座る彼女の生成画像が表示されたLaylaのチャット。](./generated-image.jpg)

すぐに試したい場合は、こちらからAgentファイルをダウンロードしてください：[google-nano-banana-generate-image.json](/assets/articles/how-to-use-the-google-nano-banana-image-generation-agent/google-nano-banana-generate-image.json)。動作にはGoogle APIキーが必要です。取得方法はこの記事の後半で説明します。

## LaylaでNano Bananaを使う理由

端末上だけで画像を生成したい場合は、LaylaのStable Diffusionモデルが適しています。Nano Banana APIは、それとは別のニーズに応えます。

- **スマートフォンの性能に左右されない画質。** 画像はGoogleのサーバー上で生成されるため、端末のCPUやNPUの速度が結果や待ち時間を制限することはありません。
- **会話に沿った画像。** キャラクターがチャットの内容から画像の描写を書くため、話しているシーン、服装、場所に合った画像になります。AIロールプレイでもAIコンパニオンとのチャットでも使えます。
- **ローカルのチャットモデルとクラウドの画像生成の組み合わせ。** Agentはキャラクターの返信にだけ反応するため、どのモデルでチャットしていても動作します。会話にはローカルLLMを使い続け、Googleに送られるのは画像の描写だけにできます。
- **画像ごとの従量課金で、サブスクリプションは不要。** Googleは生成した画像に対して課金し、利用状況と支出はGoogle AI Studioで確認できます。
- **自分のキー。** APIキーはいつでも無効にでき、別のキーを作成してもAgentはそのまま動作します。

GoogleのGeminiアプリでも、AndroidでNano Bananaを使えます。ここでの違いは、画像があなた自身のLaylaのチャットの中で、あなたのキャラクターと、あなた自身のAPIキーを使って作られる点です。

## Agentの仕組みの概要

チャットから動作する画像生成Agentは、どれも同じ4つのステップで動きます。

```text
画像をリクエストする
  -> キャラクターがタグで囲んだ画像の描写を返信する
  -> Agentのトリガーがタグを検出する
  -> EvalツールがGoogleのAPIを呼び出して画像を保存する
  -> Display Imageツールがチャットに表示する
```

1. **システムプロンプトがモデルにタグを求めます。** Agentは、画像をリクエストしたときに、キャラクターの言語モデルが詳細な画像の描写を`<stable_diffusion_prompt></stable_diffusion_prompt>`タグの中に書くよう指示を追加します。
2. **トリガーがタグを検出します。** Agentにはモデルの返信を監視する正規表現トリガーがあります。タグを見つけると、中のテキストを取り出してAgentを起動します。
3. **スクリプトがAPIを呼び出します。** Agentの最初のツールは短いJavaScriptプログラムを実行します。描写をGoogleに送り、画像を受け取って、ファイルとして保存します。
4. **画像がチャットに表示されます。** 2つ目のツール_Display Image_が、保存されたファイルを受け取って会話に表示します。

言語モデルがGoogleと直接やり取りすることはありません。モデルが書くのはテキストだけです。それ以降はすべてAgentが処理するため、APIのあるどのサービスでも同じパターンが使えます。

タグの名前が`<stable_diffusion_prompt>`なのは、Layla自身の画像生成もこのタグを待ち受けているためです。これはセットアップで重要になるため、後のセットアップの項目で説明します。

## 必要なもの

- インストール済みの_Agent_ミニアプリ。Agentを使ったことがない場合は、先に[LaylaでAgent、Function、Tool Callingを有効にする方法](/how-to-enable-agents-functions-and-tool-calling-in-layla/)をお読みください。
- Googleアカウント。
- 課金を有効にしたGemini APIキー（Nano Banana APIキー）。次のセクションで取得方法を説明します。
- インターネット接続。
- この記事の最後にリンクがあるAgentファイル。

このAgentはLaylaに内蔵されている_Eval_ツールを使います。Pythonインタープリターミニアプリは不要です。

## Google AI StudioでNano Banana APIキーを取得する方法

Nano Banana専用のキーはありません。必要なのはGemini APIキーで、Google AI Studioで発行され、課金を有効にすれば画像モデルでも使えます。APIキーは、Agentがリクエストを送るときにGoogleアカウントを識別する長い文字列です。手順は数分で終わります。

### ステップ1：Google AI Studioを開く

[aistudio.google.com](https://aistudio.google.com)にアクセスし、Googleアカウントでログインします。初めて利用する場合は、利用規約に同意してください。すると、GoogleがデフォルトのプロジェクトとAPIキーを作成します。

左サイドバーの下部にある**Get API key**を選びます。

![左サイドバーの左下にGet API keyリンクがあるGoogle AI Studioのホーム画面。](./ai-studio-get-api-key-menu.jpg)

### ステップ2：キーを作成する

_API Keys_ページには、プロジェクト内のキーが一覧表示されます。**Create API key**を選びます。

![右上にCreate API keyボタンがあるGoogle AI StudioのAPI Keysページ。](./ai-studio-api-keys-page.jpg)

### ステップ3：キーに名前を付けてプロジェクトを選ぶ

分かりやすい名前（例：「Layla」）を入力し、プロジェクトを選びます。新しいアカウントには_Default Gemini Project_というプロジェクトがあります。**Create key**を選びます。

![キー名の入力欄とプロジェクト選択がある「Create a new key」ダイアログ。](./ai-studio-create-key-dialog.jpg)

APIキーはすべてGoogle Cloudプロジェクトに属し、プロジェクトが課金と利用上限を管理します。すでにGoogle Cloudを使っている場合、AI Studioは既存のプロジェクトを自動では表示しません。_Import projects_ボタンで使いたいプロジェクトを追加してください。Googleはこの点を[Using Gemini API keys](https://ai.google.dev/gemini-api/docs/api-key)で説明しています。

### ステップ4：キーをコピーする

新しいキーが一覧に表示されます。その行のコピーアイコンを選ぶと、キーがクリップボードにコピーされます。後でこのページに戻って、もう一度コピーすることもできます。

![Copy API keyボタンが強調表示され、Quota Tier列にSet up billingリンクがあるAPI Keysの一覧。](./ai-studio-copy-api-key.jpg)

キーはパスワードのように扱ってください。キーを持っている人は、Googleがあなたのアカウントに請求するリクエストを送れます。キーが漏えいした可能性がある場合は、このページで削除して新しいキーを作成してください。

### ステップ5：課金を設定する

前のスクリーンショットのQuota Tier列には_Free tier_と表示され、隣に**Set up billing**リンクがあります。このステップは必須です。GoogleはAPIのNano Banana画像モデルに無料枠を提供していないためです。キーが属するプロジェクトには請求先アカウントが必要です。

**Set up billing**を選び、Googleの案内に従って、国を選択し、規約に同意し、支払い方法を追加します。アカウントによっては、Googleから最低額（現在は$5）のクレジットの前払いを求められる場合があります。現在の手順とプランは、Googleの[課金ガイド](https://ai.google.dev/gemini-api/docs/billing)に記載されています。

Googleは画像1枚ごとに課金します。執筆時点では、Nano Banana Proの1Kまたは2K画像は$0.134、4K画像は$0.24です。この記事のAgentは1K画像をリクエストします。料金は変わるため、始める前にGoogleの[料金ページ](https://ai.google.dev/gemini-api/docs/pricing)を確認してください。利用状況は、AI Studioの_Dashboard_、次に_Usage_で確認できます。

Googleの料金ページには、有料プランで送信されたコンテンツはGoogleの製品改善に使われないとも記載されています。

## どのNano Bananaモデルを使うべきか

Googleは、同じAPIで複数のNano Bananaモデルを提供しています。このAgentはNano Banana Proを使いますが、スクリプトの1行を変更すれば別のモデルを使えます。次は、執筆時点でGoogleが掲載しているモデルと、1K画像についてGoogleが掲載している価格です。

| モデル             | API名                         | 1K画像あたりの価格 | 備考                                                                              |
| ------------------ | ----------------------------- | ------------------ | --------------------------------------------------------------------------------- |
| Nano Banana 2.1    | `gemini-nano-banana-2.1`      | $0.0336            | Googleが新規プロジェクトに推奨するモデル。1K、2K、4K画像に対応。                  |
| Nano Banana 2 Lite | `gemini-3.1-flash-lite-image` | $0.0336            | 最も高速で低価格なモデル。1K画像のみ対応。                                        |
| Nano Banana 2      | `gemini-3.1-flash-image`      | $0.067             | 同じファミリーの前世代モデル。                                                    |
| Nano Banana Pro    | `gemini-3-pro-image`          | $0.134             | 最も複雑なビジュアルタスク向けのGoogleのプレミアムモデル。このAgentが使うモデル。 |
| Nano Banana        | `gemini-2.5-flash-image`      | $0.039             | 初代のモデル。Googleはレガシーとしており、終了日は2027年3月15日と記載しています。 |

Nano Banana ProとNano Banana 2を比べると、Proは1K画像あたりの価格がおよそ2倍で、複雑なシーン向けです。Nano Banana 2と2.1はより高速で低価格なモデルです。どのモデルでも、大きな画像ほど高くなります。4K画像の料金は、Nano Banana Proが$0.24、Nano Banana 2が$0.151、Nano Banana 2.1が$0.113です。

モデルを切り替えるには、スクリプトの`MODEL_ID`を変更し、**Test**ボタンを実行します。各モデルが対応する内容は、Googleの[画像生成ドキュメント](https://ai.google.dev/gemini-api/docs/image-generation)に記載されています。モデルがエラーを返す場合は、Agentのリクエストに含まれる設定（2Kサイズなど）を受け付けないか、Googleの新しいAPI形式を想定している可能性があります。料金とモデル名はよく変わるため、選ぶ前にGoogleの[料金ページ](https://ai.google.dev/gemini-api/docs/pricing)と[廃止予定ページ](https://ai.google.dev/gemini-api/docs/deprecations)を確認してください。

## LaylaでAgentをセットアップする

### ステップ1：Laylaのデフォルトの画像生成をオフにする

_推論設定_を開き、_画像生成_セクションまでスクロールして、画像生成モデルを選びます。_Select Model_の一覧で**No Image Generation**（画像生成なし）を選びます。

![Select Modelの一覧が開き、No Image Generationが選択された推論設定の画面。](./no-img-gen-settings.jpg)

Layla内蔵の画像生成も、キャラクターの返信から同じ`<stable_diffusion_prompt>`タグを読み取ります。モデルが選択されたままだと、Laylaがそのタグから独自の画像を生成し、画像が2枚届きます。_No Image Generation_を選んでおけば、タグはAgentに任されます。[Laylaで画像生成を有効にする方法](/how-to-enable-image-generation-in-layla/)で、この設定の場所を確認できます。

### ステップ2：Agentをインポートする

この記事の最後にあるAgentファイルをダウンロードします。_Agent_ミニアプリを開き、右上の**Import**ボタンでインポートします。Agent名は_Google Nano Banana: generate image_で、カードには使用する2つのツール、_Eval_と_Display Image_が表示されます。

![インポートしたGoogle Nano Banana Agentと、そのEvalおよびDisplay Imageツール、Edit、Test、Moreボタンが表示されたAgentミニアプリ。](./imported-agent.jpg)

Agentのカードの右上にあるスイッチがオンになっていることを確認してください。スクリーンショットでは、まだオフになっています。

### ステップ3：APIキーを追加する

**Edit**ボタンでAgentを開き、_Eval_ツールを探します。コードの冒頭付近に次の行があります。

```js
const API_KEY = "PUT YOUR API KEY HERE";
```

`PUT YOUR API KEY HERE`を自分のキーに置き換えます。引用符はそのまま残してください。Agentを保存します。

キーはAgentの内部に保存されました。Agentファイルを共有したりどこかにアップロードしたりする前に、キーを元のプレースホルダーに戻してください。

### ステップ4：画像をリクエストする

チャットを開始し、画像をリクエストします。たとえば「夕暮れの崖の上の灯台を見せて」と送ります。キャラクターが画像の描写を返信し、Agentが実行され、数秒後にこの記事の冒頭のスクリーンショットのように画像がチャットに表示されます。

うまくいかない場合は、Agentミニアプリの**Test**ボタンを使ってください。[Layla Agentsの詳しい仕組み](/deep-dive-into-layla-agents/)で説明しているとおり、各ステップの入力と出力が表示されます。

## Agentの仕組みをステップごとに解説

Agentは3つの部分でできています。システムプロンプト、トリガー、そして順番に実行されるツールのリストです。各ツールの出力が次のツールの入力になります。これらの構成要素の全般的な説明は[Layla Agentsの詳しい仕組み](/deep-dive-into-layla-agents/)にあります。このセクションでは、Nano Banana Agentをそれぞれの部分に沿って見ていきます。

### 1. システムプロンプト

システムプロンプトは、Agentが有効な間、Laylaが会話に追加する指示です。このAgentのプロンプトは英語で書かれており、ファイルにもそのまま含まれています。

```text
When the user asks you to generate, draw or create an image, write a detailed
description of the image (subject, setting, style, lighting, composition) inside
<stable_diffusion_prompt></stable_diffusion_prompt> tags, e.g.
<stable_diffusion_prompt>a lighthouse on a cliff at dusk, oil painting, warm
light</stable_diffusion_prompt>. The image is generated from the text inside the
tags and shown in the chat. Use the tags only when an image is requested, and
never put backticks inside them.
```

指示の各部分には役割があります。

- **「When the user asks you to generate, draw or create an image」**（ユーザーが画像の生成、描画、作成を求めたとき）は、動作を画像リクエストに限定し、通常の会話に影響が出ないようにします。
- **「A detailed description (subject, setting, style, lighting, composition)」**（被写体、背景、スタイル、照明、構図を含む詳細な描写）は、モデルにチェックリストを与えます。Nano Bananaは描写を読み取る言語モデルなので、これらの要素を含む1つの文章のほうが、キーワードを並べたリストよりも良い画像になることが多くなります。
- **例**は、タグの正確な形式を示します。言語モデルは、形式の説明よりも例のほうを確実に守ります。
- **「Use the tags only when an image is requested」**（画像が求められたときだけタグを使う）は、モデルがすべての返信にタグを付けるのを防ぎます。付けてしまうと、そのたびにAgentが起動し、課金されます。
- **「Never put backticks inside them」**（タグの中にバッククォートを入れない）は、スクリプトを守ります。理由は後のコード解説で説明します。

自分でAgentを書くときも、システムプロンプトの役割は同じです。モデルに新しい動作を1つ教え、出力形式を示し、使ってはいけない場面を伝えます。

### 2. トリガー

このAgentにはトリガーが1つあります。入力ではなく、モデルの**出力**に対して動作する_正規表現トリガー_です。パターンは次のとおりです。

```text
/<stable_diffusion_prompt>(.*?)<\/stable_diffusion_prompt>/s
```

- 開始タグと終了タグは、タグそのものに一致します。
- `(.*?)`はキャプチャグループです。タグの間にあるすべてを取り出し、`?`によって最初の終了タグで止まります。
- `s`フラグにより、描写が複数行にまたがっていても対応できます。

グループが取り出したテキストは、Agentから`{{match$1}}`として使えるようになります。これが言語モデルとコードをつなぐ部分です。モデルがタグの間に書いたものが、最初のツールに渡されます。

### 3. Evalツール：APIを呼び出す

最初のツールは_Eval_です。Layla内のサンドボックス化された実行環境でJavaScriptを実行します。この環境には、Webリクエスト用の`fetch`と、ファイルの保存などLaylaの機能にスクリプトからアクセスするためのグローバルオブジェクト`layla`があります。ブラウザのページやNode.jsのモジュールはありません。

Evalはスクリプトの最後の式の値を返し、それがPromiseの場合は完了を待ちます。これが、処理を開始するスクリプトの最終行`generateImage(PROMPT);`の理由です。

スクリプトは8つの部分でできています。

#### 先頭の設定

```js
const API_KEY = "PUT YOUR API KEY HERE";
const PROMPT = String.raw`{{match$1}}`.trim();

const MODEL_ID = "gemini-3-pro-image";
const API_METHOD = "streamGenerateContent";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:${API_METHOD}`;
const TIMEOUT_MS = 60000;
```

変更したくなる可能性のあるものは、すべて1か所にまとまっています。

- `API_KEY`はあなたのキーです。
- `PROMPT`はモデルが書いた描写です。スクリプトが実行される前に、Laylaが`{{match$1}}`を取り出したテキストに置き換えるため、描写がプログラムの一部になります。バックスラッシュを入力どおりに保つために`String.raw`付きのテンプレートリテラルで囲み、`.trim()`で余分な空白や改行を取り除きます。描写の中にバッククォートや`${`があると、リテラルが途中で終わってスクリプトが壊れてしまいます。システムプロンプトでバッククォートを禁止しているのはそのためです。
- `MODEL_ID`は使用するモデルです。Googleは時々モデルの名前を変更したり廃止したりするため、後で最も編集する可能性が高い行です。
- `API_URL`はモデルとメソッドから組み立てられます。`streamGenerateContent`は、回答をチャンクのリストとして返します。
- `TIMEOUT_MS`は、あきらめるまでの待ち時間で、60秒です。

スクリプトの残りは`generateImage`という関数の中にあります。この関数は描写を`prompt`というパラメーターで受け取り、スクリプトの最終行が`PROMPT`を渡して呼び出します。

#### 入力を確認する

```js
if (!prompt) throw new Error("The stable diffusion prompt was empty.");
if (!API_KEY || API_KEY === "PUT YOUR API KEY HERE")
  throw new Error("Set API_KEY in this agent first.");
```

送信するものがない場合やキーが設定されていない場合、スクリプトは分かりやすいメッセージとともに早い段階で失敗します。スクリプトがエラーを投げると、Agentは停止し、画像は表示されません。**Test**ボタンでそのメッセージを確認できます。

#### リクエストを組み立てる

```js
const imageConfig = { imageSize: "1K" };

const payload = {
  contents: [{ role: "user", parts: [{ text: prompt }] }],
  generationConfig: {
    responseModalities: ["IMAGE", "TEXT"],
    imageConfig,
  },
  tools: [{ googleSearch: {} }],
};
```

ペイロードは、Googleに送るデータです。

- `contents`はモデルに送る会話です。ここでは、ユーザーからの1件のメッセージで、テキスト1つ（描写）が含まれています。
- `responseModalities`は、モデルが返せる出力の種類を列挙します。`IMAGE`を指定することでモデルが画像を描き、`TEXT`によってコメントを添えることも許可されます。
- `imageConfig`は画像の設定を保持します。`imageSize`には`'1K'`、`'2K'`、`'4K'`を指定でき（Kは大文字）、サイズが大きいほど料金が高くなります。`'16:9'`や`'9:16'`などの`aspectRatio`を追加することもできます。Googleは空の値を受け取るとエラーを返すため、スクリプトは値のある設定だけを送信します。
- `tools: [{ googleSearch: {} }]`は、モデルが作業中にGoogle検索で情報を調べられるようにします。実在の場所や物の描写に役立ちます。不要な場合はこの行を削除してください。Googleは、Gemini 3モデル向けに月ごとの検索リクエストの無料枠を設けており、それを超えると料金ページのとおり課金されます。

#### 制限時間付きでリクエストを送信する

```js
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
let response;
let body;
try {
  response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": API_KEY },
    body: JSON.stringify(payload),
    signal: controller.signal,
  });
  body = await response.text();
} catch (error) {
  if (controller.signal.aborted)
    throw new Error(`Image generation timed out after ${TIMEOUT_MS / 1000} s.`);
  throw new Error(`Image generation request failed: ${error.message}`);
} finally {
  clearTimeout(timer);
}
```

ここがGoogleとやり取りする部分です。

- `fetch`は、JSONテキストに変換したペイロードを付けて`POST`リクエストを送信します。
- APIキーは`x-goog-api-key`ヘッダーで送られるため、Webアドレスには含まれません。
- `AbortController`とタイマーが、60秒後にリクエストを中止します。これらがないと、接続が止まったときにAgentが待ち続けてしまいます。
- `catch`ブロックは、タイムアウトとそれ以外のネットワークエラーを区別し、エラーメッセージで何が起きたか分かるようにします。`finally`ブロックは、どちらの場合もタイマーを解除します。

#### レスポンスのステータスを確認する

```js
if (!response.ok) {
  throw new Error(
    `HTTP error ${response.status} ${response.statusText}. Response body: ${body.slice(0, 500)}`,
  );
}
```

Googleがリクエストを拒否すると、レスポンス本文にその理由が書かれています。スクリプトはその説明の先頭500文字をエラーに含めるため、キーの誤り、課金の未設定、上限超過などが、**Test**ボタンを使ったときに分かりやすいメッセージとして表示されます。

#### レスポンスから画像を見つける

```js
const data = JSON.parse(body);
const chunks = Array.isArray(data) ? data : [data];

for (const chunk of chunks) {
  for (const candidate of chunk.candidates || []) {
    for (const part of (candidate.content && candidate.content.parts) || []) {
      const inline = part.inlineData;
      if (
        !inline ||
        !inline.data ||
        !String(inline.mimeType || "").startsWith("image/")
      )
        continue;
      // ...save the image
    }
  }
}
```

ストリーミング方式のメソッドは、チャンクのJSONリストで応答します。各チャンクには`candidates`（モデルの回答）があり、各候補には`content`があり、contentは`parts`のリストです。パートはテキストかインラインデータのどちらかです。インラインデータには`image/png`のような`mimeType`と、画像そのものがbase64テキスト（バイナリデータを通常の文字で表す方法）として含まれます。

ループはすべてのチャンク、候補、パートを順にたどり、テキストを飛ばして、最初に見つかった画像のパートで止まります。`|| []`のガードにより、チャンクに候補がない場合でもスクリプトがクラッシュしません。

#### 画像を保存する

```js
const extension =
  inline.mimeType
    .split("/")
    .pop()
    .replace(/[^a-z0-9]/gi, "") || "png";
const id = Math.random().toString(16).slice(2, 10).padEnd(8, "0");
const path = `generated-images/output_image_${id}.${extension}`;

await layla.utils.saveFile(path, inline.data);
return path;
```

- ファイルの拡張子はGoogleが報告する画像の種類から決まり、取得できない場合は`png`になります。
- ランダムな8文字のIDによって、画像ごとに固有のファイル名が付くため、新しい画像がチャット履歴にある以前の画像を上書きすることはありません。
- `layla.utils.saveFile`は、キャラクターのプライベートなワークスペースフォルダーにファイルを書き込みます。パスはそのフォルダーからの相対パスで、存在しないフォルダーは自動的に作成されます。この関数はbase64テキストを受け取ります。Googleが送ってくる形式なので、変換せずにそのまま保存されます。
- 関数はパスを返します。このパスがツールの出力になります。

#### 失敗をわかりやすく報告する

```js
const keys =
  chunks.length && typeof chunks[0] === "object"
    ? Object.keys(chunks[0]).join(", ")
    : "Unknown error";
throw new Error(
  `No image was found in the response. Full API Response Keys: ${keys}`,
);
```

ループが画像を見つけずに終わった場合（たとえば、モデルがリクエストを拒否してテキストだけを返したときなど）、スクリプトはレスポンスの内容を報告します。これにより、珍しい失敗の原因を調べやすくなります。

### 4. Display Imageツール

2つ目のツールは_Display Image_で、設定は次の1つだけです。

```text
{{input}}
```

`{{input}}`は、前のツールの出力、つまりスクリプトが返したファイルパスに置き換えられます。_Display Image_は、キャラクターのワークスペースからそのファイルを開いて返信に添付し、画像がチャットに表示されます。

## AIキャラクターの画像を一貫させる

言語モデルは、画像の描写を毎回ゼロから書きます。そのため、何も指示がないと、キャラクターの見た目が画像ごとに変わることがあります。次の方法で、AIキャラクターの画像を一貫させ、画像が表示される頻度も決められます。

- **キャラクターを一度だけ描写する。** キャラクターの_シナリオ_に、次のような指示を追加します。「`<stable_diffusion_prompt>`を書くときは、自分自身についての次の描写から始めること：20代後半の女性、短い赤い髪、緑の瞳、そばかす。そのあとでシーンを描写すること。」モデルがすべてのプロンプトで外見を繰り返すため、画像モデルが毎回同じキャラクターを描きやすくなります。
- **画風を固定する。** 同じ指示に画風を加えます。たとえば「35mmフィルム写真、自然光」や「水彩イラスト」などです。[PerchanceのAgentでLaylaにAI画像を生成させる方法](/how-to-use-the-perchance-image-generation-agent/)でも同じ方法を説明しており、このタグを使うどのAgentでも使えます。
- **メッセージごとに画像を生成する。** [画像生成Agentを作成する方法](/creating-an-image-generation-agent/)のように、_シナリオ_に各返信の最後にタグを付ける指示を追加します。すると、すべての返信に画像が付きます。AIロールプレイやストーリーに向いています。画像1枚ごとに課金されるため、リクエストしたときだけ画像を出す場合より費用がかかります。
- **参照画像を使う。** Nano Bananaモデルは画像を入力として受け取ることもでき、キャラクターの顔を保つのに役立ちます。このAgentが送るのはテキストだけなので、リクエストに参照画像を追加するのは、次に取り組むのに良いプロジェクトです。

## 同じパターンで他のAgentを作る

Nano Banana Agentはテンプレートです。システムプロンプト、正規表現トリガー、Display Imageのステップは、どの画像サービスでも変わりません。変わるのはスクリプトだけです。次のアイデアはそれを土台にしています。

- **モデルや設定を変更する。** スクリプトで`MODEL_ID`や`imageSize`を編集するか、`aspectRatio`を追加します。Googleは価格の異なる複数のNano Bananaモデルを提供しており、[料金ページ](https://ai.google.dev/gemini-api/docs/pricing)に掲載されています。
- **別の画像サービスを使う。** リクエストとレスポンスの処理を置き換えます。サービスがbase64テキストを返す場合、保存のステップはそのままです。Webアドレスを返す場合は、そのアドレスを取得し、`layla.utils.saveFile`を呼ぶ前に`toBase64()`でバイト列を変換します。
- **描写以外の情報もモデルに求める。** システムプロンプトで、自由なテキストではなく、`prompt`と`aspect_ratio`を持つ短いJSONオブジェクトなど、いくつかのフィールドを求めることができます。スクリプトは取り出したテキストからフィールドを読み取ります。Agentが`PROMPT`で行っているように、プレースホルダーは文字列リテラルの中に置き、テキストの解析は自分のコードで行ってください。
- **画像以外のことをする。** `<weather_request>`のような別のタグを選び、_Eval_に別のAPIを呼び出させ、最後に_Provide Context_ツールを使って、キャラクターが結果について話せるようにします。[Brave Search Agentを作成する方法](/how-to-create-a-brave-search-agent/)が、この流れの例です。

自分のAgentを書くときに、このAgentから取り入れる価値のある習慣がいくつかあります。

- **すべての設定を先頭の1つのブロックにまとめる。** キー、モデル、サイズ、タイムアウトが見つけやすく、変更しやすくなります。
- **お金を使う前に入力を確認する。** 空のリクエストを止めるガードには費用がかかりません。
- **必ずタイムアウトを設定する。** 終わらないリクエストは、メッセージを出して失敗するリクエストより悪い結果になります。
- **失敗時に読める内容を返す。** エラーテキストは**Test**ボタンに表示される内容なので、何が起きたか分かるようにします。
- **データではなくパスを渡す。** スクリプトは画像を保存し、短いパスを次のツールに渡すため、大きなデータがチェーンの中を流れずに済みます。
- **タグごとに1つのAgentにする。** `<stable_diffusion_prompt>`に反応する別のAgentを作る場合は、このAgentを無効にしてください。あるいは、新しいAgentのシステムプロンプトとトリガーの両方で、独自のタグを使います。
- **`{{match$1}}`をコードとして扱う。** 取り出したテキストは、実行前にスクリプトへ貼り付けられます。文字列リテラルで囲み、モデルに避けるべき文字を伝えてください。

## よくある質問

### Nano Banana APIキーはどうすれば取得できますか？

Nano Banana専用のキーはありません。[Google AI Studio](https://aistudio.google.com)にログインし、_API Keys_ページを開いて**Create API key**を選びます。その後、キーのプロジェクトで課金を有効にしてください。APIのNano Bananaモデルには無料枠がないためです。

### Nano Banana APIは無料ですか？

キーの作成は無料ですが、GoogleはAPIのNano Banana画像モデルに無料枠を提供していないため、画像1枚ごとに課金されます。最新の料金はGoogleの[料金ページ](https://ai.google.dev/gemini-api/docs/pricing)をご覧ください。

### Nano Banana APIは画像1枚あたりいくらですか？

執筆時点では、Nano Banana Proは1Kまたは2K画像が$0.134、4K画像が$0.24です。Nano Banana 2.1は1K画像が$0.0336です。上のモデルのセクションにある表に、すべてのモデルが載っています。

### Nano Banana ProとNano Banana 2の違いは何ですか？

Nano Banana Proは複雑なシーン向けのGoogleのプレミアム画像モデルで、1枚あたりの価格が高めです。Nano Banana 2は同じファミリーの、より高速で低価格なモデルで、Googleは現在、新規プロジェクトにNano Banana 2.1を推奨しています。名前と価格は上のモデルの表をご覧ください。

### AndroidでNano Bananaを使えますか？

はい。GoogleのGeminiアプリにはNano Bananaが含まれています。このAgentは、自分のLaylaのチャットの中で、自分のキャラクターと自分のAPIキーを使って画像を作りたい場合のためのものです。

### AIキャラクターはチャットやロールプレイ中に画像を送れますか？

はい。チャットで画像をリクエストするか、キャラクターの_シナリオ_に、各返信の最後に画像の描写を付ける指示を追加します。画像の一貫性に関するセクションで、両方の方法を説明しています。

### Nano Bananaは画像をフィルタリングしますか？

はい。GoogleはGemini APIに独自の安全ポリシーを適用しており、拒否されたリクエストは画像を返さないことがあります。その場合、Agentはレスポンスに画像が見つからなかったと報告します。画像生成を完全に端末上で行いたい場合は、[Laylaで画像生成を有効にする方法](/how-to-enable-image-generation-in-layla/)で説明しているローカルのStable Diffusionモデルを使ってください。

### 画像が2枚届いたのはなぜですか？

Layla内蔵の画像生成がまだ有効になっている可能性が高いです。推論設定で_No Image Generation_を選び、タグをAgentだけが処理するようにしてください。

### Agentに「Set API_KEY in this agent first.」と表示されます

キーのプレースホルダーがスクリプトに残っています。Agentを開いて_Eval_ツールを編集し、`PUT YOUR API KEY HERE`を自分のキーに置き換えてください。

### AgentにHTTPエラーが表示されます。これは何ですか？

メッセージにはGoogle自身の説明が含まれています。よくある原因は、キーの入力ミス、キーが属するプロジェクトで課金が設定されていないこと、利用上限に達したことです。Googleが廃止したモデル名もエラーの原因になることがあります。

### 古いガイドでは`gemini-3-pro-image-preview`が使われています。まだ動作しますか？

Googleはそのプレビュー名を2026年6月25日に廃止し、代わりに`gemini-3-pro-image`を推奨しています。このAgentが使っているのもこちらです。Googleの[廃止予定ページ](https://ai.google.dev/gemini-api/docs/deprecations)に、現在のモデル名と終了日が載っています。

### このAgentはGoogleの最新のAPIを使っていますか？

このAgentはGoogleの`generateContent` APIを使っています。1回のWebリクエストで済み、スクリプトで追いやすいためです。Googleはドキュメントでこれをレガシーと位置づけ、新規プロジェクトには新しいInteractions APIを推奨していますが、`generateContent`は引き続きサポートされると述べています。将来Googleが変更した場合でも、書き直す必要があるのはスクリプトのリクエストとレスポンスの部分だけで、Agentの他の部分はそのままです。

### プロンプトはプライベートですか？

画像の描写は、画像を生成するためにGoogleへ送信されます。ローカルモデルでチャットしている場合、会話のそれ以外の部分は端末内に残ります。Googleの料金ページによると、有料プランのコンテンツは製品の改善に使われません。

### 画像には透かしが入りますか？

Googleは、Nano Bananaモデルで生成されたすべての画像にSynthIDの透かしが含まれると述べています。

### インターネット接続なしでこのAgentを使えますか？

いいえ。AgentはGoogleのサーバーを呼び出します。オフラインで画像を生成するには、[Laylaで画像生成を有効にする方法](/how-to-enable-image-generation-in-layla/)で説明しているローカルモデルのいずれかを使ってください。

## まとめ

Nano Banana Agentは、AIチャット向けの画像生成Agentがどれほど小さくできるかを示しています。システムプロンプトでモデルにタグ付きの描写を書かせ、正規表現トリガーがそれを捉え、短いスクリプトが描写を画像に変え、_Display Image_が結果をチャットに表示します。この4つの要素を理解すれば、サービス、モデル、設定を入れ替えて、Laylaが標準ではサポートしていない画像サービス向けのAgentを作れます。

完全にオフラインで画像を生成したい場合は、引き続きLaylaのローカルモデルが適しています。このようなAgentは、特定のオンラインモデルを使いたく、接続と費用を受け入れられる場合の選択肢です。

## Agentをダウンロードする

[google-nano-banana-generate-image.jsonをダウンロード](/assets/articles/how-to-use-the-google-nano-banana-image-generation-agent/google-nano-banana-generate-image.json)

Agentミニアプリの_Import_ボタンでインポートし、APIキーを追加してください。
