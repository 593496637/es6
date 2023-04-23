import React, { PureComponent } from 'react';
import enhancedProps from './hoc/enhanced_props';
// 类组件：About
import About from './pages/About';

// 函数式组件：Home、Profile
const Home = enhancedProps((props) => {
  console.log(props);
  return (
    <div>
      {props.name}-{props.age}-{props.count}
    </div>
  );
});

const Profile = enhancedProps((props) => {
  return (
    <div>
      {props.name}-{props.age}
    </div>
  );
});

export class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      info: {
        count: 10,
      },
    };
  }
  render() {
    return (
      <div>
        <Home {...this.state.info} />
        <Profile {...this.state.info} />
        <About {...this.state.info} />
      </div>
    );
  }
}

export default App;
