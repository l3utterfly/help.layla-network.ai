---
title: Layla에 사용자 지정 AI 모델을 추가하는 방법
description: 로컬 GGUF 또는 LiteRT 모델을 Layla에 추가하고, Layla Server나 Layla Cloud를 연결하거나, OpenAI 호환 API 또는 Claude API를 설정하는 방법을 알아보세요.
category: Models & performance
order: 10
keywords:
  - 사용자 지정 AI 모델
  - 로컬 LLM
  - GGUF 모델
  - 오프라인 AI
  - OpenAI 호환 API
  - Claude API
  - Layla Server
lastUpdated: 2026-08-09
translationKey: how-to-add-custom-models-to-layla
ai_translated: true
---

Layla는 Android 기기에서 사용자 지정 AI 모델을 로컬로 실행하거나 PC 또는 클라우드에 호스팅된 모델에 연결할 수 있습니다. 이 가이드에서는 로컬 GGUF 및 LiteRT 모델, Layla Server, Layla Cloud, OpenAI 호환 API, Claude API를 포함한 각 옵션을 설명합니다.

비공개 오프라인 AI 환경을 원한다면 호환되는 로컬 모델을 가져와 기기에서 직접 실행하세요. 다른 옵션을 사용하려면 PC 또는 온라인 서비스에 연결해야 합니다.

## 1. 추론 설정 열기

Layla의 **설정** 페이지에서 **추론 설정**을 여세요. **추론 설정** 미니 앱을 직접 열 수도 있습니다.

**내 모델** 섹션에서 **사용자 지정 모델 추가**를 누르세요.

![Layla 추론 설정의 내 모델 섹션과 상단 부근의 사용자 지정 모델 추가 버튼.](./Screenshot_20260809_203116_Layla.jpg)

## 2. 모델을 실행할 위치 선택하기

Layla가 여러 추론 엔진 옵션이 있는 창을 엽니다. 로컬 모델을 가져오거나, PC의 Layla Server에 연결하거나, Layla Cloud를 사용하거나, API 제공자를 설정할 수 있습니다.

![로컬 모델, 내 PC, Layla Cloud, OpenAI API, Claude API 옵션이 표시된 Layla 추론 엔진 창.](./Screenshot_20260809_203121_Layla.jpg)

### 로컬 모델: 내부 저장소 또는 SD 카드

**내부 저장소** 또는 **SD 카드**를 선택하여 호환되는 GGUF 또는 LiteRT 모델을 가져오고 Android 기기에서 로컬로 실행하세요.

**내부 저장소**는 모델을 Layla의 비공개 저장소로 복사합니다. 원본 파일은 그대로 남으므로 나중에 원본을 제거하지 않으면 모델이 저장 공간을 두 배로 사용합니다. 모델을 복사하면 Layla가 가장 안정적으로 모델에 접근할 수 있고 일반적으로 성능과 안정성도 가장 좋습니다. 이 옵션을 권장합니다.

**SD 카드**는 모델을 Layla로 복사하지 않고 기존 폴더에 있는 모델을 참조합니다. 저장 공간은 절약되지만 접근 안정성이 떨어질 수 있습니다. 모델을 추가한 후에는 원본 모델 파일을 이동하거나 이름을 바꾸거나 삭제하지 마세요. Layla가 해당 위치에 계속 접근할 수 있어야 합니다.

### Layla Server가 있는 PC

**내 PC**를 선택하면 Layla Server를 통해 컴퓨터에서 실행 중인 모델에 Layla를 연결할 수 있습니다. 설정 창에는 연결 방법을 설명하는 짧은 튜토리얼이 포함되어 있습니다. 전체 설정 과정은 별도의 Layla Server 문서에서 다룰 예정입니다.

### Layla Cloud

**Layla Cloud**를 선택하면 Layla Cloud에서 제공하는 모델을 사용할 수 있습니다. 이 모델은 휴대전화에서 로컬로 실행되지 않고 온라인에서 실행됩니다.

### OpenAI 호환 API

**OpenAI API**를 선택하면 OpenAI 호환 채팅 완성 API를 제공하는 모든 서비스에 연결할 수 있습니다. 여기에는 ChatGPT의 API 제공자인 OpenAI뿐 아니라 OpenRouter, Google AI Studio, Azure 및 기타 호환 제공자가 포함됩니다.

연결 이름, 제공자가 제공한 엔드포인트, 필요한 경우 API 키를 입력하세요. 모델 이름을 입력하거나 제공자가 모델 검색을 지원하는 경우 **모델 찾기**를 사용할 수도 있습니다.

![이름, 엔드포인트, API 키, 모델 필드가 포함된 Layla의 OpenAI API 설정 양식.](./Screenshot_20260809_203153_Layla.jpg)

엔드포인트는 제공자의 도메인이나 기본 API URL만이 아니라 전체 채팅 완성 URL이어야 합니다. 일반적으로 `/v1/chat/completions`로 끝나지만 제공자 문서에 명시된 정확한 경로를 사용해야 합니다. 경로 일부가 빠지거나 이 필드에 오타가 있으면 Layla가 연결되지 않는 경우가 많습니다.

### Claude API

**Claude API**를 선택하면 Anthropic의 API 형식을 사용하는 서비스에 연결할 수 있습니다. 설정은 OpenAI 호환 연결과 비슷합니다. 요청된 연결 정보, API 키, 모델, 제공자가 제공한 전체 API 엔드포인트를 입력하세요.

Claude API와 OpenAI 호환 API는 요청 형식이 다르므로 제공자에 맞는 옵션을 선택하세요. OpenAI API 옵션과 마찬가지로 도메인만 입력하거나 경로가 불완전하면 연결되지 않을 수 있습니다.

## 3. 사용자 지정 모델과 채팅 시작하기

모델 또는 연결 설정을 저장한 다음 Layla로 돌아가 아무 캐릭터와 채팅을 시작하세요. Layla는 **추론 설정**에서 선택한 모델 구성을 사용합니다.

언제든 **내 모델**로 돌아가 다른 로컬 LLM을 추가하고, API 제공자를 변경하거나, 오프라인 모델과 Layla Server 및 클라우드 모델 사이를 전환할 수 있습니다.

## 자주 묻는 질문

### 내 GGUF 모델을 Layla에 추가할 수 있나요?

예. **추론 설정**에서 **사용자 지정 모델 추가**를 누른 다음 **내부 저장소** 또는 **SD 카드**를 선택하여 기기에 있는 호환 GGUF 모델을 지정하세요.

### 로컬 모델은 인터넷 연결 없이 작동하나요?

예. 모델을 가져온 후에는 로컬 추론이 Android 기기에서 실행되므로 오프라인에서도 작동할 수 있습니다. Layla Server, Layla Cloud 또는 외부 API 연결에는 각각 별도의 네트워크 요구 사항이 있습니다.

### 모델을 내부 저장소로 가져와야 하나요, 아니면 SD 카드를 사용해야 하나요?

최상의 성능과 안정성을 위해 내부 저장소를 권장합니다. SD 카드 옵션은 두 번째 사본을 만들지 않지만 모델이 원래 위치에서 계속 사용 가능해야 합니다.

### Layla가 내 API 모델에 연결되지 않는 이유는 무엇인가요?

먼저 엔드포인트를 확인하세요. 제공자가 요구하는 전체 API 경로여야 하며, OpenAI 호환 서비스의 경우 일반적으로 `/v1/chat/completions`로 끝나고 오타가 없어야 합니다. API 키와 모델 이름이 해당 제공자에서 유효한지도 확인하세요.
