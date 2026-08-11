---
title: GGUFとは？GGUFモデルを分かりやすく解説
description: GGUFモデルと量子化の意味、量子化の選び方、LaylaにカスタムGGUFモデルを読み込む方法を説明します。
category: Models & performance
order: 30
keywords:
  - GGUFモデル
  - モデル量子化
  - 量子化
  - カスタムLLM
  - Hugging Face
lastUpdated: 2024-08-21
translationKey: what-are-gguf-models-what-are-model-quants
ai_translated: true
---

Hugging FaceでローカルAIモデルを探したことがあれば、`.gguf` で終わるファイルをたくさん見たはずです。GGUFモデルとは何か、そしてLaylaを含むほぼすべてのオフラインAIアプリがこの形式を使うのはなぜでしょうか。

このガイドでは、GGUFの意味と仕組みを説明し、任意のカスタムGGUFモデルをLaylaに読み込む手順を紹介します。無検閲、ロールプレイ向け、専門分野向けなどのAIモデルを、インターネット、サブスクリプション、クラウドサービスなしでAndroidスマートフォン上に直接実行できます。

## GGUFとは？

**GGUFは、ノートPC、デスクトップPC、スマートフォンなどの一般向けハードウェアで大規模言語モデルを実行するためのファイル形式です。** 1つの `.gguf` ファイルに、モデルの重み、トークナイザー、プロンプトテンプレート、メタデータなど実行に必要なすべてが格納され、GGUF対応の推論エンジンで読み込める携帯可能なバイナリになります。

GGUFは、Laylaにも使われているオープンソース推論エンジン [llama.cpp](https://github.com/ggerganov/llama.cpp) プロジェクトによって2023年8月に導入されました。それ以前はGGMLという古い形式が使われ、新しいモデルアーキテクチャを追加するたびにコード変更が必要でした。GGUFは構造化メタデータでそれを置き換え、ローカル実行LLMを配布する事実上の標準になりました。

Ollama、LM Studio、GPT4All、Jan、koboldcpp、Laylaを使ったことがあれば、意識せずにGGUFを利用しています。

## GGUFは何の略？

GGUFは **GGML Universal File** の略です。GGMLは基盤となるテンソルライブラリの名前で、開発者Georgi Gerganovにちなんでいます。オンラインでは「GPT-Generated Unified Format」という説明も見かけますが、llama.cppプロジェクトでは「GGML Universal File」を使用しています。

## モバイルのオフラインAIでGGUFが重要な理由

GGUFの重要な機能は**量子化**です。モデルの重みを16ビットまたは32ビットの数値から8、4、さらには2ビットへ縮小する技術です。モデルの能力を失わずにファイルを大幅に小さくし、70億または80億パラメーターのモデルをスマートフォンで動かせるようにします。

GGUFを使うと、次のことができます。

- インターネット接続なしで、高性能なAIアシスタントを完全に**オフライン**で実行する。
- データが端末外へ出ないため、会話を**非公開**に保つ。
- サブスクリプションと利用回数制限を避ける。
- 特定の文体向けに調整されたモデルやコンテンツフィルターを削除したモデルを含む、**任意のコミュニティモデル**を選ぶ。

## LaylaのカスタムGGUFモデルでできること

Laylaが初回起動時にダウンロードする構築済みモデルは、汎用アシスタントとして利用できます。さらに、Laylaでは**好きなGGUFモデル**を読み込めます。

オープンソースコミュニティは、多くの用途に合わせて数千のGGUFモデルを微調整しています。

- 一般的なチャットボットの制約なしで応答する**無検閲またはフィルターなしのチャットモデル**
- 長く没入感のある会話向けに作られたStheno、MythoMax、Mahouなどの**ロールプレイ・創作モデル**
- プログラミング言語に特化した**コーディングモデル**
- 問題解決用の**推論・数学モデル**
- 医療、法律、言語学習などの**分野特化モデル**

Laylaで良好に動作することを確認したGGUFモデルは、[l3utterflyのHugging Faceページ](https://huggingface.co/l3utterfly)で探せます。

## LaylaにカスタムGGUFモデルを読み込む方法

人気のロールプレイモデルStheno-Mahouを例に、手順全体を説明します。

### 手順1 — Hugging Faceでモデルを選ぶ

この例では、Llama 3をロールプレイ向けに微調整した [Stheno-Mahou](https://huggingface.co/l3utterfly/llama-3-Stheno-Mahou-8B-gguf) を使います。

![Hugging FaceのStheno-MahouリポジトリにあるFiles and versionsタブ。](./files-and-versions-tab.png)

### 手順2 — Files and versionsタブを開く

Hugging Faceがダウンロード可能なすべてのモデルバリエーションをここに表示します。

![Hugging Faceリポジトリ内の量子化済みモデルファイル一覧。](./model-files.png)

### 手順3 — スマートフォンに適した量子化を選ぶ

各ファイル名にはQ2_K、Q4_K_M、Q6_K、Q8_0などのQ番号があります。これは、モデルをどの程度圧縮したかを示す**量子化レベル**です。

基本的な規則は次の通りです。

- **Q番号が高い = ファイルが大きい = 応答品質が高い。ただし、より多くのRAMと高速なスマートフォンが必要。**
- **Q番号が低い = ファイルが小さい = 性能の低い端末でも高速。ただし、応答品質がやや低い。**

多くのスマートフォンでは **Q4_K_M** が妥当な開始点です。高速で応答性がよければ、品質向上のためQ6またはQ8を試してください。遅ければQ3またはQ2に下げます。

Q4_0_4_4、Q4_0_4_8、Q4_0_8_8という3つの特殊な量子化もあります。**i8mm**ハードウェアアクセラレーションを備える新しいARMスマートフォン向けに最適化され、対応端末ではかなり高速になる場合があります。端末が対象かどうかは、[Laylaのi8mmハードウェア対応ガイド](https://www.layla-network.ai/post/layla-supports-i8mm-hardware-for-running-llm-models)をご覧ください。

### 手順4 — ファイルをダウンロードする

選んだ量子化の横にあるダウンロード矢印をタップします。`.gguf` ファイルはスマートフォンのDownloadsフォルダー、またはブラウザーの保存先に保存されます。

![Hugging Faceリポジトリ内のGGUF量子化の横にあるダウンロードボタン。](./download-quant.png)

### 手順5 — Laylaにモデルを追加する

Laylaを開き、**Inference Settings** → **Add a custom model** → **Local file** の順に進みます。ファイル選択画面で、ダウンロードした `.gguf` ファイルを探します。

![LaylaのInference SettingsにあるLLMセクション。](./llm-settings.png)

![LaylaのAdd a Custom Model画面。](./add-custom-model.png)

![Laylaにカスタムモデルを追加するLocal fileオプション。](./choose-local-file.png)

ファイル選択画面で、ダウンロードしたモデルを選びます。

### 手順6 — 正しいプロンプト形式を設定する

この手順は忘れられがちです。モデルファミリーごとに、プロンプトを特定の形式で囲む必要があります。Llama 3、Mistral、ChatMLではそれぞれ異なります。必要な形式はモデルのHugging Faceページに記載されています。Laylaのプロンプト形式設定で選択すれば、カスタムGGUFモデルがスマートフォン上で完全にオフライン動作します。

![Laylaのカスタムモデル用プロンプト形式選択画面。](./prompt-format.png)

## GGUFについてよくある質問

### GGUFファイルとは？

`.gguf` ファイルは、AIモデルの重み、トークナイザー、構成をまとめた単一のバイナリです。llama.cppなど多くのローカルAIツールが、言語モデルの読み込みと実行に使用します。

### AIモデルでGGUFとはどういう意味？

Hugging FaceでGGUFと記載されたモデルはGGUF形式へ変換済みで、Layla、llama.cpp、Ollama、LM Studioなどを使い、GPUサーバーやクラウドAPIなしで一般向けハードウェア上にローカル実行できます。

### GGUFはsafetensorsやPyTorchより優れていますか？

目的が異なります。PyTorchとsafetensorsは、完全精度でサイズが大きくGPU向けの学習・研究形式です。GGUFは量子化され、コンパクトでCPU、スマートフォン、小規模GPU向けに最適化された**推論**形式です。モデルを_学習_するのではなく_使用_する場合、GGUFの方が適しています。

### AndroidでGGUFモデルを実行できますか？

はい。それがLaylaの機能です。LaylaはAndroid上でllama.cppを利用し、端末内のGGUFモデルを読み込んだりHugging Faceからダウンロードしたりできます。

### どのGGUF量子化をダウンロードすべきですか？

サイズ、速度、品質のバランスがよい **Q4_K_M** から始めてください。端末が対応できればQ6またはQ8へ上げ、難しければQ3またはQ2へ下げます。

### GGUFモデルはどこで探せますか？

最大のコレクションは [Hugging Face](https://huggingface.co) にあります。モデル名の後に「GGUF」を付けて検索すると、量子化版を探せます。Laylaで動作確認済みのモデルは [huggingface.co/l3utterfly](https://huggingface.co/l3utterfly) をご覧ください。
