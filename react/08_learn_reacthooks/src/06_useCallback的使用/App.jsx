import React, { memo, useState, useCallback, useRef } from 'react';

// 子组件
const Child = memo((props) => {
  console.log('Child组件被调用');
  return <div>Child</div>;
});

// 父组件
// 1.当需要将一个函数传递给子组件时，最好使用useCallback优化，避免子组件的重复渲染
const App = memo(() => {
  const [count, setCount] = useState(0);
  const [otherCount, setOtherCount] = useState(100);

  // 使用useCallback
  // 闭包陷阱:useCallback的依赖项为空数组时，闭包中的count为初始值0，不会随着count的改变而改变
  // useCallback在当前函数中使用是没有意义的，但是可以用于子组件中
  const increment = useCallback(() => {
    console.log('increment函数被调用', count);
    setCount(count + 1);
  }, [count]);

  // 进一步的优化：当count方式改变时，也使用同一个函数
  // 做法一：姜count依赖移除掉，缺点：闭包陷阱
  // 做法二：useRef,在组件多次渲染时，保持同一个引用
  const countRef = useRef();
  countRef.current = count;
  const increment2 = useCallback(() => {
    console.log('increment2函数被调用', countRef.current);
    setCount(countRef.current + 1);
  }, []);

  return (
    <div>
      <h2>计数: {count}</h2>
      <h2>otherCount: {otherCount}</h2>
      <button onClick={() => setCount(count + 1)}>不使用useCallback</button>
      <button onClick={increment}>使用useCallback</button>
      <button onClick={increment2}>使用useCallback+useRef</button>
      <button onClick={() => setOtherCount(otherCount + 1)}>
        otherCount+1
      </button>
      <Child increment={increment} />
    </div>
  );
});

// 闭包
const foo = (count) => {
  return function bar() {
    console.log('bar函数被调用', count);
  };
};

// 闭包的形成过程
const bar = foo(100);
// 执行bar函数，bar函数被调用，count为100
bar();

const fn = foo(200);
// 执行fn函数，fn函数被调用，count为200
fn();

// 执行bar函数，bar函数被调用，count为100
bar();

export default App;
