import axios from "axios";

let apiAdminInstance = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
  timeout: 7000,
});

apiAdminInstance.interceptors.request.use(
  async (config) => {
    const auth_token = await localStorage.getItem("auth_token");
    if (auth_token) {
      config.headers.Authorization = `Bearer ${auth_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiAdminInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 400) {
      return response;
    } else if (response.status === 401 || response.status === 403) {
      window.location.href = "/";
    } else {
      return Promise.reject(error);
    }
  }
);

export const apiAdminConfig = apiAdminInstance;
