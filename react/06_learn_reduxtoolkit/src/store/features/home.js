import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchHomeData = createAsyncThunk(
  'home/fetchHomeData',
  async (extraInfo, { dispatch, getState }) => {
    console.log(extraInfo, dispatch, getState());
    // 这里可以写异步请求
    const { data } = await axios.get(
      'http://123.207.32.32:8000/home/multidata'
    );
    // 第四种方式
    // 获取数据，并且dispatch到reducer中 ：可以不做任何处理，直接返回数据
    // dispatch(setBannerList(data.data.banner.list));
    // dispatch(setRecommendList(data.data.recommend.list));

    // 返回数据, 会被传递到fulfilled的回调函数中
    return data;
  }
);

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
    },
  },
  // 新的写法，使用builder.addCase()
  extraReducers: (builder) => {
    // 第三种写法（推荐）
    // 还可以链式调用
    builder
      .addCase(fetchHomeData.pending, (state, action) => {
        console.log('pending');
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        console.log('fulfilled');
        state.bannerList = action.payload.data.banner.list;
        state.recommendList = action.payload.data.recommend.list;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        console.log('rejected');
      });

    // 第二种写法
    // builder.addCase(fetchHomeData.pending, (state, action) => {
    //   console.log('pending');
    // });
    // builder.addCase(fetchHomeData.fulfilled, (state, action) => {
    //   console.log('fulfilled');
    //   state.bannerList = action.payload.data.banner.list;
    //   state.recommendList = action.payload.data.recommend.list;
    // });
    // builder.addCase(fetchHomeData.rejected, (state, action) => {
    //   console.log('rejected');
    // });
  },

  // 第一种写法
  // 旧的写法，使用extraReducers的属性表示法
  // extraReducers的属性表示法已经被弃用，使用builder.addCase()替代
  // extraReducers: {
  //   [fetchHomeData.pending]: (state, { payload }) => {
  //     console.log('pending');
  //   },
  //   [fetchHomeData.fulfilled]: (state, { payload }) => {
  //     console.log('fulfilled');
  //     state.bannerList = payload.data.banner.list;
  //     state.recommendList = payload.data.recommend.list;
  //   },
  //   [fetchHomeData.rejected]: (state, { payload }) => {
  //     console.log('rejected');
  //   }
  // }
});

export default homeSlice.reducer;
