import React, { memo, useState } from 'react';
import { DemoWrapper } from './style';
import Indicator from '@/base-ui/indicator';

const Demo = memo((props) => {
  const names = [
    '111',
    '222',
    '333',
    '444',
    '555',
    '666',
    '777',
    '888',
    '999',
    '1000',
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleClick = (isNext) => {
    /**
     * 1. 如果当前是最后一个，则跳转到第一个
     * 2. 如果当前是第一个，则跳转到最后一个
     * 3. 如果当前是中间的，则跳转到下一个或上一个
     */
    if (isNext) {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex === names.length - 1 ? 0 : prevIndex + 1;
        console.log('next:', newIndex);
        return newIndex;
      });
    } else {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex === 0 ? names.length - 1 : prevIndex - 1;
        console.log('prev:', newIndex);
        return newIndex;
      });
    }
  };
  return (
    <DemoWrapper>
      {/* 上一个，下一个 */}
      <div className='control'>
        <button className='btn' onClick={() => handleClick(false)}>
          上一个
        </button>
        <button className='btn' onClick={() => handleClick(true)}>
          下一个
        </button>
      </div>
      <Indicator currentIndex={currentIndex}>
        {names.map((item, index) => {
          return (
            <button className='item' key={item}>
              {item}
            </button>
          );
        })}
      </Indicator>
    </DemoWrapper>
  );
});

export default Demo;
