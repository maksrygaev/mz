import { createSlice } from '@reduxjs/toolkit';
import { ISearchCategory } from '../services/categories';

interface ICategories {
    list: ISearchCategory[],
    isLoaded: boolean,
}

const initialState: ICategories = {
    list: [],
    isLoaded: false,
};

export const CategoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.list = action.payload;
            state.isLoaded = true;
        },
    },
});

export const { setCategories } = CategoriesSlice.actions;

export default CategoriesSlice.reducer;
