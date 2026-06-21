import Link from "next/link";
import {
  Layers,
  Moon,
  Puzzle,
  Zap,
  ArrowRight,
  GitFork,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const features = [
  {
    icon: Moon,
    title: "다크모드 내장",
    description:
      "next-themes로 시스템 테마 자동 감지, localStorage 영속화, 헤더 토글로 즉시 전환 가능.",
  },
  {
    icon: Puzzle,
    title: "shadcn/ui 컴포넌트",
    description:
      "radix-nova 스타일 · radix-ui 모노패키지 기반. CSS 변수 토큰으로 다크모드 자동 대응.",
  },
  {
    icon: Zap,
    title: "App Router 구조",
    description:
      "Next.js 16 App Router 기반. 서버 컴포넌트 우선, 클라이언트 경계 최소화 패턴 적용.",
  },
];

const buttonVariants = [
  { variant: "default" as const, label: "Default" },
  { variant: "secondary" as const, label: "Secondary" },
  { variant: "outline" as const, label: "Outline" },
  { variant: "ghost" as const, label: "Ghost" },
  { variant: "destructive" as const, label: "Destructive" },
];

const badgeVariants = [
  { variant: "default" as const, label: "Default" },
  { variant: "secondary" as const, label: "Secondary" },
  { variant: "outline" as const, label: "Outline" },
  { variant: "destructive" as const, label: "Destructive" },
];

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 space-y-20">
      {/* Hero */}
      <section className="flex flex-col items-center gap-6 text-center">
        <Badge variant="secondary" className="gap-1.5">
          <Layers className="size-3" />
          Next.js 16 · Tailwind v4 · shadcn/ui
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          바로 시작하는
          <br />
          <span className="text-muted-foreground">모던 웹 스타터킷</span>
        </h1>
        <p className="max-w-md text-lg text-muted-foreground leading-relaxed">
          다크모드, 공통 레이아웃, UI 컴포넌트가 모두 갖춰진 상태에서 시작하세요.
          설정 없이 바로 개발할 수 있습니다.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="#getting-started" className="gap-2">
              시작하기 <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <GitFork className="size-4" />
              GitHub
            </a>
          </Button>
        </div>
      </section>

      <Separator />

      {/* Feature Cards */}
      <section id="features" className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">주요 기능</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader className="pb-2">
                <feature.icon className="size-6 text-muted-foreground mb-1" />
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Component Demo */}
      <section id="components" className="space-y-8">
        <h2 className="text-2xl font-semibold tracking-tight">컴포넌트 데모</h2>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Button</CardTitle>
            <CardDescription>5가지 variant 지원</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {buttonVariants.map(({ variant, label }) => (
              <Button key={variant} variant={variant} size="sm">
                {label}
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Input & Label */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Input / Label</CardTitle>
            <CardDescription>폼 요소 기본 스타일</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" placeholder="hello@example.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="name">이름</Label>
              <Input id="name" type="text" placeholder="홍길동" />
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Badge</CardTitle>
            <CardDescription>상태 표시 배지</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {badgeVariants.map(({ variant, label }) => (
              <Badge key={variant} variant={variant}>
                {label}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Getting Started */}
      <section id="getting-started" className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">시작 방법</h2>
        <Card className="bg-muted/40">
          <CardContent className="pt-6 space-y-2 font-mono text-sm">
            <p>
              <span className="text-muted-foreground">$</span> npm install
            </p>
            <p>
              <span className="text-muted-foreground">$</span> npm run dev
            </p>
          </CardContent>
        </Card>
        <p className="text-sm text-muted-foreground">
          우측 상단 토글로 다크모드를 전환해보세요.
        </p>
      </section>
    </div>
  );
}
