import { createSlice } from '@reduxjs/toolkit';
import { combineEpics, ofType } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators';

// Redux state mangement
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


// A single Epic for the this duck
const pingToPong = action$ => action$.pipe(
  ofType(PING),
  delay(5000), // Asynchronously wait 1000ms then continue
  mapTo({ type: PONG })
);

const pongToPing = action$ => action$.pipe(
  ofType(PONG),
  delay(5000), // Asynchronously wait 1000ms then continue
  mapTo({ type: PING })
);

// the epic (Redux Observable middleware.)
// actions pass from the middleware, to the reducers.
const pokeFetchEpic = combineEpics(
  pingToPong,
  pongToPing
);

export const { PING, PONG } = pokeFetch.actions;
export { pokeFetchEpic };
export default pokeFetch.reducer;
