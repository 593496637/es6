import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { getBannerListAsync } from "../store/home";

export class category extends PureComponent {
  componentDidMount() {
    this.props.fetchMultidata();
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
  counter: state.counter.counter,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMultidata() {
    dispatch(getBannerListAsync());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(category);
