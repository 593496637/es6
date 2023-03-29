import React, { Component } from "react";
import axios from "axios";

import MainBanner from "./MainBanner";
import MainProductList from "./MainProductList";

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      banners: [],
      productList: [],
    };
  }

  componentDidMount() {
    axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
      this.setState({
        banners: res.data.data.banner.list,
        productList: res.data.data.recommend.list,
      });
    });
  }

  render() {
    const { banners, productList } = this.state;
    return (
      <div>
        <MainBanner />
        <MainBanner banners={banners} />
        <MainProductList productList={productList} />
      </div>
    );
  }
}

export default Main;
