import React, { Component } from 'react'
import ThemeContext from './context/theme-context'
import UserContext from './context/user-context'
import Home from './Home'

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      info: {
        name: '小红',
        age: 20
      }
    }
  }
  render() {
    const { info } = this.state
    return (
      <div>
        <h2>App</h2>
        {/* 第二步：通过ThemeContext中的Provider中的value属性为后代提供数据 */}
        <UserContext.Provider value={{ background: '#fff' }}>
          <ThemeContext.Provider value={{ color: 'red', fontSize: '20px' }}>
            <Home {...info} /> 
          </ThemeContext.Provider>
        </UserContext.Provider>
      </div>
    )
  }
}

export default App