---
title: Layla SDKを使い始める
description: Layla SDKをインストールし、エージェントスキルを活用して、ブラウザーのモックで動作するストリーミング対応のHTMLミニアプリを作り、Laylaの端末内AIに接続するまでを解説します。
category: Layla SDK
order: 10
keywords:
  - Layla SDK
  - "@layla-network/sdk"
  - Laylaミニアプリ
  - Layla SDKエージェントスキル
  - WebView SDK
  - ローカルAI SDK
lastUpdated: 2026-08-30
translationKey: getting-started-with-the-layla-sdk
ai_translated: true
---

**Layla SDKは、Layla内で利用できるAI機能を使ったミニアプリを構築するためのTypeScript／JavaScriptライブラリです。** ミニアプリは、アクティブなモデルからチャットをストリーミングし、キャラクターやメモリーを扱い、画像や音楽を生成し、音声を利用し、非公開のアプリデータを保存できます。APIキーの設定もAIサーバーの起動も不要です。

このガイドでは、SDKの入手先、コーディングエージェントにエージェントスキルを渡す方法、そしてLaylaから応答をストリーミングする小さなHTMLミニアプリの作り方を説明します。

## 既存のミニアプリを見る

自分のプロジェクトを始める前に他の人が作ったものを見たい場合は、[Layla Cloud Apps](https://apps.layla-cloud.com/)を閲覧してください。既存のミニアプリを眺めると、Laylaに合うインターフェースやワークフローの傾向がつかめます。そこから最初に作る小さなアイデアを1つ選びましょう。

## Layla SDKの仕組み

LaylaのミニアプリはLaylaのReact Native WebView内で動作するWebアプリです。コードがSDKのメソッドを呼び出すと、SDKはWebViewブリッジ越しにメッセージを送ります。Laylaホストが端末上で処理を実行し、結果を返します。

```text
Mini-app -> Layla SDK -> WebView bridge -> Layla host -> on-device model
```

そのため、このSDKは一般的なクラウドAPIクライアントとは異なります。

- APIキー、ベースURL、HTTPエンドポイントの設定は不要です。
- アクティブなモデルと推論エンジンはLaylaホストが選びます。
- 実際のSDK呼び出しは、ホストブリッジが利用できるLayla内で動作します。
- 通常のブラウザー開発では、代わりにSDKのモックホストをインストールします。

ローカルモデルによる生成はスマートフォンでは時間がかかることがあります。対話的な機能ではストリーミングを使い、処理中であることを明確に示し、生成を停止する手段をユーザーに用意してください。

コードを書く前にもう少し背景を知りたい場合は、[Laylaのミニアプリとは？](/post-what-are-layla-mini-apps-codekitty/)をお読みください。

## SDKの入手先

SDKは[npmの`@layla-network/sdk`](https://www.npmjs.com/package/@layla-network/sdk)として公開されています。既存のJavaScriptまたはTypeScriptプロジェクトには次のコマンドでインストールします。

```bash
npm install @layla-network/sdk
```

[Layla SDKリポジトリ](https://github.com/l3utterfly/layla-sdk)には、ソースコード、APIリファレンス、パッケージングに関する注意事項、ミニアプリのサンプルが含まれています。

![ソース、ドキュメント、サンプル、エージェントスキルの各フォルダーが並ぶLayla SDKのGitHubリポジトリ。](./github.png)

コンポーネントや複数のソースファイル、より多くのアプリケーション状態が必要なアプリ向けには、公式の[React・TypeScript・Viteのスタータープロジェクト](https://github.com/l3utterfly/layla-miniapp-template)もあります。

小さなアプリで重要なインポートは次のとおりです。

```js
import { LaylaSDK } from "@layla-network/sdk";

const layla = new LaylaSDK();
```

クライアントは1つだけ作成し、アプリ全体で使い回してください。

## Layla SDKのエージェントスキルを使う

SDKプロジェクトはエージェントスキルも公開しています。これはCodex、Claude Code、OpenCodeなどのコーディングエージェント向けのドキュメント一式です。SDKの公開メソッド、WebViewランタイム、ローカルモック、パッケージングの規則、よくあるエラーをエージェントに教えます。

スキルとnpmパッケージは役割が異なります。スキルはコーディングエージェントがアプリを書くのを助けるもので、`@layla-network/sdk`はアプリ自体に組み込まれるライブラリです。

スキルを使う手順は次のとおりです。

1. [Layla SDKエージェントスキルのリリース一覧](https://github.com/l3utterfly/layla-sdk/releases?q=agent+skill&expanded=true)を開きます。
2. 該当する最新のリリースからエージェントスキルのZIPをダウンロードします。
3. お使いのコーディングエージェントのスキル導入手順に従って、そのZIPをインポートまたはインストールします。
4. コーディングエージェントでミニアプリのプロジェクトを開きます。
5. プロンプトでスキル名を指定し、アプリの挙動を説明します。

例:

```text
Use the layla-sdk skill to build a self-contained Layla mini-app.
Create a simple writing prompt generator that streams its response,
shows a working state, has a Stop button, uses the Layla mock during
local development, and builds to an index.html with app.json at the
root of the output.
```

SDKのすべてのメソッドを試させるのではなく、ユーザー体験を具体的に指定してください。最初のバージョンは的を絞ったほうがスマートフォンで検証しやすくなります。キャラクター、画像、音声、ストレージ、コンテキストチャットは後の反復で追加できます。

## 小さなHTMLミニアプリを作る

以下の例では、プロンプト入力欄、**Ask Layla**ボタン、ストリーミング表示される回答、**Stop**ボタンを備えたページを作成します。ViteがSDKのインポートを処理し、`vite-plugin-singlefile`が本番用のJavaScriptとCSSを1つの`index.html`にまとめます。

Node.jsとnpmが必要です。プロジェクトを作成して依存関係をインストールします。

```bash
mkdir hello-layla
cd hello-layla
npm init -y
npm install @layla-network/sdk
npm install --save-dev vite vite-plugin-singlefile
npm pkg set scripts.dev="vite" scripts.build="vite build" scripts.preview="vite preview"
```

次の構成を作成します。

```text
hello-layla/
  public/
    app.json
  src/
    main.js
  index.html
  package.json
  vite.config.js
```

### ミニアプリのメタデータを追加する

`public/app.json`を作成します。

```json
{
  "title": "Hello Layla",
  "tagline": "Ask the on-device model for a short answer.",
  "description": "A small starter mini-app built with the Layla SDK."
}
```

Viteは`public`内のファイルを`dist`の直下にコピーするため、ビルドされたパッケージのルートには`app.json`と`index.html`の両方が置かれます。

### ページを作成する

`index.html`を作成します。

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello Layla</title>
    <style>
      :root {
        color: #f4f3f8;
        background: #111017;
        font-family: system-ui, sans-serif;
      }

      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
      }

      main {
        width: min(42rem, calc(100% - 2rem));
      }

      textarea,
      pre {
        box-sizing: border-box;
        width: 100%;
        padding: 1rem;
        border: 1px solid #3a3744;
        border-radius: 0.75rem;
        color: inherit;
        background: #1b1922;
      }

      textarea {
        min-height: 7rem;
        resize: vertical;
      }

      pre {
        min-height: 9rem;
        white-space: pre-wrap;
      }

      .actions {
        display: flex;
        gap: 0.75rem;
        margin: 0.75rem 0;
      }

      button {
        padding: 0.7rem 1rem;
        border: 0;
        border-radius: 999px;
        font: inherit;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Hello Layla</h1>
      <p>Ask the model running through your selected Layla inference engine.</p>

      <label for="prompt">Prompt</label>
      <textarea id="prompt">Give me one practical writing tip.</textarea>

      <div class="actions">
        <button id="send">Ask Layla</button>
        <button id="stop" disabled>Stop</button>
      </div>

      <p id="status" aria-live="polite">Ready.</p>
      <pre id="answer" aria-live="polite">The response will appear here.</pre>
    </main>

    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

### ページをLaylaに接続する

`src/main.js`を作成します。

```js
import {
  LaylaAbortError,
  LaylaBridgeUnavailableError,
  LaylaError,
  LaylaSDK,
  installLaylaMock,
} from "@layla-network/sdk";

if (import.meta.env.DEV) {
  installLaylaMock({
    respond: (messages) =>
      `Mock response to: ${messages.at(-1)?.content ?? ""}`,
  });
}

const layla = new LaylaSDK();
const promptInput = document.querySelector("#prompt");
const sendButton = document.querySelector("#send");
const stopButton = document.querySelector("#stop");
const status = document.querySelector("#status");
const answer = document.querySelector("#answer");

let activeStream = null;

sendButton.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();
  if (!prompt || activeStream) return;

  answer.textContent = "";
  status.textContent = "Layla is thinking…";
  sendButton.disabled = true;
  stopButton.disabled = false;

  const stream = layla.chat.completions.stream({
    messages: [{ role: "user", content: prompt }],
  });

  activeStream = stream;

  stream.on("content", (_delta, snapshot) => {
    answer.textContent = snapshot;
  });

  try {
    await stream.finalContent();
    status.textContent = "Finished.";
  } catch (error) {
    if (error instanceof LaylaAbortError) {
      status.textContent = "Stopped.";
    } else if (error instanceof LaylaBridgeUnavailableError) {
      status.textContent = "Open this mini-app inside Layla.";
    } else if (error instanceof LaylaError) {
      status.textContent = error.message;
    } else {
      console.error(error);
      status.textContent = "Something went wrong.";
    }
  } finally {
    activeStream = null;
    sendButton.disabled = false;
    stopButton.disabled = true;
  }
});

stopButton.addEventListener("click", () => {
  activeStream?.abort();
});
```

モックはViteが開発モードで動作しているときにだけインストールされます。本番ビルドではインストールされないため、Layla内で行われる呼び出しは実際のホストブリッジに渡されます。

### アプリを1つのHTMLファイルにまとめる

`vite.config.js`を作成します。

```js
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [viteSingleFile()],
  build: {
    assetsInlineLimit: Infinity,
  },
});
```

この設定により、バンドルされたJavaScriptとCSSがページ内に埋め込まれます。`app.json`を含む`public`内のファイルは、生成された`index.html`の隣に引き続きコピーされます。

## ブラウザーでテストする

開発サーバーを起動します。

```bash
npm run dev
```

Viteが表示するローカルアドレスを開き、**Ask Layla**を選択します。モックの応答が少しずつ表示されるはずです。これでページ、イベントハンドラー、ストリーミングUIを確認できますが、実際のモデルは動作していません。

開発用モックを外して通常のブラウザーでページを開くと、SDKは`LaylaBridgeUnavailableError`を報告します。LaylaのWebViewブリッジが存在しないため、これは想定どおりの動作です。

## ミニアプリをビルドしてインポートする

本番用ファイルを作成します。

```bash
npm run build
```

`dist`フォルダーには次のファイルが含まれているはずです。

```text
dist/
  app.json
  index.html
```

`dist`ディレクトリ自体ではなく、`dist`の**中身**をZIPに圧縮してください。`app.json`と`index.html`は、親フォルダーを挟まずZIPのルートに置く必要があります。そのZIPをLaylaのミニアプリのインポート機能で読み込み、**Hello Layla**を開いてプロンプトを送信します。

Laylaは選択したモデルを端末上で実行するため、実際の応答はブラウザーのモックより遅く届くことがあります。ページは内容の更新ごとにストリーミング表示し、Stopボタンを`stream.abort()`に接続したままにするので、生成中も操作を受け付けます。

## 最初のプロジェクトでよくある問題

### SDKがブリッジを利用できないと表示するのはなぜですか？

`installLaylaMock(...)`なしで通常のブラウザーでアプリを実行しているか、LaylaのWebView内で実行していないためです。ローカル開発では最初のSDK呼び出しより前にモックをインストールし、開発時のみ有効になる条件で囲んでください。

### インポートしたミニアプリにメタデータがないのはなぜですか？

`app.json`が有効なJSONであり、インポートしたZIPのルートにあることを確認してください。`public`や`dist`、その他の入れ子フォルダーではなく、`index.html`と並んでいる必要があります。

### SDKでモデルを選ぶ必要がありますか？

いいえ。Laylaホストがアクティブな推論エンジンを使用します。ミニアプリが明示的に選択肢を提供する必要がある場合の推論エンジンの一覧取得や切り替えについては、今後の記事で扱う予定です。

### ミニアプリは必ず1つのHTMLファイルにすべきですか？

ソースプロジェクトのファイル数に制限はありません。自己完結した`index.html`は、オフラインのミニアプリを配布するのに便利な形式というだけです。規模の大きなプロジェクトでは、公式の[Laylaミニアプリテンプレート](https://github.com/l3utterfly/layla-miniapp-template)から始め、ビルド工程で単一ファイルの出力を生成させてください。

## 次のステップ

このスターターはストリーミングチャットしか使っていませんが、同じクライアントからキャラクター、コンテキストチャットのイベント、メモリー、ペルソナ、音声合成、音声認識、バックグラウンド音声、画像と音楽の生成、非公開のSQLiteデータベース、非公開ファイルのユーティリティも利用できます。このカテゴリーの他の記事が各分野を個別のチュートリアルとして整備するまでは、[SDKのAPIリファレンスとサンプル](https://github.com/l3utterfly/layla-sdk)が最も確実な情報源です。
