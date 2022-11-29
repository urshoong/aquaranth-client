import axios from "axios";
import { ACCESS_TOKEN, API_URL, REFRESH_TOKEN, TOKEN_REFRESH_PATH } from "@constants/common";
import { getCookie, removeCookie, setCookie } from "@utils/cookieUtil";


const request = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});


export const setToken = (response) => {
  if (response.data) {
    sessionStorage.setItem(ACCESS_TOKEN, response.data.access_token);
    setCookie(REFRESH_TOKEN, response.data.refresh_token, {
      path: "/",
      maxAge: 8640000,
    });
  }
};


export const requestHandler = (config, code) => {
  const accessToken = sessionStorage.getItem(ACCESS_TOKEN);
  if (accessToken) {
    return {
      ...config,
      headers: { Authorization: `Bearer ${accessToken}`,
        "Request-URI": `${code}`,
      },
    };
  }
  return { ...config };
};


export const successHandler = (response) => {
  if (response.data.access_token) {
    setToken(response);
  }
  return response;
};

export const rejectedHandler = async (error) => {
  const originalRequest = error.config;
  return axios({
    ...originalRequest,
    headers: { Authorization: `Bearer ${sessionStorage.getItem(ACCESS_TOKEN)}`,
    }
    ,
  })
    .then((response) => response);
};


export const tokenRefreshHandler = async (error) => {
  const originalRequest = error.config;
  const getRefreshTokenFromCookies = getCookie(REFRESH_TOKEN);
  await axios
    .get(`${API_URL}${TOKEN_REFRESH_PATH}`, {
      headers: { Authorization: `Bearer ${getRefreshTokenFromCookies}` },
    })
    .then((res) => {
      setToken(res);
    });

  return axios({
    ...originalRequest,
    headers: { Authorization: `Bearer ${sessionStorage.getItem(ACCESS_TOKEN)}` },
  })
    .then((response) => response);
};

export default request;
