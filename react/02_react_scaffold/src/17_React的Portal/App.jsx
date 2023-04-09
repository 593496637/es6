import React, { PureComponent } from 'react'
import Modal from './Modal'

export class App extends PureComponent {
  render() {
    return (
      <div>
        App
        <Modal>
          <h1>抹大拉</h1>
          <h2>😄</h2>
        </Modal>
      </div>
    )
  }
}

export default App