const withPlugins = require('next-compose-plugins');
const withTranslate = require('next-translate');

const API_BASE_URL =
  process.env.APP_ENV === 'development'
    ? 'https://dw.development.agamora.dev/api'
    : process.env.APP_ENV === 'test'
    ? 'https://dw-test.agamora.dev/api'
    : 'https://dw.development.agamora.dev/api';

const nextConfig = {
  future: {
    webpack5: true,
  },
  publicRuntimeConfig: {
    API_BASE_URL,
    API_CONNECT_TIMEOUT: process.env.API_CONNECT_TIMEOUT,
    INFURA_ID: process.env.INFURA_ID,
  },
  serverRuntimeConfig: {
    API_BASE_URL,
  },
};

module.exports = withPlugins([[withTranslate, {}]], nextConfig);
