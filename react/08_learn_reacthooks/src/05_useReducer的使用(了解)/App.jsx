import React, { memo, useReducer, useState } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + action.value };
    case 'decrement':
      return { ...state, count: state.count - action.value };
    case 'increment10':
      return { ...state, count: state.count + action.value };
    case 'decrement10':
      return { ...state, count: state.count - action.value };
    case 'increment100':
      return { ...state, count: state.count + action.value };
    default:
      return state;
  }
}

const App = memo(() => {
  // 好处: 1. 可以管理复杂的状态逻辑 2. 可以避免组件的重新渲染
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    movies: ['星际穿越', '盗梦空间', '大话西游'],
  });

  const [count2, setCount2] = useState(0);
  return (
    <div>
      <h2>useReducer 当前计数: {state.count}</h2>
      {/* 使用dispatch来派发action */}
      <button onClick={() => dispatch({ type: 'increment', value: 1 })}>
        +1
      </button>
      <button onClick={() => dispatch({ type: 'decrement', value: 1 })}>
        -1
      </button>
      <button onClick={() => dispatch({ type: 'increment10', value: 10 })}>
        +10
      </button>
      <button onClick={() => dispatch({ type: 'decrement10', value: 10 })}>
        -10
      </button>
      <button onClick={() => dispatch({ type: 'increment100', value: 100 })}>
        +100
      </button>

      {/*  原来的写法 */}
      <h2>原来写法 当前计数2: {count2}</h2>
      <button onClick={() => setCount2(count2 + 1)}>+1</button>
      <button onClick={() => setCount2(count2 - 1)}>-1</button>
      <button onClick={() => setCount2(count2 + 10)}>+10</button>
      <button onClick={() => setCount2(count2 - 10)}>-10</button>
      <button onClick={() => setCount2(count2 + 100)}>+100</button>
    </div>
  );
});

export default App;
