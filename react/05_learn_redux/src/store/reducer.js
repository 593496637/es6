const initialState = {
  counter: 10,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        counter: state.counter + 1,
      }
    case 'DECREMENT':
      return {
        counter: state.counter - 1,
      }
    default:
      return state
  }
}

export default reducer