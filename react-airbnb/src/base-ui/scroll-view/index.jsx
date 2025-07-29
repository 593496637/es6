import PropTypes from 'prop-types';
import React, { memo, useState, useEffect, useRef } from 'react';
import { ScrollViewWrapper } from './style';
import Icon from '@/icons/Icon';

const ScrollView = memo((props) => {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const [posIndex, setPosIndex] = useState(0);

  const totalDistance = useRef(0);

  // 组件渲染后，判断是否显示左右箭头
  const scrollContentRef = useRef(null);

  useEffect(() => {
    const scrollContentWidth = scrollContentRef.current.scrollWidth;
    const clientWidth = scrollContentRef.current.clientWidth;
    totalDistance.current = scrollContentWidth - clientWidth;
    setShowRight(totalDistance.current > 0);
  }, [props.children]);

  // 事件点击
  function onClickHandle(isLeft) {
    const newIndex = isLeft ? posIndex - 1 : posIndex + 1;
    const newEl = scrollContentRef.current.children[newIndex];
    // 获取新的偏移量
    const newOffsetLeft = newEl.offsetLeft;
    scrollContentRef.current.style.transform = `translateX(-${newOffsetLeft}px)`;
    setPosIndex(newIndex);
    // 是否继续显示左侧按钮
    setShowLeft(newOffsetLeft > 0);
    // 是否继续显示右边按钮
    setShowRight(newOffsetLeft < totalDistance.current);
  }

  return (
    <ScrollViewWrapper>
      {/* 左侧按钮 */}
      {showLeft && (
        <div
          className='scroll-view scroll-left'
          onClick={() => onClickHandle(true)}
        >
          <Icon name='arrow-left' />
        </div>
      )}
      {/* 右侧按钮 */}
      {showRight && (
        <div
          className='scroll-view scroll-right'
          onClick={() => onClickHandle(false)}
        >
          <Icon name='arrow-right' />
        </div>
      )}

      {/* 内容 */}
      <div className='scroll-content-box'>
        <div className='scroll-content' ref={scrollContentRef}>
          {props.children}
        </div>
      </div>
    </ScrollViewWrapper>
  );
});

ScrollView.propTypes = {
  children: PropTypes.node,
};

export default ScrollView;
