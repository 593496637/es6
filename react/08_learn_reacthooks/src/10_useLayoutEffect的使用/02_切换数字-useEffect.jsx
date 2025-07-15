import React, { memo, useEffect, useState } from 'react';

const App = memo(() => {
  const [count, setCount] = useState(100);

  // 当count为0时，设置count为60
  // 这个过程会执行两次，第一次是count为100，第二次是count为0，界面会闪烁一下
  useEffect(() => {
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
