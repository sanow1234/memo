# 프로젝트 구조 및 데이터 설계

## 계층

- `app`: 애플리케이션 진입점과 라우팅
- `pages`: URL 단위 화면
- `components`: 화면에 표시되는 재사용 UI
- `features`: 문제, 실행, 채점, 오답, 디버거의 도메인 로직
- `workers`: Pyodide를 메인 UI와 분리해 실행하는 Web Worker
- `data`: 개념 및 문제 JSON과 JSON Schema
- `test`: 공통 테스트 설정

화면 컴포넌트는 Pyodide와 localStorage를 직접 호출하지 않는다. 각 외부 기능은 `features` 아래의 전용 모듈을 통해서만 접근한다.

## 예정 구조

```text
src/
├─ app/
├─ pages/
├─ components/
│  ├─ problem/
│  ├─ editor/
│  ├─ execution/
│  ├─ grading/
│  └─ debugger/
├─ features/
│  ├─ problems/
│  ├─ execution/
│  ├─ grading/
│  ├─ wrongAnswers/
│  └─ debugger/
├─ workers/
├─ data/
└─ test/
```

아직 구현하지 않은 단계의 빈 디렉터리는 만들지 않는다. 해당 기능을 구현할 때 테스트와 함께 추가한다.

## 문제 데이터 규칙

- 문제 ID는 `001`처럼 세 자리 이상의 숫자 문자열이다.
- 난이도는 `easy`, `medium`, `hard` 중 하나다.
- 문제는 하나 이상의 개념을 가진다.
- 예시와 채점용 테스트 케이스는 분리한다.
- 시간 제한은 100~10000ms 범위의 정수다.
- 문제 및 테스트 케이스 ID는 각 범위에서 중복될 수 없다.
- `problems.json`은 3단계에서 실제 문제를 추가하기 전까지 빈 배열로 유지한다.

## 실행 격리

일반 실행과 채점은 Pyodide Web Worker를 공유하되 실행마다 별도 전역 공간을 사용한다. 무한 반복처럼 협조적으로 중단되지 않는 코드는 Worker 자체를 종료해 제한 시간을 보장한다. 디버거는 상태를 유지해야 하므로 별도 Worker 세션으로 구현한다.

Vite 개발·미리보기 서버에는 디버깅과 실행 중단에 필요한 교차 출처 격리 헤더를 설정한다. 정적 배포 환경에서도 같은 헤더 설정이 필요하다.
