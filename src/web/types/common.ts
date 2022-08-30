export type Page<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
};

export type Sort = {
  field?: string;
  order?: 'asc' | 'desc';
};