import React, { memo } from 'react'
import { HeaderLeftWrapper } from './style'
const HeaderLeft = memo(() => {
  return (
    <HeaderLeftWrapper>
      <div className="logo">left</div>
    </HeaderLeftWrapper>
  )
})

export default HeaderLeft