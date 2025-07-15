import React, { memo, useRef, forwardRef, useImperativeHandle } from 'react';

const Input = memo(forwardRef((props, ref) => {
  const inputRef = useRef();
  // 使用useImperativeHandle来暴露给父组件的方法
  useImperativeHandle(ref, () => {
    // 这里返回的对象，就是暴露给父组件的ref的current对象，父组件可以通过ref.current来调用这里暴露的方法
    return {
      // 暴露给父组件的方法，类似于vue3中的expose
      focus: () => {
        inputRef.current.focus();
      },
      setValue: (value) => {
        inputRef.current.value = value;
      },
    };
  });

  return <input type='text' {...props} ref={inputRef} />;

}));


const App = memo(() => {
  const inputRef = useRef();
  const handleFocus = () => {
    inputRef.current.focus();
    inputRef.current.setValue('hello');
  };
  return (
    <div>
      <h2>useImperativeHandle</h2>
      <Input ref={inputRef} />
      <button onClick={handleFocus}>获取焦点</button>
    </div>
  );
});

export default App;
