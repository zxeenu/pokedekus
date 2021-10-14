import { createSlice } from '@reduxjs/toolkit';
import { ofType } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators';


const pokeFetch = createSlice({
  name: 'pokeFetch',
  initialState: {
    isPinging: 'PONG'
  },
  reducers: {
    PING: state => {
      state.isPinging = 'PONG';
    },
    PONG: state => {
      state.isPinging = 'PING';
    }
  }
});

const pingEpic = action$ => action$.pipe(
  ofType(PING),
  delay(5000), // Asynchronously wait 1000ms then continue
  mapTo({ type: PONG })
);

export const { PING, PONG } = pokeFetch.actions;
export { pingEpic };
export default pokeFetch.reducer;
