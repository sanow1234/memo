# Python 연습 웹사이트

브라우저에서 Python 문제를 풀고 실행·채점·디버깅하는 개인 학습용 애플리케이션입니다.

## 개발 명령

```bash
npm run dev
npm run typecheck
npm run test:run
npm run build
```

Windows PowerShell의 스크립트 실행 정책으로 `npm`이 차단되는 환경에서는 `npm.cmd`를 사용합니다.

## 현재 상태

- 1단계: 프로젝트 구조 및 데이터 구조 설계 완료
- 2단계: 기본 문제·코드 작업 화면 구성 완료
- 문제 데이터는 `src/data/problems.json`에서 관리
- 문제 형식은 `src/data/problem.schema.json`과 TypeScript 런타임 검증기로 검사

상세 설계는 `docs/architecture.md`를 참고하세요.
