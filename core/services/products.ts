import { request } from '../helpers';
import { CollectionsServices } from 'core/services/collections';
import { OrdersServices } from 'core/services/orders';
import { TagsServices } from 'core/services/tags';
import { ProposalsServices } from '.';

const update = async (data: any, withApprove = false) => {
  try {
    const response = await request({ url: `/products/update`, data });
    if (withApprove) {
      await request({ url: `/products/approve`, data: { id: data.id } });
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const updateWithCollections = async (
  productUpdate: any,
  withApprove = false,
  collectionID: Array<any>,
  collectionToDelete: Array<any>,
) => {
  try {
    const response = await request({
      url: `/products/update`,
      data: {
        amount: productUpdate.productUpdate.amount,
        description: productUpdate.productUpdate.description,
        id: productUpdate.productUpdate.id,
        name: productUpdate.productUpdate.name,
        type: productUpdate.productUpdate.type,
        categoryID: productUpdate.productUpdate.categoryID,
      },
    });
    const productID = productUpdate.productUpdate.id;
    await TagsServices.removeList(productUpdate.tagsToDelete);
    await TagsServices.createList(productUpdate.tags, productID);
    if (productUpdate.collectionToDelete.length > 0) {
      await CollectionsServices.removeCollectionsList(productUpdate.collectionToDelete);
    }
    if (productUpdate.collectionID.length > 0) {
      await CollectionsServices.addCollectionsList(productUpdate.collectionID, productID);
    }
    if (withApprove) {
      await request({ url: `/products/approve`, data: { id: productUpdate.productUpdate.id } });
    }
    return response;
  } catch (error) {
    throw error;
  }
};

interface ICreateProduct {
  productData: any;
  collectionID: [];
  tags: string[];
  withReview?: boolean;
}
const create = async ({ productData, collectionID = [], tags = [], withReview = true }: ICreateProduct) => {
  try {
    const productID = await request({ url: `/products/create`, data: productData });
    if (collectionID.length > 0) {
      await CollectionsServices.addCollectionsList(collectionID, productID);
    }
    if (tags.length > 0) {
      await TagsServices.createList(tags, productID);
    }
    if (withReview) {
      await request({ url: `/products/review`, data: { id: productID } });
    }
    return productID;
  } catch (error) {
    throw error;
  }
};

const search = async (data: any) => {
  try {
    const response = await request({ url: `/products/search`, data });
    const products = response.map((product: any) => ({
      ...product,
      previewFilePath: product?.previewFilePath || '',
      cathegory: product.type,
      userName: product?.userName || 'Master',
      userPreviewFilePath: product?.userPreviewFilePath || '/icons/userpage/user-default.jpg',
    }));
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
};

const getProductsLikedSelf = async (data: any) => {
  try {
    const response = await request({ url: `/products/likes/search`, data });
    const products = response.map((product: any) => ({
      ...product,
      cathegory: product.productType,
      productPreviewFilePath: product.productPreviewFilePath || '',
      userName: product.userName ? product.userName : 'Master',
      userPreviewFilePath: product.userPreviewFilePath
        ? product.userPreviewFilePath
        : '/icons/userpage/user-default.jpg',
    }));
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * TODO: refactoring
 */
const getProduct = async (data: any) => {
  try {
    const product = await request({ url: `/products/get`, data });
    return {
      ...product,
      cathegory: product.productType,
      productPreviewFilePath: product.productPreviewFilePath || '',
      userName: product.userName ? product.userName : 'Master',
      userPreviewFilePath: product.userPreviewFilePath
        ? product.userPreviewFilePath
        : '/icons/userpage/user-default.jpg',
    };
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id: number | string) => {
  try {
    const product: any = await request({ url: `/products/get`, data: { id } });
    product.sales = await OrdersServices.search({ productID: id, status: 'Opened', type: 'Sale' }).catch(() => []);
    const openedAuctions = await OrdersServices.search({ productID: id, type: 'Auction', status: 'Opened' }).catch(
      () => [],
    );
    const outdatedAuctions = await OrdersServices.search({ productID: id, type: 'Auction', status: 'Outdated' }).catch(
      () => [],
    );
    const collections = await getProductCollectionsList({ productID: id }).catch(() => []);
    const galleries = await ProposalsServices.search({ productID: id, status: 'Accepted' }).catch(() => []);

    product.auctions = [...openedAuctions, ...outdatedAuctions];
    product.minimalPrice = '0';
    if (product.sales.length > 0) {
      product.minimalPrice = product.sales.reduce(
        (ac: string, sale: any) => (Number(sale.price) < Number(ac) ? sale.price : ac),
        product.sales[0].price,
      );
    }
    product.minimalPrice = BigInt(product.minimalPrice).toString();
    product.userPreviewFilePath = product.userPreviewFilePath
      ? product.userPreviewFilePath
      : '/icons/userpage/user-default.jpg';
    product.userName = product.userName || 'Master';
    product.tags = await TagsServices.listTags({ productID: id }).catch(() => []);
    product.collections = collections;
    product.galleries = galleries;
    return product;
  } catch (error) {
    throw error;
  }
};

const getProductCollectionsList = (data: any) => request({ url: `/products/collections/search`, data });

const approve = (data: any) => request({ url: `/products/approve`, data });

const reject = (data: any) => request({ url: `/products/reject`, data });

const review = (data: any) => request({ url: `/products/review`, data });

const likesAdd = (data: any) => request({ url: `/products/likes/add`, data });

const likesRemove = (data: any) => request({ url: `/products/likes/remove`, data });

const productsCount = (data: any) => request({ url: `/products/count`, data });

const getOwners = (data: any) => request({ url: `/products/users/search`, data });

const getOwnersById = (data: any) => request({ url: `/users/products/search`, data });

export const ProductsServices = {
  update,
  updateWithCollections,
  create,
  search,
  getProduct,
  getProductsLikedSelf,
  approve,
  reject,
  review,
  likesAdd,
  likesRemove,
  getProductById,
  productsCount,
  getOwners,
  getOwnersById,
};
