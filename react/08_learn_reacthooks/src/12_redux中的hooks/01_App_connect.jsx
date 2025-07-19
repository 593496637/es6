import React, { memo } from 'react';
import { connect } from 'react-redux';
import { addNumberAction, subNumberAction } from './store/modules/counter';

const App = memo((props) => {
  const { count, addNumber, subNumber } = props;
  return <div>
    <h2>当前计数: {count}</h2>
    <button onClick={() => addNumber(10)}>+10</button>
    <button onClick={() => subNumber(5)}>-5</button>
  </div>;
});

const mapStateToProps = (state) => {
  return {
    count: state.counter.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNumber: (payload) => dispatch(addNumberAction(payload)),
    subNumber: (payload) => dispatch(subNumberAction(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
