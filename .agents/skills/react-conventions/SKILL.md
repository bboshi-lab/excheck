---
name: react-conventions
description: React 컴포넌트를 생성하거나 수정할 때 선언·export·props·내부 함수 컨벤션, 선언적 View 조합과 말단 마크업 분리, 테이블·br 금지, 기능 개발 중 기존 코드 정리 범위를 판단할 때 적용한다.
---

# React 컴포넌트 컨벤션

## 적용 전 확인

1. 루트 `AGENTS.md`, 승인된 Plan, 작업 범위의 기존 컴포넌트·공통 UI·관련 설계를 읽는다.
2. 이번 작업이 기능 개발인지 명시적으로 승인된 리팩터링인지 구분한다.
3. 새로 작성하는 코드와 기능 구현에 필요한 수정에는 아래 컨벤션을 적용한다.
   기존 파일 전체를 컨벤션에 맞추는 작업까지 자동으로 승인된 것으로 해석하지 않는다.

## 선언과 export

- React 컴포넌트는 `function` 키워드로 정의한다. arrow function으로 컴포넌트를 정의하지 않는다.
- 정의한 줄에서 함께 export한다. 기본 형태는 `export function ComponentName(...)`이다.
- 컴포넌트 이름은 PascalCase를 사용한다.
- props는 컴포넌트 위에서 `type ComponentNameProps = { ... }`로 정의한다.
  `xxxProps`의 `xxx`는 컴포넌트 이름이다. inline 객체 타입이나 `interface`로 대체하지 않는다.
- props가 없는 컴포넌트에 형식만 맞추기 위한 빈 Props 타입을 만들지 않는다.
- 컴포넌트 내부에 선언하는 이벤트 핸들러·보조 함수는 `const handler = () => { ... }`처럼
  `const`와 arrow function을 사용한다. 내부에 `function handler()`를 선언하지 않는다.
- 위 함수 선언 규칙은 컴포넌트와 그 내부 함수에 대한 규칙이다. 이 규칙만으로
  무관한 기존 유틸리티나 도메인 함수의 선언 방식을 일괄 변경하지 않는다.

```tsx
type LaunchCheckProps = {
  title: string
  completed: boolean
  onToggle: () => void
}

export function LaunchCheck({ title, completed, onToggle }: LaunchCheckProps) {
  const handleToggle = () => {
    onToggle()
  }

  return (
    <button type="button" aria-pressed={completed} onClick={handleToggle}>
      {title}
    </button>
  )
}
```

## 컴포넌트와 파일 분리

- 직접 작성하는 컴포넌트는 크기와 무관하게 한 파일에 하나씩 정의한다. 작은 보조 컴포넌트도 별도 파일로 둔다.
- View·페이지·영역 조립 컴포넌트의 `return`은 역할을 드러내는 컴포넌트의 조합으로 작성한다.
  태그 이름만 읽어도 화면의 영역과 계층을 이해할 수 있어야 한다.
- 상위 View에 `div`·`span`과 긴 className, 제목·설명·버튼·범례·목록 항목의 세부 마크업을
  섞지 않는다. 레이아웃, 헤더, 본문, 요약, 항목, 필드, 상태 등 의미별 하위 컴포넌트로 내린다.
- HTML 요소와 스타일은 명명된 레이아웃 또는 말단 컴포넌트가 소유한다. 상위에서 HTML 중첩을
  한 겹만 감춘 뒤 내부의 마크업 덩어리를 그대로 두는 분리로 끝내지 않는다.
- 단순히 `Wrapper`, `Content1`처럼 붙이지 않는다. `DashboardPanels`, `ChecklistProgress`,
  `CategoryChartLegend`, `TaskTitleField`처럼 화면에서 담당하는 역할을 이름으로 설명한다.
- 재사용 가능한 UI는 컴포넌트로, 재사용 가능한 상태·검증·이벤트 로직은 Hook으로 분리한다.
  재사용되지 않아도 상위의 의도를 읽기 어렵게 만드는 책임은 분리한다.
- JSX를 반환하는 함수나 변수, 함수 본문 안의 컴포넌트 선언으로 파일 분리를 우회하지 않는다.
- 파일 수를 줄이는 것을 이유로 분리를 생략하지 않는다. 파일 수 자체에 목표나 상한을 두지 않고,
  사용자에게 합의받지 않은 줄 수·복잡도 기준을 임의로 만들지 않는다.
- shadcn/ui에서 가져온 원본은 기존 외부 컴포넌트 예외를 유지한다. 직접 만든 영역을 이 예외로 취급하지 않는다.

```tsx
type DashboardViewProps = {
  board: Board
}

export function DashboardView({ board }: DashboardViewProps) {
  const scope = useSectionEntrance()

  return (
    <DashboardLayout ref={scope}>
      <ReleaseHero tasks={board.tasks} />
      <LaunchMetrics board={board} />
      <DashboardPanels>
        <TaskChecklist board={board} />
        <DashboardInsights>
          <CategoryProgressChart tasks={board.tasks} />
          <DashboardActivity activity={board.activity} />
        </DashboardInsights>
      </DashboardPanels>
      <DemoResetNotice />
    </DashboardLayout>
  )
}
```

## 마크업 선택

- 이 프로젝트에서는 `table`, `thead`, `tbody`, `tfoot`, `tr`, `th`, `td`, `caption`, `col`,
  `colgroup`을 사용하지 않는다. 숨긴 접근성 콘텐츠도 포함한다. `role="table"`로 우회하지 않는다.
- 차트의 대체 정보는 분야별 이름과 완료·미완료·전체 수치를 읽을 수 있는 의미 있는 목록으로 제공한다.
- 줄바꿈을 위해 `br`을 추가하지 않는다. 의미가 다른 문장은 문단으로 나누고, 시각적 줄바꿈은
  CSS의 block·grid·flex 등으로 처리한다. 기존 컴포넌트의 HTML 콘텐츠 모델을 지켜 중첩 문단을 만들지 않는다.

## 포맷과 의미 단위 구분

- 저장소 `.prettierrc.json`을 사용한다. 세미콜론 없이 스페이스 2칸, trailing comma는 `all`, printWidth는 120이다.
- `if (condition) return` 같은 단일 구문 가드는 조건과 본문을 같은 줄에 두고 중괄호를 생략하는 형태를 선호한다.
- 조건문 본문을 다음 줄에 작성한다면 반드시 중괄호로 감싼다. Prettier 적용 후 한 줄을 유지할 수 없다면 블록을 사용한다.
- 선언·초기화, 부수 효과, 조건 분기, 반환과 테스트의 준비·실행·검증 구간을 빈 줄로 구분한다.
- Prettier는 구문 포맷을 담당한다. 의미 단위의 빈 줄과 조건문 줄바꿈·중괄호의 관계는 직접 검토한다.

## 구성과 공통 UI

- 승인된 계층과 의존 방향을 따른다. 컴포넌트에 도메인 규칙, API 구현, 전역 상태,
  여러 화면의 책임을 한꺼번에 넣지 않는다.
- 기존 공통 컴포넌트와 채택한 shadcn/ui 구성을 먼저 확인하고 일관되게 사용한다.
  공통 UI가 있다는 이유로 기능별로 같은 버튼·입력·상태 UI를 무분별하게 다시 만들지 않는다.
- 분리한 컴포넌트는 역할이 이름으로 드러나야 한다. 불명확한 이름 아래 HTML 덩어리를
  옮겨 놓는 것으로 끝내지 않고 하위 책임까지 분리한다. 재사용되지 않는다는 이유로 합치지 않는다.
- 선언, 훅·상태, 내부 함수, JSX 등 의미 단위를 개행으로 구분하고 포맷·import를 일관되게 유지한다.
- React Hooks의 호출 규칙과 접근 가능한 HTML을 지킨다. 동작과 관련된 로딩·오류·빈 상태,
  키보드 조작·포커스도 구현 범위와 검증에 포함한다.
- shadcn/ui에서 가져온 원본 컴포넌트는 위 선언·파일 분리 컨벤션에 맞추려고
  불필요하게 재작성하지 않는다. 파일이 `components/ui` 안에 있다는 이유만으로
  직접 작성한 모든 코드를 원본 예외로 취급하지 않는다.
- 원본을 수정해야 하는 기능 요구가 있으면 필요한 변경만 하고 원본과의 차이를 명확히 한다.

## 기능 개발과 기존 코드

- 기능 개발을 요청받으면 기능 개발에 집중한다. 이상한 코드를 발견했다는 이유로
  기존 명명·상태 관리·폴더 구조·공통 컴포넌트를 요청 없이 함께 정리하지 않는다.
- 추가 문제는 위치, 영향, 개선 방향을 간결하게 설명하고 나중의 리팩터링 작업으로 제안한다.
  사용자가 합의하기 전에는 실행하지 않는다.
- 기존 파일을 수정한다는 사실만으로 그 파일 전체의 규칙 준수를 강제하지 않는다.
  수정 범위를 넓힐 필요가 생기면 먼저 이유와 범위를 합의한다.
- 사용자가 명시적으로 리팩터링을 요청한 경우에는 Plan에서 합의한 범위대로 정리한다.

## 완료 전 리뷰

- 컴포넌트의 function 선언과 동시 export, 위쪽 Props type, 내부 arrow function을 확인한다.
- 모든 직접 작성한 컴포넌트의 분리 깊이, 상위 return의 역할 명확성, 공통 UI 재사용과 계층 경계를 검토한다.
- 기능 범위 밖 기존 코드 정리가 섞이지 않았는지 diff를 확인한다.
- 실행 코드 변경 시 루트 지침에 따른 전체 테스트와 전체 브라우저 검증을 수행한다.
  문서 전용 변경은 합의된 검증 예외를 적용한다.
- 실제 변경, 검증 결과, 발견했지만 수정하지 않은 후속 제안을 구분해 보고한다.
