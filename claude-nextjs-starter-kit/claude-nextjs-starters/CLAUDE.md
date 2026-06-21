# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 주의: 비표준 Next.js 버전

이 프로젝트는 Next.js **16.2.9** (React 19)를 사용하며, 학습 데이터 기준의 Next.js와 API, 컨벤션, 파일 구조가 다를 수 있습니다. 코드를 작성하기 전에 반드시 `node_modules/next/dist/docs/`의 관련 가이드를 먼저 읽고, 폐기(deprecation) 경고에 유의하세요.

## 명령어

```bash
npm run dev      # 개발 서버 → http://localhost:3000
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint (eslint-config-next/core-web-vitals + typescript)
```

테스트 설정 없음.

### shadcn 컴포넌트 추가

```bash
npx shadcn add <component-name>
```

컴포넌트는 `components/ui/`에 설치됩니다 (`components.json`의 aliases 기준).

## 아키텍처

### 디렉토리 구조

- `app/` — Next.js App Router 루트. `layout.tsx`(루트 레이아웃), `page.tsx`(홈), `globals.css`(전역 스타일)
- `lib/utils.ts` — `cn()` 유틸리티 (clsx + tailwind-merge)
- `components/ui/` — shadcn 설치 대상 (현재 비어 있음)
- `hooks/` — 커스텀 훅 대상

### Tailwind CSS v4

`tailwind.config.js`가 없습니다. Tailwind v4는 `app/globals.css`의 CSS `@import`만으로 동작합니다:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
```

테마 토큰은 `@theme inline { ... }` 블록과 `:root` / `.dark` CSS 변수로 관리됩니다. 다크 모드는 `.dark` 클래스 기반입니다(`@custom-variant dark (&:is(.dark *))`).

### shadcn/ui 설정

`components.json`:
- **style**: `radix-nova` (shadcn 기본 `default`와 다름)
- **패키지**: `radix-ui` (모노패키지, `@radix-ui/react-*` 개별 패키지 아님)
- **RSC**: 활성화
- **아이콘**: `lucide-react`
- **경로 별칭**: `@/components`, `@/lib/utils`, `@/components/ui`, `@/lib`, `@/hooks`

### 경로 별칭

`tsconfig.json`에서 `@/*`는 프로젝트 루트(`./*`)를 가리킵니다.

### 폰트

`app/layout.tsx`에서 `next/font/google`으로 Geist Sans / Geist Mono를 로드하고 CSS 변수(`--font-geist-sans`, `--font-geist-mono`)로 주입합니다.
