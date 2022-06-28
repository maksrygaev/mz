import { request } from '../helpers';

const get = (data: any) => request({ url: '/files/get', data });

const fileUpload = async (data: any) => {
  try {
    const fileID = await request({url: `/files/create`, data})
    if(fileID) {
      const response = await request({url: '/files/get', data: {id: fileID}});
      return response
    }
  } catch(error) {
    throw error
  }
};

const search = () => request({ url: '/files/search' });

const fileFetch = (id: number ) => request({method: 'GET', url: `/files/fetch?id=${id}` });

export const FilesServices = {
  fileUpload,
  fileFetch,
  search,
  get
};