---
title: BlueStacksとLM StudioでPC上にLaylaを実行する方法
description: BlueStacksにLaylaをインストールし、ローカルのOpenAI互換APIを通じてLM Studioモデルへ接続します。
category: Mini-apps & integrations
order: 20
keywords:
  - WindowsのLayla
  - BlueStacks
  - LM Studio
  - OpenAI互換API
  - ローカルLLM
lastUpdated: 2026-07-26
translationKey: how-to-run-layla-on-your-pc-with-bluestacks-and-lm-studio
ai_translated: true
---

LaylaはAndroidとiOS向けですが、AndroidエミュレーターBlueStacksを使えばWindows PCでも実行できます。LM Studioへ接続すると、PC上でローカル実行するLLMを会話に利用できます。

Laylaの画面やロールプレイ機能を大きな画面で使いたい場合に便利です。

> **注：** PCでは一部の機能が動作しませんが、大部分のチャット機能は通常通り使用できます。

このガイドではBlueStacksへのインストール、LM Studioの設定、OpenAI互換APIでの接続を説明します。

## 必要なもの

BlueStacksを動かせるWindows PC、モデル用のRAMとストレージ、BlueStacks 5、公式Layla APK、LM Studio、初回ダウンロード用のインターネットが必要です。インストール後、モデル自体はローカル実行できます。

## 1. BlueStacksをインストールする

公式サイトから [BlueStacks 5](https://www.bluestacks.com/bluestacks-5.html) をダウンロードしてインストールし、Android環境の準備を完了します。Google Playも使えますが、以下では公式APKを直接使います。

## 2. 公式Layla APKをダウンロードする

[Layla公式サイト](https://www.layla-network.ai/)を開きます。

![スマートフォンの画像とアプリのダウンロードボタンがある暗色のLaylaトップページ。](./download-layla.avif)

Google Play版ではなく直接APKを選び、Downloadsなど分かりやすい場所に保存します。安全のため、公式サイトからのみダウンロードしてください。

## 3. BlueStacksにAPKをインストールする

1. サイドツールバーの **Install APK** をクリックします。
2. ダウンロード済みAPKを選びます。
3. 完了を待ちます。

BlueStacksのウィンドウへドラッグしてもインストールできます。ホーム画面にLaylaが表示されますが、ローカル会話の前にLM Studioを設定してください。

![LaylaのSelect Character画面、検索、カテゴリが表示されたBlueStacks。](./bluestacks-select-character.avif)

## 4. LM Studioをインストールする

LM StudioはPC上でモデルをダウンロードしローカル実行する推論エンジンです。公式サイトから [LM Studio](https://lmstudio.ai/download) をダウンロードし、初期設定を完了します。

## 5. 推奨モデルをダウンロードする

モデルブラウザーで探します。LM Studioがハードウェアに合う候補を表示することがあります。

- 小型モデルはRAM使用量が少なく、通常は高速です。
- 大型モデルは質が高い場合がありますが、多くのメモリーが必要です。
- 量子化モデルは一般にRAMとVRAMを節約します。
- 初めてなら小型の推奨モデルから始めます。

![ダウンロード済みAIモデルとサイズを表示するLM Studioのモデル選択画面。](./lm-studio-model-selection.avif)

## 6. OpenAI互換APIサーバーを起動する

1. **Developer** タブを開きます。
2. モデルを選択または読み込みます。
3. サーバー設定を開きます。
4. **Serve on Local Network** を有効にします。
5. ローカルAPIサーバーを起動します。

![サーバーが動作し、設定が強調されたLM Studio Developer Local Server画面。](./lm-studio-server-settings.avif)

LM StudioがローカルIPとポート（通常 `1234`）を使ったアドレスを表示します。

```text
http://192.168.1.100:1234
```

OpenAI互換のURLには通常 `/v1` が入ります。

```text
http://192.168.1.100:1234/v1/chat/completions
```

実際に表示されたアドレスを使用してください。

**Laylaへ接続するOpenAI互換APIを探します。**

![ローカルサーバー、OpenAI互換エンドポイント、ログを表示し、chat completionsを強調したDeveloper画面。](./lm-studio-api-endpoints.avif)

### Serve on Local Networkが必要な理由

BlueStacksは別の仮想Android環境で動くため、次は通常使えません。

```text
http://localhost:1234/v1
```

BlueStacks内の `localhost` はWindows PCではなくAndroidを指します。**Serve on Local Network**で到達可能なネットワークアドレスを提供します。

信頼できるプライベートネットワークでのみ公開し、他の端末がアクセスできる場合はAPI認証を検討してください。

## 7. LaylaでOpenAI互換APIを選ぶ

1. **Settings** を開きます。
2. **Inference Settings** へ進みます。
3. **OpenAI Compatible API** を選びます。

![Local File、Your PC、Layla Cloud、OpenAI API、Claude APIがある推論エンジン選択画面。](./layla-inference-engine.avif)

## 8. LM Studioのエンドポイントを入力する

必要に応じて `/v1` を含め、LM Studioが表示したアドレスを入力します。

```text
http://192.168.1.100:1234/v1/chat/completions
```

**例をそのままコピーせず、自分のPCに表示されたものへ置き換えてください。**

![名前、エンドポイント、APIキー、モデルがあるEdit OpenAI API Settings。](./layla-api-settings.avif)

保存し、LM Studioを開いたままにします。サーバーとモデルが利用可能で、**Serve on Local Network**が有効、Windows FirewallがプライベートネットワークでLM Studioを許可していることを確認します。

## 9. チャットを始める

キャラクターまたは新しい会話を開いてメッセージを送ります。Laylaがローカルモデルへ転送し、応答を表示します。

![LM Studio経由のLaylaチャットで「Who are you?」と質問し、Laylaが回答している画面。](./layla-chat-via-lm-studio.avif)

## トラブルシューティング

### 接続できない

サーバーの動作、**Serve on Local Network**、`localhost`ではないネットワークアドレス、ポート、`/v1`、Windows Firewallを確認し、設定変更後はサーバーを再起動します。

### 接続するが応答しない

モデルがダウンロード済みで利用可能か確認し、サーバーログを調べて、必要なら手動で読み込みます。

### 応答が遅い

小型または強く量子化したモデルを使い、メモリー消費の多いアプリを閉じ、コンテキストサイズを減らします。

### APKに互換性がない

Multi-instance ManagerでPie 64-bitまたはAndroid 11などの新しい64ビットAndroidインスタンスを作り、APKをインストールします。

### PC再起動後にサーバーが停止する

LM StudioのDeveloperタブでサーバーをもう一度起動します。

## よくある質問

### WindowsでLaylaを実行できますか？

はい。BlueStacksなどのAndroidエミュレーターで直接APKを実行できます。

### ネイティブWindowsアプリはありますか？

このガイドではBlueStacks内のAndroid版を使います。対応中のプラットフォームはLayla公式サイトで確認してください。

### LM Studioはローカルで実行しますか？

はい。モデルと生成はPC上で動きます。他のLayla機能は利用するサービスによってインターネットが必要な場合があります。

### 両方のアプリを開いたままにしますか？

はい。BlueStacksはLaylaを実行し、LM StudioのAPIサーバーが応答を生成します。

### どのモデルを使うべきですか？

RAM、VRAM、処理能力によります。LM Studioの推奨から始め、余裕があれば大型モデルを試してください。

## まとめ

1. BlueStacksをインストール。
2. 公式Layla APKをダウンロード。
3. BlueStacksへLaylaをインストール。
4. LM Studioとモデルを用意。
5. OpenAI互換APIサーバーを起動。
6. **Serve on Local Network**を有効化。
7. エンドポイントをLaylaへ入力。
8. チャットを開始。

この構成では大きなWindows画面でLaylaのAndroid版を使い、PCがローカルLLM推論を処理します。
