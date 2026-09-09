---
title: ミニアプリでバックグラウンドタスクを実行する
description: task.jsがLaylaのミニアプリで定期的なバックグラウンド処理を実行し、プリロード済みSDKを使い、結果を記録し、WebViewアプリとロジックを安全に共有する仕組みを解説します。
category: Layla SDK
order: 20
keywords:
  - Layla SDK
  - task.js
  - Laylaミニアプリのバックグラウンドタスク
  - QuickJS
  - Viteのタスクビルド
  - バックグラウンドJavaScript
lastUpdated: 2026-08-30
translationKey: running-background-tasks-in-your-mini-app
ai_translated: true
---

**`task.js`ファイルを置くと、Laylaのミニアプリに単発のJavaScriptタスクを持たせることができ、Laylaはミニアプリのウェブビューを開かずにそれを定期的にバックグラウンドで実行できます。** タスクは隔離されたランタイムで実行され、すぐに使えるLayla SDKクライアントを受け取り、ユーザーがLaylaのタスクマネージャーで確認できる結果を返せます。

このガイドでは、実行モデルを説明し、小さな単独タスクを示したうえで、生成された`task.js`を組み立てます。これにより、規模の大きなミニアプリでも同じワークフローをインターフェースとバックグラウンドタスクの両方で再利用できます。

タスクマネージャーは、有効なタスクと無効なタスクを、バックグラウンド処理を持たないインストール済みミニアプリと区別して表示します。有効なタスクごとに、手動実行、ログ、生成されたソースを1か所で確認できます。

![Laylaのタスクマネージャー。Dreamが有効なミニアプリタスクとして表示され、無効化された診断タスクと、バックグラウンドタスクを持たないインストール済みミニアプリが並んでいる。](./task-manager.jpg)

ミニアプリ開発が初めての場合は、[Layla SDKを使い始める](/getting-started-with-the-layla-sdk/)から始めてください。

## `task.js`とは

`task.js`は、パッケージ化されたLaylaミニアプリのルートに置く任意のファイルで、`app.json`や`index.html`と同じ階層に配置します。

```text
my-mini-app/
  app.json
  index.html
  task.js
  icon.png
```

Laylaがこのファイルを見つけると、そのミニアプリがタスクマネージャーに表示されます。ユーザーはタスクを手動で実行したり、バックグラウンド実行を有効・無効にしたり、直近の実行結果とログを確認したりできます。

タスクは常駐サービスではありません。Laylaはタスクを開始し、最終値またはPromiseが解決するのを待ち、結果を記録して、そのランタイムを破棄します。定期的なバックグラウンド処理をいつ試みるかはホストが制御するため、`task.js`は有用な処理を1回行って終了すべきです。独自のスケジューラーやポーリングループを内部に置かないでください。

そのため`task.js`は次のような処理に向いています。

- 最近のチャットやメモリーを読み取り、要約を保存する。
- 次にミニアプリを開いたときのためにキャッシュデータを更新する。
- ミニアプリのデータベースに構造化されたレコードを作成・更新する。
- メッセージを生成し、後で送るようスケジュールする。
- 処理が必要なキャラクターを確認し、それぞれを1回ずつ処理する。

## Laylaがバックグラウンドタスクを実行する流れ

ウェブビューとタスクの環境は同じSDKプロトコルを使いますが、別々のランタイムです。

Laylaはタスクを実行するとき、次の処理を行います。

1. そのミニアプリに限定した新しいQuickJSランタイムを作成する。
2. Layla SDKをプリロードし、ホストに接続する。
3. ミニアプリの`task.js`をクラシックなJavaScriptスクリプトとして評価する。
4. スクリプトの完了値がPromiseの場合は待機する。
5. 実行の成否、所要時間、出力、バッファリングされたコンソールログを記録する。
6. ランタイムを破棄する。

バックグラウンドキューは、Laylaがフォアグラウンドにない間に対象となるミニアプリのタスクを実行します。無効なタスクはスキップされます。手動実行でも同じ隔離実行モデルが使われます。

毎回まっさらな状態から始まるため、ある実行で宣言した変数は次の実行には存在しません。永続的な状態はSDK経由で保存してください。構造化データには`layla.db.executeSql(...)`が既定の選択肢として適しています。タスクとウェブビューアプリは同じミニアプリ専用ストレージを共有するため、インターフェースはバックグラウンドタスクが保存した内容を読み取れます。

## Layla SDKはすでに利用可能

最終的な`task.js`で`@layla-network/sdk`をインポートしないでください。Laylaはコードの実行前にSDKを注入し、次のグローバル変数を提供します。

- `layla`: すぐに使えるSDKクライアント。
- `Layla`: SDKクライアントのクラス。
- `LaylaError`、`LaylaAbortError`、`LaylaBridgeUnavailableError`: SDKのエラークラス。

ほとんどのタスクでは、既存の`layla`インスタンスをそのまま使います。

```js
const characters = await layla.characters.list(0, 10);
```

ただしこの行は非同期関数の中に置く必要があります。`task.js`はESモジュールではなくクラシックスクリプトとして評価されるため、トップレベルの`await`や`import`、`export`、`require(...)`は使えません。非同期処理は即時実行される非同期関数式（async IIFE）で包み、そのPromiseをファイルの最後の式にしてください。

このランタイムはブラウザーでもありません。DOM、`document`、`fetch`、`XMLHttpRequest`、`localStorage`、`setTimeout`、`setInterval`はありません。Promise、`async`/`await`、`queueMicrotask`、`JSON`、SDK呼び出しは通常どおり動作します。

画面がなくても意味のあるSDKメソッドを優先してください。非ストリーミングのチャット補完、キャラクター、メモリー、スケジュール済みメッセージ、感情分類、非公開ファイル、非公開SQLiteデータベースなどです。マイク入力、音声合成の再生、バックグラウンド音声のような、UIや端末操作を伴う機能は避けてください。タスク終了時にランタイムが消えるため、長時間のイベントリスナーも適しません。

## `task.js`の簡単な例

このタスクはキャラクターの1ページ目を数え、実行ごとにミニアプリの非公開データベースへ記録します。

```js
// task.js — the host has already created the global `layla` client.
console.info("Character snapshot task starting.");

(async () => {
  const ranAt = Date.now();
  const characters = await layla.characters.list(0, 10);

  await layla.db.executeSql(
    "CREATE TABLE IF NOT EXISTS character_snapshots (" +
      "id INTEGER PRIMARY KEY, ran_at INTEGER, character_count INTEGER)",
  );

  await layla.db.executeSql(
    "INSERT INTO character_snapshots (ran_at, character_count) VALUES (?, ?)",
    [ranAt, characters.length],
  );

  console.info(`Recorded ${characters.length} characters.`);

  return {
    status: "ok",
    ranAt,
    characterCount: characters.length,
  };
})();
```

async IIFEを意図的に最後の式にしています。LaylaはそのPromiseを待ち、返されたオブジェクトを実行の出力として記録します。戻り値はJSONにシリアライズできる形にしてください。Promiseが拒否されたりエラーが投げられたりすると、その実行は失敗として記録されます。一方、`console.log`、`console.info`、`console.debug`、`console.warn`、`console.error`で書き出した内容は実行ログにバッファリングされます。

ログはライブ配信ではなく、実行終了後に表示されます。簡潔な進捗の節目や診断情報にはログを、機械が読める最終的な要約には戻り値を使ってください。

## ワークフローが複雑な場合は`task.js`を生成する

小さな処理なら`task.js`を手書きしても問題ありません。しかし、バックグラウンドタスクが表示されるミニアプリと同じ選択・プロンプト・検証・永続化のロジックを使うべき場合には扱いにくくなります。

実際に稼働しているLaylaミニアプリのDreamは、専用のタスクエントリーとビルド設定を用意しています。タスクエントリーはメインアプリケーションのソースから共有のワークフローモジュールとプロンプトモジュールをインポートします。Viteがそれらのインポートをたどり、共有コードを取り込んだ単一の`dist/task.js`を生成します。生成される成果物にインポートは含まれませんが、ソースは通常どおり保守しやすいモジュールに分かれたままです。

設計上の要点は依存性の注入です。共有コードは自前でクライアントを作らず、Laylaクライアントを受け取ります。ウェブビューはインポートしたSDKクライアントを渡し、タスクはホストが提供するグローバルな`layla`クライアントを渡します。

まず共有ワークフローから始めます。

```ts
// src/lib/recordCharacterSnapshot.ts
import type LaylaSDK from "@layla-network/sdk";

export async function recordCharacterSnapshot({
  layla,
  ranAt = Date.now(),
}: {
  layla: LaylaSDK;
  ranAt?: number;
}) {
  const characters = await layla.characters.list(0, 10);

  await layla.db.executeSql(
    "CREATE TABLE IF NOT EXISTS character_snapshots (" +
      "id INTEGER PRIMARY KEY, ran_at INTEGER, character_count INTEGER)",
  );
  await layla.db.executeSql(
    "INSERT INTO character_snapshots (ran_at, character_count) VALUES (?, ?)",
    [ranAt, characters.length],
  );

  return { status: "ok", ranAt, characterCount: characters.length };
}
```

型のみのインポートはTypeScriptが共有関数を型チェックするのに役立ち、コンパイル後のJavaScriptからは消えます。表示されるミニアプリ側は、通常のSDKインスタンスで同じ関数を呼び出せます。

```ts
// src/main.ts
import LaylaSDK from "@layla-network/sdk";
import { recordCharacterSnapshot } from "./lib/recordCharacterSnapshot";

const layla = new LaylaSDK();

document.querySelector("#refresh")?.addEventListener("click", async () => {
  const result = await recordCharacterSnapshot({ layla });
  console.log(result);
});
```

次に、小さなタスクエントリーを作成します。開発中は共有ソースをインポートしますが、ビルドがそのモジュール境界を取り除きます。

```js
// src/task-entry.js
import { recordCharacterSnapshot } from "./lib/recordCharacterSnapshot";

console.info("Character snapshot background task starting.");

(async () => {
  return recordCharacterSnapshot({ layla });
})();
```

このエントリーには専用のViteビルドを用意します。

```ts
// vite.task.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  publicDir: false,
  build: {
    target: "es2020",
    outDir: "dist",
    emptyOutDir: false,
    copyPublicDir: false,
    minify: false,
    lib: {
      entry: "src/task-entry.js",
      formats: ["es"],
      fileName: () => "task.js",
    },
  },
});
```

まず通常のウェブビュービルドを実行し、その後でタスクのビルドを実行します。

```json
{
  "scripts": {
    "build": "vite build && vite build --config vite.task.config.ts",
    "build:task": "vite build --config vite.task.config.ts"
  }
}
```

`emptyOutDir: false`により、最初のビルドで作られた`index.html`、`app.json`、各種アセットが保持されます。2回目のビルドはその横に`dist/task.js`を追加します。

`@layla-network/sdk`の実行時インポートは、タスクの依存グラフに入れないでください。型のみのインポートは問題ありませんが、生成されるタスクは別のSDKクライアントを同梱するのではなく、注入されたクライアントを使うべきです。規模の大きなアプリでは、DOM更新、Reactの状態、ブラウザーストレージ、ストリーミングUIといったウェブビュー専用のコードを共有ワークフローの外に置いてください。

Dreamはこの分離をより大きな規模で適用しています。ソース側のタスクはヘッドレスなデータ読み込みとオーケストレーションを担当し、共有モジュールがキャラクターのメッセージを選んでスケジュールするワークフローを持ちます。本番の`task.js`はこれらのソースから生成されるため、共有ワークフローの修正は表示される操作とバックグラウンドタスクの両方に反映されます。

## 生成された成果物を検証する

`src/task-entry.js`だけでなく、Laylaが実際に実行するファイルをテストしてください。

ビルド後、`dist/task.js`について次の点を確認します。

- `app.json`や`index.html`と並んでパッケージのルートにあること。
- `import`、`export`、`require(...)`の文が含まれていないこと。
- 実行時に`@layla-network/sdk`をバンドルも参照もしていないこと。
- Promiseを返すasync IIFEが完了式として末尾にあること。
- ブラウザーAPI、タイマー、`fetch`を呼び出していないこと。
- 成功するすべての経路でJSONにシリアライズ可能な値を返すこと。

複雑なタスクでは、偽のグローバル`layla`オブジェクトで`dist/task.js`を評価する小さなテストハーネスを用意してください。Dreamミニアプリはこの方法で生成成果物を動かし、SDKへのリクエストを記録し、アイドル時とスケジュール成功時の両方の経路を検証しています。バンドルをテストすると、残ったインポートや、最終値がワークフローのPromiseになっていないタスクエントリーなど、ソースレベルの単体テストでは見逃す問題を検出できます。

## よくある質問

### `task.js`はミニアプリのウェブビュー内で実行されますか？

いいえ。新しく隔離されたQuickJSランタイムで実行されます。ページやReactの状態、DOMにはアクセスできませんが、プリロードされたLayla SDKは使えます。

### `task.js`で`LaylaSDK`をインポートすべきですか？

いいえ。注入されたグローバルの`layla`インスタンスを使ってください。共有のTypeScriptモジュールでは、コンパイル時に削除されるため型のみのSDKインポートは問題ありません。

### タスクとインターフェースの間でデータを共有するには？

ミニアプリの非公開SDKストレージを使ってください。構造化された状態には`layla.db.executeSql(...)`が適しており、ドキュメント的な設定や生成ファイルにはSDKの非公開ファイルユーティリティが向いています。どちらの実行も同じミニアプリに紐づいています。

### タスクは`setTimeout`で後まで待てますか？

いいえ。タイマーは利用できず、バックグラウンドタスクは1回の処理で終えるべきです。現在の処理が完了したら戻ってください。将来のキャラクターメッセージについては、タスクを生かし続けるのではなく`layla.chat.scheduleChatMessage(...)`を使ってください。

### バックグラウンドタスクは何を返すべきですか？

`{ status: "ok", processed: 4 }`のような、小さくJSONにシリアライズできる要約を返してください。診断の詳細にはコンソールメッセージを使います。実行が本当に失敗した場合はエラーを投げ、タスクマネージャーが失敗として報告できるようにしてください。

## 短命でヘッドレスなランタイムを前提に設計する

有効な考え方は「ミニアプリの隠れたコピー」ではなく、「Layla SDKがすでに接続された、バックグラウンドでの1回の処理」です。エントリーは小さく保ち、再利用する処理は依存を受け取る関数に切り出し、インターフェースが必要とするものは永続化し、生成された`task.js`は明確な結果を返して終了させましょう。

この構造なら、バックグラウンド成果物はLaylaの隔離ランタイムと互換性を保ちつつ、規模の大きなミニアプリでも中核ワークフローの実装を1つに保てます。
