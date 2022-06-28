import { request } from '../helpers';
import { GalleriesTagsServices } from './galleriesTags';

interface ICreateGallery {
  data: any;
  forReview?: boolean;
  tags: [];
}

interface IUpdateGallery {
  data: any;
  tags?: any;
  tagsForDelete?: any;
}

const approve = (data: any) => request({ url: `/galleries/approve`, data });

const reject = (data: any) => request({ url: `/galleries/reject`, data });

const create = async ({ data, forReview, tags }: ICreateGallery) => {
  try {
    const galleryID = await request({ url: `/galleries/create`, data });

    if (tags.length > 0) await GalleriesTagsServices.add(tags, galleryID);

    if (galleryID && forReview) await request({ url: '/galleries/review', data: { id: galleryID } });

    return galleryID;
  } catch (error) {
    throw error;
  }
};

const get = async (id: number | string) => {
  try {
    const gallery = await request({ url: `/galleries/get`, data: { id } });
    gallery.tags = await GalleriesTagsServices.search({ galleryID: id }).catch(() => []);
    return gallery;
  } catch (error) {
    throw error;
  }
};

const search = (data: any) => request({ url: '/galleries/search', data });

const invite = (data: any) => request({ url: `/galleries/users/invite`, data });

const invitesList = (data: any) => request({ url: `/galleries/users/search`, data });

const netwroksList = (data: any) => request({ url: '/galleries/networks/list', data });

const count = (data: any) => request({ url: '/galleries/count', data });

const usersCount = (data: any) => request({ url: '/galleries/users/count', data });

const update = async ({ data, tags, tagsForDelete }: IUpdateGallery) => {
  try {
    const response = await request({ url: '/galleries/update', data });

    if (tagsForDelete.length > 0) await GalleriesTagsServices.remove(tagsForDelete);
    if (tags.length > 0) await GalleriesTagsServices.add(tags, data?.id);
    return response;
  } catch (error) {
    throw error;
  }
};

const likesCount = (data: any) => request({ url: '/galleries/likes/count', data });

const like = (data: any) => request({ url: '/galleries/likes/add', data });

const unLike = (data: any) => request({ url: '/galleries/likes/remove', data });

const usersSearch = (data: any) => request({ url: `/galleries/users/search`, data });

const usersAdd = (data: any) => request({ url: `/galleries/users/add`, data });

const review = (data: any) => request({ url: '/galleries/review', data });

export const GalleriesServices = {
  create,
  get,
  search,
  netwroksList,
  invite,
  invitesList,
  count,
  update,
  approve,
  reject,
  usersCount,
  likesCount,
  like,
  unLike,
  usersSearch,
  review,
  usersAdd,
};
