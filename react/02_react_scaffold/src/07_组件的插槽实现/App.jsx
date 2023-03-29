import React, { Component } from "react";
import NavBar from "./NavBar";
import NavBar2 from "./NavBar2";
export class App extends Component {
  render() {
    const leftSlot = <button>nav-left</button>;
    const centerSlot = <h1>nav-center</h1>;
    const rightSlot = <button>nav-right</button>;
    return (
      <div>
        <NavBar>
          <div className="nav-left">nav-left</div>
          <div className="nav-center">nav-center</div>
          <div className="nav-right">nav-right</div>
        </NavBar>
        <NavBar2 leftSlot={leftSlot} centerSlot={centerSlot} rightSlot={rightSlot} />
      </div>
    );
  }
}

export default App;
