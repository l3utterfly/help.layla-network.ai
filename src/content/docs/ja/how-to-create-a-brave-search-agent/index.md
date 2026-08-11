---
title: Brave Search Agentを作成する方法
description: Brave Search APIを検索し、JSON応答を解析して結果をLLMに渡すLayla Agentを作成します。
category: Agents & tools
order: 50
keywords:
  - Brave Search API
  - Layla Agent
  - HTTP Request
  - Evalツール
  - ウェブ検索Agent
lastUpdated: 2025-10-24
translationKey: how-to-create-a-brave-search-agent
ai_translated: true
---

Braveは、Googleよりもプライバシーを重視した検索サービスです。

BraveはAPIも提供しています。[Brave Search API](https://brave.com/search/api/)

LaylaでDuckDuckGoの代わりにBrave Searchを使用する場合は、独自のAPIキーを使ったBrave Search Agentを作成し、DuckDuckGo Agentを置き換えます。

_これは上級者向けのチュートリアルです。HTTPリクエストから結果を取得して解析する複数の方法を学び、今後作成するAgentにも活用できます。_

**APIキーを登録する**

[Brave](https://brave.com/)に登録し、サイトの手順に従ってAPIキーを取得します。以降は、APIキーを取得して保存済みであることを前提とします。

[Brave Search APIのドキュメント](https://api-dashboard.search.brave.com/app/documentation/web-search/get-started)を確認してください。これを使ってAgentを作成します。

**LaylaでDuckDuckGo Agentを複製する**

最も簡単な方法は、LaylaのDuckDuckGo Agentを複製することです。必要な設定の大部分がすでに用意されています。

![DuckDuckGoのウェブ検索Agentとニュース検索Agentが表示されたLaylaのAgent画面。](./duplicate-duckduckgo-agent.jpg)

Agentを複製したら、トリガーを残してすべてのツールを削除します。新しいAgentもウェブ検索クエリで起動させるため、DuckDuckGo Agentの既存トリガーを利用します。

次の順序で4つのツールを追加します。

1. Eval
2. HTTP Request
3. Eval
4. Provide Context

各ツールの機能と接続方法を説明します。

**Eval (1)**

![入力をURIコンポーネントとしてエンコードするよう設定されたLaylaのEvalツール。](./eval-encode-input.jpg)

APIに送るため、入力をURIコンポーネントとしてエンコードします。使用するJavaScript関数は次のとおりです。

```js
encodeURIComponent;
```

ツールへの入力がEvalで処理され、その結果が出力になります。`{{input}}`は入力メッセージの生のテキストを表します。

**HTTP Request (2)**

2番目のHTTP RequestツールでBrave Search APIを呼び出します。[Brave Search APIのドキュメント](https://api-dashboard.search.brave.com/app/documentation/web-search/get-started)を参照してください。

![Brave Search API向けに設定されたLaylaのHTTP Requestツール。](./brave-http-request.jpg)

URLとヘッダーを確認してください。`X-Subscription-Token`ヘッダーにはAPIキーが含まれます。

URLのクエリ文字列にある`{{input}}`がAPIへ送信されます。

**Eval (3)**

これは、ここまでで最も複雑なツール呼び出しです。

前のHTTP Requestツールの出力を受け取ります。Brave APIのドキュメントによると、出力はJSON形式です。JSONを解析し、LLMに送信できるプレーンテキストへ変換します。

![Brave Searchの結果を解析するJavaScriptが入力されたLaylaのEvalツール。](./eval-parse-results.jpg)

このツールは`{{input}}`を生の文字列として受け取り、`i`変数に代入します。`JSON.parse`を呼び出し、結果を標準的な箇条書きへ変換してツールの出力にします。

すべて通常のJavaScriptであり、プログラミング経験があれば理解できます。

**Provide Context (4)**

最後に、出力をLLMへコンテキストとして渡します。

![Brave Searchの結果用の指示が設定されたLaylaのProvide Contextツール。](./provide-context.jpg)

このツールは、結果がBrave APIから取得されたことを説明し、キャラクターにその内容を伝えるよう指示します。

4つのツールを設定するとAgentは完成です。

2つのAgentが競合しないよう、元のDuckDuckGo Agentは無効にすることを推奨します。

直接インポートできるAgent JSONはこちらです。

[brave-search.jsonをダウンロード](/assets/articles/how-to-create-a-brave-search-agent/brave-search.json)
