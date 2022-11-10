import React, { Suspense } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import routes from "@pages/routes";
import DefaultLayout from "@components/layout/DefaultLayout";
import NotFoundPage from "@pages/NotFoundPage";
import Login from "@pages/login";
import { getCookie } from "@utils/cookieUtil";


const App = () => {
  const location = useLocation();
  if (!getCookie("_at")) {
    return (<Login />);
  }

  return (
    <Switch>
      <Route path="/login" render={() => <Login />} />
      <Suspense fallback={<>Spinning</>}>
        <DefaultLayout>
          <Switch location={location}>
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

    </Switch>
  );
};

export default App;
