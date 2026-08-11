---
title: 역할극 Agent를 만드는 방법
description: 캐릭터가 행동-대화 형식으로 응답하도록 하는 Layla Agent를 만듭니다.
category: Agents & tools
order: 70
keywords:
  - Layla Agent
  - 역할극 Agent
  - 구조화된 출력
  - BNF 문법
  - 행동과 대화
lastUpdated: 2025-10-01
translationKey: how-to-create-a-roleplay-agent
ai_translated: true
---

Layla에서 간단한 *역할극 Agent*를 만들어 보겠습니다.

이 Agent는 캐릭터가 **행동-대화** 형식으로 응답하도록 합니다.

예:

> `*손을 흔들며 미소 짓는다* 안녕!`

다음 설정으로 Agent를 만드세요.

![역할극 Agent의 이름, 설명 및 정규식 트리거 설정.](./roleplay-agent-settings.jpg)

![역할극 Agent의 구조화된 출력 도구와 BNF 문법.](./roleplay-structured-output.jpg)

이 Agent의 작동 방식을 살펴보겠습니다.

1. 이름과 설명은 원하는 대로 작성할 수 있으며, Agent를 쉽게 식별하는 데 사용됩니다.

2. *정규식 트리거*를 사용합니다. 정규식 `.`(마침표)은 모든 내용과 일치하므로 모든 메시지에서 Agent가 실행됩니다. 모든 출력이 지정한 형식을 따르도록 하려는 목적에 맞는 설정입니다.

3. _구조화된 출력_ 도구를 사용합니다. 이 도구는 BNF 문법을 사용해 출력을 구성합니다.

   - `root`는 항상 필요하며 문법 정의를 시작합니다.
   - `::=`는 변수에 문법을 할당하는 대입 연산자입니다.
   - `turn`은 사용자가 정의한 변수이며 다음 줄에 정의가 있습니다. 리터럴 `*` 문자, 사용자 정의 변수인 `fragment`, 또 다른 `*`, 그리고 다른 fragment로 구성됩니다.
   - `fragment`는 행동 또는 대화입니다. 줄바꿈을 제외한 모든 내용으로 정의됩니다.

4. 이 요소들을 조합하면 출력은 `*fragment*fragment`로 정의되며 각 `fragment`는 줄바꿈이 아닌 모든 텍스트가 될 수 있습니다. 이것이 원하는 형식입니다.

아래에서 Agent 파일을 다운로드하여 가져올 수 있습니다. _새 Agent 추가_ 버튼을 사용해 가져오세요.

[roleplay-action-dialogue.json 다운로드](/assets/articles/how-to-create-a-roleplay-agent/roleplay-action-dialogue.json)
