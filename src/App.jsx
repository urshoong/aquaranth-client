import React, { lazy, Suspense, useEffect, useState } from "react";
import { Link, Route, Switch, useHistory, useLocation } from "react-router-dom";
import DefaultLayout from "@components/layout/DefaultLayout";
import Login from "@pages/login";
import Spinner from "@components/Spinner";

import { ErrorBoundary } from "react-error-boundary";
import Error from "@components/error/Error";
import { GET_ROUTES } from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menu";


const App = () => {
  const [routes, setRoutes] = useState([]);
  const location = useLocation();

  // if (!getCookie("_at")) {
  //   return <Login />;
  // }
  /**
   * FIXME : 로그인 로직 수정
   */

  useEffect(() => {
    GET_ROUTES().then((res) => {
      setRoutes(res.data);
    });
  }, []);

  return (
    <Switch>
      <Route path="/login" render={() => <Login />} />
      <Suspense fallback={<Spinner />}>
        <ErrorBoundary fallbackRender={Error}>
          <DefaultLayout>
            <Switch location={location}>
              {routes.map(({ menuNo, menuPath }) => (
                <Route
                  exact
                  path={menuPath}
                  component={lazy(() => import(`@pages/MODULE${menuPath}`))}
                  key={menuNo}
                />
              ))}
            </Switch>
          </DefaultLayout>
        </ErrorBoundary>
      </Suspense>
    </Switch>
  );
};

export default App;
