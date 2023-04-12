import React, { PureComponent } from "react";
import { AppWrapper, AppTitle } from "./style";
import Home from "./home";

export class App extends PureComponent {
  render() {
    return (
      <AppWrapper primaryColor="green">
        <h1>React App</h1>
        <AppTitle>hello</AppTitle>
        <span className="app-logo"></span>
        <Home />
      </AppWrapper>
    );
  }
}

export default App;
