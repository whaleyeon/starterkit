# Next.js Starter Kit

Next.js 15 + TypeScript + Tailwind CSS v4 + lucide-react 기반의 웹 개발 스타터 킷입니다.

## 기술 스택

| 도구 | 버전 | 역할 |
|------|------|------|
| [Next.js](https://nextjs.org) | 15 | 프레임워크 (App Router) |
| [TypeScript](https://typescriptlang.org) | 5 | 타입 안전성 |
| [Tailwind CSS](https://tailwindcss.com) | 4 | 유틸리티 CSS (config 파일 없음) |
| [lucide-react](https://lucide.dev) | 최신 | 아이콘 |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | — | `cn()` 유틸 |
| ESLint + Prettier | — | 코드 품질 |

## 시작하기

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행 (http://localhost:3000)
npm run dev

# 3. 프로덕션 빌드
npm run build
```

## 폴더 구조

```
src/
├── app/
│   ├── layout.tsx      # 루트 레이아웃 (폰트, 메타데이터)
│   ├── page.tsx        # 홈 페이지 (/)
│   └── globals.css     # Tailwind 진입점 + 테마 토큰
├── components/
│   └── ui/
│       └── button.tsx  # 재사용 Button 컴포넌트
└── lib/
    └── utils.ts        # cn() 유틸리티 함수
```

## Tailwind CSS v4 커스터마이징

`tailwind.config` 파일이 없습니다. 모든 커스텀 토큰은 `src/app/globals.css`의 `@theme` 블록에서 정의합니다.

```css
@theme {
  --color-brand: #6366f1;  /* 클래스: bg-brand, text-brand 등 */
  --font-sans: var(--font-geist-sans), ...;
}
```

## Button 컴포넌트 사용법

```tsx
import { Button } from '@/components/ui/button';
import { Rocket } from 'lucide-react';

// variant: 'default' | 'outline' | 'ghost'
// size:    'sm' | 'md' | 'lg'
<Button variant="default" size="md">
  <Rocket size={16} className="mr-2" />
  시작하기
</Button>
```

## cn() 유틸리티

조건부 클래스 병합 + Tailwind 클래스 충돌 해결:

```ts
import { cn } from '@/lib/utils';

cn('px-2 px-4')                          // → 'px-4'
cn('text-red-500', isActive && 'text-blue-500')
cn(baseClass, { 'opacity-50': isDisabled })
```

## 코드 품질

```bash
npm run lint          # ESLint 검사
npm run format        # Prettier 자동 정렬
npm run format:check  # Prettier 검사만 (쓰기 안 함)
```
