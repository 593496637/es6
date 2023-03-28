import React from "react";
import HelloWorld from "./Components/HelloWorld.jsx";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "App",
    };
  }

  render() {
    const { message } = this.state;
    return (
      <div>
        <h1>{message}</h1>
        <HelloWorld />
      </div>
    );
  }
}

export default App;
