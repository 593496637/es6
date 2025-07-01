import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUserAsync } from '../store/user';

class User extends Component {
  render() {
    const { userInfo } = this.props;
    return (
      <div>
        <h3>user</h3>
        <h4>userInfo:{JSON.stringify(userInfo)}</h4>
        <button
          onClick={() => this.props.setUserAsync({ name: '李四', age: 20 })}
        >
          setUserAsync
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  setUserAsync: (userInfo) => {
    dispatch(setUserAsync(userInfo));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
