import { CategoriesServices } from '../services/categories';
import { TAppDispatch } from '../store';
import { setCategories } from '../store/categories';

/**
 * get product categories list / search for categories
 */
export const searchCategories = () => async (dispatch: TAppDispatch) => {
    try {
        const response: any = await CategoriesServices.search({});
        dispatch(setCategories(response));
    } catch (error) {
        console.log(error);
    }
};
