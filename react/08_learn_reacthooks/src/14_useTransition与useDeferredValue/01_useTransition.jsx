import React, { memo, useState, useTransition } from 'react';

// 一个庞大的列表清单
const hugeList = [...Array(10000).keys()].map((item) => `列表项${item}`);

const App = memo(() => {
  // 1.调用useTransition Hook
  const [isPending, startTransition] = useTransition();

  // 2.我们需要2个状态
  const [inputValue, setInputValue] = useState('');
  const [filterTerm, setFilterTerm] = useState('');

  const filteredList = hugeList.filter((item) => item.includes(filterTerm));

  // 3.监听input的输入
  const handleInput = (e) => {
    const value = e.target.value;

    // 紧接更新：立即更新输入框的值，但是不会立即更新列表
    setInputValue(value);

    // 非紧急更新：用startTransition包裹列表过滤的状态更新
    startTransition(() => {
      setFilterTerm(value);
    });
  };

  return (
    <div>
      <h2>数据列表：{isPending ? '加载中...' : '加载完成'}</h2>
      <input type='text' value={inputValue} onInput={handleInput} />
      <ul>
        {filteredList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
});

export default App;
