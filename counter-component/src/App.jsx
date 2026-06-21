import Counter from './components/Counter';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center gap-8">
      {/* 기본 사용 */}
      <Counter />

      {/* 커스텀 범위·단위 */}
      <Counter min={-10} max={10} step={2} />
    </div>
  );
}
