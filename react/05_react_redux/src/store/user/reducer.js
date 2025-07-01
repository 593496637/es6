import { SET_USER } from './actionTypes';
const initialState = {
  userInfo: {
    name: '张三',
    age: 18,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, userInfo: action.user };
    default:
      return state;
  }
};

export default reducer;
