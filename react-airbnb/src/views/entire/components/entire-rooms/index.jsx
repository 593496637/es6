import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { EntireRoomsWrapper } from './styles';
import { useSelector } from 'react-redux';
import RoomItem from '@/components/room-item';

const EntireRooms = memo((props) => {
  const roomList = useSelector((state) => state.entire.roomList);
  const totalCount = useSelector((state) => state.entire.totalCount);

  return (
    <EntireRoomsWrapper>
      <h2 className='title'>共{totalCount}处住所</h2>
      <div className='room-list'>
        {roomList.map((item) => {
          return <RoomItem key={item.id} itemData={item} itemWidth='20%' />;
        })}
      </div>
    </EntireRoomsWrapper>
  );
});

EntireRooms.propTypes = {};

export default EntireRooms;
