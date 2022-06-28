export interface ListItemResult {
  avatar?: string;
  category?: string;
  href?: string;
  id?: string;
  previewFileID?: string;
  countLikes?: string;
  price?: number;
  name?: string;
  userID?: string;
  image?: string;
  title?: string;
  userName?: string;
  likes?: string;
}

// Response model

export interface SearchResultError {
  message: string;
}

export interface SearchResultData {
  total?: number;
  results?: ListItemResult[];
  facets?: [];
}

export interface SearchResultResponse {
  data?: SearchResultData;
  errors?: SearchResultError[];
  hasErrors: boolean;
  success: boolean;
}
