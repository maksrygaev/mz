import { createAsyncThunk } from '@reduxjs/toolkit';
import Router from 'next/router';
import pick from 'lodash/pick';
import { AuthenticationServices } from 'core/services';
import { TAppDispatch } from 'core/store';
import { TUser } from 'core/store/session';

export enum TGetSelfType {
  INIT = 'INIT',
  SIGN_IN = 'SIGN_IN',
  UPDATE = 'UPDATE',
}

export const getSelf = createAsyncThunk<any, TGetSelfType>(
  'session/getSelf',
  async (getSelfType, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response: any = await AuthenticationServices.getSelf();
        const { previewFilePath } = response;
        response.avatarSrc = previewFilePath
          ? previewFilePath
          : '';
        const user: TUser = pick(response, ['id', 'name', 'role', 'avatarSrc', 'walletAddress']);
        return { user, getSelfType };
      } catch (error) {
        localStorage.removeItem('token');
        return rejectWithValue(error);
      }
    } else {
      return rejectWithValue(null);
    }
  },
);

export const loginSuccess = (token: string) => (dispatch: TAppDispatch) => {
  localStorage.setItem('token', token);
  dispatch(getSelf(TGetSelfType.SIGN_IN));
};

export const selfUpdate = () => (dispatch: TAppDispatch) => {
  dispatch(getSelf(TGetSelfType.UPDATE));
};

export const logout = () => (dispatch: TAppDispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: 'session/logout' });
  Router.push('/');
};
