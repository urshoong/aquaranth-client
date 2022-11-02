import React from "react";
import { Route, Switch } from "react-router";
import IndexPage from "@pages/IndexPage";
import NotFoundPage from "@pages/NotFoundPage";
import ComBasicInfo from "@pages/Company/ComBasicInfo";
import ComLayout from "@pages/Company/ComLayout";

const App = () => (
  <Switch>
    <Route path="/" component={IndexPage} exact />
    <Route path="/orga">
      <Route path="/orga/company" component={ComBasicInfo} />
      <Route path="/orga/layout" component={ComLayout} />
    </Route>
    <Route component={NotFoundPage} />
  </Switch>
);

export default App;
