import { request } from 'core/helpers';
import { GalleriesServices } from './galleries';

const create = (data: any) => request({ url: '/users/create', data });

const getUser = (data: any) => request({ url: '/users/get', data });

const updateUser = (data: any) => request({ url: '/users/update', data });

const setWalletAddress = (data: any) => request({ url: '/users/set', data });

const likesAdd = (data: any) => request({url: `/users/likes/add`, data});

const likesRemove = (data: any) => request({url: `/users/likes/remove`, data});

const search = (data: any) => request({ url: '/users/search', data });

const followersCreate = (data: any) => request({url: `/users/followers/add`, data});

const followersDelete = (data: any) => request({url: `/users/followers/delete`, data});

const galleries = async (data: any) => {
  try {
    let galleries: any = [];
    const response = await request({url: `/users/galleries/search`, data});
    if (response.length > 0) {
      galleries = await Promise.all(
        response.map(async (item: any) => {
          const gallery = await GalleriesServices.get(item?.galleryID);
          return gallery;
        })
      );
    }
    return galleries;
  } catch (error) {
    console.log(`Galleries error ${JSON.stringify(error)}`);
  }
};

const followersSearch = (data: any) => request({url: '/users/followers/search', data});

const usersFetch = (data: any) => request({ url: '/users/fetch', data });

const userProducts = (data: any) => request({ url: '/users/products/search', data });

export const UsersServices = {
  create,
  getUser,
  updateUser,
  setWalletAddress,
  likesAdd,
  likesRemove,
  search,
  followersCreate,
  followersDelete,
  galleries,
  followersSearch,
  usersFetch,
  userProducts
};
