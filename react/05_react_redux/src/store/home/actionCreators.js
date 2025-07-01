import axios from 'axios';
import { GET_BANNER_LIST, GET_RECOMMEND_LIST } from './actionTypes';

export const getBannerList = (bannerList) => {
  return {
    type: GET_BANNER_LIST,
    bannerList,
  };
};

export const getRecommendList = (recommendList) => {
  return {
    type: GET_RECOMMEND_LIST,
    recommendList,
  };
};

export const getBannerListAsync = () => {
  return (dispatch, getState) => {
    console.log(1111111111, getState());
    axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
      const bannerList = res.data.data.banner.list;
      const recommendList = res.data.data.recommend.list;
      dispatch(getBannerList(bannerList));
      dispatch(getRecommendList(recommendList));
    });
  };
};
