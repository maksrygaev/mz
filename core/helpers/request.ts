import axios, { AxiosRequestConfig, AxiosError, Method } from 'axios';
import config from 'core/config';

axios.defaults.timeout = config.API_CONNECT_TIMEOUT;

interface IRequest {
  method?: Method;
  url: string;
  data?: any;
  contentType?: string;
  baseURL?: string;
}

export const request = ({
  method = 'POST',
  url = '',
  data = null,
  contentType = 'application/json',
  baseURL = config.API_BASE_URL,
}: IRequest): Promise<any> => {
  const options: AxiosRequestConfig = {
    method,
    baseURL,
    url,
    headers: { 'content-type': contentType },
  };

  if (typeof(localStorage) !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) options.headers.Authorization = `Bearer ${token}`;
  }

  if (data && method === 'GET') {
    options.params = data;
  } else if (data) {
    options.data = data;
  }

  // console.log(options);

  const errorHandler = (axiosError: AxiosError) => {
    const error = { status: 0, message: '', data, code: 0 };
    if (axiosError.response) {
      error.data = axiosError.response.data || null;
      error.status = axiosError.response.status;
      error.code = error.data?.code || '';
      if (error.status < 500) {
        error.message = axiosError.response.data.message;
      }
    } else {
      error.status = 600;
      error.message = 'Unknown error occured'
    }
    return error;
  };

  return new Promise((resolve, reject) => {
    axios(options)
      .then(response => resolve(response.data))
      .catch(error => reject(errorHandler(error)));
  });
};
