import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { IApiResponse } from '@/types';
import { toast } from 'sonner';

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  config.withCredentials = true;
  return config;
};

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError<IApiResponse<any>, any>) => {
    const message = error.response?.data.message || error;
    toast.error(`Api Error: ${message}`, {
      position: 'bottom-center',
      duration: 5000,
    });

    if (error.response?.status === 401) {
      window.location.href = '/';
    }
  },
);
