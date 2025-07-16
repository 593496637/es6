import React, { memo } from 'react';
import { useUserToken } from './hooks';
import './style.css';

const User = memo(() => {
  const [user] = useUserToken();
  return (
    <div>
      User: {user.name}
    </div>
  );
});

const Token = memo(() => {
  const [, token] = useUserToken();
  return (
    <div>
      Token: {token.token}
    </div>
  );
});

const App = memo(() => {
  return (
    <div className='app'>
      <User />
      <Token />
    </div>
  );
});

export default App;
