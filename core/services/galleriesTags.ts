import { request } from 'core/helpers';

const create = (data: any) => request({ url: '/galleries/tags/add', data });

const add = async (tags: [], galleryID: number) => {
  try {
    if(tags.length > 0 && galleryID) {
      await Promise.all(
        tags.map(async (tag) => {
          await create({value: tag, galleryID: galleryID});
        })
      )
    }
  } catch (error) {
    throw error;
  }
}

const count = (data: any) => request({ url: '/galleries/tags/count', data });

const deleteTag = (data: any) => request({ url: '/galleries/tags/remove', data });

const remove = async (tags: []) => {
  try {
    if(tags?.length > 0) {
      await Promise.all(
        tags.map(async (tag: any) => {
            await deleteTag({id: tag.id});
          }
        )
      )
    }
  } catch (error) {
    throw error;
  }
};

const search = (data: any) => request({ url: '/galleries/tags/search', data });

export const GalleriesTagsServices = {
  add,
  count,
  remove,
  search
};