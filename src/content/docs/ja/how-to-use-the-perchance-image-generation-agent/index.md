---
title: PerchanceのAgentでLaylaにAI画像を生成させる方法
description: PerchanceのAgentを使って、Laylaのチャットで無料のAIキャラクター画像を生成します。キャラクターの返信から画像プロンプトを読み取り、Webサイトを自動操作します。
category: Image generation
order: 40
keywords:
  - Perchance画像生成
  - Perchance AI girl generator
  - 無料AI画像生成
  - Android向けAI画像生成
  - AIキャラクター画像生成
  - AIコンパニオン画像
  - Layla画像生成Agent
  - Layla Agent
  - Layla Python Agent
  - Stable Diffusionプロンプト
  - Stable Diffusionの代替
  - Webブラウジングの自動化
lastUpdated: 2026-10-16
translationKey: how-to-use-the-perchance-image-generation-agent
ai_translated: true
---

**Perchance画像生成Agentは、PerchanceのWebサイト「AI girl generator」をユーザーに代わって操作することで、LaylaのチャットでAI画像を生成します。** AIキャラクターが返信に画像プロンプトを書くと、AgentはLaylaの組み込みブラウザーでジェネレーターを開き、プロンプトを入力して生成を実行し、画像の完成を待って、チャットに表示します。

これは、Android版Laylaに組み込まれたStable Diffusion画像モデルの代わりに使える方法です。画像の生成にスマートフォンの処理能力を使わないため、端末がローカル画像生成には遅すぎる場合や、サブスクリプションを使いたくない場合に、無料で使える選択肢になります。代わりに、インターネット接続が必要で、プロンプトがPerchanceに送信されます。Laylaのローカルモデルは引き続きオフラインで動作します。このAgentは例外です。この記事では、設定方法、動作の仕組み、他のAgentとの組み合わせ方を説明します。

Agentの動作デモは次のとおりです。

<video controls playsinline src="/assets/articles/how-to-use-the-perchance-image-generation-agent/perhance-auto.mp4"></video>

## 必要なもの

- インストール済みの*Agent*ミニアプリと*Pythonインタープリター*ミニアプリ。まだ設定していない場合は、[LaylaでPython対応を有効にする方法](/how-to-enable-python-support-in-layla/)に従ってください。
- インターネット接続。Laylaのローカルモデルと異なり、このAgentはオンラインサービスを使用します。
- Agentファイル。この記事の末尾にリンクがあります。

## 手順1：Laylaのデフォルト画像生成をオフにする

この手順は必須です。*推論設定*を開き、*画像生成*セクションまでスクロールして、画像生成モデルを**なし**（_None_）に設定します。

理由は、Layla自身の画像生成もキャラクターの返信から`<stable_diffusion_prompt>`タグを読み取るためです。モデルが選択されたままだと、Laylaが同じタグから独自に画像を生成し、Agentの画像に加えてもう1枚の画像が表示されます。モデルを*None*にしておけば、タグはAgentに任されます。

この設定の場所は、[Laylaで画像生成を有効にする方法](/how-to-enable-image-generation-in-layla/)で推論設定の画像生成セクションとして確認できます。

## 手順2：Agentをインポートする

この記事の末尾にあるAgentファイルをダウンロードし、*Agent*ミニアプリを開いて*Add New Agent*ボタンからインポートします。Agent名は*Perchance AI Girl: generate image*です。

Agentのアイコンの下にあるスイッチがオンになっていることを確認してください。デフォルトでは、Agentミニアプリで有効にしたAgentはすべてキャラクターから利用できます。また、[LaylaでAgent、関数、ツール呼び出しを有効にする方法](/how-to-enable-agents-functions-and-tool-calling-in-layla/)で説明しているとおり、キャラクター作成画面の*詳細*タブから特定のカスタムキャラクターに関連付けることもできます。

## 手順3：画像をリクエストする

チャットを開始し、画像を依頼します。たとえば「あなたの見た目を見せて」や「夕暮れのビーチの画像を送って」などです。

Agentは、画像のリクエストには画像プロンプトだけで返信し、それ以外は何も出力しないようモデルに指示します。少し待つと、Laylaが自動操作を実行し、画像がチャットに表示されます。時間がかかる場合があります。Agentはページの読み込みを最大30秒、画像の生成を最大3分待ちます。無料ジェネレーターの速度が一定ではないためです。

## Agentの仕組み

Agentは、システムプロンプト、トリガー、2つのツールの3つの要素で構成されています。これらを理解すると、Agentを調整しやすくなります。

流れを簡単に示すと次のとおりです。

```text
Model reply with tag -> Regex trigger -> Execute Python Code -> Display Image
```

### 1. システムプロンプトがタグ付きのプロンプトをモデルに求める

Agentはモデルに次の指示を与えます。

```text
If the user asks you to generate an image, output the image prompt inside this tag:

<stable_diffusion_prompt>your image prompt here</stable_diffusion_prompt>

Do not include any other text when generating an image. For other requests, respond normally.
```

画像を依頼すると、モデルは次のような返信をします。

```text
<stable_diffusion_prompt>a lighthouse on a cliff at sunset, dramatic clouds, oil painting</stable_diffusion_prompt>
```

それ以外のメッセージには、モデルは通常どおり返答します。

### 2. 正規表現トリガーがタグに一致する

Agentは、ユーザーの入力ではなくモデルの**出力**に対して動作する*正規表現トリガー*を使用します。パターンは次のとおりです。

```text
/<stable_diffusion_prompt>(.*?)<\/stable_diffusion_prompt>/s
```

このパターンはタグに一致し、開始タグと終了タグの間のすべてを取得します。`s`フラグにより、プロンプトが複数行にわたっていても一致します。[Layla Agentの詳細解説](/deep-dive-into-layla-agents/)で説明しているとおり、一致したテキストはAgentの最初のツールへの入力になります。このAgentでは、取得したプロンプトがスクリプト内で`{{match$1}}`として使われます。

### 3. Pythonツールがサイトを操作する

最初のツールは*Pythonコードを実行*です。スクリプトはプロンプトを受け取り、Perchanceを開いて画像を生成し、ファイルとして保存します。詳細は次のセクションで説明します。

### 4. Display Imageが結果を表示する

スクリプトが終了すると、保存した画像の場所を`file://`アドレスとして1行だけ出力します。この出力が2番目のツールである*Display Image*の入力となり、ファイルがチャットに表示されます。スクリプトが失敗した場合は、アドレスの代わりにエラーメッセージが出力され、画像は表示されません。

## Laylaの自動Webブラウジングの仕組み

Laylaには、Pythonスクリプトから操作できる組み込みブラウザー（WebView）があります。スクリプトは、ページを読み込み、内容を読み取り、入力欄に入力し、ボタンをクリックし、要素が表示されるのを待つことができます。人がブラウザーを使う操作とよく似ています。このAgentはその機能を使って、本来ならPerchanceのサイトで手作業で行う操作を実行します。

スクリプトは次の手順で動作します。

1. **ジェネレーターを開く。** `perchance.org/improved-ai-girl-generator`を読み込み、ページが完全に読み込まれるまで数秒待ちます。
2. **プロンプトを入力する。** ページ上の説明欄を見つけ、モデルの返信から取得したプロンプトを入力します。
3. **generateを押す。** 生成ボタンを見つけてクリックします。ボタンの識別子が変更された場合は、「generate」というラベルの付いた任意のボタンを探す方法に切り替えます。
4. **画像を待つ。** 生成時間は一定ではないため、スクリプトは最大3分間、1秒ごとに結果の画像が表示されたかを確認します。
5. **画像を保存する。** 完成した画像はすでにページに埋め込まれています。スクリプトはそれを直接読み取り、一時フォルダーにファイルとして保存し、その場所を返します。

知っておくべき点が1つあります。Perchanceのジェネレーターは、異なるオリジンのフレームが入れ子になって構成されており、スクリプトは通常その内部を参照できません。スクリプトは、ページ内のすべてのフレームから説明欄、ボタン、結果を探すことでこれに対処します。そのため、各手順は、あらかじめ決まった位置をクリックするのではなく、検索してから操作する方式になっています。

画像は毎回同じファイル名で保存されるため、新しく生成すると前回の一時ファイルが置き換えられます。このファイルは一時的なものとして扱ってください。

### プライバシーと信頼性

- 画像プロンプトはPerchanceのWebサイトに入力されるため、端末の外に送信されます。会話のそれ以外の部分は送信されません。
- Laylaはオフラインで動作するよう設計されていますが、このAgentは例外です。インターネット接続がないと、ページを読み込めません。
- このAgentは、サードパーティのWebサイトのレイアウトに依存しています。Perchanceがジェネレーターを再設計すると、スクリプトが適切な要素を見つけられなくなる可能性があり、その場合はAgentの更新が必要です。
- 生成に失敗した場合やタイムアウトした場合、Agentは画像の代わりにエラーを返します。もう一度試すか、ご利用の回線でPerchanceが読み込めるか確認してください。

## 他の画像生成Agentと組み合わせる

このAgentが気にするのは、モデルの出力に`<stable_diffusion_prompt>`タグが現れることだけです。そのタグがどのように出力されたかは関係ありません。そのため、このタグの内容を作成または変更する他のAgentであれば、組み合わせて動作させることができ、個別のAgentで小さなパイプラインを構成できます。

いくつかのアイデアを紹介します。

- **キャラクターの見た目を一貫させる。** *Provide Context*ツールを使うAgentで、キャラクターの外見の説明をモデルに渡し、その説明をすべての画像プロンプトに含めるよう指示します。
- **スタイルを追加する。** 「watercolor, soft lighting」などの固定スタイルをタグの内容に追加するAgentを使います。キャラクターの*シナリオ*の指示で依頼することもできます。
- **メッセージごとに画像を生成する。** [画像生成Agentを作成する方法](/creating-an-image-generation-agent/)で説明しているとおり、キャラクターの*シナリオ*に、すべての返信の最後に`<stable_diffusion_prompt>`タグを付けるよう指示を追加します。すると、PerchanceのAgentは、依頼したときだけでなく、メッセージごとに実行されます。
- **別のジェネレーターを使う。** このAgentのツールは、通常のPythonスクリプトと*Display Image*です。Agentを複製してスクリプトを変更すれば、システムプロンプトとトリガーはそのままで、別のWebサイトを自動操作できます。

同じタグを処理するAgentを複数作成した場合、タグが現れるたびにそのすべてが実行される点に注意してください。特定の返信に作用させたいAgentだけを有効にしてください。

## よくある質問

### Laylaでキャラクターの無料AI画像を生成するにはどうすればよいですか？

方法の1つがPerchance Agentです。無料のオンラインジェネレーターを使うため、サブスクリプションもモデルのダウンロードも必要ありません。もう1つは、端末でローカルのStable Diffusionモデルを実行する方法で、こちらはオフラインで動作します。[Laylaで画像生成を有効にする方法](/how-to-enable-image-generation-in-layla/)をご覧ください。

### Stable Diffusionモデルをダウンロードする必要がありますか？

いいえ。画像はPerchanceのサーバーで生成されるため、モデルのダウンロードは不要です。ただし、Layla自身の画像生成モデルは*None*に設定する必要があります。

### 画像が2枚生成されたのはなぜですか？

Laylaの組み込み画像生成が有効のままになっている可能性があります。推論設定で画像生成モデルを*None*に設定してください。

### インターネット接続なしで使えますか？

いいえ。AgentはWebサイトを読み込みます。オフラインで画像を生成するには、[Laylaで画像生成を有効にする方法](/how-to-enable-image-generation-in-layla/)で説明しているローカルモデルを使用してください。

### ジェネレーターを変更したり、独自の手順を追加したりできますか？

はい。AgentミニアプリでこのAgentを開き、*Pythonコードを実行*ツールを編集します。スクリプトは通常のPythonで、Laylaの`lython`ライブラリを使ってブラウザーを制御します。

## Agentをダウンロードする

[perchance-ai-girl-generator-auto.jsonをダウンロード](/assets/articles/how-to-use-the-perchance-image-generation-agent/perchance-ai-girl-generator-auto.json)

Agentミニアプリの*Add New Agent*ボタンでインポートしてください。
