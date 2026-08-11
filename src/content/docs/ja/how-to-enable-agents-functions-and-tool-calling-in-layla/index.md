---
title: LaylaでAgent、Function、Tool Callingを有効にする方法
description: Laylaのデバイス上で動作するAgent、Function、Tool Calling機能の概要です。
category: Agents & tools
order: 10
keywords:
  - Layla Agent
  - Tool Calling
  - Function
  - Agentミニアプリ
  - カスタムキャラクター
lastUpdated: 2025-10-01
translationKey: how-to-enable-agents-functions-and-tool-calling-in-layla
ai_translated: true
---

Layla v6はデバイス上で動作するローカル*Agent*に対応し、Laylaがツールを使用したり外部サービスと通信したりできるようにします。

この記事では、LaylaのAgentの仕組みと利用できる機能の概要を説明します。

**Agentミニアプリ**

LaylaのAgent機能を利用するには、アプリ参照画面にある**Agent**ミニアプリをインストールします。

![LaylaのAgentミニアプリの概要。](./agents-mini-app-overview.jpg)

Laylaで**Agent**ミニアプリをダウンロードしてインストールします。アプリを開くと、すぐに使用できる作成済みのAgentが多数表示されます。

![Agentミニアプリに表示された作成済みAgentの一覧。](./agents-list.jpg)

_これらのツールはすでに作成され、動作する状態です。編集する必要はありません。_ 戻ってLaylaとの新しいチャットを始めると、自動的に動作します。

![チャットでDuckDuckGo NewsとWeb Reader Agentを使用するLayla。](./duckduckgo-agent-chat.jpg)

上の画面では、*Web Reader*と*DuckDuckGo News Results* Agentが有効になり、インターネットから最新ニュースを取得しています。

LaylaのAgentは、カレンダーへの予定登録、アラームやリマインダーの作成、メールやSMSの送信など、多くのタスクを実行できます。利用可能なAgentの一覧は、Agentミニアプリで確認してください。

**Agentを有効または無効にする**

デフォルトでは、*Agentミニアプリ*で有効になっているAgentを、キャラクターのLaylaが使用できます。LaylaにAgentへのアクセスを許可しない場合は、そのアイコンの下にあるスイッチをオフにします。

カスタムキャラクターにAgentを関連付けることもできます。キャラクター作成画面の*詳細*タブを開きます。

![Agentを選択コントロールが表示されたキャラクター作成画面の詳細タブ。](./character-advanced-agents.jpg)

*Agentを選択*ボタンをタップすると、利用可能なすべてのAgentが表示されます。キャラクターに関連付けるAgentを選択します。選択したAgentだけが有効になります。

キャラクターにすべてのAgentへのアクセスを許可したくない場合もあります。Agentが多すぎるとキャラクターが混乱する可能性があります。また、ロールプレイ専用のキャラクターがセッション中に「ウェブを検索」すると、没入感が損なわれることもあります。Laylaでは、目的に合わせてAgentを自由に設定できます。

_補足：Laylaという名前はアプリ全体と、蝶のロゴで識別されるデフォルトキャラクター「Layla」の両方を指します。自分でキャラクターを作成しない場合は、このキャラクターが使用されます。_

**独自のAgentを作成する**

Laylaでは独自のツールやAgentを作成できます。ニーズに合わせてカスタマイズしたり、独自のサービスと連携したりできます。

Agentやツールの作成方法と内部の仕組みについて詳しくは、次の記事をご覧ください。

- [最初のAgentをすばやく作成する](/how-to-create-agents-in-layla/)
- [Agentの仕組みを詳しく見る](/deep-dive-into-layla-agents/)
- [LaylaのMCP対応](/full-mcp-support-in-layla/)
