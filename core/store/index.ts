import { configureStore } from '@reduxjs/toolkit';

import sessionReducer from './session';
import ratesReducer from './rates';
import contractReducer from './contract';
import categoriesReducer from './categories';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    rates: ratesReducer,
    contract: contractReducer,
    categories: categoriesReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export type TAppState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
export type TAppGetState = typeof store.getState;

export default store;
