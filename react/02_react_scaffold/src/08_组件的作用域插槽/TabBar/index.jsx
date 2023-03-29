import React, { Component } from "react";
import "./style.css";
export class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentIndex: 0,
    };
  }

  // 选中tab-bar-item
  // selectItem(index) {
  //   this.setState({
  //     currentIndex: index,
  //   });
  // }

  getItemType(item) {
    const { itemType } = this.props;
    return itemType ? itemType(item) : item;
  }

  render() {
    const { titles } = this.props;

    // 当前选中tab-bar-item
    const { tabIndex, changeTab } = this.props;

    return (
      <div>
        <ul className="tab-bar">
          {titles.map((item, index) => {
            return (
              <li
                className={`tab-bar-item ${tabIndex === index ? "active" : ""}`}
                key={index}
                onClick={() => changeTab(index)}
              >
                {this.getItemType(item)}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TabBar;
