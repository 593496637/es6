import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { increment } from "../store/features/counter";
import { fetchHomeData } from '../store/features/home'

export class Home extends PureComponent {
  componentDidMount() {
    this.props.fetchHomeData();
  }

  increment(num) {
    this.props.increment(num);
  }
  render() {
    const { counter } = this.props;
    return (
      <div>
        Home
        <h2>counter:{counter}</h2>
        <button onClick={() => this.increment(1)}>+1</button>
        <button onClick={() => this.increment(3)}>+3</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter.counter,
});
const mapDispatchToProps = (dispatch) => ({
  increment: (num) => dispatch(increment(num)),
  fetchHomeData: () => dispatch(fetchHomeData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
