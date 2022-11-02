import React from "react";
import { Route, Switch } from "react-router";
import IndexPage from "@pages/IndexPage";
import NotFoundPage from "@pages/NotFoundPage";
import MenuPage from "@pages/MenuPage";

const App = () => (
  <Switch>
    <Route path="/" component={IndexPage} exact />
    <Route path="/menu" component={MenuPage}/>
    <Route component={NotFoundPage} />
  </Switch>
);

export default App;
