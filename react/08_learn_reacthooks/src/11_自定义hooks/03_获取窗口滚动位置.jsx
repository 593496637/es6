import React, { memo } from 'react';
import { useScrollPosition } from './hooks';
import './style.css';

const User = memo(() => {
  const [scrollX, scrollY] = useScrollPosition();
  return (
    <div>
      scrollX: {scrollX} scrollY: {scrollY}
    </div>
  );
});

const Token = memo(() => {
  const [scrollX, scrollY] = useScrollPosition();
  return (
    <div>
      scrollX: {scrollX} scrollY: {scrollY}
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
