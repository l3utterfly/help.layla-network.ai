---
title: LaylaでPythonを使ったDuckDuckGoニュース検索Agentを作成する方法
description: PythonでDuckDuckGo Newsを検索し、結果をLLMに返すLayla Agentを作成します。
category: Agents & tools
order: 60
keywords:
  - DuckDuckGoニュース検索
  - Layla Agent
  - Python Agent
  - Pythonを実行
  - Tool Calling
lastUpdated: 2026-04-02
translationKey: how-to-create-a-duckduckgo-news-search-agent-with-python-in-layla
ai_translated: true
---

この記事では、LaylaのAgentミニアプリを使用し、Pythonで動作するDuckDuckGoニュース検索Agentを作成します。[LaylaでPythonを有効にして](/how-to-enable-python-support-in-layla/)おいてください。

**手順1：既存のAgentを複製する**

最も簡単な方法は、既存のAgentを複製してコピーを編集することです。名前と説明を変更します。

![コピーにDuckDuckGo News Search (Python)という名前を付けたLaylaのAgent編集画面。](./agent-name-description.jpg)

**手順2：トリガーを追加する**

このAgentに複数のトリガーを追加します。

![利用可能なトリガーの種類が表示されたLaylaのAgent編集画面。](./agent-trigger-options.jpg)

**News Search**インテントと、固定の**news**フレーズを追加します。Agentの呼び出し方に合わせ、独自のトリガーを追加することもできます。

![News Queryインテントを設定したAgentトリガー。](./news-query-intent.jpg)

![Newsという単語を設定したAgentのフレーズトリガー。](./news-phrase-trigger.jpg)

**手順3：Pythonツールを追加する**

次にPython実行ツールを追加します。このセクションには、DuckDuckGoへ問い合わせるロジックを実行するPythonコードが含まれます。この部分を理解するには、Pythonの知識があると役立ちます。

[GitHub GistのPythonコード](https://gist.github.com/l3utterfly/bf9f703c09932fd87dbf68f2118e5ab4)を確認してください。

ファイルの先頭では、*requests*ライブラリが必要です（`re`と`html`はPythonに含まれます）。

![requests、re、htmlのPythonインポート。](./python-imports.png)

Pythonミニアプリを開き、`requests`パッケージを追加します。インストール手順は[LaylaでPython対応を有効にする方法](/how-to-enable-python-support-in-layla/)をご覧ください。

次は`QUERY`です。

![Layla入力テンプレートをQUERYに代入し、LIMITを5に設定するPythonコード。](./python-query-input.png)

Laylaは、メッセージまたは前のツールの出力を特殊なテンプレート`{{input}}`に挿入します。これは単純なテキスト置換で、入力はそれ以上変更されません。

このパターンを使うと、Pythonスクリプトでさまざまな種類の入力を受け取れます。

このAgentでは、ユーザーのクエリ全体をPythonスクリプトに渡します。

スクリプトは標準的なHTTPリクエストを行い、組み込みのHTMLパーサーで応答を解析します。

PythonスクリプトからLLMへ情報を渡すには、単純な`print`文を使用します。

![各ニュース結果のタイトル、情報源、概要、URLを出力するPythonループ。](./python-print-results.png)

この方法は柔軟です。結果、指示、またはその両方など、LLMに受け取らせる内容を出力できます。

Pythonスクリプト全体をコピーし、Pythonツールの入力欄に貼り付けます。

![DuckDuckGo Pythonスクリプトが入力されたLaylaのAgent編集画面。](./agent-python-tool.jpg)

これでAgentは完成です。

**最後に：Agentをテストする**

Agentをテストします。デフォルトキャラクターのLaylaで有効にするか、既存のキャラクターに関連付けてください。

![newsフレーズによってPythonコードの実行が開始されたLaylaのチャット。](./news-agent-triggered.jpg)

キーワード**news**が検出されると、AgentがPythonコードの実行を開始します。このトリガーは最初の手順で設定しました。

![DuckDuckGo Newsの5件の結果に基づく応答を表示したLaylaのチャット。](./news-agent-response.jpg)

LaylaはPythonコードの出力を読み取り、質問に回答するためのコンテキストとして使用します。

これで簡単なDuckDuckGoニュース検索Agentは完成です。今後の記事では、より複雑なAgentを作成します。
