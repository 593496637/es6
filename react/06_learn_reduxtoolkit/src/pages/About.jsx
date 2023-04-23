import React, { PureComponent } from "react";
import { connect } from "../hoc/connect";
import { increment } from "../store/features/counter";

export class About extends PureComponent {
  render() {
    const { counter } = this.props;
    return (
      <div>
        About
        <h2>counter:{counter}</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter.counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment(counter) {
      dispatch(increment(counter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
