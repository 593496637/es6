import React, { memo, useState } from 'react';
import CounterClass from './CounterClass';
import CounterHook from './CounterHook';

const App = memo(() => {
  const [isShow, setIsShow] = useState(true);
  return (
    <div>
      <button onClick={() => setIsShow(!isShow)}>显示/隐藏</button>
      {isShow && <CounterClass />}
      {isShow && <CounterHook />}
    </div>
  );
});

export default App;
