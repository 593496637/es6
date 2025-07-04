import React, { PureComponent } from 'react';
import Home from './pages/home';
import Profile from './pages/profile';
import About from './pages/about';
import Category from './pages/category';
import User from './pages/user';

import store from './store';

export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      counter: store.getState().counter.counter,
    };
  }

  componentDidMount() {
    store.subscribe(() => {
      const state = store.getState();
      this.setState({
        counter: state.counter.counter,
      });
    });
  }

  render() {
    const { counter } = this.state;
    return (
      <div>
        <h2>app</h2>
        <h4>counter:{counter}</h4>
        <Home></Home>
        <Profile></Profile>
        <About></About>
        <Category></Category>
        <User></User>
      </div>
    );
  }
}

export default App;
