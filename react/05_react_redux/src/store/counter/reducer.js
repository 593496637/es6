const initialState = {
  counter: 10,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + action.counter
      }
    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - action.counter
      }
    default:
      return state
  }
}

export default reducer