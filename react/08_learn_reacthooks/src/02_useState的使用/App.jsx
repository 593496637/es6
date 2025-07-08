import React, { memo, useState } from 'react';

const App = memo(() => {
  const [message, setMessage] = useState('hello world');
  const [count, setCount] = useState(0);
  const [age, setAge] = useState(18);
  const [friends, setFriends] = useState(['kobe', 'james', 'curry']);
  const [address, setAddress] = useState({ city: '北京', code: 100000 });

  function increment() {
    setCount(count + 1);
  }
  function decrement() {
    setCount(count - 1);
  }
  function setInfo() {
    setMessage('你好啊,李银河');
  }
  function incrementAge() {
    setAge(age + 1);
  }
  function incrementFriends() {
    setFriends([...friends, 'klay']);
  }
  function incrementAddress() {
    setAddress({ ...address, city: '上海' });
  }
  return (
    <div>
      <h2>当前消息: {message}</h2>
      <button onClick={setInfo}>修改消息</button>
      <h2>当前计数: {count}</h2>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <h2>当前年龄: {age}</h2>
      <button onClick={incrementAge}>+1</button>
      <h2>当前朋友: {friends.join(',')}</h2>
      <button onClick={incrementFriends}>添加朋友</button>
      <h2>当前地址: {address.city}</h2>
      <button onClick={incrementAddress}>修改地址</button>
    </div>
  );
});

export default App;
