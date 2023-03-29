import React, { Component } from "react";
import "./style.css";
export class NavBar extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="nav-bar">
        <div className="nav-left">{children[0]}</div>
        <div className="nav-center">{children[1]}</div>
        <div className="nav-right">children[2]</div>
      </div>
    );
  }
}

export default NavBar;
