import React, { PureComponent } from "react";
function withRenderTime(WrappedComponent) {
  return class extends PureComponent {
    constructor(props) {
      super(props);
      this.startTime = performance.now();
    }
    componentDidMount() {
      const renderTime = performance.now() - this.startTime;
      // 组件名称、渲染时间
      console.log(WrappedComponent.name, `渲染时间：${renderTime}ms`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
}

export default withRenderTime;