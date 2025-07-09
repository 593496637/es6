import React, { memo, useState, useEffect } from 'react';

const App = memo(() => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('修改title');
  });

  useEffect(() => {
    console.log('监听redux的数据变化');
  });

  useEffect(() => {
    console.log('监听eventBus的监听事件');
  });

  return (
    <div>
      <h2>当前计数: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
});

export default App;
