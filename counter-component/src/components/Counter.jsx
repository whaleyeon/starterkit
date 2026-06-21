import { useState } from 'react';

// 최소값, 최대값, 증감 단위를 props로 받아 유연하게 사용 가능
export default function Counter({ min = 0, max = 100, step = 1 }) {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => Math.min(prev + step, max));
  const decrement = () => setCount((prev) => Math.max(prev - step, min));
  const reset = () => setCount(0);

  const isMin = count <= min;
  const isMax = count >= max;

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-white rounded-2xl shadow-lg w-64">
      <h2 className="text-xl font-semibold text-gray-700">카운터</h2>

      {/* 현재 숫자 표시 */}
      <span className="text-6xl font-bold text-indigo-600 tabular-nums">
        {count}
      </span>

      {/* 조작 버튼 */}
      <div className="flex items-center gap-4">
        <button
          onClick={decrement}
          disabled={isMin}
          className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 text-2xl font-bold
                     hover:bg-indigo-200 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          −
        </button>

        <button
          onClick={increment}
          disabled={isMax}
          className="w-12 h-12 rounded-full bg-indigo-600 text-white text-2xl font-bold
                     hover:bg-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          +
        </button>
      </div>

      {/* 초기화 */}
      <button
        onClick={reset}
        className="text-sm text-gray-400 hover:text-gray-600 underline transition"
      >
        초기화
      </button>

      {/* 범위 안내 */}
      <p className="text-xs text-gray-300">
        범위: {min} ~ {max} / 단위: {step}
      </p>
    </div>
  );
}
