import React, { memo } from 'react';
import { useLocalstorage } from './hooks';

const App = memo(() => {
  const [value, setValue] = useLocalstorage('name', 'hello');
  console.log(value);
  return (
    <div className='app'>
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => setValue('')}>Clear</button>
    </div>
  );
});

export default App;
