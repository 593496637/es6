import React, { memo, useRef, useState, useCallback } from 'react';

let obj = null;

const App = memo(() => {
  const [count, setCount] = useState(0);
  const nameRef = useRef();

  // 判断countRef和obj是否相等
  console.log(nameRef === obj);
  obj = nameRef;

  // 通过useRef解决闭包陷阱
  const countRef = useRef(count);
  countRef.current = count;
  const handleClick = useCallback(() => {
    setCount(countRef.current + 1);

    // 这样就会出现闭包陷阱，每次点击+1,count的值都是0，因为count是闭包的值，而不是实时的值
    // setCount(count + 1);
  }, []);
  return (
    <div>
      <h2>计数: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={handleClick}>+1</button>
    </div>
  );
});

export default App;
