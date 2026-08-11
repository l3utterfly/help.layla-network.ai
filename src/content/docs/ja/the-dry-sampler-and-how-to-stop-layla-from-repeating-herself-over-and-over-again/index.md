---
title: DRYサンプラーでLaylaの繰り返しを抑える方法
description: 詳細設定でDRYサンプラーを有効にして、Laylaの応答で同じフレーズが繰り返されるのを抑えます。
category: Models & performance
order: 60
keywords:
  - DRYサンプラー
  - 繰り返しペナルティ
  - Laylaの詳細設定
  - 応答の繰り返し
  - 量子化LLM
lastUpdated: 2024-04-26
translationKey: the-dry-sampler-and-how-to-stop-layla-from-repeating-herself-over-and-over-again
ai_translated: true
---

![DRYサンプラーの推奨デフォルト値。](./dry-sampler-defaults.jpeg)

同じ内容の繰り返しは、この世代のLLM、特にスマートフォン上で動作するモデルでよく見られる問題です。原因の一つは、各ニューロンの精度を下げて圧縮する量子化が行われていることです。

キャラクターが同じフレーズを何度も繰り返す場合があります。この問題を軽減するには、*詳細設定*を開き、DRY multiplierを有効にします。上の画像に示した値は、適切なデフォルト設定です。キャラクターに最適な結果が得られるよう、必要に応じて調整してください。

この現象が起こる理由とDRYの仕組みについて詳しくは、[text-generation-webuiのDRYサンプラーに関する議論](https://github.com/oobabooga/text-generation-webui/pull/5677#issue-2177692564)をご覧ください。
