import { getCoinGeckoRatesData } from '../services/rates';
import { TAppDispatch } from '../store';
import { setRates } from '../store/rates';

/**
 * Edit rates for ids
 */
export const updateRates = () => async (dispatch: TAppDispatch) => {
  try {
    const response: any = await getCoinGeckoRatesData();
    dispatch(setRates({
      usd: Number(response?.ethereum?.usd || 0),
      eur: Number(response?.ethereum?.eur || 0),
    }))
  } catch (error) {
    console.log(error);
  }
};
