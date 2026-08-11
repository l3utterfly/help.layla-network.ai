---
title: ロールプレイAgentを作成する方法
description: キャラクターにアクションと台詞の形式で応答させるLayla Agentを作成します。
category: Agents & tools
order: 70
keywords:
  - Layla Agent
  - ロールプレイAgent
  - 構造化出力
  - BNF文法
  - アクションと台詞
lastUpdated: 2025-10-01
translationKey: how-to-create-a-roleplay-agent
ai_translated: true
---

Laylaで簡単な*ロールプレイAgent*を作成してみましょう。

このAgentは、キャラクターの応答を**アクションと台詞**の形式に固定します。

例：

> `*手を振ってほほ笑む* こんにちは！`

次の設定でAgentを作成します。

![ロールプレイAgentの名前、説明、正規表現トリガーの設定。](./roleplay-agent-settings.jpg)

![ロールプレイAgentの構造化出力ツールとBNF文法。](./roleplay-structured-output.jpg)

このAgentの動作を確認しましょう。

1. 名前と説明は自由に設定できます。Agentを簡単に識別するための項目です。

2. *正規表現トリガー*を使用します。正規表現の`.`（ドット）は任意の内容に一致するため、すべてのメッセージでAgentが起動します。すべての出力を指定した形式にするため、これが目的どおりの動作です。

3. *構造化出力*ツールを使用します。このツールはBNF文法で出力を構成します。

   - `root`は常に必要で、文法定義の開始点です。
   - `::=`は、変数に文法を割り当てる代入演算子です。
   - `turn`は独自に定義した変数で、その定義は次の行にあります。リテラル文字`*`、ユーザー定義変数`fragment`、もう一つの`*`、さらに別のfragmentで構成されます。
   - `fragment`はアクションまたは台詞です。改行以外の任意の内容として定義されます。

4. これらを組み合わせると、出力は`*fragment*fragment`と定義されます。各`fragment`は改行以外の任意のテキストです。これで目的の形式になります。

ダウンロードしてインポートできるAgentファイルを用意しました。*新しいAgentを追加*ボタンを使用してインポートできます。

[roleplay-action-dialogue.jsonをダウンロード](/assets/articles/how-to-create-a-roleplay-agent/roleplay-action-dialogue.json)
