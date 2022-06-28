import { request } from '../helpers';

const create = (data: any) => request({url: `/sales/create`, data});

const sign = (data: any) => request({url: `/sales/sign`, data});

const get = (data: any) => request({url: `/sales/get`, data});

const search = (data: any) => request({url: `/sales/search`, data});

export const SalesServices = {
  create,
  sign,
  get,
  search,
};
