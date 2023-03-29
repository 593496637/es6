import React, { Component } from "react";

export class MainProductList extends Component {
  render() {
    const { productList } = this.props;
    return (
      <div>
        <h4>productList</h4>
        <ul>
          {productList.map((item, index) => {
            return <li key={index}>{item.title}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default MainProductList;
