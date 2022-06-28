import { IconType } from 'components/Common/SocialItem';
import { request } from '../helpers';

export interface LinkData {
  value: string | undefined;
  networkID: any;
  id: string;
  link: IconType | string;
  name: string;
}

const linkCreate = (data: any) => request({ url: `/users/networks/add`, data });

const linksFetch = (data: any) => request({ url: `/users/networks/search`, data });

const linksUpdate = (data: any) => request({ url: `/links/update`, data });

const linksDelete = (data: any) => request({ url: `/users/networks/remove`, data });

const linksCreateGallery = (data: any) => request({ url: '/galleries/networks/add', data });

const linksFetchGallery = (data: any) => request({ url: '/galleries/networks/search', data });

const linksDeleteGallery = (data: any) => request({ url: '/galleries/networks/remove', data });

export const LinksServices = {
  linkCreate,
  linksFetch,
  linksUpdate,
  linksDelete,
  linksCreateGallery,
  linksDeleteGallery,
  linksFetchGallery,
};
