import React from 'react';

class HelloWorld extends React.Component {
  // 1.构造方法
  constructor() {
    console.log('1.constructor');
    super();
    this.state = {
      message: 'Hello World',
    };
  }

  // 修改文本
  changeText() {
    this.setState({
      message: 'Hello React',
    });
  }

  // 2.执行render方法
  render() {
    console.log('2.render');
    const { message } = this.state;
    return (
      <div>
        <h1>{message}</h1>
        <button
          onClick={() => {
            this.changeText();
          }}
        >
          修改文本
        </button>
      </div>
    );
  }

  // 3.组件挂载完成
  componentDidMount() {
    console.log('3.componentDidMount');
    setTimeout(() => {
      this.setState({
        message: '挂载完成',
      });
    }, 2000);
  }

  // 4.组件更新完成：当组件的props或state发生变化时，会调用该方法，prevProps、prevState、snapshot是更新前的props、state、snapshot
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('4.componentDidUpdate', prevProps, prevState, snapshot);
  }

  // 5.组件卸载完成
  componentWillUnmount() {
    console.log('5.componentWillUnmount');
  }

  // 6.组件发生错误
  componentDidCatch() {
    console.log('6.componentDidCatch');
  }

  // 7.组件是否需要更新：当组件的props或state发生变化时，会调用该方法，来决定组件是否需要更新
  shouldComponentUpdate() {
    console.log('7.shouldComponentUpdate');
    // 返回true表示需要更新，返回false表示不需要更新
    return true;
  }

  // 8.组件更新前，返回一个对象，这个对象会作为第三个参数传递给componentDidUpdate
  getSnapshotBeforeUpdate() {
    console.log('8.getSnapshotBeforeUpdate');
    return {
      message: 'Hello World',
      scrollTop: 100,
    };
  }
}

export default HelloWorld;
