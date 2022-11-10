import axios from "axios";
import { ACCESS_TOKEN, API_URL, REFRESH_TOKEN, TOKEN_REFRESH_PATH } from "@constants/common";
import { getCookie, setCookie } from "@utils/cookieUtil";

const request = axios.create({
  baseURL: API_URL,
  // timeout: 5000,
  withCredentials: false,
});


const setToken = (accessToken, refreshToken) => {
  if (accessToken) {
    setCookie(ACCESS_TOKEN, accessToken, {
      path: "/",
      maxAge: 3600,
    });

    setCookie(REFRESH_TOKEN, refreshToken, {
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
    const { data } = response;
    const access = data.access_token;
    const refresh = data.refresh_token;
    setToken(access, refresh);
    return response;
  },

  async (error) => {
    if (error.response.status === 401) {
      const originalRequest = error;
      const getRefreshTokenFromCookies = getCookie(REFRESH_TOKEN);
      await axios
        .get(`${API_URL}${TOKEN_REFRESH_PATH}`, {
          headers: { Authorization: `Bearer ${getRefreshTokenFromCookies}` },
        })
        .then(({ data }) => {
          setToken(data.access_token, data.refresh_token);
        });


      if (originalRequest.method === "get") {
        return axios
          .get(
            `${API_URL}${originalRequest.url}`,
            { ...originalRequest.config, headers: { Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}` },
            },
          )
          .then((res) => res);
      }

      if (originalRequest.method === "delete") {
        return axios
          .delete(
            `${API_URL}${originalRequest.url}`,
            { ...originalRequest.config, headers: { Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}` },
            },
          )
          .then((res) => res);
      }

      if (originalRequest.method === "post") {
        return axios
          .post(
            `${API_URL}${originalRequest.url}`,
            originalRequest.data,
            { ...originalRequest.config, headers: { Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}` },
            },
          )
          .then((res) => res);
      }
      if (originalRequest.method === "put") {
        return axios
          .put(
            `${API_URL}${originalRequest.url}`,
            originalRequest.data,
            { ...originalRequest.config, headers: { Authorization: `Bearer ${getCookie(ACCESS_TOKEN)}` },
            },
          )
          .then((res) => res);
      }
    }
    window.location.href = "/login";


    return Promise.reject(error);
  },
);

export default request;
