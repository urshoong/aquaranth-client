import React from "react";
import { Route, Switch } from "react-router";
import NotFoundPage from "@pages/NotFoundPage";
import EmployeeInfo from "@pages/Employee/EmployeeInfo";
import IndexPage from "@pages/IndexPage";

const App = () => (
  <Switch>
    <Route path="/" component={IndexPage} exact />
    <Route path="/employee">
      <Route path="/employee/info" component={EmployeeInfo} />
    </Route>
    <Route component={NotFoundPage} />
  </Switch>
);

export default App;
