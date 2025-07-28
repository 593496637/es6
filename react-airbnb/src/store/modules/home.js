import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGoodPriceInfoData, getHighScoreInfoData, getDiscountInfoData, getHotRecommendInfoData } from "@/services/modules/home";

// 异步action
export const fetchGoodPriceInfoData = createAsyncThunk('fetchGoodPriceInfoData', (payload, { dispatch }) => {
  getGoodPriceInfoData().then(res => {
    dispatch(changeGoodPriceInfoAction(res))
  })
  getHighScoreInfoData().then(res => {
    dispatch(changeHighScoreInfoAction(res))
  })
  getDiscountInfoData().then(res => {
    dispatch(changeDiscountInfoAction(res))
  })
  getHotRecommendInfoData().then(res => {
    dispatch(changeRecommendInfoAction(res))
  })
})

const homeSlice = createSlice({
  name: "home",
  initialState: {
    goodPriceInfo: {},
    highScoreInfo: {},
    discountInfo: {},
    recommendInfo: {},
  },
  reducers: {
    changeGoodPriceInfoAction(state, { payload }) {
      state.goodPriceInfo = payload;
    },
    changeHighScoreInfoAction(state, { payload }) {
      state.highScoreInfo = payload;
    },

    changeDiscountInfoAction(state, { payload }) {
      state.discountInfo = payload;
    },
    changeRecommendInfoAction(state, { payload }) {
      state.recommendInfo = payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchGoodPriceInfoData.fulfilled, (state, { payload }) => {
    //   state.goodPriceInfo = payload;
    // });
  },
});

export const {
  changeGoodPriceInfoAction,
  changeHighScoreInfoAction,
  changeDiscountInfoAction,
  changeRecommendInfoAction,
} = homeSlice.actions;

export default homeSlice.reducer;