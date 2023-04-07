import React, { PureComponent } from "react";
import enhancedProps from "../hoc/enhanced_props";

export class About extends PureComponent {
  render() {
    return (
      <div>
        About
        <h2>
          {this.props.name}-{this.props.age}-{this.props.count}
        </h2>
      </div>
    );
  }
}

export default enhancedProps(About);
