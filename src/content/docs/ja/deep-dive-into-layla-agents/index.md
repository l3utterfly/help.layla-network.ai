---
title: Layla Agentsの詳しい仕組み
description: LaylaでAgentsが動作する仕組みを詳しく説明します。
category: Agents & tools
order: 30
keywords:
  - Layla Agents
  - Agentトリガー
  - Agentツール
  - ツール呼び出し
  - LLMパラメーター
lastUpdated: 2025-10-01
translationKey: deep-dive-into-layla-agents
ai_translated: true
---

_まだ読んでいない場合は、まず[LaylaでAgentsが動作する仕組みの概要](/how-to-enable-agents-functions-and-tool-calling-in-layla/)をご覧ください。_

この記事では、LaylaのAgent機能をさらに詳しく説明します。

**Agentの内部構造**

Agentsは、LLMとのチャット中に必要に応じて実行される独立したワークフローです。各Agentには、設定可能な特定の条件で起動する _トリガー_ と、順番に実行されるツールの一覧があります。

![チャット入力がAgent内のツールを起動し、Agentの結果につながる流れを示した図。](./agent-workflow.jpg)

Agentの結果はコンテキストとして会話に追加され、LLMがそれを使って文脈に沿った応答を返します。

**トリガー**

Laylaには多くのトリガーがあります。次の画像はその一部です。

![Intent、Regex、Phrase、Date or Time、MCP Tool、Layla Tool、Voice Modeトリガーを表示したLaylaの画面。](./trigger-types.jpg)

- **Intent** — Laylaが入力の意図を分類し、検出した意図に応じてAgentを起動します。分類器には「search news」「query weather」「set alarm」「set calendar」など多数の意図が組み込まれています。_Intent Trigger_を追加すると、ドロップダウンに完全な一覧が表示されます。
- **Regex** — 入力した正規表現がチャットメッセージ内で一致するとAgentが起動します。一致した文字列が最初のツールへの入力になります。
- **Phrase** — 入力した語句が大文字と小文字を区別せずメッセージ内で検出されると起動します。一致した語句が最初のツールへの入力になります。
- **Date/Time Detected** — メッセージ内で日付または時刻が検出されると起動します。検出した値が最初のツールへの入力になります。
- **MCP/Layla Tool Trigger** — この高度な機能は、[Laylaの完全なMCP対応](/full-mcp-support-in-layla/)の記事で説明しています。
- **Is Voice Mode** — Voice Modeがオンのときに起動する単純なトリガーです。

これらのトリガーは、チャット内の入出力メッセージごとに実行されます。トリガーが起動するとAgentが開始され、トリガー条件が最初のツールへの入力になります。

**ツール**

_ツール_ はLayla Agentsの中心です。

外部サービスの呼び出し、スマートフォンの操作など、さまざまな機能を実行します。Laylaには多数の組み込みツールがあり、新しいツールも継続的に追加されています。

すべてをこの記事で扱うことはできないため、よく使うものをいくつか紹介します。

_Agents_ ミニアプリを下へスクロールすると、Laylaで利用できるツールの一覧があります。ツールをタップすると詳しい情報のポップアップが開きます。_HTTP Request_ を例にします。

![URL、method、headersパラメーターを示すHTTP Requestツールの情報。](./http-request-tool.jpg)

_HTTP Request_ には設定可能なパラメーターが複数あります。このAgentが呼び出す特定のURLなどを固定値として指定することも、後述のようにLLMに生成させることもできます。

ツールを追加すると、Edit Agentポップアップでパラメーターを設定できます。前の記事で示したように、URLを入力欄へ直接指定できます。

![Meow Facts APIへのHTTP Requestを設定するEdit Agent画面。](./http-request-config.jpg)

各ツールの出力は次のツールの入力として使われます。この方法で、1つのAgent内に複数のツールを連結できます。例では、_HTTP Request_ の出力は設定済みパラメーターでURLを呼び出したときに返される生の文字列です。

_Provide Context_ は、Agentの最終出力をLLMのコンテキストに入れる重要なツールです。Agentの実行後、根拠となる結果をLLMに提供します。

**Agentをテストする**

Agentを作成した後は、Agents一覧の _Test Agent_ ボタンでテストできます。各手順の入力と出力も確認できるため、仕組みを理解しやすくなります。

「What's My IP?」Agentを例にします。

![What's My IP Agentの手順と結果を示すTest Agentダイアログ。](./test-ip-agent.jpg)

最初に [https://api.ipify.org](https://api.ipify.org) へHTTPリクエストを送信します。

HTTP Requestの出力として、IPアドレスがプレーンテキストで表示されます。

その出力が _Provide Context_ に渡され、LLM向けのコンテキストメッセージとして整形されます。

このメッセージはツール自体で設定できます。この例では次の通りです。

![IPアドレス用のuserテンプレートとinputテンプレートを使うProvide Contextの設定。](./provide-context-templates.jpg)

`{{input}}` のような二重波括弧のテンプレートに注目してください。`{{input}}` は、このツールへの入力に置き換えられます。

この例ではHTTPリクエストの出力が _Provide Context_ の入力になるため、置換後の出力は `{{user}}'s current IP address is xx.xx.xx.xx` です。

会話に挿入されると、`{{user}}` は選択中のペルソナにさらに置き換えられます。カスタムプロンプトと同じ仕組みです。

**LLMが生成するパラメーター**

ここまで、各ツールのパラメーターは常に固定値として設定しており、一致した入力をパラメーターに使う程度でした。

LLM統合型Agentでは、***ツールへの入力をLLMに生成させる***ことができます。自然言語能力を活用しながら柔軟性を得られます。

一般的な例は、LLMにWeb検索を依頼する場合です。メッセージ全体をそのまま検索キーワードにはしたくありません。LLMがメッセージと会話の文脈を読み取り、適切な検索語を作成できます。

別の例はメールの下書きです。「draft an email to my co-worker reminding him of our meeting」と伝えた場合、LLMが本文を生成し、その内容を入力済みの状態でメールアプリを開くことが望まれます。

Laylaでは次のように実現できます。

![subjectとmessageフィールドを持つSend Emailツールを表示したEdit Agent画面。](./send-email-llm-tool.jpg)

「Send Email」Agentを例にします。「Send Email」ツールには「Subject」と「Message」の2つのパラメーターがあり、**LLM tool call** が **ON** になっています。

これは、パラメーターの内容を生成するようLLMに指示します。Agentが起動すると、LLMが件名と本文を生成してツールを実行し、必要な情報が入力されたメールクライアントを開きます。

**LLM tool call** が **ON** の場合、パラメーター欄に自然言語の指示を入力できます。LLMは各フィールドの用途を理解し、会話コンテキストから適切な入力を生成します。

より複雑な例は _Schedule Event_ Agentです。多数のパラメーターがあり、それぞれがLLMに詳しく説明されています。
