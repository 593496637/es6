import React, { memo, useState, useMemo } from 'react'

/**
 * useMemo:是对函数的返回值进行缓存
 */

// 计算数字的总和
const sum = (n) => {
  console.log('sum函数被调用', n);
  let total = 0;
  for (let i = 0; i <= n; i++) {
    total += i;
  }
  return total;
};


const App = memo(() => {
  const [count, setCount] = useState(0);
  const total = useMemo(() => sum(50), []);
  return (
    <div>
      <h2>计数: {count}</h2>
      <h2>总和: {total}</h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
})

export default App