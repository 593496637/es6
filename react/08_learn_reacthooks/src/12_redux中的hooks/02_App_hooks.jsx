import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addNumberAction, subNumberAction } from './store/modules/counter';

const App = memo(() => {
  // 1.使用useSelector将redux中store中的数据映射到组件中
  const { count } = useSelector((state) => state.counter);
  // 2.使用useDispatch直接派发action
  const dispatch = useDispatch();

  return (
    <div>
      <h2>当前计数: {count}</h2>
      <button onClick={() => dispatch(addNumberAction(10))}>+10</button>
      <button onClick={() => dispatch(subNumberAction(5))}>-5</button>
    </div>
  );
});

export default App;
