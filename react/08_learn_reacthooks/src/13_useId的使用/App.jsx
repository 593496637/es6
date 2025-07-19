import React, { memo, useId } from 'react';

// useId 是 React 18 引入的一个新 hook，用于生成稳定的唯一 ID。
// 它主要用于以下场景：
// 1. 在服务器端渲染（SSR）中生成稳定的 ID。
// 2. 在组件中生成稳定的 ID，避免在每次渲染时生成新的 ID。
// 
const App = memo(() => {
  const id = useId();
  const userId = id + 'user';
  const passwordId = id + 'password';

  console.log(id);
  return (
    <div>
      <h2>id:{id}</h2>
      <label htmlFor={userId}>用户名</label>
      <input type='text' id={userId} />
      <br />
      <label htmlFor={passwordId}>密码</label>
      <input type='password' id={passwordId} />
      <br />
      <button>登录</button>
    </div>
  );
});

export default App;
