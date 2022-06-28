import { request } from '../helpers';

const create = (data: any) => request({url: `/offers/create`, data});

const search = (data: any) => request({url: `/offers/search`, data});

export const OffersServices = {
  create,
  search,
};
