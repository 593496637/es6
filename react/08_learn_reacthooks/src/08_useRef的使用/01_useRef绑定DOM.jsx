import React, { memo, useRef } from 'react';

const App = memo(() => {
  const inputRef = useRef();
  return (
    <div>
      <input type='text' ref={inputRef} />
      <button
        onClick={() => {
          inputRef.current.focus();
        }}
      >
        聚焦
      </button>
    </div>
  );
});

export default App;
