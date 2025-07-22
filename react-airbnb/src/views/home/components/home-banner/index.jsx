import React, { memo } from 'react'
import { BannerWrapper } from './style'

const Banner = memo(() => {
  return (
    <BannerWrapper>
      <div className="banner-left">
        <div className="banner-left-title">
          <h1>Find Your Perfect Stay</h1>
        </div>
      </div>
    </BannerWrapper>
  )
})

export default Banner