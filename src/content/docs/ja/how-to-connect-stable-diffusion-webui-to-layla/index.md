---
title: "AndroidでStable Diffusion WebUIを使う方法：AUTOMATIC1111をLaylaに接続する"
description: AndroidでStable Diffusion WebUIを使う方法。AUTOMATIC1111をLaylaに接続し、APIを有効にして、Local DreamにWeb UIモデルを追加し、リクエストJSONテンプレートを編集します。
category: Image generation
order: 17
keywords:
  - Stable Diffusion WebUI Android
  - AndroidでStable Diffusion WebUI
  - Stable Diffusion Androidアプリ
  - AUTOMATIC1111 Android
  - AUTOMATIC1111 API
  - Stable Diffusion WebUIをスマホに接続
  - スマホでStable Diffusionを使う
  - AndroidでStable Diffusionを実行
  - ローカルネットワークのStable Diffusion
  - Stable Diffusion WebUI リモートアクセス
  - stable-diffusion-webui --api
  - stable-diffusion-webui --listen
  - sdapi/v1/txt2img
  - txt2img リクエストボディ
  - Stable Diffusion WebUI API設定
  - Android SDXL
  - Stable Diffusion LoRA
  - Hires fix API
  - Android向けAI画像生成アプリ
  - AI画像生成アプリ
  - テキストから画像
  - Layla 画像生成
  - Local Dream
lastUpdated: 2026-11-15
translationKey: how-to-connect-stable-diffusion-webui-to-layla
ai_translated: true
---

**Laylaは、AUTOMATIC1111 Stable Diffusion WebUIのクライアントとして使えるAndroidアプリです。スマートフォンがネットワーク経由で自分のPC上のWebUIにプロンプトを送り、画像はPCが生成します。** WebUIのAPIを有効にし、Local DreamミニアプリにWeb UIモデルを追加すると、Laylaは編集可能なJSONテンプレートから各リクエストを作成します。生成された画像は、ほかのLayla画像モデルと同じようにLocal Dreamとチャットに表示されます。

AUTOMATIC1111はコンピューター向けのWebインターフェースで、Android版は用意されていません。この接続が、AndroidでStable Diffusion WebUIを使う方法です。WebUIに設定済みのチェックポイント、LoRA、拡張機能をそのまま使い、スマートフォンから生成できます。この記事では、APIを有効にしたWebUIの起動、Local Dreamへのモデル追加、すべてのプレースホルダーを含むリクエストテンプレート、SD 1.5・SDXL・LoRA・Hires fix向けのすぐ使えるテンプレート、よくある接続エラーの対処法を説明します。

Layla内蔵の端末上モデルと違い、この方法では生成中にPCが起動していて、スマートフォンから接続できる必要があります。プロンプトと画像はオンラインサービスではなく、ローカルネットワーク経由で自分のコンピューターとやり取りされるため、接続にインターネットは不要です。

## LaylaでAndroidからStable Diffusion WebUIを使う理由

Laylaはスマートフォン上でStable Diffusionを直接実行することもできます。WebUI接続は、LaylaでAndroid向けAI画像生成を行う2つの方法のうちの1つです。次のような場合に向いています。

- **すでにStable Diffusion環境がある。** チェックポイント、LoRA、Embedding、ControlNetやADetailerなどの拡張機能はPCに残ったまま、スマートフォンから使えます。
- **PCのグラフィックカードがスマートフォンより高速。** 生成はPCが行うため、スマートフォンのプロセッサーが画像サイズ、ステップ数、モデルを制限しません。
- **スマートフォンでは動かせないモデルを使いたい。** 大きなSDXLチェックポイントや重い拡張機能が、変換なしでデスクトップGPU上で動きます。
- **1枚ごとの費用がかからない。** 自分のハードウェアで生成するため、クレジットもアカウントも不要です。
- **チャットで使える。** Web UIモデルはLaylaの画像モデルとしても、特定のキャラクター専用の画像モデルとしても設定でき、自分のPCで作った画像をキャラクターが送ってくれます。

|                        | 端末上のモデル                                        | Web UI接続                             |
| ---------------------- | ----------------------------------------------------- | -------------------------------------- |
| 画像が作られる場所     | スマートフォン上                                      | PC上                                   |
| PCとネットワークが必要 | 不要                                                  | 必要（PCが起動していて接続可能なこと） |
| モデル                 | Laylaがインポートしてスマートフォンで実行できるモデル | WebUIが読み込めるものすべて            |
| 設定                   | Laylaの操作項目                                       | Laylaの操作項目とJSONテンプレート      |

端末上で実行する方法は、CivitaiのチェックポイントやLoRAも含め、[Laylaにカスタム画像生成モデルをインポートする方法](/ja/how-to-import-custom-image-generation-models-into-layla/)で説明しています。

## LaylaがStable Diffusion WebUIと通信する仕組み

WebUIには、ブラウザー用のページとは別にHTTP APIがあります。Laylaはその中の1つの呼び出しだけを使います。

```text
Layla (phone)                         Stable Diffusion WebUI (PC)
  |  POST /sdapi/v1/txt2img               |
  |  JSON body built from your template -> |  renders the image
  |  <- JSON with "images": [base64]      |
  |  saves the first image, shows it      |
```

**Generate**をタップすると、Laylaはテンプレートの`{prompt}`や`{steps}`などのプレースホルダーを現在の設定に置き換え、その結果を入力したエンドポイントへ`POST`リクエストの本文として送ります。WebUIは、`images`リストの中にBase64テキストとして画像を返します。Laylaは最初の1枚をデコードし、通常の画像ファイルとして保存します。APIキーを入力した場合は、`Authorization: Bearer`ヘッダーで送信します。

送られるのはこれだけです。Laylaが自分でモデルを切り替えたり、サンプラーを設定したり、サイズを選んだりすることはありません。WebUIに伝える内容はすべてテンプレートに書かれています。

## 必要なもの

- [AUTOMATIC1111 Stable Diffusion WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui)がインストールされ、WebUI自身のブラウザーページで画像を生成できるPC。Forgeなど同じAPIを維持しているフォークは、通常同じリクエストを受け付けます。
- 同じネットワーク（たとえば同じWi-Fi）に接続されたスマートフォンとPC。
- **Local Dream**ミニアプリがインストールされたLayla。インストール方法は[画像生成を有効にする方法](/ja/how-to-enable-image-generation-in-layla/)、ミニアプリの場所は[ミニアプリを有効または無効にする方法](/ja/how-to-enable-disable-mini-apps-within-layla/)で説明しています。

## ステップ1：Stable Diffusion WebUIのAPIを有効にする（--apiと--listen）

APIは初期状態では無効です。`--api`引数を追加し、PC以外のデバイスからの接続も受け付けるよう`--listen`も追加します。どちらも、WebUIの起動ファイルの`COMMANDLINE_ARGS`行に書きます。Windowsでは`webui-user.bat`、Linuxでは`webui-user.sh`です。

```text
set COMMANDLINE_ARGS=--api --listen
```

その行にすでにほかの引数がある場合は、置き換えずにこの2つを追加してください。このファイルでWebUIを起動します。既定ではポート`7860`で待ち受けます。

APIが動作しているかは、PCのブラウザーで`http://localhost:7860/docs`を開くと確認できます。`/sdapi/v1/txt2img`を含む利用可能なAPI呼び出しが一覧表示されます。

### PCのアドレスを調べてポートを許可する

スマートフォンでは`localhost`は使えません。それはスマートフォン自身を指すためです。必要なのは、ネットワーク上のPCのアドレスです。

1. Windowsではターミナルを開き、`ipconfig`を実行します。Wi-FiまたはEthernetアダプターの**IPv4アドレス**を探します。`192.168.1.50`のような形式です。
2. Windows Defenderファイアウォールがプライベートネットワークでのpythonの許可を尋ねてきたら、許可してください。尋ねられず、あとでスマートフォンから接続できない場合は、TCPポート`7860`の受信規則を追加します。
3. スマートフォンのブラウザーで、自分のアドレスを使って`http://192.168.1.50:7860`を開きます。WebUIのページが表示されれば、スマートフォンからPCに接続でき、同じアドレスがLaylaでも使えます。

エンドポイントは、そのアドレスにtxt2imgのパスを付けたものです。例：

```text
http://192.168.1.50:7860/sdapi/v1/txt2img
```

ルートの綴りは`txt2img`です。以前のバージョンのLaylaでは、エンドポイント欄のプレースホルダーに`text2img`と表示されていましたが、WebUIにそのようなルートはありません。

### APIキーとセキュリティについて

`--listen`を付けると、WebUIはネットワーク上のすべてのデバイスから接続できるようになり、APIには自分で設定しない限りログインがありません。信頼できるネットワークでのみ使用し、ポート`7860`をインターネットに転送しないでください。

WebUIの`--api-auth`オプションはユーザー名とパスワードを設定しますが、HTTP Basic認証を使います。一方、LaylaはAPIキーをBearerトークンとして送信します。両者は一致しないため、通常のWebUIでは**API Key**欄を空のままにしてください。この欄は、リバースプロキシなどWebUIの前段にあるものがBearerトークンを確認する構成のためのものです。

## ステップ2：Local DreamにWeb UIモデルとしてWebUIを追加する

1. **Local Dream**ミニアプリを開きます。
2. 右上の**Add Model**をタップします。Safetensor、Zip、Web UIの3つのタブがあるAdd Image Model画面が開きます。
3. **Web UI**タブを選びます。

![LaylaのAdd Image Model画面のWeb UIタブ。Automatic1111互換のStable Diffusion API用のName、Endpoint、API Key、Model欄が表示されています。](../../how-to-connect-stable-diffusion-webui-to-layla/connect-stable-diffusion-web-ui-api-layla.jpg)

4. 各欄を入力します。
   - **Name**：わかりやすい名前（例：`PC SDXL`）。モデル一覧に表示される名前です。
   - **Endpoint**：ステップ1の完全なアドレス（例：`http://192.168.1.50:7860/sdapi/v1/txt2img`）。
   - **API Key**：通常のWebUIでは空のままにします。
   - **Model**：下の注意を参照してください。空のままで構いません。
5. **Save & Select**をタップします。

NameとEndpointは必須です。どちらかが空の場合、Laylaは少なくとも名前とAPIエンドポイントを入力するよう求めます。

モデルは画像モデルに保存され、すぐに選択されます。ダウンロードは不要で、WebUIが動作していればすぐに使えます。新しいWeb UIモデルは、20ステップ、CFGスケール7、空のネガティブプロンプトで始まり、この3つはLocal Dreamで変更できます。

### Model欄の役割

WebUIは、読み込まれているチェックポイントで生成します。現在のLaylaでは、**Model**欄のテキストは接続とともに保存されますが、リクエストには追加されません。そのためここにチェックポイント名を入力しても、WebUIのモデルは切り替わりません。Laylaからチェックポイントを選ぶには、下のSDXLテンプレートのようにリクエストテンプレートに書きます。

### 構成ごとに接続を追加する

Web UIモデルはそれぞれ、独自のリクエストテンプレートを含む設定を保持します。同じエンドポイントを別の名前で何度でも追加できます。たとえば、SD 1.5のアニメ系チェックポイント用と、SDXLの写真系チェックポイント用に別々の接続を作り、それぞれのテンプレートで適切なチェックポイントと画像サイズを選びます。Local Dreamで切り替えれば、構成全体が切り替わります。接続の名前、エンドポイント、キーをあとで変更するには、モデル一覧を開き、カードの鉛筆アイコンをタップします。

## ステップ3：スマートフォンからStable Diffusionの画像を生成する

Web UIモデルを選択すると、Local Dreamにはほかのモデルと同じ操作項目が表示されます。

1. プロンプトを入力し、必要に応じてネガティブプロンプトも入力します。
2. **Steps**、**CFG Scale**、**Seed**を設定します。Seedを`-1`にするとランダムになります。
3. **Generate**をタップします。

![LaylaのLocal Dreamのパラメーター：Size、Scheduler、Steps、CFG Scale、Seed、Auto Upscale、Advanced Settingsセクション。](../../how-to-connect-stable-diffusion-webui-to-layla/local-dream-image-generation-settings.jpg)

PCが生成する間、スマートフォンは待機します。所要時間はスマートフォンではなく、グラフィックカードと設定で決まります。リクエストは画像が完成してから返るため、Web UIモデルでは進行状況のプレビューは利用できません。**Auto Upscale**がオンの場合、画像が届いた後にスマートフォン上でアップスケーラーが実行されます。

Web UIモデルには当てはまらない項目がいくつかあります。

- **Size**の選択肢は512×512の1つだけです。ほかのサイズにするには、後述のようにテンプレートで`width`と`height`を設定します。
- **Scheduler**はLaylaの端末上モデル用で、WebUIには送られません。サンプラーやスケジューラーはテンプレートで設定します。
- **画像から画像**は利用できません。LaylaのWeb UI接続はtxt2imgだけを呼び出します。

## Stable Diffusion WebUI APIのリクエストテンプレート（JSON）

テンプレートは、LaylaがWebUIに送るJSONです。Local DreamでWeb UIモデルを選び、**Advanced Settings**を開いて、**WEBUI API BODY TEMPLATE**までスクロールします。テキストボックスにはリクエスト本文全体が入っており、自由に編集できます。変更は、入力をやめて少し経つと自動的に保存され、そのモデルにのみ適用されます。

Advanced Settings下部の**Reset All Settings**は、そのモデルのほかの設定とともにテンプレートをLaylaの既定値に戻します。

### 既定のテンプレート

新しいWeb UIモデルは、このテンプレートで始まります。txt2img APIが受け付けるほぼすべてのフィールドが並んでいます。

```json
{
  "prompt": "{prompt}",
  "negative_prompt": "{negativePrompt}",
  "styles": [],
  "seed": {seed},
  "subseed": -1,
  "subseed_strength": 0,
  "seed_resize_from_h": -1,
  "seed_resize_from_w": -1,
  "sampler_name": "Euler A",
  "scheduler": "",
  "batch_size": 1,
  "n_iter": 1,
  "steps": {steps},
  "cfg_scale": {cfg},
  "width": {width},
  "height": {height},
  "restore_faces": true,
  "tiling": false,
  "do_not_save_samples": false,
  "do_not_save_grid": false,
  "eta": 0,
  "denoising_strength": 0,
  "s_min_uncond": 0,
  "s_churn": 0,
  "s_tmax": 0,
  "s_tmin": 0,
  "s_noise": 0,
  "override_settings": {},
  "override_settings_restore_afterwards": true,
  "refiner_checkpoint": "",
  "refiner_switch_at": 0,
  "disable_extra_networks": false,
  "firstpass_image": "",
  "comments": {},
  "enable_hr": false,
  "firstphase_width": 0,
  "firstphase_height": 0,
  "force_task_id": "",
  "sampler_index": "",
  "script_name": "",
  "script_args": [],
  "send_images": true,
  "save_images": false,
  "alwayson_scripts": {},
  "infotext": ""
}
```

すべてが必要なわけではありません。省略したフィールドにはWebUIの既定値が使われるため、短いテンプレートのほうが読みやすく、管理もしやすくなります。次のセクションでは、まずプレースホルダー、次に変更する価値が高いフィールドを説明します。

### プレースホルダー

生成のたびに、7つのプレースホルダーが設定に置き換えられます。テンプレート内のそれ以外のテキストはそのまま送られます。

| プレースホルダー   | 置き換えられる内容                                                    | 書き方                             |
| ------------------ | --------------------------------------------------------------------- | ---------------------------------- |
| `{prompt}`         | Prompt Prefixを先頭に付けたプロンプト                                 | 引用符の内側：`"{prompt}"`         |
| `{negativePrompt}` | ネガティブプロンプト                                                  | 引用符の内側：`"{negativePrompt}"` |
| `{seed}`           | Seed欄の値。`-1`または`0`の場合、Laylaは1,000,000未満の乱数を選びます | 引用符なし                         |
| `{steps}`          | Steps欄の値                                                           | 引用符なし                         |
| `{cfg}`            | CFG Scale欄の値                                                       | 引用符なし                         |
| `{width}`          | 選択中の幅。Web UIモデルでは512                                       | 引用符なし                         |
| `{height}`         | 選択中の高さ。Web UIモデルでは512                                     | 引用符なし                         |

Laylaによる置き換えの仕組みから、いくつかの規則が導かれます。

- **テキストのプレースホルダーは引用符で囲み、数値は囲まない。** Laylaはプロンプト内の引用符や改行をエスケープしてJSONが壊れないようにし、`{prompt}`と`{negativePrompt}`が文字列の内側にあることを前提にしています。数値のプレースホルダーはそのまま数値になるため、`"steps": {steps}`は正しく、`"steps": "{steps}"`だとステップ数が文字列として送られます。
- **結果は有効なJSONでなければならない。** Laylaは検証しません。カンマの不足や末尾の余分なカンマがあると、WebUIは画像ではなくエラーを返します。
- **すべての出現箇所が置き換えられる。** `{prompt}`を2か所に書けば、両方が置き換えられます。
- **`{scheduler}`や`{model}`というプレースホルダーはない。** サンプラー、スケジューラー、チェックポイントはテンプレートに直接書きます。

### Laylaがプロンプトに最初に行う処理

プロンプトが`{prompt}`に入る前に、LaylaはStable Diffusionのカンマ区切りの形式に整えます。

1. Advanced Settingsの**Prompt Prefix**が、カンマに続けて先頭に追加されます。
2. プロンプト全体が小文字に変換されます。
3. テキストがカンマで分割され、2回現れるタグは1つだけ残されます。

ネガティブプロンプトも小文字に変換されます。`(detailed eyes:1.2)`のような重み付けは変更されません。

テンプレートに直接書いたテキストは変更されません。LoRAでは重要で、PC側ではLoRA名の大文字小文字が区別される場合があります。`<lora:MyStyle:0.8>`のようなタグは、Laylaのプロンプト欄ではなくテンプレートに書けば、大文字が保たれます。後述のLoRAテンプレートはこの方法を使っています。

### 変更する価値のあるフィールド

| フィールド             | 内容                                                                                                                                                                                                       |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sampler_name`         | サンプラー。WebUIは一覧に表示されるとおりの名前（例：`Euler a`）を求めます。Laylaの既定は`Euler A`です。WebUIが不明なサンプラーだと報告する場合は、**Sampling method**の一覧から名前をコピーしてください。 |
| `scheduler`            | WebUI 1.9以降のノイズスケジュール（例：`Karras`）。空文字列なら既定のままです。                                                                                                                            |
| `restore_faces`        | 結果に顔修復モデルを適用します。Laylaの既定では`true`です。スタイライズ系やアニメ系のチェックポイントでは顔の見た目が変わることがあるため、`false`にしてください。                                         |
| `width`、`height`      | 出力サイズ。512×512より大きくするには、ここに数値を設定します。SDXLなら1024のように、チェックポイントが学習したサイズを使ってください。                                                                    |
| `batch_size`、`n_iter` | WebUIが1回のリクエストで作る画像の枚数。Laylaは最初の1枚しか使わないため、どちらも`1`のままにします。                                                                                                      |
| `override_settings`    | このリクエストにだけ適用される設定。チェックポイントはここで選びます。                                                                                                                                     |
| `enable_hr`            | Hires fixを有効にします。小さく生成してから、2回目のパスで拡大します。                                                                                                                                     |
| `send_images`          | `true`のままにしてください。Laylaはレスポンスから画像を読み取ります。                                                                                                                                      |
| `save_images`          | WebUIがPC上にもコピーを残すかどうか。既定は`false`です。                                                                                                                                                   |
| `alwayson_scripts`     | ControlNetやADetailerなど、インストール済みの拡張機能への引数。                                                                                                                                            |

リクエストの詳細は[WebUIのAPIドキュメント](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API)にあり、お使いのWebUIの`/docs`ページには、インストール済みバージョンが受け付ける全フィールドが一覧表示されます。

## すぐ使えるテンプレート

どれかをテンプレート欄にコピーして調整してください。いずれも完全で有効なJSONです。

### テンプレート：最小のSD 1.5

実用的な最小のテンプレートです。記載のない項目はWebUIが補います。

```json
{
  "prompt": "{prompt}",
  "negative_prompt": "{negativePrompt}",
  "seed": {seed},
  "steps": {steps},
  "cfg_scale": {cfg},
  "width": {width},
  "height": {height},
  "sampler_name": "Euler a",
  "restore_faces": false,
  "send_images": true,
  "save_images": false
}
```

### テンプレート：チェックポイントを指定したSDXL

SDXLは1024×1024前後で生成するため、このテンプレートではサイズを直接指定しています。`override_settings`ブロックがこのリクエストに限って指定のチェックポイントを読み込み、`override_settings_restore_afterwards`が完了後にWebUIの元のチェックポイントへ戻します。

```json
{
  "prompt": "{prompt}",
  "negative_prompt": "{negativePrompt}",
  "seed": {seed},
  "steps": {steps},
  "cfg_scale": {cfg},
  "width": 1024,
  "height": 1024,
  "sampler_name": "DPM++ 2M",
  "scheduler": "Karras",
  "restore_faces": false,
  "override_settings": {
    "sd_model_checkpoint": "your-sdxl-checkpoint.safetensors"
  },
  "override_settings_restore_afterwards": true,
  "send_images": true,
  "save_images": false
}
```

`your-sdxl-checkpoint.safetensors`を、WebUIに表示されるチェックポイント名に置き換えてください。WebUIは拡張子なしのファイル名も受け付けます。常に同じチェックポイントを使うなら、WebUIで一度読み込んでおき、`override_settings`を削除するほうが高速です。読み込み済みと異なるチェックポイントをリクエストが指定すると、WebUIがまずそれを読み込むため、毎回の生成時間が延びます。

### テンプレート：LoRAと固定の品質タグ

テンプレートに書いたテキストは、書いたとおりに送られます。これを、LoRAタグや常に付けたい品質タグに使い、Laylaの入力欄は画像ごとに変わる内容に使ってください。

```json
{
  "prompt": "masterpiece, best quality, <lora:MyStyle:0.8>, {prompt}",
  "negative_prompt": "{negativePrompt}",
  "seed": {seed},
  "steps": {steps},
  "cfg_scale": {cfg},
  "width": {width},
  "height": {height},
  "sampler_name": "Euler a",
  "restore_faces": false,
  "send_images": true,
  "save_images": false
}
```

ここで`MyStyle`は、WebUI上のLoRAの名前です。タグは大文字が保たれ、小文字に変換されるのは`{prompt}`の部分だけです。

### テンプレート：Hires fix

Hires fixは基本サイズで生成した後、結果を拡大して仕上げます。大きな1回目のパスで起こりがちな被写体の繰り返しを避けながら、より鮮明な画像が得られます。時間はかなり長くなります。

```json
{
  "prompt": "{prompt}",
  "negative_prompt": "{negativePrompt}",
  "seed": {seed},
  "steps": {steps},
  "cfg_scale": {cfg},
  "width": {width},
  "height": {height},
  "sampler_name": "Euler a",
  "restore_faces": false,
  "enable_hr": true,
  "hr_scale": 2,
  "hr_upscaler": "Latent",
  "hr_second_pass_steps": 10,
  "denoising_strength": 0.5,
  "send_images": true,
  "save_images": false
}
```

Laylaの既定テンプレートは`denoising_strength`を`0`にしており、Hires fixがオフなら問題ありません。オンにするときは`0.5`などの値を設定してください。そうしないと、2回目のパスで何も変わりません。512×512を基本サイズにして`hr_scale`を`2`にすると、1024×1024の画像になります。

## 安定して使うためのヒント

- **まずWebUIでテストする。** チェックポイント、サンプラー、サイズの組み合わせがWebUIのブラウザーページで動けば、同じ値がテンプレートでも動きます。WebUIの**PNG Info**タブでは、WebUIが作った画像の設定を確認できます。
- **PCをスリープさせない。** PCがスリープすると、スマートフォンに接続エラーが出ます。生成中はスリープをオフにしてください。
- **PCのアドレスを固定する。** ルーターがPCのアドレスを変えると、保存したエンドポイントが使えなくなります。ルーターの設定でPC用のアドレスを予約するか、変わったときにモデル一覧からエンドポイントを編集してください。
- **常に付けたい語句にはPrompt Prefixを使う。** 各プロンプトの前に追加され、プロンプトの他の部分と同様に小文字に変換されます。大文字小文字を区別するものは、テンプレートに書いてください。
- **チャットでもこの接続を使う。** Web UIモデルを作成すれば、Laylaの画像モデルや特定のキャラクターの画像モデルに設定できます。選択場所は[画像生成を有効にする方法](/ja/how-to-enable-image-generation-in-layla/)で説明しています。

## よくある質問

### AndroidスマートフォンでStable Diffusion WebUIを使うにはどうすればよいですか？

PCで`--api --listen`を付けてWebUIを起動し、LaylaのLocal Dreamミニアプリに、PCのアドレスと`/sdapi/v1/txt2img`を組み合わせたエンドポイントで**Web UI**モデルとして追加します。スマートフォンがプロンプトを送り、PCが画像を生成し、Laylaが表示します。スマートフォンのブラウザーでWebUIのページを開く方法もありますが、その場合はLaylaのチャットや画像ツールではなく、WebUI自身のページを使うことになります。

### AUTOMATIC1111のAndroidアプリはありますか？

AUTOMATIC1111はコンピューター上で動くWebインターフェースで、Androidアプリは提供されていません。LaylaがそのAndroidクライアントとして動作します。Web UIモデルがWebUIにtxt2imgリクエストを送って返ってきた画像を表示し、キャラクターもチャットでWebUIを利用できます。

### PCなしでAndroidでStable Diffusionを実行できますか？

できますが、コンピューター上のWebUIが必要なWeb UI接続ではできません。Laylaは端末上モデルで、PCもインターネット接続もなしに、スマートフォン上でStable Diffusionを実行できます。[画像生成を有効にする方法](/ja/how-to-enable-image-generation-in-layla/)で説明しています。

### Stable Diffusion WebUIのAPIを有効にするには？

WebUIを`--api`引数付きで起動します。通常は`webui-user.bat`または`webui-user.sh`の`COMMANDLINE_ARGS`に追加します。スマートフォンなどネットワーク上のほかのデバイスから接続できるよう、`--listen`も追加してください。動作は、WebUIのアドレスで`/docs`を開くと確認できます。

### Laylaに入力するStable Diffusion WebUI APIのエンドポイントは何ですか？

WebUIのアドレスに`/sdapi/v1/txt2img`を付けたもので、たとえば`http://192.168.1.50:7860/sdapi/v1/txt2img`です。`localhost`ではなく、ネットワーク上のPCのアドレスを使ってください。スマートフォンでは`localhost`はスマートフォン自身を指します。

### 外出先からスマートフォンでStable Diffusion WebUIにアクセスできますか？

スマートフォンがPCに接続できる場合のみ可能です。自宅なら同じWi-Fiで十分で、モバイルデータだけではPCに届きません。外出先からは、VPNなど自宅ネットワークへの専用接続が必要です。WebUIのAPIは既定でログインがないため、WebUIを直接インターネットに公開しないでください。外出先で設定なしに画像を作りたい場合は、Laylaの端末上モデルがモバイルデータでも、接続なしでも動作します。

### LaylaはForge、reForge、SD.Nextで動作しますか？

LaylaはAUTOMATIC1111形式のtxt2imgリクエストだけを送るため、`/sdapi/v1/txt2img`で同じリクエストを受け付けるサーバーなら動作する可能性があります。フォークによって受け付けるフィールドやサンプラー名が異なるので、お使いのものの`/docs`ページを確認してテンプレートを調整してください。

### WebUI APIでSDXL、別のチェックポイント、LoRA、別のサンプラーを使うには？

テンプレートを編集します。チェックポイントは`override_settings`の`"sd_model_checkpoint"`に追加し、LoRAタグは`prompt`の行に書き、`sampler_name`と`scheduler`はWebUIが一覧に表示する名前にします。SDXLのチェックポイントでは、`width`と`height`も1024前後にします。上のテンプレートに、それぞれの例があります。

### もっと大きな画像を生成するには？

テンプレートの`width`と`height`に固定の数値を設定します。LaylaのWeb UIモデルのサイズボタンは512×512だけで、その値が`{width}`と`{height}`に使われるため、それより大きくするにはテンプレートに固定の数値を書きます。SDXLのチェックポイントでは1024×1024前後にします。SD 1.5のチェックポイントで細部を増やしたいときは、Hires fixをオンにしてください。

### 画像生成が「Failed to generate image」で失敗するのはなぜですか？

Laylaはこの文言の後に、WebUIのステータスコードとメッセージを表示します。そこから原因がわかります。`404`は通常、APIが有効になっていないか、エンドポイントのパスの綴りが違うという意味なので、`--api`と`txt2img`を確認してください。`422`は、WebUIがリクエスト本文を拒否したことを意味します。フィールドの型が違う、名前の綴りが違う、JSONが無効などの原因が考えられます。`500`は、WebUIが生成中にエラーになったことを意味し、PC上のコンソールウィンドウに、不明なサンプラーやメモリ不足などの理由が表示されます。

### スマートフォンがStable Diffusion WebUIに接続できないのはなぜですか？（network request failed）

スマートフォンがPCに到達できませんでした。WebUIが起動していること、`--listen`付きで起動したこと、スマートフォンとPCが同じネットワークにあること、エンドポイントのIPアドレスが最新であること、ファイアウォールがポート`7860`を許可していることを確認してください。最も手早いのは、スマートフォンのブラウザーでWebUIのアドレスを開いてみることです。

### Laylaに「No images returned」と表示されるのはなぜですか？

WebUIは正常に応答しましたが、レスポンスに画像リストが含まれていませんでした。テンプレートで`send_images`が`true`になっていること、`alwayson_scripts`の中に画像の返却を妨げるものがないことを確認してください。

### LoRAが無視されるのはなぜですか？

Laylaはプロンプトを小文字に変換するため、プロンプト欄に入力したLoRAタグが、大文字を含む名前と一致しなくなることがあります。タグをテンプレートの`prompt`行に書けばそのまま送られるので、そちらに入れ、名前がWebUI上のものと一致していることを確認してください。

### WebUI経由の画像生成はプライベートですか？

プロンプトと画像は、スマートフォンからネットワーク経由で自分のPCへ送られ、Laylaがオンラインサービスに送ることはありません。リモートアクセスを自分で設定しない限り、ネットワークの外には出ません。PCがまったく不要な生成には、[画像生成を有効にする方法](/ja/how-to-enable-image-generation-in-layla/)で説明しているLaylaの端末上モデルを使ってください。

### チャットでキャラクターに画像を送らせるために使えますか？

はい。Web UIモデルはほかの画像モデルと同じ画像モデルです。Inference Settingsで既定の画像生成モデルに選ぶか、キャラクターエディターの**Advanced**タブで特定のキャラクター用に選択します。キャラクターが画像を生成するとき、PCが起動していてWebUIが動作している必要があります。

## まとめ

Web UIモデルを使えば、PC上のAUTOMATIC1111環境がLaylaの画像生成エンジンになり、AndroidでStable Diffusion WebUIを使えます。WebUIには`--api`と`--listen`が必要で、Local Dreamには`txt2img`エンドポイントのアドレスが必要です。それ以外のこと、つまりチェックポイント、サンプラー、サイズ、LoRA、Hires fixは、リクエストテンプレートが決めます。構成ごとに短いテンプレートを用意し、別々の接続として保存しておけば、モデル一覧から切り替えられます。

Laylaはオフラインで使えるAndroid向けAIアシスタントとして作られており、PCもネットワークもなしにスマートフォンでStable Diffusionを実行するには、端末上モデルを使います。WebUI接続は、自分のコンピューターにすでにStable Diffusion環境があり、それをチャットやLocal Dreamで使いたい場合のためのものです。
