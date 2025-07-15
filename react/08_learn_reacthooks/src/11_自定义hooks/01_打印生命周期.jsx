import React, { memo, useState, useEffect } from 'react';

// 必须用use开头
const useLog = (name) => {
  useEffect(() => {
    console.log(`${name}组件渲染了`);
    return () => {
      console.log(`${name}组件卸载了`);
    };
  }, [name]);
};

// 子组件1
const Child = memo(() => {
  useLog('Child');
  return <div>Child</div>;
});

// 子组件2
const Child2 = memo(() => {
  useLog('Child2');
  return <div>Child2</div>;
});


const App = memo(() => {
  useLog('App');
  const [show, setShow] = useState(true);

  return (
    <div>
      {show && <Child />}
      {show && <Child2 />}
      <button onClick={() => setShow(!show)}>切换</button>
    </div>
  );
});

export default App;
