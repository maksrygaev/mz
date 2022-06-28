import { request } from '../helpers';

export const coinGeckoBaseUrl = 'https://api.coingecko.com/api/v3/';

export const getCoinGeckoRatesData = async () => {
  try {
    const rs = await request({
      method: 'GET',
      url: `simple/price?ids=ethereum&vs_currencies=usd,eur`,
      baseURL: coinGeckoBaseUrl,
    });
    return rs;
  } catch (error) {
    throw error;
  }
};
