import { createSlice } from '@reduxjs/toolkit';
import { getSelf, TGetSelfType } from 'core/actions';
import Router from 'next/router';

export type TUser = {
  id: number;
  name: string;
  avatarSrc: string;
  role: string;
  walletAddress?: string;
};

export enum TGetSelfStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

export type TSessionState = {
  getSelfStatus: TGetSelfStatus;
  user: TUser | null;
};

const initialState: TSessionState = {
  getSelfStatus: TGetSelfStatus.IDLE,
  user: null,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSelf.pending, state => {
      state.getSelfStatus = TGetSelfStatus.PENDING;
    });
    builder.addCase(getSelf.fulfilled, (state, action) => {
      state.getSelfStatus = TGetSelfStatus.SUCCESS;
      state.user = action.payload.user;
      if (![TGetSelfType.INIT, TGetSelfType.UPDATE].includes(action.payload.getSelfType)) {
        if (action.payload.user.role === 'Administrator') {
          Router.push('/admin');
        } else {
          Router.push('/');
        }
      }
    });
    builder.addCase(getSelf.rejected, state => {
      state.getSelfStatus = TGetSelfStatus.FAILURE;
      state.user = null;
    });
  },
});

export default sessionSlice.reducer;
