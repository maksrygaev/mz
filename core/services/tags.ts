import { request } from 'core/helpers';

/*
 *
 */
const create = (data: any) => request({ url: '/products/tags/add', data });

const remove = (data: any) => request({ url: '/products/tags/remove', data });

/*
 *
 */
const createList = async (tags: string[], productID: number) => {
  try {
    if (tags.length > 0 && productID) {
      await Promise.all(
        tags.map(async (tag) => {
          await create({value: tag, productID});
        }),
      )
    }
  } catch (error) {
    throw error;
  }
}
const removeList = async (tags: string[]) => {
  try {
    if (tags.length > 0) {
      await Promise.all(
        tags.map(async (tag) => {
          await remove({id: tag});
        }),
      )
    }
  } catch (error) {
    throw error;
  }
}

/*
 *
 */
const listTags = async (data: any) => {
  try {
    const response = await request({ url: '/products/tags/search', data });
    return response;
  } catch (error) {
    throw error;
  }
}

export const TagsServices = {
  create,
  remove,
  createList,
  removeList,
  listTags
};
