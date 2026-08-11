---
title: Layla에서 Python으로 DuckDuckGo 뉴스 검색 Agent를 만드는 방법
description: Python을 사용해 DuckDuckGo News를 검색하고 결과를 LLM에 반환하는 Layla Agent를 만듭니다.
category: Agents & tools
order: 60
keywords:
  - DuckDuckGo 뉴스 검색
  - Layla Agent
  - Python Agent
  - Python 실행
  - Tool Calling
lastUpdated: 2026-04-02
translationKey: how-to-create-a-duckduckgo-news-search-agent-with-python-in-layla
ai_translated: true
---

이 글에서는 Layla의 Agent 미니 앱을 사용하여 Python으로 실행되는 DuckDuckGo 뉴스 검색 Agent를 만듭니다. [Layla에서 Python을 활성화](/how-to-enable-python-support-in-layla/)했는지 확인하세요.

**1단계: 기존 Agent 복제**

가장 쉬운 시작 방법은 기존 Agent를 복제한 다음 복사본을 편집하는 것입니다. 이름과 설명을 변경합니다.

![복사본의 이름을 DuckDuckGo News Search (Python)으로 지정한 Layla Agent 편집 화면.](./agent-name-description.jpg)

**2단계: 트리거 추가**

이 Agent에 트리거를 몇 개 추가합니다.

![사용 가능한 트리거 유형이 표시된 Layla Agent 편집 화면.](./agent-trigger-options.jpg)

**News Search** 인텐트와 고정된 **news** 문구를 추가합니다. Agent를 호출하려는 방식에 따라 원하는 트리거를 추가할 수 있습니다.

![News Query 인텐트로 설정된 Agent 트리거.](./news-query-intent.jpg)

![News라는 단어로 설정된 Agent 문구 트리거.](./news-phrase-trigger.jpg)

**3단계: Python 도구 추가**

다음으로 Python 실행 도구를 추가합니다. 이 섹션에는 DuckDuckGo를 조회하는 로직을 실제로 실행할 Python 코드가 포함됩니다. 이 부분을 이해하려면 Python에 관한 지식이 있으면 좋습니다.

[GitHub Gist의 Python 코드](https://gist.github.com/l3utterfly/bf9f703c09932fd87dbf68f2118e5ab4)를 살펴보세요.

파일 상단에서 _requests_ 라이브러리가 필요하다는 점을 확인하세요(`re`와 `html`은 Python에 포함됨).

![requests, re 및 html을 위한 Python import.](./python-imports.png)

Python 미니 앱으로 이동하여 `requests` 패키지를 추가합니다. 설치 단계는 [Layla에서 Python 지원을 활성화하는 방법](/how-to-enable-python-support-in-layla/)을 참고하세요.

다음 부분은 `QUERY`입니다.

![Layla 입력 템플릿을 QUERY에 할당하고 LIMIT를 5로 설정하는 Python 코드.](./python-query-input.png)

Layla는 메시지나 이전 도구의 출력을 특수 템플릿 `{{input}}`에 삽입합니다. 이는 단순한 텍스트 치환이며 입력은 더 이상 수정되지 않습니다.

이 패턴을 사용하면 Python 스크립트에서 여러 유형의 입력을 받을 수 있습니다.

이 Agent에서는 전체 사용자 쿼리를 Python 스크립트에 그대로 전달합니다.

Python 스크립트는 표준 HTTP 요청을 실행하고 내장 HTML 파서로 응답을 분석합니다.

Python 스크립트는 간단한 `print` 문을 통해 LLM에 정보를 전달합니다.

![각 뉴스 결과의 제목, 출처, 요약 및 URL을 출력하는 Python 루프.](./python-print-results.png)

이 방식은 매우 유연합니다. 결과, 지시 또는 두 가지의 조합처럼 LLM이 받아야 할 내용을 출력하면 됩니다.

전체 Python 스크립트를 복사하여 Python 도구의 입력란에 붙여 넣습니다.

![DuckDuckGo Python 스크립트가 포함된 Layla Agent 편집 화면.](./agent-python-tool.jpg)

Agent가 완성되었습니다.

**마지막 단계: Agent 테스트**

Agent를 테스트하세요. 기본 캐릭터 Layla에서 사용하도록 활성화하거나 기존 캐릭터에 연결해야 합니다.

![news 문구가 Python 코드 실행을 트리거한 Layla 채팅.](./news-agent-triggered.jpg)

키워드 **news**가 감지되면 Agent가 Python 코드를 실행하기 시작합니다. 이 트리거는 첫 번째 단계에서 설정했습니다.

![DuckDuckGo News 결과 5개를 바탕으로 응답하는 Layla 채팅.](./news-agent-response.jpg)

Layla는 Python 코드의 출력을 읽고 질문에 답하기 위한 컨텍스트로 사용합니다.

이것으로 간단한 DuckDuckGo 뉴스 검색 Agent가 완성되었습니다. 이후 글에서는 더 복잡한 Agent를 만들 예정입니다.
