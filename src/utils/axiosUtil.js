import axios from "axios";
import { ACCESS_TOKEN, API_URL, REFRESH_TOKEN, TOKEN_REFRESH_PATH } from "@constants/common";
import { getCookie, setCookie } from "@utils/cookieUtil";

const request = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});


export const setToken = (response) => {
  sessionStorage.setItem(ACCESS_TOKEN, response.data.access_token);
  setCookie(REFRESH_TOKEN, response.data.refresh_token, {
    path: "/",
    maxAge: 8640000,
  });
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

/**
 * 1. 홈으로가면 api한테 요청을 3개를 보내서 3번 응답이와서 모달이 3개가뜬다
 * 2. rejectedHandler가 401응답을 받으면 무조건 쿠키에서 토큰 꺼내서달고 /api/refresh 로 보낸다.
 * 3.
 */
export const rejectedHandler = async (error) => {
  if (error.response.status === 401) {
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
  }
};

export default request;
