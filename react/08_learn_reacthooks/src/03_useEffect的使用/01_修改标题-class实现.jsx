import React, { PureComponent } from 'react';

// 使用class组件实现title的更新
export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    document.title = `当前计数: ${this.state.count}`;
  }

  componentDidUpdate() {
    document.title = `当前计数: ${this.state.count}`;
  }

  render() {
    const { count } = this.state;
    return (
      <div>
        <h2>当前计数: {count}</h2>
        <button onClick={() => this.setState({ count: count + 1 })}>+1</button>
      </div>
    );
  }
}

export default App;
