import React, { useEffect, useState } from "react";
import LoginForm from "@pages/login/component/LoginForm";
import { useHistory, useLocation } from "react-router-dom";
import request from "@utils/axiosUtil";
import { setCookie } from "@utils/cookieUtil";
import { ACCESS_TOKEN } from "@constants/common";

const Index = () => {
  const history = useHistory();
  const loginHandler = async (loginFormData) => {
    await request(
      { method: "POST",
        url: "/login",
        data: loginFormData },
    )
      .then(() => {
        history.push("/");
      });
  };

  // useEffect(() => {
  //   if (sessionStorage.getItem(ACCESS_TOKEN)) {
  //     history.push("/");
  //   }
  // }, []);

  return (
    <LoginForm
      loginHandler={loginHandler}
    />
  );
};

export default Index;
