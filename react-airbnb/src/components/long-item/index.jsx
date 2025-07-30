import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { LongItemWrapper } from './style';

const LongItem = memo((props) => {
  const { itemData } = props;
  return (
    <LongItemWrapper>
      <div className='longfor-item-cover'>
        <div className='longfor-item-img-box'>
          <img
            className='longfor-item-img'
            src={itemData.picture_url}
            alt={itemData.name}
          />
        </div>
        <div className='longfor-item-info'>
          <div className='longfor-item-title'>{itemData.city}</div>
          <div className='longfor-item-price'>均价 {itemData.price}</div>
        </div>
      </div>
    </LongItemWrapper>
  );
});

LongItem.propTypes = {
  itemData: PropTypes.object,
};

export default LongItem;
