---
title: Layla SDKでLaylaミニアプリを作る方法
description: Layla SDKを使ってLaylaミニアプリを一から作ります。ストリーミングチャット、画像入力、音声、履歴の保存、パッケージ化まで、公式チャットサンプルに沿って解説します。
category: Layla SDK
order: 30
keywords:
  - Laylaミニアプリ 作り方
  - Layla SDK チュートリアル
  - "@layla-network/sdk"
  - Layla チャットAPI
  - ストリーミングチャットAPI
  - 端末内AIアプリ
  - オフラインAIチャットボット
  - ローカルLLMアプリ
  - OpenAI互換チャットAPI
  - 音声合成
  - 音声認識
  - React Vite ミニアプリ
  - Layla SDK エージェントスキル
lastUpdated: 2026-11-04
translationKey: how-to-build-a-layla-mini-app-with-the-layla-sdk
ai_translated: true
---

**Laylaミニアプリは、Layla内で動作するウェブアプリで、Layla SDKを通じてチャット、音声、画像、メモリ、プライベートストレージなど、端末上のAI機能を利用できます。** APIキーも、自分で動かすサーバーも不要です。JavaScriptまたはTypeScriptで通常のウェブアプリを書き、`@layla-network/sdk`を呼び出すだけで、ユーザーが選択したモデルと推論エンジンでLaylaが処理を行います。

このチュートリアルでは、Layla SDKリポジトリにある公式の[チャットサンプル](https://github.com/l3utterfly/layla-sdk/tree/main/examples/chat)を参考に、完成度の高いチャットミニアプリを一歩ずつ作ります。最後まで進めると、端末上のモデルからの応答をストリーミングする方法、生成の停止、画像の送信、音声の入出力、ミニアプリのプライベートデータベースへの履歴保存、SDKのモックを使ったブラウザーでの開発、Layla向けのパッケージ化がわかります。

> **コーディングエージェントを使っていますか？** Layla SDKは、Codex、Claude Code、OpenCodeなどのコーディングエージェントにSDKでのミニアプリの書き方を教えるエージェントスキルを公開しています。スキルをエージェントに渡し、作りたいアプリを説明すれば、この記事の作業の大部分をエージェントに任せられます。ダウンロードとセットアップの手順は[Layla SDKのエージェントスキルを使う](/getting-started-with-the-layla-sdk/#use-the-layla-sdk-agent-skill)をご覧ください。この記事は、エージェントがスキルと併せて読めるリファレンスとしても書かれているため、終盤の[開発者とコーディングエージェント向けクイックリファレンス](#開発者とコーディングエージェント向けクイックリファレンス)に、サンプルが使うすべての呼び出しをまとめています。

## 作るもの

チャットサンプルは、1画面のReactとViteのアプリで、次の機能を備えています。

| 機能                                        | 使用するSDK呼び出し                                                                        |
| ------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 点滅カーソル付きのストリーミング応答        | `layla.chat.completions.stream(...)`, `stream.on("content", ...)`, `stream.finalContent()` |
| 実行中の生成を止める停止ボタン              | `stream.abort()`, `LaylaAbortError`                                                        |
| メッセージへの画像添付                      | OpenAIメッセージ形式の`image_url`コンテンツパート                                          |
| 再起動後も残る履歴                          | `layla.db.executeSql(...)`                                                                 |
| メッセージをLayla自身のチャット履歴にコピー | `layla.chat.saveChatMessage(...)`                                                          |
| 選んだ音声で応答を読み上げ                  | `layla.tts.getVoices()`, `layla.tts.generateVoice(...)`, `layla.tts.stopSpeaking()`        |
| メッセージの音声入力、ハンズフリー会話      | `layla.stt.startListening()`, `layla.stt.on("speechRecognized", ...)`                      |
| 通常のブラウザーでの実行とデバッグ          | `installLaylaMock(...)`                                                                    |

ロジックのほとんどは、アプリ本体の[`src/App.tsx`](https://github.com/l3utterfly/layla-sdk/blob/main/examples/chat/src/App.tsx)と、開発用モックの[`src/main.tsx`](https://github.com/l3utterfly/layla-sdk/blob/main/examples/chat/src/main.tsx)の2つのファイルにあります。

## 始める前に

必要なものは次のとおりです。

- パソコンにインストールしたNode.jsとnpm。
- JavaScriptまたはTypeScriptの基本的な知識。サンプルはReactを使っていますが、SDK自体はReactを必要としません。どのウェブスタックでも動作します。
- 端末でテストするための、Android端末上の最新版Layla。一部の機能には最低バージョンが必要です。詳しくは[バージョン要件](#バージョン要件)をご覧ください。

始めるだけなら端末は不要です。開発中は、SDKのモックホストがLaylaの代わりを務めるため、デスクトップのブラウザーでインターフェースを作成してテストできます。

## Laylaミニアプリの仕組み

ミニアプリは、Laylaが専用のWebViewで読み込むウェブページです。SDKは、そのページとLaylaアプリの間のメッセージ層をラップしているので、通常のメソッドを呼び出すだけで済みます。

```text
ミニアプリ -> Layla SDK -> WebViewブリッジ -> Laylaアプリ -> 端末上のモデル
```

このチュートリアルの以降の内容は、次の点を前提にしています。

- **設定するものはありません。** APIキー、ベースURL、エンドポイントは不要です。SDKはLaylaのブリッジが存在する場所、つまりLayla内でのみ動作します。それ以外の場所では、SDKの呼び出しは`LaylaBridgeUnavailableError`で拒否されます。
- **モデルはユーザーが選びます。** コードはチャット補完を要求するだけで、Laylaがアクティブな推論エンジンを使用します。ユーザーがエンジンを切り替える方法は[Laylaで保存済み推論エンジンを使う仕組み](/how-saved-inference-engines-work-in-layla/)をご覧ください。
- **応答は遅いことがあります。** スマートフォン上のモデルはクラウドAPIより遅いため、応答をストリーミングし、処理中の状態を表示し、ユーザーが停止できるようにしましょう。
- **各ミニアプリには専用のストレージがあります。** プライベートなSQLiteデータベースとプライベートなファイル領域はミニアプリごとのもので、他のミニアプリとは共有されません。

コードを書く前に背景を知りたい場合は、[Laylaミニアプリとは？](/post-what-are-layla-mini-apps-codekitty/)と、より小さな素のHTMLアプリを作る[Layla SDKを使い始める](/getting-started-with-the-layla-sdk/)をお読みください。

## ステップ1: プロジェクトを用意する

始め方は2通りあります。

### オプションA: 公式サンプルを実行する

SDKリポジトリをクローンして、サンプルをそのまま実行します。

```bash
git clone https://github.com/l3utterfly/layla-sdk.git
cd layla-sdk/examples/chat
npm install
npm run dev
```

Viteがローカルアドレスを表示します。ブラウザーで開けば、すぐにモックホストとチャットできます。

サンプルはリポジトリの`examples/chat`フォルダーにあり、他のサンプルミニアプリと並んでいます。

![GitHubのlayla-sdkリポジトリにあるexamples/chatフォルダー。publicとsrcフォルダー、package.json、vite.config.ts、サンプルのREADMEが表示されています。](./chat.png)

### オプションB: 自分のプロジェクトを始める

Viteで新しいReactとTypeScriptのプロジェクトを作成し、SDKを追加します。

```bash
npm create vite@latest my-chat -- --template react-ts
cd my-chat
npm install
npm install @layla-network/sdk
npm install --save-dev vite-plugin-singlefile
```

サンプルのソースコードに沿って進める場合は、1か所だけ変更します。SDKリポジトリ内では、サンプルはSDKをソースフォルダーからインポートしています。

```ts
import { LaylaSDK } from "../../../src/index";
```

自分のプロジェクトでは、代わりに公開済みのパッケージからインポートします。

```ts
import { LaylaSDK } from "@layla-network/sdk";
```

複数のページや多くの状態を持つ大きめのアプリには、公式の[Laylaミニアプリテンプレート](https://github.com/l3utterfly/layla-miniapp-template)が、React、TypeScript、Viteを使った出来上がりのスタート地点になります。

### サンプルのファイル構成

```text
examples/chat/
  index.html        #root要素を含むViteのエントリーページ
  package.json      React 19、Vite、TypeScript
  vite.config.ts    Reactプラグインとvite-plugin-singlefile
  public/           ビルド出力のルートにコピーされる静的ファイル
  src/
    main.tsx        開発時にLaylaのモックをインストールし、<App />をマウント
    App.tsx         チャットのロジックとUIのすべて（約760行）
    App.css         チャット画面のスタイル
    index.css       グローバルスタイル
```

[ステップ13](#ステップ13-ミニアプリをパッケージ化する)で説明するビルド手順により、これがLaylaの読み込む、自己完結した1つの`index.html`になります。

## ステップ2: Laylaクライアントを作成する

`App.tsx`の先頭で、クライアントを1つ作成し、あらゆる場所で使い回します。

```ts
import { LaylaSDK, LaylaAbortError } from "@layla-network/sdk";

const layla = new LaylaSDK();
```

`LaylaSDK`と`Layla`は同じクラスです。すべての機能はこのクライアントのプロパティとして提供されます。`layla.chat`、`layla.tts`、`layla.stt`、`layla.db`、`layla.characters`、`layla.images`などです。クライアントをコンポーネントの外のモジュールレベルで作成すれば、共有され、再レンダリングのたびに作り直されることもありません。

## ステップ3: Laylaのモックを使ってブラウザーで開発する

Layla以外にはブリッジがないため、SDKの呼び出しはすべて失敗します。SDKには、開発用にブリッジを模倣するモックホストが含まれています。サンプルでは、Viteが開発サーバーを実行しているときにだけ、`main.tsx`がこれをインストールします。

```ts
import { installLaylaMock } from "@layla-network/sdk";

if (import.meta.env.DEV) {
  installLaylaMock({
    respond: (messages) => {
      const message = messages.at(-1);
      return `You said: ${message?.content ?? "(no text)"}. Mock response from Layla.`;
    },
    latencyMs: 300,
    tokenDelayMs: 25,
  });
}
```

ここで使っているオプションは次のとおりです。

- `respond`は会話を受け取り、擬似モデルが返すテキストを返します。モックはそれを少しずつストリーミングするため、ストリーミングUIは端末上と同じように動作します。`messages`の各メッセージはLayla固有の形式であるため、サンプルは`message.image_base64`を調べて添付画像を判定しています。
- `latencyMs`は応答が始まる前に遅延を加え、モデルの起動を模倣します。
- `tokenDelayMs`はストリーミングされる各断片の間の遅延です。

`import.meta.env.DEV`は本番ビルドでは`false`になるため、配布するファイルにはモックがインストールされず、Layla内での呼び出しは本物のブリッジに届きます。

モックは最初のSDK呼び出しより前にインストールしてください。サンプルはモックのコードを本番バンドルに含めないよう、動的な`import()`を使っています。ブラウザーで最初にページを読み込んだときに`LaylaBridgeUnavailableError`が出る場合は、アプリをレンダリングする前にモックをインストールしてください。

```tsx
async function start() {
  if (import.meta.env.DEV) {
    const { installLaylaMock } = await import("@layla-network/sdk");
    installLaylaMock({/* options */});
  }
  ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
}

void start();
```

### データベースもモックする

モックには本物のSQLiteがありません。デフォルトでは、`layla.db.executeSql(...)`の呼び出しはどれも空の結果を返します。サンプルは、使用する4つの文（`CREATE`、`INSERT`、`SELECT`、`DELETE`）を`localStorage`で処理する`executeSql`ハンドラーを渡しており、ブラウザーを更新しても履歴が再読み込みされます。Layla内では、同じ呼び出しが端末上の本物のデータベースに対して実行され、このハンドラーは使われません。

モックは音声認識にも応答します。`startListening()`が成功すると、あらかじめ用意した文字起こしを送出します。`sttTranscript`オプションで変更でき、`null`を渡せば無効にできます。

## ステップ4: 会話をモデル化する

サンプルは、画面用に独自のシンプルなメッセージ型を持っています。

```ts
interface ChatMessage {
  role: "user" | "assistant";
  content: string | null;
  imageBase64?: string;
  imageName?: string;
}
```

SDKのチャットAPIはOpenAIのChat Completions形式に従い、`system`、`user`、`assistant`のロールと`content`フィールドを使います。小さな関数が、画面の状態をこの形式に変換します。添付画像が`image_url`コンテンツパートになるのはここです。

```ts
import type {
  ChatCompletionContentPart,
  ChatCompletionMessageParam,
} from "@layla-network/sdk";

const toCompletionMessage = (
  message: ChatMessage,
): ChatCompletionMessageParam => {
  if (message.role === "assistant") {
    return { role: "assistant", content: message.content };
  }

  if (!message.imageBase64) {
    return { role: "user", content: message.content ?? "" };
  }

  const content: ChatCompletionContentPart[] = [];
  if (message.content) {
    content.push({ type: "text", text: message.content });
  }
  content.push({
    type: "image_url",
    image_url: { url: message.imageBase64, detail: "auto" },
  });

  return { role: "user", content };
};
```

画面用の型を別に持つのは設計上の選択であり、必須ではありません。画像のファイル名のような追加フィールドを、モデルに送らずに保存できます。

他のOpenAI形式のAPIと同様に、各リクエストは`messages`に会話の全体を含めます。そのため、過去のやり取りを覚えて再送する責任はアプリ側にあります。モデルに人格や指示を与えるには、配列の先頭に`system`メッセージを追加します。

## ステップ5: 応答をストリーミングする

ここがアプリの中心です。ユーザーが**送信**を押すと、サンプルは新しいメッセージリストを作り、空のアシスタントメッセージを画面に表示し、ストリームを開始します。

```ts
const userMessage: ChatMessage = { role: "user", content: text };
const nextMessages = [...messages, userMessage];

// Show the user's message and an empty reply bubble immediately.
setMessages([...nextMessages, { role: "assistant", content: "" }]);

const stream = layla.chat.completions.stream({
  messages: nextMessages.map(toCompletionMessage),
});

stream.on("content", (_delta, snapshot) => {
  setMessages([...nextMessages, { role: "assistant", content: snapshot }]);
});

const reply = await stream.finalContent();
```

理解しておきたい点です。

- **`stream(...)`はすぐに戻ります。** Promiseではなく、実行中のストリームオブジェクトを同期的に返すため、最初のトークンが届く前にリスナーを登録できます。
- **スナップショットを使います。** `content`イベントは、新しい`delta`と、ここまでの応答全体の`snapshot`という2つの値を渡します。状態をスナップショットに設定するほうが、デルタを追加するよりも簡単で安全です。イベントの取りこぼしや重複があってもテキストが壊れません。
- **`finalContent()`は終了を待ちます。** 完全な表示用の応答で解決され、ストリームが失敗または中断された場合は拒否されます。
- **推論部分は自動的に分離されます。** モデルが思考内容を`<think>`タグで囲む場合、SDKは`content`からそれを取り除き、`reasoning`イベントで渡します。そのため、タグがチャットの吹き出しに現れることはありません。

ストリームは次のイベントを送出します。

| イベント    | 引数                | 意味                                                |
| ----------- | ------------------- | --------------------------------------------------- |
| `content`   | `delta`, `snapshot` | 新しい表示テキストと、ここまでの表示用の応答全体    |
| `reasoning` | `delta`, `snapshot` | 思考型モデルによる新しい推論テキスト                |
| `toolCall`  | `toolCall`          | モデルがツールの呼び出しを要求（最新のLaylaが必要） |
| `chunk`     | `chunk`             | OpenAI形式の生のチャンクすべて                      |
| `end`       | なし                | 応答が完了                                          |
| `error`     | `error`             | リクエストが失敗または中断                          |

### 応答を読む別の方法

最終的な回答だけが必要なら、ストリーミングは使いません。

```ts
const completion = await layla.chat.completions.create({ messages });
const text = completion.choices[0]?.message.content ?? "";
```

ストリームは、OpenAI SDKと同じ流儀の非同期イテラブルでもあります。ループを抜けるとリクエストが中断されます。

```ts
for await (const chunk of stream) {
  const piece = chunk.choices[0]?.delta.content ?? "";
}
```

人が見る画面にはストリーミングを使ってください。ローカルモデルは最初の1語が出るまで数秒かかることがあり、少しずつ伸びていく応答は、固まった画面よりはるかに優れています。

### アプリが動作中であることを示す

サンプルは、1つの`busy`フラグから3つの小さなUI要素を制御します。ヘッダーの「Generating...」ラベル、最後のアシスタントの吹き出しで点滅するカーソル、そして**送信**に代わって表示される**停止**ボタンです。フラグのコピーを`busyRef`にも保持しています。ステップ11の音声リスナーのような長く生き続けるコールバックは、そうしないと過去のレンダリング時点の古い`busy`の値を読んでしまいます。refを読めば、これを避けられます。

## ステップ6: ユーザーが生成を停止できるようにする

ボタンからキャンセルできるように、アクティブなストリームへの参照を保持します。

```ts
const streamRef = useRef<ChatCompletionStream | null>(null);

// when starting:
streamRef.current = stream;

// the Stop button:
const stopGeneration = () => streamRef.current?.abort();
```

中断すると、`finalContent()`が`LaylaAbortError`で拒否されます。サンプルはこのケースを本当のエラーとは別に扱っています。

```ts
try {
  assistantContent = await stream.finalContent();
  // save the finished reply
} catch (err) {
  if (err instanceof LaylaAbortError) {
    // The user pressed Stop. Keep whatever text arrived so far.
    if (assistantContent) {
      // save the partial reply
    }
  } else {
    console.error(err);
  }
} finally {
  streamRef.current = null;
  setBusy(false);
}
```

`abort()`は、`LaylaAbortError`を伴う`error`イベントも送出します。サンプルの`error`リスナーはメッセージのテキストを画面に表示するため、自分のリスナーでは中断を除外してください。そうしないと、停止ボタンを押したときに途中までの応答がエラー行に置き換わります。

```ts
stream.on("error", (err) => {
  if (err instanceof LaylaAbortError) return;
  setMessages([
    ...nextMessages,
    { role: "assistant", content: `Error: ${err.message}` },
  ]);
});
```

リクエストに`signal`を渡すことで、ウェブ標準の仕組みでキャンセルすることもできます。

```ts
const controller = new AbortController();
const stream = layla.chat.completions.stream({
  messages,
  signal: controller.signal,
});
controller.abort();
```

## ステップ7: 画像を送信する

画像入力には、ステップ4で示したOpenAIのコンテンツパート形式を使います。サンプルは、ユーザーが選んだファイルをbase64のデータURLに変換する必要があります。

```ts
const readImageAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("The selected image could not be read."));
    };
    reader.onerror = () =>
      reject(
        reader.error ?? new Error("The selected image could not be read."),
      );
    reader.readAsDataURL(file);
  });
```

サンプルは選択できる形式を一般的な4種類に限定し、読み込み前に種類を確認します。

```ts
const supportedImageTypes = new Set([
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);
```

選択UI自体は、添付ボタンから開く非表示の`<input type="file" accept="image/png,image/jpeg,image/gif,image/webp">`です。選択後、アプリは削除ボタン付きのプレビューを表示し、データURLを次のメッセージに添付します。

覚えておくべき要件が2つあります。

- **base64のデータURLを使います。** 古いLaylaは、リモートの`https://`画像URLと、1つのメッセージ内で2枚目以降の画像を無視します。そのため、データURLが移植性のある選択です。
- **モデルが画像を扱える必要があります。** テキスト専用のモデルに画像を送っても理解されません。Laylaで画像入力を使うには、ビジョン対応のモデルを有効にする必要があります。[LaylaにビジョンLLMを追加する方法](/how-to-add-vision-llms-in-layla-qwen3-vl/)をご覧ください。

## ステップ8: プライベートデータベースに履歴を保存する

ミニアプリは開くたびに最初から読み込まれるため、ユーザーが残したいものはすべて保存する必要があります。`layla.db`は、各ミニアプリに専用のプライベートSQLiteデータベースを提供します。サンプルは、画面上の履歴にこれを使っています。

起動時にテーブルを作成します。`IF NOT EXISTS`により、毎回実行しても安全です。

```ts
const messagesTable = "chat_messages";

const createMessagesTable = () =>
  layla.db.executeSql(
    `CREATE TABLE IF NOT EXISTS ${messagesTable} (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       role TEXT NOT NULL,
       content TEXT,
       image_base64 TEXT,
       image_name TEXT,
       timestamp INTEGER NOT NULL
     )`,
  );
```

各メッセージはバインドパラメーターで追加します。値は2番目の引数で渡し、`?`のプレースホルダーを使います。ユーザーのテキストをクエリ文字列に連結してSQLを組み立てることは絶対にしないでください。

```ts
const insertMessage = async (message: ChatMessage) => {
  try {
    await layla.db.executeSql(
      `INSERT INTO ${messagesTable} (role, content, image_base64, image_name, timestamp)
       VALUES (?, ?, ?, ?, ?)`,
      [
        message.role,
        message.content,
        message.imageBase64 ?? null,
        message.imageName ?? null,
        Date.now(),
      ],
    );
  } catch (err) {
    console.error("Failed to persist chat message", err);
  }
};
```

履歴は順番に読み戻します。結果には、列名をキーとするオブジェクトの`rows`配列が含まれます。

```ts
const result = await layla.db.executeSql(
  `SELECT role, content, image_base64, image_name
     FROM ${messagesTable}
    ORDER BY id ASC`,
);
const history = result.rows;
```

どの結果にも、`rowsAffected`（書き込みで変更された行数）と`insertId`（最後に挿入された行のid、該当しない場合は`0`）が含まれます。**消去**ボタンは単に`DELETE FROM chat_messages`を実行します。

コンポーネントのマウント時にセットアップを1回実行し、保存済みメッセージで画面を埋めます。

```ts
useEffect(() => {
  (async () => {
    try {
      await createMessagesTable();
      const history = await loadMessages();
      if (history.length > 0) setMessages(history);
    } catch (err) {
      console.error("Failed to load chat history", err);
    }
  })();
}, []);
```

サンプルは画像データをbase64テキストとしてテーブルに保存しています。デモとしてはシンプルで十分です。多数の画像や大きな画像を保持するアプリでは、`layla.utils.saveFile(...)`でファイルとして書き込み、データベースにはファイル名だけを保存してください。

## ステップ9: メッセージをLaylaのチャット履歴にコピーする

`layla.db`はアプリ専用のストアです。これとは別に、`layla.chat.saveChatMessage(...)`でLaylaのネイティブなチャット履歴にメッセージを書き込むと、ユーザーの通常の会話の中に表示されます。サンプルはすべてのメッセージで両方を行っています。

```ts
const sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const saveChatMessage = async (
  message: ChatMessage,
  characterId: "layla" | "user",
) => {
  try {
    await layla.chat.saveChatMessage({
      display_message: message.content ?? "",
      message: message.content ?? "",
      id: 0,
      character_id: characterId,
      session_id: sessionId,
      timestamp: Date.now(),
    });
  } catch (err) {
    console.error("Failed to save chat message", err);
  }
};
```

各フィールドは次のとおりです。

| フィールド        | 意味                                                                                    |
| ----------------- | --------------------------------------------------------------------------------------- |
| `id`              | `0`以下で新しいエントリーを作成します。正のidは既存のエントリーを上書きします。         |
| `session_id`      | エントリーが属するチャットセッション。サンプルは起動のたびに新しく作ります。            |
| `character_id`    | ユーザー自身のメッセージは`"user"`、それ以外はキャラクターのid。                        |
| `display_message` | チャット履歴に表示されるテキスト。                                                      |
| `message`         | 以降のターンでモデルに渡されるテキスト。`display_message`と異なっていてもかまいません。 |
| `timestamp`       | ミリ秒単位のUnix時刻。`0`以下の値では現在時刻が使われます。                             |

呼び出しは、割り当てられた`id`を含む、保存されたエントリーで解決されます。

覚えておきたい点がいくつかあります。

- 存在しないセッションを作成するのは、キャラクターのエントリーだけです。まだ存在しないセッションにユーザーのエントリーを保存しても、セッションは作成されません。
- 新しいエントリーには画像がありません。そのため、サンプルは画像の添付を自身のデータベースにだけ保持しています。
- サンプルはアシスタントの応答にリテラルのid `"layla"`を使っています。ミニアプリが特定のキャラクターとして会話する場合は、`layla.characters.list()`でそのキャラクターの本当のidを取得し、代わりに使ってください。
- この呼び出しには、`display_message`と`message`を別々のテキストとして扱えるLaylaのバージョンが必要です。サンプルのように`try/catch`で囲んでおけば、保存に失敗してもアプリは動き続けます。

2つのストアは、答える問いが異なります。

| ストア                       | 保存先              | 用途                                     |
| ---------------------------- | ------------------- | ---------------------------------------- |
| `layla.db`                   | ミニアプリ内のみ    | アプリ自身の状態と、アプリ独自の履歴表示 |
| `layla.chat.saveChatMessage` | Laylaのチャット履歴 | 会話をLayla自体の中にも表示させる        |

## ステップ10: 音声合成を追加する

音声合成には、ユーザーがLaylaにインストールした音声を使います。一度読み込んで、ユーザーに選ばせます。

```ts
const [voices, setVoices] = useState<LaylaTTSVoice[]>([]);
const [voiceId, setVoiceId] = useState<string | null>(null);

useEffect(() => {
  layla.tts
    .getVoices()
    .then((available) => {
      setVoices(available);
      setVoiceId((current) => current ?? available[0]?.id ?? null);
    })
    .catch((err) => console.error("Failed to load TTS voices", err));
}, []);
```

各音声には`id`、`name`、`type`、`tags`があります。`generateVoice(...)`にidを渡すとその音声で読み上げ、`null`を渡すとLaylaのデフォルト音声を使います。Promiseは再生が終わると解決されるため、`await`で読み上げの完了を知ることができます。

```ts
const speak = async (text: string) => {
  setSpeaking(true);
  try {
    await layla.tts.generateVoice(voiceIdRef.current, text.trim());
  } catch (err) {
    if (!(err instanceof LaylaAbortError)) {
      console.error("TTS playback failed", err);
    }
  } finally {
    setSpeaking(false);
  }
};

const stopSpeaking = () => void layla.tts.stopSpeaking();
```

完了したアシスタントの吹き出しごとに、`speak(message.content)`を呼び出す**再生**ボタンが付きます。アプリの音声について詳しくは、[Laylaでキャラクターの声を聞く方法](/how-to-hear-your-characters-speak-in-layla/)をご覧ください。

再生せずに音声だけが欲しい場合は、`layla.tts.generateVoiceToFile(voiceId, text)`が、`<audio>`要素で使えるオーディオのデータURIを返すか、ミニアプリのプライベートストレージにファイルとして保存します。

## ステップ11: 音声認識とハンズフリーモードを追加する

音声入力は3つの部分で構成されます。開始のリクエスト、各文字起こしを届けるイベント、停止のリクエストです。

```ts
import type { STTSpeechRecognizedListener } from "@layla-network/sdk";

// 1. Subscribe once, for the lifetime of the app.
useEffect(() => {
  const handleSpeech: STTSpeechRecognizedListener = ({ transcript }) => {
    const text = transcript.trim();
    if (!text) return;
    setInput((prev) => (prev ? `${prev} ${text}` : text));
  };

  layla.stt.on("speechRecognized", handleSpeech);
  return () => {
    layla.stt.off("speechRecognized", handleSpeech);
    void layla.tts.stopSpeaking();
    void layla.stt.stopListening();
  };
}, []);

// 2. Ask the host to start listening.
await layla.stt.startListening();

// 3. Release the microphone when you are done.
await layla.stt.stopListening();
```

`startListening()`は文字起こしを返さない点に注意してください。そのPromiseは、認識エンジンが起動した時点で解決されます。テキストは後から`speechRecognized`イベントで届くため、開始の前か直後に購読してください。

サンプルは、これを2通りに使っています。

- **プッシュトゥトーク。** マイクボタンで聞き取りを開始し、認識されたテキストはメッセージ欄に入り、送信前にユーザーが編集できます。
- **音声モード。** ヘッダーのトグルでループを有効にします。アプリは聞き取り、聞いた内容を送信し、`layla.tts.generateVoice(...)`で応答を読み上げ、再び聞き取りを始めます。このループは、上で紹介した部品をつなぎ合わせたものにすぎません。

```ts
// at the end of sendMessage, after the reply has finished streaming
if (voiceModeRef.current && assistantContent) {
  await speak(assistantContent);
  if (voiceModeRef.current) void startListening();
}
```

信頼性を保つ実装上の工夫が2つあります。音声リスナーは1回だけ登録され、状態をクロージャで取り込む代わりにref（`voiceModeRef`、`busyRef`、`sendMessageRef`）から現在の値を読むため、レンダリングのたびに再購読する必要がありません。また、アプリは聞き取りを始める前に、再生中の音声をすべて停止します。

ブラウザーでは、モックが`startListening()`の直後にサンプルの文字起こしを送出するので、マイクなしで音声フロー全体をテストできます。

## ステップ12: エラーを処理する

SDKのエラーはすべて`LaylaError`を継承しています。次の3つのケースは個別に処理する価値があります。

```ts
import {
  LaylaAbortError,
  LaylaBridgeUnavailableError,
  LaylaError,
} from "@layla-network/sdk";

try {
  const text = await stream.finalContent();
} catch (err) {
  if (err instanceof LaylaAbortError) {
    // The user stopped the request. Not a failure.
  } else if (err instanceof LaylaBridgeUnavailableError) {
    showMessage("Open this mini-app inside Layla.");
  } else if (err instanceof LaylaError) {
    showMessage(err.message);
  } else {
    throw err;
  }
}
```

サンプルはほとんどのエラーをコンソールに記録し、音声と画像の問題は小さなインラインのアラート（`attachmentError`と`voiceError`）で表示します。公開するミニアプリでは、ユーザーの目に入る場所にメッセージを表示してください。

## ステップ13: ミニアプリをパッケージ化する

Laylaが読み込むのは1つのHTMLファイルです。サンプルの`vite.config.ts`は、`vite-plugin-singlefile`を使って、すべてのスクリプトとスタイルを`index.html`にまとめます。

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [react(), viteSingleFile()],
});
```

ビルドします。

```bash
npm run build
```

`build`スクリプトは`tsc -b && vite build`を実行するため、TypeScriptのエラーがあると、何かが出力される前にビルドが止まります。

### app.jsonを追加する

Laylaは、ミニアプリの名前と説明を`app.json`ファイルから読み取ります。サンプルのフォルダーには含まれていないため、`public/`に追加してください。Viteは`public/`にあるものをすべて、ビルド出力のルートにコピーします。

```json
{
  "title": "Layla Chat",
  "tagline": "Chat with Layla by text, image or voice.",
  "description": "A simple chat mini-app that streams replies from the on-device model.",
  "iconUri": "icon.png"
}
```

`iconUri`は同じフォルダー内の画像ファイルを指すので、正方形の`icon.png`も`public/`に置いてください。正方形のアイコンは、Laylaのグリッドやリストに最もよく収まります。`backgroundImgUri`は、背景やプレビュー用の画像を指定する任意の項目です。

### 中身をZIPにする

ビルド後の`dist`は次のようになっているはずです。

```text
dist/
  app.json
  index.html
  icon.png
```

`dist`フォルダー自体ではなく、`dist`の**中身**をZIPにしてください。`app.json`と`index.html`は、親フォルダーを挟まずにZIPのルートに置く必要があります。アプリを自分でホスティングする場合は、`index.html`の代わりに、アドレスを1行で記した`index.url`ファイルを使います。

SDKリポジトリは、リリースごとにサンプルミニアプリを、そのままインポートできるZIPとしても公開しています。自分のアプリを作る前に、チャットサンプルを端末で手早く試すのに便利です。

## ステップ14: Layla内でテストする

LaylaのミニアプリのインポートフローでZIPをインポートし、アプリを開いて次を確認します。

1. メッセージが少しずつストリーミングされ、**停止**で途中までのテキストを失わずに終了できる。
2. 応答がブラウザーより遅い。これは、端末上で本物のモデルが動いているためで、想定どおりです。
3. ミニアプリを閉じて開き直すと、データベースから履歴が復元される。
4. ビジョン対応モデルが有効なときに画像入力が動作し、そうでないときはその旨が明確に伝わる。
5. **再生**で応答が読み上げられ、マイクボタンでメッセージ欄が埋まる。
6. `app.json`のタイトルとアイコンでミニアプリが表示される。

SDKの呼び出しが`LaylaBridgeUnavailableError`で失敗する場合、そのページはLayla外で動いています。タイトルやアイコンが表示されない場合は、`app.json`が有効なJSONで、ZIPのルートにあることを確認してください。

## アプリを拡張するアイデア

基本のチャットが動いたら、同じクライアントでさらに多くのことができます。

- **キャラクター。** `layla.characters.list()`と`layla.characters.getImage(id)`で、ユーザーが話し相手を選べます。キャラクターの説明を`system`メッセージに使います。
- **コンテキスト対応のミニアプリ。** `layla.contextual.getExecutionContext()`は現在のキャラクターとチャットセッションを返し、`layla.contextual.on(...)`は周囲のチャットの変化をイベントとして届けます。
- **メモリとペルソナ。** `layla.memories`と`layla.personas`で、Laylaがユーザーとキャラクターについて把握している内容にアクセスできます。
- **画像と音楽。** `layla.images.generateImage(...)`と`layla.acestep.generateMusic(...)`は、端末上のモデルでメディアを生成します。
- **ツール呼び出し。** OpenAI形式の`tools`をチャットリクエストに渡し、ループは自分で実行します。最新のLaylaとSDKが必要です（下記参照）。
- **バックグラウンド処理。** `task.js`ファイルは、WebViewを開かずに定期的に実行されます。[ミニアプリでバックグラウンドタスクを実行する](/running-background-tasks-in-your-mini-app/)をご覧ください。

## 開発者とコーディングエージェント向けクイックリファレンス

このセクションは、サンプルを凝縮した地図です。チャットミニアプリが行うSDK呼び出しをすべて、似たコードを書くときに重要な約束事とともに一覧にしています。

### チャットサンプルが使うSDK呼び出し

| 呼び出し                                                                                            | 戻り値                             | 備考                                                                                |
| --------------------------------------------------------------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------- |
| `new LaylaSDK()`                                                                                    | クライアント                       | 1つ作って使い回します。`Layla`は別名です。                                          |
| `layla.chat.completions.stream({ messages, signal? })`                                              | `ChatCompletionStream`（同期）     | すぐにリスナーを登録します。`abort()`でキャンセルします。                           |
| `layla.chat.completions.create({ messages })`                                                       | `Promise<ChatCompletion>`          | ストリーミングなし。`stream: true`を渡すと、代わりにストリームが得られます。        |
| `stream.on("content", (delta, snapshot) => ...)`                                                    | ストリーム                         | `snapshot`は、ここまでの表示テキスト全体です。                                      |
| `stream.finalContent()`                                                                             | `Promise<string>`                  | 失敗または中断で拒否されます。表示用のテキストのみを返します。                      |
| `stream.abort()`                                                                                    | void                               | `finalContent()`を`LaylaAbortError`で拒否させ、`error`を送出します。                |
| `layla.chat.saveChatMessage({ id, session_id, character_id, display_message, message, timestamp })` | `id`付きの保存済みエントリー       | `id <= 0`で作成します。新しいセッションを作成するのはキャラクターのエントリーのみ。 |
| `layla.db.executeSql(query, params?)`                                                               | `{ rows, rowsAffected, insertId }` | ミニアプリごとのプライベートSQLite。`?`プレースホルダーを使います。                 |
| `layla.tts.getVoices()`                                                                             | `LaylaTTSVoice[]`                  | 各音声に`id`、`name`、`type`、`tags`があります。                                    |
| `layla.tts.generateVoice(voiceId \| null, text)`                                                    | `Promise<void>`                    | 音声を再生します。再生終了時に解決されます。`null`はデフォルト音声を使います。      |
| `layla.tts.stopSpeaking()`                                                                          | `Promise<void>`                    | 再生を停止します。                                                                  |
| `layla.stt.startListening()`                                                                        | `Promise<void>`                    | 聞き取り開始時に解決されます。文字起こしはイベントから届きます。                    |
| `layla.stt.on("speechRecognized", ({ transcript }) => ...)`                                         | クライアント                       | `layla.stt.off(...)`で解除します。                                                  |
| `layla.stt.stopListening()`                                                                         | `Promise<void>`                    | マイクを解放します。イベントの購読は解除しません。                                  |
| `installLaylaMock(options)`                                                                         | モックのハンドル                   | 開発専用。最初のSDK呼び出しより前にインストールします。                             |

正確な型とフィールドについては、オブジェクトの形を推測するのではなく、SDKが生成するTypeScriptの宣言ファイルと[APIリファレンス](https://github.com/l3utterfly/layla-sdk)をお読みください。

### サンプルのどこに何があるか

| ファイルと関数                                                                     | 内容                                                             |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `src/main.tsx`                                                                     | 開発専用のモック（カスタムの`executeSql`ハンドラーを含む）       |
| `App.tsx`: `toCompletionMessage`                                                   | 画面のメッセージを、画像パート付きのOpenAI形式のメッセージに変換 |
| `App.tsx`: `sendMessage`                                                           | ストリーミングのループ、中断の処理、永続化、音声モードのループ   |
| `App.tsx`: `createMessagesTable`, `loadMessages`, `insertMessage`, `clearMessages` | バインドパラメーターを使うSQLiteのヘルパー                       |
| `App.tsx`: `saveChatMessage`                                                       | Laylaのネイティブなチャット履歴への書き込み                      |
| `App.tsx`: `speak`, `startListening`, `stopListening`                              | 音声合成と音声認識の制御                                         |
| `App.tsx`: `readImageAsDataUrl`, `selectImage`                                     | 画像ファイルをbase64のデータURLに読み込む                        |
| `vite.config.ts`                                                                   | アプリを1つの`index.html`にまとめる                              |

### よくある間違いを防ぐルール

- パッケージのルート`@layla-network/sdk`からインポートします。パッケージ内部のプライベートなパスからはインポートしないでください。
- SDKをHTTPクライアントのように呼び出さないでください。APIキーもベースURLもありません。
- クライアントは1つだけ作成します。モックは開発時のみ、最初のSDK呼び出しより前にインストールします。
- 人が見るものには`stream(...)`を使い、ユーザーが必ず停止できるようにします。
- 応答テキストの正は`snapshot`として扱います。
- `error`リスナーで`LaylaAbortError`を除外します。
- データベースの値は、文字列連結ではなく`?`パラメーターで渡します。
- アプリの存続期間中ずっと生きるリスナーでは、変更される値をrefから読みます。
- `image_url`パートの画像URLは、base64のデータURLにします。
- ビルドしたミニアプリには、ZIPのルートに`app.json`と`index.html`（または`index.url`）が必要です。

### バージョン要件

SDKは、動作しているLaylaのバージョンと通信し、そのバージョンが対応する最良の経路を使います。この記事は`@layla-network/sdk` 7.6を前提に書かれています。

| 機能                                                                                   | 必要なもの                                                  |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| チャット、ストリーミング、1メッセージ1画像、音声合成、音声認識、データベース、ファイル | サポートされているすべてのLaylaバージョン                   |
| ツール呼び出し、複数パートのコンテンツ、1メッセージ内の複数画像                        | Layla 7.5.0-alpha以降、および`@layla-network/sdk` 7.5.0以降 |
| `saveChatMessage`での`display_message`と`message`の個別指定                            | 更新された保存の仕様に対応したLaylaビルド                   |

古いLaylaでは、ホストが運べないフィールドはエラーにならず、コンソールの警告とともに破棄されます。ツール呼び出しに依存するミニアプリは、`app_version`を含む`layla.contextual.getExecutionContext()`で、先にバージョンを確認できます。

## よくある質問

### Laylaミニアプリはどうやって作りますか？

ウェブアプリを作成し、`@layla-network/sdk`をインストールして、コードからSDKを呼び出し、1つの`index.html`にビルドして、`app.json`を追加し、ZIPをLaylaにインポートします。この記事では、チャットアプリを例に各手順を説明しています。

### Layla SDKを使うのにAPIキーは必要ですか？

いいえ。SDKはAPIキー、ベースURL、ネットワークのエンドポイントを使いません。WebViewブリッジを通じてLaylaアプリにリクエストを送り、Laylaはユーザーが選んだモデルと推論エンジンを使います。

### LaylaのチャットAPIはOpenAI APIと互換性がありますか？

リクエストとレスポンスの形は、ロール、`messages`、ストリーミング、画像のコンテンツパート、ツールを含め、OpenAIのChat Completions形式に従っています。Laylaアプリと通信するクライアントライブラリであり、OpenAIのHTTPエンドポイントのそのままの代替ではありません。

### Laylaミニアプリはオフラインで動作しますか？

ミニアプリ自体はローカルのHTMLファイルで、チャットはユーザーがLaylaで選んだモデルを通じて動作します。ローカルモデルなら、データが端末の外に出ることはありません。ユーザーがLaylaをクラウドの推論エンジンに切り替えた場合は、そのエンジンの接続ルールが適用されます。

### React以外のフレームワークも使えますか？

はい。自己完結したHTMLページを生成できるウェブスタックなら何でも使えます。素のJavaScript、Vue、Svelteなども含みます。サンプルは、大きめのインターフェースを整理しやすいため、ViteとReactを使っています。

### ブラウザーでLaylaBridgeUnavailableErrorが出るのはなぜですか？

Laylaのブリッジは、LaylaのWebView内にしか存在しません。通常のブラウザーでは、最初のSDK呼び出しの前に`installLaylaMock(...)`でモックをインストールしてください。それも開発時のみにします。

### スマートフォンなしでミニアプリをテストするには？

Viteの開発サーバーを起動し、デスクトップのブラウザーで開きます。Laylaのモックがチャット、音声、音声一覧、データベースの呼び出しに応答するため、Laylaにインストールする前にインターフェースを作成できます。

### コーディングエージェントにミニアプリを書いてもらえますか？

はい。Layla SDKリポジトリは、Codex、Claude Code、OpenCodeなどのツール向けにエージェントスキルを公開しています。スキルをエージェントに渡し、望む動作を説明して、ローカル開発にはLaylaのモックを使うよう依頼してください。[Layla SDKを使い始める](/getting-started-with-the-layla-sdk/#use-the-layla-sdk-agent-skill)をご覧ください。

### layla.dbとsaveChatMessageの違いは何ですか？

`layla.db`は、ミニアプリに属するプライベートなSQLiteデータベースで、アプリ自身のデータに使います。`layla.chat.saveChatMessage(...)`は、Layla自身のチャット履歴にエントリーを書き込み、ユーザーの他の会話と一緒に表示されるようにします。

## 次のステップ

完成したチャットミニアプリは、あらゆるLaylaミニアプリが従うパターンの、小さいながら完結した例です。端末上のモデルから結果をストリーミングし、ローカルモデルが処理している間もインターフェースの応答性を保ち、状態をプライベートストレージに置き、自己完結した1つのHTMLファイルを配布します。推論はスマートフォン上で行われるため、Layla SDKで作ったアプリはクラウドサービスがなくても動作し続けます。呼び出しの完全な一覧、サンプルフォルダー、エージェントスキルについては、[Layla SDKリポジトリ](https://github.com/l3utterfly/layla-sdk)をご覧ください。
