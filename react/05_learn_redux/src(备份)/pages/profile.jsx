import React, { PureComponent } from 'react'
import store from '../store'
import '../style.css'

export class profile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      counter: store.getState().counter,
    };
  }

  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState();
      this.setState({
        counter: state.counter,
      });
    });
  }
  render() {
    const { counter } = this.state;
    return (
      <div className='border'>
        <h3>Profile</h3>
        <h4>counter:{counter}</h4>
      </div>
    )
  }
}

export default profile