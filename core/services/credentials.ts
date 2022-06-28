import { request } from 'core/helpers';

const create = (data: any) => request({ url: '/credentials/create', data });

const confirm = (data: any) => request({ url: '/credentials/confirm', data });

const recovery = (data: any) => request({ url: '/credentials/request', data });

export const CredentialsServices = {
  create,
  confirm,
  recovery,
};
