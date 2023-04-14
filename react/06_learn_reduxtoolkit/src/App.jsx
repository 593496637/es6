import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import "./style.css";

export class App extends PureComponent {
  render() {
    const { counter } = this.props;
    return (
      <div className="pages">
        App: {counter}
        <Home />
        <Profile />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter.counter,
});

export default connect(mapStateToProps)(App);
