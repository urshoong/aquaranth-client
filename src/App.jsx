import React, { Suspense, useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import routes from "@pages/routes";
import DefaultLayout from "@components/layout/DefaultLayout";
import NotFoundPage from "@pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import { getCookie } from "./utils/cookie";


const App = () => {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (!getCookie("accessToken")) {
      history.push("/login");
    }
  }, []);


  return (
    <Suspense fallback={<>Spinning</>}>
      <DefaultLayout>
        <Switch location={location}>
          <Route path="/login" component={LoginPage} />
          {routes.map((props, index) => (
            <Route
              exact
              path={props.path}
              render={() => <props.module />}
              key={index}
            />
          ))}
          <Route render={() => <NotFoundPage />} />
        </Switch>
      </DefaultLayout>
    </Suspense>
  );
};

export default App;
