import React, { memo } from 'react';
import { EntirePaginationWrapper } from './style';
import { Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEntireRoomListAction } from '@/store/modules/entire/actionCreators';

const EntirePagination = memo((props) => {
  const dispatch = useDispatch();

  const totalCount = useSelector((state) => state.entire.totalCount);
  const currentPage = useSelector((state) => state.entire.currentPage);
  const roomList = useSelector((state) => state.entire.roomList);

  const start = currentPage * 20 + 1;
  const end = (currentPage + 1) * 20;

  // 页码数
  const totalPage = Math.ceil(totalCount / 20);

  // 页码
  const handleChangePage = (event, value) => {
    // 回到顶部
    window.scrollTo(0, 0);
    // 更新redux中的数据
    dispatch(fetchEntireRoomListAction(value - 1));
  };

  return (
    <EntirePaginationWrapper>
      {!!roomList.length && (
        <>
          <Pagination
            count={totalPage}
            color='primary'
            onChange={handleChangePage}
          />
          <div className='desc'>
            第{start}-{end}个房源, 共超过{totalCount}个房源
          </div>
        </>
      )}
    </EntirePaginationWrapper>
  );
});

export default EntirePagination;
