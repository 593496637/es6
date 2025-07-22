import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getGoodPriceInfoData } from "@/services/modules/home";

export const fetchGoodPriceInfoData = createAsyncThunk('fetchGoodPriceInfoData', async () => {
  const res = await getGoodPriceInfoData()
  console.log(res)
  return res
})


const homeSlice = createSlice({
  name: "home",
  initialState: {
    goodPriceInfo: {},
  },
  reducers: {
    changeGoodPriceInfoAction(state, { payload }) {
      state.goodPriceInfo = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGoodPriceInfoData.fulfilled, (state, { payload }) => {
      state.goodPriceInfo = payload;
    });
  },
});

export const { changeGoodPriceInfoAction } = homeSlice.actions;

export default homeSlice.reducer;