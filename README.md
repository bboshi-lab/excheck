# Launchboard

개발·디자인·운영의 체크를 모으는 출시 관제 워크스페이스입니다. 기능뿐 아니라 계층 설계·컴포넌트 분리·테스트·사용자 리뷰 과정을 검토하는 Codex Cloud 데모입니다.

[데모 열기](https://bboshi-lab.github.io/excheck/) · [기능 명세](docs/SPEC.md) · [작업 절차](docs/WORKFLOW.md)

## 시작하기

Node 24와 pnpm 11.25.0을 사용합니다.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

개발·production의 기본 모드는 **MSW**입니다. 브라우저가 API를 모의 처리하므로 계정·API 키·실제 서버가 필요 없습니다. 새로고침하면 체크와 활동은 초기 데이터로 돌아가며, 탭 사이의 데이터를 공유하지 않습니다.

`.env.example`은 공개 빌드 변수의 예시입니다. Vite가 dotenv 형식을 직접 읽으므로 별도 dotenv 패키지는 사용하지 않습니다. `VITE_*` 값은 번들에 포함되므로 비밀 정보를 넣지 않습니다. `VITE_API_MODE=mock`을 유지하면 배포된 데모도 같은 방식으로 동작합니다.

## 구조 살펴보기

```text
src/app · main             라우터·Provider·구현체 조립
src/presentation           화면·Query 훅·UI 상태·shadcn/ui
src/infrastructure/http    응답을 검증하는 HTTP 클라이언트
core                       도메인·응용 서비스·포트·계약
infrastructure             공통 Hono API·메모리 저장소·런타임
src/mocks · worker         브라우저 MSW·로컬 Worker 조립
tooling · scripts          ESLint 규칙·CI 판별·로컬 Worker 검증
```

React·TypeScript·Vite·Tailwind CSS를 사용합니다. 서버 상태는 TanStack Query, 분야 필터는 Zustand, API 모의 처리는 MSW가 담당합니다. UI는 shadcn/ui, 차트는 Recharts, 모션은 GSAP를 사용합니다. Worker는 Hono와 Durable Object를 조립하는 로컬 검증용 구현입니다.

## 검사하기

```sh
pnpm format:check          # Prettier 형식 검사
pnpm lint                  # 타입 기반 lint·React·import·계층 검사
pnpm test                  # 앱 테스트 + ESLint·CI 도구 테스트
pnpm typecheck             # 브라우저·Worker·도구 타입 검사
pnpm check                 # lint + test + 타입 검사 + production 빌드
pnpm worker:check          # Worker 로컬 번들, 원격 배포 없음
pnpm worker:test:local     # 실제 로컬 workerd 동시 요청·재시작 복원
```

`pnpm format`은 형식을 정리하고, `pnpm lint:fix`는 별칭·import 정렬 등 수정 가능한 규칙을 적용합니다. 자동 수정 후에도 diff를 검토합니다. 테스트를 반복하며 개발할 때는 `pnpm test:watch`를 사용합니다.

브라우저 검사는 **미리 빌드한 production 번들**을 사용합니다. Pages 하위 경로와 맞춰 실행합니다.

```sh
pnpm exec playwright install chromium
BASE_PATH=/excheck/ pnpm build
BASE_PATH=/excheck/ pnpm exec playwright test
```

데스크톱·모바일의 기능, 키보드·모션 축소, axe 접근성을 검사합니다. `pnpm check`에는 브라우저 검사와 Worker 런타임 검사가 포함되지 않으므로 별도로 실행합니다. 설명 문서만 바뀐 PR은 [합의한 예외](docs/QUALITY.md#문서-전용-ci)를 적용합니다.

## 로컬 미리보기와 Worker

```sh
BASE_PATH=/excheck/ pnpm build
BASE_PATH=/excheck/ pnpm preview
```

빌드와 미리보기에 같은 `BASE_PATH`를 전달합니다. 직접 루트에서 실행할 때는 둘 다 생략할 수 있습니다.

```sh
WRANGLER_SEND_METRICS=false pnpm worker:dev --local
```

Worker API는 `/api/`에 있고 Durable Object 데이터는 로컬 저장소에 남습니다. 프런트엔드는 기본적으로 이 Worker에 연결하지 않습니다. MSW를 끄기만 해서는 Pages와 Worker가 연결되지 않으며, 동일 출처 프록시 등 별도 설계가 필요합니다. 실제 Cloudflare 계정 연결과 원격 배포는 하지 않습니다.

### 현재 관리형 환경의 경로

이 Cloud 환경에서는 pnpm과 Wrangler의 기본 저장 위치가 쓰기 제한에 걸릴 수 있습니다. 필요한 명령에 아래 값을 적용합니다. 일반 로컬 개발기에서는 필수가 아닙니다.

```sh
export XDG_DATA_HOME=/workspace/.local/share
export XDG_CACHE_HOME=/workspace/.cache
export XDG_CONFIG_HOME=/workspace/.config
export WRANGLER_SEND_METRICS=false
```

설치된 Chromium을 재사용할 때는 다음과 같이 실행합니다. 기본 포트가 사용 중이면 `TEST_PORT`로 별도 포트를 지정합니다.

```sh
BASE_PATH=/excheck/ CHROMIUM_PATH=/usr/bin/chromium TEST_PORT=4293 pnpm exec playwright test
```

## 변경부터 배포까지

```text
Plan 사용자 승인 → 목적별 브랜치·구현·의미별 커밋 → PR·CI·자체 리뷰
                                                      ↓
                     합의된 Pages 자동 배포 ← 병합 ← 사용자 GitHub 승인
```

사용자의 현재 변경에 대한 GitHub 승인과 최신 필수 CI 통과를 확인한 뒤 병합합니다. 실행 코드가 `main`에 병합되면 Pages로 MSW 데모를 배포하며, 문서 전용 변경은 배포를 생략합니다. 자체 리뷰는 사용자 승인을 대체하지 않습니다.

## 문서 안내

- [기능·완료 기준](docs/SPEC.md): 화면, 입력, 실패 처리와 제외 범위
- [아키텍처 개요](docs/ARCHITECTURE.md): 책임·의존 방향, 실행 흐름과 기술 선택
- [코어·API·저장소](docs/CORE_ARCHITECTURE.md): 계약, 직렬화와 실패 처리
- [표현 계층](docs/PRESENTATION_ARCHITECTURE.md): 컴포넌트 분리·상태·접근성
- [품질 검사](docs/QUALITY.md): 경로 별칭·import 그룹·lint·문서 전용 CI
- [작업 절차](docs/WORKFLOW.md): Plan·커밋·PR·사용자 리뷰·배포·되돌리기
- [자체 리뷰와 검증 기록](docs/REVIEW.md): 확인한 근거와 남은 한계
- [작업 규칙](AGENTS.md): AI 작업 범위·승인 권한과 분야별 스킬 연결

인증·사용자 격리·운영 보안은 구현하지 않았습니다. 준비율은 체크 완료 비율이며 실제 출시의 안전성을 보장하지 않습니다.
