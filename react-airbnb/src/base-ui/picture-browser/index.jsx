import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { PictureBrowserWrapper } from './style';

const PictureBrowser = memo((props) => {
  const { pictureUrls, closePictureBrowser } = props;

  const closeHandler = () => {
    closePictureBrowser && closePictureBrowser();
  };

  // 当图片浏览器关闭时，显示滚动条
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <PictureBrowserWrapper>
      <div className='picture-container'>aaa</div>
      <button className='close-btn' onClick={closeHandler}>
        关闭
      </button>
    </PictureBrowserWrapper>
  );
});

PictureBrowser.propTypes = {
  pictureUrls: PropTypes.array,
  closePictureBrowser: PropTypes.func,
};

export default PictureBrowser;
