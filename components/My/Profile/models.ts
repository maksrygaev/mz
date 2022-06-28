import { LinkData } from 'core/services';

export interface UserProps {
  authenticationKey?: string;
  avatarFilePath?: string;
  previewFilePath?: string;
  contentFilePath?: string;
  bannerFilePath?: string;
  authenticationType?: string;
  avatarFileID?: number;
  previewFileID?: number;
  contentFileID?: number;
  bannerFileID?: number;
  biography?: string;
  countFollowers?: number;
  countFollowing?: number;
  countLikes?: number;
  countProductsOwned?: number;
  dateCreated?: string;
  hash?: string;
  id?: number;
  liked?: boolean;
  name?: string;
  passwordHash?: string;
  role?: string;
  status?: string;
}

export interface SocialBlockProps {
  linksList?: LinkData[];
  setLinksList?: (response: any) => void;
}
