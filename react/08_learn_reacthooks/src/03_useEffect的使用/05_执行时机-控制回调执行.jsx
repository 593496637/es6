import React, { memo, useState, useEffect } from 'react';

const App = memo(() => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('小明');

  // useEffect可以模拟componentDidMount与componentWillUnmount的组合的生命周期函数，而且比原来用法更加强大
  // useEffect传入第二个参数，用于控制回调执行的时机，当第二个参数发生变化时，回调函数才会执行
  // 只有count发生变化时，才会执行
  useEffect(() => {
    console.log('count', count);
  }, [count]);

  // 只有name发生变化时，才会执行
  useEffect(() => {
    console.log('name', name);
  }, [name]);

  // 只有组件挂载时，才会执行
  useEffect(() => {
    console.log('监听eventBus的监听事件');
  }, []);

  // 只有组件卸载时，才会执行
  // 类似componentDidMount与componentWillUnmount的组合
  useEffect(() => {
    console.log('组件挂载');
    return () => {
      console.log('组件卸载');
    };
  }, []);

  return (
    <div>
      <h2>当前计数: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <h2>当前姓名: {name}</h2>
      <button onClick={() => setName('小红')}>修改姓名</button>
    </div>
  );
});

export default App;
