import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../store';
import { increment, decrement, addBy, fetchRandom } from './counterSlice';

export default function Counter() {
  // 读取Redux 里的状态
  const { value, loading, error } = useSelector(
    (state: RootState) => state.counter
  );
  // 拿到 dispatch 方法
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <h2>Counter: {value}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(addBy(5))}>+5</button>
      <button disabled={loading} onClick={() => dispatch(fetchRandom())}>
        {loading ? '加载中…' : '加载随机数'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
