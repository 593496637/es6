import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { EntirePaginationWrapper } from './style';
import { Pagination } from '@mui/material';
import { useSelector } from 'react-redux';

const EntirePagination = memo((props) => {
  const totalCount = useSelector((state) => state.entire.totalCount);
  const currentPage = useSelector((state) => state.entire.currentPage);
  const roomList = useSelector((state) => state.entire.roomList);

  const start = currentPage * 20 + 1;
  const end = (currentPage + 1) * 20;

  // 页码数
  const totalPage = Math.ceil(totalCount / 20);

  return (
    <EntirePaginationWrapper>
      {!!roomList.length && (
        <>
          <Pagination count={totalPage} color='primary' />
          <div className='desc'>
            第{start}-{end}个房源, 共超过{totalCount}个房源
          </div>
        </>
      )}
    </EntirePaginationWrapper>
  );
});

EntirePagination.propTypes = {};

export default EntirePagination;
