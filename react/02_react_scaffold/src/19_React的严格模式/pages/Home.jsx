import React, { PureComponent } from 'react'

export class Home extends PureComponent {

  UNSAFE_componentWillMount() {
    console.log('componentWillMount')
  }
  render() {
    return (
      <div>Home</div>
    )
  }
}

export default Home