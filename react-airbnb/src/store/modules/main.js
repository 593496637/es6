import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    headerConfig: {
      isFixed: false,
      isShowSearch: false,
    }
  },
  reducers: {
    setHeaderConfig: (state, action) => {
      state.headerConfig = action.payload;
    },
  },
});

export const { setHeaderConfig } = mainSlice.actions;
export default mainSlice.reducer;