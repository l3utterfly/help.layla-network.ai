---
title: Layla에 Vision LLM을 추가하는 방법(Qwen3-VL)
description: Qwen3-VL GGUF 모델과 mmproj 파일을 다운로드하고 채팅에서 이미지를 인식할 수 있도록 Layla에 두 파일을 설정합니다.
category: Models & performance
order: 40
keywords:
  - Vision LLM
  - Qwen3-VL
  - mmproj
  - GGUF Vision 모델
  - 이미지 인식
lastUpdated: 2025-11-24
translationKey: how-to-add-vision-llms-in-layla-qwen3-vl
ai_translated: true
---

이 글에서는 Layla에 Vision LLM을 추가하는 방법을 설명합니다.

Layla는 Vision LLM을 지원하므로 채팅에서 이미지를 보내고 그 내용을 인식하거나 이미지에 관해 대화할 수 있습니다.

Qwen3-VL 모델 제품군을 예로 들어 보겠습니다. 이 모델에는 모바일에서도 원활하게 작동하는 이미지 인식 기능이 포함되어 있습니다.

Layla에서 사용하는 방법은 다음과 같습니다.

**1단계: Qwen3-VL 모델 다운로드**

[Hugging Face의 Qwen3-VL-2B-Instruct-GGUF 저장소](https://huggingface.co/unsloth/Qwen3-VL-2B-Instruct-GGUF/tree/main)에서 찾을 수 있습니다.

2B 모델을 권장합니다. 속도가 빠르고 정확도도 높은 편입니다. 성능이 좋은 휴대전화를 사용한다면 더 큰 4B 또는 8B 모델을 사용해 볼 수 있습니다.

페이지의 파일 목록에서 **Q4_K_M** 양자화를 선택하여 다운로드합니다.

![Qwen3-VL 2B Q4_K_M GGUF 파일이 강조 표시된 Hugging Face 파일 목록.](./qwen-model-download.png)

조금 아래로 스크롤하여 **mmproj-F16** 파일을 찾습니다.

![Qwen3-VL mmproj-F16 GGUF 파일이 강조 표시된 Hugging Face 파일 목록.](./mmproj-download.png)

이 파일도 다운로드합니다.

**2단계: Layla에서 모델 설정**

Layla로 돌아가 **추론 설정**을 엽니다. **LLM** 섹션에서 **커스텀 모델 추가**를 선택한 다음 **내부 저장소에서 선택**을 누릅니다.

![커스텀 모델 추가가 강조 표시된 Layla 추론 설정.](./add-custom-model.jpg)

![내부 저장소가 강조 표시된 Layla 추론 엔진 선택 화면.](./pick-internal-storage.jpg)

설정을 마치면 다음과 같이 표시됩니다. 선택한 모델 이름의 **Q4_K_M** 접미사를 확인하세요.

![선택한 Qwen3-VL Q4_K_M 모델이 표시된 Layla 추론 설정.](./selected-qwen-model.jpg)

그런 다음 **LLM Vision** 섹션으로 이동하여 `mmproj` 파일을 선택합니다. 설정은 다음과 같이 표시됩니다.

![선택한 Qwen3-VL mmproj-F16 모델이 표시된 Layla LLM Vision 설정.](./selected-mmproj-model.jpg)

이 설정을 사용하면 채팅에 이미지를 보내고 Layla가 이미지를 인식하도록 할 수 있습니다.
