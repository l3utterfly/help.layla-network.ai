---
title: Layla에서 Python 지원을 활성화하는 방법
description: Layla Agent의 Python 코드 실행을 활성화하고 패키지를 설치한 다음 Python 출력을 LLM에 반환하는 테스트 Agent를 만듭니다.
category: Agents & tools
order: 80
keywords:
  - Python 지원
  - Python 인터프리터
  - Layla Agent
  - Python 실행
  - pip 패키지
lastUpdated: 2026-03-24
translationKey: how-to-enable-python-support-in-layla
ai_translated: true
---

v6.7.0 업데이트부터 Layla Agent에서 Python을 실행할 수 있습니다. [Layla v6.7.0이 출시되었습니다](https://www.layla-network.ai/post/layla-v6-7-0-has-been-published).

Python 코드 실행을 활성화하려면 몇 가지 미니 앱을 설치해야 합니다. 필요한 경우 [Layla에 기능(미니 앱)을 추가하는 방법](/how-to-add-features-mini-apps-in-layla/)을 참고하세요.

**1단계: _Agent_ 및 _Python 인터프리터_ 미니 앱 설치**

앱으로 이동하여 더하기 기호를 누르고 미니 앱을 찾아봅니다. *Agent*와 *Python 인터프리터*를 찾아 **다운로드**를 눌러 Layla에 추가합니다.

![Layla Agent 미니 앱 상세 화면.](./agents-mini-app.jpg)

![Layla Python 인터프리터 미니 앱 상세 화면.](./python-interpreter-mini-app.jpg)

**2단계: _Python 인터프리터_ 테스트**

두 미니 앱을 설치한 후 Python 인터프리터 미니 앱으로 이동하여 테스트합니다.

오른쪽 위의 **실행** 버튼을 눌러 간단한 'Hello Layla' 스크립트를 실행해 보세요.

![print Hello Layla 스크립트를 실행하고 콘솔 출력을 표시하는 Python 인터프리터.](./hello-layla-python.jpg)

아래 콘솔 출력에 초록색 'Hello Layla!' 텍스트가 표시되어야 합니다. 이는 Layla에서 Python이 작동한다는 의미입니다.

**3단계(선택 사항): 종속성 설치**

라이브러리와 종속성을 설치할 수 있으면 Python 스크립트의 활용도가 높아집니다. Layla는 이 기능을 지원합니다.

출력 아래의 **패키지 관리자**를 사용하면 PC에서처럼 `pip`로 Python 패키지를 설치할 수 있습니다.

네트워크 요청에 널리 사용되는 `requests`를 설치해 보겠습니다.

![requests 패키지를 설치하는 Python 인터프리터 패키지 관리자.](./install-python-package.jpg)

패키지 관리자 입력란에 `requests`를 입력하고 **추가**를 누릅니다.

팁: 이 입력란은 명령줄처럼 작동합니다. `--upgrade` 같은 인수로 설치된 패키지를 교체하고, `[패키지 이름]==[버전]`으로 버전을 고정하며, 여러 패키지 이름을 공백으로 구분해 한 번에 설치할 수 있습니다.

이후 설치 진행 상황을 설명하는 초록색 텍스트가 표시됩니다.

**3단계: 테스트 Agent 만들기**

Agent가 스크립트를 실행할 수 있으면 Python이 훨씬 유용해집니다. Layla는 이 기능을 지원합니다.

여기서는 LLM에 전송할 내용을 출력하는 간단한 테스트 Agent를 만듭니다. 이후 글에서는 더 복잡한 Agent를 다룰 예정입니다.

Agent 미니 앱으로 돌아가 기존 Agent를 복제합니다.

기억하기 쉬운 이름과 설명으로 수정합니다.

![복제된 Test Python code Agent가 표시된 Layla Agent 목록.](./duplicate-agent.jpg)

새 Agent를 편집합니다.

![Python이 문구 트리거로 설정된 Layla Agent 편집 화면.](./python-agent-trigger.jpg)

지금은 **Python**이라는 문구만 사용합니다. Layla에 보내는 메시지에서 'Python'을 언급하면 이 Agent가 실행됩니다. 더 복잡한 Agent에는 나중에 더 정교한 트리거가 필요합니다.

**Python 코드 실행** 도구를 추가합니다.

![Python 코드 실행을 포함한 도구 목록이 표시된 Layla Agent 편집 화면.](./add-execute-python-tool.jpg)

Python 코드 도구에서 실행할 스크립트를 편집하고 필요한 종속성을 추가할 수 있습니다. 테스트에서는 간단한 `print` 문만 사용합니다.

![간단한 print 문으로 설정된 Layla Python 코드 실행 도구.](./configure-python-tool.jpg)

이 `print` 코드는 종속성이 필요 없으므로 해당 섹션은 비워 둡니다.

Agent가 완성되었습니다.

돌아가서 Layla와 채팅을 시작하세요. Agent 목록에서 스위치가 켜져 있는지 확인합니다.

'Python'을 언급하면 코드가 실행되고 출력이 LLM으로 전송됩니다.

![Python 코드 실행을 마쳤다고 보고하는 Layla 채팅.](./python-agent-execution.jpg)

![Hello from Python code라고 응답하는 Layla 채팅.](./python-agent-response.jpg)
