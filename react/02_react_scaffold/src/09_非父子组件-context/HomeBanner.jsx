import React from 'react'
import ThemeContext from './context/theme-context'

function HomeBanner() {
  return (
    <div>
      <h2>HomeBanner</h2>
      {/* 函数式组件：通过ThemeContext.Consumer获取到ThemeContext中的数据 */}
      <ThemeContext.Consumer>
        {
          value => {
            console.log(value);
            return <div>{value.color}</div>
          }
        }
      </ThemeContext.Consumer>
    </div>
  )
}

export default HomeBanner