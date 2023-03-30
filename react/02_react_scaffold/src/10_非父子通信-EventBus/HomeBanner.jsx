import React, { Component } from "react";
import eventBus from "./utils/event-bus";

export class HomeBanner extends Component {
  // 上一个
  handlePrev() {
    eventBus.emit("changePrev", "上一个", 20);
  }
  // 下一个
  handleNext() {
    eventBus.emit("changeNext", "下一个", 33);
  }

  render() {
    return (
      <div>
        <h2>HomeBanner</h2>
        <button onClick={this.handlePrev}>上一个</button>
        <button onClick={this.handleNext}>下一个</button>
      </div>
    );
  }
}

export default HomeBanner;
