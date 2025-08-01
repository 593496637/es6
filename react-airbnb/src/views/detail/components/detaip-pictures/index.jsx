import React, { memo, useState } from 'react';
import { DetailPicturesWrapper } from './style';
import { useSelector } from 'react-redux';
import PictureBrowser from '@/base-ui/picture-browser';

const DetailPictures = memo((props) => {
  // 从Redux获取详情信息，添加默认值避免报错
  const detailInfo = useSelector((state) => state.detail.detailInfo) || {};
  // 确保picture_urls始终是数组
  const pictureUrls = detailInfo.picture_urls || [];
  const [showPictureBrowser, setShowPictureBrowser] = useState(false);

  // 关闭图片浏览器
  const showPictureHandler = () => {
    setShowPictureBrowser(false);
  };

  return (
    <DetailPicturesWrapper>
      {/* 图片矩阵 */}
      <div className='pictures-container'>
        <div className='pictures-left'>
          {/* 左侧大图 */}
          <img
            src={pictureUrls[0] || ''}
            alt={pictureUrls[0] ? '主图' : '暂无图片'}
          />
        </div>

        <div className='pictures-right'>
          {/* 右侧小图矩阵 */}
          {pictureUrls.slice(1, 5).map((item, index) => (
            <div className='pictures-right-item' key={index}>
              <img src={item} alt={`详情图 ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <button
        className='picture-btn'
        onClick={() => {
          setShowPictureBrowser(true);
        }}
      >
        打开图片
      </button>
      {/* 图片浏览器 */}
      {showPictureBrowser && (
        <PictureBrowser
          pictureUrls={pictureUrls}
          closePictureBrowser={showPictureHandler}
        />
      )}
    </DetailPicturesWrapper>
  );
});

export default DetailPictures;
