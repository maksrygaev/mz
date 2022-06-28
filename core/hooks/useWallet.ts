import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injected } from 'core/config/connectors';
import { ethers } from 'ethers';
import { AbiNFTContract } from 'core/constants/AbiNFTContract';
import { AbiVaultContract } from 'core/constants/AbiVaultContract.js';
import { AbiWETHContract } from 'core/constants/AbiWETHContract.js';
import { getMintPermitForId, getSwapPermitForId } from 'core/helpers/wallet';
import { TAppState } from '../store';
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function useWallet() {
  const { account, activate, deactivate, chainId } = useWeb3React();
  const { NFTContractAddress, VaultContractAddress, WithdrawalApprovalContractAddress } = useSelector(
    (state: TAppState) => state.contract,
  );
  const rates = useSelector((state: TAppState) => state.rates.rates);
  const [balanceCrypto, setBalanceCrypto] = useState<number | null>(null);
  const [balanceFiat, setBalanceFiat] = useState<number | null>(null);

  (async function getBalance() {
    if (typeof window !== 'undefined') {
      if (typeof window.ethereum !== 'undefined' && account !== undefined) {
        const web3 = new Web3(window.ethereum);
        web3.eth.getBalance(account || '').then(res => {
          if (res == null) {
            setBalanceCrypto(null);
          } else {
            const formattedCrypto = Number(web3.utils.fromWei(res, 'ether')).toFixed(5);
            const formattedFiat = (balanceCrypto !== null ? balanceCrypto * rates.usd : 0).toFixed(5);
            setBalanceCrypto(Number(formattedCrypto));
            setBalanceFiat(Number(formattedFiat));
          }
        });
      }
    }
  })();

  const connect = async () => {
    try {
      activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  };

  const disconnect = async () => {
    try {
      await deactivate();
      setBalanceCrypto(null);
      setBalanceFiat(null);
    } catch (ex) {
      console.log(ex);
    }
  };

  const mintNFT = async (metadataSHA1: string, tokenAmount: number) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(NFTContractAddress, AbiNFTContract, signer);
      const tx = await contract.mint(metadataSHA1, tokenAmount);
      return await tx.wait();
    } catch (error) {
      throw error;
    }
  };

  const approveWETH = async (price: string, isSwap = false) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(WithdrawalApprovalContractAddress, AbiWETHContract, signer);
      const contractAddress = isSwap ? VaultContractAddress : NFTContractAddress;
      const tx = await contract.approve(contractAddress, price);
      const rs = await tx.wait();
      return rs;
    } catch (error) {
      throw error;
    }
  };

  const setApprovalForAll = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(NFTContractAddress, AbiNFTContract, signer);
      const tx = await contract.setApprovalForAll(VaultContractAddress, true);
      const rs = await tx.wait();
      return rs;
    } catch (error) {
      throw error;
    }
  };

  const signPermit = async (message: any, isSwap = false) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = isSwap ? VaultContractAddress : NFTContractAddress;
      const getPermitMethod = isSwap ? getSwapPermitForId : getMintPermitForId;
      const { signedData, signature, signedStr } = await getPermitMethod(
        message.tokenId,
        signer,
        contractAddress,
        message,
        provider,
      );
      return { signedData, signature, signedStr };
    } catch (error) {
      throw error;
    }
  };

  const buyToken = async (permitJson: any, signature: string, orderId: any) => {
    try {
      const { r, s, v } = ethers.utils.splitSignature(signature);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const isSwap = permitJson.primaryType === 'SwapPermit';
      const contractAddress = isSwap ? VaultContractAddress : NFTContractAddress;
      const abiContract = isSwap ? AbiVaultContract : AbiNFTContract;
      const contract = new ethers.Contract(contractAddress, abiContract, signer);
      let tx: any = null;
      if (isSwap) {
        tx = await contract.claimPurchase(permitJson.message, v, r, s, orderId, {
          value: permitJson.message.price,
        });
      } else {
        tx = await contract.claimListing(permitJson.message, account, [v, r, s], orderId, {
          value: permitJson.message.price,
        });
      }
      const rs = await tx.wait();
      return rs;
    } catch (error) {
      throw error;
    }
  };

  const checkWETHBalance = async (price: any, isSwap = false) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(WithdrawalApprovalContractAddress, AbiWETHContract, signer);
    const contractAddress = isSwap ? VaultContractAddress : NFTContractAddress;
    const balanceWETHBigNumber = await contract.allowance(contractAddress, account);
    const balanceWETH = Number(ethers.utils.formatUnits(balanceWETHBigNumber));
    const priceWETH = Number(ethers.utils.formatEther(BigInt(price)));
    return priceWETH - balanceWETH;
  };

  const depositWETH = async (needWETH: any) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(WithdrawalApprovalContractAddress, AbiWETHContract, signer);
    const tx = await contract.deposit({ value: needWETH });
    const rs = await tx.wait();
    return rs;
  };

  const claimOffer = async (message: any, signature: string, orderId: any, isSwap = false) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractAddress = isSwap ? VaultContractAddress : NFTContractAddress;
      const abiContract = isSwap ? AbiVaultContract : AbiNFTContract;
      const contract = new ethers.Contract(contractAddress, abiContract, signer);
      const { r, s, v } = ethers.utils.splitSignature(signature);
      let tx: any = null;
      if (isSwap) {
        tx = await contract.claimSaleOrder(message, v, r, s, orderId);
      } else {
        tx = await contract.claimOffer(message, [v, r, s], orderId);
      }
      const rs = await tx.wait();
      return rs;
    } catch (error) {
      throw error;
    }
  };

  const signMessage = async (message: string) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      return signature;
    } catch (error) {
      throw error;
    }
  };

  return {
    connect,
    disconnect,
    mintNFT,
    approveWETH,
    signPermit,
    setApprovalForAll,
    signMessage,
    buyToken,
    claimOffer,
    checkWETHBalance,
    depositWETH,
    address: account,
    chainId,
    balanceCrypto,
    balanceFiat,
  };
}
