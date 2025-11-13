import { Suspense } from 'react';
import { useAtom } from 'jotai';
import { countAtom, doubleCountAtom } from './atoms/counter';
import CounterDisplay from './CounterDisplay';
import AsyncCount from './atoms/AsyncCount';

export default function App() {
  const [count, setCount] = useAtom(countAtom);
  const [doubleCount] = useAtom(doubleCountAtom);

  return (
    <div style={{ padding: 20 }}>
      <h1>Count: {count}</h1>
      <h1>双倍：{doubleCount}</h1>
      <CounterDisplay />
      <Suspense fallback={<p>正在加载异步数据...</p>}>
        <AsyncCount />
      </Suspense>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={() => setCount((c) => c - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
