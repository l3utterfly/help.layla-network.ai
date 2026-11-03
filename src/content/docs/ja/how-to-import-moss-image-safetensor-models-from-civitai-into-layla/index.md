---
title: CivitaiのMOSS Image safetensorsモデルとLoRAをLaylaにインポートする方法
description: CivitaiからMOSS ImageのsafetensorsチェックポイントとLoRAを取得し、Laylaにインポートしてスマートフォンでオフライン画像生成する手順を説明します。
category: Image generation
order: 22
keywords:
  - MOSS Image
  - オフライン画像生成
  - Android AI画像生成
  - Stable Diffusion
  - Civitaiモデル
  - safetensorsインポート
  - GGUF画像モデル
  - LoRA
  - Snapdragon NPU
  - Local Dream
  - NPU Forge
  - テキスト画像生成
  - 画像間生成
  - キャラクター画像
  - iPhone Stable Diffusion
  - Layla
lastUpdated: 2026-11-04
translationKey: how-to-import-moss-image-safetensor-models-from-civitai-into-layla
ai_translated: true
---

**LaylaはCivitaiのMOSS Image safetensorsチェックポイントとLoRAをインポートし、Androidでオフライン画像生成できます。** Stable Diffusionより新しいモデルで、[Civitai](https://civitai.com/)には既にコミュニティの追加学習モデルやLoRAがあります。取得後の変換と生成は端末内で行います。

対応チェックポイントの検索、正しいファイルの取得、インポート、LoRA追加を説明します。他系統のガイド：[SD 1.5](/ja/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/), [SDXL](/ja/how-to-import-sdxl-safetensor-models-from-civitai-into-layla/), [Qwen Image 2.1](/ja/how-to-import-qwen-image-2-1-safetensor-models-from-civitai-into-layla/), [FLUX.2 Klein](/ja/how-to-import-flux-2-klein-safetensor-models-from-civitai-into-layla/)。GGUF、zip、Web UIについては[Laylaにカスタム画像生成モデルをインポートする方法](/ja/how-to-import-custom-image-generation-models-into-layla/)をご覧ください。

## MOSS Imageとは？

MOSS-ImageはOpenMOSSチームが2026年10月に公開した、50億パラメーターの重み公開型テキスト画像拡散Transformerです。**Base**は追加学習・LoRA訓練向け、**SFT**は通常生成向けです。Civitaiには両者を基にしたモデルがあります。

Civitaiの**Base model**は**MOSS Image**、Laylaでは**MOSS**です。MOSS ImageのLoRAには同系統のチェックポイントが必要です。

## 必要なもの

- Snapdragon 8 Elite（SM8750）以降のAndroid端末。MOSS ImageのインポートはSnapdragon NPUを使い、iPhoneには対応しません。インポート時にチップを確認しないため、大きなファイルの変換前に自分で確認してください。

- **Local Dream**ミニアプリ。インストールは[Laylaのミニアプリを有効化・無効化する方法](/ja/how-to-enable-disable-mini-apps-within-layla/)をご覧ください。

- Local Dreamに取得済みの内蔵モデル：**MOSS-Image Turbo** / **MOSS-Image Base**。トークナイザー、テキストエンコーダー、VAEを再利用します。不足するとSafetensorに警告が表示され、インポートできません。

- 十分な空き容量。MOSSのfp16チェックポイントは約10 GBです。

## 取得するsafetensorsファイル

**Laylaはf16（半精度）safetensorsに対応します。** Civitaiの表記は**fp16 SafeTensor**です。MOSS Imageはbf16もインポートできます。量子化された**fp8**、**int8**、**int4**、**nvfp4**には対応しません。

MOSSにはint8かbf16のみの配布も多く、**Best match**が量子化ファイルを指すことがあります。種類一覧を開き、取得前にラベルを確認してください。

## CivitaiのMOSS Imageチェックポイントを追加する

### 手順1：CivitaiのModelsを開く

![Modelsタブを強調したCivitaiトップページ。](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/civitai-open-models-page.jpg)

[civitai.com](https://civitai.com/)を開き、上部の**Models**を選びます。画像はPCブラウザーのため、スマートフォンでは配置が少し異なる場合があります。

### 手順2：Checkpoint、SafeTensor、MOSS Imageで絞り込む

![Checkpoint、SafeTensor、MOSS Imageを選択したCivitaiフィルター。](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/civitai-moss-image-checkpoint-filters.jpg)

右上の**Filters**を開きます。

1. **Model types**：**Checkpoint**。
2. **File format**：**SafeTensor**。
3. **Base model**：**MOSS Image**を検索して選択。

対応形式のMOSS Imageチェックポイントが表示されます。[絞り込み済み一覧を開く](https://civitai.com/models?types=Checkpoint&fileFormats=SafeTensor&baseModels=MOSS%20Image&sort=Most%20Downloaded)。

### 手順3：fp16 safetensorsを取得する

![fp16 SafeTensor、9.47 GB、Downloadを表示したCivitaiモデルページ。](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/civitai-moss-image-checkpoint-download-fp16.jpg)

モデルを開き、右の**Download**欄を確認します。**fp16 SafeTensor**（例：9.47 GB）を選び、**Download**で端末に保存します。複数あればfp16を選んでください。bf16対応の例外は上記の説明を参照してください。

必要なのはチェックポイントだけです。Civitaiの**Required Components**にあるテキストエンコーダーやVAEは他のツール向けです。LaylaはLocal Dreamの取得済みベースモデルの補助ファイルを使います。

### 手順4：Laylaにインポートする

**Settings** → **Inference Settings** → **Image Generation** → **Add Custom Model**、または**Local Dream** → **Add Model**を開きます。

![Inference SettingsのImage GenerationにあるAdd Custom Model。](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/image-generation-settings.jpg)

**Safetensor**の**Base Model**で**MOSS**を選びます。

![SD1.5、SDXL、MOSS、Qwen Image 2.1、Flux 2 KleinのBase Model一覧。](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/image-model-base-model-list-layla.jpg)

**MODEL CHECKPOINT**でファイルを選び、**MODEL NAME**を確認して**Import & Convert**をタップします。Q4_0 GGUF拡散モデルに変換します。数分かかる場合があるので開いたままにしてください。完了すると保存・自動選択されます。

Laylaはファイルの系統を確認しません。別系統のチェックポイントに**MOSS**を指定すると、インポートや生成が失敗することがあります。

### 手順5：画像を生成する

**Local Dream**でモデルを確認し、プロンプトを入力します。初期値は20ステップ・CFG 5で変更可能です。Turboなど少ないステップ用のモデルは、通常もっと低い値が必要です。

## CivitaiのMOSS Image LoRAを追加する

LoRAはスタイルや人物、物体、概念を追加する小型ファイルです。チェックポイントと同様に検索し、モデルの種類だけを変えます。

### 手順1：LoRAとMOSS Imageで絞り込む

![LoRAとMOSS Imageを選択したCivitaiフィルター。](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/civitai-moss-image-lora-filters.jpg)

**Models** → **Filters**で**Model types**を**LoRA**、**Base model**を**MOSS Image**にします。[絞り込み済み一覧を開く](https://civitai.com/models?types=LORA&fileFormats=SafeTensor&baseModels=MOSS%20Image&sort=Most%20Downloaded)。チェックポイントと同じフィルター画面です。

### 手順2：LoRA safetensorsを取得する

![MOSS Image LoRAのページ。61.54 MBのSafeTensorとダウンロード。](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/civitai-moss-image-lora-download-fp16.jpg)

ベースごとに種類がある場合、MOSS Image用（例：**v1.0 Moss**）を選びます。**fp16 SafeTensor**（例：61.54 MB）を確認し、**Download**します。

### 手順3：インポート時にLoRAを追加する

**Safetensor**で**Base Model**を**MOSS**にしてチェックポイントを選びます。**LORA FILES (OPTIONAL)** → **Add LoRA**でファイルと強さを指定します。初期値は1.0で複数追加できます。準備ができたら**Import & Convert**を押します。

MOSS ImageはLoRAをモデルフォルダーにコピーし、生成時に適用します。追加後はLocal Dreamでモデルを選び、**Model setup**からファイル、サンプラー、LoRAを確認・編集できます。

### チェックポイントなしでLoRAを使う

MOSS Imageの**Safetensor**では**LoRA only**を選べます。取得済みのベースモデルとLoRAだけで新モデルを作り、大きなチェックポイントの変換時間・容量を節約します。

## よくある質問

### スマートフォンでMOSS Imageを使えますか？

上記の要件を満たせば可能です。**Base Model**に**MOSS**を選びCivitaiのチェックポイントを追加します。ベースを再利用する系統はLocal Dreamで先に取得してください。

### CivitaiでどのMOSS Imageファイルを取得しますか？

**fp16 SafeTensor**またはbf16です。Civitaiの既定表示でもfp8、int8、int4、nvfp4は避けてください。

### MOSS Imageが大きい理由は？

fp16は50億パラメーターの全重みを半精度で保存するため約10 GBになります。量子化版は小さいもののインポート非対応です。

### MOSS BaseとSFTの違いは？

Baseは追加学習・LoRA訓練用、SFTは通常生成用です。どちらもLaylaでは**MOSS**を選びます。

### iPhoneでMOSS Imageをインポートできますか？

いいえ。iOSがインポートできるsafetensorsはSD 1.5だけです。冒頭のSD 1.5ガイドをご覧ください。

### Civitaiからのインポートに接続は必要ですか？

ファイル取得時だけです。変換と生成は端末内で行います。

### 追加モデルを削除するには？

**Local Dream**でモデルを選び**Delete Model**を押すと容量を解放できます。

## スマートフォンでオフラインのMOSS Image

インポート後、MOSS Imageは接続・アカウント・サブスクリプション不要で端末上で動きます。プロンプト、モデル、画像は端末内に残ります。
