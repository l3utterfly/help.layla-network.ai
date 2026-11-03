---
title: CivitaiのSD 1.5 safetensorsモデルとLoRAをLaylaにインポートする方法
description: CivitaiからSD 1.5のsafetensorsチェックポイントとLoRAを取得し、Laylaにインポートしてスマートフォンでオフライン画像生成する手順を説明します。
category: Image generation
order: 20
keywords:
  - SD 1.5
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
translationKey: how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla
ai_translated: true
---

**LaylaはCivitaiのStable Diffusion 1.5（SD 1.5）safetensorsチェックポイントとLoRAをインポートし、AndroidやiPhoneでオフライン画像生成できます。** [Civitai](https://civitai.com/)の多くのコミュニティモデルはsafetensors形式です。変換は端末内で行うので、取得後の生成に接続は不要です。

対応チェックポイントの検索、正しいファイルの取得、インポート、LoRA追加を説明します。他系統のガイド：[SDXL](/ja/how-to-import-sdxl-safetensor-models-from-civitai-into-layla/), [MOSS Image](/ja/how-to-import-moss-image-safetensor-models-from-civitai-into-layla/), [Qwen Image 2.1](/ja/how-to-import-qwen-image-2-1-safetensor-models-from-civitai-into-layla/), [FLUX.2 Klein](/ja/how-to-import-flux-2-klein-safetensor-models-from-civitai-into-layla/)。GGUF、zip、Web UIについては[Laylaにカスタム画像生成モデルをインポートする方法](/ja/how-to-import-custom-image-generation-models-into-layla/)をご覧ください。

## SD 1.5とは？

SD 1.5は、512 x 512画像を生成する[Stable Diffusion](https://en.wikipedia.org/wiki/Stable_Diffusion) 1.5です。Civitaiで最も一般的な系統で、写実・アニメ・イラストのチェックポイントとLoRAが数千種類あります。**Base model**の**SD 1.5**で絞り込めます。

LoRAは同じベースのチェックポイントでのみ動作します。SD 1.5のLoRAはSDXLでは使えず、その逆も同じです。

## 取得するsafetensorsファイル

**Laylaが対応するのはf16（半精度）safetensorsのみです。** Civitaiのダウンロード欄で**fp16 SafeTensor**と表示されるものを選んでください。

SD 1.5のfp16は通常約2 GBです。全精度版など数GB大きいファイルもあるので、fp16を選びます。

## CivitaiのSD 1.5チェックポイントを追加する

### 手順1：CivitaiのModelsを開く

![Modelsタブを強調したCivitaiトップページ。](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-open-models-page.jpg)

[civitai.com](https://civitai.com/)を開き、上部の**Models**を選びます。画像はPCブラウザーのため、スマートフォンでは配置が少し異なる場合があります。

### 手順2：Checkpoint、SafeTensor、SD 1.5で絞り込む

![Checkpoint、SafeTensor、SD 1.5を選択したCivitaiフィルター。](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-sd-1-5-checkpoint-filters.jpg)

右上の**Filters**を開きます。

1. **Model types**：**Checkpoint**。
2. **File format**：**SafeTensor**。
3. **Base model**：**SD 1.5**を検索して選択。

対応形式のSD 1.5チェックポイントが表示されます。[絞り込み済み一覧を開く](https://civitai.com/models?types=Checkpoint&fileFormats=SafeTensor&baseModels=SD%201.5&sort=Most%20Downloaded)。

最初は**Most Downloaded**や**Highest Rated**で並べ替えると探しやすくなります。

### 手順3：fp16 safetensorsを取得する

![fp16 SafeTensor、1.99 GB、Downloadを表示したCivitaiモデルページ。](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-sd-1-5-checkpoint-download-fp16.jpg)

モデルを開き、右の**Download**欄を確認します。**fp16 SafeTensor**（例：1.99 GB）を選び、**Download**で端末に保存します。複数あればfp16を選んでください。bf16対応の例外は上記の説明を参照してください。

### 手順4：Laylaにインポートする

**Settings** → **Inference Settings** → **Image Generation** → **Add Custom Model**、または**Local Dream** → **Add Model**を開きます。

![Inference SettingsのImage GenerationにあるAdd Custom Model。](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/image-generation-settings.jpg)

**Safetensor**で**Base Model**を**SD1.5**のままにします。iPhoneはこの系統のみなので一覧は表示されません。

![SafetensorとBase Model SD1.5のAdd Image Model画面。](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/add-image-model-safetensor-tab-layla.jpg)

**MODEL CHECKPOINT**でファイルを選び、モデル名を確認して**Import & Convert**をタップします。数分かかる場合があるので開いたままにしてください。完了すると保存・自動選択されます。

### 手順5：画像を生成する

**Local Dream**を開き、モデル選択を確認してプロンプトを入力します。

![速い車の画像を生成する設定のLocal Dream。](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/local-dream-generate.jpg)

![複数のインストール済みモデルがあるLocal Dreamの選択画面。](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/local-dream-select-model.jpg)

この方法のSD 1.5はCPUで最大512 x 512を生成します。対応Qualcomm Snapdragonなら同じチェックポイントをNPU用に変換して高速化できます。[NPU Forge](/ja/how-to-convert-safetensors-to-qnn-with-npu-forge-in-layla/)をご覧ください。

## CivitaiのSD 1.5 LoRAを追加する

LoRAはスタイルや人物、物体、概念を追加する小型ファイルです。チェックポイントと同様に検索し、モデルの種類だけを変えます。

### 手順1：LoRAとSD 1.5で絞り込む

![LoRAとSD 1.5を選択したCivitaiフィルター。](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-sd-1-5-lora-filters.jpg)

**Models** → **Filters**で**Model types**を**LoRA**、**Base model**を**SD 1.5**にします。[絞り込み済み一覧を開く](https://civitai.com/models?types=LORA&fileFormats=SafeTensor&baseModels=SD%201.5&sort=Most%20Downloaded)。チェックポイントと同じフィルター画面です。

### 手順2：LoRA safetensorsを取得する

![SD 1.5 LoRAのページ。9.11 MBのSafeTensorとダウンロード。](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-sd-1-5-lora-download-fp16.jpg)

LoRAは通常10～150 MBと小さく、この例は9.11 MBです。精度表示がある場合は**fp16 SafeTensor**を選び、**Download**します。

### 手順3：インポート時にLoRAを追加する

**Safetensor**で**Base Model**を**SD1.5**にしてチェックポイントを選びます。**LORA FILES (OPTIONAL)** → **Add LoRA**でファイルと強さを指定します。初期値は1.0で複数追加できます。準備ができたら**Import & Convert**を押します。

SD 1.5は変換モデルにLoRAを統合するため、後から変更・削除できません。組み合わせを変えるには元のチェックポイントを別名で再インポートしてください。

## よくある質問

### スマートフォンでSD 1.5を使えますか？

上記の要件を満たせば可能です。**Base Model**に**SD1.5**を選びCivitaiのチェックポイントを追加します。ベースを再利用する系統はLocal Dreamで先に取得してください。

### CivitaiでどのSD 1.5ファイルを取得しますか？

**fp16 SafeTensor**です。他の精度やPickleTensor（`.ckpt`）は対象外です。

### Civitaiからのインポートに接続は必要ですか？

ファイル取得時だけです。変換と生成は端末内で行います。

### iPhoneでSD 1.5をインポートできますか？

はい。iOSは**Safetensor**からSD 1.5を追加できます。他系統はAndroid専用です。

### SDXLなど他系統も追加できますか？

AndroidはSDXL、MOSS Image、Qwen Image 2.1、FLUX.2 Kleinに対応します。冒頭に各ガイドがあります。

### SD 1.5のLoRAを使えますか？

はい。**Safetensor**でインポート中に追加します。SD 1.5用を使い、強さは変換時に固定されます。

### インポートに時間がかかる理由は？

完全なチェックポイントを変換するので数分かかることがあります。完了までLaylaを開いたままにしてください。

### 追加モデルを削除するには？

**Local Dream**でモデルを選び**Delete Model**を押すと容量を解放できます。

## スマートフォンでオフラインのSD 1.5

インポート後、SD 1.5は接続・アカウント・サブスクリプション不要で端末上で動きます。プロンプト、モデル、画像は端末内に残ります。
