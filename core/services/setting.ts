import { request } from 'core/helpers';

/**
 * Get settings
 * @returns {Promise<any>}
 */
const list = () => request({ url: '/settings/search', data: {} });

/**
 * Settings List
 * @param {object} data
 * @param {number} data.id
 * @param {string} data.description
 * @param {string} data.name
 * @param {string} data.value
 * @returns {Promise<any>}
 */
const update = (data: any) => request({ url: '/settings/update', data });

/**
 * Get setting by key
 * @param {string} key
 * @returns {Promise<any>}
 */
const getByKey = (key: string) => request({ url: '/settings/get', data: { value: key } });

/**
 * Get contracts addresses
 * @returns {Promise<any>}
 */
const getContracts = async () => {
  try {
    const NFTContractAddressRs = await getByKey('NFTContractAddress');
    const VaultContractAddressRs = await getByKey('VaultContractAddress');
    const MarketplaceWalletAddress = await getByKey('MarketplaceWalletAddress');
    const MarketplaceFee = await getByKey('MarketplaceFee');
    const WithdrawalApprovalContractAddress = await getByKey('WithdrawalApprovalContractAddress');
    return {
      NFTContractAddress: NFTContractAddressRs.value,
      VaultContractAddress: VaultContractAddressRs.value,
      MarketplaceWalletAddress: MarketplaceWalletAddress.value,
      MarketplaceFee: MarketplaceFee.value,
      WithdrawalApprovalContractAddress: WithdrawalApprovalContractAddress.value,
    };
  } catch (error) {
    throw error;
  }
};

const SettingServices = {
  list,
  update,
  getByKey,
  getContracts,
};

export default SettingServices;
