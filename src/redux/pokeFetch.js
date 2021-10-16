import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { combineEpics, ofType } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators';

// Thunk
const loadPokemon = createAsyncThunk(
  "pokemon/loadPokemon",
  async (userId, thunkAPI) => {

    const state = thunkAPI.getState();
    const res = await fetch(state.pokeFetch.currentUrl);
    const pokemonUrlList = await res.json();

    const pokemonDataList = [];

    for (let i = 0; i < pokemonUrlList.results.length; i++) {
      const pokemonResponse = await fetch(pokemonUrlList.results[i].url);
      const pokemonData = await pokemonResponse.json();
      pokemonDataList.push(pokemonData);
    }

    const data = {
      dataList: pokemonDataList,
      nextUrl: pokemonUrlList.next
    }

    return data;
  }
);


// Redux state mangement
const pokeFetch = createSlice({
  name: 'pokeFetch',
  initialState: {
    currentUrl: 'https://pokeapi.co/api/v2/pokemon/',
    isPinging: 'PONG',
    status: '',
    pokemonData: [],
    pokemonDataTemp: [],
    detailsModalIsOpen: false,
    pokemonDetailData: null
  },
  reducers: {
    PING: state => {
      state.isPinging = 'PONG';
    },
    PONG: state => {
      state.isPinging = 'PING';
    },
    BONG: (state, action) => {
      state.isPinging = `${action.payload}`;
    },
    OPEN_MODAL: (state, action) => {
      // The payload for this method is the id of a pokemon

      const pokemonId = action.payload;

      let pokemon = null;
      for (let i = 0; i < state.pokemonData.length; i++) {
        if (state.pokemonData[i].id === pokemonId) {
          pokemon = state.pokemonData[i];
        }
      }

      state.pokemonDetailData = pokemon;
      state.detailsModalIsOpen = true;
    },
    CLOSE_MODAL: (state, action) => {
      state.detailsModalIsOpen = false;
    }
  },
  extraReducers: {
    [loadPokemon.pending]: (state, action) => {
      state.status = "loading";
    },
    [loadPokemon.fulfilled]: (state, action) => {
      state.status = "success";
      state.currentUrl = action.payload.nextUrl;
      state.pokemonDataTemp = [...action.payload.dataList];

      if (state.pokemonDataTemp.length !== 0) {
        state.pokemonData = [...state.pokemonData, ...state.pokemonDataTemp];
      } else {
        state.pokemonData = [...state.pokemonDataTemp];
      }
      // console.log(state.pokemonData);
    },
    [loadPokemon.rejected]: (state, action) => {
      state.status = "failed";
    },
  }
});


// A single Epic for the this duck
const pingToPong = (action$ ) => action$.pipe(
  ofType(PING),
  delay(5000), // Asynchronously wait 1000ms then continue
  mapTo({ type: PONG })
);

const pongToPing = (action$) => action$.pipe(
  ofType(PONG),
  delay(5000), // Asynchronously wait 1000ms then continue
  mapTo({ type: PING })
);


// the epic (Redux Observable middleware.)
// actions pass from the middleware, to the reducers.
const pokeFetchEpic = combineEpics(
  pingToPong,
  pongToPing,
);

export const { PING, PONG, BONG, OPEN_MODAL, CLOSE_MODAL } = pokeFetch.actions;
export { pokeFetchEpic };
export { loadPokemon };
export default pokeFetch.reducer;
