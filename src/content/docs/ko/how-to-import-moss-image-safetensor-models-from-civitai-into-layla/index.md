---
title: Civitai의 MOSS Image safetensors 모델과 LoRA를 Layla로 가져오기
description: Civitai에서 MOSS Image safetensors 체크포인트와 LoRA를 다운로드하고 Layla로 가져와 휴대전화에서 오프라인 이미지를 생성하는 방법을 안내합니다.
category: Image generation
order: 22
keywords:
  - MOSS Image
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
translationKey: how-to-import-moss-image-safetensor-models-from-civitai-into-layla
ai_translated: true
---

**Layla는 Civitai의 MOSS Image safetensors 체크포인트와 LoRA를 가져와 Android에서 오프라인 이미지를 생성합니다.** Stable Diffusion보다 최신인 텍스트-이미지 모델로, [Civitai](https://civitai.com/)에 커뮤니티 미세 조정 모델과 LoRA가 있습니다. 다운로드 후 변환과 생성은 기기에서 이루어집니다.

이 가이드는 호환 체크포인트 찾기, 올바른 파일 다운로드, 가져오기와 LoRA 추가를 설명합니다. 다른 계열: [SD 1.5](/ko/how-to-import-sd1-5-safetensor-models-from-civit-ai-into-layla/), [SDXL](/ko/how-to-import-sdxl-safetensor-models-from-civitai-into-layla/), [Qwen Image 2.1](/ko/how-to-import-qwen-image-2-1-safetensor-models-from-civitai-into-layla/), [FLUX.2 Klein](/ko/how-to-import-flux-2-klein-safetensor-models-from-civitai-into-layla/). GGUF, zip, Web UI는 [Layla에 사용자 지정 이미지 생성 모델 가져오기](/ko/how-to-import-custom-image-generation-models-into-layla/)를 참고하세요.

## MOSS Image란?

MOSS-Image는 OpenMOSS 팀이 2026년 10월 공개한 50억 매개변수의 가중치 공개형 텍스트-이미지 확산 트랜스포머입니다. **Base**는 미세 조정과 LoRA 학습용, **SFT**는 일반 생성용입니다. Civitai에는 양쪽 기반의 파생 모델이 있습니다.

Civitai **Base model**에서는 **MOSS Image**, Layla에서는 **MOSS**입니다. MOSS Image LoRA는 같은 계열 체크포인트가 필요합니다.

## 준비 사항

- Snapdragon 8 Elite(SM8750) 이상 Android 휴대전화. MOSS Image 가져오기는 Snapdragon NPU를 사용하며 iPhone에서는 제공되지 않습니다. 가져올 때 칩을 검사하지 않으므로 큰 파일을 변환하기 전에 직접 확인하세요.

- **Local Dream** 미니 앱. 설치는 [Layla 미니 앱 활성화 및 비활성화](/ko/how-to-enable-disable-mini-apps-within-layla/)를 참고하세요.

- Local Dream에 다운로드한 기본 모델: **MOSS-Image Turbo** / **MOSS-Image Base**. 토크나이저, 텍스트 인코더와 VAE를 재사용합니다. 없으면 Safetensor에서 경고하고 가져오기를 비활성화합니다.

- 충분한 여유 공간. MOSS fp16 체크포인트는 거의 10 GB입니다.

## 다운로드할 safetensors 파일

**Layla는 f16(반정밀도) safetensors를 지원하며**, Civitai 표기는 **fp16 SafeTensor**입니다. MOSS Image는 bf16도 가져올 수 있습니다. 양자화된 **fp8**, **int8**, **int4**, **nvfp4**는 지원하지 않습니다.

MOSS 체크포인트는 int8이나 bf16만 제공하는 경우가 많습니다. **Best match**가 양자화 파일을 가리킬 수 있으니 변형 목록을 열어 확인하세요.

## Civitai의 MOSS Image 체크포인트 가져오기

### 1단계: Civitai의 Models 열기

![Models 탭이 강조된 Civitai 홈 화면.](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/civitai-open-models-page.jpg)

[civitai.com](https://civitai.com/)을 열고 상단 **Models**를 선택합니다. 스크린샷은 데스크톱 브라우저이므로 모바일 배치가 조금 다를 수 있습니다.

### 2단계: Checkpoint, SafeTensor, MOSS Image로 필터링

![Checkpoint, SafeTensor, MOSS Image를 선택한 Civitai 필터.](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/civitai-moss-image-checkpoint-filters.jpg)

오른쪽 위 **Filters**를 엽니다.

1. **Model types**: **Checkpoint**.
2. **File format**: **SafeTensor**.
3. **Base model**: **MOSS Image** 검색 후 선택.

적절한 형식의 MOSS Image 체크포인트가 표시됩니다. [필터링된 목록 열기](https://civitai.com/models?types=Checkpoint&fileFormats=SafeTensor&baseModels=MOSS%20Image&sort=Most%20Downloaded).

### 3단계: fp16 safetensors 다운로드

![fp16 SafeTensor 9.47 GB와 Download가 표시된 Civitai 페이지.](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/civitai-moss-image-checkpoint-download-fp16.jpg)

모델 페이지 오른쪽 **Download**를 확인합니다. **fp16 SafeTensor**(예: 9.47 GB)를 골라 **Download**로 저장하세요. 여러 변형이 있으면 fp16을 선택합니다. bf16을 허용하는 예외는 위 설명을 참고하세요.

체크포인트만 있으면 됩니다. Civitai **Required Components**의 텍스트 인코더와 VAE는 다른 도구용입니다. Layla는 Local Dream에 받은 기반 모델의 보조 파일을 씁니다.

### 4단계: Layla로 가져오기

**Settings** → **Inference Settings** → **Image Generation** → **Add Custom Model**, 또는 **Local Dream** → **Add Model**을 엽니다.

![Inference Settings의 Image Generation과 Add Custom Model.](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/image-generation-settings.jpg)

**Safetensor**의 **Base Model**에서 **MOSS**를 고릅니다.

![SD1.5, SDXL, MOSS, Qwen Image 2.1, Flux 2 Klein의 Base Model 목록.](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/image-model-base-model-list-layla.jpg)

**MODEL CHECKPOINT**에서 파일을 고르고 **MODEL NAME**을 확인한 뒤 **Import & Convert**를 누릅니다. Q4_0 GGUF 확산 모델로 변환하며 수 분 걸릴 수 있으니 앱을 열어 두세요. 완료 후 저장하고 자동 선택합니다.

Layla는 파일의 계열을 검사하지 않습니다. 다른 계열에 **MOSS**를 지정하면 가져오기나 생성이 실패할 수 있습니다.

### 5단계: 이미지 생성

**Local Dream**에서 모델을 확인하고 프롬프트를 입력합니다. 초기값은 20단계와 CFG 5이며 변경 가능합니다. Turbo 등 적은 단계용 모델은 대체로 더 낮은 값이 필요합니다.

## Civitai의 MOSS Image LoRA 추가

LoRA는 스타일을 바꾸거나 인물, 사물, 개념을 더하는 작은 파일입니다. 체크포인트처럼 찾되 모델 종류를 바꿉니다.

### 1단계: LoRA와 MOSS Image로 필터링

![LoRA와 MOSS Image를 선택한 Civitai 필터.](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/civitai-moss-image-lora-filters.jpg)

**Models** → **Filters**에서 **Model types**를 **LoRA**, **Base model**을 **MOSS Image**로 선택합니다. [필터링된 목록 열기](https://civitai.com/models?types=LORA&fileFormats=SafeTensor&baseModels=MOSS%20Image&sort=Most%20Downloaded). 체크포인트와 같은 필터 화면입니다.

### 2단계: LoRA safetensors 다운로드

![61.54 MB SafeTensor와 다운로드가 있는 MOSS Image LoRA 페이지.](../../how-to-import-moss-image-safetensor-models-from-civitai-into-layla/civitai-moss-image-lora-download-fp16.jpg)

기반별 버전이 있으면 MOSS Image용(예: **v1.0 Moss**)을 고릅니다. **fp16 SafeTensor**(예: 61.54 MB)를 확인하고 **Download**를 누릅니다.

### 3단계: 가져오는 중 LoRA 추가

**Safetensor**의 **Base Model**을 **MOSS**로 하고 체크포인트를 고릅니다. **LORA FILES (OPTIONAL)** → **Add LoRA**에서 파일과 강도를 정합니다. 초기값은 1.0이며 여러 개 추가할 수 있습니다. 준비 후 **Import & Convert**를 누릅니다.

MOSS Image는 LoRA를 모델 폴더로 복사하고 생성 중 적용합니다. 완료 후 Local Dream에서 모델을 선택하고 **Model setup**으로 파일, 샘플러, LoRA를 확인하거나 편집하세요.

### 체크포인트 전체 없이 LoRA 사용

MOSS Image의 **Safetensor**에서 **LoRA only**를 켤 수 있습니다. Local Dream의 기반 모델과 LoRA만으로 새 모델을 만들어 큰 체크포인트의 변환 시간과 공간을 절약합니다.

## 자주 묻는 질문

### 휴대전화에서 MOSS Image를 사용할 수 있나요?

위 요구 사항을 만족하면 가능합니다. **Base Model**을 **MOSS**로 선택해 Civitai 체크포인트를 가져옵니다. 기반을 재사용하는 계열은 Local Dream에 먼저 다운로드하세요.

### Civitai에서 어떤 MOSS Image 파일을 받나요?

**fp16 SafeTensor** 또는 bf16입니다. 기본 선택이어도 fp8, int8, int4, nvfp4는 피하세요.

### MOSS Image 체크포인트는 왜 큰가요?

fp16은 50억 매개변수의 모든 가중치를 반정밀도로 저장해 거의 10 GB입니다. 양자화 파일은 작지만 가져오기를 지원하지 않습니다.

### MOSS Base와 SFT의 차이는?

Base는 미세 조정과 LoRA 학습용, SFT는 일반 생성용입니다. 둘 다 Layla에서 **MOSS**를 씁니다.

### iPhone에서 MOSS Image를 가져올 수 있나요?

아니요. iOS가 받는 safetensors는 SD 1.5뿐입니다. 위 SD 1.5 가이드를 참고하세요.

### Civitai 가져오기에 인터넷이 필요한가요?

파일 다운로드 때만 필요합니다. 변환과 생성은 기기에서 합니다.

### 가져온 모델을 삭제하려면?

**Local Dream**에서 모델을 고르고 **Delete Model**을 눌러 공간을 확보하세요.

## 휴대전화에서 오프라인 MOSS Image

가져온 뒤에는 인터넷, 계정, 구독 없이 기기에서 MOSS Image가 실행됩니다. 프롬프트, 모델과 이미지는 기기에 남습니다.
