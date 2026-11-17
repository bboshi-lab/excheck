# 품질 검사와 import 규칙

`pnpm check`는 lint, 앱 테스트, 검사 도구 테스트, 타입 검사와 production 빌드를 실행한다. 브라우저와 로컬 Worker 검증은 별도 명령이며 CI에서도 실행한다. 파일·함수 줄 수나 복잡도의 임의 상한은 도입하지 않는다.

## 경로 별칭

`tsconfig.paths.json`이 경로의 단일 기준이다. 브라우저 TypeScript와 Worker·검사 도구의 tsconfig가 상속하고, Vite는 같은 JSON에서 alias를 만든다. Vitest는 Vite 설정을 상속하며 Wrangler는 `tsconfig.worker.json`을 읽는다.

- `@core/*`: 도메인·응용 포트·계약·fixture
- `@infrastructure/*`: 공통 HTTP·저장소·런타임 어댑터
- `@worker/*`: Worker 조립과 영속 저장소
- `@app/*`: 앱 조립
- `@presentation/*`: 페이지·기능 컴포넌트·레이아웃·훅
- `@ui/*`: shadcn/ui
- `@shared/*`: 공통 유틸리티
- `@client/*`: 브라우저 HTTP 구현
- `@mocks/*`: 브라우저 MSW 조립
- `@test/*`: React 검사 설정
- `@/*`: 위 별칭에 속하지 않는 src 리소스. 예: `@/styles.css`

애플리케이션·코어·Worker·테스트의 정적 import, 재수출, 동적 import와 TypeScript import type은 가장 구체적인 별칭으로 정규화한다. 예를 들어 `@presentation/ui/card`도 `@ui/card`로 고친다. Node가 직접 실행하는 설정·검사 도구의 mjs는 TypeScript 경로 매핑을 사용하지 않으므로 짧은 상대 경로를 유지한다.

## import 정렬과 그룹

외부 패키지와 프로젝트 모듈 순서로 정렬한다. 두 그룹 모두 import가 두 개 이상일 때만 사이를 빈 줄로 나눈다. 어느 쪽이 한 개뿐이면 전체를 한 블록으로 합친다. type import도 같은 모듈 기준으로 정렬한다.

```ts
import { useState } from "react"
import type { Task } from "@core/domain/task"
```

```ts
import { useState } from "react"
import { create } from "zustand"

import type { Task } from "@core/domain/task"
import { Button } from "@ui/button"
```

부수 효과 import는 초기화 순서를 보존하는 경계로 취급하며 그 전후의 선언만 정렬한다. 주석이 있는 구간은 내용을 이동하지 않고 위반을 보고한다. `pnpm lint:fix`는 안전하게 고칠 수 있는 별칭과 정렬을 적용하고, `pnpm format`은 Prettier 형식을 정리한다.

## 자동 검사 범위

- ESLint·TypeScript: 기본 오류, 사용하지 않는 선언, 잘못된 Promise 사용, 문맥에서 분리된 메서드 등
- React 검사: class 컴포넌트 차단, Hooks 호출·의존성, 누락된 key, 중첩된 컴포넌트·lazy 선언, 직접 상태 변경 등
- 프로젝트 React 규칙: function과 동시 export, 바로 위 Props type, 내부 const arrow function, 파일별 컴포넌트 분리
- 조합 규칙: View·Page·Shell의 HTML 또는 직접 작성한 하위 컴포넌트와 HTML의 혼합을 차단한다. 명명된 레이아웃과 말단은 실제 DOM을 소유한다.
- 마크업 규칙: 테이블 계열·br·정적인 role="table" 차단. 실제 브라우저 DOM에서도 회귀 검사한다.
- 모듈 경계: 도메인·응용·포트·계약·fixture·인프라·Worker·공통 UI·표현·앱 조립의 허용 방향을 검사한다. 테스트는 실제 어댑터를 연결할 수 있다.
- 순환 의존: TypeScript 별칭을 해석해 런타임 import 순환을 검사한다. 타입 import도 계층 경계 검사의 대상이다.
- 브라우저 접근성: axe로 대시보드와 입력 대화상자의 WCAG A·AA 관련 실제 DOM을 검사한다.

원본 shadcn 파일에는 직접 작성한 컴포넌트의 선언·파일 분리 규칙과 타입 기반 lint 예외를 적용한다. import 경로·정렬, 기본 타입 검사, Hooks와 금지 마크업 검사는 유지한다.

컴포넌트 이름의 설명력, 분리의 적절성, 의미별 개행, 동적 JSX의 모든 결과, 실제 사용성은 정적 검사만으로 판단하지 않는다. 리뷰와 브라우저 확인을 함께 수행한다. 자동 검사는 사용자 GitHub 승인 리뷰를 대신하지 않는다.

## 문서 전용 CI

CI는 Git의 변경 경로를 직접 읽는다. README·AGENTS·docs의 Markdown·SKILL 설명만 바뀌면 앱 검사·빌드·배포를 생략하고 생략 사실을 정상 체크 결과로 남긴다. `[skip ci]`로 필수 체크를 pending 상태로 만들지 않는다.

- 코드·설정·lockfile·스킬 실행 스크립트·이미지 등이 섞이면 전체 검사한다.
- 이름 변경은 삭제·추가 양쪽 경로로 읽어, 코드를 문서로 옮기는 변경도 전체 검사한다.
- 최초 push·수동 실행·유효한 비교 SHA가 없는 이벤트는 전체 검사한다.
- 변경 판별에 실패하면 CI가 실패한다. 실패를 문서 전용으로 간주하지 않는다.
- Pages도 같은 판별을 사용한다. 실행 코드의 main 병합은 기존 MSW 데모를 배포하고, 문서만의 병합은 배포를 생략한다.

`tooling/eslint/*.test.mjs`는 허용·위반 코드와 실제 별칭 순환을 검증한다. `scripts/change-scope.test.mjs`는 분류 경계와 실제 Git 이름 변경을 검증한다. 이 도구들이 바뀌는 PR은 문서 전용이 아니다.

## 버전 선택

Node 24, ESLint 10, TypeScript 6.0.3과 typescript-eslint 8.72.0을 사용한다. ESLint 9는 지원 종료 경고가 있어 10으로 전환했다. 구형 eslint-plugin-react·jsx-a11y의 ESLint 10 peer 범위를 벗어나지 않도록 현재 React 플러그인과 브라우저 axe 검사를 사용한다.

typescript-eslint는 TypeScript 7을 지원하지 않으므로 지원 범위 안의 6.0.3으로 맞췄다. 8.73은 게시 후 최소 경과 시간 정책에 걸려 같은 TypeScript 지원 범위의 8.72를 선택했다. 의존성 정책 예외는 추가하지 않는다.
