import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0
  },
  reducers: {
    incremented: state => {
      state.count += 1
    },
    decremented: state => {
      state.count -= 1
    },
    incrementByAmount: (state, action) => {
        state.count += action.payload;
    }
  }
});

export const { incremented, decremented, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;

// const store = configureStore({
//   reducer: counterSlice.reducer
// });

// // Can still subscribe to the store
// store.subscribe(() => console.log(store.getState()));

// // Still pass action objects to `dispatch`, but they're created for us
// store.dispatch(incremented());
// // {value: 1}
// store.dispatch(incremented());
// // {value: 2}
// store.dispatch(decremented());
// // {value: 1}