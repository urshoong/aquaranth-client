import React from "react";
import { Route, Switch } from "react-router";
import IndexPage from "@pages/IndexPage";
import NotFoundPage from "@pages/NotFoundPage";
import RoleGroupPage from "@pages/role/RoleGroupPage";

const App = () => (
  <>
    <Switch>
      <Route path="/" component={IndexPage} exact/>
      <Route path="/role">
        <Route path="/role/group" component={RoleGroupPage} />
      </Route>
      <Route component={NotFoundPage}/>
    </Switch>
  </>

);

export default App;
