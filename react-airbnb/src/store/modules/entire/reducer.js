import * as actionTypes from './constants';
const initialState = {
  currentPage: 0,
  totalCount: 0,
  roomList: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case actionTypes.CHANGE_TOTAL_COUNT:
      return { ...state, totalCount: action.totalCount };
    case actionTypes.CHANGE_ROOM_LIST:
      return { ...state, roomList: action.roomList };
    default:
      return state;
  }
}
export default reducer;
