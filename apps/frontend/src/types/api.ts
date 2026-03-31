export interface IApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}

export interface User {
  name: string;
  id: number;
}
