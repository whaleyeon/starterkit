import { Button } from '@/components/ui/button';
import { Github, Rocket, Zap } from 'lucide-react';

/** 스타터 킷 데모 홈페이지 — 기술 스택과 컴포넌트 예시를 보여줍니다 */
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 bg-white px-4 py-16">
      {/* 헤더 */}
      <section className="flex flex-col items-center gap-4 text-center">
        <div className="bg-brand/10 text-brand flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium">
          <Rocket size={14} />
          <span>Next.js 15 Starter Kit</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          빠르게 시작하세요
        </h1>
        <p className="max-w-md text-gray-500">
          Next.js 15 · TypeScript · Tailwind CSS v4 · lucide-react 기반의 스타터
          킷입니다. 바로 개발을 시작할 수 있습니다.
        </p>
      </section>

      {/* Button variant 시연 */}
      <section className="flex flex-col items-center gap-4">
        <h2 className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
          Button 컴포넌트
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="default" size="md">
            <Rocket size={16} className="mr-2" />
            Default
          </Button>
          <Button variant="outline" size="md">
            <Zap size={16} className="mr-2" />
            Outline
          </Button>
          <Button variant="ghost" size="md">
            Ghost
          </Button>
          <Button variant="default" size="sm">
            Small
          </Button>
          <Button variant="default" size="lg">
            Large
          </Button>
          <Button variant="default" disabled>
            Disabled
          </Button>
        </div>
      </section>

      {/* 기술 스택 카드 */}
      <section className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        {STACK_ITEMS.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-gray-100 bg-gray-50 p-5"
          >
            <div className="text-brand mb-1 font-semibold">{item.title}</div>
            <div className="text-sm text-gray-500">{item.description}</div>
          </div>
        ))}
      </section>

      {/* 링크 */}
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-400 hover:text-gray-600"
      >
        <Button variant="ghost" size="sm">
          <Github size={14} className="mr-1.5" />
          GitHub에서 보기
        </Button>
      </a>
    </main>
  );
}

/** 기술 스택 소개 카드 데이터 */
const STACK_ITEMS = [
  {
    title: 'Next.js 15 App Router',
    description: '파일 기반 라우팅, 서버 컴포넌트, 레이아웃 시스템',
  },
  {
    title: 'TypeScript (strict)',
    description: '엄격 모드 + @/* 경로 별칭으로 안전한 타입 개발',
  },
  {
    title: 'Tailwind CSS v4',
    description: 'config 파일 없이 CSS @theme으로 토큰 관리',
  },
  {
    title: 'lucide-react',
    description: '일관된 디자인의 600+ 오픈소스 아이콘',
  },
];
