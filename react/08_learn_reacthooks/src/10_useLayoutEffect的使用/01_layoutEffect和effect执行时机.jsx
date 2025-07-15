import React, { memo, useLayoutEffect,useEffect } from 'react'

const App = memo(() => {
  useLayoutEffect(() => {
    console.log('第二步：useLayoutEffect');
  }, []);
  
  useEffect(() => {
    console.log('第三步：useEffect');
  }, []);

  console.log('第一步：render')

  return (
    <div>
      <h2>useLayoutEffect</h2>
      <div id='box'>
        <p>hello</p>
      </div>
    </div>
  )
})

export default App