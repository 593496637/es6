import { useAtom } from 'jotai';
import { countAtom } from './atoms/counter';
import CounterDisplay from './CounterDisplay';

export default function App() {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div style={{ padding: 20 }}>
      <h1>Count: {count}</h1>
      <CounterDisplay />
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={() => setCount((c) => c - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
