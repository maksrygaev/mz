import { TAppDispatch } from '../store';
import { setAddresses } from '../store/contract';
import SettingServices from '../services/setting';

/**
 * Reload contacts addresses
 */
export const loadContractAddress = () => async (dispatch: TAppDispatch) => {
  try {
    const response: any = await SettingServices.getContracts();
    dispatch(setAddresses(response));
  } catch (error) {
    console.log(error);
  }
};
