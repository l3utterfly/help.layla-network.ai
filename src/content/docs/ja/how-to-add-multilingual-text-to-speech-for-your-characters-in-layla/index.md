---
title: Laylaのキャラクターに多言語テキスト読み上げを追加する方法
description: SherpaTTSを使用して、Laylaで多言語テキスト読み上げを有効にする方法を説明します。
category: Characters & voice
order: 60
keywords:
  - 多言語テキスト読み上げ
  - SherpaTTS
  - キャラクター音声
  - Android TTS
  - オフライン音声
lastUpdated: 2026-05-11
translationKey: how-to-add-multilingual-text-to-speech-for-your-characters-in-layla
ai_translated: true
---

LaylaのデフォルトのTTSミニアプリは、すべて英語で動作します。ただし、Androidでは多言語のテキスト読み上げを簡単に追加できます。

Laylaは、インターネットに接続するローカルのテキスト読み上げアプリSherpaTTSに対応しています。

**手順1：SherpaTTSをダウンロードする**

[F-Droid](https://f-droid.org/en/packages/org.woheller69.ttsengine/)からアプリをダウンロードします。

![F-DroidのSherpaTTSページでDownload APKリンクを指している赤い矢印。](./fdroid-download-apk.png)

**バージョン**セクションまで下にスクロールし、最新のAPKをダウンロードします。

_F-Droidは、**フリーかつオープンソース（FOSS）__のアプリを公開するGoogle Playの代替サービスです。_

**手順2：SherpaTTSを設定する**

SherpaTTSアプリをダウンロードしたら、アプリを開いて設定します。

![モデル追加ボタンが丸で囲まれたSherpaTTS画面。](./sherpatts-add-model.jpg)

プラス記号をタップして新しいモデルを追加します。

モデルの一覧が表示されます。

![PiperモデルとCoquiモデルが並ぶSherpaTTSの言語ダウンロード画面。](./sherpatts-download-language.jpg)

使用する言語をダウンロードします。言語は2文字の国コードで表示されます。たとえば、ドイツ語は「de」、フランス語は「fr」です。

ダウンロード後に**開始**をタップすると、モデルが読み込まれます。

**手順3：SherpaTTSをスマートフォンのデフォルトTTSモデルに設定する**

SherpaTTSのメイン画面で設定アイコンをタップします。

![設定ボタンを指す矢印が表示されたSherpaTTS画面。](./sherpatts-settings.jpg)

Androidのシステム設定が開きます。**デフォルトのテキスト読み上げ**設定をタップします。

![優先エンジンが丸で囲まれたAndroidのテキスト読み上げ設定。](./android-tts-preferred-engine.jpg)

デフォルトのエンジンをSherpaTTSに変更します。

![SherpaTTSが選択され丸で囲まれたAndroidの優先エンジン画面。](./select-sherpatts-engine.jpg)

これでデフォルトの音声にSherpaが使用されます。

**手順4：Laylaを設定する**

Laylaはこの設定を自動的に読み取り、選択した音声を使用可能にします。_（変更を反映するにはLaylaを再起動してください。）_

キャラクターの設定（**キャラクターを編集** → **詳細**タブ）を開きます。

![詳細タブの音声設定が丸で囲まれたLaylaのキャラクター作成画面。](./layla-character-advanced-voice.jpg)

**ネイティブ**セクションで新しい音声を選択します。

![ネイティブフィルターとインストール済み音声が丸で囲まれたLaylaの音声選択画面。](./layla-native-voices.jpg)

Sherpaからインストールした音声がすべてここに表示されます。

これでキャラクターが複数の言語で話せるようになります。
