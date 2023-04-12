import { INCREMENT, DECREMENT } from './actionTypes'
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
