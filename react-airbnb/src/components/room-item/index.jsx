import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { RoomItemWrapper } from './style';
import { Rating } from '@mui/material';

const RoomItem = memo((props) => {
  const { itemData, itemWidth = '25%' } = props;
  return (
    <RoomItemWrapper
      style={{ color: itemData?.verify_info?.text_color || '#39576A' }}
      $itemWidth={itemWidth}
    >
      <div className='inner'>
        <div className='cover'>
          <img src={itemData.picture_url} alt='' />
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
