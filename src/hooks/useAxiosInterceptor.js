import React, { useEffect, useRef } from "react";
import request, {
  requestHandler,
  successHandler,
  tokenRefreshHandler,
} from "@utils/axiosUtil";
import { useHistory } from "react-router-dom";
import { ACCESS_TOKEN_EXPIRED, REFRESH_TOKEN_EXPIRED } from "@constants/errorcode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@constants/common";
import { removeCookie } from "@utils/cookieUtil";
import useModal from "@hooks/useModal";


const UseAxiosInterceptor = () => {
  const history = useHistory();

  const responseInterceptor = request.interceptors.response.use(
    (response) => successHandler(response),
    (error) => {
      const { detailErrorCode } = error.response.data.body;
      console.log(detailErrorCode);
      if (detailErrorCode === ACCESS_TOKEN_EXPIRED.detailErrorCode) {
        return tokenRefreshHandler(error)
          .catch((err) => {
            const tokenRefreshError = err.response.data;
            if (tokenRefreshError.detailErrorCode === REFRESH_TOKEN_EXPIRED.detailErrorCode) {
              sessionStorage.removeItem(ACCESS_TOKEN);
              removeCookie(REFRESH_TOKEN);
              history.push("/");
              location.reload();
            }
          });
      }
      return Promise.reject(error);
    },
  );


  const requestInterceptor = request.interceptors.request.use(
    (config) => requestHandler(config, history.location.pathname),
    (error) => Promise.reject(error),
  );

  useEffect(() => {
    return () => {
      request.interceptors.request.eject(requestInterceptor);
      request.interceptors.response.eject(responseInterceptor);
    };
  }, [requestInterceptor, responseInterceptor]);
};

export default UseAxiosInterceptor;
