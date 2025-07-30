import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { HomeSectionV3Wrapper } from './style';
import SectionHeader from '@/components/section-header';
import RoomItem from '@/components/room-item';
import ScrollView from '@/base-ui/scroll-view';

const HomeSectionV3 = memo((props) => {
  const { infoData, itemWidth } = props;
  return (
    <HomeSectionV3Wrapper>
      <SectionHeader
        title={props.infoData.title}
        subtitle={props.infoData.subtitle}
      />
      <div className='room-list'>
        <ScrollView>
          {infoData.list.map((item) => {
            return (
              <RoomItem itemData={item} itemWidth={itemWidth} key={item.id} />
            );
          })}
        </ScrollView>
      </div>
    </HomeSectionV3Wrapper>
  );
});

HomeSectionV3.propTypes = {
  infoData: PropTypes.object,
  itemWidth: PropTypes.string,
};

export default HomeSectionV3;
