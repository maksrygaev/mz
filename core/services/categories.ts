import { request } from '../helpers';

export interface ISearchCategoryRequest {
  limitation?: {
    count: number;
    firstRow: number;
  };
  name?: string;
  parentID?: number;
  sorting?: {
    column: string;
    isAscending: true;
  };
}

export interface ISearchCategory {
  id: number;
  name: string;
  parentID: string;
  previewFileID: number;
  previewFilePath: string;
}

const search = async (params: ISearchCategoryRequest = {}): Promise<ISearchCategory[]> => {
  try {
    const categoriesList = await request({
      url: `/categories/search`,
      data: params,
    });
    return categoriesList;
  } catch (error) {
    throw error;
  }
};

export const CategoriesServices = {
  search,
};
