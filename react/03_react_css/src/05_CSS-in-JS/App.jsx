import React, { PureComponent } from "react";
import { button } from "./style";

export class App extends PureComponent {
  render() {
    return (
      <div>
        {/* 文章 */}
        <article>
          <h2>React CSS in JS</h2>
          <p>React CSS in JS</p>
          <button className={button}></button>
        </article>
      </div>
    );
  }
}

export default App;
