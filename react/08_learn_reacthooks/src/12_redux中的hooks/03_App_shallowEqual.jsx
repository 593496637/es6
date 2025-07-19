import React, { memo } from 'react';
import {
  addNumberAction,
  subNumberAction,
  changeMessageAction,
} from './store/modules/counter';

import { useSelector, useDispatch, shallowEqual } from 'react-redux';

const Home = memo(() => {
  // 可以使用shallowEqual来优化性能，但是需要手动将store中的数据映射到组件中
  const { message } = useSelector(
    (store) => ({ message: store.counter.message }),
    shallowEqual
  );
  const dispatch = useDispatch();

  console.log('Home组件重新渲染');
  return (
    <div>
      <h2>当前消息:{message}</h2>
      <button onClick={() => dispatch(changeMessageAction('能看看'))}>
        修改消息
      </button>
    </div>
  );
});

const App = memo(() => {
  const { count } = useSelector(
    (state) => ({ count: state.counter.count }),
    shallowEqual
  );
  const dispatch = useDispatch();
  console.log('App组件重新渲染');
  return (
    <div>
      <h2>当前计数: {count}</h2>
      <button onClick={() => dispatch(addNumberAction(10))}>+10</button>
      <button onClick={() => dispatch(subNumberAction(5))}>-5</button>
      <Home />
    </div>
  );
});

export default App;
