import React, { PureComponent, StrictMode } from "react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

export class App extends PureComponent {
  render() {
    return (
      <div>
        <h1>App</h1>
        {/* StrictMode:严格模式，用于检测不规范的写法，比如：过时的生命周期函数，过时的ref */}
        <StrictMode>
          <Home></Home>
        </StrictMode>

        <StrictMode>
          <Profile></Profile>
        </StrictMode>
      </div>
    );
  }
}

export default App;
