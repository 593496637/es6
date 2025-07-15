import React, { memo, useLayoutEffect, useState } from 'react';

const App = memo(() => {
  const [count, setCount] = useState(100);

  // 使用useLayoutEffect来切换数字，不会闪烁
  // 但是useLayoutEffect会阻塞渲染，所以不要在useLayoutEffect中执行耗时操作
  useLayoutEffect(() => {
    if (count === 0) {
      setCount(60);
    }
  }, [count]);

  const handleAdd = () => {
    setCount(0);
  };
  return (
    <div>
      <h2>数字: {count}</h2>
      <button onClick={handleAdd}>+1</button>
    </div>
  );
});

export default App;
