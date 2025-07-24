import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGoodPriceInfoData, getHighScoreInfoData } from "@/services/modules/home";

// 异步action
export const fetchGoodPriceInfoData = createAsyncThunk('fetchGoodPriceInfoData', (payload, { dispatch }) => {
  getGoodPriceInfoData().then(res => {
    dispatch(changeGoodPriceInfoAction(res))
  })
  getHighScoreInfoData().then(res => {
    dispatch(changeHighScoreInfoAction(res))
  })
})

const homeSlice = createSlice({
  name: "home",
  initialState: {
    goodPriceInfo: {},
    highScoreInfo: {},
  },
  reducers: {
    changeGoodPriceInfoAction(state, { payload }) {
      state.goodPriceInfo = payload;
    },
    changeHighScoreInfoAction(state, { payload }) {
      state.highScoreInfo = payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchGoodPriceInfoData.fulfilled, (state, { payload }) => {
    //   state.goodPriceInfo = payload;
    // });
  },
});

export const { changeGoodPriceInfoAction, changeHighScoreInfoAction } = homeSlice.actions;

export default homeSlice.reducer;