import React from "react";
import LoginForm from "@pages/login/component/LoginForm";
import { useForm } from "react-hook-form";
import request from "@utils/axiosUtil";
import { useHistory } from "react-router-dom";
import {setCookie} from "@utils/cookieUtil";

const Index = () => {
  const form = useForm();
  const history = useHistory();
  const loginHandler = async (loginFormData) => {
    await request.post("/login", loginFormData).then(
      (res) => {
        setCookie("_at", res.data.access_token);
        setCookie("_rt", res.data.refresh_token);
        history.push("/");
      },
    ).catch((error) => {
      console.log(error);
    });
  };

  return (
    <LoginForm loginHandler={loginHandler} form={form} />
  );
};

export default Index;
