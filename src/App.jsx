import React from "react";
import { Route, Switch } from "react-router";

import NotFoundPage from "@pages/NotFoundPage";
import MenuPage from "@pages/MenuPage";
import RoleGroupPage from "@pages/role/RoleGroupPage";
import EmpInformationPage from "@pages/emp/EmpInformationPage";
import IndexPage from "@pages/IndexPage";
import ComBasicInfoPage from "@pages/company/ComBasicInfoPage";
import ComLayout from "@pages/company/ComLayout";
import UserRolePage from "@pages/userrole/UserRolePage";
import DeptPage from "@pages/dept/DeptPage";
import DeptSelectPage from "@pages/dept/DeptSelectPage";
import DeptRegisterPage from "@pages/dept/DeptRegisterPage";



const App = () => (

  <Switch>
    <Route path="/" component={IndexPage} exact />
    <Route path="/menu" component={MenuPage} />
    <Route path="/userrole" component={UserRolePage} />
    <Route path="/role">
      <Route path="/role/group" component={RoleGroupPage} />
    </Route>
    <Route path="/employee">
      <Route path="/employee/info" component={EmpInformationPage} />
    </Route>

    <Route path="/dept" component={DeptPage}>
      <Route path="/dept/read/:deptNo" component={DeptSelectPage} />
      <Route path="/dept/register" component={DeptRegisterPage} />
    </Route>


    <Route path="/orga">
      <Route path="/orga/company" component={ComBasicInfoPage} />
      <Route path="/orga/layout" component={ComLayout} />
    </Route>
    <Route component={NotFoundPage} />
  </Switch>
);

export default App;
