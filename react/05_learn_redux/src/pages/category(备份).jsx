import React, { PureComponent } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getBannerList, getRecommendList } from "../store/actionCreators";

export class category extends PureComponent {
  componentDidMount() {
    axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
      const banners = res.data.data.banner.list;
      const recommends = res.data.data.recommend.list;
      this.props.getBannerList(banners);
      this.props.getRecommendList(recommends);
    });
  }

  render() {
    return (
      <div className="border">
        category
        <h3>counter:{this.props.counter}</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter,
});

const mapDispatchToProps = (dispatch) => ({
  getBannerList(banners) {
    dispatch(getBannerList(banners));
  },

  getRecommendList(recommends) {
    dispatch(getRecommendList(recommends));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(category);
