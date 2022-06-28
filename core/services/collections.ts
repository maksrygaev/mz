import { request } from '../helpers';

const createCollection = (data: any) => request({ url: `/collections/create`, data });

const listCollectionsProducts = (data: any) => request({ url: `/collections/products/search`, data });

const addCollectionsProduct = (data: any) => request({ url: `/collections/products/add`, data });

const removeCollectionsProduct = (data: any) =>
  request({ url: `/collections/products/remove`, data });

const getCollection = (data: any) => request({ url: `/collections/get`, data });

const collectionUpdate = (data: any) => request({ url: `/collections/update`, data });

const likesAdd = (data: any) => request({ url: `/collections/likes/add`, data });

const likesRemove = (data: any) => request({ url: `/collections/likes/remove`, data });

const update = (data: any) => request({ url: `/collections/update`, data });

const search = (data: any) => request({ url: `/collections/search`, data });

const productsCount = (data: any) => request({url: '/collections/products/count', data});

const searchDrops = async  (data: any) => {
  try {
    const collections = await request({ url: `/collections/search`, data });
    let drops: any = [];
    if (collections.length > 0) {
      drops = await Promise.all(
        collections.map(async (item: any) => {
          const products = await listCollectionsProducts({ collectionID: item?.id });
          return { ...item, products: products };
        }),
      );
    }
    return drops;
  } catch (error) {
    throw new Error(error);
  }
};

const addCollectionsList = async (collectionID: string[], productID: number) => {
  try {
    if (collectionID.length > 0 && productID) {
      await Promise.all(
        collectionID.map(async collection => {
          await addCollectionsProduct({ collectionID: collection, productID });
        }),
      );
    }
  } catch (error) {
    throw error;
  }
};

const removeCollectionsList = async (collectionToDelete: string[]) => {
  try {
    if (collectionToDelete.length > 0) {
      await Promise.all(
        collectionToDelete.map(async collection => {
          await removeCollectionsProduct({ id: collection });
        }),
      );
    }
  } catch (error) {
    throw error;
  }
};

export const CollectionsServices = {
  createCollection,
  search,
  searchDrops,
  addCollectionsProduct,
  removeCollectionsProduct,
  listCollectionsProducts,
  getCollection,
  collectionUpdate,
  likesAdd,
  likesRemove,
  update,
  productsCount,
  addCollectionsList,
  removeCollectionsList
};
