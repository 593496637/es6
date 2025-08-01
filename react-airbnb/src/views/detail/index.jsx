import React, { memo } from 'react';
import { DetailWrapper } from './style';
import DetailInfos from './components/detail-infos';
import DetailPictures from './components/detaip-pictures';

const Detail = memo(() => {

  return (
    <DetailWrapper>
      <div className='detail-info'>
        <DetailPictures />
        <DetailInfos />
      </div>
    </DetailWrapper>
  );
});

export default Detail;
