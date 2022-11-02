import React from "react";
import { Route, Switch } from "react-router";

import NotFoundPage from "@pages/NotFoundPage";
import MenuPage from "@pages/MenuPage";
import RoleGroupPage from "@pages/role/RoleGroupPage";
import EmpInformationPage from "@pages/emp/EmpInformationPage";
import IndexPage from "@pages/IndexPage";
import ComBasicInfo from "@pages/Company/ComBasicInfo";
import ComLayout from "@pages/Company/ComLayout";
import UserRole from "@pages/UserRole/UserRole";


const App = () => (

  <Switch>
    <Route path="/" component={IndexPage} exact />
    <Route path="/menu" component={MenuPage} />
    <Route path="/userrole" component={UserRole} />
    <Route path="/role">
      <Route path="/role/group" component={RoleGroupPage} />
    </Route>
    <Route path="/employee">
      <Route path="/employee/info" component={EmpInformationPage} />
    </Route>
    <Route path="/orga">
      <Route path="/orga/company" component={ComBasicInfo} />
      <Route path="/orga/layout" component={ComLayout} />
    </Route>
    <Route component={NotFoundPage} />
  </Switch>
);

export default App;
