import React, { PureComponent } from 'react'
import store from '../store'
import { increment, decrement } from '../store/counter';
import '../style.css'


export class home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      counter: store.getState().counter.counter,
    };
  }

  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState().counter;
      this.setState({
        counter: state.counter,
      });
    });
  }

  // 通过store.dispatch()方法来触发action
  increment(count) {
    store.dispatch(increment(count))
  }
  decrement(count) {
    store.dispatch(decrement(count))
  }

  render() {
    const { counter } = this.state;
    return (
      <div className='border'>
        <h3>home</h3>
        <h4>counter:{counter}</h4>
        <button onClick={() => this.increment(2)}>+2</button>
        <button onClick={() => this.increment(5)}>+5</button>
        <button onClick={() => this.decrement(3)}>-3</button>
      </div>
    )
  }
}

export default home