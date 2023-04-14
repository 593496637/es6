import { INCREMENT, DECREMENT, GET_BANNER_LIST, GET_RECOMMEND_LIST } from './actionTypes'

const initialState = {
  counter: 10,
  bannerList: [],
  recommendList: [],
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + action.counter
      }
    case DECREMENT:
      return {
        ...state,
        counter: state.counter - action.counter
      }
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