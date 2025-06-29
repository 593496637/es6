import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { increment, decrement } from "../store/counter";
import "../style.css";

export class About extends PureComponent {
  increment(count) {
    this.props.increment(count);
  }
  decrement(count) {
    this.props.decrement(count);
  }

  render() {
    const { bannerList, recommendList } = this.props;
    return (
      <div className="border">
        about
        <h4>counter:{this.props.counter}</h4>
        <button onClick={() => this.increment(4)}>+4</button>
        <button onClick={() => this.decrement(2)}>-2</button>
        <div>
          <h3>banner</h3>
          <ul>
            {bannerList.map((item) => {
              return <li key={item.acm}>{item.title}</li>;
            })}
          </ul>

          <h3>recommend</h3>
          <ul>
            {recommendList.map((item) => {
              return <li key={item.acm}>{item.title}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

// mapStateToProps是一个函数，它的作用是将redux中的数据映射到组件的props中
const mapStateToProps = (state) => {
  return {
    counter: state.counter.counter,
    bannerList: state.home.bannerList,
    recommendList: state.home.recommendList,
  };
};

// mapDispatchToProps是一个函数，它的作用是将dispatch映射到组件的props中
const mapDispatchToProps = (dispatch) => {
  return {
    increment: (number) => {
      dispatch(increment(number));
    },
    decrement: (number) => {
      dispatch(decrement(number));
    },
  };
};

// connect是一个高阶组件，它的作用是将redux中的数据映射到组件的props中
// connect(mapStateToProps, mapDispatchToProps)(About)返回的是一个新的组件
export default connect(mapStateToProps, mapDispatchToProps)(About);
