---
title: "안드로이드에서 Stable Diffusion WebUI 사용하기: AUTOMATIC1111을 Layla에 연결"
description: 안드로이드에서 Stable Diffusion WebUI를 사용하세요. AUTOMATIC1111을 Layla에 연결하고, API를 켜고, Local Dream에 Web UI 모델을 추가하고, 요청 JSON 템플릿을 편집합니다.
category: Image generation
order: 17
keywords:
  - Stable Diffusion WebUI 안드로이드
  - 안드로이드 Stable Diffusion WebUI
  - Stable Diffusion 안드로이드 앱
  - AUTOMATIC1111 안드로이드
  - AUTOMATIC1111 API
  - Stable Diffusion WebUI 휴대폰 연결
  - 휴대폰에서 Stable Diffusion 사용
  - 안드로이드에서 Stable Diffusion 실행
  - 로컬 네트워크 Stable Diffusion
  - Stable Diffusion WebUI 원격 접속
  - stable-diffusion-webui --api
  - stable-diffusion-webui --listen
  - sdapi/v1/txt2img
  - txt2img 요청 본문
  - Stable Diffusion WebUI API 설정
  - 안드로이드 SDXL
  - Stable Diffusion LoRA
  - Hires fix API
  - 안드로이드 AI 이미지 생성기
  - AI 이미지 생성 앱
  - 텍스트로 이미지 생성
  - Layla 이미지 생성
  - Local Dream
lastUpdated: 2026-11-15
translationKey: how-to-connect-stable-diffusion-webui-to-layla
ai_translated: true
---

**Layla는 AUTOMATIC1111 Stable Diffusion WebUI의 클라이언트로 동작하는 안드로이드 앱입니다. 휴대폰이 네트워크를 통해 내 PC의 WebUI로 프롬프트를 보내고, 이미지는 PC가 생성합니다.** WebUI의 API를 켜고 Local Dream 미니 앱에 _Web UI_ 모델을 추가하면, Layla는 편집할 수 있는 JSON 템플릿으로 매 요청을 만듭니다. 생성된 이미지는 다른 Layla 이미지 모델과 마찬가지로 Local Dream과 채팅에 표시됩니다.

AUTOMATIC1111은 컴퓨터용 웹 인터페이스이며 자체 안드로이드 앱은 없습니다. 이 연결이 안드로이드에서 Stable Diffusion WebUI를 사용하는 방법입니다. WebUI에 이미 설정해 둔 체크포인트, LoRA, 확장 기능을 그대로 쓰면서 휴대폰에서 생성합니다. 이 글은 API를 켠 채 WebUI를 시작하는 방법, Local Dream에 모델을 추가하는 방법, 모든 자리 표시자를 포함한 요청 템플릿, SD 1.5·SDXL·LoRA·Hires fix용 바로 쓸 수 있는 템플릿, 그리고 흔한 연결 오류의 해결 방법을 다룹니다.

Layla의 기기 내 모델과 달리, 이 방법은 생성하는 동안 PC가 켜져 있고 휴대폰에서 접속할 수 있어야 합니다. 프롬프트와 이미지는 온라인 서비스가 아니라 로컬 네트워크를 통해 내 컴퓨터와 오가므로, 연결에 인터넷 접속은 필요하지 않습니다.

## Layla로 안드로이드에서 Stable Diffusion WebUI를 쓰는 이유

Layla는 휴대폰에서 Stable Diffusion을 직접 실행할 수도 있습니다. 따라서 WebUI 연결은 Layla에서 안드로이드용 AI 이미지 생성기를 쓰는 두 가지 방법 중 하나입니다. 다음과 같은 경우에 적합합니다.

- **이미 Stable Diffusion 환경이 있다.** 체크포인트, LoRA, 임베딩, ControlNet이나 ADetailer 같은 확장 기능이 PC에 그대로 있고 휴대폰에서 사용할 수 있습니다.
- **PC의 그래픽카드가 휴대폰보다 빠르다.** 생성은 PC가 하므로 휴대폰 프로세서가 이미지 크기, 스텝 수, 모델을 제한하지 않습니다.
- **휴대폰이 실행하지 못하는 모델을 쓰고 싶다.** 큰 SDXL 체크포인트와 무거운 확장 기능이 변환 없이 데스크톱 GPU에서 실행됩니다.
- **이미지당 비용이 없다.** 내 하드웨어로 생성하므로 크레딧도 계정도 필요 없습니다.
- **채팅에서 쓸 수 있다.** Web UI 모델은 Layla 전체 또는 특정 캐릭터 한 명의 이미지 모델로 지정할 수 있어, 캐릭터가 내 PC에서 만든 이미지를 보내 줍니다.

|                        | 기기 내 모델                                  | Web UI 연결                         |
| ---------------------- | --------------------------------------------- | ----------------------------------- |
| 이미지가 만들어지는 곳 | 휴대폰                                        | PC                                  |
| PC와 네트워크 필요     | 아니요                                        | 예. PC가 켜져 있고 접속 가능해야 함 |
| 모델                   | Layla가 가져와 휴대폰에서 실행할 수 있는 모델 | WebUI가 불러올 수 있는 모든 것      |
| 설정                   | Layla의 조작 항목                             | Layla의 조작 항목과 JSON 템플릿     |

기기에서 실행하는 방법은 Civitai 체크포인트와 LoRA를 포함해 [Layla에 사용자 지정 이미지 생성 모델 가져오기](/ko/how-to-import-custom-image-generation-models-into-layla/)에서 다룹니다.

## Layla가 Stable Diffusion WebUI와 통신하는 방식

WebUI에는 브라우저 페이지와 별개의 HTTP API가 있습니다. Layla는 그중 호출 하나만 사용합니다.

```text
Layla (phone)                         Stable Diffusion WebUI (PC)
  |  POST /sdapi/v1/txt2img               |
  |  JSON body built from your template -> |  renders the image
  |  <- JSON with "images": [base64]      |
  |  saves the first image, shows it      |
```

**Generate**를 누르면 Layla는 템플릿의 `{prompt}`, `{steps}` 같은 자리 표시자를 현재 설정으로 바꾸고, 그 결과를 입력한 엔드포인트에 `POST` 요청의 본문으로 보냅니다. WebUI는 `images` 목록에 Base64 텍스트로 인코딩한 이미지를 담아 응답합니다. Layla는 첫 번째 이미지를 디코딩해 일반 이미지 파일로 저장합니다. API 키를 입력했다면 `Authorization: Bearer` 헤더로 보냅니다.

전송되는 것은 이것뿐입니다. Layla가 스스로 모델을 바꾸거나 샘플러를 정하거나 크기를 고르지는 않습니다. WebUI가 알아야 할 모든 내용은 템플릿에 들어 있습니다.

## 필요한 것

- [AUTOMATIC1111 Stable Diffusion WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui)가 설치되어 있고, WebUI 자체 브라우저 페이지에서 이미지를 생성할 수 있는 PC. Forge처럼 같은 API를 유지하는 포크는 보통 같은 요청을 받아들입니다.
- 같은 네트워크(예: 같은 Wi-Fi)에 연결된 휴대폰과 PC.
- **Local Dream** 미니 앱이 설치된 Layla. 설치 방법은 [Layla에서 이미지 생성 활성화하기](/ko/how-to-enable-image-generation-in-layla/)에, 미니 앱의 위치는 [Layla 미니 앱 켜기·끄기](/ko/how-to-enable-disable-mini-apps-within-layla/)에 있습니다.

## 1단계: Stable Diffusion WebUI API 켜기 (--api와 --listen)

API는 기본적으로 꺼져 있습니다. `--api` 인수를 추가하고, PC뿐 아니라 다른 기기의 연결도 받도록 `--listen`도 추가하세요. 둘 다 WebUI 시작 파일의 `COMMANDLINE_ARGS` 줄에 넣습니다. Windows에서는 `webui-user.bat`, Linux에서는 `webui-user.sh`입니다.

```text
set COMMANDLINE_ARGS=--api --listen
```

그 줄에 이미 다른 인수가 있다면 바꾸지 말고 이 둘을 덧붙이세요. 그 파일로 WebUI를 시작합니다. 기본적으로 포트 `7860`에서 대기합니다.

API가 동작하는지는 PC의 브라우저에서 `http://localhost:7860/docs`를 열어 확인할 수 있습니다. `/sdapi/v1/txt2img`를 포함한 사용 가능한 API 호출이 나열됩니다.

### PC 주소 찾기와 포트 허용

휴대폰은 `localhost`를 쓸 수 없습니다. 그것은 휴대폰 자신을 가리키기 때문입니다. 네트워크에서의 PC 주소가 필요합니다.

1. Windows에서 터미널을 열고 `ipconfig`를 실행합니다. Wi-Fi 또는 Ethernet 어댑터의 **IPv4 주소**를 찾습니다. `192.168.1.50` 같은 형태입니다.
2. Windows Defender 방화벽이 개인 네트워크에서 Python을 허용할지 물으면 허용하세요. 묻지 않았는데 나중에 휴대폰이 연결되지 않으면 TCP 포트 `7860`에 대한 인바운드 규칙을 추가하세요.
3. 휴대폰 브라우저에서 본인의 주소로 `http://192.168.1.50:7860`을 엽니다. WebUI 페이지가 열리면 휴대폰이 PC에 접속할 수 있다는 뜻이며, 같은 주소를 Layla에서도 쓸 수 있습니다.

엔드포인트는 그 주소 뒤에 txt2img 경로를 붙인 것입니다. 예:

```text
http://192.168.1.50:7860/sdapi/v1/txt2img
```

경로의 철자는 `txt2img`입니다. 이전 버전의 Layla는 엔드포인트 입력란의 안내 문구에 `text2img`라고 표시했는데, WebUI에는 그런 경로가 없습니다.

### API 키와 보안에 대한 참고

`--listen`을 쓰면 네트워크의 모든 기기가 WebUI에 접속할 수 있고, API에는 직접 설정하지 않는 한 로그인이 없습니다. 신뢰할 수 있는 네트워크에서만 사용하고, 포트 `7860`을 인터넷으로 포워딩하지 마세요.

WebUI의 `--api-auth` 옵션은 사용자 이름과 비밀번호를 설정하지만 HTTP Basic 인증을 사용하고, Layla는 API 키를 Bearer 토큰으로 보냅니다. 둘은 맞지 않으므로 일반 WebUI에서는 **API Key** 입력란을 비워 두세요. 이 입력란은 리버스 프록시처럼 WebUI 앞단의 무언가가 Bearer 토큰을 확인하는 구성을 위한 것입니다.

## 2단계: Local Dream에서 WebUI를 Web UI 모델로 Layla에 추가하기

1. **Local Dream** 미니 앱을 엽니다.
2. 오른쪽 위의 **Add Model**을 누릅니다. Safetensor, Zip, Web UI 세 탭이 있는 Add Image Model 화면이 열립니다.
3. **Web UI** 탭을 선택합니다.

![Layla의 Add Image Model 화면의 Web UI 탭. Automatic1111 호환 Stable Diffusion API용 Name, Endpoint, API Key, Model 입력란이 보입니다.](../../how-to-connect-stable-diffusion-webui-to-layla/connect-stable-diffusion-web-ui-api-layla.jpg)

4. 입력란을 채웁니다.
   - **Name**: 알아보기 쉬운 이름(예: `PC SDXL`). 모델 목록에 표시되는 이름입니다.
   - **Endpoint**: 1단계의 전체 주소(예: `http://192.168.1.50:7860/sdapi/v1/txt2img`).
   - **API Key**: 일반 WebUI라면 비워 둡니다.
   - **Model**: 아래 설명을 참고하세요. 비워 두어도 됩니다.
5. **Save & Select**를 누릅니다.

Name과 Endpoint는 필수입니다. 둘 중 하나라도 비어 있으면 Layla가 최소한 이름과 API 엔드포인트를 입력하라고 안내합니다.

모델은 이미지 모델에 저장되고 바로 선택됩니다. 다운로드가 필요 없으며 WebUI가 실행 중이면 바로 쓸 수 있습니다. 새 Web UI 모델은 20 스텝, CFG 스케일 7, 비어 있는 네거티브 프롬프트로 시작하며, 이 세 값은 Local Dream에서 바꿀 수 있습니다.

### Model 입력란의 역할

WebUI는 현재 불러온 체크포인트로 생성합니다. 현재 버전의 Layla에서 **Model** 입력란의 텍스트는 연결과 함께 저장되지만 요청에는 추가되지 않으므로, 여기에 체크포인트 이름을 입력해도 WebUI의 모델이 바뀌지 않습니다. Layla에서 체크포인트를 고르려면 아래 SDXL 템플릿처럼 요청 템플릿에 넣으세요.

### 구성마다 연결을 하나씩 추가하기

Web UI 모델은 각자 요청 템플릿을 포함한 자체 설정을 유지합니다. 같은 엔드포인트를 다른 이름으로 여러 번 추가할 수 있습니다. 예를 들어 SD 1.5 애니메이션 체크포인트용 연결과 SDXL 사진 체크포인트용 연결을 따로 만들고, 각각의 템플릿에서 알맞은 체크포인트와 이미지 크기를 고릅니다. 그러면 Local Dream에서 전환할 때 구성 전체가 바뀝니다. 연결의 이름, 엔드포인트, 키를 나중에 바꾸려면 모델 목록을 열고 카드의 연필 아이콘을 누르세요.

## 3단계: 휴대폰에서 Stable Diffusion 이미지 생성하기

Web UI 모델을 선택하면 Local Dream에는 다른 모델과 같은 조작 항목이 표시됩니다.

1. 프롬프트를 입력하고, 원하면 네거티브 프롬프트도 입력합니다.
2. **Steps**, **CFG Scale**, **Seed**를 설정합니다. Seed가 `-1`이면 무작위로 정해집니다.
3. **Generate**를 누릅니다.

![Layla의 Local Dream 매개변수: Size, Scheduler, Steps, CFG Scale, Seed, Auto Upscale, Advanced Settings 섹션.](../../how-to-connect-stable-diffusion-webui-to-layla/local-dream-image-generation-settings.jpg)

PC가 생성하는 동안 휴대폰은 기다립니다. 따라서 소요 시간은 휴대폰이 아니라 그래픽카드와 설정에 달려 있습니다. 요청은 이미지가 완성된 뒤에야 돌아오므로 Web UI 모델에서는 진행 미리보기를 쓸 수 없습니다. **Auto Upscale**을 켜 두었다면 이미지가 도착한 뒤 Layla가 휴대폰에서 업스케일러를 실행합니다.

Web UI 모델에 적용되지 않는 조작 항목이 몇 가지 있습니다.

- **Size**는 512×512 한 가지 옵션만 제공합니다. 다른 크기로 생성하려면 아래 설명처럼 템플릿에서 `width`와 `height`를 설정하세요.
- **Scheduler**는 Layla의 기기 내 모델용이며 WebUI로 전송되지 않습니다. 샘플러나 스케줄러는 템플릿에서 설정하세요.
- **이미지에서 이미지(Image to image)**는 사용할 수 없습니다. Layla의 Web UI 연결은 txt2img만 호출합니다.

## Stable Diffusion WebUI API 요청 템플릿 (JSON)

템플릿은 Layla가 WebUI로 보내는 JSON입니다. Local Dream에서 Web UI 모델을 선택하고 **Advanced Settings**를 열어 **WEBUI API BODY TEMPLATE**까지 스크롤하세요. 텍스트 상자에는 요청 본문 전체가 들어 있으며 자유롭게 편집할 수 있습니다. 변경 내용은 입력을 멈추고 잠시 뒤에 자동으로 저장되며, 해당 모델에만 적용됩니다.

Advanced Settings 맨 아래의 **Reset All Settings**를 누르면 템플릿이 그 모델의 다른 설정과 함께 Layla의 기본값으로 돌아갑니다.

### 기본 템플릿

모든 새 Web UI 모델은 이 템플릿으로 시작합니다. txt2img API가 받는 거의 모든 필드가 나열되어 있습니다.

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

전부 필요하지는 않습니다. 생략한 필드는 WebUI의 기본값을 따르므로, 짧은 템플릿이 읽고 관리하기 더 쉽습니다. 다음 섹션에서는 먼저 자리 표시자를, 그다음 바꿀 만한 필드를 설명합니다.

### 자리 표시자

생성할 때마다 일곱 개의 자리 표시자가 설정값으로 바뀝니다. 템플릿의 나머지 텍스트는 그대로 전송됩니다.

| 자리 표시자        | 바뀌는 내용                                                                  | 쓰는 방법                         |
| ------------------ | ---------------------------------------------------------------------------- | --------------------------------- |
| `{prompt}`         | Prompt Prefix가 앞에 붙은 프롬프트                                           | 따옴표 안에: `"{prompt}"`         |
| `{negativePrompt}` | 네거티브 프롬프트                                                            | 따옴표 안에: `"{negativePrompt}"` |
| `{seed}`           | Seed 입력란의 값. `-1` 또는 `0`이면 Layla가 1,000,000 미만의 난수를 고릅니다 | 따옴표 없이                       |
| `{steps}`          | Steps 입력란의 값                                                            | 따옴표 없이                       |
| `{cfg}`            | CFG Scale 입력란의 값                                                        | 따옴표 없이                       |
| `{width}`          | 선택된 너비. Web UI 모델에서는 512                                           | 따옴표 없이                       |
| `{height}`         | 선택된 높이. Web UI 모델에서는 512                                           | 따옴표 없이                       |

Layla가 값을 채우는 방식에서 몇 가지 규칙이 나옵니다.

- **텍스트 자리 표시자는 따옴표로 감싸고, 숫자는 감싸지 않습니다.** Layla는 프롬프트 안의 따옴표와 줄바꿈을 이스케이프해 JSON이 깨지지 않게 하며, `{prompt}`와 `{negativePrompt}`가 문자열 안에 있다고 가정합니다. 숫자 자리 표시자는 숫자 그대로 들어가므로 `"steps": {steps}`가 맞고, `"steps": "{steps}"`는 스텝 수를 문자열로 보냅니다.
- **결과는 유효한 JSON이어야 합니다.** Layla는 검사하지 않습니다. 쉼표가 빠지거나 끝에 불필요한 쉼표가 있으면 WebUI가 이미지 대신 오류를 반환합니다.
- **모든 위치가 바뀝니다.** `{prompt}`를 두 곳에 쓰면 두 곳 모두 채워집니다.
- **`{scheduler}`나 `{model}` 자리 표시자는 없습니다.** 샘플러, 스케줄러, 체크포인트는 템플릿에 직접 쓰세요.

### Layla가 프롬프트에 먼저 하는 처리

프롬프트가 `{prompt}`에 들어가기 전에 Layla는 Stable Diffusion의 쉼표 구분 형식에 맞게 다듬습니다.

1. Advanced Settings의 **Prompt Prefix**가 쉼표와 함께 앞에 붙습니다.
2. 프롬프트 전체가 소문자로 바뀝니다.
3. 텍스트를 쉼표 기준으로 나누고, 두 번 나온 태그는 한 번만 남깁니다.

네거티브 프롬프트도 소문자로 바뀝니다. `(detailed eyes:1.2)` 같은 가중치는 그대로 전달됩니다.

템플릿에 직접 쓴 텍스트는 바뀌지 않습니다. PC에서 LoRA 이름의 대소문자가 구분될 수 있으므로 LoRA에서는 이 점이 중요합니다. `<lora:MyStyle:0.8>` 같은 태그를 Layla의 프롬프트 입력란이 아닌 템플릿에 쓰면 대문자가 유지됩니다. 아래의 LoRA 템플릿이 이 방법을 씁니다.

### 바꿀 만한 필드

| 필드                   | 설명                                                                                                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sampler_name`         | 샘플러. WebUI는 목록에 표시되는 그대로의 이름(예: `Euler a`)을 요구합니다. Layla의 기본값은 `Euler A`입니다. WebUI가 알 수 없는 샘플러라고 알리면 **Sampling method** 목록에서 이름을 복사하세요. |
| `scheduler`            | WebUI 1.9 이상의 노이즈 스케줄(예: `Karras`). 빈 문자열이면 기본값을 유지합니다.                                                                                                                  |
| `restore_faces`        | 결과에 얼굴 복원 모델을 적용합니다. Layla의 기본값은 `true`입니다. 스타일화된 체크포인트나 애니메이션 체크포인트에서는 얼굴 모양이 바뀔 수 있으므로 `false`로 바꾸세요.                           |
| `width`, `height`      | 출력 크기. 512×512보다 크게 생성하려면 여기에 숫자를 설정합니다. SDXL이라면 1024처럼 체크포인트가 학습한 크기를 쓰세요.                                                                           |
| `batch_size`, `n_iter` | WebUI가 요청 한 번에 만드는 이미지 수. Layla는 첫 번째 이미지만 쓰므로 둘 다 `1`로 두세요.                                                                                                        |
| `override_settings`    | 이 요청에만 적용되는 설정. 체크포인트를 고르는 방법입니다.                                                                                                                                        |
| `enable_hr`            | Hires fix를 켭니다. 작게 생성한 뒤 두 번째 패스로 확대합니다.                                                                                                                                     |
| `send_images`          | `true`로 유지해야 합니다. Layla는 응답에서 이미지를 읽습니다.                                                                                                                                     |
| `save_images`          | WebUI가 PC에도 사본을 남길지 여부. 기본값은 `false`입니다.                                                                                                                                        |
| `alwayson_scripts`     | ControlNet이나 ADetailer 같은 확장 기능이 설치되어 있다면 그 인수.                                                                                                                                |

요청에 대한 설명은 [WebUI API 문서](https://github.com/AUTOMATIC1111/stable-diffusion-webui/wiki/API)에 있고, 내 WebUI의 `/docs` 페이지에는 설치된 버전이 받는 모든 필드가 나열됩니다.

## 바로 쓸 수 있는 템플릿

하나를 템플릿 상자에 복사해 조정하세요. 모두 완전하고 유효한 JSON입니다.

### 템플릿: 최소 SD 1.5

쓸 만한 가장 작은 템플릿입니다. 나열되지 않은 것은 WebUI가 채웁니다.

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

### 템플릿: 체크포인트를 지정한 SDXL

SDXL은 약 1024×1024로 생성하므로 이 템플릿은 크기를 직접 지정합니다. `override_settings` 블록은 이 요청에 한해 지정한 체크포인트를 불러오고, `override_settings_restore_afterwards`는 끝난 뒤 WebUI의 이전 체크포인트를 되돌립니다.

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

`your-sdxl-checkpoint.safetensors`를 WebUI에 표시되는 체크포인트 이름으로 바꾸세요. WebUI는 확장자 없는 파일 이름도 받아들입니다. 항상 같은 체크포인트를 쓴다면 WebUI에서 한 번 불러 두고 `override_settings`를 지우는 편이 더 빠릅니다. 불러온 것과 다른 체크포인트를 요청이 지정하면 WebUI가 먼저 그것을 불러와야 해서 매 이미지의 시간이 늘어납니다.

### 템플릿: LoRA와 고정 품질 태그

템플릿에 쓴 텍스트는 입력한 그대로 전송됩니다. 이를 LoRA 태그와 항상 넣고 싶은 품질 태그에 활용하고, Layla의 입력란은 이미지마다 바뀌는 내용에 쓰세요.

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

여기서 `MyStyle`은 WebUI에서의 LoRA 이름입니다. 태그는 대문자를 유지하고, 소문자로 바뀌는 것은 `{prompt}` 부분뿐입니다.

### 템플릿: Hires fix

Hires fix는 기본 크기로 생성한 뒤 결과를 확대하고 다듬습니다. 큰 첫 패스에서 생길 수 있는 반복되는 피사체 없이 더 선명한 이미지를 얻을 수 있습니다. 시간은 눈에 띄게 오래 걸립니다.

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

Layla의 기본 템플릿은 `denoising_strength`를 `0`으로 두는데, Hires fix가 꺼져 있다면 문제없습니다. 켤 때는 `0.5` 같은 값을 설정하세요. 그렇지 않으면 두 번째 패스가 아무것도 바꾸지 못합니다. 512×512 기본 크기에 `hr_scale`을 `2`로 하면 1024×1024 이미지가 나옵니다.

## 안정적으로 쓰기 위한 팁

- **먼저 WebUI에서 테스트하세요.** 체크포인트, 샘플러, 크기의 조합이 WebUI 브라우저 페이지에서 동작하면 같은 값이 템플릿에서도 동작합니다. WebUI의 **PNG Info** 탭은 WebUI가 만든 이미지의 설정을 보여 줍니다.
- **PC가 잠들지 않게 하세요.** PC가 절전 모드에 들어가면 휴대폰에 연결 오류가 표시됩니다. 생성하는 동안에는 절전을 끄세요.
- **PC에 고정 주소를 주세요.** 공유기가 PC의 주소를 바꾸면 저장한 엔드포인트가 동작하지 않습니다. 공유기 설정에서 PC용 주소를 예약하거나, 주소가 바뀔 때 모델 목록에서 엔드포인트를 수정하세요.
- **항상 넣고 싶은 단어에는 Prompt Prefix를 쓰세요.** 모든 프롬프트 앞에 추가되며, 프롬프트의 나머지와 마찬가지로 소문자로 바뀝니다. 대소문자를 구분하는 것은 템플릿에 넣으세요.
- **채팅에서도 이 연결을 쓰세요.** Web UI 모델을 만든 뒤에는 Layla 전체 또는 특정 캐릭터의 이미지 모델로 지정할 수 있습니다. 선택하는 위치는 [Layla에서 이미지 생성 활성화하기](/ko/how-to-enable-image-generation-in-layla/)에서 다룹니다.

## 자주 묻는 질문

### 안드로이드 휴대폰에서 Stable Diffusion WebUI를 어떻게 사용하나요?

PC에서 `--api --listen`으로 WebUI를 실행한 뒤, Layla의 Local Dream 미니 앱에서 PC 주소에 `/sdapi/v1/txt2img`를 붙인 엔드포인트로 **Web UI** 모델을 추가하세요. 휴대폰이 프롬프트를 보내고, PC가 이미지를 생성하고, Layla가 표시합니다. 휴대폰 브라우저에서 WebUI 페이지를 여는 방법도 되지만, 그 경우 Layla의 채팅과 이미지 도구가 아니라 WebUI 자체 페이지를 쓰게 됩니다.

### 안드로이드용 AUTOMATIC1111 앱이 있나요?

AUTOMATIC1111은 컴퓨터에서 실행되는 웹 인터페이스이며 안드로이드 앱은 제공하지 않습니다. Layla가 그 안드로이드 클라이언트 역할을 합니다. Web UI 모델이 WebUI에 txt2img 요청을 보내 돌려받은 이미지를 표시하고, 캐릭터도 채팅에서 WebUI를 사용할 수 있습니다.

### PC 없이 안드로이드에서 Stable Diffusion을 실행할 수 있나요?

가능하지만 컴퓨터에서 WebUI가 실행되어야 하는 Web UI 연결로는 안 됩니다. Layla는 기기 내 모델로 PC도 인터넷 연결도 없이 휴대폰에서 Stable Diffusion을 실행할 수 있습니다. [Layla에서 이미지 생성 활성화하기](/ko/how-to-enable-image-generation-in-layla/)에서 다룹니다.

### Stable Diffusion WebUI API는 어떻게 켜나요?

WebUI를 `--api` 인수와 함께 시작하세요. 보통 `webui-user.bat` 또는 `webui-user.sh`의 `COMMANDLINE_ARGS`에 추가합니다. 휴대폰 같은 네트워크의 다른 기기가 접속할 수 있도록 `--listen`도 추가하세요. WebUI 주소에서 `/docs`를 열어 동작을 확인할 수 있습니다.

### Layla에 입력할 Stable Diffusion WebUI API 엔드포인트는 무엇인가요?

WebUI 주소 뒤에 `/sdapi/v1/txt2img`를 붙인 것입니다. 예: `http://192.168.1.50:7860/sdapi/v1/txt2img`. `localhost`가 아니라 네트워크에서의 PC 주소를 쓰세요. 휴대폰에서 `localhost`는 휴대폰 자신을 뜻합니다.

### 집 밖에서도 휴대폰으로 Stable Diffusion WebUI에 접속할 수 있나요?

휴대폰이 PC에 닿을 수 있을 때만 가능합니다. 집에서는 같은 Wi-Fi면 충분하고, 모바일 데이터만으로는 PC에 닿지 않습니다. 집 밖에서는 VPN 같은 집 네트워크로의 전용 연결이 필요합니다. WebUI의 API는 기본적으로 로그인이 없으므로 WebUI를 인터넷에 직접 노출하지 마세요. 설정 없이 집 밖에서 이미지를 만들려면 Layla의 기기 내 모델을 쓰세요. 모바일 데이터에서도, 연결이 전혀 없어도 동작합니다.

### Layla는 Forge, reForge, SD.Next에서도 동작하나요?

Layla는 AUTOMATIC1111 형식의 txt2img 요청만 보내므로, `/sdapi/v1/txt2img`에서 같은 요청을 받는 서버라면 동작할 수 있습니다. 포크마다 받아들이는 필드와 샘플러 이름이 다르므로, 사용하는 것의 `/docs` 페이지를 확인하고 템플릿을 조정하세요.

### WebUI API로 SDXL, 다른 체크포인트, LoRA, 다른 샘플러를 쓰려면?

템플릿을 편집하세요. 체크포인트는 `override_settings`에 `"sd_model_checkpoint"`로 추가하고, LoRA 태그는 `prompt` 줄에 쓰고, `sampler_name`과 `scheduler`는 WebUI가 나열하는 이름으로 설정하세요. SDXL 체크포인트라면 `width`와 `height`도 1024 안팎으로 설정합니다. 위의 템플릿마다 예시가 있습니다.

### 더 큰 이미지는 어떻게 생성하나요?

템플릿에서 `width`와 `height`를 고정 숫자로 설정하세요. Layla의 Web UI 모델은 크기 버튼이 512×512 하나뿐이고 그 값이 `{width}`와 `{height}`에 쓰이므로, 그보다 크게 하려면 템플릿에 고정 숫자를 쓰는 것이 방법입니다. SDXL 체크포인트는 1024×1024 안팎을 쓰세요. SD 1.5 체크포인트에서 디테일을 더 얻으려면 Hires fix를 켜세요.

### 이미지 생성이 "Failed to generate image"로 실패하는 이유는?

Layla는 이 문구 뒤에 WebUI의 상태 코드와 메시지를 표시하며, 그것이 무엇이 잘못됐는지 알려 줍니다. `404`는 보통 API가 켜져 있지 않거나 엔드포인트 경로의 철자가 틀렸다는 뜻이므로 `--api`와 `txt2img`를 확인하세요. `422`는 WebUI가 요청 본문을 거부했다는 뜻입니다. 필드의 타입이 틀렸거나, 이름의 철자가 틀렸거나, JSON이 유효하지 않은 경우입니다. `500`은 WebUI가 생성 중 오류를 만났다는 뜻이며, PC의 콘솔 창에 알 수 없는 샘플러나 메모리 부족 같은 원인이 표시됩니다.

### 휴대폰이 Stable Diffusion WebUI에 연결되지 않는 이유는? (network request failed)

휴대폰이 PC에 닿지 못했습니다. WebUI가 실행 중인지, `--listen`으로 시작했는지, 휴대폰과 PC가 같은 네트워크에 있는지, 엔드포인트의 IP 주소가 최신인지, 방화벽이 포트 `7860`을 허용하는지 확인하세요. 가장 빠른 확인법은 휴대폰 브라우저에서 WebUI 주소를 열어 보는 것입니다.

### Layla에 "No images returned"가 표시되는 이유는?

WebUI가 정상적으로 응답했지만 응답에 이미지 목록이 없었습니다. 템플릿에서 `send_images`가 `true`인지, `alwayson_scripts`의 무언가가 이미지 반환을 막고 있지 않은지 확인하세요.

### LoRA가 무시되는 이유는?

Layla는 프롬프트를 소문자로 바꾸므로, 프롬프트 입력란에 입력한 LoRA 태그가 대문자가 들어간 이름과 맞지 않을 수 있습니다. 대신 태그를 템플릿의 `prompt` 줄에 넣으면 그대로 전송됩니다. 이름이 WebUI의 이름과 일치하는지도 확인하세요.

### WebUI를 통한 이미지 생성은 프라이버시가 지켜지나요?

프롬프트와 이미지는 휴대폰에서 네트워크를 통해 내 PC로 가며, Layla는 이를 온라인 서비스로 보내지 않습니다. 원격 접속을 직접 설정하지 않는 한 아무것도 네트워크 밖으로 나가지 않습니다. PC가 전혀 필요 없는 생성에는 [Layla에서 이미지 생성 활성화하기](/ko/how-to-enable-image-generation-in-layla/)에서 설명하는 기기 내 모델을 쓰세요.

### 채팅에서 캐릭터가 이미지를 보내도록 쓸 수 있나요?

네. Web UI 모델은 다른 이미지 모델과 같은 이미지 모델입니다. Inference Settings에서 기본 이미지 생성 모델로 선택하거나, 캐릭터 편집기의 **Advanced** 탭에서 특정 캐릭터에 지정하세요. 캐릭터가 이미지를 생성할 때 PC가 켜져 있고 WebUI가 실행 중이어야 합니다.

## 마무리

Web UI 모델을 쓰면 PC의 AUTOMATIC1111 설치가 Layla의 이미지 생성기가 되어, 안드로이드에서 Stable Diffusion WebUI를 사용할 수 있습니다. WebUI에는 `--api`와 `--listen`이 필요하고, Local Dream에는 `txt2img` 엔드포인트 주소가 필요하며, 나머지, 즉 체크포인트, 샘플러, 크기, LoRA, Hires fix는 요청 템플릿이 결정합니다. 구성마다 짧은 템플릿을 두고 별도의 연결로 저장해 두면 모델 목록에서 전환할 수 있습니다.

Layla는 안드로이드용 오프라인 AI 어시스턴트로 만들어졌으며, PC와 네트워크 없이 휴대폰에서 Stable Diffusion을 실행하는 방법은 여전히 기기 내 모델입니다. WebUI 연결은 내 컴퓨터에 이미 Stable Diffusion 환경이 있고, 그것을 채팅과 Local Dream에서 쓰고 싶은 경우를 위한 것입니다.
