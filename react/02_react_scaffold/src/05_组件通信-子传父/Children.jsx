import React, { Component } from "react";

export class Children extends Component {
  render() {
    const { onChangeCount } = this.props;
    return (
      <div>
        Children
        <button onClick={() => onChangeCount(1)}>增1</button>
        <button onClick={() => onChangeCount(-1)}>减1</button>
      </div>
    );
  }
}

export default Children;
