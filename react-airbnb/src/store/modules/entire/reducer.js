
const initialState = {
  currentPage: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "changeCurrentPage":
      return { ...state, currentPage: action.currentPage };
    default:
      return state;
  }
}
export default reducer;