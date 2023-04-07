import React from "react";
function enhancedProps(WrappedComponent) {
  return class extends React.Component {
    render() {
      const newProps = {
        name: "高阶组件",
        age: 18,
      };
      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
}

export default enhancedProps;
