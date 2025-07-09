import React, { memo, useEffect, useState } from 'react';

const App = memo(() => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('添加监听');
    // 添加一个监听事件
    const handleClick = () => {
      console.log('handleClick');
    };
    window.addEventListener('click', handleClick);

    // 返回一个函数，这个函数会在组件卸载时执行，用于移除监听事件
    return () => {
      // 移除监听事件
      window.removeEventListener('click', handleClick);
      console.log('取消监听');
    };
  });

  return (
    <div>
      <h2>当前计数: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
});

export default App;
