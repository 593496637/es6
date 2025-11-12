import { useCounterStore } from './store1基础用法/counterStore';

export default function App() {
  const { count, increase, decrease, reset, fetchRandom, loading, error } =
    useCounterStore();

  return (
    <div style={{ padding: 20 }}>
      <h1>Zustand 计数器：{count}</h1>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={decrease}>-1</button>
        <button onClick={increase}>+1</button>
        <button onClick={reset}>重置</button>
        <button onClick={fetchRandom} disabled={loading}>
          {loading ? '加载中…' : '加载随机数'}
        </button>
      </div>

      {error && <p style={{ color: 'tomato' }}>{error}</p>}
    </div>
  );
}
