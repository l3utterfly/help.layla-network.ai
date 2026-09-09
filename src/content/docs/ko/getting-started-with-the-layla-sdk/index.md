---
title: Layla SDK 시작하기
description: Layla SDK를 설치하고 에이전트 스킬을 활용해, 브라우저 목으로 동작하는 스트리밍 HTML 미니 앱을 만든 뒤 Layla의 온디바이스 AI에 연결하는 방법.
category: Layla SDK
order: 10
keywords:
  - Layla SDK
  - "@layla-network/sdk"
  - Layla 미니 앱
  - Layla SDK 에이전트 스킬
  - WebView SDK
  - 로컬 AI SDK
lastUpdated: 2026-08-30
translationKey: getting-started-with-the-layla-sdk
ai_translated: true
---

**Layla SDK는 Layla 안에서 사용할 수 있는 AI 기능을 활용하는 미니 앱을 만들기 위한 TypeScript·JavaScript 라이브러리입니다.** 미니 앱은 활성 모델의 채팅을 스트리밍하고, 캐릭터와 메모리를 다루고, 이미지나 음악을 생성하고, 음성을 사용하고, 비공개 앱 데이터를 저장할 수 있습니다. API 키를 설정하거나 AI 서버를 실행할 필요가 없습니다.

이 문서에서는 SDK를 어디서 받을 수 있는지, 코딩 에이전트에 에이전트 스킬을 어떻게 제공하는지, 그리고 Layla에서 응답을 스트리밍하는 작은 HTML 미니 앱을 어떻게 만드는지 설명합니다.

## 기존 미니 앱 둘러보기

자신의 프로젝트를 시작하기 전에 다른 사람들이 만든 것을 보고 싶다면 [Layla Cloud Apps](https://apps.layla-cloud.com/)를 둘러보세요. 기존 미니 앱을 살펴보면 Layla에 어울리는 인터페이스와 흐름을 파악할 수 있고, 그중에서 첫 작업으로 삼을 작은 아이디어를 고를 수 있습니다.

## Layla SDK의 작동 방식

Layla 미니 앱은 Layla의 React Native WebView 안에서 실행되는 웹 앱입니다. 코드가 SDK 메서드를 호출하면 SDK가 WebView 브리지를 통해 메시지를 보냅니다. Layla 호스트가 기기에서 작업을 수행하고 결과를 돌려줍니다.

```text
Mini-app -> Layla SDK -> WebView bridge -> Layla host -> on-device model
```

따라서 이 SDK는 일반적인 클라우드 API 클라이언트가 아닙니다.

- 설정할 API 키, 기본 URL, HTTP 엔드포인트가 없습니다.
- 활성 모델과 추론 엔진은 Layla 호스트가 선택합니다.
- 실제 SDK 호출은 호스트 브리지를 사용할 수 있는 Layla 안에서 작동합니다.
- 일반적인 브라우저 개발 중에는 대신 SDK의 목 호스트를 설치합니다.

로컬 모델 생성은 휴대전화에서 시간이 걸릴 수 있습니다. 대화형 기능에는 스트리밍을 사용하고, 작업 중 상태를 분명히 보여주며, 사용자가 생성을 중단할 수 있는 방법을 제공하세요.

코드를 작성하기 전에 배경 지식을 더 얻고 싶다면 [Layla 미니 앱이란?](/post-what-are-layla-mini-apps-codekitty/)을 읽어보세요.

## SDK를 받는 곳

SDK는 [npm의 `@layla-network/sdk`](https://www.npmjs.com/package/@layla-network/sdk)로 배포됩니다. 기존 JavaScript 또는 TypeScript 프로젝트에는 다음 명령으로 설치합니다.

```bash
npm install @layla-network/sdk
```

[Layla SDK 저장소](https://github.com/l3utterfly/layla-sdk)에는 소스 코드, API 레퍼런스, 패키징 관련 안내, 예제 미니 앱이 들어 있습니다.

![소스, 문서, 예제, 에이전트 스킬 폴더가 보이는 Layla SDK의 GitHub 저장소.](./github.png)

컴포넌트, 여러 소스 파일, 더 많은 애플리케이션 상태가 필요한 앱을 위한 공식 [React·TypeScript·Vite 스타터 프로젝트](https://github.com/l3utterfly/layla-miniapp-template)도 있습니다.

작은 앱에서 중요한 임포트는 다음과 같습니다.

```js
import { LaylaSDK } from "@layla-network/sdk";

const layla = new LaylaSDK();
```

클라이언트는 하나만 만들어 앱 전체에서 재사용하세요.

## Layla SDK 에이전트 스킬 사용하기

SDK 프로젝트는 에이전트 스킬도 함께 배포합니다. Codex, Claude Code, OpenCode 같은 코딩 에이전트를 위한 문서 묶음으로, SDK의 공개 메서드, WebView 런타임, 로컬 목, 패키징 규칙, 자주 발생하는 오류를 에이전트에게 알려줍니다.

스킬과 npm 패키지는 역할이 다릅니다. 스킬은 코딩 에이전트가 앱을 작성하도록 돕고, `@layla-network/sdk`는 앱 자체에 포함되는 라이브러리입니다.

스킬을 사용하는 방법은 다음과 같습니다.

1. [Layla SDK 에이전트 스킬 릴리스](https://github.com/l3utterfly/layla-sdk/releases?q=agent+skill&expanded=true)를 엽니다.
2. 해당하는 최신 릴리스에서 에이전트 스킬 ZIP을 내려받습니다.
3. 사용하는 코딩 에이전트의 스킬 도입 절차에 따라 그 ZIP을 가져오거나 설치합니다.
4. 코딩 에이전트에서 미니 앱 프로젝트를 엽니다.
5. 프롬프트에서 스킬 이름을 지정하고 앱의 동작을 설명합니다.

예를 들면 다음과 같습니다.

```text
Use the layla-sdk skill to build a self-contained Layla mini-app.
Create a simple writing prompt generator that streams its response,
shows a working state, has a Stop button, uses the Layla mock during
local development, and builds to an index.html with app.json at the
root of the output.
```

에이전트에게 SDK의 모든 메서드를 보여달라고 하기보다, 사용자 경험을 구체적으로 지정하세요. 목적이 분명한 첫 버전이 휴대전화에서 시험하기 쉽습니다. 캐릭터, 이미지, 음성, 저장소, 컨텍스트 채팅은 이후 반복에서 추가하면 됩니다.

## 작은 HTML 미니 앱 만들기

아래 예제는 프롬프트 입력란, **Ask Layla** 버튼, 스트리밍되는 답변, **Stop** 버튼이 있는 페이지를 만듭니다. Vite가 SDK 임포트를 처리하고, `vite-plugin-singlefile`이 프로덕션 JavaScript와 CSS를 하나의 `index.html`에 담습니다.

Node.js와 npm이 필요합니다. 프로젝트를 만들고 의존성을 설치하세요.

```bash
mkdir hello-layla
cd hello-layla
npm init -y
npm install @layla-network/sdk
npm install --save-dev vite vite-plugin-singlefile
npm pkg set scripts.dev="vite" scripts.build="vite build" scripts.preview="vite preview"
```

다음 구조를 만듭니다.

```text
hello-layla/
  public/
    app.json
  src/
    main.js
  index.html
  package.json
  vite.config.js
```

### 미니 앱 메타데이터 추가하기

`public/app.json`을 만듭니다.

```json
{
  "title": "Hello Layla",
  "tagline": "Ask the on-device model for a short answer.",
  "description": "A small starter mini-app built with the Layla SDK."
}
```

Vite는 `public`의 파일을 `dist` 최상위로 복사하므로, 빌드된 패키지의 루트에는 `app.json`과 `index.html`이 함께 놓입니다.

### 페이지 만들기

`index.html`을 만듭니다.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Hello Layla</title>
    <style>
      :root {
        color: #f4f3f8;
        background: #111017;
        font-family: system-ui, sans-serif;
      }

      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
      }

      main {
        width: min(42rem, calc(100% - 2rem));
      }

      textarea,
      pre {
        box-sizing: border-box;
        width: 100%;
        padding: 1rem;
        border: 1px solid #3a3744;
        border-radius: 0.75rem;
        color: inherit;
        background: #1b1922;
      }

      textarea {
        min-height: 7rem;
        resize: vertical;
      }

      pre {
        min-height: 9rem;
        white-space: pre-wrap;
      }

      .actions {
        display: flex;
        gap: 0.75rem;
        margin: 0.75rem 0;
      }

      button {
        padding: 0.7rem 1rem;
        border: 0;
        border-radius: 999px;
        font: inherit;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Hello Layla</h1>
      <p>Ask the model running through your selected Layla inference engine.</p>

      <label for="prompt">Prompt</label>
      <textarea id="prompt">Give me one practical writing tip.</textarea>

      <div class="actions">
        <button id="send">Ask Layla</button>
        <button id="stop" disabled>Stop</button>
      </div>

      <p id="status" aria-live="polite">Ready.</p>
      <pre id="answer" aria-live="polite">The response will appear here.</pre>
    </main>

    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

### 페이지를 Layla에 연결하기

`src/main.js`를 만듭니다.

```js
import {
  LaylaAbortError,
  LaylaBridgeUnavailableError,
  LaylaError,
  LaylaSDK,
  installLaylaMock,
} from "@layla-network/sdk";

if (import.meta.env.DEV) {
  installLaylaMock({
    respond: (messages) =>
      `Mock response to: ${messages.at(-1)?.content ?? ""}`,
  });
}

const layla = new LaylaSDK();
const promptInput = document.querySelector("#prompt");
const sendButton = document.querySelector("#send");
const stopButton = document.querySelector("#stop");
const status = document.querySelector("#status");
const answer = document.querySelector("#answer");

let activeStream = null;

sendButton.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();
  if (!prompt || activeStream) return;

  answer.textContent = "";
  status.textContent = "Layla is thinking…";
  sendButton.disabled = true;
  stopButton.disabled = false;

  const stream = layla.chat.completions.stream({
    messages: [{ role: "user", content: prompt }],
  });

  activeStream = stream;

  stream.on("content", (_delta, snapshot) => {
    answer.textContent = snapshot;
  });

  try {
    await stream.finalContent();
    status.textContent = "Finished.";
  } catch (error) {
    if (error instanceof LaylaAbortError) {
      status.textContent = "Stopped.";
    } else if (error instanceof LaylaBridgeUnavailableError) {
      status.textContent = "Open this mini-app inside Layla.";
    } else if (error instanceof LaylaError) {
      status.textContent = error.message;
    } else {
      console.error(error);
      status.textContent = "Something went wrong.";
    }
  } finally {
    activeStream = null;
    sendButton.disabled = false;
    stopButton.disabled = true;
  }
});

stopButton.addEventListener("click", () => {
  activeStream?.abort();
});
```

목은 Vite가 개발 모드로 실행될 때만 설치됩니다. 프로덕션 빌드에서는 설치되지 않으므로, Layla 안에서 이루어지는 호출은 실제 호스트 브리지로 전달됩니다.

### 앱을 하나의 HTML 파일로 묶기

`vite.config.js`를 만듭니다.

```js
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [viteSingleFile()],
  build: {
    assetsInlineLimit: Infinity,
  },
});
```

이 설정은 번들된 JavaScript와 CSS를 페이지 안에 인라인으로 넣습니다. `app.json`을 포함한 `public`의 파일은 생성된 `index.html` 옆에 그대로 복사됩니다.

## 브라우저에서 테스트하기

개발 서버를 시작합니다.

```bash
npm run dev
```

Vite가 출력한 로컬 주소를 열고 **Ask Layla**를 선택하세요. 목 응답이 점진적으로 나타나야 합니다. 이는 페이지, 이벤트 핸들러, 스트리밍 UI를 확인하는 것이며 실제 모델을 실행하지는 않습니다.

개발용 목을 제거하고 일반 브라우저에서 페이지를 열면 SDK가 `LaylaBridgeUnavailableError`를 보고합니다. Layla의 WebView 브리지가 없기 때문에 예상된 동작입니다.

## 미니 앱 빌드 및 가져오기

프로덕션 파일을 만듭니다.

```bash
npm run build
```

`dist` 폴더에는 다음이 들어 있어야 합니다.

```text
dist/
  app.json
  index.html
```

`dist` 디렉터리 자체가 아니라 `dist`의 **내용**을 압축하세요. `app.json`과 `index.html`은 상위 폴더 없이 ZIP의 루트에 있어야 합니다. 그 ZIP을 Layla의 미니 앱 가져오기 절차로 불러온 뒤 **Hello Layla**를 열고 프롬프트를 보내보세요.

Layla가 선택된 모델을 기기에서 실행하기 때문에 실제 응답은 브라우저 목보다 느리게 도착할 수 있습니다. 페이지는 내용이 갱신될 때마다 스트리밍하고 Stop 버튼을 `stream.abort()`에 연결해 두므로, 생성 중에도 계속 반응합니다.

## 첫 프로젝트에서 흔히 겪는 문제

### SDK가 브리지를 사용할 수 없다고 하는 이유는 무엇인가요?

`installLaylaMock(...)` 없이 일반 브라우저에서 앱을 실행했거나, Layla의 WebView 안에서 실행하고 있지 않기 때문입니다. 로컬 개발에서는 첫 SDK 호출 전에 목을 설치하고, 개발 모드에서만 동작하는 조건으로 감싸 두세요.

### 가져온 미니 앱에 메타데이터가 없는 이유는 무엇인가요?

`app.json`이 유효한 JSON인지, 그리고 가져온 ZIP의 루트에 있는지 확인하세요. `public`이나 `dist`, 다른 상위 폴더가 아니라 `index.html` 옆에 있어야 합니다.

### SDK에서 모델을 선택해야 하나요?

아닙니다. Layla 호스트가 활성 추론 엔진을 사용합니다. 미니 앱이 이 선택을 명시적으로 제공해야 하는 경우의 추론 엔진 목록 조회와 변경은 이후 문서에서 다룰 수 있습니다.

### 모든 미니 앱은 HTML 파일 하나여야 하나요?

소스 프로젝트는 필요한 만큼 파일을 가질 수 있습니다. 자체 완결형 `index.html`은 오프라인 미니 앱을 배포하기에 편리한 형식일 뿐입니다. 규모가 큰 프로젝트라면 공식 [Layla 미니 앱 템플릿](https://github.com/l3utterfly/layla-miniapp-template)에서 시작하고, 빌드 단계에서 단일 파일 출력을 만들도록 하세요.

## 다음 단계

이 스타터는 스트리밍 채팅만 사용하지만, 같은 클라이언트에서 캐릭터, 컨텍스트 채팅 이벤트, 메모리, 페르소나, 음성 합성, 음성 인식, 백그라운드 오디오, 이미지 및 음악 생성, 비공개 SQLite 데이터베이스, 비공개 파일 유틸리티도 사용할 수 있습니다. 이 카테고리의 나머지 문서가 각 영역을 개별 튜토리얼로 정리하기 전까지는 [SDK API 레퍼런스와 예제](https://github.com/l3utterfly/layla-sdk)가 가장 정확한 기준입니다.
