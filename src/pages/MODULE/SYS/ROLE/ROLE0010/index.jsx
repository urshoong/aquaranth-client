import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";
import "./style.css";
import RoleGroupList from "./components/RoleGroupList";
import RoleGroupAddModal from "./components/RoleGroupAddModal";
import UserRoleRoleGroupBasedPage from "../ROLE0020/UserRoleRoleGroupBasedPage";
import UserMenu from "./components/UserMenu";

const fetchGNBList = async () => {
  const { data } = await request.get("/company/list");
  return data;
};

const fetchCompanyList = async () => {
  const { data } = await request.get("/company/list");
  return data;
};

const fetchRoleGroup = async () => {
  const { data } = await request.get("/role-group");
  return data;
};

const addRoleGroup = async (roleGroup) => {
  const { data } = await request.post("/role-group", roleGroup);
  return data;
};


function Index() {
  const [companyList, setCompanyList] = useState([]);
  const [roleGroupList, setRoleGroupList] = useState([]);
  const [GNBList, setGNBList] = useState([]);
  const [modal, setModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const refreshPage = () => {
    setRefresh(!refresh);
  };

  useEffect(() => {
    fetchRoleGroup()
      .then((data) => setRoleGroupList(data));
    fetchCompanyList()
      .then((data) => setCompanyList(data));
  }, [refresh]);

  return (
    <div className="firstOutDiv">
      <div className="headLine">
        <span className="comManage">권한그룹관리</span>
      </div>
      <div className="mainDiv">
        <div className="listInfoDiv">
          {/* 왼쪽 권한그룹 div */}
          <RoleGroupList
            roleGroupList={roleGroupList}
            companyList={companyList}
            setModal={setModal}
          />
          {/* 오른쪽 메뉴 div */}
          <div className="comInfo">
            <UserMenu />
          </div>
        </div>
      </div>

      {
        modal === true ? (
          <RoleGroupAddModal
            addRoleGroup={addRoleGroup}
            companyList={companyList}
            setModal={setModal}
            refreshPage={refreshPage}
          />
        ) : null
      }

    </div>
  );
}

export default Index;
