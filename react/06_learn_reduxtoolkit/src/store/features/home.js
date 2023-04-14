import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchHomeData = createAsyncThunk('home/fetchHomeData', async () => {
  const { data } = await axios.get('http://123.207.32.32:8000/home/multidata');
  return data;
})

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    bannerList: [],
    recommendList: [],
  },
  reducers: {
    setBannerList: (state, { payload }) => {
      state.bannerList = payload;
    },
    setRecommendList: (state, { payload }) => {
      state.recommendList = payload;
    }
  },
  extraReducers: {
    [fetchHomeData.pending]: (state, { payload }) => {
      console.log('pending');
    },
    [fetchHomeData.fulfilled]: (state, { payload }) => {
      console.log('fulfilled');
      state.bannerList = payload.data.banner.list;
      state.recommendList = payload.data.recommend.list;
    },
    [fetchHomeData.rejected]: (state, { payload }) => {
      console.log('rejected');
    }
  }
})

export default homeSlice.reducer