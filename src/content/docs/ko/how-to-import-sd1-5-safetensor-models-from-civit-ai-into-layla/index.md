---
title: Civitai의 SD 1.5 safetensors 모델과 LoRA를 Layla로 가져오기
description: Civitai에서 SD 1.5 safetensors 체크포인트와 LoRA를 다운로드하고 Layla로 가져와 휴대전화에서 오프라인 이미지를 생성하는 방법을 안내합니다.
category: Image generation
order: 20
keywords:
  - SD 1.5
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
translationKey: how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla
ai_translated: true
---

**Layla는 Civitai의 Stable Diffusion 1.5(SD 1.5) safetensors 체크포인트와 LoRA를 가져와 Android나 iPhone에서 오프라인 이미지를 생성합니다.** [Civitai](https://civitai.com/)의 커뮤니티 모델 대부분은 safetensors입니다. 기기에서 변환하므로 다운로드 후 생성에는 인터넷이 필요 없습니다.

이 가이드는 호환 체크포인트 찾기, 올바른 파일 다운로드, 가져오기와 LoRA 추가를 설명합니다. 다른 계열: [SDXL](/ko/how-to-import-sdxl-safetensor-models-from-civitai-into-layla/), [MOSS Image](/ko/how-to-import-moss-image-safetensor-models-from-civitai-into-layla/), [Qwen Image 2.1](/ko/how-to-import-qwen-image-2-1-safetensor-models-from-civitai-into-layla/), [FLUX.2 Klein](/ko/how-to-import-flux-2-klein-safetensor-models-from-civitai-into-layla/). GGUF, zip, Web UI는 [Layla에 사용자 지정 이미지 생성 모델 가져오기](/ko/how-to-import-custom-image-generation-models-into-layla/)를 참고하세요.

## SD 1.5란?

SD 1.5는 512 x 512 이미지를 만드는 [Stable Diffusion](https://en.wikipedia.org/wiki/Stable_Diffusion) 1.5입니다. Civitai에서 가장 흔한 계열로 사실적·애니메이션·일러스트 체크포인트와 LoRA가 수천 개 있습니다. **Base model**의 **SD 1.5**로 찾을 수 있습니다.

LoRA는 같은 기반의 체크포인트에서만 작동합니다. SD 1.5 LoRA는 SDXL에서 쓸 수 없으며 반대도 같습니다.

## 다운로드할 safetensors 파일

**Layla는 f16(반정밀도) safetensors만 지원합니다.** Civitai의 다운로드 상자에서 **fp16 SafeTensor**를 찾아 정밀도를 확인하세요.

SD 1.5 fp16은 보통 약 2 GB입니다. 완전 정밀도 파일 등은 수 GB 더 클 수 있으니 fp16을 선택하세요.

## Civitai의 SD 1.5 체크포인트 가져오기

### 1단계: Civitai의 Models 열기

![Models 탭이 강조된 Civitai 홈 화면.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-open-models-page.jpg)

[civitai.com](https://civitai.com/)을 열고 상단 **Models**를 선택합니다. 스크린샷은 데스크톱 브라우저이므로 모바일 배치가 조금 다를 수 있습니다.

### 2단계: Checkpoint, SafeTensor, SD 1.5로 필터링

![Checkpoint, SafeTensor, SD 1.5를 선택한 Civitai 필터.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-sd-1-5-checkpoint-filters.jpg)

오른쪽 위 **Filters**를 엽니다.

1. **Model types**: **Checkpoint**.
2. **File format**: **SafeTensor**.
3. **Base model**: **SD 1.5** 검색 후 선택.

적절한 형식의 SD 1.5 체크포인트가 표시됩니다. [필터링된 목록 열기](https://civitai.com/models?types=Checkpoint&fileFormats=SafeTensor&baseModels=SD%201.5&sort=Most%20Downloaded).

처음에는 **Most Downloaded**나 **Highest Rated**로 정렬해 보세요.

### 3단계: fp16 safetensors 다운로드

![fp16 SafeTensor 1.99 GB와 Download가 표시된 Civitai 페이지.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-sd-1-5-checkpoint-download-fp16.jpg)

모델 페이지 오른쪽 **Download**를 확인합니다. **fp16 SafeTensor**(예: 1.99 GB)를 골라 **Download**로 저장하세요. 여러 변형이 있으면 fp16을 선택합니다. bf16을 허용하는 예외는 위 설명을 참고하세요.

### 4단계: Layla로 가져오기

**Settings** → **Inference Settings** → **Image Generation** → **Add Custom Model**, 또는 **Local Dream** → **Add Model**을 엽니다.

![Inference Settings의 Image Generation과 Add Custom Model.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/image-generation-settings.jpg)

**Safetensor**의 **Base Model**을 **SD1.5**로 둡니다. iPhone은 이 계열만 제공하므로 목록이 없습니다.

![Safetensor와 SD1.5 Base Model이 있는 Add Image Model.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/add-image-model-safetensor-tab-layla.jpg)

**MODEL CHECKPOINT**에서 파일을 고르고 이름을 확인한 뒤 **Import & Convert**를 누릅니다. 수 분 걸릴 수 있으므로 Layla를 열어 두세요. 완료되면 저장하고 자동 선택합니다.

### 5단계: 이미지 생성

**Local Dream**을 열고 선택한 모델을 확인한 뒤 프롬프트를 입력합니다.

![빠른 자동차 이미지를 생성하도록 설정한 Local Dream.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/local-dream-generate.jpg)

![여러 설치된 모델이 있는 Local Dream 모델 선택 화면.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/local-dream-select-model.jpg)

이 방식으로 가져온 SD 1.5는 CPU에서 최대 512 x 512로 생성합니다. 지원 Qualcomm Snapdragon이면 같은 체크포인트를 NPU용으로 변환해 가속할 수 있습니다. [NPU Forge](/ko/how-to-convert-safetensors-to-qnn-with-npu-forge-in-layla/)를 참고하세요.

## Civitai의 SD 1.5 LoRA 추가

LoRA는 스타일을 바꾸거나 인물, 사물, 개념을 더하는 작은 파일입니다. 체크포인트처럼 찾되 모델 종류를 바꿉니다.

### 1단계: LoRA와 SD 1.5로 필터링

![LoRA와 SD 1.5를 선택한 Civitai 필터.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-sd-1-5-lora-filters.jpg)

**Models** → **Filters**에서 **Model types**를 **LoRA**, **Base model**을 **SD 1.5**로 선택합니다. [필터링된 목록 열기](https://civitai.com/models?types=LORA&fileFormats=SafeTensor&baseModels=SD%201.5&sort=Most%20Downloaded). 체크포인트와 같은 필터 화면입니다.

### 2단계: LoRA safetensors 다운로드

![9.11 MB SafeTensor와 다운로드가 있는 SD 1.5 LoRA 페이지.](../../how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/civitai-sd-1-5-lora-download-fp16.jpg)

LoRA는 보통 10~150 MB로 훨씬 작으며 예시는 9.11 MB입니다. 정밀도를 표시하면 **fp16 SafeTensor**를 고르고 **Download**를 누르세요.

### 3단계: 가져오는 중 LoRA 추가

**Safetensor**의 **Base Model**을 **SD1.5**로 하고 체크포인트를 고릅니다. **LORA FILES (OPTIONAL)** → **Add LoRA**에서 파일과 강도를 정합니다. 초기값은 1.0이며 여러 개 추가할 수 있습니다. 준비 후 **Import & Convert**를 누릅니다.

SD 1.5는 LoRA를 변환 모델에 병합해 나중에 바꾸거나 제거할 수 없습니다. 조합을 바꾸려면 원본 체크포인트를 새 이름으로 다시 가져오세요.

## 자주 묻는 질문

### 휴대전화에서 SD 1.5를 사용할 수 있나요?

위 요구 사항을 만족하면 가능합니다. **Base Model**을 **SD1.5**로 선택해 Civitai 체크포인트를 가져옵니다. 기반을 재사용하는 계열은 Local Dream에 먼저 다운로드하세요.

### Civitai에서 어떤 SD 1.5 파일을 받나요?

**fp16 SafeTensor**입니다. 다른 정밀도나 PickleTensor(`.ckpt`)는 대상이 아닙니다.

### Civitai 가져오기에 인터넷이 필요한가요?

파일 다운로드 때만 필요합니다. 변환과 생성은 기기에서 합니다.

### iPhone에서 SD 1.5를 가져올 수 있나요?

네. iOS는 **Safetensor**에서 SD 1.5를 받습니다. 다른 계열은 Android 전용입니다.

### SDXL 등 다른 계열도 가져올 수 있나요?

Android는 SDXL, MOSS Image, Qwen Image 2.1, FLUX.2 Klein을 지원합니다. 위에 각 가이드가 있습니다.

### SD 1.5 LoRA를 쓸 수 있나요?

네. **Safetensor**에서 가져오는 중 추가합니다. SD 1.5용이어야 하며 강도는 변환 시 고정됩니다.

### 가져오기가 오래 걸리는 이유는?

전체 체크포인트를 변환해 수 분 걸릴 수 있습니다. 완료될 때까지 Layla를 열어 두세요.

### 가져온 모델을 삭제하려면?

**Local Dream**에서 모델을 고르고 **Delete Model**을 눌러 공간을 확보하세요.

## 휴대전화에서 오프라인 SD 1.5

가져온 뒤에는 인터넷, 계정, 구독 없이 기기에서 SD 1.5가 실행됩니다. 프롬프트, 모델과 이미지는 기기에 남습니다.
