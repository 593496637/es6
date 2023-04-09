import { PureComponent } from 'react'
import { createPortal } from 'react-dom'

// createPortal(要渲染的组件, 要渲染到的DOM节点)
// 一般用于渲染到body下的组件, 例如弹窗, 模态框等

export class Modal extends PureComponent {
  render() {
    return (
      createPortal(this.props.children, document.querySelector('#modal'))
    )
  }
}

export default Modal