---
title: 고급 휴대전화에서 Layla의 응답이 느릴 때 해결하는 방법
description: 리소스를 확보하고 배터리 설정을 변경하며 적절한 기본 모델을 선택하여 로컬 Layla의 응답 속도를 높입니다.
category: Troubleshooting
order: 40
keywords:
  - Layla 성능
  - 느린 응답
  - 고급 휴대전화
  - 배터리 최적화
  - Q2 모델
lastUpdated: 2024-04-07
translationKey: layla-is-responding-slowly-even-though-i-have-an-high-end-phone-what-can-i-do
ai_translated: true
---

Layla는 ChatGPT와 같은 챗봇을 인터넷 연결 없이 휴대전화에서 로컬로 실행하는 새로운 기술을 사용하므로 상당한 리소스가 필요합니다.

**12GB RAM이 탑재된 S23 Ultra** 같은 고급 휴대전화에서 Layla Full의 예상 응답 속도는 초당 한두 단어 정도입니다. 고급 휴대전화에서도 응답이 느리다면 다음 방법 중 하나 이상을 시도하세요.

- 모든 백그라운드 앱을 닫습니다.
- Layla의 배터리 최적화를 끕니다. _설정_ → _앱 및 알림_ → _Layla_ → _고급_ → _배터리_ → *배터리 최적화*로 이동한 다음 *최적화하지 않음*을 선택합니다.
- 지원되는 경우 휴대전화 설정에서 고성능 모드나 게임 모드를 켭니다.
- Q2 기본 모델로 전환합니다. Layla Full과 지능은 거의 같으면서 성능은 더 좋습니다.

**RAM은 성능을 결정하는 요소 중 하나일 뿐입니다. 충분한 용량을 확보한 뒤에는 RAM을 더 추가해도 도움이 되지 않으며, 나머지는 CPU 성능에 달려 있습니다.**

예상할 수 있는 응답 속도의 대략적인 기준은 다음과 같습니다.

- **12nm CPU 칩셋:** Tiny 모델은 초당 한두 단어를 생성하며, 다른 모델은 일반적으로 실용적으로 사용하기 어렵습니다.
- **6nm CPU 칩셋:** Lite 모델은 초당 한두 단어를 생성하며, Full 모델은 분당 몇 단어만 생성할 수 있습니다.
- **4nm CPU 칩셋:** Full 모델은 초당 한두 단어를 생성합니다. Lite 모델은 클라우드 AI 제공업체와 거의 같은 속도입니다.

지원되는 휴대전화에 관한 자세한 내용은 [Layla 도움말 및 지원](https://www.layla-network.ai/contact)을 참고하세요.

![Layla 도움말 및 지원 페이지.](./help-and-support.jpg)
