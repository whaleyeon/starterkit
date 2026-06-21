import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn() — 조건부 클래스 병합 유틸리티
 *
 * clsx로 조건부 클래스를 합치고, tailwind-merge로 충돌 클래스를 정리합니다.
 * 예: cn('px-2 px-4') → 'px-4' (마지막 값 우선)
 *
 * 사용 예시:
 *   cn('text-red-500', isActive && 'text-blue-500')
 *   cn(baseClass, { 'opacity-50': isDisabled })
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
