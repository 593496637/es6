import PropTypes from 'prop-types';
import React, { memo, useRef, useState } from 'react';
import { RoomItemWrapper } from './style';
import { Rating } from '@mui/material';
import { Carousel } from 'antd';
import Icon from '@/icons/Icon';
import Indicator from '@/base-ui/indicator';
import classNames from 'classnames';

const RoomItem = memo((props) => {
  const { itemData, itemWidth = '25%', itemClick } = props;
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 点击
  const handleClick = (e, isLeft) => {
    e.stopPropagation();
    if (isLeft) {
      setCurrentIndex((prevIndex) => {
        const newIndex =
          prevIndex === 0 ? itemData?.picture_urls?.length - 1 : prevIndex - 1;
        return newIndex;
      });
      carouselRef.current.prev();
    } else {
      setCurrentIndex((prevIndex) => {
        const newIndex =
          prevIndex === itemData?.picture_urls?.length - 1 ? 0 : prevIndex + 1;
        return newIndex;
      });
      carouselRef.current.next();
    }
  };

  // 点击indicator
  const handleIndicatorClick = (e, index) => {
    e.stopPropagation();
    setCurrentIndex(index);
    carouselRef.current.goTo(index);
  };

  // 点击事件
  const itemClickHandle = () => {
    itemClick && itemClick(itemData);
  };

  // 图片组件
  const pictureELement = (
    <div className='cover'>
      <img src={itemData.picture_url} alt='' />
    </div>
  );

  // 轮播图组件
  const carouselElement = (
    <div className='swiper'>
      {/* 左右两个切换按钮 */}
      <div className='swiper-nav'>
        <div
          className='swiper-nav-item swiper-nav-left'
          onClick={(e) => handleClick(e, true)}
        >
          <Icon name='arrow-left' size={30} color='#fff' />
        </div>
        <div
          className='swiper-nav-item swiper-nav-right'
          onClick={(e) => handleClick(e, false)}
        >
          <Icon name='arrow-right' size={30} color='#fff' />
        </div>
      </div>

      {/* indicator */}
      <div className='swiper-indicator'>
        <Indicator currentIndex={currentIndex}>
          {itemData?.picture_urls?.map((item, index) => {
            return (
              <div
                className='swiper-indicator-item'
                key={item}
                onClick={(e) => handleIndicatorClick(e, index)}
              >
                <div
                  className={classNames('dot', {
                    active: index === currentIndex,
                  })}
                ></div>
              </div>
            );
          })}
        </Indicator>
      </div>

      {/* 轮播图 */}
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
  );

  return (
    <RoomItemWrapper
      style={{ color: itemData?.verify_info?.text_color || '#39576A' }}
      $itemWidth={itemWidth}
      onClick={itemClickHandle}
    >
      <div className='inner'>
        {/* 图片 or 轮播图*/}
        {itemData?.picture_urls?.length > 1 ? carouselElement : pictureELement}

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
  itemClick: PropTypes.func,
};

export default RoomItem;
