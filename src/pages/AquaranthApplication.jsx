import React, { useEffect, useState, Suspense } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Main from "@pages/main";
import { lazy } from "@loadable/component";
import DefaultLayout from "@components/layout/DefaultLayout";
import { GET_ROUTES } from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menu";
import Spinner from "@components/Spinner";

const AquaranthApplication = () => {
  const [routes, setRoutes] = useState([]);
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    GET_ROUTES().then((res) => {
      setRoutes(res.data);
    });
  }, []);
  return (
    <Suspense fallback={<Spinner />}>
      <DefaultLayout>
        <Route path="/" exact render={() => <Main />} />
        <Switch location={location}>
          {routes.map(({ menuNo, menuPath }) => {
            return (
              <Route
                exact
                path={menuPath}
                component={lazy(() => import(`@pages/MODULE${menuPath}`)
                  .catch(() => {
                    return history.push("/");
                  }))}
                key={menuNo}
              />
            );
          })}
        </Switch>
      </DefaultLayout>
    </Suspense>
  );
};

export default AquaranthApplication;
