import React, { PureComponent } from "react";
import ThemeContext from "./context/theme_context";
import Product from "./pages/Product";
export class Demo extends PureComponent {
  render() {
    return (
      <div>
        <ThemeContext.Provider value={{ color: "red", fontSize: 30 }}>
          <Product />
        </ThemeContext.Provider>
      </div>
    );
  }
}

export default Demo;
