import React, { memo, useCallback } from 'react';
import { EntireRoomsWrapper } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import RoomItem from '@/components/room-item';
import { Spin } from 'antd';
import { useNavigate } from 'react-router';
import { changeDetailInfoAction } from '@/store/modules/detail';

const EntireRooms = memo((props) => {
  const roomList = useSelector((state) => state.entire.roomList);
  const totalCount = useSelector((state) => state.entire.totalCount);
  const isLoading = useSelector((state) => state.entire.isLoading);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const itemClickHandle = useCallback((itemData) => {
    console.log(itemData);
    dispatch(changeDetailInfoAction(itemData));
    navigate(`/detail`);
  }, [dispatch, navigate]);

  return (
    <EntireRoomsWrapper>
      <h2 className='title'>共{totalCount}处住所</h2>
      <div className='room-list'>
        {roomList.map((item) => {
          return (
            <RoomItem
              key={item.id}
              itemData={item}
              itemWidth='20%'
              itemClick={itemClickHandle}
            />
          );
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
