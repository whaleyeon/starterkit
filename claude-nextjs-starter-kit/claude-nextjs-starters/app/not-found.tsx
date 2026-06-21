import Link from "next/link";
import { SearchX, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <SearchX className="size-16 text-muted-foreground" />
      <div className="space-y-2">
        <h1 className="text-7xl font-bold tracking-tight">404</h1>
        <p className="text-xl text-muted-foreground">페이지를 찾을 수 없습니다</p>
      </div>
      <p className="max-w-sm text-sm text-muted-foreground">
        요청하신 페이지가 존재하지 않거나, 이동되었거나, 삭제되었을 수 있습니다.
      </p>
      <Button asChild>
        <Link href="/" className="gap-2">
          <ArrowLeft className="size-4" />
          홈으로 돌아가기
        </Link>
      </Button>
    </div>
  );
}
