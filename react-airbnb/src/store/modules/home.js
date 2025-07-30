import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getGoodPriceInfoData,
  getHighScoreInfoData,
  getDiscountInfoData,
  getHotRecommendInfoData,
  getLongforInfoData,
  getPlusInfoData,
} from '@/services/modules/home';

// 异步action
export const fetchGoodPriceInfoData = createAsyncThunk(
  'fetchGoodPriceInfoData',
  (payload, { dispatch }) => {
    getGoodPriceInfoData().then((res) => {
      dispatch(changeGoodPriceInfoAction(res));
    });
    getHighScoreInfoData().then((res) => {
      dispatch(changeHighScoreInfoAction(res));
    });
    getDiscountInfoData().then((res) => {
      dispatch(changeDiscountInfoAction(res));
    });
    getHotRecommendInfoData().then((res) => {
      dispatch(changeRecommendInfoAction(res));
    });
    getLongforInfoData().then((res) => {
      dispatch(changeLongforInfoAction(res));
    });
    getPlusInfoData().then((res) => {
      dispatch(changePlusInfoAction(res));
    });
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    goodPriceInfo: {},
    highScoreInfo: {},
    discountInfo: {},
    recommendInfo: {},
    longforInfo: {},
    plusInfo: {},
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
    changeLongforInfoAction(state, { payload }) {
      state.longforInfo = payload;
    },
    changePlusInfoAction(state, { payload }) {
      state.plusInfo = payload;
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
  changeLongforInfoAction,
  changePlusInfoAction,
} = homeSlice.actions;

export default homeSlice.reducer;
