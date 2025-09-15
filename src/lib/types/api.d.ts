declare type ErrorResponse = {
  success: false;
  message: string;
};

declare type SuccessfulResponse<T> = {
  data: T;
  meta: PaginationMeta;
};

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;

// Database base properties
declare type DataBaseProps = {
  _id?: string;
  id?: string | number;
  created_at: string;
  updated_at: string;
};

// Pagination structure matching your API
declare type PaginationMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
};

declare type Message = {
  email: string;
  message: string;
};
