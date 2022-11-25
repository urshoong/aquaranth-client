import React, { useState } from "react";
import LoginForm from "@pages/login/component/LoginForm";
import { useHistory, useLocation } from "react-router-dom";
import request from "@utils/axiosUtil";
import { setCookie } from "@utils/cookieUtil";

const Index = () => {
  const history = useHistory();
  const loginHandler = async (loginFormData) => {
    await request(
      { method: "POST",
        url: "/login",
        data: loginFormData },
    ).then((res) => {
      setCookie("_at", res.data.access_token);
      setCookie("_rt", res.data.refresh_token);
      history.push("/");
    });
  };

  return (
    <LoginForm
      loginHandler={loginHandler}
    />
  );
};

export default Index;
