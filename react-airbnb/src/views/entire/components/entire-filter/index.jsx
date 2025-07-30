import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import { EntireFilterWrapper } from './style';
import filterData from '@/assets/data/filter_data.json';

const EntireFilter = memo((props) => {
  const [selectItem, setSelectItem] = useState([]);

  // 多选
  const itemClickHandle = (item) => {
    const selectedItems = [...selectItem];
    const itemIndex = selectedItems.indexOf(item);
    if (itemIndex > -1) {
      selectedItems.splice(itemIndex, 1);
    } else {
      selectedItems.push(item);
    }
    setSelectItem(selectedItems);
  };

  return (
    <EntireFilterWrapper>
      {filterData.map((item) => {
        return (
          <div
            key={item}
            className={`item ${selectItem.includes(item) ? 'active' : ''}`}
            onClick={() => itemClickHandle(item)}
          >
            {item}
          </div>
        );
      })}
    </EntireFilterWrapper>
  );
});

EntireFilter.propTypes = {};

export default EntireFilter;
