import React, { memo, useEffect } from 'react';
import Banner from './components/home-banner';
import { HomeWrapper } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoodPriceInfoData } from '@/store/modules/home';
import SectionHeader from '@/components/section-header';
import SectionRooms from '@/components/section-rooms';

const Home = memo(() => {
  const goodPriceInfo = useSelector((state) => state.home.goodPriceInfo);

  // 派发异步事件：发送网络请求
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGoodPriceInfoData());
  }, [dispatch]);
  return (
    <HomeWrapper>
      <Banner />
      <div className='content'>
        <SectionHeader title={goodPriceInfo?.title} />
        <SectionRooms roomList={goodPriceInfo?.list} />
      </div>
    </HomeWrapper>
  );
});

export default Home;
