import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type CounterState = { value: number; loading: boolean; error: string | null };
const initialState: CounterState = {
  value: 0,
  loading: false,
  error: null,
};

export const fetchRandom = createAsyncThunk<number>(
  'counter/fetchRandom',
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Math.floor(Math.random() * 10);
  }
);

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    addBy(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRandom.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(fetchRandom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? '加载失败';
      });
  },
});

export const { increment, decrement, addBy } = counterSlice.actions;
export default counterSlice.reducer;
