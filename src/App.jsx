import React from "react";
import { Route, Switch } from "react-router-dom";

import loadable from "@loadable/component";
import IndexPage from "@pages/IndexPage";
import routes from "@pages/routes";
import DefaultLayout from "@components/layout/DefaultLayout";


const Page = loadable(
  (props) => import(`@pages/${props.page}`),
  {
    fallback: <div>Loading...</div>,
  },
);


const App = () => (
  <Switch>
    <Route path="/" component={IndexPage} exact />
    <DefaultLayout>
      {routes.map((props, index) => (
        <Route
          exact
          path={props.path}
          render={() => <Page page={props.component} />}
          key={index}
        />
      ))}
    </DefaultLayout>
  </Switch>
);
export default App;
