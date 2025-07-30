import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { EntireRoomsWrapper } from './styles';
import { useSelector } from 'react-redux';
import RoomItem from '@/components/room-item';

const EntireRooms = memo((props) => {
  const roomList = useSelector((state) => state.entire.roomList);

  return (
    <EntireRoomsWrapper>
      {roomList.map((item) => {
        return <RoomItem key={item.id} itemData={item} itemWidth='20%' />;
      })}
    </EntireRoomsWrapper>
  );
});

EntireRooms.propTypes = {};

export default EntireRooms;
