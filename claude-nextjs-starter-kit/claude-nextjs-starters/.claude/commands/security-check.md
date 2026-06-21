---
description: 배포 전 보안 취약점을 진단하고 리포트 (읽기 전용, 코드 수정 없음)
allowed-tools: Read, Grep, Glob, Bash(grep *), Bash(git ls-files *), Bash(git status *), Bash(ls *), Bash(cat *)
---

당신은 배포 전 보안 감사 전문가입니다. 이 Next.js 프로젝트를 **읽기 전용**으로 스캔하여 보안 취약점을 진단하고 리포트를 출력하세요. **코드를 수정하거나 파일을 생성/편집하지 마세요.**

## 점검 대상 범위

아래 3가지 범위를 모두 점검하세요.

---

### ① 코드 취약점 (Next.js / React)

다음 항목을 `app/`, `components/`, `lib/`, `hooks/` 디렉토리에서 재귀적으로 검색하세요:

1. **XSS (Cross-Site Scripting)**
   - `dangerouslySetInnerHTML` 사용 여부 스캔
   - 발견 시: 주변 코드에서 `DOMPurify`, `sanitize-html`, `escape()` 등의 새니타이징 처리 여부 확인

2. **서버/클라이언트 경계 위반**
   - `"use client"` 선언 파일에서 서버 전용 로직(DB 접근, 서버 시크릿 사용 등) 포함 여부
   - `server-only` 패키지 import 없이 민감 로직이 클라이언트에 노출되는 케이스

3. **Server Actions / Route Handlers 보안**
   - `app/**/route.ts`, `app/**/route.tsx` 파일 스캔
   - `"use server"` 함수 스캔
   - HTTP 메서드 검증, 입력 검증(zod 등), 인증/인가 처리 여부 확인
   - 미검증 사용자 입력이 `redirect()`, `fetch()`, DB 쿼리에 직접 삽입되는지 확인 (SSRF / Open Redirect / Injection)

4. **위험 함수 사용**
   - `eval(`, `new Function(`, 동적 `import(` 사용 여부 스캔 (코드 인젝션 위험)

---

### ② 시크릿 / 환경변수

1. **하드코딩된 시크릿 스캔**
   소스 파일(`.ts`, `.tsx`, `.js`, `.jsx`)에서 아래 패턴을 grep으로 검색:
   - `sk-`, `pk_live_`, `pk_test_` (Stripe/OpenAI 키 패턴)
   - `password`, `secret`, `api_key`, `apikey`, `token`, `auth` 가 변수명에 포함된 문자열 할당(`= "..."`  또는 `= '...'`)
   - `mongodb+srv://`, `postgresql://`, `mysql://` 등 DB 커넥션 문자열

2. **`NEXT_PUBLIC_` 오용 탐지**
   - `.env*` 파일과 소스 코드에서 `NEXT_PUBLIC_` 접두사를 가진 변수 목록 추출
   - 그 중 시크릿성 키워드(`secret`, `key`, `token`, `password`, `auth`)가 포함된 것 표시 → 클라이언트 번들 노출 위험

3. **클라이언트 컴포넌트에서 비-PUBLIC 환경변수 참조**
   - `"use client"` 파일에서 `process.env.` 참조 스캔
   - `NEXT_PUBLIC_` 없이 참조 시 빌드 시 `undefined` 또는 서버 시크릿 노출 위험

4. **`.env*` 파일 git 추적 여부**
   - `git ls-files` 로 `.env`, `.env.local`, `.env.production`, `.env.development` 파일이 git에 등록되어 있는지 확인
   - 등록되어 있으면 즉시 🔴 High로 표시

---

### ③ 설정 / 헤더

1. **`next.config.ts` 보안 헤더 설정**
   - `headers()` 함수로 CSP(Content-Security-Policy), `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Strict-Transport-Security(HSTS)` 등이 설정되어 있는지 확인
   - 없으면 🟡 Medium 이상으로 표시

2. **`next.config.ts` 위험 옵션**
   - `ignoreBuildErrors: true` — 빌드 에러 무시 (타입 오류가 배포에 반영될 수 있음)
   - `ignoreDuringBuilds: true` — ESLint 무시
   - `images.remotePatterns`에 `hostname: "*"` 와일드카드 사용 → 모든 외부 이미지 허용 (SSRF 보조 위험)

3. **`.gitignore` 시크릿 산출물 제외 여부**
   - `.env*`, `.next/`, `*.local`, 시크릿 관련 파일이 `.gitignore`에 포함되어 있는지 확인

4. **소스맵 / 디버그 정보 노출**
   - `next.config.ts` 에서 `productionBrowserSourceMaps: true` 설정 여부 확인 (소스코드 노출)

---

## 리포트 출력 형식

모든 설명은 **한국어**로 작성하세요.

점검 완료 후 아래 형식으로 리포트를 출력하세요:

```
═══════════════════════════════════════════
  🔒 배포 전 보안 점검 리포트
  프로젝트: claude-nextjs-starters
═══════════════════════════════════════════

## 🔴 High (즉시 수정 필요)
### [H1] 발견된 문제 제목
- **파일**: `경로/파일명:라인번호`
- **문제**: 무엇이 문제인지 설명
- **위험**: 왜 위험한지 (공격 시나리오 포함)
- **권장 조치**: 어떻게 수정하면 되는지 (코드 예시 제안 가능, 직접 수정 금지)

---

## 🟡 Medium (배포 전 검토 권장)
...

---

## 🟢 Low (개선 권장)
...

---

## ✅ 통과 항목
- [항목명] — 정상 확인됨

---

## 📊 요약

| 심각도 | 건수 |
|--------|------|
| 🔴 High   | N건 |
| 🟡 Medium | N건 |
| 🟢 Low    | N건 |
| ✅ 통과   | N건 |

**배포 가능 여부**: 🔴 High가 0건이면 "조건부 배포 가능 (Medium 항목 검토 후 판단)" / High가 1건 이상이면 "배포 보류 — 즉시 수정 필요"

---
💡 의존성 패키지 취약점(CVE)은 이 점검 범위에 포함되지 않습니다. 필요 시 `npm audit` 를 별도 실행하세요.
```

발견 항목이 0건인 경우(모두 통과)에는 통과 항목 체크리스트만 출력하고 "배포 가능" 결론을 표시하세요.
