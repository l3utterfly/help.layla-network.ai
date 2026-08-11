---
title: Layla에서 Agent, Function 및 Tool Calling을 활성화하는 방법
description: Layla의 기기 내 Agent, Function 및 Tool Calling 기능에 관한 개요입니다.
category: Agents & tools
order: 10
keywords:
  - Layla Agent
  - Tool Calling
  - Function
  - Agent 미니 앱
  - 커스텀 캐릭터
lastUpdated: 2025-10-01
translationKey: how-to-enable-agents-functions-and-tool-calling-in-layla
ai_translated: true
---

Layla v6는 기기에서 실행되는 로컬 *Agent*를 지원하여 Layla가 도구를 사용하고 외부 서비스와 통신할 수 있도록 합니다.

이 글에서는 Layla의 Agent 작동 방식과 Agent로 할 수 있는 작업을 간략하게 설명합니다.

**Agent 미니 앱**

앱 찾아보기 화면에서 **Agent** 미니 앱을 설치하면 Layla의 에이전트 기능을 사용할 수 있습니다.

![Layla Agent 미니 앱 개요.](./agents-mini-app-overview.jpg)

Layla에서 **Agent** 미니 앱을 다운로드하여 설치합니다. 앱을 열면 바로 사용할 수 있도록 미리 만들어진 다양한 Agent가 표시됩니다.

![Agent 미니 앱의 미리 만들어진 Agent 목록.](./agents-list.jpg)

_이 도구는 이미 만들어져 있으며 바로 작동합니다. 편집할 필요가 없습니다._ 돌아가서 Layla와 새 채팅을 시작하면 자동으로 작동합니다.

![채팅에서 DuckDuckGo News 및 Web Reader Agent를 사용하는 Layla.](./duckduckgo-agent-chat.jpg)

위 화면에서는 *Web Reader*와 _DuckDuckGo News Results_ Agent가 활성화되어 인터넷에서 최신 뉴스를 가져옵니다.

Layla의 Agent는 캘린더 일정 등록, 알람 및 미리 알림 생성, 이메일 및 SMS 전송 등 더 많은 작업을 수행할 수 있습니다. 사용 가능한 모든 Agent 목록은 Agent 미니 앱에서 확인하세요.

**Agent 활성화 및 비활성화**

기본적으로 *Agent 미니 앱*에서 활성화된 모든 Agent를 캐릭터 Layla가 사용할 수 있습니다. Layla가 특정 Agent에 접근하지 못하게 하려면 아이콘 아래의 스위치를 끄세요.

커스텀 캐릭터에 Agent를 연결할 수도 있습니다. 캐릭터 만들기의 _고급_ 탭으로 이동합니다.

![Agent 선택 컨트롤이 표시된 캐릭터 만들기 화면의 고급 탭.](./character-advanced-agents.jpg)

_Agent 선택_ 버튼을 누르면 사용 가능한 모든 Agent 목록이 표시됩니다. 캐릭터에 연결할 Agent를 선택하세요. 선택한 Agent만 활성화됩니다.

캐릭터가 모든 Agent에 접근하지 않도록 설정하고 싶을 때도 있습니다. Agent가 너무 많으면 캐릭터가 혼란스러워할 수 있습니다. 또한 역할극 전용 캐릭터가 세션 도중 '웹 검색'을 하면 몰입감이 깨질 수 있습니다. Layla에서는 원하는 방식으로 Agent 사용을 자유롭게 설정할 수 있습니다.

_참고: Layla라는 이름은 앱 전체와 나비 로고로 표시되는 기본 캐릭터 'Layla'를 모두 가리킵니다. 직접 캐릭터를 만들지 않으면 이 캐릭터가 사용됩니다._

**자신만의 Agent 만들기**

Layla에서는 자신만의 도구와 Agent를 만들 수 있습니다. 필요에 맞게 Agent를 설정하거나 자체 서비스와 연동할 수 있습니다.

자신만의 Agent와 도구를 만드는 방법 및 내부 작동 방식에 관한 자세한 내용은 다음 글을 참고하세요.

- [첫 Agent를 빠르게 만들기](/how-to-create-agents-in-layla/)
- [Agent 작동 방식 자세히 알아보기](/deep-dive-into-layla-agents/)
- [Layla의 MCP 지원](/full-mcp-support-in-layla/)
