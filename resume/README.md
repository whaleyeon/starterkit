# 개발자 웹 이력서

빌드 도구 없이 정적 파일만으로 동작하는 반응형 · 다크모드 지원 개발자 웹 이력서입니다.
([roadmap.md](../bucket-list-main/roadmap.md) 기준으로 제작)

## 기술 스택

- HTML5 (시맨틱 마크업)
- Tailwind CSS (CDN 방식)
- 바닐라 JavaScript (빌드 단계 없음)
- 커스텀 CSS (`css/styles.css` — 애니메이션·컴포넌트 스타일)

## 폴더 구조

```
resume/
├── index.html          # 전체 마크업
├── css/styles.css      # Tailwind로 표현하기 어려운 커스텀 스타일
├── js/main.js          # 인터랙션 로직
├── assets/
│   ├── images/         # profile.jpg, og-image.png 등 (직접 추가)
│   └── resume.pdf      # 다운로드용 PDF 이력서 (직접 추가)
└── README.md
```

## 실행 방법

빌드가 필요 없습니다. 둘 중 하나로 실행하세요.

- `index.html`을 브라우저에서 바로 열기, 또는
- 디렉터리를 서버로 띄우기:
  ```bash
  cd resume
  python3 -m http.server 8000
  # http://localhost:8000 접속
  ```

## 구현된 기능 (로드맵 3~5단계)

- [x] 시맨틱 HTML 골격 + 섹션 앵커(`#about`, `#skills` …)
- [x] 메타 태그 / Open Graph / 접근성(alt, aria, heading 계층)
- [x] 반응형 레이아웃 (`sm:` `md:` 브레이크포인트)
- [x] 다크모드 (토글 버튼 + `localStorage` 저장 + `prefers-color-scheme` 초기값, FOUC 방지)
- [x] 고정 네비게이션 (스크롤 시 배경·그림자)
- [x] 모바일 햄버거 메뉴
- [x] 부드러운 스크롤 (`scroll-smooth`)
- [x] 스크롤 등장 애니메이션 (`IntersectionObserver`)
- [x] 스킬 프로그레스 바 (화면 진입 시 채워짐)
- [x] scrollspy (현재 섹션 메뉴 하이라이트)
- [x] Back to Top 버튼
- [x] `prefers-reduced-motion` 대응

## 내 정보로 교체하기

`index.html`에서 다음을 수정하세요. 검색 키워드를 붙여 두었습니다.

1. **메타/SEO** — `<head>`의 `▼▼▼ 기본 메타` 블록 (title, description, og:*, og:url)
2. **이름/직무/소개** — `김개발`, Hero 문구, About 본문, 통계 숫자
3. **기술 스택** — `data-level` 퍼센트와 `.badge` 목록
4. **경력·프로젝트** — 타임라인 `<li>`, `.project-card` (링크 `href="#"` 교체)
5. **학력·자격, 연락처** — 이메일/GitHub/LinkedIn URL
6. **이미지** — `assets/images/profile.jpg`, `assets/images/og-image.png` 추가
   (프로필 이미지가 없으면 자동으로 숨겨집니다)
7. **PDF** — `assets/resume.pdf` 추가 (Hero의 다운로드 버튼)

## 배포 (로드맵 8단계)

정적 호스팅 어디에나 올릴 수 있습니다.

- **GitHub Pages**: 레포에 푸시 후 Settings → Pages에서 브랜치 지정
- **Netlify / Vercel**: 폴더 연결 시 자동 배포
