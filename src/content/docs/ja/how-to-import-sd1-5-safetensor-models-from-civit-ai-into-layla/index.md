---
title: CivitaiからSD1.5 SafetensorモデルをLaylaにインポートする方法
description: CivitaiのSafetensorファイルをLaylaにインポートし、ローカルで画像を生成する方法を説明します。
category: Image generation
order: 20
keywords:
  - SD 1.5
  - Safetensor
  - Civitai
  - 画像生成
  - Local Dream
lastUpdated: 2026-05-06
translationKey: how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla
ai_translated: true
---

Laylaは、画像生成用のSafetensorモデルに対応しています。画像生成用Safetensorファイルの多くは、[Civitai](https://civitai.com/)で入手できます。

このチュートリアルでは、CivitaiからSafetensorファイルをLaylaにインポートする手順を説明します。

**手順1：[Civitai](https://civitai.com/)を開く**

![モデルタイプ、ファイル形式、ベースモデルのフィルターが強調表示されたCivitaiのモデルページ。](./civitai-model-filters.png)

**モデル**セクションを開きます。右上のフィルターで、**モデルタイプ**から**Checkpoint**を選択します。**ファイル形式**では**SafeTensor**、**ベースモデル**では**SD 1.5**を選択します。

Laylaが対応するすべての画像モデルが一覧表示されます。

**手順2：Safetensorファイルをダウンロードする**

![生成画像の例が表示されたCivitaiモデルのダウンロードページ。](./civitai-model-download.png)

ダウンロードページからSafetensorファイルをダウンロードします。_ファイルサイズが約2 GBであることを確認してください。正しくフォーマットされたファイルかどうかを判断する目安になります。_

**手順3：Laylaにインポートする**

**設定** → **推論設定**を開きます。

**画像生成**の設定まで下にスクロールし、**カスタムモデルを追加**をタップします。

![画像生成セクションのカスタムモデルを追加が表示されたLaylaの推論設定画面。](./image-generation-settings.jpg)

![ローカル画像生成モデルまたはSD Web UIを選択するLaylaのダイアログ。](./choose-image-model.jpg)

先ほどダウンロードしたSafetensorファイルを選択します。Laylaがファイルのインポートを開始します。

![Safetensorファイルのインポート中に表示されるLaylaの進行状況ダイアログ。](./importing-safetensor.jpg)

![ローカル画像生成モデルまたはSD Web UIを選択するLaylaのダイアログ。](./choose-image-model.jpg)

**手順4：画像を生成する**

画像モデルのインポートが完了したら、Local Dreamミニアプリを開いて画像を生成します。

![高速な車の画像を生成するよう設定されたLocal Dream画面。](./local-dream-generate.jpg)

![インストール済みの複数のモデルが表示されたLocal Dreamのモデル選択画面。](./local-dream-select-model.jpg)
