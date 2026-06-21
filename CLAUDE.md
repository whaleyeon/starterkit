# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 저장소 구조

이 저장소는 여러 독립적인 웹 프로젝트를 모아둔 학습/포트폴리오 모음입니다.

| 디렉토리 | 스택 | 설명 |
|---|---|---|
| `bucket-list-main/` | 바닐라 JS + Tailwind CDN | 버킷 리스트 SPA (LocalStorage) |
| `my-profile-site/` | 바닐라 JS + Tailwind CDN | IT PM 프로필 페이지 (Bento 레이아웃) |
| `resume/` | 바닐라 JS + Tailwind CDN | 개발자 웹 이력서 (다크모드, 스크롤 애니메이션) |
| `claude-nextjs-starter-kit/` | Next.js 15 + TS + Tailwind v4 | 프로덕션급 Next.js 스타터킷 |
| `counter-component/` | React + Tailwind | 재사용 가능한 카운터 컴포넌트 예제 |

## 실행 방법

### 정적 HTML 프로젝트 (bucket-list-main, my-profile-site, resume)
빌드 단계 없음. 직접 브라우저에서 열거나 로컬 서버 사용:
```bash
python3 -m http.server 8000
```

### claude-nextjs-starter-kit
```bash
cd claude-nextjs-starter-kit
npm install
npm run dev      # 개발 서버 → http://localhost:3000
npm run build    # 프로덕션 빌드
npm run lint     # ESLint
npm run format   # Prettier
```

### counter-component
별도 빌드 설정 없이 React JSX 파일로 구성됨. 부모 Next.js 프로젝트에 복사하여 사용.

## 아키텍처 패턴

### 정적 프로젝트 공통 패턴
- **Tailwind CSS CDN** 사용 (별도 설치 불필요)
- **바닐라 JS** 전용 (프레임워크 없음)
- `localStorage`로 상태 영속화
- FOUC 방지를 위해 테마 스크립트를 `<head>` 인라인으로 삽입

### bucket-list-main 데이터 흐름
2계층 분리: `js/storage.js` (BucketStorage 클래스, LocalStorage 순수 CRUD) → `js/app.js` (BucketListApp 클래스, UI 렌더링). 모든 변경 후 전체 재렌더링. `escapeHtml()`로 XSS 방어.

### claude-nextjs-starter-kit 구조
Next.js 15 App Router 기반. Tailwind CSS v4 (설정 파일 없이 CSS import만으로 동작). `src/components/ui/Button.tsx` 등 재사용 UI 컴포넌트 패턴.

## 신규 프로젝트 추가 시

- 스택·언어를 먼저 결정한 후 작업 시작
- 이 CLAUDE.md의 위 표와 실행 방법 섹션을 업데이트
