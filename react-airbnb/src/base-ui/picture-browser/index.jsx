import PropTypes from 'prop-types';
import React, { memo, useEffect, useState, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { PictureBrowserWrapper } from './style';
import Icon from '@/icons/Icon';
import Indicator from '@/base-ui/indicator';
import classNames from 'classnames';

const PictureBrowser = memo((props) => {
  const { pictureUrls, closePictureBrowser: closeHandler } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showList, setShowList] = useState(true);
  // 将方向状态简化为 'left' 或 'right'
  const [direction, setDirection] = useState('right');

  const nodeRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSwitch = (dir) => {
    let newIndex = currentIndex + dir;

    if (newIndex < 0) {
      newIndex = pictureUrls.length - 1;
    } else if (newIndex >= pictureUrls.length) {
      newIndex = 0;
    }

    // 根据方向设置 'right' 或 'left'
    setDirection(dir > 0 ? 'right' : 'left');
    setCurrentIndex(newIndex);
  };

  const handleListClick = (index) => {
    setCurrentIndex(index);
    const dir = index > currentIndex ? 'right' : 'left';  // 判断方向
    setDirection(dir);
  };

  return (
    // 将 direction 作为 prop 传给 styled-component，用于动态 CSS
    <PictureBrowserWrapper direction={direction}>
      {/* 顶部关闭按钮 */}
      <div className='top-bar'>
        <div className='close-btn' onClick={closeHandler}>
          X
        </div>
      </div>

      {/* 左右切换按钮 */}
      <div className='switch-btn left' onClick={() => handleSwitch(-1)}>
        <Icon name='arrow-left' size={24} />
      </div>
      <div className='switch-btn right' onClick={() => handleSwitch(1)}>
        <Icon name='arrow-right' size={24} />
      </div>

      {/* 图片区域 */}
      <div className='picture-container'>
        <TransitionGroup className='pic-transition-group'>
          <CSSTransition
            key={pictureUrls[currentIndex]}
            nodeRef={nodeRef}
            timeout={200} // timeout 必须和 CSS 中的 transition-duration 一致
            // 使用统一的 classNames，具体的方向由 styled-component 处理
            classNames='cover'
          >
            <img
              ref={nodeRef}
              src={pictureUrls[currentIndex]}
              alt=''
              className='picture-img'
            />
          </CSSTransition>
        </TransitionGroup>
      </div>

      {/* 底部区域，显示当前页码 */}
      <div className='bottom-bar'>
        <div className='info-container'>
          <div className='info'>
            <span>
              {currentIndex + 1}/{pictureUrls.length}
            </span>
            <button className='info-btn' onClick={() => setShowList(!showList)}>隐藏照片列表</button>
          </div>
          <div className={classNames('list-container', {
            'list-container-show': showList,
          })}>
            <Indicator currentIndex={currentIndex} total={pictureUrls.length}>
              {pictureUrls.map((item, index) => (
                <div key={index} className={classNames('list-item', {
                  active: index === currentIndex,
                })} onClick={() => handleListClick(index)}>
                  <img src={item} alt='' />
                </div>
              ))}
            </Indicator>
          </div>
        </div>
      </div>
    </PictureBrowserWrapper>
  );
});

PictureBrowser.propTypes = {
  pictureUrls: PropTypes.array,
  closePictureBrowser: PropTypes.func,
};

export default PictureBrowser;
