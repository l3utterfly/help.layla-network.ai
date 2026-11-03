---
title: Layla에서 오프라인 AI 이미지 생성 활성화하기
description: Local Dream으로 Android와 iPhone에서 오프라인 AI 이미지를 생성하세요. 모델 선택, 가져오기, 생성 설정과 캐릭터 이미지 전송을 설명합니다.
category: Image generation
order: 10
keywords:
  - 오프라인 이미지 생성
  - Android AI 이미지 생성기
  - Stable Diffusion
  - Civitai 모델
  - safetensors 가져오기
  - GGUF 이미지 모델
  - LoRA
  - Snapdragon NPU
  - Local Dream
  - NPU Forge
  - 텍스트 이미지 생성
  - 이미지 편집
  - 캐릭터 이미지
  - iPhone Stable Diffusion
  - Layla
lastUpdated: 2026-11-04
translationKey: how-to-enable-image-generation-in-layla
ai_translated: true
---

**Layla는 Android와 iPhone에서 오프라인으로 AI 이미지를 생성합니다. Local Dream 미니 앱을 설치하면 Stable Diffusion, SDXL, FLUX, Z-Image 등의 텍스트-이미지 모델이 인터넷이나 계정 없이 휴대전화에서 직접 실행됩니다.** 프롬프트와 이미지는 기기에 남으며 온라인 서비스가 생성물을 검토하지 않습니다.

이 글은 Local Dream 설치, 모델 선택과 가져오기, 모델 종류, 생성 설정, Layla 및 개별 캐릭터가 채팅에서 사용할 모델 지정까지 순서대로 설명합니다. 자세한 안내가 있는 항목에는 링크를 제공합니다.

## Layla로 휴대전화에서 AI 이미지를 생성하는 이유

- **오프라인 작동.** 모델을 다운로드한 뒤에는 비행기 모드에서도 Stable Diffusion을 로컬로 실행합니다.
- **개인정보 보호.** 프롬프트와 이미지를 서버로 보내지 않습니다. 계정, 업로드, 온라인 검토가 없습니다.
- **크레딧이나 이미지별 요금 없음.** 기기 내 생성에는 일일 한도도 없습니다. 제한 요소는 휴대전화의 저장 공간과 속도입니다.
- **모델 선택.** 작은 SD 1.5부터 FLUX.2 Klein, Z-Image Turbo까지 기본 목록을 쓰거나 [Civitai](https://civitai.com/) 체크포인트와 LoRA를 가져옵니다.
- **AI 하드웨어 활용.** 지원 Snapdragon 기기에서는 NPU가 보통 CPU보다 훨씬 빠릅니다.
- **채팅 통합.** 지정한 모델로 캐릭터가 대화 중 이미지를 보낼 수 있습니다.

## Layla의 세 가지 이미지 생성 방식

| 방식                    | 생성 위치                  | 필요한 연결            | 비용                               |
| ----------------------- | -------------------------- | ---------------------- | ---------------------------------- |
| 기기 내                 | 휴대전화 CPU, GPU 또는 NPU | 모델 다운로드 때만     | 이미지별 요금 없음                 |
| Layla Cloud             | Layla 서버                 | 인터넷 및 Cloud 로그인 | 요금제별 월간 제공량               |
| Stable Diffusion Web UI | 네트워크의 PC              | 로컬 네트워크          | 이미지별 요금 없음. PC는 직접 운영 |

이 글은 프롬프트와 이미지를 휴대전화에 보관하는 첫 번째 방식을 주로 다룹니다. 클라우드 전환은 [로컬 LLM과 Layla Cloud 전환하기](/ko/how-to-switch-between-local-llm-and-layla-cloud/)를 참고하세요.

## 오프라인 이미지 생성 미니 앱 Local Dream 설치

Local Dream은 기기 내 생성을 담당합니다. 선택 기능이므로 기본으로 설치되어 있지 않습니다.

1. Layla 미니 앱 화면(**Browse Apps**)에서 **Local Dream**을 찾습니다. 위치는 [미니 앱 활성화 및 비활성화](/ko/how-to-enable-disable-mini-apps-within-layla/)를 참고하세요.
2. 페이지를 열고 설명을 읽습니다. 추가 다운로드는 약 54 MB로 모델보다 작습니다.
3. **Download**를 누릅니다.
4. 미니 앱을 엽니다. 상단에는 _On-device image generation_이 표시됩니다.

![Browse Apps의 Local Dream 페이지. 설명과 54 MB 추가 다운로드, Download 버튼이 표시됩니다.](../../how-to-enable-image-generation-in-layla/install-local-dream-mini-app-layla.jpg)

Layla 업데이트에 새 엔진이 포함되면 미니 앱이 업데이트를 요청합니다. 생성하거나 가져오기 전에 미니 앱 화면에서 업데이트하세요.

Local Dream을 제거하면 가져온 모델을 포함해 그 안의 모든 이미지 모델이 삭제됩니다. Layla가 먼저 확인을 요청합니다.

## AI 이미지 모델 선택 및 다운로드

Local Dream 상단 모델 카드나 화살표를 눌러 **Select Model**을 엽니다.

![Select Model의 검색창, Downloaded, CPU, NPU, Cloud 및 Tags 필터와 SD1.5 Base, DreamShaper 카드.](../../how-to-enable-image-generation-in-layla/select-image-generation-model-local-dream.jpg)

- **Search**로 모델 이름을 검색합니다.
- **필터**는 **Downloaded**, **CPU**, **NPU**, **Cloud**로 목록을 좁힙니다. **Tags**는 _realistic_, _anime_, _sdxl_ 같은 스타일 필터입니다.
- 카드에는 다운로드 전 아이콘, 완료 후 체크 표시가 나타납니다. 모서리 배지는 CPU, NPU, 클라우드를 구분합니다.

모델을 선택하고 **Download Model**을 누릅니다. SD 1.5 약 1 GB부터 가장 큰 NPU 모델의 10 GB 초과까지 있으므로 Wi-Fi를 쓰고 여유 공간을 확인하세요. 모델은 기기에 남으며 **Delete Model**로 언제든 공간을 확보할 수 있습니다.

Layla는 칩 정보를 읽습니다. 필요한 하드웨어가 감지되지 않으면 **Generate** 위에 경고합니다. 참고용 경고이므로 계속 시도할 수 있습니다.

## Civitai의 사용자 지정 Stable Diffusion 모델 가져오기

원하는 스타일이 없다면 직접 모델을 가져오세요. **Add Image Model**을 여는 경로는 두 가지입니다.

- Local Dream 상단의 **Add Model**.
- **Settings** → **Inference Settings** → **Image Generation** → **Add Custom Model**.

![Add Image Model의 Safetensor, Zip, Web UI 탭과 SD1.5 Base Model, safetensors 또는 GGUF 선택 버튼.](../../how-to-enable-image-generation-in-layla/import-custom-image-model-safetensor-layla.jpg)

최대 세 개의 탭을 제공합니다.

- **Safetensor**: [Civitai](https://civitai.com/)나 [Hugging Face](https://huggingface.co/) 등에서 받은 `.safetensors` 체크포인트를 기기에서 변환합니다. Android는 `.gguf` 확산 모델도 지원합니다. 학습 기반 모델 계열을 선택하고 LoRA를 추가할 수 있습니다.
- **Zip**: Layla용으로 변환하고 패키징한 모델을 가져옵니다.
- **Web UI**: API 주소로 PC의 AUTOMATIC1111 Stable Diffusion Web UI에 연결합니다.

iPhone의 Safetensor는 SD 1.5 체크포인트만 받습니다. 지원 Qualcomm NPU 기기에는 더 빠른 생성을 위한 변환 안내도 표시됩니다.

전체 절차는 [사용자 지정 이미지 모델 가져오기](/ko/how-to-import-custom-image-generation-models-into-layla/), 스크린샷 예시는 [Civitai SD 1.5 가져오기](/ko/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/)를 참고하세요. 지원 Snapdragon에서는 [NPU Forge](/ko/how-to-convert-safetensors-to-qnn-with-npu-forge-in-layla/)로 SD 1.5와 SDXL을 CPU 대신 NPU용으로 변환합니다.

## 지원 모델: Stable Diffusion, SDXL, FLUX, Z-Image 등

Layla는 실행 하드웨어에 따라 모델을 분류하고 카드 배지로 표시합니다.

| 종류                           | 기본 목록 예시                                                                                  | 실행 위치       | 플랫폼                            |
| ------------------------------ | ----------------------------------------------------------------------------------------------- | --------------- | --------------------------------- |
| SD 1.5 (CPU)                   | SD1.5 Base, DreamShaper, RealCartoon, Pastel-Mix                                                | CPU, 선택적 GPU | Android 및 iOS                    |
| SD 1.5 (NPU)                   | CyberRealistic, Realistic Vision Hyper, Reliberate, ToonYou                                     | Snapdragon NPU  | Android                           |
| SDXL (CPU)                     | SDXL Turbo, AnimeMix XL, IntoRealism                                                            | CPU             | Android, IntoRealism은 iOS도 지원 |
| SDXL (NPU)                     | Pony Realism V23, Illustrious V17, Nova Anime XL V10                                            | Snapdragon NPU  | Android                           |
| 최신 확산 트랜스포머 (NPU)     | Z-Image Turbo, FLUX.2 Klein 4B 및 9B, Qwen Image 2.1, Krea 2 Turbo, MOSS-Image, IntoRealism ZIT | Snapdragon NPU  | Android                           |
| 소형 FLUX 및 Z-Image (기기 내) | Bonsai Image 4B, FLUX.2 klein 4B, Z-Image Turbo 6B                                              | CPU 또는 GPU    | Android 및 iOS                    |
| Core ML                        | Realistic Vision Hyper, Deliberate v2                                                           | Apple 하드웨어  | iOS                               |
| Layla Cloud                    | FLUX.1[dev], BrainDance, CyberRealisticXL, iNiverse Mix                                         | Layla 서버      | Android 및 iOS                    |
| Web UI                         | Web UI가 제공하는 모델                                                                          | 사용자 PC       | Android 및 iOS                    |

각 분류의 특징:

- **SD 1.5**([Stable Diffusion](https://en.wikipedia.org/wiki/Stable_Diffusion) 1.5)는 가장 오래되고 가벼우며 Civitai에 널리 쓰입니다. 최근 휴대전화 대부분에서 512 x 512 이미지를 생성합니다.
- **SDXL**은 더 자세한 1024 x 1024 이미지를 만들지만 메모리를 더 씁니다. NPU 버전은 Snapdragon 8 Elite 이상이 필요합니다.
- **최신 확산 트랜스포머**(Z-Image, FLUX.2 Klein, Qwen Image, Krea, MOSS-Image)는 목록에서 가장 높은 품질을 제공합니다. 다운로드가 크고 Snapdragon 8 Elite 이상의 NPU에서 실행되며 최대 2048 x 2048과 일부 이미지 편집을 지원합니다.
- **소형 FLUX 및 Z-Image**는 두 플랫폼에서 다른 기기 내 엔진을 씁니다. 해상도는 작고 고정되어 있으며 가장 큰 모델은 수 GB이고 느립니다.
- **Layla Cloud**는 다운로드가 필요 없습니다. 로그인하면 각 요금제의 월간 이미지 생성량을 사용할 수 있습니다.

NPU(신경망 처리 장치)는 Qualcomm Snapdragon의 AI 가속기입니다. 같은 모델에서 대체로 CPU보다 훨씬 빠르므로 Layla는 NPU 모델과 자체 모델을 변환하는 NPU Forge를 제공합니다.

## 생성 설정: 프롬프트, 단계, CFG, 시드

Local Dream 모델 카드 아래의 항목이 생성을 제어합니다. 모든 모델이 모든 옵션을 지원하지 않으므로 표시 항목은 모델별로 다릅니다.

![Local Dream의 Size, Scheduler, Steps, CFG Scale, Seed, Auto Upscale, Advanced Settings, Generate.](../../how-to-enable-image-generation-in-layla/local-dream-image-generation-settings.jpg)

| 설정                              | 기능                                       | 참고                                                                                                                 |
| --------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| **Prompt**                        | 원하는 이미지 설명.                        | 별 버튼은 채팅 모델로 키워드에서 프롬프트를 작성합니다. 다음 버튼은 긴 문장을 줄이며 Long-term Memory가 필요합니다.  |
| **Negative prompt**               | 피할 요소.                                 | 미지원 모델에서는 숨깁니다. 최신 확산 트랜스포머에서는 CFG 1 초과일 때만 적용됩니다.                                 |
| **Size**                          | 너비와 높이.                               | SD 1.5 CPU는 여러 정사각형 크기, 새 NPU 모델은 최대 2048 x 2048. 일부는 크기가 고정됩니다.                           |
| **Steps**                         | 노이즈 제거 단계 수.                       | 많을수록 오래 걸립니다. Turbo 및 증류 모델은 4~9단계용입니다.                                                        |
| **CFG Scale**                     | 프롬프트를 따르는 강도.                    | 기본 모델마다 적절한 초기값이 있습니다. 최신 모델 다수는 1에 맞춰져 있습니다.                                        |
| **Seed**                          | 무작위 시작점.                             | -1은 매번 새 시드를 선택합니다. 결과에 사용한 시드를 표시하므로 재현에 쓸 수 있습니다.                               |
| **Scheduler**                     | DPM++ 2M Karras, Euler A, LCM 등의 샘플러. | SD 1.5와 SDXL에 표시되며 최신 모델은 자체 방식을 씁니다.                                                             |
| **Source image**                  | 노이즈 대신 이미지에서 시작.               | SD 1.5 CPU/NPU, SDXL NPU 및 새 NPU 모델. 선택 후 마스크를 칠해 일부만 다시 만들고 **Denoise Strength**를 조절합니다. |
| **Reference images**              | 편집을 안내할 이미지 최대 3장.             | FLUX.2 Klein 및 Qwen Image.                                                                                          |
| **Show Preview While Generating** | 단계별 대략적인 미리 보기.                 | 일부 모델만 지원합니다.                                                                                              |
| **Auto Upscale**                  | 완성 이미지를 확대.                        | 확대 모델, GPU OpenCL 사용, 타일 크기를 선택합니다. 작은 타일은 메모리를 적게 씁니다.                                |

**Advanced Settings**:

- **Prompt prefix**는 매번 프롬프트 앞에 붙이는 문구입니다. 공통 스타일이나 품질 태그에 유용합니다.
- **Use GPU**는 지원 모델에서 GPU를 사용합니다. RAM 12 GB 미만이면 메모리 부족 가능성을 경고합니다.
- **Reset All Settings**는 선택한 모델의 초기값을 복원합니다.

**Generate**로 시작합니다. 생성 중에는 **Stop generating**으로 멈출 수 있고, 완료 이미지는 갤러리에 표시됩니다.

## Inference Settings에서 이미지 모델 선택

Local Dream은 직접 생성할 때 씁니다. Layla와 캐릭터가 채팅 중 사용할 모델은 **Inference Settings**에서 선택합니다.

1. **Settings** → **Inference Settings** → **Image Generation**을 엽니다.
2. **Add Custom Model** 아래 카드가 현재 모델입니다. 교체 화살표로 **Select Model**을 엽니다.
3. 모델을 선택하거나 **No Image Generation**으로 기능을 끕니다.

![Inference Settings의 Image Generation. Add Custom Model, 선택된 Layla Cloud iNiverse Mix, 교체 버튼.](../../how-to-enable-image-generation-in-layla/inference-settings-image-generation-model-layla.jpg)

개별 모델이 없는 캐릭터는 이 기본값을 씁니다. 로컬 모델은 먼저 Local Dream에서 다운로드해야 합니다. Cloud와 Web UI 모델은 로그인 또는 연결 후 사용할 수 있습니다. Web UI 연결 수정은 모델 목록 카드의 연필 아이콘을 누르세요.

## 캐릭터별 이미지 생성 설정

Inference Settings는 기본값일 뿐입니다. 각 사용자 지정 캐릭터는 별도 모델과 전송 규칙을 가질 수 있습니다. 채팅 중 사진을 보내거나 한 캐릭터는 애니메이션, 다른 캐릭터는 사실적인 스타일을 쓰게 할 수 있습니다.

1. 캐릭터를 만들거나 편집합니다. 전체 설명은 [사용자 지정 캐릭터 만들기](/ko/how-do-i-create-custom-characters/)를 참고하세요.
2. **Advanced** 탭의 **OUTPUT**에서 **Image generation**을 찾습니다. 현재 모델이나 _No image generation_이 표시됩니다.
3. 눌러 **Select Model**에서 고릅니다. **No Image Generation**은 해당 캐릭터의 생성을 끕니다.
4. 아래 옵션을 조정하고 **Save**를 누릅니다.

![캐릭터 편집의 Advanced. RealCartoon, 무작위 전송, 프로필 이미지 옵션, Fallback phrase.](../../how-to-enable-image-generation-in-layla/character-image-generation-settings-layla.jpg)

모델을 지정하면 세 옵션이 추가됩니다.

- **Send images randomly**: 요청 없이 대화 중 이미지를 보낼 수 있습니다. 기본은 꺼짐입니다.
- **Generate Images based on your character's profile image**: 외모를 유지하도록 항상 프로필 이미지를 시작점으로 씁니다. 이미지-이미지 지원 모델이 필요하며 위 표에서 확인할 수 있습니다.
- **Fallback phrase**: _사진 보내 줘_, _이미지 만들어 줘_ 같은 문구를 쉼표로 구분합니다. 메시지에 있으면 이미지 전송을 제안합니다. 일반적인 사진·그림·셀카 요청도 인식하므로 평소 쓰는 표현이나 다른 언어 표현을 추가하세요.

제안된 이미지는 거절할 수 있습니다. 잘못 일치하더라도 제안을 닫으면 됩니다.

기억할 사항:

- 모델을 Local Dream에 먼저 다운로드하세요. 기기에 파일이 없으면 생성할 수 없습니다.
- Layla Cloud 모델은 로그인이 필요하며 이미지마다 월간 제공량을 사용합니다.
- 별도 모델이 없는 캐릭터는 Inference Settings 기본값을 씁니다.

## 그 밖의 생성 방법

휴대전화가 느리다면 에이전트로도 이미지를 만들 수 있습니다. 다음 방법은 인터넷이 필요하며 외부 서비스로 프롬프트를 보냅니다.

- [이미지 생성 에이전트 만들기](/ko/creating-an-image-generation-agent/): 메시지마다 장면이나 캐릭터 생성.
- [Perchance 에이전트로 이미지 생성](/ko/how-to-use-the-perchance-image-generation-agent/): 무료 Perchance 웹사이트 사용.
- [Layla의 Nano Banana API](/ko/how-to-use-the-google-nano-banana-image-generation-agent/): Google AI Studio API 키로 Google 모델 연결.

## 자주 묻는 질문

### Android에서 오프라인으로 이미지를 생성하려면?

Local Dream과 모델을 다운로드하세요. 이후 텍스트나 이미지에서 인터넷 없이 생성합니다. 연결이 필요한 단계는 미니 앱 설치와 모델 다운로드뿐입니다.

### iPhone에서도 되나요?

네. SD 1.5는 CPU 또는 GPU, Core ML 모델도 제공되며 소형 FLUX와 Z-Image도 iOS에서 실행됩니다. Snapdragon NPU 모델은 Android 전용입니다.

### 휴대전화에서 Stable Diffusion을 실행할 수 있나요?

네. Layla는 Android와 iPhone에서 Stable Diffusion 1.5와 SDXL을 실행합니다. SD 1.5는 최근 기기 CPU 또는 지원 Snapdragon NPU를 씁니다. 직접 체크포인트와 LoRA를 가져올 수도 있습니다.

### 휴대전화에서 FLUX를 쓸 수 있나요?

지원 하드웨어라면 가능합니다. FLUX.2 Klein은 Snapdragon 8 Elite 이상 NPU를 씁니다. 소형 FLUX.2 klein 4B와 Bonsai Image 4B는 Android·iOS의 CPU나 GPU를 씁니다. FLUX.1[dev]는 Layla Cloud에서 제공합니다.

### Snapdragon이 꼭 필요한가요?

아니요. SD 1.5 CPU는 대부분의 최근 기기에서 동작합니다. NPU 모델만 Snapdragon이 필요하며 최신 모델은 8 Elite 이상을 요구합니다.

### 어떤 모델로 시작하면 되나요?

DreamShaper 같은 SD 1.5를 시도하세요. 다운로드가 작고 최근 기기 대부분에서 실행됩니다. Snapdragon 8 Elite 이상이면 Z-Image Turbo 같은 NPU 모델로 더 높은 품질을 시도할 수 있습니다.

### Civitai 모델을 사용할 수 있나요?

지원 계열이면 가능합니다. safetensors 체크포인트를 다운로드해 **Safetensor**로 가져오세요. 지원 계열은 위의 가져오기 안내에 있습니다.

### 기존 이미지를 편집할 수 있나요?

이미지-이미지 지원 모델에서 가능합니다. Local Dream에 원본을 추가하세요. FLUX.2 Klein과 Qwen Image는 참조 이미지도 최대 3장 받습니다.

### Layla Cloud 이미지 생성은 유료인가요?

무료를 포함한 각 요금제에 월간 제공량이 있습니다. 상위 요금제는 더 많습니다. 기기 내 생성은 사용 한도나 이미지별 요금이 없습니다.

### 캐릭터가 사진을 보내게 하려면?

편집기의 **Advanced** → **OUTPUT**에서 모델을 고르고 **Send images randomly**를 켜거나 **Fallback phrase**에 요청 문구를 추가합니다.

### 캐릭터마다 다른 모델을 쓸 수 있나요?

네. 각각 **Advanced**에서 지정할 수 있습니다. 개별 설정이 없으면 Inference Settings 기본 모델을 씁니다.

### Layla가 이미지를 검토하거나 검열하나요?

기기 내 생성은 프롬프트와 이미지가 외부로 나가지 않으므로 온라인 검토가 없습니다. Cloud는 Layla 서버, Web UI는 사용자 PC에서 실행되므로 각 설정을 따릅니다.

### Android 오프라인 이미지 생성기를 고를 때 무엇을 보나요?

인터넷 없이 생성되는지, 지원 모델, NPU 사용, Stable Diffusion 체크포인트와 LoRA 가져오기, 기기 내 저장을 확인하세요. Layla는 다섯 가지와 캐릭터 채팅 이미지 전송을 지원합니다.

### PC의 Stable Diffusion에 연결하려면?

AUTOMATIC1111 Web UI의 API를 켜고 Add Image Model의 **Web UI**에 주소를 넣습니다. PC가 생성하므로 휴대전화에서 네트워크로 접근할 수 있어야 합니다.

## 제작 기여

이미지 생성은 XORORZ의 [Local Dream](https://github.com/xororz/local-dream)을 사용합니다. NPU Forge는 AbrahamPaulJ가 만들었습니다.
