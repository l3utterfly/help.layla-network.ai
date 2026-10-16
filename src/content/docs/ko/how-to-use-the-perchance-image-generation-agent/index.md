---
title: Perchance Agent로 Layla에서 AI 이미지를 생성하는 방법
description: Perchance Agent로 Layla 채팅에서 무료 AI 캐릭터 이미지를 생성합니다. 캐릭터의 응답에서 이미지 프롬프트를 읽고 웹사이트를 자동으로 조작합니다.
category: Image generation
order: 40
keywords:
  - Perchance 이미지 생성
  - Perchance AI girl generator
  - 무료 AI 이미지 생성기
  - Android용 AI 이미지 생성기
  - AI 캐릭터 이미지 생성기
  - AI 컴패니언 이미지
  - Layla 이미지 생성 Agent
  - Layla Agent
  - Layla Python Agent
  - Stable Diffusion 프롬프트
  - Stable Diffusion 대안
  - 웹 브라우징 자동화
lastUpdated: 2026-10-16
translationKey: how-to-use-the-perchance-image-generation-agent
ai_translated: true
---

**Perchance 이미지 생성 Agent는 Perchance의 "AI girl generator" 웹사이트를 대신 조작해 Layla 채팅에서 AI 이미지를 생성합니다.** AI 캐릭터가 응답에 이미지 프롬프트를 쓰면, Agent가 Layla의 내장 브라우저에서 생성기를 열고 프롬프트를 입력한 뒤 생성을 실행하고, 이미지가 나올 때까지 기다렸다가 채팅에 표시합니다.

이 방법은 Android용 Layla에 내장된 Stable Diffusion 이미지 모델의 대안입니다. 이미지를 휴대폰에서 연산하지 않으므로, 기기가 로컬 이미지 생성을 하기에는 너무 느리고 구독을 원하지 않는 경우 무료로 쓸 수 있는 선택지입니다. 대신 인터넷 연결이 필요하고, 프롬프트가 Perchance로 전송됩니다. Layla의 로컬 모델은 여전히 오프라인으로 작동하며, 이 Agent만 예외입니다. 이 문서에서는 설정 방법, 작동 방식, 다른 Agent와 함께 사용하는 방법을 설명합니다.

다음은 Agent가 작동하는 모습을 보여 주는 데모입니다.

<video controls playsinline src="/assets/articles/how-to-use-the-perchance-image-generation-agent/perhance-auto.mp4"></video>

## 필요한 것

- 설치된 _Agent_ 미니 앱과 _Python 인터프리터_ 미니 앱. 아직 설정하지 않았다면 [Layla에서 Python 지원을 활성화하는 방법](/how-to-enable-python-support-in-layla/)을 따라 하세요.
- 인터넷 연결. Layla의 로컬 모델과 달리 이 Agent는 온라인 서비스를 사용합니다.
- 이 문서 끝에 링크된 Agent 파일.

## 1단계: Layla의 기본 이미지 생성 끄기

이 단계는 필수입니다. *추론 설정*을 열고 _이미지 생성_ 섹션까지 스크롤한 다음, 이미지 생성 모델을 **없음**(_None_)으로 설정합니다.

이유는 Layla 자체의 이미지 생성도 캐릭터 응답에서 `<stable_diffusion_prompt>` 태그를 읽기 때문입니다. 모델이 여전히 선택되어 있으면 Layla가 같은 태그로 자체 이미지를 생성하여, Agent가 만든 이미지 외에 이미지가 하나 더 생깁니다. 모델을 *None*으로 설정하면 태그는 Agent가 처리하도록 남겨집니다.

이 설정의 위치는 [Layla에서 이미지 생성을 활성화하는 방법](/how-to-enable-image-generation-in-layla/)에서 추론 설정의 이미지 생성 섹션으로 확인할 수 있습니다.

## 2단계: Agent 가져오기

이 문서 끝에 있는 Agent 파일을 다운로드한 다음, _Agent_ 미니 앱을 열고 _Add New Agent_ 버튼으로 가져옵니다. Agent의 이름은 *Perchance AI Girl: generate image*입니다.

Agent 아이콘 아래의 스위치가 켜져 있는지 확인하세요. 기본적으로 Agent 미니 앱에서 활성화한 모든 Agent는 캐릭터가 사용할 수 있습니다. 또한 [Layla에서 Agent, 함수, 도구 호출을 활성화하는 방법](/how-to-enable-agents-functions-and-tool-calling-in-layla/)에 설명된 대로, 캐릭터 만들기 화면의 _고급_ 탭에서 특정 커스텀 캐릭터에 연결할 수도 있습니다.

## 3단계: 이미지 요청하기

채팅을 시작하고 이미지를 요청합니다. 예를 들어 "네 모습을 보여 줘" 또는 "해 질 녘 해변 사진을 보내 줘"라고 말합니다.

Agent는 모델이 이미지 요청에 다른 내용 없이 이미지 프롬프트만으로 응답하도록 지시합니다. 잠시 후 Layla가 자동 조작을 실행하고 이미지가 채팅에 나타납니다. 시간이 걸릴 수 있습니다. Agent는 페이지 로딩을 최대 30초, 이미지 생성을 최대 3분까지 기다리는데, 무료 생성기의 속도가 일정하지 않기 때문입니다.

## Agent의 작동 방식

Agent는 시스템 프롬프트, 트리거, 두 개의 도구로 구성됩니다. 이를 이해하면 Agent를 수정하기가 쉬워집니다.

흐름을 간단히 나타내면 다음과 같습니다.

```text
Model reply with tag -> Regex trigger -> Execute Python Code -> Display Image
```

### 1. 시스템 프롬프트가 모델에 태그가 달린 프롬프트를 요구합니다

Agent는 모델에 다음 지시를 제공합니다.

```text
If the user asks you to generate an image, output the image prompt inside this tag:

<stable_diffusion_prompt>your image prompt here</stable_diffusion_prompt>

Do not include any other text when generating an image. For other requests, respond normally.
```

따라서 이미지를 요청하면 모델은 다음과 같은 응답을 합니다.

```text
<stable_diffusion_prompt>a lighthouse on a cliff at sunset, dramatic clouds, oil painting</stable_diffusion_prompt>
```

다른 메시지에는 모델이 평소처럼 응답합니다.

### 2. 정규식 트리거가 태그와 일치합니다

Agent는 사용자의 입력이 아니라 모델의 **출력**에 대해 실행되는 *정규식 트리거*를 사용합니다. 패턴은 다음과 같습니다.

```text
/<stable_diffusion_prompt>(.*?)<\/stable_diffusion_prompt>/s
```

이 패턴은 태그와 일치하고 여는 태그와 닫는 태그 사이의 모든 내용을 캡처합니다. `s` 플래그 덕분에 프롬프트가 여러 줄에 걸쳐 있어도 일치합니다. [Layla Agent 심층 분석](/deep-dive-into-layla-agents/)에서 설명한 대로, 일치한 텍스트가 Agent의 첫 번째 도구의 입력이 됩니다. 이 Agent에서는 캡처된 프롬프트가 스크립트에서 `{{match$1}}`로 사용됩니다.

### 3. Python 도구가 웹사이트를 조작합니다

첫 번째 도구는 *Python 코드 실행*입니다. 스크립트는 프롬프트를 받아 Perchance를 열고 이미지를 생성한 뒤 파일로 저장합니다. 자세한 내용은 다음 섹션에서 설명합니다.

### 4. Display Image가 결과를 표시합니다

스크립트가 끝나면 저장된 이미지의 위치를 `file://` 주소로 한 줄만 출력합니다. 이 출력이 두 번째 도구인 *Display Image*의 입력이 되어 채팅에 파일을 표시합니다. 스크립트가 실패하면 주소 대신 오류 메시지를 출력하고 이미지는 나타나지 않습니다.

## Layla의 자동 웹 브라우징 작동 방식

Layla에는 Python 스크립트가 조작할 수 있는 내장 브라우저(WebView)가 있습니다. 스크립트는 페이지를 불러오고, 내용을 읽고, 입력란을 채우고, 버튼을 클릭하고, 요소가 나타날 때까지 기다릴 수 있습니다. 사람이 브라우저를 사용하는 것과 비슷합니다. 이 Agent는 그 기능을 사용해 원래 Perchance 웹사이트에서 직접 해야 할 작업을 대신 수행합니다.

스크립트는 다음 순서로 동작합니다.

1. **생성기 열기.** `perchance.org/improved-ai-girl-generator`를 불러오고, 페이지가 완전히 로드되도록 몇 초 기다립니다.
2. **프롬프트 입력.** 페이지에서 설명 입력란을 찾아 모델의 응답에서 가져온 프롬프트를 입력합니다.
3. **generate 누르기.** 생성 버튼을 찾아 클릭합니다. 버튼의 식별자가 바뀌면 "generate"라는 라벨이 붙은 버튼을 대신 찾습니다.
4. **이미지 기다리기.** 생성 시간이 일정하지 않으므로, 스크립트는 최대 3분 동안 1초마다 결과 이미지가 나타났는지 확인합니다.
5. **이미지 저장.** 완성된 이미지는 이미 페이지에 포함되어 있습니다. 스크립트가 이를 직접 읽어 임시 폴더에 파일로 저장하고 그 위치를 반환합니다.

알아 둘 점이 하나 있습니다. Perchance 생성기는 서로 다른 출처의 중첩된 프레임으로 구성되어 있어, 스크립트가 보통은 그 내부를 볼 수 없습니다. 스크립트는 페이지의 모든 프레임에서 설명 입력란, 버튼, 결과를 찾는 방식으로 이를 해결합니다. 그래서 각 단계는 미리 알고 있는 고정된 위치를 클릭하는 것이 아니라, 찾은 다음 동작하는 방식입니다.

이미지는 매번 같은 파일 이름으로 저장되므로, 새로 생성하면 이전 임시 파일이 교체됩니다. 이 파일은 임시 파일로 취급하세요.

### 개인정보와 안정성

- 이미지 프롬프트는 Perchance 웹사이트에 입력되므로 기기 밖으로 전송됩니다. 대화의 나머지 부분은 전송되지 않습니다.
- Layla는 오프라인으로 작동하도록 만들어졌지만 이 Agent는 예외입니다. 인터넷 연결이 없으면 페이지를 불러올 수 없습니다.
- 이 Agent는 서드파티 웹사이트의 레이아웃에 의존합니다. Perchance가 생성기를 개편하면 스크립트가 올바른 요소를 찾지 못할 수 있으며, 그 경우 Agent를 업데이트해야 합니다.
- 생성에 실패하거나 시간이 초과되면 Agent는 이미지 대신 오류를 반환합니다. 다시 시도하거나 사용 중인 연결에서 Perchance가 로드되는지 확인하세요.

## 다른 이미지 생성 Agent와 함께 사용하기

이 Agent가 신경 쓰는 것은 한 가지, 모델의 출력에 `<stable_diffusion_prompt>` 태그가 나타나는 것뿐입니다. 태그가 어떻게 나타났는지는 중요하지 않습니다. 따라서 이 태그의 내용을 만들거나 바꾸는 다른 Agent라면 함께 작동하며, 별도의 Agent들로 작은 파이프라인을 구성할 수 있습니다.

몇 가지 아이디어는 다음과 같습니다.

- **캐릭터의 모습을 일관되게 유지하기.** _Provide Context_ 도구를 사용하는 Agent로 모델에 캐릭터의 외모 설명을 제공하고, 모든 이미지 프롬프트에 그 설명을 포함하도록 지시합니다.
- **스타일 추가하기.** "watercolor, soft lighting" 같은 고정 스타일을 태그의 내용에 덧붙이는 Agent를 사용합니다. 캐릭터의 _시나리오_ 지시에서 요청할 수도 있습니다.
- **메시지마다 이미지 생성하기.** [이미지 생성 Agent 만들기](/creating-an-image-generation-agent/)에 설명된 대로, 캐릭터의 *시나리오*에 모든 응답을 `<stable_diffusion_prompt>` 태그로 끝내도록 지시를 추가합니다. 그러면 Perchance Agent는 사용자가 요청할 때만이 아니라 매 메시지 후에 실행됩니다.
- **다른 생성기 사용하기.** 이 Agent의 도구는 일반 Python 스크립트와 *Display Image*입니다. Agent를 복제하고 스크립트를 수정하면 같은 시스템 프롬프트와 트리거를 유지한 채 다른 웹사이트를 자동화할 수 있습니다.

같은 태그를 처리하는 Agent를 여러 개 만들었다면, 태그가 나타날 때마다 각각이 실행된다는 점을 유념하세요. 특정 응답에 작동시키려는 Agent만 활성화하세요.

## 자주 묻는 질문

### Layla에서 내 캐릭터의 AI 이미지를 무료로 생성하려면 어떻게 하나요?

Perchance Agent가 한 가지 방법입니다. 무료 온라인 생성기를 사용하므로 구독이나 모델 다운로드가 필요 없습니다. 다른 방법은 기기에서 로컬 Stable Diffusion 모델을 실행하는 것으로, 오프라인으로 작동합니다. [Layla에서 이미지 생성을 활성화하는 방법](/how-to-enable-image-generation-in-layla/)을 참고하세요.

### Stable Diffusion 모델을 다운로드해야 하나요?

아니요. 이미지는 Perchance 서버에서 생성되므로 모델을 다운로드할 필요가 없습니다. 다만 Layla 자체의 이미지 생성 모델은 *None*으로 설정해야 합니다.

### 이미지가 두 장 생성된 이유는 무엇인가요?

Layla의 내장 이미지 생성이 아직 켜져 있을 가능성이 큽니다. 추론 설정에서 이미지 생성 모델을 *None*으로 설정하세요.

### 인터넷 연결 없이 사용할 수 있나요?

아니요. Agent는 웹사이트를 불러옵니다. 오프라인 이미지 생성에는 [Layla에서 이미지 생성을 활성화하는 방법](/how-to-enable-image-generation-in-layla/)에 설명된 로컬 모델을 사용하세요.

### 생성기를 바꾸거나 직접 단계를 추가할 수 있나요?

네. Agent 미니 앱에서 이 Agent를 열고 _Python 코드 실행_ 도구를 편집하세요. 스크립트는 Layla의 `lython` 라이브러리로 브라우저를 제어하는 일반 Python 코드입니다.

## Agent 다운로드

[perchance-ai-girl-generator-auto.json 다운로드](/assets/articles/how-to-use-the-perchance-image-generation-agent/perchance-ai-girl-generator-auto.json)

Agent 미니 앱의 _Add New Agent_ 버튼으로 가져오세요.
