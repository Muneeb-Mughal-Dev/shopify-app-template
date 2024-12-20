import { Env } from '@src/constants/environments';

const { apiUrl, apiPrefix } = Env;

export const axiosConfig = {
  baseURL: apiUrl + apiPrefix,
  timeout: 30000,
  withCredentials: true,
};
