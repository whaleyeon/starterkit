# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 주의: 비표준 Next.js 버전

이 프로젝트는 Next.js **16.2.9** (React 19)를 사용합니다. 코드를 작성하기 전에 반드시 `node_modules/next/dist/docs/`의 관련 가이드를 먼저 읽고, 폐기(deprecation) 경고에 유의하세요.

## 명령어

```bash
npm run dev      # 개발 서버 → http://localhost:3000
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint (core-web-vitals + typescript)
npx tsc --noEmit # 타입 검사만 (빌드 없이)
```

테스트 설정 없음.

### shadcn 컴포넌트 추가

```bash
npx shadcn add <component-name>
```

컴포넌트는 `components/ui/`에 설치됩니다 (`components.json`의 aliases 기준).

## 아키텍처

### 렌더링 경계 (Server vs Client)

- `app/layout.tsx`, `app/page.tsx`, `app/not-found.tsx`, `components/site-header.tsx`, `components/site-footer.tsx` — **Server Components** (기본값, `"use client"` 없음)
- `components/theme-provider.tsx`, `components/theme-toggle.tsx` — **Client Components** (`"use client"` 명시)
- `components/ui/` 내 shadcn 컴포넌트 — Radix UI 프리미티브를 사용하는 것은 `"use client"` 포함 (e.g. `dropdown-menu.tsx`)

`ThemeProvider`는 `app/layout.tsx`의 `<body>` 안에서 `SiteHeader`, `<main>`, `SiteFooter`를 감쌉니다.

### 디렉토리 구조

- `app/` — App Router 루트. `layout.tsx`(루트 레이아웃 + 메타데이터), `globals.css`(Tailwind + 테마 토큰)
- `components/` — 공통 레이아웃 컴포넌트 (site-header, site-footer, theme-provider, theme-toggle)
- `components/ui/` — shadcn 설치 컴포넌트 (badge, button, card, dropdown-menu, input, label, separator)
- `lib/utils.ts` — `cn()` 유틸리티 (clsx + tailwind-merge)
- `hooks/` — 아직 없음, 커스텀 훅 추가 시 생성

### Tailwind CSS v4

`tailwind.config.js`가 없습니다. `app/globals.css`의 CSS `@import`만으로 동작합니다:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
```

테마 토큰은 **oklch 색공간** CSS 변수로 정의됩니다. `@theme inline { ... }` 블록이 Tailwind 유틸리티 클래스(`bg-background`, `text-foreground` 등)에 CSS 변수를 매핑합니다. 다크 모드는 `.dark` 클래스 기반입니다(`@custom-variant dark (&:is(.dark *))`).

### shadcn/ui 설정 (`components.json`)

- **style**: `radix-nova` (shadcn 기본 `default`와 다름 — 컴포넌트 클래스명 패턴 차이 있음)
- **패키지**: `radix-ui` **모노패키지** — `@radix-ui/react-*` 개별 패키지가 아닙니다. import 경로 예: `import { DropdownMenu } from "radix-ui"`, `import { Slot } from "radix-ui"`
- **RSC**: 활성화
- **아이콘**: `lucide-react`

### 컴포넌트 패턴

**Button**: `class-variance-authority`(cva)로 variant/size 정의. `asChild` prop 시 `Slot.Root`(radix-ui) 사용.

```tsx
import { Slot } from "radix-ui"
const Comp = asChild ? Slot.Root : "button"
```

**ThemeToggle**: Sun/Moon 아이콘을 겹쳐서 CSS `scale`/`rotate` 전환으로 전환합니다. Moon이 `absolute`지만 `top`/`left` 미지정이므로 static 위치에 머무릅니다 (의도된 패턴).

**shadcn 컴포넌트**: `data-slot` 속성을 스타일링 앵커로 사용합니다. Radix 상태(`data-[state=open/closed]`, `data-[side=bottom]` 등)로 애니메이션을 제어합니다.

### 경로 별칭

`tsconfig.json`에서 `@/*` → 프로젝트 루트(`./*`). 예: `@/components/ui/button`, `@/lib/utils`.

### 폰트 & 메타데이터

`app/layout.tsx`에서 `next/font/google`으로 Geist Sans / Geist Mono를 로드하고 CSS 변수(`--font-geist-sans`, `--font-geist-mono`)로 주입합니다. `viewport` export로 `themeColor`를 light/dark 각각 지정합니다.
