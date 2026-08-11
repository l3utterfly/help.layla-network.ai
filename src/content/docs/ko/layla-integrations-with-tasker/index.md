---
title: Layla와 Tasker 연동
description: Layla의 Tasker 작업과 완료 이벤트를 사용하여 LLM으로 Android 워크플로를 자동화합니다.
category: Mini-apps & integrations
order: 50
keywords:
  - Layla Tasker 연동
  - Android 자동화
  - 백그라운드 추론
  - Task Completed 이벤트
  - LLM 자동화
lastUpdated: 2024-10-17
translationKey: layla-integrations-with-tasker
ai_translated: true
---

Layla는 Tasker와 연동됩니다. LLM을 사용하여 작업을 자동화할 수 있습니다.

![Tasker 로고.](./tasker-logo.png)

**Tasker란 무엇인가요?**

Tasker를 사용하면 기기의 트리거 조건에 따라 자동화된 작업을 만들 수 있습니다. 예를 들어 새 이메일이 도착하면 LLM에 이메일 내용을 요약하도록 요청할 수 있습니다.

_참고: 이 기능을 사용하려면 [Google Play에서 Tasker를 구매](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm&hl=en)해야 합니다._

Layla는 Tasker와 제휴 관계가 없습니다. Tasker는 Android 자동화에 널리 사용되는 앱입니다.

**Layla Tasker 작업을 만드는 방법**

Layla는 두 가지 주요 작업을 제공합니다.

1. **Infer:** 프롬프트와 입력을 Layla로 보냅니다. Layla는 나중에 입력을 LLM으로 처리하고 출력을 반환하는 추론 작업을 만듭니다.
2. **Infer in Background:** 동일한 작업을 수행하지만 백그라운드에서 LLM 추론을 즉시 실행합니다.

두 작업 모두 LLM 모델, 시스템 프롬프트 및 원시 입력과 같은 입력을 설정할 수 있습니다. 이러한 입력은 Tasker 변수로 제공되므로 다른 작업과 쉽게 연결할 수 있습니다.

![변수와 Layla의 Create Infer Task 동작을 사용하는 Tasker 체인 예시.](./tasker-chain.jpg)

위 이미지는 작업을 설정하는 방법의 예를 보여 줍니다.

1. _Variable Set_ 동작은 다른 작업에서 얻은 출력으로 대체할 수 있습니다. 예를 들어 Tasker에서 AutoNotification을 사용하면 알림에서 입력을 가져와 LLM에 전달할 수 있습니다.
2. *Create Infer Task*는 Layla가 제공하는 주요 작업입니다. 앞에서 설정한 변수를 LLM으로 처리합니다. 앞서 제공한 알림 내용을 요약하라는 지시가 한 가지 예입니다.

![Tasker에서 설정할 수 있는 Layla 추론 작업 옵션.](./infer-task-options.jpg)

Layla는 _Task Completed_ 이벤트도 제공합니다.

![Tasker의 Layla Task Completed 이벤트.](./task-completed-event.jpg)

이 이벤트는 Layla의 백그라운드 처리 과정에서 추론 작업이 끝날 때마다 실행됩니다. 이 이벤트를 연결하여 작업의 출력을 바탕으로 추가 동작을 실행할 수 있습니다.
