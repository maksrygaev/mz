import { request } from 'core/helpers';

const search = (data: any) => request({ url: '/activities/search', data });

export const ActivitesServices = {
  search,
};
