import React from "react";
import { Route, Switch } from "react-router";
import IndexPage from "@pages/IndexPage";
import NotFoundPage from "@pages/NotFoundPage";

const App = () => (
  <Switch>
    <Route path="/" component={IndexPage} exact />
    <Route component={NotFoundPage} />
  </Switch>
);

export default App;
