---
title: 미니 앱에서 백그라운드 작업 실행하기
description: task.js가 Layla 미니 앱에서 주기적인 백그라운드 작업을 실행하고, 미리 로드된 SDK를 사용하고, 결과를 기록하고, WebView 앱과 로직을 안전하게 공유하는 방법을 알아봅니다.
category: Layla SDK
order: 20
keywords:
  - Layla SDK
  - task.js
  - Layla 미니 앱 백그라운드 작업
  - QuickJS
  - Vite 태스크 빌드
  - 백그라운드 JavaScript
lastUpdated: 2026-08-30
translationKey: running-background-tasks-in-your-mini-app
ai_translated: true
---

**`task.js` 파일은 Layla 미니 앱에 한 번만 실행되는 JavaScript 작업을 부여하며, Layla는 미니 앱의 WebView를 열지 않고도 이 작업을 주기적으로 백그라운드에서 실행할 수 있습니다.** 이 작업은 격리된 런타임에서 실행되고, 바로 사용할 수 있는 Layla SDK 클라이언트를 전달받으며, 사용자가 Layla의 작업 관리자에서 확인할 수 있는 결과를 반환할 수 있습니다.

이 문서에서는 실행 모델을 설명하고, 작은 독립 작업을 보여준 뒤, 생성된 `task.js`를 구성합니다. 이를 통해 규모가 큰 미니 앱도 같은 워크플로를 인터페이스와 백그라운드 작업에서 함께 재사용할 수 있습니다.

작업 관리자는 활성 작업과 비활성 작업을, 백그라운드 작업을 제공하지 않는 설치된 미니 앱과 구분해 보여줍니다. 활성 작업마다 수동 실행, 로그, 생성된 소스를 한곳에서 제공합니다.

![Layla 작업 관리자. Dream이 활성 미니 앱 작업으로 표시되고, 비활성화된 진단 작업과 백그라운드 작업이 없는 설치된 미니 앱들이 함께 보인다.](./task-manager.jpg)

미니 앱 개발이 처음이라면 [Layla SDK 시작하기](/getting-started-with-the-layla-sdk/)부터 읽어보세요.

## `task.js`란?

`task.js`는 패키징된 Layla 미니 앱의 루트에 두는 선택적 파일로, `app.json` 및 `index.html`과 같은 위치에 놓입니다.

```text
my-mini-app/
  app.json
  index.html
  task.js
  icon.png
```

Layla가 이 파일을 발견하면 해당 미니 앱이 작업 관리자에 나타납니다. 사용자는 작업을 수동으로 실행하고, 백그라운드 실행을 켜거나 끄고, 가장 최근 실행의 결과와 로그를 살펴볼 수 있습니다.

작업은 계속 돌아가는 서비스가 아닙니다. Layla는 작업을 시작해 최종 값이나 프로미스가 정해질 때까지 기다리고, 결과를 기록한 뒤 런타임을 폐기합니다. 주기적인 백그라운드 작업을 언제 시도할지는 호스트가 결정하므로, `task.js`는 유용한 한 번의 처리를 마치고 종료해야 합니다. 자체 스케줄러나 폴링 루프를 안에 두지 마세요.

그래서 `task.js`는 다음과 같은 작업에 적합합니다.

- 최근 채팅이나 메모리를 읽고 요약을 저장하기.
- 다음에 미니 앱을 열 때를 위해 캐시된 데이터 갱신하기.
- 미니 앱 데이터베이스에 구조화된 레코드를 만들거나 갱신하기.
- 메시지를 생성해 나중에 보내도록 예약하기.
- 처리가 필요한 캐릭터를 확인하고 각각 한 번씩 처리하기.

## Layla가 백그라운드 작업을 실행하는 방식

WebView 환경과 작업 환경은 같은 SDK 프로토콜을 사용하지만 서로 다른 런타임입니다.

Layla는 작업을 실행할 때 다음 과정을 거칩니다.

1. 해당 미니 앱으로 범위가 한정된 새 QuickJS 런타임을 만듭니다.
2. Layla SDK를 미리 로드하고 호스트에 연결합니다.
3. 미니 앱의 `task.js`를 일반 JavaScript 스크립트로 평가합니다.
4. 스크립트의 완료 값이 프로미스라면 기다립니다.
5. 실행 성공 여부, 소요 시간, 출력, 버퍼링된 콘솔 로그를 기록합니다.
6. 런타임을 파기합니다.

백그라운드 큐는 Layla가 포그라운드에 있지 않을 때 대상이 되는 미니 앱 작업을 실행합니다. 비활성 작업은 건너뜁니다. 수동 실행도 동일한 격리 실행 모델을 사용합니다.

실행할 때마다 처음부터 시작하므로, 한 실행에서 선언한 변수는 다음 실행에 존재하지 않습니다. 지속되어야 하는 상태는 SDK를 통해 저장하세요. 구조화된 데이터에는 `layla.db.executeSql(...)`이 좋은 기본 선택입니다. 작업과 WebView 앱은 같은 비공개 미니 앱 저장소를 사용하므로, 인터페이스가 백그라운드 작업이 저장한 내용을 읽을 수 있습니다.

## Layla SDK는 이미 사용할 수 있습니다

최종 `task.js`에서 `@layla-network/sdk`를 임포트하지 마세요. Layla는 코드가 실행되기 전에 SDK를 주입하고 다음 전역 객체를 제공합니다.

- `layla`: 바로 사용할 수 있는 SDK 클라이언트.
- `Layla`: SDK 클라이언트 클래스.
- `LaylaError`, `LaylaAbortError`, `LaylaBridgeUnavailableError`: SDK 오류 클래스.

대부분의 작업에서는 기존 `layla` 인스턴스를 그대로 사용하세요.

```js
const characters = await layla.characters.list(0, 10);
```

다만 이 줄은 비동기 함수 안에 있어야 합니다. `task.js`는 ES 모듈이 아니라 일반 스크립트로 평가되므로 최상위 `await`, `import`, `export`, `require(...)`는 사용할 수 없습니다. 비동기 작업은 즉시 실행 비동기 함수 표현식(async IIFE)으로 감싸고, 그 프로미스를 파일의 마지막 표현식으로 두세요.

이 런타임은 브라우저도 아닙니다. DOM, `document`, `fetch`, `XMLHttpRequest`, `localStorage`, `setTimeout`, `setInterval`이 없습니다. 프로미스, `async`/`await`, `queueMicrotask`, `JSON`, SDK 호출은 정상적으로 동작합니다.

화면 없이도 의미가 있는 SDK 메서드를 우선 사용하세요. 스트리밍하지 않는 채팅 완성, 캐릭터, 메모리, 예약 메시지, 감정 분류, 비공개 파일, 비공개 SQLite 데이터베이스 등입니다. 마이크 입력, TTS 재생, 백그라운드 오디오처럼 UI나 기기 상호작용이 필요한 흐름은 피하세요. 작업이 끝나면 런타임이 사라지므로 오래 유지되는 이벤트 리스너도 적합하지 않습니다.

## 간단한 `task.js` 예제

이 작업은 캐릭터 목록의 첫 페이지를 세고, 실행할 때마다 미니 앱의 비공개 데이터베이스에 기록합니다.

```js
// task.js — the host has already created the global `layla` client.
console.info("Character snapshot task starting.");

(async () => {
  const ranAt = Date.now();
  const characters = await layla.characters.list(0, 10);

  await layla.db.executeSql(
    "CREATE TABLE IF NOT EXISTS character_snapshots (" +
      "id INTEGER PRIMARY KEY, ran_at INTEGER, character_count INTEGER)",
  );

  await layla.db.executeSql(
    "INSERT INTO character_snapshots (ran_at, character_count) VALUES (?, ?)",
    [ranAt, characters.length],
  );

  console.info(`Recorded ${characters.length} characters.`);

  return {
    status: "ok",
    ranAt,
    characterCount: characters.length,
  };
})();
```

async IIFE를 의도적으로 마지막 표현식으로 두었습니다. Layla는 그 프로미스를 기다린 뒤 반환된 객체를 실행 출력으로 기록합니다. 반환 값은 JSON으로 직렬화할 수 있게 유지하세요. 프로미스가 거부되거나 오류가 발생하면 해당 실행은 실패로 표시되며, `console.log`, `console.info`, `console.debug`, `console.warn`, `console.error`로 출력한 내용은 실행 로그에 버퍼링됩니다.

로그는 실시간으로 스트리밍되지 않고 실행이 끝난 뒤에 표시됩니다. 로그는 간결한 진행 지점과 진단용 정보에 쓰고, 기계가 읽을 최종 요약에는 반환 값을 사용하세요.

## 워크플로가 복잡하면 `task.js`를 생성하세요

작은 작업이라면 `task.js`를 직접 작성해도 됩니다. 다만 백그라운드 작업이 화면에 보이는 미니 앱과 동일한 선택·프롬프트·검증·저장 로직을 사용해야 한다면 손으로 작성하기가 번거로워집니다.

실제로 동작하는 Layla 미니 앱인 Dream은 별도의 태스크 진입점과 빌드 설정을 사용합니다. 태스크 진입점은 메인 애플리케이션 소스에서 공용 워크플로 모듈과 프롬프트 모듈을 임포트합니다. Vite가 그 임포트를 따라가며 공용 코드를 포함한 하나의 독립적인 `dist/task.js`를 생성합니다. 생성된 산출물에는 임포트가 없지만, 소스는 평범하고 유지보수 가능한 모듈로 나뉜 채 유지됩니다.

핵심 설계 결정은 의존성 주입입니다. 공용 코드는 Layla 클라이언트를 직접 만들지 않고 전달받습니다. WebView는 자신이 임포트한 SDK 클라이언트를 넘기고, 작업은 호스트가 제공한 전역 `layla` 클라이언트를 넘깁니다.

먼저 공용 워크플로부터 시작합니다.

```ts
// src/lib/recordCharacterSnapshot.ts
import type LaylaSDK from "@layla-network/sdk";

export async function recordCharacterSnapshot({
  layla,
  ranAt = Date.now(),
}: {
  layla: LaylaSDK;
  ranAt?: number;
}) {
  const characters = await layla.characters.list(0, 10);

  await layla.db.executeSql(
    "CREATE TABLE IF NOT EXISTS character_snapshots (" +
      "id INTEGER PRIMARY KEY, ran_at INTEGER, character_count INTEGER)",
  );
  await layla.db.executeSql(
    "INSERT INTO character_snapshots (ran_at, character_count) VALUES (?, ?)",
    [ranAt, characters.length],
  );

  return { status: "ok", ranAt, characterCount: characters.length };
}
```

타입 전용 임포트는 TypeScript가 공용 함수를 검사하는 데 도움이 되고, 컴파일된 JavaScript에서는 사라집니다. 화면에 보이는 미니 앱은 평소 쓰던 SDK 인스턴스로 같은 함수를 호출할 수 있습니다.

```ts
// src/main.ts
import LaylaSDK from "@layla-network/sdk";
import { recordCharacterSnapshot } from "./lib/recordCharacterSnapshot";

const layla = new LaylaSDK();

document.querySelector("#refresh")?.addEventListener("click", async () => {
  const result = await recordCharacterSnapshot({ layla });
  console.log(result);
});
```

그다음 작은 태스크 진입점을 만듭니다. 개발 중에는 공용 소스를 임포트하지만, 빌드가 그 모듈 경계를 제거합니다.

```js
// src/task-entry.js
import { recordCharacterSnapshot } from "./lib/recordCharacterSnapshot";

console.info("Character snapshot background task starting.");

(async () => {
  return recordCharacterSnapshot({ layla });
})();
```

이 진입점에는 전용 Vite 빌드를 지정합니다.

```ts
// vite.task.config.ts
import { defineConfig } from "vite";

export default defineConfig({
  publicDir: false,
  build: {
    target: "es2020",
    outDir: "dist",
    emptyOutDir: false,
    copyPublicDir: false,
    minify: false,
    lib: {
      entry: "src/task-entry.js",
      formats: ["es"],
      fileName: () => "task.js",
    },
  },
});
```

먼저 일반 WebView 빌드를 실행한 다음 태스크 빌드를 실행하세요.

```json
{
  "scripts": {
    "build": "vite build && vite build --config vite.task.config.ts",
    "build:task": "vite build --config vite.task.config.ts"
  }
}
```

`emptyOutDir: false`는 첫 빌드가 만든 `index.html`, `app.json`, 애셋을 그대로 보존합니다. 두 번째 빌드가 그 옆에 `dist/task.js`를 추가합니다.

`@layla-network/sdk`의 런타임 임포트는 작업의 의존성 그래프에 들어가지 않게 하세요. 타입 전용 임포트는 괜찮지만, 생성된 작업은 또 다른 SDK 클라이언트를 번들에 넣는 대신 주입된 클라이언트를 사용해야 합니다. 규모가 큰 앱에서는 DOM 갱신, React 상태, 브라우저 저장소, 스트리밍 UI 같은 WebView 전용 코드를 공용 워크플로 밖에 두세요.

Dream은 이 분리를 더 큰 규모로 적용합니다. 소스 쪽 작업은 화면 없는 데이터 로딩과 조율을 담당하고, 공용 모듈이 캐릭터 메시지를 고르고 예약하는 워크플로를 담습니다. 프로덕션 `task.js`는 이 소스들로부터 생성되므로, 공용 워크플로를 고치면 화면에 보이는 동작과 백그라운드 작업 모두에 반영됩니다.

## 생성된 산출물 검증하기

`src/task-entry.js`만이 아니라 Layla가 실제로 실행할 파일을 테스트하세요.

빌드한 뒤 `dist/task.js`가 다음 조건을 만족하는지 확인합니다.

- `app.json`, `index.html`과 함께 패키지 루트에 있는가.
- `import`, `export`, `require(...)` 문이 없는가.
- 런타임에 `@layla-network/sdk`를 번들하거나 참조하지 않는가.
- 프로미스를 만드는 async IIFE가 완료 표현식으로 끝에 있는가.
- 브라우저 API, 타이머, `fetch`를 호출하지 않는가.
- 성공하는 모든 경로에서 JSON으로 직렬화 가능한 값을 반환하는가.

복잡한 작업이라면 가짜 전역 `layla` 객체로 `dist/task.js`를 평가하는 작은 테스트 하네스를 추가하세요. Dream 미니 앱은 이 방식으로 생성된 산출물을 실행해 보고, SDK 요청을 기록하고, 유휴 경로와 예약 성공 경로를 모두 검증합니다. 번들을 테스트하면 남아 있는 임포트나 최종 값이 워크플로 프로미스가 아닌 태스크 진입점처럼, 소스 수준 단위 테스트가 놓치는 문제를 잡아낼 수 있습니다.

## 자주 묻는 질문

### `task.js`는 미니 앱 WebView 안에서 실행되나요?

아닙니다. 새로 만들어진 격리 QuickJS 런타임에서 실행됩니다. 페이지나 React 상태, DOM에는 접근할 수 없지만 미리 로드된 Layla SDK는 사용할 수 있습니다.

### `task.js`에서 `LaylaSDK`를 임포트해야 하나요?

아닙니다. 주입된 전역 `layla` 인스턴스를 사용하세요. 공용 TypeScript 모듈에서는 컴파일 시 제거되므로 타입 전용 SDK 임포트는 괜찮습니다.

### 작업과 인터페이스 사이에서 데이터를 공유하려면 어떻게 하나요?

미니 앱의 비공개 SDK 저장소를 사용하세요. 구조화된 상태에는 `layla.db.executeSql(...)`이 잘 맞고, 문서 형태의 설정이나 생성된 파일에는 SDK의 비공개 파일 유틸리티가 적합합니다. 두 실행 모두 같은 미니 앱 범위에 속합니다.

### 작업이 `setTimeout`으로 나중까지 기다릴 수 있나요?

아닙니다. 타이머를 사용할 수 없고, 백그라운드 작업은 한 번의 처리를 마쳐야 합니다. 현재 작업을 끝낸 뒤 반환하세요. 나중에 보낼 캐릭터 메시지는 작업을 살려두는 대신 `layla.chat.scheduleChatMessage(...)`를 사용하세요.

### 백그라운드 작업은 무엇을 반환해야 하나요?

`{ status: "ok", processed: 4 }`처럼 작고 JSON으로 직렬화할 수 있는 요약을 반환하세요. 진단 세부 정보는 콘솔 메시지로 남기세요. 실행이 실제로 실패했다면 오류를 던져 작업 관리자가 실패로 보고하도록 하세요.

## 짧게 살아 있는 헤드리스 런타임을 전제로 만들기

유용한 관점은 '내 미니 앱의 숨겨진 복사본'이 아니라 'Layla SDK가 이미 연결된 상태의 백그라운드 한 번의 처리'입니다. 진입점은 작게 유지하고, 재사용할 작업은 의존성을 인자로 받는 함수로 옮기고, 인터페이스에 필요한 것은 저장하고, 생성된 `task.js`는 명확한 결과와 함께 끝나게 하세요.

이 구조라면 백그라운드 산출물은 Layla의 격리 런타임과 호환되면서도, 규모가 큰 미니 앱이 핵심 워크플로를 하나의 구현으로 유지할 수 있습니다.
