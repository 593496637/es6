import React, { PureComponent } from "react";
import classNames from "classnames";

export class App extends PureComponent {
  state = {
    isbbb: true,
    isccc: false,
  };

  render() {
    const { isbbb, isccc } = this.state;
    return (
      <div>
        {/* 原生css写法 */}
        <h2 className={`aaa ${isbbb ? "bbb" : " "} ${isccc ? "ccc" : " "}`}>
          爱的色放了
        </h2>
        {/* 使用classnames库 */}
        {/* classnames对象 */}
        <h2 className={classNames("aaa", { bbb: isbbb, ccc: isccc })}>
          啊哈哈
        </h2>
        {/* classnames数组 */}
        <h2 className={classNames("aaa", ["bbb", "ccc"])}>啊哈哈</h2>

      </div>
    );
  }
}

export default App;
