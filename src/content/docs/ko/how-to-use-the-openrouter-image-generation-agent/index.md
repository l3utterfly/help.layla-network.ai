---
title: "Android에서 OpenRouter 이미지 생성: 사진을 보내는 AI 채팅"
description: Layla에서 OpenRouter 이미지 생성 API를 사용해 AI 캐릭터가 FLUX, Seedream, Nano Banana로 채팅 중에 이미지를 보내게 하세요. 설정, 가격, 코드를 설명합니다.
category: Image generation
order: 55
keywords:
  - OpenRouter 이미지 생성
  - OpenRouter 이미지 생성 API
  - OpenRouter 이미지 생성 모델
  - OpenRouter 이미지 생성 가격
  - OpenRouter 이미지 생성 무료
  - OpenRouter 이미지 API 엔드포인트
  - OpenRouter API 키
  - OpenRouter API 키 작동 안 함
  - OpenRouter Android 앱
  - OpenRouter FLUX Klein
  - OpenRouter Nano Banana Pro
  - SillyTavern OpenRouter 이미지 생성
  - FLUX 3 Image Klein
  - Seedream API
  - GPT Image API
  - 가장 저렴한 이미지 생성 API
  - 이미지 생성 AI 채팅
  - 사진을 보내는 AI 챗봇
  - AI 캐릭터 이미지 생성기
  - AI 롤플레이 이미지 생성
  - AI 컴패니언 이미지
  - 내 API 키 사용하기
  - Android용 AI 이미지 생성기
  - 로컬 LLM과 클라우드 이미지 생성
  - Layla 이미지 생성 Agent
  - Layla Agents
lastUpdated: 2026-11-14
translationKey: how-to-use-the-openrouter-image-generation-agent
ai_translated: true
---

**OpenRouter 이미지 생성을 이용하면 API 키 하나로 여러 회사의 이미지 모델을 쓸 수 있습니다. Black Forest Labs의 FLUX, ByteDance의 Seedream, Google의 Nano Banana, OpenAI의 GPT Image 등이 포함됩니다.** 이 가이드에서는 Android용 AI 채팅 앱인 Layla에 OpenRouter 이미지 생성 API를 연결해, AI 캐릭터가 채팅 중에 이미지를 보낼 수 있게 합니다. 캐릭터가 응답에서 그림을 묘사하면 Layla Agent가 그 묘사를 OpenRouter에 보내고, 완성된 이미지를 받아 대화에 표시합니다.

Layla는 이미 기기에서 직접 또는 Layla Cloud를 통해 Stable Diffusion 모델로 이미지를 생성합니다. Agent를 쓰면 또 다른 선택지가 생깁니다. 서비스, 모델, 설정을 직접 고르고 자신의 API 키를 사용합니다. [Layla에서 Nano Banana API 사용하기](/ko/how-to-use-the-google-nano-banana-image-generation-agent/)는 Google 모델 하나로 이 방식을 구현합니다. OpenRouter Agent도 같은 방식을 따르지만, 다른 회사의 모델로 바꿀 때는 한 줄만 수정하면 됩니다.

이 글에서는 OpenRouter API 키를 받는 방법과 Agent를 설정하는 방법을 보여 드리고, OpenRouter 이미지 생성 모델과 가격을 비교한 다음, Agent 코드를 한 단계씩 설명합니다.

Layla의 로컬 모델과 달리, 이 Agent는 인터넷 연결이 필요합니다. 이미지 묘사는 OpenRouter와 모델을 운영하는 회사로 전송되며, 이미지마다 OpenRouter 크레딧에서 비용이 차감됩니다. 로컬 모델로 채팅하는 경우 나머지 대화는 기기에 남습니다.

<div class="file-download">
  <div class="file-download-info">
    <span class="file-download-label">Agent 파일</span>
    <span class="file-download-name">openrouter-generate-image.json</span>
    <span class="file-download-hint">작동하려면 OpenRouter API 키가 필요하며, 키를 받는 방법은 아래에서 설명합니다.</span>
  </div>
  <a class="file-download-button" href="/assets/articles/how-to-use-the-openrouter-image-generation-agent/openrouter-generate-image.json" download="openrouter-generate-image.json"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>다운로드</a>
</div>

## Layla에서 OpenRouter 이미지 생성을 쓰는 이유

이미지를 전적으로 기기에서 생성하고 싶다면 Layla의 Stable Diffusion 모델이 알맞은 선택입니다. OpenRouter는 다른 필요를 충족합니다.

- **키 하나로 여러 이미지 모델.** FLUX, Seedream, GPT Image, Nano Banana, Qwen Image, Grok Imagine 등이 모두 같은 요청 형식을 사용합니다. 계정을 새로 만들거나 Agent를 다시 작성하지 않고도 새 모델을 시험해 볼 수 있습니다.
- **낮은 이미지당 가격.** 이 글을 쓰는 시점에서 이 Agent가 기본으로 사용하는 FLUX 3 Image Klein은 1K 이미지 한 장에 $0.009입니다. OpenRouter는 모델을 운영하는 회사의 가격을 그대로 적용하며 마진을 붙이지 않습니다.
- **키별 지출 한도.** OpenRouter에서는 API 키마다 크레딧 한도를 따로 정할 수 있으므로, Agent에 저장한 키는 내가 허용한 금액까지만 쓸 수 있습니다.
- **휴대폰 성능에 좌우되지 않는 이미지 품질.** 이미지는 서버에서 생성되므로, 기기의 CPU나 NPU 속도가 결과나 대기 시간을 제한하지 않습니다.
- **채팅과 이미지에 하나의 OpenRouter 계정.** Layla는 [OpenAI 호환 API 연결](/ko/how-to-connect-layla-to-any-openai-compatible-api/)을 통해 대화 자체에도 OpenRouter의 언어 모델을 사용할 수 있습니다. 이 Agent를 함께 쓰면 같은 계정으로 캐릭터의 응답과 이미지를 모두 처리하므로, Layla를 두 가지 모두를 위한 OpenRouter Android 앱으로 쓸 수 있습니다.
- **또는 로컬 채팅 모델과 클라우드 이미지의 조합.** Agent는 캐릭터의 응답에만 반응하므로, 어떤 모델로 채팅하든 동작합니다. 대화에는 비공개 오프라인 LLM을 계속 쓰고, 휴대폰 밖으로 나가는 것은 이미지 묘사뿐입니다.

## Agent 작동 방식 한눈에 보기

이 Agent는 채팅에서 동작하는 모든 이미지 생성 Agent와 같은 네 단계 흐름을 사용합니다.

```text
이미지를 요청한다
  -> 캐릭터가 태그로 감싼 이미지 묘사로 응답한다
  -> Agent의 트리거가 태그를 감지한다
  -> Eval 도구가 OpenRouter API를 호출하고 이미지를 저장한다
  -> Display Image 도구가 채팅에 이미지를 표시한다
```

1. **시스템 프롬프트가 모델에게 태그를 요청합니다.** Agent는 이미지를 요청할 때마다 캐릭터의 언어 모델이 자세한 이미지 묘사를 `<stable_diffusion_prompt></stable_diffusion_prompt>` 태그 안에 쓰도록 지시합니다.
2. **트리거가 태그를 감지합니다.** 정규식 트리거가 모델의 응답을 지켜봅니다. 태그를 발견하면 안의 텍스트를 가져와 Agent를 시작합니다.
3. **스크립트가 API를 호출합니다.** Agent의 첫 번째 도구는 짧은 JavaScript 프로그램을 실행합니다. 묘사를 OpenRouter에 보내고, 이미지를 받아 파일로 저장합니다.
4. **이미지가 채팅에 나타납니다.** 두 번째 도구인 *Display Image*가 저장된 파일을 가져와 대화에 표시합니다.

언어 모델은 OpenRouter와 직접 통신하지 않습니다. 텍스트만 쓰며, 그 이후는 모두 Agent가 처리합니다.

태그 이름이 `<stable_diffusion_prompt>`인 이유는 Layla 자체의 이미지 생성도 이 태그를 감지하기 때문입니다. 이는 설정 단계에서 중요하며, 아래에서 설명합니다.

## 준비물

- 설치된 _Agent_ 미니 앱. Agent를 사용해 본 적이 없다면 먼저 [Layla에서 Agent, Function 및 Tool Calling을 활성화하는 방법](/ko/how-to-enable-agents-functions-and-tool-calling-in-layla/)을 읽어 보세요.
- 크레딧이 있는 OpenRouter 계정과 OpenRouter API 키. 다음 섹션에서 방법을 설명합니다.
- 인터넷 연결.
- 이 글의 끝에 링크된 Agent 파일.

이 Agent는 Layla에 내장된 _Eval_ 도구를 사용합니다. Python 인터프리터 미니 앱은 필요하지 않습니다.

## OpenRouter API 키를 받는 방법

API 키는 Agent가 요청을 보낼 때 OpenRouter 계정을 식별하는 긴 문자열입니다. OpenRouter 키는 `sk-or-v1-`로 시작합니다. 키를 받는 데는 몇 분이면 됩니다.

### 1단계: OpenRouter 계정 만들기

[openrouter.ai](https://openrouter.ai)에 접속해 오른쪽 위의 **Sign up**을 선택합니다. GitHub 또는 Google 계정으로 가입하거나, 이메일 주소와 비밀번호로 가입할 수 있습니다.

![GitHub, Google, 지갑 로그인 버튼과 이름, 이메일 주소, 비밀번호 입력란이 있는 OpenRouter Sign Up 페이지.](./openrouter-sign-up.jpg)

### 2단계: 크레딧 충전하기

OpenRouter는 선불제입니다. 이미지 모델은 이미지마다 요금을 부과하므로, Agent가 이미지를 생성하려면 먼저 계정에 잔액이 있어야 합니다.

[Credits 페이지](https://openrouter.ai/settings/credits)를 열고 크레딧을 구매합니다. OpenRouter는 주요 신용카드, AliPay, USDC를 받습니다. 카드 결제마다 5.5%의 수수료(최소 $0.80)가 부과되므로, 소액 충전은 큰 금액을 충전할 때보다 비율상 더 비쌉니다. OpenRouter의 [FAQ](https://openrouter.ai/docs/faq)에 현재 수수료가 나와 있으며, 사용하지 않은 크레딧은 구매 후 1년이 지나면 만료될 수 있다고 안내되어 있습니다.

아래 가격 기준으로, 몇 달러어치 크레딧이면 기본 모델로 이미지를 수백 장 만들 수 있습니다.

### 3단계: API 키 페이지 열기

[API 키 페이지](https://openrouter.ai/settings/keys)를 엽니다. OpenRouter 설정 사이드바에서는 *Keys*로 표시됩니다. 이 페이지에는 이미 가진 키가 마지막 사용 시점, 지출 금액, 한도와 함께 나열됩니다. 오른쪽 위의 **New key**를 선택합니다.

![사이드바에서 Keys가 선택되어 있고, 사용량과 한도가 표시된 기존 키 두 개와 오른쪽 위의 New key 버튼이 있는 OpenRouter API 키 페이지.](./openrouter-api-keys-page.jpg)

### 4단계: 키 이름과 한도 정하기

_Create API key_ 대화 상자에서는 세 가지를 입력합니다.

- **Name**: "Layla"처럼 알아보기 쉬운 이름.
- **Expiration**: 키가 만료되는 시점. 만료되는 키가 더 안전하지만, 만료일이 지나면 새 키를 만들어 붙여 넣을 때까지 Agent가 작동하지 않습니다.
- **Credit limit**: 이 키가 쓸 수 있는 최대 금액. *Reset limit every*에서 한도를 매일, 매주, 매월 초기화하도록 하거나, 총액 한도로 둘 수 있습니다.

![Name, Expiration, Credit limit, Reset limit every 입력란과 Create 버튼이 있는 OpenRouter의 Create API key 대화 상자.](./openrouter-create-key-dialog.jpg)

OpenRouter는 모든 키에 크레딧 한도를 설정하도록 권장하며, 여기서도 그렇게 하는 것이 좋습니다. 키는 Agent 안에 저장되므로, 한도를 정해 두면 키가 유출되거나 Agent가 통제를 벗어나 반복 실행되더라도 그 금액까지만 쓰입니다. 키가 한도에 도달하면 한도를 올릴 때까지, 또는 일간·주간·월간 한도라면 초기화될 때까지 OpenRouter가 요청을 거부합니다. 기본 모델로 가끔 이미지를 만든다면 월 몇 달러 한도로 충분합니다.

**Create**를 선택합니다.

### 5단계: 키 복사하기

OpenRouter는 새 키를 한 번만 보여 줍니다. 옆의 복사 버튼을 선택하고, 비밀번호 관리자 같은 안전한 곳에 키를 보관하세요. 대화 상자에 안내된 대로 키는 다시 볼 수 없습니다. 키를 잃어버렸다면 API 키 페이지에서 삭제하고 새 키를 만드세요.

![sk-or-v1-로 시작하고 나머지는 흐리게 처리된 키, 복사 버튼, 키를 다시 볼 수 없다는 경고가 표시된 OpenRouter의 Your new key 대화 상자.](./openrouter-copy-api-key.jpg)

키는 비밀번호처럼 다루세요. 키를 가진 사람은 누구든 내 크레딧으로 이미지를 생성할 수 있습니다. OpenRouter의 [인증 가이드](https://openrouter.ai/docs/api_reference/authentication)에 키 형식과 키가 노출되었을 때 해야 할 일이 나와 있습니다.

## OpenRouter 이미지 생성 모델과 가격

OpenRouter는 [이미지 출력으로 필터링한 모델 페이지](https://openrouter.ai/models?output_modalities=image)에 모든 이미지 생성 모델을 나열합니다. 각 항목에는 모델의 가격과 추가된 날짜가 표시됩니다.

![Image 탭이 선택되어 있고 이미지 생성 모델이 가격과 함께 나열된 OpenRouter Models 페이지.](./openrouter-image-models.jpg)

모델을 선택하면 해당 모델의 페이지가 열립니다. Agent에 필요한 이름인 모델 ID는 제목 아래에 복사 버튼과 함께 있습니다. 이 페이지에는 가격도 표시되며, Layla에서 쓰기 전에 프롬프트를 시험해 볼 수 있는 플레이그라운드도 있습니다.

![모델 ID black-forest-labs/flux-3-image-klein과 복사 버튼, 이미지당 $0.008부터 시작하는 가격, 플레이그라운드가 표시된 OpenRouter의 Black Forest Labs: FLUX 3 Image Klein 페이지.](./openrouter-model-page.jpg)

이 Agent는 Black Forest Labs의 오픈 웨이트 모델로 빠르고 저렴한 FLUX 3 Image Klein을 사용합니다. 다음은 이 글을 쓰는 시점에 OpenRouter가 나열한 이미지 모델 중 일부와 1K 이미지 가격입니다.

| 모델                 | 모델 ID                                | 1K 이미지당 가격 | 비고                                                                           |
| -------------------- | -------------------------------------- | ---------------- | ------------------------------------------------------------------------------ |
| FLUX 3 Image Klein   | `black-forest-labs/flux-3-image-klein` | $0.009           | 이 Agent가 사용하는 모델. 768부터 4K까지 지원합니다.                           |
| Seedream 5.0 Flash   | `bytedance-seed/seedream-5-0-flash`    | $0.018           | ByteDance의 빠른 모델. 1K와 2K를 지원합니다.                                   |
| Qwen Image 2.1 Turbo | `qwen/qwen-image-2.1-turbo`            | $0.0184          | Qwen Image 2.1의 빠른 버전. 1K와 2K를 지원합니다.                              |
| Seedream 5.5         | `bytedance-seed/seedream-5-5`          | $0.02            | ByteDance의 최신 모델. 더 높은 해상도는 $0.035입니다.                          |
| Nano Banana 2.1      | `google/gemini-nano-banana-2.1`        | 약 $0.034        | Google의 모델로, 토큰 단위로 과금됩니다. 1K, 2K, 4K를 지원합니다.              |
| FLUX 3 Image         | `black-forest-labs/flux-3-image`       | $0.048           | 더 큰 FLUX 3 모델. 해상도가 높을수록 비싸지며, 4K는 최대 $0.607입니다.         |
| Nano Banana Pro      | `google/gemini-3-pro-image`            | 약 $0.134        | Google의 프리미엄 모델로, 토큰 단위로 과금됩니다.                              |
| GPT Image 2          | `openai/gpt-image-2`                   | 변동             | OpenAI의 모델로, 토큰 단위로 과금됩니다. 비용은 크기와 품질에 따라 달라집니다. |

이미지 한 장에 $0.009인 FLUX 3 Image Klein은 이 표에서 가장 저렴하므로, 이미지를 자주 보내는 AI 채팅의 기본값으로 적합합니다. Nano Banana Pro와 FLUX 3 Image는 더 비싸지만, 더 세밀한 이미지를 원할 때 시도해 볼 만합니다.

대부분의 모델에서 큰 이미지일수록 비용이 늘어납니다. GPT Image 모델과 Recraft 모델 등 일부 모델은 Agent가 보내는 `resolution` 설정을 받지 않습니다. Recraft 벡터 모델처럼 이미지 대신 SVG 그림을 반환하는 모델도 있으며, *Display Image*가 이를 표시하지 못할 수 있습니다. 이런 모델을 고른다면 다음 단락을 읽어 보세요.

모델을 바꾸려면 모델 페이지에서 모델 ID를 복사해 스크립트의 `MODEL_ID`에 붙여 넣고 **Test** 버튼을 실행하세요. 모델이 오류를 반환하면 그 모델이 지원하는 설정을 확인하세요. 설정을 바꾸거나 제거하는 방법은 아래 코드 설명에서 다룹니다. 가격과 모델은 자주 바뀌므로, 선택하기 전에 OpenRouter의 모델 페이지를 확인하세요.

## Layla에서 OpenRouter 이미지 생성 설정하기

### 1단계: Layla의 기본 이미지 생성 끄기

*추론 설정*을 열고 _이미지 생성_ 섹션까지 스크롤한 다음 이미지 생성 모델을 선택합니다. _Select Model_ 목록에서 **No Image Generation**(이미지 생성 안 함)을 선택하세요.

![Select Model 목록이 열려 있고 No Image Generation이 선택된 추론 설정 화면.](./no-img-gen-settings.jpg)

Layla에 내장된 이미지 생성도 캐릭터의 응답에서 같은 `<stable_diffusion_prompt>` 태그를 읽습니다. 모델이 여전히 선택되어 있으면 Layla가 그 태그로 자체 이미지를 생성해서 이미지가 두 장 나옵니다. *No Image Generation*을 선택하면 태그는 Agent에게 남겨집니다. [Layla에서 이미지 생성을 활성화하는 방법](/ko/how-to-enable-image-generation-in-layla/)에서 이 설정의 위치를 확인할 수 있습니다.

### 2단계: Agent 가져오기

이 글의 끝에 있는 Agent 파일을 다운로드합니다. _Agent_ 미니 앱을 열고 오른쪽 위의 **Import** 버튼으로 가져옵니다. Agent 이름은 *OpenRouter: generate image*이며, 카드에는 사용하는 두 도구인 *Eval*과 *Display Image*가 표시됩니다.

Agent 카드 오른쪽 위의 스위치가 켜져 있는지 확인하세요.

이미 [Nano Banana Agent](/ko/how-to-use-the-google-nano-banana-image-generation-agent/)나 `<stable_diffusion_prompt>`에 반응하는 다른 Agent를 사용 중이라면 꺼 두세요. 그렇지 않으면 이미지를 요청할 때마다 두 Agent가 모두 실행되어 이미지 두 장 값을 내게 됩니다.

### 3단계: API 키 추가하기

**Edit** 버튼으로 Agent를 열고 _Eval_ 도구를 찾습니다. 코드 앞부분에 다음 줄이 있습니다.

```js
const API_KEY = "PUT YOUR API KEY HERE";
```

`PUT YOUR API KEY HERE`를 내 키로 바꾸고 따옴표는 그대로 둡니다. Agent를 저장하세요.

이제 키가 Agent 안에 저장되었습니다. Agent 파일을 공유하거나 어딘가에 업로드하기 전에 키를 원래의 자리표시자로 되돌리세요.

### 4단계: 이미지 요청하기

채팅을 시작하고 이미지를 요청합니다. 예를 들어 "해 질 녘 절벽 위의 등대를 보여 줘"라고 보내 보세요. 캐릭터가 이미지 묘사로 응답하고 Agent가 실행되며, 몇 초 후 이미지가 채팅에 나타납니다.

문제가 생기면 Agent 미니 앱의 **Test** 버튼을 사용하세요. [Layla Agents 심층 분석](/ko/deep-dive-into-layla-agents/)에서 설명하듯, 각 단계의 입력과 출력을 보여 줍니다. OpenRouter의 [Activity 페이지](https://openrouter.ai/activity)에서도 모든 요청과 사용된 모델, 비용을 확인할 수 있습니다.

## Agent 작동 방식, 단계별 설명

Agent는 세 부분으로 이루어집니다. 시스템 프롬프트, 트리거, 그리고 차례로 실행되는 도구 목록입니다. 각 도구의 출력은 다음 도구의 입력이 됩니다. 이러한 구성 요소는 [Layla Agents 심층 분석](/ko/deep-dive-into-layla-agents/)에서 전반적으로 다룹니다. 이 섹션에서는 OpenRouter Agent를 각 부분별로 따라가 봅니다.

### 1. 시스템 프롬프트

시스템 프롬프트는 Agent가 활성화되어 있는 동안 Layla가 대화에 추가하는 지시문입니다. 이 Agent의 프롬프트는 영어로 작성되어 있으며, 파일에도 그대로 들어 있습니다.

```text
When the user asks you to generate, draw or create an image, write a detailed
description of the image (subject, setting, style, lighting, composition) inside
<stable_diffusion_prompt></stable_diffusion_prompt> tags, e.g.
<stable_diffusion_prompt>a lighthouse on a cliff at dusk, oil painting, warm
light</stable_diffusion_prompt>. The image is generated from the text inside the
tags and shown in the chat. Use the tags only when an image is requested, and
never put backticks inside them.
```

이 지시문은 이미지 서비스에 의존하지 않으므로 Nano Banana Agent와 같은 내용입니다.

- **"When the user asks you to generate, draw or create an image"**(사용자가 이미지를 생성, 그리기 또는 만들어 달라고 요청할 때)는 동작을 이미지 요청으로 한정하여 일반 대화에는 영향이 없도록 합니다.
- **"A detailed description (subject, setting, style, lighting, composition)"**(피사체, 배경, 스타일, 조명, 구도를 포함한 자세한 묘사)은 모델에게 체크리스트를 줍니다. FLUX 3나 Seedream 같은 최신 이미지 모델은 완전한 문장을 이해하므로, 자세한 묘사가 키워드 목록보다 대체로 더 좋은 이미지를 만듭니다.
- **예시**는 정확한 태그 형식을 보여 줍니다. 언어 모델은 형식에 대한 설명보다 예시를 더 안정적으로 따릅니다.
- **"Use the tags only when an image is requested"**(이미지가 요청될 때만 태그를 사용)는 모델이 모든 응답에 태그를 붙이는 것을 막습니다. 그렇게 되면 매번 Agent가 시작되고 크레딧이 쓰입니다.
- **"Never put backticks inside them"**(태그 안에 백틱을 넣지 말 것)은 스크립트를 보호합니다. 이유는 아래 코드 설명에서 다룹니다.

### 2. 트리거

이 Agent에는 트리거가 하나 있습니다. 입력이 아니라 모델의 **출력**에 작동하는 *정규식 트리거*입니다. 패턴은 다음과 같습니다.

```text
/<stable_diffusion_prompt>(.*?)<\/stable_diffusion_prompt>/s
```

- 여는 태그와 닫는 태그는 태그 문자열 그대로와 일치합니다.
- `(.*?)`는 캡처 그룹입니다. 태그 사이의 모든 내용을 모으며, `?` 때문에 첫 번째 닫는 태그에서 멈춥니다.
- `s` 플래그는 묘사가 여러 줄에 걸쳐 있어도 되게 합니다.

그룹이 캡처한 텍스트는 Agent에서 `{{match$1}}`로 사용할 수 있게 됩니다. 모델이 태그 사이에 쓴 내용은 무엇이든 첫 번째 도구로 전달됩니다.

### 3. Eval 도구: API 호출하기

첫 번째 도구는 *Eval*입니다. Layla 내부의 샌드박스 런타임에서 JavaScript를 실행합니다. 이 런타임에는 웹 요청용 `fetch`와, 파일 저장 같은 Layla 기능에 스크립트가 접근하게 해 주는 `layla`라는 전역 객체가 있습니다. 브라우저 페이지나 Node.js 모듈은 없습니다.

Eval은 스크립트의 마지막 식의 값을 반환하며, 그것이 Promise라면 완료될 때까지 기다립니다. 스크립트의 마지막 줄인 `generateImage(PROMPT);`가 작업을 시작합니다.

#### 맨 위의 설정

```js
const API_KEY = "PUT YOUR API KEY HERE";
const PROMPT = String.raw`{{match$1}}`.trim();

const MODEL_ID = "black-forest-labs/flux-3-image-klein";
const RESOLUTION = "1K";
const ASPECT_RATIO = "";
const API_URL = "https://openrouter.ai/api/v1/images";
const TIMEOUT_MS = 90000;
```

바꾸고 싶을 만한 것들이 모두 한곳에 있습니다.

- `API_KEY`는 내 키입니다.
- `PROMPT`는 모델이 쓴 묘사입니다. 스크립트가 실행되기 전에 Layla가 `{{match$1}}`을 캡처한 텍스트로 바꾸므로, 묘사가 프로그램의 일부가 됩니다. 백슬래시가 입력한 그대로 유지되도록 `String.raw`와 함께 템플릿 리터럴로 감싸고, `.trim()`이 불필요한 공백과 줄바꿈을 제거합니다. 묘사 안에 백틱이나 `${` 문자가 있으면 리터럴이 일찍 끝나서 스크립트가 깨집니다. 시스템 프롬프트가 백틱을 금지하는 이유입니다.
- `MODEL_ID`는 사용할 모델로, OpenRouter의 모델 페이지에서 복사한 값입니다.
- `RESOLUTION`은 이미지 크기입니다. OpenRouter는 `'512'`, `'768'`, `'1K'`, `'1.5K'`, `'2K'`, `'4K'`를 받으며, 모델마다 이 중 일부를 지원합니다. GPT Image처럼 해상도를 받지 않는 모델에서는 `''`로 설정하세요.
- `ASPECT_RATIO`는 이미지의 비율입니다. 예를 들어 휴대폰 화면을 채우는 세로 이미지는 `'9:16'`, 가로로 넓은 이미지는 `'16:9'`입니다. `''`이면 모델의 기본값을 사용합니다.
- `API_URL`은 OpenRouter의 이미지 생성 엔드포인트입니다. 모든 모델에서 같습니다.
- `TIMEOUT_MS`는 포기하기 전까지 기다리는 시간으로, 90초입니다. 모델에 따라, 특히 큰 크기에서는 시간이 더 걸리기도 합니다.

스크립트의 나머지는 `generateImage`라는 함수 안에 있습니다. 이 함수는 묘사를 `prompt`라는 매개변수로 받으며, 스크립트의 마지막 줄이 `PROMPT`로 이 함수를 호출합니다.

#### 입력 확인하기

```js
if (!prompt) throw new Error("The stable diffusion prompt was empty.");
if (!API_KEY || API_KEY === "PUT YOUR API KEY HERE")
  throw new Error("Set API_KEY in this agent first.");
```

보낼 내용이 없거나 키가 설정되지 않은 경우, 스크립트는 읽기 쉬운 메시지와 함께 일찍 실패합니다. 스크립트가 오류를 던지면 Agent가 멈추고 이미지가 나타나지 않습니다. **Test** 버튼에서 그 메시지를 볼 수 있습니다.

#### 요청 만들기

```js
const payload = { model: MODEL_ID, prompt };
if (RESOLUTION) payload.resolution = RESOLUTION;
if (ASPECT_RATIO) payload.aspect_ratio = ASPECT_RATIO;
```

페이로드는 OpenRouter로 보내는 데이터입니다. 필수 항목은 `model`과 `prompt`뿐입니다. 모든 모델이 모든 설정을 받는 것은 아니므로, 스크립트는 `resolution`과 `aspect_ratio`에 값이 있을 때만 추가합니다.

OpenRouter의 [이미지 생성 가이드](https://openrouter.ai/docs/guides/overview/multimodal/image-generation)에는 페이로드에 추가할 수 있는 다른 설정이 나와 있습니다. 결과를 재현하는 `seed`, GPT Image 모델용 `quality`, PNG, JPEG, WebP 중에서 형식을 고르는 `output_format` 등입니다. 각 모델이 어떤 설정을 지원하는지는 모델 페이지에서 확인할 수 있습니다.

#### 시간 제한을 두고 요청 보내기

```js
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
let response;
let body;
try {
  response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(payload),
    signal: controller.signal,
  });
  body = await response.text();
} catch (error) {
  if (controller.signal.aborted)
    throw new Error(`Image generation timed out after ${TIMEOUT_MS / 1000} s.`);
  throw new Error(`Image generation request failed: ${error.message}`);
} finally {
  clearTimeout(timer);
}
```

OpenRouter와 통신하는 부분입니다.

- `fetch`는 JSON 텍스트로 변환한 페이로드와 함께 `POST` 요청을 보냅니다.
- API 키는 OpenRouter가 요구하는 형식인 bearer 토큰으로 `Authorization` 헤더에 담겨 전달됩니다. 웹 주소에는 포함되지 않습니다.
- `AbortController`와 타이머가 90초 후에 요청을 취소합니다. 이것들이 없으면 연결이 멈췄을 때 Agent가 계속 기다리게 됩니다.
- `catch` 블록은 시간 초과와 다른 네트워크 실패를 구분하므로, 오류 메시지가 어떤 일이 일어났는지 알려 줍니다. `finally` 블록은 두 경우 모두 타이머를 해제합니다.

OpenRouter는 완료된 이미지에만 요금을 부과합니다. 실패하거나 시간이 초과된 생성에는 요금이 청구되지 않습니다.

#### 응답 상태 확인하기

```js
if (!response.ok) {
  throw new Error(
    `HTTP error ${response.status} ${response.statusText}. Response body: ${body.slice(0, 500)}`,
  );
}
```

OpenRouter가 요청을 거부하면 응답 본문에 이유를 설명합니다. 스크립트는 그 설명의 처음 500자를 오류에 포함하므로, 잘못된 키, 부족한 잔액, 도달한 크레딧 한도, 모델이 지원하지 않는 설정이 **Test** 버튼을 사용할 때 명확한 메시지로 표시됩니다.

#### 응답에서 이미지 찾기

```js
let data;
try {
  data = JSON.parse(body);
} catch (error) {
  throw new Error(`The response was not JSON: ${body.slice(0, 200)}`);
}

for (const image of data.data || []) {
  if (!image || !image.b64_json) continue;
  // ...save the image
}
```

OpenRouter는 어떤 모델이 이미지를 만들었든 모든 이미지 요청에 같은 형식으로 응답합니다.

```json
{
  "created": 1748372400,
  "data": [{ "b64_json": "<base64-encoded-image>", "media_type": "image/png" }],
  "usage": { "cost": 0.009 }
}
```

스크립트는 먼저 응답 텍스트를 객체로 변환하며, 텍스트가 올바른 JSON이 아니면 메시지와 함께 멈춥니다. 이 객체에서 `data`는 이미지의 목록입니다. 각 이미지에는 base64 텍스트(이진 데이터를 일반 문자로 표현하는 방식)로 된 그림과, `image/png`나 `image/jpeg` 같은 `media_type`이 들어 있습니다. 스크립트는 목록의 첫 번째 이미지를 사용합니다. `|| []` 가드는 목록이 없을 때 스크립트가 중단되는 것을 막아 줍니다. `usage` 필드에는 요청에 든 비용이 표시됩니다.

이 공통 형식이 Agent에서 OpenRouter를 쓰는 가장 큰 장점입니다. 스크립트는 FLUX, Seedream, Nano Banana, GPT Image 모두에서 같은 필드를 읽으므로, `MODEL_ID`만 바꾸면 모델을 전환할 수 있습니다.

#### 이미지 저장하기

```js
const mediaType = String(image.media_type || "image/png");
const extension =
  mediaType
    .split("/")
    .pop()
    .split("+")[0]
    .replace(/[^a-z0-9]/gi, "") || "png";
const id = Math.random().toString(16).slice(2, 10).padEnd(8, "0");
const path = `generated-images/output_image_${id}.${extension}`;

await layla.utils.saveFile(path, image.b64_json);
return path;
```

- 파일 확장자는 OpenRouter가 알려 주는 이미지 형식에서 가져오며, 없으면 `png`를 사용합니다.
- 무작위 8자리 ID가 이미지마다 고유한 파일 이름을 주므로, 새 이미지가 채팅 기록의 이전 이미지를 덮어쓰지 않습니다.
- `layla.utils.saveFile`은 캐릭터의 비공개 워크스페이스 폴더에 파일을 씁니다. 경로는 그 폴더를 기준으로 한 상대 경로이며, 없는 폴더는 자동으로 만들어집니다. 이 함수는 base64 텍스트를 받는데, OpenRouter가 보내는 형식이 바로 그것이므로 변환 없이 그대로 저장됩니다.
- 함수는 경로를 반환합니다. 이 경로가 도구의 출력이 됩니다.

#### 실패를 명확하게 보고하기

```js
const detail =
  data.error && data.error.message
    ? data.error.message
    : `Response keys: ${Object.keys(data).join(", ")}`;
throw new Error(`No image was found in the response. ${detail}`);
```

루프가 이미지를 찾지 못하고 끝나면(예를 들어 모델의 안전 필터가 요청을 거부한 경우), 스크립트는 OpenRouter의 오류 메시지나 응답에 들어 있던 필드를 보고합니다. 덕분에 특이한 실패의 원인을 훨씬 쉽게 진단할 수 있습니다.

### 4. Display Image 도구

두 번째 도구는 *Display Image*이며, 유일한 설정은 다음과 같습니다.

```text
{{input}}
```

`{{input}}`은 이전 도구의 출력, 즉 스크립트가 반환한 파일 경로로 대체됩니다. *Display Image*는 캐릭터의 워크스페이스에서 그 파일을 열어 응답에 첨부하며, 이미지가 채팅에 나타납니다.

## AI 롤플레이 이미지 생성: 캐릭터를 일관되게 유지하기

언어 모델은 이미지 묘사를 매번 처음부터 씁니다. 그래서 별다른 안내가 없으면 캐릭터가 이미지마다 다르게 보일 수 있습니다. 다음 방법으로 롤플레이와 컴패니언 채팅에서 AI 캐릭터 이미지를 일관되게 유지하고, 이미지가 나타나는 빈도도 정할 수 있습니다.

- **캐릭터를 한 번만 묘사하기.** 캐릭터의 *시나리오*에 다음과 같은 지시문을 추가하세요. "`<stable_diffusion_prompt>`를 쓸 때는 자신에 대한 다음 묘사로 시작할 것: 20대 후반의 여성, 짧은 붉은 머리, 초록색 눈, 주근깨. 그다음 장면을 묘사할 것." 모델이 모든 프롬프트에서 외모를 반복하므로, 이미지 모델이 매번 같은 캐릭터를 그리는 데 도움이 됩니다.
- **화풍 고정하기.** 같은 지시문에 화풍을 추가하세요. 예를 들어 "35mm 필름 사진, 자연광"이나 "수채화 일러스트" 등입니다.
- **메시지마다 이미지 생성하기.** [이미지 생성 Agent 만들기](/ko/creating-an-image-generation-agent/)처럼, *시나리오*에 모든 응답을 태그로 끝내라는 지시문을 추가합니다. 그러면 모든 응답에 이미지가 붙으며, AI 롤플레이와 스토리텔링에 잘 맞습니다. 이미지마다 비용이 들므로, 요청할 때만 이미지를 받는 것보다 비용이 더 듭니다. FLUX 3 Image Klein 같은 저렴한 모델을 쓰면 비용을 낮출 수 있습니다.
- **참조 이미지 사용하기.** OpenRouter의 이미지 모델 대부분은 `input_references` 설정으로 참조 이미지도 받으므로, 캐릭터가 같은 얼굴을 유지하는 데 도움이 됩니다. OpenRouter의 FLUX 3 Image Klein 설명에는 여러 이미지에 걸쳐 캐릭터를 일관되게 유지하는 다중 참조 편집 기능이 나와 있습니다. 이 Agent는 텍스트만 보내므로, 요청에 참조 이미지를 추가하는 것이 다음에 해 볼 만한 좋은 프로젝트입니다.

## 같은 패턴으로 다른 Agent 만들기

시스템 프롬프트, 정규식 트리거, _Display Image_ 단계는 어떤 이미지 서비스에서도 그대로입니다. 바뀌는 것은 스크립트뿐이며, 그래서 이 Agent와 [Nano Banana Agent](/ko/how-to-use-the-google-nano-banana-image-generation-agent/)는 요청과 응답 처리 부분만 다릅니다. 다음 아이디어는 이를 바탕으로 합니다.

- **두 가지 버전 두기.** Agent를 복제하고 각 사본에 다른 `MODEL_ID`를 지정한 다음, 원하는 쪽을 켜세요. 둘 다 같은 태그에 반응하므로 한 번에 하나만 활성화해야 합니다.
- **묘사 외의 정보도 모델에게 요청하기.** 시스템 프롬프트에서 자유 텍스트 대신 `prompt`와 `aspect_ratio`가 담긴 짧은 JSON 객체처럼 몇 가지 필드를 요청할 수 있습니다. 그러면 스크립트가 캡처한 텍스트에서 필드를 읽습니다. Agent가 `PROMPT`로 하는 것처럼 자리표시자는 문자열 리터럴 안에 두고, 텍스트 분석은 자신의 코드에서 하세요.
- **프롬프트가 전달되는 곳 제어하기.** OpenRouter는 내 데이터를 학습에 사용하지 않는 제공자로만 요청을 제한할 수 있습니다. 스크립트에 `payload.provider = { data_collection: 'deny' };`를 추가하거나, OpenRouter의 [개인정보 설정 페이지](https://openrouter.ai/settings/privacy)에서 계정 전체에 같은 옵션을 설정하세요. 조건을 충족하는 모델 제공자가 없으면 요청은 오류와 함께 실패합니다.
- **이미지가 아닌 다른 일 하기.** 다른 태그를 고르고, *Eval*이 다른 API를 호출하게 한 뒤, _Provide Context_ 도구로 마무리하면 캐릭터가 결과에 대해 이야기할 수 있습니다. [Brave Search Agent](/ko/how-to-create-a-brave-search-agent/)가 이 흐름의 예시입니다.

## 자주 묻는 질문

### OpenRouter API 키는 어떻게 받나요?

[openrouter.ai](https://openrouter.ai)에서 계정을 만들고 Credits 페이지에서 크레딧을 충전한 다음, API 키 페이지를 열고 **New key**를 선택하세요. 키에 이름, 만료일, 크레딧 한도를 지정하고, 키가 표시되면 바로 복사하세요. OpenRouter는 키를 한 번만 보여 줍니다.

### OpenRouter 이미지 생성은 무료인가요?

계정과 키를 만드는 것은 무료이지만, 이미지 모델은 이미지마다 요금을 부과하므로 크레딧이 필요합니다. 이 글을 쓰는 시점에서 FLUX 3 Image Klein은 1K 이미지 한 장에 $0.009입니다. OpenRouter는 가끔 무료 이미지 생성 모델을 기간 한정으로 제공하며, 모델 페이지에 "(free)"로 표시됩니다.

### OpenRouter 이미지 생성 비용은 얼마인가요?

모델마다 가격이 다르며, 각 모델 페이지에 표시됩니다. 이 글을 쓰는 시점에서 1K 이미지 가격은 FLUX 3 Image Klein의 1센트 미만부터 Nano Banana Pro의 약 $0.134까지입니다. OpenRouter는 모델 가격에 마진을 붙이지 않지만, 크레딧을 구매할 때 수수료를 부과합니다.

### OpenRouter 이미지 생성 API 엔드포인트는 무엇인가요?

요청은 `Authorization` 헤더에 키를 담아 `https://openrouter.ai/api/v1/images`로 `POST` 방식으로 보냅니다. 모든 이미지 모델이 같은 엔드포인트를 사용하며, 요청의 `model` 필드로 실행할 모델을 고릅니다. OpenRouter의 [이미지 생성 가이드](https://openrouter.ai/docs/guides/overview/multimodal/image-generation)에 모든 설정이 나와 있습니다.

### OpenRouter로 Nano Banana Pro를 사용할 수 있나요?

네. Nano Banana Pro는 `MODEL_ID`를 `google/gemini-3-pro-image`로, Nano Banana 2.1은 `google/gemini-nano-banana-2.1`로 설정하세요. 두 모델 모두 `RESOLUTION` 설정으로 1K, 2K, 4K를 지원합니다. Google에 직접 요금을 내고 싶다면 [Nano Banana Agent](/ko/how-to-use-the-google-nano-banana-image-generation-agent/)를 대신 사용하세요.

### Android용 OpenRouter 앱이 있나요?

OpenRouter 자체는 웹사이트와 API입니다. Layla는 OpenRouter와 함께 쓸 수 있는 Android 앱입니다. [OpenAI 호환 API 연결](/ko/how-to-connect-layla-to-any-openai-compatible-api/)로 OpenRouter의 언어 모델과 채팅하고, 이 Agent로 OpenRouter의 이미지 모델을 사용해 이미지를 생성할 수 있습니다.

### Android에서 AI 챗봇이 사진을 보낼 수 있나요?

네. 이 Agent를 쓰면 Layla 캐릭터가 요청할 때마다, 또는 그렇게 설정하면 모든 메시지마다 이미지를 보냅니다. Layla는 클라우드 서비스 없이 휴대폰에서 실행되는 Stable Diffusion 모델로도 이미지를 보낼 수 있으며, [Layla에서 이미지 생성을 활성화하는 방법](/ko/how-to-enable-image-generation-in-layla/)에서 설명합니다.

### SillyTavern 캐릭터를 OpenRouter 이미지 생성과 함께 쓸 수 있나요?

네. Layla는 SillyTavern이 사용하는 형식인 [TavernPNG 캐릭터 카드](/ko/how-to-import-tavernpng-characters-in-layla/)와 [SillyTavern 프리셋](/ko/how-to-use-sillytavern-presets-in-layla/)을 가져올 수 있으며, 이 Agent는 어떤 캐릭터와도 동작합니다. 컴퓨터에서 SillyTavern으로 OpenRouter 이미지 생성을 사용했다면, 휴대폰의 채팅 앱에서 같은 환경을 쓸 수 있습니다.

### 이미지가 두 장 나온 이유는 무엇인가요?

Layla에 내장된 이미지 생성이 아직 켜져 있거나, `<stable_diffusion_prompt>`에 반응하는 다른 Agent가 켜져 있기 때문입니다. 추론 설정에서 *No Image Generation*을 선택하고 다른 이미지 Agent를 끄세요.

### Agent가 "Set API_KEY in this agent first."라고 표시합니다

키 자리표시자가 스크립트에 그대로 남아 있습니다. Agent를 열고 _Eval_ 도구를 편집해 `PUT YOUR API KEY HERE`를 내 키로 바꾸세요.

### OpenRouter API 키가 작동하지 않는 이유는 무엇인가요?

요청이 실패하면 Agent는 OpenRouter의 설명이 포함된 HTTP 오류를 표시합니다. 401 오류는 키가 잘못되었거나 삭제 또는 만료되었다는 뜻입니다. 402 오류는 잔액이나 키의 크레딧 한도가 소진되었다는 뜻입니다. 400 오류는 대개 모델이 해상도 같은 설정 중 하나를 받지 않는다는 뜻입니다. 모델 페이지를 확인하고 `RESOLUTION`이나 `ASPECT_RATIO`를 변경하세요.

### OpenRouter는 이미지를 필터링하나요?

네. 각 회사가 자사 모델에 자체 콘텐츠 정책을 적용하며, 모델이 거부한 요청은 이미지를 반환하지 않습니다. 그러면 Agent는 받은 오류를 보고합니다. 정책은 모델마다 다르므로, 한 모델이 거부한 프롬프트가 다른 모델에서는 작동할 수 있습니다. 어떤 제공자에게도 프롬프트를 보내지 않고 전적으로 기기에서 이미지를 생성하려면 [Layla에서 이미지 생성을 활성화하는 방법](/ko/how-to-enable-image-generation-in-layla/)에 설명된 로컬 Stable Diffusion 모델을 사용하세요.

### 내 프롬프트는 비공개인가요?

이미지 묘사는 OpenRouter와 내가 고른 모델을 운영하는 회사로 전송됩니다. OpenRouter는 기본적으로 프롬프트를 기록하지 않는다고 밝히고 있으며, 제공자가 받은 내용에는 해당 제공자의 데이터 정책이 적용됩니다. 로컬 모델로 채팅한다면 나머지 대화는 기기에 남습니다.

### 인터넷 연결 없이 이 Agent를 사용할 수 있나요?

아니요. Agent는 OpenRouter 서버를 호출합니다. 오프라인 이미지 생성에는 [Layla에서 이미지 생성을 활성화하는 방법](/ko/how-to-enable-image-generation-in-layla/)에 설명된 로컬 모델 중 하나를 사용하세요.

## 마치며

OpenRouter Agent는 Layla의 다른 이미지 생성 Agent와 같은 네 가지 요소를 사용합니다. 태그로 감싼 묘사를 요청하는 시스템 프롬프트, 이를 잡아내는 정규식 트리거, 묘사를 이미지로 바꾸는 짧은 스크립트, 그리고 결과를 채팅에 표시하는 *Display Image*입니다. OpenRouter는 모든 모델에 같은 형식으로 응답하므로, 스크립트 하나로 AI 캐릭터가 수십 가지 이미지 생성 모델을 쓸 수 있고, 모델을 바꾸는 데는 한 줄만 수정하면 됩니다.

Layla는 Android용 오프라인 AI 어시스턴트로 만들어졌으며, 완전히 비공개이고 오프라인인 채팅과 이미지 생성에는 여전히 Layla의 로컬 모델이 알맞은 선택입니다. OpenRouter 이미지 생성은 채팅에서 특정 온라인 모델을 쓰고 싶고, 연결과 이미지당 비용을 감수할 수 있을 때의 선택지입니다.

## Agent 다운로드

<div class="file-download">
  <div class="file-download-info">
    <span class="file-download-label">Agent 파일</span>
    <span class="file-download-name">openrouter-generate-image.json</span>
    <span class="file-download-hint">Agent 미니 앱의 <em>Import</em> 버튼으로 가져온 다음 API 키를 추가하세요.</span>
  </div>
  <a class="file-download-button" href="/assets/articles/how-to-use-the-openrouter-image-generation-agent/openrouter-generate-image.json" download="openrouter-generate-image.json"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>다운로드</a>
</div>
