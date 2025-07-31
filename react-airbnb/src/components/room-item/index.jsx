import PropTypes from 'prop-types';
import React, { memo, useRef } from 'react';
import { RoomItemWrapper } from './style';
import { Rating } from '@mui/material';
import { Carousel } from 'antd';
import Icon from '@/icons/Icon';

const RoomItem = memo((props) => {
  const { itemData, itemWidth = '25%' } = props;
  const carouselRef = useRef(null);
  // 点击
  const handleClick = (isLeft) => {
    console.log(isLeft);
    if (isLeft) {
      carouselRef.current.prev();
    } else {
      carouselRef.current.next();
    }
  };

  return (
    <RoomItemWrapper
      style={{ color: itemData?.verify_info?.text_color || '#39576A' }}
      $itemWidth={itemWidth}
    >
      <div className='inner'>
        {/* <div className='cover'>
          <img src={itemData.picture_url} alt='' />
        </div> */}
        {/* 轮播图 */}
        <div className='swiper'>
          {/* 左右两个切换按钮 */}
          <div className='swiper-nav'>
            <div
              className='swiper-nav-item swiper-nav-left'
              onClick={() => handleClick(true)}
            >
              <Icon name='arrow-left' size={30} color='#fff' />
            </div>
            <div
              className='swiper-nav-item swiper-nav-right'
              onClick={() => handleClick(false)}
            >
              <Icon name='arrow-right' size={30} color='#fff' />
            </div>
          </div>
          <Carousel dots={false} ref={carouselRef}>
            {itemData?.picture_urls?.map((item) => {
              return (
                <div className='cover' key={item}>
                  <img src={item} alt='' />
                </div>
              );
            })}
          </Carousel>
        </div>
        <div className='desc'>
          {itemData?.verify_info?.messages?.join('·') || '·'}
        </div>
        <div className='name'>{itemData.name}</div>
        <div className='price-info'>
          <span className='price-info-price'>￥{itemData.price}</span>
          <span className='price-info-unit'>/晚</span>
        </div>
        <div className='bottom'>
          <Rating
            name='read-only'
            value={itemData?.star_rating ?? 0}
            precision={0.5}
            readOnly
            size='small'
            sx={{
              color: '#008489',
              fontSize: '12px',
              marginRight: '4px',
            }}
          />
          <span className='bottom-number'>{itemData.reviews_count}</span>
          {itemData?.bottom_info?.content && (
            <>
              <span className='bottom-divider'>·</span>
              <span className='bottom-text'>
                {itemData?.bottom_info?.content}
              </span>
            </>
          )}
        </div>
      </div>
    </RoomItemWrapper>
  );
});

RoomItem.propTypes = {
  itemData: PropTypes.object.isRequired,
};

export default RoomItem;
