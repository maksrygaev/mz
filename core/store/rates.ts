import {createSlice} from "@reduxjs/toolkit";

export interface Rates {
  rates: { [key in string]: number };
  isLoaded: boolean,
}

const initialState: Rates = {
  rates: {},
  isLoaded: false,
};

export const RatesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    setRates: (state, action) => {
      state.rates = action.payload;
      state.isLoaded = true;
    },
  },
});

export const { setRates } = RatesSlice.actions;

export default RatesSlice.reducer;