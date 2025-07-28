import React, { memo, useEffect } from 'react';
import Banner from './components/home-banner';
import { HomeWrapper } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoodPriceInfoData } from '@/store/modules/home';
import HomeSectionV1 from './components/home-section-v1';
import HomeSectionV2 from './components/home-section-v2';
import { isNotEmptyObject } from '@/utils';

const Home = memo(() => {
  const goodPriceInfo = useSelector((state) => state.home.goodPriceInfo);
  const highScoreInfo = useSelector((state) => state.home.highScoreInfo);
  const discountInfo = useSelector((state) => state.home.discountInfo);
  const recommendInfo = useSelector((state) => state.home.recommendInfo);

  // 派发异步事件：发送网络请求
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGoodPriceInfoData());
  }, [dispatch]);
  return (
    <HomeWrapper>
      <Banner />
      <div className='content'>
        {/* 折扣房源 */}
        {isNotEmptyObject(discountInfo) && (
          <HomeSectionV2 infoData={discountInfo} />
        )}

        {/* 热门推荐房源 */}
        {isNotEmptyObject(recommendInfo) && (
          <HomeSectionV2 infoData={recommendInfo} />
        )}

        {/* 低价房源 */}
        {isNotEmptyObject(goodPriceInfo) && (
          <HomeSectionV1 infoData={goodPriceInfo} />
        )}
        {/* 高分房源 */}
        {isNotEmptyObject(highScoreInfo) && (
          <HomeSectionV1 infoData={highScoreInfo} itemWidth='20%' />
        )}
      </div>
    </HomeWrapper>
  );
});

export default Home;
