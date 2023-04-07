import React, { PureComponent } from "react";
import enhancedProps from "./hoc/enhanced_props";
import About from "./pages/About";

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
