import PropTypes from 'prop-types';
import React, { memo, useState, useCallback } from 'react';
import { HomeSectionV2Wrapper } from './style';
import SectionHeader from '@/components/section-header';
import SectionTabs from '@/components/section-tabs';
import SectionRooms from '@/components/section-rooms';
import SectionFooter from '@/components/section-footer';

const HomeSectionV2 = memo((props) => {
  const { infoData } = props;

  // 获取初始tab
  // 第一种：直接获取
  const initialTab = Object.keys(infoData?.dest_list || {})[0];
  const [currentTab, setCurrentTab] = useState(initialTab);
  // 数据转换
  const tabItems = infoData?.dest_address?.map((item) => item.name) || [];

  // 第二种：监听discountInfo变化
  // 但是这种方式会渲染三次，第一次是初始化无数据时，第三次是更新数据时，第三次是更新name时
  // useEffect(() => {
  //   setCurrentTab('佛山');
  // }, [discountInfo]);

  // 点击tab
  const tabClickHandle = useCallback((index, name) => {
    setCurrentTab(name);
  }, []);
  return (
    <HomeSectionV2Wrapper>
      <SectionHeader title={infoData?.title} subtitle={infoData?.subtitle} />
      <SectionTabs tabItems={tabItems} tabClick={tabClickHandle} />
      <SectionRooms
        roomList={infoData?.dest_list?.[currentTab] || []}
        itemWidth='33.33%'
      />
      <SectionFooter title={currentTab} />
    </HomeSectionV2Wrapper>
  );
});

HomeSectionV2.propTypes = {
  infoData: PropTypes.object,
};

export default HomeSectionV2;
