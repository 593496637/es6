import React, { memo, useContext } from 'react';
import { UserContext, ThemeContext } from './context';

const App = memo(() => {
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);
  return (
    <div>
      <h2>用户信息: {user.name}</h2>
      <h2>主题信息: {theme.color}</h2>
    </div>
  );
});

export default App;
