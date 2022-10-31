import React from "react";
import { Route, Switch } from "react-router";
import IndexPage from "@pages/IndexPage";

const App = () => (
  <div>
    <Switch>
      <Route path="/" component={IndexPage} />
    </Switch>
  </div>
);

export default App;
