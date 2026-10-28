---
title: "Layla의 NPU Forge: Stable Diffusion safetensors를 Snapdragon NPU용 QNN으로 변환하기"
description: NPU Forge 미니 앱으로 SD 1.5와 SDXL safetensors 체크포인트를 QNN 모델로 변환한 다음, Local Dream에서 Qualcomm NPU로 이미지를 생성하세요.
category: Image generation
order: 25
keywords:
  - NPU Forge
  - safetensors를 QNN으로
  - safetensors 변환
  - QNN 모델
  - Qualcomm NPU
  - Snapdragon NPU 이미지 생성
  - Hexagon NPU
  - Android에서 Stable Diffusion
  - SD 1.5
  - SDXL
  - LoRA
  - Civitai
  - Local Dream
  - 오프라인 이미지 생성
  - Android용 AI 이미지 생성기
lastUpdated: 2026-10-28
translationKey: how-to-convert-safetensors-to-qnn-with-npu-forge-in-layla
ai_translated: true
---

**NPU Forge는 Stable Diffusion safetensors 체크포인트를 Snapdragon 휴대폰의 Qualcomm NPU에서 실행되는 형식인 QNN 모델로 변환하는 Layla 미니 앱입니다.** `.safetensors` 파일을 선택하면 Layla가 변환할 수 있는지 확인하고, 변환은 휴대폰에서 실행됩니다. 변환이 끝나면 모델이 Local Dream에 나타나며, 바로 이미지를 생성할 수 있습니다.

Layla는 [Civit.ai의 SD1.5 Safetensor 모델을 Layla로 가져오는 방법](/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/)에서 설명한 것처럼 safetensors 체크포인트를 바로 가져올 수도 있습니다. 이 방법으로 만들어진 모델은 기기의 CPU에서 실행됩니다. NPU Forge는 지원되는 Snapdragon 칩이 있는 휴대폰을 위한 두 번째 방법을 제공합니다. 같은 체크포인트를 변환해 NPU에서 이미지를 생성하도록 하는 것이며, 이쪽이 더 빠릅니다.

이 문서에서는 필요한 것, 체크포인트를 단계별로 변환하는 방법, 걸리는 시간, 변환된 모델로 이미지를 생성하는 방법을 설명합니다. 변환과 이미지 생성은 모두 기기에서 이루어지므로 아무것도 업로드되지 않습니다.

![safetensors 체크포인트를 선택하는 버튼과 제작자 AbrahamPaulJ의 크레딧 카드가 표시된 NPU Forge 미니 앱.](./npu-forge-checkpoint-picker.jpg)

## NPU Forge가 변환하는 것

NPU Forge는 두 종류의 체크포인트를 지원합니다.

- **Stable Diffusion 1.5(SD 1.5)**: Civitai에서 가장 흔한 체크포인트 계열입니다.
- **Stable Diffusion XL(SDXL)**: 1024 x 1024 이미지를 생성하는 더 큰 계열입니다.

어느 쪽을 골랐는지 Layla에 알려 줄 필요는 없습니다. Layla가 파일을 읽어 계열을 직접 감지합니다. 모델은 각 계열의 표준 해상도인 SD 1.5는 512 x 512, SDXL은 1024 x 1024에 맞게 변환됩니다.

일부 체크포인트는 변환할 수 없습니다. SD 2.x 모델, 인페인팅 모델, SDXL 리파이너 모델은 지원되지 않습니다. Layla는 시작하기 전에 이를 알려 주므로, 작동하지 않는 파일에 시간을 낭비하지 않습니다.

## 필요한 것

- NPU가 있는 Qualcomm Snapdragon 칩이 탑재된 Android 휴대폰. Layla가 칩을 인식하지 못하면 NPU Forge 화면 상단에 메시지가 표시됩니다.
- SDXL 체크포인트를 변환하려면 Snapdragon 8 Gen 3 이상. SD 1.5는 더 다양한 Snapdragon 칩에서 작동합니다.
- Android 13 이상.
- _NPU Forge_ 미니 앱. 약 216 MB의 변환 도구를 내려받습니다. 미니 앱을 설치해 본 적이 없다면 [Layla에서 미니 앱을 활성화하거나 비활성화하는 방법](/how-to-enable-disable-mini-apps-within-layla/)을 참고하세요.
- _Local Dream_ 미니 앱. 이미지를 생성할 때 사용하는 앱입니다. 변환된 모델에 필요한 NPU 런타임도 함께 내려받습니다. NPU Forge는 Local Dream 없이도 모델을 변환할 수 있지만, Local Dream이 해당 파일을 가져오기 전에는 모델이 실행되지 않습니다.
- 휴대폰에 저장된 `.safetensors` 체크포인트.
- 여유 저장 공간과 메모리. 구체적인 수치는 다음 섹션에 있습니다.

NPU Forge는 Android에서만 사용할 수 있습니다. 대상이 되는 NPU가 Qualcomm의 기능이므로 이 미니 앱은 iOS에서 제공되지 않습니다.

## 저장 공간, 메모리, 소요 시간

변환은 부담이 큰 작업입니다. Layla는 시작 전에 휴대폰을 측정하고, 부족해 보이면 경고합니다. 다음은 Layla가 권장하는 대략적인 양이며, Android와 다른 앱을 위한 여유분이 포함되어 있습니다.

|                               | SD 1.5  | SDXL     |
| ----------------------------- | ------- | -------- |
| 메모리(RAM)                   | 약 5 GB | 약 8 GB  |
| 여유 저장 공간                | 약 3 GB | 약 23 GB |
| Snapdragon 8 Elite에서의 시간 | 약 2분  | 약 22분  |

저장 공간 수치는 Layla가 체크포인트를 자체 공간에 복사한 뒤에 측정됩니다. 따라서 체크포인트 자체의 크기에 더해 이만큼의 여유 공간이 필요합니다. 처리 속도가 느린 칩은 위 시간보다 오래 걸립니다.

경고는 조언일 뿐 실행을 막지 않습니다. 휴대폰 사양이 부족해도 변환을 시작할 수 있지만, 도중에 메모리나 저장 공간이 부족해 실패할 수 있습니다.

## safetensors 체크포인트를 변환하는 방법

### 1단계: 체크포인트 구하기

SD 1.5 또는 SDXL 체크포인트를 휴대폰에 내려받습니다. [Civitai](https://civitai.com/)에서 **Model Type: Checkpoint**, **File format: SafeTensor**, 원하는 **Base Model**로 필터링하세요.

![Checkpoint, SafeTensor, SD 1.5로 설정된 Civitai 모델 필터.](./civitai-model-filters.png)

내려받은 뒤에도 파일을 지우지 마세요. NPU Forge는 이미 Layla로 가져온 모델이 아니라 원본 `.safetensors` 파일을 변환합니다. 이전에 **사용자 지정 모델 추가**로 가져왔더라도, 변환에는 원본 파일이 필요합니다.

### 2단계: NPU Forge 열기

_내 앱_에서 NPU Forge 미니 앱을 엽니다. 바로 가기도 있습니다. 지원되는 Qualcomm NPU가 있는 휴대폰에서는 추론 설정의 **사용자 지정 모델 추가** 화면에 safetensors를 변환하면 이미지 생성이 빨라진다는 안내가 표시됩니다. 이 안내를 누르면 앱 둘러보기에서 NPU Forge가 열리며, 여기서 설치할 수 있습니다.

화면에 _NPU Forge 자산 누락_ 같은 메시지가 표시되면 변환 도구를 아직 내려받지 않은 것입니다. 먼저 미니 앱 페이지에서 내려받으세요.

### 3단계: 체크포인트 선택하기

**Select a safetensors checkpoint**(safetensors 체크포인트 선택)를 누르고 파일을 선택합니다. Layla가 파일을 자체 저장 공간에 복사한 뒤 검사합니다. 큰 파일은 복사에 시간이 조금 걸립니다.

`.safetensors`로 끝나지 않는 파일을 선택하면 Layla가 거부합니다.

### 4단계: 감지된 모델 확인하기

검사가 끝나면 **감지된 모델** 카드에 Layla가 확인한 내용이 표시됩니다.

- 모델 계열(SD 1.5 또는 SDXL)
- 가중치 수와 파일 크기
- 모델의 세 가지 주요 부분인 UNet, CLIP 텍스트 인코더, VAE가 있는지 여부
- **Convertible**(변환 가능) 또는 **Not convertible**(변환 불가) 라벨

라벨이 _Not convertible_이면 카드에 이유가 설명됩니다. 예를 들어 모델에 필요한 부분이 빠져 있는 경우입니다. 이럴 때는 다른 체크포인트를 선택하세요.

SDXL 체크포인트를 선택했는데 휴대폰의 칩이 오래된 경우, Layla는 SDXL에 Snapdragon 8 Gen 3 이상이 필요하다고 알려 주며 **Start conversion** 버튼은 비활성 상태로 유지됩니다.

### 5단계: LoRA 추가하기(선택 사항)

LoRA는 모델의 스타일을 바꾸거나 캐릭터나 개념을 학습시키는 작은 추가 파일입니다. NPU Forge는 변환하는 과정에서 LoRA를 모델에 병합할 수 있습니다.

1. **Add a LoRA**(LoRA 추가)를 누르고 `.safetensors` 형식의 LoRA 파일을 선택합니다.
2. 강도를 설정합니다. 기본값은 1.0입니다. 값이 낮을수록 LoRA가 약하게 적용됩니다.
3. LoRA를 더 추가하려면 같은 과정을 반복합니다. 목록에 나열된 순서대로 적용됩니다.
4. LoRA를 제거하려면 옆의 휴지통 아이콘을 누릅니다.

LoRA는 모델에 통합됩니다. 나중에 끄거나 강도를 바꿀 수 없습니다. 다른 조합을 사용하려면 원하는 LoRA로 체크포인트를 다시 변환하세요. LoRA 중 이미지 모델 자체에 작용하는 부분만 병합되며, 일부 LoRA 형식은 지원되지 않을 수 있습니다.

### 6단계: 모델 이름 정하기

Layla가 체크포인트의 파일 이름을 제안합니다. 원하면 바꿀 수 있습니다. 이름은 기존 모델 폴더와 같으면 안 되며, `/`와 `:`처럼 파일 시스템에서 허용하지 않는 문자는 공백으로 바뀝니다.

### 7단계: 변환 시작하기

**Start conversion**(변환 시작)을 누릅니다. 전체 화면 진행 시트가 나타나 _가중치 추출 중_이나 _NPU용으로 컴파일 중_ 같은 현재 단계와 처리 중인 모델 부분을 보여 줍니다.

실행되는 동안 다음 사항에 유의하세요.

- **취소하거나 백그라운드로 보낼 수 없습니다.** Layla를 포그라운드에서 열어 두세요.
- **휴대폰을 충전기에 연결하세요.** 가장 긴 단계는 특히 SDXL에서 수십 분이 걸릴 수 있습니다.
- 변환이 실행되는 동안 Android가 프로세스를 중단하지 않도록 알림이 표시됩니다.
- 화면이 어두워질 수 있습니다. 문제없습니다.

변환 과정에서는 먼저 텍스트 인코더를 변환한 다음, UNet을 양자화해 NPU용으로 컴파일합니다. SD 1.5에서는 VAE도 같은 방식으로 처리합니다. SDXL에서는 체크포인트에 들어 있는 VAE를 변환하는 대신 NPU Forge에 포함된 공용 VAE를 사용하므로, SDXL 체크포인트 자체의 VAE는 결과에 영향을 주지 않습니다.

### 8단계: 완료

변환이 끝나면 Layla에 **변환 완료**가 표시됩니다. 모델은 이미지 생성 모델에 저장되어 자동으로 선택되고, 체크포인트의 임시 사본은 삭제됩니다. 원본 파일은 건드리지 않습니다.

변환에 실패하면 Layla가 오류를 표시하고 중간 결과물을 제거하므로, 같은 이름으로 다시 시도할 수 있습니다.

## 변환된 모델로 이미지 생성하기

**Local Dream** 미니 앱을 엽니다. 변환된 모델이 이미 선택되어 있습니다. 다른 모델로 바꾸려면 모델 목록에서 선택하세요.

![설치된 여러 모델이 표시된 Local Dream의 모델 선택 화면.](./local-dream-select-model.jpg)

프롬프트를 입력하고 **생성**을 누릅니다.

![이미지를 생성하도록 설정된 Local Dream.](./local-dream-generate.jpg)

Layla는 각 계열에 시작 설정을 채워 줍니다. SD 1.5는 30단계와 CFG 스케일 7, SDXL은 20단계와 CFG 스케일 4입니다. 둘 다 Local Dream에서 바꿀 수 있으며, 변환된 모델은 병합한 LoRA를 포함해 원래 체크포인트의 스타일을 유지합니다.

휴대폰의 칩이 모델이 요구하는 사양과 맞지 않으면 Local Dream이 **생성** 위에 경고를 표시합니다. 그래도 생성을 시도할 수는 있지만 실패할 수 있습니다.

변환된 모델은 캐릭터가 채팅에서 이미지를 생성할 때도 사용할 수 있습니다. 이미지 생성 모델 목록의 일반 항목이기 때문입니다. 캐릭터별로 모델을 선택하는 방법은 [Layla에서 이미지 생성을 활성화하는 방법](/how-to-enable-image-generation-in-layla/)을 참고하세요.

## 자주 묻는 질문

### Layla에서 사용하려면 체크포인트를 꼭 변환해야 하나요?

아니요. Layla는 safetensors 파일을 바로 가져와 CPU에서 실행할 수 있습니다. 지원되는 Snapdragon NPU가 있고 더 빠른 생성을 원할 때 NPU Forge로 변환하면 됩니다.

### 이미 Layla로 가져온 모델을 변환할 수 있나요?

바로는 안 됩니다. NPU Forge는 원본 `.safetensors` 파일을 읽습니다. 파일이 남아 있다면 NPU Forge에서 선택하세요. 삭제했다면 다시 내려받으세요.

### SD 2.x, 인페인팅, SDXL 리파이너 모델을 변환할 수 있나요?

아니요. SD 1.5와 SDXL 기본(base) 계열 체크포인트만 지원됩니다.

### NPU Forge가 내 휴대폰에 Qualcomm NPU가 없다고 표시하는 이유는 무엇인가요?

Layla는 휴대폰이 보고하는 칩셋을 기준으로 판단합니다. MediaTek이나 Samsung Exynos 같은 다른 칩이 탑재된 휴대폰은 QNN 모델을 실행할 수 없으므로 NPU Forge를 사용할 수 없습니다.

### 변환에 인터넷 연결이 필요한가요?

처음에 미니 앱과 관련 파일을 내려받을 때만 필요합니다. 변환 자체는 휴대폰에서 실행되며 체크포인트도 휴대폰 안에 남아 있습니다.

### 변환을 도중에 멈출 수 있나요?

아니요. NPU Forge는 변환을 취소하거나 백그라운드로 보낼 수 없으므로, 휴대폰을 그대로 둘 수 있을 때 시작하세요. 가능하면 충전기에 연결해 두세요.

### 변환한 뒤에 LoRA 강도를 바꿀 수 있나요?

아니요. 강도는 변환할 때 고정됩니다. 새 값과 새 모델 이름으로 원본 체크포인트를 다시 변환하세요.

### 변환된 모델은 어떻게 삭제하나요?

Local Dream을 열고 모델을 선택한 뒤 삭제 옵션을 사용하세요. 모델이 차지하던 저장 공간이 확보됩니다.

### 변환을 더 세밀하게 제어하려면 어디서 알아볼 수 있나요?

Layla의 NPU Forge는 대부분의 체크포인트에 맞는 합리적인 기본값을 사용합니다. 클립 스킵이나 다른 VAE 정밀도 같은 옵션이 필요하다면 [GitHub](https://github.com/AbrahamPaulJ/npuforge)의 원본 프로젝트를 확인하세요.

## 크레딧

NPU Forge는 AbrahamPaulJ가 만들었으며, 미니 앱에는 [GitHub의 원본 프로젝트](https://github.com/AbrahamPaulJ/npuforge)로 연결되는 링크가 있습니다. Layla의 이미지 생성은 XORORZ가 만든 [Local Dream](https://github.com/xororz/local-dream)을 기반으로 합니다.
