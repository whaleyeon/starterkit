import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes } from 'react';

/** 버튼 외형 변형 */
type Variant = 'default' | 'outline' | 'ghost';

/** 버튼 크기 */
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

/** 변형(variant)과 크기(size)를 지원하는 재사용 Button 컴포넌트 */
export function Button({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // 공통 기본 스타일
        'inline-flex cursor-pointer items-center justify-center rounded-lg font-medium transition-colors',
        'focus-visible:ring-brand/50 focus-visible:outline-none focus-visible:ring-2',
        'disabled:cursor-not-allowed disabled:opacity-50',

        // variant별 스타일
        {
          // 기본: 채워진 브랜드 컬러
          'bg-brand text-white hover:bg-brand/90': variant === 'default',
          // 아웃라인: 테두리만
          'border-brand text-brand hover:bg-brand/10 border':
            variant === 'outline',
          // 고스트: 배경 없이 호버 시만 표시
          'text-brand hover:bg-brand/10': variant === 'ghost',
        },

        // size별 패딩·폰트 크기
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },

        // 외부에서 전달된 클래스 (우선 적용)
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
