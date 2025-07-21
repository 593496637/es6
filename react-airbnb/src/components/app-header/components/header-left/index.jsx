import React, { memo } from 'react'
import { HeaderLeftWrapper } from './style'
import Icon from '@/icons/Icon'
const HeaderLeft = memo(() => {
  return (
    <HeaderLeftWrapper>
      <Icon name="logo" width={102} height={32} className="logo" />
    </HeaderLeftWrapper>
  )
})

export default HeaderLeft