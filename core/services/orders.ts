import { request } from '../helpers';

const create = (data: any) => request({url: `/orders/create`, data});

const sign = (data: any) => request({url: `/orders/sign`, data});

const get = (data: any) => request({url: `/orders/get`, data});

const search = (data: any) => request({url: `/orders/search`, data});

const count = (data: any) => request({url: `/orders/count`, data});

export const OrdersServices = {
  create,
  sign,
  get,
  search,
  count
};
