import React, { PureComponent } from "react";
import { AppWrapper, AppTitle } from "./style";

export class App extends PureComponent {
  render() {
    return (
      <AppWrapper>
        <h1>React App</h1>
        <AppTitle color='red'>hello</AppTitle>
        <span className="app-logo"></span>
      </AppWrapper>
    );
  }
}

export default App;
