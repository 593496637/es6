import axios from 'axios'
import { INCREMENT, DECREMENT, GET_BANNER_LIST, GET_RECOMMEND_LIST } from './actionTypes'
export const increment = (counter) => {
  return {
    type: INCREMENT,
    counter
  }
}

export const decrement = (counter) => {
  return {
    type: DECREMENT,
    counter
  }
}

export const getBannerList = (bannerList) => {
  return {
    type: GET_BANNER_LIST,
    bannerList
  }
}

export const getRecommendList = (recommendList) => {
  return {
    type: GET_RECOMMEND_LIST,
    recommendList
  }
}

export const getBannerListAsync = () => {
  return (dispatch) => {
    axios.get('http://123.207.32.32:8000/home/multidata').then(res => {
      const bannerList = res.data.data.banner.list
      const recommendList = res.data.data.recommend.list
      dispatch(getBannerList(bannerList))
      dispatch(getRecommendList(recommendList))
    })
  }
}