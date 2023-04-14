import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    counter: 100,
  },
  reducers: {
    increment: (state, { payload }) => {
      state.counter += payload;
    },
    decrement: (state, { payload }) => {
      state.counter -= payload;
    }
  }
})

export const { increment, decrement } = counterSlice.actions

export default counterSlice.reducer