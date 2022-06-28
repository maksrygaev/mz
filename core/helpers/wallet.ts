import { ethers } from 'ethers';
import { _TypedDataEncoder } from '@ethersproject/hash';

type TPermitFields = {
  tokenAddress?: string;
  tokenAmount: string;
  nonce?: number;
  currency?: string;
  createdAt?: number;
  deadline?: number;
  recipient?: string;
  beneficiaries: string[];
  percentOfBeneficiaries: string[];
  price: string;
  data?: any;
};

export async function getMintPermitForId(
  tokenId: string,
  signer: any,
  contractAddress: string,
  permitFields: TPermitFields,
  provider?: any,
) {
  const signedData = {
    EIP712Version: '4',
    domain: {
      name: 'DWM',
      version: '1',
      chainId: ethers.BigNumber.from(await signer.getChainId()),
      verifyingContract: contractAddress,
    },
    types: {
      MintPermit: [
        { name: 'tokenId', type: 'uint256' },
        { name: 'tokenAmount', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'currency', type: 'address' },
        { name: 'createdAt', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
        { name: 'recipient', type: 'address' },
        { name: 'beneficiaries', type: 'address[]' },
        { name: 'percentOfBeneficiaries', type: 'uint256[]' },
        { name: 'price', type: 'uint256' },
        { name: 'data', type: 'bytes' },
      ],
    },
    primaryType: 'MintPermit',
    message: {
      tokenId,
      tokenAmount: permitFields.tokenAmount,
      nonce: permitFields?.nonce ?? (await signer.getTransactionCount()),
      currency: permitFields?.currency ?? '0x0000000000000000000000000000000000000000', //using the zero address means Ether
      createdAt: permitFields?.createdAt ?? Math.floor(Date.now() / 1000),
      deadline: permitFields?.deadline ?? Math.floor((Date.now() + 31622400) / 1000), // 1 year late
      recipient: permitFields?.recipient ?? '0x0000000000000000000000000000000000000000', // using the zero address means anyone can claim
      beneficiaries: permitFields.beneficiaries,
      percentOfBeneficiaries: permitFields.percentOfBeneficiaries,
      price: permitFields.price,
      data: [],
    },
  };

  let signedStr = '';

  if (provider) {
    const populated = await _TypedDataEncoder.resolveNames(
      signedData.domain,
      signedData.types,
      signedData.message,
      (name: string) => {
        return provider.resolveName(name);
      },
    );
    signedStr = JSON.stringify(_TypedDataEncoder.getPayload(populated.domain, signedData.types, populated.value));
  }
  const signature = await signer._signTypedData(signedData.domain, signedData.types as any, signedData.message);

  return { signedData, signature, signedStr };
}

export async function getSwapPermitForId(
  tokenId: string,
  signer: any,
  contractAddress: string,
  permitFields: TPermitFields,
  provider?: any,
) {
  const signedData = {
    EIP712Version: '4',
    domain: {
      name: 'Vault',
      version: '1',
      chainId: ethers.BigNumber.from(await signer.getChainId()),
      verifyingContract: contractAddress,
    },
    types: {
      SwapPermit: [
        { name: 'tokenAddress', type: 'address' },
        { name: 'tokenId', type: 'uint256' },
        { name: 'tokenAmount', type: 'uint256' },
        { name: 'currency', type: 'address' },
        { name: 'beneficiaries', type: 'address[]' },
        { name: 'percentOfBeneficiaries', type: 'uint256[]' },
        { name: 'price', type: 'uint256' },
        { name: 'createdAt', type: 'uint256' },
        { name: 'deadline', type: 'uint256' },
        { name: 'recipient', type: 'address' },
        { name: 'data', type: 'bytes' },
      ],
    },
    primaryType: 'SwapPermit',
    message: {
      tokenAddress: permitFields?.tokenAddress,
      tokenId,
      tokenAmount: permitFields.tokenAmount,
      currency: permitFields?.currency ?? '0x0000000000000000000000000000000000000000', //using the zero address means Ether
      beneficiaries: permitFields.beneficiaries,
      percentOfBeneficiaries: permitFields.percentOfBeneficiaries,
      price: permitFields.price,
      createdAt: permitFields?.createdAt ?? Math.floor(Date.now() / 1000),
      deadline: permitFields?.deadline ?? Math.floor((Date.now() + 31622400) / 1000), // 1 year late
      recipient: permitFields?.recipient ?? '0x0000000000000000000000000000000000000000', // using the zero address means anyone can claim
      data: [],
    },
  };

  let signedStr = '';

  if (provider) {
    const populated = await _TypedDataEncoder.resolveNames(
      signedData.domain,
      signedData.types,
      signedData.message,
      (name: string) => {
        return provider.resolveName(name);
      },
    );
    signedStr = JSON.stringify(_TypedDataEncoder.getPayload(populated.domain, signedData.types, populated.value));
  }
  const signature = await signer._signTypedData(signedData.domain, signedData.types as any, signedData.message);

  return { signedData, signature, signedStr };
}

export function ellipseAddress(address = '', width = 5): string {
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}

export function ellipseString(string = '', width = 20): string {
  if (string.length > width) return `${string.slice(0, width)}...`;
  return string;
}
