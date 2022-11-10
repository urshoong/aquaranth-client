import axios from "axios";
import { ACCESS_TOKEN, API_URL, REFRESH_TOKEN, TOKEN_REFRESH_PATH } from "@constants/common";
import { getCookie, setCookie } from "@utils/cookieUtil";

const request = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  withCredentials: true,
});


const setToken = (getAccessTokenFromResponse, response) => {
  if (getAccessTokenFromResponse) {
    setCookie(ACCESS_TOKEN, getAccessTokenFromResponse, {
      path: "/",
      maxAge: 3600,
    });
    setCookie(REFRESH_TOKEN, response.data.refresh_token, {
      path: "/",
      maxAge: 8640000,
    });
  }
};


request.interceptors.request.use(
  (config) => {
    const getAccessTokenFromCookies = getCookie(ACCESS_TOKEN);
    if (getAccessTokenFromCookies) {
      return {
        ...config,
        headers: { Authorization: `Bearer ${getAccessTokenFromCookies}` },
      };
    }
    return { ...config };
  },
  (error) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => {
    const getAccessTokenFromResponse = response.data.access_token;
    setToken(getAccessTokenFromResponse, response);
    return response;
  },

  async (error) => {
    if (error.response.status === 401 && error.response.data.error_message.indexOf(/expired/)) {
      const originalRequest = error.config;
      const getRefreshTokenFromCookies = getCookie(REFRESH_TOKEN);
      await axios
        .get(`${API_URL}${TOKEN_REFRESH_PATH}`, {
          headers: { Authorization: `Bearer ${getRefreshTokenFromCookies}` },
        })
        .then((res) => {
          setToken(getRefreshTokenFromCookies, res);
        })
        .catch(() => {
          window.location.href = "/login";
        });

      if (originalRequest.method === "get") {
        return axios
          .get(`${API_URL}${originalRequest.url}`, { ...originalRequest, headers: { Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}` } })
          .then((response) => response);
      }
      if (originalRequest.method === "delete") {
        return axios
          .get(`${API_URL}${originalRequest.url}`, { ...originalRequest, headers: { Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}` } })
          .then((response) => response);
      }
      if (originalRequest.method === "post") {
        return axios
          .post(`${API_URL}${originalRequest.url}`, originalRequest.data, { ...originalRequest, headers: { Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}` } })
          .then((response) => response);
      }
      if (originalRequest.method === "put") {
        return axios
          .post(`${API_URL}${originalRequest.url}`, originalRequest.data, { ...originalRequest, headers: { Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}` } })
          .then((response) => response);
      }
    }
    return Promise.reject(error);
  },
);

export default request;
