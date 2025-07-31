import * as actionTypes from './constants';
import { getEntireRoomList } from '@/services/modules/entire';

export const changeCurrentPageAction = (currentPage) => ({
  type: actionTypes.CHANGE_CURRENT_PAGE,
  currentPage,
});

export const changeTotalCountAction = (totalCount) => ({
  type: actionTypes.CHANGE_TOTAL_COUNT,
  totalCount,
});

export const changeRoomListAction = (roomList) => ({
  type: actionTypes.CHANGE_ROOM_LIST,
  roomList,
});

export const changeIsLoadingAction = (isLoading) => ({
  type: actionTypes.CHANGE_IS_LOADING,
  isLoading,
});

export const fetchEntireRoomListAction = (page = 0) => {
  return async (dispatch) => {
    dispatch(changeCurrentPageAction(page));
    // 1.根据页码获取获取最新的数据
    dispatch(changeIsLoadingAction(true));
    const res = await getEntireRoomList(page * 20);

    // 2.获取到最新的数据，保存到redux的store中
    const roomList = res.list;
    const totalCount = res.totalCount;
    console.log(res);
    dispatch(changeRoomListAction(roomList));
    dispatch(changeTotalCountAction(totalCount));
    dispatch(changeIsLoadingAction(false));
  };
};
