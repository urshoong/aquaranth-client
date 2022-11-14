import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";
import "./style.css";
import SearchBox from "@pages/MODULE/SYS/ROLE/ROLE0010/components/SearchBox";
import RoleGroupList from "./components/RoleGroupList";

const fetchLoginUserCompany = async () => {
  const { data } = await request.get("/login/company");
  return data;
};
const fetchRoleGroup = async () => {
  const { data } = await request.get("/role-group");
  return data;
};

function Index() {
  const [loginUserCompany, setLoginUserCompany] = useState({});
  const [roleGroupList, setRoleGroupList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const refreshPage = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    fetchRoleGroup()
      .then((data) => {
        setRoleGroupList(data);
      });
    fetchLoginUserCompany()
      .then((data) => {
        setLoginUserCompany(data);
      });
  }, [refresh]);

  return (
    <div className="mainDiv">
      <div className="listInfoDiv">
        <SearchBox loginUserCompany={loginUserCompany} />
        <RoleGroupList
          roleGroupList={roleGroupList}
          loginUserCompany={loginUserCompany}
          refreshPage={refreshPage}
        />
      </div>
    </div>
  );
}

export default Index;
