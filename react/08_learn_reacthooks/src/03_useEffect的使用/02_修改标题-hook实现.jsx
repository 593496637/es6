import React, { memo, useState, useEffect } from 'react';

const App = memo(() => {
  const [count, setCount] = useState(0);

  // 当前组件渲染完毕后执行，并且会在组件每次更新时执行
  // 网络请求、订阅消息、手动修改DOM、打印日志等
  useEffect(() => {
    document.title = `当前计数: ${count}`;
  });

  return (
    <div>
      <h2>当前计数: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
});

export default App;
