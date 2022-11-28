import React, { useEffect } from "react";
import request, { rejectedHandler, requestHandler, successHandler } from "@utils/axiosUtil";
import { useHistory, useLocation } from "react-router-dom";
import useModal from "@hooks/useModal";

const UseAxiosInterceptor = () => {
  const history = useHistory();
  const { openModal } = useModal();

  const responseInterceptor = request.interceptors.response.use(
    (response) => successHandler(response),
    (error) => {
      return rejectedHandler(error).catch(() => {
        openModal({ type: "Login", props: "good" });
        history.push("/login");
      });
    },
  );

  const requestInterceptor = request.interceptors.request.use(
    (config) => requestHandler(config, history.location.pathname),
  );

  useEffect(() => {
    return () => {
      request.interceptors.request.eject(requestInterceptor);
      request.interceptors.response.eject(responseInterceptor);
    };
  }, [requestInterceptor, responseInterceptor]);
};

export default UseAxiosInterceptor;
