import getConfig from 'next/config';
const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

const API_BASE_URL = publicRuntimeConfig.API_BASE_URL || serverRuntimeConfig.API_BASE_URL;

export default {
  API_BASE_URL,
  'API_CONNECT_TIMEOUT': 30000,
  'INFURA_ID': '06a47aa5af264c20a5cdf842c56323ad',
}
