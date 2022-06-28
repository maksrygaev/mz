import { request } from '../helpers';

const search = (data: any) => request({ url: `/networks/search`, data});

export const NetworksServices = {
  search,
};
