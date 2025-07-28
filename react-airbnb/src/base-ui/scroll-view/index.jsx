import PropTypes from 'prop-types';
import React, { memo, useState, useEffect, useRef } from 'react';
import { ScrollViewWrapper } from './style';
import Icon from '@/icons/Icon';

const ScrollView = memo((props) => {
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(false);

  // 组件渲染后，判断是否显示左右箭头
  const scrollContentRef = useRef(null);

  useEffect(() => {
    const scrollContentWidth = scrollContentRef.current.scrollWidth;
    const clientWidth = scrollContentRef.current.clientWidth;
    const totalDistance = scrollContentWidth - clientWidth;
    setShowRight(totalDistance > 0);
  }, [props.children]);

  return (
    <ScrollViewWrapper>
      <div className='scroll-content' ref={scrollContentRef}>
        {props.children}
      </div>
      {showLeft && (
        <div className='scroll-left'>
          <Icon name='arrow-left' />
        </div>
      )}
      {showRight && (
        <div className='scroll-right'>
          <Icon name='arrow-right' />
        </div>
      )}
    </ScrollViewWrapper>
  );
});

ScrollView.propTypes = {};

export default ScrollView;
