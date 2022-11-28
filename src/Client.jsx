import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "@pages/login";
import AquaranthApplication from "@pages/AquaranthApplication";
import useAxiosInterceptor from "@hooks/useAxiosInterceptor";
import { CHECK_LOGIN } from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menu";
import { setToken } from "@utils/axiosUtil";


const Client = () => {
  useAxiosInterceptor();
  CHECK_LOGIN().then((res) => setToken(res.data));
  return (
    <Switch>
      <Route exact path="/login" render={() => <Login />} />
      <AquaranthApplication />
    </Switch>
  );
};


export default Client;
