import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    productionList: [],
  },
  reducers: {
    changeProductionList(state, { payload }) {
      state.productionList = payload;
    },
  },
});

export const { changeProductionList } = homeSlice.actions;

export default homeSlice.reducer;