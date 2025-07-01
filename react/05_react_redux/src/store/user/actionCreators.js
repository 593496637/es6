import { SET_USER } from './actionTypes';

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const setUserAsync = (user) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(setUser(user));
    }, 1000);
  };
};
