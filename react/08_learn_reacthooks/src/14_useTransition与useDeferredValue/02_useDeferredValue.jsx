import React, { memo, useState, useDeferredValue } from 'react';

// 一个庞大的列表清单
const hugeList = [...Array(10000).keys()].map((item) => `列表项${item}`);

// 子组件
const SlowList = memo(({ search }) => {
  // 1.使用useDeferredValue获取searchTerm的延迟值
  const deferredSearch = useDeferredValue(search);

  // 当原始值和延迟值不同时，就意味着“过渡”正在发生
  const isPending = search !== deferredSearch;

  // 2.使用延迟值进行过滤
  const filteredList = hugeList.filter((item) => item.includes(deferredSearch));

  return (
    <>
      状态：{isPending ? '过渡中' : '过渡完成'}
      <ul>
        {filteredList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
});

// 父组件
const App = memo(() => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input type='text' value={searchTerm} onInput={handleInput} />
      <SlowList search={searchTerm} />
    </div>
  );
});

export default App;
