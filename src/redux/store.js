import { configureStore } from '@reduxjs/toolkit';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import counterReducer from './counter';
import pokeFetch, { pingEpic } from './pokeFetch';

const epicMiddleware = createEpicMiddleware();

// Redux store implemented with the Redux-Observable middleware.
const store = configureStore({
    reducer: {
        counter: counterReducer,
        pokeFetch: pokeFetch,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(epicMiddleware),
});

// Combines all the login of the Redux-Observable epics into a single epic
const rootEpic = combineEpics(
    pingEpic,
);

// Pass the consolidated epic into the middleware
epicMiddleware.run(rootEpic);

export default store;