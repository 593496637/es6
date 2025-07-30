import React, { memo, useEffect } from 'react';
import { EntireWrapper } from './style';
import EntireFilter from './components/entire-filter';
import EntireRooms from './components/entire-rooms';
import EntirePagination from './components/entire-pagination';
import { useDispatch } from 'react-redux';
import { fetchEntireRoomListAction } from '@/store/modules/entire/actionCreators';

const Entire = memo(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEntireRoomListAction());
  }, [dispatch]);

  return (
    <EntireWrapper>
      <EntireFilter />
      <EntireRooms />
      <EntirePagination />
    </EntireWrapper>
  );
});

export default Entire;
