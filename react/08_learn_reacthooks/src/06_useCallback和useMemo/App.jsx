import React, { memo, useState } from 'react';

const App = memo(() => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>计数: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
});

const foo = (count) => {
  return function bar() {
    console.log('bar函数被调用', count);
  };
};

const bar = foo(100);
bar();

const fn = foo(200);
fn();

bar();

export default App;
