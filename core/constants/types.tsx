export type TProduct = {
  amount: number;
  userName?: string;
  userAvatarFilePath?: string;
  userPreviewFilePath?: string;
  previewFilePath?: string;
  categoryID: number;
  countLikes: number;
  countOrders: number;
  countOwned: number;
  countViews: number;
  contract?: string;
  dateCreated: Date | string;
  description: string;
  fileID: number;
  galleryID: number;
  id: number;
  latestPrice: number;
  liked: boolean;
  tags: [];
  minimalPrice: number;
  name: string;
  previewFileID: number;
  status: string;
  token: string;
  type: string;
  userID: number;
};

export type TArtist = {
  countProductPublished: number;
  countProductsPublished: number;
  countProductsWaiting: number;
  galleryID: number;
  galleryName: string;
  id: number;
  productAmountLimit: number;
  userID: number;
  userName: string;
};

export type TCollections = {
  countLikes: number;
  countViews: number;
  avatarFileID: number;
  dateCreated: number;
  description: string;
  id: number;
  liked: boolean;
  collectionName: string;
  pinned: boolean;
  status: string;
  type: string;
  userID: number;
  collectionID: number;
};

export type TGallery = {
  availability: string;
  avatarFileID: number;
  avatarFilePath: string;
  contentFileID: number;
  previewFilePath: string;
  userWalletAddress?: string;
  bannerFileID: number;
  bannerFilePath: string;
  contentFilePath: string;
  countLikes: number;
  countViews: number;
  fee: number;
  dateCreated: number;
  description: string;
  hash: string;
  id: number;
  liked: boolean;
  name: string;
  pinned: boolean;
  previewFileID: number;
  status: string;
  tags: [];
  userAvatarFileID: number;
  userAvatarFilePath: string;
  userPreviewFilePath: string;
  userID: number;
  userName: string;
};

export type TNetwork = {
  id: number;
  link: string;
  name: string;
};

export type TUserNetwork = {
  id: number;
  networkID: number;
  networkLink: string;
  networkName: string;
  userAvatarFileID: number;
  userAvatarFilePath: string;
  userPreviewFilePath: string;
  userCountLikes: number;
  userID: number;
  userLiked: boolean;
  userName: string;
  value: string;
};

export type TUser = {
  authenticationKey: string;
  authenticationType: string;
  avatarFileID: number;
  avatarFilePath: string;
  bannerFileID: number;
  bannerFilePath: string;
  previewFilePath: string;
  biography: string;
  countFollowers: number;
  countFollowing: number;
  countLikes: number;
  countProductsOwned: number;
  countProductsSold: number;
  dateCreated: string;
  followed: boolean;
  hash: string;
  id: number;
  liked: boolean;
  name: string;
  passwordHash: string;
  role: string;
  status: string;
  walletAddress: string;
  walletPublicKey: string;
};

export type TLIkedProduct = {
  dateCreated: string;
  id: number;
  productCountLikes: number;
  productID: number;
  productLiked: boolean;
  productName: string;
  productPreviewFileID: number;
  productPreviewFilePath: string;
  productType: string;
  userAvatarFileID: number;
  userAvatarFilePath: string;
  userPreviewFilePath: string;
  userCountLikes: number;
  userID: number;
  userLiked: boolean;
  userName: string;
  userRole: string;
};

export type TFile = {
  hash: string;
  id: number;
  name: string;
  path: string;
  size: number;
  userID: number;
};

export type TProposal = {
  dateCreated: string;
  galleryID: number;
  id: number;
  message: string;
  permission: string;
  productID: number;
  productName: string;
  productPreviewFileID: number;
  productPreviewFilePath: string;
  productType: string;
  signature: string;
  status: string;
  userID: number;
  userName: string;
  userPreviewFileID: number;
  userPreviewFilePath: string;
};

export type TOrder = {
  amount: number;
  dateCreated: string;
  dateValid: string;
  galleryID: number;
  id: number;
  maximalOfferPrice: number;
  maximalOfferUserID: number;
  maximalOfferUserName: string;
  maximalOfferUserPreviewFileID: number;
  maximalOfferUserPreviewFilePath: number;
  permission: string;
  price: number;
  productAmount: number;
  productAuthorID: number;
  productCategoryID: number;
  productCountLikes: number;
  productFileID: number;
  productFilePath: string;
  productID: number;
  productName: string;
  productPreviewFileID: number;
  productPreviewFilePath: string;
  productType: string;
  signature: string;
  status: string;
  type: string;
  userID: number;
  userName: string;
  userPreviewFileID: number;
  userPreviewFilePath: string;
};

export type TOffer = {
  amount: number;
  dateCreated: string;
  dateValid: string;
  id: number;
  maximalOfferPrice: number;
  orderDateCreated: string;
  orderDateValid: string;
  orderID: number;
  permission: string;
  price: number;
  productID: number;
  productName: string;
  productPreviewFileID: number;
  productPreviewFilePath: string;
  signature: string;
  status: string;
  userID: number;
  userName?: string;
};

export type TGalleryTag = {
  galleryCountLikes: number,
  galleryID: number,
  galleryLiked: boolean,
  galleryName: string,
  id: number,
  value: string
}