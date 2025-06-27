import React, { Component } from 'react';
import Home from './Home';
import Recommend from './Recommend';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }
  // 修改值
  setCounter = () => {
    this.setState({
      counter: 0,
    });
  };

  render() {
    console.log('App render');
    return (
      <div>
        App
        <h2>{this.state.counter}</h2>
        <button onClick={this.setCounter}>修改值</button>
        <Home />
        <Recommend />
      </div>
    );
  }
}

export default App;
