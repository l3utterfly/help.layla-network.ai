---
title: BlueStacks와 LM Studio로 PC에서 Layla를 실행하는 방법
description: BlueStacks에 Layla를 설치하고 로컬 OpenAI 호환 API를 통해 LM Studio 모델에 연결하세요.
category: Mini-apps & integrations
order: 20
keywords:
  - Windows의 Layla
  - BlueStacks
  - LM Studio
  - OpenAI 호환 API
  - 로컬 LLM
lastUpdated: 2026-07-26
translationKey: how-to-run-layla-on-your-pc-with-bluestacks-and-lm-studio
ai_translated: true
---

Layla는 Android 및 iOS용이지만 BlueStacks Android 에뮬레이터를 사용하면 Windows PC에서도 실행할 수 있습니다. LM Studio에 연결하면 컴퓨터에서 로컬로 실행되는 LLM을 대화에 사용할 수 있습니다.

Layla의 화면과 롤플레이 기능을 더 큰 화면에서 사용하려는 경우에 유용합니다.

> **참고:** 일부 기능은 PC에서 작동하지 않지만 대부분의 채팅 기능은 정상적으로 작동합니다.

이 가이드는 BlueStacks 설치, LM Studio 로컬 추론 엔진 구성 및 OpenAI 호환 API 연결을 설명합니다.

## 필요한 항목

BlueStacks를 실행할 Windows PC, 모델용 RAM과 저장 공간, BlueStacks 5, 공식 Layla APK, LM Studio, 초기 다운로드용 인터넷이 필요합니다. 설치 후 모델은 로컬로 실행할 수 있습니다.

## 1. BlueStacks 설치하기

공식 사이트에서 [BlueStacks 5](https://www.bluestacks.com/bluestacks-5.html)를 다운로드하고 설치하여 Android 환경 설정을 완료하세요. Google Play도 가능하지만 아래 단계는 공식 APK를 직접 사용합니다.

## 2. 공식 Layla APK 다운로드하기

[Layla 공식 웹사이트](https://www.layla-network.ai/)를 여세요.

![스마트폰 모형과 다운로드 버튼이 있는 어두운 Layla 랜딩 페이지.](./download-layla.avif)

Google Play 대신 직접 APK를 선택해 Downloads처럼 찾기 쉬운 위치에 저장하세요. 보안을 위해 공식 사이트에서만 다운로드하세요.

## 3. BlueStacks에 APK 설치하기

1. 사이드 도구 모음에서 **Install APK**를 클릭하세요.
2. 다운로드한 APK를 선택하세요.
3. 설치 완료를 기다리세요.

BlueStacks 창으로 파일을 끌어 놓아도 됩니다. 홈 화면에 Layla가 표시되지만 로컬 대화를 시작하기 전에 LM Studio를 구성해야 합니다.

![Layla의 Select Character 화면, 검색 및 카테고리가 표시된 BlueStacks.](./bluestacks-select-character.avif)

## 4. LM Studio 설치하기

LM Studio는 PC에서 언어 모델을 다운로드하고 로컬로 실행하는 추론 엔진입니다. 공식 사이트에서 [LM Studio](https://lmstudio.ai/download)를 설치하고 초기 설정을 완료하세요.

## 5. 권장 언어 모델 다운로드하기

모델 브라우저에서 찾으세요. LM Studio가 하드웨어에 맞는 모델을 추천할 수 있습니다.

- 작은 모델은 RAM이 적게 필요하고 대체로 빠릅니다.
- 큰 모델은 더 나은 응답을 만들 수 있지만 메모리를 많이 씁니다.
- 양자화 모델은 일반적으로 RAM과 VRAM을 적게 사용합니다.
- 처음이라면 작은 권장 모델로 시작하세요.

![다운로드된 모델과 크기가 표시된 LM Studio 모델 선택 대화상자.](./lm-studio-model-selection.avif)

## 6. OpenAI 호환 API 서버 시작하기

1. **Developer** 탭을 여세요.
2. 모델을 선택하거나 불러오세요.
3. 서버 설정을 여세요.
4. **Serve on Local Network**를 활성화하세요.
5. 로컬 API 서버를 시작하세요.

![서버가 실행 중이고 설정이 강조된 LM Studio Developer Local Server 화면.](./lm-studio-server-settings.avif)

LM Studio가 로컬 IP와 포트(일반적으로 `1234`)를 사용한 주소를 표시합니다.

```text
http://192.168.1.100:1234
```

OpenAI 호환 URL에는 보통 `/v1`이 포함됩니다.

```text
http://192.168.1.100:1234/v1/chat/completions
```

PC에 실제로 표시된 주소를 사용하세요.

**Layla에 연결할 OpenAI 호환 API를 찾는 것입니다.**

![로컬 서버, OpenAI 호환 엔드포인트 및 로그가 표시되고 chat completions가 강조된 Developer 화면.](./lm-studio-api-endpoints.avif)

### Serve on Local Network가 필요한 이유

BlueStacks는 별도의 가상 Android 환경에서 실행되므로 다음 주소는 일반적으로 작동하지 않습니다.

```text
http://localhost:1234/v1
```

BlueStacks에서 `localhost`는 Windows PC가 아닌 Android를 뜻합니다. **Serve on Local Network**가 Layla에서 접근할 네트워크 주소를 제공합니다.

신뢰할 수 있는 비공개 네트워크에서만 서버를 공개하고 다른 기기가 접근할 수 있다면 API 인증을 고려하세요.

## 7. Layla에서 OpenAI 호환 API 선택하기

1. **Settings**를 여세요.
2. **Inference Settings**로 이동하세요.
3. **OpenAI Compatible API**를 선택하세요.

![Local File, Your PC, Layla Cloud, OpenAI API 및 Claude API가 있는 추론 엔진 선택 창.](./layla-inference-engine.avif)

## 8. LM Studio 엔드포인트 입력하기

필요한 경우 `/v1`을 포함하여 LM Studio가 표시한 주소를 입력하세요.

```text
http://192.168.1.100:1234/v1/chat/completions
```

**예시를 그대로 복사하지 말고 내 PC에 표시된 주소로 바꾸세요.**

![이름, 엔드포인트, API 키 및 모델이 있는 Edit OpenAI API Settings.](./layla-api-settings.avif)

저장하고 LM Studio를 열어 두세요. 서버와 모델을 사용할 수 있고 **Serve on Local Network**가 활성화되어 있으며 Windows Firewall이 비공개 네트워크에서 LM Studio를 허용하는지 확인하세요.

## 9. 채팅 시작하기

캐릭터 또는 새 대화를 열고 메시지를 보내세요. Layla가 로컬 모델로 전달하고 생성된 답변을 표시합니다.

![사용자가 “Who are you?”라고 묻고 Layla가 답하는 LM Studio 경유 Layla 채팅.](./layla-chat-via-lm-studio.avif)

## 문제 해결

### 연결할 수 없음

서버 실행, **Serve on Local Network**, `localhost`가 아닌 네트워크 주소, 포트, `/v1`, Windows Firewall을 확인하고 네트워크 설정 변경 후 서버를 다시 시작하세요.

### 연결되지만 답변 없음

모델이 다운로드되어 사용 가능한지 확인하고 서버 로그를 살펴본 뒤 필요하면 수동으로 불러오세요.

### 응답이 느림

더 작거나 강하게 양자화된 모델을 사용하고 메모리를 많이 쓰는 앱을 닫고 컨텍스트 크기를 줄이세요.

### APK가 호환되지 않음

Multi-instance Manager에서 Pie 64-bit 또는 Android 11 같은 새 64비트 Android 인스턴스를 만들고 APK를 설치하세요.

### PC 재시작 후 서버가 중지됨

LM Studio의 Developer 탭에서 서버를 다시 시작하세요.

## 자주 묻는 질문

### Windows에서 Layla를 실행할 수 있나요?

예. BlueStacks 같은 Android 에뮬레이터에서 직접 APK를 실행할 수 있습니다.

### 기본 Windows 앱이 있나요?

이 가이드는 BlueStacks의 Android 버전을 사용합니다. 현재 지원 플랫폼은 Layla 웹사이트에서 확인하세요.

### LM Studio는 모델을 로컬로 실행하나요?

예. 모델과 생성은 PC에서 처리됩니다. 다른 Layla 기능은 사용하는 서비스에 따라 인터넷이 필요할 수 있습니다.

### 두 앱을 계속 열어 두어야 하나요?

예. BlueStacks는 Layla를 실행하고 LM Studio API 서버는 답변을 생성합니다.

### 어떤 모델을 사용해야 하나요?

RAM, VRAM 및 처리 성능에 따라 다릅니다. LM Studio 권장 모델로 시작하고 여유가 있으면 더 큰 모델을 사용해 보세요.

## 요약

1. BlueStacks 설치.
2. 공식 Layla APK 다운로드.
3. BlueStacks에 Layla 설치.
4. LM Studio와 모델 설치.
5. OpenAI 호환 API 서버 시작.
6. **Serve on Local Network** 활성화.
7. Layla에 엔드포인트 입력.
8. 채팅 시작.

이 구성은 큰 Windows 화면에서 Layla Android 환경을 사용하면서 PC에서 로컬 LLM 추론을 처리합니다.
