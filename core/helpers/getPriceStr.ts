import { ethers } from 'ethers';

export const getPriceStr = (price: number | string | undefined) => ethers.utils.formatEther(BigInt(price || 0).toString());
