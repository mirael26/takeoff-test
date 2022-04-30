import axios, { AxiosError, AxiosResponse } from "axios";
import { UpdateAuthAction } from "../types";

const BACKEND_URL = `http://localhost:3000`;
const REQUEST_TIMEOUT = 5000;

const HttpCode = {
  UNAUTHORIZED: 401
};

const createAPI = (onUnauthorized: () => UpdateAuthAction) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response:AxiosResponse) => response;

  const onFail = (err:AxiosError) => {
    const {response} = err;

    if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();
      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export {createAPI};