---
title: LaylaでオフラインAI画像生成を有効にする方法
description: Local Dreamを使い、AndroidとiPhoneでオフラインAI画像を生成する方法を説明します。モデル選択、インポート、生成設定、キャラクターの画像送信まで紹介します。
category: Image generation
order: 10
keywords:
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
translationKey: how-to-enable-image-generation-in-layla
ai_translated: true
---

**LaylaはAndroidとiPhoneで使えるオフラインAI画像生成アプリです。Local Dreamミニアプリをインストールすると、Stable Diffusion、SDXL、FLUX、Z-Imageなどのテキスト画像生成モデルを、インターネットやアカウントなしでスマートフォン上で実行できます。** プロンプトと画像は端末内に保存され、オンラインサービスによる確認は行われません。

この記事では、Local Dreamのインストール、モデルの選択とインポート、モデルの種類、生成設定、Laylaや各キャラクターがチャットで使うモデルの設定までを順に説明します。詳しいガイドがある項目にはリンクを掲載しています。

## Laylaでスマートフォン上にAI画像を生成する理由

- **オフライン動作。** モデルのダウンロード後は、機内モードでもStable Diffusionをローカル実行できます。
- **プライバシー。** プロンプトも画像もサーバーに送信しません。アカウント、アップロード、オンライン審査は不要です。
- **クレジットや画像ごとの料金なし。** 端末内生成には日次上限もありません。制約は端末の容量と処理速度です。
- **モデルを選べる。** 小型SD 1.5からFLUX.2 Klein、Z-Image Turboまでの内蔵モデルや、[Civitai](https://civitai.com/)のチェックポイントとLoRAを使えます。
- **AIハードウェアを活用。** 対応Snapdragon端末では、通常CPUより高速なNPUを利用できます。
- **チャットと連携。** 指定したモデルで、キャラクターが会話中に画像を送信できます。

## Laylaの3つの画像生成方法

| 方法                    | 生成場所                      | 必要な接続                    | 費用                               |
| ----------------------- | ----------------------------- | ----------------------------- | ---------------------------------- |
| 端末内                  | スマートフォンのCPU、GPU、NPU | モデルのダウンロード時のみ    | 画像ごとの料金なし                 |
| Layla Cloud             | Laylaのサーバー               | インターネットとCloudログイン | プランに応じた月間枠               |
| Stable Diffusion Web UI | ネットワーク上のPC            | ローカルネットワーク          | 画像ごとの料金なし。PCの運用は必要 |

この記事では主に、プロンプトと画像を端末内に保つ最初の方法を扱います。Cloudとの切り替えは[ローカルLLMとLayla Cloudを切り替える方法](/ja/how-to-switch-between-local-llm-and-layla-cloud/)をご覧ください。

## オフライン画像生成ミニアプリLocal Dreamをインストールする

Local Dreamが端末内の画像生成を担当します。任意の機能で、初期状態ではインストールされていません。

1. Laylaのミニアプリ画面（**Browse Apps**）で**Local Dream**を探します。場所は[ミニアプリの有効化と無効化](/ja/how-to-enable-disable-mini-apps-within-layla/)をご覧ください。
2. ページを開いて説明を読みます。追加ダウンロードは約54 MBで、モデルより小さいサイズです。
3. **Download**をタップします。
4. ミニアプリを開きます。見出しに_On-device image generation_と表示されます。

![Browse Apps内のLocal Dreamページ。説明、54 MBの追加ダウンロード、Downloadボタンが表示されています。](../../how-to-enable-image-generation-in-layla/install-local-dream-mini-app-layla.jpg)

Laylaの更新に新しいエンジンが含まれると、ミニアプリに更新案内が表示されます。生成やインポートの前に、ミニアプリ画面から更新してください。

Local Dreamをアンインストールすると、インポートしたものを含め、その中の画像モデルがすべて削除されます。実行前にLaylaが確認します。

## 画像モデルを選んでダウンロードする

Local Dream上部のモデルカードか矢印をタップし、**Select Model**を開きます。

![Select Model一覧。検索、Downloaded、CPU、NPU、Cloud、TagsのフィルターとSD1.5 Base、DreamShaperが表示されています。](../../how-to-enable-image-generation-in-layla/select-image-generation-model-local-dream.jpg)

- **Search**でモデル名を検索できます。
- **フィルター**で**Downloaded**、**CPU**、**NPU**、**Cloud**に絞れます。**Tags**は_realistic_、_anime_、_sdxl_などのスタイル用です。
- 未取得のカードにはダウンロードアイコン、取得済みにはチェックが表示されます。隅のバッジはCPU、NPU、Cloudの区別です。

モデルを選び**Download Model**をタップします。SD 1.5の約1 GBから、大型NPUモデルの10 GB超まであるため、Wi-Fiと空き容量を確認してください。モデルは端末に保存され、**Delete Model**でいつでも容量を空けられます。

Laylaはチップ情報を読み取り、必要なハードウェアを検出できない場合は**Generate**の上に警告します。参考情報なので、警告があっても試せます。

## CivitaiのカスタムStable Diffusionモデルをインポートする

内蔵モデルに好みのスタイルがなければ、独自モデルを追加できます。**Add Image Model**への入り方は2つあります。

- Local Dream上部の**Add Model**をタップ。
- **Settings** → **Inference Settings** → **Image Generation** → **Add Custom Model**を開く。

![Add Image Model画面。Safetensor、Zip、Web UIタブ、SD1.5のBase Model、safetensorsまたはGGUFの選択ボタン。](../../how-to-enable-image-generation-in-layla/import-custom-image-model-safetensor-layla.jpg)

最大3つのタブがあります。

- **Safetensor**：[Civitai](https://civitai.com/)や[Hugging Face](https://huggingface.co/)などから取得した`.safetensors`チェックポイントを端末で変換します。Androidは`.gguf`拡散モデルにも対応します。学習元のモデル系統を選び、LoRAも追加できます。
- **Zip**：Layla用に変換・梱包済みのモデルをインポートします。
- **Web UI**：PC上のAUTOMATIC1111 Stable Diffusion Web UIにAPIアドレスで接続します。

iPhoneのSafetensorタブはSD 1.5専用です。対応Qualcomm NPU搭載端末では、高速生成向けの変換案内も表示されます。

詳細は[カスタム画像モデルのインポート](/ja/how-to-import-custom-image-generation-models-into-layla/)、画像付きの例は[CivitaiからSD 1.5をインポートする方法](/ja/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/)をご覧ください。対応Snapdragon端末なら[NPU Forge](/ja/how-to-convert-safetensors-to-qnn-with-npu-forge-in-layla/)でSD 1.5とSDXLをCPUではなくNPU用に変換できます。

## 対応モデル：Stable Diffusion、SDXL、FLUX、Z-Imageなど

Laylaは実行するハードウェアごとにモデルを分類し、カードのバッジで示します。

| 種類                        | 内蔵モデルの例                                                                                | 実行先            | 対応OS                            |
| --------------------------- | --------------------------------------------------------------------------------------------- | ----------------- | --------------------------------- |
| SD 1.5 (CPU)                | SD1.5 Base、DreamShaper、RealCartoon、Pastel-Mix                                              | CPU、任意でGPU    | Android、iOS                      |
| SD 1.5 (NPU)                | CyberRealistic、Realistic Vision Hyper、Reliberate、ToonYou                                   | Snapdragon NPU    | Android                           |
| SDXL (CPU)                  | SDXL Turbo、AnimeMix XL、IntoRealism                                                          | CPU               | Android。IntoRealismはiOSにも対応 |
| SDXL (NPU)                  | Pony Realism V23、Illustrious V17、Nova Anime XL V10                                          | Snapdragon NPU    | Android                           |
| 新しい拡散Transformer (NPU) | Z-Image Turbo、FLUX.2 Klein 4Bと9B、Qwen Image 2.1、Krea 2 Turbo、MOSS-Image、IntoRealism ZIT | Snapdragon NPU    | Android                           |
| 小型FLUX・Z-Image（端末内） | Bonsai Image 4B、FLUX.2 klein 4B、Z-Image Turbo 6B                                            | CPUまたはGPU      | Android、iOS                      |
| Core ML                     | Realistic Vision Hyper、Deliberate v2                                                         | Appleハードウェア | iOS                               |
| Layla Cloud                 | FLUX.1[dev]、BrainDance、CyberRealisticXL、iNiverse Mix                                       | Laylaサーバー     | Android、iOS                      |
| Web UI                      | Web UIで提供する任意のモデル                                                                  | PC                | Android、iOS                      |

各グループの特徴：

- **SD 1.5**（[Stable Diffusion](https://en.wikipedia.org/wiki/Stable_Diffusion) 1.5）は最も古く軽量で、Civitaiで広く使われています。最近の多くの端末で512 x 512の画像を生成します。
- **SDXL**は詳細な1024 x 1024画像を生成しますが、より多くのメモリが必要です。NPU版はSnapdragon 8 Elite以降が必要です。
- **新しい拡散Transformer**（Z-Image、FLUX.2 Klein、Qwen Image、Krea、MOSS-Image）は一覧で最も高品質です。大容量で、Snapdragon 8 Elite以降のNPUを使い、最大2048 x 2048に対応します。既存画像を編集できるものもあります。
- **小型FLUX・Z-Image**は両OSで別の端末内エンジンを使います。小さな固定解像度で、最大のものは数GBあり低速です。
- **Layla Cloud**はダウンロード不要です。ログインすれば、各プランの月間画像生成枠を使えます。

NPU（ニューラルプロセッシングユニット）はQualcomm SnapdragonのAIアクセラレーターです。同じモデルなら通常CPUより高速なので、LaylaはNPU版や、独自モデル用のNPU Forgeを提供しています。

## 生成設定：プロンプト、ステップ数、CFG、シード

Local Dreamのモデルカード下に生成設定があります。表示される項目はモデルによって異なります。

![Local DreamのSize、Scheduler、Steps、CFG Scale、Seed、Auto Upscale、Advanced Settings、Generate。](../../how-to-enable-image-generation-in-layla/local-dream-image-generation-settings.jpg)

| 設定                              | 機能                                            | 補足                                                                                                                 |
| --------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Prompt**                        | 作りたい画像を記述。                            | 星ボタンはチャットモデルでキーワードから文章を作成。次のボタンは長い文章を短縮し、Long-term Memoryミニアプリが必要。 |
| **Negative prompt**               | 避けたい要素。                                  | 非対応モデルでは非表示。新しい拡散TransformerではCFG 1より大きい場合のみ有効。                                       |
| **Size**                          | 幅と高さ。                                      | SD 1.5 CPUは複数の正方形サイズ、新しいNPUモデルは最大2048 x 2048。固定サイズのモデルもあります。                     |
| **Steps**                         | ノイズ除去の回数。                              | 増やすと時間が延びます。Turboや蒸留モデルは4～9ステップ向け。                                                        |
| **CFG Scale**                     | プロンプトに従う強さ。                          | 内蔵モデルには適切な初期値があります。新しいモデルには1向けのものが多数あります。                                    |
| **Seed**                          | ランダムな開始状態。                            | -1なら毎回ランダム。結果に使用値が表示され、再生成に利用できます。                                                   |
| **Scheduler**                     | DPM++ 2M Karras、Euler A、LCMなどのサンプラー。 | SD 1.5とSDXLで表示。新しいモデルは専用方式。                                                                         |
| **Source image**                  | ノイズの代わりに画像から開始（画像間生成）。    | SD 1.5 CPU/NPU、SDXL NPU、新しいNPUに対応。選択後、マスクで一部だけを描き直し、**Denoise Strength**を調整できます。  |
| **Reference images**              | 編集の参考画像を最大3枚。                       | FLUX.2 KleinとQwen Image用。                                                                                         |
| **Show Preview While Generating** | 各ステップの簡易プレビュー。                    | 一部モデルのみ。                                                                                                     |
| **Auto Upscale**                  | 完成画像を拡大。                                | 拡大モデル、GPUのOpenCL使用、タイルサイズを選択。小さなタイルほど省メモリ。                                          |

**Advanced Settings**には次の項目があります。

- **Prompt prefix**：毎回プロンプトの先頭に付ける文。共通スタイルや品質タグに便利です。
- **Use GPU**：対応モデルをGPUで実行。RAMが12 GB未満ではメモリ不足の可能性を警告します。
- **Reset All Settings**：選択モデルの初期値に戻します。

**Generate**で開始します。処理中は**Stop generating**で停止でき、完成画像はギャラリーに表示されます。

## Inference Settingsで画像モデルを設定する

Local Dreamは手動生成用です。チャット中にLaylaやキャラクターが使うモデルは**Inference Settings**で設定します。

1. **Settings** → **Inference Settings** → **Image Generation**を開きます。
2. **Add Custom Model**の下のカードが現在のモデルです。交換矢印で**Select Model**を開きます。
3. モデルを選択します。無効化する場合は**No Image Generation**を選びます。

![Inference SettingsのImage Generation。Add Custom Model、選択中のLayla CloudのiNiverse Mix、変更ボタン。](../../how-to-enable-image-generation-in-layla/inference-settings-image-generation-model-layla.jpg)

個別設定のないキャラクターはこのモデルを使います。未取得のローカルモデルは先にLocal Dreamでダウンロードしてください。CloudとWeb UIはログインや接続後に利用できます。Web UIの編集は一覧のカードにある鉛筆アイコンから行います。

## キャラクターごとに画像生成を設定する

Inference Settingsは共通の初期設定です。カスタムキャラクターごとにモデルと送信条件を変えられます。会話中に画像を送ったり、一方をアニメ調、もう一方を写実的にしたりできます。

1. キャラクターを作成または編集します。全体の説明は[カスタムキャラクターの作成](/ja/how-do-i-create-custom-characters/)をご覧ください。
2. **Advanced**タブの**OUTPUT**内で**Image generation**を探します。モデル名か_No image generation_が表示されます。
3. タップして**Select Model**から選びます。**No Image Generation**ならそのキャラクターの生成を無効化します。
4. 以下の設定を調整し、**Save**をタップします。

![キャラクター編集のAdvanced。RealCartoon、ランダム送信とプロフィール画像の設定、Fallback phrase。](../../how-to-enable-image-generation-in-layla/character-image-generation-settings-layla.jpg)

画像モデルを設定すると、3つの追加項目が表示されます。

- **Send images randomly**：依頼がなくても会話中に画像を送れます。初期状態は無効です。
- **Generate Images based on your character's profile image**：常にプロフィール画像を画像間生成の出発点にして、外見を近づけます。対応モデルが必要です。上の設定表で確認してください。
- **Fallback phrase**：_写真を送って_や_画像を生成して_などをカンマ区切りで指定します。メッセージに含まれると画像を提案します。通常の画像、写真、セルフィーの依頼も認識するため、自分が使う言い方や他言語の表現を追加する欄です。

画像の提案は断れます。意図せず一致しても、提案を閉じるだけです。

注意点：

- 先にLocal Dreamでモデルを取得してください。端末にないモデルでは生成できません。
- Layla Cloudモデルではログインが必要で、画像ごとに月間枠を消費します。
- 個別モデルのないキャラクターはInference Settingsの設定を使います。

## その他の画像生成方法

端末が遅い場合などには、エージェントでも生成できます。以下はインターネットを必要とし、外部サービスにプロンプトを送信します。

- [画像生成エージェントの作成](/ja/creating-an-image-generation-agent/)：各メッセージ後に場面やキャラクターを描画。
- [Perchanceエージェントで画像生成](/ja/how-to-use-the-perchance-image-generation-agent/)：無料のPerchanceサイトを使用。
- [LaylaのNano Banana API](/ja/how-to-use-the-google-nano-banana-image-generation-agent/)：Google AI StudioのAPIキーでGoogleのモデルに接続。

## よくある質問

### Androidでオフライン画像生成するには？

Local Dreamをインストールし、モデルを取得してください。その後はテキストや画像から、端末上でオフライン生成できます。接続が必要なのはミニアプリのインストールとモデル取得時だけです。

### iPhoneでも画像生成できますか？

はい。SD 1.5はCPUまたはGPUで動作し、Core ML、小型FLUX、Z-Imageも利用できます。Snapdragon NPUモデルはAndroid専用です。

### スマートフォンでStable Diffusionを実行できますか？

はい。LaylaはAndroidとiPhoneでStable Diffusion 1.5やSDXLを実行します。SD 1.5は最近の多くの端末のCPUで動作し、対応SnapdragonではNPUで高速化できます。独自チェックポイントとLoRAも追加できます。

### スマートフォンでFLUXを実行できますか？

対応ハードウェアなら可能です。FLUX.2 KleinはSnapdragon 8 Elite以降のNPUを使います。小型のFLUX.2 klein 4BとBonsai Image 4BはAndroid・iOSのCPUやGPUに対応します。FLUX.1[dev]はLayla Cloudにあります。

### Snapdragon端末は必須ですか？

いいえ。SD 1.5 CPUは最近の多くの端末で動作します。Snapdragonが必要なのはNPUモデルだけで、新しいものは8 Elite以降が必要です。

### 最初はどのモデルがおすすめですか？

迷ったらDreamShaperなどのSD 1.5を試してください。比較的小さく、最近のほぼすべての端末で使えます。Snapdragon 8 Elite以降なら、高品質なZ-Image TurboなどのNPUモデルも試せます。

### Civitaiモデルを使えますか？

対応系統なら使えます。safetensorsチェックポイントをダウンロードして**Safetensor**から追加してください。対応系統は上記のインポートガイドにあります。

### 既存の画像を編集できますか？

画像間生成に対応するモデルなら可能です。Local Dreamで元画像を追加してください。FLUX.2 KleinとQwen Imageは参考画像も最大3枚受け付けます。

### Layla Cloudの画像生成は有料ですか？

無料を含む各プランに月間生成枠があります。上位プランほど多く使えます。端末内生成には使用回数制限や画像単位の料金はありません。

### AIキャラクターに画像を送らせるには？

編集画面の**Advanced** → **OUTPUT**で画像モデルを選び、**Send images randomly**を有効にするか、**Fallback phrase**に合図を追加します。

### キャラクターごとに別モデルを使えますか？

はい。各キャラクターの**Advanced**で設定できます。個別設定がなければInference Settingsの共通モデルを使います。

### 画像を検閲・確認されますか？

端末内生成ではプロンプトも画像も外へ送信されず、オンラインで確認されません。CloudはLaylaのサーバー、Web UIは自分のPCで実行するため、それぞれの設定に従います。

### Androidのオフライン画像生成アプリを選ぶ基準は？

インターネット不要か、対応モデル、NPU利用、独自Stable DiffusionチェックポイントやLoRAのインポート、画像の端末内保存の5点を確認してください。Laylaはすべてに対応し、キャラクターとのチャットにも統合しています。

### PCのStable Diffusionに接続するには？

AUTOMATIC1111 Web UIのAPIを有効にし、Add Image Modelの**Web UI**にAPIアドレスを追加します。生成はPC側で行うため、端末からネットワーク経由で到達できる必要があります。

## クレジット

画像生成はXORORZが開発した[Local Dream](https://github.com/xororz/local-dream)を使用します。NPU Forgeの開発者はAbrahamPaulJです。
