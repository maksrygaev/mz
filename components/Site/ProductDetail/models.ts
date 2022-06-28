import { IconType } from "components/Common/SocialItem";

interface SocialItem {
  id: string;
  name?: IconType;
  url?: string;
}

export interface Gallery {
  id: string;
  name?: string;
  url?: string;
  avatar?: string;
}

export interface Hashtag {
  id: string;
  name?: string;
  url?: string;
}

export interface Social {
  eye?: string;
  items?: SocialItem[];
  likes?: string;
}

export interface ProductDetailProps {
  author?: string;
  userAvatarFilePath?: string;
  userPreviewFilePath?: string;
  collectinName?: string;
  collectionImage?: string;
  description?: string;
  hashtags?: Hashtag[];
  image?: string;
  limitedSales?: string;
  owner?: string;
  ownerAvatar?: string;
  price?: string;
  secondaryPrice?: string;
  social?: Social;
  techInfo?: string;
  title?: string;
  galleries?: Gallery[];
}
