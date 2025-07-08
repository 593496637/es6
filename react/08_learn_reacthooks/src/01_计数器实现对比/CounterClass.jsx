import React, { PureComponent } from 'react';

export class CounterClass extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    const { count } = this.state;

    return (
      <div>
        <h2>当前计数: {count}</h2>
        <button onClick={() => this.setState({ count: count + 1 })}>+1</button>
        <button onClick={() => this.setState({ count: count - 1 })}>-1</button>
      </div>
    );
  }
}

export default CounterClass;
