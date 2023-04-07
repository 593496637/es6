import React, { PureComponent } from "react";
// import ThemeContext from "../context/theme_context";
import withTheme from "../hoc/with_theme";

export class Product extends PureComponent {
  render() {
    console.log(this.props);
    const { color, fontSize } = this.props.theme;
    return (
      <div>
        Product:
        <h1>
          {color}-{fontSize}
        </h1>
      </div>
    );
  }
}

export default withTheme(Product);

// 这种方式是不推荐的，因为这种方式会导致组件的复用性变差
// 如果有多个组件需要使用ThemeContext中的数据，那么就需要在每个组件中都写一遍
// export class Product extends PureComponent {
//   render() {
//     return (
//       <div>
//         Product:
//         <ThemeContext.Consumer>
//           {(value) => {
//             return (
//               <div>
//                 {value.color}-{value.fontSize}
//               </div>
//             );
//           }}
//         </ThemeContext.Consumer>
//       </div>
//     );
//   }
// }

// export default Product;
