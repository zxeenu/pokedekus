import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { combineEpics } from 'redux-observable';

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


// Redux-Observable middleware setup. But could not get it working, progess on hold for now.
// // debounceTime delays notifications emitted by the source Observable, but drops previous pending delayed emissions if a new notification arrives on the source Observable. 
// const openModal = (action$) => action$.pipe(
//   ofType(OPEN_MODAL),
//   debounceTime(1000),
//   mapTo({ type: OPEN_MODAL })
// );

// // const closeModal = (action$) => action$.pipe(
// //   ofType(CLOSE_MODAL),
// //   debounceTime(1000),
// //   mapTo({ type: CLOSE_MODAL })
// // );

// // the epic (Redux Observable middleware.)
// // actions pass from the middleware, to the reducers.
const pokeFetchEpic = combineEpics(
  // openModal,
);

export const { OPEN_MODAL, CLOSE_MODAL } = pokeFetch.actions;
export { pokeFetchEpic };
export { loadPokemon };
export default pokeFetch.reducer;
