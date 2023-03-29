import React, { Component } from 'react'
import './style.css'
export class NavBar2 extends Component {
  render() {
    const { leftSlot, centerSlot, rightSlot } = this.props
    return (
      <div className='nav-bar'>
        <div className='nav-left'>{leftSlot}</div>
        <div className='nav-center'>{centerSlot}</div>
        <div className='nav-right'>{rightSlot}</div>
      </div>
    )
  }
}

export default NavBar2