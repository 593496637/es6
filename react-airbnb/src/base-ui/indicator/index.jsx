import propTypes from 'prop-types';
import React, { memo, useRef } from 'react';
import { useScrollToCenter } from '@/hooks/useScrollToCenter';
import { IndicatorWrapper } from './style';

const Indicator = memo((props) => {
  const { currentIndex, children } = props;
  const indicatorRef = useRef(null);

  // 调用自定义 Hook，将滚动逻辑委托给它
  useScrollToCenter(indicatorRef, currentIndex);

  return (
    <IndicatorWrapper>
      <div className='indicator' ref={indicatorRef}>
        {children}
      </div>
    </IndicatorWrapper>
  );
});

Indicator.propTypes = {
  // 当前选中的项目索引，用于计算滚动位置
  currentIndex: propTypes.number.isRequired,
  // React 子节点
  children: propTypes.node,
};

export default Indicator;
