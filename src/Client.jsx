import React, { Suspense, useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Login from "@pages/login";
import AquaranthApplication from "@pages/AquaranthApplication";
import useAxiosInterceptor from "@components/axios/useAxiosInterceptor";


const Client = () => {
  useAxiosInterceptor();
  return (
    <Switch>
      <Route exact path="/login" render={() => <Login />} />
      <AquaranthApplication />
    </Switch>
  );
};


export default Client;
