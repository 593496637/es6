import React, { memo } from 'react';
import { EntireRoomsWrapper } from './styles';
import { useSelector } from 'react-redux';
import RoomItem from '@/components/room-item';
import { Spin } from 'antd';

const EntireRooms = memo((props) => {
  const roomList = useSelector((state) => state.entire.roomList);
  const totalCount = useSelector((state) => state.entire.totalCount);
  const isLoading = useSelector((state) => state.entire.isLoading);

  return (
    <EntireRoomsWrapper>
      <h2 className='title'>共{totalCount}处住所</h2>
      <div className='room-list'>
        {roomList.map((item) => {
          return <RoomItem key={item.id} itemData={item} itemWidth='20%' />;
        })}
      </div>
      {/* 遮盖层 */}
      {isLoading && (
        <div className='cover'>
          <Spin size='large' />
        </div>
      )}
    </EntireRoomsWrapper>
  );
});

export default EntireRooms;
