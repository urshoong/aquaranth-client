import React from "react";
import { Route, Switch } from "react-router";

import NotFoundPage from "@pages/NotFoundPage";
import MenuPage from "@pages/MenuPage";
import RoleGroupPage from "@pages/role/RoleGroupPage";
import EmpInformationPage from "@pages/emp/EmpInformationPage";
import IndexPage from "@pages/IndexPage";
import ComBasicInfoPage from "@pages/company/ComBasicInfoPage";
import UserRolePage from "@pages/userrole/UserRolePage";

import ComLayout from "./components/company/ComLayout";



const App = () => (

  <Switch>
    <Route path="/" component={IndexPage} exact />
    <Route path="/menu" component={MenuPage} />
    <Route path="/userrole" component={UserRolePage} />
    <Route path="/role">
      <Route path="/role/group" component={RoleGroupPage} />
    </Route>
    <Route path="/emp">
      <Route path="/emp/information" component={EmpInformationPage} />
      <Route path="/emp/register" component={EmpInsertPage} />
    </Route>
    <Route path="/orga">
      <Route path="/orga/company" component={ComLayout} />
    </Route>
    <Route component={NotFoundPage} />
  </Switch>
);

export default App;
