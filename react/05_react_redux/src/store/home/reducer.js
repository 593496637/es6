import { GET_BANNER_LIST, GET_RECOMMEND_LIST } from "./actionTypes"
const initialState = {
  bannerList: [],
  recommendList: []
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BANNER_LIST:
      return {
        ...state,
        bannerList: action.bannerList
      }
    case GET_RECOMMEND_LIST:
      return {
        ...state,
        recommendList: action.recommendList
      }
    default:
      return state
  }
}

export default reducer