import { createSlice } from '@reduxjs/toolkit';

export interface Contacts {
  NFTContractAddress: string;
  VaultContractAddress: string;
  MarketplaceWalletAddress: string;
  MarketplaceFee: string;
  WithdrawalApprovalContractAddress: string;
  isLoaded: boolean;
}

const initialState: Contacts = {
  NFTContractAddress: '',
  VaultContractAddress: '',
  MarketplaceWalletAddress: '',
  MarketplaceFee: '',
  WithdrawalApprovalContractAddress: '',
  isLoaded: false,
};

export const RatesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    setAddresses: (state, action) => {
      state.NFTContractAddress = action.payload.NFTContractAddress;
      state.VaultContractAddress = action.payload.VaultContractAddress;
      state.MarketplaceWalletAddress = action.payload.MarketplaceWalletAddress;
      state.MarketplaceFee = action.payload.MarketplaceFee;
      state.WithdrawalApprovalContractAddress = action.payload.WithdrawalApprovalContractAddress;
      state.isLoaded = true;
    },
  },
});

export const { setAddresses } = RatesSlice.actions;

export default RatesSlice.reducer;
