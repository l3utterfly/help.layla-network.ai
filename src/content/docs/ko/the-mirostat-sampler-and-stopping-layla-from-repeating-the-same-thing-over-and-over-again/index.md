---
title: Mirostat 샘플러로 반복되는 응답을 줄이는 방법
description: Layla에서 Mirostat 샘플러를 활성화하고 적응형 퍼플렉시티 제어가 반복을 줄이는 방식을 알아봅니다.
category: Models & performance
order: 70
keywords:
  - Mirostat 샘플러
  - 반복되는 응답
  - 퍼플렉시티
  - 텍스트 생성
  - Layla 고급 설정
lastUpdated: 2024-01-12
translationKey: the-mirostat-sampler-and-stopping-layla-from-repeating-the-same-thing-over-and-over-again
ai_translated: true
---

Layla의 메시지가 계속 같은 방식으로 끝나는 경우 Mirostat 샘플러를 활성화하면 문제를 해결할 수 있습니다.

1. _설정_ 페이지로 이동합니다.
2. *고급 설정*을 누릅니다.
3. 아래로 스크롤하여 *MiroStat Sampler*를 켭니다.

![Layla에서 Mirostat 샘플러를 활성화하는 단계.](./enable-mirostat.png)

**Mirostat 샘플러란 무엇인가요?**

Mirostat 샘플러는 언어 모델을 위해 설계된 신경망 텍스트 디코딩 알고리즘으로, 텍스트 생성 중 퍼플렉시티를 직접 제어하는 데 중점을 둡니다. 퍼플렉시티는 시퀀스에서 다음 토큰을 예측할 때의 불확실성을 측정하며, 일반적으로 퍼플렉시티가 낮을수록 더 예측 가능한 텍스트를 의미합니다.

Mirostat는 일관성과 다양성의 균형을 맞추면서 생성된 텍스트의 품질을 원하는 범위로 유지하도록 설계되었습니다. 이를 통해 텍스트 생성에서 흔히 발생하는 두 가지 문제인 지나친 반복의 '지루함 함정'과 일관성이 없는 '혼란 함정'을 피할 수 있습니다. 목표 퍼플렉시티를 설정하고 피드백 기반의 적응형 접근 방식을 사용하면 임시적인 매개변수 조정 없이 정해진 퍼플렉시티 수준으로 원하는 길이의 텍스트를 생성할 수 있습니다.

사람이 평가한 실험에서 이 알고리즘은 문장 단위의 반복을 줄이고 유창성, 일관성 및 전반적인 텍스트 품질을 개선했습니다. 퍼플렉시티를 제어하면 반복되는 정도를 비롯하여 생성된 텍스트의 중요한 특성에 영향을 줄 수 있습니다.

Mirostat는 top-k, top-p 또는 nucleus sampling, temperature 기반 sampling과 같은 기존 샘플링 방식보다 발전된 접근 방식을 사용합니다. 이러한 방식은 세심한 조정이 필요한 경우가 많으며 그래도 불필요한 반복이나 일관성 없는 텍스트를 생성할 수 있습니다. Mirostat는 더 통제된 접근 방식을 통해 언어 모델의 출력을 더 안정적으로 만듭니다.

자세한 내용은 논문 [Mirostat: A Neural Text Decoding Algorithm that Directly Controls Perplexity](https://ar5iv.labs.arxiv.org/html/2007.14966)를 참고하세요.
