import { request } from '../helpers';

const create = (data: any) => request({url: `/proposals/create`, data});

const search = (data: any) => request({url: `/proposals/search`, data});

const approve = (data: any) => request({url: `/proposals/approve`, data});

const reject = (data: any) => request({url: `/proposals/reject`, data});

export const ProposalsServices = {
  create,
  search,
  approve,
  reject
};
