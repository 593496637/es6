import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addNumberAction,
  subNumberAction,
  changeMessageAction,
} from './store/modules/counter';

const Home = memo(() => {
  const dispatch = useDispatch();

  /**
   * 性能陷阱: 这种方法将多个值的订阅合并成了一个。
   * 只要 count、message 或 step 中任何一个发生变化，这个 useSelector 就会返回一个新的对象，导致 shallowEqual 检查通过，从而整个组件都会重新渲染。
   * 这丧失了精细化订阅带来的性能优势。
   */
  const message = useSelector((state) => state.counter.message);
  console.log('Home组件重新渲染');
  return (
    <div>
      Home:{message}
      <button onClick={() => dispatch(changeMessageAction('你好啊'))}>
        修改消息
      </button>
    </div>
  );
});

const App = memo(() => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  console.log('App组件重新渲染');
  return (
    <div>
      App:{count}
      <button onClick={() => dispatch(addNumberAction(10))}>+10</button>
      <button onClick={() => dispatch(subNumberAction(5))}>-5</button>
      <Home />
    </div>
  );
});

export default App;
