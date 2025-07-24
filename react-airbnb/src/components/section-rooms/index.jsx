import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { SectionRoomsWrapper } from './style';
import RoomItem from '@/components/room-item';

const SectionRooms = memo((props) => {
  const { roomList = [] } = props;
  return (
    <SectionRoomsWrapper>
      <ul className='room-list'>
        {roomList?.map((item) => {
          return <RoomItem key={item.id} itemData={item} />;
        })}
      </ul>
    </SectionRoomsWrapper>
  );
});

SectionRooms.propTypes = {
  roomList: PropTypes.array,
};

export default SectionRooms;
