# 공통 보드 코어와 어댑터

PR 1의 목적은 기존 HTTP 계약과 화면 동작을 유지하면서 보드 처리 규칙을 한곳으로 모으는 것이다. 화면·컴포넌트 재설계는 다음 PR에서 진행한다.

## 의존 방향

```text
core/domain                 프레임워크와 I/O를 모르는 타입·준비율·활동 규칙
    ↑
core/application            보드 조회·생성·완료·재개, 저장소와 런타임 포트
    ↑
infrastructure              HTTP·MSW·메모리 저장소·시스템 ID/시간 구현
    ↑
src/mocks · worker/index    실행 환경에 맞는 구현체를 연결하는 조립 지점

core/contracts → core/domain + Zod
src/infrastructure/http → core/application의 gateway + core/contracts
```

- 도메인은 응용·인프라·React·Hono·MSW에 의존하지 않는다.
- 응용 서비스는 도메인과 포트에만 의존한다. 생성 ID와 시각도 외부에서 주입한다.
- 입력 검증·제목 정규화와 HTTP 상태 매핑은 HTTP 어댑터 책임이다. 응용 서비스에는 검증된 입력을 전달한다.
- 계약 스키마는 HTTP 입력뿐 아니라 프런트엔드 응답 검증에도 사용한다. `response.json()`의 결과를 타입 단언만으로 신뢰하지 않는다.
- MSW와 Worker는 같은 Hono API와 응용 서비스를 사용한다. MSW는 HTTP 인터셉트와 데모 초기화를 담당한다.
- Worker에서 `src/`를 가져오는 의존은 없다. Cloudflare 상태 객체는 Worker 조립 지점에서만 구체화한다.
- `src/api.ts`는 기존 화면과의 호환을 위해 Query 훅과 클라이언트 조립을 일시적으로 유지한다. 표현 계층의 컨텍스트·컴포넌트 분리는 PR 2 범위다.

## 저장과 실패 처리

저장소의 `update`는 격리된 초안에 동기 변경을 적용한다. 반환값을 복제하고 변경이 성공한 뒤에만 저장한다. 조회와 변경은 같은 직렬 큐를 사용해, 앞선 저장이 끝나기 전에 다음 요청이 오래된 상태를 읽지 않도록 한다.

- 메모리 어댑터는 보드·반환값·초기 입력의 참조를 분리한다.
- Durable Object 어댑터는 저장 전 초안을 복제하고 하나의 `board` 스냅샷을 저장한다.
- 변경 함수나 저장 실패는 요청을 거절하지만 큐를 중단시키지 않는다.
- 요청 실패를 `blockConcurrencyWhile` 밖으로 전파해 객체를 재설정하는 방식 대신, 인스턴스별 큐와 HTTP 오류 경계를 사용한다.
- 반환된 항목이나 조회 결과를 호출자가 수정해도 저장 상태는 변하지 않는다.

Durable Object 이름 `demo`, 클래스 `ReleaseBoard`, 저장 키 `board`, 기존 스냅샷 필드를 유지한다. 저장 포맷 마이그레이션은 없다. 실제 Cloudflare 계정 연결과 원격 배포는 수행하지 않는다.

## 유지한 HTTP 계약

| 요청                   | 정상 결과                  | 입력·대상 오류                     |
| ---------------------- | -------------------------- | ---------------------------------- |
| GET `/api/health`      | 200, `{ status: "ok" }`    | 저장소를 호출하지 않음             |
| GET `/api/board`       | 200, `{ tasks, activity }` | 저장소 실패는 500                  |
| POST `/api/tasks`      | 201, 생성된 항목           | 잘못된 JSON·제목·분류는 400        |
| PATCH `/api/tasks/:id` | 200, 변경된 항목           | 잘못된 done은 400, 없는 항목은 404 |

분류의 wire 값, 제목 3–100자 및 trim, `{ error: string }` 형식, 최신 활동 20개 제한을 유지한다. 기존 UI와 API 문구의 한국어 전환은 PR 2에서 함께 처리한다. 저장소 오류의 내부 내용은 HTTP 응답에 노출하지 않는다.

MSW는 현재 origin의 API만 인터셉트한다. 기본 경로와 Pages의 `/excheck/api/` 경로를 모두 검증하며, 새로고침 초기화 동작을 유지한다.

## 검증 구성

- Vitest의 Node 프로젝트는 코어·공통 HTTP·Worker 어댑터를 검증한다.
- jsdom 프로젝트는 React 통합·클라이언트를 검증한다. 전역 MSW·필터 초기화는 이 환경에만 적용한다.
- 같은 HTTP 계약 시나리오를 MSW 루트·Pages 경로·Worker 라우팅/저장소 어댑터에 적용한다.
- 테스트 더블은 작은 저장소 포트만 구현한다. 불완전한 객체를 Cloudflare namespace로 이중 타입 단언하지 않는다.
- `pnpm typecheck`는 브라우저와 Worker를 별도 타입 환경에서 검사한다. Worker 전역 타입이 브라우저 Request 타입을 덮지 않는다.
- `pnpm worker:test:local`은 임시 저장소와 빈 포트로 실제 로컬 workerd를 실행해 생성·완료·입력 거절·동시 요청·프로세스 재시작 후 복원을 확인한다. 종료 시 자신이 시작한 프로세스와 임시 데이터만 정리한다.
- 브라우저 검사는 production 빌드와 Pages 하위 경로에서 전체 시나리오를 실행한다.

실행 명령과 원격 CI 결과는 PR에 기록한다. 이 문서는 Cloudflare 운영 환경, 새로운 UI 또는 자동 lint 규칙까지 검증했다는 뜻이 아니다.
