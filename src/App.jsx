import React, { Suspense, useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import DefaultLayout from "@components/layout/DefaultLayout";
import Login from "@pages/login";
import Spinner from "@components/Spinner";
import { lazy } from "@loadable/component";


import { ErrorBoundary } from "react-error-boundary";
import Error from "@components/error/Error";
import { GET_ROUTES } from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menu";
import { getCookie } from "@utils/cookieUtil";
import Main from "@pages/main";


const App = () => {
  const [routes, setRoutes] = useState([]);
  const history = useHistory();
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
        {/*  <ErrorBoundary fallbackRender={Error}> */}
        <DefaultLayout>
          <Route path="/" exact render={() => <Main />} />
          <Switch location={location}>
            {routes.map(({ menuNo, menuPath }) => {
              return (
                <Route
                  exact
                  path={menuPath}
                  component={lazy(() => import(`@pages/MODULE${menuPath}`)
                    .catch(() => { return history.push("/"); }))}
                  key={menuNo}
                />
              );
            })}
          </Switch>
        </DefaultLayout>
        {/* </ErrorBoundary> */}
      </Suspense>
    </Switch>
  );
};

export default App;
