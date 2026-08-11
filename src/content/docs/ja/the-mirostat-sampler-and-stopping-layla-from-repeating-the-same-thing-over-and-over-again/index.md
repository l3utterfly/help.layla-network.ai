---
title: Mirostatサンプラーで応答の繰り返しを減らす方法
description: LaylaでMirostatサンプラーを有効にし、適応型パープレキシティ制御で繰り返しを減らす仕組みを説明します。
category: Models & performance
order: 70
keywords:
  - Mirostatサンプラー
  - 応答の繰り返し
  - パープレキシティ
  - テキスト生成
  - Laylaの詳細設定
lastUpdated: 2024-01-12
translationKey: the-mirostat-sampler-and-stopping-layla-from-repeating-the-same-thing-over-and-over-again
ai_translated: true
---

Laylaのメッセージが毎回同じ終わり方をする場合は、Mirostatサンプラーを有効にすると改善できることがあります。

1. *設定*ページを開きます。
2. *詳細設定*をタップします。
3. 下にスクロールし、*MiroStat Sampler*を有効にします。

![LaylaでMirostatサンプラーを有効にする手順。](./enable-mirostat.png)

**Mirostatサンプラーとは？**

Mirostatサンプラーは言語モデル向けのニューラルテキスト復号アルゴリズムで、テキスト生成中のパープレキシティを直接制御することに重点を置いています。パープレキシティは、シーケンス内の次のトークンを予測するときの不確実性を測る指標です。一般に、値が低いほど予測しやすいテキストを示します。

Mirostatは、一貫性と多様性のバランスを取りながら、生成テキストの品質を目標範囲内に維持するよう設計されています。これにより、テキスト生成における一般的な2つの問題、過度な繰り返しによる「退屈の罠」と、一貫性を失う「混乱の罠」を回避しやすくなります。目標パープレキシティを設定し、フィードバックに基づく適応型の手法を使用することで、場当たり的なパラメーター調整をせずに、所定のパープレキシティで任意の長さのテキストを生成できます。

人間の評価者を使った実験では、文単位の繰り返しが減り、流暢さ、一貫性、全体的なテキスト品質が向上しました。パープレキシティの制御は、繰り返しの量など、生成テキストの重要な特性に影響します。

Mirostatは、top-k、top-p（nucleus sampling）、temperature samplingなどの従来のサンプリング手法を発展させたものです。従来の手法は慎重な調整が必要なことが多く、それでも不快な繰り返しや一貫性のない出力が発生する場合があります。Mirostatはより制御された手法により、言語モデルの出力を安定させます。

詳しくは、論文[Mirostat: A Neural Text Decoding Algorithm that Directly Controls Perplexity](https://ar5iv.labs.arxiv.org/html/2007.14966)をご覧ください。
