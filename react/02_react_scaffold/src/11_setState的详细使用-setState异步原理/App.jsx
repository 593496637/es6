import React, { Component } from 'react';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Hello',
      count: 0,
      obj: { name: 'kobe' },
    };
  }

  changeText = () => {
    // 1.基本使用
    // 内部原理是合并对象，如果对象中存在相同的属性，则后面的属性会覆盖前面的属性
    // Object.assign(this.state, { message: "Hello React" });
    this.setState({
      message: 'Hello React',
    });

    // 2.setState可以接收一个函数作为参数
    // 好处一：可以在回调函数中编写最新的state逻辑
    // 好处二：当前的回调函数会将之前的state和props作为参数传入
    this.setState(
      (state, props) => {
        return {
          message: state.message + ' React',
        };
      },
      () => {
        console.log(this.state.message);
      }
    );

    // 3.setState是异步的
    // 如果需要获取最新的state，需要使用回调函数
    // 为什么setState是异步的？
    // 1.setState设计为异步，可以显著的提升性能
    // 1.1 如果每次调用setState都重新render，那么性能会非常差
    // 1.2 最好的办法是合并多次setState，然后一次性更新state
    // 2.如果同步更新了state,但是还没有执行render函数，那么state和props不能保持同步
    // 2.1.state和props不能保持同步的话，那么开发中会遇到很多问题
    this.setState({ count: 33 }, () => {
      console.log(this.state);
    });

    // 4.setState的合并是浅层合并
    // 如果state中存在对象，则合并时会合并对象的属性，而不是替换对象
    this.setState({
      obj: { ...this.state.obj, name: 'why' },
    });
  };

  // 批量更新
  increment = () => {
    // 这里的this.state.count是0
    // 当点击按钮时，因为setState是异步的，所以会把三个异步操作放到队列中，放到队列时构造的count
    // 是0，所以this.state.count是0，最终执行三次后，count得到的值是三次0+1=1的结果
    this.setState({
      count: this.state.count + 1,
    });
    this.setState({
      count: this.state.count + 1,
    });
    this.setState({
      count: this.state.count + 1,
    });
  };
  // 批量更新
  // 解决：setState是异步的，所以不能直接在setState中获取最新的state，需要使用回调函数
  // 即使这里调用了三次setState，但是内部只执行了一次，因为setState是异步的，最后只调用一次render函数
  increment2 = () => {
    this.setState((state) => {
      return {
        count: state.count + 1,
      };
    });
    this.setState((state) => {
      return {
        count: state.count + 1,
      };
    });
    this.setState((state) => {
      return {
        count: state.count + 1,
      };
    });
  };

  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
        <h2 style={{ color: 'red' }}>{this.state.count}</h2>
        <h2>{this.state.obj.name}</h2>
        <button onClick={this.changeText}>changeText</button>
        <button onClick={this.increment}>increment</button>
        <button onClick={this.increment2}>increment2</button>
      </div>
    );
  }
}

export default App;
