import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { decrement } from "../store/features/counter";

export class Profile extends PureComponent {
  decrement(num) {
    this.props.decrement(num);
  }
  render() {
    const { counter, bannerList, recommendList } = this.props;
    return (
      <div>
        Profile
        <h2>counter:{counter}</h2>
        <button onClick={() => this.decrement(2)}>-2</button>
        <button onClick={() => this.decrement(5)}>-5</button>

        <h2>banner</h2>
        <ul>
          {bannerList.map((item, index) => {
            return <li key={index}>{item.title}</li>;
          })} 
        </ul>

        <h2>recommend</h2>
        <ul>
          {recommendList.map((item, index) => {
            return <li key={index}>{item.title}</li>;
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter.counter,
  bannerList: state.home.bannerList,
  recommendList: state.home.recommendList,
});

const mapDispatchToProps = (dispatch) => ({
  decrement: (num) => dispatch(decrement(num)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
