import React, { useContext } from 'react';
import ThemeContext from './context/theme-context';

// 函数式组件：通过ThemeContext.Consumer获取到ThemeContext中的数据
function HomeBanner() {
  // 第一种方式：通过useContext获取到ThemeContext中的数据
  const { color } = useContext(ThemeContext);
  console.log(color);

  return (
    <div>
      <h2>HomeBanner</h2>
      {/* 第二种方式：通过ThemeContext.Consumer获取到ThemeContext中的数据 */}
      <ThemeContext.Consumer>
        {(value) => {
          console.log(value);
          return <div>{value.color}</div>;
        }}
      </ThemeContext.Consumer>
    </div>
  );
}

export default HomeBanner;
