import React, { PureComponent } from "react";
import { HomeWrapper, Button, Button2 } from "./style";

export class home extends PureComponent {
  render() {
    return (
      <HomeWrapper>
        <h1 className="title">阿道夫</h1>
        <ul className="list">
          <li className="item">1</li>
          <li className="item">2</li>
          <li className="item">3</li>
        </ul>
        <Button>按钮</Button>
        <Button2>按钮2</Button2>
      </HomeWrapper>
    );
  }
}

export default home;
